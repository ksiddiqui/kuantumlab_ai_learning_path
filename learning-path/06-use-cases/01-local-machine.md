← [Back to Section Index](index.md) | [Next Topic →](02-web-research-report.md)

[← Main Index](../index.md) → [Section Index](index.md) → **Local Machine Environment Management**

---

# Use-Case 1: Local Machine Environment Audit

> **Audit your own computer's disk usage, running processes, and installed software using an AI agent — no manual `du` or `ps` commands needed.**

## 📺 Recommended Videos

These videos show the agents and CLI tools you will use for local machine management. Reference them when setting up your environment:

1. [OpenCode Tutorial for Beginners: Setup, Agents, Skills & MCP](https://www.youtube.com/watch?v=uZGDO0L-Dr4) — OpenCode setup and first workflow
2. [The Best FREE AI Coding Agent for VS Code](https://www.youtube.com/watch?v=0pfOPZRRxmk) — Cline's full filesystem control capabilities
3. [Gemini CLI: The AI agent that lives in your terminal](https://www.youtube.com/watch?v=C5Cjvpfzc_0) — terminal-based agent operations

## Understanding Local Machine Environment Management

> You do not need to memorize Bash commands to manage your computer with an AI agent. Instead, you tell the agent **what** you want — "find the biggest folders on my disk" — and the agent translates that into the exact commands, runs them, and formats the results for you.

### What Is It?

- An AI agent with a **Bash MCP** and a **Filesystem MCP** can inspect your entire machine: disk usage, CPU/memory per process, installed packages, and even install new software.
- The agent runs standard CLI tools (`df`, `du`, `ps`, `top`, `apt`/`brew`/`winget`) through the Bash MCP and returns human-readable summaries.
- This is different from asking ChatGPT to explain a command — here the agent **executes** commands directly on your machine and shows you the output.

### Why You Need This

- **You will spend hours every week** troubleshooting your own dev environment. An agent that can audit and fix your machine on command pays for itself immediately.
- **Every agent workflow ends with changes to files on disk.** Understanding what the agent sees (and is allowed to touch) is essential before you hand it more powerful tools.
- **Safety:** Before you hand an agent a Gmail MCP or a deployment tool, you need to trust its judgment about what commands are safe to run. This walkthrough builds that trust incrementally.

## Before You Start

**Setup required:**
- OpenCode or OMP installed (see [Section 1](../02-opencode-foundation/index.md))
- Bash MCP enabled (OpenCode ships with Bash built-in)
- Filesystem MCP enabled (built-in or via `mcp-filesystem`)

> 🔒 **Security note:** Never give an agent permission to run destructive commands (e.g., `rm -rf`, `dd`, `mkfs`) until you have reviewed several safe runs. This walkthrough stays read-only until the install step.

## Step-by-Step Guide

### Step 1: Check Disk Usage and Find the Largest Folders

**Prompt:**
```text
Using the bash tool, check my disk usage with `df -h`. Then run `du -sh` on the top-level directories in my home folder and list the 10 largest directories by size. Present the results in a table with path, size, and a brief note about what's typically stored there (e.g., "Docker images and cache").
```

**What the agent does:**
1. Runs `df -h` to show total/used/available space per mounted drive.
2. Runs `du -sh ~/* 2>/dev/null | sort -rh | head -10` to find the biggest directories.
3. Maps known folders to their typical contents (e.g., `~/.cache` → "app caches", `~/node_modules` → "project dependencies").

**What you should see:**
```
Filesystem      Size   Used  Avail Use%  Mounted on
/dev/sda1        50G    38G    10G  79%  /

Top directories in /home/learner:
| Path                    | Size  | What it stores              |
|-------------------------|-------|-----------------------------|
| ~/.cache                  | 8.2G  | Browser caches, app caches  |
| ~/node_modules            | 3.1G  | Node.js project dependencies|
| ~/Downloads               | 2.4G  | Downloaded files            |
| ~/docker-desktop-data     | 5.9G  | Docker images and volumes   |
| ~/.mozilla/firefox        | 1.2G  | Firefox profile data        |
```

### Step 2: List Processes and Flag High Resource Usage

**Prompt:**
```text
List all running processes, sorted by CPU usage, and highlight any consuming more than 50% CPU or more than 500MB of memory. For each flagged process, show its PID, name, parent process, and how long it has been running. Also show total system memory and how much is free.
```

**What the agent does:**
1. Runs `ps aux --sort=-%cpu | head -20` (Linux/macOS) to list top CPU consumers.
2. Runs `free -h` (or `vm_stat` on macOS, `Get-Counter` on Windows) for overall memory.
3. Flags rows exceeding the thresholds into a separate "Flagged" table.

**What you should see:**
```
System memory: 16 GB total, 4.2 GB free

Flagged processes:
| PID  | Name              | CPU% | Memory  | Parent      | Runtime |
|------|-------------------|------|---------|-------------|---------|
| 3421 | code            | 82%  | 742 MB  | gnome-shell | 3:12:44 |
| 5678 | python3         |  2%  | 612 MB  | code        | 1:05:22 |

(All other processes are under 50% CPU and 500MB memory.)
```

### Step 3: Check Installed Software and Python Version

**Prompt:**
```text
Check what Python versions are installed. If 3.12 is not present, check if the system package manager (apt on Ubuntu, brew on macOS, winget on Windows) has it available, and report the install command — but do NOT install it yet. Also list any globally installed pip packages that might conflict with project venvs.
```

**What the agent does:**
1. Runs `python3 --version`, `python --version`, `which python3.12` to detect installed versions.
2. Checks the package manager catalog (`apt-cache policy python3.12`, `brew info python@3.12`) for availability.
3. Runs `pip list --format=columns` to show globally installed packages.

### Step 4: Install Software Safely (Optional)

> ⚠️ **Only run this step if you have reviewed the agent's proposed command and you trust it.**

**Prompt:**
```text
Install Python 3.12 using the system package manager. Show me the exact commands being run before executing them. After installation, verify the version with `python3.12 --version`.
```

**What the agent does:**
1. Suggests the command (e.g., `sudo apt install python3.12`) and waits for your confirmation.
2. Runs the install.
3. Verifies with `python3.12 --version`.

## Common Pitfalls

- ❌ **Letting the agent run `sudo` without review** — Always ask the agent to show the command first. Use prompts like "Propose the command but do not run it."
- ❌ **Confusing local and remote machines** — In cloud IDE environments (GitHub Codespaces, Gitpod), disk/process audits show the *remote* VM, not your laptop. Confirm the hostname with `hostname` first.
- ❌ **Missing permissions on macOS** — If `ps` returns limited data, the agent may need to request Full Disk Access for the terminal. Run `tccutil reset SystemPolicyAllFiles` and re-run.
- ❌ **Running out of disk during `du`** — On very full disks, `du` can hang. If this happens, kill the agent's bash process and try `du --max-depth=1 / | sort -n` on specific directories instead.

## Quick Reference

| Task | Bash Command (what the agent runs) |
|---|---|
| Disk usage | `df -h` |
| Largest folders | `du -sh ~/* 2>/dev/null \| sort -rh \| head -10` |
| Top CPU processes | `ps aux --sort=-%cpu \| head -20` |
| Memory info | `free -h` (Linux) / `vm_stat` (macOS) |
| Python version | `python3 --version` |
| Pip packages | `pip list --format=columns` |
| Install Python 3.12 | `sudo apt install python3.12` (Ubuntu) / `brew install python@3.12` (macOS) |

## Key Takeaways

- AI agents can translate plain-English requests ("find the biggest folders") into precise shell commands — you don't need to memorize flags.
- Always review dangerous commands before the agent runs them; start with read-only prompts.
- Disk/process auditing is a safe first use case that builds trust before you hand agents email APIs or deployment keys.

## 📚 Recommended Reading (Web Links)

1. [OpenCode GitHub README](https://github.com/sst/opencode) — installation and feature overview
2. [OpenCode Documentation](https://docs.opencode.com/) — official docs covering commands and workflows
3. [OMP Official Site & Documentation](https://omp.ohmy.tools/) — for OMP installation and global config
4. [Ollama Official Documentation](https://ollama.com/docs/) — local LLM runtime for private tasks

---

← [Back to Section Index](index.md) | [Next Topic →](02-web-research-report.md)

[← Main Index](../index.md) | [Section Index](index.md)
