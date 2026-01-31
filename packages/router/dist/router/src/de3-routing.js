import { BASE120_BINDINGS } from "./base120/bindings.js";
import { emitBindingResolution } from "./base120/telemetry.js";
const FAILURE_REASON = "no de3 skills available for routing";
export const selectDe3Skill = (ctx) => {
    const eligible = ctx.skills.filter((skill) => skill.id.startsWith("de3/"));
    if (eligible.length === 0) {
        return { ok: false, reason: FAILURE_REASON };
    }
    const binding = BASE120_BINDINGS.DE3;
    if (binding && binding.skills.length > 0) {
        const boundSkillIds = new Set(binding.skills);
        const filtered = eligible.filter((skill) => boundSkillIds.has(skill.id));
        emitBindingResolution("DE3", filtered.length);
        if (filtered.length === 0) {
            return { ok: false, reason: FAILURE_REASON };
        }
        return { ok: true, skill: filtered[0] };
    }
    return { ok: true, skill: eligible[0] };
};
//# sourceMappingURL=de3-routing.js.map