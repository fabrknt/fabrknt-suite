"use client";

import { Shield, TrendingUp, Layers } from "lucide-react";

interface SolanaProtocolCardProps {
    slug: string;
    name: string;
    category: string;
    categoryLabel: string;
    poolCount: number;
    totalTvl: number;
    avgApy: number;
    avgRiskScore: number;
    maxApy: number;
    trustScore: number;
    trustLevel: "high" | "medium" | "low";
    topPool: {
        symbol: string;
        tvl: number;
        apy: number;
    } | null;
    isHighlighted?: {
        type: "tvl" | "apy" | "risk" | "risk-adjusted";
        label: string;
    };
    onClick?: () => void;
}

function formatTvl(tvl: number): string {
    if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
    if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
    return `$${(tvl / 1_000).toFixed(0)}K`;
}

const TRUST_COLORS = {
    high: "text-green-400 bg-green-500/10 border-green-500/30",
    medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    low: "text-red-400 bg-red-500/10 border-red-500/30",
};

const HIGHLIGHT_COLORS = {
    tvl: "border-cyan-500/50 shadow-cyan-500/20",
    apy: "border-green-500/50 shadow-green-500/20",
    risk: "border-blue-500/50 shadow-blue-500/20",
    "risk-adjusted": "border-purple-500/50 shadow-purple-500/20",
};

const HIGHLIGHT_BADGES = {
    tvl: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    apy: "bg-green-500/20 text-green-400 border-green-500/30",
    risk: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "risk-adjusted": "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export function SolanaProtocolCard({
    name,
    categoryLabel,
    poolCount,
    totalTvl,
    avgApy,
    avgRiskScore,
    maxApy,
    trustScore,
    trustLevel,
    topPool,
    isHighlighted,
    onClick,
}: SolanaProtocolCardProps) {
    return (
        <div
            onClick={onClick}
            className={`relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg hover:border-slate-600 ${
                isHighlighted ? `shadow-lg ${HIGHLIGHT_COLORS[isHighlighted.type]}` : ""
            }`}
        >
            {/* Highlight badge */}
            {isHighlighted && (
                <div
                    className={`absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${
                        HIGHLIGHT_BADGES[isHighlighted.type]
                    }`}
                >
                    {isHighlighted.label}
                </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-white font-semibold text-lg">{name}</h3>
                    <span className="text-xs text-slate-500">{categoryLabel}</span>
                </div>
                <div
                    className={`px-2 py-1 rounded-md text-xs font-medium border ${TRUST_COLORS[trustLevel]}`}
                >
                    {trustLevel.toUpperCase()}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                    <p className="text-[10px] text-slate-500 uppercase flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        Total TVL
                    </p>
                    <p className="text-lg text-white font-semibold">{formatTvl(totalTvl)}</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Avg APY
                    </p>
                    <p className={`text-lg font-semibold ${avgApy >= 5 ? "text-green-400" : "text-white"}`}>
                        {avgApy.toFixed(2)}%
                    </p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Avg Risk
                    </p>
                    <div className="flex items-center gap-2">
                        <span
                            className={`text-lg font-semibold ${
                                avgRiskScore <= 25
                                    ? "text-green-400"
                                    : avgRiskScore <= 40
                                    ? "text-yellow-400"
                                    : "text-orange-400"
                            }`}
                        >
                            {avgRiskScore}
                        </span>
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${
                                    avgRiskScore <= 25
                                        ? "bg-green-500"
                                        : avgRiskScore <= 40
                                        ? "bg-yellow-500"
                                        : "bg-orange-500"
                                }`}
                                style={{ width: `${avgRiskScore}%` }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase">Pools</p>
                    <p className="text-lg text-white font-semibold">{poolCount}</p>
                </div>
            </div>

            {/* Top Pool */}
            {topPool && (
                <div className="pt-3 border-t border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase mb-1">Top Pool</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300 truncate max-w-[60%]">
                            {topPool.symbol}
                        </span>
                        <span className="text-sm text-green-400 font-medium">
                            {topPool.apy.toFixed(2)}% APY
                        </span>
                    </div>
                </div>
            )}

            {/* Max APY indicator */}
            <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">Max APY available</span>
                <span className="text-green-400 font-medium">{maxApy.toFixed(2)}%</span>
            </div>

            {/* Trust score bar */}
            <div className="mt-3 pt-3 border-t border-slate-700/50">
                <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500">Trust Score</span>
                    <span className={TRUST_COLORS[trustLevel].split(" ")[0]}>{trustScore}/100</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${
                            trustLevel === "high"
                                ? "bg-green-500"
                                : trustLevel === "medium"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                        style={{ width: `${trustScore}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
