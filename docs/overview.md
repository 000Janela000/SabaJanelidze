# Saba Janelidze Portfolio — Overview

> Last updated: 2026-03-21

## What It Is

Premium personal portfolio website for Saba Janelidze, a web developer based in Georgia. Showcases projects, services, and skills through a cinematic, animation-rich experience that positions Saba as a high-end web developer.

## Positioning

Two brands, two audiences:

| Brand | SiteCraft | Saba Janelidze Portfolio |
|-------|-----------|--------------------------|
| Position | Affordable, accessible | Premium, creative |
| Audience | Small businesses without websites | Clients wanting something special, developers, employers |
| Pricing | Visible (250-800 GEL) | Hidden ("contact for a quote") |
| Tone | Friendly, simple | Bold, cinematic, impressive |

## Audience Priority

1. Potential clients — "Can this person make my business look amazing?"
2. Developers — "How did he build this?"
3. Employers — "This person is skilled."

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

- /work/playtime — Entertainment platform with admin panel
- /work/devnews — Tech news platform
- /work/unihub — Education platform
- /work/sitecraft — Client service landing page (added after SiteCraft is built)

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
