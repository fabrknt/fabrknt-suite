import Link from 'next/link';
import { ArrowRight, Briefcase, UserCheck } from 'lucide-react';
import { Listing } from '@/lib/mock-data';
import { formatUSD, formatNumber } from '@/lib/utils/format';
import { getRevenueMultiple } from '@/lib/match/helpers';

interface SpotlightSectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  listings: Listing[];
  iconColor?: string;
}

const categoryColors = {
  defi: 'bg-purple-100 text-purple-700',
  infrastructure: 'bg-blue-100 text-blue-700',
  nft: 'bg-pink-100 text-pink-700',
  dao: 'bg-green-100 text-green-700',
  gaming: 'bg-orange-100 text-orange-700',
};

export function MatchSpotlightSection({
  title,
  description,
  icon: Icon,
  listings,
  iconColor = 'text-cyan-600'
}: SpotlightSectionProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-cyan-50">
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {listings.map((listing, index) => {
          const multiple = getRevenueMultiple(listing);
          const fabrkntScore = listing.suiteData?.fabrknt_score || 0;
          const scoreColor = fabrkntScore >= 85 ? 'text-green-600' : fabrkntScore >= 70 ? 'text-yellow-600' : 'text-red-600';

          // Determine type
          const isMA = listing.type === 'acquisition' || listing.type === 'investment';
          const TypeIcon = isMA ? Briefcase : UserCheck;
          const typeBadgeColor = isMA
            ? 'bg-green-100 text-green-700 border-green-200'
            : 'bg-blue-100 text-blue-700 border-blue-200';

          return (
            <Link
              key={listing.id}
              href={`/match/opportunities/${listing.id}`}
              className="block p-3 rounded-lg border border-border hover:border-cyan-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-lg font-bold text-muted-foreground/40 w-6">#{index + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{listing.projectName}</h4>
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded border font-semibold ${typeBadgeColor}`}
                      >
                        <TypeIcon className="h-3 w-3" />
                        {isMA ? 'M&A' : 'Partnership'}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${categoryColors[listing.category]}`}>
                        {listing.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{listing.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Revenue: {formatUSD(listing.revenue)}/yr</span>
                      <span>•</span>
                      <span>MAU: {formatNumber(listing.mau)}</span>
                      {isMA && (
                        <>
                          <span>•</span>
                          <span>{multiple.toFixed(1)}x Multiple</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  {listing.askingPrice && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-sm font-bold text-foreground">{formatUSD(listing.askingPrice)}</p>
                    </div>
                  )}
                  {fabrkntScore > 0 && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Score</p>
                      <p className={`text-sm font-bold ${scoreColor}`}>{fabrkntScore}</p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Link
          href="/match/opportunities"
          className="flex items-center justify-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
        >
          View All Opportunities
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
