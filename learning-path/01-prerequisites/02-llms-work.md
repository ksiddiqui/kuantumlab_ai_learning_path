---

← [Back to Section Index](00-index.md) | ← [Previous Topic](01-bootstrapping.md) | [Next Topic →](03-markdown.md)

---

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **How LLMs Work: Tokens & Context**

---

# How LLMs Work: Tokens & Context

> **Learn how large language models count words, remember text, and make decisions — so you can write better prompts and avoid surprises.**

If you have ever wondered why an AI agent "forgets" the beginning of a conversation, or why a prompt that works in one model fails in another, this page explains the core concepts: **tokens**, **context windows**, and **model parameters**.

## 📺 Recommended Videos

1. [How LLMs Work](https://www.youtube.com/watch?v=SWE0LV0xnZ4) — A visual introduction to neural networks, training, and how models generate text
2. [Tokens and Context Windows](https://www.youtube.com/watch?v=aBLtloaM4sM) — What counts as a token, why context windows are limited, and how that affects you
3. [Model Parameters Explained](https://www.youtube.com/watch?v=9ARPjIUErlU) — Temperature, max tokens, top-p, and how each changes the output

## Understanding LLMs

### What Is a Token?

- A **token** is a chunk of text — roughly four characters of English or about three-quarters of a word
- Models do not read sentences or paragraphs; they read **sequences of tokens**
- Everything you type — words, spaces, punctuation — gets split into tokens before the model processes it

> 🤖 **Why tokens matter:** Every AI service charges by the token. Your agent's budget is measured in tokens. Understanding tokens helps you control cost and avoid running out mid-conversation.

### What Is a Context Window?

- The **context window** is the maximum number of tokens a model can "see" at once
- If you paste a 5,000-word essay and the model has a 4,000-token context, it will only "remember" the last portion
- Think of it like human short-term memory: you can only hold so much at once before earlier details start fading

> 🖥️ **Example:** A model with an 8,192-token context can handle about 6,000 words — roughly a 15-page document. A model with a 128,000-token context can handle an entire book.

### What Are Model Parameters?

When you send a prompt to an LLM, you can adjust **parameters** that control how the model responds:

| Parameter | What It Does | Typical Values |
|---|---|---|
| **Temperature** | How random or creative the output is | `0.0` (strict) to `1.0` (creative) |
| **Max tokens** | The longest response the model can generate | `64` to `4,000` |
| **Top-p (nucleus)** | How broadly the model considers alternative words | `0.1` (focused) to `1.0` (diverse) |

> 🖥️ **LLM model diagram**
> ![How an LLM processes tokens into predictions](assets/llm-model.png)
> *Models predict the next token in a sequence, one at a time.*

## Step-by-Step Guide

### Step 1: Understand How Tokens Work

A token is not exactly one word. Here is how text splits into tokens:

```
"Hello, world!"  →  ["Hello", ",", " world", "!"]  →  4 tokens
"supercalifragilisticexpialidocious" → ["super", "cali", "fragilistic", "expialidocious"] → 4 tokens
```

**Quick estimation rules:**
- 1,000 tokens ≈ 750 words (English)
- 1,000 tokens ≈ 4,000 characters
- When in doubt, assume **1 token ≈ 4 characters** or **1 token ≈ 0.75 words**

**Check token counts for free:**
- [OpenAI's tokenizer tool](https://platform.openai.com/tokenizer)
- The `tiktoken` Python library

```bash
# Install the token counter
pip3 install tiktoken

# Count tokens in a Python script
python3 -c "
import tiktoken
enc = tiktoken.encoding_for_model('gpt-4')
text = 'The quick brown fox jumps over the lazy dog.'
tokens = enc.encode(text)
print(f'Token count: {len(tokens)}')
"
```

### Step 2: Know Your Model's Context Window

Different models have very different context windows:

| Model | Context Window | What That Means |
|---|---|---|
| GPT-3.5 | 4,096 tokens | About 3,000 words — one short essay |
| GPT-4 | 8,192 tokens | About 6,000 words — a 15-page document |
| GPT-4-turbo | 128,000 tokens | An entire book |
| Claude 3 Haiku | 200,000 tokens | A very long conversation |
| Claude 3 Sonnet | 200,000 tokens | Same as above |
| Claude 3 Opus | 200,000 tokens | Same — great for long documents |
| Gemini 1.5 Pro | 1,000,000+ tokens | An entire library |

> 💡 **Tip:** Models with large context windows cost more per token, but you save money by sending more information in a single request instead of breaking it into chunks.

### Step 3: Master the Key Parameters

#### Temperature

- **Low temperature (`0.0` to `0.3`):** The model plays it safe and picks the most likely next word
  - Best for: factual answers, code generation, summarizing
- **High temperature (`0.7` to `1.0`):** The model takes risks and explores less likely words
  - Best for: creative writing, brainstorming, roleplay

```python
# Low temperature — predictable, safe output
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "What is the capital of France?"}],
    temperature=0.2,
    max_tokens=64,
)

# High temperature — creative, unpredictable output
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Give me a creative plot for a sci-fi story."}],
    temperature=0.8,
    max_tokens=512,
)
```

#### Max Tokens

- Sets the **longest** response the model can generate
- If you set `max_tokens=100`, the model stops after 100 tokens — even if the answer is not complete
- Always set this slightly higher than the answer you expect

#### Top-p (Nucleus Sampling)

- `top_p=1.0` (default): the model considers all possible next words
- `top_p=0.5`: the model only considers the most likely 50% of next words
- Use this to make output more focused without the strictness of low temperature

```python
# Focused output with top-p
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Explain quantum computing in one paragraph."}],
    temperature=0.3,
    top_p=0.7,
    max_tokens=200,
)
```

### Step 4: Estimate Costs

Most AI services charge per token:

```
Cost = (input_tokens × input_price) + (output_tokens × output_price)

Example with GPT-4o:
- Input:  $0.005 per 1,000 tokens
- Output: $0.015 per 1,000 tokens

Sending a 500-token prompt and getting a 200-token reply:
- Input cost:  500 × $0.005 / 1000 = $0.0025
- Output cost: 200 × $0.015 / 1000 = $0.0030
- Total:       $0.0055 (less than a penny)
```

> 💡 **Tip:** Keep prompts concise. Every extra word costs money. Remove fluff before sending to an AI agent.

## Common Pitfalls

- ❌ **Sending a 20,000-word document to GPT-3.5** — Its 4,096-token limit will truncate your text. Use a model with a bigger context window (like GPT-4-turbo at 128K) or split the document into chunks.
- ❌ **Setting max_tokens too low** — If you ask a complex question and set `max_tokens=50`, the model will cut off mid-sentence. Always estimate generously.
- ❌ **Using high temperature for code** — A creative model might invent fake library functions or syntax. Keep temperature at `0.0` to `0.2` for programming tasks.
- ❌ **Ignoring input vs. output pricing** — Many models charge more per token for output than input. Long responses cost more than long prompts on some providers.
- ❌ **Not counting the prompt tokens** — Your prompt counts toward your budget and bill. A 2,000-token prompt uses half the context window of GPT-4.

## Quick Reference

| Concept | Quick Rule |
|---|---|
| Token ≈ | 4 characters of English text |
| Token ≈ | 0.75 words |
| 1,000 tokens ≈ | 750 words |
| GPT-4 context | 8,192 tokens ≈ 6,000 words |
| GPT-4-turbo context | 128,000 tokens ≈ 96,000 words |
| Claude 3 context | 200,000 tokens ≈ 150,000 words |
| Temperature 0.0 | Deterministic, repeatable |
| Temperature 1.0 | Creative, random |
| Top-p 1.0 | Consider all options |
| Top-p 0.5 | Only likely words |

## Key Takeaways

- A **token** is a unit of text (roughly 4 characters or 0.75 words)
- The **context window** is how many tokens the model can process at once — everything beyond that gets cut off
- **Temperature** controls creativity vs. predictability
- **Max tokens** caps how long the model's response can be
- **Top-p** controls how broadly the model searches for the next word
- Tokens cost money — shorter prompts and responses save you money

## 📚 Recommended Reading (Web Links)

1. [OpenAI API Reference](https://platform.openai.com/docs/api-reference) — Parameters, pricing, and examples for every OpenAI model
2. [Anthropic Documentation](https://docs.anthropic.com/) — Model specs, prompt library, and token counting for Claude models
3. [Hugging Face Course](https://huggingface.co/learn/nlp-course) — Free course covering transformers, tokens, and how models are trained
4. [OpenAI Cookbook](https://github.com/openai/openai-cookbook) — Recipes and examples for using the OpenAI API, including token tricks

---

← [Back to Section Index](00-index.md) | ← [Previous Topic](01-bootstrapping.md) | [Next Topic →](03-markdown.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
