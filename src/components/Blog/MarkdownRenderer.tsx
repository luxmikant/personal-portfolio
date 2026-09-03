"use client";

import React, { useState } from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Helper to render inline formatting: bold, italic, inline code, links
  const renderInline = (text: string): React.ReactNode => {
    // Split by links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderBasicInline(text.substring(lastIndex, match.index)));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-link"
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(renderBasicInline(text.substring(lastIndex)));
    }

    return parts.length > 0 ? parts : text;
  };

  const renderBasicInline = (text: string): React.ReactNode => {
    // Regex for bold **text**, italic *text*, inline code `code`
    const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

    return tokens.map((token, i) => {
      if (token.startsWith("`") && token.endsWith("`")) {
        return (
          <code key={i} className="blog-inline-code">
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith("**") && token.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-[var(--foreground)]">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (token.startsWith("*") && token.endsWith("*")) {
        return (
          <em key={i} className="italic text-[var(--foreground)]">
            {token.slice(1, -1)}
          </em>
        );
      }
      return token;
    });
  };

  // Parse lines into structured blocks
  const parseBlocks = () => {
    const lines = content.split("\n");
    const blocks: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks ```lang
      if (line.trim().startsWith("```")) {
        const lang = line.trim().replace(/^```/, "").trim() || "plaintext";
        let codeContent = "";
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeContent += lines[i] + "\n";
          i++;
        }
        i++; // skip closing ```
        blocks.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeContent.trimEnd()}
            language={lang}
          />
        );
        continue;
      }

      // Headings
      if (line.startsWith("### ")) {
        const title = line.replace("### ", "").trim();
        const id = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        blocks.push(
          <h3 key={`h3-${i}`} id={id} className="blog-h3 group">
            <a href={`#${id}`} className="blog-anchor">
              {renderInline(title)}
            </a>
          </h3>
        );
        i++;
        continue;
      }

      if (line.startsWith("## ")) {
        const title = line.replace("## ", "").trim();
        const id = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        blocks.push(
          <h2 key={`h2-${i}`} id={id} className="blog-h2 group">
            <a href={`#${id}`} className="blog-anchor">
              {renderInline(title)}
            </a>
          </h2>
        );
        i++;
        continue;
      }

      if (line.startsWith("# ")) {
        const title = line.replace("# ", "").trim();
        const id = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
        blocks.push(
          <h1 key={`h1-${i}`} id={id} className="blog-h1 group">
            <a href={`#${id}`} className="blog-anchor">
              {renderInline(title)}
            </a>
          </h1>
        );
        i++;
        continue;
      }

      // Callouts / Alerts: > [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT]
      if (line.startsWith("> [!")) {
        const alertMatch = line.match(/^> \[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/);
        const type = alertMatch ? alertMatch[1] : "NOTE";
        let alertBody = "";
        i++;
        while (i < lines.length && lines[i].startsWith(">")) {
          alertBody += lines[i].replace(/^>\s?/, "") + "\n";
          i++;
        }
        blocks.push(
          <CalloutBlock key={`alert-${i}`} type={type} content={alertBody.trim()} />
        );
        continue;
      }

      // Standard Blockquote: > text
      if (line.startsWith("> ")) {
        let quoteText = line.replace(/^>\s?/, "") + "\n";
        i++;
        while (i < lines.length && lines[i].startsWith(">")) {
          quoteText += lines[i].replace(/^>\s?/, "") + "\n";
          i++;
        }
        blocks.push(
          <blockquote key={`quote-${i}`} className="blog-blockquote">
            {renderInline(quoteText.trim())}
          </blockquote>
        );
        continue;
      }

      // Horizontal Rule
      if (line.trim() === "---" || line.trim() === "***") {
        blocks.push(<hr key={`hr-${i}`} className="blog-hr" />);
        i++;
        continue;
      }

      // Bullet List: - item or * item
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const listItems: string[] = [];
        while (
          i < lines.length &&
          (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
        ) {
          listItems.push(lines[i].trim().replace(/^[-*]\s+/, ""));
          i++;
        }
        blocks.push(
          <ul key={`ul-${i}`} className="blog-ul">
            {listItems.map((item, idx) => (
              <li key={idx} className="blog-li">
                <span className="blog-li-bullet" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Numbered List: 1. item
      if (/^\d+\.\s+/.test(line.trim())) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
          i++;
        }
        blocks.push(
          <ol key={`ol-${i}`} className="blog-ol">
            {listItems.map((item, idx) => (
              <li key={idx} className="blog-ol-item">
                <span className="blog-ol-num">{idx + 1}.</span>
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Paragraph
      if (line.trim().length > 0) {
        blocks.push(
          <p key={`p-${i}`} className="blog-p">
            {renderInline(line)}
          </p>
        );
      }

      i++;
    }

    return blocks;
  };

  return <div className="blog-prose-content">{parseBlocks()}</div>;
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="blog-code-container">
      <div className="blog-code-header">
        <span className="blog-code-lang">{language}</span>
        <button
          onClick={handleCopy}
          className="blog-code-copy-btn"
          aria-label="Copy code snippet"
        >
          {copied ? (
            <span className="flex items-center gap-1 text-emerald-600">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>
      <pre className="blog-code-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CalloutBlock({ type, content }: { type: string; content: string }) {
  const getBadgeStyle = () => {
    switch (type) {
      case "TIP":
        return {
          border: "border-emerald-500/30",
          bg: "bg-emerald-500/5",
          title: "Tip",
          icon: "💡",
          textColor: "text-emerald-700 dark:text-emerald-400",
        };
      case "WARNING":
        return {
          border: "border-amber-500/40",
          bg: "bg-amber-500/5",
          title: "Warning",
          icon: "⚠️",
          textColor: "text-amber-700 dark:text-amber-400",
        };
      case "IMPORTANT":
        return {
          border: "border-[var(--accent-primary)]/40",
          bg: "bg-[var(--accent-primary)]/5",
          title: "Important",
          icon: "📌",
          textColor: "text-[var(--accent-primary)]",
        };
      default:
        return {
          border: "border-neutral-300 dark:border-neutral-700",
          bg: "bg-neutral-500/5",
          title: "Note",
          icon: "ℹ️",
          textColor: "text-neutral-700 dark:text-neutral-300",
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <div className={`blog-callout ${style.border} ${style.bg}`}>
      <div className="flex items-center gap-2 mb-1">
        <span>{style.icon}</span>
        <span className={`font-semibold text-xs uppercase tracking-wider ${style.textColor}`}>
          {style.title}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-[var(--foreground)] opacity-90">
        {content}
      </p>
    </div>
  );
}
