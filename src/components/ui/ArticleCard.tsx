"use client";

import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/articles";

interface Props {
  article: Article;
  locale: string;
}

export default function ArticleCard({ article, locale }: Props) {
  return (
    <Link
      href={`/${locale}/why-ai/articles/${article.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        textDecoration: "none",
        transition: "transform 0.3s ease, box-shadow 0.35s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-8px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 20px 60px rgba(0,0,0,0.12), 0 6px 20px rgba(124,58,237,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)";
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "#F1F5F9",
        }}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: "28px 28px 32px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Category + read time */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 12px",
              borderRadius: "40px",
              background: article.categoryBg,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: article.categoryColor,
              }}
            >
              {article.category}
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.78rem",
              color: "#94A3B8",
            }}
          >
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            color: "#0A0F1E",
            marginBottom: "12px",
          }}
        >
          {article.title}
        </h2>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.65,
            color: "#64748B",
            flex: 1,
            marginBottom: "24px",
          }}
        >
          {article.excerpt}
        </p>

        {/* Read link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#7C3AED",
          }}
        >
          Read article
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
