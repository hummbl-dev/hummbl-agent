import type { TupleV1 } from "../../../kernel/src/tuples/types";

export type ApplicationPointCode = "P1" | "DE3" | "IN2";

export type ApplicationPointResolution =
  | { ok: true; code: ApplicationPointCode; reason: string }
  | { ok: false; code: null; reason: string };

export function resolveApplicationPoint(
  tuple: TupleV1
): ApplicationPointResolution {
  const cap = String((tuple as { capability?: string })?.capability ?? "");

  if (cap.startsWith("llm:")) {
    return {
      ok: true,
      code: "P1",
      reason: "capability llm:* maps to P1 (llm vendor selection)",
    };
  }

  if (cap.startsWith("de3:")) {
    return {
      ok: true,
      code: "DE3",
      reason: "capability de3:* maps to DE3 (decomposition selection)",
    };
  }

  if (cap.startsWith("in2:")) {
    return {
      ok: true,
      code: "IN2",
      reason: "capability in2:* maps to IN2 (validation selection)",
    };
  }

  return { ok: false, code: null, reason: "no matching application point for capability" };
}
