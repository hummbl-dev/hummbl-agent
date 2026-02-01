import type { TupleV1 } from "../../kernel/src/tuples/types";
import type { SkillDefinition } from "../../skills/registry/src/types";

export type Co5Selection =
  | { ok: true; skillId: string; reason: string }
  | { ok: false; reason: string };

const FAILURE_REASON = "no co5 skills available for routing";
const BASELINE_REASON = "selected first available co5 skill";

export function selectCo5Skill(params: {
  tuple: TupleV1;
  skills: SkillDefinition[];
}): Co5Selection {
  const candidates = params.skills.map((skill) => skill.id);
  if (candidates.length === 0) {
    return { ok: false, reason: FAILURE_REASON };
  }

  return {
    ok: true,
    skillId: candidates[0],
    reason: BASELINE_REASON,
  };
}
