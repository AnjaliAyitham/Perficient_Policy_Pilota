from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    APP_NAME: str = "PolicyPilot"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    PORTKEY_BASE_URL: str = "https://portkeygateway.perficient.com"
    PORTKEY_API_KEY: str = ""
    LLM_MODEL: str = "us.anthropic.claude-sonnet-4-6"
    LLM_TEMPERATURE: float = 0.1
    LLM_MAX_TOKENS: int = 2048

    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"

    VECTORSTORE_PATH: str = "./vectorstore"
    COLLECTION_NAME: str = "perficient_policies"

    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    RETRIEVAL_K: int = 4

    DOCUMENTS_PATH: str = "./data/policies"


settings = Settings()
