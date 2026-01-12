"use client";

import { useState } from "react";
import { ExternalLink, Settings, TrendingUp, Coins, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { CHAIN_NAMES, BLOCK_EXPLORERS, type SupportedChainId } from "@/lib/wagmi/config";

interface VaultAllocation {
    id: string;
    marketId: string;
    marketName: string | null;
    allocationCap: number;
    enabled: boolean;
    currentAmount: number;
    currentApy: number | null;
}

interface VaultData {
    id: string;
    chainId: number;
    vaultAddress: string;
    factoryVersion: string;
    asset: string;
    assetSymbol: string;
    name: string;
    symbol: string;
    deployedAt: string;
    txHash: string | null;
    curatorAddress: string | null;
    performanceFee: number;
    managementFee: number;
    tvl: number;
    totalEarned: number;
    lastSyncedAt: string | null;
    allocations: VaultAllocation[];
}

interface VaultCardProps {
    vault: VaultData;
    onManage?: (vault: VaultData) => void;
}

function formatTvl(tvl: number): string {
    if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
    if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(2)}M`;
    if (tvl >= 1_000) return `$${(tvl / 1_000).toFixed(2)}K`;
    return `$${tvl.toFixed(2)}`;
}

function formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function VaultCard({ vault, onManage }: VaultCardProps) {
    const [expanded, setExpanded] = useState(false);

    const chainName = CHAIN_NAMES[vault.chainId as SupportedChainId] || `Chain ${vault.chainId}`;
    const explorerUrl = BLOCK_EXPLORERS[vault.chainId as SupportedChainId] || "https://etherscan.io";

    const enabledAllocations = vault.allocations.filter((a) => a.enabled);
    const totalAllocationCap = enabledAllocations.reduce((sum, a) => sum + a.allocationCap, 0);

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600 transition-colors">
            {/* Header */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white">{vault.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500 font-mono">
                                {formatAddress(vault.vaultAddress)}
                            </span>
                            <a
                                href={`${explorerUrl}/address/${vault.vaultAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-cyan-400 transition-colors"
                            >
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                            {chainName}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                            {vault.assetSymbol}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wide">TVL</p>
                        <p className="text-lg font-semibold text-white">{formatTvl(vault.tvl)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wide">Earned</p>
                        <p className="text-lg font-semibold text-green-400">
                            {vault.totalEarned > 0 ? `+${formatTvl(vault.totalEarned)}` : "$0"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wide">Markets</p>
                        <p className="text-lg font-semibold text-white">{enabledAllocations.length}</p>
                    </div>
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Deployed {formatDate(vault.deployedAt)}</span>
                    </div>
                    {vault.performanceFee > 0 && (
                        <div className="flex items-center gap-1">
                            <Coins className="h-3 w-3" />
                            <span>{vault.performanceFee}% perf fee</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Expandable Allocations Section */}
            {enabledAllocations.length > 0 && (
                <>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full px-5 py-3 border-t border-slate-700/50 flex items-center justify-between text-sm text-slate-400 hover:bg-slate-800/50 transition-colors"
                    >
                        <span>Market Allocations ({enabledAllocations.length})</span>
                        {expanded ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </button>

                    {expanded && (
                        <div className="px-5 pb-4 space-y-2">
                            {enabledAllocations.map((allocation) => (
                                <div
                                    key={allocation.id}
                                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                                >
                                    <div>
                                        <p className="text-sm text-white">
                                            {allocation.marketName || formatAddress(allocation.marketId)}
                                        </p>
                                        <p className="text-xs text-slate-500 font-mono">
                                            {formatAddress(allocation.marketId)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-white">{allocation.allocationCap}% cap</p>
                                        {allocation.currentApy && (
                                            <p className="text-xs text-green-400 flex items-center gap-1 justify-end">
                                                <TrendingUp className="h-3 w-3" />
                                                {allocation.currentApy.toFixed(2)}% APY
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Actions */}
            <div className="px-5 py-4 border-t border-slate-700/50 flex items-center justify-between">
                <a
                    href={`${explorerUrl}/address/${vault.vaultAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                    <ExternalLink className="h-4 w-4" />
                    View on Explorer
                </a>
                {onManage && (
                    <button
                        onClick={() => onManage(vault)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <Settings className="h-4 w-4" />
                        Manage
                    </button>
                )}
            </div>
        </div>
    );
}
