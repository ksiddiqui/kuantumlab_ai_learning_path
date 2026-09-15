← [Back to Section Index](00-index.md) | ← [Previous Topic: The Five Free-Tier LLM Providers](01-free-providers.md) | [Next Section: Local LLM Engines →](../12-local-llms/00-index.md)

[← Main Index](../00-index.md) → [Section 10: Free-Tier LLM Providers](00-index.md) → **Using Free LLMs: API Keys, Model Selection & Cost**

# Using Free LLMs: API Keys, Model Selection & Cost

> Get real API keys for all five free-tier providers, call your first free model with `curl` and Python, learn the "3-line swap" to switch providers, and read a cost table so you never pay more than you intend to.

---

## 📺 Recommended Videos

1. [Build your LLM App without a vector database (in 30 lines of Python)](https://www.youtube.com/watch?v=kcrJSk00duw) — calls OpenAI/Hugging Face APIs from Python; the exact pattern this page teaches.
2. [Gemini 3.1 + New AI Studio Is Here: Full Prototyping Tutorial](https://www.youtube.com/watch?v=2sLO9NYr8Rc) — shows Google AI Studio, the free gateway to Gemini, end to end.
3. [N8N & Google Gemini: Build AI-Powered Workflows in Minutes](https://www.youtube.com/watch?v=7FxmK_6g190) — connects a free LLM API key into an automated workflow.

---

## Understanding API Keys & Model Routing

### What Is an API Key?

An API key is a long, random password you send in the `Authorization` header so the provider knows it's you and can debit your free quota. It's tied to a **project/organization**, and your usage of every model draws from that project's free allowance until it runs out, then flips to paid.

- **Where it lives:** store it in an environment variable, never in a file you commit.
- **The one pattern:** every provider on this page accepts the same `Authorization: Bearer <YOUR_KEY>` header.
- **Model routing:** the `model` field picks which model runs your request. On a free tier, you must pick a model that is *still free* (this is the most common beginner mistake — see Common Pitfalls).

### Why You Need This

- **Because your agent needs a way to talk to remote models.** OpenCode and OMP let you point them at an HTTP endpoint + key; this page gives you the keys.
- **Because "free" has rules.** You'll avoid surprise bills by understanding which models are free and which reset your limit.
- **Because portability saves money.** The 3-line swap in Step 4 means you can fall back to whichever provider still has free quota this month.

---

## Step-by-Step Guide

### Step 1: Pick a provider and get a key

Start with whichever sign-up looks fastest. Four of five let you start with no card.

| Provider | Get a key at | Env var to set | Notes |
|---|---|---|---|
| OpenRouter | [openrouter.ai/settings](https://openrouter.ai/settings) → API Keys → Create | `OPENROUTER_API_KEY` | ~$10 free credit on signup; free `:free` models rotate — pick one on the [Free tab of pricing](https://openrouter.ai/pricing). |
| Hugging Face | [huggingface.co/settings/tokens/new](https://huggingface.co/settings/tokens/new) → fine-grained → `Make calls to Inference Providers` | `HF_TOKEN` | Free Inference Providers tier; no card. |
| Google AI Studio | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) → Create API key | `GEMINI_API_KEY` | Free tier on Flash models; new keys are **auth keys** by default. |
| DeepSeek | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) → Create | `DEEPSEEK_API_KEY` | 5M free tokens for new users; phone verification required, **no credit card**. |
| Together.ai | [together.ai/settings](https://together.ai/settings) → API keys → Create | `TOGETHER_API_KEY` | No free credits (min $5 + card); test on $0-token models like `Prism-ML/Ternary-Bonsai-27B`. |

> 🔐 **Security:** After creating each key, add it to your shell profile so it's never typed into a command (which would land it in your shell history):
>
> ```bash
> # Add to ~/.bashrc (Linux/macOS) or ~/.zshrc
> export OPENROUTER_API_KEY="sk-..."
> export HF_TOKEN="hf_..."
> export GEMINI_API_KEY="..."
> export DEEPSEEK_API_KEY="sk-..."
> export TOGETHER_API_KEY="..."
> # then: source ~/.bashrc
> ```
> Then verify: `echo $DEEPSEEK_API_KEY` should print the key (or a prefix), not an empty line.

### Step 2: Call a free model with curl

We use **DeepSeek** (`deepseek-flash`) as the example here because its free tier is stable — 5M free tokens with a fixed model name, no credit card, OpenAI-compatible. Run this once you've exported `DEEPSEEK_API_KEY` in Step 1:

```bash
curl https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-flash",
    "messages": [
      {"role": "user", "content": "Why is the sky blue?"}
    ]
  }'
```

**What to expect:** a JSON object whose useful field is `choices[0].message.content` — a short paragraph about Rayleigh scattering. Grab just that with `jq`:

```bash
curl https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-flash","messages":[{"role":"user","content":"One-sentence definition of an LLM."}]}' \
  | jq -r '.choices[0].message.content'
```

> 💡 **No jq?** It's a tiny JSON filter. Install with `brew install jq` (macOS) or `sudo apt install jq` (Linux).

The same call works for the other providers — **only the base URL and model change**. (All of them, including Google, are OpenAI-compatible.)

```bash
# OpenRouter — use your $10 credit, or pick a :free model from openrouter.ai/pricing
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -H "HTTP-Referer: http://localhost" \
  -d '{"model":"meta-llama/llama-3.2-3b-instruct:free","messages":[{"role":"user","content":"Why is the sky blue?"}]}'

# Hugging Face Inference Providers (free tier)
curl https://router.huggingface.co/v1/chat/completions \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"model":"openai/gpt-oss-120b","messages":[{"role":"user","content":"Why is the sky blue?"}]}'

# Google AI Studio (free tier) — note the /openai/ path
curl "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GEMINI_API_KEY" \
  -d '{"model":"gemini-3.8-flash","messages":[{"role":"user","content":"Why is the sky blue?"}]}'

# Together.ai — cheap paid model (fits in the $5 minimum credit)
curl https://api.together.ai/v1/chat/completions \
  -H "Authorization: Bearer $TOGETHER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"Qwen/Qwen3.5-9B","messages":[{"role":"user","content":"Why is the sky blue?"}],"max_tokens":256}'
```

> 📌 **Free-model caveat (OpenRouter):** the set of `:free` models **rotates**. If `meta-llama/llama-3.2-3b-instruct:free` returns an error, open [openrouter.ai/pricing](https://openrouter.ai/pricing), click the **Free** tab, and drop in any model id ending in `:free`. Your `~`10 credit also covers any non-free model until it runs out.

### Step 3: Call a free model with Python (OpenAI SDK)

The [OpenAI Python SDK](https://github.com/openai/openai-python) talks to all five providers — install it once, then point it at whichever endpoint you set up.

```bash
pip install openai
```

```python
import os
from openai import OpenAI

# DeepSeek — 5M free tokens, no credit card needed
client = OpenAI(
    base_url="https://api.deepseek.com/v1",
    api_key=os.environ["DEEPSEEK_API_KEY"],
)

completion = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "Why is the sky blue?"}],
)
print(completion.choices[0].message.content)
```

### Step 4: The 3-line swap to switch providers

This is the skill that makes the whole section worth it. The code below is identical for every provider — only three values change (`base_url`, the env var / key, and `model`). Comment out one block and uncomment another, or pass `base_url`/`model` as config.

```python
import os
from openai import OpenAI

# --- OpenRouter (free :free models or ~$10 credit) ---
# client = OpenAI(base_url="https://openrouter.ai/api/v1",
#                 api_key=os.environ["OPENROUTER_API_KEY"],
#                 default_headers={"HTTP-Referer": "http://localhost", "X-Title": "ai-learning-path"})
# model = "meta-llama/llama-3.2-3b-instruct:free"   # verify :free on openrouter.ai/pricing

# --- Hugging Face Inference Providers (free tier) ---
# client = OpenAI(base_url="https://router.huggingface.co/v1",
#                 api_key=os.environ["HF_TOKEN"])
# model = "openai/gpt-oss-120b"

# --- Google AI Studio (free tier) ---
# client = OpenAI(base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
#                 api_key=os.environ["GEMINI_API_KEY"])
# model = "gemini-3.8-flash"

# --- Together.ai (needs $5 credit; cheapest test = Ternary Bonsai 27B, free) ---
# client = OpenAI(base_url="https://api.together.ai/v1",
#                 api_key=os.environ["TOGETHER_API_KEY"])
# model = "Qwen/Qwen3.5-9B"   # or Prism-ML/Ternary-Bonsai-27B for a $0-token test

# --- DeepSeek (5M free tokens — primary example) ---
client = OpenAI(base_url="https://api.deepseek.com/v1",
                api_key=os.environ["DEEPSEEK_API_KEY"])
model = "deepseek-flash"

resp = client.chat.completions.create(
    model=model,
    messages=[{"role": "user", "content": "One-sentence definition of an LLM."}],
)
print(resp.choices[0].message.content)
```

> 📌 **Pro tip:** When your primary free model gets rate-limited, switch to the next provider in the list above — the only lines that change are `base_url`, the env var, and `model`.

---

## Choosing the Best Free Models

Free tiers reset on different schedules, so pair your task with the provider that gives you the most free tokens where you need them.

| Use this for... | Best free option | Provider / model |
|---|---|---|
| Fast chat / quick prototyping | 5M-token free quota | DeepSeek — `deepseek-flash` |
| Cheapest per request | $0 models, no spend | Hugging Face — `openai/gpt-oss-120b` (free router) |
| Strongest reasoning | large free allowance | Google AI Studio — `gemini-3.8-flash` (free tier); or DeepSeek `deepseek-v4-pro` |
| Coding help | generous free tokens | DeepSeek — `deepseek-flash` (also serves `deepseek-coder`) |
| Multimodal (image / audio) | free within limits | Google AI Studio — `gemini-3.8-flash` |
| Largest open models | free routing, no markup | Hugging Face — `openai/gpt-oss-120b` |
| No card, instant test | no payment needed | DeepSeek / Hugging Face / Google AI Studio |

---

## Cost Comparison

All prices per **1M tokens**, approximate, and current through late 2026. Free tiers are "free of charge" within rate limits (not unlimited); credits/tokens reset on the provider's schedule.

| Provider | Free option | Paid, ≈/1M tokens (in / out) | Notes |
|---|---|---|---|
| Google AI Studio | Free token usage (rate-limited) | Gemini 3.8 Flash: **$0.75 / $3.75** · 3.5 Flash $1.50 / $9.00 | Free tier is free of charge; new GCP projects also get $200 credit |
| DeepSeek | 5M free tokens (new users) | deepseek-flash: **~$0.14 / $0.28** | Among the cheapest APIs; free 5M tokens vanish fast on long outputs |
| Hugging Face | Free Inference Providers tier | No markup — you pay the provider | [PRO](https://huggingface.co/pricing) is $9/mo for higher limits |
| OpenRouter | ~$10 credit + `:free` models ($0) | `:free` models $0; paid = provider cost **+ 5.5%** | Free models rotate — verify on [pricing](https://openrouter.ai/pricing); credits expire after 1 year |
| Together.ai | $0-token models (e.g., Ternary Bonsai 27B) | Qwen3.5 9B ≈ **$0.17 / $0.25** | No sign-up credits (min $5 + card); cheapest test model is $0/token |

> 💰 **Reality check:** For learning and light agent work, the free tiers are enough to iterate without spending. Once you blow past the free allowance, **DeepSeek ($0.14/$0.28)** is the cheapest remote option, followed by **Hugging Face** (no markup) and **OpenRouter's cheapest passed-through providers**. Google is the most expensive here but the only one with native multimodal (image/audio/video) — including it on the free tier is a real bargain for vision tasks. Together has no standing free tier, so keep a $5 test budget ready.

---

## Common Pitfalls

- ❌ **Using a paid model by accident.** On OpenRouter, the model id must end in `:free` to stay free; `meta-llama/llama-3.2-3b-instruct` (no suffix) is a paid variant that draws your credit. On Google, pick a Flash model (`gemini-3.8-flash`), not a Pro model.
- ❌ **Relying on a specific free model that rotates.** OpenRouter's `:free` models change; if a call 400s, check the Free tab on [openrouter.ai/pricing](https://openrouter.ai/pricing) and swap the model id.
- ❌ **Pasting the key into the command line.** It ends up in your shell history and process list. Export it as an env var and reference it as `$VAR` instead of typing it inline.
- ❌ **Getting `base_url` wrong.** The OpenAI SDK is strict: Google **needs** a trailing slash on its `base_url` (`.../v1beta/openai/`); the others must **not** have one. Copy the URLs from the [Quick Reference](01-free-providers.md#quick-reference) table exactly.
- ❌ **Confusing model names across providers.** `deepseek-flash` (DeepSeek) ≠ `deepseek/deepseek-r1:free` (OpenRouter) ≠ `deepseek-ai/DeepSeek-V3` (Hugging Face). Same family, different routers — keep a cheat sheet.
- ❌ **Treating the free tier as production-ready.** Rate limits reset but can't be raised on the free tier. For real traffic, move to paid credits or host locally (Section 11).
- ❌ **Forgetting Together needs a card.** Signing up for Together and then being surprised by a $5 minimum charge is the most common "I thought this was free" complaint — use `Prism-ML/Ternary-Bonsai-27B` (a $0-token model) to test at zero spend.

---

## Quick Reference

Copy-paste the values that match your provider:

| Provider | Env var | `base_url` (OpenAI SDK) | Example model (free/cheap) |
|---|---|---|---|
| OpenRouter | `OPENROUTER_API_KEY` | `https://openrouter.ai/api/v1` | `meta-llama/llama-3.2-3b-instruct:free` (verify on [pricing](https://openrouter.ai/pricing)) |
| DeepSeek | `DEEPSEEK_API_KEY` | `https://api.deepseek.com/v1` | `deepseek-flash` |
| Hugging Face | `HF_TOKEN` | `https://router.huggingface.co/v1` | `openai/gpt-oss-120b` |
| Google AI Studio | `GEMINI_API_KEY` | `https://generativelanguage.googleapis.com/v1beta/openai/` | `gemini-3.8-flash` |
| Together.ai | `TOGETHER_API_KEY` | `https://api.together.ai/v1` | `Qwen/Qwen3.5-9B` (cheap); `Prism-ML/Ternary-Bonsai-27B` ($0-token) |

**curl skeleton** (swap the three values):
```bash
curl <base_url>/chat/completions \
  -H "Authorization: Bearer <KEY>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model>","messages":[{"role":"user","content":"Why is the sky blue?"}]}'
```

**Python skeleton** (swap the three values):
```python
from openai import OpenAI
client = OpenAI(base_url="<base_url>", api_key=os.environ["<ENV_VAR>"])
print(client.chat.completions.create(
    model="<model>", messages=[{"role":"user","content":"Why is the sky blue?"}]
).choices[0].message.content)
```

---

## Key Takeaways

- **Your keys live in env vars, never in code or history.** `OPENROUTER_API_KEY`, `HF_TOKEN`, `GEMINI_API_KEY`, `DEEPSEEK_API_KEY`, `TOGETHER_API_KEY`.
- **Four of five providers start free with no card** (Together needs $5); for the most stable free hands-on, DeepSeek's 5M-token `deepseek-flash` is the easiest to rely on.
- **The 3-line swap** (`base_url` + key + `model`) is the whole skill — once one provider works, you can route around any rate limit or price change by switching to another.
- **Free tiers reset but are finite.** Use the cheapest free model for each step, and consult the [cost table](#cost-comparison) before you scale up.

---

## 📚 Recommended Reading (Web Links)

1. [OpenRouter API Reference: Authentication](https://openrouter.ai/docs/api-reference/authentication) — Bearer keys, recommended headers, and free-model semantics.
2. [Hugging Face: Get started with Inference Providers](https://huggingface.co/docs/inference-providers/index) — Python/JS SDK, provider suffixes (`:cheapest`, `:fastest`), and free-tier limits.
3. [Gemini API: Using Gemini with OpenAI libraries](https://ai.google.dev/gemini-api/docs/openai) — the OpenAI-compatible endpoint and auth patterns.
4. [DeepSeek API: Your First API Call](https://api-docs.deepseek.com) — OpenAI-format curl and the current model names (`deepseek-flash`, `deepseek-v4-pro`).
5. [Together.ai REST API Reference](https://docs.together.ai/reference/chat-completions) — OpenAPI spec, curl, and SDK examples.
6. [OpenAI Python SDK](https://github.com/openai/openai-python) — the single client that drives all five providers in this section.

---

← [Back to Section Index](00-index.md) | ← [Previous Topic: The Five Free-Tier LLM Providers](01-free-providers.md) | [Next Section: Local LLM Engines →](../12-local-llms/00-index.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
