export const selectDe3Skill = (ctx) => {
    const eligible = ctx.skills.filter((skill) => skill.id.startsWith("de3/"));
    if (eligible.length === 0) {
        return { ok: false, reason: "no de3 skills available for routing" };
    }
    return { ok: true, skill: eligible[0] };
};
//# sourceMappingURL=de3-routing.js.map