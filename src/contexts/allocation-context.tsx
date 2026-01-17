"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { RiskTolerance } from "@/components/curate/quick-start";
import { AllocationRecommendation, RecommendedAllocation } from "@/components/curate/recommendation-display";

const STORAGE_KEY = "fabrknt_paper_portfolio";
const HISTORY_KEY = "fabrknt_paper_history";

// Paper portfolio entry for history tracking
export interface PaperPortfolioEntry {
    id: string;
    allocation: AllocationRecommendation;
    riskTolerance: RiskTolerance;
    createdAt: string;
    notes?: string;
}

interface AllocationContextType {
    // The user's allocation from Get Started
    allocation: AllocationRecommendation | null;
    riskTolerance: RiskTolerance | null;

    // Actions
    setAllocation: (allocation: AllocationRecommendation, risk: RiskTolerance) => void;
    clearAllocation: () => void;

    // Paper portfolio history (localStorage)
    paperHistory: PaperPortfolioEntry[];
    saveToPaperHistory: (notes?: string) => void;
    deleteFromPaperHistory: (id: string) => void;
    restoreFromPaperHistory: (id: string) => void;

    // Helpers
    hasAllocation: boolean;
    isPoolInAllocation: (poolId: string) => boolean;
    getPoolAllocation: (poolId: string) => RecommendedAllocation | undefined;
    getAllocatedPoolIds: () => string[];
}

const AllocationContext = createContext<AllocationContextType | null>(null);

// Helper to safely access localStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function saveToStorage<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Storage full or unavailable
    }
}

function removeFromStorage(key: string): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(key);
    } catch {
        // Storage unavailable
    }
}

export function AllocationProvider({ children }: { children: ReactNode }) {
    const [allocation, setAllocationState] = useState<AllocationRecommendation | null>(null);
    const [riskTolerance, setRiskToleranceState] = useState<RiskTolerance | null>(null);
    const [paperHistory, setPaperHistory] = useState<PaperPortfolioEntry[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedPortfolio = getFromStorage<{ allocation: AllocationRecommendation; riskTolerance: RiskTolerance } | null>(STORAGE_KEY, null);
        if (savedPortfolio) {
            setAllocationState(savedPortfolio.allocation);
            setRiskToleranceState(savedPortfolio.riskTolerance);
        }

        const savedHistory = getFromStorage<PaperPortfolioEntry[]>(HISTORY_KEY, []);
        setPaperHistory(savedHistory);

        setIsHydrated(true);
    }, []);

    const setAllocation = useCallback((newAllocation: AllocationRecommendation, risk: RiskTolerance) => {
        setAllocationState(newAllocation);
        setRiskToleranceState(risk);
        // Persist to localStorage
        saveToStorage(STORAGE_KEY, { allocation: newAllocation, riskTolerance: risk });
    }, []);

    const clearAllocation = useCallback(() => {
        setAllocationState(null);
        setRiskToleranceState(null);
        removeFromStorage(STORAGE_KEY);
    }, []);

    // Save current allocation to paper history
    const saveToPaperHistory = useCallback((notes?: string) => {
        if (!allocation || !riskTolerance) return;

        const entry: PaperPortfolioEntry = {
            id: `paper_${Date.now()}`,
            allocation,
            riskTolerance,
            createdAt: new Date().toISOString(),
            notes,
        };

        const newHistory = [entry, ...paperHistory].slice(0, 10); // Keep last 10
        setPaperHistory(newHistory);
        saveToStorage(HISTORY_KEY, newHistory);
    }, [allocation, riskTolerance, paperHistory]);

    // Delete from paper history
    const deleteFromPaperHistory = useCallback((id: string) => {
        const newHistory = paperHistory.filter(entry => entry.id !== id);
        setPaperHistory(newHistory);
        saveToStorage(HISTORY_KEY, newHistory);
    }, [paperHistory]);

    // Restore allocation from paper history
    const restoreFromPaperHistory = useCallback((id: string) => {
        const entry = paperHistory.find(e => e.id === id);
        if (entry) {
            setAllocationState(entry.allocation);
            setRiskToleranceState(entry.riskTolerance);
            saveToStorage(STORAGE_KEY, { allocation: entry.allocation, riskTolerance: entry.riskTolerance });
        }
    }, [paperHistory]);

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
                paperHistory,
                saveToPaperHistory,
                deleteFromPaperHistory,
                restoreFromPaperHistory,
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
