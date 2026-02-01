import test from "node:test";
import assert from "node:assert/strict";
import { selectRe2Skill } from "../dist/router/src/re2-routing.js";

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
  const skills = [
    { id: "re2/recurse-refine.v0.1.0" },
    { id: "re2/recurse-verify.v0.1.0" },
  ];
  const result = selectRe2Skill({ tuple, skills });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.skillId, "re2/recurse-refine.v0.1.0");
    assert.equal(result.reason, "selected first available re2 skill");
  }
}
);
