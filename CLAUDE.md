@AGENTS.md

# Claude Code — extra notes

The shared rules are in `AGENTS.md` (imported above). This part is only for Claude Code.

- **Browser:** Playwright uses the `sabajanelidze` profile when Claude starts in this folder (see "Browser (Playwright)" in `../CLAUDE.md`). If a site asks for a login, stop and ask Saba to log in in that window.
- **Vercel:** the Vercel MCP tools can read this project (`saba-janelidze`): deployments, build logs, runtime logs. They can't change project settings. Do those in the Vercel dashboard through the browser.
- **Contact form messages** (until email sending is fixed) only show up in Vercel's runtime logs, and those logs are kept for a short time.
