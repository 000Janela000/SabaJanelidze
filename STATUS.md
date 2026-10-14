# Saba Janelidze Portfolio — Status

> Read this at the start of every session. Update it at the end.
> This file is in a **public** repo. Keep private things in `private/`.
> Last updated: **2026-10-15**

## Where we are

- **Live:** https://www.sabajanelidze.com. The own domain was added on 2026-10-07. Before that the site was at saba-janelidze.vercel.app, which still works.
- **Pitch (since 2026-04-20):** Senior Full-Stack Engineer, 3 years in production fintech (Bitnet), Backend Lead at Chama, founder of Playtime.ge, WasteAway and UniHub.
- **Projects shown, in this order:** Bitnet.ge, Playtime.ge, WasteAway, Chama.ge, UniHub. (Bitnet and WasteAway added 2026-10-13; see the log.)
- **Deploy:** a push to `main` publishes it automatically on Vercel.
- **Rebuild (branch `rebuild`, local only, not pushed):** a new Astro 7 site. Phase 1 (skeleton + four design directions) and Phase 1b (the notebook home page) are done. **Phase 1c is done:** after two independent design reviews, Saba reset the home page to direction A's calm layout. Light and dark themes, no grid, no glow. Its text is a draft until Saba approves it. The live site on `main` is untouched.

## Open problems (most important first)

1. **The page title and description show the old pitch.**
   - `index.html` still says "Saba Janelidze — Web Developer" and "I build websites that deliver results…".
   - Google results and link previews show this. The site itself now says Senior Full-Stack Engineer, fintech.
2. **The speed score the site shows is a desktop score.**
   - `src/lib/lighthouse.ts` shows performance **92**, from a **desktop** test on 2026-03-30 (`lh-analysis.json`).
   - Real **mobile** today (PageSpeed, 2026-10-08, middle of 3 runs): **performance 66**, SEO 100, accessibility 96, best practices 96. LCP (main content load) is 5.3 s.
   - PageSpeed defaults to mobile, so a visitor who checks will see a lower number than the site claims.
   - Saba decides: speed up mobile (e.g. lighter hero / three.js loading), or label the shown scores "desktop".
   - Re-check with `node ../_shared/tools/google.mjs psi https://www.sabajanelidze.com/`.
3. **Cleanup to decide:**
   - `about-section.md` in the root is an old page dump (351 lines) from a browser tool. It's committed to git, but nothing uses it.
   - The old `*.png` screenshots in the root are gitignored and stay local.

## Next steps

- Saba opens http://localhost:4321/ (run `npm run dev` on the `rebuild` branch), tries both themes (footer: "Theme: Light · Dark · Auto"), and approves or edits the draft texts (the lines marked "DRAFT" in `src/content/home.ts`).
- A 5-second test of the first screen with 2 or 3 real people (one picture per theme).
- The lab site gets design tokens **version 2** (`src/styles/tokens.css`; what changed is at the top of `docs/design-tokens.md`): theme names `light` / `dark`, no grid or glow tokens.
- Before launch: re-check the bitnet.ge counters (219,755 users, 2,537,505 transactions on 2026-10-14). The Bitnet card's screenshot (13 Oct) shows older counters.

## Log

- **2026-10-15 (rebuild, Phase 1c "Calm"):** The home page `/` was redesigned after two independent design reviews. Both ranked direction A first.
  - Kept: direction A's skeleton with the Phase 1b build quality and real content. Removed everywhere on the home page: the graph-paper / blueprint grid, the WebGL glow, the notebook labels ("rev.", "fig.", "table", "§"), the offset button shadow, and every unfinished part (build receipt, lab "coming soon" cards, the inert "Ask" box, the game teaser).
  - Hero: one small line "Saba Janelidze · Principal Engineer, Bitnet", the pitch as the h1, one proof sentence, **Email me** (a plain email link) and "For hiring managers →", then one row of four dated numbers. No figure on the right.
  - Order: Selected work (outcome first, Bitnet first; Chama and UniHub as short text cards, so no empty UniHub thumbnail), What I do, one static method diagram ("How I work with AI agents"), About, Contact. The stepped explainers moved to `src/components/parked/` for a later "How I work" page.
  - Phone: the header shows only the name, Work and Contact, so nothing scrolls sideways at 320, 360, 375 or 390 px (it overflowed to 382 px on a 375 px screen before). The page is 6.7 phone screens long at 390 px (about 18 before).
  - Themes: light (navy on warm off-white, one calm blue) and dark (a calm slate). The switch moved to the footer: "Theme: Light · Dark · Auto". Instant, no animation. Design tokens version 2.
  - `/book` is now an honest "Get in touch" page (email + LinkedIn). It still reads `?from=` for the lab's links. `/cv` says LinkedIn has the full history and the CV comes on request. No "coming soon" anywhere a visitor can see. The KA link is hidden until the Georgian page exists.
  - Contrast audit (both themes, desktop and phone, text against the real pixels behind it, hover, focus, visited, non-text, axe-core): 0 failures. The old design had 109 (grid lines and the glow behind text, faint control borders); axe-core had found none of them.
  - Lighthouse mobile, median of 3, both themes: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.43 s; layout shift 0; 0.9 KB of JavaScript (gzip) on the home page (3.8 KB before).
  - Nothing was pushed or deployed.

- **2026-10-15 (rebuild, Phase 1b):** The real home page `/`, built from direction C and polished.
  - Two themes from one design: **Paper** (light) and **Blueprint** (dark, blue grid). The system setting decides until the visitor uses the header switch; the choice is remembered. No flash of the wrong theme. The switch reveals the new theme in a circle (View Transitions) unless the visitor prefers less motion.
  - In Blueprint, on desktop only, a slow WebGL glow sits behind the hero. It settles when the visitor is quiet, pauses when not visible and has a "Pause background" button. Phones, Paper and reduced motion never load it.
  - Hero: "Principal Engineer · Fintech & AI", the pitch, a proof line, Book a call, For hiring managers, and **fig. 1 "What green tests miss"**, a step-through release log (Play / Pause / Back / Step; every word is in the HTML).
  - The "runs once" figure moved under "Fintech & payment systems" as fig. 2, told as a system rule. Richer project cards (image, one-line outcome, tags). The game teaser now links to the lab's payments incident.
  - Design tokens in one file, `src/styles/tokens.css`, with a guide in `docs/design-tokens.md`. Shared building blocks in `src/styles/notebook.css`.
  - New PlayTime card image (a fresh screenshot of the live site; the old one showed numbers that were not true). Placeholder pages `/book` and `/cv` (not indexed).
  - Lighthouse mobile, both themes: performance, accessibility, best practices and SEO 100; LCP 1.5 s; layout shift 0; 3.8 KB of JavaScript (gzip) on first load.
  - Nothing was pushed or deployed.
- **2026-10-14 (rebuild, Phase 1):** On the new branch `rebuild`, the old Vite + React app was replaced by an Astro 7 project (static HTML, TypeScript strict, Tailwind 4).
  - Skeleton: English at `/`, Georgian at `/ka`, URLs without a trailing slash, an SEO head with canonical, hreflang and ProfilePage JSON-LD, a real 404 page, self-hosted Inter and Noto Sans Georgian (weights 400 and 600).
  - Four home-page directions for Saba to compare, all with the same English draft text: A "Calm precision", B "today's dark look, made light and fast", B-rich (B plus today's WebGL shader, desktop only), C "Engineering notebook". They are temporary, `noindex` pages.
  - Each page ships 1 to 4 KB of JavaScript (gzip). The old site shipped about 370 KB.
  - `AGENTS.md` now has the motion rules and the Astro 7 gotchas. The old contact-form function moved to `legacy/` for a later port.
  - Nothing was pushed or deployed.
- **2026-10-13:** Added two projects and set the order Saba asked for: **Bitnet.ge first, Playtime.ge second, WasteAway third**, then Chama and UniHub.
  - New project pages: `/work/bitnet` and `/work/wasteaway`. Their images are screenshots of the live sites (`public/projects/bitnet.webp`, `wasteaway.webp`, 1440 x 900).
  - PlayTime's text now matches what it really is today: a booking marketplace for sports and entertainment venues in Tbilisi, with 19 padel clubs listed and online booking with payment still in testing (`../playtime/STATUS.md`). It said "entertainment startup" before.
  - The About text and credentials now name WasteAway too. The sitemap lists the two new pages.
  - The Georgian text was written by a Fable 5.1 subagent and checked against an English back-translation. Saba is the final native check.
  - The new cards show no speed scores (only Chama, PlayTime and UniHub have them in `src/lib/lighthouse.ts`).
  - Same day, a separate Claude session (started in its own terminal) adds only WasteAway to the SiteCraft website (`../SiteCraft/Portfolio`).
- **2026-10-08 (later):** Google reported the home page as "Duplicate without user-selected canonical". Fixed: every page now sets its canonical address (`src/App.tsx`, commit `64ba1e8`), and `saba-janelidze.vercel.app` redirects (308) to `www.sabajanelidze.com` (Vercel domain setting). Indexing requested again in Search Console.
- **2026-10-08 (workspace pilot):**
  - `hello@sabajanelidze.com` and every other address on the domain forward to Saba's Gmail (Cloudflare Email Routing, catch-all on).
  - Google Search Console: Domain property `sc-domain:sabajanelidze.com`, verified by DNS TXT. Owners: Saba + the workspace service account. Sitemap submitted.
  - Cloudflare Web Analytics added (no cookies). Its script is allowed in the CSP in `vercel.json`.
  - `robots.txt` + `sitemap.xml` added (home + 3 project pages).
  - GitHub repo homepage link now points to www.sabajanelidze.com.
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
