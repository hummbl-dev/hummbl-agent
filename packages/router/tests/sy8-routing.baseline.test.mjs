import test from "node:test";
import assert from "node:assert/strict";
import { selectSy8Skill } from "../dist/router/src/sy8-routing.js";

const tuple = {
  principal: "user:test",
  capability: "sy8:synthesize",
  scope: { query: "test" },
};

test("selectSy8Skill returns error when no SY8 skills exist", () => {
  const result = selectSy8Skill({ tuple, skills: [] });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.reason, "no sy8 skills available for routing");
  }
});

test("selectSy8Skill selects first available SY8 skill", () => {
  const skills = [
    { id: "sy8/synthesize-summary.v0.1.0" },
    { id: "sy8/synthesize-options.v0.1.0" },
  ];
  const result = selectSy8Skill({ tuple, skills });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.skillId, "sy8/synthesize-summary.v0.1.0");
    assert.equal(result.reason, "selected first available sy8 skill");
  }
});
