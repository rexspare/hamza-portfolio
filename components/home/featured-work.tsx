import Image from "next/image";
import type { Project } from "@/content/types";
import {
  getFeatured,
  getStore,
  isTodo,
  platformLabel,
  primaryLink,
  realResults,
  screenshotsFor,
  storeBadges,
} from "@/lib/content";
import { AppIcon, ArrowLink, Phone, SectionHeading } from "@/components/ui";

export function FeaturedWork() {
  const featured = getFeatured();
  return (
    <section aria-labelledby="work" className="section-space container-page">
      <SectionHeading
        id="work"
        title="Work"
        intro="Four products across mobile, web and backend, from the first commit to release. Each links to a longer write-up of how it was built."
      />
      <div className="flex flex-col gap-24 sm:gap-32">
        {featured.map((project, i) => (
          <FeaturedBlock key={project.slug} project={project} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function FeaturedBlock({ project, flip }: { project: Project; flip: boolean }) {
  const cs = project.caseStudy!;
  const store = getStore(project.slug);
  const badges = storeBadges(project.slug);
  const results = realResults(cs.results).slice(0, 2);
  const link = primaryLink(project);
  const titleId = `work-${project.slug}`;

  return (
    <article aria-labelledby={titleId} className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
      <div data-reveal className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-4">
          <AppIcon icon={store?.icon} name={project.name} size={56} />
          <div className="min-w-0">
            <h3 id={titleId} className="text-h3 text-ink">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-meta text-muted">
              {platformLabel(project.platforms)}
              {!isTodo(cs.timeline) && <> · {cs.timeline}</>}
            </p>
          </div>
        </div>

        <p className="mt-7 text-ink-2">{cs.summary}</p>

        {!isTodo(cs.role) && (
          <p className="mt-4 text-[0.9375rem] text-muted">
            <span className="text-ink">Role:</span> {cs.role}
          </p>
        )}

        <ul className="mt-8 space-y-5 border-t border-rule pt-6">
          {cs.decisions.slice(0, 3).map((d) => (
            <li key={d.title}>
              <p className="font-medium text-ink">{d.title}</p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{d.body}</p>
            </li>
          ))}
        </ul>

        {(results.length > 0 || badges.length > 0) && (
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
            {results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse justify-end gap-1.5">
                <dt className="text-sm leading-snug text-muted">{r.label}</dt>
                <dd className="font-display text-[2rem] leading-none font-semibold tracking-tight text-accent">
                  {r.value}
                </dd>
              </div>
            ))}
            {badges.length > 0 && (
              <div className="col-span-2 flex flex-col-reverse justify-end gap-1.5">
                <dt className="text-sm text-muted">on Google Play</dt>
                <dd className="font-display text-[2rem] leading-none font-semibold tracking-tight text-accent">
                  {badges.join(" · ")}
                </dd>
              </div>
            )}
          </dl>
        )}

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ArrowLink href={`/work/${project.slug}`}>
            Read the case study<span className="sr-only"> for {project.name}</span>
          </ArrowLink>
          {link && (
            <ArrowLink href={link.href} external className="text-muted">
              {link.label}
            </ArrowLink>
          )}
        </div>
      </div>

      <div data-reveal style={{ "--reveal-i": 1 } as React.CSSProperties} className={`lg:sticky lg:top-24 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        <Visual project={project} />
      </div>
    </article>
  );
}

/** Tinted plate holding the project's screens, its marketing art, or (for private products) its modules. */
function Visual({ project }: { project: Project }) {
  const cs = project.caseStudy!;
  const shots = screenshotsFor(project);
  const plate = {
    backgroundColor: `color-mix(in oklab, ${cs.tint} var(--plate-mix), var(--paper-sunk))`,
  };

  if (shots.length > 0 && project.screens?.framed) {
    return (
      <div style={plate} className="group/plate flex items-start justify-center gap-[4%] overflow-hidden rounded-[1.75rem] px-[6%] pt-[9%] pb-0 sm:rounded-[2.25rem]">
        {shots.slice(0, 3).map((shot, i) => (
          <Phone
            key={shot.src}
            shot={shot}
            alt={`${project.name} screen ${i + 1}`}
            sizes="(min-width: 1024px) 200px, 28vw"
            className={`w-[30%] shrink-0 transition-transform duration-700 ease-[var(--ease-out-expo)] ${
              i === 1 ? "-mb-[4%] group-hover/plate:-translate-y-2" : "mt-[10%] -mb-[14%] group-hover/plate:-translate-y-1"
            }`}
          />
        ))}
      </div>
    );
  }

  if (shots.length > 0) {
    return (
      <div style={plate} className="group/plate flex items-start justify-center gap-[3%] overflow-hidden rounded-[1.75rem] px-[5%] pt-[7%] pb-0 sm:rounded-[2.25rem]">
        {shots.slice(0, 3).map((shot, i) => (
          <div
            key={shot.src}
            className={`relative w-[31%] shrink-0 overflow-hidden rounded-[0.9rem] shadow-[var(--phone-shadow)] transition-transform duration-700 ease-[var(--ease-out-expo)] ${
              i === 1 ? "-mb-[3%] group-hover/plate:-translate-y-2" : "mt-[9%] -mb-[12%] group-hover/plate:-translate-y-1"
            }`}
            style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
          >
            <Image src={shot.src} alt={`${project.name} store screenshot ${i + 1}`} fill sizes="(min-width: 1024px) 210px, 30vw" className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  // No public screens: show what the product is made of.
  return (
    <div style={plate} className="rounded-[1.75rem] p-7 sm:rounded-[2.25rem] sm:p-12">
      <p className="font-mono text-meta text-muted">What&apos;s inside</p>
      <ol className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {(cs.modules ?? []).map((m, i) => (
          <li key={m} className="flex items-baseline gap-4 border-t border-[color-mix(in_oklab,var(--ink)_12%,transparent)] py-3.5">
            <span className="w-6 shrink-0 font-mono text-meta text-muted tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">{m}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
