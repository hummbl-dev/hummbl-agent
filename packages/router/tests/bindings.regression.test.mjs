import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { selectLlmSkill } from "../dist/router/src/llm-routing.js";

describe("golden regression: router selection unchanged", () => {
  it("same fixture yields identical selection (no skills case)", () => {
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

    // Golden assertion: exact behavior from baseline
    assert.strictEqual(result.ok, false);
    if (!result.ok) {
      assert.strictEqual(result.reason, "no llm skills available for routing");
    }
  });
});
