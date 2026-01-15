"use client";

import {
    TrendingUp,
    Shield,
    AlertTriangle,
    ChevronRight,
    PieChart,
    CheckCircle,
    Info,
    RefreshCw,
} from "lucide-react";
import { RiskTolerance } from "./quick-start";

export interface RecommendedAllocation {
    poolId: string;
    poolName: string;
    protocol: string;
    asset: string;
    allocation: number; // percentage
    apy: number;
    riskLevel: "low" | "medium" | "high";
    riskScore: number;
    reasoning: string;
    url?: string; // link to protocol
}

export interface AllocationRecommendation {
    allocations: RecommendedAllocation[];
    summary: {
        totalAmount: number;
        expectedApy: number;
        expectedYield: number;
        overallRisk: "low" | "medium" | "high";
        diversificationScore: number;
    };
    insights: string[];
    warnings: string[];
}

interface RecommendationDisplayProps {
    recommendation: AllocationRecommendation;
    riskTolerance: RiskTolerance;
    onReset: () => void;
    onViewDetails: (poolId: string) => void;
}

const RISK_COLORS = {
    low: "text-green-400 bg-green-500/10 border-green-500/30",
    medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    high: "text-orange-400 bg-orange-500/10 border-orange-500/30",
};

const ALLOCATION_COLORS = [
    "from-cyan-500 to-cyan-400",
    "from-purple-500 to-purple-400",
    "from-green-500 to-green-400",
    "from-yellow-500 to-yellow-400",
    "from-orange-500 to-orange-400",
];

function formatCurrency(amount: number): string {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
    return `$${amount.toFixed(0)}`;
}

export function RecommendationDisplay({
    recommendation,
    riskTolerance,
    onReset,
    onViewDetails,
}: RecommendationDisplayProps) {
    const { allocations, summary, insights, warnings } = recommendation;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-3">
                    <CheckCircle className="h-4 w-4" />
                    Your personalized allocation is ready
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Here&apos;s Where to Put Your {formatCurrency(summary.totalAmount)}
                </h2>
                <p className="text-slate-400">
                    Based on your{" "}
                    <span className="text-white capitalize">{riskTolerance}</span> risk preference
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm text-slate-500">Expected APY</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{summary.expectedApy.toFixed(1)}%</p>
                </div>
                <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
                        <span className="text-sm text-slate-500">Annual Yield</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{formatCurrency(summary.expectedYield)}</p>
                </div>
                <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm text-slate-500">Risk Level</span>
                    </div>
                    <p className={`text-2xl font-bold capitalize ${
                        summary.overallRisk === "low" ? "text-green-400" :
                        summary.overallRisk === "medium" ? "text-yellow-400" : "text-orange-400"
                    }`}>
                        {summary.overallRisk}
                    </p>
                </div>
            </div>

            {/* Allocation Visual */}
            <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <PieChart className="h-5 w-5 text-slate-500" />
                    <h3 className="text-lg font-semibold text-white">Your Allocation</h3>
                </div>

                {/* Allocation Bar */}
                <div className="h-8 rounded-full overflow-hidden flex mb-6">
                    {allocations.map((alloc, idx) => (
                        <div
                            key={alloc.poolId}
                            className={`bg-gradient-to-r ${ALLOCATION_COLORS[idx % ALLOCATION_COLORS.length]} relative group`}
                            style={{ width: `${alloc.allocation}%` }}
                        >
                            {alloc.allocation >= 15 && (
                                <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
                                    {alloc.allocation}%
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Allocation List */}
                <div className="space-y-3">
                    {allocations.map((alloc, idx) => (
                        <div
                            key={alloc.poolId}
                            className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                            onClick={() => onViewDetails(alloc.poolId)}
                        >
                            {/* Color indicator */}
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${ALLOCATION_COLORS[idx % ALLOCATION_COLORS.length]}`} />

                            {/* Pool info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">{alloc.poolName}</span>
                                    <span className="text-sm text-slate-500">{alloc.protocol}</span>
                                    <span className={`text-xs px-1.5 py-0.5 rounded border ${RISK_COLORS[alloc.riskLevel]}`}>
                                        {alloc.riskLevel}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400 mt-1">{alloc.reasoning}</p>
                            </div>

                            {/* Allocation & APY */}
                            <div className="text-right">
                                <p className="text-lg font-bold text-white">{alloc.allocation}%</p>
                                <p className="text-sm text-green-400">{alloc.apy.toFixed(1)}% APY</p>
                                <p className="text-xs text-slate-500">
                                    {formatCurrency(summary.totalAmount * alloc.allocation / 100)}
                                </p>
                            </div>

                            <ChevronRight className="h-5 w-5 text-slate-500" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Insights */}
            {insights.length > 0 && (
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-400">Why this allocation?</span>
                    </div>
                    <ul className="space-y-2">
                        {insights.map((insight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-cyan-300">
                                <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{insight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                        <span className="text-sm font-medium text-orange-400">Things to consider</span>
                    </div>
                    <ul className="space-y-2">
                        {warnings.map((warning, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-orange-300">
                                <span className="text-orange-400">•</span>
                                <span>{warning}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Start over button */}
            <div className="text-center">
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                    <RefreshCw className="h-4 w-4" />
                    Start over with different preferences
                </button>
            </div>
        </div>
    );
}
