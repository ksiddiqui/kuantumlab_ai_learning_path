<!-- Navigation: Top -->
← [Back to Section Index](00-index.md) | ← [Previous Topic](03-installing-mcps.md) | [Next Topic →](05-extensions-lsp.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Custom MCP Servers**

---

# Custom MCP Servers with Python

> In this page you'll build a custom MCP server from scratch using the Python SDK — wrapping a public API, testing it locally, and registering it with your agent.

## 📺 Recommended Videos

1. [Ultimate MCP Tutorial | Learn Model Context Protocol](https://www.youtube.com/watch?v=DAuZuj0BUZA) — hands-on walkthrough of building and testing a custom MCP server

## Understanding Custom MCP Servers

> When off-the-shelf MCP servers don't cover your needs — say, your company's internal API, a niche service, or a custom workflow — you write your own. The MCP Python SDK makes this surprisingly simple.

### When You Need a Custom MCP

You should build a custom MCP server when:

- You need to connect to your **company's internal API** (no public MCP server exists)
- You want to wrap a **niche service** that has no MCP server yet
- You need **custom logic** between the tool call and the API response (filtering, formatting, batching)
- You want to **combine multiple services** behind a single MCP server

### What You'll Build

In this page, you'll create an MCP server that wraps the [JokeAPI](https://sv443.net/joke) — a free, no-auth API that returns random jokes. This is the perfect starter project: no API keys needed, the API is simple, and the pattern transfers directly to wrapping your own APIs.

## Why You Need This

- **Point 1:** Pre-built MCP servers cover common APIs, but real projects always need at least one custom integration
- **Point 2:** The pattern is identical whether you're wrapping a free joke API or your company's internal CRM — learn it once, apply everywhere
- **Point 3:** Custom MCP servers let you add agent capabilities that competitors can't get from a marketplace

## Step-by-Step Guide

### Step 1: Install the MCP Python SDK

First, set up a Python virtual environment and install the SDK:

```bash
# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
# .venv\Scripts\activate        # Windows

# Install the MCP SDK
pip install mcp

# Or use uv (faster)
uv init
uv add mcp
```

Verify the installation:
```bash
python -c "from mcp.server.fastmcp import FastMCP; print('MCP SDK installed!')"
```

### Step 2: Create Your First MCP Server

The Python SDK provides two APIs:
- **`FastMCP`** — high-level, decorator-based API (what we'll use)
- **`Server`** — low-level, full control API (for advanced use cases)

Create a file called `joke_server.py`:

```python
"""A simple MCP server that tells jokes."""
from mcp.server.fastmcp import FastMCP
import httpx  # or use the standard 'requests' library

# Create an MCP server instance
mcp = FastMCP("joke-server")

@mcp.tool()
def get_joke() -> dict:
    """
    Fetch a random joke from the JokeAPI.

    Returns a joke in JSON format with 'setup' and 'delivery' fields,
    or a single 'joke' field for single-part jokes.
    """
    # JokeAPI — no API key required
    response = httpx.get("https://v2.jokeapi.dev/joke/Any?type=single")
    response.raise_for_status()
    data = response.json()
    return data

@mcp.tool()
def get_joke_by_category(category: str) -> dict:
    """
    Fetch a random joke from a specific category.

    Args:
        category: The joke category. Valid options: Programming,
                  Misc, Dark, Pun, Spooky, Christmas, or Any.
    """
    response = httpx.get(f"https://v2.jokeapi.dev/joke/{category}?type=single")
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    # 'stdio' transport: server runs as a subprocess
    # The agent connects via stdin/stdout
    mcp.run(transport="stdio")
```

### Step 3: Install Dependencies

The `FastMCP` API is part of the `mcp` package. For HTTP calls, install `httpx`:

```bash
pip install httpx
```

### Step 4: Test Your Server Locally

**Method A — MCP Inspector (Recommended for beginners):**

The MCP Inspector is a web-based GUI that lets you test any MCP server without an agent:

```bash
# Install the inspector
npm install -g @modelcontextprotocol/inspector

# Run your server through the inspector
mcp-inspector python joke_server.py
```

The inspector will:
1. Start your server as a subprocess
2. Send the `initialize` handshake
3. Call `tools/list` to discover your tools
4. Open a web UI where you can click "get_joke" and see the JSON response

**Method B — Direct test with a simple client:**

```bash
# Just run the server — if it starts without errors, the protocol handshake works
python joke_server.py
```

If the server starts and waits for input (doesn't crash immediately), the MCP protocol is working. The server is listening for JSON-RPC requests on stdin/stdout.

### Step 5: Register the Server with Your Agent

Now that your server works, connect it to your agent.

**For OpenCode** — add to `.opencode/mcp.json`:
```json
{
  "mcpServers": {
    "joke-server": {
      "command": "python",
      "args": ["/absolute/path/to/joke_server.py"],
      "env": {
        "VIRTUAL_ENV": "/path/to/your/.venv"
      }
    }
  }
}
```

> 💡 **Tip:** Use absolute paths for the `args` field. Relative paths are resolved relative to the agent's working directory, which may not be where your server file lives.

**For Claude Code** — add to `.mcp.json`:
```json
{
  "mcpServers": {
    "joke-server": {
      "command": "uv",
      "args": ["run", "python", "/absolute/path/to/joke_server.py"]
    }
  }
}
```

> 💡 **Tip:** Using `uv run` ensures the correct virtual environment is used, which handles dependency resolution automatically.

**For OMP** — add to `.omp/config.yaml`:
```yaml
mcpServers:
  joke-server:
    command: python
    args: ["/absolute/path/to/joke_server.py"]
```

### Step 6: Test in Your Agent

Restart your agent, then ask:

> "Tell me a joke using the joke-server tool."
> "Get a programming joke from category 'Programming'."

If the agent responds with a joke, your custom MCP server is working!

## Advanced: Adding Resources to Your Server

Tools are great for actions, but MCP also supports **Resources** — data that can be read on demand. Here's how to add a resource:

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("joke-server")

# Add a resource — a static data endpoint
@mcp.resource("jokes://{category}")
def jokes_resource(category: str) -> str:
    """Return jokes from a specific category as text."""
    data = get_joke_by_category(category)
    return f"Joke: {data.get('setup', '')} {data.get('joke', '')}"

@mcp.resource("config://server")
def server_config() -> str:
    """Return the server's configuration."""
    return "Joke Server v1.0 — sources: JokeAPI (v2.jokeapi.dev)"
```

Resources are accessed differently than tools — they're read, not called:
> "Read the jokes://Programming resource."

## Common Pitfalls

- ❌ **Using relative paths** — the agent resolves paths relative to its own working directory, not your server file's location. Always use absolute paths.
- ❌ **Forgetting dependencies** — if you `import httpx` but don't install it in the environment the agent uses, the server will crash on startup. Use `uv add` or `pip install` consistently.
- ❌ **Not handling API errors** — your MCP server should return structured errors, not crash. Use try/except and return error information in the JSON response.
- ❌ **Blocking on network calls** — the MCP `stdio` transport has timeouts. If your API call takes too long, the agent will give up. Add timeouts or async handling for slow APIs.
- ❌ **Missing the `if __name__ == "__main__"` guard** — without it, the server won't start when the agent runs `python server.py`.

## Quick Reference

| Concept | Code |
|---|---|
| Create server | `mcp = FastMCP("my-server")` |
| Register tool | `@mcp.tool()` decorator on a function |
| Register resource | `@mcp.resource("uri://{param}")` decorator |
| Run server | `mcp.run(transport="stdio")` |
| Tool with params | `def my_tool(arg1: str, arg2: int) -> dict:` |

## Key Takeaways

- **`FastMCP` is the easiest entry point** — just decorate functions with `@mcp.tool()` and call `mcp.run()`
- **Tools are functions** — any Python function with typed parameters can become an MCP tool
- **Testing is easy** — use `mcp-inspector` for a web UI, or run the server directly to check for startup errors
- **Path resolution matters** — always use absolute paths when configuring your server in the agent
- **Resources are optional** — most MCP servers just expose tools, but resources are available for read-on-demand data

## 📚 Recommended Reading (Web Links)

1. [Python MCP SDK (GitHub)](https://github.com/modelcontextprotocol/python-sdk) — source code, examples, and the full API reference for the Python SDK
2. [MCP Server Quick Start (Python)](https://modelcontextprotocol.io/quickstart/server) — official step-by-step guide for building your first Python MCP server
3. [MCP Server Development Guide](https://modelcontextprotocol.io/docs/concepts/server) — comprehensive guide to server capabilities, tools, resources, prompts, and transport configuration
4. [TypeScript MCP SDK (GitHub)](https://github.com/modelcontextprotocol/typescript-sdk) — for teams that prefer Node.js/TypeScript for MCP server development

---

<!-- Navigation: Bottom -->
← [Back to Section Index](00-index.md) | ← [Previous Topic](03-installing-mcps.md) | [Next Topic →](05-extensions-lsp.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
