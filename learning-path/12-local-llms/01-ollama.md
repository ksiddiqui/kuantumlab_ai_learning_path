---

← [Back to Section Index](00-index.md) | [Next Topic →](02-llama-cpp.md)

---

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Ollama**

---

# Ollama: Run LLMs on Your Machine

> **Install the "app store for AI models" on your computer, pull any open-source model, and chat with it in three commands.**

If you have ever installed an app on your phone, you already understand Ollama. It is a tool that downloads, manages, and runs large language models on your computer. One command to find a model, one command to download it, one command to start talking to it. That is the entire workflow.

## 📺 Recommended Videos

1. [Ollama in 100 Seconds](https://www.youtube.com/watch?v=wTtcB4Qq08o) — Quick overview of what Ollama does and why it matters
2. [Ollama for Beginners — Full Tutorial](https://www.youtube.com/watch?v=5PEo6aL8TNY) — Step-by-step installation, first model, and chat
3. [Every Ollama Command You Need](https://www.youtube.com/watch?v=k8DThG3Zp4E) — Complete reference of pull, run, list, show, rm, cp

## Understanding Ollama

### What Is It?

- **One sentence:** Ollama is a free, open-source tool for downloading and running large language models locally from the command line.
- **Real-world analogy:** Think of Ollama as the **App Store for AI models**. Instead of browsing the App Store for apps, you browse a catalog of models (Llama, Mistral, Qwen, Phi, etc.), "install" one with a single command, and launch it instantly. The App Store is the Ollama library; each model is an app.
- **Why it matters for AI agents:** Your agents (OpenCode, OMP) can talk to Ollama over a local API — giving you a free, private, offline-capable brain for coding and research tasks.

### Why You Need This

- **Zero cost:** Every model in the Ollama library is free to run. There are no API keys, no per-token charges, no monthly bills.
- **Complete privacy:** Your prompts and data never leave your machine. Sensitive code, personal documents, and proprietary logic stay local.
- **Instant prototyping:** Test any open-source model in 30 seconds without writing code or setting up accounts.
- **Agent-ready:** Ollama serves an OpenAI-compatible API on `http://localhost:11434`, so any agent that can call an API can use it.

---

## Step-by-Step Guide

### Step 1: Install Ollama (Windows, macOS, Linux)

Visit [ollama.com/download](https://ollama.com/download) and download the installer for your platform. Or run the one-liner:

**macOS / Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows (PowerShell):**
```powershell
powershell -Command "iwr https://ollama.com/install.ps1 -useb | iex"
```

**What to expect:**
- Installer downloads a ~200 MB binary
- After installation, verify it works:

```bash
ollama --version
# Example output: ollama version 0.5.1
```

> 💡 **Screenshots:** During install, you will see a progress bar, then a confirmation message. On first launch, the Ollama daemon starts automatically in the background (no visible window on macOS/Linux; appears in system tray on Windows).

### Step 2: Pull a Model

Models are "pulled" (downloaded) on demand and cached on disk for instant relaunch:

```bash
ollama pull llama3.2
```

**What to expect:**
```
 pulling manifest ⠿  done
 pulling 3b8a9c0f61b8...  done
 pulling f244a2a64c49...  done
 ...
 2.7 GB / 2.7 GB  ████████████████████  100%
```

- The model is stored in `~/.ollama/models/` (Linux/macOS) or `C:\Users\<user>\.ollama\models\` (Windows)
- You can pull multiple models; each is independent
- Common first picks: `llama3.2` (general), `llama3.2-coder` (coding), `qwen2.5-coder:14b` (larger coding), `mistral` (fast), `phi3.5` (lightweight)

### Step 3: Chat with a Model

Launch an interactive chat:

```bash
ollama run llama3.2
```

**What to expect:**
```
 >>> Welcome! Ask me anything...
>>> Hello, how can you help me today?
```

You are now in a conversation. Type naturally. Ollama streams responses word by word, just like ChatGPT. To exit, type `/bye` or press `Ctrl+D`.

For a single prompt (non-interactive):

```bash
echo "Explain recursion in Python" | ollama run llama3.2
```

### Step 4: Stop a Running Model

If you started a model with `ollama run` and want to stop it:

```bash
ollama stop llama3.2
```

**What to expect:**
```
stopping llama3.2... done
```

The model remains cached — you can restart it instantly with `ollama run llama3.2` again.

### Step 5: Remove a Model

If you want to free disk space:

```bash
ollama rm llama3.2
```

**What to expect:**
```
removing llama3.2... done
```

The model is deleted from disk (~2–4 GB freed). You can pull it again any time.

### Step 6: Manage Your Models

| Command | What It Does |
|---|---|
| `ollama list` | Show all downloaded models with size |
| `ollama show llama3.2` | Show model details (parameters, size) |
| `ollama pull llama3.2` | Download a model |
| `ollama run llama3.2` | Start interactive chat |
| `ollama stop llama3.2` | Stop a running model |
| `ollama rm llama3.2` | Delete a model from disk |
| `ollama cp llama3.2 my-finetune` | Copy a model (for fine-tuning) |

> 🤖 **Tip:** Run `ollama ps` to see which models are currently running and how much RAM they consume.

---

## Common Pitfalls

- ❌ **Running out of disk space** — Each model is 2–8 GB. Run `ollama list` to see total usage. Remove models you no longer need with `ollama rm`.
- ❌ **Forgetting the model is still running** — `ollama run` keeps the model loaded in memory. Run `ollama ps` to check before pulling another model.
- ❌ **Expecting cloud-level quality from small models** — A 3B parameter model (like `llama3.2`) is fast but less capable than a 70B model. Start with `llama3.2` for general tasks, upgrade to a larger model for complex reasoning.
- ❌ **Not using the server mode** — For agent integration, run `ollama serve` (or just leave Ollama running; it auto-starts on port 11434) instead of `ollama run` in a terminal.

---

## Quick Reference

| Command | What It Does |
|---|---|
| `ollama install` | Install Ollama (or use website installer) |
| `ollama pull llama3.2` | Download llama3.2 model |
| `ollama run llama3.2` | Start chat with llama3.2 |
| `ollama stop llama3.2` | Stop running llama3.2 |
| `ollama rm llama3.2` | Delete llama3.2 from disk |
| `ollama list` | List cached models |
| `ollama ps` | List running models |
| `ollama serve` | Start API server (port 11434) |
| `ollama show llama3.2` | Model details |

> ![Ollama interface](assets/ollama.png)
> *Ollama running llama3.2 in chat mode — notice the streaming word-by-word output.*

## Key Takeaways

- **Ollama is the fastest way to run LLMs locally** — one command to install, one to pull, one to chat
- **It is completely free** — no API keys, no tokens, no bills, ever
- **Your data stays on your machine** — nothing is sent to any server
- **Ollama serves an OpenAI-compatible API** on port 11434, so agents can use it seamlessly
- **Models are cached** — pull once, run many times; remove when you need disk space back

---

## 📚 Recommended Reading (Web Links)

1. [Ollama Documentation](https://ollama.com/docs/) — Official docs covering installation, all commands, and API usage
2. [Ollama GitHub Repository](https://github.com/ollama/ollama) — Source code, release notes, and issue tracker
3. [Ollama Model Library](https://ollama.com/library) — Browse all available models with size requirements and descriptions
4. [Ollama Pricing](https://ollama.com/blog/ollama-is-now-free) — Free and open-source; no paid tier

---

← [Back to Section Index](00-index.md) | [Next Topic →](02-llama-cpp.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
