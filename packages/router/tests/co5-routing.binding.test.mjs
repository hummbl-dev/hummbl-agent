import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { selectCo5Skill } from "../dist/router/src/co5-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const FAILURE_REASON = "no co5 skills available for routing (binding constrained)";
const A = "co5/a";
const B = "co5/b";
const OTHER = "de3/decompose-plan.v0.1.0";

const withBinding = (skills, fn) => {
  const prev = [...BASE120_BINDINGS.CO5.skills];
  BASE120_BINDINGS.CO5.skills = skills;
  try {
    fn();
  } finally {
    BASE120_BINDINGS.CO5.skills = prev;
  }
};

describe("CO5 binding constraint", () => {
  it("binding populated + intersection selects bound skill", () => {
    withBinding([A], () => {
      const skills = [{ id: B }, { id: A }];
      const result = selectCo5Skill({
        tuple: { principal: "user:test", capability: "co5:compose", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, A);
      }
    });
  });

  it("binding populated + no intersection fails", () => {
    withBinding([A], () => {
      const skills = [{ id: OTHER }];
      const result = selectCo5Skill({
        tuple: { principal: "user:test", capability: "co5:compose", scope: "test" },
        skills,
      });
      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.reason, FAILURE_REASON);
      }
    });
  });

  it("binding empty preserves baseline", () => {
    withBinding([], () => {
      const skills = [{ id: B }, { id: A }];
      const result = selectCo5Skill({
        tuple: { principal: "user:test", capability: "co5:compose", scope: "test" },
        skills,
      });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skillId, B);
      }
    });
  });
});
