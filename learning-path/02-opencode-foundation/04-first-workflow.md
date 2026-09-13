<!-- Navigation: Top -->
← [Back to Section Index](index.md) | ← [Previous Topic](03-basic-commands.md) | [Next Topic →](index.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → [Section Index](index.md) → **First Workflow**

---

# First Workflow: Scaffold a Python Project

> In this page, you'll use OpenCode end to end — from initializing a blank project to running tests — all with natural-language prompts. By the end, you'll have a working Python CLI tool with tests, generated entirely by OpenCode.

---

## 📺 Recommended Videos

1. [OpenCode Tutorial for Beginners: Learn 90% Of OpenCode in Under 25 Minutes](https://www.youtube.com/watch?v=QzqaZshQcJI) — Watch the section on scaffolding projects to see a live example of the workflow below.
2. [OpenCode Tutorial for Beginners: Setup, Agents, Skills & MCP](https://www.youtube.com/watch?v=uZGDO0L-Dr4) — Includes a demo of `/init` and asking OpenCode to build a project from a prompt.
3. [OpenCode Installation & Setup Guide](https://www.youtube.com/watch?v=D9qM9HV9QwM) — Follow along for the initial setup steps.

---

## Understanding the Workflow

This page walks through a complete workflow using OpenCode:

1. **Set up** — Create a project directory and start OpenCode.
2. **Initialize** — Run `/init` to create an `AGENTS.md` file.
3. **Plan** — Switch to Plan mode (Tab) and ask OpenCode to design the project.
4. **Build** — Switch back to Build mode and let OpenCode scaffold the files.
5. **Verify** — Run the tests to confirm everything works.
6. **Iterate** — Ask OpenCode to fix issues or add features.

> This same loop works for web apps, scripts, APIs, or any code task. The key is giving OpenCode clear, specific prompts.

---

## What Is It?

- We're going to ask OpenCode to build a **Python CLI tool** that generates random passwords.
- It will use `typer` (a lightweight CLI library), write tests with `pytest`, and use `AGENTS.md` to remember project conventions.
- The result is a real, working project — not a demo or snippet.

---

## Why You Need This

- You'll practice the **full agent loop**: plan, build, verify, iterate.
- You'll see how `/init` and `AGENTS.md` make OpenCode more accurate.
- You'll learn how to verify what OpenCode built by actually running the code.

---

## Step-by-Step Guide

### Step 1: Create and open the project directory

Open your terminal and create a new folder:

```bash
mkdir my-password-cli
cd my-password-cli
git init
```

> Git is required — the `/undo` and `/redo` commands use Git to track changes.

### Step 2: Start OpenCode

In the same directory, run:

```bash
opencode
```

You'll see the TUI launch with a welcome screen.

### Step 3: Initialize with `/init`

Type the slash command and press Enter:

```
/init
```

OpenCode will ask:

```
No AGENTS.md found. Would you like to create one?
```

Confirm with **Enter**. OpenCode will scan the directory (currently empty) and create a basic `AGENTS.md`.

> Since this is a new project with no existing code, OpenCode will create a minimal `AGENTS.md`. In a real project, `/init` would detect your `pyproject.toml`, test runner, and coding conventions.

### Step 4: Ask OpenCode to build the project

Now type a clear, specific prompt:

```
Create a Python CLI tool called "pwgen" that generates random passwords.

Requirements:
- Use the `typer` library for the CLI interface
- Generate passwords with at least 16 characters by default
- Support options for length and character types (uppercase, lowercase, digits, symbols)
- Include a test suite with pytest
- Add a pyproject.toml with dependencies
- Use AGENTS.md to document the project

After creating the files, run the tests to verify they pass.
```

Press **Enter**. OpenCode will switch into "builder" mode and start:

1. Installing `typer` and `pytest` via `pip`
2. Creating `pyproject.toml`
3. Writing the CLI code
4. Writing tests
5. Running the tests

Each tool call (terminal command, file write, etc.) appears in a panel. You'll see the output in real time.

### Step 5: Review the generated files

When OpenCode finishes, you can inspect what it created. Use the `@` file reference to ask questions:

```
Summarize what the main module @pwgen/main.py does.
```

Or run a command to see the project tree:

```
!find . -type f -name "*.py" -o -name "*.toml" -o -name "*.md" | grep -v '.git'
```

You should see something like:

```
./AGENTS.md
./pyproject.toml
./pwgen/__init__.py
./pwgen/main.py
./pwgen/__main__.py
./tests/test_password.py
```

### Step 6: Test the CLI

Run the password generator to confirm it works:

```
!python -m pwgen --help
```

This should show the CLI usage with all the options.

Generate a password:

```
!python -m pwgen
```

You should see a random 16-character password printed to your terminal.

### Step 7: Iterate — fix a bug or add a feature

Now try a follow-up prompt. For example:

```
The password generator should exclude similar-looking characters (like 0 and O, or 1 and l) by default. Add a --allow-similar flag to override this.
```

OpenCode will:

1. Read the existing code
2. Make the targeted change
3. Update the tests
4. Run the tests again

If any test fails, use `/undo` to revert and try again with a clearer prompt.

---

## Common Pitfalls

- ❌ **Running tests manually instead of letting OpenCode do it** — OpenCode can run tests for you. Just say "run the tests" in your prompt.
- ❌ **Vague prompts** — "Build a Python app" is too broad. Be specific: name the libraries, the file structure, and the tests you want.
- ❌ **Not reviewing the generated code** — Always read at least one generated file to make sure it matches your intent.
- ❌ **Skipping `/init`** — Without `AGENTS.md`, OpenCode doesn't know your project's conventions (test runner, formatting, etc.).
- ❌ **Running out of credits mid-task** — Long tasks use many tokens. Check `opencode stats` before starting large builds.

---

## Quick Reference

| Step | Action | Command / Prompt |
|---|---|---|
| 1 | Create project | `mkdir my-project && cd my-project && git init` |
| 2 | Start OpenCode | `opencode` |
| 3 | Initialize | `/init` |
| 4 | Build | Write a clear prompt with requirements |
| 5 | Verify | `!python -m pytest` or "run the tests" |
| 6 | Inspect | `@filename` to reference a file |
| 7 | Iterate | Ask follow-up prompts |
| 8 | Revert if needed | `/undo` (requires Git) |
| 9 | Check costs | `opencode stats` |
| 10 | Save and exit | `/exit` |

---

## Key Takeaways

- The full workflow is: **init → plan → build → verify → iterate**.
- `/init` creates `AGENTS.md`, which tells OpenCode how your project works.
- Be specific in your prompts — list libraries, file structure, and tests.
- Always verify the output: run tests, run the CLI, read the generated files.
- Use `/undo` to revert mistakes, and `@file` to reference existing code.

---

## 🎯 Try It Yourself

Create a password for yourself on [opencode.ai/zen](https://opencode.ai/zen) if you haven't already, then try this workflow with a different prompt — for example, build a **To-Do list CLI** in Python with persistent storage.

---

## 📚 Recommended Reading (Web Links)

1. [OpenCode Documentation](https://opencode.ai/docs) — Official docs, including advanced topics.
2. [CLI Reference](https://opencode.ai/docs/cli) — All `opencode` CLI commands and flags.
3. [Rules / AGENTS.md](https://opencode.ai/docs/rules) — How to configure project-level behavior.
4. [OpenCode on GitHub](https://github.com/anomalyco/opencode) — Source code and issue tracker.

---

<!-- Navigation: Bottom -->
← [Back to Section Index](index.md) | [03. Basic Commands](03-basic-commands.md) | [Next Section: Prompt Engineering →](../03-prompt-engineering/index.md)
