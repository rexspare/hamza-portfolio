import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { getMoreApps, getStore, getWebsites, platformLabel, primaryLink, storeBadges } from "@/lib/content";
import { AppIcon } from "@/components/ui";
import { ShowAllToggle } from "@/components/show-all-toggle";

/** Apps shown before "Show all": three full rows on desktop. Keep in sync with
 *  the `nth-child(n + 10)` rule for [data-collapsible] in globals.css. */
const INITIAL_APPS = 9;

export function MoreApps() {
  const apps = getMoreApps();
  return (
    <section aria-labelledby="more-apps" className="container-page pb-[clamp(5rem,3.5rem+6vw,9rem)]">
      <div data-reveal className="mb-10 flex items-end justify-between gap-6 border-b border-rule pb-5">
        <h2 id="more-apps" className="text-h3 text-ink">
          More apps
        </h2>
        <p className="font-mono text-meta text-muted">{apps.length} apps</p>
      </div>
      <ul
        id="more-apps-list"
        data-collapsible
        className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {apps.map((p) => (
          <IndexRow key={p.slug} project={p} />
        ))}
      </ul>
      {apps.length > INITIAL_APPS && (
        <ShowAllToggle targetId="more-apps-list" total={apps.length} visible={INITIAL_APPS} />
      )}
    </section>
  );
}

export function Websites() {
  const sites = getWebsites();
  return (
    <section aria-labelledby="websites" className="container-page">
      <div data-reveal className="mb-10 flex items-end justify-between gap-6 border-b border-rule pb-5">
        <div>
          <h2 id="websites" className="text-h3 text-ink">
            Websites and web apps
          </h2>
          <p className="mt-2 text-[0.9375rem] text-muted">Front-end work in React and Next.js, beyond the dashboards in the case studies above.</p>
        </div>
        <p className="font-mono text-meta text-muted">{sites.length} sites</p>
      </div>
      <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((p) => (
          <IndexRow key={p.slug} project={p} />
        ))}
      </ul>
    </section>
  );
}

function IndexRow({ project }: { project: Project }) {
  const store = getStore(project.slug);
  const link = primaryLink(project);
  const badges = storeBadges(project.slug);
  const isSite = project.kind === "website";

  const meta = isSite
    ? link?.label
    : link
      ? platformLabel(project.platforms)
      : `${platformLabel(project.platforms)} · no longer listed`;

  const body = (
    <>
      {!isSite && <AppIcon icon={store?.icon} name={project.name} size={44} />}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <span className="truncate">{project.name}</span>
          {link && (
            <ArrowUpRight
              aria-hidden
              strokeWidth={2}
              className="size-3.5 shrink-0 text-muted opacity-0 transition-[opacity,translate] duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          )}
        </span>
        <span className="mt-1 block text-[0.9375rem] leading-snug text-muted">{project.tagline}</span>
        <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-meta text-muted">
          {isSite && project.stack && <span className="text-ink-2">{project.stack.join(" · ")}</span>}
          <span>{meta}</span>
          {badges.map((b) => (
            <span key={b} className="text-accent">
              {b}
            </span>
          ))}
        </span>
      </span>
    </>
  );

  return (
    <li data-reveal className="border-b border-rule">
      {link ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group -mx-3 flex gap-4 rounded-xl px-3 py-5 transition-colors hover:bg-paper-sunk/70"
        >
          {body}
          <span className="sr-only">(opens {link.label} in a new tab)</span>
        </a>
      ) : (
        <div className="flex gap-4 py-5">{body}</div>
      )}
    </li>
  );
}
