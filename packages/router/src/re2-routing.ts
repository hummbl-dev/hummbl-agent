import type { TupleV1 } from "../../kernel/src/tuples/types";
import type { SkillDefinition } from "../../skills/registry/src/types";
import { BASE120_BINDINGS } from "./base120/bindings.js";
import { applyBinding } from "./base120/applyBinding.js";
import { emitBindingResolution } from "./base120/telemetry.js";

export type Re2Selection =
  | { ok: true; skillId: string; reason: string }
  | { ok: false; reason: string };

const FAILURE_REASON = "no re2 skills available for routing";
const BASELINE_REASON = "selected first available re2 skill";
const CONSTRAINED_REASON = "no re2 skills available for routing (binding constrained)";

export function selectRe2Skill(params: {
  tuple: TupleV1;
  skills: SkillDefinition[];
}): Re2Selection {
  const candidates = params.skills.map((skill) => skill.id);
  if (candidates.length === 0) {
    return { ok: false, reason: FAILURE_REASON };
  }

  const bindingResult = applyBinding({
    transformationCode: "RE2",
    bindingSkills: BASE120_BINDINGS.RE2.skills,
    candidateSkillIds: candidates,
    emptyReason: CONSTRAINED_REASON,
    emit: emitBindingResolution,
  });
  if (!bindingResult.ok) {
    return { ok: false, reason: bindingResult.reason };
  }

  return {
    ok: true,
    skillId: bindingResult.candidates[0],
    reason: BASELINE_REASON,
  };
}
