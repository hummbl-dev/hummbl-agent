import test from "node:test";
import assert from "node:assert/strict";
import { resolveApplicationPoint } from "../dist/router/src/base120/applicationPoints.js";

const assertOk = (capability, code) => {
  const result = resolveApplicationPoint({ capability });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.code, code);
    assert.equal(typeof result.reason, "string");
  }
};

const assertNull = (capability) => {
  const tuple = capability === undefined ? {} : { capability };
  const result = resolveApplicationPoint(tuple);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.code, null);
    assert.equal(result.reason, "no matching application point for capability");
  }
};

test("resolveApplicationPoint maps llm:* to P1", () => {
  assertOk("llm:answer", "P1");
  assertOk("llm:call", "P1");
});

test("resolveApplicationPoint maps de3:* to DE3", () => {
  assertOk("de3:select", "DE3");
  assertOk("de3:decompose", "DE3");
});

test("resolveApplicationPoint maps in2:* to IN2", () => {
  assertOk("in2:validate", "IN2");
  assertOk("in2:verify", "IN2");
});

test("resolveApplicationPoint maps sy8:* to SY8", () => {
  assertOk("sy8:synthesize", "SY8");
});

test("resolveApplicationPoint maps re2:* to RE2", () => {
  assertOk("re2:refine", "RE2");
});

test("resolveApplicationPoint returns null for unsupported capability", () => {
  assertNull("runner:exec");
  assertNull("");
  assertNull(undefined);
});
