"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { X, Heart, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PartnerCardCarousel } from "./partner-card-carousel";

interface UserCompany {
  slug: string;
  name: string;
  category: string;
  logo: string | null;
}

interface Company {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  logo: string | null;
  website: string | null;
  overallScore: number | null;
  teamHealthScore: number | null;
  growthScore: number | null;
  socialScore: number | null;
  walletQualityScore: number | null;
  trend: string | null;
  indexData: any;
}

interface PartnerMatch {
  partner: Company;
  matchScore: number;
  compatibility: {
    userOverlap: number;
    technicalFit: number;
    categoryFit: string;
    synergy: string;
  };
  projectedImpact: {
    runwayExtension: number;
    userGrowth: number;
    revenueOpportunity: number;
  };
  partnershipType: string;
  reasoning: string;
}

interface Props {
  userCompany: UserCompany;
  allCompanies: Company[];
  swipedPartners: Set<string>;
}

type PartnershipMode = "all" | "integration" | "acquisition" | "comarketing" | "investment";

export function PartnerDiscovery({ userCompany, allCompanies, swipedPartners }: Props) {
  const [matches, setMatches] = useState<PartnerMatch[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<PartnerMatch[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [mode, setMode] = useState<PartnershipMode>("all");
  const { toast } = useToast();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Visual feedback for swipe direction
  const likeOpacity = useTransform(x, [0, 50, 200], [0, 0.5, 1]);
  const passOpacity = useTransform(x, [-200, -50, 0], [1, 0.5, 0]);
  const superLikeOpacity = useTransform(y, [-200, -50, 0], [1, 0.5, 0]);

  // Load matches on mount
  useEffect(() => {
    loadMatches();
  }, []);

  // Filter matches by partnership mode
  useEffect(() => {
    if (mode === "all") {
      setFilteredMatches(matches);
    } else {
      const filtered = matches.filter((m) => {
        // Map partnership types to modes
        const typeToMode: Record<string, PartnershipMode> = {
          integration: "integration",
          merger: "acquisition",
          "co-marketing": "comarketing",
          revenue_share: "investment",
        };
        return typeToMode[m.partnershipType] === mode;
      });
      setFilteredMatches(filtered);
    }
    setCurrentIndex(0); // Reset to first card when mode changes
  }, [mode, matches]);

  async function loadMatches() {
    try {
      setLoading(true);

      // Filter out already-swiped companies
      const availableCompanies = allCompanies.filter(
        (c) => !swipedPartners.has(c.slug)
      );

      // Get matches from AI engine
      const response = await fetch("/api/partnerships/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companySlug: userCompany.slug,
          companies: availableCompanies,
          limit: 50, // Get top 50 matches
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to load matches");
      }

      const data = await response.json();
      setMatches(data.matches || []);
    } catch (error) {
      console.error("Error loading matches:", error);
      toast({
        title: "Error",
        description: "Failed to load partnership matches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSwipe(action: "interested" | "passed" | "super_like") {
    if (swiping || currentIndex >= matches.length) return;

    setSwiping(true);
    const currentMatch = matches[currentIndex];

    try {
      // Save swipe to database
      const response = await fetch("/api/partnerships/swipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companySlug: userCompany.slug,
          partnerSlug: currentMatch.partner.slug,
          action,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save swipe");
      }

      const result = await response.json();

      // Check for mutual match
      if (result.isMatch) {
        toast({
          title: "It's a Match! 🎉",
          description: `You and ${currentMatch.partner.name} are interested in partnering!`,
        });
      }

      // Move to next card
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error saving swipe:", error);
      toast({
        title: "Error",
        description: "Failed to save your choice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSwiping(false);
    }
  }

  function handleDragEnd(event: any, info: PanInfo) {
    const threshold = 100;

    // Super like (swipe up)
    if (info.offset.y < -threshold) {
      handleSwipe("super_like");
      return;
    }

    // Pass or interested (swipe left/right)
    if (Math.abs(info.offset.x) > threshold) {
      // Swipe left = pass
      if (info.offset.x < 0) {
        handleSwipe("passed");
      }
      // Swipe right = interested
      else {
        handleSwipe("interested");
      }
    } else {
      // Reset position
      x.set(0);
      y.set(0);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Finding your perfect partners...</p>
        </div>
      </div>
    );
  }

  if (filteredMatches.length === 0 || currentIndex >= filteredMatches.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold">
            {mode === "all" ? "No More Matches" : `No ${mode} Matches`}
          </h2>
          <p className="text-muted-foreground">
            {mode === "all"
              ? `You've reviewed all available partnership opportunities for ${userCompany.name}.`
              : `No ${mode} partnership opportunities available. Try a different mode.`}
          </p>
          {mode !== "all" && (
            <Button onClick={() => setMode("all")} variant="outline">
              ← View All Matches
            </Button>
          )}
          <Button asChild>
            <a href="/partnerships/matches">View My Matches →</a>
          </Button>
        </div>
      </div>
    );
  }

  const currentMatch = filteredMatches[currentIndex];
  const remainingCount = filteredMatches.length - currentIndex;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          {/* Top Row: Company Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {userCompany.logo && (
                <Image
                  src={userCompany.logo}
                  alt={userCompany.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div>
                <h1 className="font-semibold">{userCompany.name}</h1>
                <p className="text-xs text-muted-foreground">Partnership Discovery</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {remainingCount} {remainingCount === 1 ? "match" : "matches"}
            </div>
          </div>

          {/* Bottom Row: Mode Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Button
              size="sm"
              variant={mode === "all" ? "default" : "outline"}
              onClick={() => setMode("all")}
              className="flex-shrink-0"
            >
              All
            </Button>
            <Button
              size="sm"
              variant={mode === "integration" ? "default" : "outline"}
              onClick={() => setMode("integration")}
              className="flex-shrink-0"
            >
              Integration
            </Button>
            <Button
              size="sm"
              variant={mode === "acquisition" ? "default" : "outline"}
              onClick={() => setMode("acquisition")}
              className="flex-shrink-0"
            >
              Acquisition
            </Button>
            <Button
              size="sm"
              variant={mode === "comarketing" ? "default" : "outline"}
              onClick={() => setMode("comarketing")}
              className="flex-shrink-0"
            >
              Co-Marketing
            </Button>
            <Button
              size="sm"
              variant={mode === "investment" ? "default" : "outline"}
              onClick={() => setMode("investment")}
              className="flex-shrink-0"
            >
              Investment
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 pb-24 md:pb-8">
        <div className="w-full max-w-lg">
          {/* Card Stack */}
          <div className="relative aspect-[3/4] max-h-[600px]">
            {/* Next card preview (behind) */}
            {currentIndex + 1 < filteredMatches.length && (
              <div className="absolute inset-0 bg-card border rounded-2xl scale-95 opacity-50" />
            )}

            {/* Current card with visual feedback overlays */}
            <motion.div
              style={{ x, y, rotate, opacity }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              {/* Card Content */}
              <PartnerCardCarousel match={currentMatch} />

              {/* Visual Swipe Feedback Overlays */}
              {/* Pass (Swipe Left) - Red X */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-2xl pointer-events-none"
                style={{ opacity: passOpacity }}
              >
                <div className="bg-red-500/90 rounded-full p-8 shadow-2xl">
                  <X className="h-32 w-32 text-white" strokeWidth={3} />
                </div>
              </motion.div>

              {/* Interested (Swipe Right) - Green Heart */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-2xl pointer-events-none"
                style={{ opacity: likeOpacity }}
              >
                <div className="bg-green-500/90 rounded-full p-8 shadow-2xl">
                  <Heart className="h-32 w-32 text-white" strokeWidth={3} />
                </div>
              </motion.div>

              {/* Super Like (Swipe Up) - Blue Star */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-blue-500/20 rounded-2xl pointer-events-none"
                style={{ opacity: superLikeOpacity }}
              >
                <div className="bg-blue-500/90 rounded-full p-8 shadow-2xl">
                  <Star className="h-32 w-32 text-white fill-white" strokeWidth={3} />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-16 w-16 border-2 border-red-500 hover:bg-red-50 hover:border-red-600"
              onClick={() => handleSwipe("passed")}
              disabled={swiping}
            >
              <X className="h-8 w-8 text-red-500" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-20 w-20 border-2 border-blue-500 hover:bg-blue-50 hover:border-blue-600"
              onClick={() => handleSwipe("super_like")}
              disabled={swiping}
            >
              <Star className="h-10 w-10 text-blue-500" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-16 w-16 border-2 border-green-500 hover:bg-green-50 hover:border-green-600"
              onClick={() => handleSwipe("interested")}
              disabled={swiping}
            >
              <Heart className="h-8 w-8 text-green-500" />
            </Button>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex flex-col items-center gap-1 text-center">
              <X className="h-4 w-4 text-red-500" />
              <span>Swipe Left</span>
              <span className="text-[10px]">Pass</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Star className="h-4 w-4 text-blue-500 fill-blue-500" />
              <span>Swipe Up</span>
              <span className="text-[10px]">Super Like</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Heart className="h-4 w-4 text-green-500" />
              <span>Swipe Right</span>
              <span className="text-[10px]">Interested</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
