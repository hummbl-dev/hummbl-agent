---
name: p1-perspective-framing
description: Apply P1 mental model for problem framing and perspective shifting. Frame challenges from multiple viewpoints to reveal hidden insights and opportunities.
version: 1.0.0
metadata: {"clawdbot":{"nix":{"plugin":"github:hummbl-systems/base120?dir=skills/perspective-framing","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P1 Perspective Framing

Apply the P1 mental model transformation for systematic problem framing and perspective shifting from multiple viewpoints.

## What is P1?

**P1 (Perspective)** is the foundational Base120 transformation for framing problems, naming perspectives, and shifting points of view. It helps reveal hidden assumptions, uncover new opportunities, and create comprehensive understanding of complex challenges.

## When to Use P1

### **Ideal Situations**
- Requirements gathering and problem definition
- Stakeholder alignment challenges
- Reframing technical obstacles as opportunities
- Exploring alternative solution approaches
- Identifying hidden constraints and assumptions
- Cross-functional team coordination

### **Trigger Questions**
- "How can we frame this challenge differently?"
- "What viewpoints are we missing?"
- "How would different stakeholders see this?"
- "What are we not considering?"

## The P1 Process

### **Step 1: Identify Current Perspective**
```typescript
// Using P1 (Perspective) - Current frame identification
interface CurrentPerspective {
  primaryViewpoint: string;      // "Technical implementation focus"
  assumptions: string[];         // ["Must use existing stack", "Timeline is fixed"]
  constraints: string[];         // ["Budget limited", "Team size fixed"]
  blindSpots: string[];         // ["User experience impact", "Long-term maintenance"]
}
```

### **Step 2: Generate Alternative Perspectives**
```typescript
// Using P1 (Perspective) - Multi-viewpoint generation
interface AlternativePerspectives {
  business: {
    viewpoint: "Revenue and market position";
    questions: ["How does this drive growth?", "What's the competitive advantage?"];
    opportunities: ["New market entry", "Customer retention improvement"];
  };
  
  user: {
    viewpoint: "Experience and value delivery";
    questions: ["How does this feel to use?", "What problems does it solve?"];
    opportunities: ["Simplicity gains", "Delight features"];
  };
  
  system: {
    viewpoint: "Architecture and sustainability";
    questions: ["How does this scale?", "What are the maintenance implications?"];
    opportunities: ["Technical debt reduction", "Performance optimization"];
  };
  
  team: {
    viewpoint: "Capability and growth";
    questions: ["How does this develop our skills?", "What's the learning opportunity?"];
    opportunities: ["Skill development", "Process improvement"];
  };
}
```

### **Step 3: Synthesize Insights**
```typescript
// Using P1 (Perspective) - Cross-perspective synthesis
interface SynthesizedInsights {
  commonThemes: string[];        // Patterns across perspectives
  conflicts: string[];          // Tensions between viewpoints
  integrativeOpportunities: string[]; // Solutions serving multiple views
  reframedProblem: string;      // New problem definition
  expandedScope: string[];       // Additional considerations
}
```

## Practical Examples

### **Example 1: API Design Challenge**
```typescript
// Initial frame: "Build a REST API for user management"
// Using P1 (Perspective) - Reframe from multiple viewpoints

const apiPerspectives = {
  technical: "Design scalable, secure user data management",
  business: "Enable customer onboarding and retention features", 
  user: "Provide seamless account creation and profile management",
  system: "Integrate with existing auth infrastructure and future services"
};

// Reframed problem: "Create a user identity and engagement platform that scales with business growth"
```

### **Example 2: Performance Optimization**
```typescript
// Initial frame: "Make the database queries faster"
// Using P1 (Perspective) - Multi-viewpoint analysis

const performancePerspectives = {
  developer: "Reduce query execution time and improve developer experience",
  business: "Increase user satisfaction and reduce operational costs",
  user: "Faster page loads and responsive application feel",
  system: "Optimize resource utilization and prepare for scale"
};

// Reframed problem: "Optimize system responsiveness to improve user experience and operational efficiency"
```

## Integration with Other Transformations

P1 works synergistically with other Base120 transformations:

- **P1 → DE3**: Use perspective framing before decomposing problems
- **P1 → IN2**: Frame from multiple viewpoints, then work backward from ideal outcomes
- **P1 → CO5**: Compose solutions that address multiple perspectives
- **P1 → SY8**: Identify perspective patterns across the system

## Implementation Checklist

### **Preparation**
- [ ] Identify current problem frame and assumptions
- [ ] List all relevant stakeholders and viewpoints
- [ ] Gather context for each perspective

### **Execution**
- [ ] Generate at least 4 different perspectives
- [ ] Document questions each perspective asks
- [ ] Identify opportunities unique to each view
- [ ] Look for patterns and conflicts across views

### **Synthesis**
- [ ] Extract common themes and insights
- [ ] Address conflicts and tensions
- [ ] Create integrative solutions
- [ ] Reframe the original problem

### **Validation**
- [ ] Test reframed problem with stakeholders
- [ ] Verify all key perspectives are represented
- [ ] Ensure solution addresses multiple viewpoints

## Common Pitfalls

### **Avoid These**
- **Superficial perspectives**: Going through the motions without deep analysis
- **Stakeholder omission**: Missing critical viewpoints
- **Analysis paralysis**: Getting lost in perspective generation
- **Integration failure**: Not synthesizing insights into actionable solutions

### **Best Practices**
- **Stakeholder involvement**: Actually talk to people representing each perspective
- **Documentation**: Capture the perspective shift process
- **Prioritization**: Not all perspectives carry equal weight
- **Iteration**: Reapply P1 as new information emerges

## Advanced Techniques

### **Perspective Hierarchy**
```typescript
// Using P1 (Perspective) - Hierarchical perspective analysis
interface PerspectiveHierarchy {
  strategic: "Long-term vision and market position";
  tactical: "Implementation approach and resource allocation";
  operational: "Day-to-day execution and user experience";
  contextual: "Environmental factors and constraints";
}
```

### **Time-Based Perspectives**
```typescript
// Using P1 (Perspective) - Temporal viewpoint shifting
interface TimePerspectives {
  past: "Historical context and lessons learned";
  present: "Current reality and immediate constraints";
  future: "Emerging opportunities and long-term vision";
  legacy: "Impact on future maintainers and users";
}
```

## Tools and Templates

### **Perspective Canvas**
```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│   Business      │     User        │    Technical    │      System     │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Questions:      │ Questions:      │ Questions:      │ Questions:      │
│                 │                 │                 │                 │
│ Opportunities:  │ Opportunities:  │ Opportunities:  │ Opportunities:  │
│                 │                 │                 │                 │
│ Constraints:    │ Constraints:    │ Constraints:    │ Constraints:    │
│                 │                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

## Measurement and Success

### **Success Indicators**
- **New insights discovered**: Previously unseen opportunities or constraints
- **Stakeholder alignment**: Shared understanding across different viewpoints
- **Problem refinement**: Clearer, more comprehensive problem definition
- **Solution breadth**: Solutions that address multiple concerns

### **Quality Metrics**
- Number of distinct perspectives generated
- Percentage of key stakeholders represented
- Number of cross-perspective insights
- Stakeholder alignment score

## Installation and Usage

### **Nix Installation**
```nix
{
  programs.clawdbot.plugins = [
    { source = "github:hummbl-systems/base120?dir=skills/perspective-framing"; }
  ];
}
```

### **Manual Installation**
```bash
# Add to your Clawdbot workspace
clawdhub install hummbl-systems/p1-perspective-framing
```

### **Usage with Commands**
```bash
# Apply P1 transformation
/apply-transformation P1 "Frame this challenge from multiple stakeholder perspectives"

# Generate perspective analysis
clawdbot agent --message "Apply P1 perspective framing to our current integration challenge"
```

---

## **P1 in Action**

*"We were stuck thinking about this as a technical problem. P1 helped us see it as a business opportunity, user experience challenge, and system design question all at once. The solution we found addresses all three."*

**P1 Perspective Framing** transforms how you see problems, revealing hidden dimensions and opportunities that single-perspective thinking misses.

---
*Frame, name, and shift your perspective to see the full picture.*
