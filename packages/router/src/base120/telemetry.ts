export interface BindingResolutionEventV1 {
  event: "router.base120.binding_resolved";
  version: "v1.0.0";
  transformation_code: string;
  skills_matched: number;
  timestamp: string;
}

export function emitBindingResolution(
  transformation_code: string,
  skills_matched: number
): void {
  const evt: BindingResolutionEventV1 = {
    event: "router.base120.binding_resolved",
    version: "v1.0.0",
    transformation_code,
    skills_matched,
    timestamp: new Date().toISOString(),
  };

  console.log(JSON.stringify(evt));
}
