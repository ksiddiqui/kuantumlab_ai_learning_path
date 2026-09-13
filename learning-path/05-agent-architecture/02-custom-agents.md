---

← [Back to Section Index](index.md) | ← [Previous Topic](01-how-agents-built.md) | [Next Topic →](03-agents-vs-skills.md)

---

[← Main Index](../index.md) → [Section Index](index.md) → **Creating Custom Agents**

---

# Creating Custom Agents: Personas, Tools, and OMP

> **A custom agent is a persona + tool set + instructions bundled into a single config — ready to run whenever you need that specific role.**

In Section 3 you learned how to install skills and MCP servers — reusable behaviors that extend an agent. Sometimes a skill is enough. But when you need a *new personality*, a *different set of tools*, or a *specialized workflow*, you need a **custom agent**. This page shows you how to design one and how to define it using **Oh My Pi (OMP)** — the free, open-source agent framework this learning path builds toward in Section 7.

## 📺 Recommended Videos

1. [Agentic Framework LangGraph explained in 8 minutes | Beginners Guide](https://www.youtube.com/watch?v=1Q_MDOWaljk) — How graph-based frameworks structure custom agent logic
2. [AutoGen vs CrewAI vs LangGraph – Best AI Agent Framework In 2025!](https://www.youtube.com/watch?v=8HqeY5v0ohM) — Comparison of Python frameworks for custom agents
3. [Agentic AI Tutorial for Beginners | Langgraph Tutorial](https://www.youtube.com/watch?v=CnXdddeZ4tQ) — Hands-on example of defining an agent with role and tools

## Understanding Custom Agents

### What Is It?

A **custom agent** is an agent configuration that defines:

- **A persona** — the role, tone, and expertise the agent adopts (e.g., "a meticulous research analyst who always cites sources")
- **A tool set** — which MCP servers and built-in tools it can use (e.g., web search + GitHub + filesystem)
- **Instructions** — the system-level guidance that shapes every decision
- **Hooks** — automatic actions that run before or after each agent step (e.g., autofix on save)

Think of it as a job description for your AI: instead of one general-purpose agent that does everything, you create a "Researcher," a "Code Reviewer," and a "Deployment Engineer" — each optimized for its role.

### Why You Need This

- **Consistency:** A named persona ensures the agent behaves the same way every time you invoke it
- **Specialization:** Different tools per agent prevent the model from calling the wrong tool (which causes errors and burns tokens)
- **Team collaboration:** You can hand a config to a teammate and they get the same agent behavior
- **Cost control:** Specialized agents make fewer wasted tool calls

## Step-by-Step Guide

### Step 1: Decide Whether You Need a Custom Agent or a Skill

Before writing a config, ask yourself:

| Scenario | Right Choice |
|---|---|
| One-off task you will never repeat | Command — just type the prompt |
| Repeatable behavior you want to share | Skill — a reusable prompt template |
| Different role, tone, or personality | Custom Agent — a new persona |
| Different tool set or MCPs | Custom Agent — different capabilities |
| Custom instructions that apply everywhere | Skill *or* Custom Agent — see next page |

> 💡 **Tip:** Skills are the lightweight option — they are prompt templates and tool configs you activate on command. Custom agents are heavier — they are a *complete personality and setup* that you invoke by name. Start with a skill; upgrade to a custom agent when you need a distinct persona.

### Step 2: Understand OMP Agent Configuration

**Oh My Pi (OMP)** is the free, open-source agent framework this learning path introduces in Section 7. It defines agents as YAML configs — making it easy to version-control, share, and reuse personas across projects.

OMP supports two levels of configuration:

| Config Level | File Path | Scope |
|---|---|---|
| **Global** | `~/.omp/config.yaml` | Your defaults for every project |
| **Repo-local** | `.omp/config.yaml` | Project-specific agents and overrides |

Config is merged in order: **global → repo → session**. Repo-local settings override global ones, and session-level settings override both. This lets a single project have a different agent than your default.

> 🤖 **Why OMP matters:** Unlike a prompt template, an OMP agent config is a structured file with persona, tools, instructions, and hooks all in one place. You can commit it to Git, share it with your team, and invoke it with a single command.

### Step 3: Write an OMP Agent Config (Personas)

An OMP agent config looks like this:

```yaml
# .omp/config.yaml  (repo-local)
agents:
  researcher:
    persona: |
      You are a meticulous research analyst. You always cite your sources,
      cross-check facts, and prefer primary sources over summaries.
      You never claim something is true without evidence.
    model: openrouter/deepseek/deepseek-chat
    tools:
      - web-search
      - web-fetch
      - file-read
      - file-write
    instructions:
      - "Always include a citations section in your output"
      - "Use at least 3 sources before drawing a conclusion"
      - "Save findings to docs/research-notes.md"
    hooks:
      after_action: "echo 'Research step complete:' >> .research-log"
    max_iterations: 15

  code-reviewer:
    persona: |
      You are a senior software engineer reviewing code. You focus on
      correctness, security, and maintainability. You give specific, actionable
      feedback — never vague praise.
    model: openrouter/anthropic/claude-3.5-sonnet
    inherit: researcher  # inherits tools + hooks, overrides persona/model
    tools:
      - file-read
      - bash
    instructions:
      - "Run linting before giving feedback"
      - "Flag any security issues first, then style"
    max_iterations: 10
```

**Key fields explained:**

| Field | Purpose | Example |
|---|---|---|
| `persona` | The agent's role and tone in plain language | "You are a meticulous research analyst..." |
| `model` | Which LLM to use | `openrouter/deepseek/deepseek-chat` |
| `tools` | Which MCP servers and built-in tools are available | web-search, file-read, bash |
| `instructions` | Additional rules that apply every session | "Always cite sources" |
| `hooks` | Commands that run automatically before/after actions | auto-format on save |
| `max_iterations` | Safety limit to prevent infinite loops | `15` |
| `inherit` | Copy settings from another agent, then override | `code-reviewer` inherits from `researcher` |

### Step 4: Use Your Custom Agent

Once you have defined agents in `.omp/config.yaml`, you can invoke them by name:

```bash
# Run the "researcher" agent on a task
omp run --agent researcher "Research the pros and cons of vector databases"

# Run with a specific task file
omp run --agent researcher --task research-task.md

# The agent uses its persona, tools, and instructions automatically
```

> 🖥️ **Pro tip:** You can also inherit agents. The `code-reviewer` agent above inherits everything from `researcher` but swaps the persona and limits the tools to file-reading and bash. This avoids copy-pasting configs.

### Step 5: Connect Skills to Custom Agents

Custom agents don't replace skills — they use them. An OMP agent can activate skills alongside its own instructions:

```yaml
agents:
  writer:
    persona: "You are a technical writer who turns research into clear documentation."
    tools:
      - web-fetch
      - file-write
    skills:
      - research-summarizer  # activates a reusable skill from Section 3
      - markdown-formatter
    instructions:
      - "Use the research-summarizer skill on any source you fetch"
```

Skills provide reusable *behaviors*; the custom agent provides the *personality* and *context* in which those behaviors run.

## Common Pitfalls

- ❌ **Over-customizing from the start** — Define one custom agent, test it, then expand. A config with 10 tools and 20 instructions is hard to debug.
- ❌ **Vague personas** — "You are a helpful assistant" is a chat prompt, not a persona. A good persona specifies *role*, *tone*, and *constraints*: "You are a security engineer who flags every risk with a CVSS score."
- ❌ **Too many tools** — Each tool adds tokens and confusion. Give the agent only the tools it needs for its role.
- ❌ **Forgetting max_iterations** — Without a loop limit, an agent can recurse forever, burning tokens. Always set one.
- ❌ **Ignoring config inheritance** — Instead of copy-pasting a base agent, use `inherit:` to build layers. It saves time and reduces drift.

## Quick Reference

| OMP Concept | Command / Syntax | Purpose |
|---|---|---|
| `omp init` | `omp init` | Create global config at `~/.omp/config.yaml` |
| Agent config | `agents: <name>:` | Define a named agent in YAML |
| Invoke by name | `omp run --agent <name> "<task>"` | Run a specific agent |
| Global config | `~/.omp/config.yaml` | Your default agents for all projects |
| Repo config | `.omp/config.yaml` | Project-specific agents and overrides |
| Inherit | `inherit: <parent-agent>` | Copy config from another agent |
| Hooks | `hooks: {before_action, after_action}` | Run commands automatically |
| Max iterations | `max_iterations: 15` | Loop safety limit |

## Key Takeaways

- A **custom agent** bundles persona, tools, instructions, and hooks into one reusable config
- **Personas** should specify role, tone, and constraints — not just "be helpful"
- **OMP** defines agents as YAML, with global and repo-local configuration that merges cleanly
- Use `inherit:` to build agent families instead of copy-pasting configs
- Custom agents use **skills** for reusable behaviors and reserve their own instructions for persona and context
- Always set `max_iterations` as a safety net

## 📚 Recommended Reading (Web Links)

1. [Hugging Face: Building Good Agents Guide](https://huggingface.co/docs/smolagents/tutorials/building_good_agents) — Best practices for persona design, tool selection, and agent reliability
2. [LangGraph: Concepts](https://python.langchain.com/docs/concepts/architecture/) — How state, nodes, and edges compose into agent graphs
3. [OMP Agent Configuration Guide](https://omp.ohmy.tools/config) — Official documentation for global and repo-local agent config (YAML schema)
4. [OMP Hooks Documentation](https://omp.ohmy.tools/hooks) — Pre/post action hook system for auto-formatting, linting, and automation
5. [OMP Multi-Agent Documentation](https://omp.ohmy.tools/multi-agent) — Spawning child agents and orchestrating multi-agent sessions

---

← [Back to Section Index](index.md) | ← [Previous Topic](01-how-agents-built.md) | [Next Topic →](03-agents-vs-skills.md)

[← Main Index](../index.md) | [Table of Contents](index.md)
