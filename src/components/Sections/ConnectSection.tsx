"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="connect" className="connect-section">
      {/* ── Light background only ── */}
      <div className="connect-top" style={{ paddingBottom: '6rem' }}>
        <div className="connect-inner">
          {/* Section label */}
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label-line" />
            <span className="section-label-text">Connect</span>
          </motion.div>

          {/* Heading + Himalaya quote */}
          <motion.div
            className="connect-message"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="connect-heading">If I work with you...</h2>

            <p className="connect-balance-line">I thrive balanced inside me.</p>

            <blockquote className="connect-himalaya-quote">
              You will not only get my expertise that I learn with your company
              and while side by side companionship, you will also get to know
              about the hidden places of the Himalayas that is something close
              to me, and the locals.
            </blockquote>
          </motion.div>

          {/* Contact links directly under the quote */}
          <motion.div
            className="connect-links"
            style={{ marginTop: '3rem', borderTop: 'none', paddingTop: 0 }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a
              href="https://github.com/luxmikant"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-link"
              style={{ color: 'var(--foreground-primary)' }}
            >
              <span className="connect-link-label">GitHub</span>
              <span className="connect-link-arrow">↗</span>
            </a>
            <a
              href="https://linkedin.com/in/luxmikant"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-link"
              style={{ color: 'var(--foreground-primary)' }}
            >
              <span className="connect-link-label">LinkedIn</span>
              <span className="connect-link-arrow">↗</span>
            </a>
            <a
              href="mailto:kantgarg2254@gmail.com"
              className="connect-link"
              style={{ color: 'var(--foreground-primary)' }}
            >
              <span className="connect-link-label">Email</span>
              <span className="connect-link-arrow">✉</span>
            </a>
            <a
              href="https://github.com/luxmikant/res/blob/main/Ai_intern_VIT_LUXMIKANT_7018209392.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-link"
              style={{ color: 'var(--foreground-primary)' }}
            >
              <span className="connect-link-label">Download CV</span>
              <span className="connect-link-arrow">↗</span>
            </a>
          </motion.div>

          {/* Credit */}
          <motion.p
            className="connect-credit"
            style={{ color: 'var(--foreground-secondary)', marginTop: '4rem', textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : {}}
            transition={{ delay: 0.6 }}
          >
            © {new Date().getFullYear()} Luxmikant — Crafted with ownership and care.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
