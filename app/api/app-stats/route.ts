import { NextResponse } from "next/server";
import { app as iosApp } from "@perttu/app-store-scraper";
import { fetchGooglePlayStats } from "@/app/lib/google-play";
import { parseStoreUrl } from "@/app/lib/store-url";
import type { AppStatEntry, AppStatsMap } from "@/app/types/app-stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

async function fetchPlayStats(appId: string): Promise<AppStatEntry> {
  const data = await fetchGooglePlayStats(appId);

  return {
    platform: "google-play",
    appId,
    rating: data.rating,
    ratingCount: data.ratingCount,
    downloads: data.downloads,
    minInstalls: data.minInstalls,
  };
}

async function fetchAppStoreStats(
  appId: string,
  country: string
): Promise<AppStatEntry> {
  const data = await iosApp({
    id: Number(appId),
    country,
    ratings: true,
  });

  return {
    platform: "app-store",
    appId,
    rating: data.score ?? data.currentVersionScore ?? null,
    ratingCount: data.reviews ?? data.currentVersionReviews ?? null,
    downloads: null,
    minInstalls: null,
  };
}

function emptyStat(
  platform: AppStatEntry["platform"],
  appId: string,
  error: string
): AppStatEntry {
  return {
    platform,
    appId,
    rating: null,
    ratingCount: null,
    downloads: null,
    minInstalls: null,
    error,
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const urls = (body as { urls?: unknown }).urls;

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json(
      { error: "urls must be a non-empty array" },
      { status: 400 }
    );
  }

  const uniqueUrls = [
    ...new Set(urls.filter((url): url is string => typeof url === "string")),
  ];

  const results = await Promise.all(
    uniqueUrls.map(async (url): Promise<[string, AppStatEntry]> => {
      const parsed = parseStoreUrl(url);

      if (!parsed) {
        return [url, emptyStat("google-play", "", "Unsupported or invalid store URL")];
      }

      try {
        const stats =
          parsed.platform === "google-play"
            ? await fetchPlayStats(parsed.appId)
            : await fetchAppStoreStats(parsed.appId, parsed.country ?? "us");

        return [url, stats];
      } catch (error) {
        return [
          url,
          emptyStat(
            parsed.platform,
            parsed.appId,
            error instanceof Error ? error.message : "Failed to fetch stats"
          ),
        ];
      }
    })
  );

  const stats: AppStatsMap = Object.fromEntries(results);

  return NextResponse.json(
    { stats, fetchedAt: new Date().toISOString() },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
