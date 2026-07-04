declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a GA4 event. No-op when window.gtag is unavailable (e.g. dev without
 * NEXT_PUBLIC_GA_MEASUREMENT_ID, or ad-blocked browsers).
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}
