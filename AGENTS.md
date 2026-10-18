# Saba Janelidze Portfolio — Agent Instructions

This repo is Saba Janelidze's **personal portfolio site**, live at **https://www.sabajanelidze.com**. It presents Saba himself first (his path and scope at a licensed crypto exchange, the systems he built), with AI coding agents as how he works (the positioning review of 2026-10-19). English only; a Georgian page comes in Phase 3.

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

### The structure (cleanup of 2026-10-19)

The rule: **a file lives next to the page that uses it, and moves to `src/shared/` only when a second page uses it.** Never move a file up "just in case". Astro ignores folders that start with `_` for routing, so `src/pages/_home/` holds the home page's own code without creating URLs.

```
src/
  pages/
    index.astro          /        the composition of the home page
    _home/               the home page's own sections (hero, hero-race, work, services, method, about, contact,
                         section, copy-email) and their text in _home/content/ (one file per section)
    cv.astro             /cv      (noindex)
    _cv/content.ts       the /cv text
    book.astro           /book    "Get in touch" (noindex); keeps ?from= for the lab's links
    404.astro            the 404 page
  shared/
    components/          base-layout (the page shell), seo-head, fonts, header, footer, theme-switch
    content/             site-chrome.ts (header links, footer, theme-switch words), intro-email.ts (the "Email me" email)
    lib/                 site.ts (name, email, profiles, JSON-LD), theme-colors.ts (the two page colours)
  styles/                reset.css, tokens.css, ui.css, global.css
  assets/fonts/          the Newsreader heading font and its licence
  vendor/race-figure/    the lab's <race-figure>, vendored byte for byte (never edit; see VENDOR.md)
```

| Path | What it is |
|---|---|
| `src/pages/_home/content/*.ts` | **The home page text (English), one file per section.** Every number is true and dated; the sources and the honesty rules sit at the top of each file. Approved by Saba (2026-10-17; the positioning review of 2026-10-19). |
| `src/pages/_cv/content.ts` | The `/cv` text: a dated role list (approved by Saba on 2026-10-17). |
| `src/shared/lib/site.ts` | Site address, name, email, active profiles (`sameAs`) and the JSON-LD (structured data for Google and AI tools) builder. |
| `src/shared/components/base-layout.astro` | The page shell: `<head>` (SEO, fonts, theme colours, the no-flash theme script that runs before the first paint), the skip link, the analytics beacon (built site only). |
| `src/styles/tokens.css` | **The design tokens: the shared visual contract** (colours of both themes, fonts, type scale, spacing, radii, motion timings). Version 3. Plain CSS, **also copied by the lab site by this exact path**: keep the path, and send the lab session a NOTICE when it changes. Guide and change list: `docs/design-tokens.md`. |
| `src/styles/reset.css` | The browser reset (the parts of Tailwind 4's preflight the site relies on, MIT; kept when Tailwind was removed), in a cascade layer so every site rule wins over it. |
| `src/styles/ui.css` | The shared building blocks (prefix `ui-`): `ui-wrap`, `ui-section`, `ui-page*` (the /cv and /book intro), `ui-display` (the heading face), `ui-h2`, `ui-intro`, `ui-source` (sources, dates, money: small mono), `ui-btn` (the one button style), `ui-action`, `ui-link`, `ui-arrow`, `ui-meta`, `ui-tag`, `ui-card`, and `sr-only`. |
| `src/styles/global.css` | Imports reset, tokens and ui, plus the base rules (body, fallback fonts, focus, motion). |
| `src/vendor/race-figure/` | **Vendored, never edit here:** the lab session's `<race-figure>` 1.1.5. `VENDOR.md` there: source commit, sizes, hashes, how to update. `src/pages/_home/hero-race.astro` writes its HTML into the page, inlines its CSS and loads its JS on idle. Changes go to the lab session. |
| `public/` | Files served as they are: `projects/` (the Bitnet screenshot and two thumbnails), `portrait.webp`, `og.png` (the link-preview picture; source in `private/design/og-2026-10-18/`), the favicons, `robots.txt`, `sitemap.xml` (hand-written: only `/`), and Cloudflare's `_headers` and `_redirects`. **Never put anything from `private/` here.** |
| `docs/design-tokens.md` | The human guide to the tokens. |
| `private/` | Gitignored notes: marketing, strategy, research, design screenshots, the old root screenshots (`old-screenshots/`). Start with `private/README.md`. |

### Code conventions

- **File names:** kebab-case (`hero-race.astro`, `site-chrome.ts`). Class names: the section's name as the prefix (`work-`, `services-`, `method-`, `about-`, `contact-`, `header-`, `footer-`, `theme-`, `race-`, `hero-`, `cv-`, `not-found-`); shared classes start with `ui-`.
- **Text fields are named after what the visitor sees** (`services` is "Work with me", `hero.cvLink` is "My CV"); `{ label, href }` pairs end in `Link` or `Button`.
- **TypeScript:** named exports, no barrel (`index.ts`) files; a type sits above its data in the same file and is exported only when a second file needs it; check data shapes with `satisfies`.
- **Comments:** one line at the top of each file saying what it is; next to every number its source and date; the honesty rules once per content file; in code a comment only where the code is surprising, saying why. Decision history goes to `STATUS.md` and git, not into the code.
- **Removed on 2026-10-19 and recoverable from git (commit `c84b45d`):** the Phase 1 design pages (`/design`), the parked explainers, the Georgian set-up (`/ka` placeholder, i18n, the Georgian font), Tailwind, the old contact-form code (`legacy/`) and the outdated docs. The old site itself is on branch `v1`.

## Run, check, deploy

- `npm install`: run this first on each machine. `node_modules` doesn't sync between the PC and the Mac.
- `npm run dev`: local dev server at http://localhost:4321.
  - **Restart it after big changes** (new or renamed style files, layout rewrites). A long-running dev server can keep serving old styles. On 2026-10-15 it showed the redesigned home page without its section styles (no margins, small headings, an empty portrait) while the build was fine.
  - **Before you say a page looks right, check the live page in a browser at desktop and phone width**, not only your own screenshots of a build.
- `npm run check` (`astro check`, the TypeScript check) and `npm run build` (static HTML into `dist/`): run both before you say a code task is done. `npm run verify` runs both.
- `npm run preview`: serves the built `dist/` without compression. Use it to click through, not to measure speed.
- URLs never end with a slash: `/cv` is built as `dist/cv.html` (`trailingSlash: 'never'` + `build.format: 'file'` in `astro.config.mjs`). Keep it that way.
- English only for now. `/ka` redirects home (`public/_redirects`) until the Georgian page exists; then restore the Georgian set-up from git (see "Code conventions").
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
11. **Georgian (when the Georgian page is built):** never split into letters, no `text-transform: uppercase`, no `letter-spacing` (restore the global `:lang(ka)` rule in `global.css` from git with the Georgian set-up). Animate whole lines or blocks.
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
- **The `hidden` attribute cannot be overridden.** `reset.css` hides `[hidden]` with `!important` in a cascade layer, and a layered `!important` beats any unlayered rule. To reserve space for something that appears later (no layout shift), use `visibility` and a data attribute instead.

## Domain

- `www.sabajanelidze.com` is the main address, served by the Cloudflare Worker. `sabajanelidze.com` redirects to it with a 301 (a zone Single Redirect rule, keeping the path and query). "Always Use HTTPS" is on for the whole zone (set by the lab session, 2026-10-18).
- `lab.sabajanelidze.com` is the lab site (its own repo and Worker, `sabajanelidze-lab`).
- The old site stays on Vercel (`saba-janelidze.vercel.app`); it is planned to move to `v1.sabajanelidze.com` (see `STATUS.md`).
- The domain is registered at Cloudflare, and its DNS is also on Cloudflare. For records, renewal date and access, see "Domains" in `../CLAUDE.md` (the Projects folder rules, outside this repo).

## Rules

- **Commit messages: one line only.** No body, no extra lines, no trailers (no `Co-Authored-By:`). The style used here is `type(scope): summary`, for example `chore(seo): point og and twitter urls to www.sabajanelidze.com`, `refactor(content): …`, `bugfix(portrait): …`, `feature(lighthouse): …`.
- **Both languages, always** (from Phase 3 of the rebuild): every page that exists in Georgian needs both texts. **Never write Georgian yourself.** New Georgian goes through `../_shared/playbooks/georgian.md` (Fable 5.1 or Gemini + back-translation, then Saba).
- **Keep the pitch in sync.** If the positioning changes, update together: `src/pages/_home/content/` (the text and `seo.ts`), the link-preview picture (`private/design/og-2026-10-18/`), and `src/shared/lib/site.ts` if the job title changes.
- **Honest numbers only.** Every number on the site is true and dated. Bitnet appears only in public-safe words (no internal names, vendors or security details). Never say "I review every change" for PlayTime.
- **Plain, simple words** in all docs and notes. Short sentences. Explain technical words.
