import type { ProcessCommand, ProcessPolicy } from "./types";

const SECRET_KEY_RE = /SECRET|TOKEN|KEY/i;

export const DEFAULT_POLICY: ProcessPolicy = {
  allowedCmds: [],
  maxStdoutBytes: 1024 * 1024,
  maxStderrBytes: 1024 * 1024,
  defaultTimeoutMs: 30000,
  allowedEnvKeys: [],
};

const isSubpath = (parent: string, child: string): boolean => {
  const rel = require("path").relative(parent, child);
  return rel === "" || (!rel.startsWith("..") && !require("path").isAbsolute(rel));
};

export const validateCommand = (
  policy: ProcessPolicy,
  command: ProcessCommand
): { ok: true } | { ok: false; reason: string } => {
  if (!policy.allowedCmds.includes(command.cmd)) {
    return { ok: false, reason: `cmd not allowed: ${command.cmd}` };
  }

  if (command.cwd) {
    if (!policy.allowedCwds) {
      return { ok: false, reason: "cwd not allowed by policy" };
    }
    if (policy.allowedCwds.length === 0) {
      return { ok: false, reason: "cwd allowlist is empty" };
    }
    const path = require("path");
    const root = process.cwd();
    const resolvedCwd = path.resolve(root, command.cwd);
    const allowed = policy.allowedCwds.some((prefix) =>
      isSubpath(path.resolve(root, prefix), resolvedCwd)
    );
    if (!allowed) {
      return { ok: false, reason: `cwd not allowed: ${command.cwd}` };
    }
  }

  if (command.env) {
    const allowedEnvKeys = policy.allowedEnvKeys ?? [];
    for (const key of Object.keys(command.env)) {
      if (key.includes("\n") || key.includes("\r")) {
        return { ok: false, reason: `env key invalid: ${key}` };
      }
      if (SECRET_KEY_RE.test(key) && !allowedEnvKeys.includes(key)) {
        return { ok: false, reason: `env key forbidden: ${key}` };
      }
    }
  }

  return { ok: true };
};
