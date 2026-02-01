import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { selectSy8Skill } from "../dist/router/src/sy8-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const FAILURE_REASON = "no sy8 skills available for routing (binding constrained)";

const withBinding = (skills, fn) => {
  const prev = [...BASE120_BINDINGS.SY8.skills];
  BASE120_BINDINGS.SY8.skills = skills;
  try {
    fn();
  } finally {
    BASE120_BINDINGS.SY8.skills = prev;
  }
};

describe("SY8 binding constraint", () => {
  it("binding empty preserves baseline", () => {
    withBinding([], () => {
      const skills = [
        { id: "sy8/synthesize-summary.v0.1.0", description: "test" },
        { id: "sy8/synthesize-options.v0.1.0", description: "test" },
      ];
      const result = selectSy8Skill({
        tuple: { principal: "user:test", capability: "sy8:synthesize", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, "sy8/synthesize-summary.v0.1.0");
      }
    });
  });

  it("binding populated + intersection selects bound skill", () => {
    withBinding([
      "sy8/synthesize-summary.v0.1.0",
      "sy8/synthesize-options.v0.1.0",
      "sy8/synthesize-recommendation.v0.1.0",
    ], () => {
      const skills = [
        { id: "sy8/synthesize-options.v0.1.0", description: "test" },
        { id: "noise", description: "test" },
      ];
      const result = selectSy8Skill({
        tuple: { principal: "user:test", capability: "sy8:synthesize", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, "sy8/synthesize-options.v0.1.0");
      }
    });
  });

  it("binding populated + no intersection fails", () => {
    withBinding([
      "sy8/synthesize-summary.v0.1.0",
      "sy8/synthesize-options.v0.1.0",
      "sy8/synthesize-recommendation.v0.1.0",
    ], () => {
      const skills = [{ id: "llm/openai", description: "test" }];
      const result = selectSy8Skill({
        tuple: { principal: "user:test", capability: "sy8:synthesize", scope: "test" },
        skills,
      });
      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.reason, FAILURE_REASON);
      }
    });
  });
});
