#!/usr/bin/env node
/**
 * Downloads app icons, screenshots, ratings and install counts for every
 * project with a store link, and writes them to:
 *   public/apps/<slug>/icon.webp, shot-<n>.webp
 *   content/store-data.json
 *
 * Run manually (`npm run sync:stores`) and commit the output. The site never
 * calls the stores at runtime, so builds are deterministic and pages have no
 * loading states. A failed lookup keeps that app's previous data.
 *
 * App Store data comes from Apple's public iTunes Lookup API. Google Play has
 * no public API, so its listing page is parsed; if Google changes the page,
 * only this script breaks, never the site.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { projects } from "../content/projects.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_JSON = path.join(ROOT, "content/store-data.json");
const OUT_DIR = path.join(ROOT, "public/apps");
const MAX_SHOTS = 6;
const SHOT_WIDTH = 640;
const ICON_SIZE = 192;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";

const only = process.argv.slice(2);

async function main() {
  const previous = await readJson(OUT_JSON, { apps: {} });
  const apps = { ...previous.apps };
  const targets = projects.filter(
    (p) => (p.links.appStore || p.links.playStore) && (only.length === 0 || only.includes(p.slug)),
  );

  await pool(targets, 4, async (project) => {
    try {
      apps[project.slug] = await syncProject(project);
      const a = apps[project.slug];
      console.log(
        `✓ ${project.slug.padEnd(24)} icon:${a.icon ? "y" : "n"} shots:${a.screenshots.length}` +
          (a.playStore ? ` play:${a.playStore.installs ?? "-"} ★${fmt(a.playStore.rating)}` : "") +
          (a.appStore ? ` ios:★${fmt(a.appStore.rating)} (${a.appStore.ratingCount ?? 0})` : "") +
          (a.listed ? "" : "  (NOT LISTED)"),
      );
    } catch (error) {
      console.warn(`✗ ${project.slug}: ${error.message} (kept previous data)`);
    }
  });

  const sorted = Object.fromEntries(Object.entries(apps).sort(([a], [b]) => a.localeCompare(b)));
  await fs.writeFile(
    OUT_JSON,
    JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), apps: sorted }, null, 2) + "\n",
  );
  console.log(`\nWrote ${path.relative(ROOT, OUT_JSON)}`);
}

async function syncProject(project) {
  const dir = path.join(OUT_DIR, project.slug);
  await fs.mkdir(dir, { recursive: true });

  const ios = project.links.appStore ? await lookupAppStore(project.links.appStore) : null;
  const play = project.links.playStore ? await lookupPlay(project.links.playStore) : null;

  // Prefer iPhone screenshots (portrait, consistent sizes), fall back to Play.
  const iconUrl = ios?.icon ?? play?.icon;
  const shotUrls = [...(ios?.screenshots ?? []), ...(play?.screenshots ?? [])];

  const icon = iconUrl ? await saveImage(iconUrl, path.join(dir, "icon.webp"), ICON_SIZE, ICON_SIZE) : null;

  // Clear stale screenshots before writing the new set.
  for (const f of await fs.readdir(dir)) if (f.startsWith("shot-")) await fs.unlink(path.join(dir, f));

  const screenshots = [];
  for (const url of shotUrls) {
    if (screenshots.length >= MAX_SHOTS) break;
    const file = path.join(dir, `shot-${screenshots.length + 1}.webp`);
    const saved = await saveImage(url, file, SHOT_WIDTH).catch(() => null);
    if (!saved) continue;
    if (saved.width > saved.height) {
      await fs.unlink(file); // landscape/tablet art doesn't fit a phone frame
      continue;
    }
    screenshots.push(saved);
  }

  return {
    listed: Boolean(ios?.listed || play?.listed),
    storeName: ios?.title ?? play?.title ?? null,
    developer: ios?.developer ?? play?.developer ?? null,
    icon,
    screenshots,
    ...(ios && { appStore: { rating: ios.rating, ratingCount: ios.ratingCount, listed: ios.listed } }),
    ...(play && {
      playStore: {
        installs: play.installs,
        minInstalls: play.minInstalls,
        rating: play.rating,
        ratingCount: play.ratingCount,
        listed: play.listed,
      },
    }),
  };
}

// ─── App Store ────────────────────────────────────────────────────────────

async function lookupAppStore(url) {
  const u = new URL(url);
  const id = u.pathname.match(/\/id(\d+)/)?.[1];
  const country = u.pathname.match(/^\/([a-z]{2})\//i)?.[1] ?? "us";
  if (!id) throw new Error(`Bad App Store URL ${url}`);

  const res = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=${country}&entity=software`);
  if (!res.ok) throw new Error(`iTunes lookup ${res.status}`);
  const data = await res.json();
  const app = data.results?.[0];
  if (!app) return { listed: false };

  return {
    listed: true,
    title: app.trackName,
    developer: app.sellerName,
    rating: round(app.averageUserRating),
    ratingCount: app.userRatingCount ?? null,
    icon: app.artworkUrl512?.replace(/\/[^/]+$/, `/${ICON_SIZE * 2}x${ICON_SIZE * 2}bb.png`),
    screenshots: (app.screenshotUrls ?? []).map((s) => s.replace(/\/[^/]+$/, `/${SHOT_WIDTH}x0w.png`)),
  };
}

// ─── Google Play ──────────────────────────────────────────────────────────

async function lookupPlay(url) {
  const id = new URL(url).searchParams.get("id");
  if (!id) throw new Error(`Bad Play URL ${url}`);

  const res = await fetch(`https://play.google.com/store/apps/details?id=${encodeURIComponent(id)}&hl=en&gl=us`, {
    headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
  });
  if (res.status === 404) return { listed: false };
  if (!res.ok) throw new Error(`Play ${res.status}`);

  const d = extractPlayDetails(await res.text());
  if (!d) throw new Error("Play page had no app data");

  return {
    listed: true,
    title: at(d, [0, 0]) ?? null,
    developer: at(d, [68, 0]) ?? null,
    installs: typeof at(d, [13, 0]) === "string" ? at(d, [13, 0]) : null,
    minInstalls: num(at(d, [13, 1])),
    rating: round(at(d, [51, 0, 1])),
    ratingCount: num(at(d, [51, 2, 1])),
    icon: withParam(at(d, [95, 0, 3, 2]), `s${ICON_SIZE * 2}`),
    screenshots: (at(d, [78, 0]) ?? [])
      .map((s) => at(s, [3, 2]))
      .filter(Boolean)
      .map((s) => withParam(s, `w${SHOT_WIDTH}`)),
  };
}

function extractPlayDetails(html) {
  for (const script of html.match(/>AF_initDataCallback[\s\S]*?<\/script/g) ?? []) {
    if (script.match(/ds:[^'"]+/)?.[0] !== "ds:5") continue;
    const payload = script.match(/data:(\[[\s\S]*?), sideChannel: \{\}\}\);<\//)?.[1];
    if (payload) return at(JSON.parse(payload), [1, 2]);
  }
  return null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

async function saveImage(url, file, width, height) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`image ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const out = await sharp(buf)
    .resize({ width, height, fit: height ? "cover" : "inside", withoutEnlargement: !height })
    .webp({ quality: 82 })
    .toFile(file);
  return { src: "/" + path.relative(path.join(ROOT, "public"), file), width: out.width, height: out.height };
}

const at = (v, p) => p.reduce((c, i) => (Array.isArray(c) ? c[i] : undefined), v);
const num = (v) => (typeof v === "number" && Number.isFinite(v) ? Math.round(v) : null);
const round = (v) => (typeof v === "number" && v > 0 ? Math.round(v * 10) / 10 : null);
const fmt = (v) => (v == null ? "-" : v);
const withParam = (url, p) => (url ? `${url.split("=")[0]}=${p}` : null);

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function pool(items, size, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: size }, async () => {
    while (queue.length) await fn(queue.shift());
  }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
