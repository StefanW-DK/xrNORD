import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import CalendarButton from "@/components/internal/CalendarButton";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function InternalPage() {
  return (
    <main style={{ margin: 0, padding: 0, background: "#0a0f1a" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap');

        * { box-sizing: border-box; }

        .skt-hero {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          overflow: hidden;
        }

        .skt-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/assets/internal/tri.jpg');
          background-size: cover;
          background-position: center 30%;
          z-index: 0;
        }

        .skt-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg,
              rgba(8,12,24,0.30) 0%,
              rgba(8,12,24,0.15) 40%,
              rgba(8,12,24,0.60) 80%,
              rgba(8,12,24,0.85) 100%
            ),
            radial-gradient(ellipse 80% 80% at 20% 50%, rgba(8,12,24,0.35) 0%, transparent 70%);
          z-index: 1;
        }

        .skt-hero-content {
          position: relative;
          z-index: 2;
          text-align: left;
          padding: clamp(100px, 11vw, 140px) 12% 0 12%;
        }

        .skt-hero-h1 {
          font-family: var(--font-geist), 'Geist', system-ui, sans-serif;
          font-size: clamp(3rem, 6.5vw, 8.5rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          line-height: 0.95;
          color: #ffffff;
          margin: 0 0 12px;
          text-shadow: 0 4px 60px rgba(0,0,0,0.35);
        }

        .skt-hero-byline {
          font-family: var(--font-geist), 'Geist', system-ui, sans-serif;
          font-style: normal;
          font-size: clamp(1rem, 1.5vw, 1.6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(120deg, #00D4FF 0%, #7B5FFF 100%);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          margin: 4px 0 0 0.55em;
          text-shadow: none;
        }

        .skt-hero-body {
          font-family: var(--font-geist), 'Geist', system-ui, sans-serif;
          font-size: clamp(0.88rem, 1vw, 1rem);
          font-weight: 500;
          line-height: 1.65;
          color: rgba(255,255,255,0.80);
          margin: 24px 0 0 0;
          max-width: clamp(300px, 40vw, 600px);
          letter-spacing: 0.01em;
        }

        .skt-hero-calendar {
          margin-top: clamp(28px, 3vw, 40px);
        }

        .skt-hero-body p {
          margin: 0 0 0.8em;
        }

        .skt-hero-body p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 767px) {
          .skt-hero-body {
            max-width: 82%;
            font-size: clamp(0.9rem, 3.8vw, 1rem);
          }
        }

        /* Monitor (≥1600px) — restore original large-screen scale */
        @media (min-width: 1600px) {
          .skt-hero            { height: auto; min-height: 100vh; }
          .skt-hero-content    { padding: clamp(120px, 12vw, 160px) 12% 0 12%; }
          .skt-hero-h1         { font-size: clamp(3.4rem, 9.35vw, 11rem); margin: 0 0 14px; }
          .skt-hero-byline     { font-size: clamp(1.15rem, 2.3vw, 2.19rem); }
          .skt-hero-body       { font-size: clamp(1rem, 1.25vw, 1.2rem); line-height: 1.75; margin-top: 32px; max-width: clamp(360px, 48vw, 700px); }
          .skt-hero-body p     { margin: 0 0 0.9em; }
          .skt-hero-lead       { font-size: clamp(1.2rem, 1.6vw, 1.55rem) !important; margin-bottom: 0.9em !important; }
          .skt-hero-calendar   { margin-top: clamp(32px, 3.5vw, 48px); }
        }

        /* Scroll indicator */
        @keyframes skt-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }

        .skt-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          animation: skt-bounce 1.8s ease-in-out infinite;
          z-index: 3;
        }

        .skt-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.35), transparent);
        }

        .skt-scroll-chevron {
          color: rgba(255,255,255,0.30);
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .skt-hero-content { padding-left: 10%; }
          .skt-hero-h1 { letter-spacing: -0.04em; }
        }

        /* Mobile large */
        @media (max-width: 767px) {
          .skt-hero        { min-height: 130vh; }
          .skt-hero-bg    { background-position: 60% 30%; }
          .skt-hero-content { padding: 110px 6% clamp(100px, 14vw, 140px); }
          .skt-hero-h1    { line-height: 1.0; }
          .skt-hero-body  { margin-top: 32px; max-width: 100%; }
          .skt-hero-calendar { display: flex; justify-content: center; margin-top: 40px; }
        }

        /* Mobile small */
        @media (max-width: 480px) {
          .skt-hero        { min-height: 140vh; }
          .skt-hero-content { padding: 100px 5% clamp(100px, 14vw, 130px); }
          .skt-hero-h1    { letter-spacing: -0.03em; }
          .skt-hero-calendar { margin-top: 44px; }
        }

        /* ── Split section ── */
        .skt-split { display: flex; min-height: 100vh; }
        .skt-split-text {
          width: 66.67%;
          background: #0a0f1a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(80px,8vw,120px) clamp(60px,6vw,100px);
        }
        .skt-split-inner { max-width: 80%; }
        .skt-split-image {
          width: 33.33%;
          position: relative;
          background-image: url('/assets/internal/huset.png');
          background-size: cover;
          background-position: center;
        }
        .skt-split-fade-top {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, #0a0f1a 0%, rgba(10,15,26,0.2) 18%, transparent 35%);
          pointer-events: none;
        }
        .skt-split-fade-left {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(10,15,26,0.7) 0%, transparent 25%);
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .skt-split-inner { max-width: 85%; }
        }

        @media (max-width: 767px) {
          .skt-split { flex-direction: column; min-height: auto; }
          .skt-split-text { width: 100%; padding: 56px 7% 48px; }
          .skt-split-inner { max-width: 100%; }
          .skt-split-image { width: 100%; height: 260px; flex-shrink: 0; }
          .skt-split-fade-top { background: linear-gradient(180deg, transparent 0%, rgba(10,15,26,0.5) 80%, #0a0f1a 100%); }
          .skt-split-fade-left { display: none; }
        }

        /* ── Racer grid ── */
        .racers-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: clamp(16px, 2vw, 32px);
        }

        .racer-card {
          flex: 0 0 calc(33.33% - clamp(16px, 2vw, 32px));
          min-width: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          padding: 32px 20px 28px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          backdrop-filter: blur(10px);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          cursor: default;
        }

        .racer-card:hover {
          transform: translateY(-8px);
          border-color: rgba(123,95,255,0.35);
          box-shadow: 0 28px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(123,95,255,0.25), 0 0 40px rgba(0,212,255,0.08);
        }

        .racer-photo-ring {
          width: clamp(90px, 11vw, 148px);
          height: clamp(90px, 11vw, 148px);
          border-radius: 50%;
          background: linear-gradient(135deg, #00D4FF 0%, #7B5FFF 50%, #FF2D78 100%);
          padding: 3px;
          flex-shrink: 0;
        }

        .racer-photo-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: top center;
          display: block;
          background: #0d1525;
        }

        .racer-name {
          font-family: var(--font-geist), 'Geist', system-ui, sans-serif;
          font-size: clamp(0.78rem, 0.95vw, 0.92rem);
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          text-align: center;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .racer-card {
            flex: 0 0 calc(33.33% - 20px);
            max-width: none;
          }
        }

        @media (max-width: 767px) {
          .racer-card {
            flex: 0 0 calc(50% - 12px);
            min-width: 130px;
            max-width: none;
          }
        }

        @media (max-width: 480px) {
          .racer-card {
            flex: 0 0 calc(50% - 10px);
          }
        }

        /* ── Discipline cards ── */
        .disciplines-row {
          display: flex;
          gap: clamp(12px, 1.8vw, 24px);
          justify-content: center;
        }

        .discipline-card {
          flex: 1;
          position: relative;
          min-width: 180px;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 3/4;
          cursor: default;
          transition: transform 0.45s cubic-bezier(0.25,0.1,0.25,1);
        }

        .discipline-card:hover {
          transform: scale(1.025);
        }

        .discipline-card-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .discipline-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(8,12,24,0.10) 0%,
            rgba(8,12,24,0.25) 40%,
            rgba(8,12,24,0.75) 68%,
            rgba(8,12,24,0.96) 100%
          );
        }

        .discipline-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: clamp(20px, 2.5vw, 36px);
          text-align: left;
        }

        .discipline-label {
          font-family: var(--font-geist), 'Geist', system-ui, sans-serif;
          font-size: clamp(0.7rem, 0.85vw, 0.82rem);
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.50);
          margin: 0 0 6px;
        }

        .discipline-distance {
          font-family: var(--font-geist), 'Geist', system-ui, sans-serif;
          font-size: clamp(3.2rem, 6.5vw, 7.5rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          line-height: 1;
          margin: 0;
          background: linear-gradient(120deg, #00D4FF 0%, #7B5FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        .discipline-unit {
          font-size: 38%;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-left: 2px;
          vertical-align: baseline;
        }

        @media (max-width: 767px) {
          .disciplines-row {
            flex-direction: column;
            align-items: stretch;
          }
          .discipline-card {
            aspect-ratio: 16/9;
          }
        }
      `}</style>

      <section className="skt-hero">
        <div className="skt-hero-bg" />
        <div className="skt-hero-overlay" />
        <Navbar forceTransparent />
        <div className="skt-hero-content">
          <h1 className="skt-hero-h1">Skæring Tri<br />&amp; Hygge</h1>
          <p className="skt-hero-byline">By Werge</p>
          <div className="skt-hero-body">
            <p className="skt-hero-lead" style={{ fontSize: "clamp(1rem, 1.25vw, 1.25rem)", fontWeight: 600, color: "rgba(255,255,255,0.95)", marginBottom: "0.9em", hyphens: "manual" }}>Den 15 August 2026, bliver rammerne for en fantas&shy;tisk dag for dig og din familie sat.</p>
            <p>Sammen med en flok gode drenge får du mulighed for at prøve kræfter med triatlonens verden. Imens hygger vores familier sig med hinanden, som vi slutter os til bagefter til en mindeværdig dag. Der er også Kaløvig Havnefest samme dag, så måske tager vi et smut derover – ellers bliver vi og hygger og fester videre i haven.</p>
          </div>
          <div className="skt-hero-calendar">
            <CalendarButton />
          </div>
        </div>
        {/* Lower-right deadline */}
        <div style={{
          position: "absolute",
          bottom: "clamp(48px, 6vw, 80px)",
          right: "3%",
          zIndex: 3,
          textAlign: "right",
        }}>
          <p style={{
            fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
            fontSize: "clamp(0.7rem, 0.85vw, 0.82rem)",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.40)",
            margin: "0 0 4px",
          }}>Svar Udbedes</p>
          <p style={{
            fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
            fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.85)",
            margin: 0,
          }}>1 Juli 2026</p>
        </div>

        {/* Scroll indicator */}
        <div className="skt-scroll-indicator">
          <div className="skt-scroll-line" />
          <svg className="skt-scroll-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ─── Section 1: Split ─── */}
      <section className="skt-split">

        {/* Left — text */}
        <div className="skt-split-text">
          <div className="skt-split-inner">
            <h2 style={{
              fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
              fontSize: "clamp(2rem, 3.6vw, 4.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: "0 0 32px",
              textAlign: "left",
            }}>
              En hyggelig dag for hele familien med mulighed for havnefest
            </h2>
            <p style={{
              fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
              fontSize: "clamp(1rem, 1.35vw, 1.3rem)",
              fontWeight: 400,
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.78)",
              margin: "0 0 2em",
            }}>Vi håber, at I kommer med jeres dejlige familier, så alle kan hygge sig i haven og ved stranden. Der er også havefest på Kaløvig Havn, som vi kan overveje at tage til (kræver adgangsbillet).</p>

            <h3 style={{
              fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
              fontSize: "clamp(1rem, 1.4vw, 1.35rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#3B82F6",
              margin: "0 0 0.75em",
            }}>Det Praktiske</h3>

            <div style={{
              fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
              fontSize: "clamp(1rem, 1.35vw, 1.3rem)",
              fontWeight: 400,
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.78)",
            }}>
              <p style={{ margin: "0 0 0.8em" }}>Vi sørger for rammerne, grillen og slik til børnene.</p>
              <p style={{ margin: 0 }}>Hver familie medbringer derudover hvad der skal drikkes og spises.</p>
            </div>
          </div>
        </div>

        {/* Right — image */}
        <div className="skt-split-image">
          <div className="skt-split-fade-top" />
          <div className="skt-split-fade-left" />
        </div>

      </section>

      {/* ─── Section 2: Inviterede Tri Racere ─── */}
      <section style={{
        background: "#0a0f1a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(80px, 10vw, 160px) clamp(4%, 6%, 8%)",
      }}>
        <h2 style={{
          fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
          fontSize: "clamp(2.8rem, 6vw, 7rem)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1.0,
          margin: "0 0 64px",
          background: "linear-gradient(120deg, #00D4FF 0%, #7B5FFF 45%, #FF2D78 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          display: "inline-block",
        }}>
          Inviterede Tri Racere
        </h2>

        <div className="racers-grid">
          {[
            { name: "Jeppe Thvilum",                    file: "Jeppe Thvilum.png" },
            { name: "Steffen Borges",                   file: "Steffen Borges.png" },
            { name: "Jesper Bidstrup Andersen",        file: "Jesper Bidstrup Andersen.png" },
            { name: "Martin Edvardsen",                 file: "Martin Edvardsen.png" },
            { name: "Kristoffer Eilert Bæk Andersen",  file: "Kristoffer Eilert Bæk Andersen.png" },
            { name: "Ole Stenderup",                    file: "Ole Stenderup.png" },
            { name: "Nicolai Kolding",                  file: "Nicolai Kolding.png" },
            { name: "Kasper Meldgaard",                 file: "Kasper Meldgaard.jpeg" },
            { name: "Andreas Lock Uldall",              file: "Andreas Lock Uldall.png" },
            { name: "Kenneth Thuesen Arboe",            file: "Kenneth Thuesen Arboe.png" },
            { name: "Troels Strickersson",              file: "Troels Strickersson.png" },
            { name: "Thomas Guldsø Alsted",             file: "Thomas Guldsø Alsted.png" },
            { name: "Kaare Bro Wellnitz",               file: "Kaare Bro Wellnitz.png" },
            { name: "Christopher Vik",                  file: "Christopher Vik.png" },
          ].map((p) => (
            <div key={p.name} className="racer-card">
              <div className="racer-photo-ring">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/internal/deltagere/${encodeURIComponent(p.file)}`}
                  alt={p.name}
                  className="racer-photo-img"
                />
              </div>
              <p className="racer-name">{p.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section 3: Løbet & Distancerne ─── */}
      <section style={{
        background: "#0a0f1a",
        padding: "clamp(80px, 10vw, 140px) 12%",
        textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
          fontSize: "clamp(2.4rem, 5vw, 6rem)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1.0,
          margin: "0 0 28px",
          background: "linear-gradient(120deg, #00D4FF 0%, #7B5FFF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          display: "inline-block",
        }}>
          Løbet &amp; Distancerne
        </h2>

        <p style={{
          fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
          fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
          fontWeight: 400,
          lineHeight: 1.85,
          color: "rgba(255,255,255,0.60)",
          maxWidth: "780px",
          margin: "0 auto 72px",
          textAlign: "left",
        }}>
          Distancerne er sammensat, så vi alle bliver lidt udfordret, men stadig har overskud til at hygge, grille og nyde en øl bagefter. Løb og svømning foregår i Skæring, mens cyklingen tager os en tur rundt på Djursland.
        </p>

        <div className="disciplines-row">
          {[
            { label: "Svømning", distance: "800", unit: "m",  img: "/assets/internal/swim.jpg" },
            { label: "Cykling",  distance: "30",  unit: "km", img: "/assets/internal/Bike.png" },
            { label: "Løb",      distance: "5",   unit: "km", img: "/assets/internal/Run.png" },
          ].map((d) => (
            <div key={d.label} className="discipline-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.img} alt={d.label} className="discipline-card-bg" />
              <div className="discipline-card-overlay" />
              <div className="discipline-card-content">
                <p className="discipline-label">{d.label}</p>
                <p className="discipline-distance">
                  {d.distance}<span className="discipline-unit">{d.unit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section 4: Closing statement ─── */}
      <section style={{
        background: "#0a0f1a",
        padding: "clamp(80px, 12vw, 160px) 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <h2 style={{
          fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
          fontSize: "clamp(2.2rem, 5.5vw, 7rem)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1.1,
          textAlign: "left",
          maxWidth: "min(90vw, 1380px)",
          margin: 0,
          color: "#ffffff",
          display: "block",
        }}>
          Om du svømmer i{" "}
          <span style={{ color: "#00D4FF" }}>G-streng</span>
          {", "}cykler på en{" "}
          <span style={{ color: "#5B8FFF" }}>havelåge</span>
          {" "}eller løber i{" "}
          <span style={{ color: "#7B5FFF" }}>gummistøvler</span>
          {", "}så hjælper vi hinanden igennem og får en masse{" "}
          <span style={{ color: "#A050E0" }}>gode</span>
          {" "}
          <span style={{ color: "#C44FD0" }}>minder</span>
          {" "}
          <span style={{ color: "#FF2D78" }}>sammen</span>
          {"."}
        </h2>
      </section>

    </main>
  );
}
