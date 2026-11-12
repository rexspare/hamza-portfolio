"use client";

import { Apple, Download, Star } from "lucide-react";
import type { AppStatEntry } from "@/app/types/app-stats";

interface AppStatsBadgeProps {
  stat?: AppStatEntry;
  loading: boolean;
  isStoreLink: boolean;
}

const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function StatsSkeleton() {
  return (
    <div className="mt-3 flex flex-wrap gap-2" aria-hidden="true">
      <div className="h-6 w-[4.5rem] animate-pulse rounded-full bg-surface-hover" />
      <div className="h-6 w-[5.5rem] animate-pulse rounded-full bg-surface-hover" />
    </div>
  );
}

export function AppStatsBadge({ stat, loading, isStoreLink }: AppStatsBadgeProps) {
  if (!isStoreLink && !loading) return null;
  if (loading) return <StatsSkeleton />;
  if (!stat || stat.error) return null;

  const hasRating = stat.rating !== null && stat.rating > 0;
  const hasDownloads = stat.platform === "google-play" && Boolean(stat.downloads);

  if (!hasRating && !hasDownloads) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {hasRating && (
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground">
          <Star className="size-3 fill-amber-300 text-amber-300" strokeWidth={1.75} />
          <span>{stat.rating!.toFixed(1)}</span>
          {stat.ratingCount !== null && stat.ratingCount > 0 && (
            <span className="text-subtle">({compactFormatter.format(stat.ratingCount)})</span>
          )}
        </span>
      )}

      {hasDownloads && (
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground">
          <Download className="size-3 text-muted" strokeWidth={1.75} />
          <span>{stat.downloads}</span>
        </span>
      )}

      {stat.platform === "app-store" && (
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted">
          <Apple className="size-3" strokeWidth={1.75} />
          <span>App Store</span>
        </span>
      )}
    </div>
  );
}
