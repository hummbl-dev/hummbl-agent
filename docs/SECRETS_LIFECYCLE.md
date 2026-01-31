# Secrets Lifecycle (v0.1)

## Scope

Vendor credentials used by runners (OpenAI/Anthropic/xAI/etc.). Covers:

- creation
- storage
- access
- rotation
- revocation
- audit

## Invariants (Enforced with **IN2** premortem and **SY8** systems thinking)

### SL1 — No secret material in artifacts

Forbidden locations:

- prompts
- plans
- state files
- logs (stdout/stderr)
- run records
- error traces

Enforcement:

- static secret scan in CI
- artifact scan in CI

### SL2 — Kernel never receives raw secrets

Kernel interfaces accept only:

- secret_ref (opaque identifier)
- scope labels
- ttl_seconds

Kernel cannot resolve secret_ref to a value.

### SL3 — Runner-only retrieval

Only the runner process may resolve secret_ref.
Retrieval occurs at runtime, in-memory only.
Secret values must never be written to disk.

### SL4 — Short-lived access

Runner obtains short-lived access tokens or decrypts locally with a key
not exposed to the kernel.

Default TTL policy:

- interactive/local runs: <= 60 minutes
- CI runs: <= 15 minutes
- production runs: <= 5 minutes (or per-vendor best practice)

### SL5 — Least scope per vendor + per runner

- Separate credentials per vendor.
- Prefer separate credentials per environment (dev/ci/prod).
- No shared master key across runners.

### SL6 — Rotation is routine

Rotation cadence:

- dev: monthly
- ci: monthly or on incident
- prod: weekly/biweekly (or per vendor best practice)

Rotation must be possible without code changes.

### SL7 — Revocation is immediate

Single procedure that:

- disables secret at source (vendor dashboard)
- invalidates local ref (registry update)
- records revocation event artifact

### SL8 — Auditability without disclosure

Store only:

- secret id/ref
- vendor
- scope labels
- creation date
- last rotation date
- expiry policy

Never store:

- raw value
- full token

Optional (ops-only, out of repo):

- sha256(token) fingerprint

## Data Model

### configs/secrets-policy.json

Allowlist and constraints. Must include:

- allowed secrets (names only)
- required prefix (if any)
- policy flags (no logging, no persistence)

### configs/secrets-registry.yaml (refs only)

Example:

```yaml
openai:
  dev:
    secret_ref: "kv://openai/dev/api_key"
    scope: ["llm:chat"]
    max_ttl_seconds: 3600
  ci:
    secret_ref: "kv://openai/ci/api_key"
    scope: ["llm:chat"]
    max_ttl_seconds: 900
```

Notes:

- refs only, no values
- not executable
- can map to OS keychain, 1Password CLI, Vault, or GH Actions secrets

## Runner Contract (Secret Access)

Runner must ensure:

- secrets are not printed
- secrets are not included in exception strings
- secrets are not included in request/response logs

## CI Enforcement (Minimum)

- Static secret scan (repo files)
- Artifact scan (evidence/logs if tracked)
- No-server lint (control-plane guard)

## Incident Response (v0.1)

If a secret is suspected leaked:

1. Revoke at vendor immediately
2. Rotate replacement
3. Invalidate secret_ref mapping
4. Run repo secret scan + artifact scan
5. Record incident artifact (type only, no value)
