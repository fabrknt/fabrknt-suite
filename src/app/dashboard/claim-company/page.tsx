import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ClaimCompanyClient } from "./claim-company-client";

export const metadata = {
  title: "Claim Your Company | Fabrknt",
  description: "Claim your company profile to access Synergy features",
};

export default async function ClaimCompanyPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin?callbackUrl=/dashboard/claim-company");
  }

  // Check if user already has a claimed profile
  const existingClaim = await prisma.claimedProfile.findFirst({
    where: { userId: user.id },
  });

  if (existingClaim) {
    // Get company details
    const company = await prisma.company.findUnique({
      where: { slug: existingClaim.companySlug },
    });

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-card rounded-lg border border-border p-8">
          <h1 className="text-3xl font-bold mb-4">Company Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Company</label>
              <p className="text-lg font-semibold">{company?.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Category</label>
              <p>{company?.category}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">
                Verification Status
              </label>
              <p>
                {existingClaim.verified ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    Pending Verification
                  </span>
                )}
              </p>
            </div>
            {!existingClaim.verified && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  Your claim is pending verification. Once verified, you'll be
                  able to discover partnerships and connect with other
                  companies.
                </p>
              </div>
            )}
            {existingClaim.verified && (
              <div className="mt-6">
                <a
                  href="/synergy/discover"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Go to Synergy Discovery →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Get all active companies for selection
  const companies = await prisma.company.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: {
      slug: true,
      name: true,
      category: true,
      description: true,
      logo: true,
      overallScore: true,
    },
  });

  // Get already claimed companies to filter them out
  const claimedSlugs = await prisma.claimedProfile.findMany({
    select: { companySlug: true },
  });
  const claimedSet = new Set(claimedSlugs.map((c) => c.companySlug));

  const availableCompanies = companies.filter(
    (c) => !claimedSet.has(c.slug)
  );

  return (
    <ClaimCompanyClient
      companies={availableCompanies}
      user={{ id: user.id!, name: user.name || "", email: user.email || "" }}
    />
  );
}
