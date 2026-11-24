import type { SkillGroup } from "./types";

/** Grouped by what someone would hire for. Kept to one list: no repeats elsewhere. */
export const skills: SkillGroup[] = [
  {
    title: "Shipping mobile apps",
    description: "From an empty repo to the App Store and Google Play, and keeping it fast once it's there.",
    items: [
      "React Native",
      "Expo",
      "TypeScript",
      "Native modules in Java and Objective-C",
      "Reanimated",
      "Hermes profiling",
      "FlashList",
      "Bluetooth LE",
      "MMKV",
    ],
  },
  {
    title: "Web frontends",
    description: "Coach dashboards, admin portals, storefronts and desktop apps, built in React and Next.js.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Electron",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Redux Toolkit",
      "Three.js and WebGL",
    ],
  },
  {
    title: "Backends and APIs",
    description: "APIs, data models and real-time features, designed together with the clients that use them.",
    items: ["Node.js", "Express", "GraphQL", "REST", "PostgreSQL", "Prisma", "Redis", "WebSockets", "Firebase", "Supabase"],
  },
  {
    title: "Payments and media",
    description: "Subscriptions, payouts, store purchases and video that works on bad networks.",
    items: ["Stripe Subscriptions and Connect", "Apple In-App Purchase", "Google Play Billing", "FFmpeg", "HLS", "AWS S3", "BullMQ"],
  },
  {
    title: "Releases and quality",
    description: "Pipelines that make shipping boring, and tests that catch regressions first.",
    items: ["EAS Build and Update", "Hot Updater", "Fastlane", "GitHub Actions", "Jest", "React Native Testing Library", "Detox"],
  },
];
