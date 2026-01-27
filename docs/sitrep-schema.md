# SITREP Schema (HUMMBL)

## Purpose

Provide a deterministic, audit-safe structure for SITREPs.

## Required Header

- `STATUS: ...` line indicating canonicality (e.g., NON-CANONICAL | DRAFT | NOT AUDIT-VERIFIED).
- `SITREP-N: Project - Phase | Classification | Timestamp | Owner | Sections` line.

## Required Sections (5)

1. **SITUATION**
    - Technical / Business / Team / Timeline
    - No schedule claims unless a baseline exists in-repo.

2. **INTELLIGENCE**
    - Observations (canonical vs external)
    - System state only if tracked in-repo

3. **OPERATIONS**
    - Completed / In Progress / Blocked
    - Each completed item must map to a concrete repo artifact or commit.

4. **ASSESSMENT**
    - Successes / Challenges / Lessons
    - No claims of autonomous learning or tracking unless implemented.

5. **RECOMMENDATIONS**
    - Immediate / Short Term / Base120 Mental Model Applications
    - Distinguish Base120 mental models (e.g., P1, SY1) from skills (executables).

## Canonicality Rules

- Canonical SITREPs must be fully audit-verifiable.
- If any claim is uncertain, label the SITREP as NON-CANONICAL.
