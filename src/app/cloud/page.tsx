import type { Metadata } from "next";
import CloudPage from "./CloudPage";

export const metadata: Metadata = {
  title: "Cloud-Native & CNCF | Luxmikant",
  description:
    "Kubernetes, Prometheus, Docker, deployment pipelines, and cloud-native infrastructure. Armory-Intelligence and more.",
  alternates: {
    canonical: "/cloud",
  },
  openGraph: {
    title: "Cloud-Native & CNCF | Luxmikant",
    description:
      "Kubernetes, Prometheus, Docker, deployment pipelines, and cloud-native infrastructure.",
    url: "/cloud",
    type: "website",
  },
};

export default function Page() {
  return <CloudPage />;
}
