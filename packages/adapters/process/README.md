# Process Adapter (Deny-by-Default)

Minimal process execution tool with allowlist policy and strict safety rules.

## Security Model

- Deny-by-default: no commands allowed unless explicitly listed.
- No shell execution; spawn with args only.
- Optional cwd allowlist and env-key sanitization.

## Non-Goals

- No sandboxing beyond allowlists.
- No automatic dependency installation.
- No remote execution.

## Configure Allowlist

```ts
import { ProcessTool } from "./src/processTool";

const tool = new ProcessTool({
  allowedCmds: ["git", "node"],
  allowedCwds: ["."],
  defaultTimeoutMs: 30000,
});
```

## Example Usage

```ts
const result = await tool.run({
  cmd: "git",
  args: ["status", "--porcelain"],
  cwd: ".",
});
```

## Defaults

- maxStdoutBytes: 1048576
- maxStderrBytes: 1048576
- defaultTimeoutMs: 30000
