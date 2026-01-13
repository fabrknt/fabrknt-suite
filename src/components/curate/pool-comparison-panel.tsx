"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GuidedComparison } from "./learning";

interface PoolDependency {
    type: "protocol" | "asset" | "oracle" | "chain";
    name: string;
    risk: "low" | "medium" | "high";
}

interface RiskBreakdown {
    tvlScore: number;
    apyScore: number;
    stableScore: number;
    ilScore: number;
    protocolScore: number;
}

interface ApyStability {
    score: number;
    volatility: number;
    avgApy: number;
    minApy: number;
    maxApy: number;
    trend: "up" | "down" | "stable";
    dataPoints: number;
}

interface LiquidityRisk {
    score: number;
    poolTvl: number;
    maxSafeAllocation: number;
    safeAllocationPercent: number;
    slippageEstimates: {
        at100k: number;
        at500k: number;
        at1m: number;
        at5m: number;
        at10m: number;
    };
    exitabilityRating: "excellent" | "good" | "moderate" | "poor" | "very_poor";
}

interface YieldPool {
    id: string;
    chain: string;
    project: string;
    projectSlug: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    apyBase: number;
    apyReward: number;
    stablecoin: boolean;
    ilRisk: string;
    poolMeta: string;
    riskScore: number;
    riskLevel: "low" | "medium" | "high" | "very_high";
    riskBreakdown: RiskBreakdown;
    dependencies: PoolDependency[];
    underlyingAssets: string[];
    apyStability: ApyStability | null;
    liquidityRisk: LiquidityRisk;
}

interface PoolComparisonPanelProps {
    pools: YieldPool[];
    isOpen: boolean;
    onClose: () => void;
}

function formatTvl(tvl: number): string {
    if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
    if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
    return `$${(tvl / 1_000).toFixed(0)}K`;
}

function formatApy(apy: number): string {
    return `${apy.toFixed(2)}%`;
}

const RISK_COLORS = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-orange-400",
    very_high: "text-red-400",
};

interface ComparisonRowProps {
    label: string;
    values: (string | number | boolean | null | undefined)[];
    bestIndex?: number;
    format?: "text" | "number" | "percent" | "currency" | "risk" | "boolean";
    lowerIsBetter?: boolean;
}

function ComparisonRow({ label, values, bestIndex, format = "text", lowerIsBetter = false }: ComparisonRowProps) {
    const formatValue = (val: string | number | boolean | null | undefined) => {
        if (val === null || val === undefined) return "—";
        if (format === "boolean") return val ? "Yes" : "No";
        if (format === "percent") return `${val}%`;
        if (format === "currency") return formatTvl(val as number);
        if (format === "risk") {
            const riskLevel = val as string;
            const colorClass = RISK_COLORS[riskLevel as keyof typeof RISK_COLORS] || "text-slate-400";
            return <span className={colorClass}>{riskLevel.replace("_", " ")}</span>;
        }
        return val;
    };

    return (
        <div className="grid grid-cols-4 gap-2 py-2 border-b border-slate-800 last:border-0">
            <div className="text-xs text-slate-500">{label}</div>
            {values.map((val, i) => (
                <div
                    key={i}
                    className={`text-sm ${
                        bestIndex === i ? "text-green-400 font-medium" : "text-slate-300"
                    }`}
                >
                    {formatValue(val)}
                </div>
            ))}
            {/* Fill empty columns if less than 3 pools */}
            {values.length < 3 && <div />}
        </div>
    );
}

function findBestIndex(values: (number | null | undefined)[], lowerIsBetter = false): number | undefined {
    const numericValues = values.map((v, i) => ({ value: v, index: i })).filter((v) => v.value !== null && v.value !== undefined);
    if (numericValues.length < 2) return undefined;

    if (lowerIsBetter) {
        const min = Math.min(...numericValues.map((v) => v.value as number));
        return numericValues.find((v) => v.value === min)?.index;
    } else {
        const max = Math.max(...numericValues.map((v) => v.value as number));
        return numericValues.find((v) => v.value === max)?.index;
    }
}

export function PoolComparisonPanel({ pools, isOpen, onClose }: PoolComparisonPanelProps) {
    if (pools.length === 0) return null;

    const tvlValues = pools.map((p) => p.tvlUsd);
    const apyValues = pools.map((p) => p.apy);
    const riskValues = pools.map((p) => p.riskScore);
    const stabilityValues = pools.map((p) => p.apyStability?.score);
    const liquidityValues = pools.map((p) => p.liquidityRisk?.score);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full max-w-lg bg-slate-900 border-l border-slate-700 z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Compare Pools</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-4 pb-8">
                            {/* Guided Comparison Insights */}
                            {pools.length >= 2 && (
                                <div className="mb-6">
                                    <GuidedComparison pools={pools} />
                                </div>
                            )}

                            {/* Pool Headers */}
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                <div />
                                {pools.map((pool) => (
                                    <div key={pool.id} className="text-center">
                                        <div className="text-sm font-medium text-white truncate">
                                            {pool.project}
                                        </div>
                                        <div className="text-xs text-slate-500 truncate">
                                            {pool.symbol}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Basic Info */}
                            <div className="mb-4">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                                    Basic Info
                                </h3>
                                <div className="bg-slate-800/50 rounded-lg p-3">
                                    <ComparisonRow
                                        label="Chain"
                                        values={pools.map((p) => p.chain)}
                                    />
                                    <ComparisonRow
                                        label="Stablecoin"
                                        values={pools.map((p) => p.stablecoin)}
                                        format="boolean"
                                    />
                                    <ComparisonRow
                                        label="IL Risk"
                                        values={pools.map((p) => p.ilRisk)}
                                    />
                                </div>
                            </div>

                            {/* Performance */}
                            <div className="mb-4">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                                    Performance
                                </h3>
                                <div className="bg-slate-800/50 rounded-lg p-3">
                                    <ComparisonRow
                                        label="TVL"
                                        values={tvlValues}
                                        bestIndex={findBestIndex(tvlValues)}
                                        format="currency"
                                    />
                                    <ComparisonRow
                                        label="APY"
                                        values={apyValues}
                                        bestIndex={findBestIndex(apyValues)}
                                        format="percent"
                                    />
                                    <ComparisonRow
                                        label="Base APY"
                                        values={pools.map((p) => p.apyBase)}
                                        format="percent"
                                    />
                                    <ComparisonRow
                                        label="Reward APY"
                                        values={pools.map((p) => p.apyReward)}
                                        format="percent"
                                    />
                                </div>
                            </div>

                            {/* Risk */}
                            <div className="mb-4">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                                    Risk Assessment
                                </h3>
                                <div className="bg-slate-800/50 rounded-lg p-3">
                                    <ComparisonRow
                                        label="Risk Score"
                                        values={riskValues}
                                        bestIndex={findBestIndex(riskValues, true)}
                                        format="number"
                                        lowerIsBetter
                                    />
                                    <ComparisonRow
                                        label="Risk Level"
                                        values={pools.map((p) => p.riskLevel)}
                                        format="risk"
                                    />
                                    <ComparisonRow
                                        label="Stability"
                                        values={stabilityValues}
                                        bestIndex={findBestIndex(stabilityValues as number[])}
                                        format="number"
                                    />
                                    <ComparisonRow
                                        label="Liquidity"
                                        values={liquidityValues}
                                        bestIndex={findBestIndex(liquidityValues as number[], true)}
                                        format="number"
                                        lowerIsBetter
                                    />
                                </div>
                            </div>

                            {/* Risk Breakdown */}
                            <div className="mb-4">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                                    Risk Breakdown
                                </h3>
                                <div className="bg-slate-800/50 rounded-lg p-3">
                                    <ComparisonRow
                                        label="TVL Risk"
                                        values={pools.map((p) => p.riskBreakdown.tvlScore)}
                                        bestIndex={findBestIndex(pools.map((p) => p.riskBreakdown.tvlScore), true)}
                                        format="number"
                                        lowerIsBetter
                                    />
                                    <ComparisonRow
                                        label="APY Risk"
                                        values={pools.map((p) => p.riskBreakdown.apyScore)}
                                        bestIndex={findBestIndex(pools.map((p) => p.riskBreakdown.apyScore), true)}
                                        format="number"
                                        lowerIsBetter
                                    />
                                    <ComparisonRow
                                        label="Volatility"
                                        values={pools.map((p) => p.riskBreakdown.stableScore)}
                                        bestIndex={findBestIndex(pools.map((p) => p.riskBreakdown.stableScore), true)}
                                        format="number"
                                        lowerIsBetter
                                    />
                                    <ComparisonRow
                                        label="IL Risk"
                                        values={pools.map((p) => p.riskBreakdown.ilScore)}
                                        bestIndex={findBestIndex(pools.map((p) => p.riskBreakdown.ilScore), true)}
                                        format="number"
                                        lowerIsBetter
                                    />
                                    <ComparisonRow
                                        label="Protocol"
                                        values={pools.map((p) => p.riskBreakdown.protocolScore)}
                                        bestIndex={findBestIndex(pools.map((p) => p.riskBreakdown.protocolScore), true)}
                                        format="number"
                                        lowerIsBetter
                                    />
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="text-xs text-slate-500 flex items-center gap-2">
                                <span className="text-green-400">Green</span> = Best value in category
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
