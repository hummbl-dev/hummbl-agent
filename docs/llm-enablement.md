# LLM Enablement (Anthropic)

## Tracked defaults
- `configs/moltbot/llm.anthropic.json` (enabled=false, dry_run=true, empty `allowed_models`)
- No secrets stored; only timeout/model caps

## Local overrides (gitignored)
Create `configs/moltbot/llm.anthropic.local.json` locally with:
```json
{
  "enabled": true,
  "dry_run": false,
  "allowed_models": ["claude-3-5-sonnet-latest"],
  "max_output_tokens_default": 512
}
```

## Required env vars for live calls
- `MOLTBOT_LIVE_LLM_CALLS=1`
- `MOLTBOT_ANTHROPIC_API_KEY=...`

## Rollout steps
1. Enable override with `dry_run=true`, allowlist subset, confirm tuple logs.
2. Set `MOLTBOT_LIVE_LLM_CALLS=1`, flip `dry_run=false`, confirm `model_not_allowed` for non-allowlisted models.
3. Expand allowlist gradually; monitor tuple hashes + outputs.

## Failure codes
- `config_disabled`
- `model_not_allowed`
- `live_guard_disabled`
- `auth_missing`
- `provider_error:<status>`
- `internal_error`
