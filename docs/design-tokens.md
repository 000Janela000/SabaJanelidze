# Design tokens

The shared look of sabajanelidze.com, in one file: **`src/styles/tokens.css`** (version 2, 2026-10-15).

A "design token" is a named value, for example `--accent` for the accent colour. Every page uses the names, never the raw values. So a colour changes in one place, and both themes come from one design.

The file is plain CSS (custom properties). It needs no build step and no Tailwind.

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
3. A tiny script in `<head>` applies a saved choice **before the first paint**, so the page never flashes the wrong theme (`themeBoot` in `src/layouts/Base.astro`). It reads the old values `paper` and `blueprint` as `light` and `dark`. If storage is blocked, it does nothing and the system setting decides.

## What each token is for

| Group | Tokens | Use |
|---|---|---|
| Page colours | `--bg`, `--surface`, `--surface-2` | Page background; cards; insets such as code and a hovered or pressed control. |
| Text | `--fg`, `--muted`, `--faint` | Main text; secondary text (sources, dates, meta lines, 7:1 or more); decoration only (never text). |
| Lines | `--line`, `--line-strong` | Quiet hairlines between blocks (decoration, never behind text); lines that carry meaning: control borders, diagram lines (3:1 or more). |
| Accent | `--accent`, `--accent-hover`, `--accent-fg`, `--accent-soft` | The **one** accent: links (always underlined), the focus ring, diagram marks; a link under the pointer; text on a filled accent surface; soft highlight panels. |
| Failure | `--danger`, `--danger-soft` | Only for failures in case-study diagrams. Not a second accent. Not used on the home page. |
| Main button | `--btn-bg`, `--btn-bg-hover`, `--btn-fg`, `--btn-border` | The one button style ("Email me"): fill, fill under the pointer, text, edge. |
| Focus | `--focus` | The 2 px focus ring (7:1 or more on the page). |
| Theme | `--theme-color` | The phone browser bar colour. |
| Fonts | `--font-body`, `--font-ka`, `--font-code`, `--weight-regular`, `--weight-strong` | Inter; Noto Sans Georgian; the system monospace (commands and code only); the only two weights (400, 600). |
| Type scale | `--fs-xs` … `--fs-2xl`, `--fs-hero`, `--lh-*`, `--tracking-*` | 13 px tags, 15 px sources and meta, 17 px body, up to 40 px headings and the 32 to 52 px pitch; line heights; letter-spacing (English only, never Georgian). |
| Spacing | `--space-1` … `--space-9`, `--section-space`, `--gutter`, `--content-max`, `--header-h` | A 4 px scale; the gap between sections; page margins; content width (1120 px); the header height. |
| Radii | `--radius-tag`, `--radius`, `--radius-card`, `--radius-pill` | 4 px tags, 8 px buttons, 12 px cards, round pills. |
| Motion | `--dur-instant` … `--dur-page`, `--ease-out`, `--ease-in-out` | 100 to 300 ms, nothing longer (see "Motion rules" in `AGENTS.md`). |

Two rules:

- **One accent per theme.** Calm blue `#2b4aa6` in light, `#93ade6` in dark. Red (`--danger`) is only for failures.
- **Names never clash with Tailwind.** Tailwind 4 owns `--text-*`, `--leading-*`, `--radius-sm` and similar names. That is why the type scale is `--fs-*` and the line heights are `--lh-*`.

## Using the tokens on another site (the lab at lab.sabajanelidze.com)

The lab is a separate repo. To look like the same family:

1. **Copy `src/styles/tokens.css` into the lab repo as it is.** Keep the version line at the top. When this file changes, the portfolio session sends the lab a NOTICE with the new version, and the lab copies it again. (Linking the file across sites is possible, but then a change here could break the lab without warning.)
2. **Load it before your own styles,** and use only the token names, never raw colours. For a canvas drawing, read the values with `getComputedStyle(document.documentElement).getPropertyValue("--accent")`.
3. **Use the same theme switch:** the `data-theme` attribute on `<html>` with the values `light` and `dark` (the old `paper` and `blueprint` still work), the `localStorage` key `theme`, and the same head script (copy `themeBoot` from `src/layouts/Base.astro`). Put the switch in the footer as "Theme: Light · Dark · Auto" (copy `src/components/site/ThemeSwitch.astro`). Note: `localStorage` is per site, so a choice made on www does not carry over to lab yet. If that matters later, both sites can switch to a cookie on `.sabajanelidze.com`.
4. **If your pages still use removed tokens** (`--grid-*`, `--hero-glow*`, `--btn-shadow`, `--margin-col`, `--fs-4xl`, `--dur-reveal`, `--step-hold`), replace them: no grid, no glow, no shadow. A `var()` with a missing token silently falls back to nothing.
5. **Fonts:** self-host Inter 400 and 600 (the `@fontsource/inter` package) and add the "Inter Fallback" `@font-face` from `src/styles/global.css` (it stops text from jumping when the font loads).
6. **Follow the same motion rules** (`AGENTS.md`, "Motion rules"): only `transform` and `opacity` move, 100 to 300 ms, reduced motion is designed.

## Where the tokens are used here

- `src/styles/ui.css`: the shared building blocks of the calm design (`ui-wrap`, `ui-section`, `ui-h2`, `ui-intro`, `ui-btn`, `ui-action`, `ui-link`, `ui-meta`, `ui-card`).
- `src/components/site/`: header, footer, the theme switch (`ThemeSwitch.astro`), the section wrapper.
- `src/components/home/`: the home page sections.
- `src/styles/notebook.css` and `src/components/parked/`: the parked notebook explainers (fig. 1, fig. 2, the stepped pipeline, the lab teaser) for the future "How I work" page. They load `notebook.css` themselves; it has fallbacks for the removed tokens.
