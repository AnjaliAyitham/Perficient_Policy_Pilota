"""
Ingest NEW policy documents into the existing ChromaDB vector store.
Adds new documents without clearing the existing store.

Usage:
    python scripts/ingest_new.py
"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import settings
from app.services.embeddings import get_embedding_function
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma

NEW_DOCUMENTS = [
    "health_wellness_benefits.md",
    "retirement_financial_benefits.md",
    "education_tuition_benefits.md",
    "employee_perks_discounts.md",
    "family_life_benefits.md",
]


def main():
    print("=" * 60)
    print("Perficient Policy Document Ingestion (New Documents)")
    print("=" * 60)

    docs_path = settings.DOCUMENTS_PATH
    all_chunks = []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
        separators=["\n\n", "\n", ". ", " ", ""],
        length_function=len,
    )

    for filename in NEW_DOCUMENTS:
        filepath = os.path.join(docs_path, filename)
        if not os.path.exists(filepath):
            print(f"  WARNING: {filename} not found, skipping")
            continue

        print(f"\n  Loading: {filename}")
        loader = TextLoader(filepath, encoding="utf-8")
        documents = loader.load()
        chunks = splitter.split_documents(documents)

        title = filename.replace(".md", "").replace("_", " ").title()
        for chunk in chunks:
            chunk.metadata["document_title"] = title

        all_chunks.extend(chunks)
        print(f"    -> {len(chunks)} chunks")

    print(f"\n  Total new chunks: {len(all_chunks)}")

    print(f"\nCreating embeddings with: {settings.EMBEDDING_MODEL}")
    embedding_function = get_embedding_function(settings.EMBEDDING_MODEL)

    vector_store = Chroma(
        collection_name=settings.COLLECTION_NAME,
        persist_directory=settings.VECTORSTORE_PATH,
        embedding_function=embedding_function,
    )

    existing_count = vector_store._collection.count()
    print(f"  Existing vectors: {existing_count}")

    vector_store.add_documents(all_chunks)

    new_count = vector_store._collection.count()
    print(f"  New total vectors: {new_count}")
    print(f"  Added: {new_count - existing_count} vectors")

    print("\n" + "=" * 60)
    print("Ingestion complete! New documents added to vector store.")
    print("=" * 60)


if __name__ == "__main__":
    main()
