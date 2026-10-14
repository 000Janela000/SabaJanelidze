# Saba Janelidze Portfolio — Agent Instructions

This repo is Saba Janelidze's **personal portfolio site**, live at **https://www.sabajanelidze.com**. It presents Saba as a Senior Full-Stack Engineer with 3 years in production fintech. The site is in two languages: Georgian (`ka`) and English (`en`).

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
3. **Ask Saba before pushing.** A push to `main` publishes the live site (see "Run, check, deploy").

## Where things live

> **Branch `rebuild` (the new site, Astro 7).** The old Vite + React site lives on `main` and stays live until the switch-over. Read old files with `git show main:<path>` (for example `git show main:src/lib/i18n.ts`). Never copy the old app back into this branch.

| Path | What it is |
|---|---|
| `src/content/home.ts` | **The home page text (English), in one file.** All design directions render this same text. Every number here is true and dated; the sources are named at the top of the file. |
| `src/content/ka-approved.ts` | Georgian strings that were **already approved** on the old site, copied word for word. Do not add new Georgian here (see "Rules"). |
| `src/lib/site.ts` | Site address, name, email, active profiles (`sameAs`) and the JSON-LD (structured data for Google and AI tools) builder. |
| `src/layouts/Base.astro` | The page shell: `<head>`, fonts, skip link, the Phase 1 preview strip. |
| `src/components/SeoHead.astro` | Title, description, canonical, hreflang (`en`, `ka`, `x-default`), Open Graph / Twitter tags, JSON-LD. Every page gets it through the layout. |
| `src/components/Fonts.astro` | Self-hosted Inter and Noto Sans Georgian, weights 400 and 600 only, from the `@fontsource` packages. |
| `src/components/Pipeline.astro` | Signature moment 2: the "How I ship with AI agents" diagram (Play / Pause / Step). |
| `src/components/LedgerAccent.astro` | Signature moment 1: the "balanced ledger" accent (direction B, desktop only). |
| `src/components/HeroShader.astro` | The old site's WebGL hero shader in plain WebGL (only `/design/b-rich`, for comparison). |
| `src/components/CopyEmail.astro` | Signature moment 6: "Copy" next to the email address. |
| `src/designs/a`, `b`, `c` | **Phase 1 only:** the home-page design directions. Deleted (or merged into the real home page) after Saba picks. |
| `src/pages/` | One file = one page. `index.astro` = `/`, `ka/index.astro` = `/ka`, `design/*.astro` = `/design/...` (temporary, `noindex`), `404.astro` = the real 404 page. |
| `src/styles/global.css` | Tailwind 4 plus the base rules, color tokens and motion timing tokens. |
| `public/` | Files served as they are: images (`projects/*.webp`, `portrait.webp`, `og-image.png`), favicon, `robots.txt`, `sitemap.xml` (still hand-written), and the Google Search Console check file. **Never put anything from `private/` here.** |
| `legacy/api-contact.ts` | The old Vercel contact-form function, kept only to port it to a Cloudflare Worker later. Not used by the build. |
| `docs/overview.md`, `docs/roadmap.md` | Describe the **old** site. They get rewritten at the switch-over. |
| `docs/content.md`, `docs/fix-plan.md` | **Historical** (March 2026). Don't use them as the source. |
| `private/` | Gitignored notes: marketing, strategy, research, design screenshots. Start with `private/README.md`. |
| `*.png` in the root | Old screenshots from building the old site. They're gitignored and stay on this computer only. |

## Run, check, deploy

- `npm install`: run this first on each machine. `node_modules` doesn't sync between the PC and the Mac.
- `npm run dev`: local dev server at http://localhost:4321.
- `npm run check` (`astro check`, the TypeScript check) and `npm run build` (static HTML into `dist/`): run both before you say a code task is done. `npm run verify` runs both.
- `npm run preview`: serves the built `dist/` without compression. Use it to click through, not to measure speed.
- URLs never end with a slash: `/work/bitnet` is built as `dist/work/bitnet.html` (`trailingSlash: 'never'` + `build.format: 'file'` in `astro.config.mjs`). Keep it that way; today's live URLs have no slash.
- English is at `/`, Georgian at `/ka/...` (`i18n` in `astro.config.mjs`). There is no automatic language redirect, on purpose.
- **Deploy: not set up on this branch yet.** The plan is Cloudflare Workers (static assets). Follow `../_shared/decisions/0004-deploy-safety.md`: explicit config, a dry run first, only `dist/` uploads. **Never push `rebuild` without Saba's OK**: on Vercel a push still makes a preview build.

## Motion rules

From the motion research (2026-10-14, section 7.2). Every agent follows them on every page.

1. **The first screen is complete without JavaScript.** The headline, the one-line offer and the main button are in the HTML. No preloader. The main text is never hidden while waiting for a script.
2. **Every animation has a job.** It shows a state, cause and effect, the order of steps, a direction or data, or it is one of the six signature moments. Test: remove it. If a visitor understands the same, it was decoration.
3. **Only `transform` and `opacity`** (plus `clip-path` for short reveals). Never animate `filter: blur`, `width`, `height`, `top`, `left`, `margin` or `padding`. Never write `transition: all`.
4. **Timing tokens** live in `src/styles/global.css`: `--dur-instant` 100 ms (press), `--dur-fast` 150 ms (hover, color), `--dur-base` 250 ms (menus, reveals), `--dur-page` 300 ms (page changes). Ease-out for things that appear. Nothing over 400 ms, except explainers the visitor controls.
5. **No animation on frequent or keyboard actions:** nav links, tabs and the language switch change instantly.
6. **Never take over the scroll or the cursor.** No smooth-scroll library, no pinned scroll sections on phones, no custom cursor.
7. **Everything can be interrupted.** A click never waits for an animation.
8. **Reduced motion is designed, not just switched off.** Write motion inside `@media (prefers-reduced-motion: no-preference)`. With reduced motion: short opacity fades at most, no WebGL, no autoplay video, explainers open at their final state with Step buttons.
9. **Nothing moves by itself for more than 5 seconds** without a pause button. Ambient motion settles to a still frame. WebGL pauses off-screen and in hidden tabs.
10. **Phones get the same content with less motion:** no WebGL, no pinned sections, fewer reveals.
11. **Georgian:** never split into letters, no `text-transform: uppercase`, no `letter-spacing` (a global rule in `global.css` enforces it). Animate whole lines or blocks.
12. **Budgets:** at most 100 KB of JavaScript (gzip) on the first load of any page, and at most 5 KB of it for animation; each lazy island at most 30 KB. Saba watches a 10 to 20 second screen recording of any new signature moment before it ships.

## Astro 7: things that break

- **Close every HTML tag.** Astro 7's compiler fails on unclosed tags (`<p>` without `</p>`, `<li>` without `</li>`). Self-closing (`<span />`) is fine.
- **Spaces between elements follow JSX rules.** A line break between two inline elements is removed, so `<strong>#1</strong>` on one line and `contributor` on the next run together. Write `{" "}` where a space matters, or keep both on one line.
- **Scoped styles do not reach child components.** A class you pass to a child component is not styled by the parent's `<style>`. Use `<style is:global>` under a unique wrapper class (the design directions do this: `.da`, `.db`, `.dc`).
- **Scripts:** a `<script>` in a component is bundled once per page as a module (it runs after the HTML is parsed). Keep each one small and check its size in `dist/_astro/`.
- **Markdown:** Astro 7 has a new Markdown engine; old remark/rehype plugins need an opt-in. Use no plugins unless needed.

## Domain

- `www.sabajanelidze.com` is the main address. `sabajanelidze.com` redirects to it with a 308 (permanent) redirect. The old `saba-janelidze.vercel.app` still works too.
- The domain is registered at Cloudflare, and its DNS is also on Cloudflare. For records, renewal date and access, see "Domains" in `../CLAUDE.md` (the Projects folder rules, outside this repo).

## Rules

- **Commit messages: one line only.** No body, no extra lines, no trailers (no `Co-Authored-By:`). The style used here is `type(scope): summary`, for example `chore(seo): point og and twitter urls to www.sabajanelidze.com`, `refactor(content): …`, `bugfix(portrait): …`, `feature(lighthouse): …`.
- **Both languages, always** (from Phase 3 of the rebuild): every page that exists in Georgian needs both texts. **Never write Georgian yourself.** New Georgian goes through `../_shared/playbooks/georgian.md` (Fable 5.1 or Gemini + back-translation, then Saba).
- **Keep the pitch in sync.** If the positioning changes, update together: `src/content/home.ts` (text and `seo`), `src/lib/site.ts` if the job title changes, and later `docs/overview.md`.
- **Honest numbers only.** Every number on the site is true and dated. Bitnet appears only in public-safe words (no internal names, vendors or security details). Never say "I review every change" for PlayTime.
- **Plain, simple words** in all docs and notes. Short sentences. Explain technical words.
