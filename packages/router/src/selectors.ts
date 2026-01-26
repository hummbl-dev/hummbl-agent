import type { SkillDefinition, SkillId, RunnerId } from "../../skills/registry/src/types";
import type { RunnerCapabilities } from "./capabilities";
import type { RouteExplain, ToolPolicy } from "./types";
import type { Task } from "../../kernel/src/task";
import type { RunState } from "../../kernel/src/state";
import { compareExecPermission, compareNetworkPermission, compareRisk } from "./policies";

export type ScoredSkill = {
  skill: SkillDefinition;
  score: number;
  matchedTags: string[];
};

const normalize = (value: string): string => value.toLowerCase();

export const scoreSkill = (
  skill: SkillDefinition,
  task: Task,
  state: RunState
): ScoredSkill => {
  const taskText = normalize(
    [task.title, task.description]
      .filter((value): value is string => Boolean(value))
      .join(" ")
  );
  const objective = normalize(state.objective || "");

  const tagMatchesTask = skill.tags.filter((tag) =>
    taskText.includes(normalize(tag))
  );
  const tagMatchesObjective = skill.tags.filter((tag) =>
    objective.includes(normalize(tag))
  );

  let score = 0;
  if (tagMatchesTask.length > 0) {
    score += 2;
  }
  if (tagMatchesObjective.length > 0) {
    score += 1;
  }
  if (taskText.includes(normalize(skill.id))) {
    score += 1;
  }

  const matchedTags = Array.from(
    new Set([...tagMatchesTask, ...tagMatchesObjective])
  );

  return { skill, score, matchedTags };
};

export const pickBest = (scored: ScoredSkill[]): ScoredSkill | undefined => {
  if (scored.length === 0) {
    return undefined;
  }
  return [...scored].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.skill.id.localeCompare(b.skill.id);
  })[0];
};

export const pickRunner = (
  skill: SkillDefinition,
  availableRunners: RunnerId[]
): RunnerId | undefined => {
  const intersection = skill.runnerCompatibility.filter((runner) =>
    availableRunners.includes(runner)
  );
  if (intersection.length === 0) {
    return undefined;
  }
  return [...intersection].sort((a, b) => a.localeCompare(b))[0];
};

export const pickRunnerWithCapabilities = (
  skill: SkillDefinition,
  availableRunners: RunnerId[],
  capabilities: RunnerCapabilities[]
): RunnerId | undefined => {
  const capSet = new Set(capabilities.map((cap) => cap.runnerId));
  const compatible = skill.runnerCompatibility.filter((runner) =>
    availableRunners.includes(runner)
  );
  const capable = compatible.filter((runner) => capSet.has(runner));
  if (capable.length > 0) {
    return [...capable].sort((a, b) => a.localeCompare(b))[0];
  }
  return pickRunner(skill, availableRunners);
};

export const policyCheck = (
  skill: SkillDefinition,
  toolPolicy: ToolPolicy
): { ok: boolean; checks: RouteExplain["policyChecks"] } => {
  const checks: RouteExplain["policyChecks"] = [];

  const riskOk = compareRisk(skill.safety.risk, toolPolicy.maxRisk) <= 0;
  checks.push({
    check: "risk",
    ok: riskOk,
    reason: riskOk
      ? undefined
      : `risk ${skill.safety.risk} exceeds max ${toolPolicy.maxRisk}`,
  });

  const requiredTools = skill.requiredTools.map((tool) => tool.toolId);
  const denied = toolPolicy.denyTools ?? [];
  const missingTools = requiredTools.filter(
    (toolId) => !toolPolicy.allowedTools.includes(toolId)
  );
  const deniedTools = requiredTools.filter((toolId) => denied.includes(toolId));

  const allowOk = missingTools.length === 0;
  checks.push({
    check: "tool allowlist",
    ok: allowOk,
    reason: allowOk ? undefined : `missing: ${missingTools.join(", ")}`,
  });

  const denyOk = deniedTools.length === 0;
  checks.push({
    check: "tool denylist",
    ok: denyOk,
    reason: denyOk ? undefined : `denied: ${deniedTools.join(", ")}`,
  });

  const networkOk =
    compareNetworkPermission(skill.permissions.network, toolPolicy.networkDefault) <=
    0;
  checks.push({
    check: "network policy",
    ok: networkOk,
    reason: networkOk
      ? undefined
      : `network ${skill.permissions.network} exceeds ${toolPolicy.networkDefault}`,
  });

  const execOk =
    compareExecPermission(skill.permissions.exec, toolPolicy.execDefault) <= 0;
  checks.push({
    check: "exec policy",
    ok: execOk,
    reason: execOk
      ? undefined
      : `exec ${skill.permissions.exec} exceeds ${toolPolicy.execDefault}`,
  });

  return { ok: checks.every((check) => check.ok), checks };
};
