import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { selectLlmSkill } from "../dist/router/src/llm-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

describe("P1 binding enforcement", () => {
  it("constrains LLM vendor selection to P1-bound skills when matches exist", () => {
    const mockPolicy = {
      vendor_default_order: ["anthropic", "openai"],
    };

    const tuple = {
      version: "v1",
      classification: "llm",
      primitive: "call",
      principal: "user:test",
      capability: "llm:answer",
      scope: { query: "test query" },
    };

    // P1 binding contains both anthropic and openai
    const p1Skills = BASE120_BINDINGS.P1.skills;
    assert.ok(p1Skills.length >= 2, "P1 must have at least 2 LLM vendor skills");
    assert.ok(p1Skills.includes("llm/anthropic"), "P1 must include llm/anthropic");
    assert.ok(p1Skills.includes("llm/openai"), "P1 must include llm/openai");

    // Create minimal but valid skill definitions
    const skills = [
      { id: "llm/anthropic" },
      { id: "llm/openai" },
    ];

    const result = selectLlmSkill({ tuple, skills, policy: mockPolicy });

    // Should succeed and pick one of the bound vendors
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.ok(
        p1Skills.includes(result.best.skill.id),
        `Selected skill ${result.best.skill.id} must be in P1 binding`
      );
    }
  });

  it("constrains to single bound vendor when only one in P1", () => {
    const mockPolicy = {
      vendor_default_order: ["anthropic", "openai"],
    };

    const tuple = {
      version: "v1",
      classification: "llm",
      primitive: "call",
      principal: "user:test",
      capability: "llm:answer",
      scope: { query: "test query" },
    };

    // Temporarily override P1 to only anthropic
    const originalP1 = BASE120_BINDINGS.P1.skills;
    BASE120_BINDINGS.P1.skills = ["llm/anthropic"];

    const skills = [
      { id: "llm/anthropic" },
      { id: "llm/openai" },
    ];

    const result = selectLlmSkill({ tuple, skills, policy: mockPolicy });

    // Restore original binding
    BASE120_BINDINGS.P1.skills = originalP1;

    // Should pick anthropic (the only bound one)
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.best.skill.id, "llm/anthropic");
    }
  });

  it("falls back when no P1 matches exist in available skills", () => {
    const mockPolicy = {
      vendor_default_order: ["anthropic", "openai"],
    };

    const tuple = {
      version: "v1",
      classification: "llm",
      primitive: "call",
      principal: "user:test",
      capability: "llm:answer",
      scope: { query: "test query" },
    };

    // Skills list with NO P1-bound vendors
    const skills = [
      { id: "unrelated-skill" },
    ];

    const result = selectLlmSkill({ tuple, skills, policy: mockPolicy });

    // Should fall back - with no LLM skills, returns error
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, "no llm skills available for routing");
    }
  });
});

