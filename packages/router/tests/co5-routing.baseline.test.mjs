import test from "node:test";
import assert from "node:assert/strict";
import { selectCo5Skill } from "../dist/router/src/co5-routing.js";

const tuple = {
  principal: "user:test",
  capability: "co5:compose",
  scope: { query: "test" },
};

test("selectCo5Skill returns error when no CO5 skills exist", () => {
  const result = selectCo5Skill({ tuple, skills: [] });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.reason, "no co5 skills available for routing");
  }
});

test("selectCo5Skill selects first available CO5 skill", () => {
  const skills = [{ id: "a" }, { id: "b" }];
  const result = selectCo5Skill({ tuple, skills });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.skillId, "a");
  }
});
