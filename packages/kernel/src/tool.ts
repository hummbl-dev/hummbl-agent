import type { EntityMeta, Id } from "./types";

export type ToolPermission = {
  toolId: string;
  allowed: boolean;
  scopes?: string[];
};

export type Tool = {
  id: Id;
  meta: EntityMeta;
  capabilities: string[];
  requiredScopes?: string[];
};
