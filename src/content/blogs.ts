export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "callout"; title: string; text: string }
  | { type: "hr" };

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  readingTime: string;
  excerpt: string;
  tags: string[];
  blocks: BlogBlock[];
}

const DISTIL_POST: BlogPost = {
  slug: "distil-context-engine",
  title:
    "Distil: how to keep your coding agents' project context for a few tokens",
  date: "August 30, 2026",
  dateISO: "2026-08-30",
  readingTime: "12 min read",
  excerpt:
    "A deep dive into Distil — a project-context engine that folds agent-harness session events into a durable, evidence-traced PROJECT.ctx so you never re-pay the token bill to understand your own codebase.",
  tags: ["Agentic AI", "Context Engineering", "LLM Systems", "TypeScript"],

  blocks: [
    {
      type: "p",
      text: "In this post, I'll introduce the core idea behind Distil and walk through each part of the system: the fold engine, the token wallet, the digest, and the reading surface. The goal is to give you an accurate mental model of a project-context engine without drowning you in minutiae — an inverse-pyramid approach: start broad, then layer in detail.",
    },
    { type: "p", text: "This post is structured into five parts:" },
    {
      type: "ol",
      items: [
        "The double token bill — why understanding a project costs more than building it",
        "The fold engine — events become typed facts, deterministically",
        "The token wallet — exact tokens from provider reports, never guessed",
        "The digest — an LLM interpretation that the fold is allowed to overrule",
        "The loop and its surface — sync, digest, ask, budget, render, serve",
      ],
    },
    {
      type: "callout",
      title: "Notes",
      text: "Analysis is based on the real Distil codebase (Engine + CLI). Target audience: anyone building or contributing to agent harnesses, context-management layers, or token-sensitive developer tooling.",
    },
    {
      type: "p",
      text: "When a coding agent builds your project, you pay two token bills. The first is the tokens spent generating code — that's the bill everyone watches. The second is the tokens spent understanding the project later, and it's hidden: every architectural decision, trade-off, and fix lives only inside session transcripts. Come back in a week and recovering that context means re-reading code, commits, and logs, thousands of tokens at a time.",
    },
    {
      type: "p",
      text: "The agent that built your code doesn't leave you a map. Distil is that map. It watches the harness's event stream while the agent works, and distills it into a single versioned file — PROJECT.ctx — that answers questions about your project for a few tokens instead of a fortune.",
    },

    { type: "h2", text: "The double token bill" },
    {
      type: "p",
      text: "Ask any developer what a freshly-built codebase does and they'll re-read it. That re-reading is a second inference run over the same content: the code, the git history, the conversation that produced both. It's expensive because it has to be done fresh every time — nothing was stored.",
    },
    {
      type: "p",
      text: "Four questions frame the problem: Who has it? What makes it worth solving? Does the solution handle it well? Can another person reproduce the result? For Distil, the user is a developer (and their team) who builds with an agent harness; the bottleneck is the amortized cost of re-understanding the project; the answer is a durable, evidence-traced context file.",
    },
    {
      type: "callout",
      title: "The design bet",
      text: "Understanding should be a stored artifact, not a regenerated one. Store a tight distillate as you build, and answer questions from it afterwards — instead of re-running comprehension from scratch each time.",
    },

    { type: "h2", text: "The fold engine" },
    {
      type: "p",
      text: "The harness emits a stream of session events: turn.created, model.message (with usage), model.message.delta, tool.response, thread.created, sandbox.created, tool.approval_required, and turn.done. That stream is raw — verbose, ordered, and full of noise. The engine's core is a set of pure, synchronous folds that reduce it into typed facts.",
    },
    {
      type: "code",
      lang: "ts",
      code: `// The engine is a pure fold: same events, same state.
export function foldSessionItems(
  state: DistilContextV1,
  sessionId: string,
  items: readonly SessionEventItem[],
): DistilContextV1 {
  const rebuilt = rebuildSession(sessionId, items);
  const previous = state.sessions[sessionId];
  if (previous !== undefined && JSON.stringify(previous) === JSON.stringify(rebuilt)) return state;
  const sessions = { ...state.sessions, [sessionId]: rebuilt };
  return finalize({ ...state, sessions }, rebuilt);
}`,
    },
    {
      type: "p",
      text: "Two properties make the fold trustworthy. First, the identity rule: an event that changes nothing returns the same state reference, so change detection is a cheap Object.is. Second, it is rerunnable and idempotent — re-syncing rebuilds a session's summary from its events instead of accumulating a mutable one, so it never double-counts.",
    },
    {
      type: "p",
      text: "Notice what the fold records. Per session: turns, start/end, token usage, wall-clock time (ttft, decode, tool time), approvals (human checkpoints), subagent threads, sandboxes, error messages, tool usage, and file mentions. All of it derives from the event stream; none of it is an opinion.",
    },
    {
      type: "code",
      lang: "ts",
      code: `// A model.message contributes exact usage when the provider reports it.
case "model.message": {
  const message = event as ModelMessageEvent;
  if (message.usage !== undefined) {
    const usage = usageOf(message);
    if (usage !== undefined) addUsage(open.usage, usage);
    else if (message.content && message.content !== "") turn.unprovenUsage = true;
  } else if (message.content && message.content !== "") {
    turn.unprovenUsage = true;
  }
  return;
}`,
    },

    { type: "h2", text: "The token wallet" },
    {
      type: "p",
      text: "Token accounting is deliberately fail-closed. The wallet folds only provider-reported usage, normalizing across the shapes different providers emit — input_tokens or prompt_tokens, output_tokens or completion_tokens, plus cache variants. If a payload can't be proven, it counts as zero; a chars-per-token heuristic exists but is always labeled estimated and never presented as exact.",
    },
    {
      type: "code",
      lang: "ts",
      code: `// Normalize any provider's usage into provider-independent buckets.
if (inputTokens === undefined || outputTokens === undefined) return undefined;
return {
  inputTokens,
  outputTokens,
  ...(cacheReadTokens !== undefined ? { cacheReadTokens } : {}),
  ...(cacheWriteTokens !== undefined ? { cacheWriteTokens } : {}),
};`,
    },
    {
      type: "p",
      text: "The reason matters. A wallet that guesses low makes cost look better than it is, and a developer who trusts it will budget wrong. Folding only what the provider actually reported keeps the numbers honest — and the budget stays a real signal for the measured-improvement story.",
    },

    { type: "h2", text: "The digest" },
    {
      type: "p",
      text: "Folded facts are mechanical but laconic. The digest is the narrative layer: eight fixed sections (primary request and intent, key technical concepts, files and code, errors and fixes, pending jobs, current work, next step, critical context) generated by an LLM from the folded evidence. Every section keeps its slot; an empty one is written as (none), never dropped.",
    },
    {
      type: "p",
      text: "The relationship between the two is the most important design decision in the whole system: the fold wins. Facts are rebuilt deterministically from events; the digest is an interpretation that records which sessions it was generated from. If the digest contradicts a folded fact, that's a bug in the digest, not a license to edit the fact.",
    },
    {
      type: "callout",
      title: "Rule of thumb",
      text: "Store the distillate first, let the model interpret it second — never the other way around. A mutable summary that an agent rewrites in place drifts; a fold that regenerates from events does not.",
    },

    { type: "h2", text: "The loop and its surface" },
    {
      type: "p",
      text: "The whole thing is a closed loop. Events are folded by sync (or watch, which polls on an interval), the digest is generated by a digest command, and four thin commands read the same file without regenerating anything.",
    },
    {
      type: "code",
      lang: "bash",
      code: `# 1. Harness (one command, no clone)
npx @truefoundry/trueforge            # -> http://localhost:8790

# 2. Initialize and watch
pnpm distil init --root /path/to/project
pnpm distil sync --watch --root /path/to/project

# 3. Generate the digest (any OpenAI-compatible model)
DISTIL_LLM_BASE_URL=... DISTIL_LLM_API_KEY=... DISTIL_LLM_MODEL=... \\
  pnpm distil digest --root /path/to/project

# 4. Read the result
pnpm distil ask "what does this project do and how was it built?" --root /path/to/project
pnpm distil budget --root /path/to/project
pnpm distil serve --root /path/to/project   # -> http://127.0.0.1:4173`,
    },
    {
      type: "p",
      text: "The serve command is the visual surface: a self-contained web dashboard with zero runtime dependencies that reads PROJECT.ctx and renders the token budget, the digest, the sessions, the tools, and the files touched. It's deliberately offline-friendly — no CDN, no build step — so it stays cheap and reproducible.",
    },
    {
      type: "p",
      text: "A second writer exists: the distil-maintainer agent, which owns the digest half of the file and runs the same skill a human would. Its writes to PROJECT.ctx are approval-gated by the harness, which keeps the destructive action under human control. That's the control-and-safety moment: an agent can improve the map, but a person approves the overwrite.",
    },

    { type: "h2", text: "Benchmarks and observations" },
    {
      type: "p",
      text: "The honest metric here is not throughput — it's tokens saved. The baseline is a developer re-reading a repo to answer one question. Distil's answer: the folded facts are already stored, and the digest is a bounded LLM call. The delta is the difference between reconstructing understanding from scratch and reading a small, indexed artifact.",
    },
    {
      type: "p",
      text: "The first end-to-end run taught a real lesson: every digest section came back (none) — not a parsing bug, but the model correctly refusing to invent content for sessions that held only smoke-test turns. The digest is only as good as the facts folded into it. That failure mode drove the change to fold error strings and richer evidence into the summaries, so the digest has something real to say.",
    },
    {
      type: "callout",
      title: "Hot take",
      text: "Derived facts must fold from an authoritative event stream, never from a mutable summary. Build the durable record first, let an LLM interpret it second — otherwise the summary you trust is the one you never verified.",
    },

    { type: "hr" },
    {
      type: "p",
      text: "Distil is small on purpose: a pure engine, a thin CLI, and a maintainer skill. The value isn't in a bigger model — it's in not having to re-run comprehension over your own project every time you sit down to work. If you build with coding agents, the second token bill is real; this is one way to stop paying it.",
    },
  ],
};

export const blogPosts: BlogPost[] = [DISTIL_POST];

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
