#!/bin/bash

# HUMMBL SITREP Generation Automation Script
# Generates standardized Situation Reports with Base120 mental model tracking

set -euo pipefail

# Script location
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Configuration
SITREP_DIR="${SITREP_DIR:-${HOME}/clawd/hummbl-agent/sessions/sitreps}"
OBSERVATIONS_FILE="${OBSERVATIONS_FILE:-${HOME}/.claude/homunculus/observations.jsonl}"
WORKSPACE_ROOT="${WORKSPACE_ROOT:-${HOME}/clawd/hummbl-agent}"
MAX_SITREPS=50

# Ensure directories exist
mkdir -p "${SITREP_DIR}"

# Get current timestamp
DTG=$(date -u +"%Y%m%d-%H%MZ")
SITREP_NUM=$(find "${SITREP_DIR}" -name "SITREP-*.md" | wc -l | tr -d ' ')
SITREP_NUM=$((SITREP_NUM + 1))

IMPORT_FILE=""
IMPORT_SOURCE=""
IMPORT_NOTE=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --import)
            IMPORT_FILE="${2:-}"
            shift 2
            ;;
        --source)
            IMPORT_SOURCE="${2:-}"
            shift 2
            ;;
        --note)
            IMPORT_NOTE="${2:-}"
            shift 2
            ;;
        --show)
            shift 1
            ;;
        *)
            shift 1
            ;;
    esac
done

# Extract project information
PROJECT_NAME="HUMMBL-Agent"
PHASE="Foundation"
CLASSIFICATION="UNCLASSIFIED"
AUTHORIZATION="HUMMBL-LEAD"

# Generate SITREP filename
SITREP_FILE="${SITREP_DIR}/SITREP-${SITREP_NUM}-${DTG}.md"

# Function to extract mental model usage from observations
extract_mental_models() {
    if [[ -f "${OBSERVATIONS_FILE}" ]]; then
        grep -o "P[0-9]\+\|IN[0-9]\+\|CO[0-9]\+\|DE[0-9]\+\|RE[0-9]\+\|SY[0-9]\+" "${OBSERVATIONS_FILE}" 2>/dev/null | sort | uniq -c | sort -rn || echo "No mental model usage found"
    else
        echo "No observations file found"
    fi
}

# Function to get canonical evidence entries
extract_evidence() {
    local evidence_file
    evidence_file="${WORKSPACE_ROOT}/_state/evidence/$(date +%Y-%m-%d)/EVIDENCE.md"
    if [[ -f "${evidence_file}" ]]; then
        grep -v '^#' "${evidence_file}" | sed '/^$/d' || echo "No canonical evidence logged"
    else
        echo "No canonical evidence logged"
    fi
}

# Function to get agent coordination status
get_agent_status() {
    if [[ -f "${OBSERVATIONS_FILE}" ]]; then
        echo "Observations: external (non-canonical), recent entries: $(tail -n 10 "${OBSERVATIONS_FILE}" | grep -c \"agent\" || echo \"0\")"
    else
        echo "Observations: external (non-governed), none found"
    fi
    echo "System state not tracked in-repo"
}

# Function to assess task completion
assess_tasks() {
    local completed=()
    local in_progress=()
    local blocked=()
    
    # Completed components (governed substrate)
    if [[ -d "${WORKSPACE_ROOT}/packages/kernel" ]]; then
        completed+=("Kernel contract (types-only)")
    fi
    if [[ -d "${WORKSPACE_ROOT}/packages/runners" ]]; then
        completed+=("Runner scaffolding (Claude Code, Codex)")
    fi
    if [[ -f "${WORKSPACE_ROOT}/scripts/orchestrate.sh" ]]; then
        completed+=("Orchestrator for run + prompt generation")
    fi
    if [[ -f "${WORKSPACE_ROOT}/scripts/run-cmd.sh" ]]; then
        completed+=("Governed command execution + artifact hashing")
    fi
    if [[ -f "${WORKSPACE_ROOT}/packages/skills/registry/src/registry.json" ]]; then
        completed+=("Skill registry (initial)")
    fi
    if [[ -f "${WORKSPACE_ROOT}/scripts/sync-upstreams.sh" ]]; then
        completed+=("Vendor pin tooling")
    fi
    
    # In-progress work
    if [[ -d "${WORKSPACE_ROOT}/packages/router" ]]; then
        in_progress+=("Router planning skeleton (deterministic contract)")
    fi
    
    printf '%s\n' "Completed: ${completed[*]:-None}"
    printf '%s\n' "In Progress: ${in_progress[*]:-None}"
    printf '%s\n' "Blocked: ${blocked[*]:-None}"
}

# Function to generate recommendations
generate_recommendations() {
    local recommendations=()
    
    recommendations+=("Define Base120 models as registry entries with manual/prompt steps")
    recommendations+=("Finalize router skeleton tests and policy checks")
    recommendations+=("Align SITREP generation with schema + lint rules")
    recommendations+=("Incrementally replace manual steps with run-script steps")
    recommendations+=("Expand allowlist for safe, governed commands")
    recommendations+=("Add decision notes for contract-impacting changes")
    recommendations+=("Use IN-series for risk framing before execution")
    
    printf '%s\n' "${recommendations[@]}"
}

# Generate SITREP content
cat > "${SITREP_FILE}" << EOF
STATUS: NON-CANONICAL | DRAFT | NOT AUDIT-VERIFIED

SITREP-${SITREP_NUM}: ${PROJECT_NAME} - ${PHASE} | ${CLASSIFICATION} | ${DTG} | ${AUTHORIZATION} | 5 sections

1. SITUATION
   // Using P1 (Perspective) - Multi-viewpoint assessment
   Technical: Governed agent infrastructure and execution substrate established; domain capabilities pending.
   Business: Distribution and coordination scaffolding exists; executable skills minimal.
   Team: Multi-runner orchestration defined; audit trail is deterministic.
   Timeline: No schedule baseline defined in-repo; progress tracked via commits and run logs.

2. INTELLIGENCE
   // Using SY8 (Systems) - Pattern analysis
   Observations (external):
$(extract_mental_models | sed 's/^/   - /')
   
   Evidence (canonical):
$(extract_evidence | sed 's/^/   /')

   System State:
$(get_agent_status | sed 's/^/   - /')

3. OPERATIONS
   // Using DE3 (Decomposition) - Task status
$(assess_tasks | sed 's/^/   /')

4. ASSESSMENT
   // Using IN2 (Inversion) - Risk analysis
   Successes:
   - Core agent infrastructure and run governance established
   - Deterministic logging + artifact hashing in place
   - SITREP generation automated; standardization in progress
   
   Challenges:
   - No executable Base120 skills yet
   - Router selection semantics need consolidation/testing
   - Observations remain external to governance
   
   Lessons:
   - Explicit transformation codes crucial for traceability
   - Multi-runner coordination benefits from standardized protocols
   - Iterative, human-directed refinement improves coordination quality

5. RECOMMENDATIONS
   // Using CO5 (Composition) - Integrative planning
   Immediate:
$(generate_recommendations | head -5 | sed 's/^/   - /')
   
   Short Term:
$(generate_recommendations | tail -n +6 | head -3 | sed 's/^/   - /')
   
   Mental Model Applications:
   - Apply RE2 for iterative refinement of development process
   - Use IN3 to identify potential integration failures
   - Implement SY1 to optimize multi-agent coordination patterns

---
Generated: $(date)
Workspace: ${WORKSPACE_ROOT}
Observations: ${OBSERVATIONS_FILE}
EOF

if [[ -n "${IMPORT_FILE}" ]]; then
    if [[ -z "${IMPORT_SOURCE}" ]]; then
        echo "--import requires --source" >&2
        exit 1
    fi
    "${SCRIPT_DIR}/import-observation.sh" --file "${IMPORT_FILE}" --source "${IMPORT_SOURCE}" --note "${IMPORT_NOTE}"
fi

if [[ -x "${SCRIPT_DIR}/lint-sitrep.sh" ]]; then
    "${SCRIPT_DIR}/lint-sitrep.sh" "${SITREP_FILE}"
fi

# Clean up old SITREPs (keep only the most recent)
cd "${SITREP_DIR}"
if [[ $(ls -1 SITREP-*.md 2>/dev/null | wc -l | tr -d ' ') -gt ${MAX_SITREPS} ]]; then
    ls -t SITREP-*.md | tail -n +$((MAX_SITREPS + 1)) | xargs rm -f
fi

echo "SITREP generated: ${SITREP_FILE}"
echo "Summary: ${SITREP_NUM} situation reports for ${PROJECT_NAME}"

# Optional: Display the SITREP
if [[ "${1:-}" == "--show" ]]; then
    echo ""
    cat "${SITREP_FILE}"
fi
