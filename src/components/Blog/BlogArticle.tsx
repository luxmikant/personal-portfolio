import type { BlogBlock, BlogPost } from "@/content/blogs";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className="scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {block.text}
        </h3>
      );
    case "p":
      return <p className="text-[15px] leading-[1.85] text-muted">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-muted">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-[1.7] text-muted">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl border border-border bg-surface-light p-5 font-mono text-[13px] leading-relaxed text-foreground">
          <code>{block.code}</code>
        </pre>
      );
    case "callout":
      return (
        <aside className="rounded-xl border border-accent-warm/40 bg-accent-glow p-5">
          <p className="mb-1 text-sm font-semibold text-accent-deep">
            {block.title}
          </p>
          <p className="text-[14px] leading-[1.7] text-muted">{block.text}</p>
        </aside>
      );
    case "hr":
      return <hr className="my-8 border-border" />;
    default:
      return null;
  }
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article className="mx-auto w-full max-w-2xl">
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-surface-light px-3 py-1 text-xs font-medium text-accent-deep">
            {post.readingTime}
          </span>
          <time dateTime={post.dateISO} className="text-sm text-muted">
            {post.date}
          </time>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base leading-[1.7] text-muted">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="space-y-5">
        {post.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </article>
  );
}
