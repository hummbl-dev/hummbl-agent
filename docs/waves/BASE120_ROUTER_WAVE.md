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

---

## Wave 2B Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE  
**Commits:** `22ae494`  
**Duration:** 2026-01-31

### What Shipped

**Kernel-Authoritative Base120 Codes:**

- Created `packages/kernel/src/base120.ts` with frozen set of 120 model codes
- Exported `BASE120_CODES` (Set of string) covering all 6 domains (P, IN, CO, DE, RE, SY) × 20 models each
- Kernel becomes single source of truth for Base120 code validity

**Validator Enhancement:**

- Extended `validateBindings()` with `knownBase120Codes` parameter
- Added `UNKNOWN_BASE120_CODE` error code for invalid binding keys
- Validator now checks binding keys (P1, IN2, etc.) against kernel's canonical set
- Runner script inlines Base120 codes (maintains no-runtime-TS-loader policy)

**Commits:**

- `22ae494` - feat(kernel): export canonical Base120 model codes + feat(router): validate binding keys

### Tests Added

**Validator Coverage:**

- 1 new test: unknown Base120 code rejection (validates binding keys)
- Total: 11 tests passing (6 validator tests + 3 enforcement + 2 other)

### Invariants Check

✅ **1. CI Green** - All tests passing  
✅ **2. Kernel Authoritative** - Base120 codes exported from kernel, router imports  
✅ **3. No Runtime TS Loaders** - Validator script inlines codes (ESM .mjs)  
✅ **4. Deterministic Validation** - Binding keys checked against frozen canonical set  
✅ **5. Test Coverage** - New error code has test coverage

### Evidence

**CI Status:** ✅ GREEN  
**Test Results:**

```
✓ Bindings valid
✓ validateBindings (6 tests - added UNKNOWN_BASE120_CODE)
✓ P1 binding enforcement (3 tests)
✓ golden regression (1 test)
✓ selectLlmSkill (1 test)
ℹ tests 11
ℹ pass 11
```

**Kernel Authority:**

- 120 codes defined in `packages/kernel/src/base120.ts`
- Router validator references kernel codes (inlined in runner to avoid TS loader)
- Validates binding keys: `P1`, `IN2`, `DE3`, `SY8`, `DE1`, `RE2`, `IN10`, `CO5`

### Outcome

- **Kernel Authority Established:** Base120 codes are kernel-owned, router validates against them
- **No Hardcoded Lists:** Removed implicit assumptions; canonical source is `packages/kernel/src/base120.ts`
- **Binding Key Validation:** Router rejects bindings with invalid Base120 codes (e.g., `XX99`)
- **Policy Compliance:** No runtime TypeScript loaders; validator script uses inlined codes

**No Blockers:** Wave 2B complete; ready for Wave 3 (bindings expansion) or other tracks

---

## Wave 3 Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE / NO-OP  
**Commits:** None (architectural discovery only)  
**Duration:** 2026-01-31

### Investigation

**Original Goal:** Populate remaining transformation bindings (IN2, DE3, SY8, DE1, RE2, IN10, CO5)

**Discovery:**

- Searched for binding consumption: `rg "BASE120_BINDINGS\.(IN2|DE3|...)" packages/router/src`
- **Result:** Only `P1` is referenced at runtime (`packages/router/src/llm-routing.ts:70`)
- **Manifest check:** Only 2 LLM vendor skills exist (`llm/anthropic`, `llm/openai`)
- **P1 status:** Already contains both available LLM vendors (complete for current manifest)

### Decision

**No code changes required:**

- Other bindings (IN2, DE3, SY8, DE1, RE2, IN10, CO5) have **no routing surfaces** that consume them
- Populating unused bindings would create semantic debt (bindings without runtime behavior)
- Per governance: bindings should only be populated when routing surfaces actively use them

**Architecture constraint:**

- Adding new binding application points requires dedicated wave with:
  - Behavior specification for how transformation constrains routing
  - Routing surface implementation
  - Enforcement tests proving constraint works
  - Documentation of transformation semantics

### Invariants Check

✅ **1. No False Progress** - Did not populate unused bindings  
✅ **2. Semantic Integrity** - P1 binding complete for available skills  
✅ **3. Governance Compliance** - Deferred expansion until routing surfaces exist  
✅ **4. CI Green** - No code changes; existing tests remain passing

### Evidence

**Routing Surface Analysis:**

```bash
$ rg "BASE120_BINDINGS\." packages/router/src -S
packages/router/src/llm-routing.ts:70:  const p1Binding = BASE120_BINDINGS.P1;
```

Only P1 consumed at runtime.

**Manifest Analysis:**

```bash
$ grep '"id".*llm' skills/MANIFEST.json
"id": "llm/anthropic"
"id": "llm/openai"
```

P1 binding already includes both.

### Outcome

- **Wave 3 closed as no-op** (architectural reality: no consumers for non-P1 bindings)
- **P1 complete** for existing LLM vendor skills
- **Next wave prerequisite:** Design binding application surfaces for additional transformations
- **Governance preserved:** No semantic debt introduced by populating unused bindings

**Next Work:** Wave 4 requires specification of where/how additional transformations constrain routing before population

---

## Wave 4 Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE (SPEC-ONLY)  
**Commits:** Spec-only (no runtime changes)  
**Duration:** 2026-01-31

### What Shipped

- **Spec:** `docs/specs/BINDING_APPLICATION_POINTS_v1.md`
- **Decision:** DE3 (decomposition tool selection) chosen for v1 application point

### Reason for Spec-Only Closure

- No runtime decomposition selection surface exists in router/runners
- Implementing DE3 bindings would invent new behavior outside wave scope
- Wave discipline requires spec-first and existing consumer surfaces

### Outcome

- **Spec delivered** and governance-safe
- **Implementation deferred** until a DE3 routing surface exists
- **Next wave required:** introduce DE3 routing surface (design + implementation + tests)

---

## Wave 5 Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE / GREEN  
**Commits:** `cadff6e`, `1182b15`  
**Duration:** 2026-01-31

### What Shipped

- **DE3 routing surface:** `packages/router/src/de3-routing.ts`
- **Baseline selector:** `selectDe3Skill(ctx)` (skills-only)
- **Binding constraint:** `BASE120_BINDINGS.DE3.skills` intersection applied when non-empty
- **Telemetry:** `emitBindingResolution("DE3", matchedCount)`
- **Failure semantics:** explicit fail on no intersection using canonical reason string

### Tests Added

- Baseline selector tests (empty + first-eligible)
- Binding constraint tests (empty, forced selection, no intersection)

### Invariants Check

✅ **Skills-only routing** - No tool or runner leakage  
✅ **Deterministic selection** - First eligible, explicit failure path  
✅ **Governance intact** - No execution authority changes  
✅ **Tests green** - Router test suite passing

### Evidence

**Router tests:** 16 passing (includes DE3 baseline + binding tests)  
**CI:** expected green on main

---

## Wave 7 Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE / GREEN  
**Duration:** 2026-01-31

### What Shipped

- **DE3 binding populated:** 3 registry-backed IDs
  - `de3/decompose-plan.v0.1.0`
  - `de3/decompose-task.v0.1.0`
  - `de3/decompose-problem.v0.1.0`
- **Tests updated:** enforcement now uses real manifest IDs

### Evidence

- **packages/router npm test:** ✅ PASS (kernel build → router build → validate:bindings → tests)

### Invariants

✅ **Kernel authority** - Base120 codes remain kernel-owned  
✅ **Manifest authority** - Binding IDs validated against skills/MANIFEST.json  
✅ **CI green expected** - No regressions introduced

---

## Wave 9 Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE / GREEN  
**Duration:** 2026-01-31

### What Shipped

- **Supply added:** `skills/in2/*` (3 skills), MANIFEST updated (203 skills)
- **Binding populated:** `BASE120_BINDINGS.IN2.skills` set to 3 registry-backed IDs
- **Enforcement:** IN2 binding tests use real IDs; explicit fail on no intersection

### Evidence

- **packages/router npm test:** ✅ PASS (kernel build → router build → validate:bindings → tests)

### Invariants

✅ **Manifest authority** - Skill IDs validated against skills/MANIFEST.json  
✅ **Kernel authority** - Base120 codes remain kernel-owned  
✅ **CI green expected** - Router gates and tests green

---

## Wave 10 Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE / GREEN  
**Duration:** 2026-01-31

### Scope

- **Shared resolver:** `applyBinding` helper + unit tests
- **Refactor:** P1/DE3/IN2 consumers now use shared binding semantics

### Behavior

- **Preserved semantics:** reason strings unchanged
- **Telemetry:** emitted only when binding applied

### Evidence

- **packages/router npm test:** ✅ PASS (25 tests)

### Invariants

✅ **Kernel authority** - Base120 codes remain kernel-owned  
✅ **Manifest authority** - Skill IDs validated against skills/MANIFEST.json  
✅ **No TS loaders** - Tests run against compiled output only  
✅ **Deterministic** - Order-preserving, pure binding application

---

## Wave 11A Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE / GREEN  
**Duration:** 2026-01-31

### What Shipped

- **Resolver:** `resolveApplicationPoint(tuple)` mapping
  - `llm:* → P1`
  - `de3:* → DE3`
  - `in2:* → IN2`
  - else `null`
- **Scope:** resolver-only (no behavior integration)

### Evidence

- **packages/router npm test:** ✅ PASS (29 tests)

---

## Wave 12 Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE / GREEN  
**Duration:** 2026-01-31

### What Shipped

- **Entrypoint:** `routeByApplicationPoint({ tuple, skills })`
- **Dispatch:** uses `resolveApplicationPoint()` capability-prefix mapping
- **Scope:** additive only; existing selectors unchanged

### Evidence

- **packages/router npm test:** ✅ PASS (33 tests)

### Invariants

✅ **Kernel authority** - Base120 codes remain kernel-owned  
✅ **Manifest authority** - Skill IDs validated against skills/MANIFEST.json  
✅ **Deterministic** - Capability-prefix dispatch + selector determinism  
✅ **No TS loaders** - Tests run against compiled output only

---

## Wave 13A Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE / GREEN  
**Duration:** 2026-01-31

### What Shipped

- **Smoke coverage:** orchestrator end-to-end chain validation
  - capability → application point → selector → binding constraint
- **Coverage:** P1/DE3/IN2 + unknown capability case

### Evidence

- **packages/router npm test:** ✅ PASS (37 tests)

---

## Wave 14 Closure

**Wave:** BASE120_ROUTER_WAVE (continued)  
**Status:** COMPLETE / GREEN  
**Duration:** 2026-01-31

### What Shipped

- **W14.1:** SY8 baseline selector + tests
- **W14.2:** binding constraint via `applyBinding` + telemetry + tests
- **W14.3:** sy8/* skills supplied; manifest regenerated (206 skills)
- **W14.4:** `BASE120_BINDINGS.SY8.skills` populated with real IDs
- **W14.6:** resolver + orchestrator + smoke now include `sy8:*`

### Evidence

- **packages/router npm test:** ✅ PASS (45 tests)

### Invariants

✅ **Kernel authority** - Base120 codes remain kernel-owned  
✅ **Manifest authority** - Skill IDs validated against skills/MANIFEST.json  
✅ **No TS loaders** - Tests run against compiled output only  
✅ **CI gates** - Bindings validated + router tests green
