import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { StoreImage } from "@/lib/content";

/* ─── Section heading ──────────────────────────────────────────────────── */

export function SectionHeading({
  id,
  title,
  intro,
  aside,
}: {
  id: string;
  title: string;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div data-reveal className="mb-12 flex flex-col gap-4 sm:mb-16 md:flex-row md:items-end md:justify-between md:gap-12">
      <div className="max-w-2xl">
        <h2 id={id} className="text-h2 text-ink">
          {title}
        </h2>
        {intro && <p className="mt-5 text-lead text-muted">{intro}</p>}
      </div>
      {aside && <div className="shrink-0 font-mono text-meta text-muted">{aside}</div>}
    </div>
  );
}

/* ─── Buttons ──────────────────────────────────────────────────────────── */

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  icon?: React.ReactNode;
};

export function Button({ href, children, variant = "primary", external, icon }: ButtonProps) {
  const base =
    "group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium transition-[background-color,color,box-shadow,translate] duration-200 active:translate-y-px";
  const styles =
    variant === "primary"
      ? "bg-accent text-on-accent hover:bg-accent-hover"
      : "text-ink shadow-[inset_0_0_0_1px_var(--rule-strong)] hover:shadow-[inset_0_0_0_1px_var(--ink)]";
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} className={`${base} ${styles}`} {...props}>
      {children}
      {icon}
    </a>
  );
}

/* ─── Text link with arrow ─────────────────────────────────────────────── */

export function ArrowLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <span className="underline decoration-rule-strong decoration-1 underline-offset-[0.22em] transition-colors group-hover:decoration-accent">
        {children}
      </span>
      <ArrowUpRight
        aria-hidden
        strokeWidth={2}
        className={`size-4 shrink-0 text-muted transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent ${
          external ? "" : "rotate-45"
        }`}
      />
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </>
  );
  const cls = `group inline-flex items-center gap-1.5 font-medium text-ink ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/* ─── App icon ─────────────────────────────────────────────────────────── */

export function AppIcon({ icon, name, size }: { icon: StoreImage | null | undefined; name: string; size: number }) {
  const radius = { borderRadius: size * 0.225, width: size, height: size };
  if (!icon) {
    return (
      <span
        aria-hidden
        style={radius}
        className="grid shrink-0 self-start place-items-center bg-paper-sunk font-display text-muted shadow-[inset_0_0_0_1px_var(--rule)]"
      >
        {name.charAt(0)}
      </span>
    );
  }
  return (
    <Image
      src={icon.src}
      alt=""
      width={size}
      height={size}
      style={radius}
      className="shrink-0 self-start object-cover shadow-[0_0_0_1px_var(--rule)]"
    />
  );
}

/* ─── Phone frame ──────────────────────────────────────────────────────── */

export function Phone({
  shot,
  alt,
  sizes,
  priority,
  className = "",
  style,
}: {
  shot: StoreImage;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`phone ${className}`} style={style}>
      <div className="phone-body">
        <div className="phone-screen" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
          <Image src={shot.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </div>
      </div>
    </div>
  );
}
