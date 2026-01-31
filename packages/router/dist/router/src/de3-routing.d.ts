import type { SkillDefinition } from "../../skills/registry/src/types";
export type De3RoutingContext = {
    skills: SkillDefinition[];
};
export type De3RoutingResult = {
    ok: true;
    skill: SkillDefinition;
} | {
    ok: false;
    reason: string;
};
export declare const selectDe3Skill: (ctx: De3RoutingContext) => De3RoutingResult;
//# sourceMappingURL=de3-routing.d.ts.map