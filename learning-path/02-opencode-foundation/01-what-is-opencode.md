<!-- Navigation: Top -->
← [Back to Section Index](00-index.md) | ← [Previous Topic](00-index.md) | [Next Topic →](02-how-it-works.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section Index](00-index.md) → **What Is OpenCode?**

---

# What Is OpenCode?

> OpenCode is a free, open-source AI coding agent that lives in your terminal. It can read files, run commands, search the web, and write code — all from a natural-language prompt.

---

## 📺 Recommended Videos

1. [OpenCode Tutorial for Beginners: Setup, Agents, Skills & MCP](https://www.youtube.com/watch?v=uZGDO0L-Dr4) — Covers installation, agent switching, skills, and MCP server setup in under 20 minutes.
2. [OpenCode Installation & Setup Guide](https://www.youtube.com/watch?v=D9qM9HV9QwM) — Step-by-step walkthrough of installing OpenCode and connecting your first LLM provider.
3. [OpenCode Tutorial for Beginners: Learn 90% Of OpenCode in Under 25 Minutes](https://www.youtube.com/watch?v=QzqaZshQcJI) — A fast-paced overview of the most useful 90% of OpenCode features.

---

## Understanding OpenCode

### What Is It?

- **OpenCode** is an open-source AI coding agent (like Claude Code or GitHub Copilot's agent mode).
- It runs in your **terminal** as a text-based UI (TUI) or as a headless server you can attach to.
- It's built in **TypeScript** and available on [GitHub at `anomalyco/opencode`](https://github.com/anomalyco/opencode).
- It supports **75+ LLM providers** via [models.dev](https://models.dev) and the [AI SDK](https://ai-sdk.dev).
- It is **free to install**. You only pay the LLM provider you connect (Anthropic, OpenAI, etc.) or use OpenCode Zen / OpenCode Go ($10/month).

### Real-World Analogy

Think of OpenCode as a **junior developer who sits next to you at the terminal**. You describe what you want — "build a Flask API with user login" — and they:

1. Ask clarifying questions
2. Look at your existing project structure
3. Write the code files
4. Run the tests
5. Run `git diff` so you can review
6. Ask "does this look good?" before committing

Unlike a search engine or chatbot, this junior developer can **touch your filesystem** and **run terminal commands** — but always asks permission first.

### Why It Matters for AI Agents

OpenCode was one of the first coding agents to support **multiple model providers** out of the box (not locked to one company). It also pioneered:

- **Agent switching** — flip between a "builder" agent and a "planner" (read-only) agent with the `Tab` key
- **Slash commands** — `/help`, `/models`, `/connect`, `/init`, and more, all inside the TUI
- **Non-interactive mode** — `opencode run "your prompt"` for scripting and CI/CD
- **AGENTS.md** — a project file that tells the agent how your codebase works (similar to CLAUDE.md, but standardized)

---

## Why You Need This

- **Save time on boilerplate:** A good prompt can scaffold a full project in 60 seconds.
- **Learn by watching:** OpenCode explains every step — you can inspect the generated files and ask questions.
- **No vendor lock-in:** Switch between Claude, GPT, DeepSeek, or a local model anytime.
- **Portable config:** The same `AGENTS.md` works with OpenCode, Claude Code, and other agents that follow the spec.

---

## Step-by-Step Guide

### Step 1: Install OpenCode

Open your terminal and run one of the following:

**Option A — Install script (recommended for all platforms)**

```bash
curl -fsSL https://opencode.ai/install | bash
```

**Option B — Package managers**

```bash
# macOS / Linux via Homebrew (recommended tap)
brew install anomalyco/tap/opencode

# Windows via Scoop
scoop install opencode

# Windows via Chocolatey
choco install opencode

# Any OS via npm (requires Node.js)
npm install -g opencode-ai

# Arch Linux
sudo pacman -S opencode
# or from AUR
paru -S opencode-bin

# Any OS via Nix
nix run nixpkgs#opencode
```

> After installing, verify with:

```bash
opencode --version
```

### Step 2: Choose a Terminal Emulator

OpenCode needs a modern terminal that supports the TUI interface:

- **Cross-platform:** [WezTerm](https://wezterm.org), [Alacritty](https://alacritty.org)
- **macOS / Linux:** [Ghostty](https://ghostty.org), Kitty
- **Windows:** Windows Terminal (built-in to Windows 11)

### Step 3: Connect an LLM Provider

OpenCode does **not** include a built-in model. You need an API key from at least one provider. You have two main options:

#### Option A — OpenCode Zen (easiest, $10/month)

OpenCode Zen is a curated set of models tested and verified by the OpenCode team. It bundles several popular open-weight models behind a single $10/month subscription.

1. In the TUI, run:

   ```
   /connect
   ```

2. Select **OpenCode Zen** from the provider list.
3. Go to [opencode.ai/zen](https://opencode.ai/zen), sign in, and copy your API key.
4. Paste the key when prompted.

#### Option B — Your own provider (OpenAI, Anthropic, etc.)

1. In the TUI, run:

   ```
   /connect
   ```

2. Search for your provider (e.g., **OpenAI**, **Anthropic**, **DeepSeek**).
3. Paste your API key.

> You can also set API keys as environment variables or via `opencode auth login` on the command line.

### Step 4: Initialize in a Project

Navigate to a project folder and start OpenCode:

```bash
cd /path/to/your/project
opencode
```

Inside the TUI, run:

```
/init
```

This scans your project and creates an `AGENTS.md` file that documents the project's structure, coding patterns, and commands.

---

## Common Pitfalls

- ❌ **Running `opencode` outside a project directory** — It works, but you won't get project-specific context. Always `cd` into your project first.
- ❌ **Not having an API key** — OpenCode can't do anything without a connected LLM provider. Run `/connect` and paste your key before trying to ask it to build something.
- ❌ **Using a terminal that doesn't support TUI rendering** — Some minimal terminals or SSH clients won't display the interface correctly. Use WezTerm, Alacritty, Kitty, or Windows Terminal.
- ❌ **Forgetting to check API costs** — Every LLM provider charges per token. Start with a small task and check `opencode stats` to monitor usage.

---

## Quick Reference

| Action | Command |
|---|---|
| Install OpenCode | `curl -fsSL https://opencode.ai/install \| bash` |
| Install via npm | `npm install -g opencode-ai` |
| Install via Homebrew | `brew install anomalyco/tap/opencode` |
| Check version | `opencode --version` |
| Start in a project | `cd my-project && opencode` |
| Connect a provider | `/connect` (in TUI) |
| Use OpenCode Zen | `/connect`, then select "OpenCode Zen" |
| Initialize AGENTS.md | `/init` (in TUI) |
| View stats | `opencode stats` (or `/stats` is not a command — use CLI) |

![OpenCode TUI screenshot](assets/opencode.png)

---

## Key Takeaways

- OpenCode is free and open-source, but you pay your LLM provider per token.
- Install via `curl -fsSL https://opencode.ai/install | bash` or your package manager.
- Connect a provider with `/connect` — pick OpenCode Zen ($10/month) or bring your own key.
- Run `/init` in a project to generate an `AGENTS.md` file that tells OpenCode how your codebase works.
- You can also run OpenCode non-interactively with `opencode run "your prompt"`.

---

## 📚 Recommended Reading (Web Links)

1. [OpenCode Documentation](https://opencode.ai/docs) — Official docs for installation, configuration, and all features.
2. [OpenCode on GitHub](https://github.com/anomalyco/opencode) — Source code, issues, and release notes.
3. [Models.dev Provider Directory](https://models.dev) — Full list of 75+ LLM providers supported by OpenCode.

---

<!-- Navigation: Bottom -->
← [Back to Section Index](00-index.md) | [02. How It Works →](02-how-it-works.md)
