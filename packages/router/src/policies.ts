import type { SkillSafety, SkillPermissions } from "../../skills/registry/src/types";

export const compareNetworkPermission = (
  a: SkillPermissions["network"],
  b: SkillPermissions["network"]
): number => {
  const order: Record<SkillPermissions["network"], number> = {
    none: 0,
    restricted: 1,
    open: 2,
  };
  return order[a] - order[b];
};

export const compareExecPermission = (
  a: SkillPermissions["exec"],
  b: SkillPermissions["exec"]
): number => {
  const order: Record<SkillPermissions["exec"], number> = {
    none: 0,
    allowlisted: 1,
  };
  return order[a] - order[b];
};

export const compareRisk = (
  a: SkillSafety["risk"],
  b: SkillSafety["risk"]
): number => {
  const order: Record<SkillSafety["risk"], number> = {
    low: 0,
    medium: 1,
    high: 2,
  };
  return order[a] - order[b];
};
