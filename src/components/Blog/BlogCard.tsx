"use client";

import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="blog-card group"
    >
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-meta">
          <span className="blog-card-category">{post.category}</span>
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <h3 className="blog-card-title group-hover:text-[var(--accent-primary)] transition-colors">
          {post.title}
        </h3>

        <p className="blog-card-description">{post.description}</p>

        <div className="blog-card-footer">
          <div className="blog-card-tags">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="blog-tag-pill">
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-[11px] text-[var(--muted)]">
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          <span className="blog-read-more">
            Read
            <span className="blog-arrow group-hover:translate-x-1 transition-transform">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
