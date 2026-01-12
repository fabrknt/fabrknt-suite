"use client";

import { useState } from "react";
import { X, History, TrendingUp, TrendingDown, Trophy, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BacktestChart } from "./backtest-chart";

interface BacktestResult {
    poolId: string;
    project: string;
    symbol: string;
    initialAmount: number;
    finalAmount: number;
    totalReturn: number;
    totalReturnPercent: number;
    avgApy: number;
    minApy: number;
    maxApy: number;
    volatility: number;
    dataPoints: {
        date: string;
        apy: number;
        cumulativeValue: number;
    }[];
}

interface BacktestResponse {
    results: BacktestResult[];
    winner: string;
    period: {
        start: string;
        end: string;
        days: number;
    };
    settings: {
        initialAmount: number;
        compounding: string;
    };
}

interface BacktestPanelProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPoolIds: string[];
}

export function BacktestPanel({ isOpen, onClose, selectedPoolIds }: BacktestPanelProps) {
    const [amount, setAmount] = useState(10000);
    const [days, setDays] = useState<7 | 30 | 90>(30);
    const [compounding, setCompounding] = useState<"daily" | "weekly" | "none">("daily");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<BacktestResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const runBacktest = async () => {
        if (selectedPoolIds.length === 0) {
            setError("Please select at least one pool to backtest");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/curate/backtest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    poolIds: selectedPoolIds,
                    initialAmount: amount,
                    days,
                    compounding,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to run backtest");
            }

            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number) =>
        `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
                        className="fixed inset-0 bg-black/60 z-40"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 bg-slate-900 border border-slate-700 rounded-xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="border-b border-slate-700 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <History className="h-5 w-5 text-purple-400" />
                                <h2 className="text-lg font-semibold text-white">
                                    Historical Performance Backtest
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {/* Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">
                                        Initial Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            min={100}
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                            className="w-full pl-7 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">
                                        Period
                                    </label>
                                    <select
                                        value={days}
                                        onChange={(e) => setDays(Number(e.target.value) as 7 | 30 | 90)}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    >
                                        <option value={7}>7 days</option>
                                        <option value={30}>30 days</option>
                                        <option value={90}>90 days</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">
                                        Compounding
                                    </label>
                                    <select
                                        value={compounding}
                                        onChange={(e) =>
                                            setCompounding(e.target.value as "daily" | "weekly" | "none")
                                        }
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={runBacktest}
                                        disabled={loading || selectedPoolIds.length === 0}
                                        className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <History className="h-4 w-4" />
                                        )}
                                        Run Backtest
                                    </button>
                                </div>
                            </div>

                            {/* Selected Pools Info */}
                            <div className="text-sm text-slate-400">
                                {selectedPoolIds.length === 0 ? (
                                    <span className="text-yellow-400">
                                        Select pools from the table to compare their historical performance
                                    </span>
                                ) : (
                                    <span>{selectedPoolIds.length} pool(s) selected for comparison</span>
                                )}
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Results */}
                            {results && (
                                <div className="space-y-6">
                                    {/* Chart */}
                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                        <h3 className="text-sm font-medium text-white mb-4">
                                            Portfolio Value Over Time
                                        </h3>
                                        <BacktestChart
                                            results={results.results}
                                            initialAmount={results.settings.initialAmount}
                                        />
                                    </div>

                                    {/* Results Table */}
                                    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                                        <div className="p-4 border-b border-slate-700/50">
                                            <h3 className="text-sm font-medium text-white">
                                                Performance Summary ({results.period.days} days)
                                            </h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-slate-700/50">
                                                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase">
                                                            Pool
                                                        </th>
                                                        <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase">
                                                            Final Value
                                                        </th>
                                                        <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase">
                                                            Return
                                                        </th>
                                                        <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase">
                                                            Avg APY
                                                        </th>
                                                        <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase">
                                                            Volatility
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {results.results
                                                        .sort((a, b) => b.totalReturnPercent - a.totalReturnPercent)
                                                        .map((result, index) => (
                                                            <tr
                                                                key={result.poolId}
                                                                className="border-b border-slate-700/30 hover:bg-slate-700/20"
                                                            >
                                                                <td className="px-4 py-3">
                                                                    <div className="flex items-center gap-2">
                                                                        {result.poolId === results.winner && (
                                                                            <Trophy className="h-4 w-4 text-yellow-400" />
                                                                        )}
                                                                        <div>
                                                                            <span className="text-white font-medium">
                                                                                {result.project}
                                                                            </span>
                                                                            <span className="text-slate-500 text-xs ml-2">
                                                                                {result.symbol}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 text-right text-white">
                                                                    {formatCurrency(result.finalAmount)}
                                                                </td>
                                                                <td className="px-4 py-3 text-right">
                                                                    <div className="flex items-center justify-end gap-1">
                                                                        {result.totalReturnPercent >= 0 ? (
                                                                            <TrendingUp className="h-4 w-4 text-green-400" />
                                                                        ) : (
                                                                            <TrendingDown className="h-4 w-4 text-red-400" />
                                                                        )}
                                                                        <span
                                                                            className={
                                                                                result.totalReturnPercent >= 0
                                                                                    ? "text-green-400"
                                                                                    : "text-red-400"
                                                                            }
                                                                        >
                                                                            {result.totalReturnPercent >= 0 ? "+" : ""}
                                                                            {result.totalReturnPercent.toFixed(3)}%
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 text-right text-slate-300">
                                                                    {result.avgApy.toFixed(2)}%
                                                                </td>
                                                                <td className="px-4 py-3 text-right text-slate-300">
                                                                    {result.volatility.toFixed(2)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Period Info */}
                                    <div className="text-center text-sm text-slate-500">
                                        Period: {results.period.start} to {results.period.end} |
                                        Initial: {formatCurrency(results.settings.initialAmount)} |
                                        Compounding: {results.settings.compounding}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
