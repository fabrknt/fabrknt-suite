"use client";

import { useAllocation } from "@/contexts/allocation-context";
import { Zap, ArrowRight, X } from "lucide-react";
import { useState } from "react";

interface AllocationBannerProps {
    onNavigateToAllocation: () => void;
}

export function AllocationBanner({ onNavigateToAllocation }: AllocationBannerProps) {
    const { allocation, hasAllocation, riskTolerance } = useAllocation();
    const [dismissed, setDismissed] = useState(false);

    if (!hasAllocation || !allocation || dismissed) {
        return null;
    }

    const { summary, allocations } = allocation;

    return (
        <div className="relative bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-3 mb-4">
            <button
                onClick={() => setDismissed(true)}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white transition-colors"
                aria-label="Dismiss"
            >
                <X className="h-3 w-3" />
            </button>

            <div className="flex items-center justify-between gap-4 pr-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-sm text-white font-medium">
                            Your allocation: {allocations.length} pools, ~{summary.expectedApy.toFixed(1)}% APY
                        </p>
                        <p className="text-xs text-slate-400">
                            ${summary.totalAmount.toLocaleString()} • {riskTolerance} risk
                        </p>
                    </div>
                </div>

                <button
                    onClick={onNavigateToAllocation}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-sm text-cyan-400 transition-colors whitespace-nowrap"
                >
                    View allocation
                    <ArrowRight className="h-3 w-3" />
                </button>
            </div>
        </div>
    );
}
