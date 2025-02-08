import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const serverSession = await getServerSession();

  if (!serverSession?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const fetchUser = await prisma.user.findUnique({
    where: {
      id: serverSession.user.id,
    },
  });

  if (!fetchUser) {
    return NextResponse.json({
      error: "User not found",
    });
  }

  const fetchQuestions = await fetch(`${process.env.BACKEND_URL}/onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: fetchUser.id,
    }),
  });
}
