export interface BindingResolutionEventV1 {
    event: "router.base120.binding_resolved";
    version: "v1.0.0";
    transformation_code: string;
    skills_matched: number;
    timestamp: string;
}
export declare function emitBindingResolution(transformation_code: string, skills_matched: number): void;
//# sourceMappingURL=telemetry.d.ts.map