# DE3 Routing v1 — Skill-Level Decomposition

## Scope & Non-Goals

**Scope**

- Define a minimal DE3 routing surface that selects **skills** (not tools).
- Provide deterministic selection + fallback semantics for DE3-bound skills.

**Non-goals**

- Tool selection or runner selection.
- Execution hints or environment assumptions.
- Multi-transform orchestration beyond DE3.

## Authority & Boundary Rule (Canonical)

> **DE3 decomposes problems into skills. Tool selection is downstream and remains opaque to DE3.**

DE3 does not authorize execution. Governor remains the sole execution authority.

## Inputs

- `intent` (string)
- `context` (artifact references)
- `available_skills` (SkillDefinition[])
- `tuple` (TupleV1)

## Outputs

- `skill_graph` (ordered list or DAG of skill IDs)
- `ordering` (explicit sequence)
- `justifications` (artifact-only rationale)

## Resolution Function (v1)

`resolveTransformationCode(tuple: TupleV1) -> Base120Code | null`

- If `tuple.transformation` matches `BASE120_CODES`, return it.
- Else if `tuple.intent` includes an exact Base120 token (e.g., `DE3`), return it.
- Else return `null`.

## DE3 Selection Surface (v1)

Introduce `selectDecompositionSkills(ctx)`:

- Input:
  - `tuple`
  - `skills` (SkillDefinition[])
- Behavior:
  - Baseline selection = current default (no DE3 binding applied).
  - If `BASE120_BINDINGS.DE3.skills` intersects with candidate skills, restrict to intersection.
  - If no intersection, fallback to baseline selection.

## Failure & Fallback Semantics

- No DE3 binding → baseline selection
- DE3 binding with no intersection → baseline selection + telemetry
- Invalid DE3 binding code → treated as no binding + telemetry

## Telemetry (v1)

- `binding.resolve.v1` with `binding_code=DE3`, `resolved`, `source_field`
- `binding.apply.v1` with `binding_code=DE3`, `surface=decomposition_selection`, `applied`
- `binding.fallback.v1` with `binding_code=DE3`, `reason=no_intersection|no_binding|invalid_code`

## Tests (v1)

- Intersection test: DE3 binding constrains selection to bound skill IDs.
- Fallback test: no intersection uses baseline selection.

## Invariants

- Skills are the only DE3 surface.
- Tools/runners remain opaque to DE3.
- No execution side effects.

---

**Status:** Planning spec (Wave 5).
**Invariant:** DE3 operates on skills only. Tool selection is downstream under Governor authorization.
**Change control:** Requires governed update.
