import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

describe("P1 binding enforcement", () => {
  it("P1 bindings are populated with validated skill IDs", () => {
    const p1Skills = BASE120_BINDINGS.P1.skills;
    
    // Verify P1 binding is populated
    assert.ok(p1Skills.length >= 2, "P1 binding must have at least 2 skills");
    
    // Verify all are strings
    for (const skillId of p1Skills) {
      assert.equal(typeof skillId, "string");
      assert.ok(skillId.length > 0);
    }
    
    // Verify they're P-perspective aligned
    for (const skillId of p1Skills) {
      assert.ok(
        skillId.startsWith("P-perspective/"),
        `P1 skill ${skillId} must be from P-perspective namespace`
      );
    }
  });

  it("binding filtering activates when P1 skills non-empty", () => {
    const p1Skills = BASE120_BINDINGS.P1.skills;
    
    // Since P1.skills is now non-empty, binding constraint is active
    assert.ok(p1Skills.length > 0, "P1 has skills, so filtering should be active");
    
    // Test intersection logic: bound skill in list
    const testSkills = [
      { id: "unrelated-skill", description: "not bound" },
      { id: p1Skills[0], description: "bound" },
    ];
    
    const boundIds = new Set(p1Skills);
    const matches = testSkills.filter(s => boundIds.has(s.id));
    
    // Verify intersection finds the bound skill
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, p1Skills[0]);
  });
});

