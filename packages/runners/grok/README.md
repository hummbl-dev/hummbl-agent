# Grok Runner

Runner scaffold for Grok.

## Usage

```bash
packages/runners/grok/scripts/make-prompt.sh > /tmp/grok-prompt.md
packages/runners/grok/scripts/log-run.sh "Session start: grok" \
  --artifact "_state/runs/YYYY-MM-DD/prompts/grok-prompt.md" --hash-file
```

## Governed execution

```bash
scripts/run-cmd.sh --runner grok -- git status --porcelain
```
