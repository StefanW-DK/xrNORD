"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";

const COUNTRY_CODES = [
  { code: "+45", country: "DK", flag: "🇩🇰" },
  { code: "+47", country: "NO", flag: "🇳🇴" },
  { code: "+46", country: "SE", flag: "🇸🇪" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+93", country: "AF", flag: "🇦🇫" },
  { code: "+355", country: "AL", flag: "🇦🇱" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+43", country: "AT", flag: "🇦🇹" },
  { code: "+32", country: "BE", flag: "🇧🇪" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+1", country: "CA", flag: "🇨🇦" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+420", country: "CZ", flag: "🇨🇿" },
  { code: "+20", country: "EG", flag: "🇪🇬" },
  { code: "+372", country: "EE", flag: "🇪🇪" },
  { code: "+358", country: "FI", flag: "🇫🇮" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+30", country: "GR", flag: "🇬🇷" },
  { code: "+36", country: "HU", flag: "🇭🇺" },
  { code: "+354", country: "IS", flag: "🇮🇸" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+353", country: "IE", flag: "🇮🇪" },
  { code: "+972", country: "IL", flag: "🇮🇱" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+371", country: "LV", flag: "🇱🇻" },
  { code: "+370", country: "LT", flag: "🇱🇹" },
  { code: "+352", country: "LU", flag: "🇱🇺" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+64", country: "NZ", flag: "🇳🇿" },
  { code: "+48", country: "PL", flag: "🇵🇱" },
  { code: "+351", country: "PT", flag: "🇵🇹" },
  { code: "+40", country: "RO", flag: "🇷🇴" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+421", country: "SK", flag: "🇸🇰" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+41", country: "CH", flag: "🇨🇭" },
  { code: "+90", country: "TR", flag: "🇹🇷" },
  { code: "+380", country: "UA", flag: "🇺🇦" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+1", country: "US", flag: "🇺🇸" },
];

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_DA = [
  "Januar", "Februar", "Marts", "April", "Maj", "Juni",
  "Juli", "August", "September", "Oktober", "November", "December",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#F1F5F9",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
};

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(192,38,211,0.4)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(192,38,211,0.08)";
  e.currentTarget.style.background = "rgba(255,255,255,0.09)";
}
function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
  e.currentTarget.style.boxShadow = "none";
  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
}

export default function BookWorkshopPage() {
  const t = useTranslations("bookWorkshop");
  const locale = useLocale();
  const months = locale === "da" ? MONTHS_DA : MONTHS_EN;

  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", day: "", month: "", year: "" });
  const [countryCode, setCountryCode] = useState("+45");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
    const formatted = digits.replace(/(\d{2})(?=\d)/g, "$1 ");
    setForm((p) => ({ ...p, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const phoneWithCode = form.phone ? `${countryCode} ${form.phone}` : "";
    const preferredDate = [form.day, form.month, form.year].filter(Boolean).join(" ");
    try {
      const res = await fetch("/api/book-workshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phone: phoneWithCode, preferredDate }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", company: "", day: "", month: "", year: "" });
        if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "generate_lead_workshop");
        }
      } else {
        const data = await res.json();
        setError(data.message || t("errorMessage"));
      }
    } catch {
      setError(t("errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: "#060410" }}>
      {/* ── Video background — very subtly darkened ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
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
            opacity: 0.55,
          }}
        >
          <source src="/assets/home/Workshop/workshop_hero_movie.mp4" type="video/mp4" />
        </video>
        {/* Heavy dark overlay — almost blacked out */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(4,3,10,0.92) 0%, rgba(6,4,16,0.90) 50%, rgba(4,3,10,0.95) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        {/* ── Hero ── */}
        <section style={{ paddingTop: "180px", paddingBottom: "40px", textAlign: "center" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(192,38,211,0.9)",
                marginBottom: "20px",
              }}
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2.6rem, 7vw, 4.4rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#F0EEF5",
                marginBottom: "24px",
              }}
            >
              {t("headline")}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C026D3, #E879F9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("highlightWord")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.55)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {t("subtext")}
            </motion.p>
          </div>
        </section>

        {/* ── Contact info cards ── */}
        <section style={{ paddingBottom: "48px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
            >
              {/* Call Us */}
              <div
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(192,38,211,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C026D3" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span style={{ color: "#fff", fontSize: "1.35rem", fontWeight: 700 }}>{t("callLabel")}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", marginBottom: "8px" }}>
                  {t("callPlaceholder")}
                </p>
                <a
                  href="tel:+4523654283"
                  style={{ color: "#C026D3", textDecoration: "none", fontSize: "1.05rem", fontWeight: 600 }}
                >
                  +45 23 65 42 83
                </a>
              </div>

              {/* Email */}
              <div
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(192,38,211,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C026D3" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 5L2 7" />
                    </svg>
                  </div>
                  <span style={{ color: "#fff", fontSize: "1.35rem", fontWeight: 700 }}>{t("emailLabel")}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", marginBottom: "8px" }}>
                  {t("emailPlaceholder")}
                </p>
                <a
                  href="mailto:info@xrnord.com"
                  style={{ color: "#C026D3", textDecoration: "none", fontSize: "1.05rem", fontWeight: 600 }}
                >
                  info@xrnord.com
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Booking Form ── */}
        <section style={{ padding: "20px 0 140px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {submitted ? (
                <div
                  style={{
                    padding: "56px 32px",
                    borderRadius: "20px",
                    background: "rgba(192,38,211,0.05)",
                    border: "1px solid rgba(192,38,211,0.15)",
                    backdropFilter: "blur(12px)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(192,38,211,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C026D3" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ color: "#C026D3", fontSize: "1.3rem", fontWeight: 700, marginBottom: "10px" }}>
                    {t("successTitle")}
                  </h3>
                  <p style={{ color: "rgba(192,38,211,0.7)", fontSize: "0.95rem" }}>{t("successMessage")}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "40px",
                    borderRadius: "24px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {error && (
                    <div
                      style={{
                        padding: "14px 18px",
                        borderRadius: "12px",
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        color: "#EF4444",
                        fontSize: "0.9rem",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="contact-row">
                    <div>
                      <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", fontWeight: 500, marginBottom: "8px" }}>
                        {t("nameLabel")} *
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={set}
                        placeholder={t("namePlaceholder")}
                        style={inputStyle}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", fontWeight: 500, marginBottom: "8px" }}>
                        {t("emailInputLabel")} *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={set}
                        placeholder="your@email.com"
                        style={inputStyle}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone */}
                  <div>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", fontWeight: 500, marginBottom: "8px" }}>
                      {t("phoneLabel")}
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        style={{
                          padding: "14px 8px 14px 12px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#F1F5F9",
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          fontSize: "0.9rem",
                          outline: "none",
                          cursor: "pointer",
                          flexShrink: 0,
                          width: "110px",
                        }}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      >
                        {COUNTRY_CODES.map((c, i) => (
                          <option key={`${c.code}-${c.country}-${i}`} value={c.code} style={{ background: "#1E293B", color: "#F1F5F9" }}>
                            {c.flag} {c.country} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="23 65 42 83"
                        style={{ ...inputStyle, flex: 1 }}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      />
                    </div>
                  </div>

                  {/* Company description */}
                  <div>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", fontWeight: 500, marginBottom: "8px" }}>
                      {t("companyLabel")} *
                    </label>
                    <textarea
                      name="company"
                      required
                      value={form.company}
                      onChange={set}
                      placeholder={t("companyPlaceholder")}
                      rows={4}
                      style={{ ...inputStyle, resize: "vertical" } as React.CSSProperties}
                      onFocus={focusInput as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                      onBlur={blurInput as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                    />
                  </div>

                  {/* Preferred date */}
                  <div>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", fontWeight: 500, marginBottom: "8px" }}>
                      {t("dateLabel")}
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 100px", gap: "10px" }}>
                      <input
                        name="day"
                        type="number"
                        min="1"
                        max="31"
                        value={form.day}
                        onChange={set}
                        placeholder={t("dayPlaceholder")}
                        style={inputStyle}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      />
                      <select
                        name="month"
                        value={form.month}
                        onChange={set}
                        style={{
                          ...inputStyle,
                          cursor: "pointer",
                          appearance: "none" as const,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 14px center",
                          paddingRight: "36px",
                        }}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      >
                        <option value="" style={{ background: "#1E293B", color: "rgba(255,255,255,0.4)" }}>
                          {locale === "da" ? "Måned" : "Month"}
                        </option>
                        {months.map((m, i) => (
                          <option key={m} value={String(i + 1)} style={{ background: "#1E293B", color: "#F1F5F9" }}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <input
                        name="year"
                        type="number"
                        min="2025"
                        max="2030"
                        value={form.year}
                        onChange={set}
                        placeholder={t("yearPlaceholder")}
                        style={inputStyle}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "18px",
                      borderRadius: "12px",
                      background: loading
                        ? "rgba(192,38,211,0.2)"
                        : "linear-gradient(135deg, #A21CAF, #C026D3, #E879F9)",
                      color: "#fff",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      letterSpacing: "0.01em",
                      transition: "all 0.25s ease",
                      boxShadow: "0 4px 24px rgba(192,38,211,0.3)",
                      opacity: loading ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 36px rgba(192,38,211,0.45)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 24px rgba(192,38,211,0.3)";
                    }}
                  >
                    {loading ? t("sendingButton") : t("submitButton")}
                  </button>

                  <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: "0.82rem" }}>
                    {t("privacyNotice")}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
