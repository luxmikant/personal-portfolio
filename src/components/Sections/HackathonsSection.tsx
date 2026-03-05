"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Hackathon {
  organizer: string;
  badge: string;          // short emoji or icon
  event: string;          // full event name
  project: string;        // what you built
  description: string;
  devpost: string;
  tags: string[];
  year: string;
  featured?: boolean;
}

const HACKATHONS: Hackathon[] = [
  {
    organizer: "Atlassian",
    badge: "⚡",
    event: "Codegeist 2025: Atlassian Williams Racing Edition",
    project: "ExpertMatch",
    description:
      "Maps team expertise and routes design reviews to optimal reviewers — cutting review cycles by 60% while improving code quality. Seamlessly integrates with Confluence, Jira, and Slack.",
    devpost: "https://devpost.com/software/expertmatch?ref_content=my-projects-tab&ref_feature=my_projects",
    tags: ["Forge", "Jira", "Confluence", "Slack", "AI Routing"],
    year: "2025",
    featured: true,
  },
  {
    organizer: "Tableau",
    badge: "📊",
    event: "Tableau Hackathon",
    project: "VitalFlow — AI-Agentic Hospital Command Center",
    description:
      "A closed-loop, Agentic Command Center that bridges the gap between Tableau Analytics and Salesforce Operations — turning data into autonomous clinical action.",
    devpost: "https://devpost.com/software/vitalflow-the-ai-agentic-hospital-command-center",
    tags: ["Tableau", "Salesforce", "AI Agents", "Healthcare", "Analytics"],
    year: "2025",
    featured: true,
  },
];

function HackathonCard({ hack, index }: { hack: Hackathon; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      className={`hack-card ${hack.featured ? "hack-card--featured" : ""}`}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      {/* Animated gradient border line */}
      <div className="hack-card-bar" />

      {/* Top row */}
      <div className="hack-card-top">
        <span className="hack-badge">{hack.badge}</span>
        <div className="hack-meta">
          <span className="hack-organizer">{hack.organizer}</span>
          <span className="hack-year">{hack.year}</span>
        </div>
        {hack.featured && (
          <motion.span
            className="hack-featured-pill"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.18 + 0.3 }}
          >
            ★ Featured
          </motion.span>
        )}
      </div>

      {/* Event name */}
      <p className="hack-event">{hack.event}</p>

      {/* Project title */}
      <motion.h3
        className="hack-project"
        initial={{ opacity: 0, x: -14 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.18 + 0.1, duration: 0.55 }}
      >
        {hack.project}
      </motion.h3>

      {/* Description */}
      <p className="hack-desc">{hack.description}</p>

      {/* Tags */}
      <motion.div
        className="hack-tags"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: index * 0.18 + 0.25 } },
        }}
      >
        {hack.tags.map((tag) => (
          <motion.span
            key={tag}
            className="hack-tag"
            variants={{
              hidden: { opacity: 0, scale: 0.75 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* Devpost link */}
      <div className="hack-footer">
        <a
          href={hack.devpost}
          target="_blank"
          rel="noopener noreferrer"
          className="hack-devpost-link"
        >
          <span className="hack-devpost-icon">⬡</span>
          View on Devpost ↗
        </a>
      </div>
    </motion.div>
  );
}

export default function HackathonsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="hackathons" className="hackathons-section">
      {/* Background texture */}
      <div className="hackathons-bg-grid" aria-hidden />

      <div className="hackathons-inner">
        {/* Label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label-line" />
          <span className="section-label-text">Hackathons</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="hackathons-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Build fast. Break things.{" "}
          <span className="text-accent">Ship it.</span>
        </motion.h2>

        <motion.p
          className="hackathons-subtext"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
        >
          Hackathons are where I thrive under pressure — rapid prototyping,
          creative problem solving, and shipping real products within hours.
        </motion.p>

        {/* Stat row */}
        <motion.div
          className="hackathons-stats"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
        >
          {[
            { n: `${HACKATHONS.length}`, label: "Hackathons" },
            { n: `${HACKATHONS.filter((h) => h.featured).length}`, label: "Featured Projects" },
            { n: "2", label: "Top Brands" },
          ].map(({ n, label }) => (
            <div key={label} className="hackathons-stat">
              <span className="hackathons-stat-n">{n}</span>
              <span className="hackathons-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="hackathons-grid">
          {HACKATHONS.map((hack, i) => (
            <HackathonCard key={hack.project} hack={hack} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
