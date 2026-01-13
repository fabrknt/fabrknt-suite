"use client";

import { TrendingUp, Shield, Droplet, Clock, Lightbulb, AlertTriangle } from "lucide-react";

interface PoolData {
    id: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    apyBase: number;
    apyReward: number;
    riskScore: number;
    riskLevel: string;
    stablecoin: boolean;
}

interface GuidedComparisonProps {
    pools: PoolData[];
}

interface Insight {
    icon: React.ElementType;
    iconColor: string;
    title: string;
    description: string;
    winner?: string;
    type: "advantage" | "tradeoff" | "warning" | "neutral";
}

function formatTvl(tvl: number): string {
    if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
    if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(0)}M`;
    return `$${(tvl / 1_000).toFixed(0)}K`;
}

function generateInsights(pools: PoolData[]): Insight[] {
    if (pools.length < 2) return [];

    const insights: Insight[] = [];
    const [poolA, poolB] = pools;

    // APY comparison
    const apyDiff = poolA.apy - poolB.apy;
    const apyDiffPercent = Math.abs(apyDiff);
    if (apyDiffPercent > 0.5) {
        const higher = apyDiff > 0 ? poolA : poolB;
        const lower = apyDiff > 0 ? poolB : poolA;

        // Check reward dependency
        const higherRewardRatio = higher.apy > 0 ? (higher.apyReward / higher.apy) * 100 : 0;
        const lowerRewardRatio = lower.apy > 0 ? (lower.apyReward / lower.apy) * 100 : 0;

        if (higherRewardRatio > lowerRewardRatio + 20) {
            insights.push({
                icon: TrendingUp,
                iconColor: "text-yellow-400",
                title: `${higher.project} pays +${apyDiffPercent.toFixed(1)}% more APY`,
                description: `But ${higherRewardRatio.toFixed(0)}% is from rewards vs ${lowerRewardRatio.toFixed(0)}% on ${lower.project}. ${lower.project}'s yield may be more sustainable.`,
                type: "tradeoff",
            });
        } else {
            insights.push({
                icon: TrendingUp,
                iconColor: "text-green-400",
                title: `${higher.project} has higher APY`,
                description: `+${apyDiffPercent.toFixed(1)}% more yield with similar reward dependency.`,
                winner: higher.project,
                type: "advantage",
            });
        }
    }

    // Risk comparison
    const riskDiff = poolA.riskScore - poolB.riskScore;
    if (Math.abs(riskDiff) >= 5) {
        const safer = riskDiff > 0 ? poolB : poolA;
        const riskier = riskDiff > 0 ? poolA : poolB;

        insights.push({
            icon: Shield,
            iconColor: "text-cyan-400",
            title: `${safer.project} is lower risk`,
            description: `Risk score ${safer.riskScore} vs ${riskier.riskScore}. ${Math.abs(riskDiff)} point difference.`,
            winner: safer.project,
            type: "advantage",
        });
    }

    // TVL/Liquidity comparison
    const tvlRatio = poolA.tvlUsd / poolB.tvlUsd;
    if (tvlRatio > 2 || tvlRatio < 0.5) {
        const deeper = tvlRatio > 1 ? poolA : poolB;
        const shallower = tvlRatio > 1 ? poolB : poolA;

        insights.push({
            icon: Droplet,
            iconColor: "text-blue-400",
            title: `${deeper.project} has deeper liquidity`,
            description: `${formatTvl(deeper.tvlUsd)} vs ${formatTvl(shallower.tvlUsd)}. Larger positions exit safer on ${deeper.project}.`,
            winner: deeper.project,
            type: "advantage",
        });
    }

    // Sustainability comparison (base APY ratio)
    const baseRatioA = poolA.apy > 0 ? (poolA.apyBase / poolA.apy) * 100 : 0;
    const baseRatioB = poolB.apy > 0 ? (poolB.apyBase / poolB.apy) * 100 : 0;
    if (Math.abs(baseRatioA - baseRatioB) > 25) {
        const sustainable = baseRatioA > baseRatioB ? poolA : poolB;
        const emissionHeavy = baseRatioA > baseRatioB ? poolB : poolA;
        const sustainableRatio = Math.max(baseRatioA, baseRatioB);
        const emissionRatio = Math.min(baseRatioA, baseRatioB);

        insights.push({
            icon: Clock,
            iconColor: "text-purple-400",
            title: `${sustainable.project} has more sustainable yield`,
            description: `${sustainableRatio.toFixed(0)}% from base APY vs ${emissionRatio.toFixed(0)}% on ${emissionHeavy.project}. Less dependent on token emissions.`,
            winner: sustainable.project,
            type: "advantage",
        });
    }

    // Similar risk but different APY (potential arbitrage)
    if (Math.abs(riskDiff) < 5 && apyDiffPercent > 1) {
        const better = apyDiff > 0 ? poolA : poolB;
        insights.push({
            icon: Lightbulb,
            iconColor: "text-yellow-400",
            title: "Similar risk, different rewards",
            description: `${better.project} offers +${apyDiffPercent.toFixed(1)}% APY at nearly the same risk level. Worth investigating why.`,
            type: "neutral",
        });
    }

    // Both high risk warning
    if (poolA.riskScore > 50 && poolB.riskScore > 50) {
        insights.push({
            icon: AlertTriangle,
            iconColor: "text-orange-400",
            title: "Both pools are higher risk",
            description: "Consider if your risk tolerance allows for either option. Look at lower-risk alternatives too.",
            type: "warning",
        });
    }

    return insights;
}

export function GuidedComparison({ pools }: GuidedComparisonProps) {
    if (pools.length < 2) {
        return (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-sm text-slate-400 text-center">
                    Select at least 2 pools to see guided comparison insights.
                </p>
            </div>
        );
    }

    const insights = generateInsights(pools);

    // Calculate overall recommendation
    const winCounts: Record<string, number> = {};
    insights.forEach(i => {
        if (i.winner) {
            winCounts[i.winner] = (winCounts[i.winner] || 0) + 1;
        }
    });
    const topWinner = Object.entries(winCounts).sort((a, b) => b[1] - a[1])[0];

    return (
        <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50">
                <h4 className="text-sm font-medium text-white">
                    Comparing: {pools.map(p => p.project).join(" vs ")}
                </h4>
                <p className="text-xs text-slate-400 mt-1">Key differences that matter for your decision</p>
            </div>

            <div className="p-4 space-y-3">
                {insights.length === 0 ? (
                    <p className="text-sm text-slate-400">These pools are very similar. Choose based on protocol preference.</p>
                ) : (
                    insights.map((insight, index) => (
                        <div
                            key={index}
                            className={`rounded-lg p-3 ${
                                insight.type === "advantage" ? "bg-green-500/10 border border-green-500/20" :
                                insight.type === "tradeoff" ? "bg-yellow-500/10 border border-yellow-500/20" :
                                insight.type === "warning" ? "bg-orange-500/10 border border-orange-500/20" :
                                "bg-slate-900/50 border border-slate-700/50"
                            }`}
                        >
                            <div className="flex items-start gap-2">
                                <insight.icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${insight.iconColor}`} />
                                <div>
                                    <p className={`text-sm font-medium ${
                                        insight.type === "advantage" ? "text-green-300" :
                                        insight.type === "tradeoff" ? "text-yellow-300" :
                                        insight.type === "warning" ? "text-orange-300" :
                                        "text-slate-300"
                                    }`}>
                                        {insight.title}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-0.5">{insight.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Bottom insight */}
            {topWinner && (
                <div className="p-4 border-t border-slate-700/50 bg-cyan-500/5">
                    <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-cyan-300">
                                <span className="font-medium">Overall: </span>
                                {topWinner[0]} has advantages in {topWinner[1]} of {insights.filter(i => i.winner).length} categories.
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                But consider your priorities. Higher APY? Lower risk? Sustainability?
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
