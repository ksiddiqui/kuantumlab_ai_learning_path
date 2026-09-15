← [Back to Main Index](../00-index.md) | [← Previous Section: Paid Agent Options](../10-paid-agents/00-index.md) | [Next Section: Local LLM Engines →](../12-local-llms/00-index.md)

[← Main Index](../00-index.md) → [Section 10: Free-Tier LLM Providers](00-index.md) → **Current Page**

# Free-Tier LLM Providers

> This section shows you how to call 100+ language models through APIs that are **completely free to start** — OpenRouter, Hugging Face, Google AI Studio, DeepSeek, and Together.ai. You'll get real API keys, pick models that cost $0 to use, and make your first `curl` and Python calls — all without entering a credit card.

---

## 📺 Recommended Videos

1. [Gemini 3.1 + New AI Studio Is Here: Full Prototyping Tutorial](https://www.youtube.com/watch?v=2sLO9NYr8Rc) — walkthrough of Google AI Studio, the free web UI and API that gives you access to Google's Flash models.
2. [Build your LLM App without a vector database (in 30 lines of Python)](https://www.youtube.com/watch?v=kcrJSk00duw) — builds a responsive AI app by calling OpenAI and Hugging Face APIs; the same pattern works with every free provider in this section.
3. [N8N & Google Gemini: Build AI-Powered Workflows in Minutes](https://www.youtube.com/watch?v=7FxmK_6g190) — wires the free Gemini API into an automated workflow, showing how an API key becomes a real app.

---

## Understanding Free-Tier LLM Providers

### What Are They?

Free-tier LLM providers are cloud APIs that let you send text to a language model and get a response back over HTTP — and they all include a **free allowance** so you can start building before you pay anything.

- **Simple definition:** An LLM API is a web endpoint; a free tier is a bucket of free tokens/requests you get every billing cycle.
- **Real-world analogy:** Like a mobile data plan — you get a little data each month for free, and you only pay if you use more than that.
- **Why it matters for AI agents:** OpenCode and Oh My Pi can route their model calls through these APIs instead of (or in addition to) local models, so your agents get access to state-of-the-art models without paying a monthly subscription.

### Why You Need This

- **Point 1:** You can prototype and test agent workflows for free — no credit card, no surprise bill.
- **Point 2:** You're not locked into one vendor. All five providers below are OpenAI-compatible, so the same code talks to all of them.
- **Point 3:** If you skip this, your agents are limited to whatever local model you installed in Section 11 — which is fine, but missing the free remote options keeps your costs at zero while you learn.

---

## The Five Providers in This Section

| Provider | Free allowance | Card to start? | Best free/cheap model |
|---|---|---|---|
| [OpenRouter](https://openrouter.ai) | ~$10 credit + `:free` models ($0) | No | `meta-llama/llama-3.2-3b-instruct:free` |
| [Hugging Face](https://huggingface.co) | Free Inference Providers tier | No | `openai/gpt-oss-120b` |
| [Google AI Studio](https://aistudio.google.com) | Free token usage (rate-limited) | No | `gemini-3.8-flash` |
| [DeepSeek](https://deepseek.com) | 5M free tokens (new users) | No | `deepseek-flash` |
| [Together.ai](https://together.ai) | none\* (min $5 + card) | Yes\* | open-weight models at $0/token |

> \* Together ended its sign-up credits, so you must add a card and buy at least $5 in credits. However, several open-weight models on Together are priced at **$0/token**, so you can still test without spending.

![The five free-tier LLM providers](assets/providers.png)

The biggest surprise here: **none of these strictly require a credit card to begin**, except Together (and you can still hit $0-token models there). That means every provider on this page is safe to try with real money at $0.

---

## What's in This Section

| # | Topic | What You'll Learn | Time |
|---|---|---|---|
| 1 | [The Five Free-Tier LLM Providers](01-free-providers.md) | The free allowance, API endpoint, and key-acquisition steps for each provider — plus how to read their pricing pages | ~1h |
| 2 | [Using Free LLMs: API Keys, Model Selection & Cost](02-using-free-llms.md) | Get real API keys, call a free model with `curl` and Python, swap providers in 3 lines, and compare costs | ~1–1.5h |

---

## How Free-Tier LLM Providers Fit Into the Learning Path

You've already learned to run LLMs **locally** with Ollama/Ollama in Section 11 ([Local LLM Engines](../12-local-llms/00-index.md)). This section is the **remote** counterpart — calling hosted models over HTTP so you're not limited by your computer's hardware.

1. **OpenCode** (Section 1) and **Oh My Pi** (Section 7) can both route their model calls to these free APIs instead of local models.
2. **Other open-source agents** (Section 8) like DeepSeek, Aider, and Cline already call some of these endpoints — now you'll understand exactly where the keys come from and how the billing works.
3. **Paid agents** (Section 9) sit on top of the same providers — learning the free tiers first means you can evaluate Claude Code, Codex, and Kiro with full context on what you're paying for.

> 💡 **Key Insight:** Once you have one OpenAI-compatible key, you have them all. Each provider exposes the same `/chat/completions` shape — you only swap the `base_url`, the `api_key`, and the `model` name.

> 📌 **Next steps:** After reading through this section, move on to [Section 11 — Local LLM Engines](../12-local-llms/00-index.md) to learn how to run these same models on your own machine for zero latency and zero per-token cost.

---

## Key Takeaways

- **Five providers, zero cards required** (Together aside) — each gives you free remote access to 100+ models, including open-weight ones like Llama, Qwen, and DeepSeek.
- **All five are OpenAI-compatible** — the same `curl` and the same Python `OpenAI` client work across OpenRouter, Hugging Face, DeepSeek, Together, and even Google Gemini (via its OpenAI-compatible endpoint).
- **Free tiers are rate-limited, not unlimited** — treat them as generous sandboxes for learning, not as forever-free production backends.
- **Use `gemini-3.8-flash`, `deepseek-flash`, and `:free` models** to stay in the free tier longest while you build.

---

## 📚 Recommended Reading (Web Links)

1. [OpenRouter](https://openrouter.ai) — API hub for 400+ models; [pricing](https://openrouter.ai/pricing) lists free `:free` models and [docs](https://openrouter.ai/docs/api-reference/authentication) cover the OpenAI-compatible endpoint.
2. [Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers/index) — one OpenAI-compatible router (`router.huggingface.co`) for hundreds of open-weight models; [free tier](https://huggingface.co/pricing) with higher limits on [PRO ($9/mo)](https://huggingface.co/subscribe/pro).
3. [Google AI Studio](https://aistudio.google.com) — free web UI + Gemini API; get your key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Docs: [OpenAI-compatible endpoint](https://ai.google.dev/gemini-api/docs/openai), [pricing](https://ai.google.dev/gemini-api/docs/pricing), [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits).
4. [DeepSeek API](https://api-docs.deepseek.com) — OpenAI-compatible API at `api.deepseek.com`; apply for a key at [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys).
5. [Together.ai](https://together.ai/pricing) — 100+ open models with OpenAI-compatible inference; docs at [docs.together.ai](https://docs.together.ai).

---

← [Back to Section Index](00-index.md) | [The Five Free-Tier LLM Providers →](01-free-providers.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
