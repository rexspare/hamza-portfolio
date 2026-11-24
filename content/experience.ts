import type { Role } from "./types";

/** Newest first. `end: null` means the role is current. */
export const experience: Role[] = [
  {
    title: "Senior Software Engineer",
    company: "Acheev",
    companyUrl: "https://www.acheevapp.io/",
    start: "2024-08",
    end: null,
    type: "Part-time from Aug 2024, full-time since Oct 2026",
    location: "Remote, USA",
    achievements: [
      "Own the architecture of a three-tier TypeScript platform, from the first commit: React Native app, React coach dashboard and GraphQL API, now at 70+ domain models and 150+ migrations.",
      "Built the whole payments stack (Stripe Subscriptions, Apple In-App Purchase, Stripe Connect payouts) as one automated pipeline from athlete billing to coach payout.",
      "Designed a video pipeline (BullMQ, FFmpeg, HLS on S3) with automatic retries and live status in direct, team and community chat.",
    ],
  },
  {
    title: "Senior Mobile Engineer",
    company: "TechSea",
    companyUrl: "https://techsea.io/",
    start: "2025-03",
    end: "2026-09",
    type: "Full-time",
    location: "Pakistan",
    todo: "Confirm employment type",
    achievements: [
      "Built OTA update pipelines with Hot Updater and EAS Update, cutting the average time to ship a production fix from days to under 2 hours.",
      "Moved heavy work onto the Reanimated UI thread after profiling Hermes, holding 60 FPS on mid-range Android and cutting frame drops on key screens by about 70%.",
      "Added an offline-first layer (MMKV, TanStack Query) that cut redundant API calls on core flows by about 40%.",
    ],
  },
  {
    title: "Lead Mobile Engineer",
    company: "D12 Solutions",
    companyUrl: "https://d12-solutions.com/",
    start: "2023-02",
    end: "2025-02",
    type: "Full-time",
    location: "Rahim Yar Khan, Pakistan",
    todo: "Confirm employment type",
    achievements: [
      "Led a team of 8 mobile engineers that shipped 20+ React Native apps in booking, retail, services and fitness, with 50k+ combined downloads.",
      "Created a shared, typed UI component library and API client for mobile apps and web admin portals, cutting feature delivery time by about 30%.",
      "Put Jest, React Native Testing Library and Detox gates in front of every release (GitHub Actions, EAS Build), cutting regressions by about 45%.",
    ],
    note: "Took on contract work for SitePod alongside this role in the final months.",
  },
  {
    title: "React Native Developer",
    company: "Teknovation",
    companyUrl: "https://teknovation.io/",
    start: "2022-07",
    end: "2023-01",
    type: "Full-time",
    location: "Islamabad, Pakistan",
    todo: "Confirm employment type",
    achievements: [
      "Built full-stack apps on Firebase (Firestore, Realtime Database, Cloud Functions, Auth) with real-time sync, offline persistence and token auto-refresh.",
      "Built on-device decryption for protected audio, so encrypted streams play inside the app.",
      "Set up FCM push notifications, dynamic deep links and transactional alerts across core flows.",
    ],
  },
  {
    title: "React Native Developer",
    company: "Hello World Technologies",
    companyUrl: "https://helloworldtech.com",
    start: "2020-01",
    end: "2022-07",
    type: "Intern, then full-time after 6 months",
    location: "Rahim Yar Khan, Pakistan",
    achievements: [
      "Shipped 10+ apps to the App Store and Google Play with a 4.6+ average rating, while finishing my degree.",
      "Wrote native modules in Java and Objective-C for camera, biometrics and background location.",
    ],
  },
];
