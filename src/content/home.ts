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
// "CV" is the quiet recruiter route (Phase 1d fix 11). Phase 1f: it shows on phones too (Saba, 2026-10-15).
export const nav = [
  { label: "Work", href: "#work", phone: true },
  { label: "What I do", href: "#services", phone: false },
  { label: "About", href: "#about", phone: false },
  { label: "Contact", href: "#contact", phone: true },
  { label: "CV", href: "/cv", phone: true },
];

/** The main action everywhere on the home page: a plain email link (no booking page yet).
 *  DRAFT (Saba approves): the label says what the email is for (Phase 1d fix 11). */
export const emailCta = { label: "Email me about your team", href: `mailto:${PERSON.email}` };

/** The lab's contact path. /book is an honest "Get in touch" page today; it reads ?from= and keeps it,
 *  so lab links (?from=lab-payments) still work. Later it can forward to a booking calendar. */
const book = (from: string) => `/book?from=${from}`;

export const hero = {
  name: PERSON.name,
  /** The one small line above the headline. The only place the title appears on the first screen.
   *  Phase 1f: no company name on the first screen (Saba, 2026-10-15: "don't highlight Bitnet that much"). */
  role: "Principal Engineer · Fintech & AI",
  // Phase 1f (Saba chose this on 2026-10-15): a short headline as the h1, the rest of the pitch in the subline.
  headline: "AI agents for teams that move money, without losing a payment.",
  subline: "I help fintech teams work with AI agents safely, and I build the AI features their product needs.",
  /** The full one-sentence pitch (the design pages /design/a|b|c and the page description still use it). */
  pitch:
    "I help software teams that handle money work with AI agents safely — and I build the AI features their product needs.",
  // DRAFT (Saba approves): the one proof sentence under the pitch. Sources: bitnet.ge (licence),
  // Saba's confirmed facts of 2026-10-14/15 (title; what is live), the role history in about.bio.
  proofLine:
    "Since 2023 I've helped build a crypto exchange licensed by the National Bank of Georgia. Today I lead the architecture of its new core platform.",
  email: emailCta,
  // DRAFT (Saba approves): the quiet recruiter route next to the main button.
  hiring: { label: "Hiring? See my CV", href: "/cv" },
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

/** label: the full label (from 640 px); short: the phone label, so the four source lines line up in the 2 x 2 grid. */
export type HeroNumber = { value: string; label: string; short: string; source: string };

// DRAFT (Saba approves): the four numbers under the hero (Phase 1e: two for the company's scale, two for Saba's
// own part). All true and dated. Phase 1f: the labels don't name the company; the source lines keep "bitnet.ge"
// so a reader can check the numbers (Saba, 2026-10-15). Sources: bitnet.ge's public counters (read 2026-10-15; re-check on the publish day)
// and the private research notes of 2026-10-14 (private/research/, not in git). "38 of 38": every customer action
// must declare how a repeat is handled, or the build fails; Saba's rule, live since the September 2026 release.
// The label says "checks for repeat safety", not "runs once", on purpose.
// Left out on purpose: "Since 2023" (repeats the proof sentence), PlayTime's "27" (a side project),
// "#1 of 28 contributors" (vanity), "4 hours" and "109 of 109 commits by an AI agent" (weak oversight to a buyer).
export const heroNumbers: HeroNumber[] = [
  { value: "219,764", label: "registered users on the exchange I help build", short: "registered users", source: "bitnet.ge, Oct 2026" },
  { value: "2,538,923", label: "transactions on the same exchange", short: "transactions", source: "bitnet.ge, Oct 2026" },
  {
    value: "237 of 278",
    label: "architecture decisions for its new core platform, written up by me",
    short: "architecture decisions by me",
    source: "platform code, Oct 2026",
  },
  {
    value: "38 of 38",
    label: "customer actions the build checks for repeat safety, under a rule I wrote",
    short: "actions checked for repeats",
    source: "live since Sep 2026",
  },
];

// The hero's right side: the payment-race figure (components/home/HeroRace.astro) is the lab session's shared
// element <race-figure> 1.0.0, vendored in src/vendor/race-figure/. Its texts live in that package, not here.
// DRAFT (Saba approves, publish gate): every text inside the figure (title for screen readers, the four step names,
// "paid 80" / "refused", "Balance", "Paid out", "Exchange short", the caption "Order 11 of 54. Both passed the check.
// Balance 20, paid out 160.", "Run another order", "Pause" / "Play", "Reproduce it yourself →" and the note "Each run is a
// recorded trace of the game's real code, checked by a test on every build."). Changes go to the lab session.

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
  // proof: one line per offer that points at the evidence (Phase 1d fix 7). DRAFT (Saba approves).
  // Sources: the private research notes (private/research/, not in git) and Saba's confirmed facts of 2026-10-15.
  // Offer 1: tooling counts only (no module names, no claim that any Bitnet area was built by agents).
  // Offer 2: the thinnest proof; DevNews's live site is down, so the link goes to its public code.
  items: [
    {
      title: "AI-native engineering for teams that handle money",
      text: "I set up coding agents in your repo with rules, safety hooks and automatic checks, and train your team to use them.",
      proof: "I wrote most of a fintech team's agent set-up: 21 skills, 6 specialist agents, 13 safety hooks.",
      link: { label: "How I work", href: "#how", dir: "down" },
    },
    {
      title: "AI features in your product",
      text: "An assistant, document search or back-office automation, with tested answers, logs, cost limits and a human confirm before it changes data.",
      proof: "DevNews, my open-source AI news reader: summaries from three AI providers, with a fallback when one fails.",
      link: { label: "Code on GitHub", href: "https://github.com/000Janela000/DevNews", dir: "out" },
    },
    {
      title: "Fintech & payment systems",
      text: "Payments, ledgers, identity checks and staff tools that stay correct even when a request arrives twice.",
      proof: "Live on the exchange I help build: the payment-provider integration I built, with bank-app deposits, card payments and recurring card charges.",
      link: { label: "The work", href: "#work-bitnet", dir: "down" },
    },
  ],
};

/** fact: one static, sourced fact under the step (Phase 1d fix 6); source: where and when, in the small monospace. */
export type MethodStep = { title: string; text: string; fact: string; source: string };

// The one static method diagram on the home page (the stepped pipeline moved off the home page).
// DRAFT (Saba approves). General words on purpose: a method, not a claim about any one company's code.
// Facts: AI proof inventory (research 2026-10-13), public-safe counts only. Never "109 of 109 commits by an agent".
// - 147: PlayTime's behaviour contract, CL-001 to CL-147; CI fails a tracked change without a contract entry.
// - 7 in 4 days: PlayTime CL-140 to CL-147, shipped live 2026-10-05 to 10-08.
// - 27 / 12: PlayTime's CI, 27 jobs in 12 workflow files.
// - 111 / 12: a verifier agent checked 111 claims of other agents in one audit: 96 confirmed, 12 corrected
//   (a fintech team's method; told without the company's name).
// - 11 of 11: WasteAway's decision table, every decision "decided_by: founder".
export const method = {
  heading: "How I work with AI agents",
  intro: "Agents write much of the code. The rules, the checks and the final yes stay with people.",
  steps: [
    {
      title: "Plan and rules",
      text: "Every task starts from a written plan and the team's rules, which the agents read first.",
      fact: "147 entries in a behaviour contract that the build checks",
      source: "PlayTime, Oct 2026",
    },
    {
      title: "Agents write the code",
      text: "Each agent works on one task, on its own branch.",
      fact: "7 features shipped live in 4 days",
      source: "PlayTime, Oct 2026",
    },
    {
      title: "Automatic checks",
      text: "Lint, types, tests and schema checks block anything that fails.",
      fact: "27 automatic checks in 12 pipelines",
      source: "PlayTime, Oct 2026",
    },
    {
      title: "Independent review",
      text: "Separate reviewers look at the risky parts: money, permissions, data.",
      fact: "111 agent claims re-checked in one audit; 12 corrected",
      source: "fintech team, 2026",
    },
    {
      title: "A person approves",
      text: "Money, accounts and anything public need a human yes before release.",
      fact: "11 of 11 launch decisions signed off by me, not an agent",
      source: "WasteAway, Oct 2026",
    },
  ] satisfies MethodStep[],
  // A bounded claim (Phase 1d fix 3): a regulated buyer distrusts "so it cannot come back".
  loop: "When a new kind of bug gets through, I turn it into a new automatic check. The new check blocks that failure path.",
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
  /** The home page's link for "more" (Bitnet: the case study by email until /work/bitnet exists). */
  more?: { label: string; href: string };
  /** The real stage today, shown as a small tag on the home page's small cards (Phase 1d fix 4). */
  stage?: string;
  /** 2 or 3 short tags (Phase 1 design pages only; the calm cards show no tags). */
  tags: string[];
  tech: string[];
  /** taken: when the screenshot was made (public pages change; the date keeps it honest).
   *  caption: the dated line under the image on the home page (the big Bitnet card).
   *  thumb: a small copy (288 x 180) that the small card shows beside its title (PlayTime and WasteAway, English pages). */
  image: { src: string; width: number; height: number; alt: string; taken?: string; caption?: string; thumb?: string };
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
      // DRAFT (Saba approves). A mailto until the /work/bitnet case study exists (Phase 1d fix 9).
      more: { label: "Ask me for the full case study", href: `mailto:${PERSON.email}?subject=${encodeURIComponent("Bitnet case study")}` },
      tags: ["Fintech", "Identity checks", "Go"],
      tech: ["Go", "NestJS", "GraphQL", "PostgreSQL", "React"],
      // Retaken on 2026-10-15 and cropped above the counter strip, so it can never disagree with the numbers row
      // (Phase 1d fix 1; the 13 Oct shot showed 219 636 / 2 524 093). Today an app banner covers that strip anyway.
      image: {
        src: "/projects/bitnet.webp",
        width: 1440,
        height: 756,
        alt: "The bitnet.ge home page in English, with the Bitnet app on a phone",
        taken: "15 Oct 2026",
        caption: "bitnet.ge home page, English, Oct 2026",
      },
      url: "https://bitnet.ge",
    },
    {
      slug: "playtime",
      // DRAFT (Saba approves). Source: playtime/STATUS.md (listings public since 2026-10-07; payment in test mode).
      stage: "Live listings · booking in testing",
      years: "2025 – now",
      title: "Playtime.ge",
      role: "Sports & entertainment booking · Founder",
      outcome: "19 padel clubs in Tbilisi listed; online booking with payment is in final testing.",
      text: "A booking marketplace for sports venues. AI agents write most of the code; 27 automatic checks block any failing change.",
      tags: ["Marketplace", "AI agents", "Web + mobile"],
      tech: ["NestJS", "GraphQL", "Next.js", "Expo", "PostgreSQL"],
      // New screenshot of the live site, 2026-10-15 (the old one showed numbers that were not true).
      image: { src: "/projects/playtime.webp", width: 1440, height: 900, alt: "The playtime.ge home page", taken: "15 Oct 2026", thumb: "/projects/playtime-thumb.webp" },
      url: "https://playtime.ge",
    },
    {
      slug: "wasteaway",
      stage: "Pre-launch · website live",
      title: "WasteAway",
      role: "Waste pickup startup · Founder",
      years: "2026",
      // DRAFT (Saba approves). Source: WasteAway's own status notes (Oct 2026).
      outcome: "A live website and a worked-out cost model, ready for the first pilot building.",
      text: "Door-to-door garbage pickup for apartment buildings in Tbilisi. I'm building it from zero — brand, website and operations.",
      tags: ["Startup", "AI agents", "Cloudflare"],
      tech: ["Astro", "TypeScript", "Cloudflare Workers", "Cloudflare D1"],
      // Retaken in English on 2026-10-15 (Phase 1f).
      image: { src: "/projects/wasteaway.webp", width: 1440, height: 900, alt: "The wasteaway.ge home page in English", taken: "15 Oct 2026", thumb: "/projects/wasteaway-thumb.webp" },
      url: "https://wasteaway.ge",
    },
  ],
  small: [
    {
      slug: "chama",
      stage: "Past work",
      title: "Chama",
      role: "Restaurant platform · Backend Lead",
      years: "2024 – 2025",
      outcome: "Designed the backend for live dynamic pricing.",
      text: "Backend lead on a restaurant platform with live dynamic pricing. I designed the architecture — GraphQL, NestJS, Postgres, Redis.",
      tags: ["Backend lead", "NestJS", "Redis"],
      tech: ["NestJS", "GraphQL", "PostgreSQL", "Redis"],
      image: { src: "/projects/chama.webp", width: 1440, height: 900, alt: "The Chama restaurant platform" },
    },
    {
      slug: "unihub",
      // UniHub is live but dormant since April 2026 (UniHub/STATUS.md).
      stage: "Live · on hold",
      years: "2026",
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
    // DRAFT (Saba approves): the role history. Phase 1f: no company name here; the work card names it.
    "I'm a Principal Engineer based in Georgia. Since January 2023 I've worked on a licensed crypto exchange: first its customer web app, then its backend, and now its new core platform, whose architecture I lead.",
    "On the side I build my own products, PlayTime and WasteAway, with AI agents doing most of the coding.",
  ],
  /** Short rows under the bio (Phase 1 design pages; the home page shows the grouped stack below instead). */
  facts: [{ label: "Stack", text: "Go, TypeScript, NestJS, GraphQL, PostgreSQL, Redis, React, Next.js, Astro, Cloudflare" }],
  // One line per tool with its proof number (Phase 1d fix 8). DRAFT (Saba approves).
  // Numbers: material inventory (research 2026-10-13, section 16): npm downloads in the last year, Arcana 2,420,
  // OrgClone 1,596, UserClone 386 (4,402 across the three); acctswap: 435 mutants caught, 0 missed, a TLA+ model of
  // the switching protocol, Kani proofs. npm also counts bots and CI servers, so the note says so.
  openSource: {
    label: "Open source",
    items: [
      {
        name: "Arcana",
        text: "18 skills and 5 agents for Claude Code and Codex",
        proof: "2,400+ npm downloads in a year",
        href: "https://github.com/cj-ways/arcana",
      },
      {
        name: "acctswap",
        text: "a Rust tool that switches Claude accounts across sessions",
        proof: "TLA+ model, Kani proofs, 435 of 435 mutants caught",
        href: "https://github.com/000Janela000/acctswap",
      },
      {
        name: "OrgClone and UserClone",
        text: "clone a whole GitHub org, or all your repos onto a new computer",
        proof: "1,900+ npm downloads in a year",
        href: "https://github.com/cj-ways/orgclone",
      },
    ],
    note: "npm counts, Oct 2026: 4,400+ across my three packages, bots and CI servers included.",
  },
  portraitAlt: "Portrait of Saba Janelidze",
  // Not on the home page (Phase 1 design pages only):
  now: {
    label: "Now (October 2026)",
    text: "Building the exchange's new core platform, rebuilding this site with agents, and taking on a few AI-engineering projects.",
  },
  /** The stack, grouped (the home page's About since Phase 1e, fix 8; also the Phase 1 design pages). */
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

