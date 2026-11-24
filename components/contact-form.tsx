"use client";

import { useActionState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { sendContact, type ContactState } from "@/app/actions/contact";

const field =
  "mt-2 block w-full rounded-xl border border-rule-strong bg-paper px-4 py-3 text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 hover:border-muted focus:border-ink focus:shadow-[0_0_0_3px_var(--selection)] focus:outline-none aria-[invalid=true]:border-accent";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const errors = state.status === "error" ? state.fields ?? {} : {};

  if (state.status === "sent") {
    return (
      <div role="status" className="flex items-start gap-4 rounded-2xl bg-paper-sunk p-6">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
          <Check aria-hidden className="size-5" strokeWidth={2.5} />
        </span>
        <div>
          <p className="font-medium text-ink">Thanks, your message is on its way.</p>
          <p className="mt-1 text-[0.9375rem] text-muted">I&apos;ll reply to the email address you gave.</p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Name
          <input
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
            className={field}
          />
          {errors.name && (
            <span id="err-name" className="mt-1.5 block text-sm font-normal text-accent">
              {errors.name}
            </span>
          )}
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-email" : undefined}
            className={field}
          />
          {errors.email && (
            <span id="err-email" className="mt-1.5 block text-sm font-normal text-accent">
              {errors.email}
            </span>
          )}
        </label>
      </div>
      <label className="block text-sm font-medium text-ink">
        What are you building?
        <textarea
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "err-message" : undefined}
          className={`${field} resize-y`}
        />
        {errors.message && (
          <span id="err-message" className="mt-1.5 block text-sm font-normal text-accent">
            {errors.message}
          </span>
        )}
      </label>

      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper transition-[opacity,translate] duration-200 hover:opacity-90 active:translate-y-px disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </button>
        <p role="status" aria-live="polite" className="text-sm text-accent">
          {state.status === "error" && !Object.keys(errors).length ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
