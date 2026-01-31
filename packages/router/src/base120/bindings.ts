// Pure data-only bindings. No runtime computation.
// Invariant: kernel remains authoritative; router owns zero Base120 state.

export interface Base120Binding {
  skills: string[];
  constraints?: Record<string, unknown>;
  telemetry?: {
    event: string;
    version: string;
  };
}

export type Base120Bindings = Record<string, Base120Binding>;

export const BASE120_BINDINGS: Base120Bindings = {
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
