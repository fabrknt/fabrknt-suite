"use client";

import { useState } from "react";
import { Calculator, TrendingUp, TrendingDown, Clock, Lightbulb } from "lucide-react";

interface ILSimulatorEnhancedProps {
    poolSymbol: string;
    poolApy: number;
    underlyingAssets: string[];
    initialDeposit?: number;
}

export function ILSimulatorEnhanced({
    poolSymbol,
    poolApy,
    underlyingAssets,
    initialDeposit = 10000,
}: ILSimulatorEnhancedProps) {
    const [deposit, setDeposit] = useState(initialDeposit);
    const [priceChange, setPriceChange] = useState(25);
    const [holdingDays, setHoldingDays] = useState(30);

    // IL calculation: IL = 2 * sqrt(price_ratio) / (1 + price_ratio) - 1
    const priceRatio = 1 + priceChange / 100;
    const ilPercent = (2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1) * 100;
    const ilAmount = (ilPercent / 100) * deposit;

    // Fee calculation based on APY and holding period
    const dailyRate = poolApy / 365 / 100;
    const feesEarned = deposit * dailyRate * holdingDays;

    // Net position values
    const holdValue = deposit * (1 + priceChange / 100 / 2); // Simplified: 50% in volatile asset
    const lpValueBeforeFees = holdValue + ilAmount; // IL is negative
    const lpValueAfterFees = lpValueBeforeFees + feesEarned;
    const netGainLoss = lpValueAfterFees - deposit;

    // Calculate days to offset IL
    const daysToOffset = dailyRate > 0 ? Math.abs(ilAmount) / (deposit * dailyRate) : Infinity;

    const feesOffsetIL = feesEarned > Math.abs(ilAmount);

    return (
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-4 w-4 text-orange-400" />
                <h4 className="text-sm font-medium text-white">IL Simulator: {poolSymbol}</h4>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Deposit ($)</label>
                    <input
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                </div>
                <div>
                    <label className="text-xs text-slate-400 block mb-1">
                        {underlyingAssets[0] || "Asset"} price change
                    </label>
                    <div className="flex items-center gap-1">
                        <input
                            type="range"
                            min="-80"
                            max="200"
                            value={priceChange}
                            onChange={(e) => setPriceChange(parseInt(e.target.value))}
                            className="flex-1 h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-orange-500"
                        />
                        <span className="text-xs text-white w-12 text-right">
                            {priceChange > 0 ? "+" : ""}{priceChange}%
                        </span>
                    </div>
                </div>
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Holding period</label>
                    <select
                        value={holdingDays}
                        onChange={(e) => setHoldingDays(parseInt(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                    >
                        <option value={7}>7 days</option>
                        <option value={30}>30 days</option>
                        <option value={90}>90 days</option>
                        <option value={180}>180 days</option>
                        <option value={365}>1 year</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                        <p className="text-xs text-slate-500 mb-1">If you held 50/50</p>
                        <p className="text-lg font-semibold text-slate-300">
                            ${holdValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 mb-1">LP position</p>
                        <p className={`text-lg font-semibold ${feesOffsetIL ? "text-green-400" : "text-orange-400"}`}>
                            ${lpValueAfterFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 mb-1">Net result</p>
                        <p className={`text-lg font-semibold flex items-center justify-center gap-1 ${
                            netGainLoss >= 0 ? "text-green-400" : "text-red-400"
                        }`}>
                            {netGainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            {netGainLoss >= 0 ? "+" : ""}${netGainLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Impermanent Loss</span>
                    <span className="text-red-400">
                        {ilPercent.toFixed(2)}% (${Math.abs(ilAmount).toLocaleString(undefined, { maximumFractionDigits: 0 })})
                    </span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Fees earned ({holdingDays} days @ {poolApy.toFixed(1)}% APY)</span>
                    <span className="text-green-400">
                        +${feesEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                </div>
                <div className="border-t border-slate-700 pt-2 flex justify-between text-xs font-medium">
                    <span className="text-white">Fees vs IL</span>
                    <span className={feesOffsetIL ? "text-green-400" : "text-orange-400"}>
                        {feesOffsetIL ? "Fees > IL ✓" : "IL > Fees"}
                    </span>
                </div>
            </div>

            {/* Insight */}
            <div className={`rounded-lg p-3 ${feesOffsetIL ? "bg-green-500/10 border border-green-500/20" : "bg-orange-500/10 border border-orange-500/20"}`}>
                <div className="flex items-start gap-2">
                    {feesOffsetIL ? (
                        <Lightbulb className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                        <Clock className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="text-xs">
                        {feesOffsetIL ? (
                            <p className="text-green-300">
                                <span className="font-medium">Fees offset the IL.</span>{" "}
                                At this price movement and holding period, LP is profitable.
                            </p>
                        ) : (
                            <p className="text-orange-300">
                                <span className="font-medium">IL exceeds fees.</span>{" "}
                                {daysToOffset < Infinity ? (
                                    <>Hold ~{Math.ceil(daysToOffset)} days to break even at current APY.</>
                                ) : (
                                    <>Consider if fees will eventually offset the loss.</>
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Educational note */}
            <div className="mt-3 text-xs text-slate-500">
                <Lightbulb className="h-3 w-3 inline mr-1" />
                IL increases with price divergence. Stablecoin pairs have minimal IL.
                Concentrated liquidity (CLMM) has higher IL but higher fees.
            </div>
        </div>
    );
}
