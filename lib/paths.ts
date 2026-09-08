export const SITE_TIME_ZONE = "America/Argentina/Buenos_Aires";

/** Convert a Jekyll/public path into a Next.js `public/` URL for next/image. */
export function toImageSrc(path: string): string {
  const trimmed = path.trim();
  if (/^https?:\/\//.test(trimmed)) return trimmed;
  return `/${trimmed.replace(/^\/+/, "").replace(/^public\//, "")}`;
}

/** Keep Jekyll-compatible `/public/...` URLs (rewritten to files in `public/`). */
export function toPublicUrl(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return "/";
  if (/^https?:\/\//.test(trimmed) || trimmed.startsWith("mailto:")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) return trimmed;
  return `/${trimmed}`;
}

function isUtcMidnight(date: Date): boolean {
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  );
}

function calendarDateParts(value: string | Date): {
  year: number;
  month: number;
  day: number;
} | null {
  if (typeof value === "string") {
    const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})(?:$|T|\s)/);
    if (!match) return null;
    return {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3]),
    };
  }
  if (isUtcMidnight(value)) {
    return {
      year: value.getUTCFullYear(),
      month: value.getUTCMonth() + 1,
      day: value.getUTCDate(),
    };
  }
  return null;
}

/** YAML date-only values are UTC midnight; treat that civil date as Argentina midnight. */
export function parsePostDate(value: unknown): Date {
  if (value instanceof Date) {
    const parts = calendarDateParts(value);
    if (parts) {
      return argentinaMidnight(parts.year, parts.month, parts.day);
    }
    return value;
  }
  const asString = String(value ?? "").trim();
  const parts = calendarDateParts(asString);
  if (parts) {
    return argentinaMidnight(parts.year, parts.month, parts.day);
  }
  return new Date(asString);
}

function argentinaMidnight(year: number, month: number, day: number): Date {
  const iso = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return new Date(`${iso}T00:00:00-03:00`);
}

export function formatPostDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: SITE_TIME_ZONE,
  });
}

export function datePartsInTimeZone(
  date: Date,
  timeZone = SITE_TIME_ZONE,
): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const pick = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);
  return {
    year: pick("year"),
    month: pick("month"),
    day: pick("day"),
  };
}
