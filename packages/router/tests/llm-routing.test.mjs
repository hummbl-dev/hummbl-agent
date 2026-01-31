import test from "node:test";
import assert from "node:assert/strict";
import { selectLlmSkill } from "../dist/llm-routing.js";

test("selectLlmSkill returns error when no skills match", () => {
  const mockPolicy = {
    vendor_default_order: ["anthropic", "openai"],
  };

  const context = {
    tuple: {
      version: "v1",
      classification: "llm",
      primitive: "call",
      goal: "Generate summary",
    },
    skills: [],
    policy: mockPolicy,
  };

  const result = selectLlmSkill(context);
  
  assert.strictEqual(result.ok, false);
  if (!result.ok) {
    assert.strictEqual(result.reason, "no llm skills available for routing");
  }
});

