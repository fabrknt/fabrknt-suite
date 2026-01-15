"use client";

import { useState } from "react";
import {
    ExternalLink,
    Copy,
    Check,
    ChevronDown,
    ChevronUp,
    Wallet,
    ArrowRight,
    Shield,
    AlertTriangle,
    Clock,
    CheckCircle2,
} from "lucide-react";
import { RecommendedAllocation } from "./recommendation-display";

interface ExecutionStepsProps {
    allocations: RecommendedAllocation[];
    totalAmount: number;
}

// Protocol URLs for Solana DeFi
const PROTOCOL_URLS: Record<string, string> = {
    kamino: "https://app.kamino.finance",
    marginfi: "https://app.marginfi.com",
    meteora: "https://app.meteora.ag",
    raydium: "https://raydium.io",
    orca: "https://www.orca.so",
    drift: "https://app.drift.trade",
    jito: "https://www.jito.network",
    marinade: "https://marinade.finance",
    solend: "https://solend.fi",
    save: "https://save.finance",
};

function formatCurrency(amount: number): string {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
    return `$${amount.toFixed(0)}`;
}

interface StepCardProps {
    step: number;
    allocation: RecommendedAllocation;
    amount: number;
    isExpanded: boolean;
    onToggle: () => void;
    isCompleted: boolean;
    onComplete: () => void;
}

function StepCard({
    step,
    allocation,
    amount,
    isExpanded,
    onToggle,
    isCompleted,
    onComplete,
}: StepCardProps) {
    const [copied, setCopied] = useState(false);
    const protocolUrl = PROTOCOL_URLS[allocation.protocol.toLowerCase()] || "#";

    const handleCopy = () => {
        navigator.clipboard.writeText(amount.toFixed(2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`border rounded-xl transition-all ${
            isCompleted
                ? "bg-green-500/5 border-green-500/30"
                : "bg-slate-900/70 border-slate-700"
        }`}>
            {/* Step header */}
            <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                onClick={onToggle}
            >
                {/* Step number / check */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isCompleted
                        ? "bg-green-500/20 text-green-400"
                        : "bg-cyan-500/20 text-cyan-400"
                }`}>
                    {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                    ) : (
                        <span className="text-lg font-bold">{step}</span>
                    )}
                </div>

                {/* Step summary */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isCompleted ? "text-green-400" : "text-white"}`}>
                            {allocation.protocol}
                        </span>
                        <span className="text-slate-500">→</span>
                        <span className="text-slate-400">{allocation.poolName}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                        <span className="text-white font-medium">{formatCurrency(amount)}</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-green-400">{allocation.apy.toFixed(1)}% APY</span>
                    </div>
                </div>

                {/* Expand toggle */}
                {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                )}
            </div>

            {/* Expanded details */}
            {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-700/50 pt-4 space-y-4">
                    {/* Instructions */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 shrink-0">1</div>
                            <div>
                                <p className="text-sm text-white">
                                    Go to <span className="text-cyan-400 font-medium">{allocation.protocol}</span>
                                </p>
                                <a
                                    href={protocolUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 mt-1"
                                >
                                    {protocolUrl}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 shrink-0">2</div>
                            <div>
                                <p className="text-sm text-white">
                                    Connect your Solana wallet
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Phantom, Solflare, or any compatible wallet
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 shrink-0">3</div>
                            <div>
                                <p className="text-sm text-white">
                                    Find the <span className="text-cyan-400 font-medium">{allocation.poolName}</span> pool
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Look for {allocation.asset} in the pool list
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 shrink-0">4</div>
                            <div className="flex-1">
                                <p className="text-sm text-white mb-2">
                                    Deposit <span className="text-green-400 font-bold">{formatCurrency(amount)}</span> worth of {allocation.asset}
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-slate-800 rounded-lg px-3 py-2 text-white font-mono">
                                        ${amount.toFixed(2)}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy();
                                        }}
                                        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-green-400" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <a
                            href={protocolUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium rounded-xl transition-all"
                        >
                            <Wallet className="h-4 w-4" />
                            Go to {allocation.protocol}
                            <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onComplete();
                            }}
                            className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                                isCompleted
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                            }`}
                        >
                            {isCompleted ? "Completed" : "Mark done"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export function ExecutionSteps({ allocations, totalAmount }: ExecutionStepsProps) {
    const [expandedStep, setExpandedStep] = useState<number>(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const toggleComplete = (idx: number) => {
        setCompletedSteps(prev => {
            const next = new Set(prev);
            if (next.has(idx)) {
                next.delete(idx);
            } else {
                next.add(idx);
                // Auto-expand next step
                if (idx < allocations.length - 1) {
                    setExpandedStep(idx + 1);
                }
            }
            return next;
        });
    };

    const allCompleted = completedSteps.size === allocations.length;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-white mb-2">
                    Execute Your Allocation
                </h2>
                <p className="text-slate-400">
                    Follow these {allocations.length} steps to deploy your capital
                </p>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-4 p-4 bg-slate-900/70 border border-slate-700 rounded-xl">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Progress</span>
                        <span className="text-sm text-white font-medium">
                            {completedSteps.size} / {allocations.length} steps
                        </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all"
                            style={{ width: `${(completedSteps.size / allocations.length) * 100}%` }}
                        />
                    </div>
                </div>
                {allCompleted && (
                    <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">All done!</span>
                    </div>
                )}
            </div>

            {/* Important notice */}
            <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                    <p className="text-orange-400 font-medium mb-1">Before you start</p>
                    <ul className="text-orange-300 space-y-1">
                        <li>• Make sure you have enough SOL for transaction fees (~0.01 SOL per tx)</li>
                        <li>• You&apos;ll need the assets (USDC, SOL, etc.) in your wallet</li>
                        <li>• Always verify the URL before connecting your wallet</li>
                    </ul>
                </div>
            </div>

            {/* Estimated time */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span>Estimated time: {allocations.length * 2}-{allocations.length * 3} minutes</span>
            </div>

            {/* Step cards */}
            <div className="space-y-3">
                {allocations.map((alloc, idx) => (
                    <StepCard
                        key={alloc.poolId}
                        step={idx + 1}
                        allocation={alloc}
                        amount={totalAmount * alloc.allocation / 100}
                        isExpanded={expandedStep === idx}
                        onToggle={() => setExpandedStep(expandedStep === idx ? -1 : idx)}
                        isCompleted={completedSteps.has(idx)}
                        onComplete={() => toggleComplete(idx)}
                    />
                ))}
            </div>

            {/* Completion message */}
            {allCompleted && (
                <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-white mb-2">
                        Congratulations! 🎉
                    </h3>
                    <p className="text-slate-400 mb-4">
                        You&apos;ve successfully deployed your allocation. Your yields will start accruing immediately.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-sm text-slate-400">
                        <Shield className="h-4 w-4 text-green-400" />
                        Remember: You can withdraw anytime, no lock-up periods
                    </div>
                </div>
            )}
        </div>
    );
}
