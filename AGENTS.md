# Saba Janelidze Portfolio — Agent Instructions

This repo is Saba Janelidze's **personal portfolio site**, live at **https://www.sabajanelidze.com**. It presents Saba as a Principal Engineer in fintech who helps teams use AI coding agents safely. Since the launch (2026-10-18) the site is in English only; the Georgian (`ka`) home page comes in Phase 3.

**This file is shared by every AI agent.** Claude Code reads it through `CLAUDE.md`. Codex reads it directly. Keep tool-specific notes out of here.

---

## ⚠️ This repo is PUBLIC

- `github.com/000Janela000/SabaJanelidze` is public, so **anyone can read everything you commit**.
- **Never commit:** secrets, API keys, personal plans, marketing strategy, client names or prices, job-search notes, or private contact data.
- Those go in **`private/`**. That folder is in `.gitignore`, so git never sees it. Syncthing copies it between Saba's two computers, but it never goes to GitHub.
- `private/` has **no git history**. If a file there is deleted or overwritten, Syncthing keeps the old copy for 30 days in `.stversions/` at the root of the Projects folder.
- Before every commit, read `git status` and the diff. Make sure nothing private is in it.

## Start of every session

1. Read `STATUS.md`: where things stand and what's open.
2. If the task is about content, positioning or marketing, also read `docs/overview.md` and `private/README.md` (plus the files it points to).
3. Run `git status`. It should be clean, or match what `STATUS.md` says.

## End of every session

1. Update `STATUS.md`: add to the log, and change open problems and next steps. Keep it public-safe. Private notes go in `private/`.
2. Commit with a one-line message (see "Rules").
3. **Ask Saba before pushing** (the repo is public). A push does not publish the site; a deploy does (see "Run, check, deploy").

## Where things live

> **Branch `main` is the new site (Astro 7) since the launch on 2026-10-18** (the old `rebuild` branch was fast-forwarded into it). The old Vite + React site lives on branch `v1`; Vercel builds it and serves it at https://v1.sabajanelidze.com (noindex). Read old files with `git show v1:<path>` (for example `git show v1:src/lib/i18n.ts`). Never copy the old app back into `main`.

| Path | What it is |
|---|---|
| `src/content/home.ts` | **The home page text (English), in one file.** The home page and the Phase 1 directions render this same text. Every number here is true and dated; the sources are named at the top of the file. The home page texts were approved by Saba on 2026-10-17 (after a review by Codex and three Claude reviewers); only the parked blocks are still marked "DRAFT (Saba approves)". Fields marked "Not on the home page" feed only the Phase 1 design pages and the parked explainers. |
| `src/content/cv.ts` | The `/cv` text: a dated role list (approved by Saba on 2026-10-17). Sources named at the top. |
| `src/content/ka-approved.ts` | Georgian strings that were **already approved** on the old site, copied word for word. Do not add new Georgian here (see "Rules"). |
| `src/lib/site.ts` | Site address, name, email, active profiles (`sameAs`) and the JSON-LD (structured data for Google and AI tools) builder. |
| `src/layouts/Base.astro` | The page shell: `<head>`, fonts, skip link, the Phase 1 preview strip. `themed` adds the light / dark theme script (runs before the first paint) and the per-theme browser colours. |
| `src/styles/tokens.css` | **The design tokens: the shared visual contract** (colours of both themes, fonts, type scale, spacing, radii, motion timings). Version 3 (Phase 1e: Newsreader headings, monospace for sources, the accent's three jobs, red only for the money loss). Plain CSS, also copied by the lab site. Guide and change list: `docs/design-tokens.md`. |
| `src/styles/ui.css` | The shared building blocks of the calm design: `ui-wrap`, `ui-section`, `ui-display` and `ui-h2` (Newsreader), `ui-intro`, `ui-source` (sources, dates, money: small mono), `ui-btn` (the one button style), `ui-action` (secondary text link), `ui-link`, `ui-arrow` (the arrow after a link; nudges 2 px on hover), `ui-meta`, `ui-tag` (a small neutral stage tag), `ui-card`. |
| `src/styles/notebook.css` | **Parked.** The notebook building blocks (`nb-*`). Not loaded globally; only the parked explainers import it. |
| `src/components/site/` | `Header.astro` (name + links only; phones show Work, Contact and CV), `Footer.astro` (For hiring managers, theme switch, copyright), `ThemeSwitch.astro` ("Theme: Light · Dark · Auto"), `Section.astro` (one home-page section: heading, intro, content). |
| `src/components/home/` | The home page sections, in page order: `Hero` (with `HeroRace`, the payment-race figure on the right), `Work`, `Offers`, `Method` (the one static method diagram), `About`, `Contact`. |
| `src/vendor/race-figure/` | **Vendored, never edit here:** the lab session's `<race-figure>` 1.1.5 (JS, CSS, the no-JavaScript HTML). `VENDOR.md` there: source commit, sizes, hashes, how to update. `HeroRace.astro` writes the HTML into the page, inlines the CSS and loads the JS on idle. Changes go to the lab session. |
| `src/assets/fonts/` | The Newsreader heading font: one 25 KB file (weight 500, optical size 24 to 72, Latin) and its licence (SIL Open Font License). How it was made: the comment at the top of `src/components/Fonts.astro`. |
| `src/components/parked/` | **Not on the home page since Phase 1c**, kept for the future "How I work" page and case studies: fig. 1 `GreenTestsFigure`, fig. 2 `RunsOnceFigure`, `HowIShip` (the stepped pipeline), `Lab` (game teaser + "Ask the work"), `OpenSource`, `ProofTable`, `NotebookSection`, and `BlueprintGlow` (the removed WebGL glow; needs its old tokens back before reuse). |
| `src/lib/stepper.ts` | The engine of the step-through explainers (parked fig. 1, fig. 3; `Pipeline.astro`): one number `--x` drives the picture; Play / Pause / Back / Step. |
| `src/lib/blueprint-gl.ts` | The parked glow's WebGL code. Nothing loads it today. |
| `src/components/SeoHead.astro` | Title, description, canonical, hreflang (`en`, `ka`, `x-default`), Open Graph / Twitter tags, JSON-LD. Every page gets it through the layout. |
| `src/components/Fonts.astro` | Self-hosted fonts: Inter 400 and 600 and Noto Sans Georgian 400 and 600 (the `@fontsource` packages), and Newsreader 500 for headings (`src/assets/fonts/`, preloaded on the calm pages). |
| `src/components/Pipeline.astro` | The stepped "How I ship with AI agents" explainer (Play / Pause / Step, driven by `src/lib/stepper.ts`). Used by `/design/a`, `/design/b` and the parked `HowIShip`; not on the home page. |
| `src/components/LedgerAccent.astro` | Signature moment 1: the "balanced ledger" accent (direction B, desktop only). |
| `src/components/HeroShader.astro` | The old site's WebGL hero shader in plain WebGL (only `/design/b-rich`, for comparison). |
| `src/components/CopyEmail.astro` | Signature moment 6: "Copy" next to the email address. |
| `src/designs/a`, `b`, `c` | **Phase 1 only:** the home-page design directions, kept as `noindex` reference pages until launch. Saba first picked C ("Engineering notebook", Phase 1b); after two independent reviews he reset to **A's calm skeleton** (Phase 1c, 2026-10-15). The real home page lives in `src/components/home/`. |
| `src/pages/` | One file = one page. `index.astro` = `/` (the real home page), `ka/index.astro` = `/ka` (placeholder, never uploaded: English only at launch, `/ka` redirects home until the Georgian page exists), `book.astro` = `/book`, an honest "Get in touch" page (email + LinkedIn) that reads and keeps `?from=` for the lab's links, `cv.astro` = `/cv`, a dated role list and "CV as a PDF on request" (text in `src/content/cv.ts`), both `noindex`; `design/*.astro` = `/design/...` (temporary, `noindex`), `404.astro` = the real 404 page. |
| `src/styles/global.css` | Tailwind 4 (scanning `src/` only), then `tokens.css` and `ui.css`, plus the base rules. |
| `public/` | Files served as they are: images (`projects/*.webp`, `portrait.webp`, `og.png`: the link-preview picture, source in `private/design/og-2026-10-18/`), favicon, `robots.txt`, `sitemap.xml` (hand-written: only `/`; `/cv` and `/book` are noindex), the Google Search Console check file, and Cloudflare's `_headers`, `_redirects` and `.assetsignore`. **Never put anything from `private/` here.** |
| `legacy/api-contact.ts` | The old Vercel contact-form function, kept only to port it to a Cloudflare Worker later. Not used by the build. |
| `docs/overview.md`, `docs/roadmap.md` | Describe the **old** site. They get rewritten at the switch-over. |
| `docs/content.md`, `docs/fix-plan.md` | **Historical** (March 2026). Don't use them as the source. |
| `private/` | Gitignored notes: marketing, strategy, research, design screenshots. Start with `private/README.md`. |
| `*.png` in the root | Old screenshots from building the old site. They're gitignored and stay on this computer only. |

## Run, check, deploy

- `npm install`: run this first on each machine. `node_modules` doesn't sync between the PC and the Mac.
- `npm run dev`: local dev server at http://localhost:4321.
  - **Restart it after big changes** (new or renamed style files, layout rewrites). A long-running dev server can keep serving old styles. On 2026-10-15 it showed the redesigned home page without its section styles (no margins, small headings, an empty portrait) while the build was fine.
  - **Before you say a page looks right, check the live page in a browser at desktop and phone width**, not only your own screenshots of a build.
- `npm run check` (`astro check`, the TypeScript check) and `npm run build` (static HTML into `dist/`): run both before you say a code task is done. `npm run verify` runs both.
- `npm run preview`: serves the built `dist/` without compression. Use it to click through, not to measure speed.
- URLs never end with a slash: `/work/bitnet` is built as `dist/work/bitnet.html` (`trailingSlash: 'never'` + `build.format: 'file'` in `astro.config.mjs`). Keep it that way; today's live URLs have no slash.
- English is at `/`, Georgian at `/ka/...` (`i18n` in `astro.config.mjs`). There is no automatic language redirect, on purpose.
- **Deploy: Cloudflare Workers (static assets only). Live since 2026-10-18.**
  - `wrangler.jsonc`: the Worker `sabajanelidze-web`, with the custom domains `www.sabajanelidze.com` and `sabajanelidze.com`. The test copy at https://sabajanelidze-web.ssjanelidze.workers.dev stays on (noindex).
  - Deploy: `npm run cf:dry`, check the file list, then `npx wrangler deploy --config wrangler.jsonc` (the token in the Windows user env var `CLOUDFLARE_API_TOKEN` is enough). Every deploy to the live domain needs Saba's OK.
  - A push to GitHub does not deploy. Vercel still builds pushes, but no longer serves the domain.
  - `npm run cf:dry` builds, then does a dry run (it uploads nothing). `npm run cf:dev` serves `dist/` on http://127.0.0.1:8787 the way Cloudflare will: headers, redirects, the 404 page.
  - `public/_headers`: security and cache headers (at least as strict as the old Vercel site). `public/_redirects`: the old site's `/work/...` links go home (302) until the case studies exist. `public/.assetsignore`: keeps the `/design` pages out of the upload.
  - Follow `../_shared/decisions/0004-deploy-safety.md`: always `--config wrangler.jsonc`, a dry run first. A real deploy and the domain switch need Saba's OK.
  - **Stopping `cf:dev` from an agent tool can leave its server running.** Stopping the outer shell (Claude Code's task stop, for example) does not stop wrangler's `node` process or its `workerd.exe` helpers. The next run then says "Ready" but answers an empty 404 for every address. Stop them by command line (`node ... wrangler ... dev`, then `workerd.exe`, both under this repo's `node_modules`) before you start again.
  - **Never push without Saba's OK.** Vercel's production branch is `v1`, so a push to `main` makes only a Vercel preview build (protected); a push to `v1` changes the old site at v1.sabajanelidze.com.

## Motion rules

From the motion research (2026-10-14, section 7.2). Every agent follows them on every page.

1. **The first screen is complete without JavaScript.** The headline, the one-line offer and the main button are in the HTML. No preloader. The main text is never hidden while waiting for a script.
2. **Every animation has a job.** It shows a state, cause and effect, the order of steps, a direction or data, or it is one of the six signature moments. Test: remove it. If a visitor understands the same, it was decoration.
3. **Only `transform` and `opacity`** (plus `clip-path` for short reveals). Never animate `filter: blur`, `width`, `height`, `top`, `left`, `margin` or `padding`. Never write `transition: all`.
4. **Timing tokens** live in `src/styles/tokens.css`: `--dur-instant` 100 ms (press), `--dur-fast` 150 ms (hover, color), `--dur-base` 250 ms (menus, reveals), `--dur-page` 300 ms (page changes). Ease-out for things that appear. Nothing over 400 ms, except explainers the visitor controls.
5. **No animation on frequent or keyboard actions:** nav links, tabs and the language switch change instantly.
6. **Never take over the scroll or the cursor.** No smooth-scroll library, no pinned scroll sections on phones, no custom cursor.
7. **Everything can be interrupted.** A click never waits for an animation.
8. **Reduced motion is designed, not just switched off.** Write motion inside `@media (prefers-reduced-motion: no-preference)`. With reduced motion: short opacity fades at most, no WebGL, no autoplay video, explainers open at their final state with Step buttons.
9. **Nothing moves by itself for more than 5 seconds** without a pause button. Ambient motion settles to a still frame. WebGL pauses off-screen and in hidden tabs.
10. **Phones get the same content with less motion:** no WebGL, no pinned sections, fewer reveals.
11. **Georgian:** never split into letters, no `text-transform: uppercase`, no `letter-spacing` (a global rule in `global.css` enforces it). Animate whole lines or blocks.
12. **Budgets:** at most 100 KB of JavaScript (gzip) on the first load of any page, and at most 5 KB of it for animation; each lazy island at most 30 KB. Saba watches a 10 to 20 second screen recording of any new signature moment before it ships.

## Themes: light and dark

- One calm design, two themes: **light** (the default: navy text on warm off-white, one calm blue) and **dark** (a calm, low-saturation slate). **No grid, no glow, no gradients, no offset shadows** (Saba, 2026-10-15). All colours come from `src/styles/tokens.css`; never write a raw colour in a component's CSS. (Only the tiny theme scripts name the two page colours, because they run before the CSS.)
- Which one shows: `<html data-theme="light|dark">` (the visitor's choice, saved in `localStorage` key `theme`), else the system setting. It works without JavaScript. The old values `paper` / `blueprint` still work.
- The switch is in the **footer**, clearly labelled "Theme: Light · Dark · Auto" (`ThemeSwitch.astro`). It switches instantly, with no animation. It is never in the header (the phone header must not overflow).
- **One accent per theme, with three jobs:** link underlines (links are `--fg` text with an accent underline), the focus ring, and movement in the hero figure. Nothing else is coloured.
- **Red (`--danger`) has one job:** the money loss in the hero figure (later also failures in case-study diagrams). Never a second accent.
- **Contrast is checked against the real pixels**, not only CSS colours: `private/design/phase1c/contrast-audit.md` (scripts in `private/design/phase1c/audit/`). Re-run it after any colour or layout change. Text never sits on a line, shape, tint or image; meaningful lines and control borders use `--line-strong` (3:1 or more); decorative hairlines use `--line`.
- **Headings** (h1, h2, the big numbers, the one big card title) use Newsreader 500 (`--font-display`); body text stays Inter. Georgian headings use Noto Sans Georgian.
- **Monospace** only for real commands and code, and (class `ui-source`) for sources, dates and money figures. Never for labels or headings. No notebook labels ("fig.", "table", "§", "rev.").

## Astro 7: things that break

- **Close every HTML tag.** Astro 7's compiler fails on unclosed tags (`<p>` without `</p>`, `<li>` without `</li>`). Self-closing (`<span />`) is fine.
- **Spaces between elements follow JSX rules.** A line break between two inline elements is removed, so `<strong>#1</strong>` on one line and `contributor` on the next run together. Write `{" "}` where a space matters, or keep both on one line. Inside a `display: flex` or `inline-flex` box, a plain space between children disappears anyway; use `gap` or a non-flex display (that is why `.ui-action` is `inline-block`).
- **Scoped styles do not reach child components.** A class you pass to a child component is not styled by the parent's `<style>`. Use `<style is:global>` under a unique wrapper class (the design directions do this: `.da`, `.db`, `.dc`).
- **Scripts:** a `<script>` in a component is bundled once per page as a module (it runs after the HTML is parsed). Keep each one small and check its size in `dist/_astro/`.
- **Markdown:** Astro 7 has a new Markdown engine; old remark/rehype plugins need an opt-in. Use no plugins unless needed.
- **Tailwind owns some variable names.** Tailwind 4 defines `--text-*`, `--leading-*`, `--radius-sm`, `--spacing` and more. A token with the same name silently changes Tailwind classes. Our tokens use `--fs-*`, `--lh-*`, `--radius-tag` for that reason.
- **The `hidden` attribute cannot be overridden.** Tailwind's base layer hides `[hidden]` with `!important`, and a layered `!important` beats any unlayered rule. To reserve space for something that appears later (no layout shift), use `visibility` and a data attribute instead (see `.nb-stepbar` in `notebook.css`).

## Domain

- `www.sabajanelidze.com` is the main address, served by the Cloudflare Worker. `sabajanelidze.com` redirects to it with a 301 (a zone Single Redirect rule, keeping the path and query). "Always Use HTTPS" is on for the whole zone (set by the lab session, 2026-10-18).
- `lab.sabajanelidze.com` is the lab site (its own repo and Worker, `sabajanelidze-lab`).
- The old site stays on Vercel (`saba-janelidze.vercel.app`); it is planned to move to `v1.sabajanelidze.com` (see `STATUS.md`).
- The domain is registered at Cloudflare, and its DNS is also on Cloudflare. For records, renewal date and access, see "Domains" in `../CLAUDE.md` (the Projects folder rules, outside this repo).

## Rules

- **Commit messages: one line only.** No body, no extra lines, no trailers (no `Co-Authored-By:`). The style used here is `type(scope): summary`, for example `chore(seo): point og and twitter urls to www.sabajanelidze.com`, `refactor(content): …`, `bugfix(portrait): …`, `feature(lighthouse): …`.
- **Both languages, always** (from Phase 3 of the rebuild): every page that exists in Georgian needs both texts. **Never write Georgian yourself.** New Georgian goes through `../_shared/playbooks/georgian.md` (Fable 5.1 or Gemini + back-translation, then Saba).
- **Keep the pitch in sync.** If the positioning changes, update together: `src/content/home.ts` (text and `seo`), `src/lib/site.ts` if the job title changes, and later `docs/overview.md`.
- **Honest numbers only.** Every number on the site is true and dated. Bitnet appears only in public-safe words (no internal names, vendors or security details). Never say "I review every change" for PlayTime.
- **Plain, simple words** in all docs and notes. Short sentences. Explain technical words.
