"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "@/utils/projectData";
import type { Project } from "@/utils/projectData";

const DOMAIN_LABELS: Record<string, string> = {
  backend: "Backend",
  cloud: "Cloud-Native",
  ai: "AI / ML",
  web3: "Web3",
  frontend: "Frontend",
};

// Alternating warm tones for the card stack
const CARD_BG = [
  "#ffffff",
  "#faf8f5",
  "#ffffff",
  "#f5f3ef",
  "#ffffff",
  "#faf8f5",
  "#f5f3ef",
];

function StickyCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  // Trigger when the card has scrolled into sticky position
  const isInView = useInView(contentRef, { once: false, margin: "0px 0px -15% 0px" });

  return (
    <div
      className="sticky-card"
      style={{
        zIndex: index + 1,
        backgroundColor: CARD_BG[index % CARD_BG.length],
      }}
    >
      <div ref={contentRef} className="sticky-card-inner">
        {/* LEFT — text content */}
        <div className="sticky-card-left">
          {/* Meta row */}
          <motion.div
            className="sticky-card-meta"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="sticky-card-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="sticky-card-divider">—</span>
            <span className="sticky-card-domain">
              {DOMAIN_LABELS[project.domain] ?? project.domain}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="sticky-card-title"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="sticky-card-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.description}
          </motion.p>

          {/* Highlights */}
          <motion.ul
            className="sticky-card-highlights"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
          >
            {project.highlights.slice(0, 3).map((h) => (
              <motion.li
                key={h}
                className="sticky-highlight-item"
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { ease: [0.16, 1, 0.3, 1], duration: 0.5 },
                  },
                }}
              >
                <span className="sticky-highlight-dot">▸</span>
                {h}
              </motion.li>
            ))}
          </motion.ul>

          {/* Tech pills */}
          <motion.div
            className="sticky-card-tech"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {project.techStack.slice(0, 5).map((t) => (
              <span key={t} className="sticky-tech-pill">
                {t}
              </span>
            ))}
          </motion.div>

          {/* Links */}
          {(project.liveUrl || project.github) && (
            <motion.div
              className="sticky-card-links"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
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
            </motion.div>
          )}
        </div>

        {/* RIGHT — media */}
        <motion.div
          className="sticky-card-right"
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={
            isInView
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: 40, scale: 0.96 }
          }
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sticky-media-frame">
            {/* Browser chrome bar */}
            <div className="sticky-media-chrome">
              <span className="chrome-dot red" />
              <span className="chrome-dot yellow" />
              <span className="chrome-dot green" />
              <span className="chrome-url">
                {project.liveUrl
                  ? project.liveUrl.replace(/^https?:\/\//, "")
                  : project.github
                  ? project.github.replace("https://github.com/", "github.com/")
                  : project.title.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>

            {/* Content */}
            <div className="sticky-media-body">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="sticky-media-asset"
                />
              ) : project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="sticky-media-asset"
                />
              ) : (
                <div className="sticky-media-fallback">
                  <span className="sticky-media-fallback-glyph">♞</span>
                  <span className="sticky-media-fallback-label">
                    {project.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom progress bar */}
      <div className="sticky-card-progress">
        {PROJECTS.map((_, pi) => (
          <span
            key={pi}
            className={`sticky-progress-dot ${pi === index ? "active" : pi < index ? "done" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const introRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { once: true, margin: "-80px" });

  return (
    <section id="projects">
      {/* ── Intro block (normal flow, scrolls away) ── */}
      <div ref={introRef} className="sticky-projects-intro">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={introInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label-line" />
          <span className="section-label-text">Projects</span>
        </motion.div>

        <motion.h2
          className="projects-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          My interest lies in the{" "}
          <span className="text-accent">core domain</span> — I am relentless
          and want to do work in the real world.
        </motion.h2>

        <motion.p
          className="projects-subtext"
          initial={{ opacity: 0, y: 16 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Scroll through each project. Each reflects how I think, build, and
          ship.
        </motion.p>

        <motion.div
          className="sticky-scroll-cue"
          initial={{ opacity: 0 }}
          animate={introInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          <span>scroll to explore</span>
        </motion.div>
      </div>

      {/* ── Sticky stack ── */}
      <div className="sticky-stack">
        {PROJECTS.map((project, i) => (
          <StickyCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
