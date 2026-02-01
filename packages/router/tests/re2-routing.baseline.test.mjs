import test from "node:test";
import assert from "node:assert/strict";
import { selectRe2Skill } from "../dist/router/src/re2-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const tuple = {
  principal: "user:test",
  capability: "re2:refine",
  scope: { query: "test" },
};

test("selectRe2Skill returns error when no RE2 skills exist", () => {
  const result = selectRe2Skill({ tuple, skills: [] });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.reason, "no re2 skills available for routing");
  }
});

test("selectRe2Skill selects first available RE2 skill", () => {
  const prev = [...BASE120_BINDINGS.RE2.skills];
  BASE120_BINDINGS.RE2.skills = [];
  try {
    const skills = [
      { id: "re2/refine-plan.v0.1.0" },
      { id: "re2/refine-solution.v0.1.0" },
    ];
    const result = selectRe2Skill({ tuple, skills });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.skillId, "re2/refine-plan.v0.1.0");
      assert.equal(result.reason, "selected first available re2 skill");
    }
  } finally {
    BASE120_BINDINGS.RE2.skills = prev;
  }
}
);
