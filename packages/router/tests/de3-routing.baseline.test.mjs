import test from "node:test";
import assert from "node:assert/strict";
import { selectDe3Skill } from "../dist/router/src/de3-routing.js";

test("selectDe3Skill returns error when no DE3 skills exist", () => {
  const result = selectDe3Skill({ skills: [] });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.reason, "no de3 skills available for routing");
  }
});

test("selectDe3Skill selects first eligible DE3 skill", () => {
  const skills = [
    { id: "de3/first" },
    { id: "de3/second" },
  ];

  const result = selectDe3Skill({ skills });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.skill.id, "de3/first");
  }
});
