# SCRIPTS

## Orchestrate a Session
```bash
scripts/orchestrate.sh
```

### Notes
- Use `--force` to overwrite existing prompts for the day.
- Prompts are written to `_state/runs/YYYY-MM-DD/prompts/`.

## Governed Command Execution
```bash
scripts/run-cmd.sh --runner claude-code -- git status --porcelain
```

### Notes
- Commands must be allowlisted in `configs/process-policy.allowlist`.
- Artifacts are written to `_state/runs/YYYY-MM-DD/artifacts/`.

## Lint SITREP
```bash
scripts/lint-sitrep.sh /path/to/SITREP.md
```

## Controlled Experiment Run
```bash
scripts/experiment-run.sh
```
