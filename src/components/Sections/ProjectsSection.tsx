"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ContentReveal from "@/components/Effects/ContentReveal";
import { PROJECTS } from "@/utils/projectData";

const DOMAIN_LABELS: Record<string, string> = {
  backend: "Backend",
  cloud: "Cloud-Native",
  ai: "AI / ML",
  web3: "Web3",
  frontend: "Frontend",
};

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
              My interest lies in the <span className="text-accent">core domain</span> \u2014
              I am relentless and want to do work in the real world.
            </h2>
            <p className="projects-subtext">
              If someone understands me from the crux and suits the journey,
              let&apos;s connect. Each project below reflects how I think,
              build, and ship.
            </p>
          </div>
        </ContentReveal>

        {/* Real project cards */}
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="project-card-header">
                <span className="project-card-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="project-card-tag">
                  {DOMAIN_LABELS[project.domain] ?? project.domain}
                </span>
              </div>

              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.description}</p>

              {/* Top 3 highlights */}
              <ul className="project-card-highlights">
                {project.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="project-highlight-item">
                    <span className="project-highlight-dot">&#9658;</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="project-card-tech">
                {project.techStack.map((t) => (
                  <span key={t} className="project-tech-pill">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(project.liveUrl || project.github) && (
                <div className="project-card-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-live"
                    >
                      Live &#x2197;
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-github"
                    >
                      GitHub &#x2197;
                    </a>
                  )}
                </div>
              )}

              {/* Chess knight hover indicator */}
              <motion.div
                className="project-card-knight"
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{ opacity: 0.2, scale: 1 }}
              >
                &#9822;
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
