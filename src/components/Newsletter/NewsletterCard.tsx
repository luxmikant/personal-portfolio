"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterCardProps {
  title?: string;
  description?: string;
  source?: string;
}

export default function NewsletterCard({
  title = "Subscribe to the Dispatch",
  description = "Get notified when new engineering deep dives, architecture snapshots, or Himalayan notes are published.",
  source = "blog_card",
}: NewsletterCardProps) {
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
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="newsletter-compact-card">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
        <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--accent-primary)]">
          Stay Updated
        </span>
      </div>

      <h3 className="text-lg font-bold text-[var(--foreground)] mb-1.5">{title}</h3>
      <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="your.email@company.com"
          required
          disabled={status === "loading" || status === "success"}
          className="newsletter-compact-input"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="newsletter-compact-btn"
        >
          {status === "loading" ? "..." : status === "success" ? "Subscribed!" : "Subscribe"}
        </button>
      </form>

      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`text-xs mt-2.5 ${
              status === "success" ? "text-emerald-600" : "text-rose-500"
            }`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
