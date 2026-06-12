from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str
    session_id: str | None = None


class SourceInfo(BaseModel):
    document: str
    source_file: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceInfo]
    session_id: str


class DocumentInfo(BaseModel):
    name: str
    filename: str
    size_bytes: int
    last_modified: float


class DocumentsResponse(BaseModel):
    documents: list[DocumentInfo]
    total_count: int


class HealthResponse(BaseModel):
    status: str
    app_name: str
    version: str
    vectorstore_documents: int
