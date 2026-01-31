# LLM Enablement (applying **P1** framing and **SY8** systems thinking)

## Anthropic Defaults

- `configs/moltbot/llm.anthropic.json` (enabled=false, dry_run=true, empty `allowed_models`)
- No secrets stored; only timeout/model caps

### Anthropic local override (gitignored)

Create `configs/moltbot/llm.anthropic.local.json` locally with:

```json
{
  "enabled": true,
  "dry_run": false,
  "allowed_models": ["claude-3-5-sonnet-latest"],
  "max_output_tokens_default": 512
}
```

### Anthropic env vars for live calls

- `MOLTBOT_LIVE_LLM_CALLS=1`
- `MOLTBOT_ANTHROPIC_API_KEY=...`

### Anthropic rollout steps

1. Enable override with `dry_run=true`, allowlist subset, confirm tuple logs.
2. Set `MOLTBOT_LIVE_LLM_CALLS=1`, flip `dry_run=false`, confirm `model_not_allowed` for non-allowlisted models.
3. Expand allowlist gradually; monitor tuple hashes + outputs.

## OpenAI Defaults

- `configs/moltbot/llm.openai.json` (enabled=false, dry_run=true, empty `allowed_models`)
- Mirror of Anthropic safeguards (allowlist, token env, live guard)

### OpenAI local override

Create `configs/moltbot/llm.openai.local.json`:

```json
{
  "enabled": true,
  "dry_run": false,
  "allowed_models": ["gpt-4.1-mini"],
  "max_output_tokens_default": 512
}
```

### OpenAI env vars

- `MOLTBOT_LIVE_LLM_CALLS=1` (same guard)
- `MOLTBOT_OPENAI_API_KEY=...`

### OpenAI rollout steps

Same as Anthropic: dry-run first, then require env + allowlist before live.

## Routing policy

- Deterministic selection lives in `configs/moltbot/llm-routing-policy.json`.
- `scope.vendor` inside the Tuple determines which vendor(s) are eligible (`anthropic`, `openai`, or `any`).
- `scope.purpose` influences preference order via `purpose_vendor_preference`.
- `scope.model` is compared against `vendor_model_hints` for additional scoring, but runtime adapters still enforce their own allowlists.

## Failure codes (both vendors)

- `config_disabled`
- `model_not_allowed`
- `live_guard_disabled`
- `auth_missing`
- `provider_error:<status>`
- `internal_error`
