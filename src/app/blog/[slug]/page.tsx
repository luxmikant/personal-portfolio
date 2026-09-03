import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/Blog/BlogArticle";
import ReadingProgress from "@/components/Blog/ReadingProgress";
import ShareButtons from "@/components/Blog/ShareButtons";
import NewsletterCard from "@/components/Newsletter/NewsletterCard";
import { blogPosts, findPost } from "@/content/blogs";
import { getPostBySlug } from "@/utils/storage";
import MarkdownRenderer from "@/components/Blog/MarkdownRenderer";
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
  if (post) {
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

  const customPost = getPostBySlug(slug);
  if (customPost) {
    return {
      title: `${customPost.title} | ${SITE_NAME}`,
      description: customPost.description,
      alternates: { canonical: `/blog/${customPost.slug}` },
      openGraph: {
        title: customPost.title,
        description: customPost.description,
        url: `/blog/${customPost.slug}`,
        type: "article",
      },
    };
  }

  return {};
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticPost = findPost(slug);
  const customPost = !staticPost ? getPostBySlug(slug) : undefined;

  if (!staticPost && !customPost) notFound();

  const title = staticPost ? staticPost.title : customPost!.title;

  return (
    <div className="blog-post-page">
      {/* Top reading progress line */}
      <ReadingProgress />

      <div className="px-6 pt-28 pb-20">
        <div className="mx-auto w-full max-w-2xl mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1.5"
          >
            <span>←</span>
            <span>Back to blog</span>
          </Link>

          <ShareButtons title={title} />
        </div>

        {staticPost ? (
          <BlogArticle post={staticPost} />
        ) : (
          <article className="mx-auto w-full max-w-2xl">
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[var(--surface-light)] px-3 py-1 text-xs font-medium text-[var(--accent-primary)]">
                  {customPost!.readTime}
                </span>
                <time className="text-sm text-[var(--muted)]">
                  {customPost!.publishedAt}
                </time>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                {customPost!.title}
              </h1>
              <p className="mt-4 text-base leading-[1.7] text-[var(--muted)]">
                {customPost!.description}
              </p>
            </header>
            <MarkdownRenderer content={customPost!.content} />
          </article>
        )}

        {/* Newsletter subscription card */}
        <div className="mx-auto mt-14 max-w-2xl">
          <NewsletterCard
            title="Enjoyed this article?"
            description="Subscribe to get notified as soon as the next deep dive or engineering note is published. Stored safely, zero spam."
            source={`article_${slug}`}
          />
        </div>

        <footer className="mx-auto mt-12 w-full max-w-2xl border-t border-[var(--border)] pt-8">
          <p className="text-sm text-[var(--muted)]">
            Written with care by{" "}
            <a
              href={SITE_URL}
              className="text-[var(--accent-primary)] underline-offset-4 hover:underline"
            >
              Luxmikant
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
