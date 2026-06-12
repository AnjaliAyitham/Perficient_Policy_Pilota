import os

from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.config import settings


def load_and_split_documents(documents_path: str = None) -> list:
    path = documents_path or settings.DOCUMENTS_PATH

    loader = DirectoryLoader(
        path,
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"},
    )
    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
        separators=["\n\n", "\n", ". ", " ", ""],
        length_function=len,
    )

    chunks = splitter.split_documents(documents)

    for chunk in chunks:
        source = chunk.metadata.get("source", "")
        filename = os.path.basename(source).replace(".md", "").replace("_", " ").title()
        chunk.metadata["document_title"] = filename

    return chunks


def get_document_list(documents_path: str = None) -> list[dict]:
    path = documents_path or settings.DOCUMENTS_PATH
    documents = []
    for filename in os.listdir(path):
        if filename.endswith(".md"):
            filepath = os.path.join(path, filename)
            stat = os.stat(filepath)
            documents.append({
                "name": filename.replace(".md", "").replace("_", " ").title(),
                "filename": filename,
                "size_bytes": stat.st_size,
                "last_modified": stat.st_mtime,
            })
    return sorted(documents, key=lambda d: d["name"])
