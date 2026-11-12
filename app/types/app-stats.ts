export type StorePlatform = "google-play" | "app-store";

export interface AppStatEntry {
  platform: StorePlatform;
  appId: string;
  rating: number | null;
  ratingCount: number | null;
  downloads: string | null;
  minInstalls: number | null;
  error?: string;
}

export type AppStatsMap = Record<string, AppStatEntry>;
