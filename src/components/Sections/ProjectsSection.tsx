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

        {/* Real project cards */}
        <div className="projects-grid" style={{ perspective: 1200 }}>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 50, rotateX: 10, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover="hover"
              variants={{
                initial: { y: 0 },
                hover: { y: -8, transition: { duration: 0.4, ease: "easeOut" } }
              }}
            >
              {/* Optional Background Media */}
              {(project.image || project.video) && (
                <motion.div 
                  className="project-card-media"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.05 }
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="project-card-media-overlay" />
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="project-card-video"
                    />
                  ) : project.image ? (
                    <img 
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="project-card-img"
                    />
                  ) : null}
                </motion.div>
              )}

              <div className="project-card-content">
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
                      <span className="project-highlight-dot">▸</span>
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
                        Live ↗
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link project-link-github"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Chess knight hover indicator */}
              <motion.div
                className="project-card-knight"
                initial="initial"
                variants={{
                  initial: { opacity: 0, scale: 0.5 },
                  hover: { opacity: 0.2, scale: 1 }
                }}
              >
                ♞
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
