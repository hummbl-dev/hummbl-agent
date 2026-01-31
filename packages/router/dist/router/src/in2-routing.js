import { BASE120_BINDINGS } from "./base120/bindings.js";
import { emitBindingResolution } from "./base120/telemetry.js";
const FAILURE_REASON = "no in2 skills available for routing";
const BASELINE_REASON = "in2 baseline selection";
const CONSTRAINED_REASON = "in2 binding constrained selection";
const isIn2SkillId = (id) => id.startsWith("in2/") || id.startsWith("IN2/");
export const isIn2Skill = (id) => isIn2SkillId(id);
export const selectIn2Skill = (ctx) => {
    const eligible = ctx.skills.filter((skill) => isIn2SkillId(skill.id));
    if (eligible.length === 0) {
        return { ok: false, reason: FAILURE_REASON };
    }
    const binding = BASE120_BINDINGS.IN2;
    if (binding && binding.skills.length > 0) {
        const boundSkillIds = new Set(binding.skills);
        const filtered = eligible.filter((skill) => boundSkillIds.has(skill.id));
        emitBindingResolution("IN2", filtered.length);
        if (filtered.length === 0) {
            return { ok: false, reason: FAILURE_REASON };
        }
        return { ok: true, skill: filtered[0], reason: CONSTRAINED_REASON };
    }
    return { ok: true, skill: eligible[0], reason: BASELINE_REASON };
};
//# sourceMappingURL=in2-routing.js.map