import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  source: string;
}

interface WebhookPayload extends LeadPayload {
  timestamp: string;
  origin: string;
}

function validateLeadPayload(body: unknown): LeadPayload | null {
  if (!body || typeof body !== "object") return null;

  const payload = body as Record<string, unknown>;

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const company =
    typeof payload.company === "string" ? payload.company.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const source =
    typeof payload.source === "string" ? payload.source.trim() : "unknown";

  if (!name || !email || !phone) {
    return null;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return null;
  }

  return { name, email, phone, company, message, source };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const leadData = validateLeadPayload(body);
    if (!leadData) {
      return NextResponse.json(
        { success: false, message: "Invalid form data. Please check all required fields." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("WEBHOOK_URL environment variable is not set");
      return NextResponse.json(
        { success: false, message: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    const webhookPayload: WebhookPayload = {
      ...leadData,
      timestamp: new Date().toISOString(),
      origin: request.headers.get("origin") || "unknown",
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error(
        `Webhook request failed with status: ${webhookResponse.status}`
      );
      return NextResponse.json(
        { success: false, message: "Failed to process your request. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
