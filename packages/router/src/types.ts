import type { RunState } from "../../kernel/src/state";
import type { Task } from "../../kernel/src/task";
import type {
  RunnerId,
  SkillDefinition,
  SkillId,
  SkillPermissions,
} from "../../skills/registry/src/types";
import type { TupleV1 } from "../../kernel/src/tuples/types";
import type { RunnerCapabilities } from "./capabilities";

export type ToolPolicy = {
  allowedTools: string[];
  denyTools?: string[];
  networkDefault: "none" | "restricted" | "open";
  execDefault: "none" | "allowlisted";
  maxRisk: "low" | "medium" | "high";
};

export type RouterInput = {
  task: Task;
  state: RunState;
  skills: SkillDefinition[];
  availableRunners: RunnerId[];
  capabilities?: RunnerCapabilities[];
  toolPolicy: ToolPolicy;
  llmTuple?: TupleV1;
};

export type RouteStep = {
  id: string;
  kind: "log" | "prompt" | "run-script" | "manual";
  summary: string;
  artifactPaths?: string[];
  command?: { script: string; args: string[] };
  notes?: string;
};

export type RouteExplain = {
  matchedByTags: string[];
  constraintsConsidered: string[];
  runnerRationale: string;
  policyChecks: Array<{ check: string; ok: boolean; reason?: string }>;
  alternatives: Array<{ skillId: SkillId; runner: RunnerId; reason: string }>;
  llmRouting?: {
    vendor: string;
    purpose: string;
    model: string;
    score: number;
    vendorRank: number;
  };
};

export type RouteDecision = {
  skillId: SkillId;
  runner: RunnerId;
  requiredTools: Array<{ toolId: string; scopes?: string[] }>;
  permissions: SkillPermissions;
  steps: RouteStep[];
  explain: RouteExplain;
};

export type RouteError = "NO_SKILL_MATCH" | "POLICY_DENY" | "NO_RUNNER_AVAILABLE";

export type RouteResult =
  | { ok: true; decision: RouteDecision }
  | { ok: false; error: RouteError; explain: RouteExplain };
