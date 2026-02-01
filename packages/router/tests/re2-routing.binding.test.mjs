import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { selectRe2Skill } from "../dist/router/src/re2-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const FAILURE_REASON = "no re2 skills available for routing (binding constrained)";

const withBinding = (skills, fn) => {
  const prev = [...BASE120_BINDINGS.RE2.skills];
  BASE120_BINDINGS.RE2.skills = skills;
  try {
    fn();
  } finally {
    BASE120_BINDINGS.RE2.skills = prev;
  }
};

describe("RE2 binding constraint", () => {
  it("binding empty preserves baseline", () => {
    withBinding([], () => {
      const skills = [{ id: "a" }, { id: "b" }];
      const result = selectRe2Skill({
        tuple: { principal: "user:test", capability: "re2:refine", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, "a");
      }
    });
  });

  it("binding populated + intersection selects bound skill", () => {
    withBinding(["x", "a"], () => {
      const skills = [{ id: "a" }, { id: "b" }];
      const result = selectRe2Skill({
        tuple: { principal: "user:test", capability: "re2:refine", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, "a");
      }
    });
  });

  it("binding populated + no intersection fails", () => {
    withBinding(["x", "y"], () => {
      const skills = [{ id: "a" }, { id: "b" }];
      const result = selectRe2Skill({
        tuple: { principal: "user:test", capability: "re2:refine", scope: "test" },
        skills,
      });
      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.reason, FAILURE_REASON);
      }
    });
  });
});
