← [Back to Section Index](00-index.md) | ← [Previous Topic](02-common-failures.md)

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Prompt Libraries & Version Control**

# Prompt Libraries & Version Control

> Turn your best prompts into reusable, tested assets. Learn to build a prompt library, version prompts like code, and test which prompts actually work.

## 📺 Recommended Videos

1. [Prompt Engineering Full Course](https://www.youtube.com/watch?v=37Gy9jtLFRU) — Comprehensive course covering prompt engineering fundamentals including templates and best practices
2. [Roadmap to Become a Prompt Engineering Expert for Beginners in 2025!](https://www.youtube.com/watch?v=1y0GVzQXwKo) — Roadmap covering advanced prompt engineering topics including libraries and templates

## Understanding Prompt Libraries

> A prompt library is a **structured collection of reusable prompt templates** that you can swap context into and version over time. Unlike ad-hoc prompts typed into ChatGPT, a library makes prompts testable, shareable, and improvable.

### What Is a Prompt Library?

- A **template file** that defines the Context → Goal → Constraints structure with placeholders
- A **variable injection system** that fills in project-specific details (repo name, issue description, etc.)
- A **version history** that tracks changes — so you can see which prompt version produced the best results

### Real-World Analogy

Think of a prompt library like a **cookbook**. Each recipe (prompt template) has:

- A **fixed structure** (the recipe steps)
- **Variable ingredients** (the specific data you fill in)
- A **version history** (you tweak recipes and note what improved)

### Why You Need This

- **Point 1:** Copying prompts from chat history is error-prone — you lose the context of what worked and what didn't
- **Point 2:** A library lets you **A/B test** prompt variants and track which produces better results
- **Point 3:** When you switch models (Claude to GPT to local LLM), you can apply the same prompt library across all of them

## Structuring a Prompt Library

### Directory Layout

```
prompts/
├── templates/           # Reusable prompt templates
│   ├── bug-fix.md       # Bug fixing template
│   ├── code-review.md   # Code review template
│   ├── feature-add.md   # New feature template
│   └── research.md      # Research agent template
├── variables/           # Per-project variable files
│   ├── prod.yaml        # Production variables
│   ├── staging.yaml     # Staging variables
│   └── dev.yaml         # Development variables
└── history/             # Versioned results
│   └── 2024-01-15-bug-fix-repo-v3.json
```

### Template File Structure

Each template file follows the same structure:

```markdown
---
title: Bug Fix Agent
description: Fixes bugs in code by analyzing errors and producing git diffs
version: 1.2.0
variables:
  - repo_name
  - issue_description
  - branch_name
  - tech_stack
---

## Context

You are working on `{{ repo_name }}`, a project using `{{ tech_stack }}`.
The current branch is `{{ branch_name }}`.

## Goal

Analyze the following bug report and fix it:

```
{{ issue_description }}
```

Produce a git diff that resolves the issue. Include only the files that need to change.
If you cannot fix the bug in 15 steps, output a diagnostic report instead.

## Constraints

- Do NOT modify files outside the scope described in the issue
- Do NOT install new dependencies
- Return ONLY a git diff — no explanation or markdown prose
```

### Variable Types

| Type | Example | Use Case |
|---|---|---|
| **String** | `{{ repo_name }}` | Project name, branch name |
| **Block** | `{{ issue_description }}` | Multi-paragraph text, code blocks |
| **List** | `{{{ tech_stack }}}` | Framework names, allowed libraries |
| **Conditional** | `{{ if has_tests }}` | Include test requirements only when needed |

## Version Control for Prompts

### Why Version Prompts?

- You change a prompt and the agent starts failing — you need to roll back
- You want to A/B test prompt versions to see which produces better results
- You collaborate with other developers who need to know the "current" prompt version

### Git Workflow for Prompts

```bash
# 1. Start from the last working version
git checkout prompts/v3.2-bug-fix.md

# 2. Create a new version
cp prompts/v3.2-bug-fix.md prompts/v3.3-bug-fix.md
# (Make your changes to context, goal, or constraints)

# 4. Test it
./run-agent.sh prompts/v3.3-bug-fix.md "my-issue"

# 5. If it works better, commit
git add prompts/v3.3-bug-fix.md
git commit -m "prompts: bump bug-fix template to v3.3 (improved constraint clarity)"

# If it's worse, delete the new version and start over
rm prompts/v3.3-bug-fix.md
```

### Version Format

Use **semantic versioning** with two components:

```
prompts/v<major>.<minor>-<template-name>.md
```

- **Major bump (v2 → v3):** Structural change — new sections, different XML tags, restructured goal
- **Minor bump (v1.1 → v1.2):** Refinement — clearer wording, added constraint, adjusted goal specificity

### Tracking Results

Store test results alongside prompts so you know what works:

```json
// prompts/history/2024-01-15-bug-fix-repo-v3.json
{
  "prompt_template": "prompts/v3.2-bug-fix.md",
  "input_issue": "Bug #42: Search returns truncated results",
  "model": "claude-3-5-sonnet-20241022",
  "steps_used": 12,
  "output": "git diff: 3 files changed, 45 insertions(+), 12 deletions(-)",
  "success": true,
  "notes": "Agent correctly identified root cause in query builder."
}
```

## Testing Prompt Libraries

### Prompt Evaluation Framework

Every prompt needs a **test harness** — a way to run it repeatedly and measure quality. Here's a minimal framework:

```python
# prompts/test_prompts.py
import json
from pathlib import Path

def run_prompt(template_path, variables, model="claude-3-5-sonnet"):
    """Run a prompt template and return the result + metrics."""
    # 1. Load template
    template = Path(template_path).read_text()
    
    # 2. Inject variables
    prompt = inject_variables(template, variables)
    
    # 3. Send to model
    result = model_call(prompt, model=model)
    
    # 4. Evaluate
    metrics = evaluate_result(result, variables["expected_check"])
    
    return {
        "template": template_path,
        "model": model,
        "result": result[:200],
        "metrics": metrics,
        "passed": metrics["score"] >= 0.8,
    }

def evaluate_result(result, expected_check):
    """Score a prompt result on correctness, completeness, and format compliance."""
    score = 0.0
    checks = []
    
    # Check 1: Output format (git diff)
    if result.startswith("diff --git"):
        score += 0.3
        checks.append("✅ Output is a git diff")
    else:
        checks.append("❌ Output is not a git diff")
    
    # Check 2: Contains expected change
    if "rate_limiter" in result.lower():
        score += 0.4
        checks.append("✅ Contains rate limiter")
    else:
        checks.append("❌ Missing rate limiter")
    
    # Check 3: No prose
    if result.count("```") == 0 and "Here is" not in result:
        score += 0.3
        checks.append("✅ No prose or markdown")
    else:
        checks.append("❌ Contains extra prose")
    
    return {"score": score, "checks": checks}
```

### A/B Testing Prompts

Compare two prompt versions on the same task:

```bash
# Run with prompt v3.2
RESULT_A=$(./run-agent.sh prompts/v3.2-bug-fix.md "issue-42" --json)

# Run with prompt v3.3
RESULT_B=$(./run-agent.sh prompts/v3.3-bug-fix.md "issue-42" --json)

# Compare
python prompts/compare.py "$RESULT_A" "$RESULT_B"
```

Output:
```
v3.2: score=0.7  (1 failed check: Missing rate limiter)
v3.3: score=0.9  (0 failed checks)
→ Promote v3.3 to production
```

### Continuous Prompt Testing

Set up a weekly test that runs your prompt library against a known set of issues:

```yaml
# .github/workflows/prompt-tests.yml
name: Prompt Tests
on:
  schedule:
    - cron: "0 9 * * 1"  # Every Monday at 9 AM
  workflow_dispatch:

jobs:
  test-prompts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: python prompts/test_prompts.py
      - run: python prompts/compare.py --notify-if-regression
```

## Common Pitfalls

- ❌ **Hardcoding context** — if the repo name is in the template, you can't reuse it elsewhere
- ❌ **No version tracking** — you change a prompt, it breaks something, and you can't roll back
- ❌ **Not testing before deploying** — assuming a prompt change is harmless without testing it
- ❌ **Putting logic in the template** — the template should be pure structure; the variables carry the logic
- ❌ **Forgetting to track results** — without knowing which version worked, you can't improve

## Quick Reference

| Operation | Command/Pattern |
|---|---|
| Create new template | `cp template-v1.0.md template-v1.1.md` |
| Run prompt | `./run-agent.sh prompts/template.md --vars variables/project.yaml` |
| Test prompt | `python prompts/test_prompts.py` |
| Compare versions | `python prompts/compare.py result-a.json result-b.json` |
| Version bump | Minor for wording changes, Major for structural changes |

## Key Takeaways

- **Prompt libraries** turn one-off prompts into reusable, tested assets
- **Version prompts** like code — semantic versioning, git history, rollback capability
- **Test before deploying** — a broken prompt costs real money and wastes agent iteration budget
- **Track results** — store which prompt version produced which outcome so you can improve over time
- **A/B test** — when you refine a prompt, compare it against the last known-good version before promoting

## 📚 Recommended Reading (Web Links)

1. [Learn Prompting — Prompt Engineering Tips](https://learnprompting.org/) — Community-maintained guide with practical tips and techniques for prompt engineering
2. [Anthropic — Prompt Engineering Guide](https://docs.anthropic.com/en/docs/guides/prompt-engineering) — Official Anthropic guide covering structured prompts, XML tags, and testing strategies
3. [OpenAI — Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) — OpenAI's guidance on prompt design, structured outputs, and evaluation techniques

---

← [Back to Section Index](00-index.md) | ← [Previous Topic](02-common-failures.md)

[← Main Index](../00-index.md) | [Table of Contents](00-index.md)
