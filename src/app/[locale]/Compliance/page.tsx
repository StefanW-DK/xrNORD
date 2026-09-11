"use client";

import React, { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useLocale } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ════════════════════════════════════════════════════════════════════════
   HERO — two-column, left-aligned, AI-LABs background style
   ════════════════════════════════════════════════════════════════════════ */
function Hero({ locale }: { locale: string }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "clamp(120px, 14vw, 180px) clamp(24px, 6vw, 160px) clamp(80px, 10vw, 140px)",
        background: "linear-gradient(155deg, #04060F 0%, #080C1A 30%, #0F0D28 60%, #160D35 100%)",
        overflow: "hidden",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
      }}
      className="cc-hero"
      aria-label="Compliance as a Living Capability"
    >
      <video autoPlay muted loop playsInline aria-hidden style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", opacity: 0.35, pointerEvents: "none",
      }}>
        <source src="https://gxindv0bhghyyyfv.public.blob.vercel-storage.com/workshop_hero_movie.mp4" type="video/mp4" />
      </video>

      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(4,6,15,0.68) 0%, rgba(8,6,25,0.72) 50%, rgba(22,13,53,0.70) 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
        background: "linear-gradient(0deg, rgba(4,6,15,0.98) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.7) 30%, rgba(34,211,238,0.7) 70%, transparent 100%)",
        pointerEvents: "none", zIndex: 2,
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "-25%", right: "-10%", width: "70%", height: "100%",
        background: "radial-gradient(ellipse at top right, rgba(168,85,247,0.28) 0%, rgba(99,102,241,0.10) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "-15%", left: "-8%", width: "55%", height: "65%",
        background: "radial-gradient(circle, rgba(34,211,238,0.20) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "30%", right: "5%", width: "40%", height: "50%",
        background: "radial-gradient(ellipse, rgba(232,121,249,0.10) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "18%", left: "-10%", width: "120%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.12) 35%, rgba(34,211,238,0.12) 65%, transparent)",
        transform: "rotate(-6deg)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 90% 70% at 55% 45%, black 20%, transparent 75%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden className="cc-noise" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <motion.div
        variants={stagger} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          position: "relative", zIndex: 3, width: "100%", margin: "0 auto",
          paddingLeft: "clamp(0px, 3vw, 80px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
          gap: "clamp(40px, 6vw, 120px)",
          alignItems: "center",
        }}
        className="cc-hero-grid"
      >
        <div style={{ paddingLeft: "clamp(0px, 4vw, 100px)" }} className="cc-hero-left">
          <motion.h2 variants={fadeUp} style={{
            fontSize: "clamp(3rem, 5vw, 6rem)", fontWeight: 800, lineHeight: 1.0,
            letterSpacing: "-0.03em", color: "rgba(255,255,255,0.75)", margin: "0 0 28px",
          }} className="cc-h2">
            <span style={{ color: "#22D3EE" }}>See</span> your compliance gaps.{" "}
            <br />
            <span style={{ color: "#A855F7" }}>Close</span> them, continuously.
          </motion.h2>

          <motion.div variants={fadeUp} style={{ margin: "0 0 28px" }}>
            <div style={{ width: 52, height: 1, background: "linear-gradient(90deg, #A855F7, #22D3EE)" }} />
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "clamp(1rem, 1.3vw, 1.15rem)", fontWeight: 400, lineHeight: 1.7,
            color: "rgba(255,255,255,0.88)", maxWidth: 650, margin: "0 0 52px", letterSpacing: 0,
          }}>
            See where your compliance gaps are, empower your people to stay compliant as they work, and let agents carry out the compliance-critical tasks themselves.
          </motion.h1>

          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <Link href={`/${locale}/contact`} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 30px", borderRadius: 999,
              background: "linear-gradient(135deg, #A855F7, #818CF8)",
              color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              boxShadow: "0 12px 36px rgba(124,111,212,0.35)",
            }}>
              Start a conversation with xrNORD <span aria-hidden>→</span>
            </Link>
            <a href="#read-the-perspective" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "15px 28px", borderRadius: 999,
              background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(255,255,255,0.22)",
              fontSize: 15, fontWeight: 500, textDecoration: "none",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              Read the thinking
            </a>
          </motion.div>
        </div>

        {/* Right: minimal accent column */}
        <motion.div variants={fadeUp} style={{ position: "relative", paddingLeft: 56 }} className="cc-stat-col">
          <div aria-hidden className="cc-stat-vline" style={{
            position: "absolute", left: 0, top: "5%", bottom: "5%", width: 1,
            background: "linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.5) 30%, rgba(168,85,247,0.5) 70%, transparent 100%)",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase" as const, color: "rgba(255,255,255,0.40)", margin: "0 0 48px",
            }}>
              How we do it
            </p>

            {[
              { name: "See", color: "#22D3EE", desc: "Where your gaps are" },
              { name: "Help", color: "#818CF8", desc: "Your people, in the moment" },
              { name: "Automate", color: "#A855F7", desc: "The compliance-critical tasks" },
            ].map(item => (
              <div key={item.name} style={{ marginBottom: 40 }}>
                <p style={{
                  fontSize: "clamp(1.8rem, 2.6vw, 2.8rem)", fontWeight: 800,
                  color: item.color, margin: "0 0 6px", lineHeight: 1.1,
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  letterSpacing: "-0.02em",
                }}>
                  {item.name}
                </p>
                <p style={{
                  fontSize: "clamp(0.9rem, 1.05vw, 1rem)", color: "rgba(255,255,255,0.50)",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 300, margin: 0, lineHeight: 1.4,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="cc-scroll-indicator"
        style={{
          position: "absolute", bottom: "clamp(20px, 3vw, 40px)", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 10,
        }}
      >
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <div aria-hidden style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }} />
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
.cc-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  background-repeat: repeat; background-size: 256px 256px;
}
@media (max-width: 900px) {
  .cc-hero-grid { grid-template-columns: 1fr !important; padding-left: 0 !important; }
  .cc-hero-left { padding-left: 0 !important; }
  .cc-stat-col { padding-left: 0 !important; padding-top: 48px !important; border-top: 1px solid rgba(168,85,247,0.3) !important; margin-top: 48px !important; }
  .cc-stat-vline { display: none !important; }
  .cc-scroll-indicator { display: none !important; }
}
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   BRIDGE — animated See / Help / Automate diagram
   ════════════════════════════════════════════════════════════════════════ */
function CapabilityBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (d: number) => ({
      pathLength: 1, opacity: 1,
      transition: { pathLength: { delay: d, duration: 1.2, ease: "easeInOut" }, opacity: { delay: d, duration: 0.3 } },
    }),
  };
  const pop: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (d: number) => ({
      opacity: 1, scale: 1,
      transition: { delay: d, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    }),
  };
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: (d: number) => ({
      opacity: 1, y: 0,
      transition: { delay: d, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%",
      padding: "clamp(40px, 6vw, 80px) clamp(24px, 6vw, 160px) clamp(80px, 10vw, 140px)",
      background: "linear-gradient(168deg, #04060F 0%, #060919 50%, #080B20 100%)",
      overflow: "hidden",
    }}>
      <div style={{
        position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto",
      }}>
        <svg viewBox="0 0 720 440" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", display: "block" }}
          aria-label="See finds the gaps, Help and Automate close them"
        >
          {/* === "See" node at top === */}
          <motion.g variants={pop} custom={0.1} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <rect x="305" y="8" width="110" height="42" rx="21" fill="#22D3EE" fillOpacity="0.15" stroke="#22D3EE" strokeWidth="1.5" />
            <text x="360" y="34" textAnchor="middle" fill="#22D3EE" fontSize="16" fontWeight="700" fontFamily="var(--font-geist), system-ui, sans-serif">See</text>
          </motion.g>

          {/* === Three arrows from See down to the gap line === */}
          <motion.path d="M 335 50 Q 335 100 190 148" stroke="#22D3EE" strokeWidth="1.2" fill="none" strokeLinecap="round"
            variants={draw} custom={0.5} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.path d="M 360 50 L 360 148" stroke="#22D3EE" strokeWidth="1.2" fill="none" strokeLinecap="round"
            variants={draw} custom={0.6} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.path d="M 385 50 Q 385 100 530 148" stroke="#22D3EE" strokeWidth="1.2" fill="none" strokeLinecap="round"
            variants={draw} custom={0.7} initial="hidden" animate={inView ? "visible" : "hidden"} />

          {/* === Arrow tips === */}
          <motion.polygon points="186,144 194,144 190,152" fill="#22D3EE"
            variants={pop} custom={1.0} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.polygon points="356,144 364,144 360,152" fill="#22D3EE"
            variants={pop} custom={1.1} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.polygon points="526,144 534,144 530,152" fill="#22D3EE"
            variants={pop} custom={1.2} initial="hidden" animate={inView ? "visible" : "hidden"} />

          {/* === Horizontal flow line === */}
          <motion.line x1="60" y1="170" x2="660" y2="170" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"
            variants={draw} custom={1.0} initial="hidden" animate={inView ? "visible" : "hidden"} />

          {/* === Stage labels above line === */}
          <motion.text x="60" y="158" fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="600" fontFamily="var(--font-geist), system-ui, sans-serif"
            variants={fadeIn} custom={1.2} initial="hidden" animate={inView ? "visible" : "hidden"}>The Standard</motion.text>
          <motion.text x="230" y="158" fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="600" fontFamily="var(--font-geist), system-ui, sans-serif" textAnchor="middle"
            variants={fadeIn} custom={1.3} initial="hidden" animate={inView ? "visible" : "hidden"}>Processes</motion.text>
          <motion.text x="400" y="158" fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="600" fontFamily="var(--font-geist), system-ui, sans-serif" textAnchor="middle"
            variants={fadeIn} custom={1.4} initial="hidden" animate={inView ? "visible" : "hidden"}>Implementation</motion.text>
          <motion.text x="580" y="158" fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="600" fontFamily="var(--font-geist), system-ui, sans-serif" textAnchor="middle"
            variants={fadeIn} custom={1.5} initial="hidden" animate={inView ? "visible" : "hidden"}>Daily Work</motion.text>

          {/* === Gap dots on the line === */}
          <motion.circle cx="190" cy="170" r="4" fill="#A855F7"
            variants={pop} custom={1.3} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.circle cx="360" cy="170" r="4" fill="#818CF8"
            variants={pop} custom={1.4} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.circle cx="530" cy="170" r="4" fill="#22D3EE"
            variants={pop} custom={1.5} initial="hidden" animate={inView ? "visible" : "hidden"} />

          {/* === Gap labels below line === */}
          <motion.text x="190" y="198" textAnchor="middle" fill="#A855F7" fillOpacity="0.7" fontSize="10" fontWeight="700" letterSpacing="0.12em" fontFamily="var(--font-geist), system-ui, sans-serif"
            variants={fadeIn} custom={1.5} initial="hidden" animate={inView ? "visible" : "hidden"}>ADOPTION GAP</motion.text>
          <motion.text x="360" y="198" textAnchor="middle" fill="#818CF8" fillOpacity="0.7" fontSize="10" fontWeight="700" letterSpacing="0.12em" fontFamily="var(--font-geist), system-ui, sans-serif"
            variants={fadeIn} custom={1.6} initial="hidden" animate={inView ? "visible" : "hidden"}>IMPLEMENTATION GAP</motion.text>
          <motion.text x="530" y="198" textAnchor="middle" fill="#22D3EE" fillOpacity="0.7" fontSize="10" fontWeight="700" letterSpacing="0.12em" fontFamily="var(--font-geist), system-ui, sans-serif"
            variants={fadeIn} custom={1.7} initial="hidden" animate={inView ? "visible" : "hidden"}>DAILY-WORK GAP</motion.text>

          {/* === Arrows from daily-work gap down to Help and Automate === */}
          <motion.path d="M 510 178 Q 490 260 420 310" stroke="#818CF8" strokeWidth="1.2" fill="none" strokeLinecap="round"
            variants={draw} custom={2.0} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.path d="M 550 178 Q 570 260 580 310" stroke="#A855F7" strokeWidth="1.2" fill="none" strokeLinecap="round"
            variants={draw} custom={2.1} initial="hidden" animate={inView ? "visible" : "hidden"} />

          {/* === Arrow tips going down === */}
          <motion.polygon points="416,306 424,306 420,314" fill="#818CF8"
            variants={pop} custom={2.5} initial="hidden" animate={inView ? "visible" : "hidden"} />
          <motion.polygon points="576,306 584,306 580,314" fill="#A855F7"
            variants={pop} custom={2.6} initial="hidden" animate={inView ? "visible" : "hidden"} />

          {/* === Help node === */}
          <motion.g variants={pop} custom={2.7} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <rect x="370" y="320" width="100" height="42" rx="21" fill="#818CF8" fillOpacity="0.15" stroke="#818CF8" strokeWidth="1.5" />
            <text x="420" y="346" textAnchor="middle" fill="#818CF8" fontSize="16" fontWeight="700" fontFamily="var(--font-geist), system-ui, sans-serif">Help</text>
          </motion.g>

          {/* === Automate node === */}
          <motion.g variants={pop} custom={2.9} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <rect x="530" y="320" width="120" height="42" rx="21" fill="#A855F7" fillOpacity="0.15" stroke="#A855F7" strokeWidth="1.5" />
            <text x="590" y="346" textAnchor="middle" fill="#A855F7" fontSize="16" fontWeight="700" fontFamily="var(--font-geist), system-ui, sans-serif">Automate</text>
          </motion.g>

          {/* === Subtle descriptor labels === */}
          <motion.text x="360" y="29" textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="11" fontWeight="400" fontFamily="var(--font-inter), system-ui, sans-serif"
            variants={fadeIn} custom={0.3} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <tspan x="290" dy="0">Where your</tspan>
            <tspan x="290" dy="14">gaps are</tspan>
          </motion.text>

          <motion.text x="420" y="380" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11" fontWeight="400" fontFamily="var(--font-inter), system-ui, sans-serif"
            variants={fadeIn} custom={3.0} initial="hidden" animate={inView ? "visible" : "hidden"}>Your people, in the moment</motion.text>

          <motion.text x="590" y="380" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11" fontWeight="400" fontFamily="var(--font-inter), system-ui, sans-serif"
            variants={fadeIn} custom={3.1} initial="hidden" animate={inView ? "visible" : "hidden"}>The compliance-critical tasks</motion.text>

          {/* === Bottom caption === */}
          <motion.text x="360" y="425" textAnchor="middle" fill="rgba(255,255,255,0.30)" fontSize="12" fontWeight="300" fontFamily="var(--font-inter), system-ui, sans-serif"
            variants={fadeIn} custom={3.3} initial="hidden" animate={inView ? "visible" : "hidden"}>See spans all three gaps. Help and Automate close the daily-work gap.</motion.text>
        </svg>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 2 — THE PROBLEM: THREE GAPS
   ════════════════════════════════════════════════════════════════════════ */
function ThreeGaps({ locale }: { locale: string }) {
  return (
    <section style={{
      position: "relative", width: "100%",
      padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
      background: "linear-gradient(168deg, #04060F 0%, #070A1F 40%, #0C0A24 100%)",
      overflow: "hidden", isolation: "isolate",
      fontFamily: "var(--font-geist), system-ui, sans-serif",
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 4% 0%, rgba(168,85,247,0.18) 0%, rgba(99,102,241,0.07) 42%, transparent 70%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 96% 100%, rgba(34,211,238,0.12) 0%, rgba(129,140,248,0.06) 40%, transparent 70%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 70% 60% at 60% 50%, black 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 60% 50%, black 30%, transparent 90%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          style={{ paddingLeft: "clamp(0px, 4vw, 100px)", marginBottom: "clamp(48px, 6vw, 80px)" }} className="cc-section-text"
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(168,85,247,0.10)", border: "1px solid rgba(168,85,247,0.35)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#C4B5FD",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#A78BFA,#E879F9)", display: "inline-block", flexShrink: 0 }} />
              The problem
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#fff", margin: "0 0 32px",
          }}>
            Compliance is a state,{" "}
            <span style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              not a document.
            </span>
          </motion.h2>

          <motion.div variants={fadeUp} style={{
            margin: "0 0 48px", maxWidth: 700, padding: "28px 36px",
            borderLeft: "3px solid #A855F7", background: "rgba(168,85,247,0.06)",
            borderRadius: "0 16px 16px 0",
          }}>
            <p style={{
              fontSize: "clamp(1.15rem, 1.5vw, 1.35rem)", lineHeight: 1.6, fontWeight: 400,
              color: "rgba(255,255,255,0.90)", margin: 0,
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontStyle: "italic",
            }}>
              It is a state the organisation is either in, or quietly drifting out of.
            </p>
          </motion.div>

          <motion.p variants={fadeUp} style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.65)", maxWidth: 780, margin: 0,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}>
            Between a standard and the way work is actually done, three gaps open slowly, and are usually found late. The adoption gap, between the standard and the processes meant to satisfy it. The implementation gap, between those processes and their real rollout. And the daily-work gap, between rollout and what people genuinely do every day, the one that reopens constantly and never stays shut on its own. An organisation is only as compliant as those three gaps are kept narrow.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          style={{ width: "100%" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 150" width="100%" style={{ display: "block" }} aria-label="The three compliance gaps">
            <defs><marker id="tg-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#A855F7"/></marker></defs>
            <g>
              <rect x="8" y="52" width="150" height="46" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
              <text x="83" y="72" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">The Standard</text>
              <text x="83" y="88" textAnchor="middle" fontSize="7.6" fill="rgba(255,255,255,0.50)">what you must ensure</text>
              <rect x="196" y="52" width="150" height="46" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
              <text x="271" y="72" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">Processes</text>
              <text x="271" y="88" textAnchor="middle" fontSize="7.6" fill="rgba(255,255,255,0.50)">your local how</text>
              <rect x="384" y="52" width="150" height="46" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
              <text x="459" y="72" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">Implementation</text>
              <text x="459" y="88" textAnchor="middle" fontSize="7.6" fill="rgba(255,255,255,0.50)">rolled out &amp; trained</text>
              <rect x="562" y="52" width="150" height="46" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
              <text x="637" y="72" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">Daily Work</text>
              <text x="637" y="88" textAnchor="middle" fontSize="7.6" fill="rgba(255,255,255,0.50)">done every day</text>
            </g>
            <g>
              <path d="M160,75 L194,75" fill="none" stroke="#A855F7" strokeWidth="1.4" markerEnd="url(#tg-arrow)"/>
              <text x="177" y="42" textAnchor="middle" fontSize="7.2" fontWeight="700" letterSpacing="0.4" fill="#C084FC">ADOPTION</text>
              <text x="177" y="51" textAnchor="middle" fontSize="7.2" fontWeight="700" letterSpacing="0.4" fill="#C084FC">GAP</text>
              <path d="M348,75 L382,75" fill="none" stroke="#818CF8" strokeWidth="1.4" markerEnd="url(#tg-arrow)"/>
              <text x="365" y="42" textAnchor="middle" fontSize="7.2" fontWeight="700" letterSpacing="0.4" fill="#A5B4FC">IMPLEMENTATION</text>
              <text x="365" y="51" textAnchor="middle" fontSize="7.2" fontWeight="700" letterSpacing="0.4" fill="#A5B4FC">GAP</text>
              <path d="M536,75 L560,75" fill="none" stroke="#22D3EE" strokeWidth="1.4" markerEnd="url(#tg-arrow)"/>
              <text x="548" y="42" textAnchor="middle" fontSize="7.2" fontWeight="700" letterSpacing="0.4" fill="#67E8F9">DAILY-WORK</text>
              <text x="548" y="51" textAnchor="middle" fontSize="7.2" fontWeight="700" letterSpacing="0.4" fill="#67E8F9">GAP</text>
            </g>
            <text x="360" y="128" textAnchor="middle" fontSize="8.4" fill="rgba(255,255,255,0.45)">Compliance holds only as well as all three gaps are continuously minimised.</text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 3 — THE CAPABILITY: SEE / HELP / AUTOMATE
   ════════════════════════════════════════════════════════════════════════ */
function SeeHelpAutomate({ locale }: { locale: string }) {
  return (
    <section style={{
      position: "relative", width: "100%",
      padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
      background: "linear-gradient(168deg, #0C0A24 0%, #0B0820 30%, #070A1F 60%, #04060F 100%)",
      overflow: "hidden", isolation: "isolate",
      fontFamily: "var(--font-geist), system-ui, sans-serif",
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 96% 0%, rgba(34,211,238,0.14) 0%, rgba(129,140,248,0.06) 40%, transparent 70%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 4% 100%, rgba(168,85,247,0.14) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 60% 55%, rgba(168,85,247,0.08) 0%, rgba(99,102,241,0.04) 35%, transparent 70%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 70% 60% at 40% 50%, black 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 40% 50%, black 30%, transparent 90%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          style={{ paddingLeft: "clamp(0px, 4vw, 100px)", marginBottom: "clamp(48px, 6vw, 80px)" }} className="cc-section-text"
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.35)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#67E8F9",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#22D3EE,#818CF8)", display: "inline-block", flexShrink: 0 }} />
              The capability
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#fff", margin: "0 0 20px",
          }}>
            One capability keeps the{" "}
            <span style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              gaps narrow.
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.65)", maxWidth: 680, margin: "0 0 16px",
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}>
            Continuous where compliance used to be periodic, and always over a foundation of human accountability.
          </motion.p>
          <motion.p variants={fadeUp} style={{
            fontSize: "clamp(1rem, 1.15vw, 1.1rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: 0,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}>
            It works in three elements, each pointed at the gaps it helps to close.
          </motion.p>
        </motion.div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "clamp(16px, 2vw, 28px)", width: "100%", marginBottom: 48,
        }} className="cc-three-cards">
          {[
            { title: "See.", body: "Continuously detect where all three gaps stand, in one living overview. You cannot close what you cannot see.", accent: "#22D3EE", glow: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.25)" },
            { title: "Help.", body: "An always-on assistant at the point of work, answering the person in the moment they are unsure, before a gap becomes a finding.", accent: "#818CF8", glow: "rgba(129,140,248,0.15)", border: "rgba(129,140,248,0.25)" },
            { title: "Automate.", body: "Agents that let the work comply by itself, wherever it can, so the requirement is met by construction rather than by someone remembering to check.", accent: "#A855F7", glow: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.25)" },
          ].map((card, i) => (
            <motion.div key={card.title} variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.1 }}
              style={{
                position: "relative", borderRadius: 20,
                padding: "clamp(28px, 3vw, 40px) clamp(24px, 2.5vw, 36px)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                border: `1px solid ${card.border}`,
                boxShadow: `0 0 40px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                backdropFilter: "blur(12px)",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: "15%", right: "15%", height: 2,
                borderRadius: "0 0 4px 4px",
                background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
              }} />
              <h3 style={{
                fontSize: "clamp(1.3rem, 1.6vw, 1.5rem)", fontWeight: 800, lineHeight: 1.25,
                color: card.accent, margin: "0 0 16px", letterSpacing: "-0.01em",
              }}>{card.title}</h3>
              <p style={{
                fontSize: "clamp(0.9rem, 1vw, 1rem)", lineHeight: 1.65,
                color: "rgba(255,255,255,0.60)", margin: 0,
                fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
              }}>{card.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          style={{ paddingLeft: "clamp(0px, 4vw, 100px)", marginBottom: 64 }} className="cc-section-text"
        >
          <div aria-hidden style={{ width: 64, height: 1, background: "linear-gradient(90deg, transparent, #A855F7, #22D3EE, transparent)", margin: "0 0 20px" }} />
          <p style={{
            fontSize: "clamp(1rem, 1.2vw, 1.1rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.75)", margin: 0, maxWidth: 700,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 400, fontStyle: "italic",
          }}>
            Throughout, the people stay accountable. The capability extends their reach, it does not take the judgement away.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          style={{ width: "100%" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" width="100%" style={{ display: "block" }} aria-label="See, Help, and Automate over the three gaps">
            <defs><marker id="sha-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#A855F7"/></marker></defs>
            <line x1="36" y1="160" x2="604" y2="160" stroke="rgba(255,255,255,0.12)" strokeWidth="2"/>
            <text x="82" y="149" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">The Standard</text>
            <text x="242" y="149" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">Processes</text>
            <text x="410" y="149" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">Implementation</text>
            <text x="572" y="149" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">Daily Work</text>
            <circle cx="162" cy="160" r="5" fill="#A855F7"/>
            <circle cx="326" cy="160" r="5" fill="#818CF8"/>
            <circle cx="492" cy="160" r="7.5" fill="#22D3EE"/>
            <text x="162" y="180" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="0.3" fill="#C084FC">ADOPTION GAP</text>
            <text x="326" y="180" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="0.3" fill="#A5B4FC">IMPLEMENTATION GAP</text>
            <text x="492" y="180" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="0.3" fill="#67E8F9">DAILY-WORK GAP</text>
            <rect x="286" y="14" width="68" height="30" rx="15" fill="#22D3EE"/>
            <text x="320" y="33" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#04060F">See</text>
            <path d="M303,45 Q210,96 164,151" fill="none" stroke="#22D3EE" strokeWidth="1.2" markerEnd="url(#sha-arrow)"/>
            <path d="M320,46 L325,150" fill="none" stroke="#22D3EE" strokeWidth="1.2" markerEnd="url(#sha-arrow)"/>
            <path d="M337,45 Q450,96 490,150" fill="none" stroke="#22D3EE" strokeWidth="1.2" markerEnd="url(#sha-arrow)"/>
            <rect x="392" y="256" width="70" height="30" rx="15" fill="#818CF8"/>
            <text x="427" y="275" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">Help</text>
            <path d="M447,256 Q474,226 486,192" fill="none" stroke="#818CF8" strokeWidth="1.2" markerEnd="url(#sha-arrow)"/>
            <rect x="520" y="256" width="94" height="30" rx="15" fill="#A855F7"/>
            <text x="567" y="275" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">Automate</text>
            <path d="M556,256 Q527,226 500,192" fill="none" stroke="#A855F7" strokeWidth="1.2" markerEnd="url(#sha-arrow)"/>
            <text x="320" y="298" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.45)">See spans all three gaps. Help and Automate work the daily-work gap, the one that never stays shut.</text>
          </svg>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
@media (max-width: 900px) { .cc-three-cards { grid-template-columns: 1fr !important; } }
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 4 — FROM CONCEPT TO CAPABILITY
   ════════════════════════════════════════════════════════════════════════ */
function ConceptToCapability({ locale }: { locale: string }) {
  return (
    <section style={{
      position: "relative", width: "100%",
      padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
      background: "linear-gradient(168deg, #04060F 0%, #070815 40%, #0A0920 100%)",
      overflow: "hidden", isolation: "isolate",
      fontFamily: "var(--font-geist), system-ui, sans-serif",
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 4% 50%, rgba(34,211,238,0.10) 0%, transparent 65%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 50% 45% at 96% 50%, rgba(168,85,247,0.08) 0%, transparent 65%)",
      }} />

      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        style={{ position: "relative", zIndex: 1, paddingLeft: "clamp(0px, 4vw, 100px)" }} className="cc-section-text"
      >
        <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            padding: "7px 16px", borderRadius: 999,
            background: "rgba(168,85,247,0.10)", border: "1px solid rgba(168,85,247,0.35)",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
            textTransform: "uppercase" as const, color: "#C4B5FD",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#A855F7,#818CF8)", display: "inline-block", flexShrink: 0 }} />
            From concept to capability
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 800, lineHeight: 1.05,
          letterSpacing: "-0.03em", color: "#fff", margin: "0 0 20px",
        }}>
          It becomes real by{" "}
          <span style={{
            background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>starting small.</span>
        </motion.h2>

        <motion.p variants={fadeUp} style={{
          fontSize: "clamp(1.1rem, 1.35vw, 1.25rem)", lineHeight: 1.6,
          color: "rgba(255,255,255,0.75)", margin: "0 0 32px", maxWidth: 780,
          fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 400,
        }}>
          One domain, one first job, proven on real ground before anything larger.
        </motion.p>

        <motion.p variants={fadeUp} style={{
          fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.65,
          color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 780,
          fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
        }}>
          A capability like this is not switched on everywhere at once. It becomes real the opposite way, by narrowing to a single domain where the gap is real and measurable, and a single first job that is safe to begin with. In IT and the cloud the drift is clearest: the rate of change is high, the standard is documented, and the systems are described in code, so their true state can be read directly. The safe first job is to audit what already runs. It only reads, it changes nothing, and it delivers a true, current picture of where things stand from the first day.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 5 — WHY AN AGENTIC AUDIT
   ════════════════════════════════════════════════════════════════════════ */
function AgenticAudit({ locale }: { locale: string }) {
  return (
    <section style={{
      position: "relative", width: "100%",
      padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
      background: "linear-gradient(168deg, #0A0920 0%, #0C0A24 30%, #070A1F 60%, #04060F 100%)",
      overflow: "hidden", isolation: "isolate",
      fontFamily: "var(--font-geist), system-ui, sans-serif",
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 96% 0%, rgba(34,211,238,0.12) 0%, rgba(129,140,248,0.05) 40%, transparent 70%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 4% 100%, rgba(168,85,247,0.10) 0%, transparent 65%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 70% 60% at 60% 50%, black 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 60% 50%, black 30%, transparent 90%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          style={{ paddingLeft: "clamp(0px, 4vw, 100px)", marginBottom: "clamp(48px, 6vw, 80px)" }} className="cc-section-text"
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.35)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#67E8F9",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#22D3EE,#818CF8)", display: "inline-block", flexShrink: 0 }} />
              Why it works
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#fff", margin: "0 0 20px",
          }}>
            An audit that reads{" "}
            <span style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>reality, not a checklist.</span>
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontSize: "clamp(1.1rem, 1.35vw, 1.25rem)", lineHeight: 1.6,
            color: "rgba(255,255,255,0.75)", margin: "0 0 32px", maxWidth: 780,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 400,
          }}>
            A green checklist is not the same as a green estate.
          </motion.p>

          <motion.p variants={fadeUp} style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 780,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}>
            A traditional audit walks a fixed checklist, reviewed by hand and rarely updated between cycles. It can read green while the running reality has quietly drifted. An agentic audit reads what is actually running, updates the moment the requirements change, runs as often as needed, and removes the subjectivity. It gives one clear, objective view of what is genuinely there, rather than what the checklist asserts.
          </motion.p>
        </motion.div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(16px, 2vw, 28px)", width: "100%", alignItems: "stretch",
        }} className="cc-contrast-grid">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            style={{ borderRadius: 20, padding: "clamp(28px, 3vw, 40px)",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.40)", margin: "0 0 24px" }}>
              The checklist · today
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["Access controls", "Encryption at rest", "Logging enabled"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "rgba(255,255,255,0.30)", fontSize: 14 }}>✓</span>
                  <span style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.50)", fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300 }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.30)", margin: "28px 0 0" }}>
              Reports: all green
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            style={{ borderRadius: 20, padding: "clamp(28px, 3vw, 40px)",
              background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.25)",
              boxShadow: "0 0 40px rgba(168,85,247,0.10)",
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C084FC", margin: "0 0 24px" }}>
              The agentic audit
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#22D3EE", fontSize: 14 }}>✓</span>
                <span style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300 }}>Access controls</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#E879F9", fontSize: 14, fontWeight: 700 }}>!</span>
                <span style={{ fontSize: "0.95rem", color: "#E879F9", fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 500 }}>Encryption has drifted</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#22D3EE", fontSize: 14 }}>✓</span>
                <span style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300 }}>Logging enabled</span>
              </div>
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#A855F7", margin: "28px 0 0" }}>
              Reports: what is actually true
            </p>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
@media (max-width: 700px) { .cc-contrast-grid { grid-template-columns: 1fr !important; } }
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 6 — HOW IT ROLLS OUT
   ════════════════════════════════════════════════════════════════════════ */
function Rollout({ locale }: { locale: string }) {
  return (
    <section style={{
      position: "relative", width: "100%",
      padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
      background: "linear-gradient(168deg, #04060F 0%, #070815 30%, #0A0920 60%, #0C0A24 100%)",
      overflow: "hidden", isolation: "isolate",
      fontFamily: "var(--font-geist), system-ui, sans-serif",
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 4% 0%, rgba(129,140,248,0.12) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 96% 100%, rgba(168,85,247,0.10) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          style={{ paddingLeft: "clamp(0px, 4vw, 100px)", marginBottom: "clamp(48px, 6vw, 80px)" }} className="cc-section-text"
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(129,140,248,0.10)", border: "1px solid rgba(129,140,248,0.35)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#A5B4FC",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#818CF8,#A855F7)", display: "inline-block", flexShrink: 0 }} />
              How it rolls out
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#fff", margin: "0 0 20px",
          }}>
            One safe step{" "}
            <span style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>at a time.</span>
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontSize: "clamp(1.1rem, 1.35vw, 1.25rem)", lineHeight: 1.6,
            color: "rgba(255,255,255,0.75)", margin: "0 0 32px", maxWidth: 780,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 400,
          }}>
            Two focuses, taken in order, so the capability is earned before it is trusted.
          </motion.p>

          <motion.p variants={fadeUp} style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 780,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}>
            The work has two focuses: the audit of what already runs, and the review of new work before it is released. It starts with the audit, and only the audit, for a clear reason. The audit sits outside the delivery flow, so it cannot slow it and cannot wave a flaw through, and it is how the agents are proven and tuned on real ground before they are ever trusted to gate a release. From there it widens across the wider landscape, and only then moves into change and release. The same knowledge, earned first where it can do no harm.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          style={{ width: "100%" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 150" width="100%" style={{ display: "block" }} aria-label="Rollout arc: audit first, then change and release">
            <defs>
              <marker id="ra-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#A855F7"/></marker>
              <marker id="ra-arrowL" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(168,85,247,0.45)"/></marker>
            </defs>
            <text x="180" y="24" textAnchor="middle" fontSize="7.2" fontWeight="700" letterSpacing="1.2" fill="rgba(255,255,255,0.35)">AUDIT · WHAT ALREADY RUNS</text>
            <text x="548" y="24" textAnchor="middle" fontSize="7.2" fontWeight="700" letterSpacing="1.2" fill="rgba(255,255,255,0.35)">CHANGE &amp; RELEASE · NEW WORK</text>
            <rect x="20" y="58" width="152" height="60" rx="13" fill="#A855F7"/>
            <text x="96" y="84" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#fff">Audit</text>
            <text x="96" y="100" textAnchor="middle" fontSize="7.6" fill="rgba(255,255,255,0.70)">start narrow, one place</text>
            <path d="M172,88 L206,88" fill="none" stroke="#A855F7" strokeWidth="1.5" markerEnd="url(#ra-arrow)"/>
            <text x="189" y="78" textAnchor="middle" fontSize="6.6" fontStyle="italic" fill="#C084FC">learn</text>
            <rect x="208" y="58" width="152" height="60" rx="13" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.35)"/>
            <text x="284" y="84" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#C084FC">Audit</text>
            <text x="284" y="100" textAnchor="middle" fontSize="7.6" fill="rgba(255,255,255,0.50)">across the landscape</text>
            <path d="M360,88 L396,88" fill="none" stroke="rgba(168,85,247,0.45)" strokeWidth="1.5" markerEnd="url(#ra-arrowL)"/>
            <text x="378" y="78" textAnchor="middle" fontSize="6.4" fontStyle="italic" fill="#C084FC">carry</text>
            <rect x="398" y="58" width="152" height="60" rx="13" fill="rgba(129,140,248,0.10)" stroke="rgba(129,140,248,0.25)"/>
            <text x="474" y="84" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="rgba(255,255,255,0.70)">Change &amp; Release</text>
            <text x="474" y="100" textAnchor="middle" fontSize="7.6" fill="rgba(255,255,255,0.40)">review, once earned</text>
            <path d="M550,88 L586,88" fill="none" stroke="rgba(168,85,247,0.45)" strokeWidth="1.5" markerEnd="url(#ra-arrowL)"/>
            <text x="568" y="78" textAnchor="middle" fontSize="6.6" fontStyle="italic" fill="#C084FC">learn</text>
            <rect x="588" y="58" width="112" height="60" rx="13" fill="rgba(129,140,248,0.06)" stroke="rgba(129,140,248,0.18)"/>
            <text x="644" y="84" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="rgba(255,255,255,0.55)">Refine</text>
            <text x="644" y="100" textAnchor="middle" fontSize="7.6" fill="rgba(255,255,255,0.35)">and widen</text>
            <text x="360" y="140" textAnchor="middle" fontSize="8.2" fill="rgba(255,255,255,0.40)">One capability, expanding one safe step at a time.</text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 7 — VALUE, AND FOR WHOM
   ════════════════════════════════════════════════════════════════════════ */
function ValueCards({ locale }: { locale: string }) {
  const cards = [
    { title: "Security and compliance leadership", body: "A true, current view of posture, instead of a point-in-time snapshot. Evidence that is ready year-round, not assembled in the weeks before an audit.", accent: "#22D3EE", glow: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.25)" },
    { title: "Engineering", body: "Clear, prioritised findings instead of vague pressure, and, in time, guidance in the flow of the work rather than a surprise late in a release.", accent: "#818CF8", glow: "rgba(129,140,248,0.15)", border: "rgba(129,140,248,0.25)" },
    { title: "The organisation", body: "Compliance held as a standing condition, quietly, in the background, with people still owning every decision.", accent: "#A855F7", glow: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.25)" },
  ];

  return (
    <section style={{
      position: "relative", width: "100%",
      padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
      background: "linear-gradient(168deg, #0C0A24 0%, #0B0820 30%, #070A1F 60%, #04060F 100%)",
      overflow: "hidden", isolation: "isolate",
      fontFamily: "var(--font-geist), system-ui, sans-serif",
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(232,121,249,0.10) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 96% 100%, rgba(34,211,238,0.10) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          style={{ paddingLeft: "clamp(0px, 4vw, 100px)", marginBottom: "clamp(60px, 8vw, 100px)" }} className="cc-section-text"
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(232,121,249,0.10)", border: "1px solid rgba(232,121,249,0.35)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#F0ABFC",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#E879F9,#A855F7)", display: "inline-block", flexShrink: 0 }} />
              The value
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#fff", margin: 0,
          }}>
            What changes,{" "}
            <span style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>and for whom.</span>
          </motion.h2>
        </motion.div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "clamp(16px, 2vw, 28px)", width: "100%",
        }} className="cc-value-grid">
          {cards.map((card, i) => (
            <motion.div key={card.title} variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.1 }}
              style={{
                position: "relative", borderRadius: 20,
                padding: "clamp(28px, 3vw, 40px) clamp(24px, 2.5vw, 36px)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                border: `1px solid ${card.border}`,
                boxShadow: `0 0 40px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                backdropFilter: "blur(12px)",
                display: "flex", flexDirection: "column" as const, gap: 16,
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: "15%", right: "15%", height: 2,
                borderRadius: "0 0 4px 4px",
                background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
              }} />
              <h3 style={{
                fontSize: "clamp(1.1rem, 1.3vw, 1.25rem)", fontWeight: 700, lineHeight: 1.25,
                color: "#fff", margin: 0, letterSpacing: "-0.01em",
              }}>{card.title}</h3>
              <p style={{
                fontSize: "clamp(0.9rem, 1vw, 1rem)", lineHeight: 1.65,
                color: "rgba(255,255,255,0.60)", margin: 0,
                fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
              }}>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
@media (max-width: 900px) { .cc-value-grid { grid-template-columns: 1fr !important; } }
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 8 — READ THE PERSPECTIVE
   ════════════════════════════════════════════════════════════════════════ */
function ReadPerspective({ locale }: { locale: string }) {
  return (
    <section id="read-the-perspective" style={{
      position: "relative", width: "100%",
      padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
      background: "linear-gradient(168deg, #04060F 0%, #070815 40%, #0A0920 100%)",
      overflow: "hidden", isolation: "isolate",
      fontFamily: "var(--font-geist), system-ui, sans-serif",
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 4% 0%, rgba(168,85,247,0.12) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
      }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 50% 45% at 96% 100%, rgba(34,211,238,0.10) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          style={{ paddingLeft: "clamp(0px, 4vw, 100px)", marginBottom: "clamp(60px, 8vw, 100px)" }} className="cc-section-text"
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(168,85,247,0.10)", border: "1px solid rgba(168,85,247,0.35)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#C4B5FD",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#A855F7,#22D3EE)", display: "inline-block", flexShrink: 0 }} />
              Go deeper
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{
            fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#fff", margin: "0 0 20px",
          }}>
            The full thinking,{" "}
            <span style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>in two parts.</span>
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.65)", maxWidth: 600, margin: 0,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}>
            We have written it down. The concept, and how it becomes real.
          </motion.p>
        </motion.div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(16px, 2vw, 28px)", width: "100%", marginBottom: 48,
        }} className="cc-doc-grid">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            style={{ borderRadius: 20, padding: "clamp(28px, 3vw, 40px)",
              background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.25)",
              boxShadow: "0 0 40px rgba(168,85,247,0.08)",
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#C084FC", margin: "0 0 16px" }}>Part I</p>
            <h3 style={{ fontSize: "clamp(1.1rem, 1.3vw, 1.25rem)", fontWeight: 700, lineHeight: 1.3, color: "#fff", margin: "0 0 12px" }}>
              Compliance as a Living Capability
            </h3>
            <p style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)", lineHeight: 1.65, color: "rgba(255,255,255,0.55)", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300 }}>
              The concept. Why compliance is a state rather than an event, what the three gaps are, and the capability that keeps them narrow.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            style={{ borderRadius: 20, padding: "clamp(28px, 3vw, 40px)",
              background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.25)",
              boxShadow: "0 0 40px rgba(34,211,238,0.08)",
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#67E8F9", margin: "0 0 16px" }}>Part II</p>
            <h3 style={{ fontSize: "clamp(1.1rem, 1.3vw, 1.25rem)", fontWeight: 700, lineHeight: 1.3, color: "#fff", margin: "0 0 12px" }}>
              From Concept to Capability
            </h3>
            <p style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)", lineHeight: 1.65, color: "rgba(255,255,255,0.55)", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300 }}>
              The how. Taking the concept into a concrete first implementation, agentic security compliance, one safe step at a time.
            </p>
          </motion.div>
        </div>

        {/* PLACEHOLDER: link to documents */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          style={{ paddingLeft: "clamp(0px, 4vw, 100px)" }} className="cc-section-text"
        >
          <a href="#documents" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "16px 30px", borderRadius: 999,
            background: "linear-gradient(135deg, #A855F7, #818CF8)",
            color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            boxShadow: "0 12px 36px rgba(124,111,212,0.35)",
          }}>
            {/* TODO: Replace href — decide: direct PDF download or request form? */}
            Read Part I and II <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
@media (max-width: 700px) { .cc-doc-grid { grid-template-columns: 1fr !important; } }
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 9 — NEXT STEP CTA
   ════════════════════════════════════════════════════════════════════════ */
function NextStepCta({ locale }: { locale: string }) {
  return (
    <section style={{
      position: "relative", width: "100%",
      padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
      background: "linear-gradient(168deg, #0A0920 0%, #0A1628 40%, #0D1F3C 100%)",
      overflow: "hidden", isolation: "isolate",
      fontFamily: "var(--font-geist), system-ui, sans-serif",
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-10%", left: "5%",
          width: "50vw", height: "50vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", right: "5%",
          width: "45vw", height: "45vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }} />
      </div>

      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        style={{ position: "relative", zIndex: 1, paddingLeft: "clamp(0px, 4vw, 100px)" }} className="cc-section-text"
      >
        <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            padding: "7px 16px", borderRadius: 999,
            background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.35)",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
            textTransform: "uppercase" as const, color: "#67E8F9",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#22D3EE,#A855F7)", display: "inline-block", flexShrink: 0 }} />
            Next step
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 800, lineHeight: 1.05,
          letterSpacing: "-0.03em", color: "#fff", margin: "0 0 24px",
        }}>
          This is a conversation{" "}
          <span style={{
            background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>worth having.</span>
        </motion.h2>

        <motion.p variants={fadeUp} style={{
          fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.65,
          color: "rgba(255,255,255,0.65)", maxWidth: 600, margin: "0 0 40px",
          fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
        }}>
          If compliance in your organisation still lives in the weeks before an audit, there is a steadier way to hold it. We would be glad to walk you through what it could look like in your world.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link href={`/${locale}/contact`} style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "20px 42px", borderRadius: 999,
            background: "linear-gradient(135deg, #A855F7, #818CF8)",
            color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            boxShadow: "0 12px 40px rgba(124,111,212,0.40)",
          }}>
            Start a conversation with xrNORD <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */
export default function CompliancePage() {
  const locale = useLocale();

  return (
    <main style={{ background: "#04060F" }}>
      <Navbar />
      <Hero locale={locale} />
      <CapabilityBridge />
      <ThreeGaps locale={locale} />
      <SeeHelpAutomate locale={locale} />
      <ConceptToCapability locale={locale} />
      <AgenticAudit locale={locale} />
      <Rollout locale={locale} />
      <ValueCards locale={locale} />
      <ReadPerspective locale={locale} />
      <NextStepCta locale={locale} />
    </main>
  );
}
