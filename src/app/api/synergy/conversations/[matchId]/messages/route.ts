import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

/**
 * GET /api/synergy/conversations/[matchId]/messages
 * Get messages for a conversation with pagination
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
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Get the match and verify access
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { conversation: true },
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

    if (!match.conversation) {
      return NextResponse.json({ messages: [] });
    }

    // Get messages with pagination
    const messages = await prisma.message.findMany({
      where: {
        conversationId: match.conversation.id,
        ...(cursor ? { id: { lt: cursor } } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    // Mark messages as read for the current user's company
    await prisma.message.updateMany({
      where: {
        conversationId: match.conversation.id,
        senderSlug: { not: claimedProfile.companySlug },
        read: false,
      },
      data: { read: true },
    });

    return NextResponse.json({
      messages: messages.reverse(), // Reverse to get chronological order
      hasMore: messages.length === limit,
      nextCursor: messages.length > 0 ? messages[0].id : null,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/synergy/conversations/[matchId]/messages
 * Send a new message in a conversation
 */
export async function POST(
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
    const body = await request.json();
    const { content } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    // Get the match and verify access
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { conversation: true },
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

    // Create conversation if it doesn't exist
    let conversation = match.conversation;
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { matchId: match.id },
      });
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderSlug: claimedProfile.companySlug,
        content: content.trim(),
      },
    });

    // Update match status to 'chatting' if it's new
    if (match.status === "new") {
      await prisma.match.update({
        where: { id: match.id },
        data: { status: "chatting", updatedAt: new Date() },
      });
    } else {
      // Just update the timestamp
      await prisma.match.update({
        where: { id: match.id },
        data: { updatedAt: new Date() },
      });
    }

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
