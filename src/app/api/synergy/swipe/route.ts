import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendMatchNotification } from "@/lib/email/match-notifications";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();

    // Parse request body
    const body = await req.json();
    const { companySlug, partnerSlug, action } = body;

    if (!companySlug || !partnerSlug || !action) {
      return NextResponse.json(
        { error: "Missing required fields: companySlug, partnerSlug, action" },
        { status: 400 }
      );
    }

    // Validate action
    if (!["interested", "passed", "super_like"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be: interested, passed, or super_like" },
        { status: 400 }
      );
    }

    // TEMPORARY: Demo mode for testing without authentication
    if (!user) {
      // Return mock response for demo mode
      return NextResponse.json({
        success: true,
        swipe: {
          id: "demo-swipe",
          action: action,
          createdAt: new Date(),
        },
        isMatch: false,
        matchId: null,
        demoMode: true,
      });
    }

    // At this point, user is guaranteed to be defined (checked above)
    const userId = user.id!;

    // Verify user owns this company profile
    const claimedProfile = await prisma.claimedProfile.findFirst({
      where: {
        userId,
        companySlug,
      },
    });

    if (!claimedProfile) {
      return NextResponse.json(
        { error: "You don't have permission to swipe for this company" },
        { status: 403 }
      );
    }

    // Save swipe
    const swipe = await prisma.swipe.create({
      data: {
        userId,
        companySlug,
        partnerSlug,
        action,
      },
    });

    // Check for mutual match (only if action is interested or super_like)
    let isMatch = false;
    let matchId = null;

    if (action === "interested" || action === "super_like") {
      // Check if partner has also swiped right on us
      const reciprocalSwipe = await prisma.swipe.findFirst({
        where: {
          companySlug: partnerSlug,
          partnerSlug: companySlug,
          action: {
            in: ["interested", "super_like"],
          },
        },
      });

      if (reciprocalSwipe) {
        isMatch = true;

        // Create or update match record
        // Ensure consistent ordering (alphabetical) for the unique constraint
        const [companyA, companyB] = [companySlug, partnerSlug].sort();

        const match = await prisma.match.upsert({
          where: {
            companyASlug_companyBSlug: {
              companyASlug: companyA,
              companyBSlug: companyB,
            },
          },
          create: {
            companyASlug: companyA,
            companyBSlug: companyB,
            matchScore: 0, // TODO: Calculate actual match score
            status: "new",
          },
          update: {
            status: "new",
          },
        });

        matchId = match.id;

        // Send email notifications to both parties
        try {
          // Get company details
          const [userCompany, partnerCompany] = await Promise.all([
            prisma.company.findUnique({
              where: { slug: companySlug },
              select: { name: true, description: true },
            }),
            prisma.company.findUnique({
              where: { slug: partnerSlug },
              select: { name: true, description: true },
            }),
          ]);

          // Get partner's claimed profile to find their user
          const partnerProfile = await prisma.claimedProfile.findFirst({
            where: { companySlug: partnerSlug },
            include: { user: true },
          });

          // Send notification to current user
          if (user.email && userCompany && partnerCompany) {
            await sendMatchNotification({
              userEmail: user.email,
              userName: user.name || "there",
              userCompanyName: userCompany.name,
              partnerCompanyName: partnerCompany.name,
              partnerCompanySlug: partnerSlug,
              partnerDescription: partnerCompany.description || undefined,
              matchScore: match.matchScore,
            });
          }

          // Send notification to partner user
          if (partnerProfile?.user?.email && userCompany && partnerCompany) {
            await sendMatchNotification({
              userEmail: partnerProfile.user.email,
              userName: partnerProfile.user.name || "there",
              userCompanyName: partnerCompany.name,
              partnerCompanyName: userCompany.name,
              partnerCompanySlug: companySlug,
              partnerDescription: userCompany.description || undefined,
              matchScore: match.matchScore,
            });
          }
        } catch (emailError) {
          // Log but don't fail the request if email fails
          console.error("Error sending match notification emails:", emailError);
        }

        // TODO: Create chat channel for the match
      }
    }

    return NextResponse.json({
      success: true,
      swipe: {
        id: swipe.id,
        action: swipe.action,
        createdAt: swipe.createdAt,
      },
      isMatch,
      matchId,
    });
  } catch (error: any) {
    console.error("Error saving swipe:", error);

    // Handle unique constraint violation (already swiped)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "You've already swiped on this company" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
