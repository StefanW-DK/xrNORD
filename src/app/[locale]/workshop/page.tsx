"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── FAQ data ─── */
interface FAQEntry { q: string; a: string; }

const FAQ_EN: FAQEntry[] = [
  {
    q: "Does the workshop require technical knowledge or AI experience?",
    a: "You do not need to be AI specialists. We introduce the relevant concepts and connect them to your business. Your most important contribution is knowledge about your company, its products, workflows and ambitions.",
  },
  {
    q: "We already use AI. What can the workshop add?",
    a: "The workshop takes as its starting point what you already do, and explores opportunities across the business. Where can AI strengthen your products and competitive advantages? What can be improved in your workflows? And how can your employees' knowledge and AI create greater value together? The goal is to find the opportunities worth pursuing further.",
  },
  {
    q: "How does the workshop take our specific company and industry as its starting point?",
    a: "We bring knowledge about AI and its application in your industry. You bring knowledge of your business. We examine your products, processes, systems and data with a focus on what makes you distinctive, and where AI can make a meaningful difference. The aim is not to find the most use cases, but the right ones for you.",
  },
  {
    q: "Can the workshop focus on a specific area or product?",
    a: "Yes. We can explore AI opportunities broadly across the business, or go deeper into a specific business area, process or product.\n\nThe broad approach gives you an overview, while a focused scope allows for more detailed exploration of the opportunities. We also look at dependencies to other parts of the business and how they might be affected.\n\nWe agree on the focus with you before the workshop.",
  },
  {
    q: "What does an AI workshop cost?",
    a: "A full-day AI workshop with us costs DKK 10,000 excl. VAT.",
  },
  {
    q: "What happens after the workshop?",
    a: "You receive a written summary with the identified opportunities and our recommendations for next steps. If you wish to continue, a strategy and roadmap process can qualify the opportunities, prioritize the effort, and develop business cases and a plan for execution.",
  },
];

const FAQ_DA: FAQEntry[] = [
  {
    q: "Kræver workshoppen teknisk viden eller erfaring med AI?",
    a: "I behøver ikke være AI-specialister. Vi introducerer de relevante begreber og forbinder dem med jeres forretning. Jeres vigtigste bidrag er viden om virksomheden, dens produkter, arbejdsgange og ambitioner.",
  },
  {
    q: "Vi bruger allerede AI. Hvad kan workshoppen tilføre?",
    a: "Workshoppen tager afsæt i det, I allerede gør, og undersøger mulighederne på tværs af forretningen. Hvor kan AI styrke jeres produkter og konkurrencefordele? Hvad kan forbedres i arbejdsgangene? Og hvordan kan medarbejdernes viden og AI skabe større værdi? Målet er at finde de muligheder, der er værd at arbejde videre med.",
  },
  {
    q: "Hvordan tager workshoppen udgangspunkt i vores virksomhed og branche?",
    a: "Vi bringer viden om AI og dens anvendelse i jeres branche. I bringer kendskabet til jeres forretning. Vi undersøger jeres produkter, processer, systemer og data med fokus på, hvad der gør jer særlige, og hvor AI kan gøre en relevant forskel. Det handler ikke om at finde flest mulige use cases, men om at finde de rigtige for jer.",
  },
  {
    q: "Kan workshoppen fokusere på et bestemt område eller produkt?",
    a: "Ja. Vi kan undersøge AI-muligheder bredt på tværs af virksomheden eller gå mere i dybden med et bestemt forretningsområde, en proces eller et produkt.\n\nDen brede tilgang giver overblik, mens et afgrænset fokus giver plads til at undersøge mulighederne mere detaljeret. Vi ser også på afhængigheder til andre dele af virksomheden, og hvordan de kan blive påvirket.\n\nVi aftaler fokus med jer inden workshoppen.",
  },
  {
    q: "Hvad koster en AI-workshop?",
    a: "En hel dags AI-workshop med os koster 10.000 kr. ekskl. moms.",
  },
  {
    q: "Hvad sker der efter workshoppen?",
    a: "I modtager en skriftlig opsamling med de identificerede muligheder og vores anbefalinger til næste skridt. Hvis I ønsker at gå videre, kan et strategi- og roadmapforløb kvalificere mulighederne, prioritere indsatsen og udvikle business cases og en plan for gennemførelsen.",
  },
];

/* ─── FAQ accordion item ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const paragraphs = a.split("\n\n");
  return (
    <motion.div variants={fadeUp} style={{ borderBottom: "1px solid #E5E7EB" }}>
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
            color: "#0A0F1E",
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
            border: "1px solid rgba(192,38,211,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s ease, background 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            background: open ? "rgba(192,38,211,0.08)" : "transparent",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C026D3" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "3000px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.6s ease, opacity 0.3s ease",
          opacity: open ? 1 : 0,
        }}
      >
        <div style={{ paddingBottom: "28px", maxWidth: "680px" }}>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.95rem",
                color: "#6B7280",
                lineHeight: 1.8,
                marginBottom: i < paragraphs.length - 1 ? "16px" : "0",
                whiteSpace: "pre-line",
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


export default function WorkshopPage() {
  const locale = useLocale();

  const STEPS = [
    {
      num: "01",
      title: locale === "da" ? "Discovery Workshop" : "Discovery Workshop",
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
      title:
        locale === "da"
          ? "Analyse, Planlægning & Business Case"
          : "Define Your Future Direction",
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
      title:
        locale === "da"
          ? "Udvikling & Eksekvering"
          : "Execution & Implementation",
      desc:
        locale === "da"
          ? "En plan vi kan hjælpe jer med at realisere - fra proof-of-concept til produktionsklar implementering med lokal forankring."
          : "We bring your roadmap to life - implementing solutions into your business and turning strategy into real operational impact.",
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
      desc: locale === "da" ? "Optimeret årligt - Revision" : "Optimized yearly - Revision",
    },
    {
      stat: "+200K",
      unit: "EUR",
      desc: locale === "da" ? "Øget omsætning - Rejser" : "Increased Revenue - Travel",
    },
    {
      stat: locale === "da" ? "Disruptiv" : "Disruptive",
      unit: "",
      desc: locale === "da" ? "AI Tutor - Uddannelse" : "AI Tutor - Education",
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
        }}
      >
        {/* Soft top-edge transition from previous section */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Video background — reduced opacity for calmer presence */}
        <video poster="/media/posters/workshop_hero_movie.webp" preload="metadata"
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
            opacity: 0.88,
          }}
        >
          <source src="/media/video/workshop_hero_movie.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — deeper, more focused presence */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,9,16,0.78) 0%, rgba(7,6,12,0.96) 100%)",
          }}
        />

        {/* Bottom fade — soft transition into next section */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "180px",
            background: "linear-gradient(0deg, rgba(5,4,10,0.98) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Subtle structural element — thin horizontal rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(1200px, calc(100% - 160px))",
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.15) 30%, rgba(6,182,212,0.10) 70%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={false}
          animate="visible"
          variants={stagger}
          className="hero-content-wrap"
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(192,38,211,1)",
              marginBottom: "28px",
            }}
          >
            AI Workshop
          </motion.p>

          {/* Visual headline — H2 for design, SEO weight carried by H1 below */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(3.2rem, 8vw, 5.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.0,
              color: "#F0EEF5",
              marginBottom: "clamp(28px, 5vw, 56px)",
            }}
          >
            {locale === "da" ? (
              <>
                Hvordan kan AI styrke
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #C026D3 0%, #9333EA 100%)",
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
                How can AI strengthen
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #C026D3 0%, #9333EA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  your business?
                </span>
              </>
            )}
          </motion.h2>

          {/* H1 — SEO primary heading, styled as supporting subline */}
          <motion.h1
            variants={fadeUp}
            className="hero-subtitle"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "rgba(220,216,232,0.9)",
              marginBottom: "clamp(32px, 6vw, 64px)",
              maxWidth: "720px",
            }}
          >
            {locale === "da"
              ? "Vores AI Workshop hjælper jer med at forstå, hvad AI kan betyde for jeres forretning. Fra effektivisering til stærkere produkter og langsigtet konkurrencekraft."
              : "Our AI Workshop helps you understand what AI can mean for your business. From greater efficiency to stronger products and long-term competitiveness."}
          </motion.h1>

          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/book-workshop`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 38px",
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
              {locale === "da" ? "Anmod om Jeres AI Workshop" : "Request Your AI Workshop"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

        </motion.div>

        {/* Step indicator — absolute bottom center */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: "absolute", bottom: "48px", left: 0, right: 0, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "linear-gradient(135deg, #C026D3 0%, #9333EA 100%)", boxShadow: "0 0 10px rgba(192,38,211,0.6)", flexShrink: 0 }} />
            <div style={{ width: "36px", height: "1px", background: "rgba(255,255,255,0.45)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.5)", flexShrink: 0 }} />
            <div style={{ width: "36px", height: "1px", background: "rgba(255,255,255,0.45)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.5)", flexShrink: 0 }} />
          </div>
          <p style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textAlign: "center" }}>
            {locale === "da" ? "Trin 1 af 3  ·  Discovery Workshop" : "Step 1 of 3  ·  Discovery Workshop"}
          </p>
        </motion.div>

      </section>

      {/* ═══════════ INTRO STATEMENT ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "clamp(72px, 10vw, 120px) 0", overflow: "hidden", position: "relative" }}>
        <div className="page-container" style={{ display: "flex", alignItems: "center", gap: "60px" }}>

          {/* Left: text content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{ flex: "1 1 55%", minWidth: 0, position: "relative", zIndex: 2 }}
          >
            {/* Label */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C026D3",
                marginBottom: "20px",
              }}
            >
              {locale === "da" ? "Klarhed" : "Clarity"}
            </motion.p>

            {/* Supporting text */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "#64748B",
                maxWidth: "600px",
                marginBottom: "4px",
              }}
            >
              {locale === "da"
                ? "Få et klart billede af, hvor AI skaber værdi i jeres forretning."
                : "Gain a clear view of where AI creates value in your business."}
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "#64748B",
                maxWidth: "600px",
                marginBottom: "64px",
              }}
            >
              {locale === "da"
                ? "Forlad workshoppen med konkrete idéer og et solidt grundlag for jeres næste beslutninger."
                : "Leave with concrete ideas and a solid foundation for your next decisions."}
            </motion.p>

            {/* Main statement */}
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.06,
                color: "#0A0F1E",
                maxWidth: "760px",
              }}
            >
              {locale === "da"
                ? "Workshoppen giver jer fundamentet til aktivt at beslutte, om AI er det rette for jeres forretning"
                : "The workshop gives you the foundation to actively decide whether AI is right for your business"}
            </motion.h2>
          </motion.div>

          {/* Right: abstract clarity-to-decision visual */}
          <div style={{ flex: "0 0 42%", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              style={{ position: "relative", width: "100%", height: "480px" }}
            >
              {/* Background soft glow */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(192,38,211,0.06) 0%, transparent 70%)",
                filter: "blur(40px)",
              }} />

              {/* Layered progression blocks — left to right, uncertainty → clarity */}

              {/* Block 1 — scattered/uncertain (leftmost) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: "60px",
                  left: "10px",
                  width: "80px",
                  height: "60px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(192,38,211,0.08) 0%, rgba(147,51,234,0.04) 100%)",
                  border: "1px solid rgba(192,38,211,0.10)",
                  backdropFilter: "blur(8px)",
                }}
              />
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{
                  position: "absolute",
                  top: "140px",
                  left: "30px",
                  width: "60px",
                  height: "45px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, rgba(147,51,234,0.06) 0%, rgba(192,38,211,0.03) 100%)",
                  border: "1px solid rgba(147,51,234,0.08)",
                }}
              />
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{
                  position: "absolute",
                  top: "100px",
                  left: "0",
                  width: "50px",
                  height: "35px",
                  borderRadius: "8px",
                  background: "rgba(192,38,211,0.05)",
                  border: "1px solid rgba(192,38,211,0.06)",
                }}
              />

              {/* Block 2 — mid-transition (center) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                style={{
                  position: "absolute",
                  top: "80px",
                  left: "130px",
                  width: "110px",
                  height: "80px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(192,38,211,0.12) 0%, rgba(147,51,234,0.06) 100%)",
                  border: "1px solid rgba(192,38,211,0.14)",
                  backdropFilter: "blur(8px)",
                }}
              />
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                style={{
                  position: "absolute",
                  top: "180px",
                  left: "150px",
                  width: "90px",
                  height: "65px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(147,51,234,0.10) 0%, rgba(59,130,246,0.04) 100%)",
                  border: "1px solid rgba(147,51,234,0.12)",
                }}
              />

              {/* Block 3 — structured/clear (right) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "20px",
                  width: "140px",
                  height: "100px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(192,38,211,0.18) 0%, rgba(147,51,234,0.10) 100%)",
                  border: "1px solid rgba(192,38,211,0.20)",
                  backdropFilter: "blur(12px)",
                }}
              />
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                style={{
                  position: "absolute",
                  top: "170px",
                  right: "10px",
                  width: "150px",
                  height: "110px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(147,51,234,0.15) 0%, rgba(59,130,246,0.06) 100%)",
                  border: "1px solid rgba(147,51,234,0.18)",
                  backdropFilter: "blur(12px)",
                }}
              />
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                style={{
                  position: "absolute",
                  top: "300px",
                  right: "30px",
                  width: "120px",
                  height: "85px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(192,38,211,0.12) 0%, rgba(147,51,234,0.08) 100%)",
                  border: "1px solid rgba(192,38,211,0.14)",
                }}
              />

              {/* Connecting flow lines */}
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                viewBox="0 0 440 480"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Flow paths — left to right curves */}
                <path
                  d="M 60 120 C 120 100, 200 130, 300 100"
                  stroke="rgba(192,38,211,0.12)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 70 165 C 140 180, 220 160, 330 225"
                  stroke="rgba(147,51,234,0.10)"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 200 C 130 220, 250 190, 350 300"
                  stroke="rgba(192,38,211,0.08)"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Junction dots */}
                <circle cx="185" cy="130" r="3" fill="rgba(192,38,211,0.30)" />
                <circle cx="280" cy="180" r="2.5" fill="rgba(147,51,234,0.25)" />
                <circle cx="120" cy="160" r="2" fill="rgba(192,38,211,0.20)" />
                <circle cx="340" cy="130" r="3.5" fill="rgba(192,38,211,0.35)" />
                <circle cx="360" cy="270" r="3" fill="rgba(147,51,234,0.30)" />
              </svg>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ═══════════ RESULTS FROM PREVIOUS WORKSHOPS ═══════════ */}
      <section
        style={{
          background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)",
          padding: "clamp(72px, 10vw, 120px) 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)" }} />
        <div className="page-container">
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
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

      {/* ═══════════ PROGRAM / AGENDA ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "clamp(72px, 10vw, 120px) 0" }}>
        <div className="page-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="about-grid" style={{ gap: "clamp(32px, 6vw, 80px)" }}
          >
            {/* Left: Agenda */}
            <div>
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C026D3",
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
                  ? "I får en forståelse af AI som teknologi og indsigt i, hvordan den allerede bruges i jeres branche."
                  : "You gain an understanding of AI as a technology and insight into how it is already being used in your industry."}
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
                  ? "Med afsæt i jeres forretning undersøger vi, hvad der gør jer særlige, og hvordan AI kan styrke jeres konkurrencefordele, skabe nye muligheder og forbedre jeres produkter og arbejdsgange."
                  : "Starting with your business, we explore what makes you distinctive and how AI can strengthen your competitive advantages, create new opportunities and improve your products and workflows."}
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
                  ? "Vi ser også på, hvordan medarbejdernes viden og erfaring kan spille sammen med AI, så de tilsammen skaber mere værdi, end mennesket eller teknologien kan alene."
                  : "We also explore how your employees' knowledge and experience can work together with AI, creating more value than people or technology could achieve alone."}
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
                    ? "Medbring gerne kolleger med viden om jeres produkter, forretning, systemer og datalandskab. Deres indsigt hjælper os med at gøre mulighederne konkrete for jer."
                    : "Feel free to bring colleagues who know your products, business, systems and data landscape. Their insight helps us turn AI possibilities into concrete opportunities for your business."}
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
                <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-geist), system-ui, sans-serif",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        marginBottom: "10px",
                      }}
                    >
                      {locale === "da" ? "Hos jer" : "At your offices"}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "#94A3B8",
                      }}
                    >
                      {locale === "da"
                        ? "Workshoppen foregår hos jer med vores team on-site, mens vores AI-eksperter deltager virtuelt for at bidrage med deres specialiserede ekspertise."
                        : "The workshop takes place at your offices with our team on-site, while our AI experts join virtually to bring their specialized expertise."}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                style={{
                  marginTop: "32px",
                  padding: "28px 32px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(6,182,212,0.04) 100%)",
                  border: "1px solid rgba(124,58,237,0.10)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0A0F1E",
                    marginBottom: "10px",
                  }}
                >
                  {locale === "da" ? "Varighed" : "Duration"}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: "#64748B",
                  }}
                >
                  {locale === "da" ? "Én dag" : "One day"}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3-STEP PROCESS ═══════════ */}
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
                  Your first step toward a clear{" "}
                  <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    action plan and business case.
                  </span>
                </>
              )}
            </motion.h2>

            <div className="workshop-steps-grid">
              {STEPS.map((step, idx) => {
                const isFirst = idx === 0;
                const stepHrefs: (string | null)[] = [null, `/${locale}/ai-roadmap`, null];
                const stepHref = stepHrefs[idx];
                const card = (
                  <motion.div
                    variants={fadeUp}
                    style={{
                      padding: "40px 36px",
                      borderRadius: "20px",
                      background: isFirst
                        ? "rgba(192,38,211,0.08)"
                        : "rgba(255,255,255,0.03)",
                      border: isFirst
                        ? "1px solid rgba(192,38,211,0.25)"
                        : "1px solid rgba(255,255,255,0.06)",
                      backdropFilter: "blur(8px)",
                      transition: "border-color 0.3s, background 0.3s",
                      position: "relative",
                      cursor: stepHref ? "pointer" : "default",
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
                        <div
                          style={{
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
                            color: isFirst ? "rgba(192,38,211,0.8)" : "rgba(124,58,237,0.6)",
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
                );
                return (
                  <React.Fragment key={step.num}>
                    {stepHref ? (
                      <Link href={stepHref} style={{ display: "contents", textDecoration: "none" }}>
                        {card}
                      </Link>
                    ) : card}

                    {/* Flow arrow between cards */}
                    {idx < STEPS.length - 1 && (
                      <div className="workshop-step-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", alignSelf: "center" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path
                            d="M8 16h16M20 10l6 6-6 6"
                            stroke="rgba(192,38,211,0.35)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "clamp(80px, 11vw, 140px) 0",
          position: "relative",
        }}
      >
        <div className="page-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="about-grid"
            style={{
              gap: "clamp(40px, 8vw, 100px)",
              alignItems: "start",
            }}
          >
            {/* Left: heading */}
            <div>
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#0A0F1E",
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
                  color: "#0A0F1E",
                  marginBottom: "32px",
                }}
              >
                <span style={{ background: "linear-gradient(135deg, #C026D3, #9333EA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {locale === "da" ? "Svar på de vigtigste spørgsmål" : "Answers to the key questions"}
                </span>
              </motion.h2>
              <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                {(locale === "da"
                  ? [
                      "Ingen teknisk viden krævet",
                      "Tilpasset jeres forretning",
                      "Konkrete næste skridt",
                    ]
                  : [
                      "No technical knowledge required",
                      "Tailored to your business",
                      "Concrete next steps",
                    ]
                ).map((line, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "#C026D3",
                      fontWeight: 500,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            </div>

            {/* Right: accordion */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              style={{ borderTop: "1px solid #E5E7EB" }}
            >
              {(locale === "da" ? FAQ_DA : FAQ_EN).map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ BUSINESS CASE ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "clamp(72px, 10vw, 120px) 0" }}>
        <div className="page-container">
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
              className="about-grid" style={{
                gap: "clamp(32px, 5vw, 64px)",
                marginTop: "clamp(40px, 5vw, 64px)",
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

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "clamp(72px, 10vw, 120px) 0" }}>
        <div className="page-container">
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
