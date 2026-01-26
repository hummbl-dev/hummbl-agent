# Codex Runner (Scaffold)

Minimal runner packet generation and run logging.

## Usage
```bash
packages/runners/codex/scripts/make-prompt.sh > /tmp/codex-prompt.md
packages/runners/codex/scripts/log-run.sh "Kickoff: review CURRENT_STATE" \
  "artifacts/plan.md" "sha256:..."
packages/runners/codex/scripts/log-run.sh "Append hashed artifact" \
  --artifact "_state/runs/YYYY-MM-DD/artifacts/plan.md" --hash-file
packages/runners/codex/scripts/log-run.sh "Checkpoint: no artifact"
```

## Notes
- Prompt packet is template + CURRENT_STATE.
- Run logs append to _state/runs/YYYY-MM-DD/run.md.
