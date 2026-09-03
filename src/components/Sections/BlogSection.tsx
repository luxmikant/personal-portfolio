"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/Blog/BlogCard";

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const latestPosts = posts.slice(0, 3);

  return (
    <section ref={sectionRef} id="blog" className="section-padding bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
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

        {/* Heading + Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Recent <span className="gradient-text">Dispatches</span>
            </motion.h2>
            <motion.p
              className="mt-3 text-base text-[var(--muted)] max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Deep dives into backend microservices, real-time AI agents, and reflections from building software amidst the Himalayas.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <Link href="/blog" className="hero-cta-secondary !py-2 !px-4 text-sm inline-flex items-center gap-2">
              <span>View All Articles</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
