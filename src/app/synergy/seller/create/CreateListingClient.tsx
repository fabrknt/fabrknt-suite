"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { TypeSelectionStep } from "@/components/forms/listing/type-selection-step";
import { BasicInfoStep } from "@/components/forms/listing/basic-info-step";
import { MetricsStep } from "@/components/forms/listing/metrics-step";
import { DealTermsStep } from "@/components/forms/listing/deal-terms-step";
import { IndexLinkStep } from "@/components/forms/listing/index-link-step";
import type {
    CreateListingInput,
    ListingTypeEnum,
} from "@/lib/schemas/listing";
import { z } from "zod";

export function CreateListingClient() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { isConnected, isLoading: authLoading } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent SSR issues by not rendering until mounted
    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<CreateListingInput>>({});

    const totalSteps = 5;

    // Redirect if not connected
    if (!authLoading && !isConnected) {
        router.push("/synergy?error=wallet_required");
        return null;
    }

    const updateFormData = (data: Partial<CreateListingInput>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/listings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to create listing");
            }

            const listing = await response.json();
            router.push(`/synergy/seller/listings/${listing.id}`);
        } catch (error) {
            console.error("Failed to create listing:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to create listing"
            );
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <TypeSelectionStep
                        defaultValues={formData}
                        onNext={(data) => {
                            updateFormData(data);
                            handleNext();
                        }}
                    />
                );
            case 2:
                return (
                    <BasicInfoStep
                        defaultValues={formData}
                        onNext={(data) => {
                            updateFormData(data);
                            handleNext();
                        }}
                        onPrevious={handlePrevious}
                    />
                );
            case 3:
                return (
                    <MetricsStep
                        listingType={
                            formData.type as z.infer<typeof ListingTypeEnum>
                        }
                        defaultValues={formData}
                        onNext={(data) => {
                            updateFormData(data);
                            handleNext();
                        }}
                        onPrevious={handlePrevious}
                    />
                );
            case 4:
                return (
                    <DealTermsStep
                        defaultValues={formData}
                        onNext={(data) => {
                            updateFormData(data);
                            handleNext();
                        }}
                        onPrevious={handlePrevious}
                    />
                );
            case 5:
                return (
                    <IndexLinkStep
                        defaultValues={formData}
                        onSubmit={(data) => {
                            updateFormData(data);
                            handleSubmit();
                        }}
                        onPrevious={handlePrevious}
                    />
                );
            default:
                return null;
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container max-w-4xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Create New Listing
                    </h1>
                    <p className="text-muted-foreground">
                        List your project for acquisition, investment, or
                        partnership opportunities
                    </p>
                </div>

                {/* Demo Mode Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                            <div className="relative flex h-3 w-3 mt-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-amber-900 mb-1">
                                Demo Mode Active
                            </h3>
                            <p className="text-sm text-amber-800">
                                This form is functional and will create a listing in the database for demonstration purposes.
                                In production, listings will be verified and require connection to a wallet with appropriate permissions.
                                All data entered here is for testing only.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {Array.from(
                            { length: totalSteps },
                            (_, i) => i + 1
                        ).map((step) => (
                            <div
                                key={step}
                                className="flex flex-col items-center flex-1"
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                        step === currentStep
                                            ? "bg-purple-600 text-white"
                                            : step < currentStep
                                            ? "bg-purple-600 text-white"
                                            : "bg-muted text-muted-foreground"
                                    }`}
                                >
                                    {step}
                                </div>
                                <div className="text-xs mt-2 text-center">
                                    {step === 1 && "Type"}
                                    {step === 2 && "Info"}
                                    {step === 3 && "Metrics"}
                                    {step === 4 && "Terms"}
                                    {step === 5 && "Index"}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-purple-600 transition-all duration-300"
                            style={{
                                width: `${(currentStep / totalSteps) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Form Steps */}
                <div className="bg-card border border-border rounded-lg p-6">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
}
