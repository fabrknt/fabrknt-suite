"use client";

import { useState, useEffect } from "react";
import { Sparkles, RefreshCw, TrendingUp, TrendingDown, Minus, Target, AlertCircle, X, Shield, Zap } from "lucide-react";

interface PoolRecommendation {
    poolId: string;
    rank: number;
    matchScore: number;
    reasoning: string;
    highlights: string[];
    pool: {
        id: string;
        chain: string;
        project: string;
        symbol: string;
        tvlUsd: number;
        apy: number;
        riskScore: number;
        riskLevel: string;
        stablecoin: boolean;
        apyStability?: {
            trend: "up" | "down" | "stable";
        } | null;
    };
}

interface CuratedPool {
    id: string;
    chain: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    riskScore: number;
    riskLevel: "low" | "medium" | "high" | "very_high";
    stablecoin: boolean;
    apyStability?: {
        trend: "up" | "down" | "stable";
    } | null;
}

interface CuratedPicks {
    bestRiskAdjusted: CuratedPool | null;
    topStable: CuratedPool | null;
    highestApy: CuratedPool | null;
}

interface AIRecommendationsSectionProps {
    hasPreferences: boolean;
    onSetPreferences: () => void;
    onPoolClick: (poolId: string) => void;
    isLoggedIn?: boolean;
    curatedPicks?: CuratedPicks;
}

function formatTvl(tvl: number): string {
    if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(1)}B`;
    if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
    return `$${(tvl / 1_000).toFixed(0)}K`;
}

const RISK_COLORS: Record<string, string> = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-orange-400",
    very_high: "text-red-400",
};

const PICK_STYLES = {
    bestRiskAdjusted: {
        label: "Best Risk-Adjusted",
        icon: Target,
        colors: "hover:border-green-500/50 hover:shadow-green-500/10",
        badge: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    topStable: {
        label: "Top Stablecoin",
        icon: Shield,
        colors: "hover:border-blue-500/50 hover:shadow-blue-500/10",
        badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    highestApy: {
        label: "Sustainable Yield",
        icon: Zap,
        colors: "hover:border-yellow-500/50 hover:shadow-yellow-500/10",
        badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
};

export function AIRecommendationsSection({
    hasPreferences,
    onSetPreferences,
    onPoolClick,
    isLoggedIn = true,
    curatedPicks,
}: AIRecommendationsSectionProps) {
    const [recommendations, setRecommendations] = useState<PoolRecommendation[]>([]);
    const [summary, setSummary] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/curate/ai/recommendations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}), // Will use saved preferences or defaults
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to get recommendations");
            }

            const data = await response.json();
            setRecommendations(data.recommendations || []);
            setSummary(data.preferenceSummary || "");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to get recommendations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasPreferences && isLoggedIn) {
            fetchRecommendations();
        }
    }, [hasPreferences, isLoggedIn]);

    // Show curated picks when no personalized preferences
    if (!hasPreferences) {
        const picks = curatedPicks ? [
            { key: "bestRiskAdjusted" as const, pool: curatedPicks.bestRiskAdjusted },
            { key: "topStable" as const, pool: curatedPicks.topStable },
            { key: "highestApy" as const, pool: curatedPicks.highestApy },
        ].filter(p => p.pool !== null) : [];

        return (
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-400" />
                        <h2 className="text-sm font-semibold text-white">Smart Picks</h2>
                        <span className="text-xs text-slate-500">— Algorithmically selected</span>
                    </div>
                    <button
                        onClick={onSetPreferences}
                        className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        Personalize →
                    </button>
                </div>

                {picks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {picks.map(({ key, pool }) => {
                            if (!pool) return null;
                            const style = PICK_STYLES[key];
                            const Icon = style.icon;
                            return (
                                <div
                                    key={pool.id}
                                    onClick={() => onPoolClick(pool.id)}
                                    className={`group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg ${style.colors}`}
                                >
                                    {/* Label badge */}
                                    <div className={`absolute -top-2 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${style.badge}`}>
                                        <Icon className="inline h-3 w-3 mr-1" />
                                        {style.label}
                                    </div>

                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h4 className="text-white font-semibold">{pool.project}</h4>
                                                <p className="text-xs text-slate-500">{pool.symbol}</p>
                                            </div>
                                            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{pool.chain}</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase">TVL</p>
                                                <p className="text-sm text-white font-medium">{formatTvl(pool.tvlUsd)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase">APY</p>
                                                <p className={`text-sm font-semibold ${pool.apy >= 5 ? "text-green-400" : "text-white"}`}>
                                                    {pool.apy >= 100 ? `${pool.apy.toFixed(0)}%` : `${pool.apy.toFixed(2)}%`}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase">Risk</p>
                                                <div className="flex items-center gap-1">
                                                    <span className={`text-sm font-semibold ${RISK_COLORS[pool.riskLevel]}`}>
                                                        {pool.riskScore}
                                                    </span>
                                                    <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${pool.riskScore <= 20 ? "bg-green-500" : pool.riskScore <= 40 ? "bg-yellow-500" : "bg-red-500"}`}
                                                            style={{ width: `${pool.riskScore}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {pool.apyStability && (
                                            <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs">
                                                <span className="text-slate-500">30d Trend</span>
                                                <span className={`flex items-center gap-1 ${
                                                    pool.apyStability.trend === "up" ? "text-green-400" :
                                                    pool.apyStability.trend === "down" ? "text-red-400" : "text-slate-400"
                                                }`}>
                                                    {pool.apyStability.trend === "up" && <TrendingUp className="h-3 w-3" />}
                                                    {pool.apyStability.trend === "down" && <TrendingDown className="h-3 w-3" />}
                                                    {pool.apyStability.trend === "stable" && <Minus className="h-3 w-3" />}
                                                    {pool.apyStability.trend === "up" ? "Rising" :
                                                     pool.apyStability.trend === "down" ? "Falling" : "Stable"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 text-center">
                        <p className="text-slate-400 text-sm">Loading picks...</p>
                    </div>
                )}
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Smart Picks</h2>
                    <span className="text-xs text-slate-500">— Personalized</span>
                </div>
                <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3 text-slate-400">
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        <span>Analyzing pools for you...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Smart Picks</h2>
                </div>
                <div className="flex items-center gap-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <div>
                        <p className="text-sm">{error}</p>
                        <button
                            onClick={fetchRecommendations}
                            className="text-sm underline hover:no-underline mt-1"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <h2 className="text-sm font-semibold text-white">Smart Picks</h2>
                    <span className="text-xs text-slate-500">— Personalized{summary ? `: ${summary}` : ""}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onSetPreferences}
                        className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                        Edit Preferences
                    </button>
                    <button
                        onClick={fetchRecommendations}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        title="Refresh recommendations"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => {
                            setRecommendations([]);
                            setSummary("");
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                        title="Clear recommendations"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {recommendations.length === 0 ? (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 text-center">
                    <p className="text-slate-400 text-sm">
                        No recommendations loaded.{" "}
                        <button
                            onClick={fetchRecommendations}
                            className="text-cyan-400 hover:text-cyan-300 underline"
                        >
                            Generate recommendations
                        </button>
                    </p>
                </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {recommendations.slice(0, 5).map((rec) => (
                    <div
                        key={rec.pool.id}
                        onClick={() => onPoolClick(rec.pool.id)}
                        className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl p-4 cursor-pointer hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                        {/* Rank badge */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-cyan-500 text-slate-900 text-xs font-bold flex items-center justify-center">
                            {rec.rank}
                        </div>

                        {/* Match score */}
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                            <Target className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-green-400 font-medium">{rec.matchScore}%</span>
                        </div>

                        <div className="mt-1">
                            <h4 className="text-white font-semibold text-sm">{rec.pool.project}</h4>
                            <p className="text-xs text-slate-500">{rec.pool.symbol}</p>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <p className="text-slate-500">APY</p>
                                <p className="text-green-400 font-medium flex items-center gap-1">
                                    {rec.pool.apy.toFixed(1)}%
                                    {rec.pool.apyStability?.trend && (
                                        <span className={
                                            rec.pool.apyStability.trend === "up" ? "text-green-400" :
                                            rec.pool.apyStability.trend === "down" ? "text-red-400" : "text-slate-500"
                                        }>
                                            {rec.pool.apyStability.trend === "up" && <TrendingUp className="h-3 w-3" />}
                                            {rec.pool.apyStability.trend === "down" && <TrendingDown className="h-3 w-3" />}
                                            {rec.pool.apyStability.trend === "stable" && <Minus className="h-3 w-3" />}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-500">Risk</p>
                                <p className={`font-medium ${RISK_COLORS[rec.pool.riskLevel] || "text-slate-400"}`}>
                                    {rec.pool.riskScore}
                                </p>
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-slate-400 line-clamp-2">{rec.reasoning}</p>

                        <div className="mt-2 flex flex-wrap gap-1">
                            {rec.highlights.slice(0, 2).map((h, i) => (
                                <span key={i} className="text-[10px] px-1.5 py-0.5 bg-slate-700/50 text-slate-300 rounded">
                                    {h}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}
