import type { SkillDefinition } from "../../skills/registry/src/types";

export type In2RoutingContext = {
  skills: SkillDefinition[];
};

export type In2RoutingResult =
  | { ok: true; skill: SkillDefinition; reason: string }
  | { ok: false; reason: string };

const FAILURE_REASON = "no in2 skills available for routing";
const BASELINE_REASON = "in2 baseline selection";

const isIn2SkillId = (id: string) => id.startsWith("in2/") || id.startsWith("IN2/");

export const isIn2Skill = (id: string) => isIn2SkillId(id);

export const selectIn2Skill = (ctx: In2RoutingContext): In2RoutingResult => {
  const eligible = ctx.skills.filter((skill) => isIn2SkillId(skill.id));
  if (eligible.length === 0) {
    return { ok: false, reason: FAILURE_REASON };
  }

  return { ok: true, skill: eligible[0], reason: BASELINE_REASON };
};
