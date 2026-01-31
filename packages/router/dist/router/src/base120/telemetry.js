export function emitBindingResolution(transformation_code, skills_matched) {
    const evt = {
        event: "router.base120.binding_resolved",
        version: "v1.0.0",
        transformation_code,
        skills_matched,
        timestamp: new Date().toISOString(),
    };
    console.log(JSON.stringify(evt));
}
//# sourceMappingURL=telemetry.js.map