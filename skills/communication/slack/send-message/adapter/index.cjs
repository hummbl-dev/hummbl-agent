"use strict";

const SKILL_ID = "communication.slack.send-message";
const SKILL_VERSION = "0.1.0";

/**
 * Phase 1 stub adapter.
 * Performs basic input validation and returns a structured response
 * without calling Slack APIs. This keeps the skill usable in dry runs
 * while tuple + registry governance matures.
 *
 * @param {{channel_id?: string, text?: string, thread_ts?: string}} input
 * @param {{ tuple?: import("../../../../../packages/kernel/src/tuples/types").TupleV1 }} ctx
 * @returns {Promise<{ok: boolean, provider?: string, mode?: string, channel_id?: string, thread_ts?: string, error?: string}>}
 */
async function run(input = {}, ctx = {}) {
  const { channel_id, text, thread_ts } = input;

  if (typeof channel_id !== "string" || channel_id.trim().length === 0) {
    return { ok: false, error: "invalid_input:channel_id" };
  }
  if (typeof text !== "string" || text.trim().length === 0) {
    return { ok: false, error: "invalid_input:text" };
  }

  return {
    ok: true,
    provider: "slack",
    mode: "stub",
    channel_id,
    thread_ts: typeof thread_ts === "string" ? thread_ts : undefined,
    tuple_hash: ctx?.tuple_hash,
  };
}

module.exports = {
  id: SKILL_ID,
  version: SKILL_VERSION,
  run,
};
