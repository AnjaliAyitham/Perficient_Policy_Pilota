from langchain_huggingface import HuggingFaceEmbeddings


_embeddings_instance = None


def get_embedding_function(model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
    global _embeddings_instance
    if _embeddings_instance is None:
        _embeddings_instance = HuggingFaceEmbeddings(
            model_name=model_name,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": True},
        )
    return _embeddings_instance
