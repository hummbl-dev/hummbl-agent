import type { Base120Bindings } from "./bindings";
export type BindingErrorCode = "MISSING_SKILLS_ARRAY" | "DUPLICATE_SKILL" | "NON_STRING_SKILL" | "UNKNOWN_SKILL_ID";
export interface BindingError {
    code: BindingErrorCode;
    message: string;
    transformation_code: string;
    field?: string;
}
export interface ValidationResult {
    ok: boolean;
    errors: BindingError[];
}
export declare function validateBindings(bindings: Base120Bindings, knownSkillIds?: ReadonlySet<string>): ValidationResult;
//# sourceMappingURL=validateBindings.d.ts.map