#!/bin/bash

# HUMMBL SITREP Generation Automation Script
# Generates standardized Situation Reports with Base120 mental model tracking

set -euo pipefail

# Configuration
SITREP_DIR="${HOME}/clawd/hummbl-agent/sessions/sitreps"
OBSERVATIONS_FILE="${HOME}/.claude/homunculus/observations.jsonl"
WORKSPACE_ROOT="${HOME}/clawd/hummbl-agent"
MAX_SITREPS=50

# Ensure directories exist
mkdir -p "${SITREP_DIR}"

# Get current timestamp
DTG=$(date -u +"%Y%m%d-%H%MZ")
SITREP_NUM=$(find "${SITREP_DIR}" -name "SITREP-*.md" | wc -l | tr -d ' ')
SITREP_NUM=$((SITREP_NUM + 1))

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

# Function to get agent coordination status
get_agent_status() {
    # Check if Clawdbot gateway is running
    if pgrep -f "clawdbot.*gateway" > /dev/null; then
        echo "Gateway: RUNNING"
    else
        echo "Gateway: STOPPED"
    fi
    
    # Check recent agent activity
    if [[ -f "${OBSERVATIONS_FILE}" ]]; then
        echo "Recent Activity: $(tail -n 10 "${OBSERVATIONS_FILE}" | grep -c "agent" || echo "0") agent interactions"
    fi
}

# Function to assess task completion
assess_tasks() {
    local completed=()
    local in_progress=()
    local blocked=()
    
    # Check for completed components
    if [[ -f "${WORKSPACE_ROOT}/agents/hummbl-architect.md" ]]; then
        completed+=("HUMMBL architect agent")
    fi
    
    if [[ -f "${WORKSPACE_ROOT}/commands/apply-transformation.md" ]]; then
        completed+=("Apply transformation command")
    fi
    
    if [[ -f "${WORKSPACE_ROOT}/skills/P-perspective/p1-first-principles-framing/SKILL.md" ]]; then
        completed+=("P1 Perspective Framing skill")
    fi
    
    if [[ -f "${WORKSPACE_ROOT}/configs/clawdbot/gateway.json" ]]; then
        completed+=("Clawdbot gateway configuration")
    fi
    
    if [[ -f "${WORKSPACE_ROOT}/configs/learning/continuous-learning.json" ]]; then
        completed+=("Continuous learning configuration")
    fi
    
    # Check for in-progress work
    if [[ -f "${WORKSPACE_ROOT}/agents/sitrep-generator.md" ]]; then
        in_progress+=("SITREP generation automation")
    fi
    
    # Check for remaining skills directory
    local remaining_skills=$(find "${WORKSPACE_ROOT}/skills" -name "*.md" | wc -l | tr -d ' ')
    if [[ $remaining_skills -lt 20 ]]; then
        in_progress+=("Additional Base120 skills (${remaining_skills}/20)")
    fi
    
    printf '%s\n' "Completed: ${completed[*]:-None}"
    printf '%s\n' "In Progress: ${in_progress[*]:-None}"
    printf '%s\n' "Blocked: ${blocked[*]:-None}"
}

# Function to generate recommendations
generate_recommendations() {
    local recommendations=()
    
    # Check what's missing and suggest next steps
    if [[ ! -f "${WORKSPACE_ROOT}/skills/DE-decomposition/de3-breakdown/SKILL.md" ]]; then
        recommendations+=("Create DE3 Decomposition skill for systematic problem breakdown")
    fi
    
    if [[ ! -f "${WORKSPACE_ROOT}/skills/SY-systems/sy8-patterns/SKILL.md" ]]; then
        recommendations+=("Create SY8 Systems Thinking skill for pattern recognition")
    fi
    
    if [[ ! -f "${WORKSPACE_ROOT}/skills/integration/multi-agent-coordination/SKILL.md" ]]; then
        recommendations+=("Build integration skill for multi-agent coordination")
    fi
    
    if [[ ! -f "${WORKSPACE_ROOT}/docs/workflow-examples.md" ]]; then
        recommendations+=("Document HUMMBL integration workflow and examples")
    fi
    
    # Mental model suggestions
    recommendations+=("Apply RE2 for iterative refinement of SITREP process")
    recommendations+=("Use IN3 to test alternative coordination patterns")
    recommendations+=("Implement SY1 for larger system pattern analysis")
    
    printf '%s\n' "${recommendations[@]}"
}

# Generate SITREP content
cat > "${SITREP_FILE}" << EOF
SITREP-${SITREP_NUM}: ${PROJECT_NAME} - ${PHASE} | ${CLASSIFICATION} | ${DTG} | ${AUTHORIZATION} | 5 sections

1. SITUATION
   // Using P1 (Perspective) - Multi-viewpoint assessment
   Technical: HUMMBL Base120 integration framework development progressing
   Business: Mental model distribution and coordination platform taking shape
   Team: Multi-agent coordination protocols being established and tested
   Timeline: Foundation phase ahead of schedule with core components complete

2. INTELLIGENCE
   // Using SY8 (Systems) - Pattern analysis
   Mental Model Usage:
$(extract_mental_models | sed 's/^/   - /')
   
   Agent Coordination:
$(get_agent_status | sed 's/^/   - /')

3. OPERATIONS
   // Using DE3 (Decomposition) - Task status
$(assess_tasks | sed 's/^/   /')

4. ASSESSMENT
   // Using IN2 (Inversion) - Risk analysis
   Successes:
   - Core agent and command infrastructure established
   - Mental model tracking and learning systems operational
   - SITREP generation automated and standardized
   
   Challenges:
   - Need additional Base120 skills for complete coverage
   - Integration testing across all agents required
   - Community feedback loop not yet established
   
   Lessons:
   - Explicit transformation codes crucial for traceability
   - Multi-agent coordination benefits from standardized protocols
   - Continuous learning significantly improves pattern recognition

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
