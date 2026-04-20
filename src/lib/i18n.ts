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
      ka: 'Full-stack ინჟინერი საქართველოდან. სამი წელია დეველოპერივარ fintech- განხრით — კრიპტო იქსჩეინჯის ინტეგრაციები, ბანკის გადახდის სისტემები და უსაფრთხო ავტორიზაცია. Stack: TypeScript, React, Next.js, NestJS, Expo. გვერდით ვქმნი საკუთარ პროდუქტებს — Playtime.ge (გასართობი, აქტიურ დეველოპმენტში) და UniHub (საგანმანათლებლო, ეშვება აგრარულ უნივერსიტეტთან).',
      en: "Full-stack engineer based in Georgia. For three years I've shipped production fintech — crypto custody, exchange integrations, bank payment rails and high-security auth. Stack: TypeScript, React, Next.js, NestJS, Expo. On the side I build my own products — Playtime.ge (entertainment, in active development) and UniHub (education, launching with Agrarian University of Georgia).",
    },
    credentials: {
      ka: '3 წელი ფინტექში Bitnet-ში · Backend Lead Chama-ში · Playtime.ge-სა და UniHub-ის ფაუნდერი',
      en: '3 years production fintech at Bitnet · Backend Lead at Chama · Founder of Playtime.ge and UniHub',
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
    slug: 'playtime',
    title: 'Playtime.ge',
    category: { ka: 'გასართობი სტარტაპი · Founder', en: 'Entertainment Startup · Founder' },
    shortDesc: {
      ka: 'გასართობი სტარტაპი, რომელსაც ვაშენებ end-to-end — პროდუქტი, ადმინ პანელი და ოპერაციები.',
      en: "Entertainment startup I'm building end-to-end — product, admin panel and operations.",
    },
    description: {
      ka: 'Playtime.ge-ს ვაშენებ solo founder-ად. Full-stack პროდუქტ ინჟინერია, ადმინ ინსტრუმენტები და ოპერაციული სისტემები. აქტიურ დეველოპმენტში, ვშიპავ ფიჩრებს იუზერის feedback ციკლებით.',
      en: 'Building Playtime.ge as a solo founder. Full-stack product engineering, admin tooling and operational systems. Currently in active development, shipping features through user feedback cycles.',
    },
    tech: ['React', 'Node.js', 'Admin Panel'],
    url: 'https://playtime.ge',
    image: '/projects/playtime.webp',
    color: '#e54d2e',
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
