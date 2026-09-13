<!-- Navigation: Top -->
← [Back to Section Index](index.md) | ← [Previous Topic](02-how-it-works.md) | [Next Topic →](04-first-workflow.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → [Section Index](index.md) → **Basic Commands**

---

# Basic Commands

> OpenCode lives in your terminal, so you interact with it through slash commands (`/help`) in the TUI and CLI commands (`opencode run`) outside it. This page covers the commands you'll use every day.

---

## 📺 Recommended Videos

1. [OpenCode Tutorial for Beginners: Learn 90% Of OpenCode in Under 25 Minutes](https://www.youtube.com/watch?v=QzqaZshQcJI) — Covers the most useful slash commands and keyboard shortcuts.
2. [OpenCode Tutorial for Beginners: Setup, Agents, Skills & MCP](https://www.youtube.com/watch?v=uZGDO0L-Dr4) — Includes `/connect`, `/models`, and `/init` demonstrations.
3. [OpenCode Installation & Setup Guide](https://www.youtube.com/watch?v=D9qM9HV9QwM) — Walkthrough of basic commands after first launch.

---

## Understanding Slash Commands

When you're inside the OpenCode TUI, you can type `/` followed by a command name. These **slash commands** give you quick access to common actions without leaving the chat.

Here are the slash commands you'll use most often:

---

### `/help` — Show the help screen

Brings up a dialog listing all available slash commands and their keyboard shortcuts.

```
/help
```

---

### `/models` — Switch LLM models

Shows a picker of all models from your configured providers. Use the arrow keys and Enter to select one.

```
/models
```

> You can also see all models from the command line with `opencode models`.

---

### `/connect` — Add a provider

Brings up a list of 75+ LLM providers. Select one and paste your API key. This is the fastest way to add a new provider.

```
/connect
```

---

### `/new` — Start a new session

Clears the current conversation and starts fresh. You can also use `/clear` (same thing).

```
/new
```

**Keybind:** `ctrl+x n`

---

### `/sessions` — Switch sessions

Lists your recent sessions. Pick one to continue where you left off. Aliases: `/resume`, `/continue`.

```
/sessions
```

**Keybind:** `ctrl+x l`

---

### `/exit` — Quit OpenCode

Exits the TUI. Aliases: `/quit`, `/q`. Your session is saved automatically.

```
/exit
```

**Keybind:** `ctrl+x q`

---

### `/init` — Create or update AGENTS.md

Scans your project and creates (or refreshes) an `AGENTS.md` file. Run this after opening a new project.

```
/init
```

---

### `/compact` — Summarize the conversation

When a long chat gets too big, `/compact` (alias: `/summarize`) asks the LLM to summarize what's happened so far and resets the context window.

```
/compact
```

**Keybind:** `ctrl+x c`

---

### `/undo` and `/redo` — Fix mistakes

`/undo` removes your last message and any file changes OpenCode made in response. `/redo` re-applies them. Your project must be a Git repository for this to work.

```
/undo
/redo
```

**Keybinds:** `ctrl+x u` (undo), `ctrl+x r` (redo)

---

### `/export` — Export the conversation

Exports the current session to a Markdown file and opens it in your editor.

```
/export
```

**Keybind:** `ctrl+x x`

---

### `/themes` — Change the color theme

Lists available themes. Pick one to switch immediately.

```
/themes
```

**Keybind:** `ctrl+x t`

---

### `/thinking` — Show/hide reasoning

Toggles whether extended-thinking blocks from the LLM are visible in the conversation.

```
/thinking
```

---

### `/details` — Toggle tool details

Shows or hides the raw tool call results (file contents, command output) for each action.

```
/details
```

---

### `/share` / `/unshare` — Share a session

Creates a shareable link for the current session. Anyone with the link can view the conversation.

```
/share
/unshare
```

---

## CLI Commands (Outside the TUI)

You don't have to be inside the TUI to use OpenCode. Here are the most useful **CLI commands** you can run from your regular terminal:

### `opencode run` — Non-interactive mode

Runs OpenCode with a single prompt, no TUI. Great for scripting, CI/CD, or quick answers.

```bash
opencode run "Explain how async/await works in Python"
```

To use a specific model:

```bash
opencode run --model openai/gpt-4o-mini "Write a README for a FastAPI project"
```

To run in a specific directory:

```bash
opencode run --dir ./my-project "Run the tests"
```

To get raw JSON output (useful for piping to other tools):

```bash
opencode run --format json "List all Python files in this project"
```

### `opencode auth login` — Connect a provider from the CLI

```bash
opencode auth login
# or specify a provider directly
opencode auth login --provider openai
```

### `opencode models` — List all available models

```bash
opencode models
# or filter by provider
opencode models anthropic
```

### `opencode stats` — View token usage and costs

```bash
opencode stats
# last 30 days
opencode stats --days 30
# show by model
opencode stats --models
```

### `opencode session list` — List sessions

```bash
opencode session list
```

### `opencode upgrade` — Update to the latest version

```bash
opencode upgrade
# upgrade to a specific version
opencode upgrade v0.1.48
```

---

## Chat Shortcuts (Inside Messages)

Two special shortcuts make the TUI much faster to use:

### `@` — File references

Type `@` and start typing a filename. OpenCode will fuzzy-search your project and attach the file's contents to your message — no need to copy and paste.

```
How is auth handled in @packages/api/src/auth.py?
```

You can also reference a specific line range by adding `:line` after the filename:

```
Check the login function in @app/auth.py:42
```

### `!` — Run bash commands

Start a line with `!` to run any terminal command without leaving the chat. The output appears as a tool result.

```
!git log --oneline -5
!ls -la src/
!pip show fastapi
```

---

## Keyboard Shortcuts

OpenCode uses a **leader key** system. The default leader is `ctrl+x`. Many actions require pressing `ctrl+x` first, then another key.

### Essential keybindings

| Shortcut | Action |
|---|---|
| `ctrl+x c` | Compact / summarize session |
| `ctrl+x n` | New session |
| `ctrl+x l` | List sessions |
| `ctrl+x m` | List available models |
| `ctrl+x t` | List themes |
| `ctrl+x e` | Open external editor for message |
| `ctrl+x x` | Export session |
| `ctrl+x q` | Quit |
| `ctrl+x u` | Undo last message |
| `ctrl+x r` | Redo last message |

### In-message shortcuts

| Shortcut | Action |
|---|---|
| `Tab` | Switch between **Build** and **Plan** agents |
| `ctrl+t` | Cycle through model variants (e.g., thinking on/off) |
| `Enter` | Submit your message |
| `Shift+Enter` | New line (insert a line break) |
| `Escape` | Interrupt a running response or cancel a prompt |
| `ctrl+p` | Open command list (quick access to all commands) |

> You can customize these in `tui.json`. See the [Keybindings documentation](https://opencode.ai/docs/keybinds) for the full list.

---

## Common Pitfalls

- ❌ **Typing slash commands in the wrong place** — Slash commands (`/`) only work in the TUI or in `opencode run`. They are not shell commands.
- ❌ **Forgetting the `!` prefix for bash** — If you type `git status` without `!` in the chat, OpenCode will treat it as a question, not a command. Use `!git status`.
- ❌ **Using a provider that's not configured** — If `/models` doesn't list a model, it means you haven't connected that provider. Run `/connect` first.
- ❌ **Not using `@` for file references** — Copy-pasting code into a message wastes context. Use `@filename` instead — OpenCode auto-attaches the file contents.

---

## Quick Reference

| Command | Type | What It Does |
|---|---|---|
| `/help` | TUI | Show all slash commands and shortcuts |
| `/models` | TUI | Switch to a different LLM model |
| `/connect` | TUI | Add a new LLM provider / API key |
| `/new` | TUI | Start a new conversation (`ctrl+x n`) |
| `/sessions` | TUI | List and switch between saved sessions (`ctrl+x l`) |
| `/exit` | TUI | Quit OpenCode (`ctrl+x q`) |
| `/init` | TUI | Create/update `AGENTS.md` in the current project |
| `/compact` | TUI | Summarize the conversation to save context (`ctrl+x c`) |
| `/undo` | TUI | Revert the last message and file changes (`ctrl+x u`) |
| `/export` | TUI | Export session to Markdown (`ctrl+x x`) |
| `/themes` | TUI | Switch color theme (`ctrl+x t`) |
| `@filename` | Chat | Attach a file to your prompt |
| `!command` | Chat | Run a bash/shell command |
| `Tab` | TUI | Switch between Build and Plan agents |
| `opencode run "prompt"` | CLI | Run OpenCode non-interactively |
| `opencode models` | CLI | List all available models |
| `opencode stats` | CLI | View token usage and cost |
| `opencode auth login` | CLI | Connect a new provider |

---

## Key Takeaways

- Slash commands (`/`) and CLI commands are two ways to do the same things — pick whichever is faster for you.
- Use `/help` or `ctrl+p` to see every command at any time.
- Use `@filename` to reference files and `!command` to run shell commands directly from the chat.
- `opencode run "prompt"` runs OpenCode without the TUI — perfect for scripts and automation.
- Keyboard shortcuts with the `ctrl+x` leader key save you from typing full commands.

---

## 📚 Recommended Reading (Web Links)

1. [CLI Reference](https://opencode.ai/docs/cli) — Full documentation of all `opencode` CLI commands, flags, and environment variables.
2. [TUI Guide](https://opencode.ai/docs/tui) — Slash commands, file references, bash shorthand, and keybindings.
3. [Keybindings](https://opencode.ai/docs/keybinds) — Complete list of keyboard shortcuts and how to customize them.
4. [Models and Providers](https://opencode.ai/docs/providers) — How to configure different LLM providers.

---

<!-- Navigation: Bottom -->
← [Back to Section Index](index.md) | [02. How It Works](02-how-it-works.md) | [04. First Workflow →](04-first-workflow.md)
