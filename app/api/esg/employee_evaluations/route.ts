import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const fetchData = await prisma.employee_evaluations.findMany({
    where: {
      processed_count: 635,
    },
  });

  if (fetchData.length === 0) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }

  console.log(fetchData);

  return NextResponse.json({
    message: "Data fetched successfully",
    data: fetchData,
    status: 200,
  });
}
