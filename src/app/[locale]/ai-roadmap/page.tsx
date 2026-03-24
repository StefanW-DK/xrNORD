"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── 8-step data ─── */
const STEPS_EN = [
  { num: "01", title: "Business Understanding", desc: "Deep-dive into your business model, goals, challenges, and competitive landscape." },
  { num: "02", title: "Data & Systems Mapping", desc: "Map your current data sources, systems, processes, and integration points." },
  { num: "03", title: "AI Opportunity Identification", desc: "Identify concrete areas where AI can create measurable value in your business." },
  { num: "04", title: "Feasibility & Maturity Assessment", desc: "Evaluate your organisation's readiness, data maturity, and technical feasibility." },
  { num: "05", title: "Prioritisation & Impact Scoring", desc: "Rank opportunities by business impact, effort, risk, and strategic alignment." },
  { num: "06", title: "Roadmap Design", desc: "Build a phased implementation roadmap with clear milestones and ownership." },
  { num: "07", title: "Business Case Development", desc: "Create detailed business cases with projected ROI, costs, and timelines." },
  { num: "08", title: "Execution & Governance", desc: "Define governance frameworks, KPIs, and accountability for implementation." },
];
const STEPS_DA = [
  { num: "01", title: "Forretningsforst\u00e5else", desc: "Dybdeg\u00e5ende analyse af jeres forretningsmodel, m\u00e5l, udfordringer og konkurrencelandskab." },
  { num: "02", title: "Data & Systemkortl\u00e6gning", desc: "Kortl\u00e6g jeres nuv\u00e6rende datakilder, systemer, processer og integrationspunkter." },
  { num: "03", title: "AI Mulighedsidentifikation", desc: "Identificer konkrete omr\u00e5der, hvor AI kan skabe m\u00e5lbar v\u00e6rdi i jeres forretning." },
  { num: "04", title: "Feasibility & Modenhedsvurdering", desc: "Evaluer jeres organisations parathed, datamodenhed og tekniske gennemf\u00f8rlighed." },
  { num: "05", title: "Prioritering & Impact Scoring", desc: "Ranger muligheder efter forretningsv\u00e6rdi, indsats, risiko og strategisk tilpasning." },
  { num: "06", title: "Roadmap Design", desc: "Byg en faseopdelt implementeringsplan med klare milep\u00e6le og ejerskab." },
  { num: "07", title: "Business Case Udvikling", desc: "Udarbejd detaljerede business cases med forventet ROI, omkostninger og tidsrammer." },
  { num: "08", title: "Eksekvering & Governance", desc: "Definer governance-rammer, KPI\u2019er og ansvarlighed for implementering." },
];

/* ─── FAQ data ─── */
const FAQ_EN = [
  { q: "What is an AI Roadmap?", a: "An AI Roadmap is a structured, strategic plan that identifies where AI creates value in your business, prioritises opportunities, and defines a clear path from current state to implementation. It connects your business strategy with AI capabilities." },
  { q: "Who is the AI Roadmap for?", a: "The AI Roadmap is designed for CEOs, CTOs, and leadership teams who want a clear, structured understanding of how AI fits into their business \u2014 and what to do next. It is relevant for both companies exploring AI for the first time and those looking to scale existing efforts." },
  { q: "How long does it take?", a: "A typical AI Roadmap engagement takes 4\u20138 weeks depending on the complexity of the organisation and the scope of the assessment. The process is designed to deliver actionable outcomes quickly without disrupting daily operations." },
  { q: "Do we need technical AI knowledge?", a: "No. The process is designed to work with business leaders, not just technical teams. We translate between business language and AI capabilities so the roadmap is practical and understandable for everyone involved in decision-making." },
  { q: "What do we get at the end?", a: "A detailed AI Roadmap document including: identified AI opportunities, feasibility assessment, prioritised initiatives, phased implementation plan, business cases with projected ROI, and a governance framework for execution." },
  { q: "How is this different from a workshop?", a: "The AI Workshop is a one-day exploration designed to help you understand whether AI is right for your business. The AI Roadmap goes deeper \u2014 it\u2019s a comprehensive strategic engagement that maps, prioritises, and plans your AI implementation across the organisation." },
];
const FAQ_DA = [
  { q: "Hvad er et AI Roadmap?", a: "Et AI Roadmap er en struktureret, strategisk plan, der identificerer hvor AI skaber v\u00e6rdi i jeres forretning, prioriterer muligheder og definerer en klar vej fra nuv\u00e6rende tilstand til implementering. Det forbinder jeres forretningsstrategi med AI-kapabiliteter." },
  { q: "Hvem er AI Roadmap til?", a: "AI Roadmap er designet til CEO\u2019er, CTO\u2019er og ledelsesteams, der \u00f8nsker en klar, struktureret forst\u00e5else af, hvordan AI passer ind i deres forretning \u2014 og hvad n\u00e6ste skridt er." },
  { q: "Hvor lang tid tager det?", a: "Et typisk AI Roadmap-forl\u00f8b tager 4\u20138 uger afh\u00e6ngigt af organisationens kompleksitet og vurderingens omfang. Processen er designet til at levere handlingsbare resultater hurtigt." },
  { q: "Skal vi have teknisk AI-viden?", a: "Nej. Processen er designet til at fungere med forretningsledere, ikke kun tekniske teams. Vi overs\u00e6tter mellem forretningssprog og AI-kapabiliteter." },
  { q: "Hvad f\u00e5r vi til sidst?", a: "Et detaljeret AI Roadmap-dokument inklusiv: identificerede AI-muligheder, feasibility-vurdering, prioriterede initiativer, faseopdelt implementeringsplan, business cases med forventet ROI og en governance-ramme." },
  { q: "Hvordan adskiller dette sig fra en workshop?", a: "AI Workshop er en \u00e9n-dags udforskning, der hj\u00e6lper jer med at forst\u00e5, om AI er rigtigt for jeres forretning. AI Roadmap g\u00e5r dybere \u2014 det er et omfattende strategisk forl\u00f8b." },
];

/* ─── maturity levels ─── */
const MATURITY_EN = [
  { level: "Exploring", color: "#A855F7", desc: "Aware of AI potential but no clear direction yet" },
  { level: "Experimenting", color: "#818CF8", desc: "Running pilots or small-scale tests" },
  { level: "Implementing", color: "#6366F1", desc: "Deploying AI in specific business areas" },
  { level: "Scaling", color: "#4F46E5", desc: "AI integrated across multiple functions" },
  { level: "Transforming", color: "#3B82F6", desc: "AI is a core part of the business strategy" },
];
const MATURITY_DA = [
  { level: "Udforskende", color: "#A855F7", desc: "Bevidst om AI-potentiale men ingen klar retning endnu" },
  { level: "Eksperimenterende", color: "#818CF8", desc: "K\u00f8rer piloter eller sm\u00e5 fors\u00f8g" },
  { level: "Implementerende", color: "#6366F1", desc: "Implementerer AI i specifikke forretningsomr\u00e5der" },
  { level: "Skalerende", color: "#4F46E5", desc: "AI integreret p\u00e5 tv\u00e6rs af flere funktioner" },
  { level: "Transformerende", color: "#3B82F6", desc: "AI er en kernekomponent i forretningsstrategien" },
];

/* ─── FAQ accordion item ─── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#FFFFFF",
            paddingRight: "32px",
          }}
        >
          {q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1px solid rgba(168,85,247,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s ease, background 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            background: open ? "rgba(168,85,247,0.15)" : "transparent",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
          opacity: open ? 1 : 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.8,
            paddingBottom: "28px",
            maxWidth: "680px",
          }}
        >
          {a}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AIRoadmapPage() {
  const locale = useLocale();
  const steps = locale === "da" ? STEPS_DA : STEPS_EN;
  const faqs = locale === "da" ? FAQ_DA : FAQ_EN;
  const maturity = locale === "da" ? MATURITY_DA : MATURITY_EN;

  return (
    <>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          background: "linear-gradient(160deg, #020510 0%, #0A0F1E 40%, #0F1629 100%)",
        }}
      >
        {/* Subtle background pattern — ghosted roadmap nodes */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.06 }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "72%", top: "10%", width: "1px", height: "80%", background: "linear-gradient(to bottom, transparent, #A855F7, transparent)" }} />
          {/* Horizontal line */}
          <div style={{ position: "absolute", left: "20%", top: "55%", width: "60%", height: "1px", background: "linear-gradient(to right, transparent, #818CF8, transparent)" }} />
          {/* Nodes */}
          {[
            { x: "72%", y: "25%" }, { x: "72%", y: "55%" }, { x: "72%", y: "78%" },
            { x: "35%", y: "55%" }, { x: "50%", y: "55%" },
            { x: "20%", y: "30%" }, { x: "85%", y: "42%" },
          ].map((n, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: n.x,
                top: n.y,
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: i % 2 === 0 ? "#A855F7" : "#818CF8",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          {/* Concentric rings — unified strategy ghost */}
          <div style={{ position: "absolute", left: "72%", top: "55%", transform: "translate(-50%, -50%)" }}>
            {[80, 120, 160].map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: `${s}px`,
                  height: `${s}px`,
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: i === 0 ? "#A855F7" : "#818CF8",
                  left: `${-s / 2}px`,
                  top: `${-s / 2}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Top-right glow */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            right: "-10%",
            width: "50%",
            height: "60%",
            background: "radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 80px 120px",
            position: "relative",
            zIndex: 3,
            width: "100%",
          }}
        >
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#C084FC",
                marginBottom: "28px",
              }}
            >
              {locale === "da" ? "AI Roadmap" : "AI Roadmap"}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                marginBottom: "36px",
                maxWidth: "780px",
              }}
            >
              {locale === "da" ? (
                <>
                  Stop med at g\u00e6tte.{" "}
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #818CF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Byg jeres AI-strategi.
                  </span>
                </>
              ) : (
                <>
                  Stop Guessing.{" "}
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #818CF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Build Your AI Strategy.
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.15rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                maxWidth: "520px",
                marginBottom: "48px",
              }}
            >
              {locale === "da"
                ? "Et struktureret forl\u00f8b der forbinder jeres forretningsstrategi med AI \u2014 s\u00e5 I ved pr\u00e6cis hvad der skaber v\u00e6rdi, og hvad n\u00e6ste skridt er."
                : "A structured engagement that connects your business strategy with AI \u2014 so you know exactly what creates value, and what to do next."}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href={`/${locale}/workshop`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
                  borderRadius: "100px",
                  padding: "15px 34px",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
                }}
              >
                {locale === "da" ? "Start med en workshop" : "Start With a Workshop"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade to white */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "160px",
            background: "linear-gradient(to top, #FFFFFF 0%, transparent 100%)",
            zIndex: 2,
          }}
        />
      </section>

      {/* ═══════════ UNIFIED STRATEGY ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "120px 0 140px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ textAlign: "center", marginBottom: "80px" }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#A855F7",
                marginBottom: "20px",
              }}
            >
              {locale === "da" ? "Strategisk fundament" : "Strategic Foundation"}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#0A0F1E",
                maxWidth: "600px",
                margin: "0 auto 16px",
              }}
            >
              {locale === "da"
                ? "To strategier. \u00c9n retning."
                : "Two Strategies. One Direction."}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.05rem",
                color: "#6B7280",
                lineHeight: 1.7,
                maxWidth: "540px",
                margin: "0 auto",
              }}
            >
              {locale === "da"
                ? "AI skaber kun v\u00e6rdi n\u00e5r den er forbundet med jeres forretningsstrategi. Vi bringer de to sammen."
                : "AI only creates value when connected to your business strategy. We bring the two together."}
            </motion.p>
          </motion.div>

          {/* Unified Strategy Graphic */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0",
              padding: "60px 0",
            }}
          >
            {/* Business Strategy circle */}
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(10,15,30,0.04) 0%, rgba(10,15,30,0.08) 100%)",
                  border: "2px solid rgba(10,15,30,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "8px",
                  position: "relative",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 3v18" />
                </svg>
                <span style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "13px", fontWeight: 700, color: "#0A0F1E", letterSpacing: "-0.01em" }}>
                  {locale === "da" ? "Forretnings-" : "Business"}
                </span>
                <span style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "13px", fontWeight: 700, color: "#0A0F1E", letterSpacing: "-0.01em", marginTop: "-8px" }}>
                  {locale === "da" ? "strategi" : "Strategy"}
                </span>
              </div>
            </div>

            {/* Connection — plus sign & arrows */}
            <div style={{ display: "flex", alignItems: "center", gap: "0", margin: "0 -28px", zIndex: 2 }}>
              <div style={{ width: "56px", height: "2px", background: "linear-gradient(to right, rgba(10,15,30,0.1), rgba(168,85,247,0.3))" }} />
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <div style={{ width: "56px", height: "2px", background: "linear-gradient(to right, rgba(168,85,247,0.3), rgba(168,85,247,0.1))" }} />
            </div>

            {/* AI Strategy circle */}
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(129,140,248,0.08) 100%)",
                  border: "2px solid rgba(168,85,247,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
                <span style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "13px", fontWeight: 700, color: "#7C3AED" }}>
                  AI
                </span>
                <span style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "13px", fontWeight: 700, color: "#7C3AED", marginTop: "-8px" }}>
                  {locale === "da" ? "Strategi" : "Strategy"}
                </span>
              </div>
            </div>

            {/* Equals arrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "0", margin: "0 -8px 0 16px", zIndex: 2 }}>
              <div style={{ width: "60px", height: "2px", background: "linear-gradient(to right, rgba(168,85,247,0.15), rgba(168,85,247,0.4))" }} />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Unified Strategy — larger, glowing */}
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: "260px",
                  height: "260px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(168,85,247,0.12) 50%, rgba(129,140,248,0.08) 100%)",
                  border: "2px solid rgba(168,85,247,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "8px",
                  boxShadow: "0 0 80px rgba(168,85,247,0.1), inset 0 0 40px rgba(168,85,247,0.04)",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "15px", fontWeight: 800, color: "#0A0F1E", letterSpacing: "-0.01em" }}>
                  {locale === "da" ? "Samlet" : "Unified"}
                </span>
                <span style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "15px", fontWeight: 800, color: "#0A0F1E", letterSpacing: "-0.01em", marginTop: "-8px" }}>
                  {locale === "da" ? "Strategi" : "Strategy"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 8-STEP PROCESS ═══════════ */}
      <section
        style={{
          background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)",
          padding: "140px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px", position: "relative" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ textAlign: "center", marginBottom: "96px" }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C084FC",
                marginBottom: "20px",
              }}
            >
              {locale === "da" ? "Processen" : "The Process"}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              {locale === "da" ? (
                <>
                  8 skridt fra forst\u00e5else til{" "}
                  <span style={{ background: "linear-gradient(135deg, #E879F9, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    eksekvering.
                  </span>
                </>
              ) : (
                <>
                  8 steps from understanding to{" "}
                  <span style={{ background: "linear-gradient(135deg, #E879F9, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    execution.
                  </span>
                </>
              )}
            </motion.h2>
          </motion.div>

          {/* Steps grid — 2 columns of 4 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 64px",
            }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                style={{
                  display: "flex",
                  gap: "24px",
                  padding: "36px 0",
                  borderBottom: i < 6 ? "1px solid rgba(255,255,255,0.06)" : i === 6 || i === 7 ? "none" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, rgba(168,85,247,${0.08 + i * 0.02}) 0%, rgba(129,140,248,${0.06 + i * 0.015}) 100%)`,
                    border: "1px solid rgba(168,85,247,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#C084FC",
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ MATURITY ASSESSMENT ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "140px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "100px", alignItems: "center" }}
          >
            {/* Left: text */}
            <motion.div variants={fadeUp}>
              <p
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#A855F7",
                  marginBottom: "20px",
                }}
              >
                {locale === "da" ? "Modenhedsvurdering" : "Maturity Assessment"}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#0A0F1E",
                  marginBottom: "24px",
                }}
              >
                {locale === "da"
                  ? "Hvor er jeres organisation i dag?"
                  : "Where Is Your Organisation Today?"}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "1.05rem",
                  color: "#6B7280",
                  lineHeight: 1.8,
                }}
              >
                {locale === "da"
                  ? "Vi vurderer jeres nuv\u00e6rende AI-modenhed p\u00e5 tv\u00e6rs af data, teknologi, processer og organisation \u2014 og kortl\u00e6gger den mest realistiske vej fremad."
                  : "We assess your current AI maturity across data, technology, processes, and organisation \u2014 and map the most realistic path forward."}
              </p>
            </motion.div>

            {/* Right: maturity scale */}
            <motion.div variants={fadeUp}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {maturity.map((m, i) => (
                  <div
                    key={m.level}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      padding: "22px 0",
                      borderBottom: i < maturity.length - 1 ? "1px solid #F3F4F6" : "none",
                    }}
                  >
                    {/* Progress bar */}
                    <div style={{ width: "140px", flexShrink: 0 }}>
                      <div
                        style={{
                          height: "6px",
                          borderRadius: "3px",
                          background: "#F3F4F6",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${20 + i * 20}%`,
                            height: "100%",
                            borderRadius: "3px",
                            background: `linear-gradient(to right, ${m.color}, ${m.color}dd)`,
                            transition: "width 0.8s ease",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-geist), system-ui, sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: "#0A0F1E",
                          display: "block",
                          marginBottom: "2px",
                        }}
                      >
                        {m.level}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-geist), system-ui, sans-serif",
                          fontSize: "0.8rem",
                          color: "#9CA3AF",
                        }}
                      >
                        {m.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section
        style={{
          background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)",
          padding: "140px 0",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "100px",
              alignItems: "start",
            }}
          >
            {/* Left: heading */}
            <div>
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C084FC",
                  marginBottom: "20px",
                }}
              >
                FAQ
              </motion.p>
              <motion.h2
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                }}
              >
                {locale === "da"
                  ? "Ofte stillede sp\u00f8rgsm\u00e5l"
                  : "Frequently Asked Questions"}
              </motion.h2>
            </div>

            {/* Right: accordion */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "140px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ maxWidth: "640px" }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#A855F7",
                marginBottom: "24px",
              }}
            >
              {locale === "da" ? "N\u00e6ste skridt" : "Next Step"}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#0A0F1E",
                marginBottom: "24px",
              }}
            >
              {locale === "da"
                ? "Klar til at bygge jeres AI-strategi?"
                : "Ready to Build Your AI Strategy?"}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.1rem",
                color: "#6B7280",
                lineHeight: 1.8,
                marginBottom: "48px",
              }}
            >
              {locale === "da"
                ? "Start med klarhed. Vores AI Workshop er det f\u00f8rste skridt mod en struktureret AI-strategi, der skaber reel v\u00e6rdi."
                : "Start with clarity. Our AI Workshop is the first step toward a structured AI strategy that creates real value."}
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href={`/${locale}/workshop`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
                  borderRadius: "100px",
                  padding: "16px 36px",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  boxShadow: "0 8px 32px rgba(124,58,237,0.3)",
                }}
              >
                {locale === "da" ? "Book en AI Workshop" : "Book an AI Workshop"}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/why-ai/interviews`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "transparent",
                  border: "1px solid #E5E7EB",
                  borderRadius: "100px",
                  padding: "16px 36px",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#374151",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                {locale === "da" ? "Se interviews" : "View Interviews"}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
