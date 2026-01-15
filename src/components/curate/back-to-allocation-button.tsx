"use client";

import { useAllocation } from "@/contexts/allocation-context";
import { Zap } from "lucide-react";

interface BackToAllocationButtonProps {
    currentTab: string;
    onNavigate: () => void;
}

export function BackToAllocationButton({ currentTab, onNavigate }: BackToAllocationButtonProps) {
    const { hasAllocation, allocation } = useAllocation();

    // Don't show if no allocation or already on start tab
    if (!hasAllocation || !allocation || currentTab === "start") {
        return null;
    }

    return (
        <button
            onClick={onNavigate}
            className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium rounded-full shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
        >
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Your Allocation</span>
            <span className="sm:hidden">Allocation</span>
        </button>
    );
}
