import uuid

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.models.schemas import ChatRequest, ChatResponse, SourceInfo
from app.services.rag_service import query_rag, query_rag_stream
from app.services.memory import get_history, add_message, clear_session

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    session_id = request.session_id or str(uuid.uuid4())
    chat_history = get_history(session_id)

    try:
        result = await query_rag(request.question, chat_history)
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Unable to process your question. Please try again later. Error: {str(e)}",
        )

    add_message(session_id, "user", request.question)
    add_message(session_id, "assistant", result["answer"])

    sources = [SourceInfo(**s) for s in result["sources"]]

    return ChatResponse(
        answer=result["answer"],
        sources=sources,
        session_id=session_id,
    )


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    session_id = request.session_id or str(uuid.uuid4())
    chat_history = get_history(session_id)

    add_message(session_id, "user", request.question)

    async def event_generator():
        import json
        yield f"data: {json.dumps({'type': 'session', 'session_id': session_id})}\n\n"

        full_answer = ""
        try:
            async for event in query_rag_stream(request.question, chat_history):
                yield event
                if '"type": "done"' in event or '"type":"done"' in event:
                    try:
                        data = json.loads(event.replace("data: ", "").strip())
                        full_answer = data.get("full_answer", "")
                    except (json.JSONDecodeError, ValueError):
                        pass
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
            return

        if full_answer:
            add_message(session_id, "assistant", full_answer)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.post("/chat/clear")
async def clear_chat(request: ChatRequest):
    if request.session_id:
        clear_session(request.session_id)
    return {"status": "cleared"}
