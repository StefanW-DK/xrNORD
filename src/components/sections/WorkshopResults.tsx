"use client";

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

export default function WorkshopResults() {
  const locale = useLocale();

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
  );
}
