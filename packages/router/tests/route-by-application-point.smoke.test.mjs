import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { routeByApplicationPoint } from "../dist/router/src/route-by-application-point.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

function snapshotBindings() {
  return {
    P1: [...BASE120_BINDINGS.P1.skills],
    DE3: [...BASE120_BINDINGS.DE3.skills],
    IN2: [...BASE120_BINDINGS.IN2.skills],
  };
}

function restoreBindings(snap) {
  BASE120_BINDINGS.P1.skills = snap.P1;
  BASE120_BINDINGS.DE3.skills = snap.DE3;
  BASE120_BINDINGS.IN2.skills = snap.IN2;
}

function makeTuple(capability) {
  return {
    principal: "user:test",
    capability,
    scope: { query: "test" },
  };
}

function skill(id) {
  return { id, description: "test" };
}

describe("routeByApplicationPoint smoke", () => {
  it("P1: llm:* dispatch selects an LLM vendor within P1 binding", () => {
    const snap = snapshotBindings();
    try {
      const P1_IDS = ["llm/anthropic", "llm/openai"];
      BASE120_BINDINGS.P1.skills = P1_IDS;

      const res = routeByApplicationPoint({
        tuple: makeTuple("llm:answer"),
        skills: [
          skill("llm/openai"),
          skill("llm/anthropic"),
          skill("de3/decompose-plan.v0.1.0"),
        ],
        policy: { vendor_default_order: ["anthropic", "openai"] },
      });

      assert.equal(res.ok, true);
      assert.equal(res.applicationPoint, "P1");
      assert.ok(P1_IDS.includes(res.skillId));
      assert.equal(typeof res.reason, "string");
    } finally {
      restoreBindings(snap);
    }
  });

  it("DE3: de3:* dispatch selects a DE3 skill within DE3 binding", () => {
    const snap = snapshotBindings();
    try {
      const DE3_IDS = [
        "de3/decompose-plan.v0.1.0",
        "de3/decompose-task.v0.1.0",
        "de3/decompose-problem.v0.1.0",
      ];
      BASE120_BINDINGS.DE3.skills = DE3_IDS;

      const res = routeByApplicationPoint({
        tuple: makeTuple("de3:decompose"),
        skills: [
          skill("de3/decompose-problem.v0.1.0"),
          skill("de3/decompose-task.v0.1.0"),
          skill("de3/decompose-plan.v0.1.0"),
          skill("in2/validate-schema.v0.1.0"),
        ],
      });

      assert.equal(res.ok, true);
      assert.equal(res.applicationPoint, "DE3");
      assert.ok(DE3_IDS.includes(res.skillId));
      assert.equal(typeof res.reason, "string");
    } finally {
      restoreBindings(snap);
    }
  });

  it("IN2: in2:* dispatch selects an IN2 skill within IN2 binding", () => {
    const snap = snapshotBindings();
    try {
      const IN2_IDS = [
        "in2/validate-schema.v0.1.0",
        "in2/check-invariants.v0.1.0",
        "in2/verify-artifacts.v0.1.0",
      ];
      BASE120_BINDINGS.IN2.skills = IN2_IDS;

      const res = routeByApplicationPoint({
        tuple: makeTuple("in2:validate"),
        skills: [
          skill("in2/verify-artifacts.v0.1.0"),
          skill("in2/check-invariants.v0.1.0"),
          skill("in2/validate-schema.v0.1.0"),
          skill("llm/openai"),
        ],
      });

      assert.equal(res.ok, true);
      assert.equal(res.applicationPoint, "IN2");
      assert.ok(IN2_IDS.includes(res.skillId));
      assert.equal(typeof res.reason, "string");
    } finally {
      restoreBindings(snap);
    }
  });

  it("Unknown capability returns ok=false with null applicationPoint", () => {
    const res = routeByApplicationPoint({
      tuple: makeTuple("runner:exec"),
      skills: [],
    });

    assert.equal(res.ok, false);
    assert.equal(res.applicationPoint, null);
    assert.equal(res.reason, "no matching application point for capability");
  });
});
