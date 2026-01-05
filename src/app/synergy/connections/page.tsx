import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { MatchesList } from "@/components/synergy/matches-list";

export default async function ConnectionsPage() {
  // Check authentication
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin?callbackUrl=/synergy/connections");
  }

  // Get user's claimed profile
  const claimedProfile = await prisma.claimedProfile.findFirst({
    where: { userId: user.id },
  });

  if (!claimedProfile) {
    redirect("/dashboard/claim-company");
  }

  // Check if profile is verified
  if (!claimedProfile.verified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4 bg-card p-8 rounded-lg border border-border">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Profile Not Verified</h1>
          <p className="text-muted-foreground">
            Your company profile is pending verification. Once verified, you'll
            be able to access Synergy features.
          </p>
          <a
            href="/dashboard/claim-company"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            View Profile Status →
          </a>
        </div>
      </div>
    );
  }

  // Get company data
  const company = await prisma.company.findUnique({
    where: { slug: claimedProfile.companySlug },
  });

  if (!company) {
    return notFound();
  }

  // Get all mutual matches
  const matches = await prisma.match.findMany({
    where: {
      OR: [
        { companyASlug: claimedProfile.companySlug },
        { companyBSlug: claimedProfile.companySlug },
      ],
    },
    orderBy: {
      matchedAt: "desc",
    },
  });

  // Get partner company details for each match
  const enrichedMatches = await Promise.all(
    matches.map(async (match) => {
      // Determine which company is the partner
      const partnerSlug =
        match.companyASlug === claimedProfile.companySlug
          ? match.companyBSlug
          : match.companyASlug;

      // Get partner company data
      const partnerData = await prisma.company.findUnique({
        where: { slug: partnerSlug },
        select: {
          slug: true,
          name: true,
          category: true,
          description: true,
          logo: true,
          website: true,
          overallScore: true,
          teamHealthScore: true,
          growthScore: true,
          trend: true,
          indexData: true,
        },
      });

      // Extract chain from indexData with robust fallback
      const indexData = (partnerData?.indexData as any) || {};
      let chain = "ethereum"; // default fallback
      if (indexData?.onchain?.chain && typeof indexData.onchain.chain === 'string' && indexData.onchain.chain.trim()) {
        chain = indexData.onchain.chain.trim().toLowerCase();
      }

      const partner = partnerData ? {
        ...partnerData,
        chain,
      } : null;

      // Get the swipes that created this match
      const userSwipe = await prisma.swipe.findFirst({
        where: {
          companySlug: claimedProfile.companySlug,
          partnerSlug,
        },
      });

      const partnerSwipe = await prisma.swipe.findFirst({
        where: {
          companySlug: partnerSlug,
          partnerSlug: claimedProfile.companySlug,
        },
      });

      return {
        id: match.id,
        partner,
        matchScore: match.matchScore,
        status: match.status,
        createdAt: match.matchedAt, // Using matchedAt as createdAt for display
        userAction: userSwipe?.action,
        partnerAction: partnerSwipe?.action,
      };
    })
  );

  return (
    <div className="min-h-screen bg-muted">
      <MatchesList
        userCompany={{
          slug: company.slug,
          name: company.name,
          category: company.category,
          logo: company.logo,
        }}
        matches={enrichedMatches}
      />
    </div>
  );
}
