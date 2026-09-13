<!-- Navigation: Top -->
← [Back to Main Index](../index.md) | [← Previous Section: Local LLMs](../12-local-llms/index.md) | [Next Section: Appendix →](../appendix/index.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → [Section 12: Project Ideas](index.md) → **Current Page**

# Project Ideas (Capstone)

> The final stretch — four portfolio-worthy projects that combine every skill you've learned: agent workflows, MCPs, local LLMs, web/mobile deployment, and content strategy. Build one end-to-end, deploy it to a live URL, and ship something you can show on your resume or LinkedIn. None of these are toy demos; each produces a real, runnable artifact you can point to in an interview.

## 🎯 What You'll Build

This section is split into four tracks. They're independent — pick the one that excites you most, or build all four across a few weeks. Every track reuses the agent + MCP + deployment stack from earlier sections.

| # | Project Track | What You Ship | Est. Time | Tools You Combine |
|---|---|---|---|---|
| [1](01-online-platform.md) | **AI Research Copilot** (Online web platform) | A deployed web app + PDF reports | 20–30h | OpenCode/OMP, Exa or SerpAPI MCP, Firecrawl/Defuddle MCP, Next.js, Supabase, PDF export |
| [2](02-mobile-app.md) | **Personal Knowledge Assistant** + **Study Buddy AI** (Mobile app) | A voice-to-flashcard mobile app with spaced repetition | 20–30h | Expo (React Native), Whisper, sentence-transformers, Supabase or SQLite, Ollama |
| [3](03-local-tool.md) | **CLI Life Assistant** + **Privacy-First Data Dashboard** (Local tool) | A terminal tool + auto-refreshing HTML dashboard | 15–25h | OMP/Claude Code, shell + Gmail + Calendar MCPs, cron, Python/TypeScript, Chart.js |
| [4](04-linkedin.md) | **Post on LinkedIn** (Content strategy) | A 3-part thread + supporting visuals that showcase your build | 5–8h | LinkedIn automation, Canva, agent-assisted drafting/scheduling |

## 📺 Recommended Videos

These capstone tracks reuse the tools you already saw in earlier sections. If you need a refresher on any of them, jump back to the relevant section videos — you don't need new ones to start building.

1. [oh-my-pi: The Coding Agent With An IDE Inside](https://www.youtube.com/watch?v=0fAMlarIELw) — OMP overview and IDE integration (Section 7)
2. [How to Run Local LLMs with Ollama: A Step-by-Step Guide](https://www.youtube.com/watch?v=N4hIGkWN8) — local LLM setup for on-device inference (Section 11)
3. [Learn 80% of Claude Code in 10 Minutes (2026 Tutorial)](https://www.youtube.com/watch?v=3aKVArutiIU) — Claude Code CLI for autonomous builds (Section 9)
4. [MCP Complete Explanation](https://www.youtube.com/watch?v=_fzpnqt39jZ) — how MCP connects any tool to any agent (Section 3)

## How to Approach These Projects

- **Start with an MVP.** Build the smallest version that works first — a Research Copilot that does 3-page deep search is better than a 20-page version that never ships. Add polish in v2.
- **Work in public.** Create a public GitHub repo and commit daily, even with WIP ("doesn't crash yet") messages. A commit streak tells a story interviewers can follow.
- **Let agents scaffold, you decide.** Use OpenCode or OMP to generate the first draft of code. Then read every diff, run it, and fix what's wrong. Never commit blindly.
- **Deploy before you're "done."** Get a live URL early — GitHub Pages, Cloudflare Pages, or a free-tier backend. A broken local project teaches nothing; a live one invites feedback.
- **Document as you go.** Add a short `LEARNINGS.md` to your repo with 3 things that surprised you and 2 things you'd do differently next time.

## Project Roadmap

1. [**Online Platform — AI Research Copilot**](01-online-platform.md)
   Build a web app where a user enters a research question, an agent deep-searches the web (20+ pages), and returns a structured report with citations — plus a follow-up chat so the user can ask questions about the report.

2. [**Mobile App — Knowledge Assistant & Study Buddy**](02-mobile-app.md)
   Build a voice-to-knowledge mobile app: record a memo, auto-transcribe + summarize it, and surface relevant past notes when you speak a new topic. Add a spaced-repetition flashcard engine that generates cards from your lecture notes or YouTube transcripts and adapts to your mistakes.

3. [**Local Tool — CLI Assistant & Data Dashboard**](03-local-tool.md)
   Build a single terminal tool that does five things: email summary, calendar check, news briefing, Pomodoro timer, and a system health check — all via agent + MCPs. Then build a privacy-first dashboard that reads your local bank CSV and fitness exports, renders an HTML dashboard, and refreshes daily via cron.

4. [**Post on LinkedIn — Showcase Your Project**](04-linkedin.md)
   Take whichever project you shipped and turn it into a 3-part LinkedIn thread: (1) What I built, (2) The hard part, (3) The code walkthrough. Use an agent to help draft and schedule.

---

## Key Takeaways

- These projects combine everything: agents, MCPs, local LLMs, web/mobile deployment, and content strategy
- The goal is a **shippable artifact** — not a perfect one. A deployed half-finished project teaches more than a perfect local one
- Build in public: a GitHub repo with daily commits is half the value of the project itself
- Reuse earlier sections' tools and videos — don't learn new things just for the capstone

## 📚 Recommended Reading (All References)

1. [Model Context Protocol](https://modelcontextprotocol.io/docs/introduction) — MCP intro and server registry (Section 3)
2. [OpenCode Documentation](https://docs.opencode.com/) — official command reference and MCP setup
3. [Oh My Pi Documentation](https://omp.ohmy.tools/) — global config, hooks, and multi-agent features (Section 7)
4. [Ollama Documentation](https://ollama.com/docs/) — local LLM runtime, model management, and API usage (Section 11)
5. [Hugging Face Inference API](https://huggingface.co/docs/api-inference) — free/open model hosting for transcription and embeddings

---

<!-- Navigation: Bottom -->
← [Back to Main Index](../index.md) | [← Previous Section: Local LLMs](../12-local-llms/index.md) | [Next Section: Appendix →](../appendix/index.md)

[← Main Index](../index.md) | [Section Index](index.md)
