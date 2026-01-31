# Codex Runner

## Usage

```bash
packages/runners/codex/scripts/make-prompt.sh > /tmp/codex-prompt.md
packages/runners/codex/scripts/log-run.sh "Session start: codex" \
  --artifact "_state/runs/YYYY-MM-DD/prompts/codex-prompt.md" --hash-file
```

## OpenAI Responses (networked)

```bash
export OPENAI_API_KEY="..."
packages/runners/codex/scripts/run-openai.sh \
  --model gpt-4.1-mini \
  --input "Hello from HUMMBL"
```

Artifacts are written to `_state/runs/YYYY-MM-DD/artifacts/` and logged with hashes.

## Notes

- OpenAI requests are non-streaming (v0.1).
- Domain allowlist enforced by `configs/network-policy.json`.
