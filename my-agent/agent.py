"""A tiny starter agent. It can read and search files in this folder, nothing else.

Run:  python agent.py "What files are in this folder?"
"""
import sys
import anyio
from claude_agent_sdk import query, ClaudeAgentOptions, AssistantMessage, TextBlock


async def main(prompt: str) -> None:
    options = ClaudeAgentOptions(
        system_prompt="You are a friendly helper. Explain things simply.",
        allowed_tools=["Read", "Glob", "Grep"],  # read-only: it cannot change or delete anything
        max_turns=10,
    )
    async for message in query(prompt=prompt, options=options):
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if isinstance(block, TextBlock):
                    print(block.text)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit('Usage: python agent.py "your question"')
    anyio.run(main, " ".join(sys.argv[1:]))
