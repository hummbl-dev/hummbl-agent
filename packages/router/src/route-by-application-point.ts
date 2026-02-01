import type { TupleV1 } from "../../kernel/src/tuples/types";
import type { SkillDefinition } from "../../skills/registry/src/types";
import { resolveApplicationPoint } from "./base120/applicationPoints.js";
import { selectLlmSkill, type LlmRoutingPolicy } from "./llm-routing.js";
import { selectDe3Skill } from "./de3-routing.js";
import { selectIn2Skill } from "./in2-routing.js";

export type RoutedSelection =
  | {
      ok: true;
      applicationPoint: "P1" | "DE3" | "IN2";
      skillId: string;
      reason: string;
    }
  | {
      ok: false;
      applicationPoint: null | "P1" | "DE3" | "IN2";
      reason: string;
    };

export function routeByApplicationPoint(params: {
  tuple: TupleV1;
  skills: SkillDefinition[];
  policy?: LlmRoutingPolicy;
}): RoutedSelection {
  const ap = resolveApplicationPoint(params.tuple);
  if (!ap.ok) {
    return { ok: false, applicationPoint: null, reason: ap.reason };
  }

  if (ap.code === "P1") {
    const r = selectLlmSkill({
      tuple: params.tuple,
      skills: params.skills,
      policy: params.policy,
    });
    return r.ok
      ? {
          ok: true,
          applicationPoint: "P1",
          skillId: r.best.skill.id,
          reason: "llm routing selection",
        }
      : { ok: false, applicationPoint: "P1", reason: r.reason };
  }

  if (ap.code === "DE3") {
    const r = selectDe3Skill({ skills: params.skills });
    return r.ok
      ? {
          ok: true,
          applicationPoint: "DE3",
          skillId: r.skill.id,
          reason: "de3 routing selection",
        }
      : { ok: false, applicationPoint: "DE3", reason: r.reason };
  }

  const r = selectIn2Skill({ skills: params.skills });
  return r.ok
    ? {
        ok: true,
        applicationPoint: "IN2",
        skillId: r.skill.id,
        reason: r.reason,
      }
    : { ok: false, applicationPoint: "IN2", reason: r.reason };
}
