import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/content/blogs";
import { SITE_NAME, SITE_URL } from "@/utils/siteConfig";
import NewsletterCard from "@/components/Newsletter/NewsletterCard";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description:
    "Deep dives on agentic AI, context engineering, and the systems behind coding agents.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Deep dives on agentic AI, context engineering, and the systems behind coding agents.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pt-28 pb-20">
      {/* Back to home */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1.5"
        >
          <span>←</span>
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-primary)]/20 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
            Writing & Architecture
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
          Blog
        </h1>
        <p className="mt-3 text-base leading-[1.7] text-[var(--muted)] max-w-xl">
          Notes on the systems I build and study — agent harnesses, context
          engines, and developer tooling.
        </p>

        {/* Quick action: Studio / Admin */}
        <div className="flex items-center gap-3 mt-6">
          <Link href="/blog/publish" className="blog-studio-btn">
            <span>✍️ Write New Post</span>
          </Link>
          <Link href="/admin/subscribers" className="blog-admin-link">
            <span>📬 Newsletter Dispatch</span>
          </Link>
        </div>
      </header>

      {/* Blog Posts List */}
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="mb-3 flex items-center gap-3 text-xs text-[var(--muted)]">
              <span className="px-2 py-0.5 rounded bg-[var(--surface-light)] border border-[var(--border)] font-medium text-[var(--accent-primary)]">
                {post.readingTime}
              </span>
              <span aria-hidden>•</span>
              <time dateTime={post.dateISO}>{post.date}</time>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent-primary)] transition-colors">
              {post.title}
            </h2>
            <p className="mt-3 text-sm leading-[1.7] text-[var(--muted)]">
              {post.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Deep Dive →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <NewsletterCard
          title="Subscribe to the Dispatch"
          description="Get notified as soon as new architecture breakdowns, agent systems, or engineering notes are published."
          source="blog_index"
        />
      </div>

      <p className="mt-12 text-center text-xs text-[var(--muted)]">
        Read the live portfolio projects on{" "}
        <a
          href={SITE_URL}
          className="text-[var(--accent-primary)] underline-offset-4 hover:underline"
        >
          luxmikant.dev
        </a>
      </p>
    </div>
  );
}
