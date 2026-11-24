import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="container-page flex flex-col gap-3 py-8 font-mono text-meta text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="flex gap-5">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
            LinkedIn
          </a>
          <a href="#main" className="transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </p>
      </div>
    </footer>
  );
}
