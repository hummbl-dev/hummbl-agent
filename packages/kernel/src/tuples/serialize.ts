import { escapeTupleComponent } from "./escape";
import type { ScopeMap, ScopeScalar, TupleV1 } from "./types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  if (Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function serializeScalar(value: ScopeScalar): string {
  if (typeof value === "string") {
    return escapeTupleComponent(value);
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("scope numeric values must be finite");
    }
    const normalized = Object.is(value, -0) ? 0 : value;
    return String(normalized);
  }
  throw new Error("Unsupported scope scalar value");
}

export function serializeTupleV1(tuple: TupleV1): string {
  const principal = escapeTupleComponent(tuple.principal);
  const capability = escapeTupleComponent(tuple.capability);

  let scopeFragment: string;

  if (typeof tuple.scope === "string") {
    scopeFragment = `scope=${escapeTupleComponent(tuple.scope)}`;
  } else {
    if (!isPlainObject(tuple.scope)) {
      throw new Error("scope must be a string or flat map");
    }
    const entries = Object.entries(tuple.scope as ScopeMap).sort(([a], [b]) => {
      if (a === b) return 0;
      return a < b ? -1 : 1;
    });
    const serializedPairs = entries.map(([key, value]) => {
      const escapedKey = escapeTupleComponent(key);
      const serializedValue = serializeScalar(value as ScopeScalar);
      return `${escapedKey}=${serializedValue}`;
    });
    scopeFragment = `scope{${serializedPairs.join(";")}}`;
  }

  return `${principal}|${capability}|${scopeFragment}`;
}
