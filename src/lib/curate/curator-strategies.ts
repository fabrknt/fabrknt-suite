/**
 * Curator strategy data and analysis
 * Phase 1: Static/curated data from public sources
 * Phase 2+: Will integrate with on-chain data
 */

import { getCurator, CuratorProfile } from "./curators";

export interface StrategyAllocation {
    pool: string;
    asset: string;
    allocation: number; // Percentage
    apy: number;
    riskLevel: "low" | "medium" | "high";
    poolId?: string; // DeFiLlama pool ID if available
}

export interface StrategyChange {
    date: string;
    type: "increase" | "decrease" | "new" | "exit";
    pool: string;
    oldAllocation: number;
    newAllocation: number;
    reason?: string;
}

export interface StrategyProfile {
    riskTolerance: "conservative" | "moderate" | "aggressive";
    focusAssets: string[];
    avgApy: number;
    avgRiskScore: number;
    diversificationScore: number; // 0-100
}

export interface CuratorStrategy {
    curatorId: string;
    platform: string;
    chain: string;
    allocations: StrategyAllocation[];
    profile: StrategyProfile;
    recentChanges: StrategyChange[];
    lastUpdated: string;
    dataSource: "curated" | "on-chain" | "api";
}

export interface CuratorInsight {
    curatorId: string;
    strategyAnalysis: string;
    keyTakeaways: string[];
    riskAssessment: string;
    howToReplicate: {
        step: number;
        action: string;
        pool: string;
        allocation: number;
    }[];
    considerations: string[];
    generatedAt: string;
}

// Gauntlet's Kamino Strategy (curated from public data)
const GAUNTLET_KAMINO_STRATEGY: CuratorStrategy = {
    curatorId: "gauntlet",
    platform: "kamino",
    chain: "Solana",
    allocations: [
        {
            pool: "USDC Lending",
            asset: "USDC",
            allocation: 40,
            apy: 6.8,
            riskLevel: "low",
        },
        {
            pool: "SOL Lending",
            asset: "SOL",
            allocation: 25,
            apy: 5.2,
            riskLevel: "low",
        },
        {
            pool: "JitoSOL Vault",
            asset: "JITOSOL",
            allocation: 15,
            apy: 7.5,
            riskLevel: "medium",
        },
        {
            pool: "ETH Lending",
            asset: "ETH",
            allocation: 10,
            apy: 4.1,
            riskLevel: "low",
        },
        {
            pool: "USDT Lending",
            asset: "USDT",
            allocation: 10,
            apy: 5.9,
            riskLevel: "low",
        },
    ],
    profile: {
        riskTolerance: "moderate",
        focusAssets: ["USDC", "SOL", "JITOSOL", "ETH"],
        avgApy: 6.2,
        avgRiskScore: 22,
        diversificationScore: 75,
    },
    recentChanges: [
        {
            date: "2025-01-10",
            type: "increase",
            pool: "USDC Lending",
            oldAllocation: 35,
            newAllocation: 40,
            reason: "Increased stablecoin allocation amid market volatility",
        },
        {
            date: "2025-01-05",
            type: "decrease",
            pool: "SOL Lending",
            oldAllocation: 30,
            newAllocation: 25,
            reason: "Rebalancing to reduce volatile asset exposure",
        },
        {
            date: "2024-12-20",
            type: "new",
            pool: "JitoSOL Vault",
            oldAllocation: 0,
            newAllocation: 15,
            reason: "Added liquid staking exposure for enhanced yield",
        },
    ],
    lastUpdated: "2025-01-14",
    dataSource: "curated",
};

// Gauntlet's Morpho Strategy (Ethereum)
const GAUNTLET_MORPHO_STRATEGY: CuratorStrategy = {
    curatorId: "gauntlet",
    platform: "morpho",
    chain: "Ethereum",
    allocations: [
        {
            pool: "Gauntlet USDC Prime",
            asset: "USDC",
            allocation: 50,
            apy: 8.2,
            riskLevel: "low",
        },
        {
            pool: "Gauntlet WETH Prime",
            asset: "WETH",
            allocation: 30,
            apy: 4.5,
            riskLevel: "low",
        },
        {
            pool: "Gauntlet wstETH",
            asset: "wstETH",
            allocation: 20,
            apy: 5.8,
            riskLevel: "medium",
        },
    ],
    profile: {
        riskTolerance: "conservative",
        focusAssets: ["USDC", "WETH", "wstETH"],
        avgApy: 6.5,
        avgRiskScore: 18,
        diversificationScore: 65,
    },
    recentChanges: [
        {
            date: "2025-01-08",
            type: "increase",
            pool: "Gauntlet USDC Prime",
            oldAllocation: 45,
            newAllocation: 50,
            reason: "Higher USDC borrow demand",
        },
    ],
    lastUpdated: "2025-01-14",
    dataSource: "curated",
};

// Steakhouse Financial Strategy
const STEAKHOUSE_MORPHO_STRATEGY: CuratorStrategy = {
    curatorId: "steakhouse",
    platform: "morpho",
    chain: "Ethereum",
    allocations: [
        {
            pool: "Steakhouse USDC",
            asset: "USDC",
            allocation: 60,
            apy: 7.8,
            riskLevel: "low",
        },
        {
            pool: "Steakhouse USDT",
            asset: "USDT",
            allocation: 25,
            apy: 6.5,
            riskLevel: "low",
        },
        {
            pool: "Steakhouse DAI",
            asset: "DAI",
            allocation: 15,
            apy: 5.2,
            riskLevel: "low",
        },
    ],
    profile: {
        riskTolerance: "conservative",
        focusAssets: ["USDC", "USDT", "DAI"],
        avgApy: 7.0,
        avgRiskScore: 15,
        diversificationScore: 55,
    },
    recentChanges: [
        {
            date: "2025-01-12",
            type: "increase",
            pool: "Steakhouse USDC",
            oldAllocation: 55,
            newAllocation: 60,
            reason: "Consolidating into primary stablecoin position",
        },
    ],
    lastUpdated: "2025-01-14",
    dataSource: "curated",
};

// RE7 Capital Strategy - More aggressive
const RE7_MORPHO_STRATEGY: CuratorStrategy = {
    curatorId: "re7",
    platform: "morpho",
    chain: "Ethereum",
    allocations: [
        {
            pool: "RE7 WETH",
            asset: "WETH",
            allocation: 35,
            apy: 5.5,
            riskLevel: "medium",
        },
        {
            pool: "RE7 wstETH",
            asset: "wstETH",
            allocation: 30,
            apy: 6.8,
            riskLevel: "medium",
        },
        {
            pool: "RE7 USDC",
            asset: "USDC",
            allocation: 20,
            apy: 9.2,
            riskLevel: "medium",
        },
        {
            pool: "RE7 cbETH",
            asset: "cbETH",
            allocation: 15,
            apy: 7.5,
            riskLevel: "high",
        },
    ],
    profile: {
        riskTolerance: "aggressive",
        focusAssets: ["WETH", "wstETH", "USDC", "cbETH"],
        avgApy: 7.1,
        avgRiskScore: 45,
        diversificationScore: 70,
    },
    recentChanges: [
        {
            date: "2025-01-11",
            type: "new",
            pool: "RE7 cbETH",
            oldAllocation: 0,
            newAllocation: 15,
            reason: "Adding Coinbase ETH for yield diversification",
        },
        {
            date: "2025-01-08",
            type: "increase",
            pool: "RE7 USDC",
            oldAllocation: 15,
            newAllocation: 20,
            reason: "Higher borrow rates from increased leverage demand",
        },
    ],
    lastUpdated: "2025-01-14",
    dataSource: "curated",
};

// Strategy registry
const STRATEGIES: Record<string, CuratorStrategy[]> = {
    gauntlet: [GAUNTLET_KAMINO_STRATEGY, GAUNTLET_MORPHO_STRATEGY],
    steakhouse: [STEAKHOUSE_MORPHO_STRATEGY],
    re7: [RE7_MORPHO_STRATEGY],
};

// Generate AI-like insight (static for now, will use real AI in Phase 2)
function generateInsight(curator: CuratorProfile, strategies: CuratorStrategy[]): CuratorInsight {
    // Get primary strategy (prefer Solana, fallback to first available)
    const primaryStrategy = strategies.find(s => s.chain === "Solana") || strategies[0];
    if (!primaryStrategy) {
        return {
            curatorId: curator.slug,
            strategyAnalysis: `${curator.name} strategy data coming soon.`,
            keyTakeaways: [],
            riskAssessment: "Assessment pending.",
            howToReplicate: [],
            considerations: ["Strategy data is being curated."],
            generatedAt: new Date().toISOString(),
        };
    }

    // Calculate stablecoin allocation
    const stablecoins = ["USDC", "USDT", "DAI", "FRAX", "LUSD"];
    const stableAllocation = primaryStrategy.allocations
        .filter(a => stablecoins.includes(a.asset))
        .reduce((sum, a) => sum + a.allocation, 0);

    // Total allocations across all strategies
    const totalPools = strategies.reduce((sum, s) => sum + s.allocations.length, 0);

    // Recent change
    const recentChange = primaryStrategy.recentChanges[0];

    // Risk profile description
    const riskDescriptions = {
        conservative: "prioritizes capital preservation with stable, predictable yields",
        moderate: "balances risk and reward with diversified positions",
        aggressive: "targets higher yields with increased risk tolerance",
    };

    // Generate dynamic analysis based on curator
    const riskTolerance = primaryStrategy.profile.riskTolerance;
    const analysisBase = `${curator.name} ${riskDescriptions[riskTolerance]}.`;
    const stableNote = stableAllocation > 50
        ? ` With ${stableAllocation}% in stablecoins, they maintain a defensive posture.`
        : stableAllocation > 0
        ? ` They hold ${stableAllocation}% in stablecoins for stability.`
        : ` They focus primarily on volatile assets for yield maximization.`;
    const recentNote = recentChange
        ? ` Recent activity: ${recentChange.reason?.toLowerCase() || "portfolio rebalancing"}.`
        : "";

    return {
        curatorId: curator.slug,
        strategyAnalysis: analysisBase + stableNote + recentNote,
        keyTakeaways: [
            stableAllocation > 0
                ? `${stableAllocation}% stablecoin allocation — ${stableAllocation > 50 ? "defensive positioning" : "balanced exposure"}`
                : `No stablecoin exposure — yield-maximizing approach`,
            `Diversified across ${totalPools} pools for risk distribution`,
            `Average APY: ${primaryStrategy.profile.avgApy.toFixed(1)}% | Risk Score: ${primaryStrategy.profile.avgRiskScore}`,
            `Focus assets: ${primaryStrategy.profile.focusAssets.join(", ")}`,
        ],
        riskAssessment: riskTolerance === "conservative"
            ? `${curator.name}'s strategy emphasizes safety over maximum yield. Risk score of ${primaryStrategy.profile.avgRiskScore} is well below market average. Suitable for users seeking stable returns.`
            : riskTolerance === "moderate"
            ? `${curator.name} balances yield and safety with a risk score of ${primaryStrategy.profile.avgRiskScore}. Good for users comfortable with moderate volatility.`
            : `${curator.name} targets higher yields with elevated risk (score: ${primaryStrategy.profile.avgRiskScore}). For users who can tolerate significant volatility.`,
        howToReplicate: primaryStrategy.allocations.map((alloc, idx) => ({
            step: idx + 1,
            action: `Allocate ${alloc.allocation}% to ${alloc.pool}`,
            pool: alloc.pool,
            allocation: alloc.allocation,
        })),
        considerations: [
            "Past performance does not guarantee future results",
            `${curator.name} may rebalance positions without notice`,
            "Gas/transaction costs not included in APY figures",
            "This is informational content, not financial advice",
            "Always verify current rates before executing any strategy",
        ],
        generatedAt: new Date().toISOString(),
    };
}

/**
 * Get strategies for a curator
 */
export function getCuratorStrategies(curatorSlug: string): CuratorStrategy[] {
    return STRATEGIES[curatorSlug.toLowerCase()] || [];
}

/**
 * Get strategy for a specific platform
 */
export function getCuratorStrategyForPlatform(
    curatorSlug: string,
    platform: string
): CuratorStrategy | null {
    const strategies = getCuratorStrategies(curatorSlug);
    return strategies.find(s => s.platform.toLowerCase() === platform.toLowerCase()) || null;
}

/**
 * Get curator with full strategy data and insights
 */
export function getCuratorWithStrategies(curatorSlug: string): {
    profile: CuratorProfile;
    strategies: CuratorStrategy[];
    insight: CuratorInsight;
    lastUpdated: string;
} | null {
    const profile = getCurator(curatorSlug);
    if (!profile) return null;

    const strategies = getCuratorStrategies(curatorSlug);
    const insight = generateInsight(profile, strategies);

    const lastUpdated = strategies.reduce((latest, s) => {
        return s.lastUpdated > latest ? s.lastUpdated : latest;
    }, "");

    return {
        profile,
        strategies,
        insight,
        lastUpdated,
    };
}

/**
 * Get all curators with their strategies
 */
export function getAllCuratorsWithStrategies(): Array<{
    profile: CuratorProfile;
    strategies: CuratorStrategy[];
    insight: CuratorInsight;
    lastUpdated: string;
}> {
    const results = [];
    for (const slug of Object.keys(STRATEGIES)) {
        const data = getCuratorWithStrategies(slug);
        if (data) results.push(data);
    }
    return results;
}
