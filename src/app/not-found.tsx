import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen px-6 flex items-center justify-center">
      <div className="max-w-xl text-center glass rounded-2xl p-10">
        <p className="text-sm font-mono mb-3" style={{ color: "var(--domain-primary)" }}>
          404
        </p>
        <h1 className="mb-4 text-foreground">Page not found</h1>
        <p className="mb-8 text-base">
          The page you requested doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="link-underline inline-flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-300 hover:scale-105"
          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
        >
          Return Home
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
