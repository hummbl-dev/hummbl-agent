# Decision: Tuple Spec Enforcement v1.0

Date: 2026-01-27
Owner: Kernel & Governance working group

## Context

Kernel received structural changes to add the Tuple v1.0 contract (types-only module), align validation with `docs/specs/TUPLES_v1.0.md`, and provide deterministic serialization utilities required by governance. These changes are paired with CI enforcement (tsc gate, tuple vectors, tuple lint) and frozen spec artifacts documented under `docs/specs/`.

## Decision

Proceed with merging the tuple-spec kernel changes because they:

- are driven by the frozen governance artifact `TUPLES_v1.0.md`
- remain side-effect-free (types + pure functions) per kernel charter
- are required to unblock router/runners from consuming tuples deterministically

This note serves as the approval required by `scripts/check-kernel-decision.sh` for kernel modifications in this PR.
