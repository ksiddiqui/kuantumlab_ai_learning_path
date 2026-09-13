<!-- Navigation: Top -->
← [Back to Section Index](index.md) | ← [Previous Topic](01-what-is-opencode.md) | [Next Topic →](03-basic-commands.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → [Section Index](index.md) → **How It Works**

---

# How OpenCode Works

> OpenCode's agent loop is simple: you give it a task, it plans, takes actions (reading files, running commands, writing code), then reports back. This page explains the architecture behind the magic.

---

## 📺 Recommended Videos

1. [OpenCode Tutorial for Beginners: Setup, Agents, Skills & MCP](https://www.youtube.com/watch?v=uZGDO0L-Dr4) — Covers installation, agent switching, skills, and MCP server setup.
2. [OpenCode Tutorial for Beginners: Learn 90% Of OpenCode in Under 25 Minutes](https://www.youtube.com/watch?v=QzqaZshQcJI) — Fast-paced overview of the most useful 90% of OpenCode features, including the agent loop.
3. [OpenCode Installation & Setup Guide](https://www.youtube.com/watch?v=D9qM9HV9QwM) — Step-by-step walkthrough of installing OpenCode and connecting your first LLM provider.

---

## Understanding the Architecture

### What Is the Agent Loop?

The "agent loop" is the repeated cycle an AI agent goes through to complete a task. It looks like this:

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR PROMPT                          │
│    "Create a Python project with tests"                 │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                STEP 1: PLAN                              │
│  OpenCode reads your project, thinks about what's        │
│  needed, and decides on the steps to take.               │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                STEP 2: ACT                               │
│  It calls tools:                                        │
│  • read files                                           │
│  • run terminal commands                                │
│  • write code                                           │
│  • search the web                                       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                STEP 3: OBSERVE                            │
│  OpenCode gets the tool results back (file contents,      │
│  command output, web snippets).                          │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                STEP 4: REPEAT                             │
│  It feeds the new info back into the LLM and decides     │
│  what to do next. Loops until the task is done or        │
│  it's stuck.                                             │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                    YOUR RESPONSE                         │
│  "Here's the project I built. Run the tests to verify."  │
└─────────────────────────────────────────────────────────┘
```

### Two Built-in Agents

OpenCode comes with two agents you can switch between using the **Tab** key in the TUI:

| Agent | Description | When to Use |
|---|---|---|
| **build** (default) | Full-access agent. Can read/write files, run commands, make changes. | When you want OpenCode to actually build or modify your project. |
| **plan** | Read-only agent. Denies file edits by default and asks permission before running bash commands. | When you want to explore a new codebase or plan a feature before making changes. |

> You'll also see a **general** subagent used internally for complex searches. You can invoke it by typing `@general` in a message.

### CLI Architecture

OpenCode has three deployment modes:

1. **TUI (default)** — Run `opencode` in a project directory. You get the interactive terminal interface.
2. **Headless server** — Run `opencode serve` to start a backend without the TUI. Useful for remote or CI/CD.
3. **Web server** — Run `opencode web` to start an HTTP server with a browser-based interface.

You can attach the TUI to a running server from another terminal:

```bash
# Terminal 1 — start the backend
opencode web --port 4096 --hostname 0.0.0.0

# Terminal 2 — attach the TUI to it
opencode attach http://10.0.0.5:4096
```

### Permissions System

Before OpenCode runs a risky action (like deleting a file or running `rm -rf`), it shows a **permission prompt** and asks you to approve or deny it. You can configure these in your config file:

```json
{
  "permission": {
    "bash": {
      "*": "ask",        // ask before every bash command
      "git push": "allow" // auto-approve git push
    },
    "edit": {
      "*": "allow"       // auto-approve all file edits
    }
  }
}
```

Options for each rule: `allow`, `ask`, or `deny`.

---

## Built-in Tools

OpenCode doesn't use external plugins for basic tasks — it has a set of **built-in tools** that let it interact with your computer. Here's what's available out of the box:

### File Tools

- **Read** — Open and read any file in your project.
- **Write** — Create or overwrite a file.
- **Edit** — Make targeted changes to existing files.
- **Glob** — Find files by pattern (e.g., `**/*.py`).
- **Grep** — Search file contents for text or regex patterns.

### Terminal Tools

- **Bash** — Run shell commands (`git`, `pip`, `pytest`, etc.).
- **TodoWrite** — Track multi-step tasks internally.
- **Web Fetch** — Fetch and read a web page by URL.
- **Web Search** — Search the web (requires enabling an experimental provider like Exa or Perplexity).

### Development Tools

- **LSP (Language Server Protocol)** — Auto-downloads and runs language servers for Python, TypeScript, Rust, Go, and more. Gives OpenCode code completion, go-to-definition, and hover tooltips.
- **Git** — Built-in awareness of Git. OpenCode can stage files, show diffs, commit, and manage branches.
- **MCP (Model Context Protocol)** — Connect external tools (databases, APIs, custom servers) via `opencode mcp add`.

### How Tools Appear in the TUI

Every time OpenCode calls a tool, you'll see a small panel with:

- The **tool name** (e.g., `read`, `bash`, `grep`)
- The **arguments** it passed (e.g., which file it opened, what command it ran)
- The **result** (file contents, command output, search hits)

You can toggle detailed view with `/details`.

---

## The `/init` Command

One of OpenCode's most powerful features is the `/init` command. When you run it:

1. OpenCode scans your project directory.
2. It looks for existing config files (`package.json`, `pyproject.toml`, `AGENTS.md`, etc.).
3. It creates (or updates) an **`AGENTS.md`** file in your project root.

`AGENTS.md` is a standardized file (compatible with Claude Code's `CLAUDE.md`) that tells OpenCode:

- What the project does
- How to run tests
- How to build and deploy
- Coding conventions (formatting, naming, linting)
- Preferred commands

> If your project doesn't have an `AGENTS.md` yet, `/init` is the fastest way to give OpenCode the context it needs to make good decisions.

---

## Why You Need This

- **Trust:** Understanding the agent loop helps you know when OpenCode is "thinking" vs. actually doing work.
- **Debugging:** When OpenCode gets stuck, you can look at the tool calls to see what went wrong.
- **Customization:** The permissions system and `AGENTS.md` let you control how hands-on OpenCode is.
- **Security:** Knowing what tools are available — and that each risky action asks permission — lets you use OpenCode safely.

---

## Common Pitfalls

- ❌ **Not using `/init`** — Without an `AGENTS.md`, OpenCode has to guess your project's conventions. Always run `/init` after opening a new project.
- ❌ **Auto-approving everything** — Setting all permissions to `"allow"` defeats the safety prompt. At minimum, keep bash commands on `"ask"`.
- ❌ **Ignoring tool output** — If OpenCode shows an error (like a failing test), don't just push "continue." Read the error and address it.
- ❌ **Running in Plan mode when you want changes** — If OpenCode says "in plan mode" and won't write files, press **Tab** to switch to Build mode.

---

## Quick Reference

| Concept | What to Know |
|---|---|
| Agent loop | Plan → Act (call tools) → Observe (get results) → Repeat → Report |
| Build agent | Default, can edit files and run commands |
| Plan agent | Read-only, asks before bash commands. Switch with **Tab** |
| TUI mode | `opencode` — interactive terminal interface |
| Headless mode | `opencode serve` — background server, no UI |
| Web mode | `opencode web` — browser interface |
| Permission: allow | Action is auto-approved, no prompt |
| Permission: ask | Action requires your approval each time |
| Permission: deny | Action is blocked |
| `/init` | Scans project and creates `AGENTS.md` |
| `@` file reference | Type `@` + filename to attach a file to your prompt |
| `!` bash shorthand | Type `!ls -la` to run a command without leaving the chat |

---

## Key Takeaways

- OpenCode runs an **agent loop**: plan, act with tools, observe results, repeat.
- Two built-in agents: **build** (default, full access) and **plan** (read-only). Switch with **Tab**.
- Built-in tools cover files, terminal, web search, Git, and MCP — no plugins required for basics.
- The **permissions system** asks before risky actions. You can auto-approve safe ones.
- The **`/init`** command creates an `AGENTS.md` file that tells OpenCode your project's conventions.
- OpenCode can run in TUI mode (default), headless server mode (`serve`), or web mode (`web`).

---

## 📚 Recommended Reading (Web Links)

1. [CLI Reference](https://opencode.ai/docs/cli) — Full list of `opencode` CLI commands and flags.
2. [TUI Guide](https://opencode.ai/docs/tui) — Interactive terminal interface, slash commands, and keybindings.
3. [AGENTS.md / Rules](https://opencode.ai/docs/rules) — How `/init` and project-level configuration work.
4. [Configuration](https://opencode.ai/docs/config) — `opencode.json` format, provider setup, and permissions.

---

<!-- Navigation: Bottom -->
← [Back to Section Index](index.md) | [01. What Is OpenCode?](01-what-is-opencode.md) | [03. Basic Commands →](03-basic-commands.md)
