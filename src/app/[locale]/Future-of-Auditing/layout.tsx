import type { Metadata } from "next";

type Props = { children: React.ReactNode };

// Private sales landing page — must NOT be indexed by search engines.
// Layered protection: noindex meta + excluded from sitemap.ts + Disallow in robots.txt.
//
// Metadata still set correctly so internal sharing previews (Slack, LinkedIn DM,
// link inspector tools) render a clean card if the URL is shared with prospects.
export const metadata: Metadata = {
  title: "AI til revision — Forbliv konkurrencedygtige | xrNORD",
  description:
    "AI vil forvandle revision. Lad det blive jeres styrke. En privat briefing til danske revisionshuse om hvordan AI fundamentalt ændrer branchen — og hvordan I tager førertrøjen.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: undefined },
  openGraph: {
    title: "AI til revision — Forbliv konkurrencedygtige",
    description:
      "AI vil forvandle revision. Lad det blive jeres styrke. En privat briefing til danske revisionshuse.",
    type: "website",
  },
};

export default function Layout({ children }: Props) {
  return children;
}
