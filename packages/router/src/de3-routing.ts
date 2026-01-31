import type { SkillDefinition } from "../../skills/registry/src/types";

export type De3RoutingContext = {
  skills: SkillDefinition[];
};

export type De3RoutingResult =
  | { ok: true; skill: SkillDefinition }
  | { ok: false; reason: string };

export const selectDe3Skill = (ctx: De3RoutingContext): De3RoutingResult => {
  const eligible = ctx.skills.filter((skill) => skill.id.startsWith("de3/"));
  if (eligible.length === 0) {
    return { ok: false, reason: "no de3 skills available for routing" };
  }
  return { ok: true, skill: eligible[0] };
};
