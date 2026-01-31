import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { BASE120_BINDINGS } from "./base120/bindings";
const POLICY_PATH = resolve(process.cwd(), "configs/moltbot/llm-routing-policy.json");
const LLM_SKILL_BY_VENDOR = {
    anthropic: "llm.anthropic.call",
    openai: "llm.openai.call",
};
let cachedPolicy = null;
export const loadLlmRoutingPolicy = () => {
    if (cachedPolicy)
        return cachedPolicy;
    const json = JSON.parse(readFileSync(POLICY_PATH, "utf8"));
    if (!Array.isArray(json.vendor_default_order)) {
        throw new Error("llm routing policy missing vendor_default_order");
    }
    cachedPolicy = json;
    return cachedPolicy;
};
const normalize = (value) => typeof value === "string" ? value.toLowerCase() : undefined;
const getScope = (tuple) => {
    if (typeof tuple.scope === "string" || tuple.scope === undefined)
        return {};
    return tuple.scope;
};
export const selectLlmSkill = (ctx) => {
    const policy = ctx.policy ?? loadLlmRoutingPolicy();
    // Thin vertical slice: apply P1 binding if non-empty
    let candidateSkills = ctx.skills;
    const p1Binding = BASE120_BINDINGS.P1;
    if (p1Binding && p1Binding.skills.length > 0) {
        const boundSkillIds = new Set(p1Binding.skills);
        const filtered = ctx.skills.filter((s) => boundSkillIds.has(s.id));
        // Safe fallback: if intersection empty, use original skills
        if (filtered.length > 0) {
            candidateSkills = filtered;
            // Emit telemetry event for binding resolution
            if (p1Binding.telemetry) {
                console.log(JSON.stringify({
                    event: p1Binding.telemetry.event,
                    version: p1Binding.telemetry.version,
                    transformation_code: "P1",
                    skills_matched: filtered.length,
                    timestamp: new Date().toISOString(),
                }));
            }
        }
    }
    const skillsById = new Map(candidateSkills.map((skill) => [skill.id, skill]));
    const scope = getScope(ctx.tuple);
    const scopeVendorRaw = normalize(scope.vendor);
    const vendorConstraint = scopeVendorRaw && scopeVendorRaw !== "any" ? scopeVendorRaw : undefined;
    const purpose = normalize(scope.purpose) ?? "default";
    const model = scope.model ?? "default";
    const candidateVendors = policy.vendor_default_order.filter((vendor) => Boolean(LLM_SKILL_BY_VENDOR[vendor]));
    const allVendors = vendorConstraint
        ? candidateVendors.filter((vendor) => vendor === vendorConstraint)
        : candidateVendors;
    const candidates = [];
    for (const vendor of allVendors) {
        const skillId = LLM_SKILL_BY_VENDOR[vendor];
        if (!skillId)
            continue;
        const skill = skillsById.get(skillId);
        if (!skill)
            continue;
        let score = 100;
        const vendorRank = policy.vendor_default_order.indexOf(vendor);
        if (vendorConstraint && vendor === vendorConstraint) {
            score += 50;
        }
        const prefs = policy.purpose_vendor_preference?.[purpose] ?? [];
        const prefIndex = prefs.indexOf(vendor);
        if (prefIndex === 0)
            score += 20;
        else if (prefIndex === 1)
            score += 10;
        const modelSpecified = typeof model === "string" && model !== "default";
        const hints = policy.vendor_model_hints?.[vendor] ?? [];
        if (modelSpecified) {
            if (hints.includes(model))
                score += 5;
            else
                score -= 5;
        }
        candidates.push({ vendor, skill, score, vendorRank });
    }
    if (candidates.length === 0) {
        return { ok: false, reason: "no llm skills available for routing" };
    }
    const best = [...candidates].sort((a, b) => {
        if (b.score !== a.score)
            return b.score - a.score;
        if (a.vendorRank !== b.vendorRank)
            return a.vendorRank - b.vendorRank;
        return a.skill.id.localeCompare(b.skill.id);
    })[0];
    return { ok: true, best, candidates, purpose, model };
};
//# sourceMappingURL=llm-routing.js.map