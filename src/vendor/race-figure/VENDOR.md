# Vendored: `<race-figure>` 1.1.5

**Do not edit these files here. Changes come from the lab session** (the lab repo builds them; this folder only copies them).

| | |
|---|---|
| What | The payments race as one element: two withdrawals of 80 from a balance of 100, replaying recorded traces of the lab game's real code (54 runs; 36 lose money, 18 don't). |
| Source repo | `sabajanelidze-lab` (public since 2026-10-18, GitHub `sabajanelidze/sabajanelidze-lab`), folder `packages/race-figure/dist/` |
| Commit | `1bb69f4` (on `main`; its CI run was green). 1.1.5: the row of controls is as tall as its tallest state from the start (44 px on desktop; button, gap and link on phones), so the figure is as tall before its script runs as after and nothing under it moves when it upgrades; with JavaScript off this leaves about 24 px (desktop) or 52 px (phones) of space under the link (CSS only; the JS and HTML are byte-identical to 1.1.4). 1.1.4 (`7269791`): under 30 rem "Exchange short" always sits on its own line, so the money row doesn't rewrap as the digits change during a run (CSS only). 1.1.3 (`e73c19f`): "Run another order" shows from the moment the element upgrades, so the buttons row has one height before, during and after a run; starting any run stops the automatic first run; the reserved "Exchange short" amount holds a no-break space (same row height on Windows and Linux fonts). 1.1.2 (`48dfde4`): the "Exchange short" slot keeps its space with `data-rf-reserved` (visibility hidden), not the `hidden` attribute, so a page's own `[hidden]` rule (our Tailwind base: `display: none !important`) cannot collapse it. 1.1.1 (`eafc2a9`): on phones the figure keeps one height from the first step to the result (the link sits on its own line; "Exchange short" keeps its place while a run plays), and below 336 px wide step 2 reads "read and check the balance" (both labels are in the HTML; CSS shows one). 1.1.0 (`57cb088`, `b1e7e04`): "Short" became "Exchange short", the link "Find the bug →" became "Reproduce it yourself →", 13 px step labels on narrow phones. 1.0.0 was `837f081`. |
| Version | 1.1.5 |
| Copied | 2026-10-17, byte for byte from GitHub at `1bb69f4` (not from the lab's working folder) |
| Docs | `packages/race-figure/README.md` in the lab repo (embed snippet, `--rf-*` variables, sizes) |

## Files

| File | Bytes | Gzip (`gzip -9` here; the lab's tool can differ by a few bytes) | SHA-256 |
|---|---|---|---|
| `race-figure.js` | 8,793 | 2,895 | `445d915353bee53a0bcf4ac35720d56c3dce96fa29276f28421dfe5b8acb3db7` |
| `race-figure.css` | 7,206 | 2,373 | `ee9f68c6aade3e7b96b80334a252e840911af10f24c988c7a774136363a97fa6` |
| `race-figure.html` | 2,648 | 775 | `f8155933ba4ff30dab0e4a7cad877450bf0b45a8b232d2e75a1b9b3b8b8be097` |

## How the portfolio uses them

`src/pages/_home/hero-race.astro`:

- **HTML:** imported as text (`?raw`) and written into the page on the server, so the end state shows without JavaScript. The only change at build time: the lab address `https://lab.sabajanelidze.com/day/payments` (it appears twice: `lab-url` and the "Reproduce it yourself →" link) gets `?from=portfolio-home`. The build fails if the address does not appear exactly twice, so a new version cannot silently drop the tag.
- **CSS:** imported normally; Astro puts it inside the page's `<style>` (no extra request). The `--rf-*` variables default to our design tokens, so light and dark work. The component sets `--rf-mono: var(--font-source)` (money figures in the small monospace).
- **JS:** loaded on idle with a dynamic `import()` (Vite gives it its own hashed file in `dist/_astro/`). The element then upgrades the HTML that is already there.

## Updating

1. The lab session sends a NOTICE with the new version and commit.
2. Copy the three files from the lab repo's `packages/race-figure/dist/` over these, unchanged.
3. Update the table above (commit, version, date, sizes, hashes).
4. `npm run verify`, then check the hero in a browser: plays once at 50 % visible, Pause / Play, "Run another order", reduced motion, JavaScript off. Re-run the contrast audit.
