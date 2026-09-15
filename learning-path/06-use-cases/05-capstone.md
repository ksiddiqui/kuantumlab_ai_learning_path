← [Back to Section Index](00-index.md) | ← [Previous Topic](04-deploy-website.md)

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **AI Meeting Assistant Capstone**

---

# Use-Case 5: Capstone — Build an AI Meeting Assistant

> **Combine every skill in this learning path to build a portfolio-worthy AI Meeting Assistant: it reads meeting transcripts, generates notes and action items, drafts follow-up emails, and deploys a live dashboard — all orchestrated by AI agents.**

## 📺 Recommended Videos

These videos cover the key tools you will integrate into the capstone project. Review them before starting:

1. [Agentic Framework LangGraph explained in 8 minutes](https://www.youtube.com/watch?v=1Q_MDOWaljk) — multi-agent orchestration for the capstone
2. [Learn 80% of Claude Code in 10 Minutes](https://www.youtube.com/watch?v=3aKVArutiIU) — code generation for the dashboard
3. [oh-my-pi: The Coding Agent With An IDE Inside](https://www.youtube.com/watch?v=0fAMlarIELw) — OMP multi-agent and hooks for automation
4. [Don't sleep on the Pi agent, it solves the sandbox problem](https://www.youtube.com/watch?v=1ZsFjM6yZGI) — OMP advanced features

## Understanding the Capstone

> This project is not a toy. It combines **transcript processing**, **intelligent summarization**, **action-item extraction**, **email automation**, **web deployment**, and **multi-agent orchestration** — the full stack of skills covered in Sections 1–4.

### What Is It?

The AI Meeting Assistant is a system with these capabilities:

1. **Transcript ingestion** — reads a Zoom or Google Meet transcript (VTT or TXT format).
2. **Smart summarization** — generates meeting notes with section headers (Decisions, Discussion, Questions).
3. **Action item extraction** — identifies who is responsible for what, with deadlines.
4. **Follow-up email drafting** — writes a draft email to each action item owner with their assignments.
5. **Dashboard deployment** — hosts a live web page that displays the notes, action items, and past meetings.

### Why You Need This

- **Portfolio impact:** This single project demonstrates end-to-end full-stack AI agent engineering — the most in-demand skill for AI tooling roles.
- **Real utility:** You will use this tool after the learning path ends. Unlike toy projects, it solves a genuine productivity problem.
- **Multi-agent mastery:** OMP's multi-agent feature lets you assign different personas (Summarizer, ActionItemExtractor, EmailWriter, DashboardDeployer) — each with different instructions and tools.

## Before You Start

**Skills you must have completed:**
- [Section 3](01-local-machine.md) — at least 4 MCPs installed (web search, filesystem, bash, Gmail or email)
- [Section 4](02-web-research-report.md) — agent persona design and multi-agent patterns
- [Section 7](03-gmail-research.md) — OMP multi-agent configuration

**Tools required:**
- OMP (preferred for multi-agent orchestration) or OpenCode with multiple MCPs
- A sample meeting transcript (you can generate one using the prompt from Step 1 below)
- A free deployment target (GitHub Pages or Cloudflare Pages)
- A free email API (Resend, EmailJS, or Gmail MCP)

## Step-by-Step Guide

### Step 1: Generate a Sample Transcript

If you don't have a real meeting transcript, generate one:

**Prompt:**
```text
Generate a realistic 20-minute team meeting transcript (Zoom-style speaker turns) with at least 6 participants discussing the launch of a new AI feature. Include:
- A discussion of the timeline and dependencies
- At least 2 decisions made during the meeting
- At least 3 action items assigned to specific people with deadlines
- Some off-topic discussion (keep it natural)
- A mix of technical and logistical topics

Save as `sample_transcript.txt` with clear speaker labels (e.g., "ALEX: ...", "SARAH: ...").
```

### Step 2: Define Multi-Agent Personas (OMP Configuration)

If using OMP, create a repo-local `.omp/config.yaml` with four specialized agents:

**Prompt:**
```text
Create a `.omp/config.yaml` file for OMP that defines four child agents with these personas:

1. **SummarizerAgent** — persona: "You are a concise technical writer. You extract decisions, key discussion points, and open questions from meeting transcripts." Tools: filesystem, bash
2. **ActionExtractorAgent** — persona: "You are a meticulous project manager. You find every action item in text, extract the assignee, the task description, and the deadline. Output as a markdown table." Tools: filesystem, bash
3. **EmailDraftAgent** — persona: "You are a professional email writer. You write clear, actionable follow-up emails to action item owners, referencing the meeting context." Tools: filesystem, bash, gmail-mcp (read-only for sender identity)
4. **DashboardDeployAgent** — persona: "You are a deployment engineer. You create a responsive HTML dashboard and deploy it to GitHub Pages." Tools: filesystem, bash, github-mcp

Each agent should inherit from a `BaseMeetingAgent` persona with rules: "Always cite line numbers from the transcript," "Never fabricate action items," "Format outputs as markdown tables when possible."

Write the YAML config and explain how to activate each agent.
```

### Step 3: Run the Summarizer Agent

**Prompt (to SummarizerAgent):**
```text
Read `sample_transcript.txt`. Produce structured meeting notes with these sections:
- **Decisions Made** (list each with ✓ and a one-line description)
- **Key Discussion Points** (bullet list with speaker attribution)
- **Open Questions** (list any unresolved items)
- **Timeline Updates** (any dates or deadlines mentioned)

Save to `meeting_notes.md`. Use the transcript line numbers as references (e.g., "[L45]").
```

### Step 4: Extract Action Items

**Prompt (to ActionExtractorAgent):**
```text
Read `sample_transcript.txt`. Extract every action item. For each, capture:
- **Owner** — the person assigned (full name, not just initials)
- **Task** — what they need to do
- **Deadline** — the date or timeframe mentioned
- **Context** — the meeting topic it relates to
- **Line Reference** — the transcript line(s) where it was mentioned

Save to `action_items.md` as a markdown table. If a deadline is not mentioned, write "TBD".
```

### Step 5: Draft Follow-Up Emails

**Prompt (to EmailDraftAgent):**
```text
Read `action_items.md`. For each unique action item owner, draft a personalized follow-up email that:
- References the meeting topic
- Lists their action items (with deadlines)
- Includes a link to the dashboard (use a placeholder URL for now)
- Has a professional but friendly tone

Save all drafts to `followup_emails.md` with clear separators between each email. Do not send anything.
```

### Step 6: Build and Deploy the Dashboard

**Prompt (to DashboardDeployAgent):**
```text
Create a dashboard website that displays:
- Meeting notes (from `meeting_notes.md`)
- Action items (from `action_items.md`) as a filterable, sortable table
- A "Past Meetings" section listing 3-5 previous meeting titles (generate plausible ones)

Design requirements:
- Single-page HTML with vanilla CSS/JS (no frameworks)
- Dark mode toggle
- Mobile-responsive
- SEO-optimized with meta tags

Then deploy to GitHub Pages:
1. Create a new GitHub repo called `meeting-assistant-dashboard`
2. Commit and push the code
3. Enable GitHub Pages from the main branch
4. Verify the live URL

Report the final URL when done.
```

### Step 7: Orchestrate with a Parent Agent (OMP Multi-Agent)

If using OMP, run the full pipeline in one command:

**Prompt (to the parent/BaseMeetingAgent):**
```text
Run the full AI Meeting Assistant pipeline:
1. Activate SummarizerAgent on `sample_transcript.txt` → `meeting_notes.md`
2. Wait for results, then activate ActionExtractorAgent → `action_items.md`
3. Activate EmailDraftAgent on the action items → `followup_emails.md`
4. Activate DashboardDeployAgent to build and deploy the dashboard
5. After all steps complete, create a `capstone_summary.md` with:
   - What each agent did
   - Any failures or retries
   - The final dashboard URL
   - Token usage per agent (use OMP's cost tracking)
   - Lessons learned

This should be a single multi-agent session — do not ask me for intermediate approval.
```

## Skills Demonstrated

- **Multi-agent orchestration** — coordinating specialized agents with different personas and tool sets
- **Transcript processing** — reading, parsing, and extracting structured data from unstructured text
- **Summarization and action-item extraction** — natural language understanding for meeting workflows
- **Email automation** — drafting personalized, context-aware follow-up emails
- **Dashboard development and deployment** — full-stack HTML/CSS/JS generation + GitHub Pages deployment

## Common Pitfalls

- ❌ **Action items fabricated** — The agent may invent tasks or assignees not in the transcript. Always have the agent cite line numbers; review the citations.
- ❌ **Dashboard deployment fails silently** — GitHub Pages can take 1–2 minutes to build. Always verify the URL returns 200.
- ❌ **Parent agent loses child context** — In OMP, use `child_output` to capture each agent's result before passing it to the next step.
- ❌ **Multi-agent scope creep** — Each agent should have a tight, specific persona. A "do-everything" agent is worse than four focused ones.
- ❌ **Forgetting the learning journal** — Document what worked and what didn't in `capstone_summary.md`. This becomes portfolio content for LinkedIn posts.

## Quick Reference

| Step | Agent | Input | Output |
|---|---|---|---|
| 1 | (manual) | — | `sample_transcript.txt` |
| 2 | Parent | Config instructions | `.omp/config.yaml` |
| 3 | SummarizerAgent | `sample_transcript.txt` | `meeting_notes.md` |
| 4 | ActionExtractorAgent | `sample_transcript.txt` | `action_items.md` |
| 5 | EmailDraftAgent | `action_items.md` | `followup_emails.md` |
| 6 | DashboardDeployAgent | `meeting_notes.md`, `action_items.md` | Live dashboard URL |
| 7 | Parent (automated) | All above | `capstone_summary.md` |

## Key Takeaways

- This capstone is a genuine **portfolio-worthy project** — it demonstrates the full range of AI agent engineering skills.
- **Multi-agent orchestration** is the capstone skill: each agent has a narrow, well-defined role, and the parent coordinates them.
- The dashboard URL and `capstone_summary.md` become your **evidence of capability** for job applications and LinkedIn posts.

## 📚 Recommended Reading (Web Links)

1. [OMP Official Site & Documentation](https://omp.ohmy.tools/) — multi-agent, hooks, and cost tracking
2. [OMP Multi-Agent Documentation](https://omp.ohmy.tools/multi-agent) — spawning child agents and orchestration
3. [OMP Agent Configuration Guide](https://omp.ohmy.tools/config) — YAML schema for agent personas
4. [OMP Hooks Documentation](https://omp.ohmy.tools/hooks) — pre/post action hook system for automation
5. [LangGraph Documentation](https://python.langchain.com/docs/langgraph) — agent graphs and orchestration
6. [CrewAI Documentation](https://docs.crewai.com/) — role-based multi-agent workflows
7. [GitHub Pages](https://pages.github.com/) — free deployment target
8. [Model Context Protocol: What is MCP?](https://modelcontextprotocol.io/docs/introduction) — MCP architecture for tool integration
9. [OpenRouter Docs: Models](https://openrouter.ai/models) — model selection for cost-efficient agent workflows

---

← [Back to Section Index](00-index.md) | ← [Previous Topic](04-deploy-website.md)

[← Main Index](../00-index.md) | [Section Index](00-index.md)
