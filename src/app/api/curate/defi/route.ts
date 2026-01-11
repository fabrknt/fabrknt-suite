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

interface DefiRelationshipData {
    protocols: Record<string, DefiProtocolData>;
    relationships: DefiRelationship[];
    metadata: {
        fetchedAt: string;
        totalProtocols: number;
        totalRelationships: number;
        categories: string[];
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

    const data = loadDefiData();

    if (!data) {
        return NextResponse.json({
            protocols: [],
            relationships: [],
            nodes: [],
            links: [],
            metadata: {
                totalProtocols: 0,
                totalRelationships: 0,
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
        nodes,
        links,
        metadata: {
            totalProtocols: filteredProtocols.length,
            totalRelationships: filteredRelationships.length,
            categories: data.metadata.categories,
            fetchedAt: data.metadata.fetchedAt,
        },
    });
}
