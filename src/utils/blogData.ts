import { BlogPost, BlogCategory } from "@/types/blog";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Backend & Systems",
  "AI & Cloud",
  "Generative UI",
  "Himalayan Reflections",
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "clean-go-microservices-connect4",
    title: "Engineering Clean Go Microservices: Architecture Lessons from Connect4",
    description:
      "A deep dive into idiomatic Go architecture, deterministic game state transitions, zero-allocation patterns, and living snapshot documentation.",
    publishedAt: "2026-08-20",
    readTime: "7 min read",
    category: "Backend & Systems",
    tags: ["Go", "Distributed Systems", "Clean Architecture", "Concurrency"],
    author: {
      name: "Luxmikant",
      role: "Backend + Cloud + AI Engineer",
    },
    featured: true,
    coverImage: "/6185972.jpg",
    content: `Building deterministic systems in Go requires treating data purity, memory layouts, and clean separation of concerns as first-class citizens. When architecting **Connect4**, my objective was not merely to produce a playable grid, but to model an enterprise-grade backend architecture in miniature.

### 1. Hexagonal Boundaries and Domain Purity

In high-throughput microservices, coupling domain rules to HTTP handlers or database persistence leads to brittle codebases. In our architecture, the **Board State** is an immutable kernel:

\`\`\`go
// Board represents the pure mathematical state of the Connect4 grid
type Board struct {
    grid       [Rows][Cols]Cell
    turnCount  int
    lastMove   Move
}

// ApplyMove evaluates a move deterministically without side effects
func (b Board) ApplyMove(col int, player Player) (Board, error) {
    if col < 0 || col >= Cols {
        return b, ErrColumnOutOfBounds
    }
    if b.grid[0][col] != Empty {
        return b, ErrColumnFull
    }
    
    // Copy-on-write ensures thread safety across concurrent game simulations
    newBoard := b
    for r := Rows - 1; r >= 0; r-- {
        if newBoard.grid[r][col] == Empty {
            newBoard.grid[r][col] = Cell(player)
            newBoard.lastMove = Move{Row: r, Col: col, Player: player}
            newBoard.turnCount++
            return newBoard, nil
        }
    }
    return b, ErrUnexpectedState
}
\`\`\`

> [!TIP]
> Notice the zero-allocation approach: passing values of small, fixed-size structs instead of heap pointers minimizes garbage collection pauses under high concurrent simulation workloads.

---

### 2. Concurrency and Race Safety

Go's \`sync\` primitives and channel abstractions allow us to run minimax simulation workers in parallel without locks. By partitioning search subtrees across worker goroutines via an engine pool, we achieve millisecond-range response times while eliminating data races.

\`\`\`go
func (e *Engine) EvaluateParallel(ctx context.Context, b Board, depth int) (Move, error) {
    results := make(chan EvaluatedMove, Cols)
    var wg sync.WaitGroup

    for col := 0; col < Cols; col++ {
        if !b.CanDrop(col) {
            continue
        }
        wg.Add(1)
        go func(c int) {
            defer wg.Done()
            score := e.minimax(ctx, b.SimulateDrop(c), depth-1, math.MinInt32, math.MaxInt32, false)
            results <- EvaluatedMove{Col: c, Score: score}
        }(col)
    }

    wg.Wait()
    close(results)
    return selectBestMove(results)
}
\`\`\`

---

### 3. Living Architecture Snapshots

Code without living documentation degrades quickly. In this project, each major version automatically outputs structural architectural snapshots—allowing team members and reviewers to inspect state transitions without digging through hundreds of lines of code.

Key Takeaways:
- **Keep domain models pure**: Business logic should never depend on frameworks.
- **Embrace Go's value semantics**: Small fixed arrays avoid GC overhead.
- **Fail fast with typed domain errors**: Never return generic string errors in core libraries.`,
  },
  {
    id: "post-2",
    slug: "ai-driven-crm-sharcrm-architecture",
    title: "Building AI-Driven CRMs: LLM Reasoning, Health Scores & Churn Prediction in SharCRM",
    description:
      "How we engineered SharCRM to deliver enterprise-grade CRM intelligence with Google Gemini, customer health metrics (0-100), and automated pipeline actions.",
    publishedAt: "2026-07-15",
    readTime: "9 min read",
    category: "AI & Cloud",
    tags: ["Gemini AI", "TypeScript", "Express", "MongoDB", "Predictive Analytics"],
    author: {
      name: "Luxmikant",
      role: "Backend + Cloud + AI Engineer",
    },
    featured: true,
    content: `Modern businesses frequently drown in fragmented customer records. Most CRM solutions are glorified electronic filing cabinets—they store data passively, leaving the burden of analysis, segmentation, and outreach entirely on humans.

With **SharCRM**, our mission was to invert this paradigm: turn the CRM into an active, intelligent copilot that anticipates churn, calculates real-time account health scores, and drafts contextual campaign communications automatically.

---

### 1. The Real-Time Health Score Pipeline (0–100)

Rather than treating customer activity as separate tables, we built an algorithmic composite score that recalculates upon every touchpoint:

\`\`\`typescript
interface CustomerMetrics {
  daysSinceLastInteraction: number;
  openTicketSeverityScore: number;
  npsScore: number;
  paymentReliabilityRatio: number;
}

export function computeHealthScore(metrics: CustomerMetrics): {
  score: number;
  churnRisk: "LOW" | "MODERATE" | "HIGH";
} {
  const recencyWeight = 0.35;
  const ticketWeight = 0.25;
  const npsWeight = 0.20;
  const paymentWeight = 0.20;

  const recencyScore = Math.max(0, 100 - metrics.daysSinceLastInteraction * 3.5);
  const ticketPenalty = Math.max(0, 100 - metrics.openTicketSeverityScore * 20);
  const npsNormalized = (metrics.npsScore / 10) * 100;
  const paymentScore = metrics.paymentReliabilityRatio * 100;

  const finalScore = Math.round(
    recencyScore * recencyWeight +
    ticketPenalty * ticketWeight +
    npsNormalized * npsWeight +
    paymentScore * paymentWeight
  );

  let churnRisk: "LOW" | "MODERATE" | "HIGH" = "LOW";
  if (finalScore < 45) churnRisk = "HIGH";
  else if (finalScore < 70) churnRisk = "MODERATE";

  return { score: finalScore, churnRisk };
}
\`\`\`

---

### 2. Context-Aware LLM Synthesis with Google Gemini

When a customer's health score drops into the "HIGH risk" zone, waiting for a human rep to notice is usually too late. SharCRM connects the health engine directly to **Google Gemini**.

Instead of sending generic prompts, we inject high-density contextual vectors:
- Recent interactions & unanswered questions
- Sentiment trajectory over the last 90 days
- Specific feature usage decline

\`\`\`typescript
export async function generateRetentionActionPlan(
  customerProfile: CustomerProfile,
  timeline: Interaction[]
): Promise<string> {
  const prompt = \`
    You are an elite enterprise account recovery strategist.
    Customer: \${customerProfile.companyName}
    Current Health Score: \${customerProfile.healthScore}/100
    Risk Factor: \${customerProfile.churnRisk}
    
    Timeline of recent interactions:
    \${JSON.stringify(timeline.slice(-5))}
    
    Synthesize:
    1. Root cause analysis of friction
    2. Suggested executive intervention strategy
    3. Personalized email outreach draft for the account owner
  \`;

  const response = await geminiModel.generateContent(prompt);
  return response.response.text();
}
\`\`\`

> [!NOTE]
> Grounding LLM generations with structured interaction histories reduced hallucination rates to effectively zero and gave account managers immediate, battle-ready talking points.

---

### 3. Key Architectural Takeaways

1. **AI is useless without clean state**: Clean pipelines and deterministic customer metrics provide the bedrock upon which generative intelligence thrives.
2. **Automate the analysis, empower the human**: Rather than replacing sales reps, our system surfaces high-priority alerts so they can act before a contract is lost.`,
  },
  {
    id: "post-3",
    slug: "generative-tactical-interfaces-nextjs-tambo",
    title: "The Kinetic Frontier: Designing Generative Tactical Interfaces with Next.js & Tambo AI",
    description:
      "A technical walkthrough of Armory Intelligence: building cinematic, AI-synthesized military/sci-fi analytics with real-time UI generation and Next.js 15.",
    publishedAt: "2026-06-10",
    readTime: "6 min read",
    category: "Generative UI",
    tags: ["Next.js", "Generative UI", "Tambo AI", "Framer Motion", "Tailwind CSS"],
    author: {
      name: "Luxmikant",
      role: "Backend + Cloud + AI Engineer",
    },
    featured: false,
    content: `Interfaces should not feel static. When we built **Armory Intelligence — The Elite Arsenal Nexus**, the vision was to break away from traditional dashboards and construct a cinematic tactical command console that dynamically renders AI-crafted UI components in real time.

---

### 1. What is Generative UI?

Traditional applications render fixed components with dynamic text. **Generative UI** goes a step further: the LLM decides *which* specialized widgets to instantiate based on user query intent.

For example, when querying:
- *"Compare the thermal output of an E-Web Heavy Repeating Blaster to an M2 Browning"*
- The system doesn't return a markdown table. It dynamically streams an interactive **Ballistics Comparator**, a **Holographic Heat Signature Gauge**, and an interactive **Tactical Assessment Box**.

\`\`\`tsx
// Dynamic component registry streaming directly into the Next.js client boundary
export const TacticalComponentRegistry = {
  BallisticsComparator: dynamic(() => import("./Tactical/BallisticsComparator")),
  HeatSignatureGauge: dynamic(() => import("./Tactical/HeatSignatureGauge")),
  TacticalBriefingCard: dynamic(() => import("./Tactical/TacticalBriefingCard")),
};
\`\`\`

---

### 2. High-Performance Framer Motion Orchestration

Tactical sci-fi interfaces require snappy, physics-driven micro-interactions. Using Framer Motion layout springs and SVG clip-path reveals, we achieve that tactile "hardware-accelerated" military console feel:

\`\`\`tsx
export function ReticleScanner({ active }: { active: boolean }) {
  return (
    <motion.div
      className="reticle-ring"
      animate={active ? { rotate: 360, scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-500/60">
        <circle cx="50" cy="50" r="45" strokeDasharray="6 4" fill="none" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
}
\`\`\`

---

### 3. Summary
Generative interfaces redefine how users interact with dense datasets. By blending robust Next.js App Router streaming with generative component protocols, we bridge the gap between imagination and functional software engineering.`,
  },
  {
    id: "post-4",
    slug: "himalayan-solitude-and-engineering-ownership",
    title: "Silence Above 14,000 Feet: What Himalayan Solitude Taught Me About Engineering Ownership",
    description:
      "Reflections from Kullu, Himachal Pradesh on endurance, system resilience, minimalist software architecture, and the power of quiet contemplation.",
    publishedAt: "2026-05-02",
    readTime: "5 min read",
    category: "Himalayan Reflections",
    tags: ["Philosophy", "Himalayas", "Ownership", "Mindset"],
    author: {
      name: "Luxmikant",
      role: "Backend + Cloud + AI Engineer",
    },
    featured: false,
    content: `Growing up and working amidst the towering ridges of Kullu in Himachal Pradesh shapes your relationship with complexity, patience, and endurance.

In the mountains, nature has zero tolerance for fluff. If you pack unnecessary gear on a high-altitude pass, gravity reminds you at every step. If you misjudge a river crossing, there are no instant rollback buttons.

---

### 1. Minimalist Engineering

In software engineering, we frequently confuse complexity with capability. Engineers often add layers of caching, message brokers, and complex microservices before they even understand the shape of their problem.

The mountains teach you the opposite: **strip away everything that does not directly carry the weight.**

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

When I design backend systems, I strive for that same alpine clarity:
- Clean, uncoupled modules
- Explicit data flow over implicit magic
- Minimal external dependencies

---

### 2. Resilience Under Adverse Conditions

In remote Himalayan hamlets, systems must endure blizzards, rockfalls, and severed power lines. Resilience is not an afterthought; it is built into the foundation of every traditional wooden and stone *Kath-Kuni* structure.

In distributed computing, we build for network partitions, latency spikes, and hardware degradation. A good engineer assumes failure will occur and crafts deterministic fallbacks:
- Idempotent API endpoints
- Graceful degradation of non-critical services
- Clear circuit breakers

---

### 3. The Depth of Companionship

On high trails, companions share rations, watch each other's footing, and celebrate quiet vistas together. When I collaborate with teams, I bring that same sense of stewardship.

You don't just get my code; you get someone who genuinely cares about the long-term health of the architecture, the happiness of the team, and the stories we forge along the journey.`,
  },
];

// Helper to calculate reading time from markdown content
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

// Helper to generate a slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
