"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function HackathonsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="hackathons" className="hackathons-section">
      <div className="hackathons-inner">
        {/* Section label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label-line" />
          <span className="section-label-text">Hackathons</span>
        </motion.div>

        <motion.h2
          className="hackathons-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Build fast. Break things. <span className="text-accent">Ship it.</span>
        </motion.h2>

        <motion.p
          className="hackathons-subtext"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          Hackathons are where I thrive under pressure — rapid prototyping,
          creative problem solving, and shipping under tight deadlines.
          Details and photos coming soon.
        </motion.p>

        {/* Placeholder timeline */}
        <div className="hackathons-timeline">
          {HACKATHON_PLACEHOLDERS.map((hack, i) => (
            <motion.div
              key={hack.name}
              className="hackathon-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="hackathon-card-dot" />
              <div className="hackathon-card-content">
                <span className="hackathon-date">{hack.date}</span>
                <h3 className="hackathon-name">{hack.name}</h3>
                <p className="hackathon-desc">{hack.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HACKATHON_PLACEHOLDERS = [
  {
    name: "Hackathon 1",
    date: "Coming Soon",
    description: "Share your hackathon experiences — project, team, outcome, and what you learned.",
  },
  {
    name: "Hackathon 2",
    date: "Coming Soon",
    description: "Add your hackathon details with photos and context for a rich showcase.",
  },
];
