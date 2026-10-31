"""my-agent: a minimal Claude agent with a tool-use loop."""
import anthropic

from tools import dispatch_tool, tools

MODEL = "claude-sonnet-5-5"
MAX_TURNS = 10  # safety cap on the agentic loop

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from the environment


def run_agent(user_message: str) -> str:
    messages = [{"role": "user", "content": user_message}]

    for _ in range(MAX_TURNS):
        response = client.messages.create(
            model=MODEL,
            max_tokens=4096,
            tools=tools,
            messages=messages,
        )

        if response.stop_reason != "tool_use":
            return "".join(b.text for b in response.content if b.type == "text")

        # Run every tool the model requested this turn.
        results = [
            {
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": dispatch_tool(block.name, block.input),
            }
            for block in response.content
            if block.type == "tool_use"
        ]
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": results})

    return "Stopped: reached the maximum number of tool-use turns."


if __name__ == "__main__":
    print(run_agent("Hello! What can you do, and what time is it?"))
