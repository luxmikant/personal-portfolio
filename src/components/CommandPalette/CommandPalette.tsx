"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { INITIAL_BLOG_POSTS } from "@/utils/blogData";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Articles" | "Actions" | "Admin";
  icon: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [open]);

  // Command items
  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Home / Overview",
      category: "Navigation",
      icon: "🏠",
      action: () => {
        router.push("/");
        setOpen(false);
      },
    },
    {
      id: "nav-projects",
      title: "Explore Engineering Projects",
      category: "Navigation",
      icon: "⚡",
      action: () => {
        router.push("/#projects");
        setOpen(false);
      },
    },
    {
      id: "nav-hackathons",
      title: "Hackathons & Achievements",
      category: "Navigation",
      icon: "🏆",
      action: () => {
        router.push("/#hackathons");
        setOpen(false);
      },
    },
    {
      id: "nav-blog",
      title: "Read Engineering Blog & Dispatches",
      category: "Navigation",
      icon: "📖",
      action: () => {
        router.push("/blog");
        setOpen(false);
      },
    },
    {
      id: "nav-newsletter",
      title: "Join the Newsletter Dispatch",
      category: "Navigation",
      icon: "📬",
      action: () => {
        router.push("/#newsletter");
        setOpen(false);
      },
    },
    {
      id: "nav-connect",
      title: "Get in Touch / Work With Me",
      category: "Navigation",
      icon: "🤝",
      action: () => {
        router.push("/#connect");
        setOpen(false);
      },
    },

    // Actions
    {
      id: "action-copy-email",
      title: copiedEmail ? "Email Copied to Clipboard!" : "Copy Email: kantgarg2254@gmail.com",
      category: "Actions",
      icon: "✉️",
      action: () => {
        navigator.clipboard.writeText("kantgarg2254@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => {
          setCopiedEmail(false);
          setOpen(false);
        }, 1500);
      },
    },
    {
      id: "action-resume",
      title: "Download Resume / Curriculum Vitae",
      category: "Actions",
      icon: "📄",
      action: () => {
        window.open(
          "https://github.com/luxmikant/res/blob/main/Ai_intern_VIT_LUXMIKANT_7018209392.pdf",
          "_blank"
        );
        setOpen(false);
      },
    },
    {
      id: "action-github",
      title: "Visit GitHub: @luxmikant",
      category: "Actions",
      icon: "🐙",
      action: () => {
        window.open("https://github.com/luxmikant", "_blank");
        setOpen(false);
      },
    },
    {
      id: "action-linkedin",
      title: "Visit LinkedIn: luxmikant",
      category: "Actions",
      icon: "💼",
      action: () => {
        window.open("https://linkedin.com/in/luxmikant", "_blank");
        setOpen(false);
      },
    },

    // Articles
    ...INITIAL_BLOG_POSTS.map((post) => ({
      id: `post-${post.slug}`,
      title: post.title,
      category: "Articles" as const,
      icon: "📝",
      action: () => {
        router.push(`/blog/${post.slug}`);
        setOpen(false);
      },
    })),

    // Creator / Admin
    {
      id: "admin-publish",
      title: "Blog Studio: Write & Publish New Article",
      category: "Admin",
      icon: "✍️",
      action: () => {
        router.push("/blog/publish");
        setOpen(false);
      },
    },
    {
      id: "admin-subscribers",
      title: "Admin: Newsletter Subscribers & BCC Dispatch",
      category: "Admin",
      icon: "👥",
      action: () => {
        router.push("/admin/subscribers");
        setOpen(false);
      },
    },
  ];

  // Filter commands
  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  // Handle arrow navigation
  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Floating trigger button on desktop/mobile */}
      <button
        onClick={() => setOpen(true)}
        className="command-trigger-btn"
        title="Open Command Palette (Ctrl+K)"
        aria-label="Open Command Menu"
      >
        <span className="text-xs font-mono opacity-80">⌘K</span>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {open && (
          <div className="command-backdrop" onClick={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.2 }}
              className="command-panel"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Bar */}
              <div className="command-search-wrap">
                <svg className="w-5 h-5 text-[var(--accent-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDownList}
                  placeholder="Type a command, search blog posts, or jump to section..."
                  className="command-input"
                  aria-label="Command search"
                />
                <kbd className="command-esc-badge" onClick={() => setOpen(false)}>
                  ESC
                </kbd>
              </div>

              {/* Items List */}
              <div className="command-results-list">
                {filtered.length === 0 ? (
                  <div className="command-empty-state">
                    <p className="text-sm text-[var(--muted)]">No matching commands or articles.</p>
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`command-item ${isSelected ? "command-item-active" : ""}`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <div className="flex-1 truncate">
                          <span className="font-medium text-sm text-[var(--foreground)] truncate block">
                            {item.title}
                          </span>
                        </div>
                        <span className="command-item-tag">{item.category}</span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Command Footer */}
              <div className="command-footer">
                <div className="flex items-center gap-3 text-[11px] text-[var(--muted)]">
                  <span>↑↓ to navigate</span>
                  <span>↵ to select</span>
                  <span>esc to close</span>
                </div>
                <span className="text-[11px] font-mono text-[var(--accent-primary)]">
                  Luxmikant Portfolio
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
