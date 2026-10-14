// Facts about the site and the person that many pages need.
// Profiles in `sameAs` are ACTIVE profiles only (plan section 6). Add daily.dev after its profile is fixed.

export const SITE_ORIGIN = "https://www.sabajanelidze.com";

export const PERSON = {
  name: "Saba Janelidze",
  nameKa: "საბა ჯანელიძე", // approved string from the old site (main:src/lib/i18n.ts, hero.name.ka)
  jobTitle: "Senior Full-Stack Engineer",
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
 * A ProfilePage whose main entity is the Person, with `sameAs` linking the active profiles.
 */
export function profileJsonLd(opts: { url: string; lang: Lang; description: string }) {
  const personId = `${SITE_ORIGIN}/#person`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: opts.url,
    inLanguage: opts.lang,
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
    },
  };
}
