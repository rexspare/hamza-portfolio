/**
 * Content types. Everything the site shows lives in /content as typed data:
 * add a project, job or review by adding an object, never by editing a component.
 *
 * Anything written as `TODO` (or `todo: true`) is a gap Hamza still has to fill;
 * components hide TODO values instead of rendering them.
 */

export type Platform = "ios" | "android" | "web" | "desktop";

export interface StoreLinks {
  /** Full App Store URL, e.g. https://apps.apple.com/us/app/name/id123 */
  appStore?: string;
  /** Full Google Play URL, e.g. https://play.google.com/store/apps/details?id=com.x */
  playStore?: string;
  web?: string;
}

export interface Metric {
  /** The number itself, e.g. "−70%" or "2 h". "TODO" hides the metric. */
  value: string;
  /** What it measures, tied to the project, e.g. "frame drops on the workout timeline". */
  label: string;
}

export interface Decision {
  title: string;
  body: string;
}

export interface CaseStudy {
  client: string;
  role: string;
  /** e.g. "Aug 2024 – present" */
  timeline: string;
  stack: string[];
  /** One sentence for the homepage block. */
  summary: string;
  problem: string;
  approach: string[];
  /** Technical decisions / challenges: 2–3 on the homepage, all on the case study page. */
  decisions: Decision[];
  results: Metric[];
  /** Shown instead of screenshots when there are none (private or unreleased products). */
  modules?: string[];
  /** Brand hue used to tint the screenshot plate, e.g. "#2F6FEB". */
  tint: string;
}

export interface Project {
  slug: string;
  name: string;
  kind: "app" | "website";
  /** One plain line: what it is and who it's for. */
  tagline: string;
  platforms: Platform[];
  links: StoreLinks;
  year?: number;
  /** Main technologies, shown on website rows (apps show platforms instead). */
  stack?: string[];
  /** Set on the 3–4 projects shown as case studies, in display order. */
  featured?: number;
  caseStudy?: CaseStudy;
  /**
   * Which synced screenshots to show in the featured block (indexes into
   * store-data.json), and whether they are raw app screens (framed in a phone)
   * or store marketing art that already has its own device frame.
   */
  screens?: { shots: number[]; framed: boolean };
}

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";

export interface Role {
  title: string;
  company: string;
  companyUrl?: string;
  start: string; // "2024-08"
  end: string | null; // null = present
  /** Free text so a change mid-role can be explained, e.g. "Part-time, full-time since Oct 2026". */
  type: string;
  location: string;
  achievements: string[];
  /** A short note under the role, e.g. concurrent contract work. */
  note?: string;
  todo?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  country: string;
  source: "Fiverr" | "Upwork" | "Direct" | "LinkedIn";
  rating: number;
  text: string;
  /** For featured reviews: an exact excerpt of `text`, shown large. */
  pull?: string;
  /** Featured reviews render large, in this order. */
  featured?: number;
}

export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}
