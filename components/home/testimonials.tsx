import { testimonials } from "@/content/testimonials";
import type { Testimonial } from "@/content/types";
import { SectionHeading } from "@/components/ui";

/** Reviews longer than this are clamped in the strip, with a native toggle to expand. */
const LONG = 300;

/** Wrap an excerpt in ellipses where it doesn't start or end the original review. */
function excerpt(t: Testimonial) {
  const pull = t.pull ?? t.text;
  const at = t.text.indexOf(pull);
  const lead = at > 0 ? "…" : "";
  const tail = at >= 0 && at + pull.length < t.text.length && !/[.!?]$/.test(pull) ? "…" : "";
  return `${lead}${pull}${tail}`;
}

function Attribution({ t }: { t: Testimonial }) {
  return (
    <figcaption className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-meta text-muted">
      <span className="text-ink">{t.author}</span>
      <span aria-hidden>·</span>
      <span>{t.country}</span>
      <span aria-hidden>·</span>
      <span>
        {t.source}, <span aria-label={`rated ${t.rating} out of 5`}>★&nbsp;{t.rating.toFixed(1)}</span>
      </span>
    </figcaption>
  );
}

export function Testimonials() {
  const featured = testimonials.filter((t) => t.featured != null).sort((a, b) => a.featured! - b.featured!);
  const rest = testimonials.filter((t) => t.featured == null);
  const [lead, ...side] = featured;

  return (
    <section aria-labelledby="testimonials" className="section-space bg-paper-raised">
      <div className="container-page">
        <SectionHeading
          id="testimonials"
          title="What clients say"
          intro={`${testimonials.length} reviews from clients in ${new Set(testimonials.map((t) => t.country)).size} countries.`}
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {lead && (
            <figure data-reveal className="lg:col-span-7">
              <blockquote>
                <p className="font-display text-[clamp(1.75rem,1.3rem+1.9vw,2.75rem)] leading-[1.12] font-medium tracking-[-0.02em] text-ink">
                  <span aria-hidden className="text-accent">“</span>
                  {excerpt(lead)}
                  <span aria-hidden className="text-accent">”</span>
                </p>
                {lead.pull && <p className="mt-6 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted">{lead.text}</p>}
              </blockquote>
              <Attribution t={lead} />
            </figure>
          )}

          <div className="flex flex-col gap-12 lg:col-span-5 lg:border-l lg:border-rule lg:pl-12">
            {side.map((t, i) => (
              <figure key={t.id} data-reveal style={{ "--reveal-i": i + 1 } as React.CSSProperties}>
                <blockquote>
                  <p className="text-lg leading-relaxed text-ink">“{t.text}”</p>
                </blockquote>
                <Attribution t={t} />
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div data-reveal className="mt-20 sm:mt-24">
        <div className="container-page mb-5 flex items-center justify-between gap-4">
          <p className="font-mono text-meta text-muted">More reviews · scroll</p>
        </div>
        <ul
          tabIndex={0}
          aria-label="More client reviews"
          className="scroll-strip flex items-start snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [padding-inline:max(clamp(1.25rem,4.5vw,3rem),calc((100vw-76rem)/2+clamp(1.25rem,4.5vw,3rem)))] [scroll-padding-inline:max(clamp(1.25rem,4.5vw,3rem),calc((100vw-76rem)/2+clamp(1.25rem,4.5vw,3rem)))]"
        >
          {rest.map((t) => (
            <li key={t.id} className="w-[min(20rem,80vw)] shrink-0 snap-start border-t border-rule pt-5">
              <figure>
                <blockquote>
                  <p
                    className={`text-[0.9375rem] leading-relaxed text-ink-2 ${
                      t.text.length > LONG ? "line-clamp-7 [li:has(details[open])_&]:line-clamp-none" : ""
                    }`}
                  >
                    “{t.text}”
                  </p>
                </blockquote>
                {t.text.length > LONG && (
                  <details className="mt-2 text-sm">
                    <summary className="w-fit cursor-pointer list-none font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-accent [&::-webkit-details-marker]:hidden">
                      <span className="[details[open]_&]:hidden">Read the full review</span>
                      <span className="hidden [details[open]_&]:inline">Show less</span>
                    </summary>
                  </details>
                )}
                <Attribution t={t} />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
