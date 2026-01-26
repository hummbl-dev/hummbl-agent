export type ProcessCommand = {
  cmd: string;
  args: string[];
  cwd?: string;
  env?: Record<string, string>;
  timeoutMs?: number;
};

export type ProcessResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
};

export type ProcessPolicy = {
  allowedCmds: string[];
  allowedCwds?: string[];
  maxStdoutBytes?: number;
  maxStderrBytes?: number;
  defaultTimeoutMs?: number;
  allowedEnvKeys?: string[];
};
