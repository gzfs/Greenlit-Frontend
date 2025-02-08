import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch CSR records for the current user from our database
    const records = await prisma.csr_records.findMany({
      where: {
        user_id: session.user.id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json([]);
  } finally {
    await prisma.$disconnect();
  }
}
