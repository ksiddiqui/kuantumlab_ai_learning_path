<!-- Navigation: Top -->
← [Back to Section Index](00-index.md) | ← [Previous Topic](03-local-tool.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section 12: Project Ideas](00-index.md) → **Post on LinkedIn**

# Post on LinkedIn: Showcase Your Project

> Take any project from this section, build it end-to-end, then write a 3-part LinkedIn thread: (1) What I built, (2) The hard part, and (3) The code walkthrough. Use an agent to help draft and schedule the posts. This is where your learning path pays off — a shipped repo is only half value; telling its story is the other half.

This isn't "growth hacking." It's **documenting real engineering so other people can learn from it** — which is how you build a reputation, attract mentors, and get noticed by recruiters who actually read technical content.

## 📺 Recommended Videos

1. [Learn 80% of Claude Code in 10 Minutes (2026 Tutorial)](https://www.youtube.com/watch?v=3aKVArutiIU) — building projects fast with an agent (Section 9)
2. [oh-my-pi: The Coding Agent With An IDE Inside](https://www.youtube.com/watch?v=0fAMlarIELw) — agent-assisted drafting and scaffolding (Section 7)
3. [MCP Complete Explanation](https://www.youtube.com/watch?v=_fzpnqt39jZ) — the MCP tooling stack you'll describe (Section 3)

> 🎯 **Tip:** Rather than watching these again, skim your own project's `README.md` before drafting. The freshest source of "what was hard" is your own commit history.

## Understanding the 3-Part Series

### Part 1 — What I Built
- **Audience:** Everyone (recruiters, friends, fellow devs, your future self).
- **Goal:** Make someone understand *why this matters* in 3 sentences.
- **Pattern:** "I built X. It solves Y problem. Here's the one thing that surprised me."

### Part 2 — The Hard Part
- **Audience:** Technical peers and hiring engineers.
- **Goal:** Show a real debugging moment — not a generic "it was hard."
- **Pattern:** "I hit problem Z. Here's how I traced it, the wrong fix I tried, and the actual root cause."

### Part 3 — Code Walkthrough
- **Audience:** Devs who want to build something similar.
- **Goal:** Let them copy-paste a piece and have it work.
- **Pattern:** 3 short code snippets with: what it does, why it's structured this way, one gotcha.

> 💡 **Why three parts?** LinkedIn's algorithm favors *series* — people follow the first post to see parts 2 and 3. And readers engage more with a 3-minute post than a 10-minute essay. Bite-sized beats complete.

## Project Breakdown

| Step | Deliverable | Key Skill |
|---|---|---|
| A | Pick a project + gather evidence | Repo screenshots, commit history, live URL |
| B | Write Part 1 (What I Built) | Plain-language storytelling, hook-first |
| C | Write Part 2 (The Hard Part) | Root-cause debugging, honest failure narrative |
| D | Write Part 3 (Code Walkthrough) | Code snippet, structure rationale, gotcha |
| E | Draft + schedule with an agent | LinkedIn automation, image generation |
| F | Post and engage | Reply to comments, reshare positive reactions |

## Step-by-Step Guide

### Step 1: Pick your project and gather evidence

Don't write Part 1 until you have:
- A **live URL** (Vercel, GitHub Pages, or a running local server screenshot).
- 3–4 **commit screenshots** from your repo showing progress (stitch them with Canva).
- The **one moment** that genuinely surprised you. "I expected X, but the agent did Y" is better than "the docs were confusing."

> 📋 **Checklist before you start writing:**
> - [ ] Repo is public on GitHub with a clean README
> - [ ] Live URL works (or you have a screenshot)
> - [ ] You can describe the project in ONE sentence
> - [ ] You remember one specific bug/fix that took >30 min

### Step 2: Draft Part 1 — What I Built

Structure (keep each post ~150–250 words):

```
Hook: I spent 3 days building [project name] — here's what happened.

Context: [1 paragraph] Why I built it. The user problem. Link the problem to a moment other devs recognize.

The thing that surprised me: [1 paragraph] The unexpected insight.

Built with: [bullet list of tools — OpenCode, OMP, Supabase, etc.]

Live: [link]  |  Code: [link]

#AI #BuildInPublic #WebDev
```

**Hook examples that work:**
- "I built a research copilot that reads 20 web pages and writes a report — and the agent hallucinated 3 fake sources on day 1."
- "My voice-to-flashcard app transcribes lectures and turns them into spaced-repetition cards. The hardest part wasn't Whisper — it was the SM-2 algorithm."
- "A terminal assistant that reads your email, calendar, and news in one command. The catch? Everything runs locally — nothing leaves my laptop."

### Step 3: Draft Part 2 — The Hard Part

This is where you earn credibility. Pick ONE moment:

```
The problem: [What broke? Be specific: "pgvector returned empty results", not "the search didn't work"]

What I tried first (wrong): [Show the wrong hypothesis and fix. This normalizes failure.]

The actual root cause: [Use `console.log` / `EXPLAIN ANALYZE` / reading the MCP server logs — show your debugging process, not just the fix.]

The fix: [3 lines of code or a config change]

Lesson: [One sentence future-you will remember]

#Debugging #Engineering #BuildInPublic
```

> 🛠 **Agent help here:** Have an agent summarize your commit history for moments where a commit message says "fix" or "broken":

```bash
git log --oneline | grep -iE "fix|bug|broken|correct|oops"
```

That list is your "hard part" shortlist.

### Step 4: Draft Part 3 — Code Walkthrough

Show 3 snippets (not one big block). For each: **what it does → why it's structured this way → one gotcha.**

```
Snippet 1: [The agent prompt template]
- What it does: Defines the Researcher persona so the agent doesn't loop.
- Why this structure: XML tags make it scannable; `{{QUESTION}}` is a variable the CLI fills in.
- Gotcha: Without the `--max-tokens` cap, the agent extracted 50 pages and ran out of budget.

Snippet 2: [The pgvector cosine match]
- What it does: Finds the 3 most similar notes to a new query.
- Why this structure: The `match_threshold` filter prevents irrelevant junk from surfacing.
- Gotcha: If the embedding dimension is 384 but the column is 768, every query returns zero rows — and there's no error.

Snippet 3: [The SM-2 scheduler]
- What it does: Schedules when each flashcard reappears.
- Why this structure: Wrong answers reset `interval` to 1; correct answers scale by `ease`.
- Gotcha: `ease` can dip below 0.1 if you never clamp it — add the clamp.
```

> 💡 **Don't** post screenshots of terminal output without explaining the line. **Do** explain one non-obvious decision per snippet.

### Step 5: Use an agent to draft and schedule

You just learned MCPs — use this opportunity to automate your own content creation. Install a LinkedIn MCP or use a scheduling tool:

```bash
# If you use the LinkedIn automation MCP (via Composio):
composio login
composio add linkedin
```

Then prompt your agent:

```xml
<task>
You are a LinkedIn content strategist. Turn my project notes into a 3-part thread.
</task>

<instructions>
1. Read the project README and the "hard part" notes I provide.
2. Write Part 1 (What I built), Part 2 (The hard part), and Part 3 (Code walkthrough) as separate LinkedIn posts.
3. Keep each under 250 words. Hook in the first line. Include 3–5 relevant hashtags.
4. Output as markdown, one post per section. Do NOT post yet — just draft.
</instructions>

<project_notes>{{README}}</project_notes>
```

Review the draft, tweak the hook if it feels generic, then schedule for posting.

### Step 6: Post and engage

- Post Part 1 on a **Tuesday or Wednesday, 8–10 AM** in your local timezone (highest engagement window).
- Add Part 2 the next day, Part 3 the day after.
- **Reply to every comment** within 2 hours — LinkedIn's algorithm rewards early engagement.
- Reshare any positive reactions ("Good stuff!" / "How did you...") as story highlights so recruiter-eyes see social proof.

## Common Pitfalls

- ❌ **Vague "hard part"** — "Debugging was hard" gets no engagement. Fix: name a specific error message and the one-line fix.
- ❌ **Code snippets with no explanation** — readers copy-paste and it doesn't work. Fix: add "Why this structure" + "Gotcha" under each snippet.
- ❌ **Posting all 3 parts on the same day** — the series loses momentum. Fix: space them 1–2 days apart.
- ❌ **No visual** — text-only posts get ~40% engagement of image posts. Fix: one screenshot per part (repo, live app, code snippet). Use Canva's free "LinkedIn post" template.
- ❌ **Over-explaining in Part 1** — Hook + 1 paragraph + links only. Save the tech details for Parts 2 and 3.
- ❌ **Never replying to comments** — the thread dies without engagement. Set a 2-hour window to reply.

## Quick Reference

| Task | Tool / Command |
|---|---|
| Create LinkedIn post | Native LinkedIn composer, or `composio add linkedin` for MCP |
| Generate post image | Canva free template: "LinkedIn Post" (1200×627) |
| Schedule posts | LinkedIn native scheduler (free), or Buffer/Hootsuite |
| Draft with agent | `opencode --prompt-file prompts/linkedin-draft.md` |
| Best post time | Tue/Wed 8–10 AM local |
| Hashtag rule | 3–5 relevant tags, not 20 |
| Git hard-part scan | `git log --oneline \| grep -iE "fix|bug|broken"` |

## Key Takeaways

- **Stories beat specs.** "I built X in 3 days" is forgettable. "Agent hallucinated 3 fake sources, here's how I fixed it" gets replies.
- **Three posts, not one.** The algorithm favors series. Each part should be scannable in under a minute.
- **Use the tools you just learned.** Have an agent draft the thread, use Canva for images, use git history to find the "hard part." This closes the loop on the whole learning path.
- **Engagement is a 2-hour window.** Post, then reply to comments fast. That's what the algorithm rewards.
- **This is the portfolio multiplier.** A repo is worth 1 point. A LinkedIn thread about that repo is worth 10 — because it's where recruiters, mentors, and future collaborators actually discover you.

## 📚 Recommended Reading (Platform Docs)

1. [LinkedIn Help: Create and schedule posts](https://www.linkedin.com/help/linkedin/answer/44) — native scheduler and best practices
2. [Composio Documentation](https://docs.composio.dev/) — LinkedIn MCP integration and authentication
3. [Canva: LinkedIn Post Templates](https://www.canva.com/templates/posts/linkedin-post/) — free image templates (1200×627)
4. [Buffer: Best Times to Post on LinkedIn](https://buffer.com/resources/linkedin-scheduling/) — engagement data and scheduling strategy
5. [Houston: How We Built This](https://hubs.ly/houston-how-we-built-this) (reference) — the blog template this 3-part pattern borrows from

---

<!-- Navigation: Bottom -->
← [Back to Section Index](00-index.md) | ← [Previous Topic](03-local-tool.md)

[← Main Index](../00-index.md) | [Section Index](00-index.md)
