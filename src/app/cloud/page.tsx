import type { Metadata } from "next";
import CloudPage from "./CloudPage";

export const metadata: Metadata = {
  title: "Cloud-Native & CNCF | Luxmikant",
  description:
    "Kubernetes, Prometheus, Docker, deployment pipelines, and cloud-native infrastructure. Armory-Intelligence and more.",
};

export default function Page() {
  return <CloudPage />;
}
