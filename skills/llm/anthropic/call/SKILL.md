# llm.anthropic.call

## Purpose

Governed wrapper for Anthropic Messages API. Enforces tuple gating, dry-run defaults, and env-guarded live sends.

## Inputs

- `model` (string, optional; defaults from config)
- `purpose` (string, required)
- `prompt` (string, required)
- `max_output_tokens` (number, optional)

## Tuple Gate

Requires TupleV1 with:

- `capability = llm:call`
- `scope.vendor = anthropic`
- `scope.model` / `scope.purpose` consistent with invocation

## Safety

- Repo-tracked config: `enabled=false`, `dry_run=true`, empty allowlist
- `.local` overrides enable per-install control
- Live sends require `MOLTBOT_LIVE_LLM_CALLS=1` + allowlisted model + env token
- Prompt text never logged by the adapter
