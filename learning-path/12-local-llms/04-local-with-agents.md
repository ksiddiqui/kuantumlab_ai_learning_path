---

← [Back to Section Index](index.md) | ← [Previous Topic](03-local-apis.md) | [Next Topic →](05-omniroute.md)

---

[← Main Index](../index.md) → [Section Index](index.md) → **Local with Agents**

---

# Local LLMs with Agents: OpenCode, OMP & Offline Workflows

> **Wire up your agents to use local models, switch between cloud and local on demand, and run completely offline.**

In Section 1 you learned OpenCode. In Section 7 you learned OMP. Both can use local models from Ollama, llama.cpp, and LM Studio as easily as they use OpenAI or Anthropic. This page shows you exactly how to connect the dots — configure local providers, switch models mid-session, and know when local beats cloud.

## 📺 Recommended Videos

1. [OpenCode + Ollama: Complete Setup](https://www.youtube.com/watch?v=XJ8g5n6V5qI) — Configure OpenCode to use local models end-to-end
2. [Run AI Agents Completely Offline](https://www.youtube.com/watch?v=k8DThG3Zp4E) — Offline workflows with local models
3. [Switch Between Cloud and Local Models](https://www.youtube.com/watch?v=V_R5u4R6nMg) — Model switching strategies for cost and quality

## Understanding Local Agents

### What Is It?

- **One sentence:** Running AI agents (OpenCode, OMP) against locally-hosted models served by Ollama or llama.cpp instead of cloud APIs.
- **Real-world analogy:** It is like having a private cloud on your desk. The agent does the same work — reads files, writes code, searches the web (when online) — but the brain behind it runs on your own hardware.
- **Why it matters for AI agents:** You get unlimited free inference, complete data privacy, and offline capability — critical for coding tasks with proprietary code and for working in environments without internet.

### Why You Need This

- **Massive cost savings:** A development agent calling 100 models per day costs $0 with local, $5–20 with cloud. Over a year, that is $0 vs $1,800–7,300.
- **Code privacy:** When the agent reads your proprietary codebase, you do not want that code leaving your machine. Local models guarantee it never does.
- **Offline productivity:** Travel, flights, remote locations, or restrictive corporate networks — local models keep your agent fully functional.
- **Speed for small tasks:** For short prompts and code completion, local models respond in under 1 second on modern hardware — faster than cloud round-trips.

---

## Step-by-Step Guide

### Step 1: Configure OpenCode for Local Models

OpenCode uses the OpenAI SDK internally. To route it to a local server, set the environment variables:

```bash
# ~/.bashrc or ~/.zshrc
export OPENAI_BASE_URL=http://localhost:11434/v1
export OPENAI_API_KEY="ollama"  # Ollama doesn't check the key, but SDK requires one
```

Then in your OpenCode config (`~/.config/opencode/config.json`):

```json
{
  "model": "llama3.2",
  "provider": "openai",
  "baseUrl": "http://localhost:11434/v1"
}
```

Or set it per-session:

```bash
OPENAI_BASE_URL=http://localhost:11434/v1 \
OPENAI_API_KEY=ollama \
opencode
```

**Start Ollama first** (if not running):
```bash
ollama pull llama3.2
ollama serve
```

Then launch OpenCode:
```bash
opencode
```

Inside OpenCode, check `/models` to see available local models.

### Step 2: Configure OMP for Local Models

OMP auto-discovers Ollama, llama.cpp, and LM Studio on startup. No manual config entries required.

**Verify auto-discovery:**
```bash
# Start Ollama (if not running)
ollama serve

# Start OMP
omp
```

**Inside an OMP session, list providers:**
```
/providers
```

You should see `ollama` (and possibly `llama.cpp` and `lm-studio`) in the list.

**Switch to a local model:**
```
/model ollama/llama3.2
```

OMP discovers available models from the local engine at startup. Use `/models` to see all options.

**Set local as default in config** (optional):

Edit `~/.omp/agent/config.yml`:
```yaml
provider: ollama
model: llama3.2
```

Or via CLI:
```bash
omp --provider ollama --model llama3.2
```

> 💡 **From OMP's config docs:** Local engines auto-discover without config entries. If you manually add `ollama` to `models.yml`, auto-discovery is disabled for that provider — your custom config wins.

### Step 3: Switch Between Cloud and Local

Both agents allow instant switching without restarting:

**In OpenCode:**
```
/model <model-name>
```
Then type your task. OpenCode routes to whichever provider is configured.

**In OMP:**
```
/model ollama/llama3.2     # Switch to local
/model anthropic/claude-sonnet-4  # Switch to cloud
```

**Strategy: Use local for routine tasks, cloud for hard ones:**

| Task | Use Local | Use Cloud |
|---|---|---|
| Code completion / suggestions | ✅ Fast, private | — |
| Summarizing code | ✅ Good enough | — |
| Generating boilerplate | ✅ Cheap, instant | — |
| Complex architecture decisions | — | ✅ Better reasoning |
| Multi-step research tasks | — | ✅ Larger context |
| Working with proprietary code | ✅ Privacy essential | ❌ Data leaves machine |
| Learning / experimentation | ✅ Free, unlimited | — |

### Step 4: Offline Agent Workflows

Once you have pulled models with Ollama, you can run agents completely offline:

**Pre-flight checklist:**
1. Models pulled while online: `ollama pull llama3.2` (do this at home)
2. Ollama running: `ollama ps` (verify it is active)
3. Agent configured to point at `http://localhost:11434`

**Offline workflow examples:**

- **Code review:** `/code-review` in OpenCode — the agent reads your code, checks for bugs, suggests fixes — all local
- **Refactoring:** Ask the agent to restructure a module — it plans, edits, and verifies without internet
- **Documentation:** Ask the agent to generate README or API docs from your codebase
- **Debugging:** Paste an error log, the agent suggests fixes from its local knowledge

**What works offline:**
- All code tasks (read, write, debug, refactor)
- All file operations (read, edit, grep, glob)
- Bash commands on your local machine
- Using locally-stored MCP servers

**What does not work offline:**
- Web search (need internet)
- Fetching remote URLs (need internet)
- Cloud-hosted MCP servers (need internet)
- Authentication to cloud services (need internet)

---

## Common Pitfalls

- ❌ **Starting the agent before the local server** — If Ollama is not running, the agent errors immediately. Always verify `ollama ps` first.
- ❌ **Pulling too few models** — Different tasks benefit from different models. Pull at least one general model (`llama3.2`) and one coding model (`qwen2.5-coder:14b`).
- ❌ **Using local for tasks that need current information** — Local models are frozen in time. They do not know about events after their training cutoff. For current information, switch to a cloud model.
- ❌ **Forgetting that cloud agents can call local models** — OMP and OpenCode can use local and cloud models in the same session, switching with `/model`.
- ❌ **Not understanding performance trade-offs** — Local inference is slower per token than cloud APIs on large models. For long conversations, budget extra time.

---

## Quick Reference

| Task | OpenCode | OMP |
|---|---|---|
| Set local endpoint | `OPENAI_BASE_URL` env var | Auto-discovered |
| Switch model | `/model <name>` | `/model ollama/<name>` |
| Verify models | `/models` | `/models` |
| Check status | `/status` | `/status` |
| Set default provider | `config.json` | `--provider ollama` |
| Offline ready | Once models pulled | Once models pulled |

---

## Key Takeaways

- **OpenCode and OMP both support local models** — no extra software needed beyond Ollama or llama.cpp
- **Switching is instant** — `/model` changes provider and model in a single command
- **Local is free forever** — After the one-time hardware cost, every token costs $0
- **Offline is a superpower** — Pull models online, then run agents anywhere without internet
- **Use both strategically** — Local for routine/private tasks, cloud for complex/research tasks

---

## 📚 Recommended Reading (Web Links)

1. [OpenCode Documentation — Providers](https://opencode.ai/docs/providers) — How OpenCode connects to LLM providers, including local ones
2. [OpenCode Configuration](https://opencode.ai/docs/config) — `opencode.json` settings for provider and model configuration
3. [OMP Local Models](https://omp.sh/docs/local-models) — Official OMP guide to Ollama, llama.cpp, and LM Studio integration
4. [Ollama Documentation](https://ollama.com/docs/) — Pulling models and managing the server
5. [OMP Configuration](https://omp.sh/docs/config) — Provider settings, model roles, and config layers

---

← [Back to Section Index](index.md) | [Next Topic →](05-omniroute.md)

[← Main Index](../index.md) | [Table of Contents](index.md)
