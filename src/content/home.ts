// Home page text, English. DRAFT: Saba approves every sentence before launch (publish gate).
// The real home page (/) renders this file (Phase 1c "Calm" design). The Phase 1 directions (/design/a|b|c)
// and the parked notebook explainers (src/components/parked/) still read some older fields; those are
// marked "not on the home page". Visitors of / never see them.
//
// Honesty rules (plan section 7): only true, dated numbers. Bitnet only in public-safe words
// (no internal names, vendors, partners, colleagues, customer data, security details,
// and no business numbers beyond bitnet.ge's public counters).
// Never claim "I review every change" for PlayTime.
// Sources for every number: the research notes in private/research/ (not in git), checked 2026-10-13/15.
// Lines marked "DRAFT (Saba approves)" wait for Saba's OK before launch.

import { PERSON } from "../lib/site";

export const seo = {
  title: "Saba Janelidze — Principal Engineer · Fintech & AI",
  description:
    "I help software teams that handle money work with AI agents safely, and I build the AI features their product needs. Principal Engineer at a licensed crypto exchange.",
};

// The header links. On phones only the ones with phone: true show (no sideways scroll at 320 px).
export const nav = [
  { label: "Work", href: "#work", phone: true },
  { label: "What I do", href: "#services", phone: false },
  { label: "About", href: "#about", phone: false },
  { label: "Contact", href: "#contact", phone: true },
];

/** The main action everywhere on the home page: a plain email link (no booking page yet). */
export const emailCta = { label: "Email me", href: `mailto:${PERSON.email}` };

/** The lab's contact path. /book is an honest "Get in touch" page today; it reads ?from= and keeps it,
 *  so lab links (?from=lab-payments) still work. Later it can forward to a booking calendar. */
const book = (from: string) => `/book?from=${from}`;

export const hero = {
  name: PERSON.name,
  /** The one small line above the pitch. The only place the title appears on the first screen. */
  role: "Principal Engineer, Bitnet",
  pitch:
    "I help software teams that handle money work with AI agents safely — and I build the AI features their product needs.",
  // DRAFT (Saba approves): the one proof sentence under the pitch. Sources: bitnet.ge (licence),
  // Saba's confirmed facts of 2026-10-14/15 (title; what is live), the role history in about.bio.
  proofLine:
    "Since 2023 I've helped build Bitnet, a crypto exchange licensed by the National Bank of Georgia — today I lead the architecture of its new core platform.",
  email: emailCta,
  hiring: { label: "For hiring managers", href: "/cv" },
  // Not on the home page (Phase 1 design pages only):
  kicker: "portfolio · rev. 2026-10",
  title: "Principal Engineer · Fintech & AI",
  proof: [
    "Principal Engineer at Bitnet, a licensed crypto exchange",
    "core engineer since 2023",
    "led the architecture of its new core platform",
  ],
  cta: { label: "Book a call", href: book("home") },
  headerCta: { label: "Book a call", href: book("home-header") },
};

export type HeroNumber = { value: string; label: string; source: string };

// DRAFT (Saba approves): the four numbers on the first screen. All true and dated.
// bitnet.ge public counters, checked 2026-10-14 (re-check on the publish day).
// "27": PlayTime's CI, 27 jobs in 12 workflows that block a failing change (research 2026-10-13, Oct 2026).
// Left out on purpose (both reviews): "#1 of 28 contributors" (reads as vanity), "4 hours" and
// "109 of 109 commits by an AI agent" (reads as weak oversight to a fintech buyer).
export const heroNumbers: HeroNumber[] = [
  { value: "219,755", label: "registered users on Bitnet", source: "bitnet.ge, Oct 2026" },
  { value: "2,537,505", label: "transactions on Bitnet", source: "bitnet.ge, Oct 2026" },
  { value: "Since 2023", label: "building a licensed crypto exchange", source: "Bitnet, Jan 2023 – now" },
  { value: "27", label: "automatic checks that block a failing change", source: "PlayTime, Oct 2026" },
];

// Not on the home page since Phase 1c (parked: src/components/parked/GreenTestsFigure.astro).
// fig. 1 "What green tests miss" (Bitnet story S1, told without internal names), for a case study later.
// DRAFT (Saba approves): every line of this figure and its caption.
export type GreenStep = {
  title: string;
  text: string;
  result: string;
  kind: "neutral" | "pass" | "fail";
  findings?: { what: string; why: string }[];
};

export const greenTests = {
  title: "What green tests miss",
  caption:
    "Before a production release at a licensed exchange, my multi-agent review found two finished compliance features that could never have worked, although every test was green. Fixed the next day; a new test now fails the build on that whole class of bug.",
  fixedTag: "fixed next day",
  steps: [
    { title: "Release candidate", text: "A release, ready to go to production.", result: "ready", kind: "neutral" },
    { title: "All tests green", text: "Every automatic test passes.", result: "✓ green", kind: "pass" },
    {
      title: "Multi-agent review",
      text: "Specialist reviewers each look for one kind of risk. A verifier re-checks their claims.",
      result: "✗ 2 findings",
      kind: "fail",
      findings: [
        { what: "A finished compliance feature can never run", why: "missing permission: no one could ever be given it" },
        { what: "A finished compliance feature can never run", why: "missing seed value: a required database entry was never added" },
      ],
    },
    { title: "Fixed the next day", text: "Both features repaired before the release.", result: "✓ fixed", kind: "pass" },
    {
      title: "New architecture test",
      text: "“Every permission the code checks must exist.” That whole class of bug now fails the build.",
      result: "✓ in the build",
      kind: "pass",
    },
    { title: "Shipped", text: "Released with both features working.", result: "✓ shipped", kind: "pass" },
  ] satisfies GreenStep[],
};

export type ProofFact = {
  org: string;
  value: string;
  label: string;
  detail?: string;
  source: string;
  href: string;
};

// Not on the home page since Phase 1c (the home uses heroNumbers). Phase 1 design pages and the parked ProofTable.
export const proof: ProofFact[] = [
  {
    org: "Bitnet",
    value: "219,755",
    label: "registered users",
    detail: "2,537,505 transactions",
    source: "bitnet.ge, Oct 2026",
    href: "https://bitnet.ge",
  },
  {
    // DRAFT (Saba approves): a contribution rank from git history.
    org: "Bitnet",
    value: "#1",
    label: "of 28 contributors",
    detail: "across its 6 code repositories",
    source: "git history, Oct 2026",
    href: "#work-bitnet",
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
    href: "#work-wasteaway",
  },
];

export const offers = {
  heading: "What I do",
  intro: "Three ways I help teams that build products around money.",
  // Not on the home page (Phase 1 design pages only):
  more: { label: "Book a call to talk it through", href: book("home-offers") },
  items: [
    {
      title: "AI-native engineering for teams that handle money",
      text: "I set up coding agents in your repo with rules, safety hooks and automatic checks, and train your team to use them.",
    },
    {
      title: "AI features in your product",
      text: "An assistant, document search or back-office automation, with tested answers, logs, cost limits and a human confirm before it changes data.",
    },
    {
      title: "Fintech & payment systems",
      text: "Payments, ledgers, identity checks and staff tools that stay correct even when a request arrives twice.",
    },
  ],
};

export type MethodStep = { title: string; text: string };

// The one static method diagram on the home page (the stepped pipeline moved off the home page).
// DRAFT (Saba approves). General words on purpose: a method, not a claim about any one company's code.
export const method = {
  heading: "How I work with AI agents",
  intro: "Agents write much of the code. The rules, the checks and the final yes stay with people.",
  steps: [
    { title: "Plan and rules", text: "Every task starts from a written plan and the team's rules, which the agents read first." },
    { title: "Agents write the code", text: "Each agent works on one task, on its own branch." },
    { title: "Automatic checks", text: "Lint, types, tests and schema checks block anything that fails." },
    { title: "Independent review", text: "Separate reviewers look at the risky parts: money, permissions, data." },
    { title: "A person approves", text: "Money, accounts and anything public need a human yes before release." },
  ] satisfies MethodStep[],
  loop: "When a new kind of bug gets through, it becomes a new automatic check, so it cannot come back.",
};


// Not on the home page since Phase 1c (parked: src/components/parked/RunsOnceFigure.astro).
// fig. 2 "runs once" told as a system rule (Bitnet Go story 2).
// DRAFT (Saba approves): the text, the figure and the caption.
export const runsOnce = {
  kicker: "§1.3 in practice",
  title: "Every customer action runs once",
  text: [
    "On a phone network a request can arrive twice: a double tap, a retry, an old browser tab. In finance a repeated request can mean a repeated payment.",
    "At the exchange I made “runs once” a rule of the system, not a habit. Every customer action must answer two questions before it can be built: what stops a second run, and what does a repeat get back? Each request carries a ticket (an idempotency key). A repeat gets the first answer back. If the result is truly unknown, the customer is told so, instead of being invited to try again.",
  ],
  caption:
    "The build refuses any customer action that has not declared how a repeat is handled, so the rule cannot quietly slip.",
};

// Not on the home page since Phase 1c (parked: HowIShip.astro; Pipeline.astro is also used by /design/a and /design/b).
export type PipelineStep = { title: string; text: string; fact: string; factText: string };

export const pipeline = {
  heading: "How I ship with AI agents",
  intro:
    "Agents write most of the code. I design the system, set the rules and own the result. Automatic gates block anything that fails.",
  caption: "How a change gets from idea to production. Every number comes from my own projects.",
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
  /** One line: what came out of it. */
  outcome: string;
  text: string;
  note?: string;
  /** 2 or 3 short tags (Phase 1 design pages only; the calm cards show no tags). */
  tags: string[];
  tech: string[];
  /** taken: when the screenshot was made (public pages change; the date keeps it honest).
   *  Small cards (Chama, UniHub) show no image on the home page. */
  image: { src: string; width: number; height: number; alt: string; taken?: string };
  url?: string;
};

// Chama is past work without a live link (chama.ge is down); UniHub is "a student portal", never a "pilot".
export const work: { heading: string; intro: string; big: WorkItem[]; small: WorkItem[] } = {
  heading: "Selected work",
  intro: "A licensed crypto exchange I help build, and products of my own.", // not shown on the home page (shorter on phones)
  big: [
    {
      slug: "bitnet",
      title: "Bitnet.ge",
      role: "Crypto exchange · Principal Engineer",
      years: "2023 – now",
      // DRAFT (Saba approves): outcome first. What is live: confirmed by Saba on 2026-10-15.
      outcome:
        "Live today: the new identity checks, card and bank-app payments, and a rule that every customer action runs only once, even after a double tap.",
      // The role history is in the hero proof line and in About, so the card does not repeat it.
      text: "A crypto exchange licensed by the National Bank of Georgia.",
      note: "Full case study on request",
      tags: ["Fintech", "Identity checks", "Go"],
      tech: ["Go", "NestJS", "GraphQL", "PostgreSQL", "React"],
      image: { src: "/projects/bitnet.webp", width: 1440, height: 900, alt: "The bitnet.ge home page", taken: "13 Oct 2026" },
      url: "https://bitnet.ge",
    },
    {
      slug: "playtime",
      title: "Playtime.ge",
      role: "Sports & entertainment booking · Founder",
      outcome: "19 padel clubs in Tbilisi listed; online booking with payment is in final testing.",
      text: "A booking marketplace for sports venues. AI agents write most of the code; 27 automatic checks block any failing change.",
      tags: ["Marketplace", "AI agents", "Web + mobile"],
      tech: ["NestJS", "GraphQL", "Next.js", "Expo", "PostgreSQL"],
      // New screenshot of the live site, 2026-10-15 (the old one showed numbers that were not true).
      image: { src: "/projects/playtime.webp", width: 1440, height: 900, alt: "The playtime.ge home page", taken: "15 Oct 2026" },
      url: "https://playtime.ge",
    },
    {
      slug: "wasteaway",
      title: "WasteAway",
      role: "Waste pickup startup · Founder",
      years: "2026",
      // DRAFT (Saba approves). Source: WasteAway's own status notes (Oct 2026).
      outcome: "A live website and a worked-out cost model, ready for the first pilot building.",
      text: "Door-to-door garbage pickup for apartment buildings in Tbilisi. I'm building it from zero — brand, website and operations.",
      tags: ["Startup", "AI agents", "Cloudflare"],
      tech: ["Astro", "TypeScript", "Cloudflare Workers", "Cloudflare D1"],
      image: { src: "/projects/wasteaway.webp", width: 1440, height: 900, alt: "The wasteaway.ge home page", taken: "13 Oct 2026" },
      url: "https://wasteaway.ge",
    },
  ],
  small: [
    {
      slug: "chama",
      title: "Chama",
      role: "Restaurant platform · Backend Lead",
      years: "2024 – 2025 · past work",
      outcome: "Designed the backend for live dynamic pricing.",
      text: "Backend lead on a restaurant platform with live dynamic pricing. I designed the architecture — GraphQL, NestJS, Postgres, Redis.",
      tags: ["Backend lead", "NestJS", "Redis"],
      tech: ["NestJS", "GraphQL", "PostgreSQL", "Redis"],
      image: { src: "/projects/chama.webp", width: 1440, height: 900, alt: "The Chama restaurant platform" },
    },
    {
      slug: "unihub",
      title: "UniHub",
      role: "Student portal · Founder",
      outcome: "Schedule, exams, grades and shared lecture notes in one place.",
      text: "A student portal for Agrarian University of Georgia students: schedule, exams, grades and shared lecture notes.",
      tags: ["Next.js", "Chrome extension"],
      tech: ["Next.js", "PostgreSQL", "Chrome extension"],
      image: { src: "/projects/unihub.webp", width: 1440, height: 900, alt: "The UniHub sign-in page" },
    },
  ],
};

// Not on the home page since Phase 1c (hidden until the game is deployed). Parked: Lab.astro.
// Game teaser: the lab session's game (design v2 of 2026-10-14; working title), its payments incident.
// DRAFT (Saba approves): the headline and the support line. Numbers from the lab session (2026-10-15):
// the naive code pays out 160 while the balance still shows 20; 36 of the 54 possible orders lose money.
export const game = {
  id: "lab",
  kicker: "Coming soon",
  question: "Can you find how this exchange paid out 160 from 100?",
  title: "On call: one day at a tiny crypto exchange",
  text: "Two withdrawals of 80 from a balance of 100: of the 54 ways they can run, 36 lose money.",
  context: "A short game where you are the on-call engineer. Find the bug, fix it, then see the defence I use in production.",
  link: { label: "lab.sabajanelidze.com/day/payments", href: "https://lab.sabajanelidze.com/day/payments" },
  note: "Test network and fake data only. No real money.",
};

// Not on the home page since Phase 1c (hidden until it works). Parked: Lab.astro.
export const ask = {
  title: "Ask the work",
  status: "Coming soon",
  text: "Ask a question about my projects and get a short answer with numbered sources from this site. It will always say that the answer comes from an AI.",
  placeholder: "e.g. How do you stop a double charge?",
  button: "Ask",
};

// Not on the home page since Phase 1c (about.openSource has the short version). Parked: OpenSource.astro.
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
    // DRAFT (Saba approves): the Bitnet role history.
    "I'm a Principal Engineer based in Georgia. Since January 2023 I've worked on Bitnet, a licensed crypto exchange: first its customer web app, then its backend, and now its new core platform, whose architecture I lead.",
    "On the side I build my own products, PlayTime and WasteAway, with AI agents doing most of the coding.",
  ],
  /** Short rows under the bio (the home page). */
  facts: [{ label: "Stack", text: "Go, TypeScript, NestJS, GraphQL, PostgreSQL, Redis, React, Next.js, Astro, Cloudflare" }],
  openSource: {
    label: "Open source",
    items: [
      { name: "Arcana", text: "skills for Claude Code and Codex", href: "https://github.com/cj-ways/arcana" },
      { name: "acctswap", text: "a formally verified Rust tool", href: "https://github.com/000Janela000/acctswap" },
      { name: "OrgClone", text: "clone a whole GitHub org", href: "https://github.com/cj-ways/orgclone" },
    ],
  },
  portraitAlt: "Portrait of Saba Janelidze",
  // Not on the home page (Phase 1 design pages only):
  now: {
    label: "Now (October 2026)",
    text: "Building the exchange's new core platform, rebuilding this site with agents, and taking on a few AI-engineering projects.",
  },
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
  text: "Tell me what your team is building and where AI or payments slow you down. A short intro call is the easiest start: email me and we'll find a time.",
  email: PERSON.email,
  cta: emailCta,
  copy: { idle: "Copy", done: "Copied" },
  links: [
    { label: "LinkedIn", href: PERSON.profiles.linkedin },
    { label: "GitHub", href: PERSON.profiles.github },
  ],
  // Not on the home page (Phase 1 design pages only):
  book: { label: "Book a call", href: book("home-contact") },
  bookNote: "The booking page is coming soon. Email works today.",
};


export const footer = {
  hiring: { label: "For hiring managers", href: "/cv" },
  copyright: "© 2026 Saba Janelidze",
  theme: { label: "Theme", options: { light: "Light", dark: "Dark", auto: "Auto" } },
  /** The KA link stays hidden until /ka has the real Georgian page (Phase 3); today /ka is a placeholder. */
  showLang: false,
  lang: { en: { label: "EN", href: "/" }, ka: { label: "KA", href: "/ka" } },
  // Not on the site (Phase 1 design pages only): a placeholder, hidden until the CI gates exist.
  receipt:
    "Build receipt (placeholder): which checks passed, page weight and how much was AI-written, linked to the real CI run — coming with the CI gates.",
};

