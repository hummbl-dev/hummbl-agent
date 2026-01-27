export type SkillId = string;

export type SkillStatus = "active" | "experimental" | "deprecated";

export type SkillKind =
  | "primitive_transformation"
  | "integration_pattern"
  | "model_binding";

export type TransformationCode =
  | "T.PER"
  | "T.INV"
  | "T.COM"
  | "T.DEC"
  | "T.REC"
  | "T.SYS"
  | "T.INT";

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

export type SkillNetworkPolicy = {
  domains: string[];
  methods?: Array<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">;
  maxResponseBytes?: number;
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

export type Base120BindingParam = {
  model: string;
  param: string;
  rule: string;
};

export type Base120BindingConstraint = {
  model: string;
  constraint_id: string;
};

export type Base120BindingCondition = {
  model: string;
  condition_id: string;
};

export type Base120Bindings = {
  drives_selection: string[];
  sets_parameters: Base120BindingParam[];
  adds_constraints: Base120BindingConstraint[];
  stop_conditions: Base120BindingCondition[];
};

export type SkillDefinition = {
  id: SkillId;
  name: string;
  summary: string;
  tags: string[];
  version: string;
  skill_kind: SkillKind;
  transformation_code?: TransformationCode;
  base120_bindings: Base120Bindings;
  status: SkillStatus;
  owners: string[];
  inputs: SkillIO[];
  outputs: SkillIO[];
  runnerCompatibility: RunnerId[];
  requiredTools: SkillToolRequirement[];
  requiredSecrets?: string[];
  networkPolicy?: SkillNetworkPolicy;
  permissions: SkillPermissions;
  safety: SkillSafety;
  provenance: SkillProvenance;
  aliases?: string[];
  dependsOnSkills?: SkillId[];
  gates?: string[];
  evidenceBundle?: string[];
  examples: Array<{ title: string; invocation: string; expectedOutcome: string }>;
  deprecatedBy?: SkillId;
  replaces?: SkillId[];
};
