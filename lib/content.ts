import { projects } from "@/content/projects";
import storeData from "@/content/store-data.json";
import type { Metric, Platform, Project } from "@/content/types";

export interface StoreImage {
  src: string;
  width: number;
  height: number;
}

export interface StoreInfo {
  listed: boolean;
  storeName: string | null;
  developer: string | null;
  icon: StoreImage | null;
  screenshots: StoreImage[];
  appStore?: { rating?: number | null; ratingCount?: number | null; listed: boolean };
  playStore?: {
    installs?: string | null;
    minInstalls?: number | null;
    rating?: number | null;
    ratingCount?: number | null;
    listed: boolean;
  };
}

const store = storeData as { generatedAt: string; apps: Record<string, StoreInfo> };

export const storeSnapshotDate = store.generatedAt;

export function getStore(slug: string): StoreInfo | undefined {
  return store.apps[slug];
}

export const isTodo = (value: string | undefined | null) => !value || /^TODO\b/.test(value);

/** Results that have real numbers; TODO placeholders are dropped. */
export const realResults = (results: Metric[]) => results.filter((r) => !isTodo(r.value));

export function getFeatured(): Project[] {
  return projects
    .filter((p) => p.featured != null && p.caseStudy)
    .sort((a, b) => a.featured! - b.featured!);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Non-featured apps, ordered by Play installs, then App Store rating count, then name. Delisted apps go last. */
export function getMoreApps(): Project[] {
  const score = (p: Project) => {
    const s = getStore(p.slug);
    return [s?.listed === false ? 0 : 1, s?.playStore?.minInstalls ?? 0, s?.appStore?.ratingCount ?? 0] as const;
  };
  return projects
    .filter((p) => p.kind === "app" && p.featured == null)
    .sort((a, b) => {
      const sa = score(a);
      const sb = score(b);
      for (let i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return sb[i] - sa[i];
      return a.name.localeCompare(b.name);
    });
}

export function getWebsites(): Project[] {
  return projects.filter((p) => p.kind === "website");
}

const PLATFORM_LABEL: Record<Platform, string> = {
  ios: "iOS",
  android: "Android",
  web: "Web",
  desktop: "Desktop",
};

export const platformLabel = (platforms: Platform[]) => platforms.map((p) => PLATFORM_LABEL[p]).join(" · ");

/** Store badges, only when they're worth showing: 1,000+ installs, or 4.0+ from 10+ ratings. */
export function storeBadges(slug: string): string[] {
  const s = getStore(slug);
  if (!s) return [];
  const badges: string[] = [];
  const installs = s.playStore?.minInstalls ?? 0;
  if (installs >= 1000 && s.playStore?.installs) {
    badges.push(`${compactInstalls(installs)} installs`);
  }
  for (const r of [s.playStore, s.appStore]) {
    if (r?.rating && r.rating >= 4 && (r.ratingCount ?? 0) >= 10) {
      badges.push(`★ ${r.rating.toFixed(1)}`);
      break;
    }
  }
  return badges;
}

function compactInstalls(n: number) {
  if (n >= 1_000_000) return `${n / 1_000_000}M+`;
  if (n >= 1_000) return `${n / 1_000}k+`;
  return `${n}+`;
}

/** The primary outbound link for a project, preferring live store listings. */
export function primaryLink(p: Project): { href: string; label: string } | null {
  const s = getStore(p.slug);
  if (p.links.appStore && s?.appStore?.listed !== false) return { href: p.links.appStore, label: "App Store" };
  if (p.links.playStore && s?.playStore?.listed !== false) return { href: p.links.playStore, label: "Google Play" };
  if (p.links.web) return { href: p.links.web, label: new URL(p.links.web).hostname.replace(/^www\./, "") };
  return null;
}

export function screenshotsFor(p: Project): StoreImage[] {
  const shots = getStore(p.slug)?.screenshots ?? [];
  if (!p.screens) return [];
  return p.screens.shots.map((i) => shots[i]).filter(Boolean);
}
