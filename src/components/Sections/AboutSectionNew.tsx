"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TRAITS = [
  {
    icon: "♟",
    label: "Chess Thinker",
    desc: "Strategic by instinct, patient under pressure.",
    rotate: -2,
  },
  {
    icon: "⛰",
    label: "Mountain Native",
    desc: "Raised in the Himalayas, grounded in perspective.",
    rotate: 1.5,
  },
  {
    icon: "⚙",
    label: "System Builder",
    desc: "Full-stack ownership from schema to deployment.",
    rotate: -1,
  },
  {
    icon: "🔁",
    label: "Relentless Learner",
    desc: "Pick the right tool. Master it. Push it further.",
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
          {/* Left — Personal Story */}
          <motion.div
            className="about-story"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="about-heading">
              Born in <span className="text-accent">2003</span>,
              <br />
              a <span className="text-accent">Kullu</span> (Phari) native.
            </h2>

            <p className="about-para">
              With a love for chess, family, friends, tech and innovation. As a
              passionate developer with a keen eye for detail and a robust
              background in business and underlying technology, I thrive on
              crafting innovative software solutions.
            </p>

            <p className="about-para">
              Over the academics, I have honed my expertise and hands-on
              experience in JavaScript and a variety of modern technologies,
              enabling me to spearhead complex projects and learn from
              experienced developers. With a dedication to continuous learning
              and a commitment to excellence, I transform ideas into scalable,
              efficient, and user-friendly applications.
            </p>

            <p className="about-para about-para-highlight">
              I don&apos;t just pick up tools — I find the right one for the job,
              master it deeply, and push it further than expected. I take
              ownership. Every project I touch, I treat as my own.
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

            {/* Philosophy quote */}
            <motion.blockquote
              className="about-quote"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.05 }}
            >
              <span className="quote-mark">&ldquo;</span>
              I utilize the need of the tool as I go on, find out it&apos;s
              the perfect one, and keep mastering it — on and on.
              <span className="quote-mark">&rdquo;</span>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
