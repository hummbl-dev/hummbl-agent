# Skill Selection + Routing Workflow (using **P1** framing and **DE3** decomposition)

This flow covers task → router decision → prompt packet → run log.

## Inputs

- `task`: title + description
- `state`: current run state (objective, constraints, locks)
- `skills`: registry skill definitions
- `availableRunners`: runner ids available in this environment
- `toolPolicy`: allowed tools + risk/network/exec limits

## 1) Gather the Inputs

Use your registry + run state as source of truth. Example shape:

```json
{
  "task": {
    "title": "Summarize integration notes",
    "description": "Create a short summary for the daily SITREP"
  },
  "state": {
    "objective": "HUMMBL daily coordination",
    "constraints": ["No external network unless allowlisted"],
    "locks": [],
    "nextSteps": [],
    "nextHandoff": [],
    "artifacts": []
  },
  "availableRunners": ["codex", "claude-code"],
  "toolPolicy": {
    "allowedTools": ["process", "filesystem", "network"],
    "networkDefault": "restricted",
    "execDefault": "allowlisted",
    "maxRisk": "medium"
  }
}
```

## 2) Run the Router

The router selects the best skill + runner:

- Scores skills by tags vs task + objective.
- Applies tool policy + runner capabilities checks.
- Produces an explainable decision with alternatives.

Reference implementation:

- `packages/router/src/router.ts`
- `packages/router/src/selectors.ts`

## 3) Prepare the Prompt Packet

Once a runner is selected, generate prompt packets:

```bash
scripts/orchestrate.sh
```

This writes prompt templates to:
`_state/runs/YYYY-MM-DD/prompts/{runner}-prompt.md`

## 4) Log the Route Decision

Record the decision in the run log:

```bash
packages/runners/codex/scripts/log-run.sh "Route selected: <skillId>" --date YYYY-MM-DD
```

Optionally include the prompt artifact:

```bash
packages/runners/codex/scripts/log-run.sh "Prompt prepared" \
  --artifact "_state/runs/YYYY-MM-DD/prompts/<runner>-prompt.md" \
  --hash-file \
  --date YYYY-MM-DD
```

## Notes

- Alternatives are included in the router decision for auditability.
- Capability checks gate runners on network/exec permissions.
