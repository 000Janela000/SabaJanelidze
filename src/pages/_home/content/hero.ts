// The first screen: his name (the h1), his role, his path in one statement, what he built and the dated path, two actions, the line above the race figure
// and the four numbers. Approved by Saba (2026-10-17; the positioning review of 2026-10-19).
// Rules: only true, dated numbers. No company name on the first screen (the sources may say "bitnet.ge").
// Never claim the review agents catch the figure's exact bug and never call it "load", a "retry" or "paying twice".
// The repeat rule is what the build checks (each action declares how a repeat is handled), never "runs only once".
import { PERSON } from "../../../shared/lib/site";
import { emailButton } from "../../../shared/content/intro-email";

type HeroNumber = {
  value: string;
  label: string;
  /** The phone label (below 640 px). */
  labelShort: string;
  source: string;
  /** A shorter phone source, when the full one would wrap in half a phone screen. */
  sourceShort?: string;
};

export const hero = {
  name: PERSON.name,
  role: "Principal Engineer · Fintech & AI",
  // Each sentence starts on its own line.
  statement: ["I started on a crypto exchange's customer app.", "Today I lead the architecture of its new core."],
  built: "Built by me and live: identity checks, audit history, card and bank payments.",
  path: "Since January 2023 at an exchange licensed by the National Bank of Georgia: the React customer app (2023), the backend (2024–2025), the new Go core platform (2026).",
  emailButton,
  cvLink: { label: "My CV", href: "/cv" },
  figureIntro: "A demo from my lab. AI agents can write this and it can pass tests. My review agents check money code.",
  // Sources: bitnet.ge's public counters (read 2026-10-18); "237 of 278": Saba is first author of 237 of the new
  // platform's 278 architecture decision records (some drafted by an agent under his direction); "38 of 38": his rule
  // since the September 2026 release (details in the private research notes).
  numbers: [
    {
      value: "220,012",
      label: "registered users on the exchange I help build",
      labelShort: "exchange's registered users",
      source: "bitnet.ge, Oct 2026",
    },
    {
      value: "2,574,508",
      label: "transactions on the same exchange",
      labelShort: "exchange's transactions",
      source: "bitnet.ge, Oct 2026",
    },
    {
      value: "237 of 278",
      label: "architecture decision records for its new core platform, first-authored by me",
      labelShort: "architecture decisions I first-authored",
      source: "platform code, Oct 2026",
      sourceShort: "code, Oct 2026",
    },
    {
      value: "38 of 38",
      label: "customer actions that must declare how a repeat is handled, or the build fails",
      labelShort: "customer actions with a build-checked repeat rule",
      source: "my rule, since Sep 2026",
      sourceShort: "since Sep 2026",
    },
  ] satisfies HeroNumber[],
};
