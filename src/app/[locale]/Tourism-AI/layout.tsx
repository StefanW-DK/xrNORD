import type { Metadata } from "next";

type Props = { children: React.ReactNode };

export const metadata: Metadata = {
  title: "AI for Tourism — One More Day | xrNORD",
  description:
    "An intelligent Travel Companion that knows the visitor, knows the destination, and bridges the two in real time, so tourists experience more, stay longer, and return. A briefing for tourism organisations.",
  openGraph: {
    title: "AI for Tourism — One More Day",
    description:
      "Make the visitor stay one more day. An intelligent Travel Companion for destinations, hotels, restaurants, museums, and attractions.",
    type: "website",
  },
};

export default function Layout({ children }: Props) {
  return children;
}
