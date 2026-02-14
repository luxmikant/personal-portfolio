// Domain configuration — central source of truth for all domain data
export type DomainId = "landing" | "backend" | "cloud" | "ai" | "web3";

export interface DomainConfig {
  id: DomainId;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  colors: {
    primary: string;
    secondary: string;
    glow: string;
  };
  loaderMessages: string[];
  avatarForm: string;
  order: number;
}

export const DOMAINS: Record<DomainId, DomainConfig> = {
  landing: {
    id: "landing",
    title: "Engineer for the Edge",
    subtitle: "Backend | Cloud | AI | Web3",
    description:
      "Building scalable systems in niche domains. From financial intelligence to decentralized networks.",
    route: "/",
    colors: {
      primary: "#7c5cfc",
      secondary: "#a78bfa",
      glow: "rgba(124, 92, 252, 0.25)",
    },
    loaderMessages: [
      "Initializing portfolio...",
      "Loading systems...",
      "Preparing journey...",
    ],
    avatarForm: "base",
    order: 0,
  },
  backend: {
    id: "backend",
    title: "Backend Engineering",
    subtitle: "Scalable Systems & Architecture",
    description:
      "Designing production-grade APIs, event-driven systems, and clean architecture. From monoliths to microservices — structure, breakdown, scale.",
    route: "/backend",
    colors: {
      primary: "#8b5cf6",
      secondary: "#a78bfa",
      glow: "rgba(139, 92, 246, 0.3)",
    },
    loaderMessages: [
      "Initializing scalable systems...",
      "Building API layers...",
      "Structuring architecture...",
    ],
    avatarForm: "tech",
    order: 1,
  },
  cloud: {
    id: "cloud",
    title: "Cloud-Native & CNCF",
    subtitle: "Infrastructure at Scale",
    description:
      "Exploring Kubernetes, observability, and deployment pipelines. Building reliable, distributed systems on cloud-native foundations.",
    route: "/cloud",
    colors: {
      primary: "#f97316",
      secondary: "#fb923c",
      glow: "rgba(249, 115, 22, 0.3)",
    },
    loaderMessages: [
      "Orchestrating infrastructure...",
      "Deploying services...",
      "Spinning up clusters...",
    ],
    avatarForm: "distributed",
    order: 2,
  },
  ai: {
    id: "ai",
    title: "AI Tools & Copilots",
    subtitle: "Intelligent Systems",
    description:
      "Engineering AI into production systems. Multi-agent orchestration, RAG pipelines, and developer tooling powered by LLMs.",
    route: "/ai",
    colors: {
      primary: "#10b981",
      secondary: "#ec4899",
      glow: "rgba(16, 185, 129, 0.3)",
    },
    loaderMessages: [
      "Booting neural networks...",
      "Loading language models...",
      "Initializing agents...",
    ],
    avatarForm: "luminous",
    order: 3,
  },
  web3: {
    id: "web3",
    title: "Web3 / Blockchain",
    subtitle: "Decentralized & On-Chain",
    description:
      "Experimenting with smart contracts, on-chain architecture, and cloud-chain hybrid systems. Exploring the decentralization frontier.",
    route: "/web3",
    colors: {
      primary: "#a855f7",
      secondary: "#f59e0b",
      glow: "rgba(168, 85, 247, 0.3)",
    },
    loaderMessages: [
      "Deploying smart contracts...",
      "Initializing blockchain...",
      "Syncing ledgers...",
    ],
    avatarForm: "crystalline",
    order: 4,
  },
};

// Ordered domain list for navigation
export const DOMAIN_ORDER: DomainId[] = [
  "landing",
  "backend",
  "cloud",
  "ai",
  "web3",
];

// Get next domain in sequence
export function getNextDomain(current: DomainId): DomainId | null {
  const idx = DOMAIN_ORDER.indexOf(current);
  if (idx === -1 || idx >= DOMAIN_ORDER.length - 1) return null;
  return DOMAIN_ORDER[idx + 1];
}

// Get previous domain in sequence
export function getPrevDomain(current: DomainId): DomainId | null {
  const idx = DOMAIN_ORDER.indexOf(current);
  if (idx <= 0) return null;
  return DOMAIN_ORDER[idx - 1];
}
