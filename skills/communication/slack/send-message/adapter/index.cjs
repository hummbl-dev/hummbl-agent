"use strict";

module.exports = {
  id: "communication.slack.send-message",
  version: "0.1.0",
  async run(input, ctx) {
    const channel_id = input?.channel_id;
    const text = input?.text;

    if (typeof channel_id !== "string" || channel_id.length === 0) {
      return { ok: false, error: "invalid_input:channel_id" };
    }
    if (typeof text !== "string" || text.length === 0) {
      return { ok: false, error: "invalid_input:text" };
    }

    return {
      ok: true,
      provider: "slack",
      mode: "stub",
      channel_id
    };
  }
};
