import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/Blog/BlogArticle";
import { blogPosts, findPost } from "@/content/blogs";
import { SITE_NAME, SITE_URL } from "@/utils/siteConfig";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  return (
    <div className="px-6 py-20">
      <Link
        href="/blog"
        className="mx-auto mb-12 block w-full max-w-2xl text-sm text-muted underline-offset-4 hover:text-accent-deep hover:underline"
      >
        ← Back to blog
      </Link>
      <BlogArticle post={post} />
      <footer className="mx-auto mt-16 w-full max-w-2xl border-t border-border pt-8">
        <p className="text-sm text-muted">
          Written by{" "}
          <a
            href={`${SITE_URL}`}
            className="text-accent-deep underline-offset-4 hover:underline"
          >
            Luxmikant
          </a>
        </p>
      </footer>
    </div>
  );
}
