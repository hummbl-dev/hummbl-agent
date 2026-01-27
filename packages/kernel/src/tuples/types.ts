export type ScopeScalar = string | number | boolean;
export type ScopeMap = Record<string, ScopeScalar>;

export type TupleV1 = {
  principal: string;
  capability: string;
  scope: string | ScopeMap;
};

export type TupleV1FailureCode =
  | "TUPLES_V1_OK"
  | "TUPLES_V1_ERR_PRINCIPAL_EMPTY"
  | "TUPLES_V1_ERR_PRINCIPAL_LENGTH"
  | "TUPLES_V1_ERR_PRINCIPAL_WHITESPACE"
  | "TUPLES_V1_ERR_CAPABILITY_EMPTY"
  | "TUPLES_V1_ERR_CAPABILITY_LENGTH"
  | "TUPLES_V1_ERR_CAPABILITY_FORMAT"
  | "TUPLES_V1_ERR_CAPABILITY_WHITESPACE"
  | "TUPLES_V1_ERR_SCOPE_MISSING"
  | "TUPLES_V1_ERR_SCOPE_STRING_LENGTH"
  | "TUPLES_V1_ERR_SCOPE_STRING_WHITESPACE"
  | "TUPLES_V1_ERR_SCOPE_MAP_EMPTY"
  | "TUPLES_V1_ERR_SCOPE_MAP_TOO_LARGE"
  | "TUPLES_V1_ERR_SCOPE_KEY_FORMAT"
  | "TUPLES_V1_ERR_SCOPE_DUP_KEY"
  | "TUPLES_V1_ERR_SCOPE_VALUE_TYPE"
  | "TUPLES_V1_ERR_SCOPE_VALUE_LENGTH"
  | "TUPLES_V1_ERR_SCOPE_NUMBER_NONFINITE";

export type TupleV1ValidationResult =
  | { ok: true; code: "TUPLES_V1_OK" }
  | { ok: false; code: Exclude<TupleV1FailureCode, "TUPLES_V1_OK">; detail?: string };
