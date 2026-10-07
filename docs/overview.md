# Saba Janelidze Portfolio — Overview

> Last updated: 2026-10-07. Positioning changed on 2026-04-20. The sections from "Animation Strategy" down describe the site as it was built in March–April 2026, and they are still true.

## What It Is

Saba Janelidze's personal portfolio site. Live at https://www.sabajanelidze.com.

It presents Saba as a **Senior Full-Stack Engineer with 3 years in production fintech**: crypto custody, exchange APIs and bank payment systems. It uses a cinematic, animation-rich design.

The text on the site is kept in `src/lib/i18n.ts`. That file is the source of truth. This doc only describes the site in summary.

## Positioning

Since 2026-04-20, the site says:
- **Title:** Senior Full-Stack Engineer.
- **Tagline:** "3 years shipping fintech — crypto custody, exchange APIs, payment systems".
- **Credentials:** 3 years production fintech at Bitnet · Backend Lead at Chama · Founder of Playtime.ge and UniHub.
- **Services ("What I Do"):** Fintech Systems · Exchange & Trading · Full-Stack Products.

Before that date, the site sold Saba as a "web developer who builds websites". DevNews was shown as a project then. It was dropped.

Two brands, two audiences:

| Brand | SiteCraft | Saba Janelidze Portfolio |
|-------|-----------|--------------------------|
| Position | Affordable, accessible websites | Senior fintech / full-stack engineer |
| Audience | Small businesses without websites | Companies and founders building fintech or full-stack products; employers |
| Pricing | Visible (250-800 GEL) | Hidden ("contact for a quote") |
| Tone | Friendly, simple | Bold, cinematic, impressive |

The contact section still sends people who want a simple business website to SiteCraft.

## Audience Priority

This is based on what the site says today. Saba hasn't confirmed this order.

1. Companies and founders building fintech or full-stack products. The contact form asks "What are you building?".
2. Employers: "This person is a senior engineer".
3. Developers: "How was this built?"

## Language

Bilingual: Georgian and English.

- Auto-detect by client IP: Georgian IP = Georgian, all others = English
- Manual language toggle always visible
- All text exists in both languages
- Animations and interactions are language-independent

## Structure

Hybrid: single main scroll page + individual project detail pages.

### Main Page (single scroll)

| Section | Purpose | Target |
|---------|---------|--------|
| Preloader | Set premium tone, build anticipation | Everyone |
| Hero | Name, title, bold statement, shader background | Everyone |
| Selected Work | 3-4 project cards, click to expand into detail page | Clients + developers |
| What I Do | 3-4 service descriptions, no pricing | Clients |
| About | Photo, short bio, tech stack marquee | Everyone |
| Contact | Email, socials, "let's work together" CTA | Clients |

### Project Detail Pages (separate routes)

Live today (the list is in `projects` in `src/lib/i18n.ts`):
- /work/chama — Chama.ge, a restaurant platform with dynamic pricing (Backend Lead)
- /work/playtime — Playtime.ge, an entertainment startup (Founder)
- /work/unihub — UniHub, an education platform, piloting with Agrarian University of Georgia (Founder)

Ideas, not built:
- /work/sitecraft — a client service landing page

Dropped on 2026-04-20:
- /work/devnews

Each project page: full-screen hero image, project description, tech stack, challenge/solution story, live link, screenshots.

Animated page transitions between main scroll and project pages.

## Animation Strategy

Three paradigms combined:

1. **Narrative Scroll** (backbone) — GSAP ScrollTrigger pinning, scroll-driven reveals, text animations
2. **Micro-Interactions** (layer) — magnetic buttons, custom cursor, 3D tilt cards, hover effects
3. **Shader Accents** (wow-factor) — Three.js shader hero background, WebGL distortion on project hovers

### Specific Animation Techniques

| Technique | Library | Where Used |
|-----------|---------|------------|
| Smooth scrolling | Lenis | Global |
| Custom cursor (dot + circle) | GSAP quickTo | Global |
| Noise/grain texture overlay | SVG feTurbulence | Global background |
| Sticky nav (hide on scroll down, show on up) | GSAP ScrollTrigger | Global |
| Preloader counter + text scramble | GSAP Timeline + ScrambleText | Preloader |
| Shader background reacting to cursor | React Three Fiber + GLSL | Hero |
| SplitText character-by-character reveal | GSAP SplitText | Hero headline |
| Scroll-driven project reveals | GSAP ScrollTrigger + clip-path | Selected Work |
| WebGL image distortion on hover | Three.js + displacement maps | Project cards |
| Magnetic button effect | GSAP quickTo | CTA buttons |
| 3D perspective tilt on hover | Vanilla JS + CSS perspective | Project cards, service cards |
| Infinite velocity-responsive marquee | GSAP / CSS transforms | Tech stack in About |
| Text blur-to-sharp on scroll | GSAP + CSS filter | Section headings |
| Page transitions | Framer Motion AnimatePresence | Main ↔ project pages |
| Stacking cards on scroll | GSAP ScrollTrigger pin | What I Do section |
| Parallax layers | GSAP ScrollTrigger | About section photo |
| prefers-reduced-motion fallback | CSS media query | Global — disables all motion |

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| React Router | Routing (main page + project pages) |
| GSAP (free) | ScrollTrigger, SplitText, ScrambleText, MorphSVG, quickTo |
| Lenis | Smooth scrolling |
| React Three Fiber + Drei | Three.js shader hero, WebGL effects |
| Framer Motion | Page transitions (AnimatePresence) |
| Tailwind CSS | Styling |
| TypeScript | Type safety |
| Vercel | Deployment (free) |

## Performance Requirements

- First Contentful Paint under 2 seconds (excluding preloader)
- Lighthouse performance score 90+
- All animations use transform and opacity only (GPU-composited)
- Three.js elements lazy-loaded after main content
- Mobile fallback: simplified animations, no WebGL on low-end devices
- prefers-reduced-motion: all animations disabled, static layout shown

## Design Direction

- Dark mode primary (light backgrounds feel generic for developer portfolios)
- Minimal color palette — one accent color against dark backgrounds
- Large typography for headings
- Generous whitespace between sections
- Noise/grain texture for warmth
- No stock photos — real screenshots and personal photo only
- Georgian font: Noto Sans Georgian
- English font: designer's choice (clean sans-serif)
