"""
Ingest policy documents into the ChromaDB vector store.

Usage:
    python scripts/ingest.py
"""
import sys
import os
import shutil

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import settings
from app.services.document_processor import load_and_split_documents
from app.services.embeddings import get_embedding_function
from langchain_chroma import Chroma


def main():
    print("=" * 60)
    print("Perficient Policy Document Ingestion")
    print("=" * 60)

    # Clear existing vector store
    if os.path.exists(settings.VECTORSTORE_PATH):
        print(f"\nClearing existing vector store at: {settings.VECTORSTORE_PATH}")
        shutil.rmtree(settings.VECTORSTORE_PATH)

    # Load and split documents
    print(f"\nLoading documents from: {settings.DOCUMENTS_PATH}")
    chunks = load_and_split_documents()
    print(f"  Documents split into {len(chunks)} chunks")
    print(f"  Chunk size: {settings.CHUNK_SIZE} chars, Overlap: {settings.CHUNK_OVERLAP} chars")

    # Show document breakdown
    doc_counts = {}
    for chunk in chunks:
        title = chunk.metadata.get("document_title", "Unknown")
        doc_counts[title] = doc_counts.get(title, 0) + 1

    print(f"\n  Documents processed ({len(doc_counts)} total):")
    for title, count in sorted(doc_counts.items()):
        print(f"    - {title}: {count} chunks")

    # Create embeddings and store
    print(f"\nCreating embeddings with: {settings.EMBEDDING_MODEL}")
    print("  (This may take a moment on first run as the model downloads...)")

    embedding_function = get_embedding_function(settings.EMBEDDING_MODEL)

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_function,
        collection_name=settings.COLLECTION_NAME,
        persist_directory=settings.VECTORSTORE_PATH,
    )

    # Verify
    count = vector_store._collection.count()
    print(f"\nVector store created successfully!")
    print(f"  Location: {settings.VECTORSTORE_PATH}")
    print(f"  Collection: {settings.COLLECTION_NAME}")
    print(f"  Total vectors: {count}")
    print("\n" + "=" * 60)
    print("Ingestion complete! You can now run the chatbot with: python run.py")
    print("=" * 60)


if __name__ == "__main__":
    main()
