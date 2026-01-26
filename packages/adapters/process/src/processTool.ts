import { spawn } from "child_process";
import type { ProcessCommand, ProcessPolicy, ProcessResult } from "./types";
import { DEFAULT_POLICY, validateCommand } from "./policy";

const TRUNCATION_MARKER = "\n[truncated]\n";

export class ProcessPolicyError extends Error {
  reason: string;
  constructor(reason: string) {
    super(reason);
    this.name = "ProcessPolicyError";
    this.reason = reason;
  }
}

export class ProcessTool {
  private policy: ProcessPolicy;

  constructor(policy?: ProcessPolicy) {
    this.policy = { ...DEFAULT_POLICY, ...(policy ?? {}) };
  }

  async run(command: ProcessCommand): Promise<ProcessResult> {
    const decision = validateCommand(this.policy, command);
    if (!decision.ok) {
      throw new ProcessPolicyError(decision.reason);
    }

    const start = Date.now();
    const timeoutMs = command.timeoutMs ?? this.policy.defaultTimeoutMs;

    return await new Promise<ProcessResult>((resolve, reject) => {
      let timedOut = false;
      const child = spawn(command.cmd, command.args, {
        cwd: command.cwd,
        env: command.env ? { ...process.env, ...command.env } : process.env,
        shell: false,
      });

      let stdoutBuffers: Buffer[] = [];
      let stderrBuffers: Buffer[] = [];
      let stdoutLen = 0;
      let stderrLen = 0;
      let stdoutTruncated = false;
      let stderrTruncated = false;

      const stdoutCap = this.policy.maxStdoutBytes;
      const stderrCap = this.policy.maxStderrBytes;

      const appendStdout = (chunk: Buffer) => {
        if (stdoutCap === undefined) {
          stdoutBuffers.push(chunk);
          stdoutLen += chunk.length;
          return;
        }
        const remaining = stdoutCap - stdoutLen;
        if (remaining <= 0) {
          stdoutTruncated = true;
          return;
        }
        if (chunk.length <= remaining) {
          stdoutBuffers.push(chunk);
          stdoutLen += chunk.length;
          return;
        }
        stdoutBuffers.push(chunk.slice(0, remaining));
        stdoutLen += remaining;
        stdoutTruncated = true;
      };

      const appendStderr = (chunk: Buffer) => {
        if (stderrCap === undefined) {
          stderrBuffers.push(chunk);
          stderrLen += chunk.length;
          return;
        }
        const remaining = stderrCap - stderrLen;
        if (remaining <= 0) {
          stderrTruncated = true;
          return;
        }
        if (chunk.length <= remaining) {
          stderrBuffers.push(chunk);
          stderrLen += chunk.length;
          return;
        }
        stderrBuffers.push(chunk.slice(0, remaining));
        stderrLen += remaining;
        stderrTruncated = true;
      };

      child.stdout?.on("data", appendStdout);
      child.stderr?.on("data", appendStderr);

      const timer = timeoutMs
        ? setTimeout(() => {
            timedOut = true;
            try {
              child.kill("SIGKILL");
            } catch (_) {
              // ignore
            }
          }, timeoutMs)
        : null;

      child.on("error", (err) => {
        if (timer) {
          clearTimeout(timer);
        }
        reject(err);
      });

      child.on("close", (code, signal) => {
        if (timer) {
          clearTimeout(timer);
        }

        const durationMs = Date.now() - start;
        const exitCode = typeof code === "number" ? code : signal ? 128 : -1;

        const stdout = finalizeOutput(stdoutBuffers, stdoutCap, stdoutTruncated);
        const stderr = finalizeOutput(stderrBuffers, stderrCap, stderrTruncated);

        if (timedOut && exitCode === 0) {
          resolve({ exitCode: -1, stdout, stderr, durationMs });
          return;
        }

        resolve({ exitCode, stdout, stderr, durationMs });
      });
    });
  }
}

const finalizeOutput = (
  buffers: Buffer[],
  cap: number | undefined,
  truncated: boolean
): string => {
  let buf = Buffer.concat(buffers);
  if (cap !== undefined && truncated) {
    const marker = Buffer.from(TRUNCATION_MARKER);
    if (cap <= marker.length) {
      buf = marker.slice(0, cap);
    } else {
      buf = Buffer.concat([buf.slice(0, cap - marker.length), marker]);
    }
  }
  return buf.toString("utf8");
};
