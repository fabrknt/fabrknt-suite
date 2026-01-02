/**
 * Generic Company Data Fetcher
 * Unified functions that work for any company based on configuration
 */

import {
    getOrganizationMetrics,
    getUniswapMetrics as getUniswapGitHubMetrics,
    getFabrkntMetrics,
} from "@/lib/api/github";
import { getEngagementMetrics } from "@/lib/api/twitter";
import {
    getOnChainMetrics as getEthereumMetrics,
    getUniswapMetrics as getUniswapOnChainMetrics,
} from "@/lib/api/ethereum";
import {
    getOnChainMetrics as getSolanaMetrics,
    getJupiterMetrics,
} from "@/lib/api/solana";
import { calculateIndexScore } from "./calculators/score-calculator";
import { IndexData, IndexScore } from "@/lib/api/types";
import { Company } from "./companies";
import { CompanyConfig } from "./company-configs";
import { CrawlerService } from "./crawler";

/**
 * Generic fetch function that works for any company
 */
export async function fetchCompanyData(
    config: CompanyConfig
): Promise<IndexData> {
    try {
        console.log(`Fetching ${config.name} index data...`);

        // Fetch GitHub metrics
        let githubPromise: Promise<any>;
        if (config.github.customMetricsFunction === "getUniswapMetrics") {
            githubPromise = getUniswapGitHubMetrics();
        } else if (
            config.github.customMetricsFunction === "getFabrkntMetrics"
        ) {
            githubPromise = getFabrkntMetrics();
        } else {
            githubPromise = getOrganizationMetrics(config.github.org);
        }

        // Fetch Twitter metrics
        const twitterPromise = getEngagementMetrics(config.twitter.handle);

        // Fetch On-chain metrics
        let onchainPromise: Promise<any>;
        if (config.features?.useCrawler) {
            // Fabrknt special case: no real on-chain metrics
            onchainPromise = Promise.resolve({
                contractAddress: config.onchain.address,
                chain: config.onchain.chain,
                transactionCount24h: 0,
                transactionCount7d: 0,
                transactionCount30d: 0,
                uniqueWallets24h: 0,
                uniqueWallets7d: 0,
                uniqueWallets30d: 0,
            });
        } else if (
            config.onchain.customMetricsFunction === "getUniswapMetrics"
        ) {
            onchainPromise = getUniswapOnChainMetrics();
        } else if (
            config.onchain.customMetricsFunction === "getJupiterMetrics"
        ) {
            onchainPromise = getJupiterMetrics();
        } else if (config.onchain.chain === "solana") {
            onchainPromise = getSolanaMetrics(config.onchain.address);
        } else {
            // Ethereum and other EVM chains
            onchainPromise = getEthereumMetrics(config.onchain.address);
        }

        // Execute all fetches in parallel with error handling
        const [github, twitter, onchain] = await Promise.all([
            githubPromise.catch((err) => {
                console.error(`GitHub fetch error (${config.name}):`, err);
                return {
                    totalContributors: 0,
                    activeContributors30d: 0,
                    totalCommits30d: 0,
                    avgCommitsPerDay: 0,
                    topContributors: [],
                    commitActivity: [],
                };
            }),
            twitterPromise.catch((err) => {
                console.error(`Twitter fetch error (${config.name}):`, err);
                return {
                    followers: 0,
                    following: 0,
                    tweetCount: 0,
                    verified: false,
                    createdAt: new Date().toISOString(),
                };
            }),
            onchainPromise.catch((err) => {
                console.error(
                    `${config.onchain.chain} fetch error (${config.name}):`,
                    err
                );
                return {
                    contractAddress: config.onchain.address,
                    chain: config.onchain.chain,
                    transactionCount24h: 0,
                    transactionCount7d: 0,
                    transactionCount30d: 0,
                    uniqueWallets24h: 0,
                    uniqueWallets7d: 0,
                    uniqueWallets30d: 0,
                };
            }),
        ]);

        // Add derived fields to onchain data
        (onchain as any).monthlyActiveUsers = onchain.uniqueWallets30d || 0;
        (onchain as any).dailyActiveUsers = onchain.uniqueWallets24h || 0;
        (onchain as any).weeklyActiveUsers = onchain.uniqueWallets7d || 0;

        // Handle special crawler case (Fabrknt)
        let news: any[] = [];
        if (config.features?.useCrawler && config.blogUrl) {
            const crawler = new CrawlerService();
            news = await crawler
                .crawlCompanyNews(config.blogUrl, `${config.name} Web`)
                .catch(() => []);
        }

        return {
            companyName: config.name,
            category: config.category,
            github,
            twitter,
            onchain: onchain as any,
            news: news.length > 0 ? news : undefined,
            calculatedAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error(`Error fetching ${config.name} data:`, error);
        throw error;
    }
}

/**
 * Generic score calculation
 */
export async function calculateCompanyScore(
    config: CompanyConfig,
    data?: IndexData
): Promise<IndexScore> {
    const indexData = data || (await fetchCompanyData(config));
    return calculateIndexScore(
        indexData.github,
        indexData.twitter,
        indexData.onchain,
        indexData.category
    );
}

/**
 * Generic conversion to Company interface
 */
export function convertToCompany(
    config: CompanyConfig,
    data: IndexData,
    score: IndexScore
): Company {
    // Special logic for Fabrknt
    const isPrivateDev =
        config.features?.useCrawler && data.github.totalCommits30d < 5;
    const hasWebActivity =
        (score.breakdown.onchain as any).webActivityScore > 40;

    return {
        slug: config.slug,
        name: config.name,
        category: config.category,
        description: config.description,
        logo: config.logo,
        website: config.website,

        teamHealth: {
            score: score.teamHealth,
            githubCommits30d: data.github.totalCommits30d,
            activeContributors: data.github.activeContributors30d,
            contributorRetention: Math.round(
                (data.github.activeContributors30d /
                    Math.max(data.github.totalContributors, 1)) *
                    100
            ),
            codeQuality: config.defaults?.codeQuality ?? 85,
        },

        growth: {
            score: score.growthScore,
            onChainActivity30d: data.onchain.transactionCount30d || 0,
            walletGrowth: config.defaults?.walletGrowth ?? 0,
            userGrowthRate: config.defaults?.userGrowthRate ?? 0,
            tvl: config.features?.hasTVL
                ? (data.onchain as any).tvl ?? config.defaults?.tvl
                : undefined,
            volume30d: config.features?.hasVolume
                ? (data.onchain as any).volume30d
                : undefined,
        },

        social: {
            score: score.socialScore,
            twitterFollowers: data.twitter?.followers,
            discordMembers: undefined,
            telegramMembers: undefined,
            communityEngagement: data.twitter?.engagement30d
                ? data.twitter.engagement30d.likes +
                  data.twitter.engagement30d.retweets +
                  data.twitter.engagement30d.replies
                : score.socialScore,
        },

        overallScore: score.overall,
        trend:
            isPrivateDev && hasWebActivity
                ? "up"
                : (config.defaults?.trend ?? "stable"),
        isListed: false,
        news: data.news,
    };
}

/**
 * Generic get company data function
 */
export async function getCompanyData(
    config: CompanyConfig,
    data?: IndexData,
    score?: IndexScore
): Promise<Company> {
    const indexData = data || (await fetchCompanyData(config));
    const indexScore =
        score || (await calculateCompanyScore(config, indexData));
    return convertToCompany(config, indexData, indexScore);
}
