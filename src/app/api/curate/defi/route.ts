import { NextResponse } from "next/server";

// Cache for 5 minutes (300 seconds)
export const revalidate = 300;

// DeFiLlama API endpoints
const DEFILLAMA_PROTOCOLS_API = "https://api.llama.fi/protocols";
const DEFILLAMA_YIELDS_API = "https://yields.llama.fi/pools";

// Types
interface DefiLlamaProtocol {
    id: string;
    name: string;
    slug: string;
    symbol: string;
    category: string;
    chains: string[];
    tvl: number;
    parentProtocol: string | null;
    url?: string;
    twitter?: string;
    github?: string[];
    logo?: string;
}

interface YieldPool {
    pool: string;
    chain: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    apyBase?: number;
    apyReward?: number;
    rewardTokens?: string[];
    underlyingTokens?: string[];
    poolMeta?: string;
    ilRisk?: string;
    exposure?: string;
    stablecoin?: boolean;
}

interface PoolDependency {
    type: "protocol" | "asset" | "oracle" | "chain";
    name: string;
    risk: "low" | "medium" | "high";
}

interface RiskBreakdown {
    tvlScore: number;
    apyScore: number;
    stableScore: number;
    ilScore: number;
    protocolScore: number;
}

interface LiquidityRisk {
    score: number;
    poolTvl: number;
    maxSafeAllocation: number;
    safeAllocationPercent: number;
    slippageEstimates: {
        at100k: number;
        at500k: number;
        at1m: number;
        at5m: number;
        at10m: number;
    };
    exitabilityRating: "excellent" | "good" | "moderate" | "poor" | "very_poor";
}

interface ProcessedYieldPool {
    id: string;
    chain: string;
    project: string;
    projectSlug: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    apyBase: number;
    apyReward: number;
    stablecoin: boolean;
    ilRisk: string;
    poolMeta: string;
    riskScore: number;
    riskLevel: "low" | "medium" | "high" | "very_high";
    riskBreakdown: RiskBreakdown;
    dependencies: PoolDependency[];
    underlyingAssets: string[];
    apyStability: null; // Historical data not fetched at runtime
    liquidityRisk: LiquidityRisk;
}

interface DefiProtocolData {
    slug: string;
    name: string;
    category: string;
    chains: string[];
    tvl: number;
    symbol: string;
    parentProtocol: string | null;
    logo?: string;
    url?: string;
    twitter?: string;
    github?: string[];
}

interface DefiRelationship {
    source: string;
    target: string;
    type: "parent_child" | "yield_source" | "same_ecosystem" | "integration";
    weight: number;
    chain?: string;
    evidence: string;
}

// Known stablecoins
const STABLECOINS = new Set([
    "USDC", "USDT", "DAI", "FRAX", "LUSD", "GUSD", "BUSD", "TUSD", "USDP",
    "USDD", "PYUSD", "GHO", "crvUSD", "DOLA", "MIM", "UST", "SUSD", "RAI",
    "USDS", "SUSDS", "USD0", "EURC", "EURT", "EURS"
]);

// Blue chip assets
const BLUE_CHIP_ASSETS = new Set([
    "ETH", "WETH", "STETH", "WSTETH", "RETH", "CBETH", "WEETH",
    "BTC", "WBTC", "CBBTC", "TBTC",
    "SOL", "WSOL", "MSOL", "JITOSOL", "BSOL",
    ...STABLECOINS
]);

// Established protocols
const ESTABLISHED_PROTOCOLS = new Set([
    "aave-v3", "aave", "compound-v3", "compound", "maker", "lido", "rocket-pool",
    "uniswap-v3", "uniswap", "curve-dex", "convex-finance", "yearn-finance",
    "balancer", "frax", "instadapp", "morpho", "spark", "sky-lending",
    "jito-liquid-staking", "marinade-finance", "raydium", "orca", "jupiter"
]);

// Known integrations
const KNOWN_INTEGRATIONS: Array<{ source: string; target: string; type: string; evidence: string }> = [
    { source: "morpho", target: "aave-v3", type: "yield_source", evidence: "Morpho optimizes Aave lending" },
    { source: "morpho", target: "compound-v3", type: "yield_source", evidence: "Morpho optimizes Compound lending" },
    { source: "pendle", target: "lido", type: "yield_source", evidence: "Pendle tokenizes Lido stETH yield" },
    { source: "sommelier", target: "aave-v3", type: "yield_source", evidence: "Sommelier vaults use Aave" },
    { source: "beefy", target: "curve-dex", type: "yield_source", evidence: "Beefy vaults farm Curve pools" },
    { source: "convex-finance", target: "curve-dex", type: "yield_source", evidence: "Convex boosts Curve rewards" },
    { source: "aerodrome", target: "velodrome", type: "parent_child", evidence: "Aerodrome is Base fork of Velodrome" },
];

// Protocol dependencies
const PROTOCOL_DEPENDENCIES: Record<string, string[]> = {
    "morpho": ["aave-v3", "compound-v3"],
    "pendle": ["lido", "rocket-pool", "aave-v3"],
    "sommelier": ["aave-v3", "uniswap-v3", "compound-v3"],
    "beefy": ["curve-dex", "convex-finance", "aave-v3"],
    "convex-finance": ["curve-dex"],
    "kamino-finance": ["raydium", "orca", "meteora"],
};

// Fetch with Next.js cache
async function fetchProtocols(): Promise<DefiLlamaProtocol[]> {
    const response = await fetch(DEFILLAMA_PROTOCOLS_API, {
        next: { revalidate: 300 }
    });
    if (!response.ok) throw new Error(`Failed to fetch protocols: ${response.statusText}`);
    return response.json();
}

async function fetchYieldPools(): Promise<YieldPool[]> {
    const response = await fetch(DEFILLAMA_YIELDS_API, {
        next: { revalidate: 300 }
    });
    if (!response.ok) throw new Error(`Failed to fetch yields: ${response.statusText}`);
    const data = await response.json();
    return data.data || [];
}

function parseUnderlyingAssets(symbol: string): string[] {
    const cleaned = symbol
        .replace(/[\(\)]/g, "")
        .replace(/-\d+(\.\d+)?%/g, "")
        .replace(/\s+/g, "");

    const parts = cleaned.split(/[-\/]/).filter(Boolean);

    return parts.map(asset => {
        const upper = asset.toUpperCase();
        if (["WETH", "STETH", "WSTETH", "CBETH", "WEETH"].includes(upper)) return "ETH";
        if (["WBTC", "CBBTC", "TBTC"].includes(upper)) return "BTC";
        if (["WSOL", "MSOL", "JITOSOL", "BSOL"].includes(upper)) return "SOL";
        return upper;
    }).filter((v, i, a) => a.indexOf(v) === i);
}

function getProtocolDependencies(projectSlug: string, chain: string): PoolDependency[] {
    const deps: PoolDependency[] = [];
    const chainRisk = ["Ethereum", "Solana", "Arbitrum", "Base", "Optimism"].includes(chain) ? "low" : "medium";
    deps.push({ type: "chain", name: chain, risk: chainRisk as "low" | "medium" | "high" });

    const protocolDeps = PROTOCOL_DEPENDENCIES[projectSlug] || [];
    for (const dep of protocolDeps) {
        const risk = ESTABLISHED_PROTOCOLS.has(dep) ? "low" : "medium";
        deps.push({ type: "protocol", name: dep, risk: risk as "low" | "medium" | "high" });
    }

    deps.push({ type: "oracle", name: "chainlink", risk: "low" });
    return deps;
}

function calculateLiquidityRisk(tvlUsd: number, projectSlug: string): LiquidityRisk {
    const isLendingProtocol = [
        "aave", "aave-v3", "compound", "compound-v3", "morpho", "spark",
        "maker", "sky-lending", "maple", "euler", "radiant", "benqi", "venus"
    ].some(p => projectSlug.includes(p));

    const isLiquidStaking = [
        "lido", "rocket-pool", "jito", "marinade", "ether.fi", "frax-ether"
    ].some(p => projectSlug.includes(p));

    const slippageFactor = isLiquidStaking ? 0.3 : isLendingProtocol ? 0.5 : 1.0;

    let safeAllocationPercent: number;
    if (tvlUsd >= 1_000_000_000) safeAllocationPercent = 5;
    else if (tvlUsd >= 100_000_000) safeAllocationPercent = 3;
    else if (tvlUsd >= 10_000_000) safeAllocationPercent = 2;
    else safeAllocationPercent = 1;

    if (isLendingProtocol) safeAllocationPercent *= 2;

    const maxSafeAllocation = tvlUsd * (safeAllocationPercent / 100);

    const calculateSlippage = (positionSize: number): number => {
        if (tvlUsd === 0) return 100;
        const ratio = positionSize / tvlUsd;
        const slippage = ratio * 100 * slippageFactor * (1 + ratio * 2);
        return Math.min(Math.round(slippage * 100) / 100, 100);
    };

    const slippageEstimates = {
        at100k: calculateSlippage(100_000),
        at500k: calculateSlippage(500_000),
        at1m: calculateSlippage(1_000_000),
        at5m: calculateSlippage(5_000_000),
        at10m: calculateSlippage(10_000_000),
    };

    let score: number;
    if (tvlUsd >= 1_000_000_000) score = 5;
    else if (tvlUsd >= 500_000_000) score = 10;
    else if (tvlUsd >= 100_000_000) score = 20;
    else if (tvlUsd >= 50_000_000) score = 30;
    else if (tvlUsd >= 10_000_000) score = 45;
    else if (tvlUsd >= 5_000_000) score = 60;
    else if (tvlUsd >= 1_000_000) score = 75;
    else score = 90;

    if (isLendingProtocol) score = Math.max(0, score - 10);
    if (isLiquidStaking) score = Math.max(0, score - 15);
    if (slippageEstimates.at1m > 5) score = Math.min(100, score + 10);
    else if (slippageEstimates.at1m < 0.5) score = Math.max(0, score - 10);

    let exitabilityRating: LiquidityRisk["exitabilityRating"];
    if (score <= 15) exitabilityRating = "excellent";
    else if (score <= 30) exitabilityRating = "good";
    else if (score <= 50) exitabilityRating = "moderate";
    else if (score <= 70) exitabilityRating = "poor";
    else exitabilityRating = "very_poor";

    return {
        score,
        poolTvl: tvlUsd,
        maxSafeAllocation,
        safeAllocationPercent,
        slippageEstimates,
        exitabilityRating,
    };
}

function calculateRiskScore(
    pool: YieldPool,
    projectSlug: string,
    underlyingAssets: string[]
): { score: number; level: "low" | "medium" | "high" | "very_high"; breakdown: RiskBreakdown } {
    const breakdown: RiskBreakdown = {
        tvlScore: 0,
        apyScore: 0,
        stableScore: 0,
        ilScore: 0,
        protocolScore: 0,
    };

    // TVL Score (0-30)
    if (pool.tvlUsd >= 1_000_000_000) breakdown.tvlScore = 0;
    else if (pool.tvlUsd >= 100_000_000) breakdown.tvlScore = 10;
    else if (pool.tvlUsd >= 10_000_000) breakdown.tvlScore = 20;
    else breakdown.tvlScore = 30;

    // APY Score (0-25)
    const rewardRatio = pool.apyReward ? (pool.apyReward / (pool.apy || 1)) : 0;
    if (pool.apy > 50) breakdown.apyScore = 25;
    else if (pool.apy > 20) breakdown.apyScore = 15;
    else if (pool.apy > 10) breakdown.apyScore = 10;
    else breakdown.apyScore = 0;
    if (rewardRatio > 0.7) breakdown.apyScore += 5;

    // Stablecoin Score (0-20)
    const allStable = underlyingAssets.every(a => STABLECOINS.has(a));
    const hasStable = underlyingAssets.some(a => STABLECOINS.has(a));
    const allBlueChip = underlyingAssets.every(a => BLUE_CHIP_ASSETS.has(a));

    if (pool.stablecoin || allStable) breakdown.stableScore = 0;
    else if (hasStable && allBlueChip) breakdown.stableScore = 5;
    else if (allBlueChip) breakdown.stableScore = 10;
    else breakdown.stableScore = 20;

    // IL Score (0-15)
    if (pool.ilRisk === "no") breakdown.ilScore = 0;
    else if (pool.ilRisk === "yes" && underlyingAssets.length <= 1) breakdown.ilScore = 0;
    else if (pool.exposure === "single") breakdown.ilScore = 0;
    else if (underlyingAssets.length === 2) {
        const [a, b] = underlyingAssets;
        const correlated = (a === b) || (STABLECOINS.has(a) && STABLECOINS.has(b));
        breakdown.ilScore = correlated ? 5 : 15;
    } else {
        breakdown.ilScore = 15;
    }

    // Protocol Score (0-10)
    if (ESTABLISHED_PROTOCOLS.has(projectSlug)) breakdown.protocolScore = 0;
    else if (pool.tvlUsd > 100_000_000) breakdown.protocolScore = 3;
    else breakdown.protocolScore = 10;

    const totalScore = breakdown.tvlScore + breakdown.apyScore + breakdown.stableScore +
                       breakdown.ilScore + breakdown.protocolScore;

    let level: "low" | "medium" | "high" | "very_high";
    if (totalScore <= 20) level = "low";
    else if (totalScore <= 40) level = "medium";
    else if (totalScore <= 60) level = "high";
    else level = "very_high";

    return { score: totalScore, level, breakdown };
}

function processYieldPools(pools: YieldPool[]): ProcessedYieldPool[] {
    const processed: ProcessedYieldPool[] = [];

    for (const pool of pools) {
        if (pool.tvlUsd < 100_000 || pool.apy <= 0 || pool.apy > 10000) continue;

        const projectSlug = pool.project.toLowerCase().replace(/\s+/g, "-");
        const underlyingAssets = parseUnderlyingAssets(pool.symbol);
        const { score, level, breakdown } = calculateRiskScore(pool, projectSlug, underlyingAssets);
        const dependencies = getProtocolDependencies(projectSlug, pool.chain);

        for (const asset of underlyingAssets) {
            const assetRisk = BLUE_CHIP_ASSETS.has(asset) ? "low" : "high";
            dependencies.push({ type: "asset", name: asset, risk: assetRisk as "low" | "medium" | "high" });
        }

        const liquidityRisk = calculateLiquidityRisk(pool.tvlUsd, projectSlug);

        processed.push({
            id: pool.pool,
            chain: pool.chain,
            project: pool.project,
            projectSlug,
            symbol: pool.symbol,
            tvlUsd: pool.tvlUsd,
            apy: pool.apy,
            apyBase: pool.apyBase || 0,
            apyReward: pool.apyReward || 0,
            stablecoin: pool.stablecoin || false,
            ilRisk: pool.ilRisk || "unknown",
            poolMeta: pool.poolMeta || "",
            riskScore: score,
            riskLevel: level,
            riskBreakdown: breakdown,
            dependencies,
            underlyingAssets,
            apyStability: null,
            liquidityRisk,
        });
    }

    return processed.sort((a, b) => b.tvlUsd - a.tvlUsd);
}

function buildRelationships(protocols: DefiLlamaProtocol[]): DefiRelationship[] {
    const relationships: DefiRelationship[] = [];
    const protocolSlugs = new Set(protocols.map(p => p.slug));

    // Parent-child relationships
    for (const protocol of protocols) {
        if (protocol.parentProtocol) {
            const parentSlug = protocol.parentProtocol.replace("parent#", "");
            relationships.push({
                source: protocol.slug,
                target: parentSlug,
                type: "parent_child",
                weight: protocol.tvl || 0,
                evidence: `${protocol.name} is a version/fork of ${parentSlug}`,
            });
        }
    }

    // Known integrations
    for (const integration of KNOWN_INTEGRATIONS) {
        if (protocolSlugs.has(integration.source) && protocolSlugs.has(integration.target)) {
            const sourceProtocol = protocols.find(p => p.slug === integration.source);
            relationships.push({
                source: integration.source,
                target: integration.target,
                type: integration.type as DefiRelationship["type"],
                weight: sourceProtocol?.tvl || 0,
                evidence: integration.evidence,
            });
        }
    }

    return relationships;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const chain = searchParams.get("chain");
    const minTvl = parseInt(searchParams.get("minTvl") || "0");
    const limit = parseInt(searchParams.get("limit") || "100");

    // Yields filters
    const minApy = parseFloat(searchParams.get("minApy") || "0");
    const maxApy = parseFloat(searchParams.get("maxApy") || "10000");
    const stablecoinOnly = searchParams.get("stablecoinOnly") === "true";
    const riskLevel = searchParams.get("riskLevel");
    const maxRiskScore = parseInt(searchParams.get("maxRiskScore") || "100");
    const sortBy = searchParams.get("sortBy") || "tvl";
    const yieldLimit = parseInt(searchParams.get("yieldLimit") || "100");

    // Liquidity filters
    const maxLiquidityRisk = parseInt(searchParams.get("maxLiquidityRisk") || "100");
    const exitability = searchParams.get("exitability");
    const minSafeAllocation = parseInt(searchParams.get("minSafeAllocation") || "0");

    try {
        // Fetch data from DeFiLlama
        const [protocols, yieldPools] = await Promise.all([
            fetchProtocols(),
            fetchYieldPools(),
        ]);

        // Filter protocols
        let filteredProtocols = protocols.filter(p =>
            p.tvl > 1_000_000 &&
            p.category !== "CEX" &&
            p.category !== "Chain"
        );

        if (category) {
            filteredProtocols = filteredProtocols.filter(p =>
                p.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (chain) {
            filteredProtocols = filteredProtocols.filter(p =>
                p.chains.some(c => c.toLowerCase() === chain.toLowerCase())
            );
        }

        if (minTvl > 0) {
            filteredProtocols = filteredProtocols.filter(p => p.tvl >= minTvl);
        }

        filteredProtocols = filteredProtocols
            .sort((a, b) => b.tvl - a.tvl)
            .slice(0, limit);

        // Build protocol data
        const protocolData: Record<string, DefiProtocolData> = {};
        for (const p of filteredProtocols) {
            protocolData[p.slug] = {
                slug: p.slug,
                name: p.name,
                category: p.category,
                chains: p.chains,
                tvl: p.tvl,
                symbol: p.symbol,
                parentProtocol: p.parentProtocol,
                logo: p.logo,
                url: p.url,
                twitter: p.twitter,
                github: p.github,
            };
        }

        // Build relationships
        const relationships = buildRelationships(filteredProtocols);

        // Process yields
        let filteredYields = processYieldPools(yieldPools);

        if (chain) {
            filteredYields = filteredYields.filter(y =>
                y.chain.toLowerCase() === chain.toLowerCase()
            );
        }

        if (minApy > 0) {
            filteredYields = filteredYields.filter(y => y.apy >= minApy);
        }

        if (maxApy < 10000) {
            filteredYields = filteredYields.filter(y => y.apy <= maxApy);
        }

        if (stablecoinOnly) {
            filteredYields = filteredYields.filter(y => y.stablecoin);
        }

        if (minTvl > 0) {
            filteredYields = filteredYields.filter(y => y.tvlUsd >= minTvl);
        }

        if (riskLevel) {
            filteredYields = filteredYields.filter(y => y.riskLevel === riskLevel);
        }

        if (maxRiskScore < 100) {
            filteredYields = filteredYields.filter(y => y.riskScore <= maxRiskScore);
        }

        if (maxLiquidityRisk < 100) {
            filteredYields = filteredYields.filter(y =>
                y.liquidityRisk && y.liquidityRisk.score <= maxLiquidityRisk
            );
        }

        if (exitability) {
            filteredYields = filteredYields.filter(y =>
                y.liquidityRisk && y.liquidityRisk.exitabilityRating === exitability
            );
        }

        if (minSafeAllocation > 0) {
            filteredYields = filteredYields.filter(y =>
                y.liquidityRisk && y.liquidityRisk.maxSafeAllocation >= minSafeAllocation
            );
        }

        // Sort yields
        if (sortBy === "apy") {
            filteredYields = filteredYields.sort((a, b) => b.apy - a.apy);
        } else if (sortBy === "risk") {
            filteredYields = filteredYields.sort((a, b) => a.riskScore - b.riskScore);
        } else if (sortBy === "liquidity") {
            filteredYields = filteredYields.sort((a, b) =>
                (a.liquidityRisk?.score ?? 100) - (b.liquidityRisk?.score ?? 100)
            );
        } else {
            filteredYields = filteredYields.sort((a, b) => b.tvlUsd - a.tvlUsd);
        }

        filteredYields = filteredYields.slice(0, yieldLimit);

        // Get unique categories and chains
        const categories = [...new Set(filteredProtocols.map(p => p.category))].sort();
        const chains = [...new Set(filteredYields.map(y => y.chain))].sort();

        // Build graph nodes
        const protocolSlugs = new Set(Object.keys(protocolData));
        const nodes = filteredProtocols.map(p => ({
            id: p.slug,
            name: p.name,
            category: p.category,
            chains: p.chains,
            tvl: p.tvl,
            symbol: p.symbol,
            logo: p.logo,
            val: Math.log10(p.tvl + 1) * 2,
        }));

        const links = relationships
            .filter(r => protocolSlugs.has(r.source) && protocolSlugs.has(r.target))
            .map(r => ({
                source: r.source,
                target: r.target,
                type: r.type,
                weight: r.weight,
                evidence: r.evidence,
            }));

        return NextResponse.json({
            protocols: Object.values(protocolData),
            relationships,
            yields: filteredYields,
            nodes,
            links,
            metadata: {
                totalProtocols: Object.keys(protocolData).length,
                totalRelationships: relationships.length,
                totalYieldPools: filteredYields.length,
                categories,
                chains,
                fetchedAt: new Date().toISOString(),
                source: "DeFiLlama API (live)",
            },
        });
    } catch (error) {
        console.error("Error fetching DeFi data:", error);
        return NextResponse.json({
            protocols: [],
            relationships: [],
            yields: [],
            nodes: [],
            links: [],
            metadata: {
                totalProtocols: 0,
                totalRelationships: 0,
                totalYieldPools: 0,
                error: "Failed to fetch data from DeFiLlama",
                message: String(error),
            },
        }, { status: 500 });
    }
}
