export type BlogCategory =
  | "Backend & Systems"
  | "AI & Cloud"
  | "Generative UI"
  | "Himalayan Reflections";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // YYYY-MM-DD
  readTime: string; // e.g. "6 min read"
  category: BlogCategory;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featured?: boolean;
  coverImage?: string;
  content: string; // Markdown content
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string; // ISO string
  source?: string;
  status: "active" | "unsubscribed";
}
