export type SkillId = string;

export type SkillStatus = "active" | "experimental" | "deprecated";

// Runner ids are vendor-agnostic; use recommended ids where possible.
export type RunnerId = string;

export const RECOMMENDED_RUNNERS = [
  "claude-code",
  "codex",
  "grok",
  "local-cli",
  "template"
] as const;

export type SkillIO = {
  name: string;
  type: string;
  required?: boolean;
  description: string;
};

export type SkillToolRequirement = {
  toolId: string;
  scopes?: string[];
};

export type SkillPermissions = {
  network: "none" | "restricted" | "open";
  filesystem: "none" | "read" | "write";
  exec: "none" | "allowlisted";
  secrets: "none" | "read";
};

export type SkillSafety = {
  risk: "low" | "medium" | "high";
  notes: string;
};

export type SkillProvenance = {
  createdAt: string;
  updatedAt?: string;
  source: "native" | "vendor-pattern";
  references?: string[];
};

export type SkillDefinition = {
  id: SkillId;
  name: string;
  summary: string;
  tags: string[];
  version: string;
  status: SkillStatus;
  owners: string[];
  inputs: SkillIO[];
  outputs: SkillIO[];
  runnerCompatibility: RunnerId[];
  requiredTools: SkillToolRequirement[];
  permissions: SkillPermissions;
  safety: SkillSafety;
  provenance: SkillProvenance;
  examples: Array<{ title: string; invocation: string; expectedOutcome: string }>;
  deprecatedBy?: SkillId;
  replaces?: SkillId[];
};
