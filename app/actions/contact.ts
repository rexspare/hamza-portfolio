"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; message: string; fields?: Partial<Record<"name" | "email" | "message", string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort throttle per IP. It resets on cold starts; the honeypot and
// Resend's own limits do the rest. Swap for Upstash/Vercel KV if spam shows up.
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

export async function sendContact(_: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real people never see or fill this field.
  if (String(form.get("company") ?? "").length > 0) return { status: "sent" };

  const name = String(form.get("name") ?? "").trim().slice(0, 120);
  const email = String(form.get("email") ?? "").trim().slice(0, 200);
  const message = String(form.get("message") ?? "").trim().slice(0, 5000);

  const fields: Partial<Record<"name" | "email" | "message", string>> = {};
  if (!name) fields.name = "Please add your name.";
  if (!EMAIL_RE.test(email)) fields.email = "Please use a valid email so I can reply.";
  if (message.length < 10) fields.message = "A sentence or two about the project, please.";
  if (Object.keys(fields).length) return { status: "error", message: "Check the highlighted fields.", fields };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    return { status: "error", message: `Too many messages in a short time. Email me directly at ${site.email}.` };
  }
  recent.set(ip, [...hits, now]);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error", message: `The form isn't connected yet. Email me directly at ${site.email}.` };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Until a domain is verified in Resend, onboarding@resend.dev is the only allowed sender.
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: email,
      subject: `Portfolio: message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  }).catch(() => null);

  if (!res?.ok) {
    return { status: "error", message: `Something went wrong sending that. Email me directly at ${site.email}.` };
  }
  return { status: "sent" };
}
