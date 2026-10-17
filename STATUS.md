# Saba Janelidze Portfolio — Status

> Read this at the start of every session. Update it at the end.
> This file is in a **public** repo. Keep private things in `private/`.
> Last updated: **2026-10-15**

## Where we are

- **Live:** https://www.sabajanelidze.com. The own domain was added on 2026-10-07. Before that the site was at saba-janelidze.vercel.app, which still works.
- **Pitch (since 2026-04-20):** Senior Full-Stack Engineer, 3 years in production fintech (Bitnet), Backend Lead at Chama, founder of Playtime.ge, WasteAway and UniHub.
- **Projects shown, in this order:** Bitnet.ge, Playtime.ge, WasteAway, Chama.ge, UniHub. (Bitnet and WasteAway added 2026-10-13; see the log.)
- **Deploy:** a push to `main` publishes it automatically on Vercel.
- **Rebuild (branch `rebuild`, local only, not pushed):** a new Astro 7 site. Phase 1 (skeleton + four design directions), Phase 1b (the notebook home page) and Phase 1c (the calm reset) are done. **Phase 1e is done:** "Calm, with one live proof": Newsreader headings, the lab's payment-race figure in the hero, a rebuilt numbers row, and the 15 Phase 1d fixes. **Phase 1f is done:** a short headline, the company named less, CV in the phone menu, English screenshots and a new portrait. Its text is a draft until Saba approves it. The live site on `main` is untouched.

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

- **Before launch, a one-line fix in the lab's figure (send to the lab session when it runs again):** on desktop the button row
  (`.rf-actions`) grows from the link's height to the 44 px button when the script loads, so the figure grows 24 px. Since the
  line above the figure (2026-10-17) made its column the taller one, the four numbers under the hero jump 24 px (layout shift
  0.028 at 1024 to 1920 px; phones are not affected). Fix in the lab: `race-figure .rf-actions { min-height: 44px; }` for the
  row layout. Measured with no JavaScript vs after the upgrade: 414 vs 438 px high at 1440.
- After launch: build the diff demo (an agent's change, the check that catches the bug, the fix) and test it against the race
  figure on the first screen with 2 or 3 real people; the winner stays on top (Saba, 2026-10-17).
- **Before launch, the lab must be live:** the figure's "Reproduce it yourself →" link goes to `lab.sabajanelidze.com/day/payments?from=portfolio-home`, and that address does not exist yet (2026-10-15).
- A better portrait: photo #31 of the 15 Oct shoot is in for now (Phase 1f). A reshoot with side light and a slight smile would beat it.
- A 5-second test of the first screen with 2 or 3 real people (one picture per theme).
- The lab site gets design tokens **version 3** (`src/styles/tokens.css`; what changed is at the top of `docs/design-tokens.md`).
- Before launch: re-check the bitnet.ge counters (219,764 users, 2,538,923 transactions on 2026-10-15).
- Phase 3: the Georgian home page (the new texts, through `../_shared/playbooks/georgian.md`, then Saba). Then: add "ka" back to `alternates` in `src/pages/index.astro`, delete the `/ka` lines in `public/_redirects` and `ka.html` in `public/.assetsignore`.
- Before launch: `/google57aa1f004dba4711.html` redirects to the same address without `.html` (a Cloudflare setting that removes `.html`). The domain is verified in Search Console through DNS, so this file is probably no longer needed. Check before the switch.

## Log

- **2026-10-17 (rebuild, English only at launch):** Saba decided the new site launches in English. The old site's Georgian matches the old texts, so it can't be reused. `/ka` and `/ka/...` now redirect home (302), the placeholder page is not uploaded, and the home page no longer tells Google there is a Georgian version. Checked on the local Cloudflare server: `/ka`, `/ka/` and `/ka/design/b` go to `/`; `/`, `/cv` and `/book` answer 200; no hreflang tags.

- **2026-10-17 (rebuild, texts approved):** Saba asked Codex and Claude models to attack every text, then for a verdict. Four reviewers (Codex; Claude Fable as the buyer; Claude Opus as the skeptic; Claude Sonnet as the plain-English editor) read the same brief. The judge checked each idea against the sources. Saba approved the result and made 5 decisions:
  - **Approved and changed:** the proof line now also says "wrote most of the team's AI coding set-up" (the first screen proved only fintech). The number labels are exact: "first-authored" records, and "customer actions that must declare how a repeat is handled, or the build fails". On phones, the two company numbers say "exchange's". The Bitnet card says "Built by me, live today" and "bank-app deposits" (not payments). "Ask me how it was built" (no written case study exists). PlayTime: "Booking with payment is built; payments are still in test mode". WasteAway: "Next: the first pilot building". Chama: "Designed and wrote". Offer 1: "AI coding agents in your repo, set up safely", with "First an audit, then a 2-week rollout". No "ledgers" (not Saba's work). How I work: no hint that a person reviews each PlayTime change. Exact npm numbers (the rounded ones didn't add up). No "Evals". Contact: the buyer's pain is risk, not speed. The Google description is 143 characters (was 166). CV: "Now Principal Engineer", "the new identity checks", no "formally verified".
  - **Saba's decisions:** keep the headline; the PlayTime card as written; show the offer steps; "Georgia" without a city; and a new line above the race figure, "AI agents can write this, and it can pass tests. My review agents check money code.", chosen after Codex and a skeptic reviewer checked it. Saba asked why a bug fix is on the first screen; the answer: the figure shows the buyer's fear (AI code that passes tests and loses money), and the new line shows his part.
  - **Corrections found on the way:** one fact in the brief about WasteAway was wrong (it was a goal, not a fact), so no line uses it. "237 of 278" is right (the detailed count adds up; a newer note said 238).
  - **Checks:** `npm run verify` 0 errors; contrast audit 0 failures in 16 runs; the race figure check passes (behaviour, reduced motion, no JavaScript, sizes 320 to 1440 px, no overlap, no sideways scroll). One new issue: a 24 px jump of the numbers on desktop when the figure loads (see Next steps; the lab owns the fix).

- **2026-10-17 (rebuild, Cloudflare set-up, nothing deployed):** Saba chose "get the home page ready to launch". Cloudflare Workers is set up, but nothing has been uploaded:
  - `wrangler.jsonc` (Worker `sabajanelidze-web`, no domain yet), `npm run cf:dry` (dry run) and `npm run cf:dev` (Cloudflare's server on this computer).
  - `public/_headers`: the old site's security headers, plus a few more, and a one-year cache for the hashed files in `/_astro/`. `/ka` and the workers.dev test addresses send `noindex`.
  - `public/_redirects`: the old `/work/bitnet`, `/work/playtime`, `/work/wasteaway`, `/work/chama` and `/work/unihub` go home with a 302, until real case studies exist.
  - `public/.assetsignore`: the `/design` pages are never uploaded.
  - The sitemap now lists only `/`. It listed the old `/work/...` pages, which don't exist on the new site.
  - Checked on the local Cloudflare server: every page answers as expected, and `/design/...` answers 404. In Chrome, in both themes, at 1440 and 390 px: the security policy blocks nothing, there are no console errors, and the race figure, the theme switch and the Copy button work. The dry run passed with no login.

- **2026-10-17 (rebuild, small pictures):** Saba chose smaller pictures on the PlayTime and WasteAway cards, so the Bitnet card stays the one big picture. They now sit beside the role line and the title: 96 px wide on phones, 120 px from 480 px. The stage tag moved under them at full width (PlayTime's tag didn't fit beside the picture at 320 px). The cards load small 288 x 180 copies (9 KB and 12 KB instead of 79 KB and 95 KB). Phone length is back to 8.3 screens (was 8.8). Checks: `npm run verify` 0 errors; contrast audit 0 failures in 16 runs; no sideways scroll at 1440, 768, 390 and 320 px in both themes.

- **2026-10-15 (rebuild, Phase 1f, Saba's 7 questions):**
  - **Headline:** the 21-word pitch was too big (5 lines on desktop, the whole phone screen). Now a short headline, "AI agents for teams that move money, without losing a payment.", with the rest in a subline under it: "I help fintech teams work with AI agents safely, and I build the AI features their product needs." Saba chose it.
  - **The company named less:** the first screen, the number labels, the offer proof and About now say "a licensed crypto exchange" or "the exchange I help build". Bitnet is named in the work card. The small source lines keep "bitnet.ge, Oct 2026", so a reader can check the numbers.
  - **CV:** the "CV" link now shows in the phone menu too (it fits at 320 px).
  - **Screenshots in English:** bitnet.ge (switched with the site's own language menu, app banner closed, cropped above the counters) and wasteaway.ge/en, both 15 Oct. The PlayTime and WasteAway cards now show a small picture of their live page. Note: `bitnet.ge/en` answers "200 OK" but shows a "page not found" page, so a status code alone doesn't prove a page exists.
  - **Portrait:** photo #31 of a new shoot, square, edited with PhotoCraft (an open-source photo editor): the yellow wall made neutral, shadows lifted a little, mild contrast. The face itself isn't changed.
  - **Motion:** the home page keeps one moving thing (the race figure). The parked step-by-step animation goes on the How I work page later. A short video and a Lab page come later too.
  - **Checks:** `npm run verify` 0 errors; Lighthouse mobile 100 x 4 in both themes, LCP 1.73 s, 5.5 KB JS; contrast audit 0 failures (4 pages, both themes, desktop and phone); live check on the restarted dev server at 1440, 390 and 320 px: no console errors, no sideways scroll, every image loads. Phone length 8.8 screens (was 8.3; the two new pictures).

- **2026-10-15 (rebuild, Phase 1e "Calm, with one live proof"):** The calm home page got a voice and one working object. Saba chose the direction after a third round of reviews.
  - **Type:** headings, the big numbers and the Bitnet card title in **Newsreader** (a serif), one self-hosted 25 KB file (weight 500, optical size 24 to 72, Latin), preloaded, with a metric-matched Georgia fallback. Body stays Inter. Sources, dates and money figures in a small monospace (0 KB). Georgian headings will use Noto Sans Georgian.
  - **Colour:** the calm blue now has three jobs: link underlines, focus rings, movement in the hero figure. Red marks only the money loss in the figure. The dark theme's main button is the blue itself, with dark text and no border. Design tokens **version 3**.
  - **Hero:** two columns from 1024 px (about 7 / 5). Left: the pitch as the headline, the proof sentence, "Email me about your team" and a quiet "Hiring? See my CV". Right: the lab session's shared **payment race figure** (`<race-figure>` 1.0.0, vendored in `src/vendor/race-figure/`): two withdrawals of 80 from a balance of 100, the four real steps, the balance and the payouts. It plays once (about 4 s) when half of it is on screen, has Pause / Play while it moves, then "Run another order" (one of 54 recorded runs of the game's real code) and "Find the bug →". Without JavaScript and with reduced motion it shows the end state. It adds 2.8 KB of JavaScript (gzip), loaded when the browser is idle. Phones: pitch, proof, actions, then the figure full width, then the numbers.
  - **Numbers row, rebuilt:** Bitnet users and transactions (bitnet.ge), "237 of 278" architecture decisions written up by Saba, and "38 of 38" customer actions that the build checks for repeat safety under his rule. Sources in the small monospace and lined up; shorter labels on phones.
  - **The 15 Phase 1d fixes:** new Bitnet screenshot (15 Oct, cropped above its counters, with a dated caption); "the new check blocks that failure path" instead of "so it cannot come back"; Bitnet is the only big work card, PlayTime, WasteAway, Chama and UniHub are small cards with their real stage; a sourced fact under each method step; a proof line under each offer; About with one proof line per open-source tool, the stack grouped and a larger square portrait; "Ask me for the full case study" (email); the button's purpose and a quiet "CV" link in the header; a real dated `/cv`; the dark button; a plain-text theme switch; shorter phone labels.
  - **Small interactions:** "Copy" turns into "Copied" for 1.5 s; the Bitnet image lifts 2 px with an accent border on hover; link arrows move 2 px on hover. With reduced motion nothing moves.
  - **Checks:** contrast audit against the real pixels (both themes, desktop and phone, 4 pages): 994 text lines, 250 hover states, 210 focus rings, 40 non-text parts, **0 failures**, axe-core 0 violations. Lighthouse mobile, median of 3, both themes: performance, accessibility, best practices and SEO **100**; LCP 1.65 s; layout shift 0; 4.6 KB of JavaScript and 72 KB of fonts. No sideways scroll at 320 to 1440 px.
  - Nothing was pushed or deployed.
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
