"use strict";

const openaiCall = require("../../../../../packages/adapters/llm/openai/call.cjs");

module.exports = {
  id: "llm.openai.call",
  version: "0.1.0",
  async run(input = {}, ctx = {}) {
    const tuple_sha256 = input?.tuple_sha256 || ctx?.tuple_sha256;
    if (typeof tuple_sha256 !== "string" || tuple_sha256.length !== 64) {
      return { ok: false, error: "invalid_input:tuple_sha256", provider: "openai", mode: "dry_run" };
    }

    return openaiCall.run({
      model: input?.model,
      purpose: input?.purpose,
      prompt: input?.prompt,
      max_output_tokens: input?.max_output_tokens,
      tuple_sha256
    });
  }
};
