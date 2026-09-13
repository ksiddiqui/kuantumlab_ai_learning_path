← [Back to Section Index](index.md) | [← Previous Topic: Installing Paid Agents](01-installing-paid.md) | [Next Section: Free-Tier LLMs →](../11-free-tier-llms/index.md)

[← Main Index](../index.md) → [Section 9: Paid Agent Options](index.md) → **When to Upgrade**

# When to Upgrade

> You've mastered OpenCode ($10/month) and OMP (free). This page gives you a decision framework for when the paid agents — Claude Code, Codex CLI, and Kiro — are worth the extra cost. We break down upgrade triggers by project complexity, team size, budget, and enterprise requirements.

## 📺 Recommended Videos

1. [Learn 80% of Claude Code in 10 Minutes (2026 Tutorial)](https://www.youtube.com/watch?v=3aKVArutiIU) — Starts at 0:25 with the "7-level pyramid" — watch the model selection segment (Opus for planning, Sonnet for execution) to understand when better models matter
2. [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0) — At 15:30 Boris discusses onboarding: "onboarding used to take 2-3 weeks, now 2-3 days" — a key upgrade trigger for teams hiring
3. [The Ultimate Beginner's Guide to Claude AI](https://www.youtube.com/watch?v=9oJySubZRSA) — Level 6 (working while you're away) shows when you need autonomous execution, the hallmark paid-agent use case

## Understanding the Upgrade Decision

> The jump from free/open-source to paid agents isn't about features — it's about **scope**. Free agents (OpenCode, OMP) handle single-session coding tasks well. Paid agents handle **multi-session, multi-agent, enterprise-scale** workflows that run unattended for hours or days.

### Free vs. Paid: What Actually Changes?

| Dimension | Free / <$20 Tools (OpenCode, OMP) | Paid Agents (Claude Code, Codex, Kiro) |
|---|---|---|
| **Models** | Sonnet Haiku, DeepSeek, Qwen (mid-tier) | Opus 5, o1, GPT-5, Fable (frontier-tier) |
| **Session length** | Single sessions, manual continuation | Multi-session, cloud persistence, handoff |
| **Parallel agents** | Manual subprocess management | Built-in orchestration (sub-agents, teams) |
| **Enterprise auth** | Personal API keys | SSO, IAM, managed credentials |
| **Cost controls** | Per-session caps | Team budgets, spend limits, audit trails |
| **CI/CD integration** | Basic hooks | Automated PR review, GitHub Actions, scheduled tasks |
| **Support** | Community, docs | Priority support, SLA (Enterprise plans) |

---

## Upgrade Criteria

### 1. Project Complexity → Model Capability

**Upgrade when:** Your tasks regularly hit context limits or reasoning depth that free agents can't match.

| Trigger | What You're Hitting | Which Paid Agent Helps |
|---|---|---|
| **Large refactors** (50+ files, cross-module changes) | Agent runs out of context mid-task, or proposes incorrect architecture | **Claude Code** Opus or **Kiro** with spec-driven planning |
| **Planning before building** (architecture, tech stack decisions) | Free agents jump to code without exploring alternatives | **Claude Code** Plan Mode or **Kiro** specs |
| **Multimodal debugging** (UI bugs from screenshots, PDF specs) | Free agents can't read images or complex documents reliably | **Claude Code** (fully multimodal since day one) |
| **Property-based testing** (edge cases unit tests miss) | Writing test cases that fail before code is written | **Kiro** (built-in PBT with fuzz testing) |

> From the [Mastering Claude Code](https://www.youtube.com/watch?v=6eBSHbLKuN0) talk: Boris at Anthropic said that when an agent can "check its own work" — by writing tests, taking screenshots, or iterating — it converges to near-perfect results. Paid agents make this loop faster.

### 2. Team Size → Shared Configuration

**Upgrade when:** You're working with 3+ engineers who need consistent tooling.

| Team Size | Free Tools | When Paid Makes Sense |
|---|---|---|
| **Solo** | OpenCode Zen ($10/mo) is sufficient | — |
| **2–3** | Shared CLAUDE.md + manual setup | Codex CLI (free with ChatGPT Plus already bought) |
| **4+** | Config drift, inconsistent workflows | **Claude Code** Teams plan with managed settings, or **Kiro** with shared steering files |
| **Enterprise (50+)** | No centralized control | **Claude Code** Enterprise or **Kiro** with IAM/SSO |

**Red flags you're outgrowing free tools:**
- Engineers argue about coding standards in code reviews
- MCP server configs break when cloning a teammate's branch
- No centralized spend tracking — "who used all the API tokens?"
- New hires take days to set up their agent environment

### 3. Workflow Sophistication → Orchestration Needs

**Upgrade when:** You need tasks that run unattended, across multiple agents, with persistence.

| Workflow Need | Free Agent Limitation | Paid Agent Solution |
|---|---|---|
| **Nightly CI checks** | OMP hooks don't persist or resume | **Claude Code** scheduled tasks / GitHub Actions |
| **Multi-day code migrations** | Sessions time out, no handoff between engineers | **Kiro** cloud sessions that persist across disconnects |
| **Parallel feature development** | Manual tmux/screen management | **Kiro** sub-agents or **Claude Code** agent view |
| **Automated PR review** | No bot account | **Claude Code** GitHub app (tag @claude on any PR) |
| **Spec validation before coding** | Agents skip design and go straight to code | **Kiro** specs with automated reasoning checks |

> From the [10-minute Claude Code tutorial](https://www.youtube.com/watch?v=3aKVArutiIU): The "ultra planning" layer uses plan mode + sub-agents so multiple Claude instances design a plan independently, then you (the human) pick the best one — something impossible with free agents.

### 4. Budget → Cost Analysis

**Upgrade when:** The cost of developer time exceeds the subscription price.

#### Monthly Cost Comparison

| Tool | Monthly Cost (per user) | What You Get | Free Tier? |
|---|---|---|---|
| **OpenCode Zen** | $10 | Full Claude Sonnet access, MCP tools, terminal agent | Yes (limited) |
| **OpenCode Free** | $0 | Basic agent, limited model access | Yes (forever) |
| **OMP** | $0 | Advanced orchestration, multi-agent, cost tracking | Yes (forever) |
| **Claude Code Pro** | $20 | Claude Sonnet + Haiku, full feature set | No |
| **Claude Code Max** | $105 | Claude Opus (deep planning, complex tasks) | No |
| **Claude Code Enterprise** | Up to $210 | SSO, audit logs, dedicated capacity | No |
| **Codex CLI** | $0 (with ChatGPT Plus $20) or pay-per-token | o1, GPT-5, o3 via API | Free with Plus; pay per token via API |
| **Kiro** | Credit-based | Starts ~$10/credit-bundle; no daily limits | No |

#### Break-even Scenarios

- **$10 → $20/month (OpenCode Zen → Claude Code Pro):** Worth it if you save just **2 hours/month** at a $10/hour rate (or more if you bill higher). Claude Code's faster planning and better codebase Q&A typically saves 3–5 hours on large tasks.
- **$10 → $105/month (OpenCode → Claude Code Max):** Worth it if you're doing **1+ complex projects per month** where Opus-level reasoning prevents a rewrite. A single avoided rework cycle (4–8 hours) pays for the month.
- **$0 → Kiro credits:** If your team does **spec-driven development** (writing requirements before code), the time saved on back-and-forth and bug fixes typically pays for credits within 2–3 major features.

### 5. Enterprise Requirements → Compliance & Control

**Upgrade when:** Your organization has policies free tools can't satisfy.

| Requirement | Free Tool Gap | Paid Agent Coverage |
|---|---|---|
| **SSO login** | No enterprise IDP support | Claude Code Enterprise (SAML/OIDC), Kiro (IAM/SSO) |
| **Cost caps per team** | No centralized billing | Claude Code team spend limits, Kiro credit budgets |
| **Audit trails** | No usage logging | Claude Code analytics dashboard, Kiro usage tracking |
| **Model routing through AWS** | No Bedrock integration | **Claude Code** with [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) |
| **Zero data retention** | Data may be used for training | Claude Code ZDR (Enterprise only), Kiro (AWS compliance) |

> **Bedrock tip:** If you're already on AWS, you can route Claude Code through [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) instead of subscribing directly to Anthropic. This uses your existing IAM credentials, billing, and compliance policies — often cheaper than a per-user Max subscription for large teams. Claude models on Bedrock include Claude 5.x (Fable 5.1, Opus 5, Sonnet 5, Haiku 4.5), Claude 4.x (Opus 4.8, 4.7, 4.6, Sonnet 4.6, 4.5), and Claude 3.x (Haiku, 3.5 Haiku).

---

## Decision Flowchart

Use this quick decision tree to pick your upgrade path:

1. **Are you working solo on small projects?** → Stay on **OpenCode** or **OMP**. No upgrade needed.
2. **Do you have ChatGPT Plus already?** → Try **Codex CLI** (free with your existing subscription).
3. **Are you on a team (3+ people) or need SSO?** → **Claude Code** Teams or **Kiro** with IAM.
4. **Do you need structured specs, property-based testing, or parallel agents?** → **Kiro**.
5. **Are you on AWS and want to use existing IAM billing?** → **Claude Code on Amazon Bedrock**.
6. **Do you need the absolute best reasoning model (Opus-level)?** → **Claude Code** Max plan.

---

## Quick Reference: Upgrade Checklist

| ✅ I should upgrade when... | Recommended Paid Agent |
|---|---|
| My team argues about code standards and MCP configs break across repos | Claude Code Teams |
| I need to run coding agents in CI/CD (nightly checks, PR review bots) | Claude Code (GitHub Actions or Bedrock) |
| I want OpenAI's latest models (o1, GPT-5) and already pay for ChatGPT | Codex CLI (free with Plus) |
| I need spec-driven development with property-based testing | Kiro |
| I want agents that persist across disconnects and run in the cloud | Kiro (cloud sessions) |
| My org is on AWS and I want IAM-based auth, not per-user subscriptions | Claude Code on Amazon Bedrock |
| I need to handle 15+ file migrations with minimal supervision | Kiro or Claude Code Max (Opus) |

---

## Key Takeaways

- **Most developers don't need to upgrade immediately** — OpenCode Zen ($10/mo) covers 80% of coding agent use cases
- **Teams of 3+ should evaluate Claude Code Teams or Kiro** for shared config, SSO, and cost controls
- **ChatGPT Plus subscribers get Codex CLI for free** — lowest-friction paid option
- **AWS shops should route Claude Code through Bedrock** — it's often cheaper than per-user Max subscriptions and uses existing IAM/billing
- **Kiro is the outlier** — it's the only tool here that does spec-driven development and property-based testing, making it worth evaluating if you write safety-critical code
- **All three support the MCP servers you've already set up** — upgrading doesn't mean re-doing your tool integrations

## 📚 Recommended Reading (Web Links)

1. [Claude Code Pricing](https://claude.com/pricing) — Compare Pro, Max, and Enterprise plans with subscription costs
2. [Claude Code on Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) — Configure Claude Code with AWS IAM, model pinning, and credential management
3. [Amazon Bedrock Model Catalog](https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html) — Full list of Claude and other models available on AWS Bedrock
4. [Codex Authentication](https://developers.openai.com/codex/auth) — Sign in with ChatGPT vs. API key setup
5. [Kiro Pricing](https://kiro.dev/pricing/) — Credit-based pricing model with no daily or weekly limits
6. [ChatGPT Plan Comparison](https://help.openai.com/en/articles/11369540-codex-in-chatgpt) — What's included in Plus, Pro, Business, Edu, and Enterprise plans for Codex CLI

---

← [Back to Section Index](index.md) | ← [Previous Topic](01-installing-paid.md) | [Next Section: Free-Tier LLMs →](../11-free-tier-llms/index.md)

[← Main Index](../index.md) | [Table of Contents](index.md)