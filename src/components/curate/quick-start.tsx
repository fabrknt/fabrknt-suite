"use client";

import { useState } from "react";
import {
    DollarSign,
    Shield,
    Zap,
    Flame,
    ArrowRight,
    Clock,
    Eye,
    FileText,
} from "lucide-react";

export type RiskTolerance = "conservative" | "moderate" | "aggressive";

interface QuickStartProps {
    onSubmit: (amount: number, risk: RiskTolerance) => void;
    isLoading?: boolean;
}

const RISK_OPTIONS: {
    value: RiskTolerance;
    label: string;
    description: string;
    icon: typeof Shield;
    color: string;
    bgColor: string;
    borderColor: string;
    expectedApy: string;
}[] = [
    {
        value: "conservative",
        label: "Safe",
        description: "Stable yields, minimal risk",
        icon: Shield,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        expectedApy: "4-7%",
    },
    {
        value: "moderate",
        label: "Balanced",
        description: "Mix of stable and growth",
        icon: Zap,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        expectedApy: "7-12%",
    },
    {
        value: "aggressive",
        label: "Growth",
        description: "Higher risk, higher potential",
        icon: Flame,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        expectedApy: "12-25%+",
    },
];

const AMOUNT_PRESETS = [1000, 5000, 10000, 25000, 50000, 100000];

export function QuickStart({ onSubmit, isLoading }: QuickStartProps) {
    const [amount, setAmount] = useState<string>("10000");
    const [risk, setRisk] = useState<RiskTolerance>("moderate");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount < 100) {
            setError("Please enter at least $100");
            return;
        }
        setError(null);
        onSubmit(numAmount, risk);
    };

    const selectedRiskOption = RISK_OPTIONS.find(r => r.value === risk)!;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-4">
                    <Clock className="h-4 w-4" />
                    Takes 30 seconds
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">
                    Get Your Personalized DeFi Allocation
                </h1>
                <p className="text-slate-400 text-lg">
                    Tell us your investment and risk preference. We&apos;ll show you exactly where to put your money.
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6 space-y-6">
                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-medium text-white mb-3">
                        How much do you want to invest?
                    </label>
                    <div className="relative mb-3">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="10000"
                            className="w-full pl-11 pr-4 py-4 bg-slate-800 border border-slate-600 rounded-xl text-2xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                    {/* Quick presets */}
                    <div className="flex flex-wrap gap-2">
                        {AMOUNT_PRESETS.map(preset => (
                            <button
                                key={preset}
                                onClick={() => setAmount(preset.toString())}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                    parseInt(amount) === preset
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                                        : "bg-slate-800 text-slate-400 hover:text-white border border-transparent"
                                }`}
                            >
                                ${preset >= 1000 ? `${preset / 1000}K` : preset}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Risk Selection */}
                <div>
                    <label className="block text-sm font-medium text-white mb-3">
                        What&apos;s your risk tolerance?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {RISK_OPTIONS.map(option => {
                            const Icon = option.icon;
                            const isSelected = risk === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setRisk(option.value)}
                                    className={`relative p-4 rounded-xl border-2 transition-all ${
                                        isSelected
                                            ? `${option.bgColor} ${option.borderColor}`
                                            : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                                    }`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className={`w-10 h-10 rounded-full ${option.bgColor} flex items-center justify-center mb-2`}>
                                            <Icon className={`h-5 w-5 ${option.color}`} />
                                        </div>
                                        <span className={`font-semibold ${isSelected ? option.color : "text-white"}`}>
                                            {option.label}
                                        </span>
                                        <span className="text-xs text-slate-500 mt-1">
                                            {option.description}
                                        </span>
                                        <span className={`text-xs mt-2 ${isSelected ? option.color : "text-slate-400"}`}>
                                            ~{option.expectedApy} APY
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Error message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Analyzing pools...
                        </>
                    ) : (
                        <>
                            Show My Allocation
                            <ArrowRight className="h-5 w-5" />
                        </>
                    )}
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3 text-green-500" />
                        Read-only
                    </span>
                    <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-green-500" />
                        Non-custodial
                    </span>
                    <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3 text-green-500" />
                        Transparent
                    </span>
                </div>
            </div>

            {/* Bottom note */}
            <p className="text-center text-xs text-slate-500 mt-4">
                We never touch your funds. You execute all transactions yourself.
            </p>
        </div>
    );
}
