declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

/**
 * Fire a GA4 custom event. Safe to call server-side (no-ops in SSR).
 */
export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

/**
 * Track a CTA button or link click.
 * @param ctaName  Human-readable label, e.g. "Book consultation — hero"
 * @param destination  The href/URL the user is navigating to
 * @param section  Optional page section, e.g. "hero", "about", "workshop"
 */
export function trackCTAClick(ctaName: string, destination: string, section?: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    destination,
    ...(section ? { section } : {}),
  });
}

/**
 * Track an article read (fired when the article body becomes visible).
 */
export function trackArticleRead(slug: string, title: string, locale: string) {
  trackEvent("article_read", {
    article_slug: slug,
    article_title: title,
    locale,
  });
}

/**
 * Track a form submission lead event.
 * Mirrors existing events: generate_lead_contact / generate_lead_workshop
 */
export function trackLead(type: "contact" | "workshop", locale: string) {
  trackEvent(`generate_lead_${type}`, { locale });
}
