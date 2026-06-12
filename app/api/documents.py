from fastapi import APIRouter

from app.models.schemas import DocumentsResponse, DocumentInfo
from app.services.document_processor import get_document_list

router = APIRouter()


@router.get("/documents", response_model=DocumentsResponse)
async def list_documents():
    docs = get_document_list()
    document_infos = [DocumentInfo(**d) for d in docs]
    return DocumentsResponse(
        documents=document_infos,
        total_count=len(document_infos),
    )
