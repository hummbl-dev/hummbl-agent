# WORKFLOWS

## ci.yml
Main CI pipeline enforcing governance, lints, and test policy. Runs on all PRs and main branch pushes.

**Key checks:**
- Guardrails: config safety, vendor isolation, VERSION format
- Base120: refs validation, canonical JSON, skill map
- Skills: manifest consistency, registry integrity
- Tests: adapter tests (`.test.mjs` only), router tests (skipped pending build)
- Security: secrets policy, network policy, artifact scanning
- Governance: state format, runner capabilities, evidence logs

## kernel-tuples.yml
Tuple validation and kernel type-checking. Ensures kernel contracts remain strict and tuple test vectors are valid.
