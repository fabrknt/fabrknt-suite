"use client";

import { useState } from "react";
import { Shield, TrendingUp, Zap, ChevronRight, DollarSign, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StrategyAllocation {
    pool: string;
    protocol: string;
    asset: string;
    allocation: number;
    apy: number;
    riskLevel: "low" | "medium" | "high";
}

interface QuickStartStrategy {
    id: string;
    name: string;
    tagline: string;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
    borderColor: string;
    avgApy: number;
    riskLevel: "low" | "medium" | "high";
    riskLabel: string;
    allocations: StrategyAllocation[];
}

const STRATEGIES: QuickStartStrategy[] = [
    {
        id: "safe-haven",
        name: "Safe Haven",
        tagline: "Capital preservation first",
        description: "100% stablecoins across established lending protocols. Minimal risk, steady yields.",
        icon: <Shield className="h-5 w-5" />,
        iconBg: "bg-green-500/20 text-green-400",
        borderColor: "border-green-500/30 hover:border-green-500/50",
        avgApy: 6.2,
        riskLevel: "low",
        riskLabel: "Low Risk",
        allocations: [
            { pool: "USDC Lending", protocol: "Kamino", asset: "USDC", allocation: 50, apy: 6.8, riskLevel: "low" },
            { pool: "USDT Lending", protocol: "Kamino", asset: "USDT", allocation: 30, apy: 5.9, riskLevel: "low" },
            { pool: "USDC Lending", protocol: "Marginfi", asset: "USDC", allocation: 20, apy: 5.5, riskLevel: "low" },
        ],
    },
    {
        id: "balanced",
        name: "Balanced Growth",
        tagline: "Best of both worlds",
        description: "Mix of stablecoins and blue-chip assets. Moderate risk for enhanced returns.",
        icon: <TrendingUp className="h-5 w-5" />,
        iconBg: "bg-yellow-500/20 text-yellow-400",
        borderColor: "border-yellow-500/30 hover:border-yellow-500/50",
        avgApy: 7.8,
        riskLevel: "medium",
        riskLabel: "Medium Risk",
        allocations: [
            { pool: "USDC Lending", protocol: "Kamino", asset: "USDC", allocation: 40, apy: 6.8, riskLevel: "low" },
            { pool: "SOL Lending", protocol: "Kamino", asset: "SOL", allocation: 25, apy: 5.2, riskLevel: "low" },
            { pool: "JitoSOL Vault", protocol: "Kamino", asset: "JITOSOL", allocation: 20, apy: 7.5, riskLevel: "medium" },
            { pool: "ETH Lending", protocol: "Marginfi", asset: "ETH", allocation: 15, apy: 4.1, riskLevel: "low" },
        ],
    },
    {
        id: "yield-maxi",
        name: "Yield Maximizer",
        tagline: "Higher risk, higher reward",
        description: "Aggressive allocation to higher-yield opportunities. For experienced DeFi users.",
        icon: <Zap className="h-5 w-5" />,
        iconBg: "bg-orange-500/20 text-orange-400",
        borderColor: "border-orange-500/30 hover:border-orange-500/50",
        avgApy: 12.5,
        riskLevel: "high",
        riskLabel: "Higher Risk",
        allocations: [
            { pool: "JitoSOL-SOL LP", protocol: "Meteora", asset: "JITOSOL/SOL", allocation: 35, apy: 15.2, riskLevel: "medium" },
            { pool: "USDC-USDT LP", protocol: "Meteora", asset: "USDC/USDT", allocation: 25, apy: 8.5, riskLevel: "low" },
            { pool: "mSOL Staking", protocol: "Marinade", asset: "MSOL", allocation: 20, apy: 8.1, riskLevel: "medium" },
            { pool: "SOL Lending", protocol: "Marginfi", asset: "SOL", allocation: 20, apy: 6.8, riskLevel: "low" },
        ],
    },
];

const RISK_COLORS = {
    low: "text-green-400 bg-green-500/10 border-green-500/30",
    medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    high: "text-orange-400 bg-orange-500/10 border-orange-500/30",
};

function formatDollar(amount: number): string {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount.toLocaleString()}`;
}

function AllocationBar({ allocation }: { allocation: number }) {
    return (
        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
                className="h-full bg-cyan-500 rounded-full"
                style={{ width: `${allocation}%` }}
            />
        </div>
    );
}

interface StrategyDetailPanelProps {
    strategy: QuickStartStrategy;
    isOpen: boolean;
    onClose: () => void;
}

function StrategyDetailPanel({ strategy, isOpen, onClose }: StrategyDetailPanelProps) {
    const [investmentAmount, setInvestmentAmount] = useState<string>("10000");

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-40"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full max-w-xl bg-slate-900 border-l border-slate-700 z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${strategy.iconBg}`}>
                                        {strategy.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">{strategy.name}</h2>
                                        <p className="text-sm text-slate-400">{strategy.tagline}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 pb-24 md:pb-4">
                            {/* Investment Calculator */}
                            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 mb-6 border border-cyan-500/20">
                                <div className="flex items-center gap-2 mb-3">
                                    <DollarSign className="h-4 w-4 text-cyan-400" />
                                    <h3 className="text-sm font-medium text-cyan-300">Your Investment</h3>
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                        <input
                                            type="text"
                                            value={investmentAmount}
                                            onChange={(e) => setInvestmentAmount(e.target.value.replace(/[^0-9]/g, ""))}
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 pl-7 pr-3 text-white focus:outline-none focus:border-cyan-500"
                                            placeholder="10000"
                                        />
                                    </div>
                                    <div className="flex gap-1">
                                        {["5000", "10000", "25000"].map((preset) => (
                                            <button
                                                key={preset}
                                                onClick={() => setInvestmentAmount(preset)}
                                                className={`px-2 py-1 text-xs rounded transition-colors ${
                                                    investmentAmount === preset
                                                        ? "bg-cyan-500/20 text-cyan-400"
                                                        : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                                                }`}
                                            >
                                                ${Number(preset).toLocaleString()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {Number(investmentAmount) > 0 && (
                                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-700/50">
                                        <div>
                                            <div className="text-xs text-slate-500">Expected Annual Yield</div>
                                            <div className="text-lg font-bold text-green-400">
                                                +{formatDollar(Number(investmentAmount) * (strategy.avgApy / 100))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500">Monthly</div>
                                            <div className="text-lg font-bold text-green-400">
                                                +{formatDollar(Number(investmentAmount) * (strategy.avgApy / 100) / 12)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Strategy Overview */}
                            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-medium text-slate-300">Strategy Overview</h3>
                                    <span className={`px-2 py-1 text-xs rounded border ${RISK_COLORS[strategy.riskLevel]}`}>
                                        {strategy.riskLabel}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400 mb-4">{strategy.description}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-slate-500">Average APY</div>
                                        <div className="text-xl font-bold text-green-400">{strategy.avgApy}%</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500">Positions</div>
                                        <div className="text-xl font-bold text-white">{strategy.allocations.length}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Allocations */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-slate-300 mb-3">
                                    {Number(investmentAmount) > 0
                                        ? `Your ${formatDollar(Number(investmentAmount))} Allocation`
                                        : "Allocation Breakdown"}
                                </h3>
                                <div className="space-y-2">
                                    {strategy.allocations.map((alloc, idx) => {
                                        const dollarAmount = Number(investmentAmount) > 0
                                            ? Number(investmentAmount) * (alloc.allocation / 100)
                                            : null;

                                        return (
                                            <div
                                                key={idx}
                                                className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <div className="text-sm font-medium text-white">{alloc.pool}</div>
                                                        <div className="text-xs text-slate-400">{alloc.protocol} · {alloc.asset}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-semibold text-green-400">{alloc.apy}% APY</div>
                                                        <span className={`text-xs px-1.5 py-0.5 rounded border ${RISK_COLORS[alloc.riskLevel]}`}>
                                                            {alloc.riskLevel}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <AllocationBar allocation={alloc.allocation} />
                                                        <span className="text-sm text-white font-medium">{alloc.allocation}%</span>
                                                    </div>
                                                    {dollarAmount !== null && (
                                                        <span className="text-sm font-semibold text-cyan-400">
                                                            {formatDollar(dollarAmount)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700">
                                <p className="text-xs text-slate-500">
                                    This is a suggested allocation based on current market conditions.
                                    APY rates fluctuate. This is not financial advice. Always do your own research.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export function QuickStartStrategies() {
    const [selectedStrategy, setSelectedStrategy] = useState<QuickStartStrategy | null>(null);

    return (
        <>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-800">
                    <h3 className="text-lg font-semibold text-white">Quick Start Strategies</h3>
                    <p className="text-sm text-slate-400 mt-1">
                        Pre-built allocations for different risk profiles
                    </p>
                </div>

                <div className="p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        {STRATEGIES.map((strategy) => (
                            <button
                                key={strategy.id}
                                onClick={() => setSelectedStrategy(strategy)}
                                className={`text-left bg-slate-800/50 rounded-xl p-4 border transition-all group ${strategy.borderColor}`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg ${strategy.iconBg}`}>
                                        {strategy.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                            {strategy.name}
                                        </h4>
                                        <p className="text-xs text-slate-500">{strategy.tagline}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="bg-slate-900/50 rounded-lg p-2">
                                        <div className="text-xs text-slate-500">APY</div>
                                        <div className="text-lg font-bold text-green-400">~{strategy.avgApy}%</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-2">
                                        <div className="text-xs text-slate-500">Risk</div>
                                        <div className={`text-sm font-medium ${
                                            strategy.riskLevel === "low" ? "text-green-400" :
                                            strategy.riskLevel === "medium" ? "text-yellow-400" :
                                            "text-orange-400"
                                        }`}>
                                            {strategy.riskLabel}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                                    {strategy.description}
                                </p>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">{strategy.allocations.length} positions</span>
                                    <span className="flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300">
                                        View details
                                        <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <StrategyDetailPanel
                strategy={selectedStrategy || STRATEGIES[0]}
                isOpen={!!selectedStrategy}
                onClose={() => setSelectedStrategy(null)}
            />
        </>
    );
}
