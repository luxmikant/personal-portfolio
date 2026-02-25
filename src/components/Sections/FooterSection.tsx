"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/utils/animationConfig";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/luxmikant", icon: "↗" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/luxmikant",
    icon: "↗",
  },
  { label: "Email", href: "mailto:contact@luxmikant.dev", icon: "✉" },
];

// Replace with your actual Typeform URL
const TYPEFORM_URL = "https://form.typeform.com/to/YOUR_FORM_ID";

export default function FooterSection() {
  return (
    <footer
      id="contact"
      className="relative py-24 px-6"
      style={{ background: "var(--surface)" }}
      data-domain="landing"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Heading */}
          <motion.h2 variants={fadeInUp} className="text-foreground mb-4">
            Let&apos;s Build Something
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-base max-w-lg mx-auto mb-10"
          >
            Interested in backend systems, cloud infrastructure, AI agents, or
            blockchain? I&apos;d love to hear from you.
          </motion.p>

          {/* Typeform CTA */}
          <motion.div variants={fadeInUp} className="mb-12">
            <a
              href={TYPEFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, var(--domain-primary), var(--domain-secondary))",
                boxShadow: "0 4px 24px var(--domain-glow)",
              }}
            >
              Send Me a Message
              <span className="text-lg">→</span>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-sm font-medium rounded-lg border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                {link.label} {link.icon}
              </a>
            ))}
          </motion.div>

          {/* Bottom credit */}
          <motion.p
            variants={fadeInUp}
            className="text-xs font-mono"
            style={{ color: "var(--muted)" }}
          >
            © {new Date().getFullYear()} Luxmikant — Crafted with Next.js,
            Three.js & Framer Motion
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
