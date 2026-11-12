import { isStoreUrl } from "@/app/lib/store-url";
import type { AppStatEntry, AppStatsMap } from "@/app/types/app-stats";
import type { Project } from "@/app/types/portfolio";

const PINNED_APP_URLS = [
  "https://apps.apple.com/us/app/acheev-performance-app/id1636595346",
  "https://play.google.com/store/apps/details?id=com.interveen.app",
];

const FEATURED_WEBSITE_URL = "https://3d-portfolio.hamzazafar.online/";

function pinnedAppRank(project: Project): number {
  const index = PINNED_APP_URLS.indexOf(project.url);
  return index === -1 ? PINNED_APP_URLS.length : index;
}

function isFeaturedWebsite(project: Project): boolean {
  return normalizeUrl(project.url) === normalizeUrl(FEATURED_WEBSITE_URL);
}

function normalizeUrl(url: string): string {
  return url.replace(/\/$/, "");
}

function parseInstallsFromLabel(downloads: string | null): number {
  if (!downloads) return 0;
  const digits = downloads.replace(/[^\d]/g, "");
  const value = Number.parseInt(digits, 10);
  return Number.isNaN(value) ? 0 : value;
}

function getSortScore(stat: AppStatEntry | undefined): [number, number, number] {
  const installs =
    stat?.minInstalls ?? parseInstallsFromLabel(stat?.downloads ?? null);
  const rating = stat?.rating ?? 0;
  const ratingCount = stat?.ratingCount ?? 0;

  return [installs, rating, ratingCount];
}

export function partitionProjects(projects: Project[]) {
  const apps: Project[] = [];
  const websites: Project[] = [];

  for (const project of projects) {
    if (isStoreUrl(project.url)) {
      apps.push(project);
    } else {
      websites.push(project);
    }
  }

  return { apps, websites: sortWebsites(websites) };
}

export function sortWebsites(websites: Project[]): Project[] {
  return [...websites].sort((a, b) => {
    const aFeatured = isFeaturedWebsite(a);
    const bFeatured = isFeaturedWebsite(b);

    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;

    return 0;
  });
}

export function sortAppsByStats(
  apps: Project[],
  stats: AppStatsMap
): Project[] {
  return [...apps].sort((a, b) => {
    const rankA = pinnedAppRank(a);
    const rankB = pinnedAppRank(b);

    if (rankA !== rankB) return rankA - rankB;

    const scoreA = getSortScore(stats[a.url]);
    const scoreB = getSortScore(stats[b.url]);

    for (let i = 0; i < scoreA.length; i++) {
      if (scoreB[i] !== scoreA[i]) {
        return scoreB[i] - scoreA[i];
      }
    }

    return a.name.localeCompare(b.name);
  });
}
