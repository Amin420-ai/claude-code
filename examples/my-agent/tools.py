"""Tool definitions and dispatch router for my-agent."""
from datetime import datetime, timezone

# Tool schemas sent to the model.
tools = [
    {
        "name": "get_current_time",
        "description": "Return the current date and time in UTC (ISO 8601).",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
]


def get_current_time() -> str:
    return datetime.now(timezone.utc).isoformat()


# Map tool names to implementations.
_REGISTRY = {
    "get_current_time": lambda args: get_current_time(),
}


def dispatch_tool(name: str, args: dict) -> str:
    """Route a tool call to its implementation; always returns a string."""
    handler = _REGISTRY.get(name)
    if handler is None:
        return f"Error: unknown tool '{name}'"
    try:
        return str(handler(args))
    except Exception as exc:  # surface failures to the model instead of crashing
        return f"Error running {name}: {exc}"
