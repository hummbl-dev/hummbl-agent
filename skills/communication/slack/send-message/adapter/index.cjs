"use strict";

const slackSend = require("../../../../../../packages/adapters/communication/slack/send-message.cjs");

const SKILL_ID = "communication.slack.send-message";
const SKILL_VERSION = "0.1.0";

async function run(input = {}, ctx = {}) {
  const { channel_id, text, thread_ts } = input;
  const tuple_sha256 = ctx?.tuple_hash;

  if (typeof channel_id !== "string" || channel_id.trim().length === 0) {
    return { ok: false, error: "invalid_input:channel_id" };
  }
  if (typeof text !== "string" || text.trim().length === 0) {
    return { ok: false, error: "invalid_input:text" };
  }
  if (typeof tuple_sha256 !== "string" || tuple_sha256.length === 0) {
    return { ok: false, error: "tuple_invalid:missing_hash" };
  }

  return slackSend.run({
    channel_id,
    text,
    thread_ts: typeof thread_ts === "string" ? thread_ts : undefined,
    tuple_sha256
  });
}

module.exports = {
  id: SKILL_ID,
  version: SKILL_VERSION,
  run,
};
