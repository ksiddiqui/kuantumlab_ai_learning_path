---

← [Back to Section Index](00-index.md) | ← [Previous Topic](02-llama-cpp.md) | [Next Topic →](04-local-with-agents.md)

---

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Local APIs**

---

# Local APIs: OpenAI-Compatible Servers on Your Machine

> **Turn any local model into a fully compatible API endpoint — just like OpenAI, but it costs $0 and stays on your machine.**

Every agent you have built so far (OpenCode, OMP) speaks the OpenAI API dialect. Local tools like Ollama (server mode) and LM Studio can serve that same dialect from your laptop. This means your existing agents work with local models **without any code changes** — you simply swap the endpoint URL and model name.

## 📺 Recommended Videos

1. [LM Studio Full Tutorial for Beginners](https://www.youtube.com/watch?v=V_R5u4R6nMg) — Download, install, load models, and expose the local API
2. [Ollama Server Mode & API Tutorial](https://www.youtube.com/watch?v=k8DThG3Zp4E) — Using ollama serve, the local API, and curl
3. [Local LLM APIs Explained](https://www.youtube.com/watch?v=XJ8g5n6V5qI) — Comparing Ollama, LM Studio, and llama.cpp server modes

## Understanding Local APIs

### What Are They?

- **One sentence:** Local APIs are HTTP servers that run on your machine and expose OpenAI-compatible endpoints, so your agents can call local models exactly like cloud models.
- **Real-world analogy:** Imagine a restaurant (your model) that normally only accepts orders through a specific app (OpenAI API). Local APIs give that restaurant a regular phone number — now anyone who knows the format can call in. OpenCode and OMP are regular phone callers.
- **Why it matters for AI agents:** Agent frameworks expect a `/chat/completions` endpoint with JSON requests and responses. If your local server speaks that format, it is a drop-in replacement for any cloud provider.

### Why You Need This

- **$0 per token:** After buying hardware once, every inference costs nothing. No bills, no surprise charges, no rate limits.
- **No internet required:** Once models are downloaded, you can run agents completely offline — on flights, in remote areas, or in air-gapped security environments.
- **Privacy:** Code, documents, and conversations never leave your machine. No data retained by any third party.
- **Same interface everywhere:** Ollama server, LM Studio, and llama.cpp server all speak the same API shape. Your agent does not know or care which is running.

---

## Step-by-Step Guide

### Step 1: Start Ollama in Server Mode

Ollama runs a server automatically when you install it, but you can verify or restart it:

```bash
# Check if Ollama server is running
ollama ps

# If needed, start the server explicitly
ollama serve
```

The server listens on `http://127.0.0.1:11434` and exposes an OpenAI-compatible API. The endpoint is `/v1/chat/completions`.

You can also change the port:

```bash
OLLAMA_HOST=0.0.0.0:11434 ollama serve
```

### Step 2: Start LM Studio Server

[LM Studio](https://lmstudio.ai) is a GUI app with a built-in local API server:

1. Download and install from [lmstudio.ai](https://lmstudio.ai)
2. Search for a model (e.g., "Llama 3.2") in the LM Studio interface
3. Download the GGUF quantized version
4. Go to the **Developer** tab → **Local Server**
5. Click **Start Server** — it listens on `http://localhost:1234`

The OpenAI-compatible endpoint is at `http://localhost:1234/v1`.

### Step 3: Call Local APIs with curl

**Ollama (port 11434):**

```bash
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2",
    "messages": [
      {"role": "user", "content": "Explain recursion in one paragraph"}
    ],
    "temperature": 0.7
  }'
```

**LM Studio (port 1234):**

```bash
curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "lmstudio-community/Meta-Llama-3.2-3B-Instruct-GGUF",
    "messages": [
      {"role": "user", "content": "Explain recursion in one paragraph"}
    ],
    "temperature": 0.7
  }'
```

**Response (same shape as OpenAI):**

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "model": "llama3.2",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Recursion is a programming technique where a function..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 58,
    "total_tokens": 82
  }
}
```

> 🤖 **Key insight:** The response JSON is identical to what OpenAI returns. Any code that works with OpenAI works with these local endpoints — you only change the URL and the `Authorization` header (local servers do not require one).

### Step 4: Cost Comparison

| Approach | Setup Cost | Per-Token Cost | Monthly Cost (8h/day) | Internet Required | Data Privacy |
|---|---|---|---|---|---|
| **OpenAI GPT-4o** | $0 | ~$0.015 input / $0.060 output | ~$25–150 | Yes | Data leaves machine |
| **Anthropic Claude** | $0 | ~$0.003 input / $0.015 output | ~$5–80 | Yes | Data leaves machine |
| **Ollama (local)** | $0 (software) + $500–2000 (hardware) | **$0** | $0 | No | Data stays local |
| **LM Studio (local)** | $0 (software) + $500–2000 (hardware) | **$0** | $0 | No | Data stays local |
| **llama.cpp (local)** | $0 (software) + $500–2000 (hardware) | **$0** | $0 | No | Data stays local |

> ⚠️ **Honest framing:** The hardware cost is the real expense. If you already have a laptop with 16 GB RAM and a modern CPU, the incremental cost is $0. You are trading per-token cost for hardware cost and slower speed. For learning, testing, and non-critical tasks, local is a clear win.

---

## Common Pitfalls

- ❌ **Assuming local is always faster** — A local 7B model on CPU is slower than a cloud 70B model on GPU. Local excels for small-to-medium tasks where latency is not critical.
- ❌ **Not checking if the server is running** — Before an agent can use a local model, the server must be active. Test with `curl http://localhost:11434` before starting a session.
- ❌ **Forgetting that local models have less context** — Most local models max out at 8K–128K context. Cloud models like Claude (200K) or Gemini (1M) handle much larger inputs.
- ❌ **Confusing the port** — Ollama uses `11434`, LM Studio uses `1234`, llama.cpp defaults to `8080`. Triple-check the URL in your agent config.

---

## Quick Reference

| Server | Default URL | API Path | Env Override |
|---|---|---|---|
| Ollama | `http://127.0.0.1:11434` | `/v1/chat/completions` | `OLLAMA_BASE_URL` |
| LM Studio | `http://127.0.0.1:1234` | `/v1/chat/completions` | `LM_STUDIO_BASE_URL` |
| llama.cpp | `http://127.0.0.1:8080` | `/v1/chat/completions` | `LLAMA_CPP_BASE_URL` |

> **Configuration reference for OpenCode/OMP** (detailed in [Topic 4](04-local-with-agents.md)):
> - OpenCode: Set `OPENAI_BASE_URL` and `OPENAI_API_KEY` (any non-empty value)
> - OMP: Discoverable automatically; switch with `/model ollama/...`

## Key Takeaways

- **Local APIs speak the same language as OpenAI** — JSON shape, endpoint path, response format are identical
- **Three tools expose local APIs** — Ollama, LM Studio, and llama.cpp server mode all work the same way
- **After hardware, everything is free** — No per-token charges, no rate limits, no bills
- **Local works offline** — Perfect for travel, remote work, and air-gapped environments
- **Your data never leaves** — Complete privacy for sensitive code, documents, and conversations

---

## 📚 Recommended Reading (Web Links)

1. [Ollama API Documentation](https://ollama.com/blog/openai-compatibility) — OpenAI-compatible endpoints and configuration
2. [LM Studio Documentation](https://lmstudio.ai/docs) — Installing, loading models, and local server setup
3. [LM Studio Local Server](https://lmstudio.ai/blog/local-server) — How to use the built-in API server
4. [OpenAI API Reference](https://platform.openai.com/docs/api-reference/chat) — The canonical API shape that all local servers emulate
5. [LM Studio GitHub](https://github.com/lm-sys/FuzzyLLM) — Issue tracker and release notes

---

← [Back to Section Index](00-index.md) | [Next Topic →](04-local-with-agents.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
