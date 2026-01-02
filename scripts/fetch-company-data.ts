/**
 * Generic Script: Fetch Company Index Data
 *
 * This script can fetch index data for any company registered in the registry.
 *
 * Usage:
 *   pnpm fetch:company uniswap
 *   pnpm fetch:company jupiter
 *   pnpm fetch:company all  (fetches all companies)
 */

// Load environment variables FIRST before any imports
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { promises as fs } from "fs";
import { join } from "path";
import {
    getIndexModule,
    getAvailableCompanySlugs,
    getCompanyMetadata,
    getChainRpcInfo,
} from "../src/lib/index/registry";
import { IndexData, IndexScore } from "../src/lib/api/types";
import { Company } from "../src/lib/index/companies";
import { CrawlerService } from "../src/lib/index/crawler";
import { LLMService } from "../src/lib/index/llm";

// Initialize Services
const crawler = new CrawlerService();
const llm = new LLMService();

// Storage configuration
const DATA_DIR = join(process.cwd(), "data", "companies");

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

/**
 * Ensure data directory exists
 */
async function ensureDataDir(): Promise<void> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
        console.error(`Error creating data directory: ${error}`);
        throw error;
    }
}

/**
 * Save company data to JSON file
 */
async function saveCompanyData(
    slug: string,
    metadata: { name: string; chain: string; description: string },
    rawData: IndexData,
    scores: IndexScore,
    company: Company
): Promise<string> {
    await ensureDataDir();

    const storedData: StoredCompanyData = {
        slug,
        fetchedAt: new Date().toISOString(),
        metadata,
        rawData,
        scores,
        company,
    };

    const filePath = join(DATA_DIR, `${slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(storedData, null, 2), "utf-8");

    return filePath;
}

/**
 * Save aggregated data for all companies
 */
async function saveAllCompaniesData(companies: Company[]): Promise<string> {
    await ensureDataDir();

    const aggregatedData = {
        fetchedAt: new Date().toISOString(),
        totalCompanies: companies.length,
        companies: companies.map((c) => {
            const metadata = getCompanyMetadata(c.slug);
            return {
                slug: c.slug,
                name: c.name,
                category: c.category,
                overallScore: c.overallScore,
                chain: metadata?.chain ?? "unknown",
            };
        }),
        fullData: companies,
    };

    const filePath = join(DATA_DIR, "all-companies.json");
    await fs.writeFile(
        filePath,
        JSON.stringify(aggregatedData, null, 2),
        "utf-8"
    );

    return filePath;
}

async function fetchCompanyData(slug: string) {
    // Get company metadata to determine chain
    const metadata = getCompanyMetadata(slug);
    if (!metadata) {
        console.error(`❌ No metadata found for: ${slug}`);
        console.error(
            `\nAvailable companies: ${getAvailableCompanySlugs().join(", ")}`
        );
        return null;
    }

    const chainRpcInfo = getChainRpcInfo(metadata.chain);
    const rpcEnvVar = chainRpcInfo.envVar;

    console.log(`\n🚀 Fetching ${metadata.name} Index Data...`);
    console.log(`   Chain: ${metadata.chain.toUpperCase()}\n`);

    // Debug: Check environment variables (chain-specific)
    console.log("🔍 Checking environment variables:");
    console.log(
        `  - GITHUB_TOKEN: ${process.env.GITHUB_TOKEN ? "✓ Set" : "✗ Missing"}`
    );
    console.log(
        `  - TWITTER_BEARER_TOKEN: ${
            process.env.TWITTER_BEARER_TOKEN ? "✓ Set" : "✗ Missing"
        }`
    );
    console.log(
        `  - ${rpcEnvVar}: ${
            process.env[rpcEnvVar]
                ? "✓ Set"
                : `✗ Using ${chainRpcInfo.defaultUrl || "default"}`
        }`
    );

    // Show chain-specific API keys
    if (metadata.chain === "ethereum") {
        console.log(
            `  - ALCHEMY_API_KEY: ${
                process.env.ALCHEMY_API_KEY ? "✓ Set" : "✗ Missing (optional)"
            }`
        );
    }
    if (metadata.chain === "solana") {
        console.log(
            `  - HELIUS_API_KEY: ${
                process.env.HELIUS_API_KEY ? "✓ Set" : "✗ Missing (optional)"
            }`
        );
    }
    console.log("");

    try {
        // Get the index module for this company
        const module = await getIndexModule(slug);
        if (!module) {
            console.error(`❌ No index module found for: ${slug}`);
            console.error(
                `\nAvailable companies: ${getAvailableCompanySlugs().join(
                    ", "
                )}`
            );
            return null;
        }

        // Step 1: Fetch raw data
        console.log("📊 Step 1: Fetching data from all sources...");
        const data = await module.fetchData();

        console.log("\n✅ Data fetched successfully!");
        console.log("\n📈 GitHub Metrics:");
        console.log(`  - Total Contributors: ${data.github.totalContributors}`);
        console.log(
            `  - Active Contributors (30d): ${data.github.activeContributors30d}`
        );
        console.log(`  - Total Commits (30d): ${data.github.totalCommits30d}`);
        console.log(`  - Avg Commits/Day: ${data.github.avgCommitsPerDay}`);

        console.log("\n🐦 Twitter Metrics:");
        console.log(
            `  - Followers: ${data.twitter.followers.toLocaleString()}`
        );
        console.log(
            `  - Following: ${data.twitter.following.toLocaleString()}`
        );
        console.log(`  - Verified: ${data.twitter.verified ? "Yes" : "No"}`);
        if (data.twitter.engagement30d) {
            console.log(
                `  - Likes (30d): ${data.twitter.engagement30d.likes.toLocaleString()}`
            );
            console.log(
                `  - Retweets (30d): ${data.twitter.engagement30d.retweets.toLocaleString()}`
            );
        }

        console.log("\n⛓️  On-Chain Metrics:");
        console.log(`  - Contract/Program: ${data.onchain.contractAddress}`);
        console.log(`  - Chain: ${data.onchain.chain}`);
        console.log(
            `  - Transactions (24h): ${
                data.onchain.transactionCount24h?.toLocaleString() || "N/A"
            }`
        );
        console.log(
            `  - Transactions (30d): ${
                data.onchain.transactionCount30d?.toLocaleString() || "N/A"
            }`
        );
        console.log(
            `  - Unique Wallets (30d): ${
                data.onchain.uniqueWallets30d?.toLocaleString() || "N/A"
            }`
        );

        // Step 1.5: Crawl News (Blog/Medium)
        if (metadata.blogUrl || metadata.mediumUrl) {
            console.log("\n📰 Step 1.5: Crawling news sources...");
            data.news = [];

            if (metadata.blogUrl) {
                const news = await crawler.crawlCompanyNews(
                    metadata.blogUrl,
                    "Official Blog"
                );
                data.news.push(...news);
            }
            if (metadata.mediumUrl) {
                const news = await crawler.crawlCompanyNews(
                    metadata.mediumUrl,
                    "Medium"
                );
                data.news.push(...news);
            }

            // Summarize partnerships
            if (data.news.length > 0) {
                console.log(
                    `\n🤖 Summarizing ${data.news.length} news items for partnerships...`
                );
                for (const item of data.news) {
                    item.summary = await llm.summarizePartnerships(
                        item.title,
                        item.url
                    );
                    if (item.summary !== "Not a partnership") {
                        console.log(
                            `   - [Partnership Opportunity] ${item.title}: ${item.summary}`
                        );
                    }
                }
            } else {
                console.log("   No news items found.");
            }
        }

        // Step 2: Calculate Index Score
        console.log("\n🧮 Step 2: Calculating Index Score...");
        const score = await module.calculateScore(data);

        console.log("\n✅ Score calculated successfully!");
        console.log("\n🎯 Index Scores:");
        console.log(`  - Overall Score: ${score.overall}/100`);
        console.log(`  - Team Health: ${score.teamHealth}/100`);
        console.log(`  - Growth Score: ${score.growthScore}/100`);
        console.log(`  - Social Score: ${score.socialScore}/100`);
        console.log(`  - Wallet Quality: ${score.walletQuality}/100`);

        console.log("\n📊 Detailed Breakdown:");
        console.log("  GitHub:");
        console.log(
            `    - Contributor Score: ${score.breakdown.github.contributorScore}/100`
        );
        console.log(
            `    - Activity Score: ${score.breakdown.github.activityScore}/100`
        );
        console.log(
            `    - Retention Score: ${score.breakdown.github.retentionScore}/100`
        );

        console.log("  On-Chain:");
        console.log(
            `    - User Growth Score: ${score.breakdown.onchain.userGrowthScore}/100`
        );
        console.log(
            `    - Transaction Score: ${score.breakdown.onchain.transactionScore}/100`
        );
        console.log(`    - TVL Score: ${score.breakdown.onchain.tvlScore}/100`);

        console.log("  Social:");
        console.log(
            `    - Followers Score: ${score.breakdown.social.followersScore}/100`
        );
        console.log(
            `    - Engagement Score: ${score.breakdown.social.engagementScore}/100`
        );

        // Step 3: Get complete company data
        console.log("\n🏢 Step 3: Converting to Company format...");
        const company = await module.getCompanyData(data, score);

        // Ensure news is included in the company object
        if (data.news && data.news.length > 0) {
            company.news = data.news;
        }

        console.log("\n✅ Company data ready!");
        console.log("\n📝 Company Profile:");
        console.log(`  - Name: ${company.name}`);
        console.log(`  - Category: ${company.category}`);
        console.log(`  - Overall Score: ${company.overallScore}/100`);
        console.log(`  - Team Size: ${company.teamHealth.activeContributors}`);
        console.log(
            `  - Active Contributors: ${company.teamHealth.activeContributors}`
        );
        console.log(
            `  - GitHub Commits (30d): ${company.teamHealth.githubCommits30d}`
        );
        console.log(
            `  - Transactions (30d): ${company.growth.onChainActivity30d.toLocaleString()}`
        );

        // Step 4: Save to JSON file
        console.log("\n💾 Step 4: Saving data to file...");
        const filePath = await saveCompanyData(
            slug,
            {
                name: metadata.name,
                chain: metadata.chain,
                description: metadata.description || "",
            },
            data,
            score,
            company
        );
        console.log(`\n✅ Data saved to: ${filePath}`);

        return { company, data, score };
    } catch (error) {
        console.error(`\n❌ Error fetching ${slug} data:`, error);
        console.error("\n💡 Troubleshooting:");
        console.error("  1. Check that all API keys are set in .env.local");
        console.error("  2. Verify API keys have correct permissions");
        console.error("  3. Check API rate limits");
        console.error(
            "  4. Review the error message above for specific issues"
        );
        throw error;
    }
}

async function main() {
    const args = process.argv.slice(2);
    const companySlug = args[0]?.toLowerCase();

    if (!companySlug) {
        console.error("❌ Please provide a company slug");
        console.error("\nUsage:");
        console.error("  pnpm fetch:company <slug>");
        console.error("  pnpm fetch:company all");
        console.error("  pnpm fetch:company funding");
        console.error(
            `\nAvailable companies: ${getAvailableCompanySlugs().join(", ")}`
        );
        process.exit(1);
    }

    if (companySlug === "all") {
        // Fetch all companies
        const slugs = getAvailableCompanySlugs();
        console.log(`\n🔄 Fetching data for ${slugs.length} companies...\n`);

        const results: Company[] = [];
        for (const slug of slugs) {
            try {
                const result = await fetchCompanyData(slug);
                if (result && result.company) {
                    results.push(result.company);
                }
                // Add delay between companies to avoid rate limits
                if (slug !== slugs[slugs.length - 1]) {
                    console.log(
                        "\n⏳ Waiting 5 seconds before next company..."
                    );
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                }
            } catch (error) {
                console.error(`Failed to fetch ${slug}:`, error);
            }
        }

        // Save aggregated data
        if (results.length > 0) {
            console.log("\n💾 Saving aggregated data...");
            const aggregatedPath = await saveAllCompaniesData(results);
            console.log(`✅ Aggregated data saved to: ${aggregatedPath}`);
        }

        console.log(
            `\n✨ Completed! Fetched ${results.length}/${slugs.length} companies.`
        );
        console.log(`📁 Data stored in: ${DATA_DIR}`);
    } else if (companySlug === "funding") {
        // Fetch Global Funding News
        console.log("\n💰 Fetching global funding news...");
        const opportunities = await crawler.crawlFundingNews();

        console.log(`\n✅ Found ${opportunities.length} funding items.`);
        const potentialSeeds = opportunities.filter((o) => o.isPotentialSeed);
        console.log(`🌱 Potential Seed Rounds: ${potentialSeeds.length}`);

        if (potentialSeeds.length > 0) {
            console.log("\n🔍 Analyzing Potentials:");
            for (const seed of potentialSeeds) {
                console.log(
                    `   - ${seed.companyName} (${seed.amount}): ${seed.roundType}`
                );
            }
        }

        const fundingPath = join(DATA_DIR, "funding.json");
        await fs.writeFile(
            fundingPath,
            JSON.stringify(
                {
                    fetchedAt: new Date().toISOString(),
                    opportunities,
                },
                null,
                2
            )
        );

        console.log(`\n💾 Funding data saved to: ${fundingPath}`);
    } else {
        // Fetch single company
        await fetchCompanyData(companySlug);
        console.log(
            "\n✨ Success! All API integrations are working correctly."
        );
        console.log(`📁 Data stored in: ${DATA_DIR}`);
    }
}

main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
