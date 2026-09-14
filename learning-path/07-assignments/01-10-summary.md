← [Back to Section Index](index.md) | [← Back to Main Index](../index.md)

[← Main Index](../index.md) → [Section Index](index.md) → **Summary of All 10 Assignments**

# Summary: All 10 Assignments

> A quick-reference overview of every assignment in this learning path. Each entry shows the **problem**, the **goal**, and a **hint** to get you started. Full step-by-step solutions are in the [Assignment Solutions Guide](solutions.md).

---

## Assignment 1 — Fix the Agent

| Field | Detail |
|---|---|
| **Problem** | OpenCode generated a Python script with 3 bugs: a logic error in the average calculation, a crash on empty input, and a crash on malformed JSON. |
| **Goal** | Run the script, find and fix all three bugs so it handles edge cases and invalid data gracefully. |
| **Hint** | Run the script first and read the traceback. Check: (1) Is the average using the right variable? (2) What happens with an empty list? (3) Is JSON loading wrapped in error handling? |

**Solution:** [Assignment 1 in Solution Guide](solutions.md#assignment-1-fix-the-agent)

---

## Assignment 2 — Skill Installation

| Field | Detail |
|---|---|
| **Problem** | No MCP servers are installed — OpenCode has no web search, filesystem, or external tool access. |
| **Goal** | Install and configure 3 MCP servers (e.g., filesystem, web search, and one more of your choice) so they work in OpenCode. |
| **Hint** | Install and test one MCP at a time. Each needs its own authentication — check the GitHub README for exact config syntax. |

**Solution:** [Assignment 2 in Solution Guide](solutions.md#assignment-2-skill-installation)

---

## Assignment 3 — Custom Prompt Library

| Field | Detail |
|---|---|
| **Problem** | Agent responses are inconsistent because prompts are ad-hoc — there's no reusable template library. |
| **Goal** | Create a `prompts/` directory with 5 XML-structured templates: research, code review, email response, data analysis, and content rewriting. |
| **Hint** | Use XML tags (`<task>`, `<instructions>`, `<constraints>`) to make prompts scannable. Always specify the output format. Version-control your prompts. |

**Solution:** [Assignment 3 in Solution Guide](solutions.md#assignment-3-custom-prompt-library)

---

## Assignment 4 — Web Scraping Pipeline

| Field | Detail |
|---|---|
| **Problem** | No automated way to search the web, extract article content, and save it to a structured markdown file. |
| **Goal** | Build a pipeline that searches for "AI agent news", extracts content from the top results, summarizes each, and saves to `docs/ai_agent_news.md`. |
| **Hint** | Chain tools step-by-step: search → read → extract → summarize → write. Save intermediate results so you can resume if a step fails. |

**Solution:** [Assignment 4 in Solution Guide](solutions.md#assignment-4-web-scraping-pipeline)

---

## Assignment 5 — Email Research Report

| Field | Detail |
|---|---|
| **Problem** | No way to search your email for a topic, summarize the contents, and export findings to a markdown report. |
| **Goal** | Use the Gmail MCP to search your inbox for emails on a topic, summarize key points from each, and save a structured report. |
| **Hint** | Use Gmail search syntax: `subject:"topic" after:2024/01/01`. Keep OAuth credentials secure — never commit to git. Start with a small time window. |

**Solution:** [Assignment 5 in Solution Guide](solutions.md#assignment-5-email-research-report)

---

## Assignment 6 — Local Environment Audit

| Field | Detail |
|---|---|
| **Problem** | No automated system health check — you can't quickly see disk, memory, and CPU usage in one report. |
| **Goal** | Run system commands through an agent, collect resource data, and compile a markdown health report with OK/Warning/Critical ratings. |
| **Hint** | Use `2>/dev/null` to suppress permission errors. Format output as markdown tables. Add safety checks before destructive commands. |

**Solution:** [Assignment 6 in Solution Guide](solutions.md#assignment-6-local-environment-audit)

---

## Assignment 7 — Research Report Generator

| Field | Detail |
|---|---|
| **Problem** | No repeatable workflow to research a topic, synthesize findings from 15+ sources, and produce a PDF report. |
| **Goal** | Research a topic thoroughly, synthesize findings into a 5-section report (Executive Summary, Current Landscape, Key Technologies, Limitations, Future Outlook), and export to PDF. |
| **Hint** | Read sources in batches of 5 across multiple iterations. Use a "source tracker" table to avoid duplicating effort. PDF generation is a separate step — use `pandoc` or `wkhtmltopdf`. |

**Solution:** [Assignment 7 in Solution Guide](solutions.md#assignment-7-research-report-generator)

---

## Assignment 8 — Deploy a Microsite

| Field | Detail |
|---|---|
| **Problem** | You have HTML/CSS skills but no live portfolio site on the web — nothing you can show to employers or clients. |
| **Goal** | Create a responsive single-page site (hero, projects, contact form) with dark/light mode toggle, then deploy it to a live URL using GitHub Pages or Cloudflare Pages. |
| **Hint** | Test locally with `npx serve .` first. GitHub Pages is free but static-only. Use Formspree for backend-free contact forms. Add `<meta name="viewport">` for mobile. |

**Solution:** [Assignment 8 in Solution Guide](solutions.md#assignment-8-deploy-a-microsite)

---

## Assignment 9 — Custom MCP Server

| Field | Detail |
|---|---|
| **Problem** | No custom MCP server of your own — you can only use pre-built servers from the registry. |
| **Goal** | Build a Python MCP server that wraps a public API (e.g., JokeAPI), register it in OpenCode config, and verify it responds. |
| **Hint** | The MCP SDK handles the boilerplate — you just define your tools. Use async handlers for API calls. Handle API errors gracefully. Test locally before registering globally. |

**Solution:** [Assignment 9 in Solution Guide](solutions.md#assignment-9-custom-mcp-server)

---

## Assignment 10 — Multi-Agent Challenge

| Field | Detail |
|---|---|
| **Problem** | You've only used single agents — you haven't orchestrated multiple specialized agents working together. |
| **Goal** | Create a Researcher agent and a Writer agent with distinct personas, then orchestrate them to produce a multi-page analysis on a topic of your choice. |
| **Hint** | Each agent needs a narrow, well-defined role. Pass data between agents via files (not shared state). Test each agent independently first. Document what each agent does. |

**Solution:** [Assignment 10 in Solution Guide](solutions.md#assignment-10-multi-agent-challenge)

---

## Assignment Timeline at a Glance

| Order | Assignment | Est. Time | Total Cumulative |
|---|---|---|---|
| 1 | Fix the Agent | 1h | 1h |
| 2 | Skill Installation | 1.5h | 2.5h |
| 3 | Custom Prompt Library | 1.5h | 4h |
| 4 | Web Scraping Pipeline | 1.5h | 5.5h |
| 5 | Email Research Report | 1.5h | 7h |
| 6 | Local Environment Audit | 1h | 8h |
| 7 | Research Report Generator | 2h | 10h |
| 8 | Deploy a Microsite | 1.5h | 11.5h |
| 9 | Custom MCP Server | 2h | 13.5h |
| 10 | Multi-Agent Challenge | 2h | 15.5h |

---

## How to Use This Summary

1. **Pick an assignment** — read its problem, goal, and hint above
2. **Try it yourself** — work through the task without looking at solutions
3. **Check the solution** if you get stuck — each link goes directly to the relevant section in the [Assignment Solutions Guide](solutions.md)
4. **Compare approaches** — review the "Lessons Learned" in each solution to see what best practices you might have missed

> 🔍 **Navigation:** Use [Ctrl+F] (or [Cmd+F]) to search for a specific assignment number or keyword in this page.

## What Comes After

After completing all 10 assignments, you'll have built:

- A debug-tested Python script
- 3 working MCP servers
- A 5-template prompt library
- A web scraping pipeline with markdown output
- An email research report
- A system health audit report
- A 5-section research report in PDF
- A live deployed microsite
- A custom MCP server wrapping a public API
- A multi-agent research + writing pipeline

These outputs feed directly into the portfolio projects in [Section 12 — Project Ideas](../13-project-ideas/index.md).

---

← [Back to Section Index](index.md) | [Assignment Solutions Guide](solutions.md) | [← Back to Main Index](../index.md)
