"use client";

import { useEffect, useState } from "react";
import { DependencyGraph, GraphNode, GraphLink } from "@/components/curate/dependency-graph";
import {
    Network,
    TrendingUp,
    Link2,
    Loader2,
    DollarSign,
    Filter,
    Percent,
    Coins,
    ArrowUpDown,
    ExternalLink,
    Shield,
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

interface DefiGraphData {
    protocols: DefiProtocol[];
    relationships: DefiRelationship[];
    yields: YieldPool[];
    nodes: GraphNode[];
    links: GraphLink[];
    metadata: {
        totalProtocols: number;
        totalRelationships: number;
        totalYieldPools: number;
        categories: string[];
        chains: string[];
        fetchedAt: string;
    };
}

const RELATIONSHIP_COLORS: Record<string, string> = {
    parent_child: "#8B5CF6",
    yield_source: "#10B981",
    same_ecosystem: "#6366F1",
    integration: "#06B6D4",
};

const RELATIONSHIP_LABELS: Record<string, string> = {
    parent_child: "Version/Fork",
    yield_source: "Yield Source",
    same_ecosystem: "Same Ecosystem",
    integration: "Integration",
};

const CHAIN_OPTIONS = [
    { value: "", label: "All Chains" },
    { value: "Ethereum", label: "Ethereum" },
    { value: "Arbitrum", label: "Arbitrum" },
    { value: "Base", label: "Base" },
    { value: "Optimism", label: "Optimism" },
    { value: "Polygon", label: "Polygon" },
    { value: "Solana", label: "Solana" },
    { value: "Avalanche", label: "Avalanche" },
    { value: "BSC", label: "BSC" },
];

function formatTvl(tvl: number): string {
    if (tvl >= 1_000_000_000) {
        return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
    }
    if (tvl >= 1_000_000) {
        return `$${(tvl / 1_000_000).toFixed(1)}M`;
    }
    return `$${(tvl / 1_000).toFixed(0)}K`;
}

function formatApy(apy: number): string {
    if (apy >= 100) {
        return `${apy.toFixed(0)}%`;
    }
    return `${apy.toFixed(2)}%`;
}

type TabType = "yields" | "graph";
type SortField = "tvl" | "apy";

export default function DefiRelationshipsPage() {
    const [graphData, setGraphData] = useState<DefiGraphData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>("yields");

    // Filters
    const [chain, setChain] = useState("");
    const [minTvl, setMinTvl] = useState(1_000_000); // $1M default for yields
    const [minApy, setMinApy] = useState(0);
    const [stablecoinOnly, setStablecoinOnly] = useState(false);
    const [sortBy, setSortBy] = useState<SortField>("tvl");

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (chain) params.set("chain", chain);
                params.set("minTvl", minTvl.toString());
                params.set("minApy", minApy.toString());
                if (stablecoinOnly) params.set("stablecoinOnly", "true");
                params.set("sortBy", sortBy);
                params.set("yieldLimit", "200");
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
    }, [chain, minTvl, minApy, stablecoinOnly, sortBy]);

    const handleNodeClick = (node: GraphNode) => {
        window.open(`https://defillama.com/protocol/${node.id}`, "_blank");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">CURATE</h1>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 text-xs font-semibold font-mono">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        PREVIEW
                    </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">DeFi Yields & Protocol Relationships</p>
                <p className="text-muted-foreground">
                    Discover yield opportunities and explore how DeFi protocols depend on each other.
                </p>
            </div>

            {/* Data Source Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-semibold text-green-900 mb-1">Powered by DeFiLlama</h3>
                        <p className="text-sm text-green-800">
                            Real-time yield data from {graphData?.metadata.totalYieldPools?.toLocaleString() || "7,000+"}
                            {" "}pools across {graphData?.metadata.chains?.length || "85"} chains.
                            Data refreshed regularly.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
                <button
                    onClick={() => setActiveTab("yields")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "yields"
                            ? "border-cyan-400 text-cyan-400"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                >
                    <Percent className="h-4 w-4 inline mr-2" />
                    Yield Opportunities
                </button>
                <button
                    onClick={() => setActiveTab("graph")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "graph"
                            ? "border-cyan-400 text-cyan-400"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                >
                    <Network className="h-4 w-4 inline mr-2" />
                    Protocol Graph
                </button>
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex flex-wrap gap-4">
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
                            <option value="100000">TVL &gt; $100K</option>
                            <option value="1000000">TVL &gt; $1M</option>
                            <option value="10000000">TVL &gt; $10M</option>
                            <option value="100000000">TVL &gt; $100M</option>
                            <option value="1000000000">TVL &gt; $1B</option>
                        </select>
                    </div>

                    {activeTab === "yields" && (
                        <>
                            <div className="flex items-center gap-2">
                                <Percent className="h-4 w-4 text-slate-500" />
                                <select
                                    value={minApy}
                                    onChange={(e) => setMinApy(parseFloat(e.target.value))}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                                >
                                    <option value="0">Any APY</option>
                                    <option value="1">APY &gt; 1%</option>
                                    <option value="5">APY &gt; 5%</option>
                                    <option value="10">APY &gt; 10%</option>
                                    <option value="20">APY &gt; 20%</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <ArrowUpDown className="h-4 w-4 text-slate-500" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortField)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                                >
                                    <option value="tvl">Sort by TVL</option>
                                    <option value="apy">Sort by APY</option>
                                </select>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={stablecoinOnly}
                                    onChange={(e) => setStablecoinOnly(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                                />
                                <Coins className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-slate-400">Stablecoins Only</span>
                            </label>
                        </>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-[400px] bg-slate-900 rounded-lg border border-border">
                    <Loader2 className="h-8 w-8 text-cyan-400 animate-spin mb-4" />
                    <p className="text-slate-400">Loading DeFi data...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-[400px] bg-slate-900 rounded-lg border border-border">
                    <p className="text-red-400 mb-2">Error loading data</p>
                    <p className="text-slate-500 text-sm">{error}</p>
                </div>
            ) : !graphData ? (
                <div className="flex flex-col items-center justify-center h-[400px] bg-slate-900 rounded-lg border border-border">
                    <Network className="h-12 w-12 text-slate-600 mb-4" />
                    <p className="text-slate-400 mb-2">No DeFi data available</p>
                    <code className="bg-slate-800 px-3 py-2 rounded mt-2 text-cyan-400 text-sm">
                        npm run fetch:defi
                    </code>
                </div>
            ) : activeTab === "yields" ? (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-card border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <Percent className="h-4 w-4" />
                                <span className="text-xs">Yield Pools</span>
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {graphData.yields.length.toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-xs">Avg APY (Top 20)</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">
                                {formatApy(
                                    graphData.yields.slice(0, 20).reduce((acc, y) => acc + y.apy, 0) /
                                        Math.min(20, graphData.yields.length) || 0
                                )}
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <DollarSign className="h-4 w-4" />
                                <span className="text-xs">Total TVL (Shown)</span>
                            </div>
                            <div className="text-2xl font-bold text-cyan-400">
                                {formatTvl(graphData.yields.reduce((acc, y) => acc + y.tvlUsd, 0))}
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <Coins className="h-4 w-4" />
                                <span className="text-xs">Stablecoin Pools</span>
                            </div>
                            <div className="text-2xl font-bold text-yellow-400">
                                {graphData.yields.filter((y) => y.stablecoin).length}
                            </div>
                        </div>
                    </div>

                    {/* Yields Table */}
                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-800/50">
                                    <tr>
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                                            Pool
                                        </th>
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                                            Chain
                                        </th>
                                        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                                            TVL
                                        </th>
                                        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                                            APY
                                        </th>
                                        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase hidden md:table-cell">
                                            Base
                                        </th>
                                        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase hidden md:table-cell">
                                            Reward
                                        </th>
                                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                                            Type
                                        </th>
                                        <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                                            Link
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {graphData.yields.map((pool, idx) => (
                                        <tr
                                            key={pool.id}
                                            className="hover:bg-slate-800/30 transition-colors"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-medium text-sm">
                                                        {pool.project}
                                                    </span>
                                                    <span className="text-slate-500 text-xs font-mono">
                                                        {pool.symbol}
                                                        {pool.poolMeta && (
                                                            <span className="text-slate-600 ml-1">
                                                                ({pool.poolMeta})
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm text-slate-400">{pool.chain}</span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="text-sm text-white font-medium">
                                                    {formatTvl(pool.tvlUsd)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span
                                                    className={`text-sm font-bold ${
                                                        pool.apy >= 20
                                                            ? "text-orange-400"
                                                            : pool.apy >= 10
                                                            ? "text-yellow-400"
                                                            : pool.apy >= 5
                                                            ? "text-green-400"
                                                            : "text-slate-400"
                                                    }`}
                                                >
                                                    {formatApy(pool.apy)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right hidden md:table-cell">
                                                <span className="text-sm text-slate-500">
                                                    {formatApy(pool.apyBase)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right hidden md:table-cell">
                                                <span className="text-sm text-purple-400">
                                                    {pool.apyReward > 0 ? `+${formatApy(pool.apyReward)}` : "-"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {pool.stablecoin ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                                                        <Shield className="h-3 w-3" />
                                                        Stable
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-slate-600">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <a
                                                    href={`https://defillama.com/yields/pool/${pool.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {graphData.yields.length === 0 && (
                            <div className="text-center py-8 text-slate-500">
                                No pools match your filters. Try adjusting the criteria.
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {/* Graph View */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                        <div className="bg-card border border-border rounded-lg p-4 col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-xs">Top by TVL</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {graphData.protocols.slice(0, 3).map((p) => (
                                    <span
                                        key={p.slug}
                                        className="text-xs bg-slate-800 text-white px-2 py-0.5 rounded"
                                    >
                                        {p.name}
                                    </span>
                                ))}
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

                    {/* Graph */}
                    {graphData.nodes.length > 0 ? (
                        <DependencyGraph
                            data={{
                                nodes: graphData.nodes,
                                links: graphData.links,
                            }}
                            onNodeClick={handleNodeClick}
                            height={500}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[400px] bg-slate-900 rounded-lg border border-border">
                            <Network className="h-12 w-12 text-slate-600 mb-4" />
                            <p className="text-slate-400">No protocols match the current filters</p>
                        </div>
                    )}

                    {/* Top Relationships */}
                    {graphData.relationships.length > 0 && (
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
                                            <span className="text-slate-500 text-sm">{formatTvl(rel.weight)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
