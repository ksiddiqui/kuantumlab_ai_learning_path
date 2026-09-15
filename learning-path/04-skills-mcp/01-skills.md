<!-- Navigation: Top -->
← [Back to Section Index](00-index.md) | [Next Topic →](02-mcp-servers.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section Index](00-index.md) → **What Are Skills?**

---

# What Are Skills?

> In this page you'll learn what "skills" are in the AI agent world, how the skill lifecycle works, and how to find, install, configure, use, and update skills in OpenCode and Oh My Pi.

## 📺 Recommended Videos

1. [OpenCode Tutorial for Beginners: Setup, Agents, Skills & MCP](https://www.youtube.com/watch?v=uZGDO0L-Dr4) — covers OpenCode setup, agent configuration, and skill management from the official OpenCode channel
2. [oh-my-pi: The Coding Agent With An IDE Inside](https://www.youtube.com/watch?v=0fAMlarIELw) — Oh My Pi overview including the built-in skill marketplace
3. [How Oh My Pi Edit Code Like Agents](https://www.youtube.com/watch?v=2BUlOQ9yiNY) — demonstrates OMP workflows and skill usage in practice

## Understanding Skills

> Think of an agent "skill" as a **saved playbook** — a self-contained bundle of instructions, configuration, and sometimes tools that gives an agent a specific, reusable capability.

### What Is It?

A **skill** is a packaged, reusable set of agent instructions that can be installed, configured, and invoked across multiple sessions and projects. Skills typically include:

- **System prompt** — the persona and behavior instructions
- **Tool configuration** — which MCP servers / built-in tools are available
- **Parameters** — user-tunable settings (API keys, model selection, output format)
- **Metadata** — name, description, author, and category for discovery

### Real-World Analogy

Think of skills like **apps on your phone**. When you install a weather app, it doesn't just give you a new icon — it gives you a self-contained tool with its own interface and behavior. You can open it anytime, configure your preferences once, and it remembers your settings across uses.

In the same way, a skill gives your agent a self-contained capability: "be a code reviewer," "be a research assistant," or "be a deployment specialist."

### Why It Matters for AI Agents

Without skills, every time you start a new agent session, you have to re-explain what you want. With skills, you say "use the Code Reviewer skill" and the agent remembers its persona, rules, and tool access. This is what turns a general-purpose agent into a fleet of specialized workers.

## Why You Need This

- **Point 1:** Skills eliminate repetitive prompt engineering — you write the instructions once and reuse them forever
- **Point 2:** Teams can share skills so everyone codes, reviews, or deploys with the same standards
- **Point 3:** Without skills, each conversation starts from zero — you waste tokens reexplaining context every single time

## Step-by-Step Guide

### Step 1: Finding Skills

Skills are hosted in public repositories and marketplaces. Here are the main sources:

**OpenCode skills:**
- GitHub: search for `opencode skills` repos
- The OpenCode CLI lists installed skills with `opencode /skills`

**OMP skills:**
- Built-in marketplace: `omp skill list` shows all available skills
- Community registry: browse at the OMP documentation site

```bash
# List installed skills in OpenCode
opencode /skills

# Search for available skills
opencode /skill search code-reviewer
```

### Step 2: Installing a Skill

Skills are installed as packages via npm or a dedicated skill manager.

**Installing in OpenCode:**
```bash
# Install a skill from npm
opencode /skill install @skills/code-reviewer

# Or install from a GitHub repo
opencode /skill install git+https://github.com/user/my-skill.git
```

**Installing in OMP (Oh My Pi):**
```bash
# Search and install from the marketplace
omp skill install code-reviewer

# Install from a GitHub URL
omp skill install https://github.com/user/my-skill
```

### Step 3: Configuring a Skill

After installation, most skills need configuration — typically API keys, default settings, or preferences.

**OpenCode configuration:**
Configuration lives in your global config (`~/.config/opencode/config.json`) or project-local config (`.opencode/config.json`).

```json
{
  "skills": {
    "@skills/code-reviewer": {
      "level": "strict",
      "languages": ["typescript", "python"],
      "excludePatterns": ["node_modules", ".git"]
    }
  }
}
```

**OMP configuration:**
Config lives in `~/.omp/config.yaml` (global) or `.omp/config.yaml` (repo-local).

```yaml
skills:
  code-reviewer:
    level: strict
    languages: [typescript, python]
```

### Step 4: Using a Skill

Skills are invoked with a slash command or by referencing the skill name in your prompt.

```bash
# Invoke a skill by command
opencode /code-reviewer

# Or ask the agent to use it
opencode "Review the code in src/ using the code-reviewer skill"

# In OMP, skills can be set as defaults for a project
omp --skill code-reviewer
```

### Step 5: Updating a Skill

Skills receive updates just like regular packages. Check for updates periodically.

```bash
# Update all skills in OpenCode
opencode /skills update

# Update a specific skill
opencode /skill update code-reviewer

# Update in OMP
omp skill update code-reviewer
```

## The Full Skill Lifecycle

```
  ┌──────────┐    ┌──────────────┐    ┌────────┐    ┌───────┐
  │  Find    │ →  │  Install     │ →  │ Configure │ → │  Use  │
  │ (search  │    │ (npm /       │    │ (set API  │    │ (invoke  │
  │ registry)│    │ omp skill)   │    │ keys,     │    │ via     │
  │          │    │              │    │ defaults) │    │ command)│
  └──────────┘    └──────────────┘    └──────────┘    └───────┘
      ↑                                                   │
      │         ┌──────────────┐    ┌─────────────────────┘
      └─────────┤  Update      │ ←  │  Reuse across
                │ (skill       │    │  sessions & projects
                │  update)     │    │
                └──────────────┘    └───────────────────────
```

## Common Pitfalls

- ❌ **Installing without reading the README** — many skills require API keys or specific setup steps that are documented but easy to skip
- ❌ **Forgetting to configure after install** — an unconfigured skill may silently fail or use default behavior you didn't intend
- ❌ **Not updating skills regularly** — older skill versions may have bugs or miss new features
- ❌ **Over-relying on generic skills** — sometimes writing a focused prompt is more reliable than installing a complex skill

## Quick Reference

| Command | What It Does |
|---|---|
| `opencode /skills` | List all installed skills |
| `opencode /skill install <name>` | Install a skill from the registry |
| `opencode /skill update <name>` | Update a specific skill |
| `omp skill install <name>` | Install a skill in OMP |
| `omp skill list` | Browse available skills in the marketplace |
| `opencode /skill update-all` | Update all installed skills |

## Key Takeaways

- Skills are **reusable agent playbooks** — persona + tools + configuration in one package
- The lifecycle is **install → configure → use → update** — treat skills like regular dependencies
- Skills make agents **specialized and repeatable** — you don't re-explain instructions every session
- Both OpenCode and OMP support skills, but OMP has a built-in marketplace for easier discovery

## 📚 Recommended Reading (Web Links)

1. [OpenCode Skills Documentation](https://docs.opencode.com/skills) — how skills work in OpenCode, installation and configuration
2. [OMP Skills Marketplace](https://omp.ohmy.tools/skills) — browse and discover skills for Oh My Pi
3. [OpenCode GitHub Repository](https://github.com/sst/opencode) — source code and community discussions

---

<!-- Navigation: Bottom -->
← [Back to Section Index](00-index.md) | [Next Topic →](02-mcp-servers.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
