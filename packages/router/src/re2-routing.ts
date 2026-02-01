import type { TupleV1 } from "../../kernel/src/tuples/types";
import type { SkillDefinition } from "../../skills/registry/src/types";

export type Re2Selection =
  | { ok: true; skillId: string; reason: string }
  | { ok: false; reason: string };

const FAILURE_REASON = "no re2 skills available for routing";
const BASELINE_REASON = "selected first available re2 skill";

export function selectRe2Skill(params: {
  tuple: TupleV1;
  skills: SkillDefinition[];
}): Re2Selection {
  const candidates = params.skills.map((skill) => skill.id);
  if (candidates.length === 0) {
    return { ok: false, reason: FAILURE_REASON };
  }

  return { ok: true, skillId: candidates[0], reason: BASELINE_REASON };
}
