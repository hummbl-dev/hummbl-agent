import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { selectRe2Skill } from "../dist/router/src/re2-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const FAILURE_REASON = "no re2 skills available for routing (binding constrained)";
const RE2A = "re2/refine-plan.v0.1.0";
const RE2B = "re2/refine-solution.v0.1.0";
const RE2C = "re2/refine-recommendation.v0.1.0";
const OTHER = "de3/decompose-plan.v0.1.0";

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
      const skills = [{ id: RE2B }, { id: RE2A }];
      const result = selectRe2Skill({
        tuple: { principal: "user:test", capability: "re2:refine", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, RE2B);
      }
    });
  });

  it("binding populated + intersection selects bound skill", () => {
    withBinding([RE2A], () => {
      const skills = [{ id: RE2B }, { id: RE2A }];
      const result = selectRe2Skill({
        tuple: { principal: "user:test", capability: "re2:refine", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, RE2A);
      }
    });
  });

  it("binding populated + no intersection fails", () => {
    withBinding([RE2A], () => {
      const skills = [{ id: OTHER }];
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
