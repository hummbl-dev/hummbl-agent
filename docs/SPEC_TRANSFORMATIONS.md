# Transformation Codes (T.*)

This document freezes the canonical transformation namespace. Transformation codes
are **not** Base120 mental model codes and must never reuse Base120 identifiers.

## Canonical codes

- `T.PER` — Perspective
- `T.INV` — Inversion
- `T.COM` — Composition
- `T.DEC` — Decomposition
- `T.REC` — Recursion
- `T.SYS` — Systems
- `T.INT` — Integration (meta-transformation; orchestrates T.*)

## Rules

- Transformations are `T.*` codes only.
- Mental models remain Base120 codes (e.g., `P1`, `SY1`, `DE3`).
- Skills are `S.*` ids and reference Base120 only via bindings.
