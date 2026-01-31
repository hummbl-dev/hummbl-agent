import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateBindings } from "../dist/router/src/base120/validateBindings.js";

describe("validateBindings", () => {
  it("valid bindings return ok=true, errors=[]", () => {
    const bindings = { P1: { skills: ["skill-a", "skill-b"] } };
    const r = validateBindings(bindings);
    assert.equal(r.ok, true);
    assert.deepEqual(r.errors, []);
  });

  it("missing skills array fails with MISSING_SKILLS_ARRAY", () => {
    const bindings = { P1: {} };
    const r = validateBindings(bindings);
    assert.equal(r.ok, false);
    assert.equal(r.errors[0].code, "MISSING_SKILLS_ARRAY");
    assert.equal(r.errors[0].transformation_code, "P1");
  });

  it("non-string skill fails with NON_STRING_SKILL", () => {
    const bindings = { P1: { skills: ["skill-a", 123] } };
    const r = validateBindings(bindings);
    assert.equal(r.ok, false);
    assert.equal(r.errors[0].code, "NON_STRING_SKILL");
  });

  it("duplicate skill fails with DUPLICATE_SKILL", () => {
    const bindings = { P1: { skills: ["skill-a", "skill-a"] } };
    const r = validateBindings(bindings);
    assert.equal(r.ok, false);
    assert.equal(r.errors[0].code, "DUPLICATE_SKILL");
  });

  it("unknown skill id fails with UNKNOWN_SKILL_ID", () => {
    const bindings = { P1: { skills: ["skill-does-not-exist"] } };
    const known = new Set(["skill-a", "skill-b"]);
    const r = validateBindings(bindings, known);
    assert.equal(r.ok, false);
    assert.equal(r.errors[0].code, "UNKNOWN_SKILL_ID");
  });

  it("unknown Base120 code fails with UNKNOWN_BASE120_CODE", () => {
    const bindings = { XX99: { skills: ["skill-a"] } };
    const knownCodes = new Set(["P1", "IN2", "DE3"]);
    const r = validateBindings(bindings, undefined, knownCodes);
    assert.equal(r.ok, false);
    assert.equal(r.errors[0].code, "UNKNOWN_BASE120_CODE");
    assert.equal(r.errors[0].transformation_code, "XX99");
  });
});
