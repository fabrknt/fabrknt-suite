import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

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

interface YieldPool {
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
}

interface DefiRelationshipData {
    protocols: Record<string, DefiProtocolData>;
    relationships: DefiRelationship[];
    yields: YieldPool[];
    metadata: {
        fetchedAt: string;
        totalProtocols: number;
        totalRelationships: number;
        totalYieldPools: number;
        categories: string[];
        chains: string[];
    };
}

// Load DeFi relationships data
function loadDefiData(): DefiRelationshipData | null {
    try {
        const dataPath = path.join(process.cwd(), "data", "defi-relationships.json");
        if (!fs.existsSync(dataPath)) {
            return null;
        }
        const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        return data;
    } catch (error) {
        console.error("Error loading DeFi data:", error);
        return null;
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const chain = searchParams.get("chain");
    const type = searchParams.get("type"); // relationship type filter
    const minTvl = parseInt(searchParams.get("minTvl") || "0");
    const limit = parseInt(searchParams.get("limit") || "100");

    // Yields filters
    const yieldsOnly = searchParams.get("yieldsOnly") === "true";
    const minApy = parseFloat(searchParams.get("minApy") || "0");
    const maxApy = parseFloat(searchParams.get("maxApy") || "10000");
    const stablecoinOnly = searchParams.get("stablecoinOnly") === "true";
    const sortBy = searchParams.get("sortBy") || "tvl"; // tvl, apy
    const yieldLimit = parseInt(searchParams.get("yieldLimit") || "100");

    const data = loadDefiData();

    if (!data) {
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
                message: "DeFi relationship data not found. Run 'npm run fetch:defi' to fetch data.",
            },
        });
    }

    // Filter protocols
    let filteredProtocols = Object.values(data.protocols);

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

    // Sort by TVL and limit
    filteredProtocols = filteredProtocols
        .sort((a, b) => b.tvl - a.tvl)
        .slice(0, limit);

    const protocolSlugs = new Set(filteredProtocols.map(p => p.slug));

    // Filter relationships to only include filtered protocols
    let filteredRelationships = data.relationships.filter(r =>
        protocolSlugs.has(r.source) || protocolSlugs.has(r.target)
    );

    if (type) {
        filteredRelationships = filteredRelationships.filter(r => r.type === type);
    }

    // Filter yields
    let filteredYields = data.yields || [];

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

    // Sort yields
    if (sortBy === "apy") {
        filteredYields = filteredYields.sort((a, b) => b.apy - a.apy);
    } else {
        filteredYields = filteredYields.sort((a, b) => b.tvlUsd - a.tvlUsd);
    }

    // Limit yields
    filteredYields = filteredYields.slice(0, yieldLimit);

    // Build graph data for visualization
    const nodes = filteredProtocols.map(p => ({
        id: p.slug,
        name: p.name,
        category: p.category,
        chains: p.chains,
        tvl: p.tvl,
        symbol: p.symbol,
        logo: p.logo,
        // Node size based on TVL (log scale)
        val: Math.log10(p.tvl + 1) * 2,
    }));

    const links = filteredRelationships
        .filter(r => protocolSlugs.has(r.source) && protocolSlugs.has(r.target))
        .map(r => ({
            source: r.source,
            target: r.target,
            type: r.type,
            weight: r.weight,
            evidence: r.evidence,
        }));

    return NextResponse.json({
        protocols: filteredProtocols,
        relationships: filteredRelationships,
        yields: filteredYields,
        nodes,
        links,
        metadata: {
            totalProtocols: filteredProtocols.length,
            totalRelationships: filteredRelationships.length,
            totalYieldPools: filteredYields.length,
            categories: data.metadata.categories,
            chains: data.metadata.chains || [],
            fetchedAt: data.metadata.fetchedAt,
        },
    });
}
