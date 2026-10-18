// Facts about the site and the person that many pages need.
// Profiles in `sameAs` are ACTIVE profiles only (plan section 6). Add daily.dev after its profile is fixed.

export const SITE_ORIGIN = "https://www.sabajanelidze.com";

export const PERSON = {
  name: "Saba Janelidze",
  nameKa: "საბა ჯანელიძე", // approved string from the old site (main:src/lib/i18n.ts, hero.name.ka)
  jobTitle: "Principal Engineer", // official title at Bitnet (Saba, 2026-10-14); hero title decided 2026-10-15
  email: "hello@sabajanelidze.com",
  portrait: "/portrait.webp",
  profiles: {
    linkedin: "https://www.linkedin.com/in/sabajanelidze",
    github: "https://github.com/000Janela000",
    npm: "https://www.npmjs.com/~janela",
  },
} as const;

export type Lang = "en" | "ka";

/** Open Graph locale codes. */
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", ka: "ka_GE" };

/**
 * JSON-LD (structured data that tells Google and AI tools who this page is about).
 * A WebSite (Google's strongest hint for the site name) and a ProfilePage whose main entity is the Person,
 * with `sameAs` linking the active profiles and `knowsAbout` naming the topics the page proves.
 */
export function profileJsonLd(opts: { url: string; lang: Lang; description: string }) {
  const personId = `${SITE_ORIGIN}/#person`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${SITE_ORIGIN}/`,
    name: PERSON.name,
    inLanguage: opts.lang,
    publisher: { "@id": personId },
  };
  const profile = {
    "@type": "ProfilePage",
    url: opts.url,
    inLanguage: opts.lang,
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "Person",
      "@id": personId,
      name: PERSON.name,
      alternateName: PERSON.nameKa,
      jobTitle: PERSON.jobTitle,
      description: opts.description,
      url: `${SITE_ORIGIN}/`,
      image: `${SITE_ORIGIN}${PERSON.portrait}`,
      email: `mailto:${PERSON.email}`,
      sameAs: [PERSON.profiles.linkedin, PERSON.profiles.github, PERSON.profiles.npm],
      knowsAbout: ["AI coding agents", "Fintech", "Payment systems", "Identity verification", "Software architecture"],
    },
  };
  return { "@context": "https://schema.org", "@graph": [website, profile] };
}
