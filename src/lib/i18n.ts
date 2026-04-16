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
    heading: { ka: 'მოდი, ვითანამშრომლოთ', en: "Let's Work Together" },
    subheading: {
      ka: 'გაქვთ პროექტი? მომწერეთ და განვიხილოთ',
      en: 'Have a project? Reach out and let\'s discuss',
    },
    cta: { ka: 'დამიკავშირდით', en: 'Get in Touch' },
    email: { ka: 'ელფოსტა', en: 'Email' },
    social: { ka: 'სოციალური', en: 'Social' },
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
    image: '/projects/playtime.png',
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
    image: '/projects/devnews.png',
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
    image: '/projects/unihub.png',
    color: '#10b981',
  },
] as const
