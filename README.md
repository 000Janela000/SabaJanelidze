# Saba Janelidze — Portfolio

The personal site of Saba Janelidze, Principal Engineer in fintech: https://www.sabajanelidze.com

- **Stack:** Astro 7 (static HTML), TypeScript (strict), plain CSS with design tokens, self-hosted Inter and Newsreader.
- **Hosting:** a Cloudflare Worker serving the built files (`wrangler.jsonc`, `public/_headers`, `public/_redirects`).
- **JavaScript:** only small scripts where something moves or reacts.
- **Language:** English (a Georgian page comes later; `/ka` redirects home until then).

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run verify   # astro check + astro build
npm run cf:dry   # build, then a Cloudflare dry run (uploads nothing)
```

The structure, the rules for agents and contributors and how to deploy: `AGENTS.md`.
