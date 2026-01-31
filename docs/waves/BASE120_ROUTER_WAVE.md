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

**Status:** COMPLETE

**Last Updated:** 2026-01-31

---

## Wave 1 Closure

**Wave:** BASE120_ROUTER_WAVE  
**Status:** COMPLETE  
**Branch:** `wave/base120-router`  
**Baseline Tag:** `v0.1.0-hummbl-agent-foundation` (commit `54310af`)  
**Head Commit:** `eff0620` (chore: build before tests when importing dist)  
**Duration:** 2026-01-30 to 2026-01-31

### What Shipped

**Commits (7 total):**

1. `12ae8dc` - feat(router): add Base120 bindings surface (data-only)
2. `d116ef7` - feat(router): add deterministic Base120 bindings validator
3. `04f1855` - test(router): cover Base120 bindings validator error codes
4. `faedd12` - ci(router): validate Base120 bindings before tests (amended)
5. `f6d80fd` - feat(router): wire P1 Base120 binding to llm-routing (thin slice)
6. `8e26886` - obs(router): extract Base120 binding telemetry module (v1)
7. `eff0620` - chore(router): build before tests when importing dist

**Modules Created:**

- `packages/router/src/base120/bindings.ts` - Pure data bindings surface
- `packages/router/src/base120/validateBindings.ts` - Deterministic validator (3 error codes)
- `packages/router/src/base120/telemetry.ts` - Structured event emission (v1 schema)
- `packages/router/scripts/validate-bindings.mjs` - ESM validator runner

**Tests Added:**

- 4 validator tests (error codes: MISSING_SKILLS_ARRAY, NON_STRING_SKILL, DUPLICATE_SKILL)
- 1 golden regression test (non-breaking behavior proof)
- Total: 6 tests passing (up from 1)

**CI Enhancements:**

- Validate Base120 bindings gate (runs before tests)
- Pretest build hook (eliminates stale dist/ false greens)

**Implementation:**

- P1 transformation wired end-to-end (thin slice)
- No-op when binding empty; safe fallback if intersection empty
- Telemetry emitted on binding resolution

### Invariants Check

✅ **1. CI Green Per Commit** - All 7 commits passed CI  
✅ **2. Test Coverage** - 6 tests total (5 new), all .test.mjs format, import from dist/  
✅ **3. Kernel Authoritative** - Router imports TupleV1 from kernel; no duplication  
✅ **4. Non-Breaking** - Golden regression test proves existing behavior unchanged  
✅ **5. Governance Compliance** - Markdownlint enforced; validator CI-gated

### Evidence

**CI Status:** ✅ GREEN  
**Branch:** `origin/wave/base120-router`  
**Latest Run:** <https://github.com/hummbl-dev/hummbl-agent/actions> (wave/base120-router @ eff0620)  
**Test Count:** 6 passing (router) + 9 passing (LLM adapters) + 1 passing (e2e) = 16 total  
**Lint Guards:** All passing (markdownlint, Base120 refs, ESM, network policy)

**Local Verification:**

```
> npm test (packages/router)
✓ Bindings valid
✓ golden regression: router selection unchanged (1 test)
✓ validateBindings (4 tests)
✓ selectLlmSkill returns error when no skills match (1 test)
ℹ tests 6
ℹ pass 6
```

### Outcome

- **Binding Surface Contract:** Established single canonical location for Base120 transformation bindings
- **Deterministic Validation:** Shape + duplicates validated; transformation validity deferred to kernel-fed set
- **CI Integration:** Validator runs post-build, pre-test (policy-compliant)
- **Thin Vertical Slice:** P1 wired with safe no-op/fallback pattern
- **Telemetry v1:** Structured events centralized with stable schema
- **Test Determinism:** Pretest build hook prevents stale-dist regressions

### Follow-On Work

**Wave 2 Scope (future):**

- Expand bindings to additional transformations (IN2, DE3, etc.)
- Kernel-fed transformation code validation (replace hardcoded checks)
- Bindings report JSON artifact (governance visibility)
- Telemetry aggregation/metrics

**No Blockers:** Wave 1 complete; ready for merge to main

---

## Wave 2A Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE (after remediation)  
**Commits:** `320835a`, `153410b`, `6879147` (R1), `6caad11` (R2)  
**Duration:** 2026-01-31

### What Shipped

**A1.1 - Transformation Placeholders:**
- Added 7 empty transformation bindings: IN2, DE3, SY8, DE1, RE2, IN10, CO5
- Prepared binding surface for expansion

**A2.1 - Manifest Validation:**
- Enhanced validator with `UNKNOWN_SKILL_ID` error code
- Integrated `skills/MANIFEST.json` (197 skills) as authoritative registry
- Validator now checks skill IDs against manifest before allowing bindings

**A3.1 - P1 Population (corrected via R1+R2):**
- Initial: Populated P1 with P-perspective skills (semantic mismatch discovered)
- **Remediation R1:** Aligned `LLM_SKILL_BY_VENDOR` mapping to manifest IDs (`llm/anthropic`, `llm/openai`)
- **Remediation R1:** Corrected P1 binding to LLM vendor skills matching llm-routing surface
- **Remediation R2:** Replaced enforcement test with real routing behavior assertions

**Correction Note:**
> Initial P1 population targeted non-LLM skills (P-perspective namespace); corrected to align bindings with `llm-routing` vendor selection surface. Router used ghost skill IDs (`llm.anthropic.call`) not present in manifest; aligned to canonical slash format (`llm/anthropic`, `llm/openai`). Enforcement test updated to assert actual routing behavior rather than filtering mechanics.

**Commits:**
- `320835a` - obs(router): extract Base120 binding telemetry module (v1)
- `153410b` - feat(router): expand Base120 bindings + manifest validation
- `6879147` - fix(router): align llm-routing vendor skill IDs with manifest (R1)
- `6caad11` - test(router): enforce P1 binding on llm vendor selection (R2)

### Tests Added

**Enforcement (R2):**
- 3 behavioral tests proving P1 binding constrains LLM vendor selection:
  1. Selection constrained to P1-bound vendors when multiple matches exist
  2. Single-vendor P1 forces selection
  3. Correct fallback/error when no intersection exists

**Test Infrastructure Fixes:**
- Updated imports to nested dist structure (`dist/router/src/`)
- Added `.js` extensions to relative imports for ESM compliance
- Removed stale flat dist files

### Invariants Check

✅ **1. CI Green Per Commit** - All commits passed CI  
✅ **2. Test Coverage** - 10 tests total (3 new enforcement), all .test.mjs format  
✅ **3. Manifest Authoritative** - Validator verifies skill IDs against skills/MANIFEST.json  
✅ **4. Semantic Alignment** - P1 binding targets actual llm-routing vendor selection surface  
✅ **5. Real Enforcement** - Tests assert routing outcomes, not filtering mechanics

### Evidence

**CI Status:** ✅ GREEN  
**Test Results:**
```
✓ Bindings valid
✓ P1 binding enforcement (3 tests)
✓ golden regression: router selection unchanged (1 test)
✓ validateBindings (5 tests - added UNKNOWN_SKILL_ID)
✓ selectLlmSkill returns error when no skills match (1 test)
ℹ tests 10
ℹ pass 10
```

**Manifest Integration:**
- 197 skills loaded from `skills/MANIFEST.json`
- P1 skills (`llm/anthropic`, `llm/openai`) verified present in manifest
- Validator rejects unknown skill IDs with specific error code

### Outcome

- **Binding-to-Routing Alignment:** P1 binding now constrains actual llm-routing vendor selection
- **Manifest Authority:** Skills/MANIFEST.json is canonical registry; validator enforces
- **Real Enforcement:** Tests prove binding affects routing outcomes, not just data filtering
- **Ghost IDs Eliminated:** Router uses manifest-canonical IDs (`llm/*` not `llm.*.call`)
- **ESM Compliance:** Test imports and relative module paths follow Node ESM requirements

**No Blockers:** Wave 2A complete; bindings expansion (Wave 3) or kernel-fed validity (Wave 2B) now viable
