# VERIFY_HUMMBL_JSON_SCHEMA_v1.0.0 (FROZEN SPEC ARTIFACT)

**Artifact**: `docs/specs/VERIFY_HUMMBL_JSON_SCHEMA_v1.0.0.md`  
**Version**: 1.0.0  
**Status**: FROZEN (v1.0.0) — DO NOT MODIFY WITHOUT GOVERNED VERSION BUMP  
**Scope**: JSON output schema for `scripts/verify-hummbl.sh --emit-json`

---

## 1. Purpose (applying **P1** framing and **SY8** systems thinking)

This specification defines the JSON output format produced by `verify-hummbl.sh --emit-json`. The JSON artifact is:

- Generated on every CI run and archived for 90 days
- Used as the source of truth for Base120 refs remediation (Issue #12)
- Machine-readable input for downstream tooling and governance gates
- Versioned to prevent format drift and enable backward compatibility

---

## 2. Schema Version Contract (Normative)

### 2.1 Stability Guarantees

- **Version**: `schema_version` field declares the schema version
- **Current**: `"1.0.0"` (this document)
- **Backward compatibility**: Minor/patch versions (1.x.y) may add fields but MUST NOT remove or change existing fields
- **Breaking changes**: Require major version bump (2.0.0) with migration notes

### 2.2 Version Semantics

- `1.0.0`: Initial frozen spec (this version)
- `1.1.0`: Additive fields only (backward compatible)
- `2.0.0`: Breaking changes (field removal, type changes, semantic changes)

---

## 3. Field Definitions (Normative)

### 3.1 Root Object

The root is a JSON object with exactly 8 fields:

```json
{
  "schema_version": "1.0.0",
  "timestamp": "2026-01-31T01:23:45Z",
  "result": "WARN",
  "missing_transformations": 48,
  "documentation_mismatches": 0,
  "recommendations": 1,
  "missing_transformation_files": [
    "agents/architect.md",
    "commands/checkpoint.md"
  ],
  "missing_files": []
}
```

### 3.2 Field Specifications

#### `schema_version` (String, Required)

- **Type**: String matching semantic version pattern `^\d+\.\d+\.\d+$`
- **Semantics**: Version of this JSON schema
- **Current value**: `"1.0.0"`
- **Stability**: MUST be present in all versions; parsers MUST validate compatibility

#### `timestamp` (String, Required)

- **Type**: ISO 8601 UTC timestamp string `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$`
- **Semantics**: UTC timestamp when verification was executed
- **Example**: `"2026-01-31T01:23:45Z"`
- **Usage**: Enables historical diffing and audit trail correlation

#### `result` (String, Required)

- **Type**: Enum string, one of: `"PASS"`, `"WARN"`, `"FAIL"`
- **Semantics**:
  - `"PASS"`: All checks passed; no missing files, transformations, or mismatches
  - `"WARN"`: Non-critical issues found (missing transformations or doc mismatches)
  - `"FAIL"`: Critical issues found (missing required files)
- **Decision logic**:
  - FAIL if `missing_files.length > 0`
  - WARN if `missing_transformations > 0` OR `documentation_mismatches > 0`
  - PASS otherwise

#### `missing_transformations` (Integer, Required)

- **Type**: Non-negative integer
- **Semantics**: Count of markdown files in `agents/`, `commands/`, `docs/` missing Base120 transformation code references
- **Range**: `[0, ∞)`
- **Correlation**: Length of `missing_transformation_files` array MUST equal this value

#### `documentation_mismatches` (Integer, Required)

- **Type**: Non-negative integer
- **Semantics**: Count of files containing legacy path references (`/Users/others/hummbl/` or `~/clawd/hummbl/`)
- **Range**: `[0, ∞)`
- **Usage**: Tracks documentation hygiene

#### `recommendations` (Integer, Required)

- **Type**: Non-negative integer
- **Semantics**: Count of actionable recommendations for remediation
- **Range**: `[0, 3]` (current implementation)
- **Calculation**: Sum of boolean flags for missing files, missing transformations, and doc mismatches

#### `missing_transformation_files` (Array, Required)

- **Type**: Array of strings (relative file paths)
- **Semantics**: List of markdown files missing Base120 transformation codes
- **Path format**: Relative to workspace root (e.g., `"agents/architect.md"`)
- **Constraints**:
  - Array length MUST equal `missing_transformations` value
  - Paths MUST be under `agents/`, `commands/`, or `docs/`
  - Paths MUST end with `.md`
  - Order is deterministic (sorted by `find` output)

#### `missing_files` (Array, Required)

- **Type**: Array of strings (relative file paths)
- **Semantics**: List of required files that do not exist in workspace
- **Path format**: Relative to workspace root
- **Source**: Checked against `REQUIRED_FILES` array in `verify-hummbl.sh`
- **Current required files**:
  - `agents/hummbl-architect.md`
  - `agents/hummbl-planner.md`
  - `agents/sitrep-generator.md`
  - `agents/transformation-guide.md`
  - `commands/apply-transformation.md`
  - `commands/plan-with-base120.md`
  - `commands/sitrep.md`
  - `commands/verify-hummbl.md`
  - `docs/workflow-examples.md`
  - `docs/validation-checklist.md`

---

## 4. Deterministic Serialization (Normative)

### 4.1 Field Order

Fields MUST appear in this order:

1. `schema_version`
2. `timestamp`
3. `result`
4. `missing_transformations`
5. `documentation_mismatches`
6. `recommendations`
7. `missing_transformation_files`
8. `missing_files`

### 4.2 Array Ordering

- `missing_transformation_files`: Deterministic (filesystem order from `find`)
- `missing_files`: Order matches `REQUIRED_FILES` array in script

### 4.3 Whitespace

- 2-space indentation
- Trailing comma forbidden in arrays
- No trailing whitespace

---

## 5. Validation Rules (Normative)

Parsers MUST validate:

1. `schema_version` matches `^\d+\.\d+\.\d+$`
2. `timestamp` matches ISO 8601 UTC format
3. `result` is one of: `"PASS"`, `"WARN"`, `"FAIL"`
4. `missing_transformations >= 0`
5. `documentation_mismatches >= 0`
6. `recommendations >= 0`
7. `missing_transformation_files.length === missing_transformations`
8. All paths in `missing_transformation_files` end with `.md`
9. All paths in `missing_transformation_files` start with `agents/`, `commands/`, or `docs/`

---

## 6. Usage Contract

### 6.1 Producers

- **Primary**: `scripts/verify-hummbl.sh --emit-json`
- **Guarantee**: Output MUST conform to this schema
- **Versioning**: Breaking changes require script to output new `schema_version`

### 6.2 Consumers

- **CI artifact archival**: `.github/workflows/ci.yml`
- **Base120 remediation tooling**: Issue #12 implementation
- **Protected-branch gates**: Future enforcement (post-Issue #12)
- **Historical analysis**: 90-day artifact retention enables trending

### 6.3 Compatibility Rules

Consumers MUST:

1. Parse `schema_version` first
2. Reject unsupported major versions
3. Ignore unknown fields (forward compatibility)
4. Handle missing optional fields (if added in future minor versions)

---

## 7. Example Payloads

### 7.1 PASS State

```json
{
  "schema_version": "1.0.0",
  "timestamp": "2026-01-31T02:00:00Z",
  "result": "PASS",
  "missing_transformations": 0,
  "documentation_mismatches": 0,
  "recommendations": 0,
  "missing_transformation_files": [],
  "missing_files": []
}
```

### 7.2 WARN State (Missing Transformations)

```json
{
  "schema_version": "1.0.0",
  "timestamp": "2026-01-31T01:23:45Z",
  "result": "WARN",
  "missing_transformations": 2,
  "documentation_mismatches": 0,
  "recommendations": 1,
  "missing_transformation_files": [
    "agents/architect.md",
    "commands/checkpoint.md"
  ],
  "missing_files": []
}
```

### 7.3 FAIL State (Missing Required File)

```json
{
  "schema_version": "1.0.0",
  "timestamp": "2026-01-31T01:30:00Z",
  "result": "FAIL",
  "missing_transformations": 0,
  "documentation_mismatches": 0,
  "recommendations": 1,
  "missing_transformation_files": [],
  "missing_files": [
    "agents/hummbl-architect.md"
  ]
}
```

---

## 8. Change History

### 8.1 Version 1.0.0 (2026-01-31)

- Initial frozen specification
- Defines 8 required fields
- Establishes semantic versioning contract
- Baseline for CI artifact archival and Issue #12 remediation

---

## 9. References

- **Implementation**: `scripts/verify-hummbl.sh`
- **CI Integration**: `.github/workflows/ci.yml` (artifact upload)
- **Governance**: SITREP-10 Operations section
- **Related Issues**: #12 (Base120 refs remediation), #13 (Router build infrastructure)
- **Semantic Versioning**: <https://semver.org/>

---

**END OF FROZEN SPEC**
