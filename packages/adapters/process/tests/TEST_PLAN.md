# TEST PLAN

## Deterministic Checks

- Deny-by-default rejects any command when allowedCmds is empty.
- Allowed command passes when cmd is in allowlist.
- Shell injection attempt blocked (args array only; no shell).
- CWD constraint rejects paths outside allowlist.
- Timeout terminates process and returns non-zero exitCode.
- Stdout/stderr truncation occurs at configured byte caps.
