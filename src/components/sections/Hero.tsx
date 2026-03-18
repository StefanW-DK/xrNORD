"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

const gradientStyle = {
  backgroundImage: "linear-gradient(135deg, #22D3EE, #38BDF8, #818CF8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover md:object-center"
        style={{
          objectPosition: "80% center",
        }}
        src="/assets/home/hero/hero-video.mp4"
      />

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,8,18,0.72) 0%, rgba(4,8,18,0.55) 50%, rgba(4,8,18,0.78) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center text-white">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 mb-20 cursor-default"
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: "#22D3EE",
              boxShadow: "0 0 6px #22D3EE",
            }}
          />
          <span
            className="font-semibold uppercase"
            style={{
              letterSpacing: "0.2em",
              fontSize: "13px",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            {t("badge")}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-bold mb-7"
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
          }}
        >
          {t("headlinePre")}{" "}
          <span style={gradientStyle}>{t("headlineHighlight1")}</span>{" "}
          {t("headlineMid")}
          <br />
          <span style={gradientStyle}>{t("headlineHighlight2")}</span>{" "}
          {t("headlineEnd")}
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-12"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "1.125rem",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          {t("subtext")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <Link
            href="/workshop"
            className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            {t("ctaPrimary")}
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Secondary CTA */}
          <button
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-sm transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
            }}
          >
            <span
              className="flex items-center justify-center w-7 h-7 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <svg
                className="w-2.5 h-2.5 ml-0.5"
                fill="currentColor"
                viewBox="0 0 8 10"
              >
                <path d="M0 0l8 5-8 5V0z" />
              </svg>
            </span>
            {t("ctaSecondary")}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 flex flex-col items-center gap-2.5"
        style={{ transform: "translateX(-50%)" }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <div
            className="w-px h-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
            }}
          />
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
