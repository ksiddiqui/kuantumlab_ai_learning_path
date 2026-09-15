<!-- Navigation: Top -->
[← Previous: 02. Installing OMP](./02-installing.md) | ← [Back to Section Index](00-index.md) | [04. Advanced Features →](04-advanced-features.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section 7: Oh My Pi (OMP)](00-index.md) → [03. Configuration](03-config.md)

---

# 03. Configuration

> **Estimated time:** 60 min | **Goal:** Master OMP's config layering, file locations, model roles, and provider configuration.

---

## Config File Architecture

OMP uses a layered config system with a clear **merge precedence**. Unlike tools that have a single config file, OMP resolves configuration from multiple sources, with later layers overriding earlier ones.

### Precedence (low → high)

| Layer | Location | Description |
|---|---|---|
| 1. Builtin defaults | (compiled in) | Fallback values for all settings |
| 2. Global config | `~/.omp/agent/config.yml` | Your personal defaults |
| 3. Project config | `<project>/.omp/config.yml` | Per-repository overrides |
| 4. Config overlay | `--config <path>` | Explicit file loaded on top |
| 5. Runtime flags | CLI flags (`--provider`, `--model`, etc.) | Highest priority |

> **Key rule**: Each layer fully overrides the keys it defines. If the global config sets `disabledProviders: [anthropic, openai, google]` and the project sets `disabledProviders: [groq]`, the effective result is only `["groq"]` — the project array replaces the global array wholesale.

### Key File Locations

| File | Scope | Purpose |
|---|---|---|
| `~/.omp/agent/config.yml` | Global | Main settings: model roles, disabled providers, status line |
| `~/.omp/agent/models.yml` | Global | Custom providers and model definitions |
| `~/.omp/agent/mcp.json` | Global | MCP server registrations (user-level) |
| `~/.omp/agent/.env` | Global | Environment variables |
| `<project>/.omp/config.yml` | Project | Project-level config overrides |
| `<project>/.omp/mcp.json` | Project | Project-level MCP servers |
| `<project>/.env` | Project | Project-specific env vars |

The `PI_CODING_AGENT_DIR` environment variable relocates the `~/.omp/agent` base directory for all of the above.

---

## Config Discovery: Adapting to Existing Tools

One of OMP's most powerful features is its ability to **discover and adopt configuration from other coding agents**. When you run OMP in a directory, it scans for config from:

```
.omp/          (priority 100) — native OMP config
.claude/       (priority 80)  — Claude Code
codex/         (priority 70)  — OpenAI Codex
.gemini/       (priority 60)  — Google Gemini CLI
opencode/      (priority 55)  — OpenCode
cline/         (priority 50)  — Cline
windsurf/      (priority 45)  — Windsurf
cursor/        (priority 40)  — Cursor
```

**Native `.omp` config always wins** if it exists alongside configs from other tools. OMP maps the discovered config to its own schema — so a `.claude/settings.json` or `.gemini/settings.json` becomes usable as OMP config transparently.

### Adapter Mode

OMP can also **run as a backend provider** for another coding agent. For example, configure Claude Code to use OMP's provider routing instead of Anthropic directly:

```bash
omp --provider openrouter --model openai/o1-preview
claude-code  # Now uses OMP's routing for model selection
```

This is useful when you want one agent's UX but another agent's provider flexibility.

---

## Model Roles and `models.yml`

OMP doesn't just pick a single default model — it maps specific models to **roles** for different tasks:

### Built-in Model Roles

| Role | Purpose | Default Model |
|---|---|---|
| `default` | Main conversation model (general reasoning) | `anthropic/claude-sonnet-4` |
| `smol` | Fast, low-cost responses (summaries, status) | `anthropic/claude-3-5-haiku-20241022` |
| `slow` | Heavy reasoning (large refactors, architecture) | `anthropic/claude-opus-4` |
| `vision` | Image/multimodal input | `anthropic/claude-3-5-sonnet-20240620` |
| `plan` | Planning phase (task decomposition) | `anthropic/claude-sonnet-4` |
| `commit` | Commit message generation | `anthropic/claude-3-5-haiku` |
| `tiny` | Minimal-context operations (parsing, linting) | `anthropic/claude-instant-1` (fallback) |
| `task` | Task agent dispatch | `anthropic/claude-opus-4` |
| `advisor` | Read-only advisory agent | `anthropic/claude-sonnet-4` |

### Custom Model Roles

You can define custom roles in `config.yml`:

```yaml
# ~/.omp/agent/config.yml
modelRoles:
  codegen: anthropic/claude-sonnet-4
  review: anthropic/claude-opus-4
  translate: google/gemini-2.0-flash
```

Inside a session, switch roles with:

```
/model role:codegen     # Use the codegen-mapped model
```

### Custom Providers in `models.yml`

Create custom providers for self-hosted gateways or proxy APIs:

```yaml
# ~/.omp/agent/models.yml
providers:
  my-gateway:
    baseUrl: https://gateway.example.com/v1
    api: openai-completions
    apiKey: MY_GATEWAY_API_KEY    # env var name OR literal key
    authHeader: true              # inject as Bearer token
    models:
      - id: claude-sonnet
        name: Claude Sonnet via Gateway
        contextWindow: 200000
        maxTokens: 8192

  deepseek:
    baseUrl: https://api.deepseek.com/v1
    api: openai-completions
    apiKey: DEEPSEEK_API_KEY
    models:
      - id: deepseek-chat
        name: DeepSeek Chat
        contextWindow: 128000
```

The `apiKey` value is resolved as **environment-variable-name-or-literal**: if the value names an existing environment variable, that variable's value is used; otherwise the string itself is the key. Prefixing with `!` runs it as a shell command.

---

## The `config.yml` Structure

Here's a comprehensive example of the main config file:

```yaml
# ~/.omp/agent/config.yml

# Default provider and model
provider: anthropic
model: claude-sonnet-4

# Status line configuration (shown at the bottom of each session)
statusLine:
  enabled: true
  segments:
    - type: model
      format: "{model}"
    - type: cost
      format: "{cost} ({window})"   # Shows $, $$, $$$ arrows for peak/off-peak pricing
    - type: provider
      format: "[{provider}]"

# Model roles (see above)
modelRoles:
  default: anthropic/claude-sonnet-4
  smol: anthropic/claude-3-5-haiku-20241022
  slow: anthropic/claude-opus-4
  task: anthropic/claude-opus-4
  advisor: anthropic/claude-sonnet-4

# Disable specific providers globally
disabledProviders:
  - xai
  - together

# Path-scoped disabled providers
# (applies additional disables under matching directories)
disabledProviders:
  - ollama
  - path: ~/projects/sensitive
    providers:
      - anthropic
      - openai

# Auto-loading settings
autoloadSkills:
  enabled: true            # Auto-load skills from repo
  maxSkills: 100          # Cap auto-loaded skills
  excludePatterns:
    - "deprecated/*"

# Tool configuration
tools:
  bash:
    timeout: 30    # Default shell command timeout (seconds)
    history: true  # Preserve shell history across sessions
  edit:
    backup: true   # Create .bak files on edits

# Memory settings
memory:
  backend: local    # Options: local, hindsight, mnemopi, sharpshooter
  maxEntries: 1000
```

### Project-Level Config

Inside a repository, create `<project>/.omp/config.yml` to override any global setting:

```yaml
# <project>/.omp/config.yml

# Use DeepSeek for this project (cheaper)
provider: deepseek
model: deepseek-chat

# Disable certain providers for sensitive code
disabledProviders:
  - anthropic
  - openai
```

> **Remember**: arrays like `disabledProviders` are **replaced** by the project value, not merged. To add to the global list, repeat the global entries in the project file.

---

## Environment Variables and `.env` Files

OMP eagerly loads `.env` files into the process environment before any provider lookup. Four files are checked in this order (first match wins per variable):

1. **Process environment** — already-set variables always win
2. **`<cwd>/.env`** — project-level
3. **`~/.omp/agent/.env`** — global OMP
4. **`~/.omp/.env`** — user home
5. **`~/.env`** — user home fallback

### `.env` Parsing Rules

- Blank lines and lines starting with `#` are ignored
- Keys must match `[A-Za-z_][A-Za-z0-9_]*` (shell-identifier shape)
- Values may be wrapped in single or double quotes (quotes are stripped)
- Values containing a NUL byte are dropped
- `OMP_`-prefixed keys are mirrored to `PI_`-prefixed names (and vice versa)

### Example `.env`

```dotenv
# <project>/.env
OPENROUTER_API_KEY=sk-or-v1-...
OLLAMA_BASE_URL=http://127.0.0.1:11434
OMP_DEFAULT_PROVIDER=anthropic
PI_MAX_TOKENS=8192
```

---

## MCP Configuration

MCP (Model Context Protocol) servers are configured via JSON files:

### User-Level MCP Config (`~/.omp/agent/mcp.json`)

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY"
      }
    }
  },
  "disabledServers": [
    "filesystem"
  ]
}
```

### Project-Level MCP Config (`<project>/.omp/mcp.json`)

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

### Transport Types

MCP supports three transport types in config:

| Transport | Config keys | Use case |
|---|---|---|
| `stdio` | `command`, `args`, `env` | Local MCP servers |
| `http` | `url`, `headers` | Remote HTTP MCP servers |
| `sse` | `url`, `headers` | Server-Sent Events (legacy) |

---

## Loading Config Explicitly

You can override the default config file at launch:

```bash
# Use an alternative global config
omp --config ./my-config.yml

# Load MCP servers from a specific file
omp --mcp-config ./my-servers.json

# Override provider and model at runtime
omp --provider openrouter --model google/gemini-2.0-flash
```

Runtime flags always have the highest priority — they override both file-based and config-layer settings.

---

## Step-by-Step: Configure a Multi-Provider Setup

### Step 1: Create Global Config

```bash
mkdir -p ~/.omp/agent
touch ~/.omp/agent/config.yml
```

### Step 2: Add Model Roles

```yaml
# ~/.omp/agent/config.yml
modelRoles:
  default: anthropic/claude-sonnet-4
  smol: anthropic/claude-3-5-haiku-20241022
  slow: anthropic/claude-opus-4
  task: anthropic/claude-opus-4
  advisor: anthropic/claude-sonnet-4

provider: anthropic
```

### Step 3: Set Up Environment Variables

In your shell rc file (`~/.bashrc`, `~/.zshrc`):

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
export GEMINI_API_KEY="AIza..."
export OPENROUTER_API_KEY="sk-or-..."
```

### Step 4: (Optional) Create a Custom Provider

```yaml
# ~/.omp/agent/models.yml
providers:
  openrouter:
    baseUrl: https://openrouter.ai/api/v1
    api: openai-completions
    models:
      - id: google/gemini-2.0-flash
        name: Gemini 2.0 Flash (OpenRouter)
        contextWindow: 1048576
```

### Step 5: Verify in Session

```bash
omp
```

Inside the session:

```
/providers     # Shows all 60+ providers, which are available
/models         # Shows all selectable models
/model role:smol  # Switch to the fast model
```

---

## Pitfalls & Trade-offs

- **Array replacement, not merge**: Settings arrays like `disabledProviders` are fully replaced by each config layer. Repeat global entries in project config if you want to extend rather than replace.
- **Provider IDs are exact**: Disabling `google` hides Google Gemini but does not disable `google-gemini-cli` or `google-antigravity` — these are separate IDs.
- **Local engine conflicts**: If you configure `ollama` in `models.yml`, the implicit local engine discovery is skipped. Remove the custom entry to restore auto-discovery.
- **`.env` shadowing**: A variable set in the process environment always wins over `.env` files. Double-check with `env | grep OPENAI` if keys aren't being picked up.

---

## Quick Reference

```bash
# Config file locations
~/.omp/agent/config.yml        # Global config
~/.omp/agent/models.yml        # Global model/provider config
<project>/.omp/config.yml      # Project config
--config <path>                # Explicit overlay (highest layer)

# Model roles
provider: anthropic
model: claude-sonnet-4
modelRoles:
  default: anthropic/claude-sonnet-4
  smol: anthropic/claude-3-5-haiku
  slow: anthropic/claude-opus-4
  task: anthropic/claude-opus-4
  advisor: anthropic/claude-sonnet-4

# Env file precedence (high → low)
# 1. Process env → 2. ./.env → 3. ~/.omp/agent/.env → 4. ~/.omp/.env → 5. ~/.env
# OMP_* keys are mirrored to PI_*

# CLI overrides
omp --provider openrouter --model google/gemini-2.0-flash --config ./custom.yml
```

---

## Key Takeaways

- OMP loads config from five layers; later layers override earlier ones, with arrays replaced wholesale per key.
- Config discovery adapts to existing `.claude`, `.gemini`, `opencode`, etc. — native `.omp` wins.
- Model roles map specific models to specific agent tasks (`default`, `smol`, `slow`, `plan`, `task`, `advisor`).
- Custom providers in `models.yml` enable self-hosted gateways and OpenAI-compatible APIs.
- `.env` files load with a defined precedence; process env always wins.
- Runtime CLI flags have the highest priority for provider, model, and config path.

---

## 📚 Recommended Reading

1. [OMP Settings Documentation](https://omp.sh/docs/settings) — full config schema reference
2. [OMP Models Documentation](https://omp.sh/docs/models) — model and provider configuration
3. [OMP Environment Variables](https://omp.sh/docs/environment-variables) — complete env var reference
4. [OMP Provider Constraints](https://omp.sh/docs/provider-endpoint-constraints) — endpoint-specific limits
5. [OMP Secrets and Credentials](https://omp.sh/docs/secrets) — auth store and OAuth flows

---

<!-- Navigation: Bottom -->
[← Previous: 02. Installing OMP](./02-installing.md) | ← [Back to Section Index](00-index.md) | [04. Advanced Features →](04-advanced-features.md)
