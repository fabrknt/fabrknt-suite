"use client";

import { Shield, TrendingUp, ChevronRight } from "lucide-react";
import { CuratorProfile } from "@/lib/curate/curators";

interface StrategyMetrics {
    avgApy: number;
    riskScore: number;
    riskTolerance: "conservative" | "moderate" | "aggressive";
    topAssets: string[];
}

interface CuratorCardProps {
    curator: CuratorProfile;
    strategyMetrics?: StrategyMetrics;
    onViewStrategy?: () => void;
}

function formatAum(aum: number): string {
    if (aum >= 1_000_000_000) return `$${(aum / 1_000_000_000).toFixed(1)}B`;
    if (aum >= 1_000_000) return `$${(aum / 1_000_000).toFixed(0)}M`;
    return `$${(aum / 1_000).toFixed(0)}K`;
}

const RISK_COLORS = {
    conservative: "text-green-400 bg-green-500/10 border-green-500/30",
    moderate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    aggressive: "text-orange-400 bg-orange-500/10 border-orange-500/30",
};

const RISK_LABELS = {
    conservative: "Low Risk",
    moderate: "Medium Risk",
    aggressive: "Higher Risk",
};

export function CuratorCard({ curator, strategyMetrics, onViewStrategy }: CuratorCardProps) {
    return (
        <div
            className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all cursor-pointer group"
            onClick={onViewStrategy}
        >
            {/* Header with name and key metrics */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {curator.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500">Trust</span>
                            <div className="flex items-center gap-1">
                                <Shield className="h-3 w-3 text-green-400" />
                                <span className="text-xs font-medium text-green-400">{curator.trustScore}</span>
                            </div>
                        </div>
                    </div>
                    {strategyMetrics && (
                        <div className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${RISK_COLORS[strategyMetrics.riskTolerance]}`}>
                            {RISK_LABELS[strategyMetrics.riskTolerance]}
                        </div>
                    )}
                </div>

                {/* APY and Key Stats */}
                {strategyMetrics && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                            <div className="text-xs text-slate-500 mb-1">Avg APY</div>
                            <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-green-400" />
                                <span className="text-xl font-bold text-green-400">
                                    {strategyMetrics.avgApy.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                            <div className="text-xs text-slate-500 mb-1">AUM</div>
                            <div className="text-xl font-bold text-white">{formatAum(curator.aum)}+</div>
                        </div>
                    </div>
                )}

                {/* Description */}
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {curator.description}
                </p>

                {/* Focus Assets */}
                {strategyMetrics && strategyMetrics.topAssets.length > 0 && (
                    <div className="mb-4">
                        <div className="text-xs text-slate-500 mb-2">Focus Assets</div>
                        <div className="flex flex-wrap gap-1.5">
                            {strategyMetrics.topAssets.map((asset) => (
                                <span
                                    key={asset}
                                    className="px-2 py-0.5 text-xs rounded-full bg-slate-700/50 text-slate-300"
                                >
                                    {asset}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Platforms */}
                <div className="flex flex-wrap gap-1.5">
                    {curator.platforms.slice(0, 3).map((platform) => (
                        <span
                            key={platform.protocol}
                            className="px-2 py-0.5 text-xs rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                            {platform.protocol}
                        </span>
                    ))}
                    {curator.platforms.length > 3 && (
                        <span className="px-2 py-0.5 text-xs text-slate-500">
                            +{curator.platforms.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-slate-900/30 border-t border-slate-700/50 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                    {curator.trackRecord.split(",")[0]}
                </span>
                <span className="flex items-center gap-1 text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    View Strategy
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
            </div>
        </div>
    );
}
