import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience", hideOnSmall: true },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 bg-paper">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-[1.0625rem] font-semibold tracking-tight text-ink transition-colors hover:text-accent"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-2.5 py-2 text-[0.9375rem] text-muted transition-colors hover:text-ink ${
                item.hideOnSmall ? "hidden sm:block" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
