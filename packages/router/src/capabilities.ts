import type { RunnerId } from "../../skills/registry/src/types";

export type RunnerCapabilities = {
  runnerId: RunnerId;
  mode: "manual" | "api";
  network: "none" | "restricted" | "open";
  exec: "none" | "allowlisted";
  artifacts: "hashed";
  supports: Array<"prompt" | "log" | "dateOverride">;
  notes?: string;
};
