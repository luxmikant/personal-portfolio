# Portfolio Requirements

## Functional Requirements

### Must-Have (MVP)
- [ ] Landing page with avatar introduction & philosophy
- [ ] 4 domain pages (Backend, Cloud, AI, Web3)
- [ ] Smooth page transitions (Barba.js)
- [ ] 3D avatar with form transformations (minor idle animations)
- [ ] Custom loader UI (2-3s per domain)
- [ ] Project showcase (cards with links)
- [ ] Skills sections per domain
- [ ] Responsive design (mobile to desktop)
- [ ] Contact/footer section
- [ ] Navigation (subtle, accessible)

### Should-Have
- [ ] Interactive diagrams per domain
- [ ] Scroll-triggered animations (Lenis)
- [ ] Parallax effects
- [ ] Project case study modals
- [ ] Domain color themes that transition smoothly
- [ ] SEO meta tags per page

### Nice-to-Have
- [ ] Dark/light mode toggle
- [ ] Keyboard navigation
- [ ] Video intro/demo
- [ ] Live chat/calendar integration
- [ ] Resume download

---

## Technical Requirements

### Technology Stack
| Category | Technology |
|----------|-----------|
| Framework | Next.js 15.5+ with TypeScript |
| Styling | Tailwind CSS + CSS modules |
| Animation (core) | Framer Motion, React Spring |
| Animation (micro) | Motion One, AutoAnimate |
| Scroll | Lenis (smooth scroll) |
| 3D | Three.js via React Three Fiber + Drei |
| Page Transitions | Barba.js |
| Loader | SVG + Framer Motion |
| Lottie | Lottie Web (icon animations) |
| Code Quality | ESLint, Prettier |
| Deployment | Vercel |

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

### File Size Targets
- JS bundle: < 200KB (gzipped)
- Initial page load: < 3MB
- Avatar 3D model: < 500KB
- Images: Optimized (WebP, AVIF)

### SEO Requirements
- Meta tags per page (title, description, OG tags)
- Open Graph images per domain
- Structured data (Schema.org)
- Sitemap.xml
- robots.txt
- Mobile-friendly viewport

---

## Content Requirements

### Project Data

**Backend Engineering**
- SharCRM: Enterprise AI CRM (React + Express + MongoDB + Gemini AI) — Live at sharcrm.app
- TraderLens-AI: Multi-agent financial news system (Python + LangGraph + FastAPI) — 6-agent pipeline

**Cloud-Native**
- Armory-Intelligence: Weapons analysis platform (Next.js + Supabase + Tambo AI) — Deployed on Vercel
- Observability demo / case study

**AI Tools**
- TraderLens-AI: Agent-focused showcase (LangGraph orchestration, 134 test cases)
- ANPR-YOLOv8: Automated Number Plate Recognition (Python + YOLOv8)

**Web3**
- specchain-pro: Blockchain project (TypeScript) — Early stage
- Hybrid architecture case study: On/off-chain design patterns

### Skills Per Domain (8-10 each)
- Backend: Node.js, Express, FastAPI, MongoDB, PostgreSQL, API Design, System Design, OOP, Clean Code, Testing
- Cloud: Kubernetes, Docker, Prometheus, Grafana, CI/CD, Infrastructure-as-Code, Deployment, Observability
- AI: LangGraph, RAG, Prompt Engineering, FinBERT, YOLOv8, Multi-Agent Systems, ChromaDB, LLM Integration
- Web3: Smart Contracts, Ethereum, On-Chain Design, Decentralization, Hybrid Architecture, Token Design

---

## Performance Requirements
- Lighthouse score: > 90 (desktop)
- Mobile performance score: > 80
- FCP: < 1.5s
- LCP: < 2.5s
- TTI: < 3.5s

## Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels for interactive elements
- Alt text for all images
- Color contrast ratio: > 4.5:1
- Focus indicators visible
