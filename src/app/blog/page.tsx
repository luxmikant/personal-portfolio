import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/content/blogs";
import { SITE_NAME, SITE_URL } from "@/utils/siteConfig";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: "Deep dives on agentic AI, context engineering, and the systems behind coding agents.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description: "Deep dives on agentic AI, context engineering, and the systems behind coding agents.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-20">
      <header className="mb-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-accent-primary">
          Writing
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="mt-3 text-base leading-[1.7] text-muted">
          Notes on the systems I build and study — agent harnesses, context
          engines, and developer tooling.
        </p>
      </header>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent-warm"
          >
            <div className="mb-2 flex items-center gap-3 text-sm text-muted">
              <time dateTime={post.dateISO}>{post.date}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-accent-deep">
              {post.title}
            </h2>
            <p className="mt-2 text-[15px] leading-[1.7] text-muted">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted">
        Read the live project on{" "}
        <a
          href={`${SITE_URL}`}
          className="text-accent-deep underline-offset-4 hover:underline"
        >
          the portfolio
        </a>
        .
      </p>
    </div>
  );
}
