// Project data — real projects from GitHub
import { DomainId } from "./domainConfig";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveUrl?: string;
  domain: DomainId;
  highlights: string[];
  image?: string;
}

export const PROJECTS: Project[] = [
  // ==========================================
  // BACKEND ENGINEERING
  // ==========================================
  {
    title: "SharCRM",
    description:
      "Modern businesses struggle with fragmented customer data, inefficient campaign management, and lack of actionable insights. We built SharCRM because we believe every business deserves enterprise-grade CRM intelligence, not just Fortune 500 companies.",
    techStack: [
      "React 18",
      "Vite",
      "Express 5",
      "MongoDB",
      "Google Gemini AI",
      "TypeScript",
    ],
    github: "https://github.com/luxmikant/SharCRM",
    liveUrl: "https://frontend-crm-u9i2.onrender.com/",
    domain: "backend",
    highlights: [
      "Live production deployment",
      "AI-generated campaign messages",
      "Smart customer segmentation with drag-and-drop",
      "Health score tracking (0\u2013100) with churn prediction",
      "Sales pipeline with Kanban UI",
      "Design-first collaboration \u2014 mutual appreciation for UI/UX",
    ],
  },
  {
    title: "TraderLens-AI",
    description:
      "Multi-agent financial news intelligence system for real-time market analysis. 6-agent LangGraph pipeline with state machine orchestration.",
    techStack: [
      "Python",
      "LangGraph",
      "FastAPI",
      "ChromaDB",
      "PostgreSQL",
      "FinBERT",
      "React",
      "TypeScript",
    ],
    github: "https://github.com/luxmikant/TraderLens-AI",
    domain: "backend",
    highlights: [
      "95%+ semantic deduplication accuracy",
      "NER entity extraction (92%+ precision)",
      "Impact Index scoring (0\u2013100)",
      "RAG synthesis with Groq Llama-3.3-70B",
      "134 comprehensive test cases",
    ],
  },

  // ==========================================
  // CLOUD-NATIVE
  // ==========================================
  {
    title: "Armory Intelligence \u2014 The Elite Arsenal Nexus",
    description:
      "Cinematic weapons intelligence platform comparing Star Wars blasters to real-world firearms. AI-powered analysis, holographic displays, and tactical briefings with Tambo Generative UI.",
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Supabase",
      "Prisma",
      "Tailwind CSS",
      "Tambo AI",
      "Framer Motion",
    ],
    github: "https://github.com/luxmikant/Armory-Intelligence",
    liveUrl: "https://armory-intelligence.vercel.app/",
    domain: "cloud",
    highlights: [
      "19 weapons (Sci-Fi + Real World) with detailed specs",
      "11 custom AI components via Tambo Generative UI",
      "Ballistics calculator with trajectory modeling",
      "Real-time AI comparisons & tactical analysis",
      "Cinematic UI with scroll-driven animations",
      "Production deployment on Vercel",
    ],
  },

  // ==========================================
  // AI TOOLS & COPILOTS
  // ==========================================
  {
    title: "TraderLens-AI (Agent Focus)",
    description:
      "6-agent LangGraph pipeline demonstrating production multi-agent orchestration. Semantic deduplication, NER extraction, FinBERT sentiment, and RAG synthesis.",
    techStack: [
      "LangGraph",
      "Python",
      "FinBERT",
      "ChromaDB",
      "Groq Llama-3.3-70B",
    ],
    github: "https://github.com/luxmikant/TraderLens-AI",
    domain: "ai",
    highlights: [
      "State machine orchestration across 6 agents",
      "Agent pipeline: Dedup \u2192 NER \u2192 Sentiment \u2192 Impact \u2192 Heatmap \u2192 RAG",
      "~88% FinBERT sentiment accuracy",
      "Sector/company attention heatmap",
      "End-to-end test suite with performance benchmarks",
    ],
  },
  {
    title: "ANPR-YOLOv8",
    description:
      "Automated Number Plate Recognition using YOLOv8 object detection. Real-world computer vision application for plate detection and OCR.",
    techStack: ["Python", "YOLOv8", "OpenCV", "Ultralytics"],
    github: "https://github.com/luxmikant/ANPR-Yolov8",
    domain: "ai",
    highlights: [
      "YOLOv8-based plate detection",
      "Real-time processing pipeline",
      "OCR integration for plate text extraction",
      "Practical, deployable CV application",
    ],
  },

  // ==========================================
  // WEB3
  // ==========================================
  {
    title: "specchain-pro",
    description:
      "Blockchain experimentation project exploring smart contract patterns and on-chain architecture fundamentals.",
    techStack: ["TypeScript", "Blockchain", "Smart Contracts"],
    github: "https://github.com/luxmikant/specchain-pro",
    domain: "web3",
    highlights: [
      "Smart contract design patterns",
      "On-chain vs off-chain architecture exploration",
      "Foundation for hybrid cloud-chain systems",
    ],
  },

  // ==========================================
  // BONUS \u2014 Connect4 (Go)
  // ==========================================
  {
    title: "Connect4",
    description:
      "Two-player strategy game built in Go with documented architecture. Demonstrates clean code practices, game logic, and living documentation.",
    techStack: ["Go", "Architecture Documentation"],
    github: "https://github.com/luxmikant/Connect4",
    domain: "backend",
    highlights: [
      "Clean Go architecture",
      "Living architecture snapshot documentation",
      "Game state management & logic",
      "Well-structured codebase",
    ],
  },
];

// Helper: Get projects by domain
export function getProjectsByDomain(domain: DomainId): Project[] {
  return PROJECTS.filter((p) => p.domain === domain);
}
