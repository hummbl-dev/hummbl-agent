import test from "node:test";
import assert from "node:assert/strict";
import { selectDe3Skill } from "../dist/router/src/de3-routing.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const withEmptyBinding = (fn) => {
  const prev = [...BASE120_BINDINGS.DE3.skills];
  BASE120_BINDINGS.DE3.skills = [];
  try {
    fn();
  } finally {
    BASE120_BINDINGS.DE3.skills = prev;
  }
};

test("selectDe3Skill returns error when no DE3 skills exist", () => {
  withEmptyBinding(() => {
    const result = selectDe3Skill({ skills: [] });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, "no de3 skills available for routing");
    }
  });
});

test("selectDe3Skill selects first eligible DE3 skill", () => {
  withEmptyBinding(() => {
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
});
