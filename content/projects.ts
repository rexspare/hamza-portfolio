import type { Project } from "./types";

/**
 * Every app and website. `featured` projects become homepage case studies and
 * /work/[slug] pages; everything else is listed compactly.
 *
 * Icons, screenshots, ratings and install counts are NOT typed here: run
 * `npm run sync:stores` to download them from the store links into
 * public/apps/<slug>/ and content/store-data.json.
 */
export const projects: Project[] = [
  // ─── Featured ────────────────────────────────────────────────────────────
  {
    slug: "acheev",
    name: "Acheev",
    kind: "app",
    tagline: "Coaching platform for athletes and teams, with training, payments and video in one product.",
    platforms: ["ios", "android", "web"],
    links: {
      appStore: "https://apps.apple.com/us/app/acheev-performance-app/id1636595346",
      web: "https://www.acheevapp.io/",
    },
    featured: 1,
    screens: { shots: [0, 1, 4], framed: false }, // TODO: raw in-app screenshots would look better than store art
    caseStudy: {
      client: "Acheev (USA)",
      role: "Senior Software Engineer. Owned the architecture from the first commit",
      timeline: "Aug 2024 – present",
      stack: [
        "React Native",
        "TypeScript",
        "React",
        "GraphQL",
        "Node.js",
        "PostgreSQL",
        "Stripe",
        "Apple IAP",
        "BullMQ",
        "FFmpeg",
        "AWS S3",
      ],
      summary:
        "An iOS and Android app for athletes, a web dashboard for coaches, and the GraphQL API behind both. I've owned all three since the first commit.",
      problem:
        "Coaches train solo athletes and whole teams, bill them, pay themselves out and share training video. Acheev needed all of that in one product, across a mobile app and a coach dashboard, without building every feature twice.",
      approach: [
        "Set up a single TypeScript codebase in three tiers: React Native for athletes, React for coaches, and one GraphQL API that both talk to.",
        "Modelled the domain up front. The API has grown to 70+ domain models through 150+ database migrations without a rewrite.",
        "Built individual and team programming on one codepath, so the workout builder, calendars and assignment work the same way for one athlete or a squad.",
      ],
      decisions: [
        {
          title: "One codepath for athletes and teams",
          body: "Workout builder, scheduling calendars and assignment treat a team as a group of athletes rather than a separate feature. Every new feature ships to both at once.",
        },
        {
          title: "Payments as a single pipeline",
          body: "Stripe Subscriptions, Apple In-App Purchase and Stripe Connect payouts run as one automated flow, from charging the athlete to paying the coach.",
        },
        {
          title: "Video that recovers from bad uploads",
          body: "Uploads go into a BullMQ queue that transcodes with FFmpeg to HLS on S3, retries on failure, and reports live status into direct, team and community chat.",
        },
      ],
      results: [
        { value: "70+", label: "domain models in the GraphQL API" },
        { value: "150+", label: "database migrations shipped without a rewrite" },
        { value: "TODO", label: "launch outcome: athletes, coaches or revenue processed" },
      ],
      tint: "#E0472B",
    },
  },
  {
    slug: "solto-cafe",
    name: "Solto Cafe",
    kind: "app",
    tagline: "Multi-tenant operating system for cafes: POS, ordering, kitchen, staff and delivery.",
    platforms: ["web", "desktop", "ios", "android"],
    links: {}, // TODO: public URL or store links
    featured: 2,
    caseStudy: {
      client: "Solto", // TODO: confirm. Own product or client work?
      role: "TODO: e.g. Founding engineer, architecture and full stack",
      timeline: "TODO",
      stack: ["Next.js", "Electron", "Expo", "React Native", "Express", "Prisma", "WebSockets", "TypeScript"],
      summary:
        "One system that runs a cafe: point of sale, QR table ordering, kitchen display, reservations, inventory, loyalty, payroll and GPS delivery, shared by many cafes at once.",
      problem:
        "Cafes juggle separate tools for the till, table orders, the kitchen, stock, staff and delivery. Solto replaces them with one product that many cafes share, each with its own data, language and tax rules.",
      approach: [
        "Built one modular Express and Prisma API, with three clients on top: Next.js for the web, Electron for the counter POS, and Expo for mobile.",
        "Made tenancy part of the data model from day one, so every cafe's data, settings and language are isolated on shared infrastructure.",
        "Pushed order and kitchen events over WebSockets so the POS, kitchen display and customer screens stay in sync without polling.",
      ],
      decisions: [
        {
          title: "Three clients, one API",
          body: "Web, desktop POS and mobile share one modular Express and Prisma backend, so a new module like loyalty or payroll is built once and appears everywhere.",
        },
        {
          title: "Real time by default",
          body: "A QR order placed at the table shows up on the kitchen display and the counter immediately, over WebSockets.",
        },
        {
          title: "Built for German and EU rules",
          body: "EU and German fiscalization and 21 languages are part of the core, so the same product can run in different markets.",
        },
      ],
      results: [
        { value: "21", label: "languages supported across tenants" },
        { value: "8", label: "modules in one product, from POS to GPS delivery" },
        { value: "TODO", label: "cafes onboarded or orders processed" },
      ],
      modules: [
        "Point of sale",
        "QR ordering",
        "Kitchen display",
        "Reservations",
        "Inventory",
        "Loyalty",
        "Payroll",
        "GPS delivery",
      ],
      tint: "#B5651D",
    },
  },
  {
    slug: "qmask-aiwallet",
    name: "QMask / aiWallet",
    kind: "app",
    tagline: "Crypto wallet with on-device keys, biometric approval and a built-in dApp browser.",
    platforms: ["ios", "android"],
    links: {}, // TODO: store links if public
    featured: 3,
    caseStudy: {
      client: "TODO",
      role: "TODO: e.g. Lead React Native engineer",
      timeline: "TODO",
      stack: ["React Native", "TypeScript", "Ethers.js", "Zustand", "Biometrics", "Secure storage"],
      summary:
        "A React Native wallet for iOS and Android that keeps keys on the device, asks for biometrics before every transaction, and lets users swap, hold NFTs and use dApps without leaving the app.",
      problem:
        "If a wallet leaks a private key, the money is gone. The app had to keep keys on the device and behind biometrics, while still offering swaps, NFTs and dApps across several networks.",
      approach: [
        "Kept private keys in on-device secure storage only. Nothing that can sign a transaction ever leaves the phone.",
        "Required biometric verification to open the app and again to approve each transaction.",
        "Built an in-app dApp browser on Ethers.js and Zustand, so users can go from holding assets to using them in one place.",
      ],
      decisions: [
        {
          title: "Keys never leave the device",
          body: "Private keys live in on-device secure storage. Signing happens locally, and nothing that can move funds is sent to a server.",
        },
        {
          title: "Biometrics on every transaction",
          body: "Face ID or fingerprint is required to open the wallet and again to approve each transfer, swap or dApp signature.",
        },
        {
          title: "dApp browser inside the wallet",
          body: "An in-app browser injects an Ethers.js provider, so dApps connect to the user's wallet without a separate extension or app.",
        },
      ],
      results: [{ value: "TODO", label: "users, assets held or transactions signed" }],
      modules: ["Multi-network assets", "Swaps", "NFTs", "dApp browser", "Biometric approval", "On-device keys"],
      tint: "#3B5BDB",
    },
  },
  {
    slug: "swimtofly",
    name: "SwimtoFly",
    kind: "app",
    tagline: "Step-by-step video swimming lessons for adults, unlocked with in-app purchases.",
    platforms: ["android"], // TODO: add iOS if there is an App Store version
    links: { playStore: "https://play.google.com/store/apps/details?id=com.swimtofly.android" },
    featured: 4,
    screens: { shots: [0, 2, 5], framed: true },
    caseStudy: {
      client: "SwimtoFly Pte. Ltd.",
      role: "TODO: e.g. React Native developer, app and in-app purchases",
      timeline: "TODO",
      stack: ["React Native", "JavaScript", "Firebase", "In-App Purchases"],
      summary:
        "A learn-to-swim course in an app: structured video lessons that build confidence step by step, with lessons unlocked through in-app purchases.",
      problem:
        "SwimtoFly teaches adults to swim with its own step-by-step method. The app had to deliver that course as structured video lessons and sell access inside the app on Android.",
      approach: [
        "Structured lessons as an ordered course, so learners always know their next step.",
        "Used Firebase for accounts and lesson content, so the course can be updated without a release.",
        "Sold lesson access through Google Play in-app purchases.",
      ],
      decisions: [
        {
          title: "Content outside the binary",
          body: "Lessons and their order live in Firebase, so SwimtoFly can add or reorder lessons without shipping a new app version.",
        },
        {
          title: "Purchases tied to accounts",
          body: "In-app purchases unlock lessons against the user's account, so a reinstall or a new phone doesn't lose access.", // TODO: confirm
        },
      ],
      results: [{ value: "TODO", label: "conversion to paid, or lessons completed" }],
      tint: "#1C7ED6",
    },
  },

  // ─── More apps ───────────────────────────────────────────────────────────
  {
    slug: "nomadz",
    name: "Nomadz",
    kind: "app",
    tagline: "Marketplace for outdoor enthusiasts, with in-app payments.",
    platforms: ["ios"],
    links: { appStore: "https://apps.apple.com/pk/app/nomadz/id6448633205" },
  },
  {
    slug: "glowvia",
    name: "Glowvia",
    kind: "app",
    tagline: "AI coach for skin, hair and style, with a personal Glow Score and 30-day plans.",
    platforms: ["ios"],
    links: { appStore: "https://apps.apple.com/us/app/glowvia/id6760437185" },
  },
  {
    slug: "fmhero",
    name: "FMHero",
    kind: "app",
    tagline: "Service paperwork and compliance records for HVAC technicians.",
    platforms: ["ios"],
    links: { appStore: "https://apps.apple.com/us/app/fmhero/id1570918942" },
  },
  {
    slug: "plative",
    name: "Plative",
    kind: "app",
    tagline: "Lets drivers message other drivers around them in real time.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.Plative" },
  },
  {
    slug: "interveen",
    name: "Interveen",
    kind: "app",
    tagline: "Blocks adult content and puts your goal on screen instead.",
    platforms: ["android"], // TODO: confirm stack (data said Kotlin + Swift) and whether an iOS version exists
    links: { playStore: "https://play.google.com/store/apps/details?id=com.interveen.app" },
  },
  {
    slug: "tas-dating",
    name: "TAS Dating",
    kind: "app",
    tagline: "Dating app for casual and long-term matches.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.tasdatingkit" },
  },
  {
    slug: "mangia-rewards",
    name: "Mangia Rewards",
    kind: "app",
    tagline: "Free drink, starter or dessert with every entrée at partner restaurants.",
    platforms: ["ios"],
    links: { appStore: "https://apps.apple.com/us/app/mangia-rewards-dining-offers/id1659785521" },
  },
  {
    slug: "winelikes",
    name: "Winelikes",
    kind: "app",
    tagline: "Rate, track and discover wine, from first sip to sommelier.",
    platforms: ["ios"],
    links: { appStore: "https://apps.apple.com/us/app/winelikes/id1604508326" },
  },
  {
    slug: "pehchaan-balochistan",
    name: "Pehchaan Balochistan",
    kind: "app",
    tagline: "Offer and book local services, with community forums and subscriptions.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=org.psca.pehchaanbalochistan" },
  },
  {
    slug: "icr-it-centre",
    name: "ICR – IT Centre RYK",
    kind: "app",
    tagline: "Courses and student app for an IT training institute.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.itcentre" },
  },
  {
    slug: "roskalava",
    name: "Roskalava",
    kind: "app",
    tagline: "Finnish charity app for giving away and finding second-hand items.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.roskalava.app" },
  },
  {
    slug: "barcelona-guide",
    name: "Barcelona Guide",
    kind: "app",
    tagline: "City guide to Barcelona's attractions and historic sites.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.cityguide.barcelonacityguideapp" },
  },
  {
    slug: "crbo",
    name: "CRBO",
    kind: "app",
    tagline: "Book a car with a driver for short or long trips, or list your own.",
    platforms: ["ios"],
    links: { appStore: "https://apps.apple.com/us/app/crbo/id1642157751" },
  },
  {
    slug: "quran-urdu-audio",
    name: "Quran Urdu Audio Translation",
    kind: "app",
    tagline: "The Quran with Urdu audio translation, recitation and qibla direction.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.quran_only_urdu_audio" },
  },
  {
    slug: "luxurian-kw",
    name: "Luxurian KW",
    kind: "app",
    tagline: "Shop luxury bags and accessories in Kuwait.",
    platforms: ["ios"],
    links: { appStore: "https://apps.apple.com/pk/app/luxurian-kw/id6449488950" },
  },
  {
    slug: "dialed-resistance",
    name: "Dialed Resistance",
    kind: "app",
    tagline: "Adds live resistance tracking to a standard spin bike through a connected sensor.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.stationaryblenew" },
  },
  {
    slug: "tern-rewards",
    name: "Tern Rewards",
    kind: "app",
    tagline: "Rewards tenants for paying rent and renewing their lease.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.ternrewards" },
  },
  {
    slug: "planlocal",
    name: "PlanLocal",
    kind: "app",
    tagline: "Find and post events happening near you.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.EventZone" },
  },
  {
    slug: "goalin",
    name: "Goal'in",
    kind: "app",
    tagline: "Free football predictions with challenges and leaderboards.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.magrillefoot" },
  },
  {
    slug: "qalbi",
    name: "Qalbi",
    kind: "app",
    tagline: "Journaling and self-reflection, with soulmate compatibility insights.",
    platforms: ["ios"],
    links: { appStore: "https://apps.apple.com/us/app/qalbi-soulmate-healing/id6758221871" },
  },
  {
    slug: "clearpast",
    name: "ClearPast",
    kind: "app",
    tagline: "Restores blurry and old photos to high resolution with AI.",
    platforms: ["ios"],
    links: { appStore: "https://apps.apple.com/ye/app/clearpast-ai-photo-enhancer/id6480299547" },
  },
  {
    slug: "kohinoor-bazar",
    name: "Kohinoor Bazar",
    kind: "app",
    tagline: "Grocery ordering for an international food store in Budapest.",
    platforms: ["android"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.rsdtech.kohinoorbazar" },
  },

  // ─── Websites ────────────────────────────────────────────────────────────
  {
    slug: "1earth",
    name: "1Earth",
    kind: "website",
    tagline: "Donation site for a charity caring for vulnerable elders, with Stripe monthly and one-time giving.",
    platforms: ["web"],
    links: { web: "https://www.1earth.site" },
    stack: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    slug: "italian-organic",
    name: "Italian Organic",
    kind: "website",
    tagline: "Storefront for organic Italian products, with ordering over WhatsApp.",
    platforms: ["web"],
    links: { web: "https://www.italianorganic.store/" },
    stack: ["Next.js", "TypeScript"],
  },
  {
    slug: "roskalava-marketplace",
    name: "Roskalava Marketplace",
    kind: "website",
    tagline: "Web marketplace for the Roskalava app: buy, sell, rent or give away goods.",
    platforms: ["web"],
    links: { web: "https://www.roskalava.net/" },
    stack: ["React", "Node.js", "WordPress"],
  },
  {
    slug: "d12-solutions",
    name: "D12 Solutions",
    kind: "website",
    tagline: "Company site for the studio where I led the mobile team.",
    platforms: ["web"],
    links: { web: "https://d12-solutions.com/" },
    stack: ["Next.js", "TypeScript"],
  },
  {
    slug: "3d-portfolio",
    name: "3D Portfolio",
    kind: "website",
    tagline: "An earlier portfolio of mine, as a 3D scene you move through in WebGL.",
    platforms: ["web"],
    links: { web: "https://3d-portfolio.hamzazafar.online/" },
    stack: ["React", "Three.js", "WebGL"],
  },
];
