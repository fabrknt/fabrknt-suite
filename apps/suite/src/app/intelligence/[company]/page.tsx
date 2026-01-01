import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Minus, Github, Activity } from 'lucide-react';
import { getCompanyBySlug } from '@/lib/intelligence/companies';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/utils/format';

interface PageProps {
  params: { company: string };
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColors = {
  up: 'text-green-600 bg-green-50',
  down: 'text-red-600 bg-red-50',
  stable: 'text-gray-600 bg-gray-50',
};

const categoryColors = {
  defi: 'bg-purple-100 text-purple-700',
  infrastructure: 'bg-blue-100 text-blue-700',
  nft: 'bg-pink-100 text-pink-700',
  dao: 'bg-green-100 text-green-700',
  gaming: 'bg-orange-100 text-orange-700',
};

export default function CompanyProfilePage({ params }: PageProps) {
  const company = getCompanyBySlug(params.company);

  if (!company) {
    notFound();
  }

  const TrendIcon = trendIcons[company.trend];
  const scoreColor =
    company.overallScore >= 85
      ? 'text-green-600'
      : company.overallScore >= 70
      ? 'text-yellow-600'
      : 'text-red-600';

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="p-8">
          <Link
            href="/intelligence/companies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Companies
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{company.logo}</div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{company.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className={cn('text-xs px-2 py-1 rounded-full font-medium', categoryColors[company.category])}>
                    {company.category.toUpperCase()}
                  </span>
                  <div className={cn('flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', trendColors[company.trend])}>
                    <TrendIcon className="h-3 w-3" />
                    <span>{company.trend === 'up' ? 'Growing' : company.trend === 'down' ? 'Declining' : 'Stable'}</span>
                  </div>
                  {company.isListed && (
                    <Link
                      href={`/match/opportunities/${company.listingId}`}
                      className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                      <span>Listed in Marketplace</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">{company.description}</p>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 mt-2"
                >
                  {company.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Overall Score */}
            <div className="text-center bg-muted rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Overall Intelligence Score</p>
              <p className={cn('text-5xl font-bold', scoreColor)}>{company.overallScore}</p>
              <p className="text-xs text-muted-foreground mt-1">out of 100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team Health */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Github className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-foreground">Team Health</h2>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold text-foreground mb-1">{company.teamHealth.score}</p>
              <p className="text-sm text-muted-foreground">Team vitality score</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">GitHub Commits (30d)</span>
                <span className="font-medium text-foreground">{formatNumber(company.teamHealth.githubCommits30d)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Contributors</span>
                <span className="font-medium text-foreground">{company.teamHealth.activeContributors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Contributor Retention</span>
                <span className="font-medium text-foreground">{company.teamHealth.contributorRetention}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Code Quality Score</span>
                <span className="font-medium text-foreground">{company.teamHealth.codeQuality}/100</span>
              </div>
            </div>
          </div>

          {/* Growth Metrics */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-foreground">Growth Metrics</h2>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold text-foreground mb-1">{company.growth.score}</p>
              <p className="text-sm text-muted-foreground">Growth momentum score</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">On-Chain Activity (30d)</span>
                <span className="font-medium text-foreground">{formatNumber(company.growth.onChainActivity30d)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Wallet Growth</span>
                <span className="font-medium text-green-600">+{company.growth.walletGrowth}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">User Growth Rate</span>
                <span className="font-medium text-green-600">+{company.growth.userGrowthRate}%</span>
              </div>
              {company.growth.tvl && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Value Locked</span>
                  <span className="font-medium text-foreground">${formatNumber(company.growth.tvl)}</span>
                </div>
              )}
              {company.growth.volume30d && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volume (30d)</span>
                  <span className="font-medium text-foreground">${formatNumber(company.growth.volume30d)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Intelligence Verification */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-purple-900 mb-3">About Intelligence Verification</h3>
          <div className="text-sm text-purple-800 space-y-2">
            <p>
              <strong>Automated Data Sources:</strong> All metrics are automatically verified through on-chain data
              (smart contracts, wallets, DAOs) and off-chain sources (GitHub, Discord, Twitter).
            </p>
            <p>
              <strong>No Manual Input:</strong> Intelligence scores are calculated algorithmically based on verified
              data, ensuring trustworthy and objective company assessments.
            </p>
            <p>
              <strong>Updated Daily:</strong> Metrics refresh daily to provide the most current intelligence on
              company health and growth trajectory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
