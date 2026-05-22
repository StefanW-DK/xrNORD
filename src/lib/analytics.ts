declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
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
 * @param ctaName      Human-readable label, e.g. "Book Workshop — hero"
 * @param destination  The href/URL the user is navigating to
 * @param section      Optional page section, e.g. "hero", "navbar", "footer"
 */
export function trackCTAClick(
  ctaName: string,
  destination: string,
  section?: string
) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    destination,
    ...(section ? { section } : {}),
  });
}

/**
 * Track an article read. Fire when the article body becomes visible.
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
 * Event names: generate_lead_contact / generate_lead_workshop
 */
export function trackLead(type: "contact" | "workshop", locale: string) {
  trackEvent(`generate_lead_${type}`, { locale }); // GA4 via gtag — Secondary (analytics/reporting)
  // Push to dataLayer so GTM Custom Event trigger can fire the Primary Google Ads conversion tag
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: `generate_lead_${type}`, locale });
  }
}

/**
 * Track a YouTube / video link click on the interviews page.
 */
export function trackVideoClick(
  videoTitle: string,
  videoId: string,
  locale: string
) {
  trackEvent("video_click", {
    video_title: videoTitle,
    video_id: videoId,
    locale,
  });
}

/**
 * Track when a user switches the site language.
 */
export function trackLanguageSwitch(fromLocale: string, toLocale: string) {
  trackEvent("language_switch", {
    from_locale: fromLocale,
    to_locale: toLocale,
  });
}

/**
 * Track newsletter form submission (footer).
 * Pushes to both gtag (GA4) and dataLayer (GTM) so either can trigger on it.
 */
export function trackNewsletterSignup(locale: string) {
  trackEvent("newsletter_signup", { locale });
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "newsletter_signup", locale });
}

/**
 * Track social link clicks in the footer.
 */
export function trackSocialClick(platform: string) {
  trackEvent("social_click", { platform });
}

/**
 * Track contact info clicks (email / phone) in the footer.
 */
export function trackContactInfoClick(type: "email" | "phone") {
  trackEvent("contact_info_click", { type });
}

/**
 * Push a high-intent page view event directly to dataLayer.
 * Fires on /book-workshop and /contact — signals strong purchase intent
 * to GTM (and via GTM to Google Ads Smart Bidding) even when no form
 * is submitted.
 */
export function trackHighIntentPageView(page: "book_workshop" | "contact", locale: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "high_intent_page_view",
    page_type: page,
    locale,
  });
}
