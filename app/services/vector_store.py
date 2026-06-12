from langchain_chroma import Chroma

from app.config import settings
from app.services.embeddings import get_embedding_function


_vector_store_instance = None


def get_vector_store() -> Chroma:
    global _vector_store_instance
    if _vector_store_instance is None:
        _vector_store_instance = Chroma(
            collection_name=settings.COLLECTION_NAME,
            persist_directory=settings.VECTORSTORE_PATH,
            embedding_function=get_embedding_function(settings.EMBEDDING_MODEL),
        )
    return _vector_store_instance


def get_retriever(k: int = None):
    store = get_vector_store()
    return store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": k or settings.RETRIEVAL_K},
    )
