"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

export default function WorkshopProcess() {
  const locale = useLocale();

  const STEPS = [
    {
      num: "01",
      title: "Discovery Workshop",
      desc:
        locale === "da"
          ? "Vores AI Workshop er det første skridt på jeres AI-rejse. Her får I ekspertvejledning i, hvordan AI kan skabe konkret værdi for jeres virksomhed."
          : "A focused, 1-day session to understand your business, explore where AI creates value, and identify where to start.",
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
      title: locale === "da" ? "Analyse, Planlægning & Business Case" : "Define Your Future Direction",
      desc:
        locale === "da"
          ? "Hvis vi sammen ser, at AI kan gavne jeres forretning, har I mulighed for at gå videre med en detaljeret, handlingsorienteret plan og et understøttende business case."
          : "We go deep into your business to challenge your current strategy, identify where AI creates the greatest impact, and define a clear roadmap forward.",
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
      title: locale === "da" ? "Udvikling & Eksekvering" : "Execution & Implementation",
      desc:
        locale === "da"
          ? "En plan vi kan hjælpe jer med at realisere — fra proof-of-concept til produktionsklar implementering med lokal forankring."
          : "We bring your roadmap to life — implementing solutions into your business and turning strategy into real operational impact.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)",
        padding: "clamp(72px, 10vw, 120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "50%", height: "80%", background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="page-container" style={{ position: "relative" }}>
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
                Your first step toward securing{" "}
                <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  your future business.
                </span>
              </>
            )}
          </motion.h2>

          {/* Cards with flow arrows */}
          <div className="workshop-steps-grid">
            {STEPS.map((step, idx) => {
              const isFirst = idx === 0;
              return (
                <React.Fragment key={step.num}>
                  <motion.div
                    variants={fadeUp}
                    style={{
                      padding: "40px 36px",
                      borderRadius: "20px",
                      background: isFirst ? "rgba(192,38,211,0.08)" : "rgba(255,255,255,0.03)",
                      border: isFirst ? "1px solid rgba(192,38,211,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      backdropFilter: "blur(8px)",
                      transition: "border-color 0.3s, background 0.3s",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isFirst ? "rgba(192,38,211,0.45)" : "rgba(124,58,237,0.25)";
                      e.currentTarget.style.background = isFirst ? "rgba(192,38,211,0.12)" : "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isFirst ? "rgba(192,38,211,0.25)" : "rgba(255,255,255,0.06)";
                      e.currentTarget.style.background = isFirst ? "rgba(192,38,211,0.08)" : "rgba(255,255,255,0.03)";
                    }}
                  >
                    {/* Active indicator for first card */}
                    {isFirst && (
                      <div style={{
                        position: "absolute",
                        top: "-1px",
                        left: "36px",
                        right: "36px",
                        height: "2px",
                        background: "linear-gradient(90deg, #C026D3, #9333EA)",
                        borderRadius: "0 0 2px 2px",
                      }} />
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                      <div style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "14px",
                        background: isFirst
                          ? "linear-gradient(135deg, rgba(192,38,211,0.25) 0%, rgba(147,51,234,0.2) 100%)"
                          : "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.15) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isFirst ? "#C026D3" : "#7C3AED",
                      }}>
                        {step.icon}
                      </div>
                      <span style={{
                        fontFamily: "var(--font-geist), system-ui, sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: isFirst ? "rgba(192,38,211,0.8)" : "rgba(124,58,237,0.6)",
                      }}>
                        {locale === "da" ? `TRIN ${step.num}` : `STEP ${step.num}`}
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "#FFFFFF",
                      marginBottom: "16px",
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.92rem",
                      lineHeight: 1.7,
                      color: "#94A3B8",
                    }}>
                      {step.desc}
                    </p>
                  </motion.div>

                  {/* Flow arrow */}
                  {idx < STEPS.length - 1 && (
                    <div className="workshop-step-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", alignSelf: "center" }}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M8 16h16M20 10l6 6-6 6" stroke="rgba(192,38,211,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* CTA link to workshop page */}
          <motion.div variants={fadeUp} style={{ marginTop: "56px", textAlign: "center" }}>
            <Link
              href={`/${locale}/workshop`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 32px",
                borderRadius: "60px",
                background: "linear-gradient(135deg, rgba(192,38,211,0.8) 0%, rgba(147,51,234,0.85) 100%)",
                color: "rgba(255,255,255,0.95)",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                border: "1px solid rgba(192,38,211,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(192,38,211,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {locale === "da" ? "Udforsk AI Workshoppen" : "Explore the AI Workshop"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
