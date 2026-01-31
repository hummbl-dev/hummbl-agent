# SCRIPTS

## Orchestrate a Session

```bash
scripts/orchestrate.sh
```

### Notes

- Use `--force` to overwrite existing prompts for the day.
- Prompts are written to `_state/runs/YYYY-MM-DD/prompts/`.

## Governed Command Execution

```bash
scripts/run-cmd.sh --runner claude-code -- git status --porcelain
```

### Notes

- Commands must be allowlisted in `configs/process-policy.allowlist`.
- Artifacts are written to `_state/runs/YYYY-MM-DD/artifacts/`.

## Governed OpenAI Responses (wrapper)

```bash
export OPENAI_API_KEY="..."
scripts/run-openai-governed.sh --model gpt-4.1-mini --input "Hello"
```

## Governed Anthropic Messages (wrapper)

```bash
export ANTHROPIC_API_KEY="..."
scripts/run-anthropic-governed.sh --model claude-3-5-sonnet-20241022 --input "Hello"
```

## End-to-End Validation

```bash
# offline-only (no vendor calls)
scripts/e2e-validate.sh --mode offline

# live mode (requires funded API keys)
scripts/e2e-validate.sh --mode live
```

### Notes

- Includes `scripts/test-network-guard.sh` regression checks for request size and rate limiting.

## Lint SITREP

```bash
scripts/lint-sitrep.sh /path/to/SITREP.md
```

## Lint Evidence Logs

```bash
scripts/lint-evidence.sh
```

## Lint Base120 References

```bash
node scripts/validate-base120-refs.js
```

## Lint Network Policy

```bash
scripts/lint-network-policy.sh
```

## Lint Secrets Policy

```bash
scripts/lint-secrets-policy.sh
```

## Lint Secret Scan (repo)

```bash
scripts/lint-secret-scan.sh
```

## Lint Artifact Secrets (tracked)

```bash
scripts/lint-artifact-secrets.sh
```

## Lint No-Server (control plane guard)

```bash
scripts/lint-no-server.sh
```

## Validate Base120 Canonical JSON

```bash
node scripts/validate-base120-canonical.js
```

### Notes

- Validates `model_count`, id coverage, and domain counts.
- Uses `docs/base120.v1.0.canonical.json` by default (override with `BASE120_CANONICAL`).

## Generate Base120 Skill Map

```bash
node scripts/generate-base120-skill-map.js
```

### Notes

- Uses `docs/base120.v1.0.canonical.json` as the canonical source (override with `BASE120_CANONICAL`).
- Writes `docs/base120-skill-map.md`.
- Re-run after changes to `skills/` or `packages/skills/registry/src/registry.json`.

## Lint Base120 Skill Map (drift guard)

```bash
scripts/lint-base120-skill-map.sh
```

## Controlled Experiment Run

```bash
scripts/experiment-run.sh
```
