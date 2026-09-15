<!-- Navigation: Top -->
← [Back to Section Index](00-index.md) | ← [01. DeepSeek Harness](01-deepseek-harness.md) | [Next Section →](../10-paid-agents/00-index.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section 8: Other Open-Source Agents](00-index.md) → **Other Notable Agents**

---

# Other Notable Open-Source Agents

> This page covers five key alternatives to OpenCode/OMP: **Aider**, **Cline**, **LangGraph**, **CrewAI**, and **Gemini CLI**. Each has a distinct philosophy and sweet spot.

---

## 📺 Recommended Videos

1. [Edit existing code with aider! (SWE's dream come true)](https://www.youtube.com/watch?v=1g-4YEPoZKg) — code editing with Aider
2. [This AI Tool Replaces Claude Code & is Free [Aider]](https://www.youtube.com/watch?v=5zPckD0uwrM) — Aider vs Claude Code comparison
3. [Getting Started with AIDER: AI Code Generation for Terminal Projects](https://www.youtube.com/watch?v=6OJm5afun8k) — Aider setup guide

> Videos for Cline, LangGraph, and Gemini CLI are covered in their respective subsections below.

---

## Tool Comparison

| Tool | Type | Install | Philosophy | Sweet Spot |
|---|---|---|---|---|
| **Aider** | Terminal pair programmer | pip / pipx / uv / curl | Surgical edits, git-aware, minimal context | Fixing bugs, refactoring specific files |
| **Cline** | VS Code + CLI agent | VS Code extension + `npm i -g cline` | Full file system control with human approval | Complex multi-step coding tasks |
| **LangGraph** | Orchestration framework | `pip install -U langgraph` | Low-level, stateful, long-running workflows | Building custom multi-agent systems |
| **CrewAI** | Multi-agent framework | `uv tool install crewai` | High-level crew abstractions, role-based agents | Rapid multi-agent prototypes and flows |
| **Gemini CLI** | Terminal agent | `npm install -g @google/gemini-cli` | Google-native, multimodal, Search-grounded | Google ecosystem integration |

---

## Aider — Surgical Code Edits

> Aider is AI pair programming in your terminal. It's great for surgical edits to existing codebases and has tight git integration.

### Philosophy

Aider's philosophy is **surgical, git-aware editing**:

- **Diff-based edits** — Aider sends only the changes (diffs) to the model, not the entire file contents. This is efficient and minimizes token usage.
- **Automatic git commits** — All AI changes are committed to git automatically, making them easy to track and undo.
- **Minimal context** — You add only the files you're editing. Aider pulls in relevant context from the rest of the repo automatically.
- **Model flexibility** — Works with Claude, GPT-4, o3-mini, DeepSeek, and local models.

### Installation

If you already have Python 3.8–3.13, install aider in two steps:

```bash
python -m pip install aider-install
aider-install
```

Or use a one-liner (installs aider + Python 3.12 if needed):

**Mac & Linux:**
```bash
curl -LsSf https://aider.chat/install.sh | sh
```

**Windows:**
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://aider.chat/install.ps1 | iex"
```

Or with pipx:
```bash
python -m pip install pipx
pipx install aider-chat
```

### First Run

```bash
cd /to/your/project
aider --model deepseek --api-key deepseek=<key>
```

Other model options:
```bash
# Claude 3.7 Sonnet
aider --model sonnet --api-key anthropic=<key>

# o3-mini
aider --model o3-mini --api-key openai=<key>
```

### Common Pitfalls

- ❌ Adding too many files — Only add the files you need to edit. Adding your entire repo will overwhelm the model and waste tokens.
- ❌ Forgetting the `/undo` command — If you don't like a change, use `/undo` to revert it instantly.
- ❌ Not having git initialized — Aider auto-commits changes. Make sure you're in a git repo.

### Quick Reference

| Command | What It Does |
|---|---|
| `aider <file1> <file2>` | Start aider with specific files |
| `/help` | See in-chat commands |
| `/model` | Switch models mid-session |
| `/add <file>` | Add a file to the chat |
| `/undo` | Undo the last AI change |
| `--api-key <provider>=<key>` | Pass an API key from the command line |

![Aider](assets/aider.png)

---

## Cline — VS Code Agent with Approval

> Cline is an AI coding agent that lives in your editor (VS Code, JetBrains, Zed, etc.) and your terminal. It can read and write files, run commands, browse the web, and use tools — every action requires your explicit approval.

### Philosophy

Cline's philosophy is **human-in-the-loop control**:

- **Approval-gated actions** — Every file write, command execution, or tool call requires your explicit approval. You're always in control.
- **IDE integration** — Deep integration with VS Code and JetBrains IDEs, using the editor's file system, terminal, and UI.
- **ACP support** — Works across editors via the Agent Client Protocol (ACP), not locked to one IDE.
- **MCP support** — Connects to MCP servers for extended tool capabilities.

### Installation

**VS Code Extension (recommended for IDE use):**
1. Install [Cline from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
2. Open the Cline panel in VS Code
3. Click the settings icon (⚙️) and authenticate

**CLI (for terminal use):**
```bash
npm i -g cline
cline auth
```

### Authentication Options

| Provider | Cost | Notes |
|---|---|---|
| **Cline (usage-billing)** | Free tier + paid | Sign in with Google/GitHub/email, no API key needed |
| **ClinePass** | $9.99/month | 2-5x usage on popular open coding models (GLM, Kimi, DeepSeek, MiMo) |
| **Bring Your Own Key (BYOK)** | As your provider bills | OpenRouter, Anthropic, OpenAI, Google Gemini, AWS Bedrock, DeepSeek |

### First Run (CLI)

```bash
# Interactive session
cline

# Run one task immediately
cline "refactor this module to use async/await"

# Structured JSON output for scripts
cline --json "list TODO comments"

# Auto-approval for headless runs
cline --auto-approve true "run tests and fix failures"
```

### Common Pitfalls

- ❌ Skipping authentication setup — Run `cline auth` (CLI) or click **Sign In** (VS Code) first.
- ❌ Not reviewing tool permissions — Cline will ask for approval before every action. Don't blindly approve destructive commands.
- ❌ Forgetting MCP configuration — Install MCP servers via `cline mcp` or the extension settings.

### Quick Reference

| Command | What It Does |
|---|---|
| `cline auth` | Authenticate and set provider/model |
| `cline` | Start interactive session |
| `cline "<task>"` | Run a one-off task |
| `cline --json "<task>"` | Output structured JSON |
| `cline --auto-approve true "<task>"` | Run fully unattended |
| `cline mcp` | Manage MCP servers |
| `cline doctor` | Diagnose configuration issues |
| `cline --help` | See all options |

![Cline](assets/cline.png)

---

#### 📺 Recommended Videos (Cline)

1. [VSCode + Cline + Continue | NEVER PAY for CURSOR again](https://www.youtube.com/watch?v=0Gc_CwQG_GU) — Cline overview with VS Code setup
2. [The Best FREE AI Coding Agent for VS Code](https://www.youtube.com/watch?v=0pfOPZRRxmk) — Cline review and comparison
3. [Write Code with AI Agent in VS Code | Cline for Beginners](https://www.youtube.com/watch?v=64anz7dHwEg) — getting started tutorial

#### 📚 Recommended Reading (Cline)

1. [Cline Documentation](https://docs.cline.bot/) — official docs for setup, commands, and custom instructions
2. [Cline GitHub](https://github.com/cline/cline) — source code and contributing guide
3. [Cline MCP Guide](https://docs.cline.bot/mcp/overview) — using MCP servers with Cline

---

## LangGraph — Low-Level Agent Orchestration

> LangGraph is a low-level orchestration framework and runtime for building, managing, and deploying long-running, stateful agents. It gives you fine-grained control to mix deterministic, hand-coded steps with LLM-driven agentic steps.

### Philosophy

LangGraph's philosophy is **fine-grained control over agentic workflows**:

- **Stateful by default** — Agents persist through failures and can resume from where they left off, using checkpointers.
- **Mix deterministic and agentic steps** — Combine hand-coded, predictable logic with LLM-driven decision-making in a single graph.
- **Human-in-the-loop** — Inspect and modify agent state at any point during execution.
- **Built on graph primitives** — Inspired by Pregel and Apache Beam, with a NetworkX-like Python API.

### Installation

```bash
pip install -U langgraph
```
Or with uv:
```bash
uv add langgraph
```

### Hello World Example

```python
from langgraph.graph import StateGraph, MessagesState, START, END

def mock_llm(state: MessagesState):
    return {"messages": [{"role": "ai", "content": "hello world"}]}

graph = StateGraph(MessagesState)
graph.add_node(mock_llm)
graph.add_edge(START, "mock_llm")
graph.add_edge("mock_llm", END)
graph = graph.compile()

graph.invoke({"messages": [{"role": "user", "content": "hi!"}]})
```

### Core Capabilities

| Capability | What It Gives You |
|---|---|
| **Persistence** | Agents survive crashes and resume from checkpoints |
| **Human-in-the-loop** | Inspect and modify state mid-execution |
| **Memory** | Short-term working memory + long-term cross-session memory |
| **Streaming** | Real-time output as the agent works |
| **Debugging with LangSmith** | Trace execution paths, capture state transitions, view runtime metrics |

### When to Use LangGraph

- You need **full control** over agent behavior — no high-level abstractions hiding the details.
- You're building **long-running, stateful workflows** that must survive failures.
- You want to **mix hand-coded logic** with LLM-driven steps in the same workflow.
- You need **human review checkpoints** in an automated pipeline.

> **LangGraph does not** abstract prompts or agent architecture — it focuses purely on orchestration. If you want higher-level abstractions, consider CrewAI instead.

### Common Pitfalls

- ❌ Starting here instead of with an agent framework — LangGraph is low-level. If you're new to agents, start with CrewAI or OpenCode first.
- ❌ Forgetting to set up persistence — Without a checkpointer, your agent state is lost on crashes.
- ❌ Ignoring LangSmith for debugging — LangGraph agents are complex; without tracing, debugging is painful.

### Quick Reference

| Command | What It Does |
|---|---|
| `pip install -U langgraph` | Install the LangGraph package |
| `StateGraph(...)` | Create a new agent graph |
| `graph.add_node(...)` | Add a step (deterministic or LLM-driven) |
| `graph.add_edge(...)` | Define transitions between steps |
| `graph.compile()` | Compile the graph into a runnable agent |
| `graph.invoke(...)` | Run the agent synchronously |
| `graph.stream(...)` | Stream agent output in real time |

![LangGraph](assets/langgraph.png)

---

#### 📺 Recommended Videos (LangGraph)

1. [Agentic Framework LangGraph explained in 8 minutes](https://www.youtube.com/watch?v=1Q_MDOWaljk) — LangGraph quick intro
2. [AutoGen vs CrewAI vs LangGraph Best AI Agent Framework In 2025!](https://www.youtube.com/watch?v=8HqeY5v0ohM) — framework comparison
3. [Agentic AI Tutorial for Beginners | Langgraph Tutorial](https://www.youtube.com/watch?v=CnXdddeZ4tQ) — hands-on tutorial

#### 📚 Recommended Reading (LangGraph)

1. [LangGraph Documentation](https://python.langchain.com/docs/langgraph) — official docs for building agent graphs
2. [LangChain Tutorials](https://python.langchain.com/docs/tutorials/) — LangChain and LangGraph tutorials
3. [LangSmith Observability](https://python.langchain.com/docs/langsmith/) — tracing, evaluation, and monitoring

---

## CrewAI — High-Level Multi-Agent Framework

> CrewAI is a production-ready framework for building collaborative AI agents, crews, and flows. It provides higher-level abstractions than LangGraph, making it easier to quickly assemble multi-agent systems.

### Philosophy

CrewAI's philosophy is **rapid multi-agent development**:

- **Role-based agents** — Define agents with specific roles, goals, and backstories.
- **Crews and tasks** — Group agents into crews that execute sequential or hierarchical tasks.
- **Guardrails and memory** — Built-in guardrails, memory, knowledge bases, and observability.
- **Production-ready** — Designed to ship from day one with enterprise features.

### Installation

CrewAI uses `uv` as its dependency manager:

**Step 1 — Install uv:**
```bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Step 2 — Install CrewAI CLI:**
```bash
uv tool install crewai
```

**Step 3 — Create a project:**
```bash
crewai create crew my_project
```

This creates the following structure:
```
my_project/
├── .gitignore
├── .env
├── agents/
│   └── researcher.jsonc
├── crew.jsonc
├── knowledge/
├── pyproject.toml
├── README.md
├── skills/
└── tools/
```

**Step 4 — Run your crew:**
```bash
crewai install
crewai run
```

> 🧪 **Python requirement:** CrewAI requires `Python >= 3.10 and < 3.14`. Check with `python3 --version`.

### When to Use CrewAI

- You want **high-level abstractions** — agents, crews, tasks, processes — without writing boilerplate.
- You're prototyping a **multi-agent system** quickly with role-based agents.
- You want **built-in guardrails, memory, and knowledge** without setting them up manually.
- You prefer **JSON-first configuration** over writing Python code for agent definitions.

> **CrewAI vs LangGraph:** CrewAI is higher-level and opinionated. LangGraph is lower-level and gives you full control. Both can be used together.

### Common Pitfalls

- ❌ Not installing Python 3.10+ — Older Python versions will fail. Check with `python3 --version`.
- ❌ Forgetting `crewai install` — Always run `crewai install` after creating a project to set up the virtual environment.
- ❌ Hardcoding API keys — Store keys in `.env`, not in code.

### Quick Reference

| Command | What It Does |
|---|---|
| `crewai create crew <name>` | Create a new CrewAI project |
| `crewai create crew <name> --classic` | Create a project with the older Python/YAML scaffold |
| `crewai install` | Install project dependencies |
| `crewai run` | Run the crew |
| `crewai version` | Check CLI version |
| `crewai --help` | See all options |

---

## Gemini CLI — Google's Terminal Agent

> Gemini CLI is an open-source AI agent from Google that brings Gemini directly into your terminal. It features built-in Google Search grounding, file operations, shell commands, web fetching, and 1M token context windows.

> ⚠️ **Note:** As of June 18, 2026, Gemini CLI was transitioned to **Antigravity CLI** for most users. If you're starting fresh, you may be directed to Antigravity. The information below covers the original Gemini CLI for users who have it installed or are migrating.

### Philosophy

Gemini CLI's philosophy is **Google-native, multimodal agentic workflows**:

- **Free tier with generous limits** — 60 requests/minute and 1,000 requests/day with a personal Google account.
- **Built-in Google Search grounding** — The agent can search the web for real-time information before responding.
- **Multimodal from the start** — Process PDFs, images, and code in a single session.
- **1M token context window** — Handle large codebases and long conversations.
- **MCP support** — Extend with custom tools via the Model Context Protocol.
- **GEMINI.md** — Provide persistent project context via a markdown file in your project root.

### Installation

```bash
# Global install (recommended)
npm install -g @google/gemini-cli

# Or run instantly without installing
npx @google/gemini-cli
```

**System requirements:**
- macOS 15+ or Ubuntu 20.04+ (Windows 11 24H2+)
- Node.js 20.0.0+
- 4GB+ RAM for casual usage, 16GB+ for power usage

### Authentication & First Run

```bash
gemini
```

On first run, you'll be prompted to:
1. Sign in with your Google account
2. Accept the terms of service
3. Start using Gemini CLI in the current directory

> 🔧 **Tip:** Use `GEMINI.md` in your project root to provide persistent context, coding conventions, and project-specific instructions.

### Key Commands

```bash
gemini                    # Start interactive session
gemini -p "task"          # Run a one-off task
gemini --model gemini-2.5-flash-latest  # Override model
gemini --help             # See all options
```

### Built-in Tools

| Tool | Capability |
|---|---|
| **File System Operations** | Read, write, and edit files in your workspace |
| **Shell Commands** | Run terminal commands with approval |
| **Web Fetch & Search** | Fetch web pages and search Google |
| **MCP Server Integration** | Connect custom tools via MCP |
| **Custom Extensions** | Build and share your own commands |

### Common Pitfalls

- ❌ Not signing in with a Google account — Gemini CLI requires Google authentication.
- ❌ Running in untrusted folders — Gemini CLI uses trusted folder policies. Use `/trust` in an directory to allow file operations.
- ❌ Exhausting the free tier — 1,000 requests/day can go fast with long coding sessions. Monitor usage or set up a paid account.

### Quick Reference

| Command | What It Does |
|---|---|
| `npm install -g @google/gemini-cli` | Install Gemini CLI globally |
| `gemini` | Start interactive session |
| `gemini -p "<prompt>"` | Run a one-off task |
| `gemini --model <model>` | Override the model |
| `gemini --help` | See all options and flags |

![Gemini CLI](assets/gemini.png)

---

#### 📺 Recommended Videos (Gemini CLI)

1. [Google's New Agent CLI Tool builds AI Agents in Mins!!!](https://www.youtube.com/watch?v=0h7Gnjm6VQk) — Gemini CLI overview
2. [Gemini CLI Tutorial #1 - Introduction & Setup](https://www.youtube.com/watch?v=1AF5pFGwRTM) — installation and setup guide
3. [Gemini CLI: The AI agent that lives in your terminal](https://www.youtube.com/watch?v=9EGtawwvlNs) — hands-on usage

#### 📚 Recommended Reading (Gemini CLI)

1. [Gemini CLI GitHub](https://github.com/google-gemini/gemini-cli) — source code and setup
2. [Gemini CLI Quickstart](https://ai.google.dev/gemini-api/docs/gemini-cli/quickstart) — official quickstart guide
3. [Gemini CLI Configuration](https://ai.google.dev/gemini-api/docs/gemini-cli/config) — configuration and model selection

---

## Choosing the Right Tool

| Your Situation | Best Tool |
|---|---|
| Need surgical edits to specific files, git-aware | **Aider** |
| Want full IDE integration with human approval | **Cline** |
| Building a complex multi-agent orchestration | **LangGraph** |
| Rapid prototyping of role-based agent crews | **CrewAI** |
| Google Cloud ecosystem, multimodal, Search grounding | **Gemini CLI** |
| Plugin-first harness with DeepSeek models | **DeepSeek Harness** |

---

## Common Pitfalls (All Tools)

- ❌ **Installing everything at once** — Don't install all five agents. Pick one relevant to your workflow and explore it deeply.
- ❌ **Mixing too many models** — Each tool has its own auth and model config. Keep a simple setup while learning.
- ❌ **Forgetting MCP config** — Cline, Gemini CLI, and OMP all use MCP servers. Configure them once per tool.
- ❌ **Not understanding the philosophy** — LangGraph gives you control; CrewAI gives you speed; Aider gives you precision; Cline gives you safety; Gemini CLI gives you Google integration.

---

## Key Takeaways

- **Aider** is the best choice when you need to make precise, surgical edits to an existing codebase and want automatic git commits.
- **Cline** excels when you want full file-system control with human-in-the-loop approval — especially inside VS Code.
- **LangGraph** gives you the lowest-level control for building stateful, long-running multi-agent workflows programmatically.
- **CrewAI** provides the highest-level abstractions for quickly assembling multi-agent crews with roles, tasks, and guardrails.
- **Gemini CLI** brings Google's multimodal models and Search grounding into the terminal, with a generous free tier.
- **DeepSeek Harness** offers a plugin-first architecture for building extensible agent systems, powered by free, strong coding models.
- The right tool depends on your workflow, not just the features. Understanding each tool's philosophy is more important than memorizing commands.

---

## 📚 Recommended Reading (Section Overview)

1. [Aider Documentation](https://aider.chat/docs/) — official docs for installation, commands, and workflows
2. [Cline Documentation](https://docs.cline.bot/) — official docs for setup, commands, and custom instructions
3. [CrewAI Documentation](https://docs.crewai.com/) — official docs for multi-agent workflows
4. [LangGraph Documentation](https://python.langchain.com/docs/langgraph) — official docs for building agent graphs
5. [Gemini CLI GitHub](https://github.com/google-gemini/gemini-cli) — source code and setup

> Additional crew image: ![CrewAI](assets/crewai.png)

---

<!-- Navigation: Bottom -->
← [Back to Section Index](00-index.md) | ← [01. DeepSeek Harness](01-deepseek-harness.md) | [Next Section →](../10-paid-agents/00-index.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
