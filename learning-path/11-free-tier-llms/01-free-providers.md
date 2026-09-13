← [Back to Section Index](index.md) | [Next Topic →](02-using-free-llms.md)

[← Main Index](../index.md) → [Section 10: Free-Tier LLM Providers](index.md) → **The Five Free-Tier LLM Providers**

# The Five Free-Tier LLM Providers

> Meet the five hosted LLM APIs you can call for free: OpenRouter, Hugging Face Inference Providers, Google AI Studio (Gemini API), DeepSeek, and Together.ai — with their free allowances, endpoints, and key-acquisition steps laid out side by side.

---

## 📺 Recommended Videos

1. [Gemini 3.1 + New AI Studio Is Here: Full Prototyping Tutorial](https://www.youtube.com/watch?v=2sLO9NYr8Rc) — tour of Google AI Studio, the free path to Google's Gemini Flash models via web UI and API.
2. [Build your LLM App without a vector database (in 30 lines of Python)](https://www.youtube.com/watch?v=kcrJSk00duw) — end-to-end example calling Hugging Face APIs from Python, the exact pattern this section teaches.
3. [N8N & Google Gemini: Build AI-Powered Workflows in Minutes](https://www.youtube.com/watch?v=7FxmK_6g190) — connects the free Gemini API key into an automated workflow.

---

## Understanding Free-Tier LLM APIs

### What Are They?

A free-tier LLM provider is a hosted API you call over HTTPS. You send a message, the provider runs a model, and it streams a reply back as JSON. "Free tier" means the provider gives you a quota of free input + output tokens every period so you can build and test without a card.

- **Analogy:** Think of it like cloud compute credits that renew — you spend free tokens, and when they reset you get a fresh bucket.
- **The contract you sign:** Every provider returns an [OpenAI-compatible](https://platform.openai.com/docs/api-reference/chat) JSON shape (`/chat/completions`), so the same `curl` and Python work for all of them once you swap three values.
- **What "free" really means:** Token usage is free *up to a limit*; beyond that you pay per token. The limits reset periodically and vary by model.

### Why You Need This

- **Because local LLMs are hardware-bound.** Running a 70B model locally needs 16–24 GB of VRAM. These APIs let the provider run the big model for you, so even a laptop can call a 1.6T-parameter model (DeepSeek V4 Pro) for free.
- **Because agents need to "think big, spend small."** An agent can explore 5–10 model calls per task; on a free tier that costs $0, versus $0.10+ each on a paid model.
- **Because one key unlocks 100+ models.** OpenRouter alone routes to 400+ models; you pick the cheapest free one for each step of your workflow.

---

## The Comparison Table

This is the master reference. Bookmark it.

| Provider | Free allowance | Card to start? | Get your key at | OpenAI-compatible base_url | Notable free model(s) | Paid, ≈/1M tokens (in/out) | Best for |
|---|---|---|---|---|---|---|---|
| [OpenRouter](https://openrouter.ai) | ~$10 credit + `:free` models ($0) | No | [openrouter.ai/settings](https://openrouter.ai/settings) | `https://openrouter.ai/api/v1` | `meta-llama/llama-3.2-3b-instruct:free` (rotating — check [pricing](https://openrouter.ai/pricing)) | `:free` models $0; paid = provider cost **+ 5.5%** | Trying 100+ models, finding one that's free for your use |
| [Hugging Face](https://huggingface.co) | Free Inference Providers tier | No | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new) | `https://router.huggingface.co/v1` | `openai/gpt-oss-120b`, `deepseek-ai/DeepSeek-V3`, `Qwen/Qwen2.5-7B-Instruct` | No markup — you pay the provider | Largest open-weight catalog, pay only provider cost |
| [Google AI Studio](https://aistudio.google.com) | Free token usage (rate-limited) | No | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | `https://generativelanguage.googleapis.com/v1beta/openai/` | `gemini-3.8-flash` | Gemini 3.8 Flash: **$0.75 / $3.75** · 3.5 Flash $1.50/$9.00 | Multimodal (image/audio/video) + native free tier |
| [DeepSeek](https://deepseek.com) | 5M free tokens (new users) | No | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) | `https://api.deepseek.com/v1` | `deepseek-flash`, `deepseek-v4-pro` | deepseek-flash: ~ **$0.14 / $0.28** | Cheap reasoning + coding; among the cheapest APIs |
| [Together.ai](https://together.ai) | none\* (min $5 + card) | Yes\* | [together.ai/settings](https://together.ai/settings) | `https://api.together.ai/v1` | Llama/Qwen open models (some $0/token) | Some models $0/token (e.g., Ternary Bonsai 27B Free); Qwen3.5 9B ≈ $0.17/$0.25 | Self-hosting partner catalog, batch inference |

> \* Together ended its sign-up credits (see [their billing guide](https://docs.together.ai/docs/billing-credits)), so a card + a minimum $5 credit purchase are required. You can still test on models priced at $0/token.

> 💡 **Rates change.** Paid numbers above are approximate and quoted through late 2026; always check each provider's pricing page for the latest. Free tiers are "free of charge" within their rate limits and reset periodically.

---

## Provider Deep Dives

### OpenRouter

OpenRouter is a routing layer that gives you OpenAI-compatible access to **400+ models** from a single endpoint. New accounts get a small free credit (commonly ~$10), and a large catalog of models is tagged `:free` — those cost $0 to call and don't touch your credit balance.

- **Homepage / pricing:** [openrouter.ai](https://openrouter.ai) · [openrouter.ai/pricing](https://openrouter.ai/pricing) (the "Free" page lists current `:free` models; they rotate).
- **Free models:** append `:free` to the model slug, e.g. `meta-llama/llama-3.2-3b-instruct:free`. Without credits, free models are rate-limited to ~50 requests/day; with the credit, ~1,000/day.
- **Get a key:** Sign in at [openrouter.ai/settings](https://openrouter.ai/settings) → **API Keys** → *Create key*.
- **Endpoint + auth:** `https://openrouter.ai/api/v1/chat/completions`, header `Authorization: Bearer <OPENROUTER_API_KEY>`. They also recommend an `HTTP-Referer` and `X-Title` header so your app is identifiable.
- **Best free picks:** open [openrouter.ai/pricing](https://openrouter.ai/pricing) and use any model on the **Free** tab (every free id ends in `:free`); historically Llama 3.x, Gemini Flash, and DeepSeek appear as free.
- **Cost note:** OpenRouter adds a 5.5% platform fee on top of the provider's price.

### Hugging Face Inference Providers

Hugging Face runs a single OpenAI-compatible router (`router.huggingface.co`) that fans your request out to 15+ inference partners (Together, Fireworks, DeepInfra, …) serving thousands of open-weight models. It includes a **generous free tier**, and [PRO ($9/mo)](https://huggingface.co/subscribe/pro) lifts the limits.

- **Homepage / docs:** [huggingface.co](https://huggingface.co) · [Inference Providers docs](https://huggingface.co/docs/inference-providers/index).
- **Get a token:** Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new), create a *fine-grained* token, and grant it the `Make calls to Inference Providers` permission.
- **Endpoint + auth:** `https://router.huggingface.co/v1/chat/completions`, header `Authorization: Bearer <HF_TOKEN>`.
- **Picking a provider:** No markup is added — you can append a policy suffix to the model id: `:cheapest` (lowest price), `:fastest` (highest throughput), `:preferred` (your preferred-provider order), or pick one explicitly like `:together` / `:groq` / `:fireworks-ai`.
- **Best free picks:** `openai/gpt-oss-120b` (open-weights, fast), `deepseek-ai/DeepSeek-V3`, model families from `Qwen`, `meta-llama`, and `mistralai`.

### Google AI Studio (Gemini API)

This is Google's official, free-to-start gateway to the Gemini family. The **free tier is free of charge** for Flash models within per-model rate limits — no credit card is required to begin (just a Google account and a phone-number verification). New Google Cloud projects also receive **$200 in free credit**.

- **Homepage / API key:** [aistudio.google.com](https://aistudio.google.com) · [Get API key](https://aistudio.google.com/apikey).
- **OpenAI-compatible endpoint:** Google exposes an OpenAI-compatible path, so the same SDK code works: `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions` with header `Authorization: Bearer <GEMINI_API_KEY>`.
- **Free models:** `gemini-3.8-flash` (the headline free-tier Flash model), `gemini-3.7-flash`, `gemini-3.6-flash`, `gemini-3.5-flash`.
- **Security heads-up:** New API keys are created as **auth keys by default**; unrestricted *standard* keys are rejected, and by **September 2026 standard keys stop working entirely** — [migrate to an auth key](https://ai.google.dev/gemini-api/docs/api-key#migrate-to-auth-key) now.
- **Best for:** anything multimodal (text + image + audio + video), and the strongest free-tier reasoning.

### DeepSeek

DeepSeek offers OpenAI-compatible API access directly at `api.deepseek.com`, and new users get **5 million free tokens** to use any time within the free tier — no credit card required.

- **Homepage / API docs:** [deepseek.com](https://deepseek.com) · [api-docs.deepseek.com](https://api-docs.deepseek.com).
- **Get a key:** [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) → *Create API key*.
- **Endpoint + auth:** `https://api.deepseek.com/v1/chat/completions`, header `Authorization: Bearer <DEEPSEEK_API_KEY>`.
- **Models:** `deepseek-flash` (fast, cheap chat), `deepseek-v4-pro` (powerful reasoning, 1.6T params, 1M context), plus legacy `deepseek-chat` / `deepseek-reasoner` / `deepseek-coder` names that are still served.
- **Best for:** coding and reasoning at very low cost — the free 5M-token allowance goes a long way.

### Together.ai

Together is a self-hosting and inference partner with 100+ open-weight models (Llama, Qwen, Mistral, DeepSeek) behind an OpenAI-compatible API. Unlike the others above, **Together no longer gives free sign-up credits** — you must add a card and buy at least $5 in credits — but several open-weight models are priced at **$0 per token**, so you can still experiment at zero cost.

- **Homepage / pricing / docs:** [together.ai/pricing](https://together.ai/pricing) · [docs.together.ai](https://docs.together.ai).
- **Get a key:** [together.ai/settings](https://together.ai/settings) → **API keys** → *Create*.
- **Endpoint + auth:** `https://api.together.ai/v1/chat/completions`, header `Authorization: Bearer <TOGETHER_API_KEY>`.
- **Best $0-token models:** look for community/open models flagged at $0 on the pricing page (e.g. several Llama and Qwen distills).
- **Best for:** the widest open-model catalog, and their **Batch API** for high-throughput jobs.

---

## Common Pitfalls

- ❌ **Reading "$0" as "unlimited."** Free tiers are capped — OpenRouter free models are rate-limited per day, Google's free tier resets at per-model limits, and DeepSeek's 5M tokens vanish fast on long conversations.
- ❌ **Using a paid model by accident.** On OpenRouter, dropping the `:free` suffix routes you to a paid model and burns your credit. On Google, `gemini-3.5-pro` is paid — stick to Flash models for free testing.
- ❌ **Hardcoding keys in code.** Never paste an API key into a file you'll commit. Use environment variables: `OPENROUTER_API_KEY`, `HF_TOKEN`, `GEMINI_API_KEY`, `DEEPSEEK_API_KEY`, `TOGETHER_API_KEY`.
- ❌ **Ignoring free-model rotation.** The set of `:free` (OpenRouter) and $0-token (Together) models changes. Check the pricing page before building on a specific model.
- ❌ **Forgetting Google's auth-key migration.** Standard Google API keys are being phased out; create auth keys in AI Studio and migrate before September 2026.

---

## Quick Reference

| Provider | Env var | base_url (OpenAI SDK) | Example free model |
|---|---|---|---|
| OpenRouter | `OPENROUTER_API_KEY` | `https://openrouter.ai/api/v1` | `meta-llama/llama-3.2-3b-instruct:free` |
| Hugging Face | `HF_TOKEN` | `https://router.huggingface.co/v1` | `openai/gpt-oss-120b` |
| Google AI Studio | `GEMINI_API_KEY` | `https://generativelanguage.googleapis.com/v1beta/openai/` | `gemini-3.8-flash` |
| DeepSeek | `DEEPSEEK_API_KEY` | `https://api.deepseek.com/v1` | `deepseek-flash` |
| Together.ai | `TOGETHER_API_KEY` | `https://api.together.ai/v1` | `Prism-ML/Ternary-Bonsai-27B` (Free, $0/token) |

---

## Key Takeaways

- **No credit card, no problem:** four of the five providers (OpenRouter, Hugging Face, Google AI Studio, DeepSeek) let you start for free with no card; Together is the exception but still has $0-token models to test on.
- **One shape fits all:** every provider serves an OpenAI-compatible `/chat/completions` endpoint, so `curl` and Python `OpenAI` are the only tools you need — see [page 2](02-using-free-llms.md) for the exact calls.
- **Free ≠ unlimited:** each free tier has rate limits and a budget that resets; pick the cheapest free model for the task and watch your usage.

---

## 📚 Recommended Reading (Web Links)

1. [OpenRouter API Authentication](https://openrouter.ai/docs/api-reference/authentication) — Bearer-key usage, recommended headers, and quota semantics.
2. [Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers/index) — Python/JS SDK quickstart and provider-selection suffixes (`:cheapest`, `:fastest`).
3. [Gemini API: Using Gemini with OpenAI libraries](https://ai.google.dev/gemini-api/docs/openai) — the official OpenAI-compatible endpoint and auth patterns.
4. [DeepSeek API: Your First API Call](https://api-docs.deepseek.com) — OpenAI-format curl example and model names.
5. [Together.ai Billing & Credits](https://docs.together.ai/docs/billing-credits) — why cards are now required and how $0-token models work.

---

← [Back to Section Index](index.md) | [Next Topic →](02-using-free-llms.md)

[← Main Index](../index.md) | [Table of Contents](index.md)
