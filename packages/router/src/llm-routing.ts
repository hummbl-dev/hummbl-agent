import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { SkillDefinition } from "../../skills/registry/src/types";
import type { TupleV1 } from "../../kernel/src/tuples/types";

const POLICY_PATH = resolve(process.cwd(), "configs/moltbot/llm-routing-policy.json");

export type LlmRoutingPolicy = {
  version: string;
  vendor_default_order: string[];
  purpose_vendor_preference?: Record<string, string[]>;
  vendor_model_hints?: Record<string, string[]>;
};

export type LlmRoutingCandidate = {
  vendor: string;
  skill: SkillDefinition;
  score: number;
  vendorRank: number;
};

const LLM_SKILL_BY_VENDOR: Record<string, string> = {
  anthropic: "llm.anthropic.call",
  openai: "llm.openai.call",
};

let cachedPolicy: LlmRoutingPolicy | null = null;

export const loadLlmRoutingPolicy = (): LlmRoutingPolicy => {
  if (cachedPolicy) return cachedPolicy;
  const json = JSON.parse(readFileSync(POLICY_PATH, "utf8"));
  if (!Array.isArray(json.vendor_default_order)) {
    throw new Error("llm routing policy missing vendor_default_order");
  }
  cachedPolicy = json as LlmRoutingPolicy;
  return cachedPolicy;
};

export type LlmRoutingContext = {
  tuple: TupleV1;
  skills: SkillDefinition[];
  policy?: LlmRoutingPolicy;
};

export type LlmRoutingResult =
  | {
      ok: true;
      best: LlmRoutingCandidate;
      candidates: LlmRoutingCandidate[];
      purpose: string;
      model: string;
    }
  | { ok: false; reason: string };

const normalize = (value: string | undefined): string | undefined =>
  typeof value === "string" ? value.toLowerCase() : undefined;

const getScope = (tuple: TupleV1): Record<string, unknown> => {
  if (typeof tuple.scope === "string" || tuple.scope === undefined) return {};
  return tuple.scope as Record<string, unknown>;
};

export const selectLlmSkill = (ctx: LlmRoutingContext): LlmRoutingResult => {
  const policy = ctx.policy ?? loadLlmRoutingPolicy();
  const skillsById = new Map(ctx.skills.map((skill) => [skill.id, skill]));
  const scope = getScope(ctx.tuple);
  const scopeVendorRaw = normalize(scope.vendor as string | undefined);
  const vendorConstraint =
    scopeVendorRaw && scopeVendorRaw !== "any" ? scopeVendorRaw : undefined;
  const purpose = normalize(scope.purpose as string | undefined) ?? "default";
  const model = (scope.model as string | undefined) ?? "default";

  const candidateVendors = policy.vendor_default_order.filter((vendor) =>
    Boolean(LLM_SKILL_BY_VENDOR[vendor])
  );

  const allVendors = vendorConstraint
    ? candidateVendors.filter((vendor) => vendor === vendorConstraint)
    : candidateVendors;

  const candidates: LlmRoutingCandidate[] = [];

  for (const vendor of allVendors) {
    const skillId = LLM_SKILL_BY_VENDOR[vendor];
    if (!skillId) continue;
    const skill = skillsById.get(skillId);
    if (!skill) continue;

    let score = 100;
    const vendorRank = policy.vendor_default_order.indexOf(vendor);
    if (vendorConstraint && vendor === vendorConstraint) {
      score += 50;
    }

    const prefs = policy.purpose_vendor_preference?.[purpose] ?? [];
    const prefIndex = prefs.indexOf(vendor);
    if (prefIndex === 0) score += 20;
    else if (prefIndex === 1) score += 10;

    const modelSpecified = typeof model === "string" && model !== "default";
    const hints = policy.vendor_model_hints?.[vendor] ?? [];
    if (modelSpecified) {
      if (hints.includes(model)) score += 5;
      else score -= 5;
    }

    candidates.push({ vendor, skill, score, vendorRank });
  }

  if (candidates.length === 0) {
    return { ok: false, reason: "no llm skills available for routing" };
  }

  const best = [...candidates].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.vendorRank !== b.vendorRank) return a.vendorRank - b.vendorRank;
    return a.skill.id.localeCompare(b.skill.id);
  })[0];

  return { ok: true, best, candidates, purpose, model };
};
