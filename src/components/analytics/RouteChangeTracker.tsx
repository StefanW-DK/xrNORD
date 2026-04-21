"use client";

/**
 * RouteChangeTracker
 * Fires a GA4 `page_view` event on every client-side navigation.
 * GA4's own `send_page_view: true` handles the initial hard-load page_view;
 * this component handles SPA route changes (Next.js Link clicks) that
 * GA4 never sees without explicit instrumentation.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function RouteChangeTracker() {
  const pathname = usePathname();
  const mounted = useRef(false);

  useEffect(() => {
    // Skip on initial mount — GA4 init script already fired the first page_view
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    trackEvent("page_view", {
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
