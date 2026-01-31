# CURRENT_STATE

Date: 2026-01-26

## Objective

Stabilize the governed multi-runner substrate (registry, router, runners, execution) and document safe recursive improvement mode.

## Constraints

- No vendor code modification; vendor repos remain submodules/pins only.
- Governed execution only (allowlisted commands, artifact hashes, run logs).
- No autonomous learning or recursive self-modification without human approval.

## Current plan (next 3 steps)

1. Review imported legacy skills/commands/agents for relevance and governance fit.
2. Decide which legacy items to keep, quarantine further, or retire; document decisions.
3. Expand router tests/sample cases to cover new skill namespaces and usage.

## Workstream locks

- docs + governance updates: hummbl-dev (until 2026-01-26)

## Next handoff

- for: hummbl-dev
  instructions: Vet imported legacy skills/commands/agents; then update governance/docs with retention decisions.

## Snapshot

- Repo: hummbl-agent
- Focus: Multi-agent, multi-model orchestration with governed execution and audit trail
- Vendor policy: submodules/pins only; no edits under vendor/
- Legacy extraction: imported skills/commands/agents from moltbot and everything-claude-code; forks quarantined

## Structure

- packages/kernel: types-only kernel contracts
- packages/skills/registry: canonical skill registry JSON
- packages/router: deterministic routing skeleton
- packages/runners: runner scaffolds (claude-code, codex, grok, template)
- packages/adapters/process: governed process execution adapter
- packages/vendor-bridge: vendor mapping + path bridges
- scripts/: orchestrate, run-cmd, sync-upstreams, lint helpers
- docs/: SITREP schema/lint, Base120→skill template, experiment mode + walkthrough

## Key Configs

- configs/process-policy.allowlist controls governed execution
- configs/experiment-policy.json defines controlled recursive improvement guardrails
- configs/claude-code/settings.json provides plugin enablement + learning hooks (external)

## Health Check

- Skill registry lint and SITREP lint available in scripts/
- Router skeleton + runner templates present

## Gaps / Risks

- No executable Base120 skills yet (registry-only).
- Router selection semantics need tests and first real integration.
- Observations remain external to governance (out-of-repo).
- Imported legacy skills include TODO placeholders and require governance review.

## Next Minimal Additions

- Add Base120 skill entries (manual/prompt-only) to registry.json.
- Add router tests + sample routing cases.
- Align SITREP generation outputs with schema for canonical status.
