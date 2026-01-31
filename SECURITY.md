# SECURITY

## Reporting Security Issues

**DO NOT** create public GitHub issues for security vulnerabilities.

Report security issues via:

- Email: <hummbl@proton.me> or <reuben@hummbl.io>
- Private vulnerability disclosure on GitHub
- Direct message to repository maintainers

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested remediation (if any)

**Response time:** We aim to acknowledge within 48 hours and provide initial assessment within 5 business days.

## Supported Versions

Only the latest version on `main` branch receives security updates. This repository follows continuous delivery - we do not maintain separate release branches.

## Security Architecture

### Governed Execution Model

All external process execution flows through governed adapters:

- **Process Policy:** `configs/process-policy.allowlist` restricts executable names
- **Network Policy:** `configs/network-policy.json` controls network access and rate limits
- **Secrets Policy:** `configs/secrets-policy.json` defines allowed secrets and storage patterns

### External Agent Boundary

This repository integrates with external agents (Claude Code, Codex, Grok) under strict boundaries:

**Informational Only:**

- External ecosystems (OpenClaw, ClawHub, MoltBot) are documented for context
- No runtime dependencies on external registries
- Skills registry authority: local `skills/MANIFEST.json` only

**Governed Writes:**

- External agents cannot modify vendor code (`vendor/` protected)
- All writes logged to `_state/runs/<date>/` with provenance
- Process execution requires allowlist approval

### Secrets Management

**Never commit:**

- API keys
- Authentication tokens
- Private keys
- Credentials of any kind

**Required practices:**

- Use `configs/moltbot/*.local.json` templates (gitignored)
- Run `scripts/lint-secret-scan.sh` before commits
- Run `scripts/lint-secrets-policy.sh` to validate policy compliance
- Store production secrets in secure vaults (1Password, Keychain, etc.)

**Detection:**

- CI runs `lint-secret-scan.sh` on every PR
- `lint-artifact-secrets.sh` scans generated artifacts
- Pattern-based detection for common secret formats

### Network Security

**Default posture:** Network access restricted

**Allowlist required for:**

- External API calls (LLM providers, communication channels)
- Registry lookups (local only)
- Any outbound HTTP/HTTPS

**Enforcement:**

- `scripts/lint-network-policy.sh` validates policy
- `scripts/test-network-guard.sh` tests rate limiting
- Adapters implement network guards with dry-run modes

### File System Security

**Protected paths:**

- `vendor/`: Read-only; PRs reject edits (except README, UPSTREAM_PINS)
- `configs/**/*.local.json`: Gitignored secrets storage
- `_state/evidence/`: Governed evidence import only

**Permitted writes:**

- `_state/runs/<date>/`: Run logs and artifacts
- `skills/`: Skill definitions (validated by registry lint)

## Security Checklist for Contributors

Before submitting PRs:

- [ ] No secrets committed (`git log -p | grep -i 'api.key\|token\|password'`)
- [ ] Run `scripts/lint-secret-scan.sh`
- [ ] Run `scripts/lint-secrets-policy.sh`
- [ ] Process policy updated if adding new executables
- [ ] Network policy updated if adding external calls
- [ ] Run `scripts/e2e-validate.sh --mode offline`

## Incident Response

**If secrets are committed:**

1. **Rotate immediately:** Revoke and regenerate all exposed credentials
2. **Notify maintainers:** Report via security contact
3. **Rewrite history:** Use `git filter-branch` or BFG Repo-Cleaner
4. **Force push:** After history rewrite (coordinate with team)
5. **Audit logs:** Check for unauthorized access using exposed credentials

**If vulnerability discovered:**

1. **Isolate:** Document scope and affected systems
2. **Report:** Use private security reporting channel
3. **Patch:** Develop fix in private fork if needed
4. **Test:** Validate fix with security team
5. **Coordinate disclosure:** Agree on timeline with maintainers

## Disclosure Policy

**Coordinated disclosure:**

- 90-day private disclosure period
- Public disclosure after patch available or 90 days (whichever comes first)
- Credit to reporter in CHANGELOG and security advisories

**Exceptions:**

- Active exploitation: Immediate patch and disclosure
- Low-severity issues: May be addressed in public PRs

## Security-Critical Code

Extra scrutiny required for changes to:

- `packages/adapters/process/`: Process execution
- `packages/adapters/llm/`: LLM API calls
- `packages/adapters/communication/`: External messaging
- `scripts/run-cmd.sh`: Governed command execution
- `configs/process-policy.allowlist`: Executable allowlist
- `configs/network-policy.json`: Network boundaries
- `configs/secrets-policy.json`: Secrets management

## References

- Governed execution: `docs/governed-model-call.md`
- Network policy: `configs/network-policy.json`
- Secrets lifecycle: `docs/SECRETS_LIFECYCLE.md`
- Runner threat model: `docs/THREAT_MODEL_RUNNERS.md`
- Validation checklist: `docs/validation-checklist.md`
