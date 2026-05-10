import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { BASE_URL } from "@/config/metadata";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isDA = locale === "da";
  const url = `${BASE_URL}/${locale}/case-studies/one-more-day-on-fyn`;

  return {
    title: isDA
      ? "Den Ekstra Dag på Fyn | xrNORD Case Study"
      : "One More Day on Fyn | xrNORD Case Study",
    description: isDA
      ? "Hvordan xrNORD og Destination Fyn bruger AI til at skabe den ekstra dag — og forvandler en fragmenteret destinationsoplevelse til en sammenhængende rejse."
      : "How xrNORD and Destination Fyn are using AI to create the extra day — turning a fragmented destination experience into a coherent, guided journey.",
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/case-studies/one-more-day-on-fyn`,
        da: `${BASE_URL}/da/case-studies/one-more-day-on-fyn`,
        "x-default": `${BASE_URL}/en/case-studies/one-more-day-on-fyn`,
      },
    },
    openGraph: {
      title: isDA ? "Den Ekstra Dag på Fyn" : "One More Day on Fyn",
      description: isDA
        ? "Hvordan AI forvandlede en destinationsapp til en opdagelsesmaskine"
        : "How AI turned a destination app into a discovery engine",
      url,
      type: "article",
      siteName: "xrNORD",
      images: [{ url: `${BASE_URL}/assets/cases/Fyn 2.jpg`, width: 1200, height: 630 }],
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "da" }];
}

const focusAreas = {
  en: [
    {
      number: "01",
      title: "Guided Visitor Journeys",
      body: "Visitors are guided through the destination with contextual recommendations — curated bike routes and local experiences designed to create a coherent stay from day one.",
    },
    {
      number: "02",
      title: "Visibility for Local Businesses",
      body: "Local businesses surface dynamically based on context and behaviour. The foundation is live; AI-driven matching is the next step.",
    },
    {
      number: "03",
      title: "Real-Time Local Events",
      body: "Events from Facebook and other platforms are integrated into one place — visible and accessible within the visitor's journey, not scattered across channels.",
    },
    {
      number: "04",
      title: "Reduced Costs Through AI",
      body: "AI handles content structuring, text generation, translation and data processing — significantly cutting operational workload and time to market.",
    },
  ],
  da: [
    {
      number: "01",
      title: "Guidede oplevelser",
      body: "Gæster guides gennem destinationen via kontekstuelle anbefalinger — kuraterede cykelruter og lokale oplevelser, der skaber en sammenhængende oplevelse fra dag ét.",
    },
    {
      number: "02",
      title: "Synlighed for lokale aktører",
      body: "Lokale virksomheder vises dynamisk baseret på kontekst og adfærd. Fundamentet er klar; AI-baseret matching er næste skridt.",
    },
    {
      number: "03",
      title: "Lokale events i realtid",
      body: "Events fra Facebook og andre platforme er samlet ét sted — synlige og tilgængelige i gæstens oplevelse, ikke spredt på tværs af kanaler.",
    },
    {
      number: "04",
      title: "Reducerede omkostninger via AI",
      body: "AI håndterer indholdsstrukturering, tekstgenerering, oversættelse og databehandling — og reducerer driftsarbejdet markant.",
    },
  ],
};

export default async function OneMoreDayPage({ params }: Props) {
  const { locale } = await params;
  const isDA = locale === "da";
  const areas = isDA ? focusAreas.da : focusAreas.en;

  return (
    <main style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", background: "#fff" }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "54vh",
          minHeight: 460,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Background photo */}
        <Image
          src="/assets/cases/Fyn 2.jpg"
          alt="Aerial view of Fyn coastline"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 45%" }}
          sizes="100vw"
        />

        {/* White fade from top (blends into navbar) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Dark gradient from bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 30%, rgba(4,10,18,0.55) 65%, rgba(4,10,18,0.88) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Left side darkener */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.10) 50%, transparent 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            padding: "0 9% 72px",
          }}
        >
          {/* Article label — large, pinned to far right */}
          <p
            style={{
              position: "absolute",
              right: "9%",
              top: 88,
              margin: 0,
              fontSize: "clamp(3.5rem, 7vw, 7rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {isDA ? "Artikel" : "Article"}
          </p>

          {/* Visit Fyn logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/home/clients/destination-fyn.png"
            alt="Visit Fyn"
            style={{
              height: 40,
              width: "auto",
              maxWidth: 150,
              filter: "brightness(0) invert(1)",
              opacity: 0.9,
              marginBottom: 24,
              display: "block",
            }}
          />

          {/* Pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {[isDA ? "Case Study" : "Case Study", isDA ? "Turisme" : "Tourism"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "7px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.45)",
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(3rem, 6vw, 6rem)",
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              color: "#fff",
              margin: "0 0 20px",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {isDA ? "Den Ekstra Dag" : "One More Day"}
            <br />
            <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.82)" }}>
              {isDA ? "på Fyn" : "on Fyn"}
            </span>
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 520,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {isDA
              ? "Hvordan AI forvandlede en destinationsapp til en opdagelsesmaskine"
              : "How AI turned a destination app into a discovery engine"}
          </p>
        </div>
      </section>

      {/* ── Intro section ─────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px 0 80px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 32px" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7C6FD4",
              margin: "0 0 20px",
            }}
          >
            {isDA ? "Baggrunden" : "The Brief"}
          </p>

          {/* Lead paragraph */}
          <p
            style={{
              fontSize: "1.35rem",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "#1a2530",
              margin: "0 0 32px",
              borderLeft: "3px solid #7C6FD4",
              paddingLeft: 28,
            }}
          >
            {isDA
              ? "De fleste destinationer konkurrerer på synlighed. De stærkeste konkurrerer på oplevelse. Men der findes en endnu vigtigere måling, som ofte overses: Hvor længe vælger gæsterne at blive?"
              : "Most destinations compete on visibility. The best ones compete on experience. But there is a deeper metric that often goes unnoticed: how long visitors choose to stay."}
          </p>

          <p
            style={{
              fontSize: "1.075rem",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "#374151",
              margin: "0 0 24px",
            }}
          >
            {isDA
              ? "At forlænge et ophold med blot én dag handler ikke kun om øget omsætning. Det ændrer, hvordan destinationen opleves, huskes, og om man vender tilbage. Det er netop denne ambition, der driver den digitale udvikling hos Destination Fyn."
              : "Extending a stay by just one day does more than increase revenue. It changes how a destination is experienced, remembered, and returned to. This is the ambition shaping the digital evolution of Destination Fyn."}
          </p>

          <p
            style={{
              fontSize: "1.075rem",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "#374151",
              margin: 0,
            }}
          >
            {isDA
              ? "Fokus er ikke blot på at tiltrække besøgende, men at få dem til at blive længere, opleve mere, og komme igen. Her spiller AI og en målrettet digital tilgang en central rolle."
              : "Not just to attract visitors, but to make them stay longer, explore deeper, and come back. Utilizing AI together with a clear digitalization approach are some of the answers to how Fyn is giving visitors the experiences that nudge them to stay one more day."}
          </p>
        </div>
      </section>

      {/* ── Full-bleed photo break ─────────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: 480, overflow: "hidden" }}>
        <Image
          src="/assets/cases/Fyn 3.jpg"
          alt="Fyn landscape"
          fill
          style={{ objectFit: "cover", objectPosition: "center 60%" }}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.6) 100%)",
          }}
        />
      </div>

      {/* ── Challenge + Foundation ─────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px 0" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 32px" }}>
          <h2
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0f1c24",
              margin: "0 0 24px",
              paddingBottom: "16px",
              borderBottom: "2px solid rgba(124,111,212,0.15)",
            }}
          >
            {isDA ? "Udfordringen var ikke indhold" : "The Challenge to Experience"}
          </h2>

          <p style={{ fontSize: "1.075rem", fontWeight: 300, lineHeight: 1.85, color: "#374151", margin: "0 0 20px" }}>
            {isDA
              ? "Der har aldrig manglet oplevelser. Der er steder at besøge, restauranter at opdage og events på hele øen. Men oplevelsen har været fragmenteret. Gæster har skullet søge på tværs af platforme, sammensætte deres egne forløb, og har ofte overset det, der foregik lige omkring dem."
              : "The challenge was never a lack of content. There are places to visit, restaurants to discover, and events happening across the island. But the experience itself is fragmented. Visitors have to search across platforms, piece together their own journeys, and often miss what was happening right around them."}
          </p>

          <p style={{ fontSize: "1.075rem", fontWeight: 300, lineHeight: 1.85, color: "#374151", margin: "0 0 48px" }}>
            {isDA
              ? "Resultatet har været en destination rig på oplevelser, men ikke fuldt oplevet."
              : "The result was — and is — a destination rich in experiences, but not fully experienced."}
          </p>

          <h2
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0f1c24",
              margin: "0 0 24px",
              paddingBottom: "16px",
              borderBottom: "2px solid rgba(124,111,212,0.15)",
            }}
          >
            {isDA ? "Fundamentet bliver bygget først" : "Building the Foundation"}
          </h2>

          <p style={{ fontSize: "1.075rem", fontWeight: 300, lineHeight: 1.85, color: "#374151", margin: "0 0 20px" }}>
            {isDA
              ? "Da xrNORD trådte ind i projektet, eksisterede løsningen udelukkende som frontend. Der var ingen backend, ingen struktureret data og ingen logik. Det betød ingen skalerbarhed, ingen personalisering og intet fundament for AI."
              : "When xrNORD entered the project, the application existed only as a frontend. There was no backend, no structured data, and no logic layer. This meant no scalability, no personalization, and no real foundation for AI."}
          </p>

          <p style={{ fontSize: "1.075rem", fontWeight: 300, lineHeight: 1.85, color: "#374151", margin: 0 }}>
            {isDA
              ? "Første skridt var derfor ikke at tilføje features, men at gentænke og opbygge hele arkitekturen fra bunden — et fundament der understøtter struktureret data, integrationer og fremtidige AI-muligheder."
              : "The first step was therefore not to add features, but to rebuild the system architecture from the ground up — establishing a foundation to support structured data, integrations, real-time logic, and future AI capabilities."}
          </p>
        </div>
      </section>

      {/* ── Pull quote ────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #f3f1ff 0%, #ede9ff 100%)",
          padding: "80px 9%",
          textAlign: "center",
        }}
      >
        <blockquote
          style={{
            maxWidth: 900,
            margin: "0 auto",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.25,
            color: "#0f1c24",
            borderLeft: "none",
            padding: 0,
          }}
        >
          <span style={{ color: "#7C6FD4", marginRight: 4 }}>&ldquo;</span>
          {isDA
            ? "Den ekstra dag skabes ikke gennem kampagner. Ikke gennem mere indhold. Den skabes gennem oplevelser."
            : "The extra day is not created through campaigns. Not through more content. It is created through experiences."}
          <span style={{ color: "#7C6FD4", marginLeft: 4 }}>&rdquo;</span>
        </blockquote>
        <p
          style={{
            marginTop: 24,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#7C6FD4",
          }}
        >
          xrNORD
        </p>
      </section>

      {/* ── Four focus areas ──────────────────────────────────────────── */}
      <section style={{ background: "#f6f9fb", padding: "96px 9%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 64 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#7C6FD4",
                margin: "0 0 12px",
              }}
            >
              {isDA ? "Den konkrete løsning" : "The Solution"}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#0f1c24",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {isDA ? "Fire fokusområder" : "Four Focus Areas"}
            </h2>
          </div>

          {/* 2×2 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              background: "#e8eaed",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {areas.map((area, i) => (
              <div
                key={area.number}
                style={{
                  background: "#fff",
                  padding: "52px 48px",
                  borderRadius: i === 0 ? "18px 0 0 0" : i === 1 ? "0 18px 0 0" : i === 2 ? "0 0 0 18px" : "0 0 18px 0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#7C6FD4",
                    margin: "0 0 20px",
                    letterSpacing: "-0.03em",
                    opacity: 0.4,
                  }}
                >
                  {area.number}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#0f1c24",
                    margin: "0 0 14px",
                    lineHeight: 1.3,
                  }}
                >
                  {area.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: "#4a5a64",
                    margin: 0,
                  }}
                >
                  {area.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Second photo break ────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: 420,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/assets/cases/Fyn 1.jpg"
            alt="Fyn island"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
          />
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/assets/cases/Fyn 4.jpg"
            alt="Fyn scenery"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
          />
        </div>
      </div>

      {/* ── Role of AI + Conclusion ───────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px 0" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 32px" }}>
          <h2
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0f1c24",
              margin: "0 0 24px",
              paddingBottom: "16px",
              borderBottom: "2px solid rgba(124,111,212,0.15)",
            }}
          >
            {isDA ? "AI's rolle" : "The Role of AI"}
          </h2>

          <p style={{ fontSize: "1.075rem", fontWeight: 300, lineHeight: 1.85, color: "#374151", margin: "0 0 48px" }}>
            {isDA
              ? "AI implementeres ikke på én gang. Den introduceres der, hvor den skaber konkret værdi, og udvides i takt med, at platformen udvikler sig. Det sikrer et stabilt fundament, tidlige resultater og en klar vej mod avanceret personalisering og automatisering — uden at miste kontrol over kompleksitet og omkostninger."
              : "AI is not introduced all at once. It is implemented where it creates immediate value and expanded as the system evolves. This approach ensures a stable foundation, early measurable impact, and a clear path toward more advanced personalization and automation — without losing control of complexity or cost."}
          </p>

          <h2
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0f1c24",
              margin: "0 0 24px",
              paddingBottom: "16px",
              borderBottom: "2px solid rgba(124,111,212,0.15)",
            }}
          >
            {isDA ? "En destination, der lærer" : "A Destination That Learns"}
          </h2>

          <p style={{ fontSize: "1.075rem", fontWeight: 300, lineHeight: 1.85, color: "#374151", margin: "0 0 20px" }}>
            {isDA
              ? "Det, der bygges, er ikke blot en platform. Det er en levende oplevelse, der løbende tilpasser sig. Fra lister til guidede forløb. Fra filtrering til intelligent matching. Fra synlighed til reel relevans."
              : "What is being built is not just a platform. It is a guided experience, evolving over time. It moves from lists to guided routes, from filtering to intelligent matching, and from visibility to true relevance."}
          </p>

          <p style={{ fontSize: "1.075rem", fontWeight: 300, lineHeight: 1.85, color: "#374151", margin: 0 }}>
            {isDA
              ? "Målet er en destination, der forstår sine gæster og reagerer derefter. Den ekstra dag skabes ikke gennem kampagner, ikke gennem mere indhold. Den skabes gennem oplevelser — oplevelser, der hænger sammen, føles relevante og er værd at blive den ekstra dag for."
              : "The long-term outcome is a destination that understands its visitors and responds accordingly. The extra day is not created through campaigns. Not through more content. It is created through experiences — experiences that feel coherent, relevant, and worth staying that extra day for."}
          </p>
        </div>
      </section>

      {/* ── xrNORD perspective ────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0B0F1A 0%, #141829 50%, #1A1040 100%)",
          padding: "100px 9%",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#A78BFA",
                margin: "0 0 20px",
              }}
            >
              {isDA ? "xrNORDs perspektiv" : "xrNORD's Perspective"}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#fff",
                margin: "0 0 24px",
                lineHeight: 1.15,
              }}
            >
              {isDA
                ? "Transformation sker ikke i ét skridt"
                : "Transformation doesn't happen in a single step"}
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.62)",
                margin: 0,
              }}
            >
              {isDA
                ? "Hos xrNORD opererer vi her. Ikke kun ved at bygge teknologi, men ved at designe, hvordan systemer, data og AI arbejder sammen om at skabe reel impact. Det sker, når vision og eksekvering bevæger sig fremad sammen."
                : "At xrNORD, this is where we operate. Not just building technology, but designing how systems, data, and AI come together to create real-world impact. Because transformation doesn't happen in a single step. It happens when vision and execution move forward together."}
            </p>
          </div>

          {/* Right — CTA card */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "48px 44px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 16px",
                lineHeight: 1.3,
              }}
            >
              {isDA
                ? "Vil du bygge noget lignende?"
                : "Want to build something like this?"}
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.55)",
                margin: "0 0 32px",
              }}
            >
              {isDA
                ? "Lad os udforske, hvad der er muligt for din virksomhed — fra vision til konkret eksekvering."
                : "Let's explore what's possible for your organisation — from vision to real-world execution."}
            </p>
            <Link
              href={`/${locale}/workshop`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 999,
                background: "#7C6FD4",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                transition: "background 0.2s, transform 0.2s",
              }}
            >
              {isDA ? "Book en AI Workshop" : "Book an AI Workshop"} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sponsorship ───────────────────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          padding: "56px 9%",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 400,
              color: "#6b7280",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {isDA
              ? "Dette projekt er udviklet i samarbejde med"
              : "This project has been developed in a sponsorship with"}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/cases/Danmarks Erhversfremmebestyrelse.svg"
            alt="Danmarks Erhvervsfremmebestyrelse"
            style={{ height: 40, width: "auto", display: "block", flexShrink: 0 }}
          />
        </div>
      </section>

      {/* ── Back link ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#fff",
          padding: "32px 9%",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Link
          href={`/${locale}/why-ai/articles`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#7C6FD4",
            textDecoration: "none",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}
        >
          ← {isDA ? "Alle artikler" : "All articles"}
        </Link>
      </div>
    </main>
  );
}
