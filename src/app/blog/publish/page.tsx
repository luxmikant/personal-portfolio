"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogCategory } from "@/types/blog";
import { BLOG_CATEGORIES, generateSlug, calculateReadTime } from "@/utils/blogData";
import MarkdownRenderer from "@/components/Blog/MarkdownRenderer";

const TEMPLATES: Record<string, { title: string; category: BlogCategory; description: string; tags: string; content: string }> = {
  architecture: {
    title: "Designing High-Throughput Event Streams in Distributed Go Systems",
    category: "Backend & Systems",
    description: "Architectural patterns for zero-copy deserialization, partition rebalancing, and deterministic backpressure management.",
    tags: "Go, Microservices, EventStreams, Systems",
    content: `Distributed streaming engines demand predictable tail latencies and deterministic memory consumption. In this article, we examine how to design high-throughput consumers without triggering aggressive garbage collection pauses.

### 1. Zero-Allocation Batch Ingestion

Allocating objects per message quickly exhausts CPU cycles on GC mark-and-sweep phases. Instead, pre-allocate circular ring buffers:

\`\`\`go
type MessageBatch struct {
    payloads [][]byte
    offsets  []int64
    count    int
}
\`\`\`

> [!NOTE]
> Reusing batch buffers across polling intervals drops allocation overhead by over 80% under sustained 50k msg/sec workloads.

### 2. Deterministic Backpressure

When downstream database writes slow down, consumers must back off gracefully rather than crashing with out-of-memory errors...`,
  },
  ai: {
    title: "Deterministic Agents: Restricting LLM Drift in Autonomous Pipelines",
    category: "AI & Cloud",
    description: "Techniques for enforcing strict JSON schemas, fallback execution graphs, and deterministic guardrails in production AI workloads.",
    tags: "AI, LLMs, Gemini, AgenticSystems, Reliability",
    content: `Autonomous agents often fail not because models lack intelligence, but because unconstrained natural language outputs drift over multi-step workflows.

### 1. Schema Enforced Guardrails

Every agent action must strictly conform to a typed contract:

\`\`\`typescript
interface AgentDecision<T> {
  stepId: string;
  action: "EXECUTE" | "RETRY" | "ESCALATE";
  payload: T;
  confidenceScore: number;
}
\`\`\`

> [!TIP]
> Always enforce strict JSON mode with a compiler-level schema validator before routing agent payload to external APIs.`,
  },
  reflections: {
    title: "Alpine Engineering: What High Passes Taught Me About Complexity",
    category: "Himalayan Reflections",
    description: "Lessons from Himalayan trekking on resilience, minimalism, and the power of removing unnecessary moving parts.",
    tags: "Philosophy, Himalayas, Architecture, Simplicity",
    content: `When traversing passes above 4,000 meters, unnecessary weight becomes your biggest liability.

Software systems carry that exact same baggage. Every unneeded library, every prematurely optimized cache, and every unnecessary microservice extracts an ongoing cognitive and operational tax.

### The Art of Subtraction

True elegance in engineering is not how much complexity you can juggle, but how much simplicity you can preserve while solving hard problems.`,
  },
};

export default function BlogPublishPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory] = useState<BlogCategory>("Backend & Systems");
  const [tags, setTags] = useState("Go, Systems, Cloud");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [viewMode, setViewMode] = useState<"write" | "preview" | "split">("split");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string; url?: string } | null>(null);

  // Handle title change and auto-generate slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugEdited) {
      setSlug(generateSlug(val));
    }
  };

  // Load a starter template
  const loadTemplate = (key: string) => {
    const t = TEMPLATES[key];
    if (t) {
      setTitle(t.title);
      setSlug(generateSlug(t.title));
      setSlugEdited(true);
      setCategory(t.category);
      setTags(t.tags);
      setDescription(t.description);
      setContent(t.content);
      setStatusMessage(null);
    }
  };

  // Insert markdown helpers
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("post-content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);

    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected || "text").length);
    }, 50);
  };

  // Submit and Publish
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !content.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please fill in all required fields (Title, Description, and Content).",
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/blog/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug.trim() || generateSlug(title),
          category,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          description,
          content,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: "Article published successfully to your portfolio!",
          url: data.url,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: data.message || "Failed to publish article.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error occurred while publishing.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Export as Markdown File
  const handleExportMarkdown = () => {
    const frontmatter = `---
title: "${title}"
description: "${description}"
publishedAt: "${new Date().toISOString().split("T")[0]}"
category: "${category}"
tags: [${tags.split(",").map((t) => `"${t.trim()}"`).join(", ")}]
readTime: "${calculateReadTime(content)}"
---

`;
    const blob = new Blob([frontmatter + content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug || "post"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export as JSON
  const handleExportJSON = () => {
    const postObject = {
      id: `post-${Date.now()}`,
      slug: slug || generateSlug(title),
      title,
      description,
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: calculateReadTime(content),
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: {
        name: "Luxmikant",
        role: "Backend + Cloud + AI Engineer",
      },
      content,
    };
    const blob = new Blob([JSON.stringify(postObject, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug || "post"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="blog-studio-page">
      {/* Studio Header */}
      <header className="blog-studio-header">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/blog" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
              ← Back to Blog
            </Link>
            <span className="text-xs text-[var(--border)]">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <h1 className="text-sm font-bold tracking-wider uppercase text-[var(--foreground)]">
                Blog Publishing Studio
              </h1>
            </div>
          </div>

          {/* Quick template pickers */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--muted)] hidden sm:inline">Templates:</span>
            <button
              onClick={() => loadTemplate("architecture")}
              className="text-xs px-2.5 py-1 bg-[var(--surface-light)] border border-[var(--border)] rounded hover:bg-[var(--surface)] text-[var(--foreground)] transition-colors"
            >
              Backend
            </button>
            <button
              onClick={() => loadTemplate("ai")}
              className="text-xs px-2.5 py-1 bg-[var(--surface-light)] border border-[var(--border)] rounded hover:bg-[var(--surface)] text-[var(--foreground)] transition-colors"
            >
              AI Agents
            </button>
            <button
              onClick={() => loadTemplate("reflections")}
              className="text-xs px-2.5 py-1 bg-[var(--surface-light)] border border-[var(--border)] rounded hover:bg-[var(--surface)] text-[var(--foreground)] transition-colors"
            >
              Himalayan
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Form */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {statusMessage && (
          <div
            className={`p-4 rounded-xl border mb-6 flex items-center justify-between gap-4 ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{statusMessage.type === "success" ? "🎉" : "⚠️"}</span>
              <span className="text-sm font-medium">{statusMessage.text}</span>
            </div>
            {statusMessage.url && (
              <div className="flex items-center gap-2">
                <Link
                  href={statusMessage.url}
                  className="px-3 py-1 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  View Published Post →
                </Link>
                <button
                  onClick={() => router.push("/blog")}
                  className="px-3 py-1 bg-white/20 rounded text-xs font-medium"
                >
                  Blog Index
                </button>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handlePublish} className="space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xs">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Architecting Distributed Pipelines in Go"
                required
                className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            {/* Slug */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                URL Slug (/blog/{slug || "..."})
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugEdited(true);
                }}
                placeholder="url-slug-here"
                className="w-full px-3 py-2 text-sm font-mono bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogCategory)}
                className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)]"
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Go, Systems, Cloud, AI"
                className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            {/* Read Time Preview */}
            <div className="flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
                Estimated Read
              </span>
              <span className="text-sm font-semibold text-[var(--accent-primary)]">
                {calculateReadTime(content)}
              </span>
            </div>

            {/* Excerpt / Description */}
            <div className="col-span-full">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Short Summary / Meta Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A concise 1-2 sentence teaser for cards and search engine previews..."
                rows={2}
                required
                className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)] resize-none"
              />
            </div>
          </div>

          {/* Editor Controls & Formatting Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[var(--surface-light)] border border-[var(--border)] rounded-xl">
            {/* Markdown formatting shortcuts */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => insertMarkdown("## ")}
                className="px-2.5 py-1 text-xs font-bold bg-[var(--surface)] border border-[var(--border)] rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("### ")}
                className="px-2.5 py-1 text-xs font-bold bg-[var(--surface)] border border-[var(--border)] rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                title="Heading 3"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("**", "**")}
                className="px-2.5 py-1 text-xs font-bold bg-[var(--surface)] border border-[var(--border)] rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("*", "*")}
                className="px-2.5 py-1 text-xs italic bg-[var(--surface)] border border-[var(--border)] rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                title="Italic"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("```go\n", "\n```")}
                className="px-2.5 py-1 text-xs font-mono bg-[var(--surface)] border border-[var(--border)] rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                title="Code block"
              >
                &lt;/&gt;
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("> [!NOTE]\n> ")}
                className="px-2.5 py-1 text-xs bg-[var(--surface)] border border-[var(--border)] rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                title="Callout note"
              >
                📌 Note
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("> [!TIP]\n> ")}
                className="px-2.5 py-1 text-xs bg-[var(--surface)] border border-[var(--border)] rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                title="Callout tip"
              >
                💡 Tip
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("- ")}
                className="px-2.5 py-1 text-xs bg-[var(--surface)] border border-[var(--border)] rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                title="Bullet list"
              >
                • List
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("write")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewMode === "write" ? "bg-[var(--accent-primary)] text-white" : "text-[var(--muted)]"
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setViewMode("split")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors hidden md:block ${
                  viewMode === "split" ? "bg-[var(--accent-primary)] text-white" : "text-[var(--muted)]"
                }`}
              >
                Split
              </button>
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewMode === "preview" ? "bg-[var(--accent-primary)] text-white" : "text-[var(--muted)]"
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          {/* Editor / Preview Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Markdown textarea */}
            {(viewMode === "write" || viewMode === "split") && (
              <div className={`${viewMode === "write" ? "col-span-full" : "col-span-1"}`}>
                <textarea
                  id="post-content-textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article in Markdown here...

## Key Architecture
Explain your design decisions, microservices patterns, or experiences.

```go
func main() {
    // Your code here
}
```

> [!TIP]
> Add practical takeaways."
                  rows={24}
                  required
                  className="w-full p-4 font-mono text-sm leading-relaxed bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)] resize-y shadow-xs"
                />
              </div>
            )}

            {/* Live Rendered Preview */}
            {(viewMode === "preview" || viewMode === "split") && (
              <div
                className={`p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xs overflow-y-auto max-h-[600px] ${
                  viewMode === "preview" ? "col-span-full" : "col-span-1"
                }`}
              >
                <div className="border-b border-[var(--border)] pb-4 mb-6">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-primary)]">
                    {category}
                  </span>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mt-1">
                    {title || "Untitled Article"}
                  </h2>
                  <p className="text-sm text-[var(--muted)] mt-2">
                    {description || "No excerpt entered."}
                  </p>
                </div>
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className="text-sm text-[var(--muted)] italic">
                    Live article preview will appear here as you write...
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExportMarkdown}
                className="px-3 py-2 text-xs font-semibold bg-[var(--surface-light)] border border-[var(--border)] rounded-lg text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors flex items-center gap-1.5"
              >
                <span>💾</span> Export .md
              </button>
              <button
                type="button"
                onClick={handleExportJSON}
                className="px-3 py-2 text-xs font-semibold bg-[var(--surface-light)] border border-[var(--border)] rounded-lg text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors flex items-center gap-1.5"
              >
                <span>📦</span> Export .json
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/blog" className="px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="hero-cta-primary !py-2.5 !px-6 text-sm flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Publishing...</span>
                ) : (
                  <>
                    <span>🚀 Publish to Portfolio</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
