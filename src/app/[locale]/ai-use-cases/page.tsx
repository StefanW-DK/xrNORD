"use client";

import React, { useState, useCallback } from "react";
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

interface UseCase {
  name: { en: string; da: string };
  what: { en: string; da: string };
  impact: { en: string; da: string }[];
}

interface Category {
  id: string;
  title: { en: string; da: string };
  description: { en: string; da: string };
  useCases: UseCase[];
}

const CATEGORIES: Category[] = [
  {
    id: "sales",
    title: { en: "AI in Sales & Customer Engagement", da: "AI inden for salg og kundeengagement" },
    description: {
      en: "Personalize experiences, improve conversions, and deliver 24/7 intelligent support through AI-powered sales and customer service.",
      da: "Personalis\u00e9r oplevelser, forbedr konverteringer og lev\u00e9r 24/7 intelligent support gennem AI-drevet salg og kundeservice.",
    },
    useCases: [
      {
        name: { en: "24/7 AI-Enabled Customer Service & Support", da: "24/7 AI-drevet kundeservice og support" },
        what: {
          en: "Automates customer interactions and support, offering 24/7 availability and improving engagement.",
          da: "Automatiserer kundeinteraktioner og support med 24/7 tilg\u00e6ngelighed og forbedret engagement.",
        },
        impact: [
          { en: "Reduces human workload", da: "Reducerer manuel arbejdsbyrde" },
          { en: "Increases customer satisfaction", da: "\u00d8ger kundetilfredshed" },
          { en: "Streamlines inquiry resolution", da: "Effektiviserer henvendelses\u00e5sning" },
        ],
      },
      {
        name: { en: "Automated & Personalized Marketing Content Creation", da: "Automatiseret og personaliseret marketingindhold" },
        what: {
          en: "Uses AI to create customized content for different customer segments, improving engagement and conversion.",
          da: "Bruger AI til at skabe skr\u00e6ddersyet indhold til forskellige kundesegmenter, der forbedrer engagement og konvertering.",
        },
        impact: [
          { en: "Increases customer retention", da: "\u00d8ger kundefastholdelse" },
          { en: "Optimizes marketing spend", da: "Optimerer marketingbudget" },
          { en: "Boosts ROI", da: "\u00d8ger ROI" },
        ],
      },
      {
        name: { en: "AI-Based Customer Sentiment & Sales Forecasting", da: "AI-baseret kundesentiment og salgsforecasting" },
        what: {
          en: "Analyzes customer feedback, social media, and sales trends to predict behavior and improve sales strategies.",
          da: "Analyserer kundefeedback, sociale medier og salgstrends for at forudsige adf\u00e6rd og forbedre salgsstrategier.",
        },
        impact: [
          { en: "Improves sales forecasting", da: "Forbedrer salgsforecasting" },
          { en: "Enhances customer experience", da: "Forbedrer kundeoplevelsen" },
          { en: "Optimizes resource allocation", da: "Optimerer ressourceallokering" },
        ],
      },
    ],
  },
  {
    id: "creative",
    title: { en: "AI for Creative Agencies & Media", da: "AI for kreative bureauer og medier" },
    description: {
      en: "Streamline content creation, optimize campaigns, and uncover trends with AI tools that boost creativity and reduce costs.",
      da: "Str\u00f8mlin indholdsproduktion, optim\u00e9r kampagner og afd\u00e6k trends med AI-v\u00e6rkt\u00f8jer der styrker kreativitet og reducerer omkostninger.",
    },
    useCases: [
      {
        name: { en: "Content Generation & Creative Support", da: "Indholdsgenerering og kreativ support" },
        what: {
          en: "Automates content creation, including text, images, and video, making production faster and more cost-effective.",
          da: "Automatiserer indholdsproduktion, herunder tekst, billeder og video, s\u00e5 produktionen bliver hurtigere og mere omkostningseffektiv.",
        },
        impact: [
          { en: "Speeds up media production", da: "Fremskynder medieproduktion" },
          { en: "Reduces costs", da: "Reducerer omkostninger" },
          { en: "Enhances creative possibilities", da: "Udvider kreative muligheder" },
        ],
      },
      {
        name: { en: "Ad Targeting & Optimization", da: "Annoncem\u00e5lretning og optimering" },
        what: {
          en: "Uses AI to analyze audience behavior and optimize ad placements in real time.",
          da: "Bruger AI til at analysere publikumsadf\u00e6rd og optimere annonceplaceringer i realtid.",
        },
        impact: [
          { en: "Improves ad performance", da: "Forbedrer annonceperformance" },
          { en: "Increases conversions", da: "\u00d8ger konverteringer" },
          { en: "Reduces wasted ad spend", da: "Reducerer spildt annoncebudget" },
        ],
      },
      {
        name: { en: "Media Analytics & Trend Forecasting", da: "Medieanalyse og trendforecasting" },
        what: {
          en: "Identifies emerging media trends by analyzing online content and user interactions.",
          da: "Identificerer nye medietrends ved at analysere onlineindhold og brugerinteraktioner.",
        },
        impact: [
          { en: "Enhances decision-making", da: "Forbedrer beslutningstagning" },
          { en: "Improves content strategy", da: "Forbedrer indholdsstrategi" },
          { en: "Increases audience engagement", da: "\u00d8ger publikumsengagement" },
        ],
      },
    ],
  },
  {
    id: "education",
    title: { en: "AI in Education & Learning Environments", da: "AI inden for uddannelse og l\u00e6ringsmilj\u00f8er" },
    description: {
      en: "Personalize learning, automate feedback, and support teachers with smart educational tools that scale student success.",
      da: "Personalis\u00e9r l\u00e6ring, automatis\u00e9r feedback og st\u00f8t undervisere med intelligente uddannelsesv\u00e6rkt\u00f8jer der skalerer elevernes succes.",
    },
    useCases: [
      {
        name: { en: "Adaptive Learning Systems", da: "Adaptive l\u00e6ringssystemer" },
        what: {
          en: "Uses AI to personalize learning experiences based on student progress and engagement.",
          da: "Bruger AI til at personalisere l\u00e6ringsoplevelser baseret p\u00e5 elevfremskridt og engagement.",
        },
        impact: [
          { en: "Enhances student retention", da: "Forbedrer elevfastholdelse" },
          { en: "Improves learning outcomes", da: "Forbedrer l\u00e6ringsresultater" },
          { en: "Optimizes educational resources", da: "Optimerer uddannelsesressourcer" },
        ],
      },
      {
        name: { en: "Automated Grading & Feedback", da: "Automatiseret bed\u00f8mmelse og feedback" },
        what: {
          en: "Automates assessments and provides instant feedback to students.",
          da: "Automatiserer vurderinger og giver \u00f8jeblikkelig feedback til elever.",
        },
        impact: [
          { en: "Saves teachers time", da: "Sparer undervisere tid" },
          { en: "Improves grading accuracy", da: "Forbedrer bed\u00f8mmelsesn\u00f8jagtighed" },
          { en: "Enhances student learning experiences", da: "Forbedrer elevernes l\u00e6ringsoplevelser" },
        ],
      },
      {
        name: { en: "Tutoring & Assistance", da: "Tutoring og assistance" },
        what: {
          en: "Provides AI-driven tutoring through virtual assistants that help students with coursework and skill development.",
          da: "Tilbyder AI-drevet tutoring gennem virtuelle assistenter, der hj\u00e6lper elever med kursusarbejde og kompetenceudvikling.",
        },
        impact: [
          { en: "Increases accessibility to education", da: "\u00d8ger adgangen til uddannelse" },
          { en: "Enhances learning engagement", da: "Forbedrer l\u00e6ringsengagement" },
          { en: "Provides 24/7 assistance", da: "Tilbyder 24/7 assistance" },
        ],
      },
    ],
  },
  {
    id: "data",
    title: { en: "AI-Driven Data Analysis & Business Intelligence", da: "AI-drevet dataanalyse og business intelligence" },
    description: {
      en: "Turn raw data into insights and revenue by automating processing, identifying trends, and supporting smarter decisions.",
      da: "Oms\u00e6t r\u00e5 data til indsigt og indj\u00e6ning ved at automatisere behandling, identificere trends og underst\u00f8tte smartere beslutninger.",
    },
    useCases: [
      {
        name: { en: "Data Aggregation & Processing", da: "Dataaggregering og -behandling" },
        what: {
          en: "Automates the collection and processing of large datasets from various sources, including surveys and market research.",
          da: "Automatiserer indsamling og behandling af store datas\u00e6t fra forskellige kilder, herunder unders\u00f8gelser og markedsanalyser.",
        },
        impact: [
          { en: "Reduces manual effort", da: "Reducerer manuelt arbejde" },
          { en: "Increases data accuracy", da: "\u00d8ger datan\u00f8jagtighed" },
          { en: "Speeds up decision-making", da: "Fremskynder beslutningstagning" },
        ],
      },
      {
        name: { en: "Trend & Pattern Recognition", da: "Trend- og m\u00f8nstergenkendelse" },
        what: {
          en: "Uses machine learning to identify patterns and emerging trends in large datasets.",
          da: "Bruger machine learning til at identificere m\u00f8nstre og nye trends i store datas\u00e6t.",
        },
        impact: [
          { en: "Enhances market research", da: "Forbedrer markedsanalyse" },
          { en: "Supports data-driven decisions", da: "Underst\u00f8tter datadrevne beslutninger" },
          { en: "Improves forecasting", da: "Forbedrer forecasting" },
        ],
      },
      {
        name: { en: "Predictive Market Analysis", da: "Pr\u00e6diktiv markedsanalyse" },
        what: {
          en: "Analyzes historical and real-time data to generate actionable insights on market trends and customer preferences.",
          da: "Analyserer historiske og realtidsdata for at generere handlingsorienterede indsigter om markedstrends og kundepr\u00e6ferencer.",
        },
        impact: [
          { en: "Improves market positioning", da: "Forbedrer markedspositionering" },
          { en: "Enhances product development strategies", da: "Forbedrer produktudviklingsstrategier" },
          { en: "Increases revenue opportunities", da: "\u00d8ger indt\u00e6gtsmuligheder" },
        ],
      },
    ],
  },
  {
    id: "accounting",
    title: { en: "AI for Accounting & Audit Firms", da: "AI for revisions- og regnskabsfirmaer" },
    description: {
      en: "Automate reconciliation, detect fraud, and improve compliance through AI-powered audit processes and real-time insights.",
      da: "Automatis\u00e9r afstemning, opdag svindel og forbedr compliance gennem AI-drevne revisionsprocesser og realtidsindsigt.",
    },
    useCases: [
      {
        name: { en: "Audit Sampling", da: "Revisionsstikpr\u00f8ver" },
        what: {
          en: "AI can significantly enhance the audit sampling process by introducing: Intelligent Sample Selection, Anomaly Detection, Real-Time Insights & Automated Documentation.",
          da: "AI kan markant forbedre revisionsstikpr\u00f8veprocessen ved at introducere: Intelligent stikpr\u00f8veudv\u00e6lgelse, anomalidetektion, realtidsindsigter og automatiseret dokumentation.",
        },
        impact: [
          { en: "Increases efficiency", da: "\u00d8ger effektivitet" },
          { en: "Increases accuracy", da: "\u00d8ger n\u00f8jagtighed" },
          { en: "Reduces time used", da: "Reducerer tidsforbrug" },
        ],
      },
      {
        name: { en: "Fraud Detection & Risk Management", da: "Svindeldetektion og risikostyring" },
        what: {
          en: "Uses machine learning to detect fraud patterns and anomalies in financial transactions.",
          da: "Bruger machine learning til at detektere svindelm\u00f8nstre og anomalier i finansielle transaktioner.",
        },
        impact: [
          { en: "Prevents financial fraud", da: "Forebygger finansiel svindel" },
          { en: "Enhances risk assessment", da: "Forbedrer risikovurdering" },
          { en: "Improves regulatory compliance", da: "Forbedrer regulatorisk compliance" },
        ],
      },
      {
        name: { en: "Automated Reconciliation & Reporting", da: "Automatiseret afstemning og rapportering" },
        what: {
          en: "Automates financial reconciliation, reducing errors and improving efficiency in bookkeeping and audits.",
          da: "Automatiserer finansiel afstemning, reducerer fejl og forbedrer effektivitet i bogf\u00f8ring og revision.",
        },
        impact: [
          { en: "Eliminates manual reconciliation workflows", da: "Eliminerer manuelle afstemningsworkflows" },
          { en: "Enhances audit accuracy", da: "Forbedrer revisionsn\u00f8jagtighed" },
          { en: "Reduces reporting time", da: "Reducerer rapporteringstid" },
        ],
      },
    ],
  },
];

export default function AiUseCasesPage() {
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const t = useCallback(
    (obj: { en: string; da: string }) => (locale === "da" ? obj.da : obj.en),
    [locale]
  );

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main style={{ fontFamily: "var(--font-geist), sans-serif" }}>
      <Navbar />

      {/* ─── Hero Section ─── */}
      <section
        style={{
          position: "relative",
          minHeight: 520,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B0F1A 0%, #141829 50%, #1A1040 100%)",
          overflow: "hidden",
          padding: "140px 24px 80px",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 700,
            background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ position: "relative", zIndex: 1, maxWidth: 860, textAlign: "center" }}
        >
          {/* Label */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#C084FC",
              marginBottom: 20,
            }}
          >
            AI USE CASES
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              color: "#fff",
              margin: "0 0 24px",
            }}
          >
            {locale === "da" ? "AI-anvendelser" : "Real AI Applications"}
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #E879F9, #A855F7, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {locale === "da" ? "p\u00e5 tv\u00e6rs af brancher" : "Across Industries"}
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 640,
              margin: "0 auto 40px",
            }}
          >
            {locale === "da"
              ? "Udforsk hvordan AI skaber m\u00e5lbar v\u00e6rdi inden for salg, marketing, uddannelse, data og finans."
              : "Explore how AI creates measurable impact across sales, marketing, education, data, and finance."}
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 999,
                    border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.2)",
                    background: isActive
                      ? "linear-gradient(135deg, #A855F7, #818CF8)"
                      : "transparent",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    fontFamily: "var(--font-geist), sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t(cat.title)}
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Category Sections ─── */}
      {CATEGORIES.map((cat, catIdx) => (
        <section
          key={cat.id}
          id={cat.id}
          style={{
            background: catIdx % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
            padding: "100px 24px",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* Category Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              style={{ marginBottom: 56 }}
            >
              <motion.div
                variants={fadeUp}
                style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}
              >
                <div
                  style={{
                    width: 4,
                    height: 32,
                    borderRadius: 2,
                    background: "linear-gradient(180deg, #A855F7, #818CF8)",
                    flexShrink: 0,
                  }}
                />
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 800,
                    color: "#111",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {t(cat.title)}
                </h2>
              </motion.div>
              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "#666",
                  maxWidth: 700,
                  margin: 0,
                  paddingLeft: 18,
                }}
              >
                {t(cat.description)}
              </motion.p>
            </motion.div>

            {/* Use Case Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={stagger}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 24,
              }}
            >
              {cat.useCases.map((uc, ucIdx) => (
                <motion.div
                  key={ucIdx}
                  variants={fadeUp}
                  whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    overflow: "hidden",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    style={{
                      height: 4,
                      background: "linear-gradient(90deg, #A855F7, #818CF8, #E879F9)",
                    }}
                  />

                  <div style={{ padding: 32 }}>
                    {/* Card Title */}
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#111",
                        margin: "0 0 12px",
                        lineHeight: 1.35,
                      }}
                    >
                      {t(uc.name)}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: "#666",
                        margin: "0 0 20px",
                      }}
                    >
                      {t(uc.what)}
                    </p>

                    {/* Impact Label */}
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        color: "#A855F7",
                        margin: "0 0 10px",
                      }}
                    >
                      {locale === "da" ? "Effekt" : "Impact"}
                    </p>

                    {/* Impact Bullets */}
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {uc.impact.map((imp, impIdx) => (
                        <li
                          key={impIdx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontSize: 14,
                            color: "#444",
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#A855F7",
                              flexShrink: 0,
                            }}
                          />
                          {t(imp)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* ─── CTA Section ─── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0B0F1A 0%, #141829 50%, #1A1040 100%)",
          padding: "100px 24px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ maxWidth: 640, margin: "0 auto" }}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 24px",
              lineHeight: 1.2,
            }}
          >
            {locale === "da"
              ? "Klar til at udforske AI for jeres virksomhed?"
              : "Ready to explore AI for your business?"}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 40px",
            }}
          >
            {locale === "da"
              ? "Book en workshop og find ud af, hvilke AI-use cases der passer til jeres forretning."
              : "Book a workshop and discover which AI use cases fit your business."}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/workshop`}
              style={{
                display: "inline-block",
                padding: "16px 40px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #A855F7, #818CF8)",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(168,85,247,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              {locale === "da" ? "Book en workshop" : "Book a Workshop"}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
