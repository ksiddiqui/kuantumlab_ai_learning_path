# Appendix: Reference Materials

> This appendix collects the things you'll flip back to again and again once you start building agents on your own — a free-or-cheap resource directory, a plain-English glossary for non-CS grads, a troubleshooting quick reference, and responsible-AI notes. Treat it as your field guide, not required reading.

## Table of Contents

- [A. Resource Directory (All Free or <$20)](#a-resource-directory-all-free-or-20)
- [B. Glossary (for Non-CS Grads)](#b-glossary-for-non-cs-grads)
- [C. Troubleshooting Quick Reference](#c-troubleshooting-quick-reference)
- [D. Ethics & Responsible AI Quick Notes](#d-ethics--responsible-ai-quick-notes)

---

## A. Resource Directory (All Free or <$20)

A curated list of the tools and services used throughout this learning path. Every option here has a usable free tier or costs less than $20 — most can be used indefinitely for learning and small projects.

| Resource | Cost | Link | Purpose |
|---|---|---|---|
| OpenCode Zen | $10/month | [Anomaly.tech](https://anomaly.tech) | Primary AI coding agent; unlimited model access with the Zen plan |
| OpenRouter free tier | Free ($10 credit) | [openrouter.ai](https://openrouter.ai) | Gateway to 100+ LLMs; start with $10 free credit |
| DeepSeek API | Free | [deepseek.com](https://deepseek.com) | Free API access to strong reasoning models; no credit card |
| Google AI Studio | Free | [aistudio.google.com](https://aistudio.google.com) | Access to Gemini models; generous free tier |
| Hugging Face | Free tier | [huggingface.co](https://huggingface.co) | Open models, datasets, and hosted inference endpoints |
| Together.ai | Free tier | [together.ai](https://together.ai) | GPU cloud and open model serving; free credits for getting started |
| GitHub (public repos) | Free | [github.com](https://github.com) | Code hosting, version control, and deployment source of truth |
| GitHub Pages | Free | [pages.github.com](https://pages.github.com) | Turn a GitHub repo into a live website at no cost |
| Cloudflare Pages | Free | [pages.cloudflare.com](https://pages.cloudflare.com) | Global static hosting with instant deploys and a generous free tier |
| Porkbun (domains) | ~$12/year | [porkbun.com](https://porkbun.com) | Cheap, no-surprise domain registration for your projects |

> 💡 **Tip:** Start every section with the free tiers. Upgrade to a $10/month paid plan only once you've shipped something you want to keep online.

---

## B. Glossary (for Non-CS Grads)

Every term is explained in plain English — no CS degree needed.

- **Agent:** An AI that can take actions (not just answer questions). Instead of just chatting, it can read your files, run commands, search the web, send emails, and edit code. Think of it as a helpful assistant that has access to tools.
- **MCP (Model Context Protocol):** A standard way for tools (servers) to talk to agents. If an agent is the brain, MCP is the nervous system — it lets the agent plug in a search tool, a database, your calendar, or a code editor without each tool needing a custom integration.
- **Token:** A chunk of text the model processes at once. In English, roughly 4 characters or ¾ of a word count as one token. If a model has a 128k-token context, it can "see" about 100,000 words at once — roughly a novel.
- **Context Window:** How much text the model can hold in a single conversation turn. A small context window means the agent "forgets" the start of your conversation; a large one lets it read an entire codebase before answering.
- **Tool Call:** When an agent decides to use a tool — a search, a file read, an API request — instead of just printing text. Each tool call costs tokens, so an agent that makes 5 tool calls uses 5 actions before you get a final answer.
- **Hook:** Code that runs automatically when something happens. In AI agents, hooks are snippets you register to run *before* or *after* the agent does something — for example, auto-formatting every file the agent edits.
- **Quantization:** Shrinking a model so it runs faster with slightly lower accuracy. It's like compressing a high-resolution photo: the image is still recognizable, but smaller and quicker to load — essential for running big models on your laptop.
- **Inference:** Running a model to get an answer (as opposed to *training* it). When you ask an AI a question and it replies, that reply is an inference — the model is "inferring" the best response from what it learned.

---

## C. Troubleshooting Quick Reference

A short checklist for the most common walls you'll hit. When stuck, work down the list — most problems resolve in the first two steps.

| Symptom | Check / Fix |
|---|---|
| Agent says "I can't find the file" | Run `pwd` (print working directory); confirm you're in the right folder, then use absolute paths (`/abs/path/file` or `./file`) |
| MCP not connecting | Restart the agent; check server logs; verify required environment variables are set and the MCP server is enabled |
| Model too slow | Switch to a smaller/faster model (e.g. a 7B local LLM), or reduce the number of tools the agent calls in one turn |
| Agent goes in circles (loops / no progress) | Add more constraints to the prompt; reduce the number of tools available; break the task into smaller sub-tasks |
| Agent edits the wrong file | Always state the full path in the prompt; confirm the file exists with `ls` or `cat` before asking the agent to edit |
| Changes not saved / deployment failed | Verify the working tree has the changes (`git status`); ensure you committed AND pushed to the right branch before deploying |
| Token limit hit mid-task | Start a fresh session; copy over key context (the goal, any partial output, and relevant file paths); keep prompts concise |

---

## D. Ethics & Responsible AI Quick Notes

AI agents are powerful, and with that comes a responsibility to use them thoughtfully. These notes aren't a complete policy — they're guardrails to keep you on the right side of helpful and harmless.

- **Never give an agent unrestricted access to destructive commands** without review. Commands like `rm -rf`, `git push --force`, and database wipes can't be undone. Wrap risky actions so you confirm before they run.
- **Always review agent changes before committing.** An agent can write plausible-looking code that's subtly wrong. Read the diff — especially file paths, API calls, and anything that touches secrets or production data.
- **Be transparent when AI-generated content is used in public.** If you publish a report, blog post, or codebase that was AI-assisted, say so. Readers and collaborators deserve to know how the work was produced.
- **Protect personal and sensitive data** when using cloud LLMs. Don't paste passwords, API keys, private customer data, or confidential company information into prompts — the model may retain or leak it.
- **Don't bypass human judgment on important decisions.** Agents are excellent at research and drafting, but final calls on finances, hiring, medical advice, or system changes should stay human.
- **Respect the terms of service** of the tools and data sources you connect. Scraping that violates a site's terms or robots policy isn't just risky — it's unethical.

---

<!-- Navigation: Bottom -->
← [Back to Main Index](../index.md) | ← [Previous Section](../13-project-ideas/index.md) | [Back to Table of Contents](../index.md)

[← Project Root](../index.md) | ← [Back to Main Index](../index.md)
