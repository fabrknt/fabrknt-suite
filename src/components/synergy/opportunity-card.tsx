"use client";

import { useState } from "react";
import { Sparkles, TrendingUp, Users, DollarSign, Check, X, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCategory, formatSubcategory } from "@/lib/utils/format";

export interface OpportunityCardData {
  partnerSlug: string;
  partnerName: string;
  partnerCategory: string;
  partnerSubcategory?: string;
  partnerChain?: string;
  partnerLogo?: string;
  partnerDescription?: string;
  matchScore: number;
  partnerOverallScore?: number;
  opportunityType: string;
  compatibility: {
    synergy: string;
    userOverlap: number;
    technicalFit: number;
  };
  projectedImpact?: {
    runwayExtension?: number;
    userGrowth?: number;
    revenueOpportunity?: number;
  };
  metrics?: {
    tvl?: number;
    users?: number;
    teamSize?: number;
  };
}

interface OpportunityCardProps {
  opportunity: OpportunityCardData;
  onAction: (action: "interested" | "passed" | "saved") => void;
  disabled?: boolean;
}

const categoryColors = {
  defi: "bg-indigo-100 text-indigo-700 border-indigo-200",
  infrastructure: "bg-blue-100 text-blue-700 border-blue-200",
  nft: "bg-pink-100 text-pink-700 border-pink-200",
  dao: "bg-emerald-100 text-emerald-700 border-emerald-200",
  gaming: "bg-orange-100 text-orange-700 border-orange-200",
};

const opportunityTypeLabels: Record<string, string> = {
  integration: "Integration",
  "co-marketing": "Co-Marketing",
  merger: "Acquisition",
  revenue_share: "Revenue Share",
  investment: "Investment",
};

const opportunityTypeColors: Record<string, string> = {
  integration: "bg-blue-50 text-blue-700 border-blue-200",
  "co-marketing": "bg-emerald-50 text-emerald-700 border-emerald-200",
  merger: "bg-rose-50 text-rose-700 border-rose-200",
  revenue_share: "bg-yellow-50 text-yellow-700 border-yellow-200",
  investment: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

function formatNumber(num: number | undefined): string {
  if (!num) return "N/A";
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

export function OpportunityCard({ opportunity, onAction, disabled = false }: OpportunityCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async (action: "interested" | "passed" | "saved") => {
    setIsProcessing(true);
    await onAction(action);
    setIsProcessing(false);
  };

  const matchScoreColor =
    opportunity.matchScore >= 85
      ? "bg-green-50 text-green-700 border-green-300"
      : opportunity.matchScore >= 70
      ? "bg-yellow-50 text-yellow-700 border-yellow-300"
      : "bg-gray-50 text-gray-700 border-gray-300";

  const categoryKey = opportunity.partnerCategory.toLowerCase() as keyof typeof categoryColors;
  const categoryColor = categoryColors[categoryKey] || categoryColors.defi;

  const typeKey = opportunity.opportunityType.toLowerCase().replace(" ", "-") as keyof typeof opportunityTypeColors;
  const typeColor = opportunityTypeColors[typeKey] || opportunityTypeColors.integration;
  const typeLabel = opportunityTypeLabels[typeKey] || opportunity.opportunityType;

  return (
    <div className="group bg-card rounded-lg border border-border p-6 transition-all hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            {opportunity.partnerLogo ? (
              <img
                src={opportunity.partnerLogo}
                alt={`${opportunity.partnerName} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-2xl font-bold text-muted-foreground">
                {opportunity.partnerName.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-cyan-400 transition-colors truncate">
              {opportunity.partnerName}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={cn("text-xs px-2 py-0.5 rounded-full border", categoryColor)}>
                {formatCategory(opportunity.partnerCategory)}
              </span>
              {opportunity.partnerSubcategory && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                  {formatSubcategory(opportunity.partnerSubcategory)}
                </span>
              )}
              <span
                className="text-xs px-2 py-0.5 rounded-full border capitalize"
                style={{
                  display: 'inline-block',
                  minWidth: '60px',
                  backgroundColor: '#dbeafe',
                  color: '#2563eb',
                  borderColor: '#93c5fd'
                }}
                data-chain={opportunity.partnerChain}
                data-debug="chain-badge"
              >
                {opportunity.partnerChain || "ethereum"}
              </span>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border", typeColor)}>
                {typeLabel}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 items-end">
          <div className={cn("px-3 py-1 rounded-full border font-bold text-sm", matchScoreColor)}>
            Match {opportunity.matchScore}
          </div>
          {opportunity.partnerOverallScore !== undefined && (
            <div className={cn(
              "px-3 py-1 rounded-full border font-bold text-xs",
              opportunity.partnerOverallScore >= 40
                ? "bg-green-50 text-green-700 border-green-300"
                : opportunity.partnerOverallScore >= 10
                ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                : "bg-red-50 text-red-700 border-red-300"
            )}>
              Score {opportunity.partnerOverallScore}
            </div>
          )}
        </div>
      </div>

      {/* Synergy Description */}
      <div className="mb-4">
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground line-clamp-2">
            {opportunity.compatibility.synergy}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      {opportunity.metrics && (
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border">
          {opportunity.metrics.tvl && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">TVL</p>
              <p className="text-sm font-semibold text-foreground">
                {formatNumber(opportunity.metrics.tvl)}
              </p>
            </div>
          )}
          {opportunity.metrics.users && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Users</p>
              <p className="text-sm font-semibold text-foreground">
                {formatNumber(opportunity.metrics.users)}
              </p>
            </div>
          )}
          {opportunity.metrics.teamSize && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Team</p>
              <p className="text-sm font-semibold text-foreground">
                {opportunity.metrics.teamSize}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Projected Impact */}
      {opportunity.projectedImpact && (
        <div className="space-y-2 mb-4 pb-4 border-b border-border">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Projected Impact
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {opportunity.projectedImpact.userGrowth && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-blue-500" />
                <span className="text-foreground font-medium">
                  +{opportunity.projectedImpact.userGrowth}%
                </span>
              </div>
            )}
            {opportunity.projectedImpact.revenueOpportunity && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-green-500" />
                <span className="text-foreground font-medium">
                  {formatNumber(opportunity.projectedImpact.revenueOpportunity)}/mo
                </span>
              </div>
            )}
            {opportunity.projectedImpact.runwayExtension && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-foreground font-medium">
                  +{opportunity.projectedImpact.runwayExtension}mo
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => handleAction("interested")}
          disabled={disabled || isProcessing}
          className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold border border-cyan-300 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
          size="sm"
        >
          <Check className="h-4 w-4 mr-1" />
          Express Interest
        </Button>
        <Button
          onClick={() => handleAction("saved")}
          disabled={disabled || isProcessing}
          variant="outline"
          size="sm"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => handleAction("passed")}
          disabled={disabled || isProcessing}
          variant="outline"
          size="sm"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
