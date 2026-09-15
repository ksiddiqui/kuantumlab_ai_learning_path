<!-- Navigation: Top -->
[← Previous: 01. Why OMP?](./01-why-omp.md) | ← [Back to Section Index](00-index.md) | [03. Configuration →](03-config.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../00-index.md) → [Section 7: Oh My Pi (OMP)](00-index.md) → [02. Installing OMP](02-installing.md)

---

# 02. Installing OMP

> **Estimated time:** 45 min | **Goal:** Install Oh My Pi, configure your first provider, and verify the installation.

---

## System Requirements

| Requirement | Minimum | Recommended |
|---|---|---|
| **Node.js** | v18+ | v20+ (LTS) |
| **npm/bun** | Any recent version | bun (fastest) |
| **Operating system** | macOS 12+, Ubuntu 20.04+, Windows 11 | — |
| **API keys** | At least one provider key (Anthropic, OpenAI, etc.) | Multiple providers for routing |
| **Disk space** | 50 MB | 200 MB (for local engines cache) |

OMP runs on all major platforms. Node.js v18+ is the only hard dependency.

---

## Installation Methods

### Method 1: Install Script (macOS / Linux) — Recommended

The official install script handles Node.js version checks and places the binary on your `PATH`:

```bash
curl -fsSL https://omp.sh/install | sh
```

After installation, restart your terminal or run:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

### Method 2: Homebrew (macOS only)

```bash
brew install can1357/tap/omp
```

This installs from OMP's custom Homebrew tap and keeps the tool updated with `brew upgrade omp`.

### Method 3: Bun (Any platform — recommended for non-macOS)

```bash
bun install -g @oh-my-pi/pi-coding-agent
```

This works on macOS, Linux, and Windows (where the install script is not yet available). Bun manages the global bin directory automatically.

### Method 4: Windows PowerShell

```powershell
irm https://omp.sh/install.ps1 | iex
```

This downloads and runs the Windows install script, which places the binary in your user's `PATH`.

### Verifying Your Install

Once installed, confirm the binary is accessible:

```bash
omp --version
# Example output: @oh-my-pi/pi-coding-agent v1.x.x
```

If the command is not found, ensure the install directory is on your `PATH`:

```bash
# macOS/Linux (bash/zsh)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Windows (PowerShell profile)
$env:Path += ";$env:LOCALAPPDATA\Programs\oh-my-pi"
```

---

## First-Run Setup

### Interactive Setup

On first launch, run `omp` in any directory to trigger the interactive setup wizard:

```bash
omp
```

This prompts you to:

1. **Select a default provider** — choose Anthropic, OpenAI, Google, or a local engine.
2. **Enter your API key** — stored securely in `~/.omp/agent/agent.db`.
3. **Configure local engines** — optionally set up Ollama or Llama.cpp.
4. **Pick a default model** — OMP suggests role-mapped models (see [Models](./03-config.md)).

> 💡 **Tip**: If you already have keys in your shell environment, OMP auto-detects them. You can skip entering keys manually.

### Non-Interactive Setup (CI/Servers)

For headless or CI environments, install and set provider environment variables before first run:

```bash
curl -fsSL https://omp.sh/install | sh

# Set credentials via environment
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
export GOOGLE_API_KEY="AIza..."  # Google Gemini

# Run OMP directly
omp --provider anthropic
```

OMP resolves credentials in this order (first match wins):

1. **Runtime override**: CLI flag `--api-key`
2. **`models.yml` config key**: `apiKey` on a custom provider
3. **Stored OAuth credential**: from `/login`
4. **Login-sourced stored key**: saved by `/login <provider>`
5. **Provider environment variable**: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, etc.
6. **Fallback stored key**: broker-migrated
7. **`models.yml` fallback resolver**

### OAuth Login (Inside a Session)

Once inside an OMP session, use the slash command to authenticate interactively:

```
/login anthropic    # Jump straight to Anthropic OAuth
/login openai       # OpenAI API key flow
/login google       # Google Gemini OAuth
/login            # Opens the full provider selector
```

To remove stored credentials:

```
/logout
```

For headless setups with an auth broker:

```bash
omp auth-broker login anthropic
omp auth-broker status
```

---

## Configuring a Provider

### Core Provider Environment Variables

| Provider | Environment Variable |
|---|---|
| Anthropic | `ANTHROPIC_API_KEY` |
| OpenAI | `OPENAI_API_KEY` |
| Google Gemini | `GEMINI_API_KEY` |
| Groq | `GROQ_API_KEY` |
| OpenRouter | `OPENROUTER_API_KEY` |
| Mistral | `MISTRAL_API_KEY` |
| xAI | `XAI_API_KEY` |
| DeepSeek | `DEEPSEEK_API_KEY` |
| Hugging Face | `HUGGING_FACE_HUB_TOKEN` or `HF_TOKEN` |

### Local Engine Setup (Optional)

OMP auto-discovers three local engines without needing config entries:

| Provider | Default URL | Env Override |
|---|---|---|
| `ollama` | `http://127.0.0.1:11434` | `OLLAMA_BASE_URL` |
| `llama.cpp` | `http://127.0.0.1:8080` | `LLAMA_CPP_BASE_URL` |
| `lm-studio` | `http://127.0.0.1:1234/v1` | `LM_STUDIO_BASE_URL` |

To use a local engine:

1. Start your local engine (e.g., `ollama serve` or launch LM Studio server).
2. Inside an OMP session, switch model:

```
/model ollama/qwen2.5-coder:14b
```

OMP discovers available local models at startup via the engine's model endpoint.

---

## Step-by-Step: Install and Run

### Step 1: Install OMP

Choose your platform and run the appropriate command from the methods above.

```bash
# Example: macOS via install script
curl -fsSL https://omp.sh/install | sh
```

### Step 2: Verify Installation

```bash
omp --version
omp --help    # See all available commands
```

Expected commands:

```
omp [options] [directory]
  --provider <id>       Override default provider
  --model <id>          Override default model
  --config <path>       Use an alternative config file
  --mcp-config <path>   Load MCP servers from a specific config
  --api-key <key>       One-off API key for this session
  --no-cache            Disable response caching
  --debug               Enable debug logging
  --version             Show version and exit
```

### Step 3: Provide API Credentials

Set at least one provider environment variable in your shell:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
# OR for OpenAI:
export OPENAI_API_KEY="sk-..."
```

Or run the interactive setup:

```bash
omp
# Select "Anthropic" → paste key → confirm
```

### Step 4: Launch Your First Session

Navigate to a project directory and run:

```bash
cd my-project
omp
```

OMP detects existing config (from `.claude`, `.gemini`, etc.) and loads it automatically. Inside the session:

```
/status            # Check active model, providers, and cost
/providers         # List all available providers
/models            # List selectable models
/help              # Show all slash commands
```

### Step 5: Verify a Tool Call

Ask OMP to do something observable:

```
list the files in this directory
```

You should see a tool call to `ls` (or equivalent) and the output rendered back to you. If you see tool execution, your install is working.

---

## Pitfalls & Troubleshooting

### "No providers available"

OMP disables a provider's models when credentials are missing. Ensure you've either:

- Set the correct environment variable (`ANTHROPIC_API_KEY`, etc.), or
- Run `/login` inside a session, or
- Configured a custom provider in `models.yml` (see [Configuration](./03-config.md)).

### Local engine not found

Local engines (`ollama`, `llama.cpp`, `lm-studio`) are skipped if:

1. A provider with the same ID is already configured in `models.yml` (your config wins).
2. The provider ID is in the effective `disabledProviders` list.
3. The engine server isn't running.

Verify with `omp --provider ollama` and check that `ollama serve` is active.

### Path issues on Windows

The install script may warn about `PATH` on Windows. If `omp` is not recognized, manually add the install directory to your `PATH`:

```powershell
$env:Path += ";$env:LOCALAPPDATA\Programs\oh-my-pi"
[Environment]::SetEnvironmentVariable("Path", $env:Path, "User")
```

### Node.js too old

If you see an error about Node.js version, upgrade to v18+ or install via [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install --lts
nvm use --lts
```

---

## Quick Reference

```bash
# Install (macOS/Linux)
curl -fsSL https://omp.sh/install | sh
brew install can1357/tap/omp
bun install -g @oh-my-pi/pi-coding-agent

# Install (Windows)
irm https://omp.sh/install.ps1 | iex

# Verify
omp --version

# Set credentials
export ANTHROPIC_API_KEY="sk-ant-..."
# or: export OPENAI_API_KEY="sk-..."
# or: export GEMINI_API_KEY="AIza..."

# First run (interactive setup)
omp

# Non-interactive (with env vars set)
omp --provider anthropic
```

---

## Key Takeaways

- OMP installs via a one-line script, Homebrew, Bun, or Windows PowerShell — no compilation required.
- Node.js v18+ is the only hard dependency.
- Credentials are resolved with a clear priority order: runtime flag → config key → stored OAuth → env var → fallback resolver.
- Local engines (Ollama, Llama.cpp, LM Studio) are auto-discovered with no config needed.
- The interactive `omp` command handles first-run setup, but CI/headless installs work with environment variables.

---

## 📚 Recommended Reading

1. [OMP Installation Guide](https://omp.sh/docs/installation) — official docs
2. [OMP Configuration](https://omp.sh/docs/settings) — global vs project config
3. [OMP Secrets and Credentials](https://omp.sh/docs/secrets) — auth store, OAuth, and the auth broker
4. [OMP Local Models](https://omp.sh/docs/local-models) — Ollama, Llama.cpp, and LM Studio setup
5. [OMP CLI Reference](https://omp.sh/docs/cli-reference) — all flags and commands

---

<!-- Navigation: Bottom -->
[← Previous: 01. Why OMP?](01-why-omp.md) | ← [Back to Section Index](00-index.md) | [03. Configuration →](03-config.md)
