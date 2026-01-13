"use client";

import { useState } from "react";
import { AlertTriangle, TrendingDown, Lightbulb } from "lucide-react";

interface ApySustainabilityToggleProps {
    totalApy: number;
    baseApy: number;
    rewardApy: number;
    poolSymbol: string;
}

export function ApySustainabilityToggle({
    totalApy,
    baseApy,
    rewardApy,
    poolSymbol,
}: ApySustainabilityToggleProps) {
    const [showSustainableOnly, setShowSustainableOnly] = useState(false);

    const rewardDependency = totalApy > 0 ? (rewardApy / totalApy) * 100 : 0;
    const isHighlyDependent = rewardDependency > 50;
    const displayApy = showSustainableOnly ? baseApy : totalApy;

    return (
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-white">APY Breakdown</h4>
                <button
                    onClick={() => setShowSustainableOnly(!showSustainableOnly)}
                    className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                        showSustainableOnly
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-slate-700/50 text-slate-400 hover:text-white"
                    }`}
                >
                    {showSustainableOnly ? "Showing sustainable only" : "What if rewards stop?"}
                </button>
            </div>

            {/* APY Display */}
            <div className="flex items-baseline gap-2 mb-4">
                <span className={`text-3xl font-bold ${showSustainableOnly ? "text-yellow-400" : "text-green-400"}`}>
                    {displayApy.toFixed(2)}%
                </span>
                <span className="text-sm text-slate-500">APY</span>
                {showSustainableOnly && (
                    <span className="text-xs text-yellow-400 flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        -{(totalApy - baseApy).toFixed(2)}%
                    </span>
                )}
            </div>

            {/* Breakdown Bars */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-16">Base</span>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 rounded-full transition-all"
                            style={{ width: `${totalApy > 0 ? (baseApy / totalApy) * 100 : 0}%` }}
                        />
                    </div>
                    <span className="text-xs text-green-400 w-14 text-right">{baseApy.toFixed(1)}%</span>
                </div>
                <div className={`flex items-center gap-2 transition-opacity ${showSustainableOnly ? "opacity-30" : ""}`}>
                    <span className="text-xs text-slate-400 w-16">Reward</span>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${showSustainableOnly ? "bg-slate-600" : "bg-purple-500"}`}
                            style={{ width: `${totalApy > 0 ? (rewardApy / totalApy) * 100 : 0}%` }}
                        />
                    </div>
                    <span className={`text-xs w-14 text-right ${showSustainableOnly ? "text-slate-600 line-through" : "text-purple-400"}`}>
                        {rewardApy.toFixed(1)}%
                    </span>
                </div>
            </div>

            {/* Insight */}
            {isHighlyDependent && (
                <div className={`rounded-lg p-3 transition-colors ${
                    showSustainableOnly
                        ? "bg-yellow-500/10 border border-yellow-500/20"
                        : "bg-slate-900/50"
                }`}>
                    <div className="flex items-start gap-2">
                        {showSustainableOnly ? (
                            <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="text-xs">
                            {showSustainableOnly ? (
                                <p className="text-yellow-300">
                                    <span className="font-medium">Without rewards:</span>{" "}
                                    {poolSymbol} would yield only {baseApy.toFixed(2)}%.
                                    Consider if this base rate meets your goals.
                                </p>
                            ) : (
                                <p className="text-slate-400">
                                    <span className="font-medium text-orange-400">{rewardDependency.toFixed(0)}% reward-dependent.</span>{" "}
                                    Token emissions can decrease or end. Toggle above to see sustainable yield.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!isHighlyDependent && baseApy > 0 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-green-300">
                            <span className="font-medium">Sustainable yield.</span>{" "}
                            Only {rewardDependency.toFixed(0)}% depends on rewards.
                            This pool&apos;s APY is mostly from organic sources.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
