"use client";

import { useState, useEffect, useMemo } from "react";
import { Lightbulb, X, ChevronRight, Sparkles } from "lucide-react";

interface PoolData {
    id: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apy: number;
    apyBase: number;
    apyReward: number;
    riskScore: number;
    riskLevel: string;
    stablecoin: boolean;
    category?: string;
}

interface DiscoveryPrompt {
    id: string;
    question: string;
    context: string;
    explanation: string[];
    poolId?: string;
    priority: number;
}

interface DiscoveryPromptsProps {
    pools: PoolData[];
    onExplore?: (poolId: string) => void;
}

function generateDiscoveryPrompts(pools: PoolData[]): DiscoveryPrompt[] {
    const prompts: DiscoveryPrompt[] = [];

    // Find interesting patterns
    const highApyLowRisk = pools.filter(p => p.apy > 15 && p.riskScore < 35);
    const highApyStable = pools.filter(p => p.stablecoin && p.apy > 8);
    const lowRewardDependency = pools.filter(p => {
        const baseRatio = p.apy > 0 ? (p.apyBase / p.apy) * 100 : 0;
        return baseRatio > 70 && p.apy > 5;
    });
    const restakingPools = pools.filter(p => p.category === "restaking");
    const perpLpPools = pools.filter(p => p.category === "perp_lp");
    const veryHighApy = pools.filter(p => p.apy > 30);

    // High APY but low risk - anomaly
    if (highApyLowRisk.length > 0) {
        const pool = highApyLowRisk[0];
        prompts.push({
            id: "high-apy-low-risk",
            question: `${pool.project} has ${pool.apy.toFixed(1)}% APY but only ${pool.riskScore} risk score. Why isn't high APY = high risk?`,
            context: `${pool.symbol} seems too good to be true`,
            explanation: [
                pool.category === "perp_lp"
                    ? "APY comes from real trading fees, not emissions"
                    : "APY may be from organic sources, not token emissions",
                pool.tvlUsd > 100_000_000
                    ? "High TVL ($" + (pool.tvlUsd / 1e6).toFixed(0) + "M) reduces liquidity risk"
                    : "Established protocol with track record",
                "Not all high APY is unsustainable - source matters",
            ],
            poolId: pool.id,
            priority: 1,
        });
    }

    // Stablecoin with good APY
    if (highApyStable.length > 0) {
        const pool = highApyStable[0];
        prompts.push({
            id: "stable-high-apy",
            question: `Stablecoins earning ${pool.apy.toFixed(1)}% on ${pool.project}. Is this sustainable?`,
            context: "High stablecoin yields often come with hidden risks",
            explanation: [
                `Base APY: ${pool.apyBase.toFixed(1)}% | Reward APY: ${pool.apyReward.toFixed(1)}%`,
                pool.apyReward > pool.apyBase
                    ? "Majority from rewards - may decrease when emissions end"
                    : "Mostly organic yield from lending demand",
                "Compare with other stablecoin pools to gauge sustainability",
            ],
            poolId: pool.id,
            priority: 2,
        });
    }

    // Low reward dependency = sustainable
    if (lowRewardDependency.length > 0) {
        const pool = lowRewardDependency[0];
        const baseRatio = (pool.apyBase / pool.apy) * 100;
        prompts.push({
            id: "sustainable-yield",
            question: `${pool.project} gets ${baseRatio.toFixed(0)}% of yield from base APY. What does this mean?`,
            context: "Sustainability matters for long-term positions",
            explanation: [
                "Base APY comes from real protocol revenue (fees, interest)",
                "Reward APY depends on token emissions which can end",
                `${pool.project} is less dependent on rewards = more sustainable`,
            ],
            poolId: pool.id,
            priority: 3,
        });
    }

    // Restaking explanation
    if (restakingPools.length > 0) {
        const pool = restakingPools[0];
        prompts.push({
            id: "restaking-intro",
            question: `What is "restaking" and why does ${pool.project} offer ${pool.apy.toFixed(1)}% APY?`,
            context: "New yield primitive on Solana",
            explanation: [
                "Restaking = using staked assets to secure additional networks (NCNs)",
                "You earn: base staking APY + MEV rewards + NCN rewards",
                "Higher complexity, but no impermanent loss risk",
                "Newer than traditional DeFi - verify protocol security",
            ],
            poolId: pool.id,
            priority: 2,
        });
    }

    // Perp LP explanation
    if (perpLpPools.length > 0) {
        const pool = perpLpPools[0];
        prompts.push({
            id: "perp-lp-intro",
            question: `${pool.apy.toFixed(0)}% APY from perpetual exchange LP. How?`,
            context: "Different from traditional LP",
            explanation: [
                "You provide liquidity for perpetual trading (longs/shorts)",
                "Earn ~75% of all trading fees from the exchange",
                "Exposed to multiple assets (SOL, ETH, BTC, stables)",
                "No IL in traditional sense, but exposure to trader PnL",
            ],
            poolId: pool.id,
            priority: 2,
        });
    }

    // Very high APY warning
    if (veryHighApy.length > 0) {
        const pool = veryHighApy[0];
        const rewardRatio = pool.apy > 0 ? (pool.apyReward / pool.apy) * 100 : 0;
        if (rewardRatio > 70) {
            prompts.push({
                id: "high-apy-warning",
                question: `${pool.apy.toFixed(0)}% APY on ${pool.project}. What's the catch?`,
                context: "Understanding where yield comes from",
                explanation: [
                    `${rewardRatio.toFixed(0)}% of this APY is from token rewards`,
                    "Token price can drop, reducing real returns",
                    "Emissions often decrease over time",
                    "Consider: what's the APY without rewards?",
                ],
                poolId: pool.id,
                priority: 1,
            });
        }
    }

    // Sort by priority
    return prompts.sort((a, b) => a.priority - b.priority);
}

export function DiscoveryPrompts({ pools, onExplore }: DiscoveryPromptsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dismissed, setDismissed] = useState<Set<string>>(new Set());
    const [expanded, setExpanded] = useState(false);

    const prompts = useMemo(() => generateDiscoveryPrompts(pools), [pools]);
    const visiblePrompts = prompts.filter(p => !dismissed.has(p.id));
    const currentPrompt = visiblePrompts[currentIndex % visiblePrompts.length];

    // Rotate prompts every 30 seconds
    useEffect(() => {
        if (visiblePrompts.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(i => (i + 1) % visiblePrompts.length);
            setExpanded(false);
        }, 30000);
        return () => clearInterval(interval);
    }, [visiblePrompts.length]);

    if (!currentPrompt || visiblePrompts.length === 0) {
        return null;
    }

    const handleDismiss = () => {
        setDismissed(prev => new Set([...prev, currentPrompt.id]));
        setExpanded(false);
    };

    const handleNext = () => {
        setCurrentIndex(i => (i + 1) % visiblePrompts.length);
        setExpanded(false);
    };

    return (
        <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-purple-500/10">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span className="text-xs font-medium text-purple-300">Did you notice?</span>
                </div>
                <div className="flex items-center gap-1">
                    {visiblePrompts.length > 1 && (
                        <span className="text-xs text-slate-500">
                            {currentIndex % visiblePrompts.length + 1}/{visiblePrompts.length}
                        </span>
                    )}
                    <button
                        onClick={handleDismiss}
                        className="p-1 text-slate-500 hover:text-white transition-colors"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full text-left"
                >
                    <p className="text-sm text-white font-medium mb-1">
                        &ldquo;{currentPrompt.question}&rdquo;
                    </p>
                    <p className="text-xs text-slate-400">{currentPrompt.context}</p>
                </button>

                {/* Expanded explanation */}
                {expanded && (
                    <div className="mt-3 space-y-2 border-t border-slate-700/50 pt-3">
                        {currentPrompt.explanation.map((point, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <Lightbulb className="h-3 w-3 text-cyan-400 mt-1 flex-shrink-0" />
                                <p className="text-xs text-slate-300">{point}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-3">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                        {expanded ? "Hide" : "Explore"}
                        <ChevronRight className={`h-3 w-3 transition-transform ${expanded ? "rotate-90" : ""}`} />
                    </button>
                    <div className="flex items-center gap-2">
                        {currentPrompt.poolId && onExplore && (
                            <button
                                onClick={() => onExplore(currentPrompt.poolId!)}
                                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                View pool
                            </button>
                        )}
                        {visiblePrompts.length > 1 && (
                            <button
                                onClick={handleNext}
                                className="text-xs text-slate-500 hover:text-white transition-colors"
                            >
                                Next →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
