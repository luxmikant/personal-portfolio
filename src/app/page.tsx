"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DomainHero from "@/components/Sections/DomainHero";
import Loader from "@/components/Loader/Loader";
import { DOMAINS, DOMAIN_ORDER } from "@/utils/domainConfig";
import Link from "next/link";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Skip loader on subsequent visits in same session
    const hasVisited = sessionStorage.getItem("portfolio_visited");
    if (hasVisited) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setShowContent(true);
    sessionStorage.setItem("portfolio_visited", "true");
  };

  return (
    <div data-domain="landing">
      {/* Initial Loader */}
      <Loader
        domain="landing"
        isLoading={isLoading}
        onComplete={handleLoaderComplete}
        duration={2500}
      />

      {/* Landing Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <DomainHero domain="landing" />

          {/* Domain Overview Cards */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-center text-foreground mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                My Domains
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DOMAIN_ORDER.filter((id) => id !== "landing").map(
                  (id, index) => {
                    const domain = DOMAINS[id];
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{
                          y: -8,
                          transition: { duration: 0.3 },
                        }}
                      >
                        <Link href={domain.route} className="block">
                          <div className="glass rounded-2xl p-6 h-full transition-all duration-300 group">
                            {/* Glow dot */}
                            <div
                              className="w-3 h-3 rounded-full mb-4"
                              style={{
                                background: domain.colors.primary,
                                boxShadow: `0 0 12px ${domain.colors.glow}`,
                              }}
                            />

                            <h3
                              className="text-lg font-bold mb-2 transition-colors"
                              style={{ color: "var(--foreground)" }}
                            >
                              {domain.title}
                            </h3>

                            <p className="text-sm leading-relaxed">
                              {domain.subtitle}
                            </p>

                            <div
                              className="mt-4 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: domain.colors.primary }}
                            >
                              Explore →
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>
          </section>

          {/* Footer / Contact CTA */}
          <section
            className="py-20 px-6 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <motion.h2
                className="text-foreground mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Let&apos;s Build Something
              </motion.h2>
              <motion.p
                className="text-base mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Interested in backend systems, cloud infrastructure, AI agents,
                or blockchain? Let&apos;s connect.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="https://github.com/luxmikant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-sm font-medium rounded-lg border transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                >
                  GitHub ↗
                </a>
                <a
                  href="mailto:contact@luxmikant.dev"
                  className="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: "var(--domain-primary)",
                    color: "#fff",
                  }}
                >
                  Get in Touch
                </a>
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
}
