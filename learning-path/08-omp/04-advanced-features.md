<!-- Navigation: Top -->
[← Previous: 03. Configuration](./03-config.md) | ← [Back to Section Index](index.md) | [05. Building Agents →](05-building-agents.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → [Section 7: Oh My Pi (OMP)](index.md) → [04. Advanced Features](04-advanced-features.md)

---

# 04. Advanced Features

> **Estimated time:** 90 min | **Goal:** Master OMP's hooks, magic keywords, subagents, cost tracking, and time-traveling stream rules.

---

## Hooks: Running Code on Agent Events

OMP's hook system lets you execute JavaScript or TypeScript code in response to agent lifecycle events — before or after tool calls, at session start, and more.

### Hook File Locations

```
<project>/.omp/hooks/pre/     # Before events (pre-hook)
<project>/.omp/hooks/post/    # After events (post-hook)
~/.omp/agent/hooks/pre/       # Global pre-hooks
~/.omp/agent/hooks/post/      # Global post-hooks
```

Hooks are `.ts` or `.js` files. The default export must be a function with a `HookAPI` parameter:

```typescript
// .omp/hooks/post/on_tool_result.ts
import type { HookAPI } from '@oh-my-pi/types';

export default async function hook(pi: HookAPI) {
  const { event, toolName, toolArgs, toolResult } = pi.hook;

  // Log every tool result to a file
  if (toolName === 'bash') {
    const logPath = `${pi.config.cwd}/.omp/tool-log.txt`;
    await pi.fs.append(logPath, `[${new Date().toISOString()}] bash: ${toolResult}\n`);
  }
}
```

### Hook Events

| Event | Phase | Description |
|---|---|---|
| `session_start` | pre | Session initialized (before first prompt) |
| `tool_call` | pre | A tool is about to be called |
| `tool_result` | pre | A tool result is available |
| `turn_start` | pre | A new conversation turn begins |
| `turn_end` | pre | A turn ends |
| `message_start` | pre | Assistant starts streaming a message |
| `message_delta` | pre | Streaming message updates |
| `message_end` | pre | Message streaming completes |
| `session_end` | pre | Session ends |

> **Note**: All events trigger **both** pre and post phases. Pre-hooks can inspect or modify state before the action; post-hooks run after.

### Inline Hooks via CLI

You can also pass hooks at launch without creating files:

```bash
omp --hook ./my-hook.ts
```

The hook file should default-export a function taking `HookAPI`.

### Hook API

The `HookAPI` object provides:

| Method | Description |
|---|---|
| `pi.hook` | Event metadata: `{ event, toolName, toolArgs, toolResult, message }` |
| `pi.config` | Current config: `{ cwd, model, provider }` |
| `pi.fs.append(path, content)` | Append text to a file |
| `pi.fs.read(path)` | Read a file |
| `pi.fs.write(path, content)` | Write a file |
| `pi.notify(message)` | Show a desktop notification |
| `pi.log.info/error/warn(msg)` | Log to OMP's log stream |

---

## Magic Keywords

OMP supports special "magic keywords" that trigger agent behavior modes when typed as the first word of a message:

### Orchestration Keywords

| Keyword | Effect |
|---|---|
| `@orchestrate` | Enable multi-agent orchestration mode — OMP plans and dispatches subagents |
| `@workflowz` | Trigger a named workflow from `.omp/workflows/` |
| `@ultrathink` | Force maximum thinking budget (Opus-level reasoning) for this turn |
| `@deep` | Enable deep context scanning — read all relevant files before responding |
| `@watch` | Start a file-watcher that re-runs a command on file changes |
| `@plan` | Generate a plan before taking action (similar to Claude Code's Plan mode) |

### Example Usage

```
@ultrathink Refactor the auth module to use JWT tokens with refresh rotation
```

```
@orchestrate Implement a CI/CD pipeline with tests, linting, and deployment
```

---

## Time-Traveling Stream Rules

OMP can intercept and modify the model's token stream **during generation** — a capability no other coding agent has. Stream rules apply **pattern-matching** to the token stream mid-generation:

```yaml
# .omp/config.yml
streamRules:
  - name: "no-hardcoded-keys"
    pattern: "(api_key|secret|password)\\s*=\\s*['\"][A-Za-z0-9]"
    replacement: "[REDACTED API KEY]"
    description: "Redact hardcoded credentials in streaming output"

  - name: "no-sql-injection"
    pattern: "f\".*SELECT.*\\{.*.*\}.*FROM\""
    replacement: "[Use parameterized queries instead]"
    description: "Flag f-string SQL queries"
```

Rules match using regex against the streaming text. When a match is found, OMP replaces it before it reaches the terminal.

---

## Subagents & the Agent Hub

### What Are Subagents?

Subagents are specialized AI agents spawned from within an OMP session to handle a sub-task. They run in isolated contexts with their own tool permissions, model, and memory.

### Built-in Agents

OMP ships with three built-in agents (defined in `packages/coding-agent/src/prompts/agents/`):

| Agent | Role | Purpose |
|---|---|---|
| `task` | `task` | General-purpose task execution agent with full tool access |
| `scout` | `scout` | Read-only reconnaissance agent — scans codebases, gathers context |
| `reviewer` | `advisor` | Code review agent — checks diffs, flags issues, enforces style |

### Dispatching Subagents

Use the `task` tool inside a session:

```
Task: Scan the entire codebase for TODO comments
Agent: scout
```

Or in YAML format within `.omp` config:

```yaml
# .omp/workflows/code-review.yaml
workflow:
  name: "Code Review"
  steps:
    - task: "Find all TODO comments in the src/ directory"
      agent: scout
    - task: "Review the diff and suggest improvements"
      agent: reviewer
      tools: [read, bash]
```

### Agent Discovery

Custom agents are discovered from two locations:

```
~/.omp/agent/agents/*.md      # Global agents
<project>/.omp/agents/        # Project-local agents
```

Each agent file is a Markdown file with YAML frontmatter (see [Building Agents](./05-building-agents.md) for the full schema).

---

## Cost Tracking

OMP tracks token usage and estimated costs across providers, with support for **peak/off-peak pricing** (used by providers like DeepSeek that offer reduced rates during off-hours).

### The `omp usage` Command

```bash
omp usage
# Shows: five-hour usage, weekly usage, monthly usage
# For free-tier models, shows quota windows
```

Inside a session, the `statusLine` cost segment displays live cost with scheduling arrows:

```
$0.1234 ↑↗ (5h)   # ↑ = peak pricing, ↗ = transitioning to peak
$0.1234 ↓↘ (5h)   # ↓ = off-peak pricing, ↘ = transitioning to off-peak
```

The up arrow (↑) indicates peak pricing rates; the down arrow (↓) indicates off-peak rates. The curve arrow (↗/↘) indicates a transition between windows.

### Configuring Cost Tracking

```yaml
# ~/.omp/agent/config.yml
statusLine:
  enabled: true
  segments:
    - type: model
      format: "{model}"
    - type: cost
      format: "{cost} ({window})"    # $0.045 ↑↗ (5h)
    - type: provider
      format: "[{provider}]"
```

### Provider-Specific Notes

- **DeepSeek**: Uses scheduled pricing with peak (08:00–20:00 China time) and off-peak (20:00–08:00) windows. The status line shows arrows indicating which rate applies.
- **Cline Pass**: Reports five-hour, weekly, and monthly quota windows. Free-tier models are marked `(free)`.
- **Subscription models**: Show API-equivalent reference pricing when accessed via a gateway.

---

## Advisor/Watchdog Mode

OMP includes a **read-only advisor** that monitors your session and proactively flags potential issues — security vulnerabilities, performance anti-patterns, cost warnings, and more.

### Enabling the Advisor

```yaml
# .omp/config.yml
advisor:
  enabled: true
  model: claude-sonnet-4    # Lightweight model for continuous monitoring
  checkInterval: 5          # Run checks every 5 tool calls
  rules:
    - name: "security"
      prompt: "Review the last 10 tool calls for security issues. Flag anything suspicious."
    - name: "performance"
      prompt: "Check for N+1 queries, blocking I/O, or unnecessary API calls."
```

### Watchdog Mode

The watchdog is a more aggressive variant that can **interrupt** a session when it detects a critical issue:

```yaml
# .omp/config.yml
watchdog:
  enabled: true
  severity: high          # Only trigger on high-severity issues
  action: pause           # Pause the agent and alert the user
  timeout: 30             # Maximum time to run a check
```

### Built-in Advisor Agents

The advisor system ships with built-in advisor agents that you can dispatch via the `task` tool:

```
Task: Review the last 5 commits for security vulnerabilities
Agent: advisor
```

---

## Step-by-Step: Setting Up Hooks

### Step 1: Create Hook Directory

```bash
mkdir -p .omp/hooks/post
```

### Step 2: Create a Post-Tool-Result Hook

Create `.omp/hooks/post/log-bash.ts`:

```typescript
import { HookAPI } from '@oh-my-pi/types';

export default async function hook(pi: HookAPI) {
  const result = pi.hook.toolResult;
  if (pi.hook.toolName === 'bash' && result.includes('error')) {
    pi.log.warn(`Bash command failed: ${pi.hook.toolArgs.join(' ')}`);
  }
}
```

### Step 3: Add Cost Tracking to Status Line

```yaml
# ~/.omp/agent/config.yml
statusLine:
  enabled: true
  segments:
    - type: model
    - type: cost
      format: "{cost} {arrows} ({window})"
    - type: provider
```

### Step 4: Test

```bash
cd your-project
omp
```

Inside the session, run any bash command. Check `~/.omp/agent/logs/hooks.log` for hook output.

---

## Pitfalls & Trade-offs

- **Hook errors are silent by default**: If a hook throws an error, OMP logs it but continues the session. Always test hooks with simple cases first.
- **Pre-hooks can block**: A pre-hook that throws or returns `false` will prevent the associated event from proceeding (e.g., a `tool_call` pre-hook can block the tool call entirely).
- **Stream rules use regex**: Complex regex patterns can slow down token streaming. Test performance with large outputs.
- **Subagent model costs**: Subagents inherit the parent session's model by default, but you can override per-agent. Spawning an Opus-level subagent for a simple task wastes budget.
- **Cost tracking is estimated**: OMP tracks token counts and applies provider pricing. Gateway-provided cost data (e.g., from OpenRouter) is authoritative for actual billed usage.

---

## Quick Reference

```bash
# Hooks
.omp/hooks/pre/*.ts      # Pre-event hooks
.omp/hooks/post/*.ts     # Post-event hooks

# Magic keywords
@ultrathink              # Maximum thinking budget
@orchestrate             # Multi-agent mode
@workflowz               # Named workflow
@deep                    # Deep context scan

# Stream rules (config.yml)
streamRules:
  - pattern: "(api_key|secret)=\"[^\"]+"
    replacement: "[REDACTED]"

# Cost tracking
omp usage                # Show usage report
statusLine.cost          # Live cost in status line

# Advisor
advisor.enabled: true     # Read-only monitoring
watchdog.severity: high   # Auto-intervention
```

---

## Key Takeaways

- **Hooks** run JavaScript/TypeScript in response to 8 agent lifecycle events, with pre/post phases.
- **Magic keywords** (`@ultrathink`, `@orchestrate`, `@deep`, etc.) switch agent behavior modes on the fly.
- **Stream rules** intercept and rewrite token streams mid-generation — unique to OMP.
- **Subagents** (task, scout, reviewer) can be dispatched via the `task` tool and discovered from `~/.omp/agent/agents/`.
- **Cost tracking** includes peak/off-peak pricing indicators, with `omp usage` for detailed reports.
- The **advisor/watchdog** mode provides continuous security, performance, and cost monitoring.

---

## 📚 Recommended Reading

1. [OMP Hooks Documentation](https://omp.sh/docs/hooks) — event types, API reference, examples
2. [OMP Task Agent Discovery](https://omp.sh/docs/task-agent-discovery) — subagent orchestration
3. [OMP Context Files](https://omp.sh/docs/context-files) — how OMP discovers context from various tools
4. [OMP Memory](https://omp.sh/docs/memory) — memory backends (`local`, `hindsight`, `mnemopi`, `sharpshooter`)
5. [OMP Advisor & Watchdog](https://omp.sh/docs/advisor-watchdog) — monitoring and intervention

---

<!-- Navigation: Bottom -->
[← Previous: 03. Configuration](./03-config.md) | ← [Back to Section Index](index.md) | [05. Building Agents →](05-building-agents.md)
