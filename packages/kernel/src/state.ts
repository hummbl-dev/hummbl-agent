import type { EntityMeta, SHA256 } from "./types";

export type RunState = EntityMeta & {
  // RunState is the structured mirror of _state/CURRENT_STATE.md.
  objective: string;
  constraints: string[];
  nextSteps: string[]; // corresponds to "Current plan (next 3 steps)"
  locks: { scope: string; holder: string; until?: string }[];
  nextHandoff: { for: string; instructions: string }[];
  artifacts: { path: string; sha256?: SHA256; purpose?: string }[];
  sourceRef?: string;
};
