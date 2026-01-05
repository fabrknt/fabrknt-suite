"use client";

import { useState } from "react";
import { Heart, Star, MessageCircle, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface UserCompany {
  slug: string;
  name: string;
  category: string;
  logo: string | null;
}

interface Partner {
  slug: string;
  name: string;
  category: string;
  chain: string | null;
  description: string | null;
  logo: string | null;
  website: string | null;
  overallScore: number | null;
  teamHealthScore: number | null;
  growthScore: number | null;
  trend: string | null;
}

interface Match {
  id: string;
  partner: Partner | null;
  matchScore: number;
  status: string;
  createdAt: Date;
  userAction: string | undefined;
  partnerAction: string | undefined;
}

interface Props {
  userCompany: UserCompany;
  matches: Match[];
}

export function MatchesList({ userCompany, matches }: Props) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Group matches by status
  const newMatches = matches.filter((m) => m.status === "new");
  const chattingMatches = matches.filter((m) => m.status === "chatting");
  const activeMatches = matches.filter((m) =>
    ["partnership_started", "completed"].includes(m.status)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground">
            Synergy Connections
          </h1>
          <Button asChild variant="outline" size="sm">
            <a href="/synergy/discover">
              Continue Discovering →
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {userCompany.name}
        </p>
        <p className="text-muted-foreground">
          Companies that have expressed mutual interest in connecting with you
        </p>
      </div>

      <div>
        {matches.length === 0 ? (
          <div className="max-w-md mx-auto text-center space-y-4 py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">No Connections Yet</h2>
            <p className="text-muted-foreground">
              Discover companies with verified compatibility scores and start connecting! When both
              companies express interest, you'll see them here.
            </p>
            <Button asChild>
              <a href="/synergy/discover">Start Discovering →</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* New Connections */}
            {newMatches.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  New Connections
                  <Badge variant="secondary">{newMatches.length}</Badge>
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {newMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onClick={() => setSelectedMatch(match)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Chatting */}
            {chattingMatches.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  In Progress
                  <Badge variant="secondary">{chattingMatches.length}</Badge>
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {chattingMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onClick={() => setSelectedMatch(match)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Active Partnerships */}
            {activeMatches.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  Active Partnerships
                  <Badge variant="secondary">{activeMatches.length}</Badge>
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activeMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onClick={() => setSelectedMatch(match)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Match Detail Modal (placeholder for future chat feature) */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
}

function MatchCard({ match, onClick }: { match: Match; onClick: () => void }) {
  const { partner, userAction, partnerAction, createdAt } = match;

  if (!partner) return null;

  const isSuperLike = userAction === "super_like" || partnerAction === "super_like";

  return (
    <div
      onClick={onClick}
      className="bg-card border rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-3 mb-3">
        {partner.logo && (
          partner.logo.startsWith('http') || partner.logo.startsWith('/') ? (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={48}
              height={48}
              className="rounded-lg"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center text-3xl rounded-lg bg-muted">
              {partner.logo}
            </div>
          )
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {partner.name}
          </h3>
          <div className="flex gap-1.5 mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 capitalize">
              {partner.category}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 capitalize">
              {partner.chain || "ethereum"}
            </span>
          </div>
        </div>
        {isSuperLike && (
          <Star className="h-5 w-5 text-blue-500 fill-blue-500 flex-shrink-0" />
        )}
      </div>

      {partner.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {partner.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Matched {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

function MatchDetailModal({
  match,
  onClose,
}: {
  match: Match;
  onClose: () => void;
}) {
  const { partner } = match;

  if (!partner) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {partner.logo && (
                partner.logo.startsWith('http') || partner.logo.startsWith('/') ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={64}
                    height={64}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center text-4xl rounded-xl bg-muted">
                    {partner.logo}
                  </div>
                )
              )}
              <div>
                <h2 className="text-2xl font-bold">{partner.name}</h2>
                <p className="text-muted-foreground capitalize">{partner.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          {/* Description */}
          {partner.description && (
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{partner.description}</p>
            </div>
          )}

          {/* Health Metrics */}
          {(partner.overallScore || partner.teamHealthScore || partner.growthScore) && (
            <div>
              <h3 className="font-semibold mb-3">Health Metrics</h3>
              <div className="grid grid-cols-3 gap-3">
                {partner.overallScore && (
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold">{partner.overallScore}</div>
                    <div className="text-xs text-muted-foreground">Overall</div>
                  </div>
                )}
                {partner.teamHealthScore && (
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold">{partner.teamHealthScore}</div>
                    <div className="text-xs text-muted-foreground">Team Health</div>
                  </div>
                )}
                {partner.growthScore && (
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold">{partner.growthScore}</div>
                    <div className="text-xs text-muted-foreground">Growth</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <a
                href={`/cindex/${partner.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Profile
              </a>
            </Button>
            <Button variant="outline" className="flex-1" disabled>
              <MessageCircle className="h-4 w-4 mr-2" />
              Message (Coming Soon)
            </Button>
          </div>

          {partner.website && (
            <div className="text-center">
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Visit {partner.name} Website →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
