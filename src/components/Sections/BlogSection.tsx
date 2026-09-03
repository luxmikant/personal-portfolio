"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { blogPosts } from "@/content/blogs";

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const featuredPost = blogPosts[0];

  return (
    <section ref={sectionRef} id="blog" className="section-padding bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label-line" />
          <span className="section-label-text">Writing & Architecture Logs</span>
        </motion.div>

        {/* Heading + Subtitle + CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Featured <span className="gradient-text">Blog & Notes</span>
            </motion.h2>
            <motion.p
              className="mt-3 text-base text-[var(--muted)] max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Notes on the systems I build and study — agent harnesses, context engines, and developer tooling.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <Link
              href="/blog"
              className="hero-cta-secondary !py-2.5 !px-5 text-sm inline-flex items-center gap-2"
            >
              <span>Explore All Posts</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 shadow-sm hover:border-[var(--accent-primary)] hover:shadow-md transition-all duration-300 group"
          >
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                  Latest Deep Dive
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[var(--muted)]">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--surface-light)] border border-[var(--border)] font-medium text-[var(--accent-primary)]">
                  {featuredPost.readingTime}
                </span>
                <span>•</span>
                <time dateTime={featuredPost.dateISO}>{featuredPost.date}</time>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug mb-4">
              <Link href={`/blog/${featuredPost.slug}`}>
                {featuredPost.title}
              </Link>
            </h3>

            {/* Excerpt */}
            <p className="text-base text-[var(--muted)] leading-relaxed mb-6 max-w-3xl">
              {featuredPost.excerpt}
            </p>

            {/* Tags & Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
              <div className="flex flex-wrap gap-2">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-md bg-[var(--surface-light)] border border-[var(--border)] text-[var(--muted)] font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="hero-cta-primary !py-2.5 !px-5 text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap self-start sm:self-auto"
              >
                <span>Read Full Article</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
