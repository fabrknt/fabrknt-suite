"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { RiskTolerance } from "@/components/curate/quick-start";
import { AllocationRecommendation, RecommendedAllocation } from "@/components/curate/recommendation-display";

interface AllocationContextType {
    // The user's allocation from Get Started
    allocation: AllocationRecommendation | null;
    riskTolerance: RiskTolerance | null;

    // Actions
    setAllocation: (allocation: AllocationRecommendation, risk: RiskTolerance) => void;
    clearAllocation: () => void;

    // Helpers
    hasAllocation: boolean;
    isPoolInAllocation: (poolId: string) => boolean;
    getPoolAllocation: (poolId: string) => RecommendedAllocation | undefined;
    getAllocatedPoolIds: () => string[];
}

const AllocationContext = createContext<AllocationContextType | null>(null);

export function AllocationProvider({ children }: { children: ReactNode }) {
    const [allocation, setAllocationState] = useState<AllocationRecommendation | null>(null);
    const [riskTolerance, setRiskTolerance] = useState<RiskTolerance | null>(null);

    const setAllocation = useCallback((newAllocation: AllocationRecommendation, risk: RiskTolerance) => {
        setAllocationState(newAllocation);
        setRiskTolerance(risk);
    }, []);

    const clearAllocation = useCallback(() => {
        setAllocationState(null);
        setRiskTolerance(null);
    }, []);

    const isPoolInAllocation = useCallback((poolId: string) => {
        if (!allocation) return false;
        return allocation.allocations.some(a => a.poolId === poolId);
    }, [allocation]);

    const getPoolAllocation = useCallback((poolId: string) => {
        if (!allocation) return undefined;
        return allocation.allocations.find(a => a.poolId === poolId);
    }, [allocation]);

    const getAllocatedPoolIds = useCallback(() => {
        if (!allocation) return [];
        return allocation.allocations.map(a => a.poolId);
    }, [allocation]);

    return (
        <AllocationContext.Provider
            value={{
                allocation,
                riskTolerance,
                setAllocation,
                clearAllocation,
                hasAllocation: allocation !== null,
                isPoolInAllocation,
                getPoolAllocation,
                getAllocatedPoolIds,
            }}
        >
            {children}
        </AllocationContext.Provider>
    );
}

export function useAllocation() {
    const context = useContext(AllocationContext);
    if (!context) {
        throw new Error("useAllocation must be used within an AllocationProvider");
    }
    return context;
}

// Optional hook that doesn't throw if used outside provider
export function useAllocationOptional() {
    return useContext(AllocationContext);
}
