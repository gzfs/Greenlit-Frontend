import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import prisma from '../../../lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const scores = await prisma.esg_score_calculations.findMany({
      where: {
        user: {
          email: session.user.email
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json(scores);
  } catch (error) {
    console.error('Failed to fetch ESG scores:', error);
    return NextResponse.json({ error: 'Failed to fetch ESG scores' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { pdf_url, environmental_score, social_score, governance_score, final_score, explanation } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const score = await prisma.esg_score_calculations.create({
      data: {
        pdf_url,
        environmental_score,
        social_score,
        governance_score,
        final_score,
        explanation,
        userId: user.id
      }
    });

    return NextResponse.json(score);
  } catch (error) {
    console.error('Failed to create ESG score:', error);
    return NextResponse.json({ error: 'Failed to create ESG score' }, { status: 500 });
  }
} 