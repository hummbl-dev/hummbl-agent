// Pure data-only bindings. No runtime computation.
// Invariant: kernel remains authoritative; router owns zero Base120 state.
export const BASE120_BINDINGS = {
    // Thin vertical slice placeholder: P1 only.
    // Populated in Wave 2A.
    P1: {
        skills: [],
        telemetry: {
            event: "router.base120.binding_resolved",
            version: "v1.0.0",
        },
    },
    // Wave 2A placeholders (empty until validated)
    IN2: { skills: [] },
    DE3: { skills: [] },
    SY8: { skills: [] },
    DE1: { skills: [] },
    RE2: { skills: [] },
    IN10: { skills: [] },
    CO5: { skills: [] },
};
//# sourceMappingURL=bindings.js.map