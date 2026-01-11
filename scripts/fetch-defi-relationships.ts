/**
 * Fetch DeFi protocol relationships from DeFiLlama
 *
 * This script fetches protocol data from DeFiLlama and builds
 * a relationship graph showing how DeFi protocols depend on each other.
 *
 * Usage: npm run fetch:defi
 */

import * as fs from "fs";
import * as path from "path";

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
    chain: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    underlyingTokens?: string[];
    poolMeta?: string;
}

interface DefiRelationship {
    source: string;        // Protocol slug
    target: string;        // Protocol slug
    type: "parent_child" | "yield_source" | "same_ecosystem" | "integration";
    weight: number;        // Strength of relationship (e.g., TVL)
    chain?: string;
    evidence: string;
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

// Known protocol integrations (manually curated for accuracy)
// These are protocols that are known to integrate with each other
const KNOWN_INTEGRATIONS: Array<{ source: string; target: string; type: string; evidence: string }> = [
    // Morpho integrations
    { source: "morpho", target: "aave-v3", type: "yield_source", evidence: "Morpho optimizes Aave lending" },
    { source: "morpho", target: "compound-v3", type: "yield_source", evidence: "Morpho optimizes Compound lending" },

    // Pendle integrations
    { source: "pendle", target: "lido", type: "yield_source", evidence: "Pendle tokenizes Lido stETH yield" },
    { source: "pendle", target: "rocket-pool", type: "yield_source", evidence: "Pendle tokenizes rETH yield" },
    { source: "pendle", target: "aave-v3", type: "yield_source", evidence: "Pendle tokenizes Aave yields" },

    // Sommelier integrations
    { source: "sommelier", target: "aave-v3", type: "yield_source", evidence: "Sommelier vaults use Aave" },
    { source: "sommelier", target: "uniswap-v3", type: "yield_source", evidence: "Sommelier vaults use Uniswap" },
    { source: "sommelier", target: "compound-v3", type: "yield_source", evidence: "Sommelier vaults use Compound" },

    // Beefy integrations
    { source: "beefy", target: "curve-dex", type: "yield_source", evidence: "Beefy vaults farm Curve pools" },
    { source: "beefy", target: "convex-finance", type: "yield_source", evidence: "Beefy uses Convex for Curve boosting" },
    { source: "beefy", target: "aave-v3", type: "yield_source", evidence: "Beefy leverages Aave markets" },

    // Yearn integrations
    { source: "yearn-finance", target: "curve-dex", type: "yield_source", evidence: "Yearn vaults farm Curve" },
    { source: "yearn-finance", target: "aave-v3", type: "yield_source", evidence: "Yearn strategies use Aave" },
    { source: "yearn-finance", target: "compound-v3", type: "yield_source", evidence: "Yearn strategies use Compound" },

    // Convex integrations
    { source: "convex-finance", target: "curve-dex", type: "yield_source", evidence: "Convex boosts Curve rewards" },

    // Gearbox integrations
    { source: "gearbox", target: "curve-dex", type: "yield_source", evidence: "Gearbox leveraged strategies on Curve" },
    { source: "gearbox", target: "lido", type: "yield_source", evidence: "Gearbox leveraged stETH strategies" },
    { source: "gearbox", target: "convex-finance", type: "yield_source", evidence: "Gearbox leveraged Convex strategies" },

    // EigenLayer integrations
    { source: "eigenlayer", target: "lido", type: "yield_source", evidence: "EigenLayer restakes stETH" },
    { source: "eigenlayer", target: "rocket-pool", type: "yield_source", evidence: "EigenLayer restakes rETH" },

    // Kamino (Solana) integrations
    { source: "kamino-finance", target: "raydium", type: "yield_source", evidence: "Kamino optimizes Raydium LP" },
    { source: "kamino-finance", target: "orca", type: "yield_source", evidence: "Kamino optimizes Orca LP" },
    { source: "kamino-finance", target: "meteora", type: "yield_source", evidence: "Kamino integrates Meteora" },

    // Marinade integrations
    { source: "marinade-finance", target: "solend", type: "yield_source", evidence: "mSOL used in Solend" },

    // Aerodrome integrations
    { source: "aerodrome", target: "velodrome", type: "parent_child", evidence: "Aerodrome is Base fork of Velodrome" },

    // Layer 2 / Infrastructure integrations
    { source: "layerzero", target: "stargate", type: "integration", evidence: "Stargate built on LayerZero" },
];

async function fetchProtocols(): Promise<DefiLlamaProtocol[]> {
    console.log("📡 Fetching protocols from DeFiLlama...");

    const response = await fetch(DEFILLAMA_PROTOCOLS_API);
    if (!response.ok) {
        throw new Error(`Failed to fetch protocols: ${response.statusText}`);
    }

    const protocols: DefiLlamaProtocol[] = await response.json();
    console.log(`   ✅ Fetched ${protocols.length} protocols`);

    return protocols;
}

async function fetchYieldPools(): Promise<YieldPool[]> {
    console.log("📡 Fetching yield pools from DeFiLlama...");

    const response = await fetch(DEFILLAMA_YIELDS_API);
    if (!response.ok) {
        throw new Error(`Failed to fetch yields: ${response.statusText}`);
    }

    const data = await response.json();
    const pools: YieldPool[] = data.data || [];
    console.log(`   ✅ Fetched ${pools.length} yield pools`);

    return pools;
}

function buildParentChildRelationships(protocols: DefiLlamaProtocol[]): DefiRelationship[] {
    const relationships: DefiRelationship[] = [];
    const protocolBySlug = new Map(protocols.map(p => [p.slug, p]));

    for (const protocol of protocols) {
        if (protocol.parentProtocol) {
            // Parent protocol format is "parent#slug"
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

    console.log(`   📊 Found ${relationships.length} parent-child relationships`);
    return relationships;
}

function buildKnownIntegrations(protocols: DefiLlamaProtocol[]): DefiRelationship[] {
    const protocolSlugs = new Set(protocols.map(p => p.slug));
    const relationships: DefiRelationship[] = [];

    for (const integration of KNOWN_INTEGRATIONS) {
        // Only include if both protocols exist in DeFiLlama
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

    console.log(`   📊 Added ${relationships.length} known integrations`);
    return relationships;
}

function buildSameEcosystemRelationships(protocols: DefiLlamaProtocol[]): DefiRelationship[] {
    const relationships: DefiRelationship[] = [];

    // Group protocols by category and chain
    const categoryChainMap = new Map<string, DefiLlamaProtocol[]>();

    for (const protocol of protocols) {
        // Only consider DeFi-relevant categories
        const relevantCategories = ["Lending", "Dexes", "Yield", "Yield Aggregator", "Liquid Staking", "Derivatives", "CDP"];
        if (!relevantCategories.includes(protocol.category)) continue;

        for (const chain of protocol.chains) {
            const key = `${protocol.category}:${chain}`;
            if (!categoryChainMap.has(key)) {
                categoryChainMap.set(key, []);
            }
            categoryChainMap.get(key)!.push(protocol);
        }
    }

    // Create relationships between top protocols in same category/chain
    for (const [key, protocolsInGroup] of categoryChainMap) {
        // Sort by TVL and take top 5
        const topProtocols = protocolsInGroup
            .filter(p => p.tvl > 10_000_000) // Only protocols with >$10M TVL
            .sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
            .slice(0, 5);

        // Create relationships between top protocols (they likely integrate)
        for (let i = 0; i < topProtocols.length; i++) {
            for (let j = i + 1; j < topProtocols.length; j++) {
                const [category, chain] = key.split(":");
                relationships.push({
                    source: topProtocols[i].slug,
                    target: topProtocols[j].slug,
                    type: "same_ecosystem",
                    weight: Math.min(topProtocols[i].tvl || 0, topProtocols[j].tvl || 0),
                    chain,
                    evidence: `Both are ${category} protocols on ${chain}`,
                });
            }
        }
    }

    console.log(`   📊 Found ${relationships.length} same-ecosystem relationships`);
    return relationships;
}

async function main() {
    console.log("\n🔍 DeFi Protocol Relationship Analyzer\n");
    console.log("=".repeat(60));

    try {
        // Fetch data
        const protocols = await fetchProtocols();

        // Filter to relevant DeFi protocols (TVL > $1M)
        const defiProtocols = protocols.filter(p =>
            p.tvl > 1_000_000 &&
            p.category !== "CEX" &&
            p.category !== "Chain"
        );
        console.log(`   📊 Filtered to ${defiProtocols.length} DeFi protocols with >$1M TVL`);

        // Build protocol data map
        const protocolData: Record<string, DefiProtocolData> = {};
        for (const p of defiProtocols) {
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
        console.log("\n📊 Building relationships...");
        const parentChildRels = buildParentChildRelationships(defiProtocols);
        const knownIntegrations = buildKnownIntegrations(defiProtocols);
        const ecosystemRels = buildSameEcosystemRelationships(defiProtocols);

        // Combine and deduplicate relationships
        const allRelationships = [
            ...parentChildRels,
            ...knownIntegrations,
            ...ecosystemRels,
        ];

        // Deduplicate by source-target pair (keep highest weight)
        const relationshipMap = new Map<string, DefiRelationship>();
        for (const rel of allRelationships) {
            const key = `${rel.source}:${rel.target}`;
            const existing = relationshipMap.get(key);
            if (!existing || rel.weight > existing.weight) {
                relationshipMap.set(key, rel);
            }
        }
        const relationships = Array.from(relationshipMap.values());

        // Get unique categories
        const categories = [...new Set(defiProtocols.map(p => p.category))].sort();

        // Build final data
        const data: DefiRelationshipData = {
            protocols: protocolData,
            relationships,
            metadata: {
                fetchedAt: new Date().toISOString(),
                totalProtocols: Object.keys(protocolData).length,
                totalRelationships: relationships.length,
                categories,
            },
        };

        // Save to file
        const outputDir = path.join(process.cwd(), "data");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, "defi-relationships.json");
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`\n💾 Saved to ${outputPath}`);

        // Print summary
        console.log("\n" + "=".repeat(60));
        console.log("📊 SUMMARY");
        console.log("=".repeat(60));
        console.log(`   Protocols: ${data.metadata.totalProtocols}`);
        console.log(`   Relationships: ${data.metadata.totalRelationships}`);
        console.log(`   Categories: ${categories.length}`);

        // Print top relationships by TVL
        console.log("\n🔗 TOP RELATIONSHIPS (by TVL):");
        const topRels = relationships
            .sort((a, b) => b.weight - a.weight)
            .slice(0, 20);

        for (const rel of topRels) {
            const tvlStr = rel.weight > 1_000_000_000
                ? `$${(rel.weight / 1_000_000_000).toFixed(1)}B`
                : `$${(rel.weight / 1_000_000).toFixed(0)}M`;
            console.log(`   ${rel.source} → ${rel.target} (${rel.type}, ${tvlStr})`);
        }

        // Print category breakdown
        console.log("\n📁 CATEGORIES:");
        const categoryCounts = new Map<string, number>();
        for (const p of defiProtocols) {
            categoryCounts.set(p.category, (categoryCounts.get(p.category) || 0) + 1);
        }
        const sortedCategories = [...categoryCounts.entries()].sort((a, b) => b[1] - a[1]);
        for (const [cat, count] of sortedCategories.slice(0, 15)) {
            console.log(`   ${cat}: ${count} protocols`);
        }

        console.log("\n" + "=".repeat(60));
        console.log("✅ Done!\n");

    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

main();
