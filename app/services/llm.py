from langchain_openai import ChatOpenAI

from app.config import settings


_llm_instance = None


def get_llm() -> ChatOpenAI:
    global _llm_instance
    if _llm_instance is None:
        base_url = settings.PORTKEY_BASE_URL.rstrip("/")
        if not base_url.endswith("/v1"):
            base_url += "/v1"

        _llm_instance = ChatOpenAI(
            model=settings.LLM_MODEL,
            base_url=base_url,
            api_key=settings.PORTKEY_API_KEY,
            temperature=settings.LLM_TEMPERATURE,
            max_tokens=settings.LLM_MAX_TOKENS,
            default_headers={
                "x-portkey-api-key": settings.PORTKEY_API_KEY,
                "x-portkey-provider": "@aws-bedrock-use2",
            },
        )
    return _llm_instance
