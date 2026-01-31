#!/bin/bash

# Lightweight HUMMBL verification helper.
# Emits the summary block expected by /verify-hummbl and basic findings.
# Usage: verify-hummbl.sh [--emit-json]

set -euo pipefail

EMIT_JSON=false
if [[ "${1:-}" == "--emit-json" ]]; then
  EMIT_JSON=true
fi

WORKSPACE_ROOT="${WORKSPACE_ROOT:-$(pwd)}"

REQUIRED_FILES=(
  "agents/hummbl-architect.md"
  "agents/hummbl-planner.md"
  "agents/sitrep-generator.md"
  "agents/transformation-guide.md"
  "commands/apply-transformation.md"
  "commands/plan-with-base120.md"
  "commands/sitrep.md"
  "commands/verify-hummbl.md"
  "docs/workflow-examples.md"
  "docs/validation-checklist.md"
)

TRANSFORM_REGEX='(P|IN|CO|DE|RE|SY)[0-9]+'
PATH_MISMATCH_REGEX='(/Users/others/hummbl/|~/clawd/hummbl/)'

missing_files=()
for file in "${REQUIRED_FILES[@]}"; do
  if [[ ! -f "${WORKSPACE_ROOT}/${file}" ]]; then
    missing_files+=("${file}")
  fi
done

missing_transformations=0
missing_transformation_files=()
while IFS= read -r -d '' file; do
  if ! grep -Eq "${TRANSFORM_REGEX}" "${file}"; then
    missing_transformations=$((missing_transformations + 1))
    relative_path="${file#${WORKSPACE_ROOT}/}"
    missing_transformation_files+=("${relative_path}")
  fi
done < <(find "${WORKSPACE_ROOT}/agents" "${WORKSPACE_ROOT}/commands" "${WORKSPACE_ROOT}/docs" -type f -name "*.md" -print0)

doc_mismatches=0
if grep -R -n -E "${PATH_MISMATCH_REGEX}" "${WORKSPACE_ROOT}" --exclude=verify-hummbl.sh >/dev/null 2>&1; then
  doc_mismatches=$(grep -R -n -E "${PATH_MISMATCH_REGEX}" "${WORKSPACE_ROOT}" --exclude=verify-hummbl.sh | wc -l | tr -d ' ')
fi

result="PASS"
if [[ ${#missing_files[@]} -gt 0 ]]; then
  result="FAIL"
elif [[ ${missing_transformations} -gt 0 || ${doc_mismatches} -gt 0 ]]; then
  result="WARN"
fi

recommendations=0
if [[ ${missing_transformations} -gt 0 ]]; then
  recommendations=$((recommendations + 1))
fi
if [[ ${doc_mismatches} -gt 0 ]]; then
  recommendations=$((recommendations + 1))
fi
if [[ ${#missing_files[@]} -gt 0 ]]; then
  recommendations=$((recommendations + 1))
fi

if [[ "${EMIT_JSON}" == "true" ]]; then
  # Emit machine-readable JSON for remediation
  printf '{\n'
  printf '  "schema_version": "1.0.0",\n'
  printf '  "timestamp": "%s",\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  printf '  "result": "%s",\n' "${result}"
  printf '  "missing_transformations": %d,\n' "${missing_transformations}"
  printf '  "documentation_mismatches": %d,\n' "${doc_mismatches}"
  printf '  "recommendations": %d,\n' "${recommendations}"
  printf '  "missing_transformation_files": [\n'
  for i in "${!missing_transformation_files[@]}"; do
    if [[ $i -eq $((${#missing_transformation_files[@]} - 1)) ]]; then
      printf '    "%s"\n' "${missing_transformation_files[$i]}"
    else
      printf '    "%s",\n' "${missing_transformation_files[$i]}"
    fi
  done
  printf '  ],\n'
  printf '  "missing_files": [\n'
  for i in "${!missing_files[@]}"; do
    if [[ $i -eq $((${#missing_files[@]} - 1)) ]]; then
      printf '    "%s"\n' "${missing_files[$i]}"
    else
      printf '    "%s",\n' "${missing_files[$i]}"
    fi
  done
  printf '  ]\n'
  printf '}\n'
  exit 0
fi

cat <<EOF
VERIFICATION RESULT: ${result}
Missing transformations: ${missing_transformations}
Documentation mismatches: ${doc_mismatches}
Recommendations: ${recommendations}
EOF

if [[ "${result}" != "PASS" ]]; then
  echo ""
  echo "Findings:"
  if [[ ${#missing_files[@]} -gt 0 ]]; then
    printf '%s\n' "${missing_files[@]}" | sed 's/^/- Missing file: /'
  fi
  if [[ ${missing_transformations} -gt 0 ]]; then
    echo "- Add explicit Base120 codes to documentation where missing."
  fi
  if [[ ${doc_mismatches} -gt 0 ]]; then
    echo "- Replace legacy paths (/Users/others/hummbl or ~/clawd/hummbl) with hummbl-agent."
  fi
fi
