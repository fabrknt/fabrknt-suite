"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, TrendingUp, AlertTriangle, Check, Plus, Minus, Loader2 } from "lucide-react";
import type { MorphoMarket } from "@/lib/morpho/types";

interface MarketSelectorProps {
    chainId: number;
    assetAddress: string;
    selectedMarkets: Array<{ marketId: string; allocationCap: number }>;
    onMarketsChange: (markets: Array<{ marketId: string; allocationCap: number }>) => void;
}

export function MarketSelector({
    chainId,
    assetAddress,
    selectedMarkets,
    onMarketsChange,
}: MarketSelectorProps) {
    const [markets, setMarkets] = useState<MorphoMarket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"apy" | "tvl" | "utilization">("apy");

    // Fetch markets from API
    useEffect(() => {
        const fetchMarkets = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/morpho/markets?chainId=${chainId}&asset=${assetAddress}&limit=50`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch markets");
                }

                const data = await response.json();
                setMarkets(data.markets || []);
            } catch (err) {
                setError("Failed to load markets");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (chainId && assetAddress) {
            fetchMarkets();
        }
    }, [chainId, assetAddress]);

    // Filter and sort markets
    const filteredMarkets = useMemo(() => {
        let filtered = markets.filter((m) => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
                m.loanToken.symbol.toLowerCase().includes(query) ||
                m.collateralToken.symbol.toLowerCase().includes(query) ||
                m.id.toLowerCase().includes(query)
            );
        });

        // Sort
        switch (sortBy) {
            case "apy":
                filtered = filtered.sort((a, b) => b.supplyApy - a.supplyApy);
                break;
            case "tvl":
                filtered = filtered.sort(
                    (a, b) =>
                        parseFloat(b.totalSupplyAssets) - parseFloat(a.totalSupplyAssets)
                );
                break;
            case "utilization":
                filtered = filtered.sort((a, b) => b.utilization - a.utilization);
                break;
        }

        return filtered;
    }, [markets, searchQuery, sortBy]);

    // Check if a market is selected
    const isSelected = (marketId: string) =>
        selectedMarkets.some((m) => m.marketId === marketId);

    // Get allocation for a market
    const getAllocation = (marketId: string) =>
        selectedMarkets.find((m) => m.marketId === marketId)?.allocationCap || 0;

    // Toggle market selection
    const toggleMarket = (marketId: string) => {
        if (isSelected(marketId)) {
            onMarketsChange(selectedMarkets.filter((m) => m.marketId !== marketId));
        } else {
            onMarketsChange([...selectedMarkets, { marketId, allocationCap: 100 }]);
        }
    };

    // Update allocation for a market
    const updateAllocation = (marketId: string, allocationCap: number) => {
        onMarketsChange(
            selectedMarkets.map((m) =>
                m.marketId === marketId ? { ...m, allocationCap } : m
            )
        );
    };

    // Calculate total allocation
    const totalAllocation = selectedMarkets.reduce(
        (sum, m) => sum + m.allocationCap,
        0
    );

    // Format large numbers
    const formatTvl = (value: string) => {
        const num = parseFloat(value);
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
        if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
        return `$${num.toFixed(2)}`;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
                <span className="ml-3 text-slate-400">Loading markets...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-12 text-red-400">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header with search and sort */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by collateral..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                    <option value="apy">Sort by APY</option>
                    <option value="tvl">Sort by TVL</option>
                    <option value="utilization">Sort by Utilization</option>
                </select>
            </div>

            {/* Selected count and total allocation */}
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                    {selectedMarkets.length} market{selectedMarkets.length !== 1 ? "s" : ""}{" "}
                    selected
                </span>
                <span
                    className={`font-medium ${
                        totalAllocation > 100
                            ? "text-red-400"
                            : totalAllocation === 100
                            ? "text-green-400"
                            : "text-amber-400"
                    }`}
                >
                    Total Allocation: {totalAllocation}%
                </span>
            </div>

            {/* Markets list */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {filteredMarkets.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        No markets found for this asset
                    </div>
                ) : (
                    filteredMarkets.map((market) => (
                        <div
                            key={market.id}
                            className={`p-4 rounded-lg border transition-all ${
                                isSelected(market.id)
                                    ? "border-cyan-500 bg-cyan-500/5"
                                    : "border-slate-700 hover:border-slate-600"
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                {/* Market info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-white">
                                            {market.loanToken.symbol}
                                        </span>
                                        <span className="text-slate-500">/</span>
                                        <span className="text-slate-300">
                                            {market.collateralToken.symbol}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2 text-sm">
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="h-3 w-3 text-green-400" />
                                            <span className="text-green-400">
                                                {market.supplyApy.toFixed(2)}% APY
                                            </span>
                                        </div>
                                        <div className="text-slate-400">
                                            TVL: {formatTvl(market.totalSupplyAssets)}
                                        </div>
                                        <div className="text-slate-400">
                                            Util: {market.utilization.toFixed(1)}%
                                        </div>
                                    </div>

                                    <div className="text-xs text-slate-500 font-mono mt-1">
                                        {market.id.slice(0, 10)}...{market.id.slice(-8)}
                                    </div>
                                </div>

                                {/* Selection toggle */}
                                <button
                                    onClick={() => toggleMarket(market.id)}
                                    className={`p-2 rounded-lg transition-colors ${
                                        isSelected(market.id)
                                            ? "bg-cyan-500/20 text-cyan-400"
                                            : "bg-slate-700 text-slate-400 hover:text-white"
                                    }`}
                                >
                                    {isSelected(market.id) ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <Plus className="h-4 w-4" />
                                    )}
                                </button>
                            </div>

                            {/* Allocation slider (when selected) */}
                            {isSelected(market.id) && (
                                <div className="mt-4 pt-4 border-t border-slate-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-slate-400">
                                            Allocation Cap
                                        </span>
                                        <span className="text-sm font-medium text-white">
                                            {getAllocation(market.id)}%
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                updateAllocation(
                                                    market.id,
                                                    Math.max(0, getAllocation(market.id) - 10)
                                                )
                                            }
                                            className="p-1 rounded bg-slate-700 text-slate-400 hover:text-white"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={getAllocation(market.id)}
                                            onChange={(e) =>
                                                updateAllocation(market.id, parseInt(e.target.value))
                                            }
                                            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <button
                                            onClick={() =>
                                                updateAllocation(
                                                    market.id,
                                                    Math.min(100, getAllocation(market.id) + 10)
                                                )
                                            }
                                            className="p-1 rounded bg-slate-700 text-slate-400 hover:text-white"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
