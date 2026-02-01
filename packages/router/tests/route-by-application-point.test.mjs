import test from "node:test";
import assert from "node:assert/strict";
import { routeByApplicationPoint } from "../dist/router/src/route-by-application-point.js";

const baseTuple = {
  principal: "test",
  scope: "default",
};

test("routeByApplicationPoint returns null for unknown capability", () => {
  const result = routeByApplicationPoint({
    tuple: { ...baseTuple, capability: "runner:exec" },
    skills: [],
  });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.applicationPoint, null);
    assert.equal(result.reason, "no matching application point for capability");
  }
});

test("routeByApplicationPoint dispatches P1 for llm:*", () => {
  const policy = { vendor_default_order: ["anthropic", "openai"] };
  const result = routeByApplicationPoint({
    tuple: { ...baseTuple, capability: "llm:answer" },
    skills: [{ id: "llm/anthropic" }, { id: "llm/openai" }],
    policy,
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.applicationPoint, "P1");
    assert.ok(["llm/anthropic", "llm/openai"].includes(result.skillId));
  }
});

test("routeByApplicationPoint dispatches DE3 for de3:*", () => {
  const skills = [
    { id: "de3/decompose-plan.v0.1.0" },
    { id: "de3/decompose-task.v0.1.0" },
    { id: "de3/decompose-problem.v0.1.0" },
  ];
  const result = routeByApplicationPoint({
    tuple: { ...baseTuple, capability: "de3:decompose" },
    skills,
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.applicationPoint, "DE3");
    assert.equal(result.skillId, "de3/decompose-plan.v0.1.0");
  }
});

test("routeByApplicationPoint dispatches IN2 for in2:*", () => {
  const skills = [
    { id: "in2/validate-schema.v0.1.0" },
    { id: "in2/check-invariants.v0.1.0" },
    { id: "in2/verify-artifacts.v0.1.0" },
  ];
  const result = routeByApplicationPoint({
    tuple: { ...baseTuple, capability: "in2:validate" },
    skills,
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.applicationPoint, "IN2");
    assert.equal(result.skillId, "in2/validate-schema.v0.1.0");
  }
});

test("routeByApplicationPoint dispatches SY8 for sy8:*", () => {
  const skills = [
    { id: "sy8/synthesize-summary.v0.1.0" },
    { id: "sy8/synthesize-options.v0.1.0" },
    { id: "sy8/synthesize-recommendation.v0.1.0" },
  ];
  const result = routeByApplicationPoint({
    tuple: { ...baseTuple, capability: "sy8:synthesize" },
    skills,
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.applicationPoint, "SY8");
    assert.ok(
      [
        "sy8/synthesize-summary.v0.1.0",
        "sy8/synthesize-options.v0.1.0",
        "sy8/synthesize-recommendation.v0.1.0",
      ].includes(result.skillId)
    );
  }
});
