"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ContentReveal from "@/components/Effects/ContentReveal";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="projects-inner">
        {/* Section label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label-line" />
          <span className="section-label-text">Projects</span>
        </motion.div>

        {/* Intro */}
        <ContentReveal delay={0.2}>
          <div className="projects-intro">
            <h2 className="projects-heading">
              My interest lies in the <span className="text-accent">core domain</span> —
              I am relentless and want to do work in the real world.
            </h2>
            <p className="projects-subtext">
              If someone understands me from the crux and suits the journey,
              let&apos;s connect. Each project below reflects how I think,
              build, and ship.
            </p>
          </div>
        </ContentReveal>

        {/* Project cards placeholder — will be populated with real data */}
        <div className="projects-grid">
          {PLACEHOLDER_PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="project-card-header">
                <span className="project-card-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="project-card-tag">{project.tag}</span>
              </div>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.description}</p>
              <div className="project-card-tech">
                {project.tech.map((t) => (
                  <span key={t} className="project-tech-pill">
                    {t}
                  </span>
                ))}
              </div>
              {/* Chess knight hover indicator */}
              <motion.div
                className="project-card-knight"
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{ opacity: 0.2, scale: 1     }}
              >
                ♞
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="projects-cta-note"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : {}}
          transition={{ delay: 1 }}
        >
          More projects & context coming soon — provide your real project data and I&apos;ll showcase them here.
        </motion.p>
      </div>
    </section>
  );
}

const PLACEHOLDER_PROJECTS = [
  {
    title: "Scalable Event Pipeline",
    tag: "Backend",
    description:
      "High-throughput event streaming system built with Go and Apache Kafka. Handles millions of events with clean architecture.",
    tech: ["Go", "Kafka", "PostgreSQL", "Docker"],
  },
  {
    title: "Real-Time Collaboration Engine",
    tag: "WebSockets",
    description:
      "WebSocket-powered real-time system for live collaboration. Bi-directional data flow with minimal latency.",
    tech: ["Node.js", "WebSocket", "Redis", "React"],
  },
  {
    title: "Cloud-Native Deployment Platform",
    tag: "Cloud",
    description:
      "Kubernetes-based platform with automated CI/CD, observability, and self-healing infrastructure.",
    tech: ["Kubernetes", "Terraform", "Prometheus", "ArgoCD"],
  },
  {
    title: "AI-Powered Dev Tooling",
    tag: "AI",
    description:
      "LLM-integrated developer tools — RAG pipelines, code review agents, and intelligent documentation.",
    tech: ["Python", "LangChain", "OpenAI", "FastAPI"],
  },
];
