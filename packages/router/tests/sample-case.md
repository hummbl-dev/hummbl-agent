# Router Sample Case

## Input
- Task: "Run governed command for status"
- RunState objective: "Verify run logging"
- Skills: registry entries (orchestrate-session, run-governed-command, sync-upstreams)
- Available runners: ["codex", "grok"]
- ToolPolicy: allowlisted exec, network none, maxRisk medium
- Capabilities: include codex + grok

## Expected
- Selected skill: run-governed-command
- Runner: codex (lexicographic tie-break if both capable)
- Steps include:
  - log: "Route selected: run-governed-command"
  - prompt: `_state/runs/<date>/prompts/codex-prompt.md`
  - run-script: `scripts/run-cmd.sh`
  - manual: update CURRENT_STATE locks/hand-off

## Policy Checks
- Risk <= medium
- Network <= none
- Exec <= allowlisted
- Required tool: process allowlisted
