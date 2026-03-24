import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ui/ArticleCard";
import Navbar from "@/components/layout/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  const articles = getAllArticles(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar />

      {/* Page header */}
      <div
        style={{
          background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)",
          paddingTop: "168px",
          paddingBottom: "96px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        {/* Violet glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "50%",
            height: "80%",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 80px",
            position: "relative",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#7C3AED",
              marginBottom: "20px",
            }}
          >
            {locale === "da" ? "Artikler" : "Articles"}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#FFFFFF",
              marginBottom: "24px",
              maxWidth: "780px",
            }}
          >
            {locale === "da" ? (
              <>
                AI-viden og Artikler fra{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Virkeligheden.
                </span>
              </>
            ) : (
              <>
                AI Opens Possibilities.{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Understanding Unlocks Them.
                </span>
              </>
            )}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "#94A3B8",
              maxWidth: "560px",
            }}
          >
            {locale === "da"
              ? "Udforsk hvordan vi sammen med virksomheder bruger AI i praksis - én brugssituation ad gangen. Vores artikler giver jer konkret viden, brugbare indsigter og modeller, der hjælper jer med at implementere AI med tillid og overblik."
              : "AI can reshape how your company operates and competes. But turning potential into real results requires understanding."}
          </p>
        </div>
      </div>

      {/* Articles grid */}
      <main
        style={{
          background: "#FFFFFF",
          padding: "80px 0 120px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "28px",
            }}
          >
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} />
            ))}
          </div>
        </div>
      </main>

    </NextIntlClientProvider>
  );
}
