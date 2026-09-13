<!-- Navigation: Top -->
← [Back to Section Index](index.md) | ← [Previous Topic](01-skills.md) | [Next Topic →](03-installing-mcps.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → [Section Index](index.md) → **MCP Servers**

---

# MCP Servers — The "USB-C" of AI Tools

> In this page you'll learn what the Model Context Protocol (MCP) is, why it's called the "USB-C of AI tools," how the client/server architecture works, and how agents connect to external services through MCP servers.

## 📺 Recommended Videos

1. [What is MCP? — Model Context Protocol Explained](https://www.youtube.com/watch?v=_fzpnqt39jZ) — full overview of MCP, why it was created, and how it enables universal tool connectivity for AI agents
2. [How Model Context Protocol (MCP) Actually Works](https://www.youtube.com/watch?v=cGuyrANVi4A) — deep-dive into the MCP architecture, JSON-RPC transport, and the client-to-server communication flow
3. [Ultimate MCP Tutorial | Learn Model Context Protocol](https://www.youtube.com/watch?v=DAuZuj0BUZA) — hands-on walkthrough of installing, configuring, and writing MCP servers

## Understanding MCP

> MCP (Model Context Protocol) is an open standard for connecting AI assistants to external data sources, tools, and services. Think of it as a universal connector — the kind that replaced a dozen different cables on your laptop with a single port.

### What Is It?

**MCP** = **Model Context Protocol**. It's an open protocol developed by Anthropic (and now stewarded by the community) that defines a standard way for **clients** (AI agents like Claude Code, OpenCode, OMP) to talk to **servers** (tools that expose functions, data, or resources).

An MCP server is a standalone process that:

1. **Exposes a set of tools** — functions with JSON-defined parameters and return schemas
2. **Runs as a subprocess** or network service alongside the agent
3. **Communicates via JSON-RPC** — a standardized request/response format

### The USB-C Analogy

Before USB-C, every device had its own proprietary connector. Your phone charged with a micro-USB, your laptop used MagSafe, your camera used a proprietary dock. You needed a bag full of adapters.

Before MCP, every AI agent tool was its own snowflake:

| Agent | Tool Connection |
|---|---|
| OpenCode | npm packages with custom integration |
| Claude Code | `claude mcp` commands with JSON config |
| OMP | YAML-based server config |
| ChatGPT | Custom GPT actions with OpenAPI schemas |

MCP changes this. Just as USB-C gave you a single port that works everywhere, MCP gives you a single protocol that works with every agent. An MCP server written once can plug into OpenCode, Claude Code, OMP, or any future MCP-compatible agent — no rework needed.

### Why MCP Matters

- **One protocol, everywhere** — write an MCP server once, use it in every agent
- **Standardized tool contracts** — every tool declares its name, description, parameters, and return type via JSON schema
- **Secure by design** — servers run in isolated subprocesses; they can't access the agent's memory or make unsolicited network calls
- **Open source** — anyone can build, share, and audit MCP servers

### The MCP Architecture

MCP uses a clear client-server architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    AI Agent (Host)                       │
│                                                          │
│  ┌──────────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │   LLM (Claude)   │  │  MCP Client  │  │  Prompt   │  │
│  │                  │  │  (built in)  │  │  Engine   │  │
│  └────────┬─────────┘  └──────┬───────┘  └───────────┘  │
│           │                   │                          │
│           │  Tool Call        │                          │
│           ▼                   │ JSON-RPC over stdio      │
│         ┌─┴───────────────────▼──┐                      │
│         │ MCP Server: Web Search  │  ◄── HTTP ──►  Web API │
│         └─────────────────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

**How the pieces fit together:**

1. **The Agent (Host)** — your coding agent (Claude Code, OpenCode, OMP). It contains an MCP **client** inside.
2. **JSON-RPC Transport** — the client communicates with servers using JSON-RPC 2.0, either over:
   - **`stdio`** — the server runs as a local subprocess (most common, works offline)
   - **SSE (Server-Sent Events)** — the server runs as an HTTP endpoint (for remote servers)
3. **MCP Server** — a standalone process that exposes tools, resources, and prompts. Each server is purpose-built (web search, file access, database queries, etc.)
4. **External Service/API** — the server wraps a real-world API (Exa, GitHub, Google Drive, your internal API)

### What MCP Servers Can Expose

An MCP server can expose three kinds of capabilities:

| Capability | What It Does | Example |
|---|---|---|
| **Tools** | Functions the agent can call | `search_web(query)` → returns results |
| **Resources** | Data the agent can read | `read_file(path)` → returns file contents |
| **Prompts** | Pre-made prompt templates | "code-reviewer" template with instructions |

> 💡 **Pro tip:** Most MCP servers only expose **Tools**. Resources and Prompts are less common but powerful for advanced use cases.

### Built-in MCPs vs Custom MCPs

Every agent ships with a few MCP servers built in. But the real power comes from installing or building your own.

| Type | What It Is | Examples |
|---|---|---|
| **Built-in MCPs** | Shipped with the agent — filesystem, bash, git | Claude Code: `claude mcp list` |
| **Official MCPs** | Published by Anthropic or the MCP org on GitHub | `@modelcontextprotocol/server-github`, `@modelcontextprotocol/server-brave-search` |
| **Community MCPs** | Built by the open-source community | Exa search, Firecrawl, Google Drive, SQLite |
| **Custom MCPs** | You write them — wrapping your internal APIs | Your company's CRM, custom analytics, internal tooling |

## Why You Need This

- **Point 1:** Without MCP, your agent is blind to the outside world — it can only use whatever tools were hardcoded into the agent itself
- **Point 2:** MCP is rapidly becoming the standard — every major agent (Claude Code, OpenCode, OMP, Cursor, Windsurf) now supports it
- **Point 3:** If you skip MCP, you'll be stuck writing custom glue code every time you want an agent to talk to a new service

## Step-by-Step Guide

### Step 1: Understanding the MCP Client Configuration

Each agent has a different way to configure MCP servers, but they all follow the same pattern: **list the command that starts the server, plus its arguments and environment**.

**Claude Code** (`.mcp.json` in your project or `~/.mcp.json` globally):
```json
{
  "mcpServers": {
    "brave-search": {
      "command": "uvx",
      "args": ["brave-search"],
      "env": {
        "BRAVE_API_KEY": "YOUR_KEY_HERE"
      }
    }
  }
}
```

**OpenCode** (`.opencode/mcp.json` in your project):
```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"]
    }
  }
}
```

**OMP (Oh My Pi)** (`.omp/config.yaml`):
```yaml
mcpServers:
  brave-search:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-brave-search"]
```

### Step 2: The Initialize Handshake

When an agent starts, here's what happens behind the scenes:

1. **Agent reads its MCP config** and sees which servers to start
2. **Agent spawns each server** as a subprocess (or connects via SSE)
3. **Client sends `initialize` request** — "hello, what can you do?"
4. **Server responds with capabilities** — a list of tools, resources, and prompts it exposes
5. **Agent caches the tool list** and makes it available to the LLM

```
Client: initialize({"protocolVersion": "2024-11-05", ...})
Server: initialized({"capabilities": {"tools": {"list": true, "call": true}}})
Client: tools/list → Server: [{name: "search", ...}, {name: "fetch", ...}]
```

### Step 3: Calling a Tool Through MCP

Once the server is running, the agent decides — based on your prompt — to call a tool. Here's how the flow works:

1. **LLM decides to call a tool** — the model sees the available tools and decides one is needed
2. **Agent formats the tool call** — converts the LLM's intent into a JSON-RPC `tools/call` request
3. **Server executes the function** — the server runs the requested operation (e.g., make an HTTP request)
4. **Server returns structured JSON** — results come back as typed JSON
5. **Agent feeds results back to the LLM** — the model sees the output and decides what to do next

This is a **two-way conversation**: the LLM can make multiple tool calls, see results, and then make more calls based on what it learned.

### Step 4: Testing an MCP Server

You can test any MCP server using the **MCP Inspector** — a web-based GUI for debugging:

```bash
# Install the inspector
npm install -g @modelcontextprotocol/inspector

# Run it with any server
mcp-inspector npx -y @modelcontextprotocol/server-brave-search
```

The inspector opens a web page where you can:
- See the list of available tools
- Call each tool with test parameters
- View the raw JSON response
- Inspect the server's capabilities

### Step 5: Adding a New MCP to Your Workflow

The typical workflow is:

1. **Find** a server on the [MCP Servers registry](https://github.com/modelcontextprotocol/servers) or a community site
2. **Install** the dependencies (npm package or Python package)
3. **Configure** it in your agent's MCP config file
4. **Test** it with `mcp-inspector` or by asking your agent to use it

```bash
# Example: adding a web search MCP to Claude Code
# 1. Install dependencies
npm install -g @modelcontextprotocol/server-brave-search

# 2. Add to .mcp.json
# {
#   "mcpServers": {
#     "brave-search": {
#       "command": "npx",
#       "args": ["-y", "@modelcontextprotocol/server-brave-search"],
#       "env": { "BRAVE_API_KEY": "YOUR_KEY" }
#     }
#   }
# }

# 3. Restart Claude Code — the new tools are now available
```

## Common Pitfalls

- ❌ **Not reading the server's README** — many MCP servers require API keys, specific Node/Python versions, or extra environment variables
- ❌ **Running servers in the wrong directory** — some servers expect to be run from a specific working directory (e.g., project root)
- ❌ **Using `npx` without `-y`** — interactive prompts during install will hang the MCP connection
- ❌ **Forgetting to restart the agent** — MCP config changes require an agent restart to take effect

## Quick Reference

| Concept | Description |
|---|---|
| `stdio` transport | Server runs as a local subprocess — most common, works offline |
| `sse` transport | Server runs as an HTTP endpoint — used for remote/shared servers |
| `tools/call` | JSON-RPC method to invoke a server's function |
| `tools/list` | JSON-RPC method to discover available tools |
| `initialize` | Required handshake request at server startup |
| MCP Inspector | Web-based GUI for debugging MCP servers |

![MCP Architecture](assets/mcp-logo.png)

## Key Takeaways

- **MCP is a universal connector** — like USB-C, it's one protocol that works with every agent
- **Servers are isolated subprocesses** — they can't access your agent's memory or do anything unsolicited
- **The agent decides what to call** — MCP servers just expose tools; the LLM decides which to use and when
- **Two transports available** — `stdio` (local subprocess) and `SSE` (HTTP server)
- **Configuration is per-agent** — each agent (Claude Code, OpenCode, OMP) has its own config file format, but all follow the same pattern

## 📚 Recommended Reading (Web Links)

1. [Model Context Protocol: What is MCP?](https://modelcontextprotocol.io/docs/introduction) — official introduction explaining the architecture, transports, and use cases
2. [MCP Specification](https://spec.modelcontextprotocol.io/) — full technical specification covering JSON-RPC methods, data types, and protocol versioning
3. [Building MCP Servers](https://modelcontextprotocol.io/docs/concepts/server) — official guide to creating MCP servers with tools, resources, and prompts
4. [MCP Servers GitHub](https://github.com/modelcontextprotocol/servers) — curated repository of official and reference MCP server implementations

---

<!-- Navigation: Bottom -->
← [Back to Section Index](index.md) | ← [Previous Topic](01-skills.md) | [Next Topic →](03-installing-mcps.md)

[← Main Index](../index.md) | [Table of Contents](index.md)
