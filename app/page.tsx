import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { Hero } from "@/components/home/hero";
import { FeaturedWork } from "@/components/home/featured-work";
import { MoreApps, Websites } from "@/components/home/app-index";
import { Experience } from "@/components/home/experience";
import { Testimonials } from "@/components/home/testimonials";
import { Skills } from "@/components/home/skills";
import { Contact } from "@/components/home/contact";

export default function Home() {
  const current = experience.find((r) => r.end === null);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: `${site.title}, ${site.specialty}`,
    description: site.description,
    url: site.url,
    image: `${site.url}${site.portrait.src}`,
    email: `mailto:${site.email}`,
    sameAs: [site.links.linkedin, site.links.github],
    ...(current && { worksFor: { "@type": "Organization", name: current.company, url: current.companyUrl } }),
    alumniOf: { "@type": "CollegeOrUniversity", name: site.education.schoolFull, url: site.education.url },
    knowsAbout: [
      "React Native",
      "React",
      "Next.js",
      "TypeScript",
      "iOS development",
      "Android development",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
    ],
  };

  return (
    <>
      <Hero />
      <FeaturedWork />
      <MoreApps />
      <Websites />
      <Experience />
      <Testimonials />
      <Skills />
      <Contact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
