"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DiscoveryGrid } from "./discovery-grid";
import { DiscoveryFilters, type FilterState } from "./discovery-filters";
import { OpportunityCardData } from "./opportunity-card";
import { TrendingUp, Users, MessageCircle, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfessionalDiscoveryProps {
  userCompanySlug: string;
  userCompanyName: string;
  userCompanyCategory: string;
  opportunities: OpportunityCardData[];
  existingSwipes: string[];
}

export function ProfessionalDiscovery({
  userCompanySlug,
  userCompanyName,
  userCompanyCategory,
  opportunities,
  existingSwipes: initialSwipes,
}: ProfessionalDiscoveryProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [existingSwipes, setExistingSwipes] = useState(initialSwipes);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    opportunityType: "all",
    minScore: 0,
    sortBy: "score",
  });

  const handleSwipe = async (partnerSlug: string, action: "interested" | "passed" | "saved") => {
    try {
      const response = await fetch("/api/synergy/swipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companySlug: userCompanySlug,
          partnerSlug,
          action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to record action");
      }

      // Add to swiped list
      setExistingSwipes((prev) => [...prev, partnerSlug]);

      // Show success message
      const actionLabels = {
        interested: "expressed interest in",
        passed: "passed on",
        saved: "saved",
      };

      const partner = opportunities.find((p) => p.partnerSlug === partnerSlug);

      toast({
        title: data.isMatch ? "🎉 It's a Match!" : `${actionLabels[action]} ${partner?.partnerName}`,
        description: data.isMatch
          ? `You and ${partner?.partnerName} are both interested! Check your matches to start a conversation.`
          : undefined,
        duration: data.isMatch ? 5000 : 3000,
      });

      // If it's a match, refresh to show updated match count
      if (data.isMatch) {
        setTimeout(() => router.refresh(), 1000);
      }
    } catch (error) {
      console.error("Error recording action:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to record action",
        variant: "destructive",
      });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      opportunityType: "all",
      minScore: 0,
      sortBy: "score",
    });
  };

  // Filter and sort opportunities
  const filteredOpportunities = useMemo(() => {
    let filtered = [...opportunities];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.partnerName.toLowerCase().includes(searchLower) ||
          p.compatibility.synergy.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(
        (p) => p.partnerCategory.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Opportunity type filter
    if (filters.opportunityType !== "all") {
      filtered = filtered.filter(
        (p) => p.opportunityType.toLowerCase().replace(" ", "-") === filters.opportunityType
      );
    }

    // Score filter
    if (filters.minScore > 0) {
      filtered = filtered.filter((p) => p.matchScore >= filters.minScore);
    }

    // Sort
    switch (filters.sortBy) {
      case "alphabetical":
        filtered.sort((a, b) => a.partnerName.localeCompare(b.partnerName));
        break;
      case "tvl":
        filtered.sort((a, b) => (b.metrics?.tvl || 0) - (a.metrics?.tvl || 0));
        break;
      case "users":
        filtered.sort((a, b) => (b.metrics?.users || 0) - (a.metrics?.users || 0));
        break;
      case "score":
      default:
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
    }

    return filtered;
  }, [opportunities, filters]);

  // Calculate stats
  const stats = useMemo(() => {
    const availableOpportunities = opportunities.filter(
      (p) => !existingSwipes.includes(p.partnerSlug)
    );
    const savedCount = existingSwipes.length; // This is a simplified count

    return {
      totalMatches: availableOpportunities.length,
      avgScore: Math.round(
        availableOpportunities.reduce((sum, p) => sum + p.matchScore, 0) /
          (availableOpportunities.length || 1)
      ),
      savedCount: 0, // Would need to query actual saved swipes
      activeChats: 0, // Would need to query actual matches
    };
  }, [opportunities, existingSwipes]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground">
            Synergy Discovery
          </h1>
          <a
            href="/synergy/connections"
            className="px-4 py-2 bg-cyan-400 text-slate-950 rounded-lg hover:bg-cyan-300 transition-all font-bold text-sm border border-cyan-300 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
          >
            View Connections →
          </a>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {userCompanyName}
        </p>
        <p className="text-muted-foreground">
          Discover AI-powered synergy opportunities with verified companies
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground font-mono">
                {stats.totalMatches}
              </p>
              <p className="text-sm text-muted-foreground">Recommendations</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground font-mono">
                  {stats.avgScore}
                </p>
                <p className="text-sm text-muted-foreground">Avg Match Score</p>
              </div>
            </div>
          </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
              <Users className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground font-mono">
                {existingSwipes.length}
              </p>
              <p className="text-sm text-muted-foreground">Reviewed</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
              <MessageCircle className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground font-mono">
                {stats.activeChats}
              </p>
              <p className="text-sm text-muted-foreground">Active Chats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Data Notice */}
      <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-900 mb-1">
              Demo Data Notice
            </h3>
            <p className="text-sm text-amber-800">
              <strong>
                All synergy opportunities shown are fictional demo data for testing purposes only.
              </strong>{" "}
              These are not real companies or actual synergy opportunities. This platform is in preview mode to
              demonstrate features and functionality.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold text-foreground">Filters & Search</h2>
        </div>
        <DiscoveryFilters
          filters={filters}
          onFiltersChange={setFilters}
          onReset={handleResetFilters}
        />
      </div>

      {/* Opportunities Grid */}
      <DiscoveryGrid
        opportunities={filteredOpportunities}
        currentCompanyCategory={userCompanyCategory}
        onSwipe={handleSwipe}
        alreadySwipedSlugs={existingSwipes}
      />
    </div>
  );
}
