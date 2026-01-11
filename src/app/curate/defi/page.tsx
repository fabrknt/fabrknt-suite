"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DependencyGraph, GraphNode, GraphLink } from "@/components/curate/dependency-graph";
import {
    Network,
    TrendingUp,
    Link2,
    Loader2,
    DollarSign,
    Filter,
    ExternalLink,
} from "lucide-react";

interface DefiProtocol {
    slug: string;
    name: string;
    category: string;
    chains: string[];
    tvl: number;
    symbol: string;
    logo?: string;
}

interface DefiRelationship {
    source: string;
    target: string;
    type: "parent_child" | "yield_source" | "same_ecosystem" | "integration";
    weight: number;
    evidence: string;
}

interface DefiGraphData {
    protocols: DefiProtocol[];
    relationships: DefiRelationship[];
    nodes: GraphNode[];
    links: GraphLink[];
    metadata: {
        totalProtocols: number;
        totalRelationships: number;
        categories: string[];
        fetchedAt: string;
    };
}

const RELATIONSHIP_COLORS: Record<string, string> = {
    parent_child: "#8B5CF6",    // Purple
    yield_source: "#10B981",    // Green
    same_ecosystem: "#6366F1",  // Indigo
    integration: "#06B6D4",     // Cyan
};

const RELATIONSHIP_LABELS: Record<string, string> = {
    parent_child: "Version/Fork",
    yield_source: "Yield Source",
    same_ecosystem: "Same Ecosystem",
    integration: "Integration",
};

const CATEGORY_OPTIONS = [
    { value: "", label: "All Categories" },
    { value: "Lending", label: "Lending" },
    { value: "Dexs", label: "DEXs" },
    { value: "Liquid Staking", label: "Liquid Staking" },
    { value: "Yield", label: "Yield" },
    { value: "Yield Aggregator", label: "Yield Aggregator" },
    { value: "Derivatives", label: "Derivatives" },
    { value: "CDP", label: "CDP" },
    { value: "Bridge", label: "Bridge" },
];

const CHAIN_OPTIONS = [
    { value: "", label: "All Chains" },
    { value: "Ethereum", label: "Ethereum" },
    { value: "Arbitrum", label: "Arbitrum" },
    { value: "Base", label: "Base" },
    { value: "Optimism", label: "Optimism" },
    { value: "Polygon", label: "Polygon" },
    { value: "Solana", label: "Solana" },
    { value: "Avalanche", label: "Avalanche" },
];

function formatTvl(tvl: number): string {
    if (tvl >= 1_000_000_000) {
        return `$${(tvl / 1_000_000_000).toFixed(1)}B`;
    }
    if (tvl >= 1_000_000) {
        return `$${(tvl / 1_000_000).toFixed(0)}M`;
    }
    return `$${(tvl / 1_000).toFixed(0)}K`;
}

export default function DefiRelationshipsPage() {
    const router = useRouter();
    const [graphData, setGraphData] = useState<DefiGraphData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState("");
    const [chain, setChain] = useState("");
    const [minTvl, setMinTvl] = useState(100_000_000); // $100M default

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (category) params.set("category", category);
                if (chain) params.set("chain", chain);
                params.set("minTvl", minTvl.toString());
                params.set("limit", "100");

                const response = await fetch(`/api/curate/defi?${params}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch DeFi data");
                }
                const data = await response.json();
                setGraphData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [category, chain, minTvl]);

    const handleNodeClick = (node: GraphNode) => {
        // Open DeFiLlama page for the protocol
        window.open(`https://defillama.com/protocol/${node.id}`, "_blank");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">
                        CURATE
                    </h1>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 text-xs font-semibold font-mono">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        PREVIEW
                    </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                    DeFi Protocol Relationships
                </p>
                <p className="text-muted-foreground">
                    Explore how DeFi protocols depend on each other through yield sources, integrations, and shared ecosystems.
                </p>
            </div>

            {/* Data Source Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-green-900 mb-1">
                            Powered by DeFiLlama
                        </h3>
                        <p className="text-sm text-green-800">
                            Protocol data and TVL metrics sourced from DeFiLlama. Relationships include
                            parent/child protocols, yield source integrations, and same-ecosystem connections.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-slate-500" />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                        >
                            {CATEGORY_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Network className="h-4 w-4 text-slate-500" />
                        <select
                            value={chain}
                            onChange={(e) => setChain(e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                        >
                            {CHAIN_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-slate-500" />
                        <select
                            value={minTvl}
                            onChange={(e) => setMinTvl(parseInt(e.target.value))}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                        >
                            <option value="10000000">TVL &gt; $10M</option>
                            <option value="50000000">TVL &gt; $50M</option>
                            <option value="100000000">TVL &gt; $100M</option>
                            <option value="500000000">TVL &gt; $500M</option>
                            <option value="1000000000">TVL &gt; $1B</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm">
                {Object.entries(RELATIONSHIP_LABELS).map(([type, label]) => (
                    <div key={type} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: RELATIONSHIP_COLORS[type] }}
                        />
                        <span className="text-slate-400">{label}</span>
                    </div>
                ))}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-[600px] bg-slate-900 rounded-lg border border-border">
                    <Loader2 className="h-8 w-8 text-cyan-400 animate-spin mb-4" />
                    <p className="text-slate-400">Loading DeFi protocol graph...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-[600px] bg-slate-900 rounded-lg border border-border">
                    <p className="text-red-400 mb-2">Error loading data</p>
                    <p className="text-slate-500 text-sm">{error}</p>
                </div>
            ) : !graphData || graphData.nodes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[600px] bg-slate-900 rounded-lg border border-border">
                    <Network className="h-12 w-12 text-slate-600 mb-4" />
                    <p className="text-slate-400 mb-2">No DeFi data available</p>
                    <p className="text-slate-600 text-sm">
                        Run the fetch script to populate the data:
                    </p>
                    <code className="bg-slate-800 px-3 py-2 rounded mt-2 text-cyan-400 text-sm">
                        npm run fetch:defi
                    </code>
                </div>
            ) : (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-card border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <Network className="h-4 w-4" />
                                <span className="text-xs">Protocols</span>
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {graphData.metadata.totalProtocols}
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <Link2 className="h-4 w-4" />
                                <span className="text-xs">Relationships</span>
                            </div>
                            <div className="text-2xl font-bold text-cyan-400">
                                {graphData.metadata.totalRelationships}
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 col-span-2">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-xs">Top Protocols by TVL</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {graphData.protocols.slice(0, 5).map((p) => (
                                    <span
                                        key={p.slug}
                                        className="text-sm bg-slate-800 text-white px-2 py-1 rounded cursor-pointer hover:bg-slate-700 transition-colors"
                                        onClick={() => window.open(`https://defillama.com/protocol/${p.slug}`, "_blank")}
                                    >
                                        {p.name} ({formatTvl(p.tvl)})
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Graph */}
                    <DependencyGraph
                        data={{
                            nodes: graphData.nodes,
                            links: graphData.links,
                            metadata: {
                                totalProjects: graphData.metadata.totalProtocols,
                                totalEdges: graphData.metadata.totalRelationships,
                                mostConnected: graphData.protocols.slice(0, 5).map(p => p.slug),
                                topSharedDeps: [],
                            },
                        }}
                        onNodeClick={handleNodeClick}
                        height={600}
                    />

                    {/* Top Relationships */}
                    <div className="bg-card border border-border rounded-lg p-4">
                        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Link2 className="h-5 w-5 text-cyan-400" />
                            Top DeFi Relationships
                        </h2>
                        <div className="space-y-2">
                            {graphData.relationships.slice(0, 10).map((rel, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between bg-slate-800/50 rounded-lg px-3 py-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-medium">{rel.source}</span>
                                        <span className="text-slate-500">→</span>
                                        <span className="text-cyan-400">{rel.target}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-xs px-2 py-0.5 rounded"
                                            style={{
                                                backgroundColor: `${RELATIONSHIP_COLORS[rel.type]}20`,
                                                color: RELATIONSHIP_COLORS[rel.type],
                                            }}
                                        >
                                            {RELATIONSHIP_LABELS[rel.type]}
                                        </span>
                                        <span className="text-slate-500 text-sm">
                                            {formatTvl(rel.weight)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
