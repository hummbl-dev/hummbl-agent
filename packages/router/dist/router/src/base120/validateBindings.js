export function validateBindings(bindings, knownSkillIds, knownBase120Codes) {
    const errors = [];
    for (const [transformation_code, binding] of Object.entries(bindings)) {
        // Validate Base120 code if validation set provided
        if (knownBase120Codes && !knownBase120Codes.has(transformation_code)) {
            errors.push({
                code: "UNKNOWN_BASE120_CODE",
                message: `Unknown Base120 code: ${transformation_code}`,
                transformation_code,
            });
            continue;
        }
        // skills must exist and be an array
        if (!binding || !Array.isArray(binding.skills)) {
            errors.push({
                code: "MISSING_SKILLS_ARRAY",
                message: "Binding missing required skills array",
                transformation_code,
                field: "skills",
            });
            continue;
        }
        // skills must be strings, and not duplicated
        const seen = new Set();
        for (const skill of binding.skills) {
            if (typeof skill !== "string") {
                errors.push({
                    code: "NON_STRING_SKILL",
                    message: "Skill IDs in bindings must be strings",
                    transformation_code,
                    field: "skills",
                });
                continue;
            }
            if (knownSkillIds && !knownSkillIds.has(skill)) {
                errors.push({
                    code: "UNKNOWN_SKILL_ID",
                    message: `Unknown skill ID in binding: ${skill}`,
                    transformation_code,
                });
            }
            if (seen.has(skill)) {
                errors.push({
                    code: "DUPLICATE_SKILL",
                    message: `Duplicate skill in binding: ${skill}`,
                    transformation_code,
                });
            }
            seen.add(skill);
        }
    }
    return { ok: errors.length === 0, errors };
}
//# sourceMappingURL=validateBindings.js.map