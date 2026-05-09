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
  // 1 — Armory Intelligence
  {
    title: "Armory Intelligence — The Elite Arsenal Nexus",
    description:
      "Problem: Lacked an interactive, data-driven platform for tactical weapons comparison and ballistics modeling.\nContribution: Built a cinematic intelligence platform integrating AI-powered analysis with 3D UI, managing end-to-end database design and Vercel deployment.\nImpact: Delivered seamless <100ms real-time AI comparisons and dynamic trajectory calculations.",
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Supabase",
      "Prisma",
      "Tailwind CSS",
      "Tambo AI",
    ],
    github: "https://github.com/luxmikant/Armory-Intelligence",
    liveUrl: "https://armory-intelligence.vercel.app/",
    domain: "cloud",
    image: "/armory.png",
    highlights: [
      "Database design with Supabase and Prisma ORM",
      "11 custom AI components generated via Tambo UI",
      "Dynamic trajectory modeling & ballistics calculus",
      "High-performance production deployment on Vercel",
    ],
  },

  // 2 — SharCRM
  {
    title: "SharCRM",
    description:
      "Problem: Small businesses struggled with fragmented CRM data and inefficient campaign management without enterprise pricing.\nContribution: Architected an end-to-end CRM solution featuring secure JWT auth, robust MongoDB data modeling, and AI-driven campaign generation.\nImpact: Reduced campaign setup time drastically and implemented churn prediction with custom health score tracking.",
    techStack: [
      "React 18",
      "Node.js",
      "Express",
      "MongoDB",
      "Google Gemini AI",
    ],
    github: "https://github.com/luxmikant/SharCRM",
    liveUrl: "https://frontend-crm-u9i2.onrender.com/",
    domain: "backend",
    image: "/sharcrm.png",
    highlights: [
      "Secure RBAC Authentication and robust Database schema",
      "AI integration using Google Gemini for prompt-engineered messages",
      "Automated CI/CD deployment on Render",
      "Predictive customer health & risk tracking dashboard",
    ],
  },

  // 3 — AI Resume Analyzer
  {
    title: "AI Résumé Analyzer",
    description:
      "Problem: Recruiters spend excessive time manually filtering misaligned resumes for specific job descriptions.\nContribution: Engineered the backend pipeline utilizing vector embeddings and prompt engineering to calculate ATS compatibility matches.\nImpact: Accelerated resume screening speed by 80% with high precision matching algorithms.",
    techStack: [
      "Next.js",
      "Python",
      "FastAPI",
      "OpenAI API",
      "Pinecone",
    ],
    github: "https://github.com/luxmikant/ai-resume-analyzer",
    liveUrl: "https://ai-resume-analyzer-demo.vercel.app/",
    domain: "ai",
    image: "/armory.png", // fallback image or skip
    highlights: [
      "Semantic search powered by Pinecone vector embeddings",
      "Prompt engineering with OpenAI models for granular skill extraction",
      "FastAPI backend ensuring high-throughput REST architecture",
      "Comprehensive unit testing on ranking algorithms",
    ],
  },
];

// Helper: Get projects by domain
export function getProjectsByDomain(domain: DomainId): Project[] {
  return PROJECTS.filter((p) => p.domain === domain);
}
