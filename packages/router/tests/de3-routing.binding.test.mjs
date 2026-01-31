import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { selectDe3Skill } from "../dist/router/src/de3-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const FAILURE_REASON = "no de3 skills available for routing";

const withBinding = (skills, fn) => {
  const prev = [...BASE120_BINDINGS.DE3.skills];
  BASE120_BINDINGS.DE3.skills = skills;
  try {
    fn();
  } finally {
    BASE120_BINDINGS.DE3.skills = prev;
  }
};

describe("DE3 binding constraint", () => {
  it("binding empty preserves baseline", () => {
    withBinding([], () => {
      const skills = [{ id: "de3/a" }, { id: "de3/b" }];
      const result = selectDe3Skill({ skills });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skill.id, "de3/a");
      }
    });
  });

  it("binding forces selection", () => {
    withBinding(["de3/b"], () => {
      const skills = [{ id: "de3/a" }, { id: "de3/b" }];
      const result = selectDe3Skill({ skills });
      assert.equal(result.ok, true);
      if (result.ok) {
        assert.equal(result.skill.id, "de3/b");
      }
    });
  });

  it("binding with no intersection fails", () => {
    withBinding(["de3/zzz"], () => {
      const skills = [{ id: "de3/a" }];
      const result = selectDe3Skill({ skills });
      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.equal(result.reason, FAILURE_REASON);
      }
    });
  });
});
