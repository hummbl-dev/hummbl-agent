import type { SkillDefinition } from "../../skills/registry/src/types";
import type { TupleV1 } from "../../kernel/src/tuples/types";
export type LlmRoutingPolicy = {
    version: string;
    vendor_default_order: string[];
    purpose_vendor_preference?: Record<string, string[]>;
    vendor_model_hints?: Record<string, string[]>;
};
export type LlmRoutingCandidate = {
    vendor: string;
    skill: SkillDefinition;
    score: number;
    vendorRank: number;
};
export declare const loadLlmRoutingPolicy: () => LlmRoutingPolicy;
export type LlmRoutingContext = {
    tuple: TupleV1;
    skills: SkillDefinition[];
    policy?: LlmRoutingPolicy;
};
export type LlmRoutingResult = {
    ok: true;
    best: LlmRoutingCandidate;
    candidates: LlmRoutingCandidate[];
    purpose: string;
    model: string;
} | {
    ok: false;
    reason: string;
};
export declare const selectLlmSkill: (ctx: LlmRoutingContext) => LlmRoutingResult;
//# sourceMappingURL=llm-routing.d.ts.map