# Runner–Kernel Interface (v0.1)

## Purpose

Define a strict contract between the kernel (planning/authorization) and runners (execution), so vendor automation can be enabled without leaking secrets or collapsing trust boundaries.

## Roles

- Kernel: authorizes, plans, and records. No secrets, no network calls.
- Runner: executes approved actions and holds short‑lived secrets in memory only.

## Invariants (applying **SY8** systems thinking and **IN2** premortem)

### RK1 — Kernel never sees raw secrets

- Kernel receives only `secret_ref` identifiers and scope labels.
- Kernel cannot resolve secret values.

### RK2 — Runner executes only approved plan

- Runner may execute only a signed or explicitly authorized plan artifact.
- No autonomous vendor selection or tool escalation.

### RK3 — Artifacts are mandatory

Every execution must emit:

- input artifact (request/prompt/parameters)
- output artifact (response + metadata)
- execution record (runner id, vendor, timestamp, scope, hashes)

### RK4 — No control plane exposure

- Runners have no network control plane (no HTTP admin UI, no public ports).
- Local CLI / one‑shot job invocation only.

## Data Flow (v0.1)

1. Kernel creates plan artifact.
2. Human/policy approval recorded.
3. Runner invoked with:
   - plan artifact path
   - runner id
   - secret_ref (opaque)
   - scope labels
   - ttl_seconds
4. Runner resolves secret in‑memory, executes, logs artifacts.
5. Runner exits.

## Minimal Message Types

### Kernel -> Runner

```json
{
  "plan_id": "plan-123",
  "runner_id": "codex",
  "vendor": "openai",
  "skill_id": "S.vendor.openai.chat.v0.1.0",
  "network_policy": {
    "domains": ["api.openai.com"],
    "methods": ["POST"],
    "maxResponseBytes": 1048576
  },
  "secret_ref": "kv://openai/dev/api_key",
  "scope": ["llm:chat"],
  "ttl_seconds": 900,
  "artifacts": {
    "request": "_state/runs/YYYY-MM-DD/artifacts/req.json",
    "response": "_state/runs/YYYY-MM-DD/artifacts/res.json",
    "log": "_state/runs/YYYY-MM-DD/run.md"
  }
}
```

### Runner -> Kernel (record)

```json
{
  "plan_id": "plan-123",
  "runner_id": "codex",
  "vendor": "openai",
  "request_artifact": "...",
  "response_artifact": "...",
  "exit_code": 0,
  "hashes": {
    "request": "sha256:...",
    "response": "sha256:..."
  }
}
```

## Allowed Transport (v0.1)

- Local CLI invocation
- CI job invocation
- One‑shot process per execution

No long‑lived daemon or remote control plane.

## Enforcement Notes

- Router must reject any skill with `permissions.network != none` unless a runner exists with matching capability.
- Skill registry must require `networkPolicy.domains` and `requiredSecrets` for networked skills.
- Secrets policy must allow any `requiredSecrets` used by networked skills.

## Versioning

This spec is v0.1 and may evolve only via governed decision notes.
