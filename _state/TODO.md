# TODO

## Immediate

- Add Base120 skills to registry (manual/prompt-only, no execution)
- Add router sample cases and text-only tests
- Validate CI pass on latest changes
- Add Base120 canonical consistency check (model_count, id coverage, domain counts)
- Add CI check to ensure base120-skill-map.md is up to date

## Near-term

- Capability-aware routing integration test cases
- Evidence lint adoption for any canonical evidence logs
- Experiment mode: run first controlled experiment cycle
- Document canonical Base120 JSON governance (decision note + frozen policy)
- Update validation checklist to reference canonical JSON + skill map
- Add Base120 registry cross-checks (bindings valid, 120 model_binding skills)
- Enforce runner capability coverage for exec/network permissions
- Tighten CAPABILITIES.json validation (supports allowed + no duplicates)
- Optional: verify canonical JSON hash when governance hash is provided

## Later

- Optional vendor API adapters with explicit network policy and approvals
- Observation importer integration with evidence hashes in SITREPs
