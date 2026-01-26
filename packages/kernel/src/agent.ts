import type { EntityMeta } from "./types";

export type AgentIdentity = {
  name: string;
  role?: string;
  model?: string;
};

export type Agent = EntityMeta & {
  identity: AgentIdentity;
  capabilities?: string[];
};
