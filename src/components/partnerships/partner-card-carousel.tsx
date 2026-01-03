"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, Users, Zap, GitBranch, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ResponsiveLine } from "@nivo/line";

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
  match: PartnerMatch;
}

type CardType = "hero" | "metrics" | "team" | "tech" | "traction" | "synergy";

export function PartnerCardCarousel({ match }: Props) {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const cards: CardType[] = ["hero", "metrics", "team", "tech", "traction", "synergy"];

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setDirection(1);
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setDirection(-1);
      setCurrentCard(currentCard - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative h-full flex flex-col bg-card rounded-2xl overflow-hidden shadow-xl">
      {/* Card Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentCard}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            {cards[currentCard] === "hero" && <HeroCard match={match} />}
            {cards[currentCard] === "metrics" && <MetricsCard match={match} />}
            {cards[currentCard] === "team" && <TeamCard match={match} />}
            {cards[currentCard] === "tech" && <TechCard match={match} />}
            {cards[currentCard] === "traction" && <TractionCard match={match} />}
            {cards[currentCard] === "synergy" && <SynergyCard match={match} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots & Arrows */}
      <div className="p-4 bg-card border-t">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={prevCard}
            disabled={currentCard === 0}
            className="p-2 rounded-full hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentCard ? 1 : -1);
                  setCurrentCard(index);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentCard
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextCard}
            disabled={currentCard === cards.length - 1}
            className="p-2 rounded-full hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Card Counter */}
        <p className="text-center text-xs text-muted-foreground mt-2">
          {currentCard + 1} of {cards.length} • Swipe to see more
        </p>
      </div>
    </div>
  );
}

// Card 1: Hero Card (90% visual, 10% text)
function HeroCard({ match }: Props) {
  const { partner, matchScore } = match;

  return (
    <div className="h-full flex flex-col">
      {/* 90% - Hero Visual */}
      <div className="flex-[9] flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        {/* Logo */}
        <div className="relative z-10">
          {partner.logo ? (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={220}
              height={220}
              className="rounded-3xl shadow-2xl bg-background p-4"
            />
          ) : (
            <div className="w-[220px] h-[220px] rounded-3xl shadow-2xl bg-background flex items-center justify-center">
              <span className="text-6xl font-bold text-muted-foreground">
                {partner.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Match Score Badge (floating) */}
        <div className="absolute top-6 right-6">
          <div className="bg-primary text-primary-foreground rounded-2xl px-6 py-3 shadow-lg">
            <div className="text-3xl font-bold">{matchScore}</div>
            <div className="text-xs opacity-90">Match</div>
          </div>
        </div>
      </div>

      {/* 10% - Minimal Info */}
      <div className="flex-[1] p-6 bg-card">
        <h2 className="text-3xl font-bold mb-1 truncate">{partner.name}</h2>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize">
            {partner.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Swipe right for details →
          </span>
        </div>
      </div>
    </div>
  );
}

// Card 2: Key Metrics
function MetricsCard({ match }: Props) {
  const { partner } = match;
  const indexData = partner.indexData || {};
  const onchain = indexData.onchain || {};

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">
            Key Metrics
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Verified on-chain and off-chain data
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {/* TVL */}
        {onchain.tvl && (
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">
              ${(onchain.tvl / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">Total Value Locked</div>
          </div>
        )}

        {/* Users */}
        {onchain.monthlyActiveUsers && (
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">
              {(onchain.monthlyActiveUsers / 1000).toFixed(1)}k
            </div>
            <div className="text-xs text-muted-foreground">Monthly Users</div>
          </div>
        )}

        {/* Overall Score */}
        {partner.overallScore && (
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">{partner.overallScore}</div>
            <div className="text-xs text-muted-foreground">Overall Score</div>
          </div>
        )}

        {/* Growth Score */}
        {partner.growthScore && (
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">{partner.growthScore}</div>
            <div className="text-xs text-muted-foreground">Growth Score</div>
          </div>
        )}

        {/* Team Health */}
        {partner.teamHealthScore && (
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">{partner.teamHealthScore}</div>
            <div className="text-xs text-muted-foreground">Team Health</div>
          </div>
        )}

        {/* Social Score */}
        {partner.socialScore && (
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">{partner.socialScore}</div>
            <div className="text-xs text-muted-foreground">Social Score</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Card 3: Team & Development
function TeamCard({ match }: Props) {
  const { partner } = match;
  const indexData = partner.indexData || {};
  const github = indexData.github || {};

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">
            Team & Development
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">GitHub activity and code quality</p>
      </div>

      <div className="space-y-4 flex-1">
        {/* Team Health Score */}
        {partner.teamHealthScore && (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Team Health</span>
              <span className="text-3xl font-bold">{partner.teamHealthScore}/100</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${partner.teamHealthScore}%` }}
              />
            </div>
          </div>
        )}

        {/* GitHub Stats */}
        {github.stars && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xl font-bold mb-1">{github.stars.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">GitHub Stars</div>
            </div>
            {github.forks && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-xl font-bold mb-1">{github.forks.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Forks</div>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {partner.description && (
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {partner.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Card 4: Tech Stack
function TechCard({ match }: Props) {
  const { partner } = match;
  const indexData = partner.indexData || {};
  const onchain = indexData.onchain || {};

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <GitBranch className="h-5 w-5 text-primary" />
          <h3 className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">
            Tech Stack
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">Technology and infrastructure</p>
      </div>

      <div className="space-y-6 flex-1">
        {/* Chain */}
        {onchain.chain && (
          <div>
            <div className="text-xs text-muted-foreground mb-2">Blockchain</div>
            <Badge variant="outline" className="text-base px-4 py-2 capitalize">
              {onchain.chain}
            </Badge>
          </div>
        )}

        {/* Category */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">Category</div>
          <Badge variant="secondary" className="text-base px-4 py-2 capitalize">
            {partner.category}
          </Badge>
        </div>

        {/* Technical Fit */}
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Technical Compatibility</span>
            <span className="text-2xl font-bold">{match.compatibility.technicalFit}/100</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${match.compatibility.technicalFit}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {match.compatibility.categoryFit}
          </p>
        </div>

        {/* Website */}
        {partner.website && (
          <div>
            <div className="text-xs text-muted-foreground mb-2">Website</div>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline break-all"
            >
              {partner.website}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Card 5: Traction
function TractionCard({ match }: Props) {
  const { partner } = match;
  const indexData = partner.indexData || {};
  const social = indexData.social || {};

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">
            Growth & Traction
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">Community and momentum</p>
      </div>

      <div className="space-y-4 flex-1">
        {/* Growth Score */}
        {partner.growthScore && (
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Growth Score</span>
              <span className="text-3xl font-bold">{partner.growthScore}/100</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${partner.growthScore}%` }}
              />
            </div>
          </div>
        )}

        {/* Trend */}
        {partner.trend && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-1">Trend</div>
            <div className="text-lg font-semibold capitalize">{partner.trend}</div>
          </div>
        )}

        {/* Social Stats */}
        {(social.twitterFollowers || partner.socialScore) && (
          <div className="grid grid-cols-2 gap-3">
            {social.twitterFollowers && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-xl font-bold mb-1">
                  {(social.twitterFollowers / 1000).toFixed(1)}k
                </div>
                <div className="text-xs text-muted-foreground">Twitter Followers</div>
              </div>
            )}
            {partner.socialScore && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-xl font-bold mb-1">{partner.socialScore}</div>
                <div className="text-xs text-muted-foreground">Social Score</div>
              </div>
            )}
          </div>
        )}

        {/* User Overlap */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="text-xs text-muted-foreground mb-1">Estimated User Overlap</div>
          <div className="text-2xl font-bold">
            {match.compatibility.userOverlap.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Potential for cross-sell opportunities
          </p>
        </div>
      </div>
    </div>
  );
}

// Card 6: Synergy & Impact (Why Partner)
function SynergyCard({ match }: Props) {
  const { partner, compatibility, projectedImpact, partnershipType, reasoning } = match;

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">
            Why Partner?
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">AI-powered synergy analysis</p>
      </div>

      <div className="space-y-6 flex-1">
        {/* Partnership Type */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">Partnership Type</div>
          <Badge className="text-base px-4 py-2 capitalize">
            {partnershipType.replace(/_/g, " ")}
          </Badge>
        </div>

        {/* Synergy Description */}
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
          <div className="text-sm font-medium mb-2">Synergy Potential</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {compatibility.synergy}
          </p>
        </div>

        {/* Projected Impact */}
        <div>
          <div className="text-sm font-medium mb-3">Projected Impact</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center bg-muted/50 rounded-lg p-3">
              <div className="text-xl font-bold">+{projectedImpact.runwayExtension}</div>
              <div className="text-xs text-muted-foreground mt-1">Months Runway</div>
            </div>
            <div className="text-center bg-muted/50 rounded-lg p-3">
              <div className="text-xl font-bold">+{projectedImpact.userGrowth}%</div>
              <div className="text-xs text-muted-foreground mt-1">User Growth</div>
            </div>
            <div className="text-center bg-muted/50 rounded-lg p-3">
              <div className="text-xl font-bold">
                ${(projectedImpact.revenueOpportunity / 1000).toFixed(0)}k
              </div>
              <div className="text-xs text-muted-foreground mt-1">Revenue/mo</div>
            </div>
          </div>
        </div>

        {/* AI Reasoning */}
        {reasoning && (
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-xs text-muted-foreground mb-2">AI Analysis</div>
            <p className="text-sm leading-relaxed">{reasoning}</p>
          </div>
        )}
      </div>
    </div>
  );
}
