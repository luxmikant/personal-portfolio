"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterSectionProps {
  source?: string;
}

export default function NewsletterSection({ source = "landing_page" }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "You're all set! Check your inbox for updates.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <section id="newsletter" className="newsletter-section">
      <div className="newsletter-inner">
        {/* Glow ambient circle */}
        <div className="newsletter-ambient-glow" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-primary)]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[var(--accent-primary)]">
              The Engineering Dispatch
            </span>
          </div>

          <h2 className="newsletter-heading">
            Stay Ahead in Backend Systems & AI Engineering
          </h2>

          <p className="newsletter-subheading">
            Receive concise, high-density architecture breakdowns, AI implementation patterns, and occasional quiet Himalayan notes directly to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="newsletter-input-wrap">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your personal or work email..."
                required
                className="newsletter-input"
                aria-label="Email address for newsletter"
                disabled={status === "loading" || status === "success"}
              />

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="newsletter-submit-btn"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                    </svg>
                    Joining...
                  </span>
                ) : status === "success" ? (
                  <span className="flex items-center gap-1.5 text-emerald-100">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Joined
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Subscribe
                    <span className="text-base">→</span>
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Feedback message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`newsletter-message ${
                  status === "success" ? "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-rose-600 bg-rose-500/10 border-rose-500/20"
                }`}
              >
                {status === "success" ? "✨ " : "⚠️ "}
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust reassurance */}
          <div className="newsletter-trust">
            <span>🔒 Zero spam.</span>
            <span>•</span>
            <span>Delivered whenever a meaningful article drops.</span>
            <span>•</span>
            <span>Unsubscribe anytime.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
