"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import ContentReveal from "@/components/Effects/ContentReveal";

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // WebSocket-inspired cursor trail visualization
  const drawConnection = useCallback((canvas: HTMLCanvasElement, mouseX: number, mouseY: number) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = mouseX - rect.left;
    const y = mouseY - rect.top;

    // Server node position (top-right)
    const serverX = canvas.width - 60;
    const serverY = 60;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connection line
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Curved line to server
    const cpX = (x + serverX) / 2;
    const cpY = Math.min(y, serverY) - 40;
    ctx.quadraticCurveTo(cpX, cpY, serverX, serverY);
    ctx.strokeStyle = "rgba(196, 149, 106, 0.15)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.stroke();

    // Server node
    ctx.beginPath();
    ctx.arc(serverX, serverY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(196, 149, 106, 0.2)";
    ctx.fill();
    ctx.strokeStyle = "rgba(196, 149, 106, 0.4)";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.stroke();

    // Client dot
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(196, 149, 106, 0.3)";
    ctx.fill();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      drawConnection(canvas, e.clientX, e.clientY);
    };
    canvas.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
    };
  }, [drawConnection]);

  return (
    <section ref={sectionRef} id="connect" className="connect-section">
      {/* Interactive canvas background */}
      <canvas ref={canvasRef} className="connect-canvas" />

      <div className="connect-inner">
        {/* Section label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label-line" />
          <span className="section-label-text">Connect</span>
        </motion.div>

        {/* The personal "if I work with you" message */}
        <ContentReveal delay={0.2}>
          <div className="connect-message">
            <h2 className="connect-heading">
              If I work with you...
            </h2>

            <motion.div
              className="connect-promise"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <p className="connect-balance-line">
                I thrive balanced inside me.
              </p>
            </motion.div>

            <motion.blockquote
              className="connect-himalaya-quote"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              You will not only get my expertise that I learn with your company
              and while side by side companionship, you will also get to know
              about the hidden places of the Himalayas that is something close
              to me, and the locals.
            </motion.blockquote>
          </div>
        </ContentReveal>

        {/* Contact links */}
        <motion.div
          className="connect-links"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a
            href="https://github.com/luxmikant"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-link"
          >
            <span className="connect-link-label">GitHub</span>
            <span className="connect-link-arrow">↗</span>
          </a>
          <a
            href="https://linkedin.com/in/luxmikant"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-link"
          >
            <span className="connect-link-label">LinkedIn</span>
            <span className="connect-link-arrow">↗</span>
          </a>
          <a
            href="mailto:contact@luxmikant.dev"
            className="connect-link"
          >
            <span className="connect-link-label">Email</span>
            <span className="connect-link-arrow">✉</span>
          </a>
        </motion.div>

        {/* Bottom credit */}
        <motion.p
          className="connect-credit"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : {}}
          transition={{ delay: 1.2 }}
        >
          © {new Date().getFullYear()} Luxmikant — Crafted with ownership and care.
        </motion.p>
      </div>
    </section>
  );
}
