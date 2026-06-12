from collections import defaultdict

MAX_HISTORY = 10

_sessions: dict[str, list[dict]] = defaultdict(list)


def get_history(session_id: str) -> list[dict]:
    return _sessions[session_id][-MAX_HISTORY:]


def add_message(session_id: str, role: str, content: str):
    _sessions[session_id].append({"role": role, "content": content})
    if len(_sessions[session_id]) > MAX_HISTORY:
        _sessions[session_id] = _sessions[session_id][-MAX_HISTORY:]


def clear_session(session_id: str):
    _sessions.pop(session_id, None)
