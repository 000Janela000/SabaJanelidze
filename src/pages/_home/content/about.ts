// About: the short bio, the open-source tools (one line each, with its proof) and the grouped stack.
// Sources: npm downloads in the last year, read 2026-10-19 (api.npmjs.org): Arcana 2,452, OrgClone 1,608,
// UserClone 389 (4,449 across the three; npm also counts bots and CI servers); acctswap: 435 planted bugs caught,
// 0 missed, a TLA+ model of the switching protocol, Kani proofs.
export const about = {
  heading: "About",
  // No company name here; the work card names it.
  bio: [
    "I'm a Principal Engineer based in Tbilisi, Georgia (UTC+4), working remotely in English. Since January 2023 I've worked on a licensed crypto exchange. I started on its customer web app, moved to its backend, and now lead the architecture of its new core platform.",
    "On the side I build my own products, PlayTime and WasteAway, with AI agents doing most of the coding.",
  ],
  portraitAlt: "Portrait of Saba Janelidze",
  openSourceHeading: "Open source",
  openSource: [
    {
      name: "Arcana",
      text: "18 skills and 5 agents for Claude Code and Codex",
      proof: "2,452 npm downloads in the last year",
      href: "https://github.com/cj-ways/arcana",
    },
    {
      name: "acctswap",
      text: "a Rust command-line tool for Claude Code users who run many sessions across machines",
      proof: "A TLA+ model, Kani proofs, and 435 of 435 planted bugs caught by its tests",
      href: "https://github.com/cj-ways/acctswap",
    },
    {
      name: "OrgClone and UserClone",
      text: "clone a whole GitHub org, or all your repos onto a new computer",
      proof: "1,997 npm downloads in the last year",
      href: "https://github.com/cj-ways/orgclone",
    },
  ],
  openSourceNote: "npm counts, Oct 2026: 4,449 across my three packages, bots and CI servers included.",
  stack: [
    { group: "Languages", items: ["TypeScript", "Go", "SQL", "Rust (tools)"] },
    { group: "Backend", items: ["NestJS", "GraphQL", "PostgreSQL", "Redis", "Job queues", "OpenTelemetry"] },
    { group: "Frontend & mobile", items: ["React", "Next.js", "Astro", "Tailwind", "Expo"] },
    { group: "Cloud", items: ["Cloudflare Workers & D1", "Vercel", "Railway", "GitHub Actions"] },
    // No "Evals" until there is eval work to show.
    { group: "AI", items: ["Claude Code", "Codex", "LLM APIs with provider fallback"] },
  ],
};
