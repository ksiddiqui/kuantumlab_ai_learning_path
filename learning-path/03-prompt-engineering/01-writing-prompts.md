← [Back to Section Index](index.md) | [Next Topic →](02-common-failures.md)

[← Main Index](../index.md) → [Section Index](index.md) → **Writing Effective Prompts**

# Writing Effective Prompts

> Learn the structural patterns that make prompts understandable, actionable, and reliable for AI agents — not just chatbots.

## 📺 Recommended Videos

1. [Roadmap to Become a Prompt Engineering Expert for Beginners in 2025!](https://www.youtube.com/watch?v=1y0GVzQXwKo) — A structured roadmap for learning prompt engineering, covering fundamentals, techniques, and advanced topics
2. [Let The LLM Write The Prompt 2025 | Design Perfect Prompts for AI Agent | Prompt Mistakes (PART 1/7)](https://www.youtube.com/watch?v=2BpCk4d2Cc0) — How to design prompts the LLM can act on, and common mistakes to avoid
3. [Prompt Engineering Full Course](https://www.youtube.com/watch?v=37Gy9jtLFRU) — A comprehensive course covering prompt engineering fundamentals through advanced techniques

## Understanding Structured Prompts

> A structured prompt separates **instructions** (what to do), **context** (what you know), and **constraints** (what you must not do) so the agent can parse intent cleanly. Without structure, even powerful models fail because they don't know which parts of the prompt to prioritize.

### What Is It?

- A structured prompt is a **template** where each section has a defined role: context, goal, and constraints
- Unlike free-form chat, structured prompts use **delimiters** (XML tags, markdown headers, or clear separators) to make each section visually and semantically distinct
- Real-world analogy: Think of a prompt like a **recipe card**. You need ingredients (context), a goal (the dish), and constraints (dietary restrictions) — all in their own sections

### Why It Matters for AI Agents

- Agents make **decisions** based on the prompt; if the prompt is ambiguous, the agent's decisions become unreliable
- A well-structured prompt can be **reused across projects** — you swap out the context but keep the goal and constraints intact
- When an agent fails, structure makes **debugging** faster: you can look at the goal, then the context, then the constraints, and immediately see what's missing

### Why You Need This

- **Point 1:** Unstructured prompts cause agents to waste time and credits chasing the wrong goal — structured prompts save $10–$50 per task
- **Point 2:** Prompt structure is the foundation for every other technique in this section — XML tags, chain-of-thought, guardrails, and version control all build on it
- **Point 3:** If you skip this, you'll be debugging mysterious agent failures later instead of preventing them upfront

## The Core Structure: Context → Goal → Constraints

Every effective agent prompt follows this order. Read it like a decision tree: the agent first establishes what it knows, then decides what it wants, then figures out how to respect boundaries.

### 1. Context (What You Know)

The context section tells the agent **everything it needs to know** before acting. This includes:

- **Task-relevant information** — facts, data, or prior work the agent should use
- **Background details** — project name, tech stack, team norms, existing code conventions
- **Prior failures** — anything the agent should avoid repeating

```xml
<!-- Example: Bug Report Context -->
<context>
  <!-- Project Info -->
  <project>kuantumlab_ai_learning_path</project>
  <tech_stack>Python, FastAPI, PostgreSQL</tech_stack>
  
  <!-- The Issue -->
  <bug_report>
    The OpenCode agent sometimes returns truncated responses when generating 
    code with more than 200 lines. Users report this happens most often with 
    React components.
  </bug_report>
  
  <!-- Prior Investigation -->
  <prior_attempts>
    - Adding "be thorough" to the prompt did not help
    - Reducing max_tokens to 1024 made it worse
    - The issue only appears with function-calling models
  </prior_attempts>
</context>
```

> ⚠️ **Key Rule:** The context section should never contain instructions. It's pure information. The agent should read it first and then ignore it for the rest of the prompt.

### 2. Goal (What You Want)

The goal is a **single, specific outcome** — not a list of ideas to explore. It should answer: "What does success look like when this prompt is done?"

```xml
<!-- Example: Bug Fix Goal -->
<goal>
  Identify the root cause of truncated agent responses and create a fix that:
  1. Ensures responses are at least 95% complete (not truncated mid-line)
  2. Adds a warning token system so the agent can self-report when truncation risk is high
  3. Includes a unit test that verifies the fix with 500+ line outputs
  
  Output: A git diff with the fix applied, plus a one-paragraph summary of the root cause.
</goal>
```

#### Writing Specific Goals

Use the **STAR** framework to make goals specific:

| Element | Question | Example |
|---|---|---|
| **Situation** | What's the starting point? | Agent returns truncated 500-line responses |
| **Task** | What must be done? | Fix truncation, add warning system, write test |
| **Action** | What specific steps? | Add max token guard, emit warning, test with 500+ lines |
| **Result** | What defines success? | 95%+ complete responses, test passes |

### 3. Constraints (What You Must Not Do)

Constraints are the **hard boundaries** the agent must never cross. They prevent hallucination, wasted effort, and dangerous actions.

```xml
<!-- Example: Bug Fix Constraints -->
<constraints>
  <!-- Output Constraints -->
  <output_format>Produce a git diff only — no markdown explanation in the diff body.</output_format>
  <max_iterations>Maximum 15 agent iterations. If you can't produce a working diff in 15 steps, stop and output a diagnostic report.</max_iterations>
  
  <!-- Behavioral Constraints -->
  <forbidden_actions>Do NOT modify files outside the src/ directory.</forbidden_actions>
  <forbidden_actions>Do NOT use external libraries not already in requirements.txt.</forbidden_actions>
  
  <!-- Verification Constraint -->
  <verification>Must produce a passing unit test that proves the fix works with 500+ line outputs.</verification>
</constraints>
```

### Full Example Prompt

Here's a complete prompt that an AI agent would receive:

```xml
<context>
  You are modifying a FastAPI application that uses PostgreSQL and Redis.
  The codebase is organized as:
    src/api/       — API routes
    src/models/    — Pydantic models and DB schemas
    src/services/  — Business logic
    src/utils/     — Utility functions
  
  The current branch is feature/agent-debugging.
  Git commit hash: a3f7c2e (HEAD)
</context>

<goal>
  Add a rate-limiting middleware to the FastAPI app that:
  1. Limits each IP address to 100 requests per minute
  2. Returns HTTP 429 with a retry-after header when the limit is exceeded
  3. Stores counts in Redis with a TTL of 60 seconds
  The implementation must be in src/api/middleware/rate_limiter.py
  and registered in src/api/main.py.
  
  Output: A git diff showing all changes.
</goal>

<constraints>
  - Use only Redis-py and FastAPI built-in imports
  - Do NOT modify any test files
  - Max 4 code steps: write, register, test, diff
  - Output ONLY a git diff — no commentary
</constraints>
```

## Using XML Tags for Section Delimiters

XML tags are the most reliable way to delimit sections in a prompt because:

1. **All LLMs recognize them** — XML parsing is built into every model's training
2. **They nest cleanly** — you can have `<context>` containing `<project>` and `<bug_report>`
3. **They're invisible at output time** — the agent learns not to include XML tags in its response
4. **They're tool-call friendly** — agents that use tools can parse XML sections to extract parameters

### XML Tag Best Practices

| Practice | Do | Don't |
|---|---|---|
| Use descriptive names | `<context>`, `<task_goal>`, `<constraints>` | `<info>`, `<do>`, `<rules>` |
| Close every tag | Always write `</context>` | Forgetting the closing tag |
| Don't overload | One concept per tag | `<context_and_constraints>` |

### Alternative: Markdown Headers

If XML tags feel too verbose, you can use markdown headers:

```markdown
## Context
Everything the agent needs to know...

## Goal
What the agent should produce...

## Constraints
Hard boundaries the agent must not cross...
```

> ✅ **Pro tip:** Use XML tags when the prompt is parsed by tools (code agents, function calling). Use markdown headers when the prompt is mostly for human reading (blog post generation, content drafting).

## Chain-of-Thought: Let the Agent Think Before Acting

For complex tasks, add a **thinking section** that forces the agent to reason before outputting:

```xml
<thinking>
  Break this down into steps. For each step, identify:
  - What information do I already have from context?
  - What do I need to do in this step?
  - What could go wrong?
  - How does this step connect to the next?

  Write your plan here:
</thinking>
```

### When to Use Chain-of-Thought

| Scenario | Use CoT? | Why |
|---|---|---|
| Simple one-step task | No | Overhead without benefit |
| Multi-step debugging | Yes | Prevents skipping steps |
| Code review with 20+ files | Yes | Forces systematic analysis |
| Creative writing | No | Slows down generation |
| Security analysis | Yes | Prevents missing edge cases |

## Common Structural Patterns

### Pattern 1: Template + Fill

Create a reusable prompt template and swap the context per task:

```xml
<context>
  <template>bug_fix_template</template>
  <repo>{{ REPO_NAME }}</repo>
  <issue>{{ ISSUE_DESCRIPTION }}</issue>
  <branch>{{ BRANCH_NAME }}</branch>
</context>

<goal>
  {{ GOAL_DESCRIPTION }}
  Output: {{ OUTPUT_FORMAT }}
</goal>

<constraints>
  {{ CONSTRAINTS }}
</constraints>
```

### Pattern 2: Multi-Agent Handoff

When one agent's output feeds into another, structure the prompt so the receiving agent knows what to expect:

```xml
<previous_output>
  The previous agent produced a list of 5 files to modify. 
  Here is the output it returned.
  [FILE LIST HERE]
</previous_output>

<context>
  You are the second agent. Your job is to review the files the first agent selected
  and make the actual code changes.
</context>

<goal>
  Edit each file listed above to implement the feature...
</goal>
```

## Step-by-Step Guide

### Step 1: Write Down Your Goal First

Before you write any prompt, answer: **"What does the completed output look like?"**

- Is it a list? A code diff? A report? A set of modified files?
- How will you know it's correct?
- What are the hard boundaries?

> 💡 Write this down on paper or in a scratch file. The goal is your contract with the agent.

### Step 2: Gather All Context

List everything the agent would need to know:

- Project name, language, framework
- Existing conventions (e.g., "we use Black for formatting")
- Prior work or known issues
- File structure or relevant code snippets

Don't trust the agent to know what it doesn't know — give it everything explicitly.

### Step 3: Identify Your Constraints

List hard boundaries:

- What must NOT happen (no deleting files, no external API calls)
- Output format (diff only, markdown only, JSON only)
- Time/iteration budget (max 10 steps)
- Verification requirements (must include tests, must pass lint)

### Step 4: Assemble in Order

Put it together: Context → Goal → Constraints. Each section gets its own XML tag or markdown header.

### Step 5: Test and Iterate

Run the prompt against a real agent. If the agent fails, ask:

1. **Was the context sufficient?** Did the agent ask for information you didn't provide?
2. **Was the goal specific enough?** Did the agent produce something close but not quite right?
3. **Were the constraints clear?** Did the agent cross a boundary you didn't want crossed?

Refine and repeat. A good prompt takes 2–3 iterations.

## Common Pitfalls

- ❌ **Starting with the goal but forgetting context** — the agent doesn't know the project conventions and produces code that doesn't fit
- ❌ **Packing everything into one paragraph** — the agent can't tell which parts are instructions vs. data
- ❌ **Using ambiguous language** ("make this better", "fix the code") — the agent has no way to know what "better" means
- ❌ **Forgetting to close XML tags** — the agent may misinterpret the structure
- ❌ **Not specifying the output format** — the agent may return a chat explanation instead of a code diff

## Quick Reference

| Section | Purpose | Format |
|---|---|---|
| `<context>` | All information the agent needs | XML tags or plain text |
| `<goal>` | What to produce, how success is measured | Specific, measurable |
| `<constraints>` | Hard boundaries, must never violate | XML tags, one rule per line |
| `<thinking>` | Optional: force reasoning before acting | Free-form, chain-of-thought |

## Key Takeaways

- **Structure prompts** with Context → Goal → Constraints so the agent can parse intent cleanly
- **XML tags** (or markdown headers) make sections visually distinct and machine-parseable
- **Goals must be specific** — "fix the bug" is not enough; "produce a git diff that adds 95%+ complete responses" is
- **Constraints are hard boundaries** — the agent should know when to stop rather than guess
- **Test and iterate** — even good prompts take 2–3 runs to get right

## 📚 Recommended Reading (Web Links)

1. [Learn Prompting — Complete Prompt Engineering Course](https://learnprompting.org/) — A free, community-driven guide covering prompt engineering fundamentals through advanced techniques
2. [Anthropic — Prompt Engineering Guide](https://docs.anthropic.com/en/docs/guides/prompt-engineering) — Official guide covering techniques like chain-of-thought, XML tags, and how Claude processes prompts
3. [OpenAI — Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) — OpenAI's guide on writing effective prompts, including techniques for instruction following and structured outputs

---

← [Back to Section Index](index.md) | [Next Topic →](02-common-failures.md)

[← Main Index](../index.md) | [Table of Contents](index.md)
