# Saba Janelidze Portfolio — Status

> Read this at the start of every session. Update it at the end.
> This file is in a **public** repo. Keep private things in `private/`.
> Last updated: **2026-10-08**

## Where we are

- **Live:** https://www.sabajanelidze.com. The own domain was added on 2026-10-07. Before that the site was at saba-janelidze.vercel.app, which still works.
- **Pitch (since 2026-04-20):** Senior Full-Stack Engineer, 3 years in production fintech (Bitnet), Backend Lead at Chama, founder of Playtime.ge and UniHub.
- **Projects shown:** Chama.ge, Playtime.ge, UniHub.
- **Deploy:** a push to `main` publishes it automatically on Vercel.

## Open problems (most important first)

1. **The page title and description show the old pitch.**
   - `index.html` still says "Saba Janelidze — Web Developer" and "I build websites that deliver results…".
   - Google results and link previews show this. The site itself now says Senior Full-Stack Engineer, fintech.
2. **Google Search Console:** check that `www.sabajanelidze.com` is added as a property. The check file already exists in `public/`. (This is part of the workspace pilot, Phase 4 in `../WORKSPACE-PLAN.md`.)
3. **No inbox on the domain yet:** `hello@sabajanelidze.com` doesn't exist. This is also part of the pilot (Cloudflare Email Routing).
4. **Cleanup to decide:**
   - `about-section.md` in the root is an old page dump (351 lines) from a browser tool. It's committed to git, but nothing uses it.
   - The old `*.png` screenshots in the root are gitignored and stay local.

## Next steps

- Saba decides the new title and description text (problem 1).

## Log

- **2026-10-08:** The contact form now emails Saba through **Resend**.
  - It sends from `contact@sabajanelidze.com` to Saba's Gmail, with Reply-To set to the visitor.
  - `sabajanelidze.com` is verified in Resend (EU region). Resend's DKIM and return-path records plus a DMARC record (`p=none`) were added in Cloudflare.
  - The key is in the Vercel env var `RESEND_API_KEY` (Production only). It can only send, and only from this domain.
  - The form now has a hidden spam trap, keeps the message text, and shows a "please email directly" message if sending fails.
- **2026-10-07:**
  - Bought `sabajanelidze.com` (Cloudflare) and connected it to Vercel. `www` is the main address.
  - Link-preview tags now use the new domain.
  - Set up the agent docs: `AGENTS.md`, `CLAUDE.md`, this `STATUS.md`, and the gitignored `private/` folder. `docs/overview.md` and `docs/roadmap.md` are brought up to date. `docs/content.md` and `docs/fix-plan.md` are marked historical.
- **2026-04-20:** Repositioned as a senior fintech engineer. Added Chama. Dropped DevNews. Added Chama's Lighthouse scores.
- **2026-03 to 2026-04:** Built the site (see `docs/roadmap.md`).
