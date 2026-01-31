# GOVERNANCE

## Scope

This document defines authority, decision processes, and change control for the HUMMBL Agent repository.

**Governed areas:**

- Skill registry authority and integrity
- Base120 canonical JSON and transformation bindings
- External agent boundaries and vendor policies
- Security policies (process, network, secrets)
- Test strategy and CI enforcement
- Runner capabilities and compatibility

## Decision Process

### Decision Categories

**Category 1: Routine (No review required)**

- Bug fixes not affecting APIs or policies
- Documentation improvements
- Skill additions (with manifest update)
- Test additions

**Category 2: Significant (Review required)**

- New adapters or runners
- Policy changes (process, network, secrets allowlists)
- Base120 canonical JSON changes
- Test strategy changes
- CI/CD workflow modifications

**Category 3: Architectural (Design review + approval)**

- Kernel interface changes
- Security boundary modifications
- External registry integration (if any)
- Governance process changes
- Breaking changes to runner contracts

### Decision Documentation

**Required for Category 2+:**

- Create `_state/decisions/YYYY-MM-DD-<slug>.md`
- Include: context, decision, rationale, alternatives considered, consequences
- Link from relevant code/config comments
- Reference in PR description

**Template:**

```markdown
# Decision: <title>

Date: YYYY-MM-MM
Status: Proposed | Accepted | Deprecated

## Context
What problem are we solving?

## Decision
What did we decide?

## Rationale
Why this approach?

## Alternatives
What else did we consider?

## Consequences
What are the implications?
```

## Roles

### Maintainers

**Responsibilities:**

- Review and approve Category 2+ changes
- Enforce governance policies
- Manage security disclosures
- Coordinate releases (if applicable)
- Maintain CI/CD infrastructure

**Authority:**

- Merge access to `main` branch
- GitHub repository settings
- Secrets management (CI keys, etc.)

### Contributors

**Rights:**

- Submit PRs
- Participate in design discussions
- Report issues and vulnerabilities

**Responsibilities:**

- Follow contribution guidelines (CONTRIBUTING.md)
- Pass CI checks before requesting review
- Respond to review feedback promptly
- Update tests and documentation

### External Agents (Claude Code, Codex, Grok)

**Rights:**

- Invoke governed commands via `scripts/run-cmd.sh`
- Read skill registry and documentation
- Generate artifacts in `_state/runs/<date>/`

**Restrictions:**

- No direct vendor code modification
- No secret commits
- No policy changes without human approval
- All writes logged and auditable

## Authority

### Skill Registry

**Authoritative source:** `skills/MANIFEST.json`

**Change process:**

1. Add/modify skill in `skills/<path>/`
2. Run `scripts/registry/compute-skills-manifest.mjs`
3. Commit both skill and manifest
4. CI validates integrity
5. Merge to `main`

**Policy:**

- External registries are informational only
- No runtime dependencies on external skill sources
- Manifest hashes must match committed content

### Base120 Canonical JSON

**Authoritative source:** `docs/base120.v1.0.canonical.json`

**Change process (Category 3 - requires design review):**

1. Propose changes in issue or decision doc
2. Update canonical JSON
3. Update related skills and documentation
4. Run `scripts/validate-base120-canonical.cjs`
5. Update `docs/base120-skill-map.md`
6. Maintainer approval required
7. Merge to `main`

**Freeze policy:**

- Canonical JSON is frozen once governance hash is provided
- Changes require explicit unfreezing decision
- Version bump required for breaking changes

### Policy Files

**Authoritative sources:**

- `configs/process-policy.allowlist`
- `configs/network-policy.json`
- `configs/secrets-policy.json`
- `configs/experiment-policy.json`

**Change process (Category 2):**

1. Document reason in PR description
2. Update policy file
3. Update related documentation (SECURITY.md, validation-checklist.md)
4. Run relevant lint: `scripts/lint-{network,secrets}-policy.sh`
5. Maintainer review required
6. Merge to `main`

**Policy:**

- Expansion requires explicit justification
- Reduction (tightening) can be routine
- Security-impacting changes require sign-off

### Test Strategy

**Authority:** `AGENTS.md` Testing Guidelines + `scripts/lint-no-ts-tests.sh`

**Current policy:**

- Tests: `.test.mjs` only (no `.test.ts`)
- Runner: Node's built-in `--test`
- Imports: Compiled JS or CJS
- No runtime TypeScript loaders

**Change process (Category 2):**

1. Propose in issue or decision doc
2. Update `AGENTS.md` Testing Guidelines
3. Update lint scripts if needed
4. Update CI workflows
5. Migrate existing tests
6. Maintainer approval required

### Vendor Code

**Authority:** Read-only reference; no modifications

**Location:** `vendor/` (submodules or pins)

**Policy:**

- CI rejects PRs modifying vendor code (except README, UPSTREAM_PINS)
- Updates via `scripts/sync-upstreams.sh` only
- No runtime imports from vendor code
- Informational only

## Change Control

### Branch Protection

**`main` branch:**

- Require PR for all changes
- Require CI passing
- Require maintainer approval for Category 2+
- No force pushes (except security incidents)
- No direct commits

### CI Requirements

**Must pass before merge:**

- All lint checks (`scripts/lint-*.sh`, `scripts/lint-*.mjs`)
- All tests (adapters, router)
- E2E validation (`scripts/e2e-validate.sh --mode offline`)
- No `.test.ts` files (`scripts/lint-no-ts-tests.sh`)
- Skills manifest committed and valid
- No secrets detected

**HUMMBL verification gate (future enforcement):**

After Issue #12 (Base120 refs remediation) merges, the following gate will be enforced via protected branch rules:

- `scripts/verify-hummbl.sh --emit-json` must report `"missing_transformations": 0`
- Current CI workflow warns on missing transformations but does not block
- Artifact with full report uploaded to GitHub Actions (90-day retention)
- JSON schema versioned at [VERIFY_HUMMBL_JSON_SCHEMA_v1.0.0.md](docs/specs/VERIFY_HUMMBL_JSON_SCHEMA_v1.0.0.md)

### Versioning

**Version file:** `VERSION` (single line, `x.y.z` format)

**Increment rules:**

- **Patch (x.y.Z):** Bug fixes, docs, skill additions
- **Minor (x.Y.0):** New features, adapters, runners (backward compatible)
- **Major (X.0.0):** Breaking changes to kernel, runner contracts, or policies

**Process:**

1. Update `VERSION` file
2. Document in `CHANGELOG.md`
3. Tag release: `git tag vX.Y.Z`
4. Push tag: `git push origin vX.Y.Z`

### Deprecation Policy

**Timeline:** Minimum 2 minor versions before removal

**Process:**

1. Mark deprecated in code comments and docs
2. Add deprecation notice to `CHANGELOG.md`
3. Provide migration path
4. Keep deprecated code functional for timeline
5. Remove in breaking (major) version

## Experiment Mode

**Authority:** `configs/experiment-policy.json`

**Requirements:**

- Human approval via checklist (`docs/experiment-approval-checklist.md`)
- Run logging to `_state/runs/<date>/`
- Network/process guards remain active
- Rollback plan documented

**See:** `docs/experiment-mode.md`, `docs/experiment-run-walkthrough.md`

## Conflict Resolution

**Technical disagreements:**

1. Discussion in issue or PR
2. Present alternatives with pros/cons
3. Maintainers decide based on:
   - Alignment with architecture
   - Security impact
   - Maintenance burden
   - Community input

**Governance disputes:**

1. Raise in dedicated issue
2. Reference this document
3. Propose amendment if needed
4. Maintainers vote (simple majority)

## Amendment Process

This governance document can be amended via:

1. Propose changes in issue
2. Create PR updating `GOVERNANCE.md`
3. Mark as Category 3 (design review)
4. Require unanimous maintainer approval
5. Announce changes in `CHANGELOG.md`
6. Effective immediately upon merge

## References

- Contribution guide: `CONTRIBUTING.md`
- Security policy: `SECURITY.md`
- Architecture: `ARCHITECTURE.md`
- Repository guidelines: `AGENTS.md`
- Validation checklist: `docs/validation-checklist.md`
