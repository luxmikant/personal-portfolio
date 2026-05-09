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
  video?: string;
}

export const PROJECTS: Project[] = [
  // 1 — Connect4
  {
    title: "Connect4",
    description:
      "Two-player strategy game built in Go with documented architecture. Demonstrates clean code practices, game logic, and living documentation.",
    techStack: ["Go", "Architecture Documentation"],
    github: "https://github.com/luxmikant/Connect4",
    liveUrl: "https://connect4-jet-chi.vercel.app/",
    domain: "backend",
    video: "/connect4.mp4",
    highlights: [
      "Clean Go architecture",
      "Living architecture snapshot documentation",
      "Game state management & logic",
      "Well-structured codebase",
    ],
  },

  // 2 — SharCRM
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
    image: "/sharcrm.png",
    highlights: [
      "Live production deployment",
      "AI-generated campaign messages",
      "Smart customer segmentation with drag-and-drop",
      "Health score tracking (0–100) with churn prediction",
      "Sales pipeline with Kanban UI",
    ],
  },

  // 3 — Armory Intelligence
  {
    title: "Armory Intelligence — The Elite Arsenal Nexus",
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
    image: "/armory.png",
    highlights: [
      "19 weapons (Sci-Fi + Real World) with detailed specs",
      "11 custom AI components via Tambo Generative UI",
      "Ballistics calculator with trajectory modeling",
      "Real-time AI comparisons & tactical analysis",
      "Production deployment on Vercel",
    ],
  },
];

// Helper: Get projects by domain
export function getProjectsByDomain(domain: DomainId): Project[] {
  return PROJECTS.filter((p) => p.domain === domain);
}
