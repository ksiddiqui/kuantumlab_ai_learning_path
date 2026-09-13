← [Back to Section Index](index.md) | ← [Previous Topic](01-writing-prompts.md) | [Next Topic →](03-prompt-libraries.md)

[← Main Index](../index.md) → [Section Index](index.md) → **Common Prompt Failures**

# Common Prompt Failures

> Learn the 5 most common reasons prompts fail with AI agents, and how to fix each one with a structural correction.

## 📺 Recommended Videos

1. [Let The LLM Write The Prompt 2025 | Design Perfect Prompts for AI Agent | Prompt Mistakes (PART 1/7)](https://www.youtube.com/watch?v=2BpCk4d2Cc0) — Covers how to design prompts agents can act on and walks through the most common prompt mistakes
2. [Roadmap to Become a Prompt Engineering Expert for Beginners in 2025!](https://www.youtube.com/watch?v=1y0GVzQXwKo) — A roadmap that includes a section on recognizing and fixing bad prompt patterns

## Understanding Prompt Failure Patterns

> Most prompt failures are **structural**, not model problems. If you understand the five failure patterns, you can diagnose an agent's failure in under 30 seconds and apply a targeted fix.

### What Causes Prompt Failures?

Unlike chatbots (which can recover from ambiguity through conversation), AI agents execute prompts **autonomously**. A single ambiguous sentence can cause:

- The agent to **waste 10–50 steps** chasing the wrong goal
- The agent to **hallucinate** a non-existent API or dependency
- The agent to **ignore constraints** you thought were clearly stated
- The agent to **produce output in the wrong format**, requiring manual post-processing

### Why You Need This

- **Point 1:** Every developer who works with agents hits these five failure patterns — recognizing them saves hours of debugging
- **Point 2:** Each failure has a **specific structural fix** — you don't need a better model, you need a better prompt structure
- **Point 3:** This section builds directly on the Context → Goal → Constraints structure from the previous page

## Failure Pattern 1: Vague Goals

### The Problem

The agent receives a goal like **"Fix the bug in the auth module"** and goes off in the wrong direction because:

- It doesn't know which bug
- It doesn't know what "fix" means (error message improved? test added? refactor?)
- It doesn't know when it's done

### Real Example

```text
Agent task: "Improve the search feature."

Agent response (after 20 steps):
"I've improved the search by adding a loading spinner, 
changing the button color, and adding type-ahead suggestions. 
However, the type-ahead isn't actually connected to the search 
endpoint."
```

The agent "improved" the wrong thing because the goal was vague.

### The Fix: Add Specificity Layers

Break the goal into **three specificity layers**:

1. **What** is the desired outcome? (Specific, measurable)
2. **How** will you verify it? (Concrete check)
3. **What not** to do? (Negative constraints)

```xml
<!-- Before (vague) -->
<goal>Fix the search feature.</goal>

<!-- After (specific) -->
<goal>
  Reduce search query latency from 800ms to under 200ms for queries 
  with fewer than 10,000 results.
  
  Verification: Run the benchmark script at scripts/benchmark_search.py 
  and confirm the average of 5 runs is under 200ms.
  
  Do NOT change the search API response format or add new query parameters.
</goal>
```

### How to Spot This Failure

| Symptom | Root Cause |
|---|---|
| Agent asks "Which one?" or "Can you clarify?" | Goal is ambiguous |
| Agent produces output that's "close but not quite" | Goal lacks specificity |
| Agent adds features you didn't ask for | Goal scope is undefined |

## Failure Pattern 2: Missing Context

### The Problem

The agent doesn't know the **project conventions**, **existing code patterns**, or **prior decisions**. It then:

- Writes code that doesn't match the codebase style
- Creates dependencies that are already installed differently
- Repeats mistakes another agent already solved

### Real Example

```text
Agent task: "Add a new API endpoint."

Agent response:
"I created src/api/v2/users.py with a Flask route. 
However, the project uses FastAPI, not Flask, and all existing 
endpoints are in src/routes/."
```

The agent had the goal right but lacked context about the project stack.

### The Fix: Pre-Load Essential Context

Before giving the agent a goal, provide a **context checklist**:

```xml
<context>
  <!-- Project conventions -->
  <framework>FastAPI</framework>
  <style_guide>PEP 8, line length 88, Black formatter</style_guide>
  
  <!-- Existing patterns -->
  <reference_implementation>
    See src/api/health.py for the standard endpoint pattern:
    - Uses pydantic BaseResponse model
    - Returns from src/services/ layer, not from route directly
    - All endpoints decorated with @router.get/@router.post
  </reference_implementation>
  <known_issues>
    - Do not use async_session — there's a known deadlock with PostgreSQL
    - The redis_client singleton is at src/utils/redis.py
  </known_issues>
</context>
```

### Context Checklist

Before writing the prompt, ask:

1. **What does the agent need to know about the project?** (framework, language, conventions)
2. **What patterns already exist that the agent should follow?** (file structure, naming, response formats)
3. **What decisions have already been made that the agent shouldn't revisit?** (library choices, rejected approaches)
4. **What prior attempts have been tried and failed?** (so the agent doesn't repeat them)

## Failure Pattern 3: No Guardrails (Missing Constraints)

### The Problem

Without constraints, the agent **hallucinates**, **wastes effort**, or **crosses boundaries**:

- It may call external APIs you didn't authorize
- It may modify files outside the intended scope
- It may spend 30 steps optimizing something that doesn't matter

### Real Example

```text
Agent task: "Write a function to parse CSV."

Agent response:
"I've created a full CSV parsing library with 15 functions, 
installed pandas, numpy, and 3 CSV-parsing libraries, 
and wrote a 500-line parser.py file. 
It depends on a package called 'pyexcel' that isn't in requirements.txt."
```

The agent over-engineered because there were no guardrails stopping it.

### The Fix: Add Explicit Constraints

Every prompt needs **three types** of constraints:

```xml
<constraints>
  <!-- Output constraints -->
  <max_output_lines>Do NOT produce more than 100 lines of code total.</max_output_lines>
  <output_format>Return ONLY a git diff — no explanations, no markdown.</output_format>
  
  <!-- Behavioral constraints -->
  <scope>Only modify files in src/parser.py.</scope>
  <dependencies>Use ONLY the Python standard library (csv, io).</dependencies>
  
  <!-- Budget constraints -->
  <max_steps>Maximum 5 agent iterations. If not done, output a diagnostic report instead.</max_steps>
</constraints>
```

### Constraint Categories

| Constraint Type | What It Does | Example |
|---|---|---|
| **Output format** | Controls what the agent returns | "Return only a unified diff" |
| **Scope** | Limits what the agent can touch | "Only modify files in src/api/" |
| **Dependencies** | Restricts what libraries/tools to use | "Do NOT install new packages" |
| **Budget** | Limits steps, time, or attempts | "Max 10 iterations" |

## Failure Pattern 4: No Output Format Specification

### The Problem

The agent doesn't know **what format** you want the output in, so it defaults to a **chat-style response**:

- It includes explanatory prose mixed with code
- It uses markdown when you need raw text
- It returns a plan when you need execution

### Real Example

```text
Expected: A Python function.
Received: 
"Here's how to write a CSV parser in Python. First, you'll want to 
import the csv module. Then, you need to handle edge cases like 
quoted fields and newlines..." [followed by 300 lines of explanation]
```

### The Fix: Specify Format and Delimiters

Force the agent into a specific output shape:

```xml
<goal>
  Write a CSV parser function and return it in this exact format:
  
  ```python
  def parse_csv(content: str) -> list[dict]:
      # your implementation
  ```
  
  Return ONLY this code block. Do not include any explanation, 
  prose, or markdown outside the code block.
</goal>
```

### Output Format Patterns

| Use Case | Format |
|---|---|
| Code change | `git diff` only |
| Data extraction | JSON with specific keys |
| Analysis | Markdown with specific headers |
| File creation | Raw file contents, no markdown |

## Failure Pattern 5: Undefined Failure Modes

### The Problem

When the agent hits a wall — it can't find a file, the API returns an error, it doesn't have enough info — it **hallucinates** a workaround instead of asking for help.

Because agents run autonomously, **you can't be there to answer mid-run**. You must pre-define what happens when things go wrong.

### Real Example

```text
Agent task: "Read config.yaml and return the database URL."

Agent response:
"I couldn't find config.yaml, but I found config.yml in a different 
directory. I'll use that one and change the extension in the code."
```

The agent guessed instead of stopping.

### The Fix: Define Failure Behavior

```xml
<constraints>
  <failure_mode>
    If config.yaml does not exist at src/config.yaml, STOP and output:
    "ERROR: src/config.yaml not found. Expected a file at this path."
    Do NOT search for alternative files or guess the path.
  </failure_mode>
  
  <failure_mode>
    If the API returns a 401 or 403, STOP and output:
    "ERROR: Unauthorized API access. Check credentials in .env."
    Do NOT retry with modified credentials or different endpoints.
  </failure_mode>
</constraints>
```

### Failure Mode Template

```xml
<failure_mode>
  IF [condition that indicates a blocker],
  THEN [exact output the agent should produce],
  DO NOT [what the agent is tempted to do instead].
</failure_mode>
```

## Common Pitfalls

- ❌ **Starting with a vague goal** — "improve this code" without specifying what "improve" means
- ❌ **Assuming the agent knows the codebase** — never assume context is "obvious"
- ❌ **Forgetting to set step limits** — without max_steps, agents loop forever on hard problems
- ❌ **Not specifying output format** — the agent dumps prose when you need a diff
- ❌ **Letting the agent guess on failures** — always define what to do when a dependency is missing or an API returns an error

## Quick Reference: Diagnose Quickly

| Symptom | Failure Pattern |
|---|---|
| Agent asks "what do you mean?" | Vague Goal |
| Agent ignores project conventions | Missing Context |
| Agent installs 10 packages | No Guardrails |
| Agent returns prose with code | No Output Format |
| Agent makes up API responses | Undefined Failure Modes |

## Key Takeaways

- **5 failure patterns** cover 90% of agent prompt problems: vague goals, missing context, no guardrails, no output format, undefined failure modes
- Each pattern has a **specific structural fix** — you don't need a better model
- **Diagnose quickly**: match the symptom to the pattern table and apply the corresponding fix
- Always define **what to do when things go wrong** — never let the agent guess

## 📚 Recommended Reading (Web Links)

1. [Learn Prompting — Common Prompting Mistakes](https://learnprompting.org/) — Community guide documenting the most frequent prompt mistakes and how to correct them
2. [Anthropic — How to Use XML Tags](https://docs.anthropic.com/en/docs/guides/prompt-engineering) — Official guide on using XML tags to structure prompts for Claude
3. [OpenAI — Structured Inputs](https://platform.openai.com/docs/guides/prompt-engineering) — OpenAI's guidance on structuring prompts with clear sections and output formats

---

← [Back to Section Index](index.md) | ← [Previous Topic](01-writing-prompts.md) | [Next Topic →](03-prompt-libraries.md)

[← Main Index](../index.md) | [Table of Contents](index.md)
