---

← [Back to Main Index](../00-index.md) | [Next Topic →](01-how-agents-built.md)

---

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Section Overview**

---

# Section 4: Agent Architecture & Custom Agents

> **Learn how AI agents work under the hood — the agent loop, tool calling, memory, and planning — and when to build your own custom agent instead of using a skill.**

So far you have used agents (OpenCode) as a black box: you type a prompt and they take action. This section pulls back the curtain. You will learn what makes an agent *agentic* — the loop of planning, acting, and observing that lets it work independently. You will also learn when to extend an agent with a **skill** (a reusable behavior) and when to define a whole new **custom agent** with its own personality and tool set using **Oh My Pi (OMP)**.

## What You'll Learn

By the end of this section, you will be able to:

- **Explain the agent loop:** the perceive → plan → act → observe cycle that powers every agent
- **Describe tool calling:** how an LLM decides which tool to use and what arguments to pass
- **Distinguish memory types:** short-term (context window) vs. long-term (files, databases, vector stores)
- **Compare planning strategies:** LLM-based planning vs. fixed, step-by-step workflows
- **Define an agent persona:** a consistent role, tone, and goal that shapes every decision
- **Build a custom agent in OMP:** a YAML config that bundles persona, tools, instructions, and hooks
- **Choose the right approach:** command vs. skill vs. custom agent — based on a decision table

## Topic Pages

| # | Topic | What You'll Learn | Time |
|---|---|---|---|
| 1 | [How Agents Are Built](01-how-agents-built.md) | The agent loop, tool calling, memory (short-term vs long-term), planning (LLM vs fixed) | 1.5h |
| 2 | [Creating Custom Agents](02-custom-agents.md) | When to build a custom agent vs use a skill; OMP agent YAML; personas and tool sets | 1.5h |
| 3 | [Agents vs Skills vs Commands](03-agents-vs-skills.md) | Decision table for choosing the right approach for any task | 1h |

## 📺 Recommended Overview Videos

1. [Agentic Framework LangGraph explained in 8 minutes | Beginners Guide](https://www.youtube.com/watch?v=1Q_MDOWaljk) — What a "graph" is in agent frameworks and how nodes/edges drive the loop
2. [AutoGen vs CrewAI vs LangGraph – Best AI Agent Framework In 2025!](https://www.youtube.com/watch?v=8HqeY5v0ohM) — A side-by-side comparison of the three major Python frameworks for building agents
3. [Agentic AI Tutorial for Beginners | Langgraph Tutorial](https://www.youtube.com/watch?v=CnXdddeZ4tQ) — A hands-on walkthrough of building an agent with a graph-based loop

## Before You Start

This section assumes you have finished Sections 1–3:

- **Section 1** gave you a working agent (OpenCode) and showed you how prompts flow into tools
- **Section 2** taught you how to write prompts agents can act on — including XML tags and structure
- **Section 3** introduced skills and MCP servers — the building blocks an agent uses

> 💡 **Tip:** You do not need to install any new software for this section. The concepts here apply to every agent you have used so far and to OMP (Oh My Pi), which you will install in Section 7. Read first, install later.

---

## Ready to Begin?

👉 [Topic 1: How Agents Are Built →](01-how-agents-built.md)

---

← [Back to Main Index](../00-index.md) | [Next Topic →](01-how-agents-built.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
