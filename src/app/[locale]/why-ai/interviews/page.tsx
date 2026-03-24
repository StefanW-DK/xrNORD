"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

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
  visible: { transition: { staggerChildren: 0.13 } },
};

const INTERVIEWS = [
  {
    id: "greybird",
    company: "Greybird",
    ytId: "MoQ2YDH_kRM",
    logo: "/assets/interviews/greybird-logo.png",
    headlineEn: "How AI is changing pilot training",
    headlineDa: "Hvordan AI forandrer pilottræning",
    descEn:
      "A real-world look at how AI and XR can improve training, precision, and operational readiness in one of the world's most demanding industries.",
    descDa:
      "Et praktisk indblik i, hvordan AI og XR kan forbedre træning, præcision og operationel parathed i en af verdens mest krævende brancher.",
    tag: "Aviation & Training",
  },
  {
    id: "dinero",
    company: "Dinero",
    ytId: "QW7gsN19Rtw",
    logo: "/assets/interviews/dinero-logo.png",
    headlineEn: "When accounting software becomes a personal AI CFO",
    headlineDa: "Når regnskabssoftware bliver en personlig AI-CFO",
    descEn:
      "A practical view on how AI can move from standard tools to more intelligent, high-value business support — reshaping how companies handle their finances.",
    descDa:
      "Et praktisk blik på, hvordan AI kan gå fra standardværktøj til mere intelligent, værdiskabende forretningsstøtte — og forme, hvordan virksomheder håndterer deres økonomi.",
    tag: "Finance & SaaS",
  },
  {
    id: "no-zebra",
    company: "No Zebra",
    ytId: "jIIQICDFufY",
    logo: "/assets/interviews/nzlogo.svg",
    headlineEn: "How AI is reshaping marketing work",
    headlineDa: "Hvordan AI omformer marketingarbejdet",
    descEn:
      "A conversation about how AI changes delivery, creativity, and value creation inside a modern digital business — and what that means for teams and clients.",
    descDa:
      "En samtale om, hvordan AI forandrer leverance, kreativitet og værdiskabelse i en moderne digital virksomhed — og hvad det betyder for teams og kunder.",
    tag: "Digital & Marketing",
  },
  {
    id: "vrpilot",
    company: "VRPilot",
    ytId: "HvInwzzQXUQ",
    logo: "/assets/interviews/vrpilot-logo.png",
    headlineEn: "From experimentation to real impact",
    headlineDa: "Fra eksperimentering til reel effekt",
    descEn:
      "VRPilot is applying AI and XR in a field where precision matters. A conversation about implementation, value creation, and what others can learn from it.",
    descDa:
      "VRPilot anvender AI og XR i et felt, hvor præcision er afgørende. En samtale om implementering, værdiskabelse og hvad andre kan lære af det.",
    tag: "Technology & Implementation",
  },
  {
    id: "aias",
    company: "AIAS / Aarhus Institute of Advanced Studies",
    ytId: "9NbDjEmLbS8",
    logo: "/assets/interviews/AIAS-Logo.png",
    headlineEn: "How AI may reshape business and the future of work",
    headlineDa: "Hvordan AI kan omforme forretning og fremtidens arbejde",
    descEn:
      "A broader perspective on what AI changes across organisations, work structures, and decision-making — from one of Denmark's leading research institutions.",
    descDa:
      "Et bredere perspektiv på, hvad AI forandrer på tværs af organisationer, arbejdsstrukturer og beslutningstagning — fra en af Danmarks ledende forskningsinstitutioner.",
    tag: "Research & Futures",
  },
];

const FEATURED = {
  id: "aias",
  company: "AIAS / Aarhus Institute of Advanced Studies",
  ytId: "9NbDjEmLbS8",
  logo: "/assets/interviews/AIAS-Logo.png",
  headlineEn: "How AI may reshape business and the future of work",
  headlineDa: "Hvordan AI kan omforme forretning og fremtidens arbejde",
  descEn:
    "A broader perspective on what AI changes across organisations, work structures, and decision-making — from one of Denmark's leading research institutions. A conversation that reaches beyond tools and into the deeper questions every business leader is starting to ask.",
  descDa:
    "Et bredere perspektiv på, hvad AI forandrer på tværs af organisationer, arbejdsstrukturer og beslutningstagning — fra en af Danmarks ledende forskningsinstitutioner. En samtale, der rækker ud over værktøjer og ind i de dybere spørgsmål, som enhver virksomhedsleder begynder at stille.",
  tag: "Research & Futures",
};

function InterviewCard({
  interview,
  locale,
  index,
}: {
  interview: (typeof INTERVIEWS)[0];
  locale: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ytUrl = `https://www.youtube.com/watch?v=${interview.ytId}`;

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#F9FAFB" : "#FFFFFF",
        border: "1px solid",
        borderColor: hovered ? "#E9D5FF" : "#F3F4F6",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Thumbnail — fully clickable */}
      <a
        href={ytUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", position: "relative", aspectRatio: "16/9", overflow: "hidden", textDecoration: "none" }}
      >
        <img
          src={`https://img.youtube.com/vi/${interview.ytId}/maxresdefault.jpg`}
          alt={interview.company}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)"
              : "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3) 100%)",
            transition: "all 0.3s ease",
          }}
        />
        {/* Tag */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "rgba(124,58,237,0.85)",
            backdropFilter: "blur(8px)",
            borderRadius: "6px",
            padding: "4px 10px",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          {interview.tag}
        </div>
        {/* Play icon — always visible, brighter on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.82)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: hovered ? "0 6px 28px rgba(0,0,0,0.35)" : "0 4px 16px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#7C3AED">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      </a>

      {/* Content */}
      <div style={{ padding: "28px 28px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Logo + company name row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <img
            src={interview.logo}
            alt={`${interview.company} logo`}
            style={{
              height: "28px",
              width: "auto",
              objectFit: "contain",
              objectPosition: "left center",
              maxWidth: "100px",
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <p
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#A855F7",
              margin: 0,
            }}
          >
            {interview.company}
          </p>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#0A0F1E",
            lineHeight: 1.3,
            marginBottom: "12px",
          }}
        >
          {locale === "da" ? interview.headlineDa : interview.headlineEn}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "0.9rem",
            color: "#6B7280",
            lineHeight: 1.7,
            flex: 1,
            marginBottom: "24px",
          }}
        >
          {locale === "da" ? interview.descDa : interview.descEn}
        </p>
        <a
          href={`https://www.youtube.com/watch?v=${interview.ytId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#7C3AED",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          {locale === "da" ? "Se interview" : "Watch Interview"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function InterviewsPage() {
  const locale = useLocale();

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
          background: "#020510",
        }}
      >
        {/* Background video */}
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
            opacity: 0.35,
            filter: "saturate(0.6) brightness(0.7)",
          }}
        >
          <source src="/assets/home/why/xrNORD_interview.mp4" type="video/mp4" />
        </video>

        {/* Multi-layer overlay for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(2,5,16,0.55) 0%, rgba(2,5,16,0.2) 40%, rgba(2,5,16,0.85) 100%)",
          }}
        />
        {/* Left vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(2,5,16,0.7) 0%, transparent 60%)",
          }}
        />
        {/* Subtle pink glow top right */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "45%",
            height: "60%",
            background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top fade transition */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, rgba(2,5,16,0.9) 0%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Hero content */}
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Micro label */}
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
              {locale === "da" ? "Virkelige samtaler" : "Real Conversations"}
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(3rem, 6.5vw, 6rem)",
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                marginBottom: "36px",
                maxWidth: "900px",
              }}
            >
              {locale === "da" ? (
                <>
                  Hvad ledere og eksperter{" "}
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #818CF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ser lige nu
                  </span>
                </>
              ) : (
                <>
                  What Leaders and Experts{" "}
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #818CF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Are Seeing Right Now
                  </span>
                </>
              )}
            </motion.h1>

            {/* P */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.15rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                maxWidth: "540px",
                marginBottom: "48px",
              }}
            >
              {locale === "da"
                ? "Direkte perspektiver på, hvordan AI bruges, hvor det skaber værdi, og hvad det forandrer for erhvervslivet."
                : "Direct perspectives on how AI is being used, where it creates value, and what it changes for business."}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <a
                href="#interviews"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(168,85,247,0.15)",
                  border: "1px solid rgba(168,85,247,0.4)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "100px",
                  padding: "14px 32px",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#E9D5FF",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "all 0.3s ease",
                }}
              >
                {locale === "da" ? "Se interviews" : "View Interviews"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
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

      {/* ═══════════ ALL LOGOS STRIP ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              color: "rgba(0,0,0,0.3)",
              marginBottom: "52px",
            }}
          >
            {locale === "da" ? "Virksomheder vi har talt med" : "Companies We Have Spoken With"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px 64px",
            }}
          >
            {[
              { name: "Greybird",       logo: "/assets/interviews/greybird-logo.png",      h: 56 },
              { name: "Dinero",         logo: "/assets/interviews/dinero-logo.png",         h: 36 },
              { name: "No Zebra",       logo: "/assets/interviews/nzlogo.svg",              h: 36 },
              { name: "AIAS",           logo: "/assets/interviews/AIAS-Logo.png",           h: 64 },
              { name: "VRPilot",        logo: "/assets/interviews/vrpilot-logo.png",        h: 56 },
              { name: "Dansk Erhverv",  logo: "/assets/interviews/danskerhverv-logo.jpg",   h: 72 },
              { name: "Renteq",         logo: "/assets/interviews/Renteq-logo.png",         h: 32 },
              // { name: "EVRT", logo: "/assets/interviews/EVRT-logo.webp", h: 36 }, // coming soon
            ].map((item) => (
              <div
                key={item.name}
                style={{
                  filter: "grayscale(100%) opacity(0.4)",
                  transition: "filter 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.filter = "grayscale(0%) opacity(1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.filter = "grayscale(100%) opacity(0.4)"; }}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  style={{ height: `${item.h}px`, width: "auto", maxWidth: "160px", objectFit: "contain", display: "block" }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FRAMING SECTION ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "120px 0 100px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 80px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
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
                color: "#A855F7",
                marginBottom: "24px",
              }}
            >
              {locale === "da" ? "Hvorfor det betyder noget" : "Why This Matters"}
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
                marginBottom: "0",
              }}
            >
              {locale === "da" ? "AI er ikke længere teoretisk" : "AI Is No Longer Theoretical"}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.05rem",
                color: "#374151",
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
            >
              {locale === "da"
                ? "Virksomheder træffer allerede beslutninger om AI. Nogle bevæger sig tidligt. Andre venter."
                : "Companies are already making decisions about AI. Some are moving early. Others are waiting."}
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.05rem",
                color: "#6B7280",
                lineHeight: 1.8,
              }}
            >
              {locale === "da"
                ? "Disse samtaler giver et direkte indblik i, hvordan ledere og specialister tænker om AI, hvor de ser værdi, og hvad de mener det vil forandre."
                : "These conversations offer a direct view into how leaders and specialists are thinking about AI, where they see value, and what they believe it will change."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURED INTERVIEW ═══════════ */}
      <section
        style={{
          background: "#F9FAFB",
          padding: "100px 0 120px",
          borderTop: "1px solid #F3F4F6",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 80px",
          }}
        >
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#A855F7",
              marginBottom: "60px",
            }}
          >
            {locale === "da" ? "Fremhævet interview" : "Featured Interview"}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {/* Left: copy */}
            <motion.div variants={fadeUp}>
              {/* Featured logo + company */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                <img
                  src={FEATURED.logo}
                  alt={`${FEATURED.company} logo`}
                  style={{
                    height: "32px",
                    width: "auto",
                    objectFit: "contain",
                    objectPosition: "left center",
                    maxWidth: "120px",
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#A855F7",
                    margin: 0,
                  }}
                >
                  {FEATURED.company}
                </p>
              </div>
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
                {locale === "da" ? FEATURED.headlineDa : FEATURED.headlineEn}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "1.05rem",
                  color: "#4B5563",
                  lineHeight: 1.8,
                  marginBottom: "40px",
                }}
              >
                {locale === "da" ? FEATURED.descDa : FEATURED.descEn}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${FEATURED.ytId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
                  borderRadius: "100px",
                  padding: "14px 32px",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                {locale === "da" ? "Se fremhævet interview" : "Watch Featured Interview"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </a>
            </motion.div>

            {/* Right: video card */}
            <motion.div variants={fadeUp}>
              <a
                href={`https://www.youtube.com/watch?v=${FEATURED.ytId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  borderRadius: "20px",
                  overflow: "hidden",
                  position: "relative",
                  aspectRatio: "16/9",
                  boxShadow: "0 32px 80px rgba(124,58,237,0.15), 0 8px 32px rgba(0,0,0,0.12)",
                  textDecoration: "none",
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${FEATURED.ytId}/maxresdefault.jpg`}
                  alt={FEATURED.company}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 50%, rgba(10,15,30,0.6) 100%)",
                  }}
                />
                {/* Play button */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 32px rgba(124,58,237,0.45)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                {/* Company label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "0.05em",
                  }}
                >
                  {FEATURED.company} — {FEATURED.tag}
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ INTERVIEW GRID ═══════════ */}
      <section
        id="interviews"
        style={{ background: "#FFFFFF", padding: "120px 0" }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 80px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ marginBottom: "72px" }}
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
              {locale === "da" ? "Kuraterede samtaler" : "Curated Conversations"}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#0A0F1E",
              }}
            >
              {locale === "da"
                ? "Perspektiver fra praksis"
                : "Perspectives From Practice"}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
            }}
          >
            {INTERVIEWS.map((interview, i) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                locale={locale}
                index={i}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ UPCOMING INTERVIEWS ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "100px 0 120px", borderTop: "1px solid #F3F4F6" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {/* Left: text */}
            <div>
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#A855F7",
                  marginBottom: "16px",
                }}
              >
                {locale === "da" ? "Kommende" : "Coming Soon"}
              </motion.p>

              <motion.h2
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#0A0F1E",
                  marginBottom: "16px",
                }}
              >
                {locale === "da" ? "Kommende interviews" : "Upcoming Interviews"}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "1rem",
                  color: "#9CA3AF",
                }}
              >
                {locale === "da"
                  ? "Flere interviews på vej – følg med for nye perspektiver"
                  : "More interviews coming soon – stay tuned for new insights"}
              </motion.p>
            </div>

            {/* Right: logos */}
            <motion.div
              variants={stagger}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "48px",
                flexWrap: "wrap",
              }}
            >
              {[
                { name: "Dansk Erhverv", logo: "/assets/interviews/danskerhverv-logo.jpg" },
                { name: "Renteq", logo: "/assets/interviews/Renteq-logo.png" },
                { name: "EVRT", logo: "/assets/interviews/EVRT-logo.webp" },
              ].map((item) => (
                <motion.div
                  key={item.name}
                  variants={fadeUp}
                  style={{
                    opacity: 0.5,
                    filter: "grayscale(100%)",
                    transition: "opacity 0.3s ease, filter 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.opacity = "1";
                    (e.currentTarget as HTMLDivElement).style.filter = "grayscale(0%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.opacity = "0.5";
                    (e.currentTarget as HTMLDivElement).style.filter = "grayscale(100%)";
                  }}
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    style={{
                      height: "72px",
                      width: "auto",
                      maxWidth: "200px",
                      objectFit: "contain",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ XRNORD TRUST SECTION ═══════════ */}
      <section
        style={{
          background: "#F9FAFB",
          padding: "120px 0",
          borderTop: "1px solid #F3F4F6",
          borderBottom: "1px solid #F3F4F6",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 80px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.05rem",
                color: "#374151",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              {locale === "da"
                ? "Disse interviews er en del af vores arbejde med AI i virkelige forretningsmiljøer."
                : "These interviews are part of our work around AI in real business settings."}
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.05rem",
                color: "#374151",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              {locale === "da"
                ? "De afspejler de spørgsmål, muligheder og beslutninger, virksomheder allerede står overfor."
                : "They reflect the questions, opportunities, and decisions companies are already facing."}
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.05rem",
                color: "#6B7280",
                lineHeight: 1.9,
              }}
            >
              {locale === "da"
                ? "Vi følger ikke bare skiftet. Vi arbejder direkte med de mennesker og virksomheder, der forsøger at forstå det og handle på det."
                : "We do not just follow the shift. We work directly with the people and businesses trying to understand it and act on it."}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
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
                color: "#A855F7",
                marginBottom: "24px",
              }}
            >
              {locale === "da" ? "xrNORD perspektiv" : "xrNORD Perspective"}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#0A0F1E",
              }}
            >
              {locale === "da"
                ? "Vi er tæt på de samtaler, der former det næste"
                : "We Are Close To The Conversations Shaping What Comes Next"}
            </motion.h2>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "140px 0" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 80px",
          }}
        >
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
              {locale === "da" ? "Næste skridt" : "Next Step"}
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
                ? "Klar til at forstå, hvad AI betyder for jeres forretning?"
                : "Ready to understand what AI means for your business?"}
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
                ? "Start med klarhed. I én fokuseret session hjælper vi jer med at forstå, hvor AI skaber værdi, og hvad jeres næste skridt bør være."
                : "Start with clarity. In one focused session, we help you understand where AI creates value and what your next step should be."}
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
                {locale === "da" ? "Anmod om AI Workshop" : "Request Your AI Workshop"}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
