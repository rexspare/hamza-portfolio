"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** The email address as a mailto link, with a button that copies it and confirms. */
export function CopyEmail({ email, className = "", large }: { email: string; className?: string; large?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  const iconSize = large ? "size-5 sm:size-6" : "size-3.5";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <a
        href={`mailto:${email}`}
        className="underline decoration-rule-strong decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-accent [overflow-wrap:anywhere]"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className={`relative grid shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-paper-sunk hover:text-ink ${
          large ? "size-11 sm:size-12" : "size-7"
        }`}
        aria-label={copied ? "Email address copied" : "Copy email address"}
      >
        <Copy
          aria-hidden
          strokeWidth={1.75}
          className={`${iconSize} transition-[opacity,scale] duration-200 ${copied ? "scale-50 opacity-0" : ""}`}
        />
        <Check
          aria-hidden
          strokeWidth={2.25}
          className={`${iconSize} absolute text-accent transition-[opacity,scale] duration-300 ease-[var(--ease-spring)] ${
            copied ? "" : "scale-50 opacity-0"
          }`}
        />
        <span
          role="status"
          className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-ink px-2 py-0.5 font-sans text-xs font-medium whitespace-nowrap text-paper transition-[opacity,translate] duration-200 ${
            copied ? "opacity-100" : "translate-y-1 opacity-0"
          }`}
        >
          {copied ? "Copied" : ""}
        </span>
      </button>
    </span>
  );
}
