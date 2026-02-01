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
        { id: "sy8/x", description: "test" },
        { id: "sy8/y", description: "test" },
      ];
      const result = selectSy8Skill({
        tuple: { principal: "user:test", capability: "sy8:synthesize", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, "sy8/x");
      }
    });
  });

  it("binding populated + intersection selects bound skill", () => {
    withBinding(["sy8/a", "sy8/b"], () => {
      const skills = [
        { id: "sy8/b", description: "test" },
        { id: "noise", description: "test" },
      ];
      const result = selectSy8Skill({
        tuple: { principal: "user:test", capability: "sy8:synthesize", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, "sy8/b");
      }
    });
  });

  it("binding populated + no intersection fails", () => {
    withBinding(["sy8/a"], () => {
      const skills = [{ id: "sy8/b", description: "test" }];
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
