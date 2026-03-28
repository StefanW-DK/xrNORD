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
interface FAQLink { label: string; href: string; isButton?: boolean; }
interface FAQEntry { q: string; a: string; links?: FAQLink[]; }

const FAQ_EN: FAQEntry[] = [
  {
    q: "Why do companies need an AI strategy?",
    a: "Many organizations begin their AI journey through isolated pilots, tools or experiments. While these initiatives can be valuable learning experiences, they rarely scale or create lasting impact without a clear strategic direction.\n\nAt the same time, artificial intelligence is rapidly reshaping industries, business models and competitive dynamics. Companies are no longer only competing with other organizations. Increasingly, they are competing with AI-enabled capabilities that can perform tasks, analyze information and support decisions at unprecedented speed.\n\nFor companies in the Nordic region, this creates both a challenge and an opportunity. Organizations with strong expertise, trusted brands and deep domain knowledge can become significantly stronger when AI is integrated in the right way.\n\nAn AI strategy helps companies move beyond experimentation by:\n\n• Identifying where AI can create the strongest business value\n• Prioritizing investments and initiatives\n• Aligning leadership, technology and operations\n• Turning AI from isolated experiments into a coordinated transformation\n\nThe goal is not simply to adopt new technology. It is to define how the organization will remain competitive, strengthen its capabilities and create new forms of value in a world where AI becomes part of everyday business.",
    links: [{ label: "From Pilot to Production: Scaling AI in the Real World →", href: "/why-ai/articles/from-pilot-to-production" }],
  },
  {
    q: "What is an AI strategy for your business?",
    a: "An AI strategy defines how a company uses artificial intelligence to remain relevant and competitive in a rapidly changing market. It identifies where AI can create real value today, what capabilities must be built, and how AI initiatives should be prioritized across the organization.\n\nBut a strong AI strategy is not only about optimizing existing processes. It is also about defining how the company will compete in the future.\n\nFor most organizations this means working across three dimensions:\n\n1. Strengthening competitiveness\nUsing AI to stay relevant in both local and global markets as technology rapidly reshapes industries.\n\n2. Optimizing current operations\nApplying AI to improve processes, productivity, decision-making and operational efficiency.\n\n3. Creating tomorrow's services and competitive advantages\nIdentifying new services, products and value propositions that emerge when human expertise and AI capabilities work together.\n\nWhen done well, an AI strategy does not exist beside the business strategy. It becomes part of a unified strategy, where technology, data, operations and business development evolve together.",
  },
  {
    q: "Who should be involved in developing an AI strategy?",
    a: "Developing a meaningful AI strategy is not a technology exercise. It is a business transformation effort that requires participation from leadership, operational experts and technology specialists.\n\nIn many Nordic companies, the greatest strength lies in the combination of deep domain expertise, strong organizational cultures and highly skilled employees. An effective AI strategy therefore builds on this foundation rather than replacing it.\n\nTypical participants in the process include:\n\n• Executive leadership or board representatives\n• Business unit leaders responsible for products or services\n• IT and digitalization leaders\n• Data or analytics specialists\n• Key operational experts who understand day-to-day processes\n\nThe most successful AI strategies emerge when business insight, operational understanding and technological expertise meet at the same table. This is where companies begin to see how human expertise and AI capabilities can combine to create new forms of value and competitive advantage.",
  },
  {
    q: "What does an AI strategy include?",
    a: "A comprehensive AI strategy translates the potential of artificial intelligence into a clear direction for the business. It helps leadership understand where AI can strengthen the organization today, and where it can enable entirely new forms of value creation in the future.\n\nA strong AI strategy typically includes:\n\n• Identification of high-impact AI opportunities across products, services and internal processes\n• Evaluation of feasibility and business impact, ensuring that initiatives are both realistic and valuable\n• Prioritization of initiatives, often through a structured AI roadmap\n• Assessment of data, technology and infrastructure requirements\n• Organizational capabilities, including skills, governance and ways of working with AI\n• Alignment with the company's overall business and digital strategy\n\nBut the most important outcome is not a document.\n\nThe real result of a strong AI strategy is a clear and executable roadmap that helps the organization move from experimentation to real AI adoption, while also identifying how AI can contribute to new services, stronger differentiation and long-term competitiveness.",
  },
  {
    q: "How does an AI strategy affect our existing digital or IT strategy?",
    a: "An AI strategy rarely exists alongside a company's digital or IT strategy. In practice, it often reshapes it.\n\nTraditional digitalization strategies have typically focused on implementing systems, improving workflows and connecting business processes through software platforms. AI introduces a new layer: the ability for systems to analyze information, support decisions and automate complex tasks.\n\nThis means that many organizations must rethink parts of their existing digital and IT roadmap.\n\nAI initiatives often require:\n\n• Stronger data foundations and improved data accessibility\n• New AI capabilities integrated into existing systems and platforms\n• Updated governance around data, models and responsible AI\n• Closer collaboration between business leadership, digital teams and IT\n\nFor this reason, developing an AI strategy often leads to a broader shift. Instead of separate business, digital and technology strategies, companies begin moving toward a more integrated and unified strategy, where technology, data and business development evolve together.",
    links: [{ label: "The Role of Data: Fueling Intelligent Systems →", href: "/why-ai/articles/the-role-of-data" }],
  },
  {
    q: "What is the difference between an AI roadmap and an AI strategy?",
    a: "An AI strategy defines the overall direction for how artificial intelligence should strengthen the company's competitiveness and future development. It clarifies where AI can create the greatest value, which capabilities must be developed, and how AI initiatives should support the broader business strategy.\n\nAn AI roadmap, on the other hand, translates this strategic direction into concrete actions. It outlines the initiatives to be implemented, their priorities, timelines and dependencies.\n\nIn simple terms:\n\n• The AI strategy defines why AI matters and where it should create value.\n• The AI roadmap defines what initiatives to implement, in which order, and how the organization moves forward.\n\nWithout a clear strategy, roadmaps often become a list of disconnected technology projects. When strategy comes first, the roadmap becomes a practical guide for how the organization moves toward a more intelligent and competitive business model.\n\nIn many companies, the AI strategy ultimately becomes part of a broader unified strategy, where business development, technology and operations evolve together.",
  },
  {
    q: "What does it take to successfully implement an AI strategy?",
    a: "Implementing an AI strategy is not a single project. It is an organizational transformation that unfolds over time.\n\nWhile technology plays an important role, the success of AI adoption depends just as much on leadership, organization and the ability to continuously identify new opportunities.\n\nOrganizations that succeed with AI typically focus on several dimensions:\n\n• Clear leadership direction that positions AI as a strategic capability rather than a series of isolated experiments\n• Strong collaboration between business, operations and technology, ensuring that AI initiatives are rooted in real processes and value creation\n• Accessible and reliable data foundations, enabling AI systems to generate meaningful insights and capabilities\n• Organizational capabilities, including skills, governance and responsible use of AI\n• A realistic investment and prioritization model, where initiatives are continuously evaluated and refined\n\nEqually important is establishing a working rhythm around AI. Companies that succeed treat AI development as an ongoing strategic capability: continuously exploring opportunities, learning from implementation, and evolving their services and operations.",
  },
  {
    q: "What does AI strategy consulting cost?",
    a: "The cost of developing an AI strategy varies depending on the size of the organization, the complexity of its operations, and the depth of analysis required.\n\nIn the Nordic region, experienced AI professionals are still relatively scarce, and the most valuable profiles are those who combine deep technological understanding with strong business and process insight. Developing a meaningful AI strategy is therefore not only about technology. It requires people who can connect AI capabilities with real business processes, operational improvements, and the creation of new services and competitive advantages.\n\nMany traditional consulting setups rely heavily on local senior specialists, which can make AI strategy engagements relatively expensive.\n\nxrNORD uses a different model. By combining international AI development expertise with local business and process specialists, we are able to assemble highly experienced teams while operating with a leaner structure. This often allows us to deliver strategy and solution development at significantly lower cost than traditional consulting firms, while remaining closely integrated with our clients locally.\n\nFor many companies, the first step is not a full strategy project but a focused AI workshop, where leadership teams explore opportunities and clarify whether developing a full AI strategy and roadmap is the right next step.",
    links: [
      { label: "Learn More About Our Approach", href: "/workshop" },
      { label: "Learn About Our 1-Day Tailored AI Workshop", href: "/workshop", isButton: true },
    ],
  },
];

const FAQ_DA: FAQEntry[] = [
  {
    q: "Hvorfor har virksomheder brug for en AI-strategi?",
    a: "Mange organisationer starter deres AI-rejse med isolerede pilot-projekter eller eksperimenter. Mens disse kan v\u00e6re v\u00e6rdifulde, skalerer de sj\u00e6ldent eller skaber varig effekt uden en klar strategisk retning.\n\nEn AI-strategi hj\u00e6lper virksomheder med at g\u00e5 videre fra eksperimenter ved at identificere hvor AI kan skabe st\u00e6rkest forretningsv\u00e6rdi, prioritere investeringer og initiativer, og forvandle AI fra isolerede fors\u00f8g til en koordineret transformation.",
    links: [{ label: "Fra pilot til produktion: Skalering af AI i den virkelige verden \u2192", href: "/why-ai/articles/from-pilot-to-production" }],
  },
  {
    q: "Hvad er en AI-strategi for jeres forretning?",
    a: "En AI-strategi definerer, hvordan en virksomhed bruger kunstig intelligens til at forblive relevant og konkurrencedygtig. Den identificerer, hvor AI kan skabe reel v\u00e6rdi i dag, hvilke kapabiliteter der skal opbygges, og hvordan AI-initiativer b\u00f8r prioriteres p\u00e5 tv\u00e6rs af organisationen.\n\nN\u00e5r det g\u00f8res rigtigt, eksisterer en AI-strategi ikke ved siden af forretningsstrategien. Den bliver en del af en samlet strategi, hvor teknologi, data, drift og forretningsudvikling udvikler sig sammen.",
  },
  {
    q: "Hvem b\u00f8r v\u00e6re involveret i at udvikle en AI-strategi?",
    a: "At udvikle en meningsfuld AI-strategi er ikke en teknologiøvelse. Det er en forretningstransformation, der kr\u00e6ver deltagelse fra ledelse, driftseksperter og teknologispecialister.\n\nDe mest succesfulde AI-strategier opst\u00e5r, n\u00e5r forretningsforst\u00e5else, operationel indsigt og teknologisk ekspertise m\u00f8des ved det samme bord.",
  },
  {
    q: "Hvad indeholder en AI-strategi?",
    a: "En omfattende AI-strategi overs\u00e6tter potentialet i kunstig intelligens til en klar retning for forretningen.\n\nEn st\u00e6rk AI-strategi inkluderer typisk: identifikation af AI-muligheder med h\u00f8j effekt, vurdering af feasibility og forretningseffekt, prioritering af initiativer via et struktureret AI roadmap, samt tilpasning til virksomhedens overordnede forretningsstrategi.",
  },
  {
    q: "Hvordan p\u00e5virker en AI-strategi vores eksisterende digitale strategi eller IT-strategi?",
    a: "En AI-strategi eksisterer sj\u00e6ldent ved siden af en virksomheds digitale strategi eller IT-strategi. I praksis omformer den den ofte.\n\nFor mange organisationer medf\u00f8rer udviklingen af en AI-strategi et bredere skift. I stedet for separate forretnings-, digitale og teknologistrategier beg\u00e6nder virksomheder at bevæge sig mod en mere integreret og samlet strategi.",
    links: [{ label: "Dataens rolle: Br\u00e6ndstof til intelligente systemer \u2192", href: "/why-ai/articles/the-role-of-data" }],
  },
  {
    q: "Hvad er forskellen p\u00e5 et AI roadmap og en AI-strategi?",
    a: "En AI-strategi definerer den overordnede retning for, hvordan kunstig intelligens skal styrke virksomhedens konkurrenceevne og fremtidige udvikling.\n\nEt AI roadmap overs\u00e6tter denne strategiske retning til konkrete handlinger. Det skitserer de initiativer, der skal implementeres, deres prioriteter, tidsplaner og afh\u00e6ngigheder.\n\nKort sagt: Strategien definerer hvorfor og hvor AI skaber v\u00e6rdi. Roadmap'et definerer hvad der skal implementeres og i hvilken r\u00e6kkef\u00f8lge.",
  },
  {
    q: "Hvad kr\u00e6ver det at implementere en AI-strategi succesfuldt?",
    a: "Implementering af en AI-strategi er ikke et enkelt projekt. Det er en organisatorisk transformation, der udfolder sig over tid.\n\nOrganisationer, der lykkes med AI, fokuserer typisk p\u00e5: klar ledelsesretning, st\u00e6rkt samarbejde mellem forretning og teknologi, p\u00e5lidelige datafundamenter, og en realistisk investerings- og prioriteringsmodel.",
  },
  {
    q: "Hvad koster AI-strategirådgivning?",
    a: "Omkostningerne ved at udvikle en AI-strategi varierer afh\u00e6ngigt af organisationens st\u00f8rrelse, driftens kompleksitet og analysens dybde.\n\nxrNORD bruger en anden model. Ved at kombinere international AI-udviklingskompetence med lokale forretnings- og processpecialister kan vi sammens\u00e6tte h\u00f8jt erfarne teams, mens vi opererer med en slankere struktur.\n\nFor mange virksomheder er det f\u00f8rste skridt ikke et fuldt strategiprojekt, men en fokuseret AI-workshop.",
    links: [
      { label: "L\u00e6r mere om vores tilgang", href: "/workshop" },
      { label: "L\u00e6r om vores 1-dags AI-workshop", href: "/workshop", isButton: true },
    ],
  },
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
function FAQItem({ q, a, links, locale, index }: { q: string; a: string; links?: FAQLink[]; locale: string; index: number }) {
  const [open, setOpen] = useState(false);
  const paragraphs = a.split("\n\n");
  return (
    <motion.div
      variants={fadeUp}
      style={{ borderBottom: "1px solid #E5E7EB" }}
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
            border: "1px solid rgba(168,85,247,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s ease, background 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            background: open ? "rgba(168,85,247,0.08)" : "transparent",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round">
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
          {links && links.length > 0 && (
            <div style={{ marginTop: "24px", display: "flex", flexDirection: "column" as const, gap: "12px", alignItems: "flex-start" }}>
              {links.map((link, i) =>
                link.isButton ? (
                  <Link
                    key={i}
                    href={`/${locale}${link.href}`}
                    style={{
                      display: "inline-block",
                      padding: "10px 22px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #A855F7, #6366F1)",
                      color: "#fff",
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={i}
                    href={`/${locale}${link.href}`}
                    style={{
                      display: "inline-block",
                      padding: "10px 22px",
                      borderRadius: "8px",
                      background: "transparent",
                      border: "1px solid rgba(168,85,247,0.4)",
                      color: "#7C3AED",
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
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
        suppressHydrationWarning
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "700px",
          maxHeight: "1000px",
          overflow: "hidden",
        }}
      >
        {/* Soft top-edge transition */}
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

        {/* Background — gradient + ghosted roadmap pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, #020510 0%, #0A0F1E 40%, #0F1629 100%)",
          }}
        />

        {/* Subtle roadmap pattern */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.06 }}>
          <div style={{ position: "absolute", left: "72%", top: "10%", width: "1px", height: "80%", background: "linear-gradient(to bottom, transparent, #A855F7, transparent)" }} />
          <div style={{ position: "absolute", left: "20%", top: "55%", width: "60%", height: "1px", background: "linear-gradient(to right, transparent, #818CF8, transparent)" }} />
          {[
            { x: "72%", y: "25%" }, { x: "72%", y: "55%" }, { x: "72%", y: "78%" },
            { x: "35%", y: "55%" }, { x: "50%", y: "55%" },
            { x: "20%", y: "30%" }, { x: "85%", y: "42%" },
          ].map((n, i) => (
            <div key={i} style={{ position: "absolute", left: n.x, top: n.y, width: "8px", height: "8px", borderRadius: "50%", background: i % 2 === 0 ? "#A855F7" : "#818CF8", transform: "translate(-50%, -50%)" }} />
          ))}
          <div style={{ position: "absolute", left: "72%", top: "55%", transform: "translate(-50%, -50%)" }}>
            {[80, 120, 160].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: `${s}px`, height: `${s}px`, borderRadius: "50%", border: "1px solid", borderColor: i === 0 ? "#A855F7" : "#818CF8", left: `${-s / 2}px`, top: `${-s / 2}px` }} />
            ))}
          </div>
        </div>

        {/* Top-right glow */}
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "50%", height: "60%", background: "radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Bottom fade */}
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

        {/* Thin horizontal rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(1200px, calc(100% - 160px))",
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.15) 30%, rgba(129,140,248,0.10) 70%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <motion.div
          initial="hidden"
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
              color: "#C084FC",
              marginBottom: "28px",
            }}
          >
            AI Roadmap
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 5.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.0,
              color: "#F0EEF5",
              marginBottom: "56px",
            }}
          >
            {locale === "da" ? (
              <>
                Udfordr & omform
                <br />
                <span style={{ backgroundImage: "linear-gradient(135deg, #E879F9 0%, #A855F7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Jeres Forretning
                </span>
                <br />
                {"til "}
                <span style={{ backgroundImage: "linear-gradient(135deg, #A855F7 0%, #818CF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  at Vinde Fremtiden.
                </span>
              </>
            ) : (
              <>
                Challenge & Reshape
                <br />
                <span style={{ backgroundImage: "linear-gradient(135deg, #E879F9 0%, #A855F7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Your Business
                </span>
                <br />
                {"to "}
                <span style={{ backgroundImage: "linear-gradient(135deg, #A855F7 0%, #818CF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Win the Future.
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.35rem",
              lineHeight: 1.65,
              color: "rgba(220,216,232,0.9)",
              marginBottom: "8px",
            }}
          >
            {locale === "da"
              ? "Vi forstår jeres forretning og anvender en dyb forståelse af AI til at gentænke og styrke den."
              : "We understand your business and apply a deep understanding of AI to rethink and strengthen it."}
          </motion.p>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.35rem",
              lineHeight: 1.65,
              color: "rgba(220,216,232,0.9)",
              marginBottom: "64px",
            }}
          >
            {locale === "da"
              ? "Så I forlader med en klar, handlingsrettet retning fremad."
              : "So you leave with a clear, actionable direction forward."}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/workshop`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 38px",
                borderRadius: "60px",
                background: "linear-gradient(135deg, rgba(168,85,247,0.8) 0%, rgba(129,140,248,0.85) 100%)",
                color: "rgba(255,255,255,0.95)",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                border: "1px solid rgba(168,85,247,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(168,85,247,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {locale === "da" ? "Start med en workshop" : "Start With a Workshop"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

        </motion.div>

        {/* Step indicator — absolute bottom center */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: "absolute", bottom: "48px", left: 0, right: 0, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.5)", flexShrink: 0 }} />
            <div style={{ width: "36px", height: "1px", background: "rgba(255,255,255,0.45)" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "linear-gradient(135deg, #E879F9 0%, #A855F7 100%)", boxShadow: "0 0 10px rgba(168,85,247,0.6)", flexShrink: 0 }} />
            <div style={{ width: "36px", height: "1px", background: "rgba(255,255,255,0.45)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.5)", flexShrink: 0 }} />
          </div>
          <p style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap" }}>
            {locale === "da" ? "Trin 2 af 3  ·  Definer jeres fremtidige retning" : "Step 2 of 3  ·  Define Your Future Direction"}
          </p>
        </motion.div>

      </section>

      {/* ═══════════ UNIFIED STRATEGY ═══════════ */}
      <section style={{ background: "#FFFFFF", padding: "120px 0 140px" }}>
        <div className="page-container">
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
                  Your second step toward securing{" "}
                  <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    your future business.
                  </span>
                </>
              )}
            </motion.h2>

            {/* Cards with flow arrows */}
            <div className="workshop-steps-grid">
              {[
                {
                  num: "01",
                  title: "Discovery Workshop",
                  desc: locale === "da"
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
                  title: locale === "da" ? "Analyse, Planlægning & Business Case" : "Define Your Future Direction",
                  desc: locale === "da"
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
                  title: locale === "da" ? "Udvikling & Eksekvering" : "Execution & Implementation",
                  desc: locale === "da"
                    ? "En plan vi kan hjælpe jer med at realisere — fra proof-of-concept til produktionsklar implementering med lokal forankring."
                    : "We bring your roadmap to life — implementing solutions into your business and turning strategy into real operational impact.",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                },
              ].map((step, idx) => {
                const isActive = idx === 1;
                return (
                  <React.Fragment key={step.num}>
                    <motion.div
                      variants={fadeUp}
                      style={{
                        padding: "40px 36px",
                        borderRadius: "20px",
                        background: isActive ? "rgba(192,38,211,0.08)" : "rgba(255,255,255,0.03)",
                        border: isActive ? "1px solid rgba(192,38,211,0.25)" : "1px solid rgba(255,255,255,0.06)",
                        backdropFilter: "blur(8px)",
                        transition: "border-color 0.3s, background 0.3s",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = isActive ? "rgba(192,38,211,0.45)" : "rgba(124,58,237,0.25)";
                        e.currentTarget.style.background = isActive ? "rgba(192,38,211,0.12)" : "rgba(255,255,255,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isActive ? "rgba(192,38,211,0.25)" : "rgba(255,255,255,0.06)";
                        e.currentTarget.style.background = isActive ? "rgba(192,38,211,0.08)" : "rgba(255,255,255,0.03)";
                      }}
                    >
                      {isActive && (
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
                        <div style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "14px",
                          background: isActive
                            ? "linear-gradient(135deg, rgba(192,38,211,0.25) 0%, rgba(147,51,234,0.2) 100%)"
                            : "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.15) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isActive ? "#C026D3" : "#7C3AED",
                        }}>
                          {step.icon}
                        </div>
                        <span style={{
                          fontFamily: "var(--font-geist), system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          color: isActive ? "rgba(192,38,211,0.8)" : "rgba(124,58,237,0.6)",
                        }}>
                          {locale === "da" ? `TRIN ${step.num}` : `STEP ${step.num}`}
                        </span>
                      </div>
                      <h3 style={{
                        fontFamily: "var(--font-geist), system-ui, sans-serif",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: "#FFFFFF",
                        marginBottom: "16px",
                      }}>
                        {step.title}
                      </h3>
                      <p style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "0.92rem",
                        lineHeight: 1.7,
                        color: "#94A3B8",
                      }}>
                        {step.desc}
                      </p>
                    </motion.div>

                    {idx < 2 && (
                      <div className="workshop-step-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px", alignSelf: "center" }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path d="M8 16h16M20 10l6 6-6 6" stroke="rgba(192,38,211,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* ═══════════ 8-STEP PROCESS ═══════════ */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "clamp(80px, 11vw, 140px) 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid — very subtle on white */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        <div className="page-container" style={{ position: "relative" }}>
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
                color: "#A855F7",
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
                color: "#0A0F1E",
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
            className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0 clamp(32px, 5vw, 64px)" }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                style={{
                  display: "flex",
                  gap: "24px",
                  padding: "36px 0",
                  borderBottom: i < 6 ? "1px solid #F3F4F6" : i === 6 || i === 7 ? "none" : "1px solid #F3F4F6",
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
                    border: "1px solid rgba(168,85,247,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#7C3AED",
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
                      color: "#0A0F1E",
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "#6B7280",
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
      <section style={{ background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)", padding: "clamp(80px, 11vw, 140px) 0" }}>
        <div className="page-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="about-grid" style={{ gap: "clamp(40px, 8vw, 100px)", alignItems: "center" }}
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
                  color: "#C084FC",
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
                  color: "#FFFFFF",
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
                  color: "#94A3B8",
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
                      borderBottom: i < maturity.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    {/* Progress bar */}
                    <div style={{ width: "140px", flexShrink: 0 }}>
                      <div
                        style={{
                          height: "6px",
                          borderRadius: "3px",
                          background: "rgba(255,255,255,0.08)",
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
                          color: "#FFFFFF",
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
                          color: "#94A3B8",
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
                {locale === "da" ? (
                  <span style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {"Spørgsmål om jeres AI-rejse"}
                  </span>
                ) : (
                  <span style={{ background: "linear-gradient(135deg, #C084FC, #818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {"Questions About Your AI Journey"}
                  </span>
                )}
              </motion.h2>
              <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                {(locale === "da"
                  ? [
                      "AI-strategi = konkurrencefordel",
                      "AI-strategi = fremtidssikring",
                      "AI-strategi = forretningstransformation",
                    ]
                  : [
                      "AI strategy = competitive advantage",
                      "AI strategy = future-proofing",
                      "AI strategy = business transformation",
                    ]
                ).map((line, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "#A855F7",
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
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} links={faq.links} locale={locale} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section style={{ background: "linear-gradient(160deg, #0A0F1E 0%, #111827 100%)", padding: "clamp(80px, 11vw, 140px) 0" }}>
        <div className="page-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}
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
                color: "#FFFFFF",
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
                color: "#94A3B8",
                lineHeight: 1.8,
                marginBottom: "48px",
              }}
            >
              {locale === "da"
                ? "Start med klarhed. Vores AI Workshop er det f\u00f8rste skridt mod en struktureret AI-strategi, der skaber reel v\u00e6rdi."
                : "Start with clarity. Our AI Workshop is the first step toward a structured AI strategy that creates real value."}
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
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
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "100px",
                  padding: "16px 36px",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.75)",
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
