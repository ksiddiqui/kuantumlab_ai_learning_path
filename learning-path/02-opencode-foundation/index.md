<!-- Navigation: Top -->
← [Back to Main Index](../index.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → **Section 2: OpenCode Foundation**

---

# OpenCode Foundation

> Get hands-on with OpenCode, the open-source AI coding agent that runs in your terminal. In this section, you'll install it, learn how its agent loop works, and scaffold a real Python project — all from natural-language prompts.

---

## What Is OpenCode?

OpenCode is a free, **open-source AI coding agent** built by the team behind SST and the SST stack. It runs inside your terminal (like Claude Code or Cursor's agent mode) and can:

- Read and edit your files
- Run terminal commands (Git, tests, builds, deployments)
- Search the web for documentation
- Call APIs and MCP tools
- Work across 75+ LLM providers (Anthropic, OpenAI, Google, local models, and more)

Unlike a chatbot that only chats, OpenCode is an **agent** — it takes steps toward a goal, asks for permission before risky actions, and remembers context across a conversation.

---

## What You'll Learn in This Section

| Page | Topic | Time | Key Skills |
|---|---|---|---|
| [01. What Is OpenCode?](01-what-is-opencode.md) | Install and connect your first LLM provider | 45 min | Install via curl/npm/brew, run `/connect`, configure Zen or OpenAI key |
| [02. How It Works](02-how-it-works.md) | Understand the agent loop and built-in tools | 60 min | Agent loop, permissions, built-in tools (bash, file read/edit, grep, glob), `/init` and `AGENTS.md` |
| [03. Basic Commands](03-basic-commands.md) | Navigate the TUI and run non-interactive prompts | 45 min | Slash commands (`/help`, `/models`, `/connect`), CLI commands (`opencode run`), `@` file references, `!` bash shorthand, `ctrl+x` leader key |
| [04. First Workflow](04-first-workflow.md) | Scaffold and verify a Python project end to end | 60 min | `/init`, ask for scaffold, inspect generated files, run tests, iterate |

**Total time:** 3–4 hours

---

## Before You Start

- A GitHub account (free)
- An API key for at least one LLM provider (you can start with [OpenCode Zen](https://opencode.ai/zen) for $10/month, or connect your own OpenAI/Anthropic key)
- A modern terminal emulator (WezTerm, Alacritty, Kitty, Ghostty, or Windows Terminal)

---

## Recommended Order

1. **Install OpenCode** — use the curl script or your package manager of choice
2. **Connect a provider** — run `/connect` in the TUI or use `opencode auth login` on the CLI
3. **Run `/init`** — let OpenCode index your project and create an `AGENTS.md` file
4. **Try a simple task** — "summarize this codebase" or "find the auth logic"
5. **Build something** — scaffold a Python project, write tests, and iterate

---

## What's Next?

After this section, you'll move on to [Section 3: Prompt Engineering](../03-prompt-engineering/index.md) to learn how to write prompts that produce reliable, predictable code instead of guesswork.

---

<!-- Navigation: Bottom -->
[← Main Index](../index.md) | [01. What Is OpenCode?](01-what-is-opencode.md) →
