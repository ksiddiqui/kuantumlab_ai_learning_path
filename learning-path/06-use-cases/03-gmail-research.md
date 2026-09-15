← [Back to Section Index](00-index.md) | ← [Previous Topic](02-web-research-report.md) | [Next Topic →](04-deploy-website.md)

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Gmail Inbox Topic Research**

---

# Use-Case 3: Gmail Inbox Topic Research + Summarization

> **Search your Gmail for all emails mentioning a specific topic, summarize the key discussions, and compile a list of pending action items — fully automated by an AI agent.**

## 📺 Recommended Videos

1. [MCP Complete Explanation](https://www.youtube.com/watch?v=_fzpnqt39jZ) — Model Context Protocol overview (Gmail MCP uses this protocol)
2. [How Model Context Protocol (MCP) actually works](https://www.youtube.com/watch?v=cGuyrANVi4A) — MCP architecture deep dive
3. [Ultimate MCP Tutorial \| Learn Model Context Protocol](https://www.youtube.com/watch?v=DAuZuj0BUZA) — hands-on MCP server setup

## Understanding Gmail Research Automation

> Instead of manually searching Gmail and skimming 50+ emails, you give an agent a research question like "find all billing discussions with my AWS account manager." The agent's Gmail MCP searches your inbox, reads each relevant message, summarizes the discussions, and extracts action items — all in a few minutes.

### What Is It?

- A **Gmail MCP** connects the agent to your Google account via OAuth 2.0, letting it search, read thread contents, and (optionally) draft or send replies.
- The agent applies **natural-language search** ("emails about AWS billing from Q4") rather than requiring exact Gmail search syntax.
- After reading the results, the agent produces:
  - A **topic summary** — what was discussed, who was involved, key decisions made.
  - An **action items list** — who needs to do what, by when.

### Why You Need This

- **Information overload** is the defining problem of modern email. An agent that can surface the signal from the noise saves hours per week.
- **Knowledge transfer** — when you leave a project or join a team, your email threads contain tacit knowledge that is never written down. An agent can extract that into a readable brief.
- This workflow introduces **OAuth authentication** — the skill you will need for every API-based MCP (Slack, GitHub, Notion, etc.).

## Before You Start

**Setup required:**
- Gmail MCP installed and configured — see [Section 3](01-local-machine.md) for MCP installation steps
- Google account with email history (personal or work)
- A research topic to search for (e.g., "cloud billing," "project Orion," "conference 2025")

**Security notes:**
- The Gmail MCP only needs **read** access for this walkthrough. Decline any scope requesting send/compose unless you explicitly want draft-generation.
- OAuth tokens are stored locally (usually `~/.oauth/`). Never commit them to git.

## Step-by-Step Guide

### Step 1: OAuth Setup for Gmail API

**Prompt:**
```text
Help me set up the Gmail MCP. I need to:
1. Enable the Gmail API in Google Cloud Console
2. Create OAuth 2.0 credentials (client ID and secret)
3. Download the credentials JSON file
4. Run the MCP's auth flow to get a refresh token

Show me each step with the exact URLs and console clicks needed. Do not proceed past step 2 without my confirmation, since I need to handle the browser login myself.
```

**What the agent does:**
1. Provides the URL to Google Cloud Console (`https://console.cloud.google.com/`) and the exact navigation path: APIs & Services → Library → "Gmail API" → Enable.
2. Guides you to APIs & Services → Credentials → Create Credentials → OAuth client ID → select "Desktop app."
3. Instructs you to download `credentials.json` and place it where the Gmail MCP expects it (usually the MCP's config directory).

> 💡 **Tip:** You only do the browser login once per Google account. The refresh token persists for ~6 months.

### Step 2: Search Emails on a Specific Topic

**Prompt:**
```text
Using the Gmail MCP, search my inbox for all emails about "AWS billing" from the last 6 months. Return:
- The number of matching threads
- The sender name and email for each thread
- The subject line of the first message in each thread
- The date of the most recent message in each thread
- The approximate length (number of replies) in each thread

Format as a table and save the results to `gmail_search_results.md`.
```

**What the agent does:**
1. Calls the Gmail MCP's `search` function with the query `AWS billing` and a date filter.
2. For each matching thread, extracts the metadata listed above.
3. Writes the table to a markdown file.

**Expected output:**
```markdown
## Gmail Search: "AWS billing" (last 6 months)

**Total threads found:** 12

| # | Sender | Subject | Last Date | Replies |
|---|---|---|---|---|
| 1 | cloud-billing@amazon.com | AWS Billing: Invoice for September 2025 | 2025-10-02 | 3 |
| 2 | sarah@acmecorp.com | Q3 AWS spend review — action needed | 2025-09-28 | 7 |
| 3 | billing-alerts@amazon.com | AWS Budgets Alert: Monthly | 2025-09-15 | 1 |
```

### Step 3: Summarize Key Discussions and Extract Action Items

**Prompt:**
```text
Read the full content of the top 8 threads from my search results. For each thread, produce:
- A 3-sentence summary of what was discussed
- A list of who said they would do something (name + action + deadline if mentioned)
- Any dollar amounts, invoice numbers, or project codes mentioned

Then, produce an overall summary of the "AWS billing" topic: what are the recurring themes, what is the total spend mentioned, and what decisions were made?
```

**What the agent does:**
1. Reads the full text of each thread via the Gmail MCP (using thread IDs from Step 2).
2. For each thread, identifies commitments and deadlines using natural-language understanding.
3. Writes a consolidated summary.

**Expected output:**
```markdown
## Thread Summaries

### Thread 1: "AWS Billing: Invoice for September 2025"
**Summary:** AWS sent the September invoice totaling $3,847. Sarah questioned the EC2 charge spike and is waiting for finance approval. The invoice was marked paid on Oct 2.

**Action items:**
- Sarah Kim (sarah@acmecorp.com): Approve EC2 charge explanation — no deadline stated
- finance@acmecorp.com: Process payment — completed (Oct 2)

**Key details:** Invoice #INV-92837, $3,847.12, project code ORION-BACKEND

---

## Overall Topic Summary

Recurring themes:
1. Monthly cost spikes from EC2 auto-scaling during load tests
2. Questions about reserved instance application
3. Finance approval delays of 3-5 days

Total spend mentioned across threads: $28,941 over 6 months
Decisions made: Move load-testing EC2 to spot instances (Decided Oct 2025)
```

### Step 4: Create Follow-Up Drafts (Optional)

**Prompt:**
```text
For each action item assigned to me (my email is theone@example.com), draft a short follow-up email. The email should:
- Reference the original thread/topic
- Clearly state the action needed
- Ask for a response by a reasonable deadline (pick one if not specified)

Save drafts to `gmail_followups_draft.md` — do not send.
```

## Skills Demonstrated

- **OAuth authentication** — setting up secure API access for a third-party MCP
- **Email parsing and filtering** — using natural-language queries to search structured email data
- **Intelligent summarization** — condensing multi-message threads into key points
- **Action item extraction** — identifying who committed to what, from unstructured text

## Common Pitfalls

- ❌ **Scope too broad** — "All emails from 2023" will hit Gmail's 500-thread search limit. Always use date ranges.
- ❌ **Mixing personal and work** — If you use the same Google account for both, the agent will surface personal emails when you search work topics. Use labels to filter: `"label:billing"`.
- ❌ **Action items attributed to wrong people** — The agent reads "John, can you look at this?" and may attribute the follow-up to John instead of the original requestor. Always review.
- ❌ **Token budget overflow** — Reading 50 long threads can exceed your context window. Set a thread count limit: "read only the top 8 threads."

## Quick Reference

| Task | Gmail Search Query | MCP Call |
|---|---|---|
| Find billing emails | `"AWS billing" after:2025-04-01` | `gmail.search_messages()` |
| Read a thread | Thread ID | `gmail.read_thread()` |
| List senders | Filter by date | `gmail.list_threads()` |
| Filter by label | `"label:finance"` | `gmail.search_messages()` |

## Key Takeaways

- The Gmail MCP lets you search your email inbox with natural language — no need to learn Gmail's search operators.
- Always limit the number of threads read in one session to avoid context-window overflow.
- Action-item extraction is the highest-value output — it turns email summaries into a to-do list.

## 📚 Recommended Reading (Web Links)

1. [Model Context Protocol: What Is MCP?](https://modelcontextprotocol.io/docs/introduction) — MCP architecture
2. [Building MCP Servers](https://modelcontextprotocol.io/docs/concepts/server) — guide to creating custom MCP servers
3. [Python MCP SDK](https://github.com/modelcontextprotocol/python-sdk) — reference and examples for MCP development
4. [Google AI Studio Docs](https://ai.google.dev/) — for using Gemini models for summarization
5. [DeepSeek Platform](https://platform.deepseek.com/docs) — free API access for cost-free summarization

---

← [Back to Section Index](00-index.md) | ← [Previous Topic](02-web-research-report.md) | [Next Topic →](04-deploy-website.md)

[← Main Index](../00-index.md) | [Section Index](00-index.md)
