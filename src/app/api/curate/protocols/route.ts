import { NextResponse } from "next/server";
import {
    SOLANA_PROTOCOLS,
    DEFILLAMA_TO_SLUG,
    CATEGORY_LABELS,
    type SolanaProtocol,
} from "@/lib/solana/protocols";
import {
    PROTOCOL_RISK_DATA,
    calculateTrustScore,
    getTrustLevel,
    type SolanaProtocolRisk,
} from "@/lib/solana/protocol-risk-data";

interface PoolData {
    pool: string;
    chain: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    apyBase: number;
    apyReward: number;
    stablecoin: boolean;
    ilRisk: string;
}

interface ProtocolSummary {
    slug: string;
    name: string;
    category: string;
    categoryLabel: string;
    poolCount: number;
    totalTvl: number;
    avgApy: number;
    avgRiskScore: number;
    minRiskScore: number;
    maxApy: number;
    topPool: {
        id: string;
        symbol: string;
        tvl: number;
        apy: number;
    } | null;
    // Risk data
    trustScore: number;
    trustLevel: "high" | "medium" | "low";
    riskData: SolanaProtocolRisk | null;
}

interface ProtocolComparisonResponse {
    protocols: ProtocolSummary[];
    comparison: {
        highestTvl: string;
        highestApy: string;
        lowestRisk: string;
        bestRiskAdjusted: string;
        mostPools: string;
    };
    metadata: {
        totalPools: number;
        totalTvl: number;
        generatedAt: string;
    };
}

// Simple risk score calculation (matching the main defi route logic)
function calculatePoolRiskScore(pool: PoolData): number {
    let score = 0;

    // TVL risk (0-30)
    if (pool.tvlUsd < 10_000_000) score += 30;
    else if (pool.tvlUsd < 100_000_000) score += 20;
    else if (pool.tvlUsd < 1_000_000_000) score += 10;

    // APY sustainability (0-25)
    if (pool.apy > 50) score += 25;
    else if (pool.apy > 20) score += 15;
    else if (pool.apy > 10) score += 10;

    // Reward dependency
    const rewardRatio = pool.apyReward / (pool.apy || 1);
    if (rewardRatio > 0.7) score += 5;

    // Stablecoin (0-20)
    if (!pool.stablecoin) score += 10;

    // IL risk (0-15)
    if (pool.ilRisk === "yes") score += 15;

    return Math.min(100, score);
}

export async function GET() {
    try {
        // Fetch Solana pools from DefiLlama
        const response = await fetch("https://yields.llama.fi/pools", {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!response.ok) {
            throw new Error("Failed to fetch pool data");
        }

        const data = await response.json();
        const pools: PoolData[] = data.data || [];

        // Filter to Solana pools only
        const solanaPools = pools.filter(
            (pool) =>
                pool.chain === "Solana" &&
                pool.tvlUsd >= 100_000 && // Min $100K TVL
                pool.apy > 0 &&
                pool.apy < 1000 // Filter out unrealistic APYs
        );

        // Group pools by protocol
        const protocolPools: Record<string, PoolData[]> = {};

        for (const pool of solanaPools) {
            const projectNormalized = pool.project.toLowerCase().replace(/\s+/g, "-");
            const slug = DEFILLAMA_TO_SLUG[projectNormalized];

            if (slug && SOLANA_PROTOCOLS[slug]) {
                if (!protocolPools[slug]) {
                    protocolPools[slug] = [];
                }
                protocolPools[slug].push(pool);
            }
        }

        // Calculate summaries for each protocol
        const protocolSummaries: ProtocolSummary[] = [];

        for (const [slug, pools] of Object.entries(protocolPools)) {
            const protocol = SOLANA_PROTOCOLS[slug];
            const riskData = PROTOCOL_RISK_DATA[slug] || null;

            if (!protocol || pools.length === 0) continue;

            // Calculate risk scores for pools
            const poolsWithRisk = pools.map((pool) => ({
                ...pool,
                riskScore: calculatePoolRiskScore(pool),
            }));

            // Sort by TVL to find top pool
            const sortedByTvl = [...poolsWithRisk].sort((a, b) => b.tvlUsd - a.tvlUsd);
            const topPool = sortedByTvl[0];

            // Calculate aggregates
            const totalTvl = pools.reduce((sum, p) => sum + p.tvlUsd, 0);
            const avgApy = pools.reduce((sum, p) => sum + p.apy, 0) / pools.length;
            const avgRiskScore =
                poolsWithRisk.reduce((sum, p) => sum + p.riskScore, 0) / poolsWithRisk.length;
            const minRiskScore = Math.min(...poolsWithRisk.map((p) => p.riskScore));
            const maxApy = Math.max(...pools.map((p) => p.apy));

            // Trust score from curated data
            const trustScore = riskData ? calculateTrustScore(riskData) : 50;
            const trustLevel = getTrustLevel(trustScore);

            protocolSummaries.push({
                slug,
                name: protocol.name,
                category: protocol.category,
                categoryLabel: CATEGORY_LABELS[protocol.category] || protocol.category,
                poolCount: pools.length,
                totalTvl,
                avgApy: Math.round(avgApy * 100) / 100,
                avgRiskScore: Math.round(avgRiskScore),
                minRiskScore: Math.round(minRiskScore),
                maxApy: Math.round(maxApy * 100) / 100,
                topPool: topPool
                    ? {
                          id: topPool.pool,
                          symbol: topPool.symbol,
                          tvl: topPool.tvlUsd,
                          apy: Math.round(topPool.apy * 100) / 100,
                      }
                    : null,
                trustScore,
                trustLevel,
                riskData,
            });
        }

        // Sort by TVL descending
        protocolSummaries.sort((a, b) => b.totalTvl - a.totalTvl);

        // Calculate comparison metrics
        const highestTvl = protocolSummaries[0]?.slug || "";
        const highestApy =
            [...protocolSummaries].sort((a, b) => b.avgApy - a.avgApy)[0]?.slug || "";
        const lowestRisk =
            [...protocolSummaries].sort((a, b) => a.avgRiskScore - b.avgRiskScore)[0]?.slug || "";
        const bestRiskAdjusted =
            [...protocolSummaries].sort(
                (a, b) => b.avgApy / (b.avgRiskScore || 1) - a.avgApy / (a.avgRiskScore || 1)
            )[0]?.slug || "";
        const mostPools =
            [...protocolSummaries].sort((a, b) => b.poolCount - a.poolCount)[0]?.slug || "";

        const result: ProtocolComparisonResponse = {
            protocols: protocolSummaries,
            comparison: {
                highestTvl,
                highestApy,
                lowestRisk,
                bestRiskAdjusted,
                mostPools,
            },
            metadata: {
                totalPools: solanaPools.length,
                totalTvl: protocolSummaries.reduce((sum, p) => sum + p.totalTvl, 0),
                generatedAt: new Date().toISOString(),
            },
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching protocol data:", error);
        return NextResponse.json(
            { error: "Failed to fetch protocol data" },
            { status: 500 }
        );
    }
}
