export function validateBindings(bindings) {
    const errors = [];
    for (const [transformation_code, binding] of Object.entries(bindings)) {
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