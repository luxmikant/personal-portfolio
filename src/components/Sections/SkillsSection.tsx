"use client";

import { motion } from "framer-motion";
import { DomainId, DOMAINS, DOMAIN_ORDER } from "@/utils/domainConfig";
import { fadeInUp, staggerContainer, parallaxReveal } from "@/utils/animationConfig";

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

export default function SkillsSection() {
  const domains = DOMAIN_ORDER.filter(
    (id) => id !== "landing" && SKILLS_DATA[id].length > 0
  );

  return (
    <section id="skills" className="py-28 px-6" data-domain="landing">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-xs font-mono uppercase tracking-widest mb-4"
            style={{ color: "var(--domain-primary)" }}
          >
            Expertise
          </motion.span>
          <motion.h2 variants={parallaxReveal} className="text-foreground mb-3">
            Skills & Technologies
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-base max-w-xl mx-auto">
            Technologies I work with across my domains.
          </motion.p>
        </motion.div>

        {/* Domain skill groups */}
        <div className="space-y-16">
          {domains.map((domainId) => {
            const skills = SKILLS_DATA[domainId];
            const config = DOMAINS[domainId];

            return (
              <motion.div
                key={domainId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                data-domain={domainId}
              >
                {/* Domain label */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: config.colors.primary,
                      boxShadow: `0 0 6px ${config.colors.glow}`,
                    }}
                  />
                  <h3
                    className="text-sm font-mono uppercase tracking-widest"
                    style={{ color: config.colors.primary }}
                  >
                    {config.title}
                  </h3>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group"
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span
                          className="text-xs font-mono"
                          style={{ color: config.colors.primary }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-light)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${config.colors.primary}, ${config.colors.secondary})`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: index * 0.05 + 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  );
}
