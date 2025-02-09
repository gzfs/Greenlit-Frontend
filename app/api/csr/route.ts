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
    const { description, event_id, followup_answers, name } = body;

    if (event_id && followup_answers) {
      // Handle followup answers case
      const requestBody = {
        event_id,
        followup_answers,
        user_id: session.user.id,
      };

      const response = await fetch(`${API_URL}/aakhil/classify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const aiResponse = await response.json();
      return NextResponse.json(aiResponse);
    } else {
      // Handle new initiative creation
      const record = await prisma.csr_records.create({
        data: {
          id: Math.random().toString(36).substring(7), // Generate a random ID
          name,
          description,
          user_id: session.user.id,
          complete: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // Get AI classification for the new initiative
      const requestBody = {
        description,
        user_id: session.user.id,
      };

      const response = await fetch(`${API_URL}/aakhil/classify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });


      const aiResponse = await response.json();
      
      // Update the record with AI response data
      const updatedRecord = await prisma.csr_records.update({
        where: { id: record.id },
        data: {
          questions: aiResponse.questions,
          track: aiResponse.track,
        },
      });

      return NextResponse.json(updatedRecord);
    }
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
