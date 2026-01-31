import type { SkillDefinition } from "../../skills/registry/src/types";
export type In2RoutingContext = {
    skills: SkillDefinition[];
};
export type In2RoutingResult = {
    ok: true;
    skill: SkillDefinition;
    reason: string;
} | {
    ok: false;
    reason: string;
};
export declare const isIn2Skill: (id: string) => boolean;
export declare const selectIn2Skill: (ctx: In2RoutingContext) => In2RoutingResult;
//# sourceMappingURL=in2-routing.d.ts.map