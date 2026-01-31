# TUPLES_v1.0 (FROZEN SPEC ARTIFACT)

**Artifact**: `docs/specs/TUPLES_v1.0.md`  
**Version**: 1.0.0  
**Status**: FROZEN (v1.0) — DO NOT MODIFY WITHOUT GOVERNED VERSION BUMP  
**Scope**: Tuple semantics for HUMMBL-Agent kernel/router/runners/configs/linting

---

## 1. Purpose (using **P1** framing, **IN2** premortem, **SY8** systems thinking)

Tuples are the atomic governance representation used across HUMMBL-Agent to bound agency, cognition, and execution deterministically.

A tuple is the minimal unit for policy evaluation:

`validate_tuple(principal, capability, scope) -> { PERMIT | DENY | AUDIT }`

This spec defines:

- canonical arity and field meanings
- canonical serialization and escaping
- deterministic validation invariants
- failure codes
- deterministic linting target file classes
- test vectors contract (fixtures + expected canonical bytes + SHA-256)

---

## 2. Canonical Arity and Fields (Normative)

A tuple is exactly:

`(principal, capability, scope)`

### 2.1 principal (Normative)

Who initiates the act. Must be a stable identifier string (examples: `agent:planner`, `user:hash:...`, `ip:127.0.0.1`).

### 2.2 capability (Normative)

What action/resource is being exercised. Must be an explicit namespaced capability string (examples: `gateway:control_panel`, `exec:process:git`, `plan:write`).

### 2.3 scope (Normative)

Where/when/under-what-bounds the tuple is valid. Scope is a bounding context and MUST reduce blast radius.

---

## 3. Scope Type System (Normative)

`scope` MUST be one of:

1) **String scope**: a string length 1–512 characters  
2) **Structured scope**: a **flat map** with ≤16 entries where values are **scalar-only**

### 3.1 Structured Scope (Normative)

Structured scope MUST satisfy all:

- Keys are unique (no duplicates).
- Keys match: `^[a-z0-9][a-z0-9_.:-]{0,63}$` (1–64 chars)
- Values are one of:
  - string (0–256 chars)
  - number (finite; no NaN/Inf)
  - boolean (`true|false`)
- **Prohibited**:
  - nested objects/maps
  - arrays/lists
  - null
  - non-finite numbers (NaN/Inf)
  - duplicate keys (after parsing)

Rationale: v1.0 forbids nesting to eliminate ambiguous canonicalization and prevent policy smuggling.

---

## 4. Canonical Serialization (Normative)

All implementations MUST produce identical UTF-8 bytes before hashing.

### 4.1 Output Form

The canonical serialization is:

`<principal>|<capability>|<scope_part>`

Where:

- If scope is a string:

`<scope_part> = scope=<S>`

- If scope is a structured map:

`<scope_part> = scope{<pairs>}`

and

`<pairs> = k1=v1;k2=v2;...;kn=vn`

### 4.2 Key Ordering (Structured Scope)

For structured scope, keys MUST be sorted ascending by bytewise (ASCII) order.

### 4.3 Scalar Serialization (Structured Scope)

- string: emit as `<escaped_string>`
- boolean: emit `true` or `false` (lowercase)
- number: emit minimal decimal representation:
  - no leading `+`
  - no NaN/Inf
  - no trailing `.0` unless required for value identity
  - use `0` for zero
  - implementations must agree; if uncertain, constrain numbers to integers in configs

### 4.4 Escaping (Principal / Capability / Scope Strings)

Escaping is required to keep serialization unambiguous.

The following characters MUST be escaped with backslash `\` when appearing in:

- principal
- capability
- scope string values
- structured scope string scalar values
- structured scope keys (keys SHOULD match regex; escape still applies defensively)

Characters to escape:

- backslash: `\` -> `\\`
- pipe: `|` -> `\|`
- left brace: `{` -> `\{`
- right brace: `}` -> `\}`
- semicolon: `;` -> `\;`
- equals: `=` -> `\=`

No other escape sequences are defined in v1.0.

### 4.5 UTF-8

The canonical string is encoded in UTF-8 bytes for hashing.

---

## 5. Hashing (Normative)

`tuple_hash = SHA-256(utf8_bytes(canonical_serialization))`

Represent the digest as lowercase hex.

---

## 6. Validation Invariants (Normative)

### 6.1 principal

- type: string
- length: 1–256
- MUST NOT have leading/trailing whitespace

### 6.2 capability

- type: string
- length: 1–256
- MUST match: `^[a-z0-9][a-z0-9_.:\\-{};=|\\\\]*$`
- MUST NOT have leading/trailing whitespace

### 6.3 scope

- If string:
  - length: 1–512
  - MUST NOT have leading/trailing whitespace
- If structured map:
  - entry count: 1–16
  - keys follow Section 3.1
  - scalar-only values, no nesting/arrays/null
  - numbers must be finite

### 6.4 Fail-Closed

If any invariant fails, validation MUST return DENY (or equivalent invalid result). No implicit permissive defaults.

---

## 7. Failure Codes (Normative)

Implementations MUST return a stable failure code when invalid.

### 7.1 Codes

- `TUPLES_V1_OK`
- `TUPLES_V1_ERR_PRINCIPAL_EMPTY`
- `TUPLES_V1_ERR_PRINCIPAL_LENGTH`
- `TUPLES_V1_ERR_PRINCIPAL_WHITESPACE`
- `TUPLES_V1_ERR_CAPABILITY_EMPTY`
- `TUPLES_V1_ERR_CAPABILITY_LENGTH`
- `TUPLES_V1_ERR_CAPABILITY_FORMAT`
- `TUPLES_V1_ERR_CAPABILITY_WHITESPACE`
- `TUPLES_V1_ERR_SCOPE_MISSING`
- `TUPLES_V1_ERR_SCOPE_STRING_LENGTH`
- `TUPLES_V1_ERR_SCOPE_STRING_WHITESPACE`
- `TUPLES_V1_ERR_SCOPE_MAP_EMPTY`
- `TUPLES_V1_ERR_SCOPE_MAP_TOO_LARGE`
- `TUPLES_V1_ERR_SCOPE_KEY_FORMAT`
- `TUPLES_V1_ERR_SCOPE_DUP_KEY`
- `TUPLES_V1_ERR_SCOPE_VALUE_TYPE`
- `TUPLES_V1_ERR_SCOPE_VALUE_LENGTH`
- `TUPLES_V1_ERR_SCOPE_NUMBER_NONFINITE`

(Implementations MAY add internal diagnostics, but MUST map to one of these stable codes for governance + CI.)

---

## 8. Tuple Linting Scope (Normative for v1 CI)

Tuple linting in v1 MUST be limited to deterministic JSON/YAML sources:

### 8.1 File Globs (Default)

- `packages/skills/registry/**/*.json`
- `configs/**/*.json`
- `configs/**/*.yml`
- `configs/**/*.yaml`
- Optional: `_state/**/*.json` (post-run validation only)

### 8.2 Detection Heuristic (v1)

In JSON/YAML object trees, any object that contains:

- `principal`, `capability`, `scope`
is treated as a tuple candidate and validated.

### 8.3 Explicit Non-Goals (v1)

- No TypeScript AST parsing
- No Markdown parsing
These are deferred to later versions.

---

## 9. Test Vectors Contract (Normative)

A vectors file MUST exist at:

`docs/specs/TUPLES_v1.0.test-vectors.json`

It MUST contain fixtures where each vector includes:

- tuple object
- expected canonical serialization
- expected SHA-256 (lowercase hex)

CI MUST:

- compute canonical serialization using the kernel implementation
- compute SHA-256
- compare exact expected values
- fail on any mismatch

---

## 10. Versioning (Normative)

Any change to:

- serialization
- escaping
- validation invariants
- failure codes
- scope type system

MUST be a governed spec bump (v1.x or v2.0) and MUST introduce a new frozen artifact file name (e.g., `TUPLES_v1.1.md`).

v1.0.0 is frozen.
