import { NextResponse } from "next/server";
import { BlogPost, BlogCategory } from "@/types/blog";
import { savePost } from "@/utils/storage";
import { calculateReadTime, generateSlug } from "@/utils/blogData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, content, category, tags, coverImage } = body;

    if (!title || !description || !content) {
      return NextResponse.json(
        { success: false, message: "Title, description, and content are required." },
        { status: 400 }
      );
    }

    const slug = body.slug ? generateSlug(body.slug) : generateSlug(title);
    const readTime = calculateReadTime(content);
    const publishedAt = new Date().toISOString().split("T")[0];

    const post: BlogPost = {
      id: `post-${Date.now()}`,
      slug,
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      category: (category as BlogCategory) || "Backend & Systems",
      tags: Array.isArray(tags) ? tags : (tags as string).split(",").map((t) => t.trim()).filter(Boolean),
      publishedAt,
      readTime,
      coverImage: coverImage || undefined,
      author: {
        name: "Luxmikant",
        role: "Backend + Cloud + AI Engineer",
      },
    };

    savePost(post);

    return NextResponse.json({
      success: true,
      message: "Article published successfully!",
      post,
      url: `/blog/${post.slug}`,
    });
  } catch (error) {
    console.error("Blog publish API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to publish article." },
      { status: 500 }
    );
  }
}
