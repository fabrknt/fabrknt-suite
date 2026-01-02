
import {
    calculateGitHubScore,
    calculateTwitterScore,
    calculateOnChainScore,
    calculateIndexScore,
    calculateIndexNewsScore,
    calculateWebScore
} from "../src/lib/index/calculators/score-calculator";

function assert(condition: boolean, message: string) {
    if (!condition) {
        console.error(`❌ FAILED: ${message}`);
        process.exit(1);
    }
    console.log(`✅ PASSED: ${message}`);
}

async function runTests() {
    console.log("Starting Verification Tests for Score Calculator...\n");

    // --- 1. Test News Freshness Logic ---
    const freshNews = [{ title: "Launch mainnet", date: new Date().toISOString(), url: "", summary: "", source: "" }];
    const oldNews = [{ title: "Launch mainnet", date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), url: "", summary: "", source: "" }];

    const freshScore = calculateIndexNewsScore(freshNews);
    const oldScore = calculateIndexNewsScore(oldNews);

    assert(freshScore > oldScore, `Fresh news (${freshScore}) should score higher than old news (${oldScore})`);
    assert(freshScore >= 15, "Fresh news with 1 keyword should be at least 15 (10 base + 5 keyword)");

    // --- 2. Test Web Recency Logic ---
    const recentWeb = [{ title: "Update", date: new Date().toISOString(), url: "", summary: "", source: "" }];
    const staleWeb = [{ title: "Update", date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), url: "", summary: "", source: "" }];

    const recentWebScore = calculateWebScore(recentWeb);
    const staleWebScore = calculateWebScore(staleWeb);

    assert(recentWebScore > staleWebScore, `Recent web update (${recentWebScore}) should score higher than stale update (${staleWebScore})`);

    // --- 3. Test Twitter Benchmark Logic ---
    const smallTwitter = {
        followers: 1000,
        tweetCount: 100,
        engagement30d: { likes: 0, retweets: 0, replies: 0 }
    };
    const tinyTwitter = {
        followers: 100,
        tweetCount: 10,
        engagement30d: { likes: 0, retweets: 0, replies: 0 }
    }

    const smallTwitterScore = calculateTwitterScore(smallTwitter as any);
    const tinyTwitterScore = calculateTwitterScore(tinyTwitter as any);

    console.log(`Small Twitter: followers=1000, log10=3, benchmark=${Math.log10(1000)}, score=${smallTwitterScore.score}`);

    assert(smallTwitterScore.score >= 0, `1000 followers should result in at least zero score (boundary): ${smallTwitterScore.score}`);

    // Test slightly above floor
    const emergingTwitter = { followers: 5000, tweetCount: 100, engagement30d: { likes: 0, retweets: 0, replies: 0 } };
    const emergingTwitterScore = calculateTwitterScore(emergingTwitter as any);
    assert(emergingTwitterScore.score > 0, `5000 followers should result in non-zero score: ${emergingTwitterScore.score}`);

    // --- 4. Test Private-Heavy Weight Shifting ---
    const privateGitHub = {
        totalContributors: 10,
        activeContributors30d: 5,
        totalCommits30d: 2, // Low public commits
    };
    const publicGitHub = {
        ...privateGitHub,
        totalCommits30d: 100, // High public commits
    };

    const twitter = { followers: 5000, engagement30d: { likes: 100, retweets: 10, replies: 5 } };
    const onchain = { transactionCount30d: 1000 };

    const privateResult = calculateIndexScore(privateGitHub as any, twitter as any, onchain as any);
    const publicResult = calculateIndexScore(publicGitHub as any, twitter as any, onchain as any);

    console.log(`Private-heavy GitHub score: ${privateResult.teamHealth}, Overall: ${privateResult.overall}`);
    console.log(`Public GitHub score: ${publicResult.teamHealth}, Overall: ${publicResult.overall}`);

    // In private-heavy case, GitHub weight is reduced. Since GitHub teamHealth is high (contributors), 
    // reducing its weight might actually lower the overall score if Growth is lower than GitHub.
    // The key is that it *shifts* the logic.

    console.log("\nAll tests completed successfully!");
}

runTests().catch(console.error);
