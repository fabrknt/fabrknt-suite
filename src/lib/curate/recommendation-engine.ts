/**
 * Recommendation Engine
 * Generates personalized DeFi allocations based on user preferences
 */

import { RiskTolerance } from "@/components/curate/quick-start";
import {
    RecommendedAllocation,
    AllocationRecommendation,
} from "@/components/curate/recommendation-display";

// Curated pool data for recommendations
// In production, this would come from the API
interface CuratedPool {
    id: string;
    name: string;
    protocol: string;
    asset: string;
    apy: number;
    riskScore: number;
    riskLevel: "low" | "medium" | "high";
    category: "stablecoin" | "lending" | "lp" | "lst" | "vault";
    minRecommendedAllocation: number;
    maxRecommendedAllocation: number;
    reasoning: string;
}

// Pre-curated pools for recommendations
// These represent the best pools at each risk level
const CURATED_POOLS: CuratedPool[] = [
    // Conservative / Low Risk
    {
        id: "kamino-usdc-lending",
        name: "USDC Lending",
        protocol: "Kamino",
        asset: "USDC",
        apy: 6.5,
        riskScore: 12,
        riskLevel: "low",
        category: "lending",
        minRecommendedAllocation: 20,
        maxRecommendedAllocation: 60,
        reasoning: "Stable yield from the most liquid stablecoin lending market on Solana",
    },
    {
        id: "marginfi-usdc",
        name: "USDC Supply",
        protocol: "Marginfi",
        asset: "USDC",
        apy: 5.8,
        riskScore: 15,
        riskLevel: "low",
        category: "lending",
        minRecommendedAllocation: 15,
        maxRecommendedAllocation: 50,
        reasoning: "Diversified stablecoin exposure with battle-tested protocol",
    },
    {
        id: "kamino-sol-lending",
        name: "SOL Lending",
        protocol: "Kamino",
        asset: "SOL",
        apy: 5.2,
        riskScore: 18,
        riskLevel: "low",
        category: "lending",
        minRecommendedAllocation: 10,
        maxRecommendedAllocation: 35,
        reasoning: "Earn yield on SOL with minimal smart contract risk",
    },

    // Moderate Risk
    {
        id: "jito-jitosol",
        name: "JitoSOL Staking",
        protocol: "Jito",
        asset: "JitoSOL",
        apy: 7.8,
        riskScore: 22,
        riskLevel: "medium",
        category: "lst",
        minRecommendedAllocation: 10,
        maxRecommendedAllocation: 40,
        reasoning: "Liquid staking with MEV rewards - enhanced SOL yield",
    },
    {
        id: "marinade-msol",
        name: "mSOL Staking",
        protocol: "Marinade",
        asset: "mSOL",
        apy: 7.2,
        riskScore: 20,
        riskLevel: "medium",
        category: "lst",
        minRecommendedAllocation: 10,
        maxRecommendedAllocation: 35,
        reasoning: "Decentralized liquid staking with validator diversification",
    },
    {
        id: "kamino-usdt-lending",
        name: "USDT Lending",
        protocol: "Kamino",
        asset: "USDT",
        apy: 5.5,
        riskScore: 16,
        riskLevel: "low",
        category: "lending",
        minRecommendedAllocation: 10,
        maxRecommendedAllocation: 30,
        reasoning: "Stablecoin diversification from USDC exposure",
    },

    // Aggressive / Higher Risk
    {
        id: "meteora-sol-usdc",
        name: "SOL-USDC LP",
        protocol: "Meteora",
        asset: "SOL-USDC",
        apy: 15.5,
        riskScore: 45,
        riskLevel: "high",
        category: "lp",
        minRecommendedAllocation: 5,
        maxRecommendedAllocation: 30,
        reasoning: "High yield from the most liquid trading pair, with IL risk",
    },
    {
        id: "orca-sol-usdc-clmm",
        name: "SOL-USDC CLMM",
        protocol: "Orca",
        asset: "SOL-USDC",
        apy: 22.0,
        riskScore: 55,
        riskLevel: "high",
        category: "lp",
        minRecommendedAllocation: 5,
        maxRecommendedAllocation: 25,
        reasoning: "Concentrated liquidity for higher yields, requires active management",
    },
    {
        id: "drift-usdc-perp",
        name: "USDC Insurance",
        protocol: "Drift",
        asset: "USDC",
        apy: 12.0,
        riskScore: 38,
        riskLevel: "medium",
        category: "vault",
        minRecommendedAllocation: 5,
        maxRecommendedAllocation: 25,
        reasoning: "Insurance fund yield with perp trading volume exposure",
    },
];

// Allocation templates for each risk profile
interface AllocationTemplate {
    riskTolerance: RiskTolerance;
    targetRiskScore: number;
    maxRiskScore: number;
    stablecoinMin: number;
    stablecoinMax: number;
    lstMax: number;
    lpMax: number;
    poolCount: number;
}

const ALLOCATION_TEMPLATES: AllocationTemplate[] = [
    {
        riskTolerance: "conservative",
        targetRiskScore: 15,
        maxRiskScore: 25,
        stablecoinMin: 60,
        stablecoinMax: 80,
        lstMax: 30,
        lpMax: 0,
        poolCount: 3,
    },
    {
        riskTolerance: "moderate",
        targetRiskScore: 25,
        maxRiskScore: 40,
        stablecoinMin: 30,
        stablecoinMax: 50,
        lstMax: 40,
        lpMax: 20,
        poolCount: 4,
    },
    {
        riskTolerance: "aggressive",
        targetRiskScore: 40,
        maxRiskScore: 60,
        stablecoinMin: 15,
        stablecoinMax: 30,
        lstMax: 50,
        lpMax: 40,
        poolCount: 5,
    },
];

/**
 * Generate a personalized allocation recommendation
 */
export function generateRecommendation(
    amount: number,
    riskTolerance: RiskTolerance
): AllocationRecommendation {
    const template = ALLOCATION_TEMPLATES.find(t => t.riskTolerance === riskTolerance)!;

    // Filter pools by risk tolerance
    const eligiblePools = CURATED_POOLS.filter(pool => {
        if (riskTolerance === "conservative") {
            return pool.riskScore <= 25;
        }
        if (riskTolerance === "moderate") {
            return pool.riskScore <= 45;
        }
        return true; // Aggressive can use all pools
    });

    // Build allocation based on template
    const allocations: RecommendedAllocation[] = [];
    let remainingAllocation = 100;

    // 1. Start with stablecoin anchor
    const stablecoinPools = eligiblePools.filter(p =>
        p.category === "lending" && (p.asset === "USDC" || p.asset === "USDT")
    );

    // Add primary stablecoin
    if (stablecoinPools.length > 0) {
        const primaryStable = stablecoinPools[0];
        const stableAllocation = Math.min(
            riskTolerance === "conservative" ? 50 :
            riskTolerance === "moderate" ? 35 : 20,
            remainingAllocation
        );
        allocations.push({
            poolId: primaryStable.id,
            poolName: primaryStable.name,
            protocol: primaryStable.protocol,
            asset: primaryStable.asset,
            allocation: stableAllocation,
            apy: primaryStable.apy,
            riskLevel: primaryStable.riskLevel,
            riskScore: primaryStable.riskScore,
            reasoning: primaryStable.reasoning,
        });
        remainingAllocation -= stableAllocation;
    }

    // 2. Add SOL exposure (lending or LST)
    const solExposure = eligiblePools.filter(p =>
        (p.category === "lending" && p.asset === "SOL") ||
        p.category === "lst"
    );

    if (solExposure.length > 0 && remainingAllocation > 0) {
        // Primary SOL position
        const primarySol = riskTolerance === "conservative"
            ? solExposure.find(p => p.category === "lending")
            : solExposure.find(p => p.category === "lst");

        if (primarySol) {
            const solAllocation = Math.min(
                riskTolerance === "conservative" ? 25 :
                riskTolerance === "moderate" ? 30 : 25,
                remainingAllocation
            );
            allocations.push({
                poolId: primarySol.id,
                poolName: primarySol.name,
                protocol: primarySol.protocol,
                asset: primarySol.asset,
                allocation: solAllocation,
                apy: primarySol.apy,
                riskLevel: primarySol.riskLevel,
                riskScore: primarySol.riskScore,
                reasoning: primarySol.reasoning,
            });
            remainingAllocation -= solAllocation;
        }
    }

    // 3. Add secondary stablecoin for diversification (if not aggressive)
    if (riskTolerance !== "aggressive" && stablecoinPools.length > 1 && remainingAllocation > 0) {
        const secondaryStable = stablecoinPools[1];
        const allocation = Math.min(15, remainingAllocation);
        allocations.push({
            poolId: secondaryStable.id,
            poolName: secondaryStable.name,
            protocol: secondaryStable.protocol,
            asset: secondaryStable.asset,
            allocation,
            apy: secondaryStable.apy,
            riskLevel: secondaryStable.riskLevel,
            riskScore: secondaryStable.riskScore,
            reasoning: secondaryStable.reasoning,
        });
        remainingAllocation -= allocation;
    }

    // 4. Add secondary LST for moderate/aggressive
    if (riskTolerance !== "conservative" && remainingAllocation > 0) {
        const secondaryLst = eligiblePools.find(p =>
            p.category === "lst" && !allocations.some(a => a.poolId === p.id)
        );
        if (secondaryLst) {
            const allocation = Math.min(20, remainingAllocation);
            allocations.push({
                poolId: secondaryLst.id,
                poolName: secondaryLst.name,
                protocol: secondaryLst.protocol,
                asset: secondaryLst.asset,
                allocation,
                apy: secondaryLst.apy,
                riskLevel: secondaryLst.riskLevel,
                riskScore: secondaryLst.riskScore,
                reasoning: secondaryLst.reasoning,
            });
            remainingAllocation -= allocation;
        }
    }

    // 5. Add LP position for aggressive (or remaining for others)
    if (riskTolerance === "aggressive" && remainingAllocation > 0) {
        const lpPool = eligiblePools.find(p => p.category === "lp");
        if (lpPool) {
            const allocation = Math.min(25, remainingAllocation);
            allocations.push({
                poolId: lpPool.id,
                poolName: lpPool.name,
                protocol: lpPool.protocol,
                asset: lpPool.asset,
                allocation,
                apy: lpPool.apy,
                riskLevel: lpPool.riskLevel,
                riskScore: lpPool.riskScore,
                reasoning: lpPool.reasoning,
            });
            remainingAllocation -= allocation;
        }
    }

    // 6. Distribute any remaining allocation to existing positions
    if (remainingAllocation > 0 && allocations.length > 0) {
        // Add to the first (safest) position
        allocations[0].allocation += remainingAllocation;
    }

    // Calculate summary metrics
    const weightedApy = allocations.reduce(
        (sum, a) => sum + (a.apy * a.allocation / 100),
        0
    );
    const weightedRisk = allocations.reduce(
        (sum, a) => sum + (a.riskScore * a.allocation / 100),
        0
    );
    const expectedYield = amount * weightedApy / 100;

    // Determine overall risk level
    const overallRisk: "low" | "medium" | "high" =
        weightedRisk <= 20 ? "low" :
        weightedRisk <= 40 ? "medium" : "high";

    // Calculate diversification score
    const protocolCount = new Set(allocations.map(a => a.protocol)).size;
    const categoryCount = new Set(
        allocations.map(a =>
            CURATED_POOLS.find(p => p.id === a.poolId)?.category
        )
    ).size;
    const diversificationScore = Math.min(100,
        (protocolCount * 15) + (categoryCount * 20) + (allocations.length * 10)
    );

    // Generate insights
    const insights: string[] = [];
    const stablecoinPercent = allocations
        .filter(a => a.asset === "USDC" || a.asset === "USDT")
        .reduce((sum, a) => sum + a.allocation, 0);

    if (stablecoinPercent >= 50) {
        insights.push(`${stablecoinPercent}% in stablecoins provides a defensive anchor for your portfolio`);
    }

    if (protocolCount >= 3) {
        insights.push(`Spread across ${protocolCount} protocols for smart contract risk diversification`);
    }

    const lstPercent = allocations
        .filter(a => CURATED_POOLS.find(p => p.id === a.poolId)?.category === "lst")
        .reduce((sum, a) => sum + a.allocation, 0);
    if (lstPercent > 0) {
        insights.push(`${lstPercent}% in liquid staking earns staking rewards plus lending yield`);
    }

    insights.push(`Expected ${weightedApy.toFixed(1)}% APY is ${
        weightedApy > 10 ? "above" : "at"
    } market average for this risk level`);

    // Generate warnings
    const warnings: string[] = [];

    if (riskTolerance === "aggressive") {
        warnings.push("Higher yields come with higher risk - only invest what you can afford to lose");
    }

    const lpPercent = allocations
        .filter(a => CURATED_POOLS.find(p => p.id === a.poolId)?.category === "lp")
        .reduce((sum, a) => sum + a.allocation, 0);
    if (lpPercent > 0) {
        warnings.push(`LP positions (${lpPercent}%) are subject to impermanent loss if prices diverge`);
    }

    if (amount >= 100000) {
        warnings.push("For large amounts, consider splitting deposits across multiple transactions");
    }

    warnings.push("Past performance doesn't guarantee future results - yields can change");
    warnings.push("This is educational content, not financial advice - DYOR");

    return {
        allocations,
        summary: {
            totalAmount: amount,
            expectedApy: weightedApy,
            expectedYield,
            overallRisk,
            diversificationScore,
        },
        insights,
        warnings,
    };
}

/**
 * Get a quick recommendation summary for a given risk level
 */
export function getRecommendationPreview(riskTolerance: RiskTolerance): {
    expectedApy: string;
    poolCount: number;
    riskLevel: string;
} {
    const template = ALLOCATION_TEMPLATES.find(t => t.riskTolerance === riskTolerance)!;
    return {
        expectedApy: riskTolerance === "conservative" ? "4-7%" :
                     riskTolerance === "moderate" ? "7-12%" : "12-25%+",
        poolCount: template.poolCount,
        riskLevel: riskTolerance === "conservative" ? "Low" :
                   riskTolerance === "moderate" ? "Medium" : "Higher",
    };
}
