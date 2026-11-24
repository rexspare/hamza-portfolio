import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/content/site";
import { getProject, getStore } from "@/lib/content";
import { Button, Phone } from "@/components/ui";
import { CopyEmail } from "@/components/copy-email";

// Fan geometry, as % of the composition width. Phones are 9:19.5.
const FAN = [
  { left: "1%", top: "10%", rotate: "-6deg", z: 10 },
  { left: "30%", top: "0%", rotate: "0deg", z: 20 },
  { left: "59%", top: "10%", rotate: "6deg", z: 10 },
];

export function Hero() {
  const phones = site.heroPhones
    .map(({ slug, shot }) => ({ project: getProject(slug), shot: getStore(slug)?.screenshots[shot] }))
    .filter((p) => p.project && p.shot);

  return (
    <section aria-labelledby="hero-title" className="container-page pt-10 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <h1 id="hero-title" className="text-ink">
            <span className="mb-5 block font-display text-xl font-medium tracking-tight text-muted sm:text-2xl">
              {site.name}
            </span>
            <span className="block text-hero">{site.title}</span>
            <span className="mt-4 block font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-tight font-medium tracking-[-0.02em] text-accent">
              {site.specialty}
            </span>
          </h1>

          <p className="mt-7 max-w-[36ch] text-lead text-ink-2">{site.value}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {site.bookingUrl && (
              <Button href={site.bookingUrl} external>
                Book a call
              </Button>
            )}
            <Button
              href={`mailto:${site.email}`}
              variant={site.bookingUrl ? "secondary" : "primary"}
              icon={<Mail aria-hidden className="size-4" strokeWidth={2} />}
            >
              Email me
            </Button>
            <Button
              href={site.resumeUrl}
              variant="secondary"
              external
              icon={
                <ArrowUpRight
                  aria-hidden
                  className="size-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              }
            >
              Resume
            </Button>
          </div>

          <p className="mt-5 text-[0.9375rem] text-muted">
            <CopyEmail email={site.email} />
          </p>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-rule pt-6">
            {site.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-sm leading-snug text-muted">{s.label}</dt>
                <dd className="font-display text-[2rem] leading-none font-semibold tracking-tight text-ink sm:text-[2.5rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-[1/0.98] w-full max-w-[25rem] sm:max-w-[30rem] lg:max-w-[34rem]">
          {phones.map(({ project, shot }, i) => (
            <Phone
              key={project!.slug}
              shot={shot!}
              alt={`${project!.name} app screen`}
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 192px, 40vw"
              priority={i === 1}
              className="hero-phone absolute w-[40%]"
              style={
                {
                  left: FAN[i].left,
                  top: FAN[i].top,
                  rotate: FAN[i].rotate,
                  zIndex: FAN[i].z,
                  "--i": i === 1 ? 0 : i === 0 ? 1 : 2,
                } as React.CSSProperties
              }
            />
          ))}
          <figure className="hero-stamp absolute bottom-[-2%] left-[-3%] z-30 w-[27%] -rotate-[5deg] bg-paper-raised p-[2.5%] pb-[7%] shadow-[var(--stamp-shadow)] sm:left-[-6%]">
            <Image
              src={site.portrait.src}
              alt={site.portrait.alt}
              width={180}
              height={180}
              sizes="(min-width: 1024px) 140px, 25vw"
              className="aspect-square w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
