# Claude Code Configuration (Template)

These settings are intended as a starter template for integrating HUMMBL agents and continuous learning hooks with Claude Code.

## Apply

```bash
cp configs/claude-code/settings.json ~/.claude/settings.json
```

## Notes

- Update paths if your Claude Code installation uses a different home directory.
- Hooks reference the continuous-learning-v2 skill hook scripts if installed.
- Claude Code can use your Claude.ai subscription (no API keys) by logging in via `/login`.
- If `ANTHROPIC_API_KEY` is set in your environment or settings, Claude Code will prioritize the API key and bill API usage instead of your subscription.
- To verify which auth is active, run `/status` inside Claude Code.
- If you want to avoid API keys, remove `ANTHROPIC_API_KEY` from your shell and from any `env` block in `~/.claude/settings.json`.
