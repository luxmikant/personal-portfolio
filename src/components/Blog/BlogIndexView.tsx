"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost, BlogCategory } from "@/types/blog";
import { BLOG_CATEGORIES } from "@/utils/blogData";
import BlogCard from "@/components/Blog/BlogCard";
import FeaturedBlogCard from "@/components/Blog/FeaturedBlogCard";
import NewsletterCard from "@/components/Newsletter/NewsletterCard";

interface BlogIndexViewProps {
  initialPosts: BlogPost[];
}

export default function BlogIndexView({ initialPosts }: BlogIndexViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags.forEach((t) => tags.add(t));
    });
    return Array.from(tags);
  }, [initialPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }
      // Query search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesDesc = post.description.toLowerCase().includes(query);
        const matchesTag = post.tags.some((t) => t.toLowerCase().includes(query));
        const matchesContent = post.content.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTag && !matchesContent) {
          return false;
        }
      }
      return true;
    });
  }, [initialPosts, selectedCategory, selectedTag, searchQuery]);

  // Find featured post if not filtering
  const featuredPost = useMemo(() => {
    if (selectedCategory === "All" && !selectedTag && !searchQuery.trim()) {
      return initialPosts.find((p) => p.featured) || initialPosts[0];
    }
    return null;
  }, [initialPosts, selectedCategory, selectedTag, searchQuery]);

  const regularPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedTag(null);
    setSearchQuery("");
  };

  return (
    <div className="blog-page-container">
      {/* Top Banner / Hero */}
      <header className="blog-hero-section">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-primary)]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
              Architecture & Insights
            </span>
          </div>

          <h1 className="blog-hero-title">
            The Engineering <span className="gradient-text">Log</span>
          </h1>

          <p className="blog-hero-subtitle">
            Field notes on high-performance backend systems, AI agent architectures, generative user interfaces, and the philosophy of building software from the Himalayas.
          </p>

          {/* Quick links: Studio & Admin */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <Link href="/blog/publish" className="blog-studio-btn">
              <span>✍️ Write New Article</span>
            </Link>
            <Link href="/admin/subscribers" className="blog-admin-link">
              <span>📬 Newsletter Dispatch</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Controls: Search + Categories */}
        <div className="blog-controls-card">
          {/* Search bar */}
          <div className="blog-search-bar">
            <svg className="w-5 h-5 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across articles, technologies, or keywords..."
              className="blog-search-input"
              aria-label="Search articles"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="blog-category-tabs">
            {["All", ...BLOG_CATEGORIES].map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`blog-category-tab ${
                    isSelected ? "blog-category-tab-active" : ""
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Tag cloud filter */}
          <div className="blog-tag-filter-row">
            <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
              Topics:
            </span>
            <div className="flex flex-wrap gap-1.5 items-center">
              {allTags.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                    className={`blog-tag-filter-btn ${
                      isSelected ? "blog-tag-filter-btn-active" : ""
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-xs text-rose-500 hover:underline ml-2"
                >
                  Clear topic
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filter indicator */}
        {(selectedCategory !== "All" || selectedTag || searchQuery) && (
          <div className="flex items-center justify-between py-4 border-b border-[var(--border)] mb-8">
            <span className="text-sm text-[var(--muted)]">
              Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "article" : "articles"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedTag && ` tagged with #${selectedTag}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[var(--accent-primary)] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Featured Post (Spotlight) */}
        {featuredPost && (
          <div className="mb-12">
            <FeaturedBlogCard post={featuredPost} />
          </div>
        )}

        {/* Posts Grid */}
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="blog-empty-state">
            <span className="text-3xl mb-3">🔍</span>
            <h3 className="text-lg font-bold text-[var(--foreground)]">No articles found</h3>
            <p className="text-sm text-[var(--muted)] mt-1 max-w-sm">
              We couldn&apos;t find any published posts matching your criteria. Try adjusting your search or clearing filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-[var(--surface-light)] border border-[var(--border)] rounded-md text-sm font-medium hover:bg-[var(--surface)] transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom Newsletter Card */}
        <div className="mt-16">
          <NewsletterCard
            title="Subscribe to Future Dispatches"
            description="Get notified as soon as new architecture breakdowns, systems patterns, or essays are published. Zero spam, zero cost."
            source="blog_index"
          />
        </div>
      </div>
    </div>
  );
}
