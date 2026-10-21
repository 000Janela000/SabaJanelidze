# Design tokens

The shared look of sabajanelidze.com, in one file: **`src/styles/tokens.css`** (version 3, 2026-10-15).

A "design token" is a named value, for example `--accent` for the accent colour. Every page uses the names, never the raw values. So a colour changes in one place and both themes come from one design.

The file is plain CSS (custom properties). It needs no build step and no Tailwind.

## What changed in version 3 (2026-10-15, Phase 1e "Calm, with one live proof")

The calm layout stays. Version 3 gives it a voice and gives the colours clear jobs. Every colour value is the same as in version 2, except the dark theme's main button.

- **New: a heading face.** `--font-display` is **Newsreader** (a serif), weight 500 only (`--weight-display`), for text of 24 px and up: the h1, the h2s, the big numbers and the one big card title. It is one self-hosted file (`src/assets/fonts/newsreader-latin-500-opsz.woff2`, 25 KB). The weight is fixed at 500. The optical-size axis is kept from 24 to 72, so with `font-optical-sizing: auto` a 28 px heading and a 46 px headline each get their own cut. Latin characters only. A metric-matched fallback ("Newsreader Fallback": Georgia at 98 %) stops the text from jumping when the font arrives. Body text stays Inter 400 and 600.
- **Georgian headings** use Noto Sans Georgian 600 (there is no Georgian serif). `global.css` sets `--font-display` and `--weight-display` on every element with `lang="ka"`, so nothing else has to change.
- **New: monospace for sources, dates and money figures.** `--font-source` (the system monospace, 0 KB) at `--fs-source` (14 px), always with tabular numbers (all digits the same width). Use the class `ui-source`. Monospace is still not for labels or headings.
- **The accent has three jobs and only these:** link underlines (links are now `--fg` text with an accent underline, not blue text), the focus ring and movement in the hero figure. It is not a text colour for body copy and not a panel fill.
- **Red has one job:** `--danger` marks the money loss in the hero figure. Nothing else on the site is red.
- **Dark main button:** the accent itself (`#93ade6`) with dark text (`#121722`, 8.0:1), no border. `--btn-border` is now `transparent` in both themes (kept so old copies do not break). The light button stays navy.
- **Changed sizes:** `--fs-hero` is 32 to 46 px (was 32 to 52; the pitch now sits in the left of two columns), `--lh-tight` 1.1, `--lh-heading` 1.16, `--tracking-display` -0.015em, `--tracking-heading` -0.01em (a serif needs less negative letter-spacing than Inter).
- **New tokens:** `--font-display`, `--weight-display`, `--font-source`, `--fs-source`, `--nudge` (2 px: how far a card image lifts or a link arrow moves on hover).
- **For the lab:** copy the new `tokens.css` as it is. For the heading face, also copy `src/assets/fonts/newsreader-latin-500-opsz.woff2` with its licence (`Newsreader-OFL.txt`, SIL Open Font License), the `@font-face` line from `src/shared/components/fonts.astro` and the "Newsreader Fallback" block from `src/styles/global.css`. The `<race-figure>` element already reads `--accent`, `--danger`, `--font-code` and the rest, so it follows version 3 without changes.

Every colour pair is checked against the real pixels in `private/design/phase1e/contrast-audit.md` (not in git): 0 failures in both themes.

## What changed in version 2 (2026-10-15, Phase 1c "Calm")

The notebook look is gone. The design is now calm: direction A's layout with real content.

- **Removed: the grid.** No graph-paper or blueprint grid anywhere. The tokens `--grid-cell`, `--grid-major`, `--grid-minor`, `--grid-major-color` and the class `.grid-paper` are deleted.
- **Removed: the glow.** No WebGL glow. `--hero-glow` and `--hero-glow-color` are deleted.
- **Removed: the offset button shadow.** `--btn-shadow` is deleted. There is one button style: filled, no shadow.
- **Removed: the notebook margin.** `--margin-col` is deleted (no more "§" section numbers in a side column).
- **Themes renamed:** "Paper" is now **light**, "Blueprint" is now **dark**. Use `data-theme="light"` and `data-theme="dark"`. The old values `paper` and `blueprint` still work, both in `tokens.css` and in the head script, so nothing breaks while the lab updates.
- **New palette.**
  - Light: warm off-white `#f7f5f0` (was `#f5f3ec`), navy text `#18233a` (was `#1b2130`), stronger muted text `#4a5366` (7.1:1, was 6.3:1), calm blue accent `#2b4aa6` (was `#2342b8`).
  - Dark: a calm slate `#15181d` (was near-black `#0a0b0e`), text `#e6e8ec`, muted `#a9b0bc` (8.2:1), a soft, low-saturation blue accent `#93ade6` (was `#5b86f7`). The dark main button is a deep blue `#36528f` with white text and a lighter edge.
- **New tokens:** `--accent-hover` (a link under the pointer), `--btn-bg-hover`, `--btn-border` (the main button's edge), `--focus` (the focus ring), `--radius-card` (12 px cards).
- **Changed meaning:** `--line-strong` is no longer black "ink". It is now the colour for lines that carry meaning: control borders and diagram lines, 3:1 or more against the page. `--line` stays a quiet hairline for decoration.
- **Bigger, clearer text.** Body text is 17 px (was 16). Sources, dates and meta lines are 15 px (was 12 to 14) in `--muted`, at 7:1 or more. `--fs-xs` (13 px) is only for tags, never for sources or captions. The pitch has its own size, `--fs-hero` (32 to 52 px). `--fs-4xl` (the old 72 px name) is gone.
- **Softer shapes:** buttons have 8 px corners, cards 12 px (the notebook was square).
- **Monospace** (`--font-code`) is only for real commands and code now. It is not used for labels, numbers or dates.
- **Motion:** `--dur-reveal` (the 400 ms circular theme reveal) and `--step-hold` (the explainer timing) are deleted. The theme switch is instant.

Every colour pair is checked in `private/design/phase1c/contrast-audit.md` (not in git). That audit covers text against the real pixels behind it, hover, focus, visited and non-text parts, in both themes. All pass WCAG 2.2 AA.

## The two themes

| Theme | What it looks like | When it shows |
|---|---|---|
| **Light** | Navy text on warm off-white, one calm blue accent, quiet hairlines. | The default. Also when the visitor picks "Light". |
| **Dark** | Light text on a calm, low-saturation slate, the same blue made softer. No neon, no gradients. | When the visitor's system is dark and they picked "Auto", or when they pick "Dark". |

How the choice works:

1. `<html data-theme="light">` or `<html data-theme="dark">`: the visitor picked one in the footer switch ("Theme: Light · Dark · Auto"). The choice is saved in `localStorage` under the key `theme`. "Auto" removes the attribute and the saved value.
2. No `data-theme`: the system setting decides (`prefers-color-scheme`). This also works without JavaScript; the switch is then hidden.
3. A tiny script in `<head>` applies a saved choice **before the first paint**, so the page never flashes the wrong theme (`themeBoot` in `src/shared/components/base-layout.astro`). It reads the old values `paper` and `blueprint` as `light` and `dark`. If storage is blocked, it does nothing and the system setting decides.

## What each token is for

| Group | Tokens | Use |
|---|---|---|
| Page colours | `--bg`, `--surface`, `--surface-2` | Page background; cards; insets such as code and a hovered or pressed control. |
| Text | `--fg`, `--muted`, `--faint` | Main text; secondary text (sources, dates, meta lines, 7:1 or more); decoration only (never text). |
| Lines | `--line`, `--line-strong` | Quiet hairlines between blocks (decoration, never behind text); lines that carry meaning: control borders, diagram lines (3:1 or more). |
| Accent | `--accent`, `--accent-hover`, `--accent-fg`, `--accent-soft` | The **one** accent, with three jobs: link underlines, the focus ring, movement in the hero figure. `--accent-hover`: a link under the pointer. `--accent-fg`: text on a filled accent surface (the dark button). `--accent-soft`: parked explainers only. |
| Loss | `--danger`, `--danger-soft` | Only the money loss in the hero figure (later also failures in case-study diagrams). Never a second accent. |
| Main button | `--btn-bg`, `--btn-bg-hover`, `--btn-fg`, `--btn-border` | The one button style ("Email me about your team"): fill, fill under the pointer, text. No visible border since v3 (`--btn-border: transparent`). Light: navy. Dark: the accent with dark text. |
| Focus | `--focus` | The 2 px focus ring (7:1 or more on the page). |
| Theme | `--theme-color` | The phone browser bar colour. |
| Fonts | `--font-body`, `--font-display`, `--font-ka`, `--font-code`, `--font-source`, `--weight-regular`, `--weight-strong`, `--weight-display` | Inter (body); Newsreader (headings 24 px and up; Georgian: Noto Sans Georgian); the system monospace for code and as `--font-source` for sources, dates and money figures; Inter's two weights (400, 600); Newsreader's one (500). |
| Type scale | `--fs-xs` … `--fs-2xl`, `--fs-source`, `--fs-hero`, `--lh-*`, `--tracking-*` | 13 px tags and small labels, 14 px mono sources, 15 px meta, 17 px body, up to 40 px headings and the 32 to 46 px pitch; line heights; letter-spacing (English only, never Georgian). |
| Spacing | `--space-1` … `--space-9`, `--section-space`, `--gutter`, `--content-max`, `--header-h` | A 4 px scale; the gap between sections; page margins; content width (1120 px); the header height. |
| Radii | `--radius-tag`, `--radius`, `--radius-card`, `--radius-pill` | 4 px tags, 8 px buttons, 12 px cards, round pills. |
| Motion | `--dur-instant` … `--dur-page`, `--ease-out`, `--ease-in-out`, `--nudge` | 100 to 300 ms, nothing longer (see "Motion rules" in `AGENTS.md`); the 2 px hover nudge of card images and link arrows (only when motion is allowed). |

Two rules:

- **One accent per theme.** Calm blue `#2b4aa6` in light, `#93ade6` in dark, with three jobs (link underlines, focus rings, movement in the hero figure). Red (`--danger`) only marks the money loss in the hero figure.
- **Names never clash with Tailwind.** Tailwind 4 owns `--text-*`, `--leading-*`, `--radius-sm` and similar names. That is why the type scale is `--fs-*` and the line heights are `--lh-*`.

## Using the tokens on another site (the lab at lab.sabajanelidze.com)

The lab is a separate repo. To look like the same family:

1. **Copy `src/styles/tokens.css` into the lab repo as it is.** Keep the version line at the top. When this file changes, the portfolio session sends the lab a NOTICE with the new version and the lab copies it again. (Linking the file across sites is possible, but then a change here could break the lab without warning.)
2. **Load it before your own styles,** and use only the token names, never raw colours. For a canvas drawing, read the values with `getComputedStyle(document.documentElement).getPropertyValue("--accent")`.
3. **Use the same theme switch:** the `data-theme` attribute on `<html>` with the values `light` and `dark` (the old `paper` and `blueprint` still work), the `localStorage` key `theme` and the same head script (copy `themeBoot` from `src/shared/components/base-layout.astro`). Put the switch in the footer as "Theme: Light · Dark · Auto" (copy `src/shared/components/theme-switch.astro` and `src/shared/lib/theme-colors.ts`). Note: `localStorage` is per site, so a choice made on www does not carry over to lab yet. If that matters later, both sites can switch to a cookie on `.sabajanelidze.com`.
4. **If your pages still use removed tokens** (`--grid-*`, `--hero-glow*`, `--btn-shadow`, `--margin-col`, `--fs-4xl`, `--dur-reveal`, `--step-hold`), replace them: no grid, no glow, no shadow. A `var()` with a missing token silently falls back to nothing.
5. **Fonts:** self-host Inter 400 and 600 (the `@fontsource/inter` package) and add the "Inter Fallback" `@font-face` from `src/styles/global.css` (it stops text from jumping when the font loads). For headings, Newsreader 500 (see "What changed in version 3").
6. **Follow the same motion rules** (`AGENTS.md`, "Motion rules"): only `transform` and `opacity` move, 100 to 300 ms, reduced motion is designed.

## Where the tokens are used here

- `src/styles/ui.css`: the shared building blocks of the calm design (`ui-wrap`, `ui-section`, `ui-display`, `ui-h2`, `ui-intro`, `ui-source`, `ui-btn`, `ui-action`, `ui-link`, `ui-arrow`, `ui-meta`, `ui-tag`, `ui-card`).
- `src/pages/_home/hero-race.astro`: the hero's `<race-figure>` (vendored from the lab in `src/vendor/race-figure/`); it reads the tokens through its `--rf-*` variables.
- `src/shared/components/`: the page shell, header, footer and the theme switch (`theme-switch.astro`).
- `src/pages/_home/`: the home page sections; `src/styles/ui.css`: the shared classes.
