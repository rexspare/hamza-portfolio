const PLAY_DETAILS_URL = "https://play.google.com/store/apps/details";
const APP_ID_PATTERN = /^[A-Za-z][A-Za-z0-9_]*(\.[A-Za-z][A-Za-z0-9_]*)+$/;

export interface GooglePlayStats {
  rating: number | null;
  ratingCount: number | null;
  downloads: string | null;
  minInstalls: number | null;
}

export async function fetchGooglePlayStats(appId: string): Promise<GooglePlayStats> {
  if (!APP_ID_PATTERN.test(appId)) {
    throw new Error("Invalid Play Store app id");
  }

  const url = new URL(PLAY_DETAILS_URL);
  url.searchParams.set("id", appId);
  url.searchParams.set("hl", "en");
  url.searchParams.set("gl", "us");

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Play Store responded with ${response.status}`);
  }

  const details = extractAppDetails(await response.text());
  if (!details) {
    throw new Error("Play Store page did not include app data");
  }

  const downloads = installLabel(at(details, [13, 0]));
  const minInstalls = count(at(details, [13, 1]));
  const rating = ratingValue(at(details, [51, 0, 1]));
  const ratingCount = count(at(details, [51, 2, 1]));

  if (downloads == null && rating == null) {
    throw new Error("Play Store app data was missing rating and installs");
  }

  return { rating, ratingCount, downloads, minInstalls };
}

function extractAppDetails(html: string): unknown {
  const scripts = html.match(/>AF_initDataCallback[\s\S]*?<\/script/g) ?? [];

  for (const script of scripts) {
    const key = script.match(/ds:[^'"]+/)?.[0];
    const payload = script.match(/data:(\[[\s\S]*?), sideChannel: \{\}\}\);<\//)?.[1];
    if (key !== "ds:5" || !payload) continue;

    const parsed: unknown = JSON.parse(payload);
    return at(parsed, [1, 2]);
  }

  return null;
}

function at(value: unknown, path: number[]): unknown {
  return path.reduce<unknown>((current, index) => {
    if (!Array.isArray(current)) return undefined;
    return current[index];
  }, value);
}

function installLabel(value: unknown): string | null {
  return typeof value === "string" && /^\d[\d,]*\+$/.test(value) ? value : null;
}

function count(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : null;
}

function ratingValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value > 0 && value <= 5
    ? value
    : null;
}
