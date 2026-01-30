"use strict";

const discordSend = require("../../../../../../packages/adapters/communication/discord/send-message.cjs");

const SKILL_ID = "communication.discord.send-message";
const SKILL_VERSION = "0.1.0";

async function run(input = {}, ctx = {}) {
  const { channel_id, text } = input;
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

  return discordSend.run({
    channel_id,
    text,
    tuple_sha256
  });
}

module.exports = {
  id: SKILL_ID,
  version: SKILL_VERSION,
  run,
};
