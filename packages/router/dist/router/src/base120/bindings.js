// Pure data-only bindings. No runtime computation.
// Invariant: kernel remains authoritative; router owns zero Base120 state.
export const BASE120_BINDINGS = {
    // Thin vertical slice placeholder: P1 only.
    // Populated in Commit 5.
    P1: {
        skills: [],
        telemetry: {
            event: "router.base120.binding_resolved",
            version: "v1.0.0",
        },
    },
};
//# sourceMappingURL=bindings.js.map