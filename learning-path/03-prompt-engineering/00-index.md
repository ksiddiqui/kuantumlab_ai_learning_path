← [Back to Main Index](../00-index.md) | [Next Section →](../04-skills-mcp/00-index.md)

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Section 2: Prompt Engineering**

# Prompt Engineering for AI Agents

> Learn to write prompts that agents can act on — not just answer questions. Master XML tags, structured formats, and prompt libraries that scale across projects.

## What This Section Covers

This section teaches you how to craft prompts that **AI agents** (not just chatbots) can reliably act on. Unlike traditional LLM interactions where a vague question produces a helpful answer, agent prompts must encode executable instructions, boundaries, and failure handling. Bad prompts cause agents to hallucinate, loop infinitely, ignore constraints, or waste dozens of dollars chasing dead ends.

You'll learn the **three pillars** of agent prompt design:

1. **Structure** — How to organize context, goal, and constraints so the agent can parse intent clearly
2. **Common Failures** — The patterns that break agents and how to fix them
3. **Libraries & Version Control** — How to turn good prompts into reusable, tested assets

## Learning Outcomes

By the end of this section you will:

- Write prompts that agents follow on the first try
- Recognize and fix the **5 most common prompt mistakes** (vague goals, missing context, no guardrails, ambiguous output format, undefined failure modes)
- Use **XML tags** to separate instructions from examples from data
- Structure prompts as **Context → Goal → Constraints** so the agent has everything it needs
- Build a **prompt library** with version control so prompts evolve like code
- Apply **prompt versioning and testing** to track what works and what doesn't

## Time Estimate

**2–3 hours** total:

| Topic | Time |
|---|---|
| Writing Effective Prompts | ~45 min |
| Common Prompt Failures | ~45 min |
| Prompt Libraries & Version Control | ~30 min |

## Files in This Section

| File | Title | Key Concepts |
|---|---|---|
| [01-writing-prompts.md](01-writing-prompts.md) | Writing Effective Prompts | XML tags, context→goal→constraints structure, chain-of-thought |
| [02-common-failures.md](02-common-failures.md) | Common Prompt Failures | Vague prompts, missing context, no guardrails, output format ambiguity |
| [03-prompt-libraries.md](03-prompt-libraries.md) | Prompt Libraries & Version Control | Templates, prompt versioning, testing frameworks |

## Prerequisites

Before starting this section, you should:

- Have completed [Section 1 — OpenCode Foundation](../02-opencode-foundation/00-index.md) (or have experience running an AI agent at least once)
- Understand what an AI agent is and the difference between a chatbot and an agent
- Have a code editor and terminal accessible

> 💡 **Tip:** Open the topic pages in separate tabs and follow along by writing your own prompts in a scratch file. The exercises in each page take only 2–3 minutes but are critical for retention.

---

← [Back to Main Index](../00-index.md) | [Next Section →](../04-skills-mcp/00-index.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
