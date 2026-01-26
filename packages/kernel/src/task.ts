import type { EntityMeta } from "./types";

export type TaskStatus = "queued" | "running" | "blocked" | "complete" | "failed";

export type Task = EntityMeta & {
  title: string;
  description?: string;
  status: TaskStatus;
  assignedAgentId?: string;
  dependencies?: string[];
  tags?: string[];
};
