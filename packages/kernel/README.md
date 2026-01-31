# HUMMBL Kernel (Types Only)

Stable, minimal contracts for agent, task, runner, tool, memory, and state interoperability.

## Scope

- Types only (no runtime behavior)
- No dependencies
- No build system

## Stability & Compatibility

- Types-only contract; no runtime guarantees
- Backward compatibility is preferred where possible
- Any contract changes require a VERSION bump

## Contents

- src/types.ts: shared primitives + provenance
- src/agent.ts: agent interface
- src/task.ts: task interface
- src/runner.ts: runner interface
- src/tool.ts: tool interface + permissions
- src/artifact.ts: artifact + provenance
- src/memory.ts: memory note + store + consolidation hook signature
- src/state.ts: run state contract aligned to _state/CURRENT_STATE.md semantics
- src/index.ts: exports
- tests/TEST_PLAN.md: deterministic test plan (text only)
