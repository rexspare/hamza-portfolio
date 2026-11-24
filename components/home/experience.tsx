import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function duration(start: string, end: string | null) {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end ? end.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo`].filter(Boolean).join(" ");
}

export function Experience() {
  return (
    <section aria-labelledby="experience" className="section-space container-page">
      <SectionHeading id="experience" title="Experience" intro="Since 2020: from React Native intern, to leading a team of eight, to owning a platform across mobile, web and API." />

      <ol className="border-t border-rule">
        {experience.map((role) => (
          <li
            key={`${role.company}-${role.start}`}
            data-reveal
            className="grid gap-4 border-b border-rule py-9 md:grid-cols-[13rem_1fr] md:gap-10 lg:grid-cols-[16rem_1fr]"
          >
            <div className="font-mono text-meta text-muted">
              <p className="text-ink">
                <time dateTime={role.start}>{formatMonth(role.start)}</time> –{" "}
                {role.end ? <time dateTime={role.end}>{formatMonth(role.end)}</time> : "Present"}
              </p>
              <p className="mt-1">{duration(role.start, role.end)}</p>
            </div>

            <div className="max-w-[44rem]">
              <h3 className="font-display text-[1.375rem] leading-tight font-semibold tracking-tight text-ink sm:text-2xl">
                {role.title}
                <span className="text-muted"> · </span>
                {role.companyUrl ? (
                  <a href={role.companyUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
              </h3>
              <p className="mt-1.5 text-[0.9375rem] text-muted">
                {role.type} · {role.location}
              </p>
              <ul className="mt-5 space-y-3">
                {role.achievements.map((a) => (
                  <li key={a} className="relative pl-5 text-ink-2 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2.5 before:bg-rule-strong">
                    {a}
                  </li>
                ))}
              </ul>
              {role.note && <p className="mt-4 text-[0.9375rem] text-muted">{role.note}</p>}
            </div>
          </li>
        ))}
      </ol>

      <p data-reveal className="mt-8 font-mono text-meta text-muted md:pl-[calc(13rem+2.5rem)] lg:pl-[calc(16rem+2.5rem)]">
        Education: {site.education.degree},{" "}
        <a href={site.education.url} target="_blank" rel="noopener noreferrer" className="link text-muted">
          <abbr title={site.education.schoolFull} className="no-underline">
            {site.education.school}
          </abbr>
        </a>
        , {site.education.years}
      </p>
    </section>
  );
}
