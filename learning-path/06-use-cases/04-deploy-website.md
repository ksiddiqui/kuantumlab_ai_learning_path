← [Back to Section Index](00-index.md) | ← [Previous Topic](03-gmail-research.md) | [Next Topic →](05-capstone.md)

[← Main Index](../00-index.md) → [Section Index](00-index.md) → **Website Deployment Under $5/Month**

---

# Use-Case 4: Create & Deploy a Website for Under $5

> **Build a responsive portfolio website — Home, About, Projects, Contact — and deploy it live on the internet using free hosting, for under $5/month (or $0 if you skip the custom domain).**

## 📺 Recommended Videos

1. [OpenCode Tutorial for Beginners: Setup, Agents, Skills & MCP](https://www.youtube.com/watch?v=uZGDO0L-Dr4) — using OpenCode for code generation
2. [VSCode + Cline + Continue \| NEVER PAY for CURSOR again](https://www.youtube.com/watch?v=0Gc_CwQG_GU) — file system control for project scaffolding
3. [This AI Tool Replaces Claude Code & is Free [Aider]](https://www.youtube.com/watch?v=5zPckD0uwrM) — Aider for surgical code edits

## Understanding Low-Cost Website Deployment

> The key insight: you can deploy a full static website for **$0 per month** using GitHub Pages or Cloudflare Pages. A custom domain costs ~$12/year (~$1/month), bringing the total to under $5/month. The AI agent handles all the code — HTML, CSS, JS, SEO meta tags, even the contact form.

### What Is It?

- **Frontend code generation** — the agent writes clean, responsive HTML/CSS/JS based on your description.
- **Static site hosting** — you push the files to a GitHub repo, and GitHub Pages or Cloudflare Pages serves them automatically over HTTPS with a global CDN.
- **SEO basics** — the agent adds `<meta>` tags, Open Graph headers, and a `sitemap.xml` so Google can find your site.
- **No backend needed** — contact forms use a free service like Formspree or EmailJS so submissions land in your inbox without a server.

### Why You Need This

- **Portfolios win jobs.** Every tech graduate needs a live portfolio site. This walkthrough gives you one in under 2 hours.
- **Free hosting is genuinely free** — GitHub Pages has no bandwidth limits or paywalls for public repos.
- **Full ownership** — your site lives in a git repo you control. No Squarespace or Wix lock-in.

## Before You Start

**Setup required:**
- GitHub account (free) — see [Section 10](01-local-machine.md) for sign-up
- OpenCode or OMP with a coding-capable model (Claude 3.5 Sonnet or better)
- Git installed locally

**Cost breakdown:**
| Item | Cost |
|---|---|
| GitHub account | Free |
| GitHub Pages hosting | Free |
| Custom domain (optional) | ~$12/year ($1/month) from Porkbun or Namecheap |
| **Total** | **$0–$1/month** |

## Step-by-Step Guide

### Step 1: Generate the Website Code

**Prompt:**
```text
Create a responsive single-page portfolio website for me as a software engineer. The page should have 4 sections:

1. **Home** — a hero with my name (Alex Chen), a short headline ("AI Tooling Engineer"), and a call-to-action button linking to my GitHub.
2. **About** — a short bio (2 paragraphs) about me learning AI agents and automation, plus a list of my technical skills (Python, JavaScript, SQL, Bash).
3. **Projects** — 3 project cards, each with a title, one-line description, and links to GitHub + live demo. Projects: "AI Research Report Generator", "Local Machine Audit Agent", "Email Topic Explorer".
4. **Contact** — a contact form with name, email, and message fields. Use Formspree (form action = https://formspree.io/f/your-form-id) so submissions go to my email. Also include my email address and links to GitHub, LinkedIn, and Twitter.

Requirements:
- Use vanilla HTML, CSS, and JavaScript (no frameworks)
- Make it mobile-responsive (hamburger menu on small screens)
- Use a clean, modern design with a neutral color palette
- Add smooth scrolling when clicking nav links
- Optimize for SEO: add meta description, Open Graph tags, and a favicon

Save all files in a folder called `portfolio-site/` with `index.html`, `style.css`, `script.js`, and a `README.md`.
```

**What the agent does:**
1. Creates the `portfolio-site/` directory.
2. Writes `index.html` with semantic HTML5, proper headings, and meta tags.
3. Writes `style.css` with CSS Grid/Flexbox for responsiveness.
4. Writes `script.js` for the mobile menu toggle and smooth scrolling.
5. Writes `README.md` with deployment instructions.

### Step 2: Get the Formspree Endpoint

> ⚠️ This step is done manually by you — the agent can't sign up for services.

1. Go to [https://formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy the endpoint URL (looks like `https://formspree.io/f/xvoodwqd`).
3. Replace `your-form-id` in `index.html` with your actual endpoint.

### Step 3: Initialize Git and Push to GitHub

**Prompt:**
```text
Set up git for the portfolio-site folder and push it to a new GitHub repository. Follow these steps:

1. Run `git init` in the portfolio-site folder
2. Create a `.gitignore` file (exclude node_modules, .DS_Store, etc.)
3. Make an initial commit with message "Initial portfolio site"
4. Create a new GitHub repository named "portfolio" using the GitHub CLI (`gh repo create`)
5. Push the local repo to GitHub (use main branch)
6. After pushing, verify by opening the GitHub repo URL

Do not run any destructive commands. Show me each command before executing.
```

**What the agent does:**
1. Initializes the git repository.
2. Creates `.gitignore`.
3. Stages and commits all files.
4. Creates a new GitHub repo via `gh repo create`.
5. Pushes the code.

### Step 4: Enable GitHub Pages (Free Hosting)

**Prompt:**
```text
Enable GitHub Pages for the portfolio repository. In the GitHub web UI:
1. Go to the repository → Settings → Pages
2. Under "Build and deployment", set Source to "Deploy from a branch"
3. Choose branch: "main", folder: "/ (root)"
4. Click "Save"

Then, verify the site is live at `https://your-github-username.github.io/portfolio/`. Wait up to 2 minutes and check the URL. Take a screenshot of the deployed site if possible.

If you can do this through the GitHub CLI instead, that's preferred.
```

**What the agent does:**
1. Either guides you through the web UI steps or uses `gh api` to enable Pages via the GitHub API.
2. Verifies the deployed URL is accessible.

### Step 5: (Optional) Add a Custom Domain

**Prompt:**
```text
I own the domain "alexchen.dev" purchased from Porkbun. Help me connect it to my GitHub Pages site:

1. In the Porkbun dashboard, add a CNAME record: name = "www", value = "your-github-username.github.io"
2. In the GitHub repo, create a `CNAME` file containing just `www.alexchen.dev`
3. Add DNS records (ALIAS/ANAME) for the apex domain (alexchen.dev → your-github-username.github.io)
4. Wait for propagation (TTL is usually 5–15 minutes) and verify with `curl -I https://www.alexchen.dev`

Show me the exact DNS record values needed.
```

## Skills Demonstrated

- **Frontend code generation** — producing clean, responsive HTML/CSS/JS from natural language
- **Static site deployment** — git → GitHub → GitHub Pages/Cloudflare Pages pipeline
- **SEO basics** — meta tags, Open Graph, favicons for discoverability
- **Domain configuration** — connecting a custom domain to free hosting

## Common Pitfalls

- ❌ **Formspree submissions fail silently** — On the free plan, Formspree requires email verification on the first submission. Check your inbox and click the verification link after the first form test.
- ❌ **GitHub Pages shows a 404** — It can take 1–2 minutes for Pages to build after the first push. Don't panic; refresh after waiting.
- ❌ **Custom domain CNAME conflicts** — You cannot have both a `CNAME` file and an A-record apex redirect on GitHub Pages. Use either `www` (CNAME) or apex (A-record), not both.
- ❌ **Agent forgets mobile responsiveness** — Always explicitly request a hamburger menu and test by resizing your browser.

## Quick Reference

| Step | Agent Action | External Action |
|---|---|---|
| 1 | Generate HTML/CSS/JS | — |
| 2 | — | Sign up for Formspree, copy endpoint ID |
| 3 | `git init`, commit, `gh repo create`, push | — |
| 4 | Enable GitHub Pages (web UI or `gh api`) | — |
| 5 | Create `CNAME` file | Add DNS records in domain registrar |
| Cost | $0 | ~$12/year for custom domain (optional) |

## Key Takeaways

- You can deploy a portfolio site for **$0/month** using GitHub Pages — no hosting bill ever.
- The agent generates all code, but you still need to configure the contact form service and domain manually.
- Always verify the live site after deployment — agents sometimes forget the favicon or misspell a URL.

## 📚 Recommended Reading (Web Links)

1. [GitHub Pages](https://pages.github.com/) — free static hosting documentation
2. [Cloudflare Pages](https://pages.cloudflare.com/) — alternative free static host with global CDN
3. [Porkbun](https://porkbun.com/) — affordable domains (~$12/year)
4. [Formspree](https://formspree.io/) — free contact form backend (50 submissions/month)
5. [OpenCode Documentation](https://docs.opencode.com/) — code generation workflows
6. [Claude Code Official Documentation](https://docs.anthropic.com/en/docs/claude-code) — agent-based code generation
7. [Aider Documentation](https://aider.chat/docs/) — surgical code editing with agents

---

← [Back to Section Index](00-index.md) | ← [Previous Topic](03-gmail-research.md) | [Next Topic →](05-capstone.md)

[← Main Index](../00-index.md) | [Section Index](00-index.md)
