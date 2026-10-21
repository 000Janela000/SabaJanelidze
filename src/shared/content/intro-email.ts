// The intro email behind every "Email me" button (the home page and /book): a subject and short prompts.
import { PERSON } from "../lib/site";

export const introEmail = {
  subject: "Intro: [your company]",
  body: "What you're building:\n\nWhere you need help and when:\n\nGood times for a short call (with time zone):\n",
};

export const introEmailHref = () =>
  `mailto:${PERSON.email}?subject=${encodeURIComponent(introEmail.subject)}&body=${encodeURIComponent(introEmail.body)}`;

export const emailButton = { label: "Email me", href: introEmailHref() };
