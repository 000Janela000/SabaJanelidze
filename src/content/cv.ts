// /cv text, English. Approved by Saba on 2026-10-17 (text review).
// A real, dated role list (Phase 1d fix 12); the PDF comes on request. Public-safe words only:
// Bitnet's public facts, high-level areas of work, no internal names, vendors, colleagues or engineering-scale counts.
// Sources: the private research notes of 2026-10-13/14 (private/research/, not in git), Saba's confirmed facts of
// 2026-10-15 (title "Principal Engineer"; what is live), and the projects' own STATUS.md files.

import { PERSON } from "../lib/site";

export type CvRole = { when: string; what: string; points?: string[] };
export type CvJob = { org: string; kind: string; title: string; when: string; roles?: CvRole[]; points?: string[] };

export const cv = {
  title: "CV",
  lead: "Principal Engineer in Georgia. I build money systems that stay correct, and I help teams work with AI agents safely.",
  pdf: { label: "Ask for this CV as a PDF", href: `mailto:${PERSON.email}?subject=${encodeURIComponent("CV request")}` },
  linkedin: { label: "LinkedIn", href: PERSON.profiles.linkedin },
  jobsHeading: "Work",
  jobs: [
    {
      org: "Bitnet",
      kind: "a crypto exchange licensed by the National Bank of Georgia",
      // "Now": the principal-engineer role is the new Go platform's (2026); in 2023 he started on the customer web app.
      title: "Now Principal Engineer",
      when: "Jan 2023 – now",
      roles: [
        {
          when: "2026 – now",
          what: "The new core platform (Go): I lead its architecture.",
          points: [
            "Built the new identity checks, the audit history, and the rule that every customer action declares how a repeat is handled.",
            "Built the payment-provider integration: bank-app deposits, card payments and recurring card charges.",
            "Wrote most of the architecture decision records, and most of the team's AI coding set-up.",
          ],
        },
        { when: "2024 – 2025", what: "The backend (TypeScript, NestJS, GraphQL), and pages of the staff admin panel." },
        { when: "2023", what: "The customer web app (React)." },
      ],
    },
    {
      org: "Chama",
      kind: "a restaurant platform with live dynamic pricing",
      title: "Backend Lead",
      when: "2024 – 2025",
      points: ["Designed and wrote the backend: NestJS, GraphQL, PostgreSQL, Redis."],
    },
  ] satisfies CvJob[],
  ownHeading: "My own products",
  own: [
    { org: "PlayTime", kind: "a booking marketplace for sports venues in Tbilisi", title: "Founder", when: "2025 – now" },
    { org: "WasteAway", kind: "door-to-door waste pickup for apartment buildings in Tbilisi (pre-launch)", title: "Founder", when: "2026 – now" },
    { org: "UniHub", kind: "a student portal for Agrarian University students (live, on hold since April 2026)", title: "Founder", when: "2026" },
  ] satisfies CvJob[],
  openHeading: "Open source",
  open: "Arcana (skills for Claude Code and Codex), acctswap (a Rust tool with a TLA+ model and Kani proofs), OrgClone and UserClone.",
  stackHeading: "Stack",
  stack: "Go, TypeScript, NestJS, GraphQL, PostgreSQL, Redis, React, Next.js, Astro, Cloudflare.",
};
