# Portfolio Fix Plan — Post-Audit

> Created: 2026-03-21
> Based on: Multi-perspective visual audit (3 agents: root cause, vision-vs-reality, animation technique)

## Context

The portfolio was built in 12 phases + 2 review passes (14 commits). The architecture and animation code is solid — GSAP, Lenis, Three.js, SplitText, WebGL shaders all implemented correctly. But the visual output is a developer prototype, not a premium portfolio. The gap is layout, content, and visual polish.

## What Works (keep and build on)

- Shader hero background (real GLSL, cursor-reactive)
- Custom cursor (dual-layer, state changes, VIEW text)
- Preloader choreography (counter, scramble, slide-up)
- SplitText hero reveal (character stagger)
- Clip-path scroll reveals on project images
- WebGL distortion pipeline (needs real images to shine)
- Bilingual i18n with IP detection
- Device capability fallbacks (WebGL, reduced-motion, mobile)
- Magnetic button (elastic snap-back)
- Velocity-responsive tech marquee

## Phase A: Content (no code complexity, high impact)

- [ ] Capture real project screenshots (Playtime.ge, DevNews, UniHub) via Playwright
- [ ] Add real photo or professional placeholder for About section
- [ ] Replace hello@example.com with real email
- [ ] Replace generic github.com with real GitHub profile URL
- [ ] These are the #1 blocker — without real content, the portfolio is unusable

## Phase B: Layout Foundation

- [ ] Fix centering: ensure mx-auto on nav wrapper, verify all section containers center properly
- [ ] Fix nav padding: SJ logo not touching edge, proper left spacing
- [ ] Style EN/KA toggle as visible button (border, padding, hover state)
- [ ] Hide nav during preloader (move preloader to App.tsx or hide nav until preloaderDone)
- [ ] Increase hero title/subtitle gap for Georgian descenders (mt-4 → mt-8 for Georgian)

## Phase C: Visual Breathing Room

- [ ] Increase section headings from text-sm to text-4xl+ (dramatic, premium typography)
- [ ] Fix stacking cards: pinSpacing true for all, add z-index per card, add shadow/border differentiation
- [ ] Increase noise overlay opacity from 0.03 to 0.06-0.08
- [ ] Add more vertical spacing between sections (py-32 → py-40 or py-48)
- [ ] Make project images full-width (remove 0.95 multiplier, ensure container fills)
- [ ] Add ScrollTrigger.refresh() after Lenis init to sync scroll calculations

## Phase D: Missing Animations

- [ ] Implement 3D perspective tilt on hover for project cards and service cards
- [ ] Implement text blur-to-sharp on scroll for section headings
- [ ] Enhance page transitions (add y-offset + clip-path reveal, not just opacity fade)

## Phase E: Polish

- [ ] Visual test every section in browser after fixes
- [ ] Test stacking cards with Lenis smooth scroll
- [ ] Test all animations on mobile
- [ ] Verify Georgian text spacing across all sections
- [ ] Take final screenshots and compare against spec
- [ ] Lighthouse audit for performance score

## Priority Order

B → C → A → D → E

Layout first (everything else looks wrong if layout is broken), then breathing room (sections need space), then content (real images amplify working effects), then missing animations, then final polish.

## Animation Technique Status

| # | Technique | Status |
|---|-----------|--------|
| 1 | Lenis smooth scroll | Working |
| 2 | Custom cursor | Working |
| 3 | Noise overlay | Working but invisible (0.03 opacity) |
| 4 | Sticky nav hide/show | Working |
| 5 | Preloader counter | Working |
| 6 | ScrambleText reveal | Working |
| 7 | Shader background | Working |
| 8 | SplitText char reveal | Working |
| 9 | SplitText word reveal | Working |
| 10 | Clip-path scroll reveals | Working |
| 11 | WebGL distortion hover | Working (needs real images) |
| 12 | Magnetic button | Working |
| 13 | 3D perspective tilt | NOT IMPLEMENTED |
| 14 | Stacking cards | Visually broken (pinSpacing + z-index) |
| 15 | Parallax photo | Working |
| 16 | Velocity marquee | Working |
| 17 | Page transitions | Working (basic — needs enhancement) |
| Bonus: Text blur-to-sharp | NOT IMPLEMENTED |
