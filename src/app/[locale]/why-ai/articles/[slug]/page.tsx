import { getArticle, getAllArticles, ArticleSection } from "@/lib/articles";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["en", "da"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const arts = getAllArticles(locale);
    arts.forEach((a) => params.push({ locale, slug: a.slug }));
  }
  return params;
}

function renderSection(section: ArticleSection, i: number) {
  switch (section.type) {
    case "paragraph":
      return (
        <p
          key={i}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "1.075rem",
            lineHeight: 1.8,
            color: "#374151",
            marginBottom: "1.5rem",
          }}
        >
          {section.text}
        </p>
      );

    case "heading":
      return (
        <h2
          key={i}
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.3,
            color: "#0A0F1E",
            marginTop: "2.75rem",
            marginBottom: "1rem",
            paddingBottom: "0.6rem",
            borderBottom: "2px solid rgba(124,58,237,0.12)",
          }}
        >
          {section.text}
        </h2>
      );

    case "bullets":
      return (
        <ul
          key={i}
          style={{
            marginBottom: "1.5rem",
            paddingLeft: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {section.items.map((item, j) => (
            <li
              key={j}
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "#374151",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  marginTop: "9px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  display: "block",
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "cta":
      return (
        <div
          key={i}
          style={{
            marginTop: "2.5rem",
            marginBottom: "1.5rem",
            padding: "36px 40px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(6,182,212,0.04) 100%)",
            border: "1px solid rgba(124,58,237,0.12)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#0A0F1E",
              marginBottom: "10px",
            }}
          >
            {section.headline}
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "#64748B",
              marginBottom: "20px",
            }}
          >
            {section.body}
          </p>
          <Link
            href={section.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "0.88rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#7C3AED",
              textDecoration: "none",
            }}
          >
            {section.linkLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      );

    default:
      return null;
  }
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);
  if (!article) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar />

      {/* Hero */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "480px",
          overflow: "hidden",
          marginTop: "72px",
        }}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,15,30,0.3) 0%, rgba(10,15,30,0.65) 100%)",
          }}
        />
        {/* Category + title overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 0 48px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: "760px", width: "100%", padding: "0 32px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 14px",
                borderRadius: "40px",
                background: article.categoryBg,
                border: `1px solid ${article.categoryColor}40`,
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: article.categoryColor,
                }}
              >
                {article.category}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: "#FFFFFF",
              }}
            >
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div
        style={{
          background: "#FAFAFA",
          borderBottom: "1px solid rgba(15,23,42,0.07)",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#0A0F1E",
            }}
          >
            {article.author}
          </span>
          <span style={{ color: "#CBD5E1", fontSize: "0.75rem" }}>•</span>
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.85rem",
              color: "#64748B",
            }}
          >
            {article.date}
          </span>
          <span style={{ color: "#CBD5E1", fontSize: "0.75rem" }}>•</span>
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.85rem",
              color: "#64748B",
            }}
          >
            {article.readTime}
          </span>

          {/* Back link */}
          <Link
            href={`/${locale}/why-ai/articles`}
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#7C3AED",
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            All articles
          </Link>
        </div>
      </div>

      {/* Article body */}
      <main
        style={{
          background: "#FFFFFF",
          paddingBottom: "120px",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "64px 32px 0",
          }}
        >
          {article.content.map((section, i) => renderSection(section, i))}
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
