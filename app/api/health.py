from fastapi import APIRouter

from app.config import settings
from app.models.schemas import HealthResponse
from app.services.vector_store import get_vector_store

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    try:
        store = get_vector_store()
        doc_count = store._collection.count()
    except Exception:
        doc_count = 0

    return HealthResponse(
        status="healthy",
        app_name=settings.APP_NAME,
        version=settings.APP_VERSION,
        vectorstore_documents=doc_count,
    )
