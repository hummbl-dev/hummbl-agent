// TODO: Router tests require build infrastructure
// Router is TypeScript-only (no compiled output). Options:
// 1. Add tsc build step to generate packages/router/dist/*.js
// 2. Rewrite router as runtime JS (no types)
// Current: Skipped pending build decision
//
// To enable: Build router to dist/, then import from "../dist/router.js"

import test from "node:test";

test.skip("Router tests pending build infrastructure", () => {
  // Router source is TypeScript-only
  // Per AGENTS.md: no runtime TS loaders allowed
  // Need: compile-first build step
});

