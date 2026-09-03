"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", anchor: "#hero", href: "/" },
  { label: "About Me", anchor: "#about", href: "/#about" },
  { label: "Projects", anchor: "#projects", href: "/#projects" },
  { label: "Hackathons", anchor: "#hackathons", href: "/#hackathons" },
  { label: "Blog", anchor: "/blog", href: "/blog" },
  { label: "Connect", anchor: "#connect", href: "/#connect" },
];

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Track scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section on home page
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/blog")) {
        setActiveSection("blog");
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const sectionIds = ["hero", "about", "projects", "hackathons", "blog", "connect"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = useCallback(
    (item: (typeof NAV_LINKS)[number]) => {
      setMobileOpen(false);

      if (item.anchor.startsWith("/")) {
        router.push(item.anchor);
        return;
      }

      if (pathname !== "/") {
        router.push("/" + item.anchor);
        return;
      }

      if (item.anchor === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const id = item.anchor.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [pathname, router]
  );

  return (
    <>
      <motion.nav
        className="nav-bar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          background: isScrolled
            ? "rgba(250, 250, 250, 0.88)"
            : "transparent",
          borderBottom: isScrolled
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="nav-inner">
          {/* Logo */}
          <button
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                router.push("/");
              }
            }}
            className="nav-logo"
            aria-label="Home"
          >
            <span className="nav-logo-text">LK</span>
            <span className="nav-logo-dot" />
          </button>

          {/* Desktop links */}
          <div className="nav-links-desktop">
            {NAV_LINKS.map((item) => {
              const sectionId = item.anchor.replace("#", "");
              const isBlog = item.anchor === "/blog";
              const isActive = isBlog
                ? pathname.startsWith("/blog")
                : pathname === "/" && activeSection === sectionId;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="nav-link-indicator"
                      layoutId="navIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="nav-hamburger-line"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="nav-hamburger-line"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="nav-hamburger-line"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="nav-mobile-link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress */}
      <motion.div className="nav-scroll-progress" style={{ width: progressWidth }} />
    </>
  );
}
