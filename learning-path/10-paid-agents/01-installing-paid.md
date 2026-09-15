← [Back to Section Index](00-index.md) | [Next Topic →](02-when-to-upgrade.md)

[← Main Index](../00-index.md) → [Section 9: Paid Agent Options](00-index.md) → **Installing Paid Agents**

# Installing Paid Agents

> Install and authenticate Claude Code, Codex CLI, and Kiro — the three paid coding agents — in under 15 minutes. Each tool works in your terminal and connects to the same MCP servers you already configured with OpenCode.

## 📺 Recommended Videos

1. [Learn 80% of Claude Code in 10 Minutes (2026 Tutorial)](https://www.youtube.com/watch?v=3aKVArutiIU) — Watch from 0:00 for the installation demo (cloud.ai → terminal install)
2. [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0) — Boris from Anthropic covers first-run setup, GitHub app installation, and CLI configuration
3. [The Ultimate Beginner's Guide to Claude AI](https://www.youtube.com/watch?v=9oJySubZRSA) — See Claude Code at 18:12 in the six-level progression from first prompt to autonomous work

## Understanding Paid Agents

> Paid agents wrap the same agentic loop you learned with OpenCode — they read your codebase, make edits, run commands, and connect to MCP servers — but they're backed by more powerful models and come with subscription or credit pricing.

### What They Have in Common

- **Terminal-first** — All three run as a CLI you invoke with `claude`, `codex`, or `kiro`
- **MCP support** — Your existing MCP servers (filesystem, web search, GitHub, etc.) work unchanged
- **Git integration** — Branch management, commit creation, and PR reviews built in
- **Project memory** — CLAUDE.md, Kiro steering files, or project config files persist rules across sessions

### What Makes Them "Paid"

- **Claude Code** requires a Claude Pro/Max subscription to use at full power
- **Codex CLI** runs on OpenAI models — free if you have ChatGPT Plus, billed per-token via API key otherwise
- **Kiro** uses a credit-based system with prepaid overages and no daily limits

---

## Step-by-Step Guide

### Step 1: Choose Your Platform

Before installing, decide which tool matches your needs:

| Use this if... | Tool |
|---|---|
| Your team uses Google Workspace, needs SSO, or wants the widest IDE/integrations support | **Claude Code** |
| You want OpenAI's latest models (o1, GPT-5) or already have ChatGPT Plus | **Codex CLI** |
| You're on AWS, want spec-driven development, or need parallel agents with property-based testing | **Kiro** |

---

### Step 2: Install Claude Code

**macOS / Linux / WSL:**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows CMD:**

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

**Alternative — Homebrew (macOS):**

```bash
brew install --cask claude-code
# OR for the latest channel:
brew install --cask claude-code@latest
```

**Alternative — WinGet (Windows):**

```powershell
winget install Anthropic.ClaudeCode
```

**First run:**

```bash
cd your-project
claude
```

You'll be prompted to log in. If you've set `ANTHROPIC_API_KEY` as an environment variable, Claude Code skips the login prompt and asks you to approve the key instead.

> 🔐 **Enterprise option:** Claude Code can route through [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) instead of the Anthropic API. Run `/setup-bedrock` in a session or set `CLAUDE_CODE_USE_BEDROCK=1` to use it.

---

### Step 3: Install Codex CLI

**macOS / Linux:**

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

**Windows (PowerShell):**

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

**Alternative — npm (requires Node.js 18+):**

```bash
npm install -g @openai/codex
```

**Alternative — Homebrew (macOS):**

```bash
brew install --cask codex
```

**Or download a binary directly from GitHub:**

Visit [github.com/openai/codex/releases](https://github.com/openai/codex/releases/latest) and download the archive for your platform (e.g., `codex-aarch64-apple-darwin.tar.gz` for Apple Silicon Mac, `codex-x86_64-unknown-linux-musl.tar.gz` for Linux x86_64).

**First run:**

```bash
cd your-project
codex
```

On first launch, select **Sign in with ChatGPT** to authenticate with your Plus/Pro/Business/Edu/Enterprise account. You can also use an [API key](https://platform.openai.com/api-keys) with additional setup described in the [Codex auth docs](https://developers.openai.com/codex/auth).

---

### Step 4: Install Kiro CLI

**macOS / Linux / Windows:**

```bash
curl -fsSL https://cli.kiro.dev/install | bash
```

The installer detects your OS and downloads the appropriate binary. It works on macOS, Ubuntu/Debian, and Windows (via WSL or native).

**Optional — Install the Kiro IDE:**

Visit [kiro.dev/downloads](https://kiro.dev/downloads/) to download the full IDE for macOS, Windows, or Linux. The CLI is included with the IDE, but you can use the CLI alone if you prefer terminal-only workflows.

**First run:**

```bash
cd your-project
kiro
```

Kiro reads [steering files](https://kiro.dev/docs/steering/) from your project's `.kiro/` directory — the same concept as `CLAUDE.md` — so if you've already set up project instructions with OpenCode, most of your configuration transfers over.

---

### Step 5: Verify Your Install

After installing any of the three agents, verify the setup:

```bash
# Claude Code
claude --version

# Codex CLI
codex --version

# Kiro CLI
kiro --version
```

Each agent should report its version and exit cleanly. If any command fails with `command not found`, ensure the install location is in your `PATH` (the installers usually print the path they wrote to).

---

## Common Pitfalls

- ❌ **Installing multiple agents at once** — They can conflict if they both try to manage the same project directory. Install one first, test it, then add the next.
- ❌ **Skipping authentication** — All three require you to sign in before they can make edits or run commands. Run `claude`, `codex`, or `kiro` once to trigger the login flow before trying to use them in scripts.
- ❌ **Not checking subscription tiers** — Claude Code's best models (Opus) require Max or Enterprise plans. Codex CLI's latest models may be Plus-only. Kiro's credit multipliers vary by model you select.
- ❌ **Forgetting MCP servers transfer over** — If you've set up MCP servers in OpenCode or OMP, check that the config file format is compatible. Claude Code uses `.codex/mcp.json` (or home-dir config), Kiro uses `.kiro/mcp.json`, and Codex uses `mcp.json` in the project root.
- ❌ **Not pinning model versions on Bedrock** — If using Claude Code with AWS Bedrock, always [pin your model IDs](https://code.claude.com/docs/en/amazon-bedrock) so team members don't get different model behavior after a rollout.

---

## Quick Reference

| Tool | Install Command | Auth Method | Config File | Primary Docs |
|---|---|---|---|---|
| **Claude Code** | `curl -fsSL https://claude.ai/install.sh \| bash` | Claude account sign-in (or `ANTHROPIC_API_KEY`) | `CLAUDE.md`, `.claude/settings.json` | [code.claude.com/docs](https://code.claude.com/docs) |
| **Codex CLI** | `curl -fsSL https://chatgpt.com/codex/install.sh \| sh` | Sign in with ChatGPT (or API key) | `mcp.json`, `.codex/config.toml` | [github.com/openai/codex](https://github.com/openai/codex) |
| **Kiro CLI** | `curl -fsSL https://cli.kiro.dev/install \| bash` | AWS IAM / SSO login | `.kiro/steering/`, `.kiro/settings.json` | [kiro.dev/cli](https://kiro.dev/cli/) |

> ![Kiro CLI screenshot](assets/claude-code.png)
> All three agents appear in the same terminal. Once installed, you can switch between them by name in any project directory.

---

## Key Takeaways

- **All three install with a single curl command** — no package manager required on macOS or Linux
- **Authentication differs** — Claude Code uses your Anthropic account, Codex uses ChatGPT or OpenAI API key, Kiro uses AWS IAM/SSO
- **Your MCP servers transfer** — the configuration files are slightly different in naming but follow the same JSON structure
- **For enterprise Bedrock integration** — only Claude Code has first-class [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) support built in; Kiro and Codex can use Bedrock via custom gateway configuration

## 📚 Recommended Reading (Web Links)

1. [Claude Code Installation Guide](https://code.claude.com/docs/en/overview) — Official install methods, IDE extensions, and system requirements
2. [Codex CLI GitHub Repository](https://github.com/openai/codex) — Source code, system requirements, and building from source with Rust
3. [Kiro CLI Documentation](https://kiro.dev/cli/) — Installation, first run, and CLI command reference
4. [Claude Code on Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) — IAM setup, model pinning, and credential management for enterprise deployments
5. [Amazon Bedrock Supported Models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards.html) — Full catalog of Claude and other foundation models available on AWS

---

← [Back to Section Index](00-index.md) | [Next Topic →](02-when-to-upgrade.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)