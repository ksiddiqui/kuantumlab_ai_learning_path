← [Back to Main Index](../00-index.md) | [← Previous Section: Other Agents](../09-other-agents/00-index.md) | [Next Section: Free-Tier LLMs →](../11-free-tier-llms/00-index.md)

[← Main Index](../00-index.md) → [Section 9: Paid Agent Options](00-index.md) → **Current Page**

# Paid Agent Options

> This section compares three paid coding agents — **Claude Code**, **Codex CLI**, and **Kiro** — that build on everything you've learned with OpenCode and OMP. If you've mastered the free/open-source tools and want faster runs, deeper reasoning, or enterprise features, this section helps you evaluate the upgrade path. No installation or subscription is required to read along.

## 📺 Recommended Videos

1. [Learn 80% of Claude Code in 10 Minutes (2026 Tutorial)](https://www.youtube.com/watch?v=3aKVArutiIU) — The 7-level pyramid for Claude Code mastery: install, model selection, CLAUDE.md rules, debugging, multitasking, planning, and collaboration.
2. [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0) — Advanced tips from Anthropic engineer Boris: codebase Q&A, plan mode, sub-agents, context management, and the CLI SDK.
3. [The Ultimate Beginner's Guide to Claude AI](https://www.youtube.com/watch?v=9oJySubZRSA) — Six levels from your first prompt to Claude working autonomously; covers Claude Code web, files, deep research, and connectors.

---

## What Are "Paid Agents"?

The previous sections taught you to use **OpenCode** ($10/month) and **Oh My Pi** (free) — tools that run AI coding agents in your terminal. This section covers the three major **paid** alternatives that teams and professionals choose when they need:

- **Higher-capacity models** (Opus, o1, GPT-5 series) that plan and reason further before shipping code
- **Enterprise security** (SSO, IAM, cost caps, audit trails)
- **Parallel agents and orchestration** at scale
- **Integration with cloud providers** (AWS Bedrock, Google Vertex, Microsoft Foundry)

These tools all work like OpenCode — they read your codebase, make edits, run commands, and connect to MCP servers — but they're backed by stronger models and come with subscription or credit pricing.

## How They Compare

Each tool wraps a different model family and targets a slightly different workflow. Use the table below to decide which one aligns with your budget, team setup, and preferred model.

| Feature | [Claude Code](01-installing-paid.md) | [Codex CLI](01-installing-paid.md) | [Kiro](01-installing-paid.md) |
|---|---|---|---|
| **Vendor** | Anthropic | OpenAI | Amazon (AWS) |
| **Underlying models** | Claude Opus 5 / Sonnet 5 / Haiku 4.5 | o1 / GPT-5 / o3 / GPT-4.5 | Claude, open-weight, Auto (best model per task) |
| **Pricing model** | Subscription: $20–$210/mo per user ([pricing](https://claude.com/pricing)) | Free with ChatGPT Plus ($20/mo) or Pro; API key option | Credit-based: prepaid credits, no daily limits |
| **Installation** | `curl -fsSL https://claude.ai/install.sh \| bash` | `curl -fsSL https://chatgpt.com/codex/install.sh \| sh` | `curl -fsSL https://cli.kiro.dev/install \| bash` |
| **Primary surface** | Terminal, VS Code, Desktop app, Web, JetBrains | Terminal (CLI) | Terminal (CLI) + IDE (macOS/Windows/Linux) |
| **Third-party routing** | AWS Bedrock, Google Vertex AI, Microsoft Foundry | API key only | Built-in model selection (Auto), supports many providers |
| **Spec-driven dev** | Plan mode + sub-agents | Agentic loops in terminal | Yes — [specs](https://kiro.dev/docs/specs/) turn prompts into structured plans |
| **Enterprise auth** | SSO (Business/Enterprise plans) | API key | IAM + SSO (built on AWS infrastructure) |
| **Cost controls** | Team spend limits, usage analytics | API budget limits | Credit-based pricing with pre-paid overages |
| **Best for** | Deep codebase tasks, enterprise workflows, CI/CD review | Long runs, OpenAI model access, familiar API-style auth | Spec-driven development, property-based testing, parallel agents |

> 💡 **Quick pick guide:** If your team already uses Anthropic Claude → Claude Code. If you're all-in on OpenAI → Codex CLI. If you want the most structured, enterprise-ready workflow with AWS integration → Kiro.

---

## What's in This Section

| Topic | What You'll Learn | Time |
|---|---|---|
| [Installing Paid Agents](01-installing-paid.md) | Install commands for Claude Code, Codex CLI, and Kiro — plus auth setup and first-run checks | 30–45 min |
| [When to Upgrade](02-when-to-upgrade.md) | Decision criteria for switching from free tools to paid agents, including cost analysis and use-case fit | 15–30 min |

---

## How Paid Agents Fit Into the Learning Path

You've already learned the fundamentals with free tools:

1. **OpenCode** (Section 1) — your introduction to terminal-based AI coding at $10/month
2. **Oh My Pi** (Section 7) — advanced agent orchestration with multi-agent support
3. **Other agents** (Section 8) — DeepSeek, Aider, Cline, Gemini CLI compared

This section is **optional**. You can complete the entire learning path using only OpenCode and OMP. The paid agents here offer incremental benefits — better models, enterprise features, and cloud integration — but the skills you've learned transfer directly.

> 📌 **Next steps:** After reading through this section, move on to [Section 10 — Free-Tier LLM Providers](../11-free-tier-llms/00-index.md) to explore API-based access to 100+ models without a monthly subscription.

---

## Key Takeaways

- **Claude Code** is the most mature paid agent — it has the best ecosystem integration (VS Code, JetBrains, CI/CD, Slack, Chrome) and works across terminal, desktop, and web surfaces
- **Codex CLI** is the lightest option — a single binary you install and run, backed by OpenAI's latest models, with free access if you already have ChatGPT Plus
- **Kiro** is the most structured — it turns prompts into specs, uses property-based testing, and supports parallel agents that learn from every session; built on AWS infrastructure
- All three connect to **MCP servers** (just like OpenCode), so your existing tool integrations transfer over
- All three can route through **AWS Bedrock** for enterprise IAM and cost control — see the [Claude Code on Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) docs

## 📚 Recommended Reading (Web Links)

1. [Claude Code Documentation](https://code.claude.com/docs) — Official install guides, CLI reference, skills, hooks, and MCP integration
2. [Codex CLI on GitHub](https://github.com/openai/codex) — Source code, installation from source, and package manager options
3. [Kiro Documentation](https://kiro.dev/cli/) — CLI setup, custom agents, spec-driven development, and cloud sessions
4. [Claude Code on Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) — Configuring Claude Code with AWS IAM, model pinning, and credential management
5. [Amazon Bedrock Models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html) — Full catalog of Claude and other models available on AWS Bedrock
6. [OpenAI Codex Documentation](https://developers.openai.com/codex) — Auth, CLI usage, and integration reference

---

← [Back to Section Index](00-index.md) | [Installing Paid Agents →](01-installing-paid.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)