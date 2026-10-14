// Home page text, English. DRAFT for the Phase 1 design comparison: Saba approves the final words later.
// All three design directions (/design/a, /design/b, /design/c) render exactly this text,
// so Saba compares looks, not words.
//
// Honesty rules (plan section 7): only true, dated numbers. Bitnet only in public-safe words
// (no internal names, vendors, security details or business numbers beyond bitnet.ge's public counters).
// Never claim "I review every change" for PlayTime.
// Sources for every number: the research notes in private/research/ (not in git), checked 2026-10-13/14.

import { PERSON } from "../lib/site";

export const seo = {
  title: "Saba Janelidze — Senior Full-Stack Engineer · Fintech & AI",
  description:
    "I help software teams that handle money work with AI agents safely, and I build the AI features their product needs. Core engineer of a licensed crypto exchange since 2023.",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "How I work", href: "#how" },
  { label: "Lab", href: "#lab" },
  { label: "About", href: "#about" },
];

export const hero = {
  name: PERSON.name,
  title: "Senior Full-Stack Engineer · Fintech & AI",
  pitch:
    "I help software teams that handle money work with AI agents safely — and I build the AI features their product needs.",
  proof: ["Core engineer of a licensed crypto exchange since 2023", "#1 contributor"],
  cta: { label: "Book a call", href: "#contact" },
  hiring: { label: "For hiring managers", href: "#" },
};

export type ProofFact = {
  org: string;
  value: string;
  label: string;
  detail?: string;
  source: string;
  href: string;
};

export const proof: ProofFact[] = [
  {
    org: "Bitnet",
    value: "219,636",
    label: "registered users",
    detail: "2,524,093 transactions",
    source: "bitnet.ge, Oct 2026",
    href: "https://bitnet.ge",
  },
  {
    org: "Bitnet",
    value: "#1",
    label: "of 28 contributors",
    detail: "across its 6 code repositories",
    source: "git history, Oct 2026",
    href: "#work",
  },
  {
    org: "PlayTime",
    value: "27",
    label: "automatic quality gates",
    detail: "CI jobs that block a failing change",
    source: "Oct 2026",
    href: "#how",
  },
  {
    org: "WasteAway",
    value: "4 hours",
    label: "from plan to live site",
    detail: "109 of 109 commits by an AI agent",
    source: "Oct 2026",
    href: "https://wasteaway.ge",
  },
];

export const offers = {
  heading: "What I do",
  intro: "Three ways I help teams that build products around money.",
  more: { label: "How we could work together", href: "#contact" },
  items: [
    {
      title: "AI-native engineering for teams that handle money",
      text: "I set up coding agents in your repo — rules, safety hooks and CI gates — and train your team, so AI-written code has to pass the same checks as anyone's.",
    },
    {
      title: "AI features in your product",
      text: "An assistant, document search or back-office automation inside your product, with automatic tests of its answers, logs, cost limits and a human confirm before it changes data.",
    },
    {
      title: "Fintech & payment systems",
      text: "Payments, ledgers and webhooks that stay correct when a request arrives twice, plus identity checks and staff admin tools — the work I've done on a licensed exchange since 2023.",
    },
  ],
};

export type PipelineStep = { title: string; text: string; fact: string; factText: string };

export const pipeline = {
  heading: "How I ship with AI agents",
  intro:
    "Agents write most of the code. I design the system, set the rules and own the result. Automatic gates block anything that fails.",
  steps: [
    {
      title: "Plan and rules",
      text: "Every task starts from a written plan and rules files that the agents read before they touch code.",
      fact: "147",
      factText: "entries in a behaviour contract that CI enforces (PlayTime)",
    },
    {
      title: "Agents in separate worktrees",
      text: "Each agent works on its own branch in its own folder, so no two agents edit the same files.",
      fact: "109 / 109",
      factText: "WasteAway commits written by an agent, in about 55 hours",
    },
    {
      title: "CI gates",
      text: "Automatic checks — lint, types, tests, schema drift — block any change that fails.",
      fact: "27",
      factText: "CI jobs in 12 workflows (PlayTime)",
    },
    {
      title: "Verifier agent",
      text: "A separate agent re-checks what the other agents claim before it reaches a plan.",
      fact: "111",
      factText: "claims checked in one audit: 96 confirmed, 12 corrected",
    },
    {
      title: "My approval",
      text: "I make the calls that matter: money, accounts, anything public, and the final push.",
      fact: "11 / 11",
      factText: "WasteAway decisions signed off by me, not by an agent",
    },
    {
      title: "Deploy",
      text: "I push only after the checks pass and I've tried the change myself. Releases go out in small steps.",
      fact: "7",
      factText: "PlayTime features shipped live in 4 days (Oct 2026)",
    },
  ] satisfies PipelineStep[],
};

export type WorkItem = {
  slug: string;
  title: string;
  role: string;
  years?: string;
  text: string;
  note?: string;
  tech: string[];
  image: { src: string; width: number; height: number; alt: string };
  url?: string;
};

// Text from the old site (main:src/lib/i18n.ts, projects[].shortDesc), with three changes the brief asks for:
// Chama is past work without a live link (chama.ge is down); UniHub is "a student portal", never a "pilot".
export const work: { heading: string; big: WorkItem[]; small: WorkItem[] } = {
  heading: "Selected work",
  big: [
    {
      slug: "bitnet",
      title: "Bitnet.ge",
      role: "Crypto exchange · Full-Stack Engineer",
      years: "2023 – now",
      text: "Crypto exchange licensed by the National Bank of Georgia, with 200,000+ registered users. Three years building its production systems.",
      note: "Full case study on request",
      tech: ["Go", "NestJS", "GraphQL", "PostgreSQL", "React"],
      image: { src: "/projects/bitnet.webp", width: 1440, height: 900, alt: "The bitnet.ge home page" },
      url: "https://bitnet.ge",
    },
    {
      slug: "playtime",
      title: "Playtime.ge",
      role: "Sports & entertainment booking · Founder",
      text: "Booking marketplace for sports and entertainment venues in Tbilisi, starting with padel. I build it end-to-end — web, mobile, admin and operations.",
      tech: ["NestJS", "GraphQL", "Next.js", "Expo", "PostgreSQL"],
      image: { src: "/projects/playtime.webp", width: 2704, height: 1452, alt: "The PlayTime landing page" },
      url: "https://playtime.ge",
    },
    {
      slug: "wasteaway",
      title: "WasteAway",
      role: "Waste pickup startup · Founder",
      years: "2026",
      text: "Door-to-door garbage pickup for apartment buildings in Tbilisi. I'm building it from zero — brand, website and operations.",
      tech: ["Astro", "TypeScript", "Cloudflare Workers", "Cloudflare D1"],
      image: { src: "/projects/wasteaway.webp", width: 1440, height: 900, alt: "The wasteaway.ge home page" },
      url: "https://wasteaway.ge",
    },
  ],
  small: [
    {
      slug: "chama",
      title: "Chama",
      role: "Restaurant platform · Backend Lead",
      years: "2024 – 2025 · past work",
      text: "Backend lead on a restaurant platform with live dynamic pricing. I designed the architecture — GraphQL, NestJS, Postgres, Redis.",
      tech: ["NestJS", "GraphQL", "PostgreSQL", "Redis"],
      image: { src: "/projects/chama.webp", width: 1440, height: 900, alt: "The Chama restaurant platform" },
    },
    {
      slug: "unihub",
      title: "UniHub",
      role: "Student portal · Founder",
      text: "A student portal for Agrarian University of Georgia students: schedule, exams, grades and shared lecture notes.",
      tech: ["Next.js", "PostgreSQL", "Chrome extension"],
      image: { src: "/projects/unihub.webp", width: 1440, height: 900, alt: "The UniHub sign-in page" },
    },
  ],
};

export const game = {
  id: "lab",
  kicker: "Coming soon",
  title: "Run a crypto exchange for one day",
  text: "A short game: you run a tiny exchange for a day. Wallets, deposits, identity checks and payments that attackers try to break — and at the end of the day the books must balance.",
  note: "Test network and fake data only. No real money.",
};

export const ask = {
  title: "Ask the work",
  status: "Coming soon",
  text: "Ask a question about my projects and get a short answer with numbered sources from this site. It will always say that the answer comes from an AI.",
  placeholder: "e.g. How do you stop a payment from being charged twice?",
  button: "Ask",
};

export const openSource = {
  heading: "Open source",
  downloads: "4,400+ npm downloads",
  downloadsNote: "across 3 packages; npm also counts bots and CI servers",
  items: [
    {
      name: "Arcana",
      kind: "Skills pack for Claude Code and Codex",
      text: "18 skills and 5 agents for the whole dev cycle — plan, review, test, debug, release — kept in sync for both tools.",
      install: "npm install -g @cj-ways/arcana",
      href: "https://github.com/cj-ways/arcana",
    },
    {
      name: "acctswap",
      kind: "Rust command-line tool",
      text: "A formally verified CLI for Claude Code power users who run many sessions across machines. 435 of 435 mutants caught, a TLA+ model and Kani proofs.",
      install: "cargo install acctswap",
      href: "https://github.com/000Janela000/acctswap",
    },
    {
      name: "OrgClone / UserClone",
      kind: "Go command-line tools",
      text: "Clone every repo of a GitHub org or GitLab group in one command — or all your own repos onto a new computer.",
      install: "npm install -g @cj-ways/orgclone",
      href: "https://github.com/cj-ways/orgclone",
    },
  ],
};

export const about = {
  heading: "About",
  bio: [
    "I'm a full-stack engineer based in Georgia. Since January 2023 I've worked on a licensed crypto exchange: first its customer web app, then its backend, and now its new Go platform and staff admin panel.",
    "On the side I build my own products, PlayTime and WasteAway, with AI agents doing most of the coding. I design the system and set the rules; automatic gates hold the agents to them.",
  ],
  now: {
    label: "Now (October 2026)",
    text: "Building the exchange's new Go platform, rebuilding this site with agents, and taking on a few AI-engineering projects.",
  },
  portraitAlt: "Portrait of Saba Janelidze",
  stack: [
    { group: "Languages", items: ["TypeScript", "Go", "SQL", "Rust (tools)"] },
    { group: "Backend", items: ["NestJS", "GraphQL", "PostgreSQL", "Redis", "Job queues", "OpenTelemetry"] },
    { group: "Frontend & mobile", items: ["React", "Next.js", "Astro", "Tailwind", "Expo"] },
    { group: "Cloud", items: ["Cloudflare Workers & D1", "Vercel", "Railway", "GitHub Actions"] },
    { group: "AI", items: ["Claude Code", "Codex", "LLM APIs with provider fallback", "Evals"] },
  ],
};

export const contact = {
  heading: "Let's talk",
  text: "Tell me what your team is building and where AI or payments slow you down. A 20-minute intro call is the easiest start.",
  book: { label: "Book a call", href: "#contact" },
  bookNote: "The booking page is coming soon. Email works today.",
  email: PERSON.email,
  copy: { idle: "Copy", done: "Copied" },
  links: [
    { label: "LinkedIn", href: PERSON.profiles.linkedin },
    { label: "GitHub", href: PERSON.profiles.github },
  ],
};

export const footer = {
  receipt:
    "Build receipt (placeholder): which checks passed, page weight and how much was AI-written, linked to the real CI run — coming with the CI gates.",
  hiring: { label: "For hiring managers", href: "#" },
  copyright: "© 2026 Saba Janelidze",
  lang: { en: { label: "EN", href: "/" }, ka: { label: "KA", href: "/ka" } },
};
