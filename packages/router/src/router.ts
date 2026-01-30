import type { RouterInput, RouteResult, RouteStep, RouteExplain } from "./types";
import { pickBest, pickRunner, pickRunnerWithCapabilities, policyCheck, scoreSkill, capabilityCheck } from "./selectors";
import { selectLlmSkill } from "./llm-routing";
import type { SkillDefinition, RunnerId } from "../../skills/registry/src/types";

const scriptBySkill: Record<string, string> = {
  "S.primitive.T.SYS.orchestrate-session.v0.1.0": "scripts/orchestrate.sh",
  "S.primitive.T.SYS.run-governed-command.v0.1.0": "scripts/run-cmd.sh",
  "S.primitive.T.SYS.sync-upstreams.v0.1.0": "scripts/sync-upstreams.sh",
};

const promptPathForRunner = (runner: string): string =>
  `_state/runs/<date>/prompts/${runner}-prompt.md`;

const buildStepsForSkill = (skill: SkillDefinition, runner: RunnerId): RouteStep[] => {
  const steps: RouteStep[] = [
    {
      id: "log-1",
      kind: "log",
      summary: `Route selected: ${skill.id}`,
    },
    {
      id: "prompt-1",
      kind: "prompt",
      summary: `Prepare prompt for ${runner}`,
      artifactPaths: [promptPathForRunner(runner)],
    },
  ];

  const script = scriptBySkill[skill.id];
  if (script) {
    steps.push({
      id: "run-script-1",
      kind: "run-script",
      summary: `Run ${script}`,
      command: { script, args: [] },
    });
  }

  steps.push({
    id: "manual-1",
    kind: "manual",
    summary: "Update CURRENT_STATE locks and next handoff",
  });

  return steps;
};

const buildExplain = (input: RouterInput): RouteExplain => ({
  matchedByTags: [],
  constraintsConsidered: input.state.constraints || [],
  runnerRationale: "",
  policyChecks: [],
  alternatives: [],
});

const routeLlm = (input: RouterInput, explain: RouteExplain): RouteResult => {
  const llmTuple = input.llmTuple;
  if (!llmTuple) {
    explain.runnerRationale = "llm tuple missing";
    return { ok: false, error: "NO_SKILL_MATCH", explain };
  }
  const llmResult = selectLlmSkill({ tuple: llmTuple, skills: input.skills });
  if (!llmResult.ok) {
    explain.runnerRationale = llmResult.reason;
    return { ok: false, error: "NO_SKILL_MATCH", explain };
  }

  const skill = llmResult.best.skill;
  const runner =
    input.capabilities && input.capabilities.length > 0
      ? pickRunnerWithCapabilities(skill, input.availableRunners, input.capabilities)
      : pickRunner(skill, input.availableRunners);

  if (!runner) {
    explain.runnerRationale = "no runner available for selected llm skill";
    return { ok: false, error: "NO_RUNNER_AVAILABLE", explain };
  }

  let capabilityChecks: RouteExplain["policyChecks"] = [];
  if (input.capabilities && input.capabilities.length > 0) {
    const capMap = new Map(input.capabilities.map((cap) => [cap.runnerId, cap]));
    const cap = capMap.get(runner);
    if (!cap) {
      explain.runnerRationale = `runner ${runner} missing capabilities`;
      return { ok: false, error: "NO_RUNNER_AVAILABLE", explain };
    }
    const capResult = capabilityCheck(skill, cap);
    capabilityChecks = capResult.checks;
    if (!capResult.ok) {
      explain.policyChecks = capabilityChecks;
      explain.runnerRationale = `runner ${runner} fails capability checks`;
      return { ok: false, error: "NO_RUNNER_AVAILABLE", explain };
    }
  }

  const policy = policyCheck(skill, input.toolPolicy);
  if (!policy.ok) {
    explain.policyChecks = policy.checks;
    explain.runnerRationale = `policy denied ${skill.id}`;
    return { ok: false, error: "POLICY_DENY", explain };
  }

  explain.llmRouting = {
    vendor: llmResult.best.vendor,
    purpose: llmResult.purpose,
    model: llmResult.model,
    score: llmResult.best.score,
    vendorRank: llmResult.best.vendorRank,
  };
  explain.policyChecks = [...policy.checks, ...capabilityChecks];
  explain.matchedByTags = [];
  explain.alternatives = [];
  explain.runnerRationale = `llm routing selected ${skill.id}`;

  const steps = buildStepsForSkill(skill, runner);

  return {
    ok: true,
    decision: {
      skillId: skill.id,
      runner,
      requiredTools: skill.requiredTools,
      permissions: skill.permissions,
      steps,
      explain,
    },
  };
};

export const route = (input: RouterInput): RouteResult => {
  const explain = buildExplain(input);

  if (!input.skills || input.skills.length === 0) {
    explain.runnerRationale = "no skills provided";
    return { ok: false, error: "NO_SKILL_MATCH", explain };
  }

  if (input.llmTuple) {
    return routeLlm(input, explain);
  }

  const compatible = input.skills.filter((skill) =>
    skill.runnerCompatibility.some((runner) =>
      input.availableRunners.includes(runner)
    )
  );

  if (compatible.length === 0) {
    explain.runnerRationale = "no compatible runners available";
    return { ok: false, error: "NO_RUNNER_AVAILABLE", explain };
  }

  const scored = compatible.map((skill) => scoreSkill(skill, input.task, input.state));
  const best = pickBest(scored);

  if (!best) {
    explain.runnerRationale = "no skill match after scoring";
    return { ok: false, error: "NO_SKILL_MATCH", explain };
  }

  const runner =
    input.capabilities && input.capabilities.length > 0
      ? pickRunnerWithCapabilities(
          best.skill,
          input.availableRunners,
          input.capabilities
        )
      : pickRunner(best.skill, input.availableRunners);
  if (!runner) {
    explain.runnerRationale = "no runner available for selected skill";
    return { ok: false, error: "NO_RUNNER_AVAILABLE", explain };
  }

  let capabilityChecks: RouteExplain["policyChecks"] = [];
  if (input.capabilities && input.capabilities.length > 0) {
    const capMap = new Map(
      input.capabilities.map((cap) => [cap.runnerId, cap])
    );
    const cap = capMap.get(runner);
    if (!cap) {
      capabilityChecks = [
        {
          check: "runner capabilities",
          ok: false,
          reason: `missing capabilities for ${runner}`,
        },
      ];
      explain.policyChecks = capabilityChecks;
      explain.runnerRationale = `runner ${runner} missing capabilities`;
      return { ok: false, error: "NO_RUNNER_AVAILABLE", explain };
    }
    const capResult = capabilityCheck(best.skill, cap);
    capabilityChecks = capResult.checks;
    if (!capResult.ok) {
      explain.policyChecks = capabilityChecks;
      explain.runnerRationale = `runner ${runner} fails capability checks`;
      return { ok: false, error: "NO_RUNNER_AVAILABLE", explain };
    }
  }

  const policy = policyCheck(best.skill, input.toolPolicy);
  explain.policyChecks = [...policy.checks, ...capabilityChecks];
  explain.matchedByTags = best.matchedTags;
  explain.runnerRationale =
    input.capabilities && input.capabilities.length > 0
      ? `selected ${runner} with capabilities filter`
      : `selected ${runner} from compatible runners`;
  explain.alternatives = buildAlternatives(
    scored,
    best.skill,
    input.availableRunners
  );

  if (!policy.ok) {
    return { ok: false, error: "POLICY_DENY", explain };
  }

  const steps = buildStepsForSkill(best.skill, runner);

  return {
    ok: true,
    decision: {
      skillId: best.skill.id,
      runner,
      requiredTools: best.skill.requiredTools,
      permissions: best.skill.permissions,
      steps,
      explain,
    },
  };
};

const buildAlternatives = (
  scored: Array<{ skill: SkillDefinition; score: number }>,
  selected: SkillDefinition,
  availableRunners: RunnerId[]
): RouteExplain["alternatives"] => {
  const selectedScore = scored.find((s) => s.skill.id === selected.id)?.score ?? 0;
  return scored
    .filter((entry) => entry.skill.id !== selected.id)
    .sort((a, b) => a.skill.id.localeCompare(b.skill.id))
    .map((entry) => {
      const runner =
        pickRunner(entry.skill, availableRunners) ||
        entry.skill.runnerCompatibility[0];
      const reason =
        entry.score < selectedScore ? "lower score" : "tie-breaker";
      return {
        skillId: entry.skill.id,
        runner,
        reason,
      };
    });
};
