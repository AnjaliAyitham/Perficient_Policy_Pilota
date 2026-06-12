import json
from typing import AsyncGenerator

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage

from app.services.llm import get_llm
from app.services.vector_store import get_retriever


SYSTEM_PROMPT = """You are PolicyPilot — Perficient's Internal HR & Operations Knowledge Agent. Your role is to provide employees with instant, accurate answers to operational questions about company policies, benefits, IT guidelines, travel rules, and more.

INSTRUCTIONS:
- Answer ONLY based on the provided context from Perficient's policy documents.
- If the context does not contain enough information to answer the question, say so clearly rather than guessing or making up information.
- Always cite the specific policy document(s) you referenced in your answer.
- Be concise but thorough. Use bullet points for multi-part answers.
- If a question is ambiguous, ask for clarification.
- Format your response in markdown for readability.
- When citing numbers (dollar amounts, days, percentages), quote them exactly from the source.
- Use the conversation history to understand follow-up questions in context.

CONTEXT FROM POLICY DOCUMENTS:
{context}
"""


def format_docs(docs) -> str:
    formatted = []
    for doc in docs:
        title = doc.metadata.get("document_title", "Unknown Document")
        formatted.append(f"[Source: {title}]\n{doc.page_content}")
    return "\n\n---\n\n".join(formatted)


def get_source_documents(docs) -> list[dict]:
    seen = set()
    sources = []
    for doc in docs:
        title = doc.metadata.get("document_title", "Unknown")
        if title not in seen:
            seen.add(title)
            sources.append({
                "document": title,
                "source_file": doc.metadata.get("source", ""),
            })
    return sources


def _build_langchain_history(chat_history: list[dict]) -> list:
    messages = []
    for msg in chat_history:
        if msg["role"] == "user":
            messages.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "assistant":
            messages.append(AIMessage(content=msg["content"]))
    return messages


async def query_rag(question: str, chat_history: list[dict] = None) -> dict:
    retriever = get_retriever()
    llm = get_llm()

    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        MessagesPlaceholder("history", optional=True),
        ("human", "{question}"),
    ])

    retrieved_docs = retriever.invoke(question)
    context = format_docs(retrieved_docs)
    sources = get_source_documents(retrieved_docs)

    history = _build_langchain_history(chat_history) if chat_history else []

    chain = prompt | llm | StrOutputParser()

    answer = await chain.ainvoke({
        "context": context,
        "question": question,
        "history": history,
    })

    return {
        "answer": answer,
        "sources": sources,
    }


async def query_rag_stream(question: str, chat_history: list[dict] = None) -> AsyncGenerator[str, None]:
    retriever = get_retriever()
    llm = get_llm()

    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        MessagesPlaceholder("history", optional=True),
        ("human", "{question}"),
    ])

    retrieved_docs = retriever.invoke(question)
    context = format_docs(retrieved_docs)
    sources = get_source_documents(retrieved_docs)

    history = _build_langchain_history(chat_history) if chat_history else []

    chain = prompt | llm

    full_answer = ""
    async for chunk in chain.astream({
        "context": context,
        "question": question,
        "history": history,
    }):
        token = chunk.content if hasattr(chunk, "content") else str(chunk)
        if token:
            full_answer += token
            yield f"data: {json.dumps({'type': 'token', 'content': token})}\n\n"

    yield f"data: {json.dumps({'type': 'sources', 'sources': sources})}\n\n"
    yield f"data: {json.dumps({'type': 'done', 'full_answer': full_answer})}\n\n"
