import type { SkillDefinition } from "../../skills/registry/src/types";
import { BASE120_BINDINGS } from "./base120/bindings.js";
import { applyBinding } from "./base120/applyBinding.js";
import { emitBindingResolution } from "./base120/telemetry.js";

export type De3RoutingContext = {
  skills: SkillDefinition[];
};

export type De3RoutingResult =
  | { ok: true; skill: SkillDefinition }
  | { ok: false; reason: string };

const FAILURE_REASON = "no de3 skills available for routing";

export const selectDe3Skill = (ctx: De3RoutingContext): De3RoutingResult => {
  const eligible = ctx.skills.filter((skill) => skill.id.startsWith("de3/"));
  if (eligible.length === 0) {
    return { ok: false, reason: FAILURE_REASON };
  }
  const bindingResult = applyBinding({
    transformationCode: "DE3",
    bindingSkills: BASE120_BINDINGS.DE3.skills,
    candidateSkillIds: eligible.map((skill) => skill.id),
    emptyReason: FAILURE_REASON,
    emit: emitBindingResolution,
  });
  if (!bindingResult.ok) {
    return { ok: false, reason: bindingResult.reason };
  }

  const filteredIds = new Set(bindingResult.candidates);
  const eligibleFiltered = bindingResult.applied
    ? eligible.filter((skill) => filteredIds.has(skill.id))
    : eligible;

  return { ok: true, skill: eligibleFiltered[0] };
};
