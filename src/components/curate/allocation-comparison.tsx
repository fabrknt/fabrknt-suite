"use client";

import { useAllocation } from "@/contexts/allocation-context";
import { GitCompare, TrendingUp, Shield, PieChart } from "lucide-react";

// Simplified curator data for comparison
const CURATOR_ALLOCATIONS = [
    {
        name: "Gauntlet",
        style: "Conservative",
        expectedApy: 6.5,
        riskLevel: "low" as const,
        allocations: [
            { asset: "USDC Lending", percent: 45 },
            { asset: "SOL Lending", percent: 30 },
            { asset: "USDT Lending", percent: 25 },
        ],
    },
    {
        name: "Steakhouse",
        style: "Moderate",
        expectedApy: 9.2,
        riskLevel: "medium" as const,
        allocations: [
            { asset: "USDC Lending", percent: 35 },
            { asset: "JitoSOL", percent: 30 },
            { asset: "mSOL", percent: 20 },
            { asset: "SOL-USDC LP", percent: 15 },
        ],
    },
    {
        name: "RE7",
        style: "Aggressive",
        expectedApy: 14.5,
        riskLevel: "high" as const,
        allocations: [
            { asset: "SOL-USDC LP", percent: 35 },
            { asset: "JitoSOL", percent: 25 },
            { asset: "USDC Lending", percent: 25 },
            { asset: "Perp LP", percent: 15 },
        ],
    },
];

const RISK_COLORS = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-orange-400",
};

export function AllocationComparison() {
    const { allocation, riskTolerance, hasAllocation } = useAllocation();

    if (!hasAllocation || !allocation) {
        return null;
    }

    // Find the closest curator by risk tolerance
    const matchingCurator = CURATOR_ALLOCATIONS.find(c => {
        if (riskTolerance === "conservative") return c.style === "Conservative";
        if (riskTolerance === "moderate") return c.style === "Moderate";
        return c.style === "Aggressive";
    }) || CURATOR_ALLOCATIONS[1];

    const { summary, allocations: userAllocations } = allocation;

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <GitCompare className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Your Allocation vs {matchingCurator.name}</h3>
            </div>

            <p className="text-sm text-slate-400 mb-6">
                See how your allocation compares to a professional curator with a similar risk profile.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Your Allocation */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-cyan-400">Your Allocation</span>
                        <span className="text-xs text-slate-500 capitalize">{riskTolerance} risk</span>
                    </div>

                    {/* Summary stats */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-white font-medium">{summary.expectedApy.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Shield className="h-4 w-4 text-slate-400" />
                            <span className={RISK_COLORS[summary.overallRisk]}>{summary.overallRisk}</span>
                        </div>
                    </div>

                    {/* Allocation breakdown */}
                    <div className="space-y-2">
                        {userAllocations.map((alloc, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-slate-300">{alloc.poolName}</span>
                                <span className="text-white font-medium">{alloc.allocation}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Curator Allocation */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-purple-400">{matchingCurator.name}</span>
                        <span className="text-xs text-slate-500">{matchingCurator.style}</span>
                    </div>

                    {/* Summary stats */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-white font-medium">{matchingCurator.expectedApy}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Shield className="h-4 w-4 text-slate-400" />
                            <span className={RISK_COLORS[matchingCurator.riskLevel]}>{matchingCurator.riskLevel}</span>
                        </div>
                    </div>

                    {/* Allocation breakdown */}
                    <div className="space-y-2">
                        {matchingCurator.allocations.map((alloc, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-slate-300">{alloc.asset}</span>
                                <span className="text-white font-medium">{alloc.percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comparison insights */}
            <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
                <p className="text-xs text-slate-400">
                    {summary.expectedApy > matchingCurator.expectedApy ? (
                        <>Your allocation targets <span className="text-green-400">higher yield</span> ({(summary.expectedApy - matchingCurator.expectedApy).toFixed(1)}% more) with similar risk.</>
                    ) : summary.expectedApy < matchingCurator.expectedApy ? (
                        <>Your allocation is <span className="text-cyan-400">more conservative</span> ({(matchingCurator.expectedApy - summary.expectedApy).toFixed(1)}% lower APY) for potentially lower risk.</>
                    ) : (
                        <>Your allocation closely matches {matchingCurator.name}'s approach.</>
                    )}
                </p>
            </div>
        </div>
    );
}
