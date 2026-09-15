<!-- Navigation: Top -->
← [Back to Section Index](00-index.md) | ← [Previous Topic](02-mcp-servers.md) | [Next Topic →](04-custom-mcp-servers.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Installing Your First MCPs**

---

# Installing Your First MCPs

> In this page you'll install and configure three essential MCP servers — a web search MCP, a Google Drive MCP, and a GitHub MCP — and test them with your agent.

## 📺 Recommended Videos

1. [Ultimate MCP Tutorial | Learn Model Context Protocol](https://www.youtube.com/watch?v=DAuZuj0BUZA) — end-to-end tutorial covering MCP server installation, configuration, and testing in Claude Code
2. [How Model Context Protocol (MCP) Actually Works](https://www.youtube.com/watch?v=cGuyrANVi4A) — architecture deep-dive that explains how the servers you install connect to your agent

## Why You Need This

- **Point 1:** Each MCP you install unlocks a new "sense" for your agent — web search, file access, API integration — turning it from a code editor into a research assistant
- **Point 2:** These three MCPs cover 80% of what most agents need: finding information, reading documents, and managing code repositories
- **Point 3:** The installation patterns are identical across all MCPs — once you learn one, you can add any server from the registry

## Step-by-Step Guide

### Step 1: Setting Up a Web Search MCP (Exa)

Exa is a search API designed for AI agents — it returns structured results with content already extracted, making it ideal for research tasks.

**Prerequisites:**
- Free Exa API key from [exa.ai](https://exa.ai)

**Installation (for Claude Code):**

1. Install the Exa MCP server:
```bash
npm install -g @modelcontextprotocol/server-exa
```

2. Add it to your `.mcp.json`:
```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-exa"],
      "env": {
        "EXA_API_KEY": "YOUR_EXA_API_KEY"
      }
    }
  }
}
```

**Installation (for OpenCode):**

Add to `.opencode/mcp.json`:
```json
{
  "mcpServers": {
    "exa": {
      "command": "uvx",
      "args": ["exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "YOUR_EXA_API_KEY"
      }
    }
  }
}
```

**Installation (for OMP):**

Add to `.omp/config.yaml`:
```yaml
mcpServers:
  exa:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-exa"]
    env:
      EXA_API_KEY: YOUR_EXA_API_KEY
```

**Testing it:**
Restart your agent, then ask:
> "Search the web for the latest developments in MCP servers and summarize the top 3 results."

### Step 2: Setting Up a Google Drive MCP

The Google Drive MCP lets your agent read Google Docs, Sheets, and drive files directly — perfect for report generation, data analysis, and collaborative writing.

**Prerequisites:**
- A Google account
- Google Cloud project with the Drive API enabled (one-time setup)

**Installation:**

1. Install the Google Drive MCP server:
```bash
# The community version via pip
pip install mcp-google-drive

# Or via uvx (recommended — no global install needed)
uvx mcp-google-drive
```

2. Configure OAuth credentials (first-time setup):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Drive API
   - Create OAuth 2.0 credentials (Desktop app type)
   - Download the credentials JSON and save as `credentials.json`

3. Add to your agent config:

**Claude Code (`.mcp.json`):**
```json
{
  "mcpServers": {
    "google-drive": {
      "command": "uvx",
      "args": ["mcp-google-drive"],
      "env": {
        "GOOGLE_DRIVE_CREDENTIALS_PATH": "./credentials.json"
      }
    }
  }
}
```

**OpenCode (`.opencode/mcp.json`):**
```json
{
  "mcpServers": {
    "google-drive": {
      "command": "uvx",
      "args": ["mcp-google-drive"],
      "env": {
        "GOOGLE_DRIVE_CREDENTIALS_PATH": "./credentials.json"
      }
    }
  }
}
```

**Testing it:**
After restart, the first run will open a browser for OAuth consent. Then ask your agent:
> "List my Google Drive files and read the most recently modified Google Doc."

### Step 3: Setting Up a GitHub MCP

The GitHub MCP lets your agent browse repositories, create issues, manage pull requests, and read code — all through natural language.

**Prerequisites:**
- GitHub personal access token (classic or fine-grained)
- The `repo` and `read:org` scopes

1. Create a GitHub token:
   - Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
   - Generate a new token with `repo`, `read:org`, and `read:user` scopes

2. Install the official GitHub MCP server:
```bash
npm install -g @modelcontextprotocol/server-github
```

3. Add to your agent config:

**Claude Code (`.mcp.json`):**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN"
      }
    }
  }
}
```

**OpenCode (`.opencode/mcp.json`):**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN"
      }
    }
  }
}
```

**Testing it:**
Ask your agent:
> "List the issues in the modelcontextprotocol/python-sdk repository."

### Step 4: Verifying All MCPs Are Working

After restarting your agent, verify the MCPs loaded correctly:

**Claude Code:**
```bash
claude mcp list
```

You should see:
```
exa          connected   ✓
google-drive connected   ✓
github       connected   ✓
```

**OpenCode:**
OpenCode lists MCP status in its startup banner, or you can check with:
```bash
opencode /mcp list
```

**OMP:**
```bash
omp /mcp list
```

### Step 5: Hands-On Exercise — Web Search MCP

Now let's put the web search MCP to work with a real task:

1. **Start your agent** (Claude Code, OpenCode, or OMP) in any directory
2. **Ensure the Exa MCP is configured** (from Step 1)
3. **Ask the agent:**

> "Use the web search tool to find the top 5 GitHub repositories for MCP servers. For each, read the README and tell me what tools each server exposes."

Expected behavior:
- The agent will use the Exa MCP to search for MCP servers on GitHub
- It will fetch each repo's README
- It will summarize the tools each server provides

If the agent responds with search results and README summaries, your MCP is working correctly!

## Common Pitfalls

- ❌ **Forgetting to restart the agent** — MCP config changes only take effect after a full restart
- ❌ **Not setting `npx -y`** — without the `-y` flag, `npx` will prompt interactively and hang the MCP connection
- ❌ **API keys in plain text in config files** — these get committed to git if you're not careful. Use `.env` files or environment variables where possible
- ❌ **Google Drive OAuth first-run confusion** — the browser pop-up only happens once; after that, tokens are cached automatically
- ❌ **Running out of API credits** — most search APIs have free tiers but charge for heavy usage

## Quick Reference

| MCP Server | Purpose | Config Key | Required Env Var |
|---|---|---|---|
| Exa Search | Web research, content extraction | `exa` | `EXA_API_KEY` |
| Google Drive | Read/write Google Docs, Sheets | `google-drive` | `GOOGLE_DRIVE_CREDENTIALS_PATH` |
| GitHub | Issues, PRs, repo browsing | `github` | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| Firecrawl | Web scraping and page extraction | `firecrawl` | `FIRECRAWL_API_KEY` |
| Brave Search | Privacy-focused web search | `brave-search` | `BRAVE_API_KEY` |

## Key Takeaways

- **Installation patterns are identical** — every MCP follows the same config structure (command, args, env)
- **API keys are the main hurdle** — most servers need at least one API key or token to function
- **Restart after config changes** — MCP connections are established at agent startup, not dynamically
- **Test with simple prompts** — once you can get an MCP to list repos or search the web, it's working

## 📚 Recommended Reading (Web Links)

1. [MCP Specification](https://spec.modelcontextprotocol.io/) — full technical spec for understanding how MCP servers and clients communicate
2. [MCP Servers GitHub Organization](https://github.com/modelcontextprotocol) — official server implementations and community reference repos
3. [Exa API Documentation](https://docs.exa.ai/) — Exa search API docs, including free-tier limits and query parameters
4. [Google Drive API Documentation](https://developers.google.com/drive/api) — for advanced Google Drive MCP configuration and OAuth setup

---

<!-- Navigation: Bottom -->
← [Back to Section Index](00-index.md) | ← [Previous Topic](02-mcp-servers.md) | [Next Topic →](04-custom-mcp-servers.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
