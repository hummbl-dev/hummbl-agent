import test from "node:test";
import assert from "node:assert/strict";
import { applyBinding } from "../dist/router/src/base120/applyBinding.js";

test("applyBinding no-ops when binding empty", () => {
  let emitCalls = 0;
  const emitArgs = [];
  const result = applyBinding({
    transformationCode: "IN2",
    bindingSkills: [],
    candidateSkillIds: ["a", "b"],
    emptyReason: "no candidates",
    emit: (code, matched) => {
      emitCalls += 1;
      emitArgs.push([code, matched]);
    },
  });

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.applied, false);
    assert.equal(result.matchedCount, 0);
    assert.deepEqual(result.candidates, ["a", "b"]);
  }
  assert.equal(emitCalls, 0);
  assert.deepEqual(emitArgs, []);
});

test("applyBinding applies intersection and emits once", () => {
  let emitCalls = 0;
  let lastArgs;
  const result = applyBinding({
    transformationCode: "DE3",
    bindingSkills: ["b", "c"],
    candidateSkillIds: ["a", "b", "c"],
    emptyReason: "no candidates",
    emit: (code, matched) => {
      emitCalls += 1;
      lastArgs = [code, matched];
    },
  });

  assert.equal(emitCalls, 1);
  assert.deepEqual(lastArgs, ["DE3", 2]);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.applied, true);
    assert.equal(result.matchedCount, 2);
    assert.deepEqual(result.candidates, ["b", "c"]);
  }
});

test("applyBinding returns error when applied and no intersection", () => {
  let emitCalls = 0;
  let lastArgs;
  const result = applyBinding({
    transformationCode: "P1",
    bindingSkills: ["x"],
    candidateSkillIds: ["a", "b"],
    emptyReason: "no p1 skills available for routing",
    emit: (code, matched) => {
      emitCalls += 1;
      lastArgs = [code, matched];
    },
  });

  assert.equal(emitCalls, 1);
  assert.deepEqual(lastArgs, ["P1", 0]);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.applied, true);
    assert.equal(result.matchedCount, 0);
    assert.equal(result.reason, "no p1 skills available for routing");
  }
});

test("applyBinding preserves candidate order", () => {
  let emitCalls = 0;
  const result = applyBinding({
    transformationCode: "IN2",
    bindingSkills: ["c", "a"],
    candidateSkillIds: ["a", "b", "c"],
    emptyReason: "no candidates",
    emit: () => {
      emitCalls += 1;
    },
  });

  assert.equal(emitCalls, 1);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.deepEqual(result.candidates, ["a", "c"]);
  }
});
