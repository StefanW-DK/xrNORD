"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getPageMeta } from "@/config/metadata";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

/* ── Small reusable divider ── */
function SectionDivider() {
  return (
    <div style={{
      width: "48px", height: "2px",
      background: "linear-gradient(90deg, #06B6D4, #3B82F6)",
      borderRadius: "2px",
    }} />
  );
}

export default function AboutPage() {
  const locale = useLocale();
  const da = locale === "da";

  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#020510",
      }}>
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          pointerEvents: "none",
        }} />

        {/* Robot image — right side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "42%",
            maxWidth: "560px",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #020510 0%, transparent 55%)",
            zIndex: 1,
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "30%",
            background: "linear-gradient(to top, #020510 0%, transparent 100%)",
            zIndex: 1,
          }} />
          <Image
            src="/assets/about/xrNORD_Robot.png"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.2 }}
            priority
          />
        </motion.div>

        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "20%", left: "30%",
          width: "500px", height: "400px",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "160px 80px 120px 60px", position: "relative", zIndex: 2 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            style={{ maxWidth: "980px" }}
          >
            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em",
              textTransform: "uppercase" as const, color: "#06B6D4",
              marginBottom: "28px",
            }}>
              {da ? "Det Nordiske Forspring med AI" : "The Nordic Edge in AI"}
            </motion.p>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(3.8rem, 8vw, 7rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "#F1F5F9",
              marginBottom: "32px",
            }}>
              {da ? (
                <>
                  {"Vi Bygger "}
                  <span style={{
                    background: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 60%, #8B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>{"Virksomheder"}</span>
                  <br />
                  {"der Vinder "}
                  <span style={{
                    background: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 60%, #8B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>{"med AI"}</span>
                </>
              ) : (
                <>
                  {"We Build "}
                  <span style={{
                    background: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 60%, #8B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>{"Companies"}</span>
                  <br />
                  {"That Win "}
                  <span style={{
                    background: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 60%, #8B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>{"with AI"}</span>
                </>
              )}
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.1rem",
              lineHeight: 1.75,
              color: "rgba(148,163,184,0.8)",
              maxWidth: "520px",
              marginBottom: "48px",
              whiteSpace: "pre-line" as const,
            }}>
              {da
                ? "Forankret i Danmark. Formet af verden.\nVi hjælper nordiske virksomheder med at omsætte AI til reel fordel — ikke som et værktøj, men som måden de opererer og konkurrerer på."
                : "Rooted in Denmark. Shaped by the world.\nWe help Nordic companies turn AI into real advantage — not as a tool, but as how they operate and compete."}
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: "16px", flexWrap: "wrap" as const }}>
              <Link href={`/${locale}/contact`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "10px", border: "none",
                background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                color: "#fff", textDecoration: "none",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.9rem", fontWeight: 600,
                boxShadow: "0 8px 24px rgba(6,182,212,0.25)",
              }}>
                {da ? "Start en samtale" : "Start a Conversation"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href={`/${locale}/workshop`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: "rgba(241,245,249,0.75)", textDecoration: "none",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.9rem", fontWeight: 500,
              }}>
                {da ? "Se vores workshop" : "See Our Workshop"}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ROOTED IN DENMARK
      ═══════════════════════════════════════ */}
      <section style={{
        background: "#060B14",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
      }}>
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
            {/* Left: map */}
            <motion.div variants={fadeIn} style={{ position: "relative" }}>
              <div style={{
                borderRadius: "20px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                aspectRatio: "1",
                position: "relative",
              }}>
                <Image
                  src="/assets/about/xrnord_Geo.png"
                  alt="Nordic region"
                  fill
                  style={{ objectFit: "cover", opacity: 0.9 }}
                />
                {/* Glow overlay on Denmark */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 42% 62%, rgba(6,182,212,0.12) 0%, transparent 55%)",
                  pointerEvents: "none",
                }} />
              </div>
              {/* Location badge */}
              <motion.div
                variants={fadeUp}
                style={{
                  position: "absolute",
                  bottom: "24px",
                  right: "-24px",
                  background: "rgba(10,15,30,0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  borderRadius: "12px",
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#06B6D4",
                  boxShadow: "0 0 8px rgba(6,182,212,0.6)",
                }} />
                <span style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "0.82rem", fontWeight: 600, color: "#F1F5F9",
                }}>
                  {da ? "Aarhus, Danmark" : "Aarhus, Denmark"}
                </span>
              </motion.div>
            </motion.div>

            {/* Right: text */}
            <div>
              <motion.div variants={fadeUp} style={{ marginBottom: "24px" }}>
                <SectionDivider />
              </motion.div>
              <motion.p variants={fadeUp} style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em",
                textTransform: "uppercase" as const, color: "#06B6D4",
                marginBottom: "20px",
              }}>
                {da ? "Vores fundament" : "Our Foundation"}
              </motion.p>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#F1F5F9",
                marginBottom: "28px",
              }}>
                {da
                  ? <>{"Forankret i Danmark."}<br /><span style={{ color: "rgba(148,163,184,0.7)" }}>{"Formet af verden."}</span></>
                  : <>{"Rooted in Denmark."}<br /><span style={{ color: "rgba(148,163,184,0.7)" }}>{"Shaped by the world."}</span></>
                }
              </motion.h2>
              <motion.p variants={fadeUp} style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1rem", lineHeight: 1.8,
                color: "rgba(148,163,184,0.7)",
                marginBottom: "20px",
              }}>
                {da
                  ? "xrNORD er bygget på Skandinavisk forretningsforståelse og lokal tilstedeværelse. Vi kender de virksomheder, vi arbejder med — deres markeder, deres strukturer, deres mennesker."
                  : "xrNORD is built on Scandinavian business understanding and local presence. We know the companies we work with — their markets, their structures, their people."}
              </motion.p>
              <motion.p variants={fadeUp} style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1rem", lineHeight: 1.8,
                color: "rgba(148,163,184,0.7)",
              }}>
                {da
                  ? "Det kombinerer vi med global AI-kompetence, reel implementeringserfaring og et skarpt blik for, hvor AI faktisk skaber forretningsværdi — ikke bare i teorien, men i praksis."
                  : "We combine that with global AI capability, real implementation experience, and a sharp eye for where AI actually creates business value — not just in theory, but in practice."}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY WE EXIST
      ═══════════════════════════════════════ */}
      <section style={{
        background: "#0A0F1E",
        padding: "140px 0",
        position: "relative",
      }}>
        {/* Top accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "24px" }}>
              <SectionDivider />
            </motion.div>
            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em",
              textTransform: "uppercase" as const, color: "#8B5CF6",
              marginBottom: "20px",
            }}>
              {da ? "Hvorfor vi eksisterer" : "Why We Exist"}
            </motion.p>

            <motion.h2 variants={fadeUp} style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "#F1F5F9",
              marginBottom: "40px",
            }}>
              {da
                ? "De fleste virksomheder udforsker AI. Meget få bygger det ind i, hvordan de opererer."
                : "Most companies are exploring AI. Very few are building it into how they operate."}
            </motion.h2>

            <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column" as const, gap: "24px" }}>
              {[
                da
                  ? "De tester værktøjer. De kører pilotprojekter. Men de formår ikke at omsætte AI til reel forretningsfordel — fordi de mangler den strategiske retning, datafundamentet og evnen til at eksekvere."
                  : "They test tools. They run pilots. But they fail to turn AI into real business advantage — because they lack the strategic direction, the data foundation, and the ability to execute.",
                da
                  ? "xrNORD eksisterer for at ændre det. Vi kombinerer strategisk klarhed med reel implementeringsevne og lokal forretningsforståelse — og vi arbejder tæt på de virksomheder, vi hjælper."
                  : "xrNORD exists to change that. We combine strategic clarity with real implementation capability and local business understanding — and we work closely with the companies we help.",
                da
                  ? "Vi er ikke en generisk konsulentvirksomhed. Vi er ikke et AI-hype-bureau. Vi er en nordisk AI-virksomhed med et klart formål: at hjælpe virksomheder med at vinde med AI."
                  : "We are not a generic consultancy. We are not an AI hype agency. We are a Nordic AI company with a clear purpose: to help companies win with AI.",
              ].map((text, i) => (
                <motion.p key={i} variants={fadeUp} style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: i === 1 ? "rgba(241,245,249,0.85)" : "rgba(148,163,184,0.65)",
                  borderLeft: i === 1 ? "2px solid rgba(6,182,212,0.4)" : "none",
                  paddingLeft: i === 1 ? "24px" : "0",
                }}>
                  {text}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          THE NORDIC EDGE
      ═══════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(160deg, #060B14 0%, #0D0F20 100%)",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px", height: "600px",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ maxWidth: "720px", marginBottom: "80px" }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "24px" }}>
              <SectionDivider />
            </motion.div>
            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em",
              textTransform: "uppercase" as const, color: "#818CF8",
              marginBottom: "20px",
            }}>
              {da ? "Positionering" : "Positioning"}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#F1F5F9",
              marginBottom: "24px",
            }}>
              {da ? "Det nordiske forspring er reelt." : "The Nordic Edge is real."}
            </motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.05rem", lineHeight: 1.8,
              color: "rgba(148,163,184,0.7)",
            }}>
              {da
                ? "Skandinavien behøver ikke at vinde på AI-skala som USA eller Kina. Det nordiske forspring kommer fra noget andet: forretningsforståelse, præcision, formål og stærk operationel integration."
                : "Scandinavia does not win AI by scale like the US or China. The Nordic edge comes from something different: business understanding, precision, purpose, and strong operational integration."}
            </motion.p>
          </motion.div>

          {/* Four pillars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[
              {
                icon: "◈",
                title: da ? "Forretningsforståelse" : "Business Understanding",
                desc: da
                  ? "Vi forstår de virksomheder, vi arbejder med — ikke bare deres teknologi, men deres drift, marked og mennesker."
                  : "We understand the companies we work with — not just their technology, but their operations, market, and people.",
              },
              {
                icon: "⬡",
                title: da ? "Præcision over skala" : "Precision over Scale",
                desc: da
                  ? "Vi prioriterer korrekt AI frem for meget AI. Hvad der skaber størst forretningsværdi, bestemmer retningen."
                  : "We prioritise the right AI over a lot of AI. What creates the most business value determines the direction.",
              },
              {
                icon: "◎",
                title: da ? "Ansvarlig implementering" : "Responsible Execution",
                desc: da
                  ? "Nordiske virksomheder forventer AI, der er etisk, transparent og bygget til at vare. Vi leverer præcist det."
                  : "Nordic companies expect AI that is ethical, transparent, and built to last. We deliver exactly that.",
              },
              {
                icon: "⟁",
                title: da ? "Lokal forankring" : "Local Accountability",
                desc: da
                  ? "Strategi og implementering med mennesker, der kender jeres marked — og er ansvarlige over for jer lokalt."
                  : "Strategy and implementation by people who know your market — and are accountable to you locally.",
              },
            ].map((pillar, i) => (
              <motion.div key={i} variants={fadeUp} style={{
                background: "#060B14",
                padding: "40px 32px",
              }}>
                <div style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "1.6rem",
                  color: "#818CF8",
                  marginBottom: "20px",
                  lineHeight: 1,
                }}>
                  {pillar.icon}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "0.95rem", fontWeight: 700,
                  color: "#F1F5F9",
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}>
                  {pillar.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.85rem", lineHeight: 1.7,
                  color: "rgba(148,163,184,0.6)",
                }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FROM STRATEGY TO SYSTEMS
      ═══════════════════════════════════════ */}
      <section style={{
        background: "#0A0F1E",
        padding: "140px 0",
        position: "relative",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "24px" }}>
              <SectionDivider />
            </motion.div>
            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em",
              textTransform: "uppercase" as const, color: "#06B6D4",
              marginBottom: "20px",
            }}>
              {da ? "Hvad vi gør" : "What We Do"}
            </motion.p>
            <motion.div variants={stagger} style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "end",
              marginBottom: "72px",
            }}>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#F1F5F9",
              }}>
                {da
                  ? <>{"Fra strategi"}<br />{"til systemer."}</>
                  : <>{"From strategy"}<br />{"to systems."}</>
                }
              </motion.h2>
              <motion.p variants={fadeUp} style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1rem", lineHeight: 1.8,
                color: "rgba(148,163,184,0.65)",
              }}>
                {da
                  ? "Vi stopper ikke ved slides eller strategidokumenter. Vi hjælper med at definere, hvor AI skaber værdi, forme en klar plan — og bygge de AI-systemer, der faktisk eksekverer den."
                  : "We do not stop at slides or strategy documents. We help define where AI creates value, shape a clear roadmap — and build the AI systems that actually execute it."}
              </motion.p>
            </motion.div>

            {/* Three phases */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}
            >
              {[
                {
                  num: "01",
                  title: da ? "Forstå & Definér" : "Understand & Define",
                  desc: da
                    ? "Vi går i dybden med jeres forretning — processer, data, udfordringer og muligheder — og identificerer præcist, hvor AI kan skabe størst effekt."
                    : "We go deep into your business — processes, data, challenges, and opportunities — and identify precisely where AI can create the greatest impact.",
                  color: "#06B6D4",
                },
                {
                  num: "02",
                  title: da ? "Strategiser & Prioritér" : "Strategise & Prioritise",
                  desc: da
                    ? "Vi udformer en klar AI-strategi og et struktureret roadmap, der forbinder forretningens prioriteter med de rette teknologiske muligheder."
                    : "We shape a clear AI strategy and structured roadmap that connects your business priorities with the right technological opportunities.",
                  color: "#3B82F6",
                },
                {
                  num: "03",
                  title: da ? "Byg & Implementér" : "Build & Implement",
                  desc: da
                    ? "Vi udvikler og implementerer AI-systemer i jeres forretning — fra proof of concept til produktionsklar løsning med lokal ansvarlighed."
                    : "We develop and implement AI systems into your business — from proof of concept to production-ready solution with local accountability.",
                  color: "#8B5CF6",
                },
              ].map((phase, i) => (
                <motion.div key={i} variants={fadeUp} style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: i === 0 ? "16px 0 0 16px" : i === 2 ? "0 16px 16px 0" : "0",
                  padding: "48px 40px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Top accent line */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, ${phase.color}, transparent)`,
                  }} />
                  <p style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.25em",
                    color: phase.color, marginBottom: "20px",
                  }}>
                    {phase.num}
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "1.15rem", fontWeight: 700,
                    color: "#F1F5F9",
                    letterSpacing: "-0.01em",
                    marginBottom: "16px",
                  }}>
                    {phase.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.88rem", lineHeight: 1.75,
                    color: "rgba(148,163,184,0.6)",
                  }}>
                    {phase.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LEADERSHIP
      ═══════════════════════════════════════ */}
      <section style={{
        background: "#060B14",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {/* Section intro */}
            <motion.div variants={fadeUp} style={{ marginBottom: "24px" }}>
              <SectionDivider />
            </motion.div>
            <motion.div
              variants={stagger}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "80px",
                alignItems: "end",
                marginBottom: "72px",
              }}
            >
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#F1F5F9",
              }}>
                {da
                  ? <>{"Forretningsforståelse"}<br />{"møder AI-kapabilitet."}</>
                  : <>{"Business understanding"}<br />{"meets AI capability."}</>
                }
              </motion.h2>
              <motion.p variants={fadeUp} style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1rem", lineHeight: 1.8,
                color: "rgba(148,163,184,0.65)",
              }}>
                {da
                  ? "xrNORD er bygget op om to kernekompetencer. En dyb forståelse for, hvordan nordiske virksomheder opererer og konkurrerer. Og reel teknisk evne til at designe og implementere AI-systemer."
                  : "xrNORD is built around two core strengths. A deep understanding of how Nordic businesses operate and compete. And real technical capability to design and implement AI systems."}
              </motion.p>
            </motion.div>

            {/* Portraits */}
            <motion.div
              variants={stagger}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "32px",
              }}
            >
              {[
                {
                  name: "Stefan Werge",
                  role: da ? "CEO & Grundlægger" : "CEO & Founder",
                  bio: da
                    ? "Stefan bringer erhvervsforståelse og strategisk ledelse til xrNORD. Hans styrke er at forbinde AI-kapabilitet med reel forretningsværdi — og navigere komplekse organisationer mod konkrete resultater."
                    : "Stefan brings business understanding and strategic leadership to xrNORD. His strength is connecting AI capability with real business value — and navigating complex organisations toward concrete outcomes.",
                  img: "/assets/about/Stefan.png",
                  color: "#06B6D4",
                },
                {
                  name: "Jerzy B",
                  role: da ? "AI Lead" : "AI Lead",
                  bio: da
                    ? "Jerzy er den tekniske rygrad bag xrNORDs AI-løsninger. Han designer og implementerer AI-systemer med et klart fokus på det, der faktisk virker i produktion — ikke bare i teorien."
                    : "Jerzy is the technical backbone behind xrNORD's AI solutions. He designs and implements AI systems with a clear focus on what actually works in production — not just in theory.",
                  img: "/assets/about/Jerzy.png",
                  color: "#8B5CF6",
                },
              ].map((person, i) => (
                <motion.div key={i} variants={fadeUp} style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "40px",
                  alignItems: "start",
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "20px",
                  padding: "40px",
                  overflow: "hidden",
                }}>
                  {/* Portrait */}
                  <div style={{
                    position: "relative",
                    borderRadius: "14px",
                    overflow: "hidden",
                    aspectRatio: "3/4",
                    background: "#0D1324",
                    flexShrink: 0,
                  }}>
                    {/* Colour accent on portrait bottom */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
                      background: `linear-gradient(to top, ${person.color}18 0%, transparent 100%)`,
                      zIndex: 1,
                      pointerEvents: "none",
                    }} />
                    <Image
                      src={person.img}
                      alt={person.name}
                      fill
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ paddingTop: "4px" }}>
                    {/* Accent line */}
                    <div style={{
                      width: "32px", height: "2px",
                      background: `linear-gradient(90deg, ${person.color}, transparent)`,
                      marginBottom: "20px",
                    }} />
                    <p style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "1.3rem", fontWeight: 800,
                      color: "#F1F5F9",
                      letterSpacing: "-0.02em",
                      marginBottom: "4px",
                    }}>
                      {person.name}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "0.78rem", fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase" as const,
                      color: person.color,
                      marginBottom: "20px",
                    }}>
                      {person.role}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.9rem", lineHeight: 1.75,
                      color: "rgba(148,163,184,0.65)",
                    }}>
                      {person.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CLOSING
      ═══════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(160deg, #020510 0%, #0A0F1E 100%)",
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "500px",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ maxWidth: "760px" }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "24px" }}>
              <SectionDivider />
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#F1F5F9",
              marginBottom: "32px",
            }}>
              {da ? (
                <>
                  {"AI vil ikke bare forbedre virksomheder."}
                  <br />
                  <span style={{
                    background: "linear-gradient(135deg, #06B6D4, #3B82F6, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    {"Det vil omdefinere dem."}
                  </span>
                </>
              ) : (
                <>
                  {"AI will not just improve companies."}
                  <br />
                  <span style={{
                    background: "linear-gradient(135deg, #06B6D4, #3B82F6, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    {"It will redefine them."}
                  </span>
                </>
              )}
            </motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.1rem", lineHeight: 1.8,
              color: "rgba(148,163,184,0.7)",
              marginBottom: "48px",
            }}>
              {da
                ? "xrNORD er her for at hjælpe nordiske virksomheder med at lede i det skift. Med klarhed, kompetence og en klar forankring i det, der faktisk virker."
                : "xrNORD is here to help Nordic companies lead in that shift. With clarity, capability, and a firm grounding in what actually works."}
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "16px", flexWrap: "wrap" as const }}>
              <Link href={`/${locale}/contact`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "16px 32px", borderRadius: "10px",
                background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                color: "#fff", textDecoration: "none",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.95rem", fontWeight: 600,
                boxShadow: "0 8px 32px rgba(6,182,212,0.2)",
              }}>
                {da ? "Start samtalen" : "Start the Conversation"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href={`/${locale}/ai-roadmap`} style={{
                display: "inline-flex", alignItems: "center",
                padding: "16px 32px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: "rgba(241,245,249,0.7)", textDecoration: "none",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.95rem", fontWeight: 500,
              }}>
                {da ? "Se AI Roadmap" : "See AI Roadmap"}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
