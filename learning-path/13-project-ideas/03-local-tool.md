<!-- Navigation: Top -->
← [Back to Section Index](index.md) | ← [Previous Topic](02-mobile-app.md) | [Next Topic →](04-linkedin.md)

<!-- Navigation: Breadcrumb -->
[← Main Index](../index.md) → [Section 12: Project Ideas](index.md) → **CLI Life Assistant**

# CLI Life Assistant + Privacy-First Data Dashboard

> Build a single terminal tool (Python or TypeScript) that does five things: email summary, calendar check, news briefing, Pomodoro timer, and a system health check — all driven by an agent + MCPs. Then build a privacy-first dashboard that reads your local bank CSV export and fitness data, renders an HTML dashboard, and refreshes daily via cron.

This is the "zero-cloud" capstone. Nothing leaves your computer. Your Gmail MCP reads locally, your financial CSVs stay in your Downloads folder, and the dashboard runs on `localhost`. It's simultaneously the most practical project (you'll actually use it) and the strongest privacy story for an interview.

## 📺 Recommended Videos

1. [oh-my-pi: The Coding Agent With An IDE Inside](https://www.youtube.com/watch?v=0fAMlarIELw) — OMP and its hook/agent system (Section 7)
2. [MCP Complete Explanation](https://www.youtube.com/watch?v=_fzpnqt39jZ) — how MCP connects your local tools to an agent (Section 3)
3. [How to Run Local LLMs with Ollama](https://www.youtube.com/watch?v=qwdFfEc7wME) — local summarisation for the news briefing (Section 11)

## Understanding the Two Tracks

### CLI Life Assistant
- **Problem it solves:** You context-switch between Gmail, Google Calendar, your news reader, and a terminal. Opening 5 apps to "get up to speed" wastes 10 minutes every morning.
- **How it works:** One command (`life`) runs an agent that: reads your 3 most recent unread emails, checks your calendar for today's events, pulls a 3-sentence news briefing, starts a Pomodoro timer, and runs `df -h` + `ps aux`. Output is a single markdown block in your terminal.

### Privacy-First Data Dashboard
- **Problem it solves:** You export your bank transactions (CSV) and your fitness data (CSV/GPX), but they sit in files you never open. You want a "personal CFO + health dashboard" but won't upload sensitive data to a third-party site.
- **How it works:** A script reads the CSVs, computes monthly spending by category + step-count trends, generates an `index.html` with Chart.js, and a cron job reruns it daily so the dashboard is always fresh.

> 💡 **Why this combo?** The CLI assistant teaches you agent + MCP wiring. The dashboard teaches you data parsing + local automation. Together they cover the full "agent does work → human sees results" loop that every real product needs.

## Project Breakdown

| Phase | Deliverable | Key Skills |
|---|---|---|
| A | CLI scaffold + agent prompt | OMP/Claude Code, arg parsing, markdown output |
| B | MCP integration (Gmail, Calendar, Shell) | MCP server setup, OAuth, local tool wiring |
| C | Dashboard data pipeline | CSV parsing (pandas), Chart.js, HTML generation |
| D | Cron automation | cron/crontab, path safety, idempotency |
| E | Polish + deploy | README, one-command install, error handling |

## Step-by-Step Guide

### Step 1: Scaffold the CLI tool

Pick Python (easier for CSV/data work) or TypeScript (faster async for MCP). Python wins here because of `pandas` for the dashboard. Scaffold:

```bash
mkdir life-assistant && cd life-assistant
python -m venv .venv && source .venv/bin/activate
pip install pandas click rich mcp
npm install  # only if using ts-toolbelt-style MCP
```

```python
# life.py
import click
from rich.console import Console
from rich.markdown import Markdown

@click.group()
def cli():
    """Life assistant: your terminal command center."""

@cli.command()
@click.option("--brief", is_flag=True, help="Show only headlines")
def morning(brief):
    """Run the full morning briefing."""
    console = Console()
    report = run_agent_briefing(brief=brief)
    console.print(Markdown(report))

if __name__ == "__main__":
    cli()
```

Make it executable and install globally:

```bash
chmod +x life.py
ln -s $(pwd)/life.py /usr/local/bin/life
life morning   # should print your first (stub) report
```

### Step 2: Wire up the agent with MCPs

Configure the MCPs your assistant needs. In OMP (`~/.omp/config.yaml`) or OpenCode (`~/.opencode.json`):

```yaml
# OMP global config excerpt
mcp:
  - name: gmail
    command: python3
    args: ["-m", "mcp_gmail"]
  - name: google-calendar
    command: npx
    args: ["-y", "@gongtzu/mcp-google-calendar"]
    env:
      GOOGLE_CLIENT_ID: "..."
      GOOGLE_CLIENT_SECRET: "..."
  - name: shell
    # built-in; lets the agent run `df`, `ps`, etc.
```

> 🔐 **OAuth note:** The Gmail and Calendar MCPs need Google OAuth. Run the auth flow once and save credentials to `~/.gmail-mcp/credentials.json` and `~/.gcal-mcp/`. Add these to `.gitignore` — **never commit credentials.**

### Step 3: Write the agent prompt (the "brain")

Create `prompts/morning-brief.md`:

```xml
<task>
You are a morning briefing assistant. Produce a single markdown report.
</task>

<instructions>
1. Check Gmail for the 3 most recent UNREAD emails. For each: sender, one-line summary, action required (yes/no).
2. Check Google Calendar for TODAY's events. List start times and titles.
3. Fetch the top 3 headlines from a tech-news source (use the web-search tool).
4. Start a Pomodoro timer (25 min) — return a message saying it's running.
5. Run system checks: `df -h` (disk), `free -h` (memory), and `ps aux | head -5` (top processes).
6. Compile everything into markdown with these section headers:
   ## 📬 Email
   ## 📅 Calendar
   ## 📰 News
   ## ⏱ Pomodoro
   ## 💻 System Health
</instructions>

<constraints>
- If a tool fails, note it as "⚠️ Unavailable" — do NOT crash the report
- Keep each section to 3-5 lines max
- Use emojis in headers for scannability
</constraints>
```

Run it through OpenCode/OMP:

```bash
opencode --prompt-file prompts/morning-brief.md --output-format markdown
```

### Step 4: Build the data dashboard pipeline

Create `dashboard/build.py` — a standalone script that reads CSVs and renders HTML:

```python
import pandas as pd
from pathlib import Path
import json

def build_dashboard():
    base = Path.home() / "Downloads"
    
    # 1. Bank CSV → spending by category
    bank = pd.read_csv(base / "transactions.csv", parse_dates=["Date"])
    bank["Category"] = bank["Category"].fillna("Uncategorized")
    spend_by_cat = bank.groupby("Category")["Amount"].sum().round(2)
    
    # 2. Fitness CSV → steps over last 30 days
    fit = pd.read_csv(base / "fitbit_daily.csv", parse_dates=["Date"])
    fit = fit.sort_values("Date").tail(30)
    
    # 3. Write JSON for the HTML template
    (Path("dashboard") / "data.json").write_text(json.dumps({
        "spending": spend_by_cat.to_dict(),
        "steps": fit[["Date", "Steps"]].to_dict(orient="records"),
    }, default=str))
    
    return "dashboard/data.json written"

if __name__ == "__main__":
    print(build_dashboard())
```

### Step 5: Generate the HTML dashboard

Use Chart.js for charts (no React needed — just vanilla HTML/JS that reads the JSON):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>Personal Dashboard</h1>
  <div>Last updated: <span id="updated"></span></div>
  <canvas id="spendingChart"></canvas>
  <canvas id="stepsChart"></canvas>
  <script>
    fetch('data.json')
      .then(r => r.json())
      .then(d => {
        new Chart(document.getElementById('spendingChart'), {
          type: 'doughnut',
          data: { labels: Object.keys(d.spending), datasets: [{ data: Object.values(d.spending) }] }
        });
        new Chart(document.getElementById('stepsChart'), {
          type: 'line',
          data: { labels: d.steps.map(s => s.Date), datasets: [{ label: 'Steps', data: d.steps.map(s => s.Steps) }] }
        });
        document.getElementById('updated').textContent = new Date().toLocaleString();
      });
  </script>
</body>
</html>
```

### Step 6: Automate with cron (daily refresh)

Add a cron entry so the dashboard rebuilds every morning at 8 AM:

```bash
# Edit your crontab
crontab -e
# Add line:
0 8 * * * cd /path/to/life-assistant/dashboard && python build.py
```

> ⚠️ **Path safety:** cron runs with a minimal `PATH`. Always use absolute paths in cron and in your Python scripts (`Path.home() / "Downloads"`). Never use relative paths from a cron job — they'll fail silently.

### Step 7: Polish and install

- Add an `install.sh` that symlinks the CLI, sets up the cron job, and opens the dashboard.
- Write a `README.md` explaining the prerequisites (bank CSV format, fitness export path) — interviewers will read this.
- Make the dashboard serve locally: `python -m http.server 8000` from the `dashboard/` folder.

## Common Pitfalls

- ❌ **Gmail MCP OAuth fails silently** — the MCP returns an error but OpenCode swallows it. Fix: test the MCP independently with `python -m mcp_gmail` and read its stdout.
- ❌ **Bank CSV columns are inconsistent** — Chase, Wells Fargo, and Capital One use different column names. Fix: write a `normalize_csv()` function that maps known variants to `Date`, `Description`, `Amount`, `Category`.
- ❌ **Dashboard shows empty charts** — the JSON wasn't regenerated. Fix: make `build.py` idempotent and check the file timestamp in the HTML header.
- ❌ **Cron job never runs** — macOS requires "Full Disk Access" for terminal automation; Linux needs `cron` installed (`sudo apt install cron`). Fix: test with a 1-minute schedule first (`* * * * * date >> /tmp/cron-test.log`).
- ❌ **Sensitive data in the repo** — Fix: never commit the CSVs. Add `data.json`, `transactions.csv`, and `credentials*` to `.gitignore`. The dashboard JSON should not contain PII.

## Quick Reference

| Task | Command |
|---|---|
| Scaffold CLI (Python) | `python -m venv .venv && pip install click rich pandas` |
| Install Gmail MCP | `pip install mcp-gmail` |
| Build HTML dashboard | `python dashboard/build.py` |
| Serve dashboard | `python -m http.server 8000` (from `dashboard/`) |
| Add cron job | `0 8 * * * /usr/bin/python3 /path/to/build.py` |
| Run agent prompt | `opencode --prompt-file prompts/morning-brief.md` |
| Format CSV column | `df["Category"] = df["Category"].fillna("Uncategorized")` |

## Key Takeaways

- The CLI Assistant is an **agent + MCP wiring exercise** — the dashboard is a **data pipeline exercise**. Together they prove you can bridge "AI does work" and "human sees results."
- **Privacy-first isn't a marketing claim here** — nothing is uploaded. Bank CSVs, emails, and health data stay on the machine. That's a concrete interview talking point.
- **cron is unforgiving.** Always test with absolute paths and a short schedule first. Most "it worked locally but not in prod" failures are cron path issues.
- **Ship the dashboard as a self-contained `index.html`** — open it from `localhost:8000` and it works. No deployment, no server, no risk.

## 📚 Recommended Reading (Platform Docs)

1. [Oh My Pi Documentation](https://omp.ohmy.tools/) — global config, hooks, and agent orchestration
2. [Model Context Protocol](https://modelcontextprotocol.io/docs/introduction) — MCP architecture and built-in servers
3. [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk) — building/wiring custom MCP servers
4. [pandas Documentation](https://pandas.pydata.org/docs/) — CSV parsing, grouping, and data cleaning
5. [Chart.js Documentation](https://www.chartjs.org/docs/) — charting for the HTML dashboard
6. [CronHowTo](https://man7.org/linux/man-pages/man5/crontab.5.html) — crontab format and path gotchas
7. [Rich: Python library](https://rich.readthedocs.io/) — colored terminal output and markdown rendering

---

<!-- Navigation: Bottom -->
← [Back to Section Index](index.md) | ← [Previous Topic](02-mobile-app.md) | [Next Topic →](04-linkedin.md)

[← Main Index](../index.md) | [Section Index](index.md)
