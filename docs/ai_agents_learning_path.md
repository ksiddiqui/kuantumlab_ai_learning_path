# AI Agents Learning Path — Topic Tree

> **Audience:** Fresh graduates with basic Python + Node.js + computer literacy, no CS degree required.
> **Goal:** Train learners to use open-source & low-cost AI agents for web scraping, deep research, content creation, testing, and autonomous coding tasks.
> **Philosophy:** Open-source first. Free tiers first. Paid tools only when they unlock capabilities the learner cannot get otherwise.

---

## 0. Prerequisites & Setup

### 0.1 Environment Bootstrapping
- Terminal basics (cd, ls, mkdir, file navigation)
- Installing Python 3.11+ and verifying with `python --version`
- Setting up a virtual environment (`python -m venv`)
- Installing VS Code as the editor (free)
- Installing Git and GitHub CLI (gh)
- Creating a GitHub account and understanding public vs private repos
- Writing first `README.md`, committing with `git init`, `git add`, `git commit`, `git push`
- Installing Node.js (v20+) and NPM — **why it's needed:** Most AI agent CLI tools (OpenCode, OMP, MCP servers) ship as npm packages. You don't need to learn JavaScript to use them, but Node.js is the runtime that executes these tools.
- Verifying installation: `node --version`, `npm --version`
- (Optional) Installing pnpm — faster package manager alternative for agent tooling
- **Deliverable:** Run `npx --version` to confirm Node.js is working

#### 📺 Recommended Videos
1. [How to use the Command Line | Terminal Basics for Beginners](https://www.youtube.com/watch?v=5XgBd6rjuDQ) — absolute beginner terminal intro
2. [Linux for Beginners](https://www.youtube.com/watch?v=10f4899srvc) — Linux CLI from scratch
3. [Linux Command Line for Beginners](https://www.youtube.com/watch?v=16d2lHc0Pe8) — practical command line walkthrough

#### 📚 Recommended Reading
1. [LinuxCommand.org](http://linuxcommand.org) — official site with tutorials and reference
2. [freeCodeCamp: Command Line for Beginners](https://www.freecodecamp.org/news/command-line-for-beginners/) — free guide covering essential commands
3. [Ubuntu: Command Line for Beginners](https://ubuntu.com/tutorials/command-line-for-beginners) — official Ubuntu CLI tutorial

### 0.2 How LLMs Work (Demystified — No Math)
- What is a model? (Analogy: autocomplete on steroids)
- Tokens — what they are, how they relate to words
- Model parameters — simplified: "the brain's memory of patterns"
- Context window — the conversation memory limit (4K vs 8K vs 128K vs 1M)
- Temperature & top_p — creativity vs precision dials
- Why bigger isn't always better — cost vs quality trade-offs
- Free vs paid model providers — what you get with each
- **Deliverable:** Play with a few models on HuggingChat and OpenRouter free tier

### 0.3 Markdown Essentials for Agentic Workflows
- Why Markdown is the lingua franca of AI agents — agents output Markdown for clarity, portability, and structure
- Basic Markdown syntax: headers (`#`), bold (`**text**`), lists (`-`), code blocks (```), links (`[text](url)`), tables (`|`)
- Why you need to understand it: agents generate Markdown files, and you'll need to review/edit them
- Markdown files as agent memory: `.md` files store notes, plans, and session history
- **Deliverable:** Create a short Markdown file with a heading, bullet list, code block, and table — review it in VS Code

#### 📺 Recommended Videos
N/A — Markdown is a text format; reading docs is faster than watching videos.

#### 📚 Recommended Reading
1. [Markdown Guide: Basic Syntax](https://www.markdownguide.org/basic-syntax/) — comprehensive reference for all standard Markdown syntax
2. [CommonMark Tutorial](https://commonmark.org/help/tutorial/) — interactive tutorial that covers Markdown from zero to advanced

#### Free/Open-Source Markdown Authoring Tools
1. **VS Code** (free, already installed in §0.1) — built-in Markdown preview (`Ctrl+Shift+V`), live preview, spell check, and extensions like Markdown All in One
2. **Markor** (free, open-source) — lightweight Markdown editor for Windows/Linux with live preview, note-taking, and offline-first design. [GitHub](https://github.com/gsantner/markor) or [Download](https://gsantner.net/markor/)

---

## 1. OpenCode Foundation (First Agent — $10/month)

### 1.1 What Is OpenCode?
- Open-source CLI coding agent (by Sierra)
- How it differs from ChatGPT or Copilot
- The subscription model: free tier + $10 "Zen" tier via Anomaly
- Installing OpenCode (brew, npm, or binary download)

#### 📺 Recommended Videos
1. [OpenCode Tutorial for Beginners: Setup, Agents, Skills & MCP](https://www.youtube.com/watch?v=uZGDO0L-Dr4) — end-to-end OpenCode setup
2. [OpenCode Installation & Setup Guide](https://www.youtube.com/watch?v=D9qM9HV9QwM) — step-by-step install
3. [OpenCode Tutorial for Beginners: Learn 90% Of OpenCode in Under 25 Minutes](https://www.youtube.com/watch?v=QzqaZshQcJI) — quick start guide

#### 📚 Recommended Reading
1. [OpenCode GitHub README](https://github.com/sst/opencode) — installation, configuration, and feature overview
2. [OpenCode Documentation](https://docs.opencode.com/) — official docs covering architecture, commands, and workflows
3. [Anomaly Zen for OpenCode](https://anomaly.earth/) — official portal for the $10/month Zen subscription features

### 1.2 How OpenCode Works Under the Hood
- CLI agent architecture — prompt → model → tool calls → code changes
- What "tools" OpenCode has built-in (file system, bash, git, etc.)
- How the agent "thinks" — chain of thought, planning, execution
- The concept of an agent "session"

### 1.3 Basic OpenCode Commands
- `/help` — exploring what's available
- `/model` — listing and selecting models
- `/chat` — switching to chat-only mode
- `/edit`, `/create` — manual file creation
- `/exit` — ending a session
- **Hands-on:** Use OpenCode to scaffold a simple Python project

### 1.4 Your First Agentic Workflow
- Starting OpenCode in a project directory
- Giving it a task: "Create a to-do list CLI app in Python"
- Watching the agent plan, write code, run tests
- Reviewing and editing its output
- **Assignment 1 (preview):** Fix a bug in agent-generated code

---

## 2. Prompt Engineering for Agents

### 2.1 How to Write Prompts Agents Can Act On
- Instruction structure: context → goal → constraints → output format
- The difference between "chat prompts" and "agent prompts"
- Providing file paths and project context explicitly
- Using XML-like tags for clarity: `<task>`, `<constraints>`, `<example>`

#### 📺 Recommended Videos
1. [Let The LLM Write The Prompt 2025 | Design Perfect Prompts for AI Agent](https://www.youtube.com/watch?v=1y0GVzQXwKo) — prompt design for agents
2. [Prompt Engineering Full Course](https://www.youtube.com/watch?v=2BpCk4d2Cc0) — comprehensive prompt engineering course
3. [Roadmap to Become a Prompt Engineering Expert for Beginners in 2025!](https://www.youtube.com/watch?v=37Gy9jtLFRU) — learning roadmap

#### 📚 Recommended Reading
1. [LearnPrompting.org](https://learnprompting.org/) — free interactive prompt engineering guide (beginner to advanced)
2. [Anthropic: Prompt Engineering Guide](https://docs.anthropic.com/en/docs/guides/prompt-engineering) — official guide covering best practices, XML tags, and guardrails
3. [OpenAI: Prompt Guide](https://platform.openai.com/docs/guides/prompt-engineering) — prompt design principles, few-shot learning, and examples
4. [LearnPrompting: Advanced Prompting](https://learnprompting.org/docs/about) — chain-of-thought, tree-of-thought, automatic reasoning

### 2.2 Common Prompt Patterns That Fail
- Vague instructions ("make it better")
- Missing context (agent doesn't know the project structure)
- No guardrails (agent deletes files, runs destructive commands)

### 2.3 Prompt Libraries & Templates
- Where to find open-source prompt templates (GitHub repos, forums)
- Creating your own prompt library
- Version-controlling prompts alongside code

#### 📚 Recommended Reading
1. [PromptHero: Best Prompt Templates](https://prompthero.com/blog/prompt-engineering-for-beginners-101-guide/) — community-curated prompt templates
2. [GitHub: Prompt Engineering Resources](https://github.com/takingapartmind/awesome-prompt-engineering) — curated list of prompt engineering resources
3. [LearnPrompting: Courses](https://learnprompting.org/courses/) — structured courses on prompt engineering techniques

---

## 3. Skills & MCP Tools

### 3.1 What Are Skills?
- Reusable agent behaviors packaged as config + instructions
- Finding and installing skills (OpenCode / OMP skill repos)
- Skill lifecycle: install → configure → use → update

### 3.2 What Are MCP Servers? (Model Context Protocol)
- MCP = the USB-C of AI tools — a universal connector
- Why MCP matters: plug any tool into any agent
- MCP architecture: client (agent) ↔ server (tool) ↔ external API
- Built-in MCPs in OpenCode vs custom ones

#### 📺 Recommended Videos
1. [MCP Complete Explanation](https://www.youtube.com/watch?v=_fzpnqt39jZ) — Model Context Protocol overview
2. [How Model Context Protocol (MCP) actually works](https://www.youtube.com/watch?v=cGuyrANVi4A) — MCP architecture deep dive
3. [Ultimate MCP Tutorial | Learn Model Context Protocol](https://www.youtube.com/watch?v=DAuZuj0BUZA) — hands-on MCP tutorial

#### 📚 Recommended Reading
1. [Model Context Protocol: What is MCP?](https://modelcontextprotocol.io/docs/introduction) — official intro explaining the architecture and use cases
2. [MCP Specification](https://spec.modelcontextprotocol.io/) — technical specification and protocol details
3. [Building MCP Servers](https://modelcontextprotocol.io/docs/concepts/server) — official guide to creating MCP servers
4. [MCP GitHub Organization](https://github.com/modelcontextprotocol) — reference implementations and SDK repos

### 3.3 Installing Your First MCPs
- Web search MCP (e.g., Exa, Firecrawl)
- Google Drive MCP (read/write Google Docs, Sheets)
- GitHub MCP (issues, PRs, repo management)
- **Hands-on:** Wire up a web search MCP and test it

### 3.4 Writing Custom MCP Servers (Intro)
- When you need a custom MCP: your company's internal API
- Using the MCP Python SDK to create a simple "hello world" server
- Testing your MCP locally
- Registering it with OpenCode

#### 📚 Recommended Reading
1. [MCP Server Quick Start (Python)](https://modelcontextprotocol.io/quickstart/server) — official quickstart for building a Python MCP server
2. [Python MCP SDK](https://github.com/modelcontextprotocol/python-sdk) — reference and examples
3. [MCP Server Development Guide](https://modelcontextprotocol.io/docs/concepts/server) — comprehensive guide to server capabilities, tools, resources, and prompts

### 3.5 Extensions, Plugins, and LSPs
- **Extensions/Plugins:** IDE plugins that enhance editor capabilities
- **LSP (Language Server Protocol):** what it is, how it powers autocomplete & errors
- How OpenCode uses LSP internally for code intelligence
- Installing custom VS Code extensions used by your agent workflows

#### 📚 Recommended Reading
1. [VS Code Extension API](https://code.visualstudio.com/api) — official guide to creating and using VS Code extensions
2. [Language Server Protocol Specification](https://microsoft.github.io/language-server-protocol/) — official LSP spec and architecture
3. [VS Code: Language Server Protocol Guide](https://code.visualstudio.com/docs/languages/language-server-protocol) — how VS Code integrates LSPs

---

## 4. Agent Architecture & Custom Agents

### 4.1 How Agents Are Built (Conceptual Layer)
- The agent loop: perceive → plan → act → observe → repeat
- Tool calling — function calling, JSON schemas, return values
- Memory — short-term (context) vs long-term (files, databases)
- Planning — LLM-based planning vs fixed workflows

#### 📺 Recommended Videos
1. [Agentic Framework LangGraph explained in 8 minutes](https://www.youtube.com/watch?v=1Q_MDOWaljk) — LangGraph quick intro
2. [AutoGen vs CrewAI vs LangGraph Best AI Agent Framework In 2025!](https://www.youtube.com/watch?v=8HqeY5v0ohM) — framework comparison
3. [Agentic AI Tutorial for Beginners | Langgraph Tutorial](https://www.youtube.com/watch?v=CnXdddeZ4tQ) — hands-on tutorial

#### 📚 Recommended Reading
1. [Hugging Face AI Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction) — free certified course on AI agents from fundamentals to advanced multi-agent systems
2. [Anthropic: Building Useful Agents](https://www.anthropic.com/research/building-useful-agents) — research-backed guide on agent architecture and best practices
3. [LangChain: LangGraph Conceptual Guide](https://python.langchain.com/docs/concepts/architecture/) — agent loop, memory, and planning architecture
4. [OpenAI: Assistants API](https://platform.openai.com/docs/assistants) — how agent loops with tools are implemented

### 4.2 Creating Custom Agents
- When to build a custom agent vs use a skill
- Using OMP (Oh My Pi) to scaffold agent definitions
- Defining agent personas and tool sets
- **Hands-on:** Build a "Research Agent" with a custom persona

### 4.3 When to Use Custom Agents vs Skills vs Commands
| Scenario | Use |
|---|---|
| One-off task | Command |
| Repeatable behavior | Skill |
| New persona/workflow | Custom Agent |
| Need different tools | Custom Agent |
| Need custom instructions | Skill or Agent |

---

## 5. Use-Case Walkthroughs

### 5.1 Use-Case 1: Local Machine Environment Management
**Problem:** Learner needs to troubleshoot their own computer (disk space, running processes, installing software).

**Setup:**
- OpenCode with local filesystem MCP
- Bash MCP for terminal commands
- System info MCP

**Walkthrough:**
1. Prompt: "Check my disk usage and find the largest folders"
2. Prompt: "List all running processes and flag anything using over 50% CPU"
3. Prompt: "Install Python 3.12 using the package manager"
4. Reviewing agent actions for safety

**Skills Demonstrated:**
- Filesystem navigation
- Process inspection
- Safe system modification

### 5.2 Use-Case 2: Deep Internet Research + Comparative Report
**Problem:** Produce a 10-page comparative analysis report comparing LLM providers (OpenAI, Anthropic, Google) in PDF + Excel.

**Setup:**
- Web search MCP (Exa or SerpAPI)
- Firecrawl MCP (deep page extraction)
- PDF generation (via report generation skill)
- Spreadsheet handling MCP

**Walkthrough:**
1. Prompt: "Research LLM pricing models from 2024-2026, extract features, limitations, and use cases"
2. Prompt: "Compile findings into a comparison table"
3. Prompt: "Generate a PDF report with executive summary and charts"
4. Prompt: "Export the comparison table to Excel with filters"

**Skills Demonstrated:**
- Multi-tool orchestration
- Data extraction from web pages
- Report generation
- File format conversion

### 5.3 Use-Case 3: Gmail Inbox Topic Research + Summarization
**Problem:** Search across Gmail for emails about a specific topic (e.g., "cloud billing"), summarize key discussions, find action items.

**Setup:**
- Gmail MCP (OAuth setup, API access)
- Summarization skill (or Claude/LLM summarization)

**Walkthrough:**
1. OAuth setup for Gmail API
2. Prompt: "Find all emails mentioning 'AWS billing' from the last 6 months"
3. Prompt: "Summarize the key discussion points and any pending actions"
4. Prompt: "Create a follow-up email draft to each sender with open action items"

**Skills Demonstrated:**
- API authentication (OAuth)
- Email parsing and filtering
- Intelligent summarization
- Action item extraction

### 5.4 Use-Case 4: Create & Deploy a Website (Cheaply)
**Problem:** Build and publish a portfolio website for under $5/month.

**Setup:**
- OpenCode for code generation
- HTML/CSS/JS generation skills
- GitHub for repo hosting (free)
- GitHub Pages (free static hosting) OR Cloudflare Pages (free)
- Custom domain (optional, ~$12/year from Porkbun/Namecheap)

**Walkthrough:**
1. Prompt: "Create a responsive portfolio website with 4 sections: Home, About, Projects, Contact"
2. Prompt: "Add a contact form that works without a backend"
3. Prompt: "Optimize for SEO with proper meta tags"
4. Deploy to GitHub Pages
5. (Optional) Add custom domain

**Skills Demonstrated:**
- Frontend code generation
- Static site deployment
- SEO basics
- Domain configuration

### 5.5 Capstone: Full-Stack AI Agent Portfolio
- Combine all skills: research → code → deploy → document
- Project: "AI Meeting Assistant" — reads Zoom/GMeet transcripts, generates meeting notes, action items, follow-up emails, and deploys a dashboard
- Includes all MCPs, custom agents, and deployment pipeline

---

## 6. Assignments (10)

Each assignment includes: problem statement, goal, and starter hint. Solutions are in `docs/assignment_solutions.md`.

| # | Assignment | Problem | Goal | Hint |
|---|---|---|---|---|
| 1 | Fix the Agent | OpenCode generated a Python script that has 3 bugs (logic, edge case, and a crash). Find and fix them. | Debugging agent-generated code | Use `python -m py_compile` and run the script with different inputs |
| 2 | Skill Installation | Install and configure 3 MCP servers of your choice. Document setup steps. | MCP setup and troubleshooting | Read each MCP's README; test with simple prompts |
| 3 | Custom Prompt Library | Create a prompt library with 5 templates for different agent tasks. | Prompt engineering | Use XML tags; version in a `prompts/` folder |
| 4 | Web Scraping Pipeline | Build a pipeline that searches for "AI agent news", extracts content, and saves to a markdown file. | Multi-tool agentic workflow | Combine web search + Firecrawl + file creation MCPs |
| 5 | Email Research Report | Use Gmail MCP to find emails about a project topic, summarize, and export to markdown. | Email API + summarization | Start with 5 emails; expand scope incrementally |
| 6 | Local Environment Audit | Write prompts that audit disk, memory, CPU, and generate a health report. | Local system tools | Use bash MCP; format output as a table |
| 7 | Research Report Generator | Create a 5-section research report on a topic of your choice in PDF format. | Research + report generation | Use Exa + Claude summarization + PDF MCP |
| 8 | Deploy a Microsite | Create and deploy a single-page website using GitHub Pages or Cloudflare Pages. | Deployment pipeline | Use vanilla HTML/CSS/JS; keep it simple |
| 9 | Custom MCP Server | Build a simple MCP server that wraps a public API (e.g., a weather or joke API). | MCP development | Use the Python MCP SDK; test with `mcp test` |
| 10 | Multi-Agent Challenge | Create 2 custom agents with different personas that collaborate on a task. | Agent design | Define clear roles; use a shared workspace directory |

---

## 7. Advanced Agent: Oh My Pi (OMP)

### 7.1 Why OMP Over OpenCode?
- Feature comparison table (OpenCode vs OMP vs Claude Code vs Codex vs Kiro)
- OMP advantages:
  - Global + repo-local agent & MCP config (single YAML, no env var sprawl)
  - Built-in skill marketplace
  - Advanced hook system (pre/post action hooks)
  - Multi-agent orchestration (parent + child agents)
  - Session persistence and replay
  - Token budget management built-in
  - Cost tracking per agent/session

#### 📺 Recommended Videos
1. [oh-my-pi: The Coding Agent With An IDE Inside](https://www.youtube.com/watch?v=0fAMlarIELw) — OMP overview and IDE integration
2. [Don't sleep on the Pi agent, it solves the sandbox problem](https://www.youtube.com/watch?v=1ZsFjM6yZGI) — why OMP matters
3. [How Oh My Pi Edit Code Like agents](https://www.youtube.com/watch?v=2BUlOQ9yiNY) — OMP in action

#### 📚 Recommended Reading
1. [OMP Official Site & Documentation](https://omp.ohmy.tools/) — installation, configuration, and feature docs
2. [OMP GitHub Repository](https://github.com/oh-my-pi) — source code and community discussions
3. [OMP Blog](https://omp.ohmy.tools/blog) — tutorials, release notes, and best practices

### 7.2 Installing & Configuring OMP
- System requirements (Node.js 20+, Python 3.11+ if desired)
- Installation via npm or binary download
- First run: `omp init` — understanding the global config
- **Hands-on:** Set up OMP in a sample project

### 7.3 Global vs. Repo-Local Configuration
- **Global config (`~/.omp/config.yaml`):** your default agents, MCPs, and preferences for all projects
- **Repo-local config (`.omp/config.yaml`):** project-specific agents, tools, and overrides
- How config merging works (global → repo → session)
- **Hands-on:** Create a repo-local agent that differs from your global default

### 7.4 OMP Advanced Features
- **Hooks:** Run commands before/after agent actions (e.g., auto-format on save, lint check before commit)
- **Agent inheritance:** Child agents inherit + override parent config
- **Multi-agent sessions:** Spawn child agents that report back
- **Cost tracking:** See how many tokens/prompt each task uses
- **Session history:** Browse, replay, or export past agent sessions

### 7.5 Building Agents in OMP
- Agent YAML schema (persona, tools, instructions, hooks)
- Creating an agent library for your team
- Publishing and sharing agents

#### 📚 Recommended Reading
1. [OMP Agent Configuration Guide](https://omp.ohmy.tools/config) — global and repo-local config documentation
2. [OMP Hooks Documentation](https://omp.ohmy.tools/hooks) — pre/post action hook system
3. [OMP Multi-Agent Documentation](https://omp.ohmy.tools/multi-agent) — spawning child agents and orchestration
4. [OMP Skills Marketplace](https://omp.ohmy.tools/skills) — finding and installing skills

---

## 8. Other Open-Source Agents

### 8.1 DeepSeek Harness
- What it is and its philosophy
- Installation and first run
- Comparing results with OpenCode/OMP

#### 📺 Recommended Videos
1. [DeepSeek Harness: Beginner To Expert in 15 Minutes](https://www.youtube.com/watch?v=24UCnAs7MVg) — quick start
2. [Deepseek Harness has just changed the Agentic developement](https://www.youtube.com/watch?v=4eqDZodW9gg) — features overview
3. [DeepSeek Harness: FREE 1 Hour Course!](https://www.youtube.com/watch?v=7a04lA_-7TA) — comprehensive course

#### 📚 Recommended Reading
1. [DeepSeek Official Documentation](https://docs.deepseek.com/) — API docs, model specs, and pricing
2. [DeepSeek GitHub](https://github.com/deepseek-ai) — open models and codebase
3. [DeepSeek API Guide](https://platform.deepseek.com/docs) — integration tutorials and examples

### 8.2 Other Notable Open-Source Agents

#### Aider
- AI pair programmer, great for surgical edits

##### 📺 Recommended Videos
1. [Edit existing code with aider! (SWE's dream come true)](https://www.youtube.com/watch?v=1g-4YEPoZKg) — code editing with Aider
2. [This AI Tool Replaces Claude Code & is Free [Aider]](https://www.youtube.com/watch?v=5zPckD0uwrM) — Aider vs Claude Code
3. [Getting Started with AIDER: AI Code Generation for Terminal Projects](https://www.youtube.com/watch?v=6OJm5afun8k) — setup guide

##### 📚 Recommended Reading
1. [Aider Documentation](https://aider.chat/docs/) — official docs for installation, commands, and workflows
2. [Aider GitHub](https://github.com/paul-g/aider) — source and issue tracker
3. [Aider Walkthrough](https://aider.chat/docs/walkthrough.html) — hands-on tutorial from installation to committing code

#### Cline
- VS Code extension, full file system control

##### 📺 Recommended Videos
1. [VSCode + Cline + Continue | NEVER PAY for CURSOR again](https://www.youtube.com/watch?v=0Gc_CwQG_GU) — Cline overview
2. [The Best FREE AI Coding Agent for VS Code](https://www.youtube.com/watch?v=0pfOPZRRxmk) — Cline review
3. [Write Code with AI Agent in VS Code | Cline for Beginners](https://www.youtube.com/watch?v=64anz7dHwEg) — getting started tutorial

##### 📚 Recommended Reading
1. [Cline Documentation](https://docs.cline.bot/) — official docs for setup, commands, and custom instructions
2. [Cline GitHub](https://github.com/cline/cline) — source code and contributing guide
3. [Cline MCP Guide](https://docs.cline.bot/mcp/overview) — using MCP servers with Cline

#### LangGraph / CrewAI
- For building multi-agent workflows programmatically

##### 📺 Recommended Videos
1. [Agentic Framework LangGraph explained in 8 minutes](https://www.youtube.com/watch?v=1Q_MDOWaljk) — LangGraph quick intro
2. [AutoGen vs CrewAI vs LangGraph Best AI Agent Framework In 2025!](https://www.youtube.com/watch?v=8HqeY5v0ohM) — framework comparison
3. [Agentic AI Tutorial for Beginners | Langgraph Tutorial](https://www.youtube.com/watch?v=CnXdddeZ4tQ) — hands-on tutorial

##### 📚 Recommended Reading
1. [LangGraph Documentation](https://python.langchain.com/docs/langgraph) — official docs for building agent graphs
2. [CrewAI Documentation](https://docs.crewai.com/) — official docs for multi-agent workflows
3. [LangChain Tutorials](https://python.langchain.com/docs/tutorials/) — LangChain and LangGraph tutorials
4. [CrewAI GitHub](https://github.com/crewaiInc/crewAI) — source code and examples

#### Gemini CLI
- Google's agent with native multimodal support

##### 📺 Recommended Videos
1. [Google's New Agent CLI Tool builds AI Agents in Mins!!!](https://www.youtube.com/watch?v=0h7Gnjm6VQk) — Gemini CLI overview
2. [Gemini CLI Tutorial #1 - Introduction & Setup](https://www.youtube.com/watch?v=1AF5pFGwRTM) — installation guide
3. [Gemini CLI: The AI agent that lives in your terminal](https://www.youtube.com/watch?v=C5Cjvpfzc_0) — hands-on usage

##### 📚 Recommended Reading
1. [Gemini CLI GitHub](https://github.com/google-gemini/gemini-cli) — source code and setup
2. [Gemini CLI Quickstart](https://ai.google.dev/gemini-api/docs/gemini-cli/quickstart) — official quickstart guide
3. [Gemini CLI Configuration](https://ai.google.dev/gemini-api/docs/gemini-cli/config) — configuration and model selection

---

## 9. Paid Agent Options (When Free Isn't Enough)

| Agent | Cost | Model Access | Key Strengths | Key Weaknesses |
|---|---|---|---|---|
| **Claude Code** | $10–$20/mo (Pro) | Claude 3.5/4 Sonnet, Opus | Best code understanding, deep repo context | Anthropic API dependency, slower than smaller models |
| **Codex (CLI)** | Free/OSS | Any model (o1, GPT-4o, etc.) | Fast, lightweight, OpenAI-native | Less autonomous than full agents |
| **Kiro (AWS)** | Preview (free now) | Claude + Bedrock models | AWS integration, enterprise-grade | New, limited docs, AWS-bound |
| **OpenCode** | Free / $10/mo (Zen) | 100+ models via OpenRouter | Cheap, flexible model selection | Less integrated than Claude Code |
| **OMP** | Free / Open-source | Any model | Advanced config, multi-agent, hooks | Smaller community, newer docs |

### 9.1 Installing Paid Agents
- **Claude Code:** `npm install -g @anthropic-ai/claude-code` → login with Claude account
- **Codex CLI:** `npm install -g @openai/codex` → login with OpenAI key
- **Kiro:** `pip install amazon-kiro` (when GA) OR use AWS Bedrock → configure AWS credentials

#### 📺 Recommended Videos
1. [Learn 80% of Claude Code in 10 Minutes (2026 Tutorial)](https://www.youtube.com/watch?v=3aKVArutiIU) — Claude Code fast start
2. [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0) — deep dive
3. [The Ultimate Beginners Guide to Claude AI](https://www.youtube.com/watch?v=9oJySubZRSA) — Claude basics

#### 📚 Recommended Reading
1. [Claude Code Official Documentation](https://docs.anthropic.com/en/docs/claude-code) — installation, commands, and configuration
2. [Claude Code GitHub Repository](https://github.com/anthropics/claude-code) — source and issue tracker
3. [Anthropic API Documentation](https://docs.anthropic.com/en/docs) — Claude API integration and best practices
4. [Claude Code Tips and Tricks](https://docs.anthropic.com/en/docs/claude-code/tutorials) — tutorials and workflows

### 9.2 When to Upgrade from OpenCode/OMP
- Need guaranteed uptime (paid APIs)
- Need specific model access (Opus, o3)
- Team collaboration features
- Enterprise compliance (SOC2, data residency)

---

## 10. Free-Tier LLM Providers & Routing

### 10.1 Where to Get Free LLM Access
| Provider | Free Tier | Notes |
|---|---|---|
| **OpenRouter** | $10/month free credit → $0.14/day after | 100+ models, pay-per-token, great for agents |
| **Hugging Face** | Free inference for top models | Rate-limited; good for experimentation |
| **Google AI Studio** | 1.5M tokens/day free | Good for Gemini 2.0/2.5 Flash |
| **DeepSeek** | 100% free, no credit card | DeepSeek V2.5 / V3 (strong coding) |
| **Together.ai** | Free tier with registration | Good Llama 3.3 / Qwen models |
| **Chutes.io** | $5 free credit | Serverless inference, easy API |
| **0Leila (aka Leila)** | 1M tokens free, no CC | New, generous free tier |
| **Nous Research** | 120B Hermes 3 free, no CC | Strong open model, via together.ai |

### 10.2 Using Free LLMs with OpenCode & OMP
- Setting `OPENROUTER_API_KEY` / other provider keys
- Model selection in agent config: `model: openrouter/deepseek/deepseek-chat`
- Cost comparison: tokens vs dollars
- **Hands-on:** Configure OpenCode to use DeepSeek (free) instead of a paid model

#### 📚 Recommended Reading
1. [OpenRouter Docs: Models](https://openrouter.ai/models) — complete list of 100+ models with pricing
2. [OpenRouter API Documentation](https://openrouter.ai/docs) — integration guide, authentication, and rate limits
3. [Hugging Face Inference API](https://huggingface.co/docs/api-inference) — free serverless inference
4. [Google AI Studio Docs](https://ai.google.dev/) — Gemini API setup and free tier details
5. [DeepSeek Platform](https://platform.deepseek.com/docs) — API documentation and free rate limits

---

## 11. Local LLM Engines (Run Models on Your Computer)

### 11.1 What Is Ollama?
- Ollama: run LLMs locally (Mac, Linux, Windows beta)
- Installation guide (download, install, first launch)
- Pulling a model: `ollama pull llama3.2-vision`
- Chatting locally: `ollama run llama3.2-vision`
- Customizing models with Modelfiles

#### 📺 Recommended Videos
1. [Ollama Tutorial for Beginners | Run LLMs Locally on Your Computer](https://www.youtube.com/watch?v=qwdFfEc7wME) — complete beginner guide
2. [How to Run Local LLMs with Ollama: A Step-by-Step Guide](https://www.youtube.com/watch?v=N4haIG4kWN8) — step-by-step walkthrough
3. [Ollama Tutorial: Run AI Models on Your Own Computer](https://www.youtube.com/watch?v=onrvYqir_mQ) — no-cloud local AI

#### 📚 Recommended Reading
1. [Ollama Official Documentation](https://ollama.com/docs/) — installation, model management, and API usage
2. [Ollama GitHub](https://github.com/ollama/ollama) — source code and troubleshooting
3. [Ollama Modelfile Reference](https://ollama.com/docs/modelfile) — creating custom model variants with prompts and parameters
4. [Ollama API](https://ollama.com/docs/api) — using Ollama's REST API for integration with agents

### 11.2 What Is llama.cpp?
- llama.cpp: the C/C++ engine that runs quantized LLMs
- Quantization explained — Q4_K, F16, why smaller models run on laptops
- Installing via pre-built binaries or building from source
- Downloading GGUF models from HuggingFace
- Running inference: `llama-cli -m model-q4.gguf -p "Hello"`

#### 📺 Recommended Videos
1. [How to Run Local LLMs with Llama.cpp: Complete Guide](https://www.youtube.com/watch?v=EPYsP-l6z2s) — full tutorial with LoRA support
2. [How to run LLM models locally - llama.cpp tutorial](https://www.youtube.com/watch?v=pgHPkGuufRE) — installation and model loading
3. [Install a LOCAL AI with llama.cpp on your PC](https://www.youtube.com/watch?v=eYjO6e87I1Q) — Windows setup guide

#### 📚 Recommended Reading
1. [llama.cpp GitHub](https://github.com/ggerganov/llama.cpp) — main repository with README and build instructions
2. [llama.cpp Examples](https://github.com/ggerganov/llama.cpp/tree/master/examples) — code examples for different languages and use cases
3. [GGUF Format Specification](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md) — GGUF model format documentation
4. [llama.cpp Server Mode](https://github.com/ggerganov/llama.cpp/tree/master/examples/server) — running llama.cpp as an API server

### 11.3 Local APIs & OpenAI-Compatible Servers
- Ollama's built-in OpenAI-compatible API (`http://localhost:11434`)
- llama.cpp's `server` mode (`llama-server`)
- Exposing your local LLM as an API endpoint

### 11.4 Using Local LLMs with OpenCode & OMP
- Pointing OpenCode to local endpoint: `OPENAI_BASE_URL=http://localhost:11434/v1`
- Model selection: `model: llama3.2-vision` (via Ollama)
- Performance considerations (CPU vs GPU, RAM requirements)
- **Hands-on:** Run a coding task using a local model

### 11.5 Local Model Router: OmniRoute
- What OmniRoute does: routes prompts to the best local model based on task
- Installation: `pip install omniroute` or Docker
- Configuration: model priority, fallback chains
- Integration with OpenCode and OMP (point to OmniRoute endpoint)
- **Hands-on:** Set up OmniRoute to try local model first, then fall back to DeepSeek API

#### 📚 Recommended Reading
1. [OmniRoute Official Site](https://www.omniroute.online/) — project overview and documentation
2. [OmniRoute GitHub](https://github.com/omniroute/omniroute) — source code and installation guide
3. [OmniRoute Configuration Guide](https://www.omniroute.online/docs) — model routing configuration and fallback chains

---

## 12. Project Ideas (Challenging)

> These projects are designed to be portfolio-worthy. Each can be done solo or in a team of 2-3.

### 12.1 Online Platform
- **AI Research Copilot:** A web app where a user enters a research question, and an agent deep-searches the web, reads 20+ pages, and returns a structured report with citations. Include a "follow-up" chat feature.
- **Automated Job Application Agent:** Connects to your email, parses job postings, generates tailored cover letters + resumes per application, and drafts LinkedIn messages to recruiters.

### 12.2 Mobile App
- **Personal Knowledge Assistant:** An Android/iOS app that lets you record voice memos, auto-transcribes + summarizes them, and surfaces relevant past notes when you speak a new topic (uses local embedding + RAG).
- **Study Buddy AI:** A spaced-repetition flashcard app where the AI generates cards from your lecture notes/YouTube transcripts and adapts to your mistakes.

### 12.3 Local Tool
- **CLI Life Assistant:** A single terminal tool (Python/TypeScript) that does 5 things: email summary, calendar check, news briefing, Pomodoro timer, and system health check — all via agent + MCPs.
- **Privacy-First Data Dashboard:** An agent that reads your local files (bank CSV, fitness export, etc.), generates a personal dashboard in HTML, and updates it daily via cron.

### 12.4 Post on LinkedIn
- Build one of the above, then write a 3-part LinkedIn thread: (1) What I built, (2) The hard part, (3) The code walkthrough. Use an agent to help draft and schedule.

---

## 13. Assignment Solutions

> Full solutions are in [`assignment_solutions.md`](./assignment_solutions.md).
> Each solution includes: problem restatement, step-by-step resolution, code snippets, and lessons learned.

---

## Appendix

### A. Resource Directory (All Free or <$20)
| Resource | Cost | Link |
|---|---|---|
| OpenCode Zen | $10/month | Anomaly.tech |
| OpenRouter free tier | Free ($10 credit) | openrouter.ai |
| DeepSeek API | Free | deepseek.com |
| Google AI Studio | Free | aistudio.google.com |
| Hugging Face | Free tier | huggingface.co |
| Together.ai | Free tier | together.ai |
| GitHub (public repos) | Free | github.com |
| GitHub Pages | Free | pages.github.com |
| Cloudflare Pages | Free | pages.cloudflare.com |
| Porkbun (domains) | ~$12/year | porkbun.com |

### B. Glossary (for Non-CS Grads)
- **Agent:** An AI that can take actions (not just answer questions)
- **MCP:** Model Context Protocol — a way for tools to talk to agents
- **Token:** A chunk of text (roughly 4 characters in English)
- **Context Window:** How much text the model can "remember" at once
- **Tool Call:** When an agent decides to use a tool (search, file, API)
- **Hook:** Code that runs automatically when something happens
- **Quantization:** Shrinking a model so it runs faster/slower-accuracy
- **Inference:** Running a model to get an answer (vs training)

### C. Troubleshooting Quick Reference
- Agent says "I can't find the file" → check working directory, use absolute paths
- MCP not connecting → restart agent, check server logs, verify env vars
- Model too slow → switch to a smaller/faster model, use local LLM
- Agent goes in circles → add more constraints to the prompt, use fewer tools

### D. Ethics & Responsible AI Quick Notes
- Never give an agent access to destructive commands without review
- Always review agent changes before committing to git
- Be transparent when AI-generated content is used in public
- Protect personal/sensitive data when using cloud LLMs

---

## Recommendations Added (Based on Review)

1. **Add Git/GitHub fundamentals earlier** — every agent workflow ends with a git commit. Learners need this.
2. **Add a dedicated "prompt engineering" module** — the quality of agent output is proportional to prompt quality. This was implied but should be explicit.
3. **Add "Ethics & Responsible AI" as a standalone mini-module** — not just an appendix. Fresh grads need to understand guardrails.
4. **Add a capstone project** — a final project that combines web research + report generation + deployment + documentation. Builds a portfolio piece.
5. **Add troubleshooting & debugging patterns** — learners will hit walls; a structured debug section reduces frustration.
6. **Break long modules into sub-2-hour lessons** — fresh grads have short attention spans. Each lesson should be doable in one sitting with a concrete outcome.
7. **Add a "learning journal" requirement** — learners document what worked/didn't each day. Builds reflection habit.
8. **Include a "community & support" section** — where to ask questions, find peers (Discord, Reddit, forums).
9. **Add a "next steps" career guide** — after the learning path, what jobs/skills to pursue? (AI tooling engineer, prompt engineer, agent developer, automation specialist)

### New Module: Capstone (5.5)
Full-stack AI Agent Portfolio — combines all skills into one portfolio-worthy project.

### Added Node.js/NPM as Prerequisite (0.1)
Learners need Node.js to run agent CLI tools (OpenCode, OMP, MCP servers). No JavaScript knowledge required — just need the runtime installed.

### Removed Python Refresher (0.2)
Replaced the separate Python refresher section with a focus on Markdown Essentials instead. Python knowledge is assumed as a prerequisite before starting the learning path.

### Added Markdown Essentials (0.3)
Markdown is the output format of choice for AI agents. Learners need to understand it to review/edit agent-generated files. Includes 2 free tutorials and 2 open-source authoring tools (VS Code + Markor).

### Added YouTube Videos & Reading Materials
Each topic now includes:
- 📺 Recommended Videos (3 per topic, curated from high-quality YouTube channels)
- 📚 Recommended Reading (2-5 per topic, including official docs, tutorials, and free guides)
