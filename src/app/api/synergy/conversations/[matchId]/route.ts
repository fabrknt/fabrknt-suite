import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

/**
 * GET /api/synergy/conversations/[matchId]
 * Get conversation metadata for a match
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's claimed profile
    const claimedProfile = await prisma.claimedProfile.findFirst({
      where: { userId: user.id, verified: true },
    });

    if (!claimedProfile) {
      return NextResponse.json(
        { error: "No verified company profile found" },
        { status: 403 }
      );
    }

    const { matchId } = await params;

    // Get the match
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        conversation: {
          include: {
            messages: {
              orderBy: { createdAt: "asc" },
              take: 50, // Last 50 messages
            },
          },
        },
      },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    // Verify user is part of this match
    if (
      match.companyASlug !== claimedProfile.companySlug &&
      match.companyBSlug !== claimedProfile.companySlug
    ) {
      return NextResponse.json(
        { error: "You are not part of this match" },
        { status: 403 }
      );
    }

    // Get company details for both participants
    const [companyA, companyB] = await Promise.all([
      prisma.company.findUnique({
        where: { slug: match.companyASlug },
        select: { slug: true, name: true, logo: true, category: true },
      }),
      prisma.company.findUnique({
        where: { slug: match.companyBSlug },
        select: { slug: true, name: true, logo: true, category: true },
      }),
    ]);

    // If no conversation exists yet, create one
    let conversation = match.conversation;
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          matchId: match.id,
        },
        include: {
          messages: true,
        },
      });
    }

    return NextResponse.json({
      conversation,
      match: {
        id: match.id,
        matchScore: match.matchScore,
        status: match.status,
        matchedAt: match.matchedAt,
      },
      participants: {
        companyA,
        companyB,
      },
      currentUserCompanySlug: claimedProfile.companySlug,
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
