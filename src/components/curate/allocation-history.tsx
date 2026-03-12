"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
    History,
    ChevronDown,
    CheckCircle,
    Clock,
    Trash2,
    RotateCcw,
    Save,
    TrendingUp,
    Shield,
    Calendar,
    StickyNote,
    X,
} from "lucide-react";
import { useAllocation } from "@/contexts/allocation-context";
import { RiskTolerance } from "./quick-start";

interface AllocationHistoryItem {
    id: string;
    riskTolerance: RiskTolerance;
    amount: number;
    allocations: Array<{
        poolId: string;
        poolName: string;
        protocol: string;
        asset: string;
        allocation: number;
        apy: number;
        riskScore: number;
    }>;
    expectedApy: number;
    weightedRiskScore: number;
    notes: string | null;
    isActive: boolean;
    createdAt: string;
}

const RISK_LABELS: Record<RiskTolerance, string> = {
    preserver: "Preserver",
    steady: "Steady",
    balanced: "Balanced",
    growth: "Growth",
    maximizer: "Maximizer",
};

const RISK_COLORS: Record<RiskTolerance, string> = {
    preserver: "text-green-400 bg-green-500/10 border-green-500/30",
    steady: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    balanced: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    growth: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    maximizer: "text-red-400 bg-red-500/10 border-red-500/30",
};

function formatCurrency(amount: number): string {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
    return `$${amount.toFixed(0)}`;
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function HistoryItem({
    item,
    onRestore,
    onDelete,
    onAddNote,
}: {
    item: AllocationHistoryItem;
    onRestore: (id: string) => void;
    onDelete: (id: string) => void;
    onAddNote: (id: string, note: string) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [noteText, setNoteText] = useState(item.notes || "");

    const handleSaveNote = () => {
        onAddNote(item.id, noteText);
        setIsEditing(false);
    };

    return (
        <div className={`bg-slate-800/50 rounded-lg border ${item.isActive ? "border-cyan-500/30" : "border-slate-700/50"}`}>
            {/* Header */}
            <div
                className="p-3 cursor-pointer hover:bg-slate-800/70 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {item.isActive ? (
                            <CheckCircle className="h-4 w-4 text-cyan-400" />
                        ) : (
                            <Clock className="h-4 w-4 text-slate-500" />
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-0.5 rounded border ${RISK_COLORS[item.riskTolerance]}`}>
                                    {RISK_LABELS[item.riskTolerance]}
                                </span>
                                {item.isActive && (
                                    <span className="text-xs text-cyan-400">Active</span>
                                )}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                <span>{formatCurrency(item.amount)}</span>
                                <span className="flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    {item.expectedApy.toFixed(1)}% APY
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{formatDate(item.createdAt)}</span>
                        <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-3 pb-3 border-t border-slate-700/50">
                    {/* Allocations */}
                    <div className="pt-3 space-y-1.5">
                        {item.allocations.map((alloc, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-300">{alloc.poolName}</span>
                                    <span className="text-xs text-slate-500">{alloc.protocol}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400">{alloc.apy.toFixed(1)}%</span>
                                    <span className="text-white font-medium">{alloc.allocation}%</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Notes */}
                    <div className="mt-3 pt-3 border-t border-slate-700/30">
                        {isEditing ? (
                            <div className="space-y-2">
                                <textarea
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    placeholder="Add a note about this allocation..."
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                                    rows={2}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSaveNote}
                                        className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs hover:bg-cyan-500/30 transition-colors"
                                    >
                                        <Save className="h-3 w-3" />
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setNoteText(item.notes || "");
                                        }}
                                        className="flex items-center gap-1 px-2 py-1 text-slate-400 rounded text-xs hover:text-white transition-colors"
                                    >
                                        <X className="h-3 w-3" />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : item.notes ? (
                            <div
                                className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer hover:text-slate-300"
                                onClick={() => setIsEditing(true)}
                            >
                                <StickyNote className="h-3 w-3 shrink-0 mt-0.5" />
                                <span>{item.notes}</span>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                <StickyNote className="h-3 w-3" />
                                Add note
                            </button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center gap-2">
                        {!item.isActive && (
                            <button
                                onClick={() => onRestore(item.id)}
                                className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs hover:bg-cyan-500/30 transition-colors"
                            >
                                <RotateCcw className="h-3 w-3" />
                                Restore
                            </button>
                        )}
                        <button
                            onClick={() => onDelete(item.id)}
                            className="flex items-center gap-1 px-2 py-1 text-red-400 hover:bg-red-500/20 rounded text-xs transition-colors"
                        >
                            <Trash2 className="h-3 w-3" />
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export function AllocationHistory() {
    const { data: session } = useSession();
    const { allocation, riskTolerance, hasAllocation } = useAllocation();
    const [history, setHistory] = useState<AllocationHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const fetchHistory = async () => {
        if (!session?.user) return;

        setIsLoading(true);
        try {
            const response = await fetch("/api/curate/allocation-history?limit=20");
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setHistory(data.data.history);
                }
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user) {
            fetchHistory();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user]);

    const handleSaveCurrentAllocation = async () => {
        if (!allocation || !session?.user) return;

        setIsSaving(true);
        try {
            const response = await fetch("/api/curate/allocation-history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    riskTolerance,
                    amount: allocation.summary.totalAmount,
                    allocations: allocation.allocations.map(a => ({
                        poolId: a.poolId,
                        poolName: a.poolName,
                        protocol: a.protocol,
                        asset: a.asset,
                        allocation: a.allocation,
                        apy: a.apy,
                        riskScore: a.riskScore,
                    })),
                    expectedApy: allocation.summary.expectedApy,
                    weightedRiskScore: allocation.allocations.reduce(
                        (sum, a) => sum + (a.riskScore * a.allocation / 100),
                        0
                    ),
                }),
            });

            if (response.ok) {
                fetchHistory();
            }
        } catch (error) {
            console.error("Failed to save allocation:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleRestore = async (id: string) => {
        try {
            const response = await fetch("/api/curate/allocation-history", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, setActive: true }),
            });

            if (response.ok) {
                fetchHistory();
            }
        } catch (error) {
            console.error("Failed to restore allocation:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/curate/allocation-history?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchHistory();
            }
        } catch (error) {
            console.error("Failed to delete allocation:", error);
        }
    };

    const handleAddNote = async (id: string, notes: string) => {
        try {
            const response = await fetch("/api/curate/allocation-history", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, notes }),
            });

            if (response.ok) {
                fetchHistory();
            }
        } catch (error) {
            console.error("Failed to add note:", error);
        }
    };

    if (!session?.user) {
        return null;
    }

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl overflow-hidden">
            {/* Header */}
            <div
                className="p-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <History className="h-5 w-5 text-purple-400" />
                        <div>
                            <h3 className="text-white font-semibold">Allocation History</h3>
                            <p className="text-xs text-slate-400">
                                {history.length} saved allocation{history.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {hasAllocation && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveCurrentAllocation();
                                }}
                                disabled={isSaving}
                                className="flex items-center gap-1 px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm hover:bg-purple-500/30 transition-colors disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                {isSaving ? "Saving..." : "Save Current"}
                            </button>
                        )}
                        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-700/50">
                    {isLoading ? (
                        <div className="py-8 text-center text-slate-400">Loading history...</div>
                    ) : history.length === 0 ? (
                        <div className="py-8 text-center">
                            <Calendar className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                            <p className="text-slate-400 text-sm">No saved allocations yet</p>
                            <p className="text-slate-500 text-xs mt-1">
                                Save your current allocation to track it over time
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3 pt-4">
                            {history.map(item => (
                                <HistoryItem
                                    key={item.id}
                                    item={item}
                                    onRestore={handleRestore}
                                    onDelete={handleDelete}
                                    onAddNote={handleAddNote}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
