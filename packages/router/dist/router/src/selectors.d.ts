import type { SkillDefinition, RunnerId } from "../../skills/registry/src/types";
import type { RunnerCapabilities } from "./capabilities";
import type { RouteExplain, ToolPolicy } from "./types";
import type { Task } from "../../kernel/src/task";
import type { RunState } from "../../kernel/src/state";
export type ScoredSkill = {
    skill: SkillDefinition;
    score: number;
    matchedTags: string[];
};
export declare const scoreSkill: (skill: SkillDefinition, task: Task, state: RunState) => ScoredSkill;
export declare const pickBest: (scored: ScoredSkill[]) => ScoredSkill | undefined;
export declare const pickRunner: (skill: SkillDefinition, availableRunners: RunnerId[]) => RunnerId | undefined;
export declare const capabilityCheck: (skill: SkillDefinition, capability: RunnerCapabilities) => {
    ok: boolean;
    checks: RouteExplain["policyChecks"];
};
export declare const pickRunnerWithCapabilities: (skill: SkillDefinition, availableRunners: RunnerId[], capabilities: RunnerCapabilities[]) => RunnerId | undefined;
export declare const policyCheck: (skill: SkillDefinition, toolPolicy: ToolPolicy) => {
    ok: boolean;
    checks: RouteExplain["policyChecks"];
};
//# sourceMappingURL=selectors.d.ts.map