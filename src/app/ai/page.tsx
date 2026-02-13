import type { Metadata } from "next";
import AIPage from "./AIPage";

export const metadata: Metadata = {
  title: "AI Tools & Copilots | Luxmikant",
  description:
    "Multi-agent orchestration, RAG pipelines, LangGraph, computer vision, and AI-powered developer tooling.",
  alternates: {
    canonical: "/ai",
  },
  openGraph: {
    title: "AI Tools & Copilots | Luxmikant",
    description:
      "Multi-agent orchestration, RAG pipelines, LangGraph, computer vision, and AI-powered developer tooling.",
    url: "/ai",
    type: "website",
  },
};

export default function Page() {
  return <AIPage />;
}
