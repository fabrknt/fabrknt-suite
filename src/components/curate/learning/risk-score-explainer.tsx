"use client";

import { useState } from "react";
import { Shield, ChevronDown, ChevronUp, Lightbulb, AlertTriangle, TrendingUp, Droplet, Layers } from "lucide-react";

interface RiskBreakdown {
    tvlScore: number;
    apyScore: number;
    stableScore: number;
    ilScore: number;
    protocolScore: number;
}

interface RiskScoreExplainerProps {
    riskScore: number;
    riskLevel: "low" | "medium" | "high" | "very_high";
    breakdown: RiskBreakdown;
    tvlUsd: number;
    apy: number;
    apyBase: number;
    apyReward: number;
    stablecoin: boolean;
    ilRisk: string;
    project: string;
    underlyingAssets: string[];
}

const RISK_EXPLANATIONS = {
    tvl: {
        icon: Droplet,
        label: "TVL Risk",
        maxScore: 30,
        getExplanation: (score: number, tvl: number) => {
            if (score <= 5) return `$${(tvl / 1e9).toFixed(2)}B TVL. Extremely deep liquidity for safe exits.`;
            if (score <= 10) return `$${(tvl / 1e6).toFixed(0)}M TVL. Large pool with good liquidity.`;
            if (score <= 20) return `$${(tvl / 1e6).toFixed(0)}M TVL. Adequate for most positions.`;
            return `$${(tvl / 1e6).toFixed(1)}M TVL. Lower liquidity may cause slippage on large exits.`;
        },
    },
    apy: {
        icon: TrendingUp,
        label: "APY Sustainability",
        maxScore: 25,
        getExplanation: (score: number, apy: number, rewardRatio: number) => {
            if (score <= 5) return `${apy.toFixed(1)}% APY is conservative and likely sustainable.`;
            if (score <= 10) return `${apy.toFixed(1)}% APY with moderate reward dependency.`;
            if (score <= 15) return `${rewardRatio.toFixed(0)}% from rewards. May decrease over time.`;
            return `High APY (${apy.toFixed(0)}%) with ${rewardRatio.toFixed(0)}% reward dependency. Emissions may not last.`;
        },
    },
    stable: {
        icon: Shield,
        label: "Asset Volatility",
        maxScore: 20,
        getExplanation: (score: number, stablecoin: boolean, assets: string[]) => {
            if (score === 0) return `Stablecoin pool. No price volatility risk.`;
            if (score <= 5) return `Blue-chip assets (${assets.join(", ")}). Lower volatility.`;
            if (score <= 10) return `Mixed assets with some volatility exposure.`;
            return `Volatile assets. Price swings can affect position value.`;
        },
    },
    il: {
        icon: Layers,
        label: "Impermanent Loss",
        maxScore: 15,
        getExplanation: (score: number, ilRisk: string, assets: string[]) => {
            if (score === 0) return `No IL risk. Single-asset or stablecoin pair.`;
            if (score <= 5) return `Low IL risk. Correlated assets.`;
            if (score <= 10) return `Moderate IL risk. Consider holding period vs fees.`;
            return `High IL risk. Uncorrelated assets (${assets.join("-")}). Use IL simulator.`;
        },
    },
    protocol: {
        icon: Shield,
        label: "Protocol Trust",
        maxScore: 10,
        getExplanation: (score: number, project: string) => {
            if (score === 0) return `${project} is a blue-chip protocol. Audited, battle-tested.`;
            if (score <= 3) return `${project} has high TVL and track record.`;
            if (score <= 5) return `${project} is established but verify audits.`;
            return `${project} is newer. Research security before large deposits.`;
        },
    },
};

export function RiskScoreExplainer({
    riskScore,
    riskLevel,
    breakdown,
    tvlUsd,
    apy,
    apyBase,
    apyReward,
    stablecoin,
    ilRisk,
    project,
    underlyingAssets,
}: RiskScoreExplainerProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const rewardRatio = apy > 0 ? (apyReward / apy) * 100 : 0;

    // Find the biggest risk factor
    const factors = [
        { key: "tvl", score: breakdown.tvlScore, max: 30 },
        { key: "apy", score: breakdown.apyScore, max: 25 },
        { key: "stable", score: breakdown.stableScore, max: 20 },
        { key: "il", score: breakdown.ilScore, max: 15 },
        { key: "protocol", score: breakdown.protocolScore, max: 10 },
    ];
    const biggestRisk = factors.reduce((max, f) =>
        (f.score / f.max) > (max.score / max.max) ? f : max
    );

    const getRiskColor = (level: string) => {
        switch (level) {
            case "low": return "text-green-400 bg-green-500/10 border-green-500/30";
            case "medium": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
            case "high": return "text-orange-400 bg-orange-500/10 border-orange-500/30";
            default: return "text-red-400 bg-red-500/10 border-red-500/30";
        }
    };

    const getScoreBarColor = (score: number, max: number) => {
        const ratio = score / max;
        if (ratio <= 0.3) return "bg-green-500";
        if (ratio <= 0.6) return "bg-yellow-500";
        return "bg-orange-500";
    };

    return (
        <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
            {/* Header - always visible */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getRiskColor(riskLevel)}`}>
                        <span className="text-lg font-bold">{riskScore}</span>
                    </div>
                    <div className="text-left">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-medium">Risk Score</span>
                            <span className={`text-xs px-2 py-0.5 rounded capitalize ${getRiskColor(riskLevel)}`}>
                                {riskLevel.replace("_", " ")}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400">Click to understand why</p>
                    </div>
                </div>
                {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
            </button>

            {/* Expanded content */}
            {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-700/50 pt-4">
                    <p className="text-sm text-slate-300 mb-4">
                        What makes this pool <span className={`font-medium ${getRiskColor(riskLevel).split(" ")[0]}`}>{riskLevel} risk</span>:
                    </p>

                    {/* Risk factors */}
                    <div className="space-y-3 mb-4">
                        {/* TVL */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <RISK_EXPLANATIONS.tvl.icon className="h-4 w-4 text-cyan-400" />
                                    <span className="text-xs text-slate-400">{RISK_EXPLANATIONS.tvl.label}</span>
                                </div>
                                <span className="text-xs text-slate-300">{breakdown.tvlScore}/{RISK_EXPLANATIONS.tvl.maxScore}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getScoreBarColor(breakdown.tvlScore, RISK_EXPLANATIONS.tvl.maxScore)}`}
                                        style={{ width: `${(breakdown.tvlScore / RISK_EXPLANATIONS.tvl.maxScore) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                {RISK_EXPLANATIONS.tvl.getExplanation(breakdown.tvlScore, tvlUsd)}
                            </p>
                        </div>

                        {/* APY */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <RISK_EXPLANATIONS.apy.icon className="h-4 w-4 text-cyan-400" />
                                    <span className="text-xs text-slate-400">{RISK_EXPLANATIONS.apy.label}</span>
                                </div>
                                <span className="text-xs text-slate-300">{breakdown.apyScore}/{RISK_EXPLANATIONS.apy.maxScore}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getScoreBarColor(breakdown.apyScore, RISK_EXPLANATIONS.apy.maxScore)}`}
                                        style={{ width: `${(breakdown.apyScore / RISK_EXPLANATIONS.apy.maxScore) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                {RISK_EXPLANATIONS.apy.getExplanation(breakdown.apyScore, apy, rewardRatio)}
                            </p>
                        </div>

                        {/* Asset Volatility */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <RISK_EXPLANATIONS.stable.icon className="h-4 w-4 text-cyan-400" />
                                    <span className="text-xs text-slate-400">{RISK_EXPLANATIONS.stable.label}</span>
                                </div>
                                <span className="text-xs text-slate-300">{breakdown.stableScore}/{RISK_EXPLANATIONS.stable.maxScore}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getScoreBarColor(breakdown.stableScore, RISK_EXPLANATIONS.stable.maxScore)}`}
                                        style={{ width: `${(breakdown.stableScore / RISK_EXPLANATIONS.stable.maxScore) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                {RISK_EXPLANATIONS.stable.getExplanation(breakdown.stableScore, stablecoin, underlyingAssets)}
                            </p>
                        </div>

                        {/* IL */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <RISK_EXPLANATIONS.il.icon className="h-4 w-4 text-cyan-400" />
                                    <span className="text-xs text-slate-400">{RISK_EXPLANATIONS.il.label}</span>
                                </div>
                                <span className="text-xs text-slate-300">{breakdown.ilScore}/{RISK_EXPLANATIONS.il.maxScore}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getScoreBarColor(breakdown.ilScore, RISK_EXPLANATIONS.il.maxScore)}`}
                                        style={{ width: `${(breakdown.ilScore / RISK_EXPLANATIONS.il.maxScore) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                {RISK_EXPLANATIONS.il.getExplanation(breakdown.ilScore, ilRisk, underlyingAssets)}
                            </p>
                        </div>

                        {/* Protocol */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <RISK_EXPLANATIONS.protocol.icon className="h-4 w-4 text-cyan-400" />
                                    <span className="text-xs text-slate-400">{RISK_EXPLANATIONS.protocol.label}</span>
                                </div>
                                <span className="text-xs text-slate-300">{breakdown.protocolScore}/{RISK_EXPLANATIONS.protocol.maxScore}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getScoreBarColor(breakdown.protocolScore, RISK_EXPLANATIONS.protocol.maxScore)}`}
                                        style={{ width: `${(breakdown.protocolScore / RISK_EXPLANATIONS.protocol.maxScore) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                {RISK_EXPLANATIONS.protocol.getExplanation(breakdown.protocolScore, project)}
                            </p>
                        </div>
                    </div>

                    {/* Main insight */}
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-cyan-300">
                                <span className="font-medium">Biggest factor: </span>
                                {biggestRisk.key === "tvl" && "TVL/liquidity risk. Consider your position size vs pool depth."}
                                {biggestRisk.key === "apy" && "APY sustainability. High reward dependency means yield may decline."}
                                {biggestRisk.key === "stable" && "Asset volatility. Your position value will fluctuate with prices."}
                                {biggestRisk.key === "il" && "Impermanent loss. Simulate IL vs fees before committing."}
                                {biggestRisk.key === "protocol" && "Protocol trust. Research audits and team before large deposits."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
