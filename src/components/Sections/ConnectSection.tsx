"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Data ─────────────────────────────────────────────── */
const METRICS = [
  { label: "Response Time", value: 120, suffix: "ms", desc: "avg API latency" },
  { label: "Code Quality", value: 96, suffix: "%", desc: "coverage + lint score" },
  { label: "Uptime", value: 99.9, suffix: "%", desc: "across all deployments" },
];

/* ─── Count-up hook ─────────────────────────────────────── */
function useCountUp(target: number, isActive: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const steps = 55;
    const stepMs = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.round(current * 10) / 10);
      }
    }, stepMs);
    return () => clearInterval(timer);
  }, [target, isActive, duration]);
  return count;
}

/* ─── Single metric card ─────────────────────────────────── */
function MetricCard({
  metric,
  index,
  isActive,
}: {
  metric: (typeof METRICS)[0];
  index: number;
  isActive: boolean;
}) {
  const raw = useCountUp(metric.value, isActive, 1100 + index * 180);
  const display = Number.isInteger(metric.value)
    ? Math.floor(raw).toString()
    : raw.toFixed(1);

  return (
    <motion.div
      className="metric-card"
      initial={{ opacity: 0, y: 28 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.25 + index * 0.15,
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="metric-value">
        {display}
        <span className="metric-suffix">{metric.suffix}</span>
      </div>
      <div className="metric-label">{metric.label}</div>
      <div className="metric-desc">{metric.desc}</div>
    </motion.div>
  );
}

/* ─── Mountain silhouette SVG ────────────────────────────── */
function MountainSilhouette() {
  return (
    <svg
      className="connect-mountain-svg"
      viewBox="0 0 1440 380"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Back range — farthest */}
      <path
        d="M0 380 L0 240 L110 160 L200 210 L310 100 L420 175 L530 118 L640 160 L720 30 L800 140 L900 90 L980 130 L1080 55 L1180 145 L1300 100 L1380 155 L1440 190 L1440 380 Z"
        fill="rgba(196, 149, 106, 0.07)"
      />
      {/* Mid range */}
      <path
        d="M0 380 L0 280 L160 250 L260 265 L380 215 L480 240 L580 195 L680 230 L760 170 L840 215 L940 185 L1040 220 L1140 175 L1240 230 L1360 195 L1440 240 L1440 380 Z"
        fill="rgba(196, 149, 106, 0.05)"
      />
      {/* Foreground ridge */}
      <path
        d="M0 380 L0 330 L200 310 L360 320 L520 295 L680 315 L820 285 L960 310 L1120 280 L1280 310 L1440 295 L1440 380 Z"
        fill="rgba(196, 149, 106, 0.04)"
      />
    </svg>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const metricsInView = useInView(darkRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} id="connect" className="connect-section">
      {/* ── Light top ───────────────────────────────── */}
      <div className="connect-top">
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
        </div>
      </div>

      {/* ── Dark bottom band ────────────────────────── */}
      <div className="connect-dark-band" ref={darkRef}>
        <MountainSilhouette />

        <div className="connect-inner connect-inner-dark">
          {/* Metrics intro label */}
          <motion.p
            className="metrics-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            I instrument everything I build —<br className="hide-mobile" /> from
            tracing latency to monitoring error rates.
          </motion.p>

          {/* 3 KPI cards */}
          <div className="metrics-grid">
            {METRICS.map((m, i) => (
              <MetricCard key={m.label} metric={m} index={i} isActive={metricsInView} />
            ))}
          </div>

          {/* Divider */}
          <div className="connect-dark-divider" />

          {/* Contact links */}
          <motion.div
            className="connect-links"
            initial={{ opacity: 0, y: 24 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a
              href="https://github.com/luxmikant"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-link connect-link-dark"
            >
              <span className="connect-link-label">GitHub</span>
              <span className="connect-link-arrow">↗</span>
            </a>
            <a
              href="https://linkedin.com/in/luxmikant"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-link connect-link-dark"
            >
              <span className="connect-link-label">LinkedIn</span>
              <span className="connect-link-arrow">↗</span>
            </a>
            <a
              href="mailto:contact@luxmikant.dev"
              className="connect-link connect-link-dark"
            >
              <span className="connect-link-label">Email</span>
              <span className="connect-link-arrow">✉</span>
            </a>
          </motion.div>

          {/* Credit */}
          <motion.p
            className="connect-credit"
            initial={{ opacity: 0 }}
            animate={metricsInView ? { opacity: 0.35 } : {}}
            transition={{ delay: 1.0 }}
          >
            © {new Date().getFullYear()} Luxmikant — Crafted with ownership and care.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
