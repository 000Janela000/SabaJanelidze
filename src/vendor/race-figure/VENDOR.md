# Vendored: `<race-figure>` 1.1.1

**Do not edit these files here. Changes come from the lab session** (the lab repo builds them; this folder only copies them).

| | |
|---|---|
| What | The payments race as one element: two withdrawals of 80 from a balance of 100, replaying recorded traces of the lab game's real code (54 runs; 36 lose money, 18 don't). |
| Source repo | `sabajanelidze-lab` (private, GitHub `000Janela000/sabajanelidze-lab`), folder `packages/race-figure/dist/` |
| Commit | `eafc2a9` (on `main`). 1.1.1: on phones the figure keeps one height from the first step to the result (the link sits on its own line; "Exchange short" keeps its place while a run plays), and below 336 px wide step 2 reads "read and check the balance" (both labels are in the HTML; CSS shows one). 1.1.0 (`57cb088`, `b1e7e04`): "Short" became "Exchange short", the link "Find the bug →" became "Reproduce it yourself →", 13 px step labels on narrow phones. 1.0.0 was `837f081`. |
| Version | 1.1.1 |
| Copied | 2026-10-15, byte for byte from GitHub at `eafc2a9` (not from the lab's working folder) |
| Docs | `packages/race-figure/README.md` in the lab repo (embed snippet, `--rf-*` variables, sizes) |

## Files

| File | Bytes | Gzip (`gzip -9` here; the lab's tool can differ by a few bytes) | SHA-256 |
|---|---|---|---|
| `race-figure.js` | 8,732 | 2,888 | `75c0c87931e24181329a529987476cd10f590a8f78f17f1bb101812097e8b929` |
| `race-figure.css` | 6,551 | 2,098 | `1c8990d59672aabb3cd132c5e3a23f467e75cd5814143992c66f24e1dce4767b` |
| `race-figure.html` | 2,648 | 775 | `f8155933ba4ff30dab0e4a7cad877450bf0b45a8b232d2e75a1b9b3b8b8be097` |

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
