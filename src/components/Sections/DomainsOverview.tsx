"use client";

import { motion } from "framer-motion";
import { DOMAINS, DOMAIN_ORDER } from "@/utils/domainConfig";
import { staggerContainer, fadeInUp, scaleIn } from "@/utils/animationConfig";

export default function DomainsOverview() {
  const domains = DOMAIN_ORDER.filter((id) => id !== "landing");

  return (
    <section id="domains" className="py-24 px-6" data-domain="landing">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span
              className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest rounded-full border"
              style={{
                color: "var(--domain-primary)",
                borderColor: "var(--domain-primary)",
                background: "var(--domain-bg-accent)",
              }}
            >
              Domains
            </span>
          </motion.div>

          <motion.h2 variants={fadeInUp}>
            Four domains.{" "}
            <span className="gradient-text">One engineer.</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((id, index) => {
            const domain = DOMAINS[id];
            return (
              <motion.a
                key={id}
                href={`#${id}`}
                className="block"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  className="glass rounded-2xl p-6 h-full transition-all duration-300 group hover:shadow-lg"
                  style={{
                    borderColor: `${domain.colors.primary}15`,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full mb-4 transition-shadow duration-300"
                    style={{
                      background: domain.colors.primary,
                      boxShadow: `0 0 8px ${domain.colors.glow}`,
                    }}
                  />

                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {domain.title}
                  </h3>

                  <p className="text-sm leading-relaxed">
                    {domain.subtitle}
                  </p>

                  <div
                    className="mt-4 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: domain.colors.primary }}
                  >
                    Jump to section ↓
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}
