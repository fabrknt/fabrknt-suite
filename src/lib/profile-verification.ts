/**
 * Profile Verification Utilities
 * Handles verification of company profile ownership via domain, GitHub, or wallet
 */

import { prisma } from "@/lib/db";

export type VerificationType = "domain" | "github" | "wallet";

export interface VerificationResult {
  verified: boolean;
  error?: string;
  proof?: string;
  errorType?: 'not_member' | 'private' | 'api_error';
}

/**
 * Verify domain ownership via DNS TXT record
 * User adds TXT record: fabrknt-verify=<userId>
 */
export async function verifyDomainOwnership(
  domain: string,
  userId: string
): Promise<VerificationResult> {
  try {
    // In production, you would use dns.resolveTxt() to check TXT records
    // For now, this is a placeholder that you can implement with node:dns

    // Example implementation:
    // const records = await dns.promises.resolveTxt(domain);
    // const fabrkntRecord = records.flat().find(r => r.startsWith('fabrknt-verify='));
    // const recordUserId = fabrkntRecord?.split('=')[1];

    // if (recordUserId === userId) {
    //   return { verified: true, proof: `TXT record verified at ${domain}` };
    // }

    return {
      verified: false,
      error: "Domain verification not yet implemented. Use GitHub or wallet verification.",
    };
  } catch (error) {
    return {
      verified: false,
      error: `Failed to verify domain: ${error}`,
    };
  }
}

/**
 * Verify GitHub organization ownership
 * User must be a member/owner of the GitHub organization
 */
export async function verifyGitHubOwnership(
  githubOrg: string,
  githubUsername: string
): Promise<VerificationResult> {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_TOKEN) {
      return {
        verified: false,
        error: "GitHub token not configured",
        errorType: "api_error",
      };
    }

    // Check if user is a member of the organization
    const response = await fetch(
      `https://api.github.com/orgs/${githubOrg}/members/${githubUsername}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (response.status === 204) {
      // User is a member
      return {
        verified: true,
        proof: `GitHub user ${githubUsername} is a member of ${githubOrg}`,
      };
    } else if (response.status === 404) {
      // User is not a member of the organization
      return {
        verified: false,
        error: `You are not a member of the ${githubOrg} GitHub organization`,
        errorType: "not_member",
      };
    } else if (response.status === 403) {
      // Organization membership is private
      return {
        verified: false,
        error: `Your membership in ${githubOrg} is private. Please make your membership public in your GitHub settings or contact support.`,
        errorType: "private",
      };
    } else {
      return {
        verified: false,
        error: `Unable to verify GitHub membership. Please try again later. (Status: ${response.status})`,
        errorType: "api_error",
      };
    }
  } catch (error) {
    return {
      verified: false,
      error: `Failed to verify GitHub ownership: ${error}`,
      errorType: "api_error",
    };
  }
}

/**
 * Verify wallet ownership via signature
 * User signs a message with their wallet to prove ownership
 */
export async function verifyWalletOwnership(
  walletAddress: string,
  signature: string,
  message: string
): Promise<VerificationResult> {
  try {
    // In production, you would verify the signature using viem or ethers
    // Example with viem:
    // import { verifyMessage } from 'viem';
    // const valid = await verifyMessage({
    //   address: walletAddress,
    //   message,
    //   signature,
    // });

    return {
      verified: false,
      error: "Wallet verification not yet implemented. Use GitHub verification.",
    };
  } catch (error) {
    return {
      verified: false,
      error: `Failed to verify wallet signature: ${error}`,
    };
  }
}

/**
 * Get company data from database to verify against
 */
export async function getCompanyVerificationData(companySlug: string) {
  try {
    const company = await prisma.company.findUnique({
      where: { slug: companySlug },
      select: {
        slug: true,
        name: true,
        website: true,
      },
    });

    if (!company) {
      return null;
    }

    // Map of company slugs to their GitHub org (from the social links map in company page)
    const githubOrgMap: Record<string, string> = {
      orca: "orca-so",
      jupiter: "jup-ag",
      uniswap: "Uniswap",
      morpho: "morpho-org",
      euler: "euler-xyz",
      rocketpool: "rocket-pool",
      blur: "blur-io",
      safe: "safe-global",
      drift: "drift-labs",
      marginfi: "marginfi",
      kamino: "Kamino-Finance",
      tensor: "tensor-hq",
      lido: "lidofinance",
      zora: "ourzora",
      zerox: "0xProject",
      parallel: "ParallelNFT",
      velodrome: "velodrome-finance",
      metaplex: "metaplex-foundation",
      jito: "jito-foundation",
      staratlas: "staratlasmeta",
      aurory: "AuroryProject",
      mangomarkets: "blockworks-foundation",
      fabrknt: "fabrknt",
    };

    return {
      slug: company.slug,
      name: company.name,
      website: company.website,
      githubOrg: githubOrgMap[companySlug.toLowerCase()],
      // Extract domain from website
      domain: company.website ? new URL(company.website).hostname : null,
    };
  } catch (error) {
    console.error("Error loading company data:", error);
    return null;
  }
}

/**
 * Check if a profile is already claimed
 */
export async function isProfileClaimed(companySlug: string): Promise<boolean> {
  const claimed = await prisma.claimedProfile.findUnique({
    where: { companySlug },
  });

  return !!claimed;
}

/**
 * Claim a profile
 */
export async function claimProfile(
  userId: string,
  companySlug: string,
  verificationType: VerificationType,
  verificationProof: string
) {
  return await prisma.claimedProfile.create({
    data: {
      userId,
      companySlug,
      verificationType,
      verificationProof,
      verified: true,
      verifiedAt: new Date(),
    },
  });
}
