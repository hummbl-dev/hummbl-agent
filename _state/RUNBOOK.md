# RUNBOOK

## Concurrent Runs: Claude Code + Codex

### Lane Assignment
- Assign a lane per runner (e.g., "Claude Code" and "Codex") for the duration of a run.
- Each lane owns its edits until a handoff is recorded.

### Locks
- Record locks in CURRENT_STATE under "Workstream locks" with scope, holder, and until (if known).
- Avoid overlapping scope between lanes.

### Baton Update Discipline
- Update CURRENT_STATE before lane handoff.
- Record handoff notes in CURRENT_STATE "Next handoff" entries.

### Prompts and Logs
- Prompt packets live under packages/runners/<runner>/prompt.md.template.
- Run logs append to _state/runs/YYYY-MM-DD/run.md.

## Starting a session with orchestrate.sh
- Run `scripts/orchestrate.sh` to open today’s run and generate prompts.
- Prompts are written to `_state/runs/YYYY-MM-DD/prompts/`.
- If prompts already exist, re-run with `--force` to overwrite.

## Governed command execution
- Use `scripts/run-cmd.sh` to run allowlisted commands with captured artifacts and hashes.
- Outputs are written to `_state/runs/YYYY-MM-DD/artifacts/` and logged via runner log scripts.

## Kernel changes require a decision note
- Any changes under `packages/kernel/` must include a decision note under `_state/decisions/`.
- Alternatively, add `_state/decisions/KERNEL_CHANGE_OK` for an explicit override.
