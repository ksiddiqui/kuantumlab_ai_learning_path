---

← [Back to Section Index](00-index.md) | ← [Previous Topic](04-local-with-agents.md)

---

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **OmniRoute**

---

# OmniRoute: Smart Local Model Routing

> **Let a router pick the best local model for every task — so you don't have to guess which model to use.**

If you have installed multiple local models (Llama for general tasks, Qwen for coding, Phi for quick summaries), you already face a dilemma: which model should handle this request? OmniRoute is a lightweight router that sits between your agent and your local models, automatically selecting the right model based on the task type, model availability, and performance metrics.

## 📺 Recommended Videos

1. [OmniRoute: Auto-Selecting Local Models](https://www.youtube.com/watch?v=V_R5u4R6nMg) — How the router decides which model to use
2. [Local Model Routing Explained](https://www.youtube.com/watch?v=k8DThG3Zp4E) — The concept of routing between multiple local LLMs
3. [Building a Multi-Model Local Agent](https://www.youtube.com/watch?v=XJ8g5n6V5qI) — Using routers with OpenCode and OMP for model selection

## Understanding OmniRoute

### What Is It?

- **One sentence:** OmniRoute is a local model router that sits between your agents and your local models, automatically selecting the best available model for each task.
- **Real-world analogy:** OmniRoute is the **air traffic controller** for your local AI models. You have several planes (models) on the ground, each with different capabilities (speed, size, specialty). OmniRoute looks at the incoming flight request (your task), checks which planes are available, and assigns the best one — a small regional jet for short hops, a wide-body for long-haul.
- **Why it matters for AI agents:** Without a router, you manually choose which model to use for each task. With OmniRoute, you describe what you need, and the router picks the optimal model — or falls back to a default if the specialized model is busy or unavailable.

### Why You Need This

- **Efficiency:** Different tasks need different models. Coding needs a coding-specialized model; summarization needs a fast small model. OmniRoute matches task to capability.
- **Reliability:** If your preferred model is out of memory or crashes, OmniRoute falls back to the next available model automatically.
- **Performance optimization:** Route quick tasks to fast models and heavy tasks to capable models, minimizing total wait time.
- **Simplified configuration:** Instead of hard-coding a model in your agent config, you point to OmniRoute once and let it handle the rest.

> ⚠️ **Note:** OmniRoute is an evolving project at [omniroute.online](https://omniroute.online). The project provides a local router binary and an OpenAI-compatible proxy endpoint. As it matures, it may also be available through package managers. Check the project site for the latest installation and feature status.

---

## Step-by-Step Guide

### Step 1: Install OmniRoute

Visit [omniroute.online](https://omniroute.online) and download the appropriate binary for your platform:

```bash
# macOS (Intel / Apple Silicon)
curl -fsSL https://omniroute.online/install.sh | sh

# Linux
curl -fsSL https://omniroute.online/install-linux.sh | sh

# Windows
# Download the .exe from the downloads page
```

Alternatively, if available via a package manager:

```bash
# If available (check project site for current options)
brew install omniroute/tap/omniroute     # macOS Homebrew
cargo install omniroute                  # If published on crates.io
```

Verify installation:
```bash
omniroute --version
```

### Step 2: Configure Your Local Models

OmniRoute discovers local models from running engines (Ollama, llama.cpp). Start your engines:

```bash
# Start Ollama with models you have pulled
ollama serve
ollama pull llama3.2
ollama pull qwen2.5-coder:14b
ollama pull phi3.5
```

Create a router configuration file (check the project site for the latest config format):

```yaml
# ~/.omniroute/config.yaml (example format — verify current schema)
server:
  port: 8090  # Router listens here

models:
  - name: "llama3.2"
    url: "http://localhost:11434"
    tags: ["general", "default"]
    max-concurrent: 1

  - name: "qwen2.5-coder:14b"
    url: "http://localhost:11434"
    tags: ["coding", "specialist"]
    max-concurrent: 1

  - name: "phi3.5"
    url: "http://localhost:11434"
    tags: ["small", "fast"]
    max-concurrent: 1

routing:
  default: "llama3.2"
  rules:
    - match: "code|program|function|class|debug"
      use: "qwen2.5-coder:14b"
    - match: "short|summary|brief"
      use: "phi3.5"
```

Start the router:
```bash
omniroute start
```

### Step 3: Point Your Agent at OmniRoute

Now configure your agent to talk to OmniRoute instead of directly to Ollama.

**In OpenCode:**
```bash
export OPENAI_BASE_URL=http://localhost:8090/v1
export OPENAI_API_KEY="omniroute"
opencode
```

**In OMP:**
```bash
# OMP will auto-discover the router as a local engine
omp --provider omniroute
```

Or set in your config:
```yaml
# ~/.omp/agent/config.yml
providers:
  omniroute:
    baseUrl: http://localhost:8090/v1
```

**Test the router:**
```bash
curl http://localhost:8090/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Write a Python function to sort a list"}]
  }'
```

OmniRoute should route this to the coding model and return a response.

### Step 4: Verify Routing Decisions

Most routers log their decisions. Check OmniRoute's logs to see which model was selected for each request:

```bash
# View router logs
tail -f ~/.omniroute/omniroute.log

# Or check the web dashboard if available
open http://localhost:8090
```

You should see entries like:
```
[ROUTE] "Write a Python function" → qwen2.5-coder:14b (matched rule: coding)
[ROUTE] "Summarize this article" → phi3.5 (matched rule: short)
[ROUTE] "What is machine learning?" → llama3.2 (default)
```

---

## How Local Model Routers Work

The general architecture of a local model router follows this pattern:

```
Your Agent
     │
     ▼
  ┌──────────┐
  │  Router  │──→ Rule: task contains "code" → use qwen2.5-coder
  │          │──→ Rule: task is short          → use phi3.5
  │          │──→ Default                       → use llama3.2
  └──────────┘
     │
     ▼
  ┌────────────────────────────────────────────┐
  │  Local Model 1  │  Local Model 2  │ ...   │
  │  (Ollama port)  │  (Ollama port)  │        │
  └────────────────────────────────────────────┘
```

1. **Request arrives** — Agent sends a task to the router's API endpoint
2. **Task analysis** — Router examines the task (keywords, length, intent)
3. **Model selection** — Router matches task against routing rules; picks the best model
4. **Health check** — Router verifies the selected model is alive and has capacity
5. **Proxy** — Router forwards the request to the selected model, streaming the response back
6. **Fallback** — If the selected model fails, router retries with the next best option

---

## Common Pitfalls

- ❌ **Configuring OmniRoute before models are running** — The router can only route to models that are currently active. Start Ollama/llama.cpp first.
- ❌ **Routing rules that match nothing** — If your rules are too specific, all tasks fall to default. Test rules with diverse prompts.
- ❌ **Assuming the router is infallible** — The router is heuristic. It may pick the wrong model for ambiguous tasks. Monitor and adjust rules over time.
- ❌ **Ignoring router latency** — Adding a routing layer adds a tiny delay (~50–200ms). For high-speed interactions, this is negligible but worth knowing.
- ❌ **Not checking the project's current status** — OmniRoute is an actively developed project. Config format, features, and installation may change. Always refer to [omniroute.online](https://omniroute.online) for the latest instructions.

---

## Quick Reference

| Concept | Details |
|---|---|
| Project site | [omniroute.online](https://omniroute.online) |
| Default router port | 8090 (may vary; check docs) |
| Agent endpoint | `http://localhost:8090/v1/chat/completions` |
| Install method | Download binary from project site; one-liner script |
| Config format | YAML (check site for current schema) |
| Fallback behavior | Routes to default model if no rule matches or model fails |

> ⚠️ **Status check:** Visit [omniroute.online](https://omniroute.online) to confirm current availability, installation instructions, and feature status before building your workflow around it.

## Key Takeaways

- **OmniRoute auto-selects models** — No more guessing which model to use; the router decides based on task type
- **It works as a proxy** — Agents talk to OmniRoute; OmniRoute talks to local models; zero agent changes needed
- **Fallback keeps things running** — If a model crashes or is busy, the router tries the next option
- **Configurable rules** — You control routing logic based on keywords, task type, or model capability
- **Check the official site** — OmniRoute is an evolving project; verify installation and config from [omniroute.online](https://omniroute.online)

---

## 📚 Recommended Reading (Web Links)

1. [OmniRoute Official Site](https://omniroute.online) — Installation, documentation, and downloads
2. [OmniRoute GitHub Repository](https://github.com/omniroute/omniroute) — Source code, issues, and contributions (check URL on site)
3. [Ollama Documentation](https://ollama.com/docs/) — For understanding the local models OmniRoute routes to
4. [OpenAI-Compatible Local APIs](https://ollama.com/blog/openai-compatibility) — How local servers emulate the OpenAI API that OmniRoute proxies
5. [LM Studio Documentation](https://lmstudio.ai/docs) — Alternative local model server that can also participate in routing

---

← [Back to Section Index](00-index.md) | [← Previous Topic](04-local-with-agents.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
