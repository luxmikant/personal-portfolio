"use client";

import { motion } from "framer-motion";
import { DomainId } from "@/utils/domainConfig";
import { fadeInUp } from "@/utils/animationConfig";

interface Skill {
  name: string;
  level: number; // 0-100
}

const SKILLS_DATA: Record<DomainId, Skill[]> = {
  landing: [],
  backend: [
    { name: "Node.js / Express", level: 90 },
    { name: "Python / FastAPI", level: 85 },
    { name: "System Design", level: 80 },
    { name: "API Architecture", level: 88 },
    { name: "MongoDB", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "Low-Level Design / OOP", level: 82 },
    { name: "Clean Code & Testing", level: 85 },
  ],
  cloud: [
    { name: "Docker", level: 80 },
    { name: "Kubernetes", level: 60 },
    { name: "CI/CD Pipelines", level: 75 },
    { name: "Prometheus / Grafana", level: 55 },
    { name: "Vercel / Cloud Deploy", level: 85 },
    { name: "Infrastructure Design", level: 65 },
    { name: "Observability", level: 60 },
    { name: "Supabase / BaaS", level: 80 },
  ],
  ai: [
    { name: "LangGraph / Agents", level: 85 },
    { name: "RAG Pipelines", level: 80 },
    { name: "Prompt Engineering", level: 82 },
    { name: "FinBERT / NLP", level: 75 },
    { name: "YOLOv8 / CV", level: 70 },
    { name: "LLM Integration", level: 85 },
    { name: "ChromaDB / Vector", level: 75 },
    { name: "Agent Orchestration", level: 80 },
  ],
  web3: [
    { name: "Smart Contracts", level: 50 },
    { name: "Ethereum Basics", level: 55 },
    { name: "On-Chain Design", level: 50 },
    { name: "Hybrid Architecture", level: 60 },
    { name: "Decentralization Trade-offs", level: 55 },
    { name: "Token Economics", level: 40 },
  ],
};

interface SkillsSectionProps {
  domain: DomainId;
}

export default function SkillsSection({ domain }: SkillsSectionProps) {
  const skills = SKILLS_DATA[domain];

  if (!skills || skills.length === 0) return null;

  return (
    <section className="py-20 px-6" data-domain={domain}>
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-foreground mb-3">Skills & Expertise</h2>
          <p className="text-base max-w-xl mx-auto">
            Technologies and concepts I work with in this domain.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">
                  {skill.name}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--domain-primary)" }}
                >
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-surface-light overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, var(--domain-primary), var(--domain-secondary))`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: index * 0.08 + 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
