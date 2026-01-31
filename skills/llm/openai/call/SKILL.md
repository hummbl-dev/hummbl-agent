# llm.openai.call

## Purpose

Governed wrapper for OpenAI Responses API with tuple gating and live guards.

## Inputs

- `model` (string, optional; defaults from config)
- `purpose` (string, required)
- `prompt` (string, required)
- `max_output_tokens` (number, optional)

## Tuple Gate

TupleV1 requirements:

- capability `llm:call`
- scope.vendor = `openai`
- scope.model/purpose consistent with the call

## Safety

- Repo config disabled + dry-run with empty allowlist
- `.local` overrides enable per-install control
- Live sends require `MOLTBOT_LIVE_LLM_CALLS=1`, env token, and allowlisted model
- Prompt text never logged
