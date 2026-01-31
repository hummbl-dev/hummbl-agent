import type { SkillDefinition } from "../../skills/registry/src/types";
import { BASE120_BINDINGS } from "./base120/bindings.js";
import { applyBinding } from "./base120/applyBinding.js";
import { emitBindingResolution } from "./base120/telemetry.js";

export type In2RoutingContext = {
  skills: SkillDefinition[];
};

export type In2RoutingResult =
  | { ok: true; skill: SkillDefinition; reason: string }
  | { ok: false; reason: string };

const FAILURE_REASON = "no in2 skills available for routing";
const BASELINE_REASON = "in2 baseline selection";
const CONSTRAINED_REASON = "in2 binding constrained selection";

const isIn2SkillId = (id: string) => id.startsWith("in2/") || id.startsWith("IN2/");

export const isIn2Skill = (id: string) => isIn2SkillId(id);

export const selectIn2Skill = (ctx: In2RoutingContext): In2RoutingResult => {
  const eligible = ctx.skills.filter((skill) => isIn2SkillId(skill.id));
  if (eligible.length === 0) {
    return { ok: false, reason: FAILURE_REASON };
  }

  const bindingResult = applyBinding({
    transformationCode: "IN2",
    bindingSkills: BASE120_BINDINGS.IN2.skills,
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

  return {
    ok: true,
    skill: eligibleFiltered[0],
    reason: bindingResult.applied ? CONSTRAINED_REASON : BASELINE_REASON,
  };
};
