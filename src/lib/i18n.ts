export type Locale = 'ka' | 'en'

export const translations = {
  nav: {
    work: { ka: 'ნამუშევრები', en: 'Work' },
    services: { ka: 'სერვისები', en: 'Services' },
    about: { ka: 'ჩემს შესახებ', en: 'About' },
    contact: { ka: 'კონტაქტი', en: 'Contact' },
  },
  hero: {
    name: { ka: 'საბა ჯანელიძე', en: 'Saba Janelidze' },
    title: { ka: 'Senior Full-Stack Engineer', en: 'Senior Full-Stack Engineer' },
    tagline: {
      ka: '3 წელი ვქმნი ფინტექს — კრიპტო კასტოდი, გაცვლითი APIs, გადახდის სისტემები',
      en: '3 years shipping fintech — crypto custody, exchange APIs, payment systems',
    },
    scroll: { ka: 'გადაახვიეთ', en: 'Scroll' },
  },
  work: {
    heading: { ka: 'არჩეული ნამუშევრები', en: 'Selected Work' },
    viewProject: { ka: 'ნახვა', en: 'View Project' },
  },
  services: {
    heading: { ka: 'რას ვაკეთებ', en: 'What I Do' },
    items: [
      {
        title: { ka: 'ფინტექ სისტემები', en: 'Fintech Systems' },
        description: {
          ka: 'კრიპტო კასტოდი, ბანკის გადახდის სისტემები, უსაფრთხო ავტორიზაცია და კომპლაიანს-aware ინტეგრაციები.',
          en: 'Crypto custody, bank payment rails, high-security auth and compliance-aware integrations.',
        },
      },
      {
        title: { ka: 'იქსჩეინჯი & ტრეიდინგი', en: 'Exchange & Trading' },
        description: {
          ka: 'იქსჩეინჯის API ინტეგრაციები, ლიკვიდაციის ძრავები და მაღალი მოცულობის ტრეიდინგ სისტემები.',
          en: 'Exchange API integrations, liquidation engines and high-volume trading flows.',
        },
      },
      {
        title: { ka: 'Full-Stack პროდუქტები', en: 'Full-Stack Products' },
        description: {
          ka: 'End-to-end — ვები, მობაილი და ადმინ პანელი. TypeScript, React, Next.js, NestJS, Expo.',
          en: 'Ship end-to-end: web, mobile and admin. TypeScript, React, Next.js, NestJS, Expo.',
        },
      },
    ],
  },
  about: {
    heading: { ka: 'ჩემს შესახებ', en: 'About' },
    bio: {
      ka: 'Full-stack ინჟინერი საქართველოდან. სამი წელია დეველოპერივარ fintech- განხრით — კრიპტო იქსჩეინჯის ინტეგრაციები, ბანკის გადახდის სისტემები და უსაფრთხო ავტორიზაცია. Stack: TypeScript, React, Next.js, NestJS, Expo. გვერდით ვქმნი საკუთარ პროდუქტებს — Playtime.ge (სპორტისა და გართობის ჯავშნა, აქტიურ დეველოპმენტში), WasteAway (ნაგვის გატანა კორპუსებისთვის) და UniHub (საგანმანათლებლო, ეშვება აგრარულ უნივერსიტეტთან).',
      en: "Full-stack engineer based in Georgia. For three years I've shipped production fintech — crypto custody, exchange integrations, bank payment rails and high-security auth. Stack: TypeScript, React, Next.js, NestJS, Expo. On the side I build my own products — Playtime.ge (sports & entertainment booking, in active development), WasteAway (garbage pickup for apartment buildings) and UniHub (education, launching with Agrarian University of Georgia).",
    },
    credentials: {
      ka: '3 წელი production ფინტექში Bitnet-ში · Backend Lead Chama-ში · Playtime.ge-ს, WasteAway-სა და UniHub-ის ფაუნდერი',
      en: '3 years production fintech at Bitnet · Backend Lead at Chama · Founder of Playtime.ge, WasteAway and UniHub',
    },
  },
  contact: {
    heading: { ka: 'ვიმუშაოთ ერთად', en: 'Work with me' },
    subheadline: { ka: 'მომწერე, რას ქმნი.', en: 'Tell me about it.' },
    form: {
      name: { ka: 'თქვენი სახელი', en: 'Your name' },
      namePlaceholder: { ka: 'John Doe', en: 'John Doe' },
      email: { ka: 'ელფოსტის მისამართი', en: 'Email address' },
      emailPlaceholder: { ka: 'john@example.com', en: 'john@example.com' },
      description: { ka: 'რას აგებთ?', en: 'What are you building?' },
      descriptionPlaceholder: { ka: 'პლატფორმა რომელიც... / აპლიკაცია რომელიც ეხმარება...', en: 'A platform for... / An app that helps...' },
      descriptionHint: { ka: '2-3 წინადადება საკმარისია', en: '2-3 sentences is perfect' },
      projectType: { ka: 'პროექტის ტიპი', en: 'Project type' },
      fintechProduct: { ka: 'ფინტექ / კრიპტო პროდუქტი', en: 'Fintech / Crypto Product' },
      webPlatform: { ka: 'ვებ პლატფორმა', en: 'Web Platform' },
      mobileApp: { ka: 'მობილური აპლიკაცია', en: 'Mobile App' },
      fullStackProduct: { ka: 'Full-Stack პროდუქტი', en: 'Full-Stack Product' },
      other: { ka: 'სხვა', en: 'Other' },
      submit: { ka: 'პროექტის გაგზავნა', en: 'Send My Enquiry' },
      sending: { ka: 'იგზავნება...', en: 'Sending...' },
    },
    confirmation: {
      title: { ka: 'გმადლობ!', en: 'Got it!' },
      message: { ka: '24 საათის განმავლობაში მიიღებთ ელფოსტას ჩემგან.', en: 'Expect an email from me within 24 hours.' },
      emailLabel: { ka: 'მომწერეთ პირდაპირ:', en: 'Email me directly:' },
      socialLabel: { ka: 'ან დაბრუნდით:', en: 'Or connect here:' },
    },
    secondary: {
      title: { ka: 'მარტივი ბიზნეს ვებსაიტი?', en: 'Looking for a simple business website?' },
      text: { ka: 'შეამოწმეთ SiteCraft — სწრაფი, თანამედროვე ვებსაიტები ქართული ბიზნესისთვის', en: 'Check out SiteCraft — fast, modern websites for Georgian businesses' },
    },
    social: {
      label: { ka: 'ან დაუკავშირდი', en: 'Or connect directly' },
    },
  },
  footer: {
    copyright: { ka: '© 2026 საბა ჯანელიძე', en: '© 2026 Saba Janelidze' },
    backToTop: { ka: 'ზემოთ', en: 'Back to top' },
  },
  projectDetail: {
    back: { ka: '← ნამუშევრები', en: '← Work' },
    overview: { ka: 'მიმოხილვა', en: 'Overview' },
    techStack: { ka: 'ტექნოლოგიები', en: 'Tech Stack' },
    visitSite: { ka: 'ვებსაიტის ნახვა', en: 'Visit Site' },
    nextProject: { ka: 'შემდეგი პროექტი', en: 'Next Project' },
  },
} as const

export const projects = [
  {
    slug: 'bitnet',
    title: 'Bitnet.ge',
    category: { ka: 'კრიპტო ბირჟა · Full-Stack Engineer', en: 'Crypto Exchange · Full-Stack Engineer' },
    shortDesc: {
      ka: 'საქართველოს ეროვნული ბანკის მიერ ლიცენზირებული კრიპტო ბირჟა 200,000+ რეგისტრირებული მომხმარებლით. სამი წელია ვაშენებ მის production სისტემებს.',
      en: 'Crypto exchange licensed by the National Bank of Georgia, with 200,000+ registered users. Three years building its production systems.',
    },
    description: {
      ka: 'Bitnet საქართველოს ეროვნული ბანკის მიერ ლიცენზირებული კრიპტო ბირჟაა, 200,000-ზე მეტი რეგისტრირებული მომხმარებლითა და 2.5 მილიონი ტრანზაქციით. სამი წელია ვაშენებ მის production სისტემებს: კრიპტო custody, ბირჟებთან ინტეგრაციები, საბანკო გადახდის არხები, მაღალი უსაფრთხოების ავტორიზაცია და ადმინ ინსტრუმენტები, რომლებსაც გუნდი ყოველდღე იყენებს.',
      en: 'Bitnet is a crypto exchange licensed by the National Bank of Georgia, with more than 200,000 registered users and 2.5 million transactions. For three years I have built its production systems: crypto custody, exchange integrations, bank payment rails, high-security auth and the admin tools the team uses every day.',
    },
    tech: ['Go', 'NestJS', 'GraphQL', 'PostgreSQL', 'React'],
    url: 'https://bitnet.ge',
    image: '/projects/bitnet.webp',
    color: '#2563eb',
  },
  {
    slug: 'playtime',
    title: 'Playtime.ge',
    category: { ka: 'სპორტისა და გართობის ჯავშნა · Founder', en: 'Sports & Entertainment Booking · Founder' },
    shortDesc: {
      ka: 'თბილისში სპორტისა და გართობის ობიექტების ჯავშნის მარკეტპლეისი, რომელიც პადელით იწყება. ვაშენებ თავიდან ბოლომდე — ვები, მობილური, ადმინი და ოპერაციები.',
      en: 'Booking marketplace for sports and entertainment venues in Tbilisi, starting with padel. I build it end-to-end — web, mobile, admin and operations.',
    },
    description: {
      ka: 'PlayTime ადამიანებს ეხმარება თბილისში სპორტისა და გართობის ობიექტების პოვნასა და დაჯავშნაში. დღეს მასზე 19 პადელის კლუბია განთავსებული, ხოლო ონლაინ ჯავშანი გადახდით საბოლოო ტესტირების ეტაპზეა. ვაშენებ მარტო, როგორც ფაუნდერი: NestJS + GraphQL ბექენდი, Next.js ვებაპლიკაცია და ობიექტების პორტალი, Expo მობილური აპლიკაცია და მათ უკან მდგომი ადმინისა და ოპერაციების ინსტრუმენტები.',
      en: "PlayTime helps people find and book sports and entertainment venues in Tbilisi. Today it lists 19 padel clubs, and online booking with payment is in final testing. I'm building it as a solo founder: a NestJS + GraphQL backend, a Next.js web app and venue portal, an Expo mobile app, and the admin and operations tools behind them.",
    },
    tech: ['NestJS', 'GraphQL', 'Next.js', 'Expo', 'PostgreSQL'],
    url: 'https://playtime.ge',
    image: '/projects/playtime.webp',
    color: '#e54d2e',
  },
  {
    slug: 'wasteaway',
    title: 'WasteAway',
    category: { ka: 'ნაგვის გატანის სტარტაპი · Founder', en: 'Waste Pickup Startup · Founder' },
    shortDesc: {
      ka: 'ნაგვის გატანა კარიდან კარამდე თბილისის კორპუსებისთვის. ვაშენებ ნულიდან — ბრენდი, ვებსაიტი და ოპერაციები.',
      en: "Door-to-door garbage pickup for apartment buildings in Tbilisi. I'm building it from zero — brand, website and operations.",
    },
    description: {
      ka: 'WasteAway ნაგავს გააქვს თბილისის კორპუსებიდან. მაცხოვრებლები საღამოს WasteAway-ს ტომარას სართულზე ჩამოკიდებენ, თანამშრომელი კი მას დილამდე წაიღებს. მე ვარ ფაუნდერი: შევქმენი ბრენდი, ორენოვანი ვებსაიტი რუკაზე დაფუძნებული რეგისტრაციის ფორმით და ოპერაციების გეგმა, და ახლა პირველ საპილოტე კორპუსს ვამზადებ.',
      en: "WasteAway takes the garbage out of Tbilisi apartment buildings. Residents hang a WasteAway bag on their floor in the evening, and a collector takes it away by morning. I'm the founder: I built the brand, the bilingual website with a map-based sign-up form, and the operations plan, and I'm preparing the first pilot building.",
    },
    tech: ['Astro', 'TypeScript', 'Cloudflare Workers', 'Cloudflare D1', 'Leaflet'],
    url: 'https://wasteaway.ge',
    image: '/projects/wasteaway.webp',
    color: '#03667d',
  },
  {
    slug: 'chama',
    title: 'Chama.ge',
    category: { ka: 'რესტორნის პლატფორმა · Backend Lead', en: 'Restaurant Platform · Backend Lead' },
    shortDesc: {
      ka: 'Backend lead რესტორნის პლატფორმაზე ცოცხალი დინამიკური ფასებით. დავაარქიტექტურე — GraphQL, NestJS, Postgres, Redis.',
      en: 'Backend lead on a restaurant platform with live dynamic pricing. I designed the architecture — GraphQL, NestJS, Postgres, Redis.',
    },
    description: {
      ka: 'Chama.ge საშუალებას აძლევს ვიზიტორებს დაჯავშნონ მაგიდები დინამიკური ფასებით, რომელსაც რესტორანი ადგენს. მე ვხელმძღვანელობ ბექენდს. დავაარქიტექტურე და ვშიპავ: GraphQL API, NestJS სერვისები, PostgreSQL და Redis real-time ფასებისა და ჯავშნის state-სთვის.',
      en: 'Chama.ge lets diners book off-peak tables at dynamic prices set by each restaurant. I lead backend. Designed and ship the solution architecture: GraphQL API, NestJS services, PostgreSQL data layer and Redis for real-time pricing and reservation state.',
    },
    tech: ['TypeScript', 'NestJS', 'GraphQL', 'PostgreSQL', 'Redis'],
    url: 'https://chama.ge',
    image: '/projects/chama.webp',
    color: '#dc2626',
  },
  {
    slug: 'unihub',
    title: 'UniHub',
    category: { ka: 'საგანმანათლებლო სტარტაპი · Founder', en: 'Education Startup · Founder' },
    shortDesc: {
      ka: 'EdTech პლატფორმა, რომელიც ეშვება აგრარული უნივერსიტეტის pilot-ით. გაფართოება სხვა უნივერსიტეტებზე.',
      en: 'EdTech platform launching with Agrarian University of Georgia as the pilot. Expanding to more universities next.',
    },
    description: {
      ka: 'საგანმანათლებლო პლატფორმა, რომელიც ეშვება საქართველოს აგრარულ უნივერსიტეტში pilot-ად. აგებულია ისე, რომ გაფართოვდეს სხვა უნივერსიტეტებზე. ვფლობ პროდუქტს, ინჟინერიას და პარტნიორობას.',
      en: 'Education platform launching with Agrarian University of Georgia as the pilot deployment. Built to scale across more universities as the rollout proves out. I own product, engineering and partnerships.',
    },
    tech: ['React', 'Vite', 'Tailwind CSS'],
    url: 'https://unihub-edu.vercel.app',
    image: '/projects/unihub.webp',
    color: '#10b981',
  },
] as const
