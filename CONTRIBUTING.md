# CONTRIBUTING

## Welcome

Thank you for contributing to HUMMBL Agent! This document guides you through the contribution process.

## Getting Started

### Prerequisites

- Node.js 20+
- Git
- Familiarity with TypeScript and shell scripting
- Understanding of governed execution concepts

### Setup

```bash
# Clone repository
git clone https://github.com/hummbl-dev/hummbl-agent.git
cd hummbl-agent

# Install dependencies
npm install

# Run validation
bash scripts/e2e-validate.sh --mode offline
```

## Contribution Workflow

### 1. Choose an Issue

- Browse open issues
- Comment to claim an issue
- Ask questions if unclear
- Respect existing assignments

### 2. Create a Branch

```bash
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feat/description
# or
git checkout -b fix/description
```

**Branch naming:**

- `feat/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `test/description` - Test additions
- `chore/description` - Maintenance

### 3. Make Changes

**Follow repository guidelines:** See `AGENTS.md`

**Key rules:**

- Two-space indentation
- Named exports (ESM)
- Tests in `.test.mjs` format only
- Descriptive commit messages
- No secrets committed

### 4. Test Your Changes

```bash
# Run lints
node scripts/lint-esm.mjs
bash scripts/lint-secret-scan.sh
bash scripts/lint-no-ts-tests.sh

# Run tests
node --test packages/adapters/llm/tests/*.test.mjs
node --test packages/router/tests/*.test.mjs

# Full validation
bash scripts/e2e-validate.sh --mode offline
```

**Required:** All checks must pass before PR.

### 5. Commit Changes

**Commit message format:** Conventional Commits

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Tests
- `chore`: Maintenance
- `refactor`: Code restructure

**Scopes:** Top-level directories

- `kernel`, `router`, `adapters`, `skills`, `runners`
- `scripts`, `docs`, `configs`
- `llm`, `communication`, `process`

**Examples:**

```bash
git commit -m "feat(llm): add openai adapter with governed guard"
git commit -m "fix(router): correct vendor selection logic"
git commit -m "docs(security): clarify secret management policy"
git commit -m "test(adapters): add communication adapter tests"
```

### 6. Push and Create PR

```bash
# Push branch
git push origin feat/description

# Create PR on GitHub
# Fill out PR template
```

**PR title:** Same format as commit messages

**PR description must include:**

- Summary of changes
- Linked issue (e.g., "Closes #123")
- Test results (paste e2e-validate output)
- Breaking changes (if any)
- Decision doc reference (for Category 2+ changes)

### 7. Address Review Feedback

- Respond to all comments
- Make requested changes
- Re-run tests after changes
- Push additional commits (no force push during review)
- Request re-review when ready

### 8. Merge

- Maintainer will merge after approval
- Squash or rebase may be used
- Delete branch after merge

## Common Pitfalls

### Don't

- ❌ Commit secrets or API keys
- ❌ Use `.test.ts` files (use `.test.mjs`)
- ❌ Modify vendor code (read-only)
- ❌ Skip CI checks ("will fix later")
- ❌ Force push during review
- ❌ Mix multiple concerns in one PR
- ❌ Use runtime TypeScript loaders

### Do

- ✅ Run `scripts/e2e-validate.sh` before PR
- ✅ Write descriptive commit messages
- ✅ Update tests with code changes
- ✅ Document significant decisions
- ✅ Ask questions if unclear
- ✅ Respond to review feedback promptly
- ✅ Use governed execution patterns

## Getting Help

### Resources

- **Architecture:** `ARCHITECTURE.md`
- **Governance:** `GOVERNANCE.md`
- **Security:** `SECURITY.md`
- **Repository guidelines:** `AGENTS.md`
- **Validation checklist:** `docs/validation-checklist.md`

### Communication

- **Issues:** Ask questions in issue comments
- **Discussions:** Start GitHub Discussion for proposals
- **PRs:** Use PR comments for code-specific questions
- **Security:** Email <security@hummbl.dev> for vulnerabilities

## Recognition

Contributors are recognized in:

- Git commit history
- PR author attribution
- `CHANGELOG.md` (for significant contributions)
- Security advisories (for vulnerability reports)

Thank you for contributing to HUMMBL Agent!
