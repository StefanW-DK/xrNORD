import type { NextRequest } from "next/server";

/**
 * Server-side spam guards shared by the form API routes
 * (contact, book-workshop, ai-labs-apply).
 *
 * The client sends two extra fields with every submission:
 *   - `website`:   hidden honeypot input. Humans never see it, bots fill it.
 *   - `startedAt`: Date.now() recorded when the form rendered.
 */

/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_TIME_MS = 3000;

/** Per-IP rate limit, per route. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const EMAIL_RE = /^[^\s@<>"'(),;:]+@[^\s@<>"'(),;:]+\.[^\s@<>"'(),;:]{2,}$/;
const URL_RE = /(https?:\/\/|www\.)/i;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Parsed JSON body as a plain object ({} for anything else or invalid JSON). */
export async function readBody(request: NextRequest): Promise<Record<string, unknown>> {
  const body: unknown = await request.json().catch(() => null);
  return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : {};
}

/** Trimmed string or "" for anything that is not a string. */
export function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Strip line breaks, for values used in mail headers (subject). */
export function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_RE.test(email);
}

export function containsUrl(value: string): boolean {
  return URL_RE.test(value);
}

/**
 * Returns a reason string if the submission tripped the honeypot or the
 * time trap, otherwise null. Callers should answer such requests with a
 * normal 200 response and send nothing, so the bot does not learn anything.
 */
export function botTrapReason(body: Record<string, unknown>): string | null {
  if (str(body.website) !== "") return "honeypot";
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || startedAt <= 0) return "missing-timestamp";
  if (Date.now() - startedAt < MIN_FILL_TIME_MS) return "too-fast";
  return null;
}

/**
 * Field length check. Returns the name of the first field that is longer
 * than its limit, or null.
 */
export function tooLongField(fields: Record<string, [string, number]>): string | null {
  for (const [name, [value, max]] of Object.entries(fields)) {
    if (value.length > max) return name;
  }
  return null;
}

/* ── Rate limiting ──
 * In-memory, so it is per serverless instance and resets on cold starts.
 * Good enough to stop a single source hammering the form without adding
 * infrastructure; it is not a hard guarantee. */
const hits = new Map<string, number[]>();

export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function isRateLimited(route: string, ip: string): boolean {
  const now = Date.now();
  const key = `${route}:${ip}`;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

/**
 * Heuristic for the random-string spam we have seen, e.g. subject
 * "KSEsOOoMabhjUcXioolFOw" with a message that is just a number.
 * Kept deliberately narrow so real people are not caught:
 *   - a single long token of letters only with lots of capitals in the middle, or
 *   - a message without a single letter in it.
 */
export function looksLikeRandomString(value: string): boolean {
  if (value.length < 12 || /\s/.test(value) || !/^\p{L}+$/u.test(value)) return false;
  const innerCapitals = value.slice(1).replace(/[^\p{Lu}]/gu, "").length;
  return innerCapitals >= 4;
}

export function hasNoLetters(value: string): boolean {
  return !/\p{L}/u.test(value);
}
