# Grok Runner Configuration

Guidance for using hummbl-agent with the Grok runner.

## Usage

Generate prompt packets:

```bash
scripts/orchestrate.sh
```

Run governed commands (allowlisted only):

```bash
scripts/run-cmd.sh --runner grok -- git status --porcelain
```

Log session actions:

```bash
packages/runners/grok/scripts/log-run.sh "Session start: grok" \
  --artifact "_state/runs/YYYY-MM-DD/prompts/grok-prompt.md" --hash-file
```

## Notes

- Allowlisted executables are defined in `configs/process-policy.allowlist`.
- Prompt templates live under `packages/runners/grok/`.
