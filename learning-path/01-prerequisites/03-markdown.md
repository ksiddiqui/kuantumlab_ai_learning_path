---

← [Back to Section Index](index.md) | ← [Previous Topic](02-llms-work.md)

---

[← Main Index](../index.md) → [Section Index](index.md) → **Markdown for Agents**

---

# Markdown for Agents

> **Learn the Markdown formatting that AI agents read, write, and expect — so your instructions are clear and your code comments are clean.**

Markdown is a lightweight text format that is easy for humans to read and easy for computers to parse. Every AI agent uses it: your prompts, your code comments, your README files, and your agent configuration all use Markdown. Master it in 10 minutes.

## Understanding Markdown

### What Is Markdown?

- **Markdown** is a plain-text format for writing structured documents using simple symbols like `#`, `*`, and `-`
- A Markdown file (`.md`) looks like normal text, but special characters tell the reader how to structure it
- AI agents do not see colors or fonts — they see Markdown. Clear Markdown means clear instructions

> 🤖 **Why agents love Markdown:** When you write prompts with Markdown headings, bullet lists, and code blocks, the agent can parse your intent at a glance. Without structure, everything blends together.

### Why This Matters for AI Agents

- **Prompts:** Structured prompts with headings and bullet points get better responses from agents
- **Code:** Markdown code blocks tell the agent "this is Python, not English"
- **Files:** READMEs, instructions, and configuration files are almost always Markdown
- **Communication:** When an agent writes back, it uses Markdown — you need to read it correctly

> 🖥️ **Markdown logo**
> ![Markdown and the agent workflow](assets/markdown-logo.png)
> *Markdown is the universal language between you and your AI agent.*

## Step-by-Step Guide

### Step 1: Headings

Use `#` for headings. More `#` = smaller heading.

```markdown
# Main Title (one #)
## Section Heading (two ##)
### Subsection (three ###)
#### Sub-subsection (four ####)
```

**When you see this:**
```markdown
# Project Plan
## Phase 1: Setup
### Step 1.1: Install tools
```

**The agent understands:**
- `Project Plan` is the main topic
- `Phase 1: Setup` is a major section
- `Step 1.1` is a detail under that section

> 💡 **Tip:** Use one `#` for the title of your prompt, then `##` for each instruction. Agents follow heading structure naturally.

### Step 2: Lists

**Bullet lists** use `-` or `*`:

```markdown
- First item
- Second item
  - Nested under the second item
- Third item
```

**Numbered lists** use `1.`, `2.`, etc.:

```markdown
1. First step
2. Second step
3. Third step
```

> 💡 **Tip:** AI agents follow numbered steps exactly. If you need an agent to do tasks in order, use a numbered list.

### Step 3: Code Blocks

Enclose code in triple backticks. Always specify the language:

````markdown
```python
def greet(name):
    return f"Hello, {name}!"

greet("world")
```
````

````markdown
```bash
git add .
git commit -m "Initial commit"
git push
```
````

**Inline code** uses single backticks:

```markdown
Type `python3 script.py` to run the file.
Use the `temperature` parameter to control creativity.
```

> ❌ **Common mistake:** Forgetting the language after the backticks. Without `` ```python ``, the agent might not know it's Python code.

### Step 4: Formatting Text

```markdown
**Bold text** — use for emphasis or key terms
*Italic text* — use for subtle emphasis
~~Strikethrough~~ — use to show removed text
```

### Step 5: Links and Images

```markdown
[Display Text](https://example.com)
![Alt Text](path/to/image.png)
```

**Examples:**

```markdown
[OpenAI Documentation](https://platform.openai.com/docs)
![Architecture Diagram](assets/llm-model.png)
```

> 💡 **Tip:** Images are relative paths. If your Markdown file is in `01-prerequisites/`, an image in `01-prerequisites/assets/` is linked as `assets/image-name.png`.

### Step 6: Tables

```markdown
| Tool | Purpose | Cost |
|------|---------|------|
| VS Code | Code editor | Free |
| Git | Version control | Free |
| Node.js | JavaScript runtime | Free |
```

**Renders as:**

| Tool | Purpose | Cost |
|------|---------|------|
| VS Code | Code editor | Free |
| Git | Version control | Free |
| Node.js | JavaScript runtime | Free |

> 💡 **Tip:** Always include the separator row (`|---|---|`) after your headers. Without it, the table does not render.

### Step 7: Blockquotes

Use `>` for notes, tips, or warnings that set something apart:

```markdown
> 💡 **Tip:** Follow the steps in order. Each one builds on the last.
>
> ⚠️ **Warning:** Do not share API keys in public repositories.
```

### Step 8: Horizontal Rules

Three or more dashes create a visual separator:

```markdown
---

Some content above, some below.
```

## Common Pitfalls

- ❌ **Forgetting code block languages** — `` ```python `` and `` ```bash `` let the agent know the language. Plain `` ``` `` leaves it confused.
- ❌ **Wrong image paths** — If your Markdown file is in a subfolder, images may be at `assets/`, not `assets/`.
- ❌ **Missing table separators** — Every table needs a `|---|---|` row after the headers.
- ❌ **Nested lists without indentation** — Use two spaces (or a tab) to indent nested bullets. The agent may miss unindented items.
- ❌ **Mixing `-` and `*` bullets** — Pick one style and stick with it. Mixed lists can confuse readers.

## Quick Reference

| Markdown | Renders As | Use For |
|---|---|---|
| `# Heading` | Large heading | Document title |
| `## Heading` | Medium heading | Section titles |
| `- item` | • item | Unordered lists |
| `1. item` | 1. item | Step-by-step instructions |
| `` `code` `` | `code` | Inline code |
| ` ```python` | Code block | Multi-line code |
| `**bold**` | **bold** | Emphasis |
| `[text](url)` | text link | Links |
| `![alt](img.png)` | Image | Images |
| `\| \|` | Table | Tabular data |
| `> quote` | Quote | Notes and tips |
| `---` | Horizontal line | Section breaks |

## Key Takeaways

- Markdown uses simple symbols (`#`, `-`, `1.`, `` ` ``, `>`) to structure text
- **Headings + numbered lists** guide agents through multi-step instructions
- **Code blocks with languages** (`` ```python ``) prevent agents from misreading code as prose
- **Tables and blockquotes** make documents scannable and instructions clear
- Every agent — including the ones in this learning path — reads and writes Markdown

## 📚 Recommended Reading (Web Links)

1. [Markdown Guide](https://www.markdownguide.org/) — The complete Markdown reference (syntax, examples, cheat sheet)
2. [CommonMark](https://commonmark.org/help/) — The official Markdown specification (what counts as "correct" Markdown)
3. [GitHub Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github) — GitHub's Markdown extensions (tables, task lists, mentions)

---

← [Back to Section Index](index.md)

[← Main Index](../index.md) | [Table of Contents](index.md)
