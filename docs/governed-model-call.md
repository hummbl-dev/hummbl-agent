# Governed Model Call Workflow (using **P1** framing and **SY8** systems thinking)

This workflow covers the end-to-end governed model call path:
Prompt → Request Build → API Call → Artifact Log.

## Prerequisites

- OpenAI: `OPENAI_API_KEY` set in the environment.
- Anthropic (optional): `ANTHROPIC_API_KEY` set in the environment.
- Codex CLI itself can run without API keys when using ChatGPT auth; governed API calls still require vendor keys.

## 1) Open a Run + Generate Prompts

```bash
scripts/orchestrate.sh
```

This creates:

- `_state/runs/YYYY-MM-DD/run.md` (run log)
- `_state/runs/YYYY-MM-DD/prompts/*.md` (prompt packets)

## 2) Build Request + Enforce Guards

Requests are built by `scripts/build-request.cjs`, which:

- Escapes prompt input safely into JSON.
- Enforces `maxRequestBytes` from `configs/network-policy.json`.
- Optionally checks global rate limit (`--check-rate-limit`).

Example:

```bash
node scripts/build-request.cjs \
  --type openai \
  --out /tmp/example.request.json \
  --model gpt-4.1-mini \
  --input "Summarize these notes: ..." \
  --check-rate-limit
```

## 3) API Call (Governed)

OpenAI:

```bash
export OPENAI_API_KEY="..."
scripts/run-openai-governed.sh \
  --model gpt-4.1-mini \
  --input "Summarize these notes: ..."
```

Anthropic:

```bash
export ANTHROPIC_API_KEY="..."
scripts/run-anthropic-governed.sh \
  --model claude-3-5-sonnet-20241022 \
  --input "Summarize these notes: ..."
```

## 4) Artifact Log

Each governed call produces and logs:

- Request JSON: `_state/runs/YYYY-MM-DD/artifacts/<name>.request.json`
- Response JSON: `_state/runs/YYYY-MM-DD/artifacts/<name>.response.json`
- Metadata JSON: `_state/runs/YYYY-MM-DD/artifacts/<name>.meta.json`
- Run log entries with sha256 hashes: `_state/runs/YYYY-MM-DD/run.md`

## Rate Limiting (Global)

Rate limits are global per minute and enforced via:

- `_state/.rate-limit.json` (counter window state)
- `scripts/network-guard.cjs` in the runner layer
- Optional preflight in `scripts/build-request.cjs` with `--check-rate-limit`

## Request Size Limits

`maxRequestBytes` is enforced from `configs/network-policy.json` before any network call.

## Troubleshooting

- Invalid JSON or prompt injection: use `scripts/build-request.cjs` (never hand-build JSON).
- Rate limit errors: wait for the next minute or reset `_state/.rate-limit.json`.
- Request too large: shrink input or raise `maxRequestBytes` (if policy allows).
