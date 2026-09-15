<!-- Navigation: Top -->
← [Back to Section Index](00-index.md) | [Next Topic →](02-mobile-app.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section 12: Project Ideas](00-index.md) → **AI Research Copilot**

# AI Research Copilot

> Build a web app where a user enters a research question, an agent deep-searches the web (20+ pages), and returns a structured report with citations — plus a "follow-up" chat so the user can question the results. Deploy it to a live URL and export reports to PDF.

This is the flagship capstone project. It chains together almost everything from the learning path: an autonomous agent, multiple MCPs (search + deep extraction), a frontend, a backend/auth layer, and PDF report generation. Shipped correctly, it's the single most impressive repo you can put on your resume right now.

> 💡 **Scope note:** The topic tree also lists an *Automated Job Application Agent* under "Online Platform." That's a great variant (email + resume generation + LinkedIn outreach), but its core is the same stack. Build the Research Copilot first; port the pattern to the job-application agent as a stretch goal.

## 📺 Recommended Videos

These are the section videos that cover the tools this project uses — revisit them as needed rather than searching for new ones.

1. [OpenCode Tutorial for Beginners: Setup, Agents, Skills & MCP](https://www.youtube.com/watch?v=uZGDO0L-Dr4) — setting up MCPs with OpenCode (Section 1)
2. [Ultimate MCP Tutorial | Learn Model Context Protocol](https://www.youtube.com/watch?v=DAuZuj0BUZA) — search + extraction MCPs in action (Section 3)
3. [How to Run Local LLMs with Ollama](https://www.youtube.com/watch?v=qwdFfEc7wME) — running summarisation locally to save API costs (Section 11)

## Understanding the AI Research Copilot

### What It Is?
- A full-stack web app with two modes: **Deep Search** (user asks a question, the agent returns a structured report) and **Follow-up Chat** (the user asks questions about that report and gets cited answers).
- Under the hood, "Deep Search" is an agent workflow: search → read 20+ pages → extract key facts → synthesize into sections → format as markdown with citations.

### Why It Matters
- It's the "killer demo" for any AI agent: a user types one question and gets a 10-page report back. Interviewers immediately understand the value.
- It forces you to chain multiple tools reliably — the #1 job skill for AI engineers.
- The follow-up chat layer adds **retrieval-augmented generation (RAG)** on top of your own report, which is the exact pattern real products use.

### What You'll Combine
| Layer | Tool | Why |
|---|---|---|
| Agent orchestration | OpenCode or OMP | Runs the research loop autonomously |
| Web search MCP | Exa or SerpAPI | Finds the top sources for a query |
| Deep extraction MCP | Firecrawl or Defuddle | Reads full article content (not just titles) |
| Backend + auth | Supabase | User accounts, report storage, chat history |
| Frontend | Next.js (App Router) | Responsive UI with streaming answers |
| PDF export | pandoc or wkhtmltopdf | Turn the markdown report into a downloadable PDF |
| Hosting | Vercel (free tier) | Deploys Next.js with zero-config |

## Project Breakdown

The project has four phases. Each is independently deployable.

### Phase A — The Research Agent (CLI-first)
Build the agent logic as a CLI you can run locally *before* building the web UI. This isolates the hard part (chained tool calls) from deployment headaches.

### Phase B — Report Generation
Convert the agent's markdown output into a structured, cited report and a PDF.

### Phase C — Web App
Wrap the agent in a Next.js frontend with Supabase auth and a report history.

### Phase D — Follow-up Chat (RAG)
Index each report so the user can ask follow-up questions answered *only* from that report, with inline citations.

## Step-by-Step Guide

### Step 1: Scaffold the project

Start with a Next.js project so the frontend and API routes live together:

```bash
npx create-next-app@latest research-copilot \
  --typescript --tailwind --app --eslint
cd research-copilot
```

Create a Supabase project at [supabase.com](https://supabase.com) and wire up auth:

```bash
npm install @supabase/supabase-js
npx supabase init
npx supabase link --project-ref <your-ref>
```

> 📋 **Schema sketch:** You'll need a `reports` table (`id, user_id, question, report_md, pdf_url, created_at`) and a `chats` table (`id, user_id, report_id, role, content, created_at`). Create these with `supabase db push`.

### Step 2: Configure the search + extraction MCPs

Register the MCPs your agent needs. In OpenCode (`~/.opencode.json`):

```jsonc
{
  "mcp": [
    {
      "name": "exa-search",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-exa"],
      "env": { "EXA_API_KEY": "YOUR_EXA_KEY" }
    },
    {
      "name": "firecrawl",
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": { "FIRECRAWL_API_KEY": "YOUR_FIRECRAWL_KEY" }
    }
  ]
}
```

> 🔐 Get free keys: [Exa](https://dashboard.exa.ai/) has a free tier; [Firecrawl](https://www.firecrawl.dev/) does too. Both are in the [resource directory](../appendix/00-index.md#a-resource-directory-all-free-or-20).

### Step 3: Write the Researcher agent persona

Create `prompts/researcher.md` — a reusable prompt template (like Assignment 3). This is the prompt you'll hand to OpenCode/OMP every time the agent runs:

```xml
<task>
You are a research agent. Your job is to answer the user's question thoroughly using web search and deep extraction.
</task>

<instructions>
1. Ask the user for a research question (or use the one provided).
2. Use the web search tool to find 10-15 high-quality sources (academic, news, documentation).
3. For each result, extract the FULL article content using the extraction tool.
4. Read each extracted article and highlight: key claims, supporting data, dates, and any contradictions.
5. Synthesize everything into a structured markdown report with these sections:
   - Executive Summary (2-3 sentences)
   - Current Landscape (what exists today)
   - Key Findings (bullet points with sources)
   - Data & Statistics (with citations)
   - Contradictions or Open Questions
   - Future Outlook
6. Every claim must link to a source. If an article doesn't support a claim, remove it.
</instructions>

<question>{{QUESTION}}</question>
<output_format>Markdown file saved to docs/reports/{{SLUG}}.md</output_format>
<constraints>
- Cite at least 8 distinct sources
- Do NOT fabricate data or quotes
- If a source is paywalled, note it and move on
- Stop and ask if the question is unclear
</constraints>
```

### Step 4: Run the agent and capture the report

Run OpenCode with the persona and a concrete question:

```bash
opencode --prompt-file prompts/researcher.md \
  --var QUESTION="What are the latest advances in multimodal LLMs in 2025?"
```

The agent should: search → extract 15+ pages → write `docs/reports/multimodal-llms-2025.md`.

> 🛠 **If the agent loops**, add a `--max-tokens` cap or split into two prompts: (1) "find and extract sources" then (2) "write the report from this data." Agents fail less when each step has a bounded goal.

### Step 5: Generate the PDF report

Convert the markdown to a styled PDF. `pandoc` is the most reliable:

```bash
sudo apt install pandoc texlive-xetex   # or brew install pandoc basictex
pandoc docs/reports/multimodal-llms-2025.md \
  -o public/reports/multimodal-llms-2025.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=11pt
```

Upload the PDF to the Supabase `reports` table (`pdf_url` column) so the frontend can offer it for download.

### Step 6: Build the web frontend

Create the main page with a search box and report list. The core API route calls the agent:

```ts
// app/api/research/route.ts
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const { question, userId } = await req.json()
  // Trigger the agent via CLI or OMP API
  // Stream results back to the client
  return new Response(
    JSON.stringify({ status: 'started' }),
    { headers: { 'Content-Type': 'application/json' } }
  )
}
```

Wire the chat component to the follow-up endpoint (Phase D). Use [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming responses if you want to level up.

### Step 7: Add follow-up chat (RAG over your report)

This is the part that makes the project *stand out*. Instead of re-searching the web for every follow-up question, answer from the saved report:

1. After the report is saved, split it into chunks (by heading).
2. Generate embeddings for each chunk (local with `sentence-transformers/all-MiniLM-L6-v2` via Ollama or the free HF API).
3. Store chunks + embeddings in Supabase (`pgvector`).
4. On follow-up, embed the user's question, find the top-3 matching chunks, and prompt the agent to answer *only* from those chunks — citing them inline.

```ts
// Simplified: similarity search over report chunks
const { data: chunks } = await supabase
  .from('report_chunks')
  .select('content, citation')
  .select('embedding', embedding)  // vector match
  .limit(3)
```

### Step 8: Deploy

```bash
git init && git add -A && git commit -m "feat: research copilot with PDF export"
npx vercel --prod      # deploys Next.js to a live URL
```

Set the Exa, Firecrawl, and Supabase env vars in the Vercel dashboard. Your app is now live with a free URL (`research-copilot.vercel.app`).

## Common Pitfalls

- ❌ **The agent never finishes** — unbounded research loops forever. Fix: cap the number of sources (e.g., "extract exactly 12 pages, no more") and set a token limit.
- ❌ **Reports read like a list of links** — low signal-to-noise. Fix: the persona must *synthesize*, not just paste. Make "Executive Summary" and "Synthesis" required sections.
- ❌ **Citations point to the wrong paragraph** — Fix: require the agent to embed `[^1]`-style footnotes next to each claim and list the URL under each footnote.
- ❌ **PDF export fails on special characters** — Fix: install `texlive-xetex` (handles unicode) and pass `--pdf-engine=xelatex`; or use `weasyprint` (pure Python, no LaTeX).
- ❌ **Deploying exposes API keys** — Fix: load all keys via `process.env` on the server side only; never send Exa/Firecrawl keys to the browser.

## Quick Reference

| Task | Command |
|---|---|
| Create Next.js app | `npx create-next-app@latest --typescript --app` |
| Install OpenCode | `npm install -g @anthropic-ai/claude-code` or `npm i -g @opencode-ai/opencode` |
| Install Exa MCP | `npm install -g @modelcontextprotocol/server-exa` |
| Install Firecrawl MCP | `npm install -g firecrawl-mcp` |
| Convert MD → PDF | `pandoc report.md -o report.pdf --pdf-engine=xelatex` |
| Deploy to Vercel | `npx vercel --prod` |
| Run agent with prompt file | `opencode --prompt-file prompts/researcher.md --var QUESTION="..."` |

## Key Takeaways

- The Research Copilot combines **agent orchestration** (MCPs), **full-stack** (Next.js + Supabase), and **RAG** (follow-up chat) — three in-demand skills in one repo.
- Build the **agent logic first as a CLI**, then wrap it in a web UI. This separates the hard part (reliable tool chaining) from deployment.
- **PDF export** and **citations** are the details that make a project look polished and interview-ready.
- The **follow-up chat** (RAG over your own report) is the differentiator that turns a demo into a product.

## 📚 Recommended Reading (Platform Docs)

1. [OpenCode Documentation](https://docs.opencode.com/) — CLI commands, MCP config, agent workflows
2. [Model Context Protocol: Building MCP Servers](https://modelcontextprotocol.io/quickstart/server) — official Python MCP server quickstart
3. [Exa API Documentation](https://docs.exa.ai/) — search and extraction API reference and free tiers
4. [Firecrawl Documentation](https://docs.firecrawl.dev/) — deep page extraction and crawling API
5. [Next.js Documentation](https://nextjs.org/docs) — App Router, API routes, and deployment
6. [Supabase Documentation](https://supabase.com/docs) — auth, database (pgvector), and storage
7. [Vercel AI SDK](https://sdk.vercel.ai/docs) — streaming chat UI components and LLM providers
8. [Pandoc Documentation](https://pandoc.org/) — markdown-to-PDF conversion and templates

---

<!-- Navigation: Bottom -->
← [Back to Section Index](00-index.md) | [Next Topic →](02-mobile-app.md)

[← Main Index](../00-index.md) | [Section Index](00-index.md)
