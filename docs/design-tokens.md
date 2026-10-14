# Design tokens

The shared look of sabajanelidze.com, in one file: **`src/styles/tokens.css`** (version 1, 2026-10-15).

A "design token" is a named value, for example `--accent` for the accent colour. Every page uses the names, never the raw values. So a colour changes in one place, and both themes come from one design.

The file is plain CSS (custom properties). It needs no build step and no Tailwind.

## The two themes

| Theme | What it looks like | When it shows |
|---|---|---|
| **Paper** (light) | The engineering notebook: warm grid paper, navy ink, one blue accent. | The default. Also when the visitor picks it. |
| **Blueprint** (dark) | The same notebook as a blueprint: near-black, blue grid lines, one blue accent, a slow blue glow behind the hero on desktop. | When the visitor's system is dark, or when the visitor picks it. |

How the choice works:

1. `<html data-theme="blueprint">` or `<html data-theme="paper">`: the visitor picked one with the header switch. The choice is saved in `localStorage` under the key `theme`.
2. No `data-theme`: the system setting decides (`prefers-color-scheme`). This also works without JavaScript.
3. A tiny script in `<head>` applies a saved choice **before the first paint**, so the page never flashes the wrong theme (`themeBoot` in `src/layouts/Base.astro`). If storage is blocked, it does nothing and the system setting decides.

## What each token is for

| Group | Tokens | Use |
|---|---|---|
| Page colours | `--bg`, `--surface`, `--surface-2` | Page background; cards and figures; insets such as commands and inputs. |
| Text | `--fg`, `--muted`, `--faint` | Main text; secondary text; decoration only (never text, the contrast is too low). |
| Lines | `--line`, `--line-strong` | Hairlines between rows; the ink rules that structure a page (section tops, table edges). |
| Accent | `--accent`, `--accent-strong`, `--accent-fg`, `--accent-soft` | The **one** accent: links, numbers, "pass" marks; filled accent surfaces; text on them; soft highlight panels. |
| Failure | `--danger`, `--danger-soft` | Only for failures ("✗", "build fails"). Not a second accent. |
| Main button | `--btn-bg`, `--btn-fg`, `--btn-shadow` | The "Book a call" style button and its offset shadow. |
| Grid | `--grid-minor`, `--grid-major-color`, `--grid-cell`, `--grid-major` | The paper / blueprint grid. Put `class="grid-paper"` on any element to draw it. |
| Theme switches | `--hero-glow`, `--hero-glow-color`, `--theme-color` | 0 or 1: whether the blueprint glow shows; its colour; the phone browser bar colour. |
| Fonts | `--font-body`, `--font-ka`, `--font-code`, `--weight-regular`, `--weight-strong` | Inter; Noto Sans Georgian; the system monospace; the only two weights (400, 600). |
| Type scale | `--fs-xs` … `--fs-4xl`, `--lh-*`, `--tracking-*` | Font sizes from 12 px captions to the 72 px name; line heights; letter-spacing (English only, never Georgian). |
| Spacing | `--space-1` … `--space-9`, `--section-space`, `--gutter`, `--content-max`, `--margin-col`, `--header-h` | A 4 px scale; the gap between sections; page margins; content width; the notebook margin; the header height. |
| Radii | `--radius-tag`, `--radius`, `--radius-pill` | 2 px tags, 3 px buttons and cards, round pills. The notebook is square. |
| Motion | `--dur-instant` … `--dur-reveal`, `--ease-out`, `--ease-in-out`, `--step-hold` | 100–400 ms, nothing longer (see "Motion rules" in `AGENTS.md`). `--step-hold` is how long an explainer step stays lit. |

Two rules:

- **One accent per theme.** Blue ink in Paper (`#2342b8`), blueprint blue in Blueprint (`#5b86f7`). Red (`--danger`) is only for failures.
- **Names never clash with Tailwind.** Tailwind 4 owns `--text-*`, `--leading-*`, `--radius-sm` and similar names. That is why the type scale is `--fs-*` and the line heights are `--lh-*`.

## Using the tokens on another site (the lab at lab.sabajanelidze.com)

The lab is a separate repo. To look like the same family:

1. **Copy `src/styles/tokens.css` into the lab repo as it is.** Keep the version line at the top. When this file changes, the portfolio session sends the lab a NOTICE with the new version, and the lab copies it again. (Linking the file across sites is possible, but then a change here could break the lab without warning.)
2. **Load it before your own styles,** and use only the token names, never raw colours. For a canvas or WebGL drawing, read the values with `getComputedStyle(document.documentElement).getPropertyValue("--accent")`.
3. **Use the same theme switch:** the `data-theme` attribute on `<html>`, the values `paper` and `blueprint`, the `localStorage` key `theme`, and the same head script (copy `themeBoot` from `src/layouts/Base.astro`). Note: `localStorage` is per site, so a choice made on www does not carry over to lab yet. If that matters later, both sites can switch to a cookie on `.sabajanelidze.com`.
4. **Fonts:** self-host Inter 400 and 600 (the `@fontsource/inter` package) and add the "Inter Fallback" `@font-face` from `src/styles/global.css` (it stops text from jumping when the font loads).
5. **Follow the same motion rules** (`AGENTS.md`, "Motion rules"): only `transform` and `opacity` move, 100–400 ms, reduced motion is designed, WebGL only on desktop and paused when not visible.

## Where the tokens are used here

- `src/styles/notebook.css`: the shared building blocks (`nb-btn`, `nb-link`, `nb-figure`, `nb-cap`, `nb-card`, `nb-tags`, the section rhythm, the explainer controls).
- `src/components/site/`: header, footer, theme switch, section wrapper.
- `src/components/home/`: the home page sections and its figures.
