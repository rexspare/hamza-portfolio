"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TechIcon } from "@/app/components/TechIcon";
import { ArrowUpRight, Globe, Smartphone } from "lucide-react";
import { AppStatsBadge } from "@/app/components/AppStatsBadge";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { Reveal } from "@/app/components/ui/Reveal";
import { partitionProjects, sortAppsByStats } from "@/app/lib/project-sort";
import { collectStoreUrls, isStoreUrl } from "@/app/lib/store-url";
import { DURATION, EASE_OUT } from "@/app/lib/motion";
import type { AppStatsMap } from "@/app/types/app-stats";
import type { Project } from "@/app/types/portfolio";

const INITIAL_APP_COUNT = 12;

interface ProjectsProps {
  projects: Project[];
}

function ProjectCard({
  project,
  idx,
  stat,
  statsLoading,
}: {
  project: Project;
  idx: number;
  stat?: AppStatsMap[string];
  statsLoading: boolean;
}) {
  const isStoreListing = isStoreUrl(project.url);

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: DURATION.slow, delay: (idx % 6) * 0.04, ease: EASE_OUT }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className="surface-card surface-card-interactive group relative block rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-1 font-medium text-foreground transition-colors duration-200 group-hover:text-accent-muted">
          {project.name}
        </h3>
        <ArrowUpRight
          className="size-4 shrink-0 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          strokeWidth={1.75}
        />
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <AppStatsBadge
        stat={stat}
        loading={statsLoading && isStoreListing}
        isStoreLink={isStoreListing}
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {project.languages.slice(0, 4).map((lang) => (
          <span
            key={lang.name}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted"
          >
            <TechIcon icon={lang.iconifyClass} className="text-sm" />
            <span className="max-w-[88px] truncate">{lang.name}</span>
          </span>
        ))}
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-5 bottom-0 h-px scale-x-0 bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-300 group-hover:scale-x-100"
      />
    </motion.a>
  );
}

function ProjectGrid({
  items,
  stats,
  statsLoading,
}: {
  items: Project[];
  stats: AppStatsMap;
  statsLoading: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((project, idx) => (
        <ProjectCard
          key={project.id}
          project={project}
          idx={idx}
          stat={stats[project.url]}
          statsLoading={statsLoading}
        />
      ))}
    </div>
  );
}

function ProjectSubsection({
  id,
  title,
  description,
  icon: IconComponent,
  children,
}: {
  id: string;
  title: string;
  description: string;
  icon: typeof Smartphone;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <Reveal className="mb-8 flex items-start gap-4">
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
          <IconComponent className="size-4 text-foreground" strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        </div>
      </Reveal>
      {children}
    </div>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const [showAllApps, setShowAllApps] = useState(false);
  const [stats, setStats] = useState<AppStatsMap>({});
  const [statsLoading, setStatsLoading] = useState(true);

  const { apps, websites } = useMemo(() => partitionProjects(projects), [projects]);
  const sortedApps = useMemo(() => sortAppsByStats(apps, stats), [apps, stats]);
  const storeUrls = useMemo(() => collectStoreUrls(apps), [apps]);

  useEffect(() => {
    if (storeUrls.length === 0) {
      setStatsLoading(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    async function fetchStats(isRefresh: boolean) {
      try {
        const response = await fetch("/api/app-stats", {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          body: JSON.stringify({ urls: storeUrls }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Failed to load app stats");

        const data = (await response.json()) as { stats: AppStatsMap };
        if (!cancelled) setStats(data.stats ?? {});
      } catch (error) {
        if (cancelled || (error instanceof DOMException && error.name === "AbortError")) return;
        if (!isRefresh) setStats({});
      } finally {
        if (!cancelled) setStatsLoading(false);
      }
    }

    fetchStats(false);

    const refreshIfVisible = () => {
      if (document.visibilityState === "visible") fetchStats(true);
    };
    const interval = window.setInterval(refreshIfVisible, 5 * 60 * 1000);
    document.addEventListener("visibilitychange", refreshIfVisible);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshIfVisible);
    };
  }, [storeUrls]);

  const visibleApps = showAllApps ? sortedApps : sortedApps.slice(0, INITIAL_APP_COUNT);
  const hasMoreApps = sortedApps.length > INITIAL_APP_COUNT;
  const remainingAppCount = sortedApps.length - INITIAL_APP_COUNT;

  return (
    <section id="projects" className="section-padding relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <SectionHeader
          label="Selected Work"
          title="Projects"
          description="Production mobile apps and web products built with React Native and a modern full-stack toolchain."
        />

        <div className="space-y-16">
          {apps.length > 0 && (
            <ProjectSubsection
              id="apps"
              title="Mobile Apps"
              description={
                statsLoading
                  ? "Loading live store stats and ranking by downloads and rating."
                  : "Ranked by Play Store downloads and App Store ratings."
              }
              icon={Smartphone}
            >
              <ProjectGrid items={visibleApps} stats={stats} statsLoading={statsLoading} />

              {hasMoreApps && (
                <Reveal className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllApps((prev) => !prev)}
                    className="cursor-pointer rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-muted transition-colors duration-200 hover:border-border-hover hover:bg-surface-hover hover:text-foreground"
                  >
                    {showAllApps ? "Show fewer apps" : `+${remainingAppCount} more apps`}
                  </button>
                </Reveal>
              )}
            </ProjectSubsection>
          )}

          {websites.length > 0 && (
            <ProjectSubsection
              id="websites"
              title="Websites"
              description="Web platforms, storefronts, and digital products."
              icon={Globe}
            >
              <ProjectGrid items={websites} stats={stats} statsLoading={false} />
            </ProjectSubsection>
          )}
        </div>
      </div>
    </section>
  );
}
