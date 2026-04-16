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
    title: { ka: 'ვებ დეველოპერი', en: 'Web Developer' },
    tagline: {
      ka: 'ვქმნი ვებსაიტებს, რომლებიც შედეგს მოაქვს',
      en: 'I build websites that deliver results',
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
        title: { ka: 'ვებ დეველოპმენტი', en: 'Web Development' },
        description: {
          ka: 'თანამედროვე, სწრაფი და რესპონსიული ვებსაიტების შექმნა React-ისა და Next.js-ის გამოყენებით',
          en: 'Modern, fast, and responsive websites built with React and Next.js',
        },
      },
      {
        title: { ka: 'UI/UX დიზაინი', en: 'UI/UX Design' },
        description: {
          ka: 'მომხმარებლის გამოცდილებაზე ორიენტირებული დიზაინი, რომელიც ლამაზიცაა და ფუნქციონალურიც',
          en: 'User-centered design that is both beautiful and functional',
        },
      },
      {
        title: { ka: 'Full-Stack გადაწყვეტილებები', en: 'Full-Stack Solutions' },
        description: {
          ka: 'ფრონტენდიდან ბექენდამდე — სრული ვებ აპლიკაციები ადმინ პანელით და ბაზით',
          en: 'From frontend to backend — complete web applications with admin panels and databases',
        },
      },
    ],
  },
  about: {
    heading: { ka: 'ჩემს შესახებ', en: 'About' },
    bio: {
      ka: 'ვარ ვებ დეველოპერი საქართველოდან. ვქმნი თანამედროვე ვებსაიტებს და ვებ აპლიკაციებს, რომლებიც არა მხოლოდ ლამაზად გამოიყურება, არამედ რეალურ შედეგს მოაქვს ბიზნესისთვის.',
      en: "I'm a web developer from Georgia. I build modern websites and web applications that don't just look beautiful — they deliver real results for businesses.",
    },
  },
  contact: {
    heading: { ka: 'ვიმუშაოთ ერთად', en: 'Work with me' },
    subheadline: { ka: 'მხხელი დაწერეთ რაზე ხსნილი ხართ.', en: 'Tell me about it.' },
    form: {
      name: { ka: 'თქვენი სახელი', en: 'Your name' },
      namePlaceholder: { ka: 'John Doe', en: 'John Doe' },
      email: { ka: 'ელფოსტის მისამართი', en: 'Email address' },
      emailPlaceholder: { ka: 'john@example.com', en: 'john@example.com' },
      description: { ka: 'რას აგებთ?', en: 'What are you building?' },
      descriptionPlaceholder: { ka: 'პლატფორმა რომელიც... / აპლიკაცია რომელიც ეხმარება...', en: 'A platform for... / An app that helps...' },
      descriptionHint: { ka: '2-3 წინადადება საკმარისია', en: '2-3 sentences is perfect' },
      projectType: { ka: 'პროექტის ტიპი', en: 'Project type' },
      mobileApp: { ka: 'მობილური აპლიკაცია', en: 'Mobile App' },
      webPlatform: { ka: 'ვებ პლატფორმა', en: 'Web Platform' },
      aiProduct: { ka: 'AI/ML პროდუქტი', en: 'AI/ML Product' },
      designSystem: { ka: 'დიზაინ სისტემა', en: 'Design System' },
      other: { ka: 'სხვა', en: 'Other' },
      submit: { ka: 'პროექტი მიუზე', en: 'Send My Enquiry' },
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
    slug: 'playtime',
    title: 'Playtime.ge',
    category: { ka: 'გასართობი პლატფორმა', en: 'Entertainment Platform' },
    shortDesc: {
      ka: 'სრული პლატფორმა ადმინ პანელით კონტენტის მართვისთვის',
      en: 'Full platform with admin panel for content management',
    },
    description: {
      ka: 'Playtime.ge არის გასართობი პლატფორმა, რომელიც შეიქმნა მომხმარებლის გამოცდილების გათვალისწინებით. პროექტი მოიცავს სრულ ადმინ პანელს, რომელიც საშუალებას აძლევს მფლობელს მართოს კონტენტი კოდის ცოდნის გარეშე.',
      en: 'Playtime.ge is an entertainment platform built with user experience at its core. The project includes a full admin panel that lets the owner manage content without any coding knowledge.',
    },
    tech: ['React', 'Node.js', 'Admin Panel'],
    url: 'https://playtime.ge',
    image: '/projects/playtime.webp',
    color: '#e54d2e',
  },
  {
    slug: 'devnews',
    title: 'DevNews',
    category: { ka: 'ტექნოლოგიური მედია', en: 'Tech Media' },
    shortDesc: {
      ka: 'ტექნოლოგიური სიახლეების პლატფორმა დეველოპერებისთვის',
      en: 'Tech news platform for developers',
    },
    description: {
      ka: 'DevNews არის სიახლეების პლატფორმა, რომელიც აგროვებს და აწვდის უახლეს ტექნოლოგიურ სიახლეებს დეველოპერებისთვის. სწრაფი, სუფთა და ფოკუსირებული წაკითხვის გამოცდილება.',
      en: 'DevNews is a news platform that aggregates and delivers the latest tech news for developers. Fast, clean, and focused reading experience.',
    },
    tech: ['React', 'Vite', 'API Integration'],
    url: 'https://dev-news-blond.vercel.app',
    image: '/projects/devnews.webp',
    color: '#3b82f6',
  },
  {
    slug: 'unihub',
    title: 'UniHub',
    category: { ka: 'საგანმანათლებლო პლატფორმა', en: 'Education Platform' },
    shortDesc: {
      ka: 'უნივერსიტეტის სტუდენტებისთვის შექმნილი საგანმანათლებლო პლატფორმა',
      en: 'Education platform built for university students',
    },
    description: {
      ka: 'UniHub აერთიანებს საგანმანათლებლო რესურსებს ერთ პლატფორმაზე. სტუდენტებისთვის შექმნილი ინტუიციური ინტერფეისი, რომელიც აადვილებს სასწავლო პროცესს.',
      en: 'UniHub brings educational resources together in one platform. Built with an intuitive interface for students that simplifies the learning process.',
    },
    tech: ['React', 'Vite', 'Tailwind CSS'],
    url: 'https://unihub-edu.vercel.app',
    image: '/projects/unihub.webp',
    color: '#10b981',
  },
] as const
