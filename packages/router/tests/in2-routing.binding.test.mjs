import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { selectIn2Skill } from "../dist/router/src/in2-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const FAILURE_REASON = "no in2 skills available for routing";

const withBinding = (skills, fn) => {
  const prev = [...BASE120_BINDINGS.IN2.skills];
  BASE120_BINDINGS.IN2.skills = skills;
  try {
    fn();
  } finally {
    BASE120_BINDINGS.IN2.skills = prev;
  }
};

describe("IN2 binding constraint", () => {
  it("binding empty preserves baseline", () => {
    withBinding([], () => {
      const skills = [
        { id: "in2/validate-schema.v0.1.0" },
        { id: "in2/check-invariants.v0.1.0" },
        { id: "in2/verify-artifacts.v0.1.0" },
      ];
      const result = selectIn2Skill({ skills });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skill.id, "in2/validate-schema.v0.1.0");
      }
    });
  });

  it("binding forces selection", () => {
    withBinding(["in2/verify-artifacts.v0.1.0"], () => {
      const skills = [
        { id: "in2/validate-schema.v0.1.0" },
        { id: "in2/check-invariants.v0.1.0" },
        { id: "in2/verify-artifacts.v0.1.0" },
      ];
      const result = selectIn2Skill({ skills });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skill.id, "in2/verify-artifacts.v0.1.0");
      }
    });
  });

  it("binding with no intersection fails", () => {
    withBinding(["in2/zzz"], () => {
      const skills = [{ id: "in2/validate-schema.v0.1.0" }];
      const result = selectIn2Skill({ skills });
      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.reason, FAILURE_REASON);
      }
    });
  });
});
