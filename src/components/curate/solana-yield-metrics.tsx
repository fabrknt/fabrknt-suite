"use client";

import {
    PieChart,
    TrendingUp,
    TrendingDown,
    Minus,
    AlertTriangle,
    Sparkles,
    Activity,
    Target,
} from "lucide-react";

// ============================================
// Yield Source Breakdown Component
// ============================================

interface YieldBreakdown {
    base: number;
    reward: number;
    hasPoints: boolean;
    pointsProgram: string | null;
    sources: string[];
}

interface YieldBreakdownDisplayProps {
    breakdown: YieldBreakdown;
    totalApy: number;
}

export function YieldBreakdownDisplay({ breakdown, totalApy }: YieldBreakdownDisplayProps) {
    const basePercent = totalApy > 0 ? (breakdown.base / totalApy) * 100 : 0;
    const rewardPercent = totalApy > 0 ? (breakdown.reward / totalApy) * 100 : 0;

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <PieChart className="h-3 w-3" />
                <span>Yield Sources</span>
            </div>

            {/* Stacked bar */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden flex">
                {breakdown.base > 0 && (
                    <div
                        className="bg-green-500 h-full"
                        style={{ width: `${basePercent}%` }}
                        title={`Base: ${breakdown.base.toFixed(2)}%`}
                    />
                )}
                {breakdown.reward > 0 && (
                    <div
                        className="bg-purple-500 h-full"
                        style={{ width: `${rewardPercent}%` }}
                        title={`Reward: ${breakdown.reward.toFixed(2)}%`}
                    />
                )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-slate-400">Base</span>
                    <span className="text-white font-medium">{breakdown.base.toFixed(2)}%</span>
                </div>
                {breakdown.reward > 0 && (
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-slate-400">Reward</span>
                        <span className="text-white font-medium">{breakdown.reward.toFixed(2)}%</span>
                    </div>
                )}
                {breakdown.hasPoints && (
                    <div className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-yellow-400" />
                        <span className="text-yellow-400">{breakdown.pointsProgram || "Points"}</span>
                    </div>
                )}
            </div>

            {/* Sustainability note */}
            {breakdown.reward > breakdown.base && (
                <div className="flex items-start gap-1.5 text-xs text-yellow-400/80 mt-1">
                    <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>High reward dependency - yield may decrease when rewards end</span>
                </div>
            )}
        </div>
    );
}

// ============================================
// TVL Trend Indicator Component
// ============================================

interface TvlTrend {
    change7d: number | null;
    change30d: number | null;
    trend: "growing" | "stable" | "declining" | "unknown";
    isHealthy: boolean;
}

interface TvlTrendIndicatorProps {
    trend: TvlTrend;
    compact?: boolean;
}

export function TvlTrendIndicator({ trend, compact = false }: TvlTrendIndicatorProps) {
    const trendConfig = {
        growing: {
            icon: TrendingUp,
            color: "text-green-400",
            bg: "bg-green-400/10",
            label: "Growing",
        },
        stable: {
            icon: Minus,
            color: "text-slate-400",
            bg: "bg-slate-400/10",
            label: "Stable",
        },
        declining: {
            icon: TrendingDown,
            color: "text-red-400",
            bg: "bg-red-400/10",
            label: "Declining",
        },
        unknown: {
            icon: Minus,
            color: "text-slate-500",
            bg: "bg-slate-500/10",
            label: "Unknown",
        },
    };

    const config = trendConfig[trend.trend];
    const Icon = config.icon;

    if (compact) {
        return (
            <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${config.bg}`}>
                <Icon className={`h-3 w-3 ${config.color}`} />
                {trend.change30d !== null && (
                    <span className={`text-xs ${config.color}`}>
                        {trend.change30d > 0 ? "+" : ""}{trend.change30d.toFixed(1)}%
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <Activity className="h-3 w-3" />
                <span>APY Trend</span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${config.bg}`}>
                    <Icon className={`h-3 w-3 ${config.color}`} />
                    <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                </div>
                {trend.change7d !== null && (
                    <span className="text-xs text-slate-500">
                        7d: {trend.change7d > 0 ? "+" : ""}{trend.change7d.toFixed(1)}%
                    </span>
                )}
                {trend.change30d !== null && (
                    <span className="text-xs text-slate-500">
                        30d: {trend.change30d > 0 ? "+" : ""}{trend.change30d.toFixed(1)}%
                    </span>
                )}
            </div>
            {!trend.isHealthy && (
                <div className="flex items-center gap-1 text-xs text-red-400">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Significant APY decline</span>
                </div>
            )}
        </div>
    );
}

// ============================================
// IL Risk Indicator Component
// ============================================

interface ILRiskInfo {
    hasILRisk: boolean;
    level: "none" | "low" | "medium" | "high" | "very_high";
    isConcentratedLiquidity: boolean;
    poolType: string | null;
}

interface ILRiskIndicatorProps {
    ilRisk: ILRiskInfo;
    compact?: boolean;
}

const IL_RISK_CONFIG = {
    none: { color: "text-green-400", bg: "bg-green-400/10", label: "None" },
    low: { color: "text-green-400", bg: "bg-green-400/10", label: "Low" },
    medium: { color: "text-yellow-400", bg: "bg-yellow-400/10", label: "Medium" },
    high: { color: "text-orange-400", bg: "bg-orange-400/10", label: "High" },
    very_high: { color: "text-red-400", bg: "bg-red-400/10", label: "Very High" },
};

export function ILRiskIndicator({ ilRisk, compact = false }: ILRiskIndicatorProps) {
    const config = IL_RISK_CONFIG[ilRisk.level];

    if (!ilRisk.hasILRisk) {
        if (compact) {
            return (
                <span className="text-xs text-green-400">No IL</span>
            );
        }
        return null;
    }

    if (compact) {
        return (
            <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${config.bg}`}>
                <AlertTriangle className={`h-3 w-3 ${config.color}`} />
                <span className={`text-xs ${config.color}`}>IL: {config.label}</span>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <AlertTriangle className="h-3 w-3" />
                <span>Impermanent Loss Risk</span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${config.bg}`}>
                    <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                </div>
                {ilRisk.isConcentratedLiquidity && (
                    <span className="text-xs px-1.5 py-0.5 bg-purple-500/10 text-purple-400 rounded">
                        {ilRisk.poolType?.toUpperCase() || "CLMM"}
                    </span>
                )}
            </div>
            {ilRisk.isConcentratedLiquidity && (
                <p className="text-xs text-slate-500">
                    Concentrated liquidity pools have higher IL risk but can earn more fees
                </p>
            )}
        </div>
    );
}

// ============================================
// Volatility Metrics Component
// ============================================

interface VolatilityMetrics {
    sigma: number;
    sharpeRatio: number;
    volatilityLevel: "low" | "medium" | "high" | "very_high";
}

interface VolatilityMetricsDisplayProps {
    metrics: VolatilityMetrics;
    compact?: boolean;
}

const VOLATILITY_CONFIG = {
    low: { color: "text-green-400", label: "Low" },
    medium: { color: "text-yellow-400", label: "Medium" },
    high: { color: "text-orange-400", label: "High" },
    very_high: { color: "text-red-400", label: "Very High" },
};

export function VolatilityMetricsDisplay({ metrics, compact = false }: VolatilityMetricsDisplayProps) {
    const config = VOLATILITY_CONFIG[metrics.volatilityLevel];

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <span className={`text-xs ${config.color}`}>
                    Vol: {config.label}
                </span>
                <span className="text-xs text-slate-500">
                    Sharpe: {metrics.sharpeRatio.toFixed(2)}
                </span>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <Target className="h-3 w-3" />
                <span>Risk Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <p className="text-xs text-slate-500">Volatility</p>
                    <p className={`text-sm font-medium ${config.color}`}>
                        {config.label} ({metrics.sigma.toFixed(2)})
                    </p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Sharpe Ratio</p>
                    <p className={`text-sm font-medium ${
                        metrics.sharpeRatio >= 1 ? "text-green-400" :
                        metrics.sharpeRatio >= 0.5 ? "text-yellow-400" :
                        metrics.sharpeRatio >= 0 ? "text-slate-300" : "text-red-400"
                    }`}>
                        {metrics.sharpeRatio.toFixed(2)}
                    </p>
                </div>
            </div>
            <p className="text-xs text-slate-500">
                {metrics.sharpeRatio >= 1
                    ? "Good risk-adjusted returns"
                    : metrics.sharpeRatio >= 0.5
                    ? "Moderate risk-adjusted returns"
                    : metrics.sharpeRatio >= 0
                    ? "Low risk-adjusted returns"
                    : "Negative risk-adjusted returns"}
            </p>
        </div>
    );
}

// ============================================
// Combined Solana Metrics Panel
// ============================================

interface SolanaMetricsPanelProps {
    yieldBreakdown?: {
        base: number;
        reward: number;
        hasPoints: boolean;
        pointsProgram: string | null;
        sources: string[];
    };
    tvlTrend?: {
        change7d: number | null;
        change30d: number | null;
        trend: "growing" | "stable" | "declining" | "unknown";
        isHealthy: boolean;
    };
    volatilityMetrics?: {
        sigma: number;
        sharpeRatio: number;
        volatilityLevel: "low" | "medium" | "high" | "very_high";
    } | null;
    ilRiskInfo?: {
        hasILRisk: boolean;
        level: "none" | "low" | "medium" | "high" | "very_high";
        isConcentratedLiquidity: boolean;
        poolType: string | null;
    };
    totalApy: number;
}

export function SolanaMetricsPanel({
    yieldBreakdown,
    tvlTrend,
    volatilityMetrics,
    ilRiskInfo,
    totalApy,
}: SolanaMetricsPanelProps) {
    const hasMetrics = yieldBreakdown || tvlTrend || volatilityMetrics || ilRiskInfo;

    if (!hasMetrics) {
        return null;
    }

    return (
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-400" />
                Solana Yield Metrics
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Yield Breakdown */}
                {yieldBreakdown && (
                    <div className="bg-slate-900/50 rounded-lg p-3">
                        <YieldBreakdownDisplay breakdown={yieldBreakdown} totalApy={totalApy} />
                    </div>
                )}

                {/* TVL Trend */}
                {tvlTrend && (
                    <div className="bg-slate-900/50 rounded-lg p-3">
                        <TvlTrendIndicator trend={tvlTrend} />
                    </div>
                )}

                {/* Volatility Metrics */}
                {volatilityMetrics && (
                    <div className="bg-slate-900/50 rounded-lg p-3">
                        <VolatilityMetricsDisplay metrics={volatilityMetrics} />
                    </div>
                )}

                {/* IL Risk */}
                {ilRiskInfo && ilRiskInfo.hasILRisk && (
                    <div className="bg-slate-900/50 rounded-lg p-3">
                        <ILRiskIndicator ilRisk={ilRiskInfo} />
                    </div>
                )}
            </div>
        </div>
    );
}
