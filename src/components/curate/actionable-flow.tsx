"use client";

import { useState } from "react";
import { QuickStart, RiskTolerance } from "./quick-start";
import {
    RecommendationDisplay,
    AllocationRecommendation,
} from "./recommendation-display";
import { ExecutionSteps } from "./execution-steps";
import { generateRecommendation } from "@/lib/curate/recommendation-engine";
import {
    ArrowLeft,
    CheckCircle,
    Circle,
    Lightbulb,
    BookOpen,
    ChevronRight,
} from "lucide-react";

type FlowStep = "input" | "recommendation" | "execution";

interface ActionableFlowProps {
    onExplore?: () => void; // Callback to switch to explore mode
    onLearn?: () => void;   // Callback to switch to learn mode
}

export function ActionableFlow({ onExplore, onLearn }: ActionableFlowProps) {
    const [step, setStep] = useState<FlowStep>("input");
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState<number>(0);
    const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>("moderate");
    const [recommendation, setRecommendation] = useState<AllocationRecommendation | null>(null);

    const handleSubmit = async (inputAmount: number, risk: RiskTolerance) => {
        setIsLoading(true);
        setAmount(inputAmount);
        setRiskTolerance(risk);

        // Simulate a brief loading state for UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate recommendation
        const rec = generateRecommendation(inputAmount, risk);
        setRecommendation(rec);
        setStep("recommendation");
        setIsLoading(false);
    };

    const handleViewDetails = (poolId: string) => {
        // Could navigate to pool details or expand pool info
        console.log("View details for pool:", poolId);
    };

    const handleReset = () => {
        setStep("input");
        setRecommendation(null);
    };

    const handleProceedToExecution = () => {
        setStep("execution");
    };

    // Progress indicator
    const steps: { key: FlowStep; label: string }[] = [
        { key: "input", label: "Your Preferences" },
        { key: "recommendation", label: "Your Allocation" },
        { key: "execution", label: "Execute" },
    ];

    const currentStepIndex = steps.findIndex(s => s.key === step);

    return (
        <div className="min-h-[80vh] py-8">
            {/* Progress Steps */}
            <div className="max-w-2xl mx-auto mb-8 px-4">
                <div className="flex items-center justify-between relative">
                    {/* Progress line */}
                    <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-700" />
                    <div
                        className="absolute left-0 top-4 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((s, idx) => (
                        <div key={s.key} className="relative flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                idx < currentStepIndex
                                    ? "bg-green-500 text-white"
                                    : idx === currentStepIndex
                                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                                    : "bg-slate-800 border-2 border-slate-600 text-slate-500"
                            }`}>
                                {idx < currentStepIndex ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    <span className="text-sm font-medium">{idx + 1}</span>
                                )}
                            </div>
                            <span className={`text-xs mt-2 ${
                                idx <= currentStepIndex ? "text-white" : "text-slate-500"
                            }`}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Back button */}
            {step !== "input" && (
                <div className="max-w-3xl mx-auto mb-4 px-4">
                    <button
                        onClick={() => setStep(step === "execution" ? "recommendation" : "input")}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                </div>
            )}

            {/* Main Content */}
            <div className="px-4">
                {step === "input" && (
                    <>
                        <QuickStart onSubmit={handleSubmit} isLoading={isLoading} />

                        {/* Alternative paths */}
                        <div className="max-w-2xl mx-auto mt-12 pt-8 border-t border-slate-800">
                            <p className="text-center text-sm text-slate-500 mb-4">
                                Want to explore on your own?
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {onExplore && (
                                    <button
                                        onClick={onExplore}
                                        className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors text-left"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                            <Lightbulb className="h-5 w-5 text-cyan-400" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-medium text-white">Browse Pools</span>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Explore 200+ yield opportunities
                                            </p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-slate-500" />
                                    </button>
                                )}
                                {onLearn && (
                                    <button
                                        onClick={onLearn}
                                        className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors text-left"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                            <BookOpen className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-medium text-white">Learn Curation</span>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Understand how curators think
                                            </p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-slate-500" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {step === "recommendation" && recommendation && (
                    <>
                        <RecommendationDisplay
                            recommendation={recommendation}
                            riskTolerance={riskTolerance}
                            onReset={handleReset}
                            onViewDetails={handleViewDetails}
                        />

                        {/* Proceed to execution */}
                        <div className="max-w-3xl mx-auto mt-8 text-center">
                            <button
                                onClick={handleProceedToExecution}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-xl transition-all"
                            >
                                Ready to Execute
                                <ChevronRight className="h-5 w-5" />
                            </button>
                            <p className="text-xs text-slate-500 mt-3">
                                We&apos;ll show you step-by-step instructions
                            </p>
                        </div>
                    </>
                )}

                {step === "execution" && recommendation && (
                    <ExecutionSteps
                        allocations={recommendation.allocations}
                        totalAmount={amount}
                    />
                )}
            </div>
        </div>
    );
}
