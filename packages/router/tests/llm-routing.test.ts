import test from "node:test";
import assert from "node:assert/strict";

import { route } from "../src/router";
import type { RouterInput } from "../src/types";
import type { SkillDefinition } from "../../skills/registry/src/types";
import type { TupleV1 } from "../../kernel/src/tuples/types";

const ISO = "2026-01-28T00:00:00.000Z";
const PROVENANCE = { sourceType: "test", sourceRef: "router-test" };

const baseSkill = (id: string, vendor: string): SkillDefinition => ({
  id,
  name: id,
  summary: `${vendor} llm wrapper`,
  tags: ["llm", vendor],
  version: "0.1.0",
  skill_kind: "model_binding",
  base120_bindings: {
    drives_selection: [],
    sets_parameters: [],
    adds_constraints: [],
    stop_conditions: [],
  },
  status: "active",
  owners: ["router"],
  inputs: [],
  outputs: [],
  runnerCompatibility: ["claude-code"],
  requiredTools: [],
  permissions: {
    network: "restricted",
    filesystem: "read",
    exec: "none",
    secrets: "read",
  },
  safety: { risk: "low", notes: "" },
  provenance: { ...PROVENANCE, createdAt: ISO },
  aliases: [],
  examples: [],
});

const anthropicSkill = baseSkill("llm.anthropic.call", "anthropic");
const openaiSkill = baseSkill("llm.openai.call", "openai");

const baseInput = (tuple: TupleV1): RouterInput => ({
  task: {
    id: "task-1",
    createdAt: ISO,
    provenance: PROVENANCE,
    title: "llm call",
    status: "queued",
  },
  state: {
    id: "state-1",
    createdAt: ISO,
    provenance: PROVENANCE,
    objective: "test",
    constraints: [],
    nextSteps: [],
    locks: [],
    nextHandoff: [],
    artifacts: [],
  },
  skills: [anthropicSkill, openaiSkill],
  availableRunners: ["claude-code"],
  toolPolicy: {
    allowedTools: [],
    denyTools: [],
    networkDefault: "restricted",
    execDefault: "none",
    maxRisk: "low",
  },
  llmTuple: tuple,
});

const tuple = (scope: Record<string, unknown>): TupleV1 => ({
  principal: "agent:test",
  capability: "llm:call",
  scope,
});

test("routes to anthropic when scope vendor anthropic", () => {
  const input = baseInput(tuple({ vendor: "anthropic" }));
  const res = route(input);
  assert.equal(res.ok, true);
  if (res.ok) {
    assert.equal(res.decision.skillId, "llm.anthropic.call");
    assert.equal(res.decision.explain.llmRouting?.vendor, "anthropic");
  }
});

test("routes to openai when scope vendor openai", () => {
  const input = baseInput(tuple({ vendor: "openai" }));
  const res = route(input);
  assert.equal(res.ok, true);
  if (res.ok) {
    assert.equal(res.decision.skillId, "llm.openai.call");
    assert.equal(res.decision.explain.llmRouting?.vendor, "openai");
  }
});

test("defaults to anthropic for plan purpose", () => {
  const input = baseInput(tuple({ purpose: "plan" }));
  const res = route(input);
  assert.equal(res.ok, true);
  if (res.ok) {
    assert.equal(res.decision.skillId, "llm.anthropic.call");
    assert.equal(res.decision.explain.llmRouting?.purpose, "plan");
  }
});

test("prefers openai for summarize purpose", () => {
  const input = baseInput(tuple({ purpose: "summarize" }));
  const res = route(input);
  assert.equal(res.ok, true);
  if (res.ok) {
    assert.equal(res.decision.skillId, "llm.openai.call");
    assert.equal(res.decision.explain.llmRouting?.purpose, "summarize");
  }
});

test("falls back to vendor default order when purpose unknown", () => {
  const input = baseInput(tuple({ purpose: "unknown", vendor: "any" }));
  const res = route(input);
  assert.equal(res.ok, true);
  if (res.ok) {
    assert.equal(res.decision.skillId, "llm.anthropic.call");
  }
});
