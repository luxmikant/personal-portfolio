"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TRAITS = [
  {
    icon: "💻",
    label: "Languages",
    desc: "TypeScript, JavaScript, Python, Go, Java.",
    rotate: -2,
  },
  {
    icon: "⚡",
    label: "Frameworks",
    desc: "Next.js, React, Node.js, Express, FastAPI.",
    rotate: 1.5,
  },
  {
    icon: "☁️",
    label: "Cloud & DevOps",
    desc: "AWS, Vercel, Docker, CI/CD pipelines.",
    rotate: -1,
  },
  {
    icon: "🧠",
    label: "Databases & AI",
    desc: "PostgreSQL, MongoDB, Supabase, LLMs.",
    rotate: 2,
  },
];

export default function AboutSectionNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-inner">
        {/* Section label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label-line" />
          <span className="section-label-text">About Me</span>
        </motion.div>

        <div className="about-grid">
          {/* Left — Job Readiness Story */}
          <motion.div
            className="about-story"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="about-heading">
              Computer Science <span className="text-accent">Graduate</span>
            </h2>

            {/* Academic Stats */}
            <div className="mb-6 p-4 rounded-lg border border-amber-200 bg-amber-50">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-sm font-semibold">
                B.Tech in Computer Science
              </span>
              <p className="mt-2 text-base font-semibold text-foreground">CGPA: 8.42</p>
            </div>

            <p className="about-para">
              As a full-stack and cloud-native engineer, I bridge the gap between elegant user interfaces and robust scalable backend architectures. I specialize in building serverless APIs, optimizing database operations, and integrating AI functionality into real-world applications.
            </p>

            <p className="about-para">
              I am actively seeking Software Engineering roles where I can leverage my proficiency in modern frameworks and cloud tools. I thrive in environments that challenge me to solve complex problems and build systems that scale efficiently.
            </p>

            <p className="about-para about-para-highlight">
              I take end-to-end ownership of my work. From designing initial database schemas to configuring CI/CD pipelines, I ensure high performance and maintainable code quality at every layer.
            </p>
          </motion.div>

          {/* Right — Trait cards (glassmorphism + slight rotations) */}
          <div className="about-traits">
            {TRAITS.map((trait, i) => (
              <motion.div
                key={trait.label}
                className="about-trait-card"
                initial={{ opacity: 0, scale: 0.88, rotate: trait.rotate * 0.4 }}
                animate={
                  isInView ? { opacity: 1, scale: 1, rotate: trait.rotate } : {}
                }
                transition={{
                  delay: 0.5 + i * 0.12,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.06,
                  rotate: 0,
                  y: -6,
                  transition: { duration: 0.22 },
                }}
              >
                <span className="trait-icon">{trait.icon}</span>
                <span className="trait-label">{trait.label}</span>
                <span className="trait-desc">{trait.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
