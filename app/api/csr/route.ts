import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

const API_URL = "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { description, event_id, followup_answers } = body;

    const requestBody = {
      description,
      event_id,
      followup_answers,
      user_id: session.user.id,
    };
    console.log("Request Body:", requestBody);

    const response = await fetch(`${API_URL}/classify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const aiResponse = await response.json();
    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("CSR API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("API Session:", session);
    
    if (!session?.user?.id) {
      console.log("No session or user ID. Session:", session);
      console.log("User:", session?.user);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const event_id = searchParams.get("event_id");

    if (event_id) {
      const response = await fetch(`${API_URL}/status/${event_id}`);
      const data = await response.json();
      return NextResponse.json(data);
    }

    // Get all events for this user from the FastAPI backend
    const response = await fetch(`${API_URL}/events/${session.user.id}`);
    const events = await response.json();
    console.log("Found events:", events);
    
    return NextResponse.json(events);
  } catch (error) {
    console.error("CSR API Error:", error);
    return NextResponse.json([]);
  }
} 