import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { verifyGitHubOwnership } from "@/lib/profile-verification";
import { COMPANY_CONFIGS } from "@/lib/cindex/company-configs";

/**
 * POST /api/profile/claim
 * Claim a company profile with GitHub OAuth verification
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { companySlug } = body;

    if (!companySlug) {
      return NextResponse.json(
        { error: "Missing required field: companySlug" },
        { status: 400 }
      );
    }

    // Check if user has GitHub account linked
    const githubAccount = await prisma.account.findFirst({
      where: {
        userId: user.id,
        provider: "github",
      },
    });

    if (!githubAccount) {
      return NextResponse.json(
        {
          error: "No GitHub account linked. Please sign in with GitHub to claim a profile.",
          errorType: "no_github_account"
        },
        { status: 400 }
      );
    }

    const githubUsername = githubAccount.providerAccountId;

    // Check if company exists
    const company = await prisma.company.findUnique({
      where: { slug: companySlug },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    // Get GitHub org from company configs
    const companyConfig = COMPANY_CONFIGS.find(c => c.slug === companySlug);
    if (!companyConfig?.github?.org) {
      return NextResponse.json(
        { error: "Company does not have a GitHub organization configured" },
        { status: 400 }
      );
    }

    const githubOrg = companyConfig.github.org;

    // Check if company is already claimed
    const existingClaim = await prisma.claimedProfile.findUnique({
      where: { companySlug },
    });

    if (existingClaim) {
      return NextResponse.json(
        { error: "This company has already been claimed" },
        { status: 409 }
      );
    }

    // VERIFY GITHUB ORG MEMBERSHIP
    console.log(`Verifying GitHub org membership: ${githubUsername} in ${githubOrg}`);
    const verification = await verifyGitHubOwnership(githubOrg, githubUsername);

    if (!verification.verified) {
      console.error(`GitHub verification failed for ${githubUsername} in ${githubOrg}:`, verification.error);
      return NextResponse.json(
        {
          error: verification.error || "Unable to verify GitHub organization membership",
          errorType: verification.errorType,
          githubOrg,
          githubUsername,
        },
        { status: 403 }
      );
    }

    // Create verified claim
    const claim = await prisma.claimedProfile.create({
      data: {
        userId: user.id,
        companySlug,
        verificationType: "github",
        githubUsername,
        verified: true,
        verifiedAt: new Date(),
        verificationProof: verification.proof,
      },
    });

    console.log(`✅ Successfully verified claim for ${githubUsername} -> ${companySlug}`);

    return NextResponse.json({
      success: true,
      claim,
      message: `Successfully claimed ${company.name} using GitHub account @${githubUsername}`,
    });
  } catch (error) {
    console.error("Error claiming profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/profile/claim
 * Get current user's claimed profile
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const claim = await prisma.claimedProfile.findFirst({
      where: { userId: user.id },
    });

    if (!claim) {
      return NextResponse.json({ claim: null });
    }

    // Get company details
    const company = await prisma.company.findUnique({
      where: { slug: claim.companySlug },
    });

    return NextResponse.json({
      claim,
      company,
    });
  } catch (error) {
    console.error("Error fetching claimed profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
