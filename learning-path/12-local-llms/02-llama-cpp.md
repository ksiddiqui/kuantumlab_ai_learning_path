---

← [Back to Section Index](00-index.md) | ← [Previous Topic](01-ollama.md) | [Next Topic →](03-local-apis.md)

---

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **llama.cpp**

---

# llama.cpp: Run Models on Any Hardware

> **The C++ port of LLM inference — run the same models that cloud APIs use, on your CPU, your Mac, or that old laptop in the closet.**

If Ollama is the app store, llama.cpp is the **engine under the hood**. It is the open-source C++ library that powers most local LLM runtimes (including Ollama). Understanding llama.cpp gives you finer control over how models load, run, and use memory — and lets you run models on hardware that Ollama's defaults might not optimize for.

## 📺 Recommended Videos

1. [Llama.cpp: A Complete Beginner's Guide](https://www.youtube.com/watch?v=V_R5u4R6nMg) — What llama.cpp is, why it exists, and how to run your first model
2. [How to Run Local LLMs on Any Computer](https://www.youtube.com/watch?v=k8DThG3Zp4E) — CPU, GPU, and Apple Silicon walkthrough with llama.cpp
3. [Quantization and GGUF Explained](https://www.youtube.com/watch?v=Hx3LhQv5a3I) — Why quantized models are smaller and how GGUF works

## Understanding llama.cpp

### What Is It?

- **One sentence:** llama.cpp is a pure C/C++ implementation of inference for large language models, originally written as a weekend project and now the backbone of local LLM execution everywhere.
- **Real-world analogy:** If Ollama is a restaurant that serves you ready-made meals, llama.cpp is the **kitchen itself** — you bring your own ingredients (models), choose your own recipes (quantization settings), and control every aspect of cooking. You can even cook for other restaurants (it powers Ollama, LM Studio, KoboldCpp, etc.).
- **Why it matters for AI agents:** llama.cpp's server mode (`llama-server`) exposes an OpenAI-compatible API, meaning your agents can talk to it exactly like they talk to Ollama or OpenAI — but with more control over hardware, threads, and memory.

### Why You Need This

- **Runs everywhere:** No NVIDIA GPU required. llama.cpp runs on x86 CPUs, Apple Silicon (Metal), AMD GPUs (Vulkan/ROCm), and even old hardware. If it has a CPU, it can run a model.
- **Fine-grained control:** Choose exactly how many CPU threads to use, how much RAM to allocate, which GPU layers to offload, and which quantization level to apply.
- **It powers the ecosystem:** Ollama, LM Studio, KoboldCpp, and many other tools are built on top of llama.cpp. Understanding it demystifies the whole local AI stack.

---

## Step-by-Step Guide

### Step 1: Understand Quantization (What Is GGUF?)

Before installing anything, understand why local models fit on consumer hardware:

**The problem:** A 7-billion-parameter model in full precision (FP16) needs ~14 GB of RAM. Most laptops have 8–16 GB.

**The solution: Quantization** — reducing the numerical precision of model weights:

| Precision | Bits per Parameter | 7B Model Size | Quality |
|---|---|---|---|
| FP16 | 16 bits | ~14 GB | Original quality |
| Q8 | 8 bits | ~7 GB | Near-original |
| Q4 | 4 bits | ~4 GB | Very good |
| Q3 | 3 bits | ~3 GB | Acceptable |
| Q2 | 2 bits | ~2 GB | Basic |

**GGUF** (GPT-Generated Unified Format) is the file format that stores quantized models. It contains:
- The quantized model weights
- Metadata (model name, architecture, context length)
- Tokenizer data

> 🤖 **Analogy:** Quantization is like compressing an MP3 — you lose a tiny bit of fidelity, but the file becomes dramatically smaller and still sounds great. A Q4-quantized model uses 70% less RAM while being 95%+ as capable.

### Step 2: Install llama.cpp

**Option A: Pre-built binary (Recommended for beginners)**

Download from the [GitHub releases page](https://github.com/ggerganov/llama.cpp/releases):

```bash
# macOS (Intel or Apple Silicon)
curl -LO https://github.com/ggerganov/llama.cpp/releases/download/.../llama-binary-mac
chmod +x llama-binary-mac
./llama-binary-mac --version

# Linux (x86_64)
curl -LO https://github.com/ggerganov/llama.cpp/releases/download/.../llama-binary-linux-x64
chmod +x llama-binary-linux-x64
./llama-binary-linux-x64 --version

# Windows
# Download llama-bin-windows-x64.exe from releases page
```

**Option B: Build from source (Recommended for optimal performance)**

```bash
# Clone the repository
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

# Basic build (CPU-only)
make

# With GPU acceleration (NVIDIA CUDA)
make LLAMA_CUDA=1

# macOS with Metal (Apple Silicon)
make LLAMA_METAL=1

# AMD GPU (Linux)
make LLAMA_VULKAN=1
```

**What to expect:**
- Pre-built binary: instant, no compilation needed
- Building from source: takes 5–15 minutes depending on your system; enables hardware acceleration

### Step 3: Pull a Model with Ollama (then Convert to GGUF)

If you already have Ollama installed (see [Section Topic 1](01-ollama.md)), use it to download the model, then convert:

```bash
# Pull the model with Ollama first
ollama pull llama3.2

# Find where Ollama stored the model
ollama show llama3.2 --modelfile
```

Alternatively, download a GGUF directly from [Hugging Face](https://huggingface.co). For example, search for "llama-3.2-3b-gguf" on Hugging Face — many community uploads are optimized for llama.cpp.

### Step 4: Run with llama-cli (Interactive Chat)

```bash
./llama-cli -m models/llama-3.2-3b.Q4_K_M.gguf \
  -c 2048 \
  -t 8 \
  --interactive \
  --color
```

**Flags explained:**

| Flag | Purpose |
|---|---|
| `-m` | Path to GGUF model file |
| `-c` | Context length (max conversation history in tokens) |
| `-t` | Number of CPU threads to use |
| `--interactive` | Launch chat mode |
| `--color` | Colorize output |

**What to expect:**
```
  ████████████████████████████████████████  100%  ETA: 0s
load_tensors: 2.4 GB
[...]
> Hello, how can you help me?
I can help you with a wide range of tasks, including...
```

### Step 5: Run with llama-server (OpenAI-compatible API)

This is the mode your agents will use:

```bash
./llama-server -m models/llama-3.2-3b.Q4_K_M.gguf \
  -c 2048 \
  -t 8 \
  --host 127.0.0.1 \
  --port 8080
```

**What to expect:**
```
 server listening on 127.0.0.1:8080
```

Now you have an OpenAI-compatible API at `http://127.0.0.1:8080/v1/chat/completions`. Test it with curl:

```bash
curl http://127.0.0.1:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-3b",
    "messages": [{"role": "user", "content": "Hello, how are you?"}]
  }'
```

---

## Common Pitfalls

- ❌ **Running out of RAM during load** — A Q4 7B model needs ~4.5 GB of RAM. Check your available memory with `free -h` (Linux) or Activity Monitor (macOS). Use a smaller quantization (Q3 or Q2) if needed.
- ❌ **Wrong number of threads** — Using all CPU threads sounds good, but oversubscription slows things down. Start with `-t $(nproc)` on Linux or `-t 8` on typical laptops, then benchmark.
- ❌ **Using FP16 models instead of GGUF** — Full-precision models are 3× larger and much slower. Always prefer Q4_K_M or Q5_K_M quantizations from Hugging Face.
- ❌ **Confusing llama-cli with llama-server** — Use `llama-cli` for interactive chat, `llama-server` when you need an API for an agent or application.

---

## Quick Reference

| Command | What It Does |
|---|---|
| `./llama-cli -m model.gguf --interactive` | Interactive chat mode |
| `./llama-server -m model.gguf --port 8080` | Start OpenAI-compatible API server |
| `./llama-cli -m model.gguf -p "Hello" -n 100` | Single prompt, 100 tokens max |
| `./llama-server -m model.gguf --embedding` | Embedding server for RAG |
| `ollama pull llama3.2` | Download model via Ollama |

> ![llama.cpp logo](assets/llamacpp.png)
> *The llama.cpp logo — running local AI since 2023.*

## Key Takeaways

- **llama.cpp is the engine behind most local LLM tools** — Ollama, LM Studio, and others all use it under the hood
- **Quantization makes local AI possible** — Q4 quantization reduces a 14 GB model to 4 GB with minimal quality loss
- **GGUF is the universal format** — one file contains model, tokenizer, and metadata; works everywhere
- **Build from source for GPU acceleration** — pre-built binaries work, but CUDA/Metal/Vulkan builds are significantly faster
- **`llama-server` exposes an OpenAI API** — your agents can use local models with zero code changes

---

## 📚 Recommended Reading (Web Links)

1. [llama.cpp GitHub Repository](https://github.com/ggerganov/llama.cpp) — Source code, builds, and documentation
2. [llama.cpp README](https://github.com/ggerganov/llama.cpp#readme) — Installation, build options, and usage examples
3. [GGUF Format Documentation](https://github.com/ggerganov/llama.cpp/blob/master/docs/gguf.md) — Technical details of the GGUF file format
4. [The llama.cpp Handbook](https://www.datacamp.com/tutorial/llama-cpp-tutorial) — Step-by-step guide to running models with llama.cpp
5. [Hugging Face GGUF Models](https://huggingface.co/models?search=gguf) — Browse community-quantized models ready for llama.cpp

---

← [Back to Section Index](00-index.md) | [Next Topic →](03-local-apis.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
