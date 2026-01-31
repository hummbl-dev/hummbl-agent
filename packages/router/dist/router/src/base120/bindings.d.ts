export interface Base120Binding {
    skills: string[];
    constraints?: Record<string, unknown>;
    telemetry?: {
        event: string;
        version: string;
    };
}
export type Base120Bindings = Record<string, Base120Binding>;
export declare const BASE120_BINDINGS: Base120Bindings;
//# sourceMappingURL=bindings.d.ts.map