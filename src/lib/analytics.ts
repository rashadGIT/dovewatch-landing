// Thin wrapper around gtag.js. Every call is a no-op until the consent
// banner (components/cookie-consent.tsx) has loaded the GA script and
// NEXT_PUBLIC_GA_MEASUREMENT_ID is set — so this is safe to call
// unconditionally from anywhere on the site.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Named for the action taken, not the element clicked, so events stay
// meaningful if the UI around them changes (e.g. "get_started_click", not
// "hero_button_click"). Never pass PII (names, emails, case data) as params.
export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
