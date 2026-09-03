import { NextResponse } from "next/server";
import { saveSubscriber, getSubscribers } from "@/utils/storage";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const result = saveSubscriber(email.trim(), source || "blog_footer");
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = getSubscribers();
    const bccString = subscribers.map((s) => s.email).join(", ");
    
    return NextResponse.json({
      success: true,
      totalSubscribers: subscribers.length,
      subscribers,
      bccString,
    });
  } catch (error) {
    console.error("Newsletter GET API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch subscribers." },
      { status: 500 }
    );
  }
}
