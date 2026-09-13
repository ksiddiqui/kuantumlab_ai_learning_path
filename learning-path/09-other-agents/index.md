<!-- Navigation: Top -->
← [Previous Section](../08-omp/index.md) | [01. DeepSeek Harness →](01-deepseek-harness.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → [Section 8: Other Open-Source Agents](index.md)

---

# Section 8: Other Open-Source Agents

> **Estimated time:** 2–3 hours | **Goal:** Explore alternative AI agents, understand their philosophies, and choose the right tool for your workflow.

Not every coding agent is built the same way. After mastering OpenCode and Oh My Pi (OMP) in the earlier sections, this section introduces you to a broader ecosystem of agents — each with its own philosophy, strengths, and preferred use cases.

---

## What's in This Section?

| Page | Tool | Philosophy | Best For |
|---|---|---|---|
| [01. DeepSeek Harness](01-deepseek-harness.md) | DeepSeek AI | "Everything-is-a-plugin" architecture, built for extensibility | Agent harness development, plugin ecosystems |
| [02. Other Notable Agents](02-other-agents.md) | Aider, Cline, LangGraph/CrewAI, Gemini CLI | Varies by tool | Surgical edits (Aider), full-file control (Cline), multi-agent orchestration (LangGraph/CrewAI), Google-native workflows (Gemini CLI) |

---

## Why Compare Agents?

Different agents are designed around different mental models:

- **Chat-first agents** (OpenCode, OMP, Cline) — conversational, multi-file editing, broad tool access.
- **Git-aware agents** (Aider) — surgical diffs, automatic commits, designed for safe code iteration.
- **Framework agents** (LangGraph, CrewAI) — programmatic orchestration of multiple agents and tools for complex workflows.
- **Plugin-first harnesses** (DeepSeek Harness) — extensibility built into the core; everything is a plugin you can swap or extend.

Understanding these trade-offs lets you pick the right tool for each job instead of forcing one agent to do everything.

---

## Quick Comparison at a Glance

| Agent | Type | Key Strength | Cost |
|---|---|---|---|
| **DeepSeek Harness** | Agent harness | Plugin-first architecture, free DeepSeek API | Free (API costs) |
| **Aider** | Terminal pair programmer | Surgical code edits, git integration | Free (model costs) |
| **Cline** | VS Code / CLI agent | Full file system control with approval | Free / $9.99 (ClinePass) |
| **LangGraph** | Orchestration framework | Stateful, long-running multi-agent workflows | Free (Python package) |
| **CrewAI** | Multi-agent framework | High-level crew/orchestration abstractions | Free (Python package) |
| **Gemini CLI** | Terminal agent | Google Search grounding, multimodal, 1M token context | Free tier: 1K req/day |

---

## Before You Start

- You should already be comfortable with **OpenCode** and **OMP** from the previous sections.
- Basic terminal usage (running commands, installing packages) is assumed.
- For tools that support multiple model providers (Aider, Cline, DeepSeek Harness), you can reuse the same API keys you've set up in earlier sections.

---

> 💡 **Tip:** You don't need to install every agent. Pick the one that matches your current workflow and try it. The goal is recognition, not memorization.

---

<!-- Navigation: Bottom -->
← [Previous Section](../08-omp/index.md) | [01. DeepSeek Harness →](01-deepseek-harness.md)

[← Main Index](../index.md) | [Table of Contents](index.md)

---

## 📺 Recommended Videos (Section Overview)

These videos span the tools covered in this section:

1. [DeepSeek Harness: Beginner To Expert in 15 Minutes](https://www.youtube.com/watch?v=24UCnAs7MVg) — quick start with DeepSeek Harness
2. [Edit existing code with aider! (SWE's dream come true)](https://www.youtube.com/watch?v=1g-4YEPoZKg) — code editing with Aider
3. [VSCode + Cline + Continue | NEVER PAY for CURSOR again](https://www.youtube.com/watch?v=0Gc_CwQG_GU) — Cline overview and setup

## 📚 Recommended Reading (Section Overview)

1. [DeepSeek Official Documentation](https://docs.deepseek.com/) — API docs, model specs, and pricing
2. [Aider Documentation](https://aider.chat/docs/) — official docs for installation, commands, and workflows
3. [Cline Documentation](https://docs.cline.bot/) — official docs for setup, commands, and custom instructions
4. [CrewAI Documentation](https://docs.crewai.com/) — official docs for multi-agent workflows
5. [LangGraph Documentation](https://python.langchain.com/docs/langgraph) — official docs for building agent graphs
