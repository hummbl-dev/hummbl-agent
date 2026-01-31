# Codex Runner Configuration

Guidance for using hummbl-agent with the Codex runner.

## Usage

Generate prompt packets:

```bash
scripts/orchestrate.sh
```

Run governed commands (allowlisted only):

```bash
scripts/run-cmd.sh --runner codex -- git status --porcelain
```

Log session actions:

```bash
packages/runners/codex/scripts/log-run.sh "Session start: codex" \
  --artifact "_state/runs/YYYY-MM-DD/prompts/codex-prompt.md" --hash-file
```

## Notes

- Allowlisted executables are defined in `configs/process-policy.allowlist`.
- Prompt templates live under `packages/runners/codex/`.
- Codex CLI can run without API keys by using ChatGPT auth. To force it:
  - add `preferred_auth_method = "chatgpt"` to `~/.codex/config.toml`
- Example config: `configs/codex/config.example.toml`
