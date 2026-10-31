# my-agent

A minimal Claude agent built on the Anthropic Python SDK. It includes a
tool-use loop, one example tool (`get_current_time`), and a dispatch router.

## Install
```bash
pip install -r requirements.txt
```

## Configure
```bash
export ANTHROPIC_API_KEY=your-key-here
```

## Run
```bash
python agent.py
```

## Files
- `agent.py` - entrypoint and agentic loop (runs until the model stops requesting tools)
- `tools.py` - tool schemas and `dispatch_tool` router; add new tools to `tools` and `_REGISTRY`
