// Saba's open-source tools, one line each with its proof (the home page's About and /cv).
// Sources: npm downloads in the last year, read 2026-10-19 (api.npmjs.org): Arcana 2,452, OrgClone 1,608,
// UserClone 389 (4,449 across the three; npm also counts bots and CI servers); acctswap: 435 planted bugs caught,
// 0 missed, a TLA+ model of the switching protocol, Kani proofs.
export const openSource = {
  heading: "Open source",
  items: [
    {
      name: "Arcana",
      text: "18 skills and 5 agents for Claude Code and Codex",
      proof: "2,452 npm downloads in the last year",
      href: "https://github.com/cj-ways/arcana",
    },
    {
      name: "acctswap",
      text: "a Rust command-line tool for Claude Code users who run many sessions across machines",
      proof: "A TLA+ model, Kani proofs and 435 of 435 planted bugs caught by its tests",
      href: "https://github.com/cj-ways/acctswap",
    },
    {
      name: "OrgClone and UserClone",
      text: "clone a whole GitHub org, or all your repos onto a new computer",
      proof: "1,997 npm downloads in the last year",
      href: "https://github.com/cj-ways/orgclone",
    },
  ],
  note: "npm counts, Oct 2026: 4,449 across my three packages, bots and CI servers included.",
};
