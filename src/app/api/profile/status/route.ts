import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ hasClaimed: false, session: false });
    }

    const claimedProfile = await prisma.claimedProfile.findFirst({
      where: { userId: user.id },
      select: {
        id: true,
        companySlug: true,
        verified: true,
      },
    });

    // Get GitHub username from Account table (fallback for UI)
    const githubAccount = await prisma.account.findFirst({
      where: {
        userId: user.id,
        provider: "github",
      },
      select: {
        providerAccountId: true,
      },
    });

    return NextResponse.json({
      hasClaimed: !!claimedProfile,
      session: true,
      profile: claimedProfile,
      githubUsername: githubAccount?.providerAccountId || null,
    });
  } catch (error) {
    console.error("Error checking profile status:", error);
    return NextResponse.json({ hasClaimed: false, session: false });
  }
}
