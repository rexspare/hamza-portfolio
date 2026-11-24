import { site } from "@/content/site";
import { ArrowLink } from "@/components/ui";
import { CopyEmail } from "@/components/copy-email";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  const primary = [
    site.bookingUrl && { label: "Book a 30-minute call", href: site.bookingUrl },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "GitHub", href: site.links.github },
    { label: "Resume (PDF)", href: site.resumeUrl },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <section aria-labelledby="contact" className="section-space container-page">
      <div data-reveal>
        <h2 id="contact" className="text-h2 text-ink">
          Contact
        </h2>
        <p className="mt-5 max-w-xl text-lead text-muted">
          Hiring for a mobile or full-stack role, or need an app or web product built or rescued? Email is fastest.
        </p>
        <p className="mt-10 font-display text-[clamp(1.25rem,0.2rem+5vw,4rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
          <CopyEmail email={site.email} large />
        </p>
      </div>

      <div className="mt-16 grid gap-14 border-t border-rule pt-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-4">
          <ul className="space-y-4 text-lg">
            {primary.map((l) => (
              <li key={l.label}>
                <ArrowLink href={l.href} external>
                  {l.label}
                </ArrowLink>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.9375rem] text-muted">
            Also on{" "}
            {site.secondaryLinks.map((l, i) => (
              <span key={l.label}>
                {i > 0 && " and "}
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link text-muted">
                  {l.label}
                </a>
              </span>
            ))}
            .
          </p>
          <p className="mt-2 text-[0.9375rem] text-muted">{site.locationLine}</p>
        </div>

        <div data-reveal style={{ "--reveal-i": 1 } as React.CSSProperties} className="lg:col-span-8">
          <h3 className="sr-only">Send a message</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
