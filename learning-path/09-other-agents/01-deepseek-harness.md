<!-- Navigation: Top -->
← [Back to Section Index](00-index.md) | ← [8. Other Open-Source Agents](00-index.md) | [Next Topic →](02-other-agents.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section 8: Other Open-Source Agents](00-index.md) → **DeepSeek Harness**

---

# DeepSeek Harness

> **DeepSeek Harness (`dsh`)** is an open-source agent harness built by DeepSeek AI, designed around an "everything-is-a-plugin" philosophy. It lets you assemble, customize, and deploy AI agents that can read and edit files, run commands, delegate work, and maintain a plan — with DeepSeek's models at the core.

---

## 📺 Recommended Videos

1. [DeepSeek Harness: Beginner To Expert in 15 Minutes](https://www.youtube.com/watch?v=24UCnAs7MVg) — quick start guide covering installation, workspace setup, and first task
2. [Deepseek Harness has just changed the Agentic developement](https://www.youtube.com/watch?v=4eqDZodW9gg) — features overview and architecture highlights
3. [DeepSeek Harness: FREE 1 Hour Course!](https://www.youtube.com/watch?v=7a04lA_-7TA) — comprehensive one-hour course covering advanced usage

---

## Understanding DeepSeek Harness

### What Is It?

DeepSeek Harness (`dsh`) is an **open-source agent harness** developed by [DeepSeek AI](https://deepseek.com). Unlike a single-purpose chatbot, a *harness* is a framework that gives an AI model the tools and structure to act autonomously — reading files, running shell commands, making decisions, and iterating until a task is done.

Key architectural ideas:

- **Everything-is-a-plugin:** The harness treats all capabilities — model routing, tool execution, memory, permissions — as plugins that can be swapped or extended. This makes it highly modular and adaptable to different workflows.
- **Built on Cordis:** The underlying runtime is [Cordis](https://github.com/cordiverse/cordis), designed around the paper [_A Programming Paradigm for Spatiotemporal Composability_](https://arxiv.org/abs/2608.25512). This gives the harness strong primitives for composing agent behaviors across time and space.
- **Web UI + CLI:** You can run it as a web-based interface (default at `http://127.0.0.1:3080`) or through CLI modes for headless automation.

### What Is the Philosophy?

The philosophy behind DeepSeek Harness centers on **composability and extensibility**:

1. **Plugin-first design** — Instead of a monolithic codebase, every capability is a plugin. You can add, remove, or replace plugins without rewriting the core.
2. **Developer preview mindset** — The project is explicitly in developer preview, meaning it's iterating rapidly with community feedback. Compatibility-breaking changes are expected.
3. **Open and transparent** — MIT-licensed, with source on GitHub. The project encourages community contributions and plugin development.
4. **Built on the shoulder of DeepSeek models** — DeepSeek V3 and V4 models power the agent's reasoning, with strong coding and reasoning capabilities that rival or exceed many paid alternatives.

### Why You Need This

- **Free agent harness with strong coding models** — DeepSeek's models are competitive with Claude and GPT for coding tasks, and the API is free to start.
- **Extensible architecture** — If you need custom tools or integrations, the plugin system lets you build them without fighting the framework.
- **Web UI for non-terminal users** — The web interface makes it accessible to users who prefer a browser-based workspace.
- **Developer preview means you can influence direction** — By using it early and providing feedback, you help shape the project's future.

> ⚠️ **Note:** DeepSeek Harness is in *developer preview*. There will be compatibility-breaking changes. Review the [safety notice](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md) before running the project.

---

## Step-by-Step Guide

### Step 1: Install Node.js

DeepSeek Harness runs on Node.js. You need Node.js 18 or later installed.

> ✅ **Check your version:**
> ```bash
> node --version
> ```
> If you need to install it, download from [nodejs.org](https://nodejs.org/).

### Step 2: Launch the Web UI

The simplest way to get started is with the pre-built npm package:

```bash
npx @deepseek-ai/dsh web
```

- The Web UI starts at `http://127.0.0.1:3080` by default.
- The command also opens the browser automatically. If you're on an SSH session, it will only print the URL.
- Use `--no-open` to start the server without opening a browser:
  ```bash
  npx @deepseek-ai/dsh web --no-open
  ```

### Step 3: Configure a Model

1. Open **Settings → Models** in the Web UI.
2. Enter a [DeepSeek API key](https://platform.deepseek.com/api_keys).
3. Save the configuration. The model route becomes usable immediately — no restart needed.

> 🔧 **Tip:** You can also configure other OpenAI-compatible endpoints. See the [model configuration guide](https://deepseek-harness.github.io/deepseek-harness/en/guide/providers) for details.

### Step 4: Choose a Workspace

1. Click **Choose workspace** in the Web UI.
2. Add the project directory where you started `dsh`.
3. Select the workspace. The session composer remains unavailable until a workspace is selected.

### Step 5: Run Your First Task

Start a session and send a prompt like:

> "Summarize this repository and identify its main packages."

The agent can:
- Read and edit workspace files
- Run commands
- Delegate work to sub-agents
- Maintain a plan

The Web UI asks for your approval before operations that require it under the active permission policy.

### Alternative: Run from Source

If you want to contribute or need the latest development version:

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

- `pnpm run build` prepares the repository artifacts.
- `pnpm dsh web` uses those built artifacts without rebuilding.

> ⚠️ **Node.js prerequisite:** You need `Node.js` installed.

---

## Common Pitfalls

- ❌ **Forgetting to set a workspace** — The session composer stays disabled until you select a workspace directory.
- ❌ **Not saving the API key** — Settings changes in the Web UI don't take effect until you save. Make sure to click save after entering your key.
- ❌ **Running on an unsupported Node.js version** — Ensure you have Node.js 18+ before starting.
- ❌ **SSH launch confusion** — When running over SSH, the browser won't open automatically. Copy the printed URL and open it on your local machine.

---

## Quick Reference

| Command | What It Does |
|---|---|
| `npx @deepseek-ai/dsh web` | Start the Web UI at `http://127.0.0.1:3080` |
| `npx @deepseek-ai/dsh web --no-open` | Start the Web UI without opening a browser |
| `pnpm dsh web` | Start the Web UI from a source checkout |
| **Settings → Models** | Configure API keys and model routing |
| **Choose workspace** | Select the project directory to work on |

![DeepSeek Harness](assets/deepseek.png)

---

## Key Takeaways

- DeepSeek Harness is an open-source agent harness built on an "everything-is-a-plugin" architecture, powered by DeepSeek's strong coding models.
- It's in developer preview — expect breaking changes but also a chance to shape the project.
- The Web UI is the fastest path to getting started (`npx @deepseek-ai/dsh web`), with a Node.js prerequisite.
- The API is OpenAI-compatible, so you can use DeepSeek models with DeepSeek Harness or any other OpenAI-compatible agent.

---

## 📚 Recommended Reading (Web Links)

1. [DeepSeek Harness GitHub](https://github.com/deepseek-ai/deepseek-harness) — source code, installation, and contributing guide
2. [DeepSeek Harness Documentation](https://deepseek-harness.github.io/deepseek-harness/) — official guide, provider configuration, and CLI modes
3. [DeepSeek Official Documentation](https://docs.deepseek.com/) — API docs, model specs, and pricing
4. [DeepSeek API Guide](https://platform.deepseek.com/docs) — integration tutorials and examples
5. [DeepSeek GitHub](https://github.com/deepseek-ai) — open models and codebase

---

<!-- Navigation: Bottom -->
← [Back to Section Index](00-index.md) | ← [8. Other Open-Source Agents](00-index.md) | [Next Topic →](02-other-agents.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
