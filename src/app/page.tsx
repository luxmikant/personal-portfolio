import type { Metadata } from "next";
import LandingPage from "./LandingPage";
import { getAllPosts } from "@/utils/storage";

export const metadata: Metadata = {
  title: "Luxmikant | Computer Science Graduate · Backend + Cloud + AI Engineer",
  description:
    "Interactive portfolio showcasing backend architectures, AI integration, and cloud-native solutions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Luxmikant | Computer Science Graduate · Backend + Cloud + AI Engineer",
    description:
      "Interactive portfolio showcasing backend architectures, AI integration, and cloud-native solutions.",
    url: "/",
    type: "website",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function Page() {
  const posts = getAllPosts();
  return <LandingPage posts={posts} />;
}
