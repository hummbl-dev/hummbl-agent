# Runner Threat Model (v0.1)

## Scope

Automated vendor execution via runners (OpenAI, Anthropic, xAI, etc.).

## Assets

- Vendor credentials (secret refs)
- Prompts and responses
- Run logs and artifacts
- Policy configuration (network + secrets)

## Trust Boundaries

- Kernel (no secrets, no network)
- Runner (executes, holds secrets in memory)
- Vendor API (external)

## Threats (using **IN10** red team thinking and **IN2** premortem)

### T1 — Secret exfiltration

- Runner logs or artifacts include secrets.
- Mitigation: secret scan + artifact scan + runner redaction.

### T2 — Control plane exposure

- Runner exposes HTTP server or remote control.
- Mitigation: no‑server lint + no daemon processes.

### T3 — Policy bypass

- Runner ignores network policy or uses unauthorized domains.
- Mitigation: policy enforcement in runner + registry lint.

### T4 — Long‑lived sessions

- Persistent connections or background processes.
- Mitigation: one‑shot execution, no daemons.

### T5 — Runner compromise

- Attacker extracts secrets from runner process.
- Mitigation: short‑lived tokens, rotation, no shared keys.

## Required Controls

- Default‑deny network
- Secrets policy allowlist
- Artifact hashing + logging
- Capability‑aware routing
- Short‑lived execution

## Residual Risk

- Vendor model drift
- Side‑channel leakage via model output
- Supply chain changes in vendor SDKs

## Review Cadence

Revisit per vendor onboarding and on any incident.
