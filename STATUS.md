# Saba Janelidze Portfolio — Status

> Read this at the start of every session. Update it at the end.
> This file is in a **public** repo. Keep private things in `private/`.
> Last updated: **2026-10-07**

## Where we are

- **Live:** https://www.sabajanelidze.com. The own domain was added on 2026-10-07. Before that the site was at saba-janelidze.vercel.app, which still works.
- **Pitch (since 2026-04-20):** Senior Full-Stack Engineer, 3 years in production fintech (Bitnet), Backend Lead at Chama, founder of Playtime.ge and UniHub.
- **Projects shown:** Chama.ge, Playtime.ge, UniHub.
- **Deploy:** a push to `main` publishes it automatically on Vercel.

## Open problems (most important first)

1. **The contact form doesn't deliver messages.**
   - `api/contact.ts` only writes the name, email and project type to Vercel's logs. **The message text is thrown away.**
   - The email-sending code is a commented-out TODO. The address it would send to, `saba@janelidze.dev`, is on a domain Saba doesn't own.
   - Visitors are still told "Expect an email from me within 24 hours".
   - The form's project types `fintech` and `fullstack` have no label in the API.
2. **The page title and description show the old pitch.**
   - `index.html` still says "Saba Janelidze — Web Developer" and "I build websites that deliver results…".
   - Google results and link previews show this. The site itself now says Senior Full-Stack Engineer, fintech.
3. **Google Search Console:** check that `www.sabajanelidze.com` is added as a property. The check file already exists in `public/`.
4. **Cleanup to decide:**
   - `about-section.md` in the root is an old page dump (351 lines) from a browser tool. It's committed to git, but nothing uses it.
   - The old `*.png` screenshots in the root are gitignored and stay local.

## Next steps

- Saba decides: fix problem 1 (how to send email) and problem 2 (new title and description text).

## Log

- **2026-10-07:**
  - Bought `sabajanelidze.com` (Cloudflare) and connected it to Vercel. `www` is the main address.
  - Link-preview tags now use the new domain.
  - Set up the agent docs: `AGENTS.md`, `CLAUDE.md`, this `STATUS.md`, and the gitignored `private/` folder. `docs/overview.md` and `docs/roadmap.md` are brought up to date. `docs/content.md` and `docs/fix-plan.md` are marked historical.
- **2026-04-20:** Repositioned as a senior fintech engineer. Added Chama. Dropped DevNews. Added Chama's Lighthouse scores.
- **2026-03 to 2026-04:** Built the site (see `docs/roadmap.md`).
