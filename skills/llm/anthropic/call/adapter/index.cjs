"use strict";

const anthropicCall = require("../../../../../packages/adapters/llm/anthropic/call.cjs");

module.exports = {
  id: "llm.anthropic.call",
  version: "0.1.0",
  async run(input = {}, ctx = {}) {
    const tuple_sha256 = input?.tuple_sha256 || ctx?.tuple_sha256;
    if (typeof tuple_sha256 !== "string" || tuple_sha256.length !== 64) {
      return { ok: false, error: "invalid_input:tuple_sha256", provider: "anthropic", mode: "dry_run" };
    }

    return anthropicCall.run({
      model: input?.model,
      purpose: input?.purpose,
      prompt: input?.prompt,
      max_output_tokens: input?.max_output_tokens,
      tuple_sha256
    });
  }
};
