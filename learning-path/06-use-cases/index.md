← [Main Index](../index.md)

---

# Section 5: Use-Case Walkthroughs

> **Hands-on projects that combine agent setup, MCPs, and prompt engineering into real deliverables.**

## What You'll Build

This section moves you from theory to practice. Each walkthrough is a self-contained project you can complete in a single sitting. You will use an AI agent (OpenCode or OMP) with the MCP tools you configured in Sections 3 and 7 to accomplish a real-world task — troubleshooting your own computer, generating a professional research report, mining your email for insights, deploying a live website, and finally building a capstone AI meeting assistant.

## Why These Use Cases?

These five scenarios represent the most common pain points fresh graduates encounter in their first tech jobs:

- **Debugging your own environment** instead of asking IT
- **Producing professional reports** that combine web research, data analysis, and formatted output
- **Extracting signals from email overload** to stay on top of projects
- **Shipping a live website** without paying for hosting
- **Building a portfolio project** that demonstrates end-to-end agent orchestration

## Walkthroughs

| # | Title | Problem | Key Tools | Time |
|---|---|---|---|---|
| [5.1](01-local-machine.md) | Local Machine Environment Management | Troubleshoot disk, processes, and software installs on your own computer | Bash MCP, Filesystem MCP, System info MCP | 1–2h |
| [5.2](02-web-research-report.md) | Deep Internet Research + Comparative Report | Produce a 10-page LLM provider comparison report in PDF + Excel | Web search MCP, Firecrawl MCP, PDF/Excel MCPs | 2–3h |
| [5.3](03-gmail-research.md) | Gmail Inbox Topic Research + Summarization | Find emails on a topic, summarize discussions, extract action items | Gmail MCP, Summarization skill | 1–2h |
| [5.4](04-deploy-website.md) | Create & Deploy a Website (Cheaply) | Build and publish a portfolio site for under $5/month | Code generation, GitHub Pages / Cloudflare Pages | 2–3h |
| [5.5](05-capstone.md) | Capstone: AI Meeting Assistant | Build an end-to-end agent portfolio project | All MCPs, custom agents, deployment pipeline | 3–4h |

## Prerequisites for This Section

Before starting, make sure you have completed:

- **Section 1** — OpenCode installed and a basic workflow running
- **Section 3** — At least 2 MCP servers installed and tested (web search, filesystem)
- **Section 4** — Understanding of the agent loop (plan → act → observe)
- **Section 7** (recommended) — OMP installed with global config set up

> 💡 **Tip:** Each walkthrough can be done with either OpenCode or OMP. If you have both installed, try the same task with each and compare results.

## What's Next?

After completing these walkthroughs, move on to:

- **Section 6 — Assignments** (`../07-assignments/index.md`): Ten structured exercises to reinforce what you've learned
- **Section 7 — Oh My Pi (OMP)** (`../08-omp/index.md`): Master OMP's advanced features (hooks, multi-agent, cost tracking)
- **Section 12 — Project Ideas** (`../13-project-ideas/index.md`): Portfolio-worthy challenges to keep building

---

← [Main Index](../index.md) | → [Start: 5.1 Local Machine](01-local-machine.md)
