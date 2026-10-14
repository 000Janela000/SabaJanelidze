// Georgian strings that were ALREADY APPROVED on the old site.
// Source: `git show main:src/lib/i18n.ts` (written by a Fable 5.1 subagent with a back-translation, Saba approved).
// Copied word for word. Do NOT write new Georgian here: new Georgian goes through
// ../_shared/playbooks/georgian.md (Fable 5.1 or Gemini + back-translation -> Claude check -> Saba).
//
// Used only by /ka/design/b and /ka in Phase 1, to check Georgian typography.

export const kaApproved = {
  name: "საბა ჯანელიძე", // hero.name
  title: "Senior Full-Stack Engineer", // hero.title (the approved Georgian version is the English words)
  whatIDo: "რას ვაკეთებ", // services.heading
  nav: {
    work: "ნამუშევრები", // nav.work
    about: "ჩემს შესახებ", // nav.about
    contact: "კონტაქტი", // nav.contact
  },
  workWithMe: "ვიმუშაოთ ერთად", // contact.heading
  copyright: "© 2026 საბა ჯანელიძე", // footer.copyright
};

/**
 * Older approved Georgian text, kept ONLY as a typography sample (long words, line breaks at phone width).
 * The wording is from the old site and does not match the new English copy.
 */
export const kaTypographySample = [
  {
    label: "hero.tagline",
    text: "3 წელი ვქმნი ფინტექს — კრიპტო კასტოდი, გაცვლითი APIs, გადახდის სისტემები",
  },
  {
    label: "services.items[0]",
    title: "ფინტექ სისტემები",
    text: "კრიპტო კასტოდი, ბანკის გადახდის სისტემები, უსაფრთხო ავტორიზაცია და კომპლაიანს-aware ინტეგრაციები.",
  },
  {
    label: "services.items[2]",
    title: "Full-Stack პროდუქტები",
    text: "End-to-end — ვები, მობაილი და ადმინ პანელი. TypeScript, React, Next.js, NestJS, Expo.",
  },
  {
    label: "projects.playtime.description",
    text: "PlayTime ადამიანებს ეხმარება თბილისში სპორტისა და გართობის ობიექტების პოვნასა და დაჯავშნაში. დღეს მასზე 19 პადელის კლუბია განთავსებული, ხოლო ონლაინ ჯავშანი გადახდით საბოლოო ტესტირების ეტაპზეა.",
  },
  {
    label: "projects.wasteaway.description",
    text: "WasteAway ნაგავს გააქვს თბილისის კორპუსებიდან. მაცხოვრებლები საღამოს WasteAway-ს ტომარას სართულზე ჩამოკიდებენ, თანამშრომელი კი მას დილამდე წაიღებს.",
  },
];
