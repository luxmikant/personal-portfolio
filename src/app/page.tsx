import type { Metadata } from "next";
import LandingPage from "./LandingPage";

export const metadata: Metadata = {
  title: "Luxmikant | Backend · Cloud · AI · Web3",
  description:
    "Interactive portfolio showcasing backend engineering, cloud-native systems, AI tools, and Web3 expertise.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Luxmikant | Backend · Cloud · AI · Web3",
    description:
      "Interactive portfolio showcasing backend engineering, cloud-native systems, AI tools, and Web3 expertise.",
    url: "/",
    type: "website",
  },
};

export default function Page() {
  return <LandingPage />;
}
