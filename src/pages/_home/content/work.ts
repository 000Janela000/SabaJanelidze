// Selected work: the big Bitnet card, then four small text cards. What is live: confirmed by Saba (2026-10-15).
// Rules: Bitnet only in public-safe words (no internal names, vendors or security details). Never claim
// "I review every change" for PlayTime. Chama has no live link (chama.ge is down); UniHub is "a student portal".
import { PERSON } from "../../../shared/lib/site";

type Link = { label: string; href: string };

type LeadCard = {
  slug: string;
  title: string;
  role: string;
  years: string;
  outcome: string;
  text: string;
  moreLink: Link;
  /** The screenshot and the dated line under it. */
  image: { src: string; width: number; height: number; alt: string; caption: string };
  url: string;
};

type Card = {
  slug: string;
  title: string;
  role: string;
  years: string;
  /** The real stage today, as a small tag. */
  stage: string;
  outcome: string;
  url?: string;
};

export const work = {
  heading: "Selected work",
  lead: {
    slug: "bitnet",
    title: "Bitnet.ge",
    role: "Crypto exchange · Principal Engineer since 2026",
    years: "2022 – now",
    outcome: "I lead the architecture of the new core platform (Go) and first-authored 237 of its 278 architecture decision records.",
    text: "A crypto exchange licensed by the National Bank of Georgia. Built by me and live: the new identity checks, the audit history and the payment-provider integration (bank-app deposits, card payments, recurring card charges). One rule I set: every customer action declares how a repeat request is handled and the build checks it.",
    // A mailto until a written case study exists.
    moreLink: { label: "Ask me how it was built", href: `mailto:${PERSON.email}?subject=${encodeURIComponent("How the Bitnet work was built")}` },
    // Taken 2026-10-15, cropped above the counter strip so it can never disagree with the numbers row.
    image: {
      src: "/projects/bitnet.webp",
      width: 1440,
      height: 756,
      alt: "The bitnet.ge home page in English, with the Bitnet app on a phone",
      caption: "bitnet.ge home page, English, Oct 2026",
    },
    url: "https://bitnet.ge",
  } satisfies LeadCard,
  cards: [
    {
      slug: "playtime",
      title: "Playtime.ge",
      role: "Sports & entertainment booking · Founder",
      years: "2025 – now",
      stage: "Live listings · booking built",
      outcome: "19 padel clubs in Tbilisi listed publicly. Booking with payment is built; payments are still in test mode.",
      url: "https://playtime.ge",
    },
    {
      slug: "wasteaway",
      title: "WasteAway",
      role: "Waste pickup startup · Founder",
      years: "2026",
      stage: "Pre-launch · website live",
      outcome: "A live website and a worked-out cost model. Next: the first pilot building.",
      url: "https://wasteaway.ge",
    },
    {
      slug: "chama",
      title: "Chama",
      role: "Restaurant platform · Backend Lead",
      years: "2024 – 2025",
      stage: "Past work",
      outcome: "Designed and wrote the backend for live dynamic pricing.",
    },
    {
      slug: "unihub",
      title: "UniHub",
      role: "Student portal · Founder",
      years: "2026",
      stage: "Live · on hold",
      outcome: "Schedule, exams, grades and shared lecture notes in one place.",
    },
  ] satisfies Card[],
};
