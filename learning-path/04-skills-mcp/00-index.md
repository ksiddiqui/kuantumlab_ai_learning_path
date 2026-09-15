# Skills & MCP Tools

> **Connecting Tools to Agents** — turning your AI coding agent from a code-writing helper into a universal tool-use platform that can search the web, manage your files, and talk to any API.

## What You'll Build in This Section

By the end of this section you will be able to:

- **Define and manage agent "skills"** — reusable bundles of instructions that give agents persistent capabilities beyond a single conversation
- **Install and configure MCP servers** to connect your agent to web search, Google Drive, GitHub, and other external services
- **Build a custom MCP server** from scratch using the Python SDK — wrapping any public or private API your team uses
- **Understand the LSP ecosystem** and how language servers power intelligent code editing inside your agent
- **Wire everything together** so a single agent session can search the web, read your documents, and ship code — all without you lifting a finger

## Time Estimate

**4–5 hours** of guided reading and hands-on practice.

---

## Topic Overview

| # | Topic | Description | Time |
|---|---|---|---|
| 1 | [What Are Skills?](./01-skills.md) | Reusable agent behaviors, the skill lifecycle (install → configure → use → update), and how to find and install skills in OpenCode & OMP | 45 min |
| 2 | [MCP Servers](./02-mcp-servers.md) | The Model Context Protocol — the "USB-C" of AI tools, client/server architecture, and how agents connect to external services | 1h |
| 3 | [Installing Your First MCPs](./03-installing-mcps.md) | Hands-on: set up Web Search, Google Drive, and GitHub MCP servers | 1h |
| 4 | [Custom MCP Servers](./04-custom-mcp-servers.md) | Build a custom MCP server with the Python SDK, test it locally, and register it with your agent | 1h |
| 5 | [Extensions, Plugins & LSPs](./05-extensions-lsp.md) | Editor extensions, the Language Server Protocol, and how they power code intelligence | 45 min |

---

## The Big Picture

Before this section, your AI agent was limited to whatever built-in tools came pre-installed (usually file reading, terminal commands, and a code editor). After this section, your agent can:

| Your Agent Can Now… | How |
|---|---|
| Search the web for current information | Exa / Firecrawl MCP |
| Read and write Google Docs & Sheets | Google Drive MCP |
| Manage GitHub issues, PRs, and repos | GitHub MCP |
| Talk to your company's internal APIs | Custom MCP server you build |
| Understand code with IDE-like autocomplete | LSP integration |

> 💡 **Key Insight:** MCP servers are "dumb" — they expose a list of available tools, but it's the **agent** that decides which tool to call and when. You don't write prompts for MCP servers; you write a prompt for the agent and let it figure out which installed tools to use.

![MCP Logo](assets/mcp-logo.png)

---

## Prerequisites

- A working AI coding agent (OpenCode or Oh My Pi installed) — see [Section 1](../02-opencode-foundation/00-index.md) and [Section 7](../08-omp/00-index.md)
- Node.js v20+ installed (`node --version`)
- Python 3.11+ installed (`python --version`)
- A GitHub account (free tier is fine)

---

## Navigation

[← Main Index](../00-index.md) | [← Section 2 — Prompt Engineering](../03-prompt-engineering/00-index.md) | [Section 5 — Agent Architecture →](../05-agent-architecture/00-index.md)
