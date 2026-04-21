"use client";

/**
 * ArticleTracker
 * Fires `article_read` on mount — injected into the server-rendered article
 * detail page which cannot call client hooks directly.
 */

import { useEffect } from "react";
import { trackArticleRead } from "@/lib/analytics";

interface Props {
  slug: string;
  title: string;
  locale: string;
}

export default function ArticleTracker({ slug, title, locale }: Props) {
  useEffect(() => {
    trackArticleRead(slug, title, locale);
  }, [slug, title, locale]);

  return null;
}
