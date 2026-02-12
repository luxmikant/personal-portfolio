import type { Metadata } from "next";
import Web3Page from "./Web3Page";

export const metadata: Metadata = {
  title: "Web3 / Blockchain | Luxmikant",
  description:
    "Smart contracts, on-chain architecture, hybrid cloud-chain systems, and decentralization exploration.",
};

export default function Page() {
  return <Web3Page />;
}
