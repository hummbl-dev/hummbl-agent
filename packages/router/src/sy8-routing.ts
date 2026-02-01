import type { TupleV1 } from "../../kernel/src/tuples/types";
import type { SkillDefinition } from "../../skills/registry/src/types";

export type Sy8Selection =
  | { ok: true; skillId: string; reason: string }
  | { ok: false; reason: string };

const FAILURE_REASON = "no sy8 skills available for routing";
const BASELINE_REASON = "selected first available sy8 skill";

export function selectSy8Skill(params: {
  tuple: TupleV1;
  skills: SkillDefinition[];
}): Sy8Selection {
  const candidates = params.skills.map((skill) => skill.id);
  if (candidates.length === 0) {
    return { ok: false, reason: FAILURE_REASON };
  }

  return { ok: true, skillId: candidates[0], reason: BASELINE_REASON };
}
