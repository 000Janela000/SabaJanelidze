// "Let's talk": one door for a role or a project (the positioning review, 2026-10-19).
import { PERSON } from "../../../shared/lib/site";
import { emailButton } from "../../../shared/content/intro-email";

export const contact = {
  heading: "Let's talk",
  text: "Tell me what you're building and where you need a senior engineer. Email me and we'll find a time for a short call.",
  email: PERSON.email,
  emailButton,
  copyButton: {
    idle: "Copy",
    done: "Copied",
    label: "Copy email address",
    copied: "Email address copied.",
    failed: "Could not copy. Use the email link.",
  },
  profileLinks: [
    { label: "LinkedIn", href: PERSON.profiles.linkedin },
    { label: "GitHub", href: PERSON.profiles.github },
  ],
};
