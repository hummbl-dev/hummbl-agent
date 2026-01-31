# Router Sample Case

## Input

- Task: "Run governed command for status"
- RunState objective: "Verify run logging"
- Skills: registry entries (S.primitive.T.SYS.orchestrate-session.v0.1.0, S.primitive.T.SYS.run-governed-command.v0.1.0, S.primitive.T.SYS.sync-upstreams.v0.1.0)
- Available runners: ["codex", "grok"]
- ToolPolicy: allowlisted exec, network none, maxRisk medium
- Capabilities: include codex + grok

## Expected

- Selected skill: S.primitive.T.SYS.run-governed-command.v0.1.0
- Runner: codex (lexicographic tie-break if both capable)
- Steps include:
  - log: "Route selected: S.primitive.T.SYS.run-governed-command.v0.1.0"
  - prompt: `_state/runs/<date>/prompts/codex-prompt.md`
  - run-script: `scripts/run-cmd.sh`
  - manual: update CURRENT_STATE locks/hand-off

## Policy Checks

- Risk <= medium
- Network <= none
- Exec <= allowlisted
- Required tool: process allowlisted
