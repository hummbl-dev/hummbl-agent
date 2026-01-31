# BASE120 Router Wave — Invariants & Scope

**Branch:** `wave/base120-router`

**Baseline:** `v0.1.0-hummbl-agent-foundation` (commit `54310af`)

**Date Started:** 2026-01-30

---

## Scope

Expand Base120 transformation support in router and kernel packages while maintaining green CI and governance compliance.

**Authorized Work:**

- Router Base120 transformation bindings
- Kernel transformation type definitions
- Observability extensions for transformation routing
- Additional transformation code validation

**Explicitly Out of Scope:**

- Breaking changes to kernel-tuples interface
- Changes to test policy (.test.mjs enforcement)
- Modifications to protected-branch gate criteria
- Runtime TypeScript loaders

---

## Invariants (MUST HOLD)

### 1. CI Green Per Commit

- All commits must pass CI before merge
- No red commits in wave branch
- E2E validation must pass
- All lint guards must pass

### 2. Test Coverage

- New code requires tests
- Tests use .test.mjs format only
- Tests run against compiled output (no runtime TS loaders)
- Test count must not decrease

### 3. Kernel Authoritative

- Kernel types remain source of truth
- Router imports from kernel (never duplicates)
- TupleV1 schema immutable during wave

### 4. Non-Breaking

- No changes to public APIs without deprecation path
- Router dist/ output remains compatible
- Existing transformation codes remain valid

### 5. Governance Compliance

- VERIFY_HUMMBL_JSON_SCHEMA v1.0.0 format preserved
- CI job summary continues to emit
- Markdown lint enforced
- Base120 transformation codes in all new docs

---

## Success Criteria

**Exit Conditions (all required):**

1. CI green on wave branch
2. All new features have tests
3. Documentation updated with transformation codes
4. No regressions in existing test suite
5. SITREP updated with wave outcomes

**Merge Readiness:**

- Rebase on main (if diverged)
- Squash if commit history is messy
- Update docs/SITREP.md with WAVE-001 entry
- Tag new baseline if stability plateau reached

---

## Commit Discipline

- Keep commits atomic and focused
- Each commit passes CI independently
- Use conventional commit format (feat/fix/docs/test)
- Run markdownlint before committing docs

---

## Rollback Plan

If invariants break:

1. Stop work immediately
2. Revert to last green commit
3. Document failure in _state/decisions/
4. Return to main branch
5. Reassess scope

---

**Status:** ACTIVE

**Last Updated:** 2026-01-30
