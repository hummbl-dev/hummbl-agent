import type { ScopeMap, ScopeScalar, TupleV1, TupleV1ValidationResult } from "./types";

const CAPABILITY_RE = /^[a-z0-9][a-z0-9_.:\-{};=|\\]*$/;
const SCOPE_KEY_RE = /^[a-z0-9][a-z0-9_.:-]{0,63}$/;

const hasTrimMismatch = (value: string) => value.trim() !== value;

function isPlainObject(value: unknown): value is Record<string, ScopeScalar> {
  if (typeof value !== "object" || value === null) return false;
  if (Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export function validateTupleV1(tuple: TupleV1): TupleV1ValidationResult {
  if (!tuple.principal) {
    return { ok: false, code: "TUPLES_V1_ERR_PRINCIPAL_EMPTY" };
  }
  if (tuple.principal.length > 256) {
    return { ok: false, code: "TUPLES_V1_ERR_PRINCIPAL_LENGTH" };
  }
  if (hasTrimMismatch(tuple.principal)) {
    return { ok: false, code: "TUPLES_V1_ERR_PRINCIPAL_WHITESPACE" };
  }

  if (!tuple.capability) {
    return { ok: false, code: "TUPLES_V1_ERR_CAPABILITY_EMPTY" };
  }
  if (tuple.capability.length > 256) {
    return { ok: false, code: "TUPLES_V1_ERR_CAPABILITY_LENGTH" };
  }
  if (hasTrimMismatch(tuple.capability)) {
    return { ok: false, code: "TUPLES_V1_ERR_CAPABILITY_WHITESPACE" };
  }
  if (!CAPABILITY_RE.test(tuple.capability)) {
    return { ok: false, code: "TUPLES_V1_ERR_CAPABILITY_FORMAT" };
  }

  if ((tuple as any).scope === undefined) {
    return { ok: false, code: "TUPLES_V1_ERR_SCOPE_MISSING" };
  }

  if (typeof tuple.scope === "string") {
    if (tuple.scope.length < 1 || tuple.scope.length > 512) {
      return { ok: false, code: "TUPLES_V1_ERR_SCOPE_STRING_LENGTH" };
    }
    if (hasTrimMismatch(tuple.scope)) {
      return { ok: false, code: "TUPLES_V1_ERR_SCOPE_STRING_WHITESPACE" };
    }
    return { ok: true, code: "TUPLES_V1_OK" };
  }

  if (!isPlainObject(tuple.scope)) {
    return { ok: false, code: "TUPLES_V1_ERR_SCOPE_VALUE_TYPE" };
  }

  const scope = tuple.scope as ScopeMap;
  const keys = Object.keys(scope);
  if (keys.length === 0) {
    return { ok: false, code: "TUPLES_V1_ERR_SCOPE_MAP_EMPTY" };
  }
  if (keys.length > 16) {
    return { ok: false, code: "TUPLES_V1_ERR_SCOPE_MAP_TOO_LARGE" };
  }

  const seen = new Set<string>();
  for (const key of keys) {
    if (seen.has(key)) {
      return { ok: false, code: "TUPLES_V1_ERR_SCOPE_DUP_KEY", detail: key };
    }
    seen.add(key);

    if (!SCOPE_KEY_RE.test(key)) {
      return { ok: false, code: "TUPLES_V1_ERR_SCOPE_KEY_FORMAT", detail: key };
    }

    const value = (scope as Record<string, unknown>)[key];
    if (value === null || value === undefined) {
      return { ok: false, code: "TUPLES_V1_ERR_SCOPE_VALUE_TYPE", detail: `${key}=null/undefined` };
    }
    if (Array.isArray(value)) {
      return { ok: false, code: "TUPLES_V1_ERR_SCOPE_VALUE_TYPE", detail: `${key}=array` };
    }
    if (typeof value === "object") {
      return { ok: false, code: "TUPLES_V1_ERR_SCOPE_VALUE_TYPE", detail: `${key}=object` };
    }

    if (typeof value === "string") {
      if (value.length > 256) {
        return { ok: false, code: "TUPLES_V1_ERR_SCOPE_VALUE_LENGTH", detail: key };
      }
      continue;
    }

    if (typeof value === "number") {
      if (!Number.isFinite(value)) {
        return { ok: false, code: "TUPLES_V1_ERR_SCOPE_NUMBER_NONFINITE", detail: key };
      }
      continue;
    }

    if (typeof value === "boolean") {
      continue;
    }

    return { ok: false, code: "TUPLES_V1_ERR_SCOPE_VALUE_TYPE", detail: `${key}=${typeof value}` };
  }

  return { ok: true, code: "TUPLES_V1_OK" };
}
