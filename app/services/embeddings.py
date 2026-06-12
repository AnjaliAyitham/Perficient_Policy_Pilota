from langchain_community.embeddings import FastEmbedEmbeddings


_embeddings_instance = None


def get_embedding_function(model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
    global _embeddings_instance
    if _embeddings_instance is None:
        _embeddings_instance = FastEmbedEmbeddings(
            model_name=model_name,
        )
    return _embeddings_instance
