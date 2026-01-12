"use client";

import { X, GitCompare, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CompareBarProps {
    count: number;
    onCompare: () => void;
    onBacktest: () => void;
    onClear: () => void;
}

export function CompareBar({ count, onCompare, onBacktest, onClear }: CompareBarProps) {
    return (
        <AnimatePresence>
            {count >= 2 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="flex items-center gap-4 px-6 py-3 bg-slate-900 border border-slate-700 rounded-full shadow-lg shadow-black/50">
                        <span className="text-sm text-slate-300">
                            <span className="text-cyan-400 font-semibold">{count}</span> pools selected
                        </span>

                        <div className="h-4 w-px bg-slate-700" />

                        <button
                            onClick={onClear}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="h-4 w-4" />
                            Clear
                        </button>

                        <button
                            onClick={onBacktest}
                            className="flex items-center gap-2 px-4 py-1.5 bg-purple-500 hover:bg-purple-400 text-white font-medium text-sm rounded-full transition-colors"
                        >
                            <History className="h-4 w-4" />
                            Backtest
                        </button>

                        <button
                            onClick={onCompare}
                            className="flex items-center gap-2 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium text-sm rounded-full transition-colors"
                        >
                            <GitCompare className="h-4 w-4" />
                            Compare
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
