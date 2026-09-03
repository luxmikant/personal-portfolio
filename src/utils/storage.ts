import fs from "fs";
import path from "path";
import { BlogPost, NewsletterSubscriber } from "@/types/blog";
import { INITIAL_BLOG_POSTS } from "./blogData";

const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

// Ensure data directory exists
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("Could not create data directory, using memory fallback:", err);
  }
}

// In-memory fallback if filesystem write is restricted
let inMemoryPosts: BlogPost[] = [...INITIAL_BLOG_POSTS];
let inMemorySubscribers: NewsletterSubscriber[] = [];

// ============================================
// BLOG POSTS STORAGE
// ============================================

export function getAllPosts(): BlogPost[] {
  try {
    ensureDataDir();
    if (fs.existsSync(POSTS_FILE)) {
      const fileData = fs.readFileSync(POSTS_FILE, "utf-8");
      const customPosts: BlogPost[] = JSON.parse(fileData);
      // Merge initial posts with custom posts, custom posts take precedence or prepend
      const customSlugs = new Set(customPosts.map((p) => p.slug));
      const remainingInitial = INITIAL_BLOG_POSTS.filter((p) => !customSlugs.has(p.slug));
      return [...customPosts, ...remainingInitial];
    }
  } catch (err) {
    console.error("Error reading posts from disk:", err);
  }
  return inMemoryPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function savePost(post: BlogPost): boolean {
  try {
    ensureDataDir();
    const existing = getAllPosts();
    const filtered = existing.filter((p) => p.slug !== post.slug);
    const updated = [post, ...filtered];

    inMemoryPosts = updated;
    fs.writeFileSync(POSTS_FILE, JSON.stringify(updated, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving post to disk, keeping in memory:", err);
    inMemoryPosts = [post, ...inMemoryPosts.filter((p) => p.slug !== post.slug)];
    return true;
  }
}

// ============================================
// NEWSLETTER SUBSCRIBERS STORAGE
// ============================================

export function getSubscribers(): NewsletterSubscriber[] {
  try {
    ensureDataDir();
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const fileData = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading subscribers from disk:", err);
  }
  return inMemorySubscribers;
}

export function saveSubscriber(email: string, source: string = "website"): {
  success: boolean;
  isNew: boolean;
  message: string;
} {
  const normalizedEmail = email.trim().toLowerCase();
  const subscribers = getSubscribers();

  const existing = subscribers.find((s) => s.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return {
      success: true,
      isNew: false,
      message: "You are already subscribed to the dispatch! Thank you for staying connected.",
    };
  }

  const newSubscriber: NewsletterSubscriber = {
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    email: normalizedEmail,
    subscribedAt: new Date().toISOString(),
    source,
    status: "active",
  };

  const updated = [newSubscriber, ...subscribers];
  inMemorySubscribers = updated;

  try {
    ensureDataDir();
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.warn("Warning: Saved subscriber in memory only:", err);
  }

  return {
    success: true,
    isNew: true,
    message: "Welcome aboard! You have been added to Luxmikant's private dispatch list.",
  };
}
