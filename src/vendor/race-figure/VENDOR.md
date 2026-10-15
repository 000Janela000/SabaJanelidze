# Vendored: `<race-figure>` 1.1.0

**Do not edit these files here. Changes come from the lab session** (the lab repo builds them; this folder only copies them).

| | |
|---|---|
| What | The payments race as one element: two withdrawals of 80 from a balance of 100, replaying recorded traces of the lab game's real code (54 runs; 36 lose money, 18 don't). |
| Source repo | `sabajanelidze-lab` (private, GitHub `000Janela000/sabajanelidze-lab`), folder `packages/race-figure/dist/` |
| Commit | `b1e7e04` (on `main`). 1.1.0 changed two texts in `57cb088` ("Short" is now "Exchange short"; the link "Find the bug →" is now "Reproduce it yourself →"), and `b1e7e04` made the step labels 13 px on narrow phones so they no longer overlap (CSS only). 1.0.0 was `837f081`. |
| Version | 1.1.0 |
| Copied | 2026-10-15, byte for byte from GitHub at `b1e7e04` (not from the lab's working folder) |
| Docs | `packages/race-figure/README.md` in the lab repo (embed snippet, `--rf-*` variables, sizes) |

## Files

| File | Bytes | Gzip (`gzip -9` here; the lab's tool can differ by a few bytes) | SHA-256 |
|---|---|---|---|
| `race-figure.js` | 8,515 | 2,830 | `36bdc0d1dda727e28fc4359553aa1a67970977c195e29e21cdfc8c36ce3ac773` |
| `race-figure.css` | 5,651 | 1,801 | `cdead02ce1801c14ac7ed85e5b1eb64227f18298fc907db2dc3e5aa6c1d44893` |
| `race-figure.html` | 2,562 | 751 | `0bca71f281a190b428052a9605d2a2a7dd42c2f432ba4b7afbc0f9796681e63b` |

## How the portfolio uses them

`src/components/home/HeroRace.astro`:

- **HTML:** imported as text (`?raw`) and written into the page on the server, so the end state shows without JavaScript. The only change at build time: the lab address `https://lab.sabajanelidze.com/day/payments` (it appears twice: `lab-url` and the "Reproduce it yourself →" link) gets `?from=portfolio-home`. The build fails if the address does not appear exactly twice, so a new version cannot silently drop the tag.
- **CSS:** imported normally; Astro puts it inside the page's `<style>` (no extra request). The `--rf-*` variables default to our design tokens, so light and dark work. The component sets `--rf-mono: var(--font-source)` (money figures in the small monospace).
- **JS:** loaded on idle with a dynamic `import()` (Vite gives it its own hashed file in `dist/_astro/`). The element then upgrades the HTML that is already there.

## Updating

1. The lab session sends a NOTICE with the new version and commit.
2. Copy the three files from the lab repo's `packages/race-figure/dist/` over these, unchanged.
3. Update the table above (commit, version, date, sizes, hashes).
4. `npm run verify`, then check the hero in a browser: plays once at 50 % visible, Pause / Play, "Run another order", reduced motion, JavaScript off. Re-run the contrast audit.
