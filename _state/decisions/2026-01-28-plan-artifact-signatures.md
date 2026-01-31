# Decision: Plan Artifact Signatures (A4)

Date: 2026-01-28  
Owner: Security & Governance working group

## Context

- Claude audit finding **A4** flagged that plan artifacts can be altered between planner, router, and runner without any tamper-evident signature.
- Tuple enforcement and registry integrity now provide object-level guarantees, but they do not cover the higher-level plan bundles exchanged between components.
- We must record a governed intent to add deterministic signatures without rushing an unreviewed implementation.

## Decision

- **Authorize** work to add mandatory signatures to plan artifacts before they leave the planner and verify them in downstream components.
- Limit implementation options to either (a) **HMAC-SHA256** using a per-environment shared secret or (b) **Ed25519** with offline key management. Final selection requires a follow-up proposal.
- No code changes are part of this decision; it simply satisfies the governance requirement that a human-reviewed note exists before implementation.
- Implementation is deferred until key management responsibilities and failure-handling semantics are approved.

This decision unlocks subsequent work to design and implement the actual signing workflow while keeping governance controls documented.
