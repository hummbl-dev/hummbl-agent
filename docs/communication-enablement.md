# Communication Enablement (Slack & Discord) (using **P1** and **SY8**)

## Defaults (tracked in repo)

- `configs/moltbot/communication.slack.json`
- `configs/moltbot/communication.discord.json`

Both files are committed with:

- `enabled: false`
- `dry_run: true`
- empty `allowed_channel_ids`
- non-secret settings only (timeout, token env name)

This guarantees that cloning the repo never sends real messages.

## Local overrides (not committed)

Create `.local` overrides to enable skills on your machine:

- `configs/moltbot/communication.slack.local.json`
- `configs/moltbot/communication.discord.local.json`

Example:

```json
{
  "enabled": true,
  "dry_run": false,
  "allowed_channel_ids": ["C123456"],
  "timeout_ms": 8000
}
```

These files are git-ignored and merged over the tracked config at runtime.

## Required environment variables for live sends

- `MOLTBOT_LIVE_SEND=1` (global live-send interlock)
- `MOLTBOT_SLACK_BOT_TOKEN=...`
- `MOLTBOT_DISCORD_BOT_TOKEN=...`

If `MOLTBOT_LIVE_SEND` is anything other than `"1"`, adapters return `live_guard_disabled` even when configs request live mode.

## Recommended rollout procedure

1. **Dry run check**  
   - Set `enabled=true`, keep `dry_run=true`, add a small `allowed_channel_ids` list.  
   - Verify tuple hashes + audit logs without hitting providers.

2. **Live guard prep**  
   - Export bot tokens (`MOLTBOT_SLACK_BOT_TOKEN`, `MOLTBOT_DISCORD_BOT_TOKEN`).  
   - Set `MOLTBOT_LIVE_SEND=1`.  
   - Switch `dry_run` to `false` in the `.local` override.

3. **Incremental expansion**  
   - Start with a single allowlisted channel.  
   - Monitor responses + tuple hashes.  
   - Expand allowlists slowly.

## Failure codes (stable)

- `config_disabled`
- `channel_not_allowed`
- `live_guard_disabled`
- `auth_missing`
- `provider_error:<status>`
- `timeout`
- `internal_error`

Refer to `packages/adapters/communication/{slack,discord}/send-message.cjs` for full semantics.
