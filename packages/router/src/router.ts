import type { RouterInput, RouteResult, RouteStep, RouteExplain } from "./types";
import { pickBest, pickRunner, pickRunnerWithCapabilities, policyCheck, scoreSkill } from "./selectors";
import type { SkillDefinition, RunnerId } from "../../skills/registry/src/types";

const scriptBySkill: Record<string, string> = {
  "orchestrate-session": "scripts/orchestrate.sh",
  "run-governed-command": "scripts/run-cmd.sh",
  "sync-upstreams": "scripts/sync-upstreams.sh",
};

const promptPathForRunner = (runner: string): string =>
  `_state/runs/<date>/prompts/${runner}-prompt.md`;

const buildExplain = (input: RouterInput): RouteExplain => ({
  matchedByTags: [],
  constraintsConsidered: input.state.constraints || [],
  runnerRationale: "",
  policyChecks: [],
  alternatives: [],
});

export const route = (input: RouterInput): RouteResult => {
  const explain = buildExplain(input);

  if (!input.skills || input.skills.length === 0) {
    explain.runnerRationale = "no skills provided";
    return { ok: false, error: "NO_SKILL_MATCH", explain };
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

  const policy = policyCheck(best.skill, input.toolPolicy);
  explain.policyChecks = policy.checks;
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

  const steps: RouteStep[] = [
    {
      id: "log-1",
      kind: "log",
      summary: `Route selected: ${best.skill.id}`,
    },
    {
      id: "prompt-1",
      kind: "prompt",
      summary: `Prepare prompt for ${runner}`,
      artifactPaths: [promptPathForRunner(runner)],
    },
  ];

  const script = scriptBySkill[best.skill.id];
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
