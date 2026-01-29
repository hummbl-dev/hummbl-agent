"use strict";

const SKILL_ID = "communication.discord.send-message";
const SKILL_VERSION = "0.1.0";

/**
 * Phase 1 stub adapter for Discord messaging.
 *
 * @param {{channel_id?: string, text?: string}} input
 * @param {{ tuple?: import("../../../../../packages/kernel/src/tuples/types").TupleV1 }} ctx
 * @returns {Promise<{ok: boolean, provider?: string, mode?: string, channel_id?: string, error?: string}>}
 */
async function run(input = {}, ctx = {}) {
  const { channel_id, text } = input;

  if (typeof channel_id !== "string" || channel_id.trim().length === 0) {
    return { ok: false, error: "invalid_input:channel_id" };
  }
  if (typeof text !== "string" || text.trim().length === 0) {
    return { ok: false, error: "invalid_input:text" };
  }

  return {
    ok: true,
    provider: "discord",
    mode: "stub",
    channel_id,
    tuple_hash: ctx?.tuple_hash,
  };
}

module.exports = {
  id: SKILL_ID,
  version: SKILL_VERSION,
  run,
};
