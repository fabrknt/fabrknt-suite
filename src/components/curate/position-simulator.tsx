"use client";

import { useState, useMemo } from "react";
import {
    Calculator,
    TrendingUp,
    TrendingDown,
    Coins,
    Clock,
    DollarSign,
    BarChart3,
    AlertTriangle,
    HelpCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

interface PoolData {
    poolId: string;
    symbol: string;
    project: string;
    apy: number;
    apyBase: number;
    apyReward: number;
    tvlUsd: number;
    isConcentratedLiquidity?: boolean;
}

interface PositionSimulatorProps {
    pools?: PoolData[];
    onClose?: () => void;
}

interface SimulationResult {
    period: number;
    periodLabel: string;
    initialValue: number;
    yieldEarned: number;
    finalValueNoIL: number;
    // IL scenarios
    ilAt10Percent: number;
    ilAt25Percent: number;
    ilAt50Percent: number;
    finalValueAt10Percent: number;
    finalValueAt25Percent: number;
    finalValueAt50Percent: number;
    // Comparison
    holdValue: number; // If just held 50/50
    netProfitNoIL: number;
    netProfitAt25PercentIL: number;
}

// Calculate IL for a given price change
function calculateIL(priceChangePercent: number): number {
    const priceRatio = 1 + priceChangePercent / 100;
    if (priceRatio <= 0) return -1;
    const il = 2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1;
    return il;
}

// Calculate concentrated IL with amplification
function calculateConcentratedIL(priceChangePercent: number, rangeMultiplier: number = 2): number {
    const standardIL = calculateIL(priceChangePercent);
    return standardIL * rangeMultiplier;
}

// Calculate compounded yield
function calculateCompoundedYield(principal: number, apy: number, days: number): number {
    const dailyRate = apy / 100 / 365;
    return principal * Math.pow(1 + dailyRate, days);
}

// Calculate simple yield
function calculateSimpleYield(principal: number, apy: number, days: number): number {
    const dailyRate = apy / 100 / 365;
    return principal * (1 + dailyRate * days);
}

const TIME_PERIODS = [
    { days: 7, label: "7 days" },
    { days: 30, label: "30 days" },
    { days: 90, label: "90 days" },
    { days: 180, label: "180 days" },
    { days: 365, label: "1 year" },
];

export function PositionSimulator({ pools = [], onClose }: PositionSimulatorProps) {
    const [depositAmount, setDepositAmount] = useState<string>("1000");
    const [selectedPoolId, setSelectedPoolId] = useState<string>(pools[0]?.poolId || "");
    const [customApy, setCustomApy] = useState<string>("");
    const [isConcentrated, setIsConcentrated] = useState<boolean>(false);
    const [compounding, setCompounding] = useState<"daily" | "none">("daily");
    const [priceVolatility, setPriceVolatility] = useState<"low" | "medium" | "high">("medium");
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

    const selectedPool = pools.find((p) => p.poolId === selectedPoolId);
    const effectiveApy = customApy ? parseFloat(customApy) : (selectedPool?.apy || 0);
    const amount = parseFloat(depositAmount) || 0;

    // Price change scenarios based on volatility
    const priceScenarios = useMemo(() => {
        switch (priceVolatility) {
            case "low":
                return { mild: 5, moderate: 15, severe: 30 };
            case "high":
                return { mild: 20, moderate: 40, severe: 70 };
            default: // medium
                return { mild: 10, moderate: 25, severe: 50 };
        }
    }, [priceVolatility]);

    // Calculate simulation results for each time period
    const results: SimulationResult[] = useMemo(() => {
        if (amount <= 0 || effectiveApy <= 0) return [];

        return TIME_PERIODS.map(({ days, label }) => {
            const yieldCalc = compounding === "daily" ? calculateCompoundedYield : calculateSimpleYield;
            const finalValueNoIL = yieldCalc(amount, effectiveApy, days);
            const yieldEarned = finalValueNoIL - amount;

            // IL calculations
            const ilCalc = isConcentrated ? calculateConcentratedIL : calculateIL;
            const ilAt10 = ilCalc(priceScenarios.mild);
            const ilAt25 = ilCalc(priceScenarios.moderate);
            const ilAt50 = ilCalc(priceScenarios.severe);

            // Final values with IL
            const finalValueAt10 = finalValueNoIL * (1 + ilAt10);
            const finalValueAt25 = finalValueNoIL * (1 + ilAt25);
            const finalValueAt50 = finalValueNoIL * (1 + ilAt50);

            // Hold value (assuming 50/50 split, one asset changes price)
            // If one asset goes up 25%, average portfolio goes up 12.5%
            const holdValueAt25 = amount * (1 + priceScenarios.moderate / 100 / 2);

            return {
                period: days,
                periodLabel: label,
                initialValue: amount,
                yieldEarned,
                finalValueNoIL,
                ilAt10Percent: ilAt10 * 100,
                ilAt25Percent: ilAt25 * 100,
                ilAt50Percent: ilAt50 * 100,
                finalValueAt10Percent: finalValueAt10,
                finalValueAt25Percent: finalValueAt25,
                finalValueAt50Percent: finalValueAt50,
                holdValue: holdValueAt25,
                netProfitNoIL: finalValueNoIL - amount,
                netProfitAt25PercentIL: finalValueAt25 - amount,
            };
        });
    }, [amount, effectiveApy, compounding, isConcentrated, priceScenarios]);

    // Calculate breakeven APY for different IL levels
    const breakevenApys = useMemo(() => {
        const ilCalc = isConcentrated ? calculateConcentratedIL : calculateIL;
        const il25 = Math.abs(ilCalc(priceScenarios.moderate));
        const il50 = Math.abs(ilCalc(priceScenarios.severe));

        return {
            for25PercentMove: (il25 * 365 / 30 * 100).toFixed(1), // Annualized APY to break even in 30 days
            for50PercentMove: (il50 * 365 / 30 * 100).toFixed(1),
        };
    }, [isConcentrated, priceScenarios]);

    return (
        <div className="bg-slate-900/95 rounded-xl border border-slate-700/50 p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Position Simulator</h2>
                        <p className="text-sm text-slate-400">Project returns with IL impact</p>
                    </div>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        ×
                    </button>
                )}
            </div>

            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Deposit Amount */}
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Deposit Amount</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="number"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            placeholder="1000"
                        />
                    </div>
                </div>

                {/* Pool Selection or Custom APY */}
                {pools.length > 0 ? (
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">Select Pool</label>
                        <select
                            value={selectedPoolId}
                            onChange={(e) => {
                                setSelectedPoolId(e.target.value);
                                setCustomApy("");
                            }}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        >
                            {pools.map((pool) => (
                                <option key={pool.poolId} value={pool.poolId}>
                                    {pool.project} - {pool.symbol} ({pool.apy.toFixed(1)}%)
                                </option>
                            ))}
                            <option value="">Custom APY</option>
                        </select>
                    </div>
                ) : (
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">APY (%)</label>
                        <input
                            type="number"
                            value={customApy}
                            onChange={(e) => setCustomApy(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            placeholder="10"
                        />
                    </div>
                )}

                {/* Custom APY (when pool selected but want to override) */}
                {pools.length > 0 && !selectedPoolId && (
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">Custom APY (%)</label>
                        <input
                            type="number"
                            value={customApy}
                            onChange={(e) => setCustomApy(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            placeholder="10"
                        />
                    </div>
                )}

                {/* Compounding */}
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Compounding</label>
                    <select
                        value={compounding}
                        onChange={(e) => setCompounding(e.target.value as "daily" | "none")}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    >
                        <option value="daily">Daily Auto-Compound</option>
                        <option value="none">No Compounding</option>
                    </select>
                </div>

                {/* Pool Type */}
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Pool Type</label>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsConcentrated(false)}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                !isConcentrated
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                                    : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600"
                            }`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => setIsConcentrated(true)}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isConcentrated
                                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                                    : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600"
                            }`}
                        >
                            CLMM
                        </button>
                    </div>
                </div>
            </div>

            {/* Advanced Settings */}
            <div>
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                    {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    Advanced Settings
                </button>

                {showAdvanced && (
                    <div className="mt-3 p-4 bg-slate-800/50 rounded-lg">
                        <div className="max-w-xs">
                            <label className="block text-xs text-slate-400 mb-1">Expected Price Volatility</label>
                            <select
                                value={priceVolatility}
                                onChange={(e) => setPriceVolatility(e.target.value as "low" | "medium" | "high")}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            >
                                <option value="low">Low (Stablecoin pairs, LSTs)</option>
                                <option value="medium">Medium (Major tokens)</option>
                                <option value="high">High (Volatile pairs)</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-1">
                                Scenarios: ±{priceScenarios.mild}%, ±{priceScenarios.moderate}%, ±{priceScenarios.severe}%
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Current Settings Summary */}
            <div className="flex flex-wrap items-center gap-4 p-3 bg-slate-800/30 rounded-lg">
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-slate-300">${amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-slate-300">{effectiveApy.toFixed(2)}% APY</span>
                </div>
                <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-slate-300">{isConcentrated ? "CLMM (2x IL)" : "Standard AMM"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-slate-300">{compounding === "daily" ? "Daily compound" : "No compound"}</span>
                </div>
            </div>

            {/* Results Table */}
            {results.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-3 px-2 text-slate-400 font-medium">Period</th>
                                <th className="text-right py-3 px-2 text-slate-400 font-medium">Yield Earned</th>
                                <th className="text-right py-3 px-2 text-slate-400 font-medium">
                                    <div className="flex items-center justify-end gap-1">
                                        No IL
                                        <span className="text-green-400">(Best)</span>
                                    </div>
                                </th>
                                <th className="text-right py-3 px-2 text-slate-400 font-medium">
                                    ±{priceScenarios.mild}% Move
                                </th>
                                <th className="text-right py-3 px-2 text-slate-400 font-medium">
                                    ±{priceScenarios.moderate}% Move
                                </th>
                                <th className="text-right py-3 px-2 text-slate-400 font-medium">
                                    ±{priceScenarios.severe}% Move
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result.period} className="border-b border-slate-800 hover:bg-slate-800/30">
                                    <td className="py-3 px-2 text-white font-medium">{result.periodLabel}</td>
                                    <td className="py-3 px-2 text-right text-green-400">
                                        +${result.yieldEarned.toFixed(2)}
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <div className="text-white">${result.finalValueNoIL.toFixed(2)}</div>
                                        <div className="text-xs text-green-400">
                                            +{((result.finalValueNoIL / amount - 1) * 100).toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <div className="text-white">${result.finalValueAt10Percent.toFixed(2)}</div>
                                        <div className="text-xs text-yellow-400">
                                            IL: {result.ilAt10Percent.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <div className={result.finalValueAt25Percent >= amount ? "text-white" : "text-red-400"}>
                                            ${result.finalValueAt25Percent.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-orange-400">
                                            IL: {result.ilAt25Percent.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <div className={result.finalValueAt50Percent >= amount ? "text-white" : "text-red-400"}>
                                            ${result.finalValueAt50Percent.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-red-400">
                                            IL: {result.ilAt50Percent.toFixed(2)}%
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Visual Comparison - 30 day scenario */}
            {results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Best Case */}
                    <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-400 mb-2">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm font-medium">Best Case (No IL)</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            ${results[1]?.finalValueNoIL.toFixed(2) || "0"}
                        </p>
                        <p className="text-sm text-green-400">
                            +${results[1]?.netProfitNoIL.toFixed(2) || "0"} in 30 days
                        </p>
                    </div>

                    {/* Realistic Case */}
                    <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                            <BarChart3 className="h-4 w-4" />
                            <span className="text-sm font-medium">Realistic (±{priceScenarios.moderate}% IL)</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            ${results[1]?.finalValueAt25Percent.toFixed(2) || "0"}
                        </p>
                        <p className={`text-sm ${(results[1]?.netProfitAt25PercentIL || 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {(results[1]?.netProfitAt25PercentIL || 0) >= 0 ? "+" : ""}${results[1]?.netProfitAt25PercentIL.toFixed(2) || "0"} in 30 days
                        </p>
                    </div>

                    {/* vs Holding */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                            <Coins className="h-4 w-4" />
                            <span className="text-sm font-medium">vs Just Holding</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            ${results[1]?.holdValue.toFixed(2) || "0"}
                        </p>
                        <p className="text-sm text-blue-400">
                            50/50 hold @ ±{priceScenarios.moderate}% price move
                        </p>
                    </div>
                </div>
            )}

            {/* Breakeven APY Info */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-medium text-white mb-1">Breakeven APY Requirements</h4>
                        <p className="text-xs text-slate-400">
                            To break even after 30 days with IL from a{" "}
                            <span className="text-yellow-400">±{priceScenarios.moderate}% price move</span>, you need at least{" "}
                            <span className="text-cyan-400 font-medium">{breakevenApys.for25PercentMove}% APY</span>.
                            For <span className="text-red-400">±{priceScenarios.severe}% moves</span>, you need{" "}
                            <span className="text-cyan-400 font-medium">{breakevenApys.for50PercentMove}% APY</span>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Help Section */}
            <div className="flex items-start gap-2 text-xs text-slate-500">
                <HelpCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <p>
                    This simulator projects returns based on current APY and estimates impermanent loss at different price volatility scenarios.
                    {isConcentrated && " CLMM pools have approximately 2x IL compared to standard AMMs."}
                    {" "}Actual results may vary based on market conditions, fee changes, and pool dynamics.
                </p>
            </div>
        </div>
    );
}
