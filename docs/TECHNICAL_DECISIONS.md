# Technical Decisions & Trade-offs Log

## Format
- **Decision**: What was decided
- **Date**: When decided
- **Rationale**: Why this choice
- **Alternatives Considered**: Other options
- **Trade-offs**: Pros & cons
- **Status**: Active / Archived / Revisited

---

## Decision 001: 3D Avatar via Three.js (React Three Fiber)
**Date**: Feb 12, 2026
**Status**: Active

**Decision**: Use Three.js via React Three Fiber (R3F) + Drei helpers for 3D avatar with SVG fallback on low-end mobile.

**Rationale**:
- R3F integrates natively with React component model
- Drei provides useful abstractions (OrbitControls, useGLTF, etc.)
- Smooth morphing animations between domain forms
- Industry standard for web 3D

**Alternatives Considered**:
- Pure SVG: Simpler, smaller bundle → Lacks 3D depth & smooth morphing
- Spline: Hosted platform, nice editor → Vendor dependency, less control
- Babylon.js: Similar capability → Larger bundle, smaller React ecosystem

**Trade-offs**:
- ✅ Rich 3D interactions, professional look
- ✅ Native React integration via R3F
- ❌ Larger bundle (~150-200KB gzipped for Three.js)
- ❌ Performance consideration on low-end mobile

---

## Decision 002: Next.js + Barba.js for Page Transitions
**Date**: Feb 12, 2026
**Status**: Active

**Decision**: Use Next.js 15 (App Router) for framework with Barba.js for smooth page transitions.

**Rationale**:
- Next.js: Mature ecosystem, SSR, SEO-friendly, Vercel deployment
- Barba.js: Proven library for PJAX-style page transitions
- Fine-grained control over transition timing and effects

**Alternatives Considered**:
- Astro: Static-first → Less suited for dynamic animations
- Remix: More backend complexity than needed
- View Transitions API: Browser-native → Limited browser support, less control

**Trade-offs**:
- ✅ Best animation control + SEO
- ✅ Mature, well-documented ecosystem
- ❌ Barba.js requires careful integration with Next.js App Router
- ❌ Larger initial JS bundle than Astro

---

## Decision 003: Minor Avatar Animations Only
**Date**: Feb 12, 2026
**Status**: Active

**Decision**: Avatar animations limited to idle loops (breathing, floating), domain morphing, and hover glow. No mouse tracking or complex gestures.

**Rationale**:
- Keeps animations subtle & non-distracting
- Reduces GPU computation (especially on mobile)
- Focuses user attention on content, not avatar
- Domain morphing is the main visual event

**Alternatives Considered**:
- Full mouse tracking (head follows cursor) → Distracting, performance cost
- Complex gesture animations → Over-engineered for portfolio context

**Trade-offs**:
- ✅ Clean, professional feel
- ✅ Better performance across devices
- ❌ Less "interactive" feel

---

## Decision 004: Aesthetic Direction — Flexible, Not Locked Cyberpunk
**Date**: Feb 12, 2026
**Status**: Active

**Decision**: Modern tech-forward aesthetic inspired by cyberpunk but not locked to it. Each domain evolves its own color palette while maintaining cohesion.

**Rationale**:
- Cyberpunk is inspiration, not constraint
- Different domains benefit from different visual moods
- Easier to iterate on design without full overhaul

---

## Revisit Candidates
- Performance impact of Three.js on low-end phones (may need SVG fallback threshold)
- Loader duration (2-3s may feel too long — revisit after user testing)
- Barba.js + Next.js App Router compatibility (verify during Phase 1)
