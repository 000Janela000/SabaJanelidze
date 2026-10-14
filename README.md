# Saba Janelidze — Portfolio

Personal portfolio of Saba Janelidze, Senior Full-Stack Engineer (fintech and AI).

**Live:** https://www.sabajanelidze.com (built from the `main` branch).

## This branch: `rebuild`

The new site, being rebuilt from scratch. It replaces the old Vite + React app only at the switch-over.

- **Stack:** Astro 7 (static HTML), TypeScript (strict), Tailwind CSS 4, self-hosted Inter and Noto Sans Georgian.
- **Languages:** English at `/`, Georgian at `/ka/`, with hreflang tags. No automatic language redirect.
- **JavaScript:** only small scripts where something moves or reacts; most pages ship none.
- **Hosting (planned):** Cloudflare Workers, static assets.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run verify   # astro check + astro build
```

Rules for agents and contributors: `AGENTS.md`.
