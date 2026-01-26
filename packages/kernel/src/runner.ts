import type { EntityMeta } from "./types";
import type { ToolPermission } from "./tool";

export type Runner = EntityMeta & {
  name: string;
  allowedTools: ToolPermission[];
  policy?: {
    requireApproval?: boolean;
    maxConcurrency?: number;
    sandbox?: "none" | "restricted" | "strict";
  };
  runtime?: string;
  versionTag?: string;
};
