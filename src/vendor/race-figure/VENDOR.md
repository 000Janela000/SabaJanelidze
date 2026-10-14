# Vendored: `<race-figure>` 1.0.0

**Do not edit these files here. Changes come from the lab session** (the lab repo builds them; this folder only copies them).

| | |
|---|---|
| What | The payments race as one element: two withdrawals of 80 from a balance of 100, replaying recorded traces of the lab game's real code (54 runs; 36 lose money, 18 don't). |
| Source repo | `sabajanelidze-lab` (private, GitHub `000Janela000/sabajanelidze-lab`), folder `packages/race-figure/dist/` |
| Commit | `837f081` ("feature(race-figure): the payments race as one shared element …"); its CI run was green |
| Version | 1.0.0 |
| Copied | 2026-10-15, byte for byte (checked with `cmp`) |
| Docs | `packages/race-figure/README.md` in the lab repo (embed snippet, `--rf-*` variables, sizes) |

## Files

| File | Bytes | Gzip | SHA-256 |
|---|---|---|---|
| `race-figure.js` | 8,497 | 2,816 | `cf2470063584031d0a688a016246be2db339f221709d0172e0a9d3de66b35a1d` |
| `race-figure.css` | 5,502 | 1,726 | `75bcc8936df232af4e18793602d9a4887b2f51c4327a391bd28aa875e9f0293e` |
| `race-figure.html` | 2,544 | 736 | `f28e508e92cb9aa2d5336ce7060f94eb681422f16e8717d904d9546af70eead6` |

## How the portfolio uses them

`src/components/home/HeroRace.astro`:

- **HTML:** imported as text (`?raw`) and written into the page on the server, so the end state shows without JavaScript. The only change at build time: the lab address `https://lab.sabajanelidze.com/day/payments` (it appears twice: `lab-url` and the "Find the bug →" link) gets `?from=portfolio-home`. The build fails if the address does not appear exactly twice, so a new version cannot silently drop the tag.
- **CSS:** imported normally; Astro puts it inside the page's `<style>` (no extra request). The `--rf-*` variables default to our design tokens, so light and dark work. The component sets `--rf-mono: var(--font-source)` (money figures in the small monospace).
- **JS:** loaded on idle with a dynamic `import()` (Vite gives it its own hashed file in `dist/_astro/`). The element then upgrades the HTML that is already there.

## Updating

1. The lab session sends a NOTICE with the new version and commit.
2. Copy the three files from the lab repo's `packages/race-figure/dist/` over these, unchanged.
3. Update the table above (commit, version, date, sizes, hashes).
4. `npm run verify`, then check the hero in a browser: plays once at 50 % visible, Pause / Play, "Run another order", reduced motion, JavaScript off. Re-run the contrast audit.
