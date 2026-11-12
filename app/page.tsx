import portfolioData from "../porfolio.json";
import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { Experience } from "@/app/components/Experience";
import { Skills } from "@/app/components/Skills";
import { Projects } from "@/app/components/Projects";
import { Education } from "@/app/components/Education";
import { Achievements } from "@/app/components/Achievements";
import { Testimonials } from "@/app/components/Testimonials";
import { Footer } from "@/app/components/Footer";
import type { PortfolioData } from "@/app/types/portfolio";

const data = portfolioData as PortfolioData;

// Add resume PDF to public folder as resume.pdf, or set an external URL (e.g. Google Drive)
const RESUME_PDF_URL: string | undefined = "https://rxresu.me/hamzazafarrc/hamza-zafar-senior-react-native-engineer";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero
            data={{
              name: data.name,
              title: data.title,
              sub_title: data.sub_title,
              description: data.description,
            }}
            resumeUrl={RESUME_PDF_URL}
          />
          <Experience data={data.experience} />
          <Skills data={data.skills} />
          <Projects projects={data.projects} />
          <Testimonials data={data.testimonials} />
          <Education degrees={data.degrees} />
          <Achievements />
          <Footer
            name={data.name}
            social={data.socialMediaLinks}
            resumeUrl={RESUME_PDF_URL}
          />
        </main>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Hamza Zafar",
            url: "https://hamzazafar.online",
            description:
              "Senior React Native Developer & Full Stack Mobile Engineer. 6+ years building iOS and Android apps with React Native, TypeScript, and Node.js. 50+ production apps shipped.",
            areaServed: "Global",
            donationUrl: "https://hamzazafar.online",
          }),
        }}
      />
    </>
  );
}
