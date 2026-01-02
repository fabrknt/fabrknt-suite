/**
 * Recalculate Index Scores for All Companies
 * Reads existing company JSON files, recalculates scores using updated calculation logic,
 * and updates the JSON files with new scores.
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { calculateIndexScore } from "../src/lib/index/calculators/score-calculator";
import { IndexData, IndexScore } from "../src/lib/api/types";
import { Company } from "../src/lib/index/companies";

interface StoredCompanyData {
    slug: string;
    fetchedAt: string;
    metadata: {
        name: string;
        chain: string;
        description: string;
    };
    rawData: IndexData;
    scores: IndexScore;
    company: Company;
}

const DATA_DIR = join(process.cwd(), "data", "companies");

/**
 * Generic function to convert IndexData + IndexScore to Company
 * Preserves existing company metadata (description, logo, website, etc.)
 */
function updateCompanyFromScores(
    existingCompany: Company,
    data: IndexData,
    score: IndexScore
): Company {
    // Determine trend based on growth and team health
    const isPrivateDev = data.github.totalCommits30d < 5;
    const hasWebActivity =
        (score.breakdown.onchain as any).webActivityScore > 40;
    const trend: "up" | "stable" | "down" =
        isPrivateDev && hasWebActivity
            ? "up"
            : score.growthScore > 50
            ? "up"
            : score.growthScore < 30
            ? "down"
            : "stable";

    return {
        ...existingCompany,
        // Update scores
        overallScore: score.overall,
        teamHealth: {
            ...existingCompany.teamHealth,
            score: score.teamHealth,
            githubCommits30d: data.github.totalCommits30d,
            activeContributors: data.github.activeContributors30d,
            contributorRetention: Math.round(
                (data.github.activeContributors30d /
                    Math.max(data.github.totalContributors, 1)) *
                    100
            ),
        },
        growth: {
            ...existingCompany.growth,
            score: score.growthScore,
            onChainActivity30d: data.onchain.transactionCount30d || 0,
            tvl: data.onchain.tvl || existingCompany.growth.tvl,
        },
        trend,
        news: data.news || existingCompany.news,
    };
}

/**
 * Recalculate scores for a single company
 */
function recalculateCompanyScores(slug: string): {
    success: boolean;
    oldScore: number;
    newScore: number;
    error?: string;
} {
    try {
        const filePath = join(DATA_DIR, `${slug}.json`);

        // Read existing data
        const fileContent = readFileSync(filePath, "utf-8");
        const storedData: StoredCompanyData = JSON.parse(fileContent);

        if (!storedData.rawData) {
            return {
                success: false,
                oldScore: storedData.company.overallScore,
                newScore: storedData.company.overallScore,
                error: "No rawData found",
            };
        }

        const oldScore = storedData.company.overallScore;

        // Recalculate scores using updated calculation logic
        const newScores = calculateIndexScore(
            storedData.rawData.github,
            storedData.rawData.twitter,
            storedData.rawData.onchain,
            storedData.rawData.category,
            storedData.rawData.news
        );

        // Update company object with new scores
        const updatedCompany = updateCompanyFromScores(
            storedData.company,
            storedData.rawData,
            newScores
        );

        // Update stored data
        const updatedStoredData: StoredCompanyData = {
            ...storedData,
            scores: newScores,
            company: updatedCompany,
            fetchedAt: new Date().toISOString(), // Update timestamp
        };

        // Write back to file
        writeFileSync(
            filePath,
            JSON.stringify(updatedStoredData, null, 2),
            "utf-8"
        );

        return {
            success: true,
            oldScore,
            newScore: newScores.overall,
        };
    } catch (error) {
        return {
            success: false,
            oldScore: 0,
            newScore: 0,
            error: error instanceof Error ? error.message : String(error),
        };
    }
}

/**
 * Main function to recalculate scores for all companies
 */
async function main() {
    console.log("🔄 Recalculating Index Scores for All Companies\n");

    // Get all JSON files in the companies directory
    const files = readdirSync(DATA_DIR).filter(
        (file) =>
            file.endsWith(".json") &&
            file !== "all-companies.json" &&
            file !== "funding.json" // Skip funding.json (not a company)
    );

    const slugs = files.map((file) => file.replace(".json", ""));

    console.log(`Found ${slugs.length} companies to process:\n`);

    const results: Array<{
        slug: string;
        success: boolean;
        oldScore: number;
        newScore: number;
        change: number;
        error?: string;
    }> = [];

    // Process each company
    for (const slug of slugs) {
        console.log(`Processing ${slug}...`);
        const result = recalculateCompanyScores(slug);
        const change = result.newScore - result.oldScore;
        results.push({
            slug,
            ...result,
            change,
        });

        if (result.success) {
            console.log(
                `  ✅ ${slug}: ${result.oldScore} → ${result.newScore} (${
                    change > 0 ? "+" : ""
                }${change})`
            );
        } else {
            console.log(`  ❌ ${slug}: ${result.error}`);
        }
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 Summary\n");

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    console.log(`✅ Successfully updated: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}\n`);

    if (successful.length > 0) {
        console.log("Score Changes:");
        successful
            .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
            .forEach((r) => {
                const changeStr =
                    r.change > 0
                        ? `+${r.change}`
                        : r.change < 0
                        ? `${r.change}`
                        : "0";
                console.log(
                    `  ${r.slug.padEnd(20)} ${r.oldScore
                        .toString()
                        .padStart(3)} → ${r.newScore
                        .toString()
                        .padStart(3)} (${changeStr})`
                );
            });
    }

    if (failed.length > 0) {
        console.log("\nFailed Companies:");
        failed.forEach((r) => {
            console.log(`  ${r.slug}: ${r.error}`);
        });
    }

    console.log("\n✅ Score recalculation complete!");
}

main().catch(console.error);
