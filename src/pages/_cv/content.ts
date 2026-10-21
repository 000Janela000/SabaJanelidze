// The /cv text and the PDF made from it. Facts confirmed by Saba (2026-10-15, 2026-10-21).
// Rules: public-safe words only (Bitnet's public facts, high-level areas of work; no internal names, vendors,
// colleagues or engineering-scale counts). No comma before "and". Earlier titles at the exchange are not shown
// until Saba gives them.
import { PERSON } from "../../shared/lib/site";

type Link = { label: string; href: string };
type CvRole = { when: string; title?: string; what: string; points?: string[] };
type CvJob = { org: string; title?: string; kind: string; when: string; roles?: CvRole[]; points?: string[] };

export const cv = {
  name: PERSON.name,
  role: "Principal Engineer · Fintech & AI",
  place: "Tbilisi, Georgia (UTC+4) · Remote",
  email: PERSON.email,
  profileLinks: [
    { label: "LinkedIn", href: PERSON.profiles.linkedin },
    { label: "GitHub", href: PERSON.profiles.github },
  ] satisfies Link[],
  summary:
    "Since January 2023 I've worked on a crypto exchange licensed by the National Bank of Georgia: first its React customer app, then its backend and, since 2026, the architecture of its new Go core platform. I built its identity checks, audit history and payment-provider integration.",
  availability: "Open to new work: a full-time role, a contract, part-time work, a one-off project or a review.",
  pdfLink: { label: "Download CV (PDF)", href: "/saba-janelidze-cv.pdf" },
  jobsHeading: "Work",
  jobs: [
    {
      org: "Bitnet",
      kind: "a crypto exchange licensed by the National Bank of Georgia (220,012 registered users; bitnet.ge, Oct 2026)",
      when: "Jan 2023 – now",
      roles: [
        {
          when: "2026 – now",
          title: "Principal Engineer",
          what: "the new core platform (Go). I lead its architecture.",
          points: [
            "First author of 237 of its 278 architecture decision records (Oct 2026).",
            "Built the new identity checks and the audit history.",
            "Built the payment-provider integration: bank-app deposits, card payments and recurring card charges.",
            "Set the rule that every customer action declares how a repeat is handled; the build fails otherwise (38 of 38 actions, since Sep 2026).",
            "Wrote most of the team's AI coding set-up.",
          ],
        },
        { when: "2024 – 2025", what: "The backend (TypeScript, NestJS, GraphQL) and pages of the staff admin panel." },
        { when: "2023", what: "The customer web app (React)." },
      ],
    },
    {
      org: "Chama",
      title: "Backend Lead (part-time contract, alongside the exchange)",
      kind: "a restaurant platform with live dynamic pricing",
      when: "2024 – 2025",
      points: ["Designed and wrote the backend: NestJS, GraphQL, PostgreSQL, Redis."],
    },
  ] satisfies CvJob[],
  ownHeading: "Own products",
  own: [
    {
      org: "PlayTime",
      title: "Founder",
      kind: "a booking marketplace for sports venues in Tbilisi: 19 padel clubs listed; booking with payment built, payments still in test mode",
      when: "2025 – now",
    },
    {
      org: "WasteAway",
      title: "Founder",
      kind: "door-to-door waste pickup for apartment buildings in Tbilisi: a live website and a worked-out cost model (pre-launch)",
      when: "2026 – now",
    },
    {
      org: "UniHub",
      title: "Founder",
      kind: "a student portal for Agrarian University students: schedule, exams, grades and shared notes (live, on hold since April 2026)",
      when: "2026",
    },
  ] satisfies CvJob[],
  languagesHeading: "Languages",
  languages: "Georgian (native), English (fluent, C1)",
};
