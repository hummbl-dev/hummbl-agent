import test from "node:test";
import assert from "node:assert/strict";
import { selectIn2Skill } from "../dist/router/src/in2-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const withEmptyBinding = (fn) => {
  const prev = [...BASE120_BINDINGS.IN2.skills];
  BASE120_BINDINGS.IN2.skills = [];
  try {
    fn();
  } finally {
    BASE120_BINDINGS.IN2.skills = prev;
  }
};

test("selectIn2Skill returns error when no IN2 skills exist", () => {
  withEmptyBinding(() => {
    const result = selectIn2Skill({ skills: [] });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, "no in2 skills available for routing");
    }
  });
});

test("selectIn2Skill selects first eligible IN2 skill", () => {
  withEmptyBinding(() => {
    const skills = [
      { id: "in2/first" },
      { id: "IN2/second" },
    ];

    const result = selectIn2Skill({ skills });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.skill.id, "in2/first");
      assert.equal(result.reason, "in2 baseline selection");
    }
  });
});
