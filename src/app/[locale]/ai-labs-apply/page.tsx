"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

const COUNTRY_CODES = [
  { code: "+45", label: "🇩🇰 +45" },
  { code: "+47", label: "🇳🇴 +47" },
  { code: "+46", label: "🇸🇪 +46" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+1",  label: "🇺🇸 +1" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+31", label: "🇳🇱 +31" },
  { code: "+32", label: "🇧🇪 +32" },
  { code: "+41", label: "🇨🇭 +41" },
  { code: "+43", label: "🇦🇹 +43" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+48", label: "🇵🇱 +48" },
  { code: "+358", label: "🇫🇮 +358" },
  { code: "+372", label: "🇪🇪 +372" },
  { code: "+371", label: "🇱🇻 +371" },
  { code: "+370", label: "🇱🇹 +370" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(168,85,247,0.2)",
  color: "#F1F5F9",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
};

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.10)";
  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
}
function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(168,85,247,0.2)";
  e.currentTarget.style.boxShadow = "none";
  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
}

const da = (locale: string) => locale === "da";

export default function AILabsApplyPage() {
  const locale = useLocale();
  const isDa = da(locale);

  const [form, setForm] = useState({ company: "", name: "", title: "", email: "", phone: "" });
  const [countryCode, setCountryCode] = useState("+45");
  const [wantsToJoin, setWantsToJoin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (e: React.ChangeEvent<HTMLInputElement>) =>
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
    try {
      const res = await fetch("/api/ai-labs-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: form.phone ? `${countryCode} ${form.phone}` : "",
          wantsToJoin,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.message || (isDa ? "Noget gik galt. Prøv igen." : "Something went wrong. Please try again."));
      }
    } catch {
      setError(isDa ? "Noget gik galt. Prøv igen." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#04060F",
      fontFamily: "var(--font-geist), system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* ── Video background — AI-LABs color scheme overlay ── */}
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: 0.41,
          }}
        >
          <source src="/assets/home/Workshop/workshop_hero_movie.mp4" type="video/mp4" />
        </video>
        {/* AI-LABs gradient overlay — keeps the purple/indigo brand tone */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(168deg, rgba(4,6,15,0.90) 0%, rgba(8,12,26,0.88) 30%, rgba(15,13,40,0.86) 60%, rgba(22,13,53,0.88) 100%)",
        }} />
        {/* Atmospheric blooms */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: "45%", height: "55%", background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "45%", height: "55%", background: "radial-gradient(ellipse, rgba(168,85,247,0.10) 0%, transparent 65%)" }} />
      </div>

      <Navbar />

      <div style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center",
        maxWidth: submitted ? 560 : 1180, margin: "0 auto",
        padding: "clamp(110px, 13vw, 150px) 24px clamp(70px, 9vw, 110px)",
      }}>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center" }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: "50%", margin: "0 auto 32px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))",
              border: "1px solid rgba(168,85,247,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28,
            }}>✓</div>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: "#F5F5F7", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              {isDa ? "Ansøgning modtaget" : "Application received"}
            </h1>
            <p style={{ color: "rgba(245,245,247,0.65)", lineHeight: 1.7, margin: "0 0 40px", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
              {isDa
                ? "Vi gennemgår din ansøgning og vender tilbage hurtigst muligt."
                : "We will review your application and be in touch shortly."}
            </p>
            <Link
              href={`/${locale}/AI-LABs`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: 999,
                background: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(129,140,248,0.35)",
                color: "rgba(255,255,255,0.9)",
                textDecoration: "none", fontSize: 14, fontWeight: 500,
              }}
            >
              ← {isDa ? "Tilbage til AI-LABs" : "Back to AI-LABs"}
            </Link>
          </motion.div>
        ) : (
          <div className="apply-layout">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="apply-header"
            >
              <h1 style={{
                fontSize: "clamp(3.4rem, 7vw, 6.6rem)",
                fontWeight: 800, lineHeight: 1.0,
                letterSpacing: "-0.04em", color: "#fff", margin: "0 0 28px",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
              }}>
                {isDa ? <>Gør os til en del af</> : <>Make us a part of</>}
                <br />
                <span style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  fontSize: "1.35em",
                  lineHeight: 1.05,
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  AI-LABs
                </span>
              </h1>
              <p className="apply-subtext" style={{ color: "rgba(245,245,247,0.55)", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "clamp(1rem, 1.2vw, 1.15rem)", maxWidth: 460 }}>
                {isDa
                  ? "Udfyld formularen, så vender vi tilbage med det samme."
                  : "Fill in the form and we will get back to you right away."}
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="apply-form"
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Checkbox */}
              <label style={{
                display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer",
                padding: "16px 18px", borderRadius: 12,
                background: wantsToJoin ? "rgba(99,102,241,0.10)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${wantsToJoin ? "rgba(129,140,248,0.45)" : "rgba(168,85,247,0.18)"}`,
                transition: "background 0.2s, border-color 0.2s",
                marginBottom: 8,
              }}>
                <div
                  onClick={() => setWantsToJoin(v => !v)}
                  style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    background: wantsToJoin ? "linear-gradient(135deg,#6366F1,#A855F7)" : "rgba(255,255,255,0.06)",
                    border: `1.5px solid ${wantsToJoin ? "transparent" : "rgba(168,85,247,0.35)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.18s",
                    cursor: "pointer",
                  }}
                >
                  {wantsToJoin && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1 }}>✓</span>}
                </div>
                <span
                  onClick={() => setWantsToJoin(v => !v)}
                  style={{ color: "rgba(245,245,247,0.85)", fontSize: "0.92rem", lineHeight: 1.5, fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  {isDa ? "Vi ønsker at deltage i AI-LABs" : "We would like to join AI-LABs"}
                </span>
              </label>

              {/* Company */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "rgba(245,245,247,0.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  {isDa ? "Virksomhed" : "Company"} *
                </label>
                <input
                  name="company" value={form.company} onChange={set} required
                  placeholder={isDa ? "Virksomhedens navn" : "Company name"}
                  style={inputStyle} onFocus={focusInput} onBlur={blurInput}
                />
              </div>

              {/* Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "rgba(245,245,247,0.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  {isDa ? "Navn" : "Name"} *
                </label>
                <input
                  name="name" value={form.name} onChange={set} required
                  placeholder={isDa ? "Dit fulde navn" : "Your full name"}
                  style={inputStyle} onFocus={focusInput} onBlur={blurInput}
                />
              </div>

              {/* Title */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "rgba(245,245,247,0.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  {isDa ? "Titel" : "Title"}
                </label>
                <input
                  name="title" value={form.title} onChange={set}
                  placeholder={isDa ? "Din titel / rolle" : "Your title / role"}
                  style={inputStyle} onFocus={focusInput} onBlur={blurInput}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "rgba(245,245,247,0.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  Email *
                </label>
                <input
                  name="email" type="email" value={form.email} onChange={set} required
                  placeholder="you@company.com"
                  style={inputStyle} onFocus={focusInput} onBlur={blurInput}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "rgba(245,245,247,0.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  {isDa ? "Telefon" : "Phone"}
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    style={{ ...inputStyle, width: "auto", minWidth: 110, flexShrink: 0, cursor: "pointer" }}
                    onFocus={focusInput} onBlur={blurInput}
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={c.code + c.label} value={c.code} style={{ background: "#0F0D28", color: "#F1F5F9" }}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <input
                    name="phone" type="tel" value={form.phone} onChange={handlePhoneChange}
                    placeholder="12 34 56 78"
                    style={{ ...inputStyle, flex: 1 }}
                    onFocus={focusInput} onBlur={blurInput}
                  />
                </div>
              </div>

              {error && (
                <p style={{ color: "#F87171", fontSize: "0.88rem", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 8,
                  padding: "16px 40px", borderRadius: 999,
                  background: loading ? "rgba(99,102,241,0.15)" : "linear-gradient(135deg, rgba(99,102,241,0.80), rgba(168,85,247,0.80))",
                  border: "1px solid rgba(129,140,248,0.45)",
                  color: "#fff", fontSize: 15, fontWeight: 600,
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "opacity 0.2s, transform 0.2s",
                  letterSpacing: "0.01em",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading
                  ? (isDa ? "Sender..." : "Sending...")
                  : (isDa ? "Send ansøgning →" : "Submit application →")}
              </button>
            </motion.form>
          </div>
        )}
      </div>

      <style>{`
        .apply-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(48px, 6vw, 96px);
          align-items: center;
        }
        .apply-header { padding-top: 8px; }
        @media (min-width: 1701px) {
          .apply-subtext { max-width: none !important; white-space: nowrap; }
        }
        @media (max-width: 900px) {
          .apply-layout {
            grid-template-columns: 1fr;
            gap: clamp(40px, 6vw, 56px);
            max-width: 560px;
            margin: 0 auto;
          }
        }
      `}</style>
    </main>
  );
}
