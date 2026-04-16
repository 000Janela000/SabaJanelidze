# Saba Janelidze Portfolio — Roadmap

> Last updated: 2026-03-21

## Planned

### Phase 1: Core Build

**Project scaffolding and global setup** — Approved
React + Vite + TypeScript + Tailwind. Lenis smooth scroll. GSAP setup. React Router for main + project routes. Bilingual i18n system with IP detection.

**Preloader** — Approved
GSAP timeline: counter 0-100, text scramble of name, transition into hero. Sets the premium tone.

**Hero section** — Approved
Three.js shader background reacting to cursor movement. Name revealed with SplitText character animation. Title and bold statement fade in. Scroll indicator.

**Selected Work section** — Approved
3 project cards (playtime, devnews, unihub). Scroll-triggered clip-path reveal. WebGL distortion on hover. Click navigates to project detail page with animated transition.

**What I Do section** — Approved
3-4 service descriptions in stacking cards (pinned scroll). No pricing. Services: Web Development, UI/UX Design, Full-Stack Solutions.

**About section** — Approved
Photo with parallax. Short bio with text reveal animation. Infinite velocity-responsive marquee of tech stack logos/names.

**Contact section** — Approved
"Let's work together" headline. Email link. Social links (Facebook, GitHub). Magnetic CTA button. Custom cursor changes state.

**Project detail pages** — Approved
3 pages (/work/playtime, /work/devnews, /work/unihub). Full-screen hero image, description, tech stack, live link. Animated page transition from main page.

### Phase 1.5: Global Polish

**Custom cursor** — Approved
Dot + outer circle following with GSAP quickTo. Changes state on interactive elements (grow on links, arrow on projects, "click" text on CTAs).

**Noise/grain overlay** — Approved
SVG feTurbulence filter as global background texture. Subtle, adds warmth to dark theme.

**Sticky nav** — Approved
Hides on scroll down, reveals on scroll up. Language toggle visible. Minimal: name/logo + language switch.

**prefers-reduced-motion** — Approved
CSS media query disables all animations. Static layout fallback. Mandatory for accessibility.

**Mobile optimization** — Approved
Simplified animations on mobile. No WebGL on devices with low GPU. Touch-friendly interactions (no hover-dependent features). Minimum 44px touch targets.

### Phase 2: After SiteCraft Launch

**Add SiteCraft project** — Proposed
Add /work/sitecraft as 4th project once SiteCraft landing page is live.

**Blog/writing section** — Proposed
Optional. If Saba starts writing technical posts, add a minimal blog section. Not needed at launch.

---

## Completed

Nothing yet — project is being built.

---

## Dropped

**3D explorable world** — Dropped 2026-03-21
Full Three.js navigable environment (like Bruno Simon's car portfolio). Dropped because: requires Blender modeling skills, 3-6 month build time, conflicts with scroll-based navigation, a mediocre 3D scene hurts more than no 3D scene. Shader accents within the scroll experience deliver similar wow-factor with less risk.

**Pricing display** — Dropped 2026-03-21
No pricing on premium portfolio. SiteCraft handles the affordable/transparent pricing angle. This portfolio positions as premium — "contact for a quote."

**Multi-language SEO pages** — Dropped 2026-03-21
Separate /ka/ and /en/ URL paths for SEO. Not needed — portfolio is a personal brand site, not an SEO play. IP detection + toggle is sufficient.

---

## Competitive Intelligence

**Jaw-dropping portfolios analyzed:**
- Bruno Simon (bruno-simon.com) — 3D car game, Awwwards SOTM
- Stefan Vitasovic (stefanvitasovic.dev) — WebGL video grid, Framer Motion transitions
- Roman Jean-Elie (romanjeanelie.com) — 5 distinct shader techniques
- Dennis Snellenberg (dennissnellenberg.com) — micro-interaction mastery
- Brittany Chiang (brittanychiang.com) — clean single-page, most forked on GitHub

**Key insight:** The portfolios that win awards combine narrative scroll + micro-interactions + one WebGL showstopper. That's our approach.

**Animation stack consensus (2025-2026):** GSAP (now 100% free) + Lenis + React Three Fiber + Framer Motion.

## Audit History

- 2026-03-21: Initial product audit. Decided on hybrid structure (main scroll + project pages), 3-paradigm animation approach (narrative scroll + micro-interactions + shader accents), bilingual with IP detection, premium positioning.
