# Claude Code Runner

## Usage

```bash
packages/runners/claude-code/scripts/make-prompt.sh > /tmp/claude-prompt.md
packages/runners/claude-code/scripts/log-run.sh "Session start: claude" \
  --artifact "_state/runs/YYYY-MM-DD/prompts/claude-code-prompt.md" --hash-file
```

## Anthropic Messages (networked)

```bash
export ANTHROPIC_API_KEY="..."
packages/runners/claude-code/scripts/run-anthropic.sh \
  --model claude-3-5-sonnet-20241022 \
  --input "Hello from HUMMBL"
```

Artifacts are written to `_state/runs/YYYY-MM-DD/artifacts/` and logged with hashes.

## Notes

- Anthropic requests are non-streaming (v0.1).
- Domain allowlist enforced by `configs/network-policy.json`.
