<!-- Navigation: Top -->
← [Back to Section Index](index.md) | [02. Installing OMP →](02-installing.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → [Section 7: Oh My Pi (OMP)](index.md) → [01. Why OMP?](01-why-omp.md)

---

# 01. Why OMP?

> **Estimated time:** 30 min | **Goal:** Understand where Oh My Pi fits in the coding-agent ecosystem, and decide when it's the right tool.

---

## The Coding Agent Landscape

| Feature | **OpenCode** | **Claude Code** | **Oh My Pi (OMP)** |
|---|---|---|---|
| **License** | Apache 2.0 (open-source) | Proprietary | MIT (open-source) |
| **Providers** | 15+ (Anthropic, OpenAI, Google, OpenRouter, local) | Anthropic only | 60+ (Anthropic, OpenAI, Google, Groq, OpenRouter, Mistral, xAI, DeepSeek, local, and more) |
| **Local engine support** | Ollama, Llama.cpp | — | Ollama, Llama.cpp, LM Studio, vLLM (keyless auto-discovery) |
| **LSP integration** | — | — | Yes (inline diagnostics, hover, go-to-definition) |
| **DAP debugger** | — | — | Yes (set breakpoints, step, inspect variables) |
| **Built-in tools** | ~20 | ~20+ | 31 built-in tools |
| **MCP (Model Context Protocol)** | Yes | Yes | Yes (project + user config, stdio/http/sse transports) |
| **Hooks** | Yes (TypeScript) | Yes (TypeScript) | Yes (JavaScript/TypeScript, pre/post, 7+ events) |
| **Subagents** | — | — | Yes (Agent Hub, YAML-defined, `task` tool dispatch) |
| **Multi-agent orchestration** | — | — | Built-in (`task` tool + agent library) |
| **Cost tracking** | — | — | Yes (`omp usage`, status-line segment, peak/off-peak arrows) |
| **Config inheritance** | — | — | Yes (adopts `.claude`, `.gemini`, `opencode`, and more) |
| **Adapter mode** | — | — | Run OMP as a backend for Claude Code, Codex, Gemini CLI, Cursor, Windsurf, Cline |
| **Hashline edits** | — | — | Native diff format (`@@` blocks for precise edits) |
| **Time-traveling stream rules** | — | — | Yes (pattern-matching on token streams mid-generation) |
| **Memory backends** | — | — | `local`, `hindsight`, `mnemopi`, `sharpshooter` |

---

## Where OMP Shines

### 1. Provider Flexibility

OMP's standout advantage is its **60+ provider support**. While Claude Code is locked to Anthropic's model family, OMP routes to:

- **Enterprise providers**: Anthropic, OpenAI, Google, Azure, AWS Bedrock
- **Gateway providers**: OpenRouter, LiteLLM, Cloudflare AI Gateway
- **Hosted coding endpoints**: DeepSeek, Groq, SiliconFlow, Together
- **Subscription APIs**: Cursor, Cline Pass, Firepass, Wafer Serverless
- **Local engines**: Ollama, Llama.cpp, LM Studio, vLLM

If you work across multiple provider accounts or want to route to local models on a budget, OMP is the only major coding agent that natively supports this.

### 2. IDE-Quality Tooling

OMP ships with **Language Server Protocol (LSP)** and **Debug Adapter Protocol (DAP)** integration — features no other coding agent offers:

- **LSP**: Inline diagnostics as you work, hover-to-inspect, go-to-definition, and auto-imports — all powered by the language server for your project's stack.
- **DAP**: Full debugger with breakpoints, step-over/step-in, variable inspection, and call-stack navigation — directly from the agent session.

### 3. Configuration That Adapts to You

Instead of forcing you to learn a new config format, OMP **discovers existing agent configs** and can run alongside them:

- **Config discovery order**: `.omp` (priority 100) > `.claude` (80) > `codex` (70) > `.gemini` (60) > `opencode` (55) > ... > builtin defaults (1).
- **Config merging**: Global defaults (`~/.omp/agent/config.yml`) are overlaid by project config (`.omp/config.yml`), then `--config` overlays, then runtime flags — first source wins per key.
- **Adapter mode**: Use OMP as a backend provider for Claude Code, Codex, or any other AI coding tool that supports custom providers.

### 4. Cost Tracking Built In

OMP includes a `statusLine` `cost` segment that tracks usage in real time, with **peak/off-peak arrows** for scheduled pricing (e.g., DeepSeek's reduced overnight rates). The `omp usage` command reports five-hour, weekly, and monthly quota windows for free-tier providers.

### 5. Subagent Architecture

OMP's **Agent Hub** lets you spawn specialized agents (task, scout, reviewer) from within a session. Agents are defined as YAML frontmatter files discovered from `~/.omp/agent/agents/` or `.omp/agents/`. Dispatch them with the `task` tool:

```markdown
Task: Implement the checkout flow
Agent: scout
```

---

## When to Choose OMP

| Your situation | Recommended tool |
|---|---|
| You use Anthropic Claude exclusively and want the simplest setup | Claude Code |
| You want open-source with 15 provider support, no IDE features | OpenCode |
| You need local model routing, IDE tooling (LSP/DAP), or multi-provider orchestration | **Oh My Pi (OMP)** |
| You want to run OMP as a backend for another coding agent | **Oh My Pi (OMP) — adapter mode** |

---

## Pitfalls & Trade-offs

- **Niche ecosystem**: OMP is newer than Claude Code and OpenCode. The community is smaller and documentation is rapidly evolving.
- **Learning curve**: With 60+ providers, hooks, subagents, and config layers, the initial setup surface is larger than single-provider tools.
- **Adapter mode complexity**: Running OMP as a backend provider requires understanding both OMP's config schema and the target tool's provider expectations.

---

## Quick Reference

```bash
# Install
curl -fsSL https://omp.sh/install | sh          # macOS/Linux
brew install can1357/tap/omp                    # macOS via Homebrew
bun install -g @oh-my-pi/pi-coding-agent        # Any platform (Node.js)
irm https://omp.sh/install.ps1 | iex            # Windows PowerShell

# First run
omp                              # Interactive setup
omp --model deepseek/deepseek-chat  # Override default model
omp --provider openrouter        # Override default provider

# Cost tracking
omp usage                        # Show usage report
```

---

## Key Takeaways

- OMP is the **most flexible open-source coding agent** with 60+ provider support and local engine discovery.
- Its **LSP + DAP integration** brings IDE-quality tooling inside the agent session — a unique capability.
- **Config inheritance** means you can drop `.omp` config alongside existing `.claude`, `.gemini`, or `opencode` setups.
- **Adapter mode** lets OMP serve as a provider backend for any of those tools.
- Cost tracking, subagents, and time-traveling stream rules are first-class features.

---

## 📚 Recommended Reading

1. [OMP GitHub Repository](https://github.com/can1357/oh-my-pi) — source code, installation, and issue tracking
2. [OMP Official Documentation](https://omp.sh) — complete user guide and reference
3. [OMP Provider List](https://omp.sh/docs/providers) — full list of 60+ supported providers
4. [OMP Built-in Tools](https://omp.sh/docs/tools) — the 31 built-in agent tools

---

<!-- Navigation: Bottom -->
← [Back to Section Index](index.md) | [02. Installing OMP →](02-installing.md)
