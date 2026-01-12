"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingUp, TrendingDown, AlertTriangle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ILCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
    initialTokenA?: string;
    initialTokenB?: string;
}

// Calculate Impermanent Loss
// IL = 2 * sqrt(price_ratio) / (1 + price_ratio) - 1
function calculateIL(priceChangePercent: number): number {
    const priceRatio = 1 + priceChangePercent / 100;
    if (priceRatio <= 0) return -1; // 100% loss
    const il = 2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1;
    return il;
}

// Calculate IL for concentrated liquidity (amplified)
function calculateConcentratedIL(priceChangePercent: number, rangeMultiplier: number = 2): number {
    const standardIL = calculateIL(priceChangePercent);
    // Concentrated liquidity amplifies IL by roughly the concentration factor
    return standardIL * rangeMultiplier;
}

// Pre-calculated IL values for common price changes
const IL_TABLE = [
    { change: -75, label: "-75%" },
    { change: -50, label: "-50%" },
    { change: -25, label: "-25%" },
    { change: -10, label: "-10%" },
    { change: 0, label: "0%" },
    { change: 10, label: "+10%" },
    { change: 25, label: "+25%" },
    { change: 50, label: "+50%" },
    { change: 100, label: "+100%" },
    { change: 200, label: "+200%" },
    { change: 400, label: "+400%" },
];

function ILChart({ priceChange, isConcentrated }: { priceChange: number; isConcentrated: boolean }) {
    const dataPoints = useMemo(() => {
        const points = [];
        for (let change = -80; change <= 400; change += 10) {
            const il = isConcentrated
                ? calculateConcentratedIL(change, 2)
                : calculateIL(change);
            points.push({ change, il: Math.abs(il * 100) });
        }
        return points;
    }, [isConcentrated]);

    const maxIL = Math.max(...dataPoints.map(p => p.il));
    const currentIL = isConcentrated
        ? Math.abs(calculateConcentratedIL(priceChange, 2) * 100)
        : Math.abs(calculateIL(priceChange) * 100);

    return (
        <div className="relative h-40 bg-slate-900/50 rounded-lg p-4">
            <div className="absolute inset-4 flex items-end justify-between gap-0.5">
                {dataPoints.map((point, i) => {
                    const height = (point.il / maxIL) * 100;
                    const isActive = Math.abs(point.change - priceChange) < 15;
                    return (
                        <div
                            key={i}
                            className={`flex-1 rounded-t transition-all ${
                                isActive ? "bg-red-500" : "bg-slate-700"
                            }`}
                            style={{ height: `${Math.max(height, 2)}%` }}
                            title={`${point.change > 0 ? "+" : ""}${point.change}%: ${point.il.toFixed(2)}% IL`}
                        />
                    );
                })}
            </div>
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-4 right-4 flex justify-between text-[10px] text-slate-500">
                <span>-80%</span>
                <span>0%</span>
                <span>+100%</span>
                <span>+400%</span>
            </div>
            {/* Current IL indicator */}
            <div className="absolute top-2 right-4 text-right">
                <span className="text-xs text-slate-400">Current IL</span>
                <p className="text-lg font-bold text-red-400">{currentIL.toFixed(2)}%</p>
            </div>
        </div>
    );
}

export function ILCalculator({ isOpen, onClose, initialTokenA = "SOL", initialTokenB = "USDC" }: ILCalculatorProps) {
    const [tokenA, setTokenA] = useState(initialTokenA);
    const [tokenB, setTokenB] = useState(initialTokenB);
    const [initialPriceA, setInitialPriceA] = useState(100);
    const [currentPriceA, setCurrentPriceA] = useState(100);
    const [depositAmount, setDepositAmount] = useState(1000);
    const [isConcentrated, setIsConcentrated] = useState(false);
    const [concentrationRange, setConcentrationRange] = useState(2);

    const priceChange = useMemo(() => {
        if (initialPriceA === 0) return 0;
        return ((currentPriceA - initialPriceA) / initialPriceA) * 100;
    }, [initialPriceA, currentPriceA]);

    const ilPercent = useMemo(() => {
        const il = isConcentrated
            ? calculateConcentratedIL(priceChange, concentrationRange)
            : calculateIL(priceChange);
        return Math.abs(il * 100);
    }, [priceChange, isConcentrated, concentrationRange]);

    const ilValue = useMemo(() => {
        return (depositAmount * ilPercent) / 100;
    }, [depositAmount, ilPercent]);

    // Calculate what holding would be worth vs LP
    const holdValue = useMemo(() => {
        // Assuming 50/50 split initially
        const tokenAAmount = (depositAmount / 2) / initialPriceA;
        const tokenBAmount = depositAmount / 2;
        return tokenAAmount * currentPriceA + tokenBAmount;
    }, [depositAmount, initialPriceA, currentPriceA]);

    const lpValue = useMemo(() => {
        return holdValue * (1 - ilPercent / 100);
    }, [holdValue, ilPercent]);

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
                        className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 bg-slate-900 border border-slate-700 rounded-xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="border-b border-slate-700 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-orange-400" />
                                <h2 className="text-lg font-semibold text-white">
                                    Impermanent Loss Calculator
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
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="max-w-4xl mx-auto space-y-6">
                                {/* Info box */}
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
                                    <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-blue-200">
                                        <p className="font-medium mb-1">What is Impermanent Loss?</p>
                                        <p className="text-blue-300/80">
                                            IL occurs when the price ratio of tokens in a liquidity pool changes from when you deposited.
                                            The larger the price change, the more IL you experience. It's "impermanent" because it only
                                            becomes permanent when you withdraw.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Input Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-white">Position Setup</h3>

                                        {/* Token Pair */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Token A</label>
                                                <input
                                                    type="text"
                                                    value={tokenA}
                                                    onChange={(e) => setTokenA(e.target.value.toUpperCase())}
                                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Token B</label>
                                                <input
                                                    type="text"
                                                    value={tokenB}
                                                    onChange={(e) => setTokenB(e.target.value.toUpperCase())}
                                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Deposit Amount */}
                                        <div>
                                            <label className="block text-xs text-slate-400 mb-1">Deposit Amount (USD)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                                <input
                                                    type="number"
                                                    value={depositAmount}
                                                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                                                    className="w-full pl-7 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Prices */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Initial {tokenA} Price</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                                    <input
                                                        type="number"
                                                        value={initialPriceA}
                                                        onChange={(e) => setInitialPriceA(Number(e.target.value))}
                                                        className="w-full pl-7 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Current {tokenA} Price</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                                    <input
                                                        type="number"
                                                        value={currentPriceA}
                                                        onChange={(e) => setCurrentPriceA(Number(e.target.value))}
                                                        className="w-full pl-7 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Concentrated Liquidity Toggle */}
                                        <div className="bg-slate-800/50 rounded-lg p-3 space-y-3">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={isConcentrated}
                                                    onChange={(e) => setIsConcentrated(e.target.checked)}
                                                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-orange-500"
                                                />
                                                <span className="text-sm text-white">Concentrated Liquidity (CLMM)</span>
                                            </label>
                                            {isConcentrated && (
                                                <div>
                                                    <label className="block text-xs text-slate-400 mb-1">
                                                        Concentration Factor (1x = standard AMM)
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="10"
                                                        step="0.5"
                                                        value={concentrationRange}
                                                        onChange={(e) => setConcentrationRange(Number(e.target.value))}
                                                        className="w-full"
                                                    />
                                                    <div className="flex justify-between text-xs text-slate-500">
                                                        <span>1x</span>
                                                        <span className="text-orange-400">{concentrationRange}x</span>
                                                        <span>10x</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Quick Price Change Buttons */}
                                        <div>
                                            <label className="block text-xs text-slate-400 mb-2">Quick Price Scenarios</label>
                                            <div className="flex flex-wrap gap-2">
                                                {[-50, -25, -10, 10, 25, 50, 100, 200].map((change) => (
                                                    <button
                                                        key={change}
                                                        onClick={() => setCurrentPriceA(initialPriceA * (1 + change / 100))}
                                                        className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                                                            Math.abs(priceChange - change) < 1
                                                                ? "bg-orange-500 text-white"
                                                                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                                                        }`}
                                                    >
                                                        {change > 0 ? "+" : ""}{change}%
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Results Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-white">Results</h3>

                                        {/* IL Chart */}
                                        <ILChart priceChange={priceChange} isConcentrated={isConcentrated} />

                                        {/* Results Cards */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-slate-800/50 rounded-lg p-3">
                                                <p className="text-xs text-slate-400 mb-1">Price Change</p>
                                                <p className={`text-xl font-bold ${
                                                    priceChange >= 0 ? "text-green-400" : "text-red-400"
                                                }`}>
                                                    {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(1)}%
                                                </p>
                                            </div>
                                            <div className="bg-slate-800/50 rounded-lg p-3">
                                                <p className="text-xs text-slate-400 mb-1">Impermanent Loss</p>
                                                <p className="text-xl font-bold text-red-400">
                                                    {ilPercent.toFixed(2)}%
                                                </p>
                                            </div>
                                        </div>

                                        {/* Value Comparison */}
                                        <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                                            <h4 className="text-sm font-medium text-white">Value Comparison</h4>

                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-slate-400">If you just held:</span>
                                                    <span className="text-sm text-white font-medium">
                                                        ${holdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-slate-400">LP Position Value:</span>
                                                    <span className="text-sm text-white font-medium">
                                                        ${lpValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                                <div className="border-t border-slate-700 pt-2 flex justify-between items-center">
                                                    <span className="text-sm text-slate-400">IL Cost:</span>
                                                    <span className="text-sm text-red-400 font-medium">
                                                        -${ilValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                            </div>

                                            {ilPercent > 5 && (
                                                <div className="flex items-start gap-2 mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
                                                    <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-yellow-200">
                                                        {ilPercent > 20
                                                            ? "Severe IL! Consider if trading fees can offset this loss."
                                                            : "Significant IL. Make sure pool APY covers this loss."}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* IL Reference Table */}
                                        <div className="bg-slate-800/50 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-white mb-3">IL Reference Table</h4>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                                {IL_TABLE.map((row) => {
                                                    const il = isConcentrated
                                                        ? calculateConcentratedIL(row.change, concentrationRange)
                                                        : calculateIL(row.change);
                                                    return (
                                                        <div key={row.change} className="flex justify-between">
                                                            <span className={row.change >= 0 ? "text-green-400" : "text-red-400"}>
                                                                {row.label}
                                                            </span>
                                                            <span className="text-slate-300">
                                                                {(Math.abs(il) * 100).toFixed(2)}% IL
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
