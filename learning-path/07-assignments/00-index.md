← [Back to Main Index](../00-index.md) | [← Previous Section: Use Cases](../06-use-cases/00-index.md) | [Next Section: Oh My Pi →](../08-omp/00-index.md)

[← Main Index](../00-index.md) → [Section 6: Assignments](00-index.md) → **Current Page**

# Assignments

> Complete 10 hands-on exercises that reinforce everything you've learned about AI agents, MCP servers, prompt engineering, and deployment. Each assignment links to a step-by-step solution in the [Assignment Solutions guide](solutions.md).

## 📺 Recommended Videos

1. [Let The LLM Write The Prompt 2025 | Design Perfect Prompts for AI Agent](https://www.youtube.com/watch?v=2BpCk4d2Cc0) — designing prompts that produce debuggable agent output
2. [MCP Complete Explanation](https://www.youtube.com/watch?v=_fzpnqt39jZ) — How MCP connects any tool to any agent (used in Assignments 2, 4, 5, 9)
3. [The Best FREE AI Coding Agent for VS Code](https://www.youtube.com/watch?v=0pfOPZRRxmk) — full-file editing workflows needed for the microsite build (Assignment 8)

## What You'll Build

This section contains 10 assignments that each take **1–2 hours** to complete. Together they cover:

- **Debugging** AI-generated code (Assignment 1)
- **Tool integration** via MCP servers (Assignments 2, 4, 5, 9)
- **Prompt design** and reusable libraries (Assignment 3)
- **System administration** automation (Assignment 6)
- **Research report** generation and PDF export (Assignment 7)
- **Web deployment** with GitHub Pages (Assignment 8)
- **Multi-agent collaboration** (Assignment 10)

> 💡 **Pro tip:** Try each assignment on your own first. If you get stuck, read the corresponding section in [Assignment Solutions](solutions.md) for guided walkthroughs.

## Assignments Overview

| # | Assignment | Topic | Est. Time | Key Skills |
|---|-----------|-------|----------|------------|
| 1 | [Fix the Agent](#assignment-1-fix-the-agent) | Debugging | 1h | Error tracing, defensive coding, edge-case handling |
| 2 | [Skill Installation](#assignment-2-skill-installation) | MCP setup | 1.5h | MCP server config, authentication, OpenCode integration |
| 3 | [Custom Prompt Library](#assignment-3-custom-prompt-library) | Prompt design | 1.5h | XML prompt structure, reusable templates, output formatting |
| 4 | [Web Scraping Pipeline](#assignment-4-web-scraping-pipeline) | Data extraction | 1.5h | Web search MCP, content extraction, markdown output |
| 5 | [Email Research Report](#assignment-5-email-research-report) | Email automation | 1.5h | Gmail MCP, OAuth, email search/summarization |
| 6 | [Local Environment Audit](#assignment-6-local-environment-audit) | System admin | 1h | Shell commands, resource monitoring, health reporting |
| 7 | [Research Report Generator](#assignment-7-research-report-generator) | Report writing | 2h | Multi-source research, PDF generation, report synthesis |
| 8 | [Deploy a Microsite](#assignment-8-deploy-a-microsite) | Deployment | 1.5h | HTML/CSS, GitHub Pages, responsive design, dark mode |
| 9 | [Custom MCP Server](#assignment-9-custom-mcp-server) | MCP development | 2h | Python MCP SDK, API wrapping, async handlers |
| 10 | [Multi-Agent Challenge](#assignment-10-multi-agent-challenge) | Agent orchestration | 2h | Agent personas, file-based handoff, collaboration |

---

## Assignment 1: Fix the Agent

**Topic:** Debugging AI-generated Python code

**Problem:** OpenCode generated a Python script that has 3 bugs — a logic error, an edge-case failure, and a crash on invalid input.

**Goal:** Run the script, identify all three bugs, and fix them so it handles empty input and malformed data gracefully.

**Hint:** Run the script first to see the actual error. Then check: (1) Is the average calculated correctly? (2) What happens with an empty list? (3) What happens if the JSON file is malformed?

**Solution:** See [Assignment Solutions — Assignment 1](solutions.md#assignment-1-fix-the-agent)

---

## Assignment 2: Skill Installation

**Topic:** MCP server setup

**Problem:** Install and configure 3 MCP servers of your choice so they're available in OpenCode.

**Goal:** Get 3 MCP servers working — one for each of: filesystem access, web search, and a third of your choice (GitHub, Slack, etc.).

**Hint:** Each MCP needs its own authentication method. Install and test one at a time before combining. Check each MCP's GitHub README for config examples.

**Solution:** See [Assignment Solutions — Assignment 2](solutions.md#assignment-2-skill-installation)

---

## Assignment 3: Custom Prompt Library

**Topic:** Prompt engineering

**Problem:** Create a prompt library with 5 templates for different agent tasks.

**Goal:** Build a `prompts/` directory with 5 well-structured XML templates covering research, code review, email response, data analysis, and content rewriting.

**Hint:** Use XML tags to make prompts scannable. Always specify the output format explicitly. Version-control your prompts like code — they evolve over time.

**Solution:** See [Assignment Solutions — Assignment 3](solutions.md#assignment-3-custom-prompt-library)

---

## Assignment 4: Web Scraping Pipeline

**Topic:** Data extraction

**Problem:** Build a pipeline that searches for AI agent news, extracts article content, and saves everything to markdown.

**Goal:** Chain MCP tools (search → extract → summarize → write) to produce a structured markdown report saved to `docs/`.

**Hint:** Chain tools step-by-step: search → read → extract → write. Check URL accessibility before scraping. Save intermediate results so you can resume if a step fails.

**Solution:** See [Assignment Solutions — Assignment 4](solutions.md#assignment-4-web-scraping-pipeline)

---

## Assignment 5: Email Research Report

**Topic:** Email automation

**Problem:** Use the Gmail MCP to find emails about a topic, summarize them, and export to markdown.

**Goal:** Search your inbox for emails on a chosen topic, summarize key findings, and save a structured report.

**Hint:** Use Gmail search syntax like `subject:"topic" after:2024/01/01`. Keep OAuth credentials secure — never commit them to git. Start with a small time window before expanding.

**Solution:** See [Assignment Solutions — Assignment 5](solutions.md#assignment-5-email-research-report)

---

## Assignment 6: Local Environment Audit

**Topic:** System administration

**Problem:** Write prompts that audit disk, memory, and CPU usage, then generate a health report.

**Goal:** Run system commands through an agent, collect resource data, and compile a markdown health report with status ratings (OK/Warning/Critical).

**Hint:** Use `2>/dev/null` to suppress permission errors. Format output as markdown tables. Add safety checks before running destructive commands like `rm` or `brew cleanup`.

**Solution:** See [Assignment Solutions — Assignment 6](solutions.md#assignment-6-local-environment-audit)

---

## Assignment 7: Research Report Generator

**Topic:** Research and documentation

**Problem:** Create a 5-section research report on a topic of your choice, then convert it to PDF.

**Goal:** Research a topic thoroughly (15+ sources), synthesize findings into 5 sections, and produce a PDF document.

**Hint:** Read sources in batches of 5 across multiple iterations. Use a "source tracker" table to avoid duplicating effort. PDF generation is a separate step — use `pandoc` or `wkhtmltopdf`.

**Solution:** See [Assignment Solutions — Assignment 7](solutions.md#assignment-7-research-report-generator)

---

## Assignment 8: Deploy a Microsite

**Topic:** Web deployment

**Problem:** Create and deploy a single-page website using GitHub Pages or Cloudflare Pages.

**Goal:** Build a responsive portfolio site with hero, projects, and contact sections — including dark/light mode toggle — and deploy it to a live URL.

**Hint:** GitHub Pages is truly free but limited to static files. Use Formspree for backend-free forms. Add `<meta name="viewport">` for mobile. Test locally with `npx serve .` before deploying.

**Solution:** See [Assignment Solutions — Assignment 8](solutions.md#assignment-8-deploy-a-microsite)

---

## Assignment 9: Custom MCP Server

**Topic:** MCP development

**Problem:** Build a simple MCP server that wraps a public API.

**Goal:** Create a Python MCP server that fetches data from a public API (e.g., JokeAPI) and register it so OpenCode can use it.

**Hint:** The MCP SDK handles the boilerplate — you just define your tools. Use async handlers for API calls. Always handle API errors gracefully. Test locally before registering globally.

**Solution:** See [Assignment Solutions — Assignment 9](solutions.md#assignment-9-custom-mcp-server)

---

## Assignment 10: Multi-Agent Challenge

**Topic:** Agent orchestration

**Problem:** Create 2 custom agents with different personas that collaborate on a task.

**Goal:** Define a Researcher agent and a Writer agent, then orchestrate them to produce a multi-page analysis on a chosen topic.

**Hint:** Each agent should have a narrow, well-defined role. Pass data between agents via files (more reliable than shared state). Test each agent independently first. Document what each agent does for future reuse.

**Solution:** See [Assignment Solutions — Assignment 10](solutions.md#assignment-10-multi-agent-challenge)

---

## How to Submit Your Work

1. **Complete each assignment** — try on your own first, then check solutions if stuck
2. **Save your outputs** — each assignment should produce files in your working directory
3. **Document what you learned** — add a short note at the end of each task
4. **Review solutions** — read the [full solution guide](solutions.md) to compare approaches

> 📝 **Bonus:** The last 3 sections of the learning path (OMP, other agents, free-tier LLMs) build directly on skills from these assignments. Keep your outputs handy.

## Key Takeaways

- Debugging AI-generated code requires running it first — read the error, fix the root cause, not the symptom
- MCP servers unlock any tool for any agent, but each needs its own auth flow
- Breaking complex tasks into steps (search → extract → summarize) makes agent pipelines reliable
- Passing data between agents via files is more robust than shared state
- Deploying to GitHub Pages costs nothing and builds real portfolio pieces

## 📚 Recommended Reading

1. [Assignment Solutions Guide](solutions.md) — Full step-by-step solutions for all 10 assignments
2. [OpenCode Documentation](https://docs.opencode.com) — Official command reference and MCP setup guide
3. [Model Context Protocol](https://modelcontextprotocol.io) — MCP specification and server registry
4. [GitHub Pages Docs](https://docs.github.com/pages) — Deployment and custom domain configuration

---

← [Back to Main Index](../00-index.md) | [Assignment Solutions Guide](solutions.md) | [Next Section: Oh My Pi →](../08-omp/00-index.md)
