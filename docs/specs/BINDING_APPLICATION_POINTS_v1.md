# Binding Application Points v1

## Scope & Non-Goals

**Scope**

- Identify routing surfaces eligible for Base120 binding application.
- Define deterministic resolution for binding selection without altering kernel semantics.

**Non-goals**

- Populating bindings without active consumers.
- Changing kernel contracts or TupleV1 semantics.
- Expanding beyond a single new application surface in v1.

## Authoritative Inputs

- Kernel: `BASE120_CODES`
- Router: `TupleV1` fields used to resolve transformation
- Registry: `skills/MANIFEST.json`

## Resolution Function

Define:

`resolveTransformationCode(tuple: TupleV1) -> Base120Code | null`

Deterministic rules (v1):

- If `tuple.transformation` is present and matches a `BASE120_CODES` entry, return it.
- Else if `tuple.intent` includes an exact Base120 code token (e.g., `DE3`), return it.
- Else return `null`.

No inference or fuzzy matching in v1.

### TupleV1 → Base120Code Mapping (v1)

| TupleV1 Field | Rule | Example |
| --- | --- | --- |
| `transformation` | Exact match to `BASE120_CODES` | `DE3` |
| `intent` | Exact token match for `BASE120_CODES` | `Use DE3 for decomposition` |

## Application Points (v1)

### P1 (Existing)

- LLM vendor selection (already implemented).

### New v1 Surface: DE3 (Decomposition Tool Selection)

- Apply `DE3` binding when resolving decomposition tool routing.
- Scope: selection of decomposition-capable skills only.

## Failure & Fallback Semantics

- No binding → default behavior (current routing selection).
- Binding with no intersection → default behavior and emit telemetry event.
- Binding value not in `BASE120_CODES` → treat as no binding and emit telemetry event.

## Telemetry

Events (v1):

- `binding.resolve.v1`
  - `binding_code`
  - `source_field`
  - `resolved` (boolean)
- `binding.apply.v1`
  - `binding_code`
  - `surface` (e.g., `decomposition_selection`)
  - `applied` (boolean)
- `binding.fallback.v1`
  - `binding_code`
  - `reason` (`no_binding` | `no_intersection` | `invalid_code`)

## Tests

- P1: existing enforcement test remains authoritative.
- DE3: add one enforcement test that:
  - Provides a tuple with `transformation=DE3`.
  - Asserts decomposition selection uses only DE3-bound skills.
  - Asserts fallback is used when no DE3-bound skills exist.
