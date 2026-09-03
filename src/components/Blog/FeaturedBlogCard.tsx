"use client";

import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";

interface FeaturedBlogCardProps {
  post: BlogPost;
}

export default function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="featured-blog-card group"
    >
      <Link href={`/blog/${post.slug}`} className="featured-blog-inner">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="featured-badge">
                <span className="featured-badge-dot" />
                Featured Dispatch
              </span>
              <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                <span>{post.publishedAt}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-primary)]">
                {post.category}
              </span>
            </div>

            <h2 className="featured-blog-title group-hover:text-[var(--accent-primary)] transition-colors">
              {post.title}
            </h2>

            <p className="featured-blog-description">{post.description}</p>
          </div>

          <div className="featured-blog-footer">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag-pill">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="featured-blog-cta">
              <span>Read Full Article</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
