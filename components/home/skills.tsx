import { skills } from "@/content/skills";
import { SectionHeading } from "@/components/ui";

export function Skills() {
  return (
    <section aria-labelledby="skills" className="section-space container-page">
      <SectionHeading id="skills" title="What I'm hired for" />
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <div key={group.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="border-t border-ink pt-5">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{group.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{group.description}</p>
            <ul className="mt-5 flex flex-wrap gap-x-2 text-[0.9375rem] leading-relaxed text-ink-2 sm:block sm:space-y-1.5">
              {group.items.map((item, j) => (
                <li key={item}>
                  {item}
                  {j < group.items.length - 1 && (
                    <span aria-hidden className="text-rule-strong sm:hidden">
                      {" "}·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
