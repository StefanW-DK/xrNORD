"use client";

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function WorkshopPage() {
  const locale = useLocale();

  const STEPS = [
    {
      num: "01",
      title: locale === "da" ? "Discovery Workshop" : "Discovery Workshop",
      desc:
        locale === "da"
          ? "Vores AI Workshop er det første skridt på jeres AI-rejse. Her får I ekspertvejledning i, hvordan AI kan skabe konkret værdi for jeres virksomhed."
          : "Our AI Workshop serves as the first step in your AI advisory journey. Here, you gain expert guidance on how AI can create tangible value for your business.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
          <path d="M9 9a3 3 0 0 1 5.12-2.13" />
        </svg>
      ),
    },
    {
      num: "02",
      title:
        locale === "da"
          ? "Analyse, Planlægning & Business Case"
          : "Analysis, Planning & Business Case",
      desc:
        locale === "da"
          ? "Hvis vi sammen ser, at AI kan gavne jeres forretning, har I mulighed for at gå videre med en detaljeret, handlingsorienteret plan og et understøttende business case."
          : "If together we see that AI can benefit your business, you'll have the option to move forward with a detailed, actionable plan and supporting business case.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
    },
    {
      num: "03",
      title:
        locale === "da"
          ? "Udvikling & Eksekvering"
          : "Development & Execution",
      desc:
        locale === "da"
          ? "En plan vi kan hjælpe jer med at realisere — fra proof-of-concept til produktionsklar implementering med lokal forankring."
          : "A plan we can help you bring to life — from proof-of-concept to production-ready implementation with local accountability.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  const AGENDA = [
    { label: locale === "da" ? "Introduktion" : "Introduction", time: "10 min" },
    { label: locale === "da" ? "Forståelse af AI" : "Understanding AI", time: "120 min" },
    { label: locale === "da" ? "Jeres Forretning" : "Your Business", time: "60 min" },
    { label: locale === "da" ? "Jeres Forretning og AI" : "Your Business and AI", time: "120 min" },
    { label: locale === "da" ? "Konklusion" : "Conclusion", time: "60 min" },
    { label: "Wrap-Up", time: "20 min" },
  ];

  const RESULTS = [
    {
      stat: "3,500",
      unit: locale === "da" ? "Timer" : "Hours",
      desc: locale === "da" ? "Optimeret årligt — Revision" : "Optimized yearly — Revision",
    },
    {
      stat: "+200K",
      unit: "EUR",
      desc: locale === "da" ? "Øget omsætning — Rejser" : "Increased Revenue — Travel",
    },
    {
      stat: locale === "da" ? "Disruptiv" : "Disruptive",
      unit: "",
      desc: locale === "da" ? "AI Tutor — Uddannelse" : "AI Tutor — Education",
    },
    {
      stat: locale === "da" ? "Fremtiden" : "The Future",
      unit: "",
      desc: locale === "da" ? "Sikring af fremtidige USP'er" : "Securing Future USP's",
    },
  ];

  return (
    <>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "600px",
          maxHeight: "900px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/assets/home/Workshop/workshop_hero_movie.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,15,30,0.55) 0%, rgba(10,15,30,0.80) 100%)",
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{
            position: "relative",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 80px",
            width: "100%",
          }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#7C3AED",
              marginBottom: "24px",
            }}
          >
            AI Workshop
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#FFFFFF",
              maxWidth: "800px",
              marginBottom: "32px",
            }}
          >
            {locale === "da" ? (
              <>
                Hvordan kan AI transformere{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  jeres forretning?
                </span>
              </>
            ) : (
              <>
                How can AI transform{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  your business?
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "520px",
              marginBottom: "40px",
            }}
          >
            {locale === "da"
              ? "En fokuseret endags workshop hvor jeres ledelsesteam udforsker, hvordan AI kan skabe reel værdi på tværs af forretningen."
              : "A focused one-day workshop where your leadership team explores how AI can create real value across the business."}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/contact`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 36px",
                borderRadius: "60px",
                background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                color: "#FFFFFF",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.88rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(124,58,237,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {locale === "da" ? "Bestil jeres AI Workshop" : "Request Your AI Workshop"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ BUSINESS CASE ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "120px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
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
              {locale === "da" ? "Et stærkt business case" : "A Strong Business Case"}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#0A0F1E",
                maxWidth: "700px",
                marginBottom: "20px",
              }}
            >
              {locale === "da"
                ? "Accelerér jeres digitalisering med 25 % eller spar op til 50 % af budgettet."
                : "Accelerate your digitalization by 25% or save up to 50% of your budget."}
            </motion.h2>

            <motion.div
              variants={fadeUp}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "64px",
                marginTop: "64px",
                alignItems: "center",
              }}
            >
              {/* Stat cards */}
              <div style={{ display: "flex", gap: "24px" }}>
                <div
                  style={{
                    flex: 1,
                    padding: "40px 32px",
                    borderRadius: "20px",
                    background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
                  <p style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#7C3AED", marginBottom: "8px", position: "relative" }}>+25%</p>
                  <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "0.85rem", lineHeight: 1.5, color: "#94A3B8", position: "relative" }}>
                    {locale === "da" ? "Hurtigere digitalisering" : "Faster digitalization"}
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "40px 32px",
                    borderRadius: "20px",
                    background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(6,182,212,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
                  <p style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#06B6D4", marginBottom: "8px", position: "relative" }}>50%</p>
                  <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "0.85rem", lineHeight: 1.5, color: "#94A3B8", position: "relative" }}>
                    {locale === "da" ? "Reducerede omkostninger" : "Budget savings"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "1.05rem",
                    lineHeight: 1.75,
                    color: "#374151",
                    marginBottom: "24px",
                  }}
                >
                  {locale === "da"
                    ? "Vi kombinerer global AI-ekspertise med lokal ansvarlighed for at styrke jeres AI-implementering og bane vejen for digital transformation og forretningssucces."
                    : "We combine global AI expertise with local accountability to strengthen your AI implementation, paving the way for your digital transformation and business success."}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "1.05rem",
                    lineHeight: 1.75,
                    color: "#374151",
                  }}
                >
                  {locale === "da"
                    ? "Samtidig reducerer vi jeres omkostninger og styrker jeres interne kompetencer, så I forbliver fuldt i kontrol og i stand til at træffe de rigtige beslutninger fremover."
                    : "At the same time, we reduce your costs and enhance your internal capabilities, ensuring that you remain fully in control and able to make the right decisions going forward."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3-STEP PROCESS ═══════════ */}
      <section
        style={{
          background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)",
          padding: "120px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        {/* Glow */}
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "50%", height: "80%", background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", position: "relative" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "#94A3B8",
                maxWidth: "540px",
                marginBottom: "20px",
              }}
            >
              {locale === "da"
                ? "At gøre AI til en del af jeres forretning kræver en fokuseret plan."
                : "Making AI a part of your business requires a focused plan."}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#FFFFFF",
                maxWidth: "700px",
                marginBottom: "72px",
              }}
            >
              {locale === "da" ? (
                <>
                  Jeres første skridt mod en klar{" "}
                  <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    handlingsplan og business case.
                  </span>
                </>
              ) : (
                <>
                  Your first step toward a clear{" "}
                  <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    action plan and business case.
                  </span>
                </>
              )}
            </motion.h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
              {STEPS.map((step) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  style={{
                    padding: "40px 36px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(8px)",
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "14px",
                        background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.15) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#7C3AED",
                      }}
                    >
                      {step.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-geist), system-ui, sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "rgba(124,58,237,0.6)",
                      }}
                    >
                      {locale === "da" ? `TRIN ${step.num}` : `STEP ${step.num}`}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "#FFFFFF",
                      marginBottom: "16px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.92rem",
                      lineHeight: 1.7,
                      color: "#94A3B8",
                    }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PROGRAM / AGENDA ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "120px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}
          >
            {/* Left: Agenda */}
            <div>
              <motion.p
                variants={fadeUp}
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
                {locale === "da" ? "Program" : "Program"}
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  color: "#374151",
                  marginBottom: "16px",
                }}
              >
                {locale === "da"
                  ? "Under workshoppen guider vi jer igennem essentielle AI-koncepter og forbinder dem direkte til jeres forretning, processer, systemer og datalandskab."
                  : "During the workshop, we guide you through essential AI concepts and connect them directly to your business, processes, systems, and data landscape."}
              </motion.p>
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  color: "#374151",
                  marginBottom: "48px",
                }}
              >
                {locale === "da"
                  ? "Sammen konkluderer vi, om AI kan skabe reel værdi for jeres virksomhed."
                  : "Together, we conclude whether AI can create real value for your company."}
              </motion.p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {AGENDA.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "20px 0",
                      borderBottom: "1px solid rgba(15,23,42,0.08)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-geist), system-ui, sans-serif",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "#0A0F1E",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "0.85rem",
                        color: "#94A3B8",
                        fontWeight: 500,
                      }}
                    >
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Preparation + CTA */}
            <div>
              <motion.div
                variants={fadeUp}
                style={{
                  padding: "40px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(6,182,212,0.04) 100%)",
                  border: "1px solid rgba(124,58,237,0.10)",
                  marginBottom: "32px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0A0F1E",
                    marginBottom: "16px",
                  }}
                >
                  {locale === "da" ? "Jeres Forberedelse" : "Your Preparation"}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: "#64748B",
                  }}
                >
                  {locale === "da"
                    ? "Medbring teammedlemmer med viden om jeres produkter, forretning, systemer og datalandskab. Beslutningstagere, der søger indsigt, er også meget relevante og velkomne."
                    : "Bring team members with knowledge of your products, business, systems, and data landscape. Decision-makers seeking insights are also highly relevant and welcome to join."}
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                style={{
                  padding: "40px",
                  borderRadius: "20px",
                  background: "#0A0F1E",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
                <div style={{ position: "relative" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#7C3AED",
                      marginBottom: "16px",
                    }}
                  >
                    {locale === "da" ? "Klar til at starte?" : "Ready to Start?"}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      color: "#94A3B8",
                      marginBottom: "28px",
                    }}
                  >
                    {locale === "da"
                      ? "Kontakt os for at planlægge jeres AI Workshop og tag det første skridt mod en AI-drevet organisation."
                      : "Contact us to schedule your AI Workshop and take the first step toward an AI-driven organization."}
                  </p>
                  <Link
                    href={`/${locale}/contact`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      color: "#7C3AED",
                      textDecoration: "none",
                    }}
                  >
                    {locale === "da" ? "KONTAKT OS" : "CONTACT US"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ RESULTS FROM PREVIOUS WORKSHOPS ═══════════ */}
      <section
        style={{
          background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)",
          padding: "120px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#FFFFFF",
                marginBottom: "64px",
              }}
            >
              {locale === "da" ? (
                <>
                  Resultater fra{" "}
                  <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    tidligere workshops.
                  </span>
                </>
              ) : (
                <>
                  Results from{" "}
                  <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    previous workshops.
                  </span>
                </>
              )}
            </motion.h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
              {RESULTS.map((r, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{
                    borderTop: "1px solid rgba(124,58,237,0.3)",
                    paddingTop: "28px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "#FFFFFF",
                      marginBottom: "4px",
                    }}
                  >
                    {r.stat}
                    {r.unit && (
                      <span style={{ fontSize: "0.6em", color: "#94A3B8", marginLeft: "6px", fontWeight: 500 }}>
                        {r.unit}
                      </span>
                    )}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      color: "#64748B",
                    }}
                  >
                    {r.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "120px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}
          >
            <motion.p
              variants={fadeUp}
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
              {locale === "da" ? "Tag det første skridt" : "Take the First Step"}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#0A0F1E",
                marginBottom: "24px",
              }}
            >
              {locale === "da"
                ? "Klar til at udforske jeres AI-potentiale?"
                : "Ready to explore your AI potential?"}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "#64748B",
                marginBottom: "40px",
              }}
            >
              {locale === "da"
                ? "Book en uforpligtende samtale og lad os finde ud af, om en AI Workshop er det rigtige næste skridt for jeres organisation."
                : "Book a no-obligation conversation and let's find out if an AI Workshop is the right next step for your organization."}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href={`/${locale}/contact`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 40px",
                  borderRadius: "60px",
                  background: "#0A0F1E",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(10,15,30,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {locale === "da" ? "Kontakt os" : "Get in Touch"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
