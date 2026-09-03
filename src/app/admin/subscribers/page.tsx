"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NewsletterSubscriber } from "@/types/blog";
import { blogPosts } from "@/content/blogs";

export default function SubscribersAdminPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedBCC, setCopiedBCC] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>(blogPosts[0]?.slug || "");
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  // Fetch subscribers from API
  useEffect(() => {
    async function loadSubscribers() {
      try {
        const res = await fetch("/api/newsletter");
        const data = await res.json();
        if (data.subscribers) {
          setSubscribers(data.subscribers);
        }
      } catch (err) {
        console.error("Failed to fetch subscribers:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSubscribers();
  }, []);

  const bccEmails = subscribers.map((s) => s.email).join(", ");

  const handleCopyBCC = () => {
    if (!bccEmails) return;
    navigator.clipboard.writeText(bccEmails);
    setCopiedBCC(true);
    setTimeout(() => setCopiedBCC(false), 2500);
  };

  const handleDownloadCSV = () => {
    if (subscribers.length === 0) return;
    const headers = "id,email,subscribedAt,source,status\n";
    const rows = subscribers
      .map((s) => `"${s.id}","${s.email}","${s.subscribedAt}","${s.source || ""}","${s.status}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `subscribers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Selected post for dispatch template
  const currentPost = blogPosts.find((p) => p.slug === selectedPostSlug) || blogPosts[0];

  const emailSubject = currentPost ? `[Luxmikant's Dispatch] New Post: ${currentPost.title}` : "[Luxmikant's Dispatch]";
  const emailBody = currentPost
    ? `Hi there,

A new technical deep dive has just been published on my portfolio:

"${currentPost.title}"

${currentPost.excerpt}

Read the full article here:
https://luxmikant.dev/blog/${currentPost.slug}

Thank you for being part of my engineering dispatch. If you have any thoughts or questions, feel free to reply directly to this email.

Warm regards,
Luxmikant
Backend + Cloud + AI Engineer | Kullu, Himachal
https://github.com/luxmikant
`
    : "";

  const handleCopySubject = () => {
    navigator.clipboard.writeText(emailSubject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(emailBody);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="admin-subscribers-page">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)] py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/blog" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
                ← Back to Blog
              </Link>
              <span className="text-xs text-[var(--border)]">•</span>
              <span className="text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                Admin Dispatch Portal
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Newsletter Subscribers & Manual Dispatch
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyBCC}
              disabled={subscribers.length === 0}
              className="px-4 py-2 bg-[var(--accent-primary)] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>📋</span>
              <span>{copiedBCC ? "Copied BCC to Clipboard!" : "Copy All (BCC)"}</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              disabled={subscribers.length === 0}
              className="px-4 py-2 bg-[var(--surface-light)] border border-[var(--border)] text-[var(--foreground)] text-xs font-semibold rounded-lg hover:bg-[var(--surface)] transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>📥</span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Zero-credit Manual Dispatch Explanation Banner */}
        <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                How Manual Dispatch Works (Zero-Cost, No Paid Credits Needed)
              </h3>
              <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                You do not need to pay for Resend, Sendgrid, or background workers. Simply click <strong>&quot;Copy All (BCC)&quot;</strong>, paste into the <strong>BCC field</strong> in Gmail, Yahoo, or Outlook, copy the drafted announcement below, and hit Send. Standard email services allow hundreds of recipients for free while protecting subscriber privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Total Subscribers
            </span>
            <div className="text-4xl font-extrabold text-[var(--accent-primary)] mt-2">
              {loading ? "..." : subscribers.length}
            </div>
            <span className="text-xs text-[var(--muted)] mt-1 block">
              Active readers on your private list
            </span>
          </div>

          <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Cost Per Dispatch
            </span>
            <div className="text-4xl font-extrabold text-emerald-600 mt-2">$0.00</div>
            <span className="text-xs text-[var(--muted)] mt-1 block">
              100% Free via manual BCC workflow
            </span>
          </div>

          <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Latest Signup
            </span>
            <div className="text-base font-bold text-[var(--foreground)] mt-3 truncate">
              {subscribers.length > 0
                ? new Date(subscribers[0].subscribedAt).toLocaleDateString()
                : "No subscribers yet"}
            </div>
            <span className="text-xs text-[var(--muted)] mt-1 block">
              {subscribers.length > 0 ? subscribers[0].email : "Share your link to grow"}
            </span>
          </div>
        </div>

        {/* Email Announcement Drafter */}
        <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[var(--border)]">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Email Announcement Drafter
              </h2>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                Generate a ready-to-send email notification for any published blog article.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--muted)]">Select Article:</span>
              <select
                value={selectedPostSlug}
                onChange={(e) => setSelectedPostSlug(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none"
              >
                {blogPosts.map((post) => (
                  <option key={post.slug} value={post.slug}>
                    {post.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject Line */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Subject Line
              </span>
              <button
                onClick={handleCopySubject}
                className="text-xs text-[var(--accent-primary)] hover:underline font-medium"
              >
                {copiedSubject ? "Copied Subject!" : "Copy Subject"}
              </button>
            </div>
            <div className="p-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs font-mono text-[var(--foreground)]">
              {emailSubject}
            </div>
          </div>

          {/* Email Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Email Body
              </span>
              <button
                onClick={handleCopyBody}
                className="text-xs text-[var(--accent-primary)] hover:underline font-medium"
              >
                {copiedBody ? "Copied Body!" : "Copy Body"}
              </button>
            </div>
            <pre className="p-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs font-mono text-[var(--foreground)] whitespace-pre-wrap leading-relaxed">
              {emailBody}
            </pre>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Subscriber Directory ({subscribers.length})
              </h2>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                Emails registered through your website and blog newsletter cards.
              </p>
            </div>

            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search subscribers by email..."
              className="px-3 py-1.5 text-xs bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] w-full sm:w-64 focus:outline-none"
            />
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-[var(--muted)]">Loading subscribers...</div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center">
              <span className="text-2xl mb-2 block">📭</span>
              <p className="text-sm font-semibold text-[var(--foreground)]">No subscribers found</p>
              <p className="text-xs text-[var(--muted)] mt-1">
                {searchFilter ? "No matches for your search." : "Test by subscribing on your portfolio!"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--muted)] uppercase tracking-wider">
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Subscribed Date</th>
                    <th className="py-3 px-3">Source</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filtered.map((sub) => (
                    <tr key={sub.id} className="hover:bg-[var(--surface-light)] transition-colors">
                      <td className="py-3 px-3 font-mono font-medium text-[var(--foreground)]">
                        {sub.email}
                      </td>
                      <td className="py-3 px-3 text-[var(--muted)]">
                        {new Date(sub.subscribedAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-[var(--muted)]">
                        <span className="px-2 py-0.5 bg-[var(--surface-light)] border border-[var(--border)] rounded text-[10px]">
                          {sub.source || "website"}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded text-[10px] font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
