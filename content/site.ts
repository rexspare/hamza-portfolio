/** Identity, contact details and hero copy, used by the homepage, metadata and JSON-LD. */
export const site = {
  name: "Hamza Zafar",
  /** One title, matching the CV. Used in the hero, <title>, OG images and JSON-LD. */
  title: "Senior Software Engineer",
  /** Shown under the title in the hero and appended to it in page titles. */
  specialty: "Mobile & Full-Stack",
  url: "https://hamzazafar.online",
  value:
    "I build products end to end: React Native apps for iOS and Android, React and Next.js web apps, and the Node.js and GraphQL APIs behind them.",
  location: "Rahim Yar Khan, Pakistan",
  locationLine: "Based in Pakistan. Working remotely with teams in the US and Europe.",
  description:
    "Hamza Zafar is a senior software engineer, mobile and full-stack: React Native apps for iOS and Android, React and Next.js web apps, and the Node.js and GraphQL backends behind them. 6+ years, 50+ apps shipped.",

  /** Hero stats. Shown once, in the hero, and nowhere else. */
  // TODO: the CV says "30+ production apps" and the brief says 50+. Use one number everywhere.
  stats: [
    { value: "50+", label: "apps shipped" },
    { value: "6+", label: "years shipping software" },
    { value: "8", label: "engineers led at D12" },
  ],

  /** Store screenshots shown on the three hero phones: [left, centre, right]. */
  heroPhones: [
    { slug: "clearpast", shot: 3 },
    { slug: "swimtofly", shot: 0 },
    { slug: "glowvia", shot: 0 },
  ],

  portrait: { src: "/portrait.jpg", alt: "Portrait of Hamza Zafar" },

  email: "hamzazafarrc@gmail.com",
  /** TODO: Calendly link. The "Book a call" button is hidden while this is null. */
  bookingUrl: null as string | null,
  resumeUrl: "/resume.pdf",

  links: {
    linkedin: "https://www.linkedin.com/in/hamzazafarrc/",
    github: "https://github.com/rexspare",
  },
  /** Secondary contact options, shown small under the main ones. */
  secondaryLinks: [
    { label: "WhatsApp", href: "https://wa.me/923060275992" },
    { label: "Telegram", href: "https://t.me/+923497418141" },
  ],

  education: {
    degree: "B.Sc. Software Engineering",
    school: "KFUEIT",
    schoolFull: "Khwaja Fareed University of Engineering and Information Technology",
    url: "https://kfueit.edu.pk/",
    years: "2018 – 2022",
  },
} as const;
