<!-- Navigation: Top -->
[← Previous: 04. Advanced Features](./04-advanced-features.md) | ← [Back to Section Index](00-index.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section 7: Oh My Pi (OMP)](00-index.md) → [05. Building Agents](05-building-agents.md)

---

# 05. Building Agents

> **Estimated time:** 90 min | **Goal:** Write custom agent definitions using OMP's YAML frontmatter schema, and dispatch them from within sessions.

---

## Agent Architecture

OMP's agent system is intentionally lightweight: **agents are plain Markdown files** with YAML frontmatter. There's no separate DSL, no build step, no compilation — OMP discovers and indexes agent files automatically at startup.

This design lets you write an agent definition the same way you write documentation — in a `.md` file that any human (or LLM) can read.

### Agent Discovery Paths

| Scope | Path | Pattern |
|---|---|---|
| Global | `~/.omp/agent/agents/` | `*.md` files |
| Project | `<project>/.omp/agents/` | `*.md` files |

Files ending in `.md` at these locations are parsed for YAML frontmatter. The body becomes the agent's system prompt.

### Built-in Agents

OMP ships with three built-in agents (bundled at `packages/coding-agent/src/prompts/agents/`):

| Agent | Model Role | Description |
|---|---|---|
| **`task`** | `task` role (default: Opus-level) | General-purpose task execution with full tool access |
| **`scout`** | `smol` role (default: Haiku-level) | Read-only reconnaissance — scans codebases, gathers context |
| **`reviewer`** | `advisor` role (default: Sonnet-level) | Code review — checks diffs, flags issues, enforces style |

---

## The Agent YAML Schema

An agent file is Markdown with YAML frontmatter delimited by `---`. Here's the full schema:

```yaml
---
name: my-code-reviewer          # Unique identifier (required)
description: >-                 # Short description (required)
  Reviews code changes for correctness
  and adherence to project conventions.

# Tools: list of allowed tool names.
# "all" grants full access (use carefully for trusted agents).
tools:
  - read
  - grep
  - bash
  - edit

# Subagents this agent can spawn via the `task` tool.
spawns:
  - scout      # Can dispatch the scout agent
  - reviewer   # Can dispatch the reviewer agent

# Model assignment (uses model roles from config.yml)
model:
  role: task
  # Override the specific model for this role:
  # model: anthropic/claude-opus-4

# Thinking/reasoning level (0-3 for Anthropic, 0-4 for Cline)
# OMP maps these to provider-specific thinking budgets.
thinking-level: 2

# Read-summarize: when true, OMP provides file contents as
# summarized context rather than full file reads.
read-summarize: true

# Output schema: describes structured output format.
# If specified, OMP requests JSON-mode output.
output:
  type: object
  properties:
    summary:
      type: string
      description: Brief summary of findings
    issues:
      type: array
      items:
        type: object
        properties:
          file:
            type: string
          line:
            type: integer
          severity:
            type: string
            enum: ["low", "medium", "high", "critical"]
          description:
            type: string
          suggestion:
            type: string
        required: [file, line, severity, description]
    risk_score:
      type: number
      minimum: 0
      maximum: 10
      description: Overall risk assessment (0-10)
  required: [summary, issues]

# Auto-loading: when true, this agent is available for dispatch
# without explicit configuration. Defaults to true.
autoload: true

# Prewalk: files to read before the agent starts (glob patterns).
# OMP loads these into context before the first turn.
prewalk:
  - "src/**/*.ts"
  - "test/**/*.ts"
  - "!src/**/*.test.ts"  # Exclude test files

# Advisor: when true, spawn the advisor agent to monitor this agent's
# execution for issues. Can also specify a custom advisor agent.
advisor:
  enabled: true
  agent: reviewer
  interval: 10    # Check every 10 tool calls

# Blocking: when true, the parent session waits for this agent
# to complete before proceeding. When false, runs in the background.
blocking: false

# Skills: auto-loaded skills this agent can use.
# Accepts glob patterns or explicit lists.
autoloadSkills:
  enabled: true
  maxSkills: 50
---

You are an expert code reviewer specializing in TypeScript and Node.js.
Your job is to review code changes and provide actionable feedback.

## Your Process

1. Read the changed files
2. Check for correctness, performance issues, and style violations
3. Report issues with severity ratings
4. Suggest concrete improvements

## Scope

- Focus on TypeScript files in `src/`
- Do NOT review test files
- Do NOT review documentation files
- Report only genuine issues, not bikeshedding
```

### Field Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | **Yes** | Unique agent identifier used in `task` tool dispatch |
| `description` | string | **Yes** | Short human-readable description shown in agent selector |
| `tools` | array | No | List of allowed tools; `all` grants full access |
| `spawns` | array | No | Other agents this agent can dispatch via `task` |
| `model` | object | No | Model role assignment (see below) |
| `thinking-level` | integer | No | Reasoning budget level (0–3 Anthropic, 0–4 Cline) |
| `read-summarize` | boolean | No | Summaries vs full file reads (saves tokens) |
| `output` | object | No | JSON Schema for structured output |
| `autoload` | boolean | No | Whether agent is discoverable without config (default: true) |
| `prewalk` | array | No | Glob patterns for files to preload |
| `advisor` | object | No | Enable advisor/watchdog monitoring |
| `blocking` | boolean | No | Wait for completion (true) or background (false, default: true) |
| `autoloadSkills` | object | No | Skill auto-loading configuration |

### Model Assignment

```yaml
model:
  role: slow           # Use the "slow" role model
  # OR override the model directly:
  model: anthropic/claude-opus-4
```

If omitted, the agent uses the `default` model from `config.yml`.

---

## Creating a Custom Agent: Step-by-Step

### Step 1: Create the Agent File

```bash
# Project-local agent
mkdir -p .omp/agents
touch .omp/agents/code-reviewer.md
```

### Step 2: Define Frontmatter

```yaml
---
name: code-reviewer
description: TypeScript and Node.js code review specialist
tools:
  - read
  - grep
  - bash
  - edit
model:
  role: advisor
thinking-level: 1
autoload: true
---
```

### Step 3: Write the System Prompt

Below the frontmatter, write the agent's instructions as Markdown:

````
You are a senior TypeScript engineer reviewing code for correctness and maintainability.

Review all changed files. For each issue found:
1. State the file and line number
2. Explain the problem
3. Suggest a concrete fix

Rate each issue as low, medium, or high severity.
````

### Step 4: Dispatch the Agent

Inside an OMP session, use the `task` tool:

```
Task: Review all changed files in src/ for TypeScript issues
Agent: code-reviewer
```

Or in YAML workflow format:

```yaml
# .omp/workflows/review.yaml
workflow:
  name: "Static Review"
  steps:
    - task: "Review src/ for TypeScript issues"
      agent: code-reviewer
      blocking: true
```

---

## Dispatch Patterns

### Single Agent

```
Task: Refactor the auth module to use JWT with refresh tokens
Agent: task
```

### Agent with Restricted Tools

```
Task: Scan the codebase for security vulnerabilities
Agent: scout
```

The `scout` agent only has read tools — perfect for reconnaissance.

### Multi-Agent Orchestration

When `spawns` is configured, an agent can dispatch subagents:

```yaml
---
name: orchestrator
description: Multi-phase build orchestrator
tools: [all]
spawns:
  - scout
  - reviewer
  - task
---
You coordinate other agents to complete large tasks.
First, dispatch `scout` to understand the codebase.
Then dispatch `task` to implement the feature.
Finally, dispatch `reviewer` to verify the implementation.
```

Inside a session:

```
Task: Implement the user profile feature end-to-end
Agent: orchestrator
```

The orchestrator agent will internally call `task` to dispatch scout, task, and reviewer agents in sequence.

### Background vs Foreground Agents

Set `blocking` in the agent's frontmatter:

- `blocking: true` (default) — OMP waits for the agent to complete
- `blocking: false` — OMP returns immediately; the agent runs in the background

```yaml
---
name: background-monitor
description: Continuous CI integration monitor
blocking: false
---
Monitor the CI pipeline and report results.
```

---

## Built-in Agent Examples

### The `task` Agent

The `task` agent receives the full model role (`task` role, defaulting to Opus-level models) and has unrestricted tool access. It's the default for most user-driven sub-tasks.

Key traits:
- Spawns from: any agent with `task` in its `spawns` list
- Tools: all built-in (31 tools)
- Model: `task` role (heavy reasoning)
- Use case: implementation, refactoring, complex multi-step tasks

### The `scout` Agent

The `scout` agent is optimized for fast, read-only reconnaissance using the `smol` model role (Haiku-level):

Key traits:
- Tools: `read`, `grep`, `bash` (read-only)
- Model: `smol` role (fast, cheap)
- Use case: codebase scanning, context gathering, search tasks
- Cannot modify files or spawn other agents

### The `reviewer` Agent

The `reviewer` agent provides advisory feedback using the `advisor` model role:

Key traits:
- Tools: `read`, `grep`, `bash` (inspection only)
- Model: `advisor` role (balanced reasoning)
- Use case: code review, security checks, quality gates
- Can produce structured JSON output via the `output` schema

---

## Prewalk and Context Loading

The `prewalk` field lets you preload specific files into an agent's context before it starts:

```yaml
---
name: test-runner
description: Runs the test suite and reports results
prewalk:
  - "src/**/*.ts"
  - "tests/**/*.ts"
  - "package.json"
  - "!node_modules/**"
---
Before running tests, verify these files compile.
```

Glob patterns:
- `**` — match any depth
- `!` — exclude pattern
- `*` — match single directory level

---

## Structured Output with JSON Schema

When an agent needs to return structured data, define an `output` schema:

```yaml
---
name: dependency-audit
description: Scans for vulnerable dependencies
output:
  type: object
  properties:
    vulnerabilities:
      type: array
      items:
        type: object
        properties:
          package:
            type: string
          severity:
            type: string
            enum: ["low", "moderate", "high", "critical"]
          advisory:
            type: string
          fix:
            string
          fixed_in:
            version:
              type: string
        required: [package, severity, advisory]
    summary:
      type: string
  required: [vulnerabilities, summary]
---
Scan package.json and report all known vulnerabilities.
```

When dispatched, OMP requests JSON-mode output and validates the result against the schema.

---

## Pitfalls & Trade-offs

- **Tool permissions scale with trust**: Granting `tools: [all]` gives the agent full filesystem, shell, and edit access. Only do this for agents running in disposable sandboxes.
- **Subagent nesting is recursive**: An agent with `spawns` can dispatch agents that also spawn — this can explode token usage. Set `advisor: { checkInterval: 10 }` to catch runaway recursion.
- **Prewalk file size**: Large file globs (e.g., `src/**/*`) can exceed context limits. Use `read-summarize: true` or narrow globs to reduce overhead.
- **Agent file format is strict**: The `---` delimiters must be the first line of the file. Empty lines before `---` break parsing.
- **Duplicate agent names**: If two agent files define the same `name`, OMP warns and uses the last-discovered one. Use unique names across global and project scopes.
- **Output schemas require model JSON mode**: Not all providers support structured JSON output. Test with your chosen provider.

---

## Quick Reference

```bash
# Agent discovery
~/.omp/agent/agents/*.md      # Global agents
<project>/.omp/agents/*.md    # Project agents

# Dispatch an agent
task <task-description> --agent <agent-name>
# or inside a session:
# Task: <description>
# Agent: <name>

# List discovered agents
/providers agents    # or check the agent selector in-session

# Agent frontmatter fields
name: my-agent        # Required: unique identifier
description: "..."     # Required: short description
tools: [read, edit]   # Optional: allowed tools (or "all")
spawns: [scout]       # Optional: subagents this agent can dispatch
model: { role: slow } # Optional: model role assignment
thinking-level: 2     # Optional: reasoning budget
output: { ... }       # Optional: JSON schema for structured output
autoload: true        # Optional: auto-discover (default: true)
blocking: true        # Optional: wait for completion (default: true)
prewalk: ["src/**/*"] # Optional: preload files
```

---

## Key Takeaways

- Agents are just Markdown files with YAML frontmatter — no DSL, no compilation.
- The three built-in agents (`task`, `scout`, `reviewer`) cover implementation, reconnaissance, and review workflows.
- The `tools` field controls capabilities; `all` grants full access — restrict for safety.
- `spawns` enables multi-agent orchestration: one agent dispatching subagents for sub-tasks.
- The `output` field defines JSON schemas for structured agent responses.
- `prewalk` globs preload files into context; `read-summarize` trades fidelity for token efficiency.
- `blocking: false` runs agents asynchronously — useful for monitoring and CI-style tasks.

---

## 📚 Recommended Reading

1. [OMP Task Agent Discovery](https://omp.sh/docs/task-agent-discovery) — subagent orchestration and discovery
2. [OMP Agent Hub](https://omp.sh/docs/agent-hub) — built-in agent library reference
3. [OMP CLI Reference](https://omp.sh/docs/cli-reference) — `omp usage`, task dispatch, and CLI options
4. [OMP Memory](https://omp.sh/docs/memory) — memory backends for persistent agent context
5. [OMP Context Files](https://omp.sh/docs/context-files) — how OMP discovers context from other tools

---

<!-- Navigation: Bottom -->
[← Previous: 04. Advanced Features](./04-advanced-features.md) | ← [Back to Section Index](00-index.md)

[← Main Index](../00-index.md) | [Section Index](00-index.md)

---

## 🎓 You've Completed Section 7!

You've learned how to install OMP, configure global and project-level settings, write hooks, use magic keywords, dispatch subagents, track costs, and build custom agents from YAML.

**Next:** [Section 8 — Other Open-Source Agents](../09-other-agents/00-index.md)
