import { calculateIndexScore } from "../src/lib/index/calculators/score-calculator";
import {
    GitHubTeamMetrics,
    TwitterMetrics,
    OnChainMetrics,
} from "../src/lib/api/types";

const mockGitHub: GitHubTeamMetrics = {
    totalContributors: 100,
    activeContributors30d: 5, // low retention (5%)
    totalCommits30d: 50,
    avgCommitsPerDay: 1.6,
    topContributors: [],
    commitActivity: [],
};

const mockTwitter: TwitterMetrics = {
    followers: 100000,
    following: 100,
    tweetCount: 1000,
    verified: true,
    createdAt: new Date().toISOString(),
    engagement30d: {
        likes: 1200, // 1.2% engagement rate
        retweets: 200,
        replies: 100,
    },
};

const mockOnChain: OnChainMetrics = {
    tvl: 1000000000,
    dailyActiveUsers: 500, // 5% DAU/MAU
    weeklyActiveUsers: 2000,
    monthlyActiveUsers: 10000,
    transactionCount24h: 1000,
    transactionCount7d: 7000,
    transactionCount30d: 30000,
    uniqueWallets24h: 500,
    uniqueWallets7d: 2000,
    uniqueWallets30d: 10000,
    contractAddress: "0x...",
    chain: "ethereum",
};

async function verifyScoring() {
    console.log("🧪 Verifying Index Scoring Refinements...\n");

    const categories = ["defi", "infrastructure", "gaming", "nft"] as const;

    for (const cat of categories) {
        const score = calculateIndexScore(
            mockGitHub,
            mockTwitter,
            mockOnChain,
            cat
        );
        console.log(`--- Category: ${cat.toUpperCase()} ---`);
        console.log(`Overall Score: ${score.overall}`);
        console.log(`Team Health: ${score.teamHealth}`);
        console.log(`Growth Score: ${score.growthScore}`);
        console.log(`Social Score: ${score.socialScore}`);
        console.log(`Weights Used:`);
        if (cat === "defi")
            console.log("- Team: 30%, Growth: 50%, Social: 10%");
        if (cat === "infrastructure")
            console.log("- Team: 50%, Growth: 30%, Social: 10%");
        if (cat === "gaming" || cat === "nft")
            console.log("- Team: 25%, Growth: 35%, Social: 30%");
        console.log("\n");
    }
}

verifyScoring();
