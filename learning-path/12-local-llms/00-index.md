---

← [Back to Section Index](00-index.md) | [Next Topic →](01-ollama.md)

---

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Section Overview**

---

# Section 11: Local LLM Engines

> **Run AI models on your own machine — free, private, and offline. Master Ollama, llama.cpp, and OmniRoute.**

So far in this learning path you have called LLMs through cloud APIs (OpenAI, Anthropic, free-tier providers). Those APIs cost money per token, require internet, and send your data to someone else's server. This section changes all three constraints at once. You will learn to run the same models **locally** — zero per-token cost, no internet required, complete privacy.

## What You'll Learn

By the end of this section, you will be able to:

- **Install and use Ollama** — pull models, chat with them, and manage them from the command line
- **Understand quantization and the GGUF format** — why local models fit on consumer hardware
- **Run llama.cpp** — the C++ engine that runs models on CPUs, older GPUs, and any laptop
- **Use local APIs** — Ollama's server mode and LM Studio expose OpenAI-compatible endpoints your agents already understand
- **Route agents to local models** — configure OpenCode and Oh My Pi (OMP) to use local engines alongside cloud providers
- **Set up OmniRoute** — a router that picks the best local model for each task automatically

## Topic Pages

| # | Topic | What You'll Learn | Time |
|---|---|---|---|
| 1 | [Ollama](01-ollama.md) | Install, pull models, chat, stop, remove — the "app store for AI models" | ~1h |
| 2 | [llama.cpp](02-llama-cpp.md) | C++ inference engine, quantization, GGUF format, build from source or binary | ~1h |
| 3 | [Local APIs](03-local-apis.md) | OpenAI-compatible local servers (Ollama, LM Studio), curl calls, cost comparison | ~45 min |
| 4 | [Local with Agents](04-local-with-agents.md) | Configure OpenCode/OMP for local models, offline workflows, when to go local | ~45 min |
| 5 | [OmniRoute](05-omniroute.md) | Local model router — install, configure, auto-select models per task | ~30 min |

## 📺 Recommended Overview Videos

1. [Ollama: Run LLMs Locally — Full Tutorial](https://www.youtube.com/watch?v=wTtcB4Qq08o) — Fireship-style 100-second intro to Ollama, then extended walkthrough
2. [Running LLMs Locally with llama.cpp](https://www.youtube.com/watch?v=V_R5u4R6nMg) — How llama.cpp works and how to run your first model on consumer hardware
3. [Local AI: Ollama + LM Studio + OpenCode Setup](https://www.youtube.com/watch?v=XJ8g5n6V5qI) — End-to-end local AI agent setup with free tools

## Before You Start

This section assumes you have:

- **Completed Section 0** — you have OpenCode installed and know how to run an agent
- **Completed Section 7** (recommended) — OMP installed and configured with a cloud provider
- **A computer with at least 8 GB RAM** — larger models need 16+ GB; smaller 3–7B parameter models run fine on 8 GB

> 💡 **Tip:** You do not need a powerful GPU. Ollama and llama.cpp run efficiently on CPUs and Apple Silicon. A modern laptop with 16 GB RAM handles 7B–13B parameter models comfortably.

---

## Ready to Begin?

👉 [Topic 1: Ollama →](01-ollama.md)

---

← [Back to Main Index](../00-index.md) | [← Previous Section](../11-free-tier-llms/00-index.md) | [Next Section →](../13-project-ideas/00-index.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
