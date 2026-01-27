# Router Skeleton

Deterministic, types-first router that maps Task + RunState + SkillRegistry to a plan.

## Purpose

- Select a skill and runner deterministically.
- Provide policy checks and explainable routing.
- Return a plan with steps (no execution).

## Inputs

- Task (kernel)
- RunState (kernel)
- SkillDefinition[] (skills registry)
- Available runners
- ToolPolicy
- Optional capabilities manifest for runner filtering (network/exec compatibility).

## Output

- RouteResult with a RouteDecision or error + explanation.

## Non-goals

- No execution of scripts or tools.
- No vendor runtime integration.

## How to extend

- Add skills to the registry.
- Adjust scoring/policy rules in `selectors.ts` and `policies.ts`.

## Example

```ts
import { route } from "./src/router";
import { SKILLS } from "../skills/registry/src/registry";
import type { Task } from "../kernel/src/task";
import type { RunState } from "../kernel/src/state";

const task: Task = {
  id: "task-1",
  title: "Run governed command for status",
  description: "Use S.primitive.T.SYS.run-governed-command.v0.1.0 to capture artifacts.",
  status: "queued",
  provenance: { sourceType: "user", sourceRef: "cli" },
  createdAt: "2026-01-26",
};

const state: RunState = {
  id: "state-1",
  objective: "Verify run logging",
  constraints: ["no network"],
  nextSteps: ["run status"],
  locks: [],
  nextHandoff: [],
  artifacts: [],
  provenance: { sourceType: "system", sourceRef: "_state/CURRENT_STATE.md" },
  createdAt: "2026-01-26",
};

const result = route({
  task,
  state,
  skills: SKILLS,
  availableRunners: ["codex"],
  toolPolicy: {
    allowedTools: ["process"],
    networkDefault: "none",
    execDefault: "allowlisted",
    maxRisk: "medium",
  },
});

// result.ok === true -> decision.steps includes run-script for scripts/run-cmd.sh
```
