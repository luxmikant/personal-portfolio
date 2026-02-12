import type { Metadata } from "next";
import BackendPage from "./BackendPage";

export const metadata: Metadata = {
  title: "Backend Engineering | Luxmikant",
  description:
    "Scalable backend systems, API design, service architecture, and production-grade engineering. SharCRM, TraderLens-AI, and more.",
};

export default function Page() {
  return <BackendPage />;
}
