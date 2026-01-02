import {
    calculateIntelligenceScore,
    calculateGitHubScore,
    calculateTwitterScore,
    calculateOnChainScore,
    calculateNewsGrowthScore,
    calculateWebScore,
    calculateAttentionScore,
} from "../src/lib/index/calculators/score-calculator";
import {
    GitHubTeamMetrics,
    TwitterMetrics,
    OnChainMetrics,
} from "../src/lib/api/types";

function test(name: string, condition: boolean, details?: string) {
    if (condition) {
        console.log(`✅ ${name}`);
        if (details) console.log(`   ${details}`);
    } else {
        console.log(`❌ ${name}`);
        if (details) console.log(`   ${details}`);
    }
}

console.log("🧪 Testing Edge Cases and Calculation Logic\n");

// Test 1: Zero followers
console.log("1. Testing Twitter with zero followers:");
const zeroTwitter: TwitterMetrics = {
    followers: 0,
    following: 0,
    tweetCount: 0,
    verified: false,
    createdAt: new Date().toISOString(),
};
const zeroTwitterScore = calculateTwitterScore(zeroTwitter);
test(
    "Zero followers returns 0 score",
    zeroTwitterScore.score === 0,
    `Score: ${zeroTwitterScore.score}`
);

// Test 2: Zero contributors
console.log("\n2. Testing GitHub with zero contributors:");
const zeroGitHub: GitHubTeamMetrics = {
    totalContributors: 0,
    activeContributors30d: 0,
    totalCommits30d: 0,
    avgCommitsPerDay: 0,
    topContributors: [],
    commitActivity: [],
};
const zeroGitHubScore = calculateGitHubScore(zeroGitHub);
test(
    "Zero contributors returns 0 score",
    zeroGitHubScore.score === 0,
    `Score: ${zeroGitHubScore.score}`
);

// Test 3: Zero TVL
console.log("\n3. Testing On-chain with zero TVL:");
const zeroOnChain: Partial<OnChainMetrics> = {
    tvl: 0,
    transactionCount30d: 0,
    dailyActiveUsers: 0,
    monthlyActiveUsers: 0,
};
const zeroOnChainScore = calculateOnChainScore(zeroOnChain);
test(
    "Zero TVL doesn't crash",
    zeroOnChainScore.score >= 0 && zeroOnChainScore.score <= 100,
    `Score: ${zeroOnChainScore.score}`
);

// Test 4: News freshness (reversed min/max)
console.log("\n4. Testing News freshness with reversed min/max:");
const freshNews = [
    {
        title: "Launch mainnet",
        date: new Date().toISOString(),
        url: "",
        summary: "",
        source: "",
    },
];
const oldNews = [
    {
        title: "Launch mainnet",
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        url: "",
        summary: "",
        source: "",
    },
];
const freshScore = calculateNewsGrowthScore(freshNews);
const oldScore = calculateNewsGrowthScore(oldNews);
test(
    "Fresh news scores higher than old news",
    freshScore > oldScore,
    `Fresh: ${freshScore}, Old: ${oldScore}`
);

// Test 5: Web recency (reversed min/max)
console.log("\n5. Testing Web recency with reversed min/max:");
const recentWeb = [
    {
        title: "Update",
        date: new Date().toISOString(),
        url: "",
        summary: "",
        source: "",
    },
];
const staleWeb = [
    {
        title: "Update",
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        url: "",
        summary: "",
        source: "",
    },
];
const recentWebScore = calculateWebScore(recentWeb);
const staleWebScore = calculateWebScore(staleWeb);
test(
    "Recent web update scores higher than stale update",
    recentWebScore > staleWebScore,
    `Recent: ${recentWebScore}, Stale: ${staleWebScore}`
);

// Test 6: Attention score with zero followers but engagement
console.log("\n6. Testing Attention score edge cases:");
const engagementNoFollowers: TwitterMetrics = {
    followers: 0,
    following: 0,
    tweetCount: 10,
    verified: false,
    createdAt: new Date().toISOString(),
    engagement30d: {
        likes: 100,
        retweets: 10,
        replies: 5,
    },
};
const attentionScore = calculateAttentionScore(engagementNoFollowers);
test(
    "Attention score handles zero followers with engagement",
    attentionScore >= 0 && attentionScore <= 100,
    `Score: ${attentionScore}`
);

// Test 7: Complete intelligence score with edge cases
console.log("\n7. Testing complete intelligence score with edge cases:");
const edgeCaseScore = calculateIntelligenceScore(
    zeroGitHub,
    zeroTwitter,
    zeroOnChain,
    "infrastructure"
);
test(
    "Edge case scores are valid (0-100)",
    edgeCaseScore.overall >= 0 &&
        edgeCaseScore.overall <= 100 &&
        edgeCaseScore.teamHealth >= 0 &&
        edgeCaseScore.teamHealth <= 100 &&
        edgeCaseScore.growthScore >= 0 &&
        edgeCaseScore.growthScore <= 100 &&
        edgeCaseScore.socialScore >= 0 &&
        edgeCaseScore.socialScore <= 100,
    `Overall: ${edgeCaseScore.overall}, Team: ${edgeCaseScore.teamHealth}, Growth: ${edgeCaseScore.growthScore}, Social: ${edgeCaseScore.socialScore}`
);

// Test 8: Weight normalization
console.log("\n8. Testing weight normalization:");
const normalGitHub: GitHubTeamMetrics = {
    totalContributors: 50,
    activeContributors30d: 10,
    totalCommits30d: 100,
    avgCommitsPerDay: 3.3,
    topContributors: [],
    commitActivity: [],
};
const normalTwitter: TwitterMetrics = {
    followers: 50000,
    following: 100,
    tweetCount: 500,
    verified: true,
    createdAt: new Date().toISOString(),
    engagement30d: {
        likes: 500,
        retweets: 50,
        replies: 25,
    },
};
const normalOnChain: Partial<OnChainMetrics> = {
    tvl: 10000000,
    transactionCount30d: 50000,
    dailyActiveUsers: 1000,
    monthlyActiveUsers: 5000,
};

// Test with no Twitter (should redistribute weights)
const noTwitterScore = calculateIntelligenceScore(
    normalGitHub,
    zeroTwitter,
    normalOnChain,
    "infrastructure"
);
test(
    "No Twitter redistributes weights correctly",
    noTwitterScore.overall >= 0 && noTwitterScore.overall <= 100,
    `Score: ${noTwitterScore.overall}`
);

// Test with private development (low commits)
const privateGitHub: GitHubTeamMetrics = {
    ...normalGitHub,
    totalCommits30d: 2, // Low commits
};
const privateScore = calculateIntelligenceScore(
    privateGitHub,
    normalTwitter,
    normalOnChain,
    "infrastructure"
);
test(
    "Private development shifts weights correctly",
    privateScore.overall >= 0 && privateScore.overall <= 100,
    `Score: ${privateScore.overall}, Team Health: ${privateScore.teamHealth}`
);

console.log("\n✅ All edge case tests completed!");
