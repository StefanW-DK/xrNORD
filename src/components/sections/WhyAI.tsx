"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

const VIDEO_SRC = "/assets/home/why/xrNORD_interview.mp4";

/* ── Preview card ──────────────────────────────────────── */
interface CardProps {
  name: string;
  role: string;
  topic: string;
  imageSrc: string;
  href: string;
  delay: number;
}

function PreviewCard({ name, role, topic, imageSrc, href, delay }: CardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 16px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(148,163,184,0.12)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease",
      }}
    >
      {/* Photo */}
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          background: "#CBD5E1",
        }}
      >
        <img
          src={imageSrc}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <p style={{
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontSize: "0.875rem",
          fontWeight: 700,
          color: "#0F172A",
          marginBottom: "2px",
        }}>
          {name}
        </p>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.75rem",
          color: "#64748B",
          marginBottom: "3px",
        }}>
          {role}
        </p>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.75rem",
          fontStyle: "italic",
          color: "#475569",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {topic}
        </p>
      </div>
    </motion.a>
  );
}

/* ── Main Section ──────────────────────────────────────── */
export default function WhyAI() {
  const t = useTranslations("whyai");
  return (
    <section
      className="py-20 lg:py-28 relative"
      style={{
        background: "#F1F5F9",
      }}
    >

      {/* Top separator */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.2) 40%, rgba(148,163,184,0.2) 60%, transparent 100%)",
      }} />

      <div className="whyai-grid">

        {/* ── LEFT ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ maxWidth: "520px", width: "100%", minWidth: 0 }}
        >
          <p style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            color: "#94A3B8",
            marginBottom: "28px",
          }}>
            {t("eyebrow")}
          </p>

          <h2 style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "clamp(2.4rem, 3.5vw, 3.2rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#0F172A",
            marginBottom: "28px",
          }}>
            {t("headline")}
          </h2>

          <div style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "#64748B",
            marginBottom: "40px",
          }}>
            <p style={{ marginBottom: "12px" }}>
              {t("bodyOne")}
            </p>
            <p>
              {t("bodyTwo")}
            </p>
          </div>

          {/* Company logos — subtle social proof */}
          <div style={{ marginBottom: "32px" }}>
            <p style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "#64748B",
              marginBottom: "14px",
            }}>
              {t("featuredLabel")}
            </p>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap" as const,
            }}>
              {[
                { src: "/assets/home/why/logos/dansk-erhverv.png", alt: "Dansk Erhverv" },
                { src: "/assets/home/why/logos/greybird.png",      alt: "GreyBird Pilot Academy" },
                { src: "/assets/home/why/logos/dinero.png",        alt: "Dinero" },
                { src: "/assets/home/why/logos/no-zebra.png",      alt: "No Zebra" },
                { src: "/assets/home/why/logos/acgroup.png",       alt: "AC Group" },
                { src: "/assets/home/why/logos/vrpilot.png",       alt: "vrPILOT" },
              ].map(({ src, alt }) => (
                <img
                  key={alt}
                  src={src}
                  alt={alt}
                  title={alt}
                  style={{
                    height: "24px",
                    width: "auto",
                    maxWidth: "80px",
                    objectFit: "contain",
                    filter: "grayscale(100%) brightness(0) opacity(0.22)",
                    transition: "opacity 0.3s ease, filter 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.filter = "grayscale(100%) brightness(0) opacity(0.5)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.filter = "grayscale(100%) brightness(0) opacity(0.22)";
                  }}
                />
              ))}
            </div>
          </div>

          <Link
            href="/interviews"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "0.92rem",
              fontWeight: 600,
              color: "#7C3AED",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            {t("cta")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* ── RIGHT ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: 0 }}
        >
          {/* Main video */}
          <div style={{
            position: "relative",
            width: "100%",
            borderRadius: "18px",
            overflow: "hidden",
            aspectRatio: "16 / 9",
            boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
            background: "#0F172A",
          }}>
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
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>

            {/* Bottom gradient for label */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "40%",
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
              pointerEvents: "none",
            }} />

            {/* Play button */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60px", height: "60px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "2px" }}>
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </div>

            {/* Label */}
            <p style={{
              position: "absolute",
              bottom: "16px",
              left: "20px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.8)",
              pointerEvents: "none",
            }}>
              Conversations with leaders and AI experts
            </p>
          </div>

          {/* Preview cards */}
          <div className="whyai-cards" style={{ display: "flex", gap: "12px" }}>
            <PreviewCard
              name="Sarah Schroeder"
              role="Assistant Professor & PhD, AU"
              topic="AI's role in higher education and research"
              imageSrc="/assets/home/why/Sarah.png"
              href="https://www.youtube.com/watch?v=9NbDjEmLbS8&t=827s"
              delay={0.2}
            />
            <PreviewCard
              name="Søren Møller"
              role="Founder & CTO, GreyBird Pilot Academy"
              topic="How AI is transforming pilot training"
              imageSrc="/assets/home/why/Søren.png"
              href="https://www.youtube.com/watch?v=MoQ2YDH_kRM&t=4s"
              delay={0.3}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
