"use client";

import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/utils/animationConfig";
import { useEffect, useState } from "react";

interface FeedbackSectionProps {
  domain?: string;
}

export default function FeedbackSection({ domain }: FeedbackSectionProps) {
  const [isFormLoaded, setIsFormLoaded] = useState(false);

  useEffect(() => {
    // Load Tally form script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => setIsFormLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-20 px-6 relative overflow-hidden" data-domain={domain}>
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--domain-primary), transparent 60%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div
            className="inline-block mb-4"
            variants={scaleIn}
          >
            <span
              className="px-4 py-2 rounded-full text-sm font-mono border"
              style={{
                borderColor: "var(--domain-primary)",
                color: "var(--domain-primary)",
                background: "var(--domain-bg-accent)",
              }}
            >
              💬 Feedback
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Have thoughts? Let&apos;s connect
          </h2>
          <p className="text-base text-muted max-w-2xl mx-auto">
            Found this portfolio interesting? Have questions about my projects or want to collaborate?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Tally Form Embed */}
        <motion.div
          className="glass rounded-2xl overflow-hidden p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Replace this URL with your actual Tally form URL */}
          <iframe
            data-tally-src="https://tally.so/embed/wMRX6e?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="400"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Feedback Form"
            style={{
              border: "none",
              minHeight: "400px",
            }}
          ></iframe>

          {!isFormLoaded && (
            <div className="flex items-center justify-center py-20">
              <motion.div
                className="w-8 h-8 border-2 rounded-full"
                style={{
                  borderColor: "var(--domain-primary)",
                  borderTopColor: "transparent",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          )}
        </motion.div>

        {/* Alternative contact options */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted mb-4">Or reach out directly:</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <motion.a
              href="mailto:your.email@example.com"
              className="text-sm hover:text-domain-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📧 Email
            </motion.a>
            <motion.a
              href="https://github.com/luxmikant"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-domain-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔗 GitHub
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-domain-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💼 LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
