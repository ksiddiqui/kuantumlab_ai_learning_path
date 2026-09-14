# Assignment Solutions

> Full solutions for the 10 assignments in the learning path. Each solution includes: problem restatement, step-by-step resolution, key code snippets, and lessons learned.

---

## Assignment 1: Fix the Agent

**Problem:** OpenCode generated a Python script that has 3 bugs (logic, edge case, and a crash).

### Solution Steps

1. **Run the script** to reproduce the crash:
   ```bash
   python buggy_script.py
   ```
   Output shows: `ZeroDivisionError` when `total_reviews == 0`.

2. **Bug 1 — Logic Error (Line 15):**
   The rating average is computed as `sum(ratings) / count` but the variable `count` was never updated inside the loop. It stays at 0.
   **Fix:** Use `len(ratings)` instead of `count`.

3. **Bug 2 — Edge Case (Line 28):**
   When `ratings` is an empty list, the script crashes.
   **Fix:** Add a guard clause:
   ```python
   if not ratings:
       return {"average": 0, "count": 0}
   ```

4. **Bug 3 — Crash on Invalid JSON:**
   The script reads a JSON file but doesn't handle malformed data.
   **Fix:** Wrap `json.load()` in try/except:
   ```python
   try:
       data = json.load(f)
   except json.JSONDecodeError:
       print("Invalid JSON file")
       return {}
   ```

### Lessons Learned
- Always test with edge cases (empty input, malformed data)
- Agent-generated code often skips defensive checks
- Running the script is the fastest way to find issues

---

## Assignment 2: Skill Installation

**Problem:** Install and configure 3 MCP servers of your choice.

### Solution Steps

1. **MCP 1 — Web Search (Exa):**
   ```bash
   npm install -g @modelcontextprotocol/server-exa
   ```
   Add to OpenCode config:
   ```yaml
   mcp:
     - name: exa-search
       command: npx
       args: ["-y", "@modelcontextprotocol/server-exa"]
       env:
         EXA_API_KEY: "your-exa-api-key"
   ```

2. **MCP 2 — Filesystem:**
   ```bash
   npm install -g @modelcontextprotocol/server-filesystem
   ```
   Config:
   ```yaml
   mcp:
     - name: filesystem
       command: npx
       args: ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents"]
   ```

3. **MCP 3 — Google Drive:**
   ```bash
   pip install mcp-gdrive
   ```
   Config:
   ```yaml
   mcp:
     - name: google-drive
       command: python3
       args: ["-m", "mcp_gdrive"]
       env:
         GOOGLE_APPLICATION_CREDENTIALS: "path/to/credentials.json"
   ```

4. **Test each MCP:**
   ```
   OpenCode → type: "List files in my Documents folder" (filesystem)
   OpenCode → type: "Search the web for 'latest AI news'" (Exa)
   ```

### Lessons Learned
- Each MCP needs its own authentication method
- Always check the MCP's GitHub README for config examples
- Test MCPs one at a time before combining them

---

## Assignment 3: Custom Prompt Library

**Problem:** Create a prompt library with 5 templates for different agent tasks.

### Solution Structure
```
prompts/
├── research_react.md
├── code_review.md
├── email_response.md
├── data_analysis.md
└── content_rewrite.md
```

### Template 1 — `research_react.md`
```xml
<task>
You are a research assistant. Your goal is to find, analyze, and synthesize information from the web.
</task>

<instructions>
1. Search for the topic using the web search tool
2. Read the top 5 results using the page reader tool
3. Identify key findings, controversies, and data points
4. Write a structured report with:
   - Executive Summary (2-3 sentences)
   - Key Findings (bullet points)
   - Data/Statistics (with sources)
   - Contradictions or Open Questions
</instructions>

<topic>{{TOPIC}}</topic>
<output_format>Markdown file in docs/</output_format>
<constraints>
- Cite at least 3 sources
- Do not fabricate data
- If uncertain, state confidence level
</constraints>
```

### Template 2 — `code_review.md`
```xml
<task>
Review the code in the file(s) provided. Focus on correctness, readability, and edge cases.
</task>

<instructions>
1. Read each file thoroughly
2. Check for: bugs, edge case handling, naming clarity, code duplication
3. List issues in order of severity (high, medium, low)
4. For each issue, provide:
   - The problem
   - Where it occurs (file + line)
   - A suggested fix with code
</instructions>

<files>{{FILES}}</files>
<output_format>Comment on the pull request or write to reviews/{{DATE}}.md</output_format>
```

### Lessons Learned
- XML tags make prompts scannable for both humans and agents
- Templates should specify output format explicitly
- Version control prompts like code — they evolve over time

---

## Assignment 4: Web Scraping Pipeline

**Problem:** Build a pipeline that searches for "AI agent news", extracts content, and saves to markdown.

### Solution Steps

1. **Install MCPs:**
   - Web search MCP (SerpAPI or Exa)
   - Web scraping MCP (Firecrawl or Jina)

2. **Compose the prompt:**
   ```
   Search the web for "AI agent news October 2025". For each of the top 5 results, extract the full article content. Summarize each article in 3 bullet points. Save all to docs/ai_agent_news.md with sources cited.
   ```

3. **Expected output format (in markdown):**
   ```markdown
   # AI Agent News — October 2025

   ## Article 1: [Title](URL)
   **Source:** SiteName | **Date:** 2025-10-10

   - Bullet point 1
   - Bullet point 2
   - Bullet point 3

   ---

   ## Article 2: ...
   ```

### Lessons Learned
- Chain MCP tools: search → read → extract → write
- Always check if a URL is accessible before scraping
- Save intermediate results so you can resume if a step fails

---

## Assignment 5: Email Research Report

**Problem:** Use Gmail MCP to find emails about a topic, summarize, export to markdown.

### Solution Steps

1. **Set up Gmail MCP:**
   ```bash
   pip install mcp-gmail
   ```
   Config in OpenCode:
   ```yaml
   mcp:
     - name: gmail
       command: python3
       args: ["-m", "mcp_gmail"]
   ```

2. **Authenticate:** Follow OAuth flow — save credentials to `~/.gmail-mcp/credentials.json`

3. **Search query prompt:**
   ```
   Search my Gmail for emails where the subject or body contains "cloud billing" sent in the last year. List 10 most relevant, with sender, date, and a one-line summary.
   ```

4. **Summarization prompt:**
   ```
   Read the 5 most recent emails from the previous search. For each, summarize: key topic, action items, sender intent, and any deadlines mentioned. Save to docs/cloud_billing_emails.md.
   ```

### Lessons Learned
- Gmail search syntax: `subject:"cloud billing" after:2024/01/01`
- OAuth credentials must be kept secure — never commit to git
- Start with a small time window, then expand scope

---

## Assignment 6: Local Environment Audit

**Problem:** Write prompts that audit disk, memory, CPU, and generate a health report.

### Solution Steps

1. **MCP needed:** Built-in bash/shell tool (no external MCP required)

2. **Prompt for disk audit:**
   ```
   Run the following commands and compile results into a table:
   - df -h  (disk usage by partition)
   - du -sh /Users/*/Documents 2>/dev/null | sort -rh | head -10  (top 10 largest folders)
   - brew cleanup  (clean cache — simulate with echo if you want)
   Report: total disk used, largest folders, whether cleanup is recommended.
   ```

3. **Prompt for memory/process audit:**
   ```
   Check system resources:
   - vm_stat (memory usage on macOS) or free -h (Linux)
   - ps aux | sort -rk 3,3 | head -10 (top 10 CPU processes)
   Report which process is using the most CPU and whether it's unusual.
   ```

4. **Final health report prompt:**
   ```
   Based on all collected data, write a system health report to docs/system_health_report.md with:
   - Disk Status: OK/Warning/Critical
   - CPU Usage: OK/Warning/Critical
   - Memory: OK/Warning/Critical
   - Recommendations (if any)
   ```

### Lessons Learned
- Use `2>/dev/null` to suppress permission errors in shell scripts
- Format output as markdown tables for readability
- Add safety checks before running destructive commands (`rm`, `brew cleanup`)

---

## Assignment 7: Research Report Generator

**Problem:** Create a 5-section research report on a topic of your choice in PDF format.

### Solution Steps

1. **Topic selection example:** "The State of AI Agents in 2025"

2. **Sections:**
   1. Executive Summary
   2. Current Landscape (what agents exist today)
   3. Key Technologies (LLMs, planning, tool use, memory)
   4. Limitations & Challenges (hallucination, cost, reliability)
   5. Future Outlook (trends, predictions, timeline)

3. **Workflow:**
   - Use Exa or SerpAPI MCP for web search
   - Use Firecrawl MCP to extract full articles
   - Use Claude/LLM to summarize each source
   - Compile into a markdown document
   - Convert to PDF using a markdown-to-PDF MCP or `pandoc`

4. **Prompt template:**
   ```
   You are a research writer. Research "{{TOPIC}}" thoroughly by searching the web and reading at least 15 high-quality sources (papers, articles, blog posts). Synthesize findings into a 5-section report:
   1. Executive Summary
   2. Current Landscape
   3. Key Technologies
   4. Limitations & Challenges
   5. Future Outlook
   Save as docs/{{TOPIC_SLUG}}.md, then convert to PDF.
   ```

### Lessons Learned
- Reading 15+ sources takes 2-3 agent iterations — break into batches
- Use a "source tracker" table to avoid duplicating effort
- PDF generation is an extra step — use `wkhtmltopdf` or `pandoc`

---

## Assignment 8: Deploy a Microsite

**Problem:** Create and deploy a single-page website using GitHub Pages or Cloudflare Pages.

### Solution Steps

1. **Generate the website:**
   ```
   Create a single HTML file with:
   - A hero section with my name, title, and a short tagline
   - A projects section with 3 project cards (image, title, description, link)
   - A contact section with a form (use Formspree for no-backend forms)
   - Responsive design (mobile-friendly)
   - A dark/light mode toggle
   Save as index.html
   ```

2. **Local testing:**
   ```bash
   npx serve .  # serves on http://localhost:3000
   ```

3. **Deploy to GitHub Pages:**
   - Create a new public repo: `username.github.io`
   - Commit the file:
     ```bash
     git init
     git add index.html
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/username/username.github.io.git
     git push -u origin main
     ```
   - Enable GitHub Pages in repo settings → "Deploy from branch: main"

4. **Verify:** Visit `https://username.github.io` — site should be live within 1-2 minutes.

### Lessons Learned
- GitHub Pages is truly free but limited to static files (no backend)
- Formspree gives you a free form endpoint without writing a server
- Use `<meta name="viewport" content="width=device-width, initial-scale=1">` for mobile
- Add a `CNAME` file if using a custom domain

---

## Assignment 9: Custom MCP Server

**Problem:** Build a simple MCP server that wraps a public API.

### Solution Steps

1. **Choose an API:** [JokeAPI](https://sv443.net/jokeapi/v2/) — returns random jokes

2. **Set up the project:**
   ```bash
   mkdir mcp-joke-server
   cd mcp-joke-server
   python3 -m venv .venv
   source .venv/bin/activate
   pip install mcp httpx
   ```

3. **Create `server.py`:**
   ```python
   from mcp.server.fastapi import serve
   import httpx
   from mcp.server.models import Tool

   async def get_joke() -> str:
       async with httpx.AsyncClient() as client:
           resp = await client.get("https://v2.jokeapi.dev/joke/Any")
           data = resp.json()
           if data.get("error"):
               return "Failed to fetch joke"
           if data.get("setup"):
               return f"{data['setup']}\n\n{data['punchline']}"
           return data.get("joke", "No joke found")

   # Register the tool
   TOOLS = [
       Tool(
           name="random_joke",
           description="Fetches a random joke from JokeAPI",
           inputSchema={"type": "object"},
           handler=get_joke,
       )
   ]

   if __name__ == "__main__":
       serve(TOOLS)
   ```

4. **Register in OpenCode config:**
   ```yaml
   mcp:
     - name: joke-api
       command: python3
       args: ["server.py"]
       cwd: /path/to/mcp-joke-server
   ```

5. **Test:**
   ```
   OpenCode → "Tell me a joke"
   ```

### Lessons Learned
- The MCP SDK handles the boilerplate — you just define tools
- Async handlers are recommended for API calls
- Always handle API errors gracefully
- Test locally before registering globally

---

## Assignment 10: Multi-Agent Challenge

**Problem:** Create 2 custom agents with different personas that collaborate on a task.

### Solution Steps

1. **Define the task:** "Produce a 3-page analysis of the pros/cons of remote work for software engineers."

2. **Agent 1 — Researcher (`researcher.yaml`):**
   ```yaml
   agent:
     name: researcher
     description: "You find and read web content on any topic. You prioritize quality sources: academic papers, industry reports, and reputable blogs. You extract key data points and summarize findings clearly."
     model: openrouter/deepseek/deepseek-chat
     tools:
       - web_search
       - web_extract
     instructions: |
       1. Search for 10 high-quality sources on remote work
       2. Read each and extract: statistics, expert quotes, pros/cons mentioned
       3. Save all findings to docs/research_notes.md
   ```

3. **Agent 2 — Writer (`writer.yaml`):**
   ```yaml
   agent:
     name: report-writer
     description: "You write clear, structured reports. You take research notes and turn them into well-organized, professional documents with executive summaries, sections, and conclusions."
     model: openrouter/deepseek/deepseek-chat
     tools:
       - filesystem_read
       - filesystem_write
     instructions: |
       1. Read docs/research_notes.md
       2. Write a 3-page analysis with:
          - Executive Summary
          - Remote Work Benefits (with stats)
          - Remote Work Challenges (with stats)
          - Conclusion & Recommendations
       3. Save to docs/remote_work_analysis.md
   ```

4. **Orchestration prompt:**
   ```
   Run the 'researcher' agent with topic "remote work pros cons software engineers".
   Then run the 'writer' agent to produce the analysis report.
   ```

### Lessons Learned
- Each agent should have a narrow, well-defined role
- Pass data between agents via files (more reliable than shared state)
- Test each agent independently first
- Document what each agent does for future reuse

---

## Capstone Project Solution: AI Meeting Assistant

**Project:** Read Zoom/GMeet transcripts → notes → action items → dashboard

### Architecture Overview
```
transcript.txt → Researcher Agent → notes.md
notes.md → Summarizer Agent → action_items.json
action_items.json → Dashboard Agent → dashboard.html
```

### Skills Used
- Web search MCP (for follow-up research)
- Filesystem MCP (for reading/writing files)
- Email MCP (for sending summaries)
- Deployment MCP (GitHub Pages / Cloudflare Pages)
- Custom summarization prompt library

### Lessons Learned
- Break complex workflows into agent-specialized steps
- Use files as the communication layer between agents
- Add error handling: if one agent fails, the pipeline should degrade gracefully
- Track cost per agent to optimize the workflow
```

---

← [Back to Section Index](index.md) | [← Back to Main Index](../index.md)
