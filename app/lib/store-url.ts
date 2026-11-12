import type { StorePlatform } from "@/app/types/app-stats";

export interface ParsedStoreUrl {
  platform: StorePlatform;
  appId: string;
  country?: string;
  url: string;
}

export function isStoreUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return hostname.includes("play.google.com") || hostname.includes("apps.apple.com");
  } catch {
    return false;
  }
}

export function parseStoreUrl(url: string): ParsedStoreUrl | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("play.google.com")) {
      const appId = parsed.searchParams.get("id");
      if (!appId) return null;
      return { platform: "google-play", appId, url };
    }

    if (parsed.hostname.includes("apps.apple.com")) {
      const idMatch = parsed.pathname.match(/\/id(\d+)/);
      if (!idMatch) return null;

      const countryMatch = parsed.pathname.match(/^\/([a-z]{2})\//i);
      const country = countryMatch?.[1]?.toLowerCase() ?? "us";

      return {
        platform: "app-store",
        appId: idMatch[1],
        country,
        url,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function collectStoreUrls(projects: { url: string }[]): string[] {
  return [...new Set(projects.map((project) => project.url).filter(isStoreUrl))];
}
