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

| Path | What it is |
|---|---|
| `src/lib/i18n.ts` | **All site text in both languages, plus the project list.** This is the source of truth for content. |
| `src/components/sections/` | The page sections: Hero, SelectedWork, WhatIDo, About, Contact, Footer |
| `src/pages/ProjectDetail.tsx` | The project pages at `/work/<slug>` |
| `src/components/ContactForm.tsx` + `api/contact.ts` | The contact form, and its backend (a Vercel serverless function, which is a small server program Vercel runs on request). **It doesn't send email yet.** See `STATUS.md`. |
| `index.html` | Page title, description, and link-preview tags (`og:*` / `twitter:*`, which control what a shared link looks like) |
| `public/` | Images (`projects/*.webp`, `portrait.webp`, `og-image.png`), favicon, and the Google Search Console check file (`google57aa1f004dba4711.html`) |
| `docs/overview.md` | What the site is, who it's for, its structure, animation strategy and tech stack |
| `docs/roadmap.md` | What's built, ideas, and what was dropped and why |
| `docs/content.md`, `docs/fix-plan.md` | **Historical** (March 2026). Don't use them as the source. |
| `private/` | Gitignored notes: marketing, strategy, anything personal. Start with `private/README.md`. |
| `*.png` in the root | Old screenshots from building the site. They're gitignored and stay on this computer only. |

## Run, check, deploy

- `npm install`: run this first on each machine. `node_modules` doesn't sync between the PC and the Mac.
- `npm run dev`: local dev server.
- `npm run build` (TypeScript check + Vite build) and `npm run lint`: run both before you say a code task is done. The warning "Some chunks are larger than 500 kB" is normal. It comes from three.js.
- **Deploy:** every push to `main` makes the Vercel project `saba-janelidze` build and publish the live site, usually in under a minute. Pushes to other branches make preview builds.

## Domain

- `www.sabajanelidze.com` is the main address. `sabajanelidze.com` redirects to it with a 308 (permanent) redirect. The old `saba-janelidze.vercel.app` still works too.
- The domain is registered at Cloudflare, and its DNS is also on Cloudflare. For records, renewal date and access, see "Domains" in `../CLAUDE.md` (the Projects folder rules, outside this repo).

## Rules

- **Commit messages: one line only.** No body, no extra lines, no trailers (no `Co-Authored-By:`). The style used here is `type(scope): summary`, for example `chore(seo): point og and twitter urls to www.sabajanelidze.com`, `refactor(content): …`, `bugfix(portrait): …`, `feature(lighthouse): …`.
- **Both languages, always.** Every visible text needs both `ka` and `en` in `src/lib/i18n.ts`.
- **Keep the pitch in sync.** If the positioning changes, update together: `src/lib/i18n.ts`, the `<title>` / description / og tags in `index.html`, and `docs/overview.md`.
- **Plain, simple words** in all docs and notes. Short sentences. Explain technical words.
