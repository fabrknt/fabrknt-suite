"use client";

import { useState } from "react";
import { Coins, Shield, Zap, Users, TrendingUp, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { getAllLSTs, type LSTData } from "@/lib/solana/yield-context";

interface LSTComparisonProps {
    onLSTClick?: (tokenMint: string) => void;
}

function formatNumber(num: number): string {
    if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(0)}M`;
    return `$${num.toLocaleString()}`;
}

function LSTCard({ lst, isExpanded, onToggle }: { lst: LSTData; isExpanded: boolean; onToggle: () => void }) {
    const totalApy = lst.stakingApy + (lst.mevBoost || 0);

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden hover:border-cyan-500/30 transition-colors">
            {/* Header */}
            <div
                className="p-4 cursor-pointer"
                onClick={onToggle}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                            <Coins className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">{lst.name}</h3>
                            <p className="text-xs text-slate-500">{lst.token}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-lg font-bold text-green-400">{totalApy.toFixed(2)}%</p>
                            <p className="text-xs text-slate-500">APY</p>
                        </div>
                        {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                    </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                    <div className="text-center p-2 bg-slate-900/50 rounded">
                        <p className="text-xs text-slate-500">Market Cap</p>
                        <p className="text-sm text-white font-medium">{formatNumber(lst.marketCap)}</p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/50 rounded">
                        <p className="text-xs text-slate-500">Validators</p>
                        <p className="text-sm text-white font-medium">{lst.validatorCount}</p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/50 rounded">
                        <p className="text-xs text-slate-500">MEV</p>
                        <p className={`text-sm font-medium ${lst.mevEnabled ? "text-green-400" : "text-slate-500"}`}>
                            {lst.mevEnabled ? `+${lst.mevBoost}%` : "No"}
                        </p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/50 rounded">
                        <p className="text-xs text-slate-500">Peg</p>
                        <p className={`text-sm font-medium ${
                            lst.pegStability === "high" ? "text-green-400" :
                            lst.pegStability === "medium" ? "text-yellow-400" : "text-red-400"
                        }`}>
                            {lst.pegStability.charAt(0).toUpperCase() + lst.pegStability.slice(1)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Expanded details */}
            {isExpanded && (
                <div className="border-t border-slate-700/50 p-4 space-y-4">
                    {/* APY Breakdown */}
                    <div>
                        <h4 className="text-xs text-slate-400 uppercase mb-2">APY Breakdown</h4>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden flex">
                                <div
                                    className="bg-green-500 h-full"
                                    style={{ width: `${(lst.stakingApy / totalApy) * 100}%` }}
                                />
                                {lst.mevBoost && (
                                    <div
                                        className="bg-purple-500 h-full"
                                        style={{ width: `${(lst.mevBoost / totalApy) * 100}%` }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 mt-2 text-xs">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-slate-400">Staking: {lst.stakingApy}%</span>
                            </div>
                            {lst.mevBoost && (
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                                    <span className="text-slate-400">MEV: +{lst.mevBoost}%</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Decentralization */}
                    <div>
                        <h4 className="text-xs text-slate-400 uppercase mb-2">Decentralization</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-cyan-400" />
                                <div>
                                    <p className="text-sm text-white">{lst.validatorCount} validators</p>
                                    <p className="text-xs text-slate-500">Active set</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-cyan-400" />
                                <div>
                                    <p className="text-sm text-white">{lst.validatorConcentration}%</p>
                                    <p className="text-xs text-slate-500">Top 3 concentration</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 className="text-xs text-slate-400 uppercase mb-2">Features</h4>
                        <div className="flex flex-wrap gap-2">
                            {lst.features.map((feature, i) => (
                                <span
                                    key={i}
                                    className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50">
                        <span className="text-xs text-slate-500">Instant unstake:</span>
                        <span className={`text-xs ${lst.instantUnstake ? "text-green-400" : "text-red-400"}`}>
                            {lst.instantUnstake ? "Available" : "Not available"}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export function LSTComparison({ onLSTClick }: LSTComparisonProps) {
    const [expandedLST, setExpandedLST] = useState<string | null>(null);
    const lsts = getAllLSTs();

    // Sort by market cap
    const sortedLSTs = [...lsts].sort((a, b) => b.marketCap - a.marketCap);

    // Calculate best in each category
    const bestApy = sortedLSTs.reduce((best, lst) =>
        (lst.stakingApy + (lst.mevBoost || 0)) > (best.stakingApy + (best.mevBoost || 0)) ? lst : best
    );
    const bestDecentralization = sortedLSTs.reduce((best, lst) =>
        lst.validatorCount > best.validatorCount ? lst : best
    );
    const bestMev = sortedLSTs.filter(lst => lst.mevEnabled).reduce((best, lst) =>
        (lst.mevBoost || 0) > (best?.mevBoost || 0) ? lst : best
    , sortedLSTs.find(lst => lst.mevEnabled)!);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-cyan-400" />
                    <h2 className="text-lg font-semibold text-white">Solana Liquid Staking Comparison</h2>
                </div>
                <span className="text-sm text-slate-500">{lsts.length} LSTs</span>
            </div>

            {/* Quick comparison highlights */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-xs uppercase">Highest APY</span>
                    </div>
                    <p className="text-white font-semibold">{bestApy.name}</p>
                    <p className="text-sm text-green-400">{(bestApy.stakingApy + (bestApy.mevBoost || 0)).toFixed(2)}%</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-xs uppercase">Most Decentralized</span>
                    </div>
                    <p className="text-white font-semibold">{bestDecentralization.name}</p>
                    <p className="text-sm text-blue-400">{bestDecentralization.validatorCount} validators</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-purple-400 mb-1">
                        <Zap className="h-4 w-4" />
                        <span className="text-xs uppercase">Best MEV Yield</span>
                    </div>
                    <p className="text-white font-semibold">{bestMev?.name || "N/A"}</p>
                    <p className="text-sm text-purple-400">+{bestMev?.mevBoost || 0}% MEV</p>
                </div>
            </div>

            {/* LST Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedLSTs.map((lst) => (
                    <LSTCard
                        key={lst.slug}
                        lst={lst}
                        isExpanded={expandedLST === lst.slug}
                        onToggle={() => setExpandedLST(expandedLST === lst.slug ? null : lst.slug)}
                    />
                ))}
            </div>

            {/* Comparison notes */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">Understanding LST Yields</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                    <li>• <span className="text-green-400">Base staking APY</span> comes from Solana network inflation rewards</li>
                    <li>• <span className="text-purple-400">MEV boost</span> is additional yield from MEV extraction (Jito-enabled LSTs)</li>
                    <li>• Lower <span className="text-cyan-400">validator concentration</span> means better decentralization and reduced risk</li>
                    <li>• <span className="text-yellow-400">Instant unstake</span> availability via Sanctum or native protocol features</li>
                </ul>
            </div>
        </div>
    );
}
