import { Users, Activity, Award, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ContributorCard } from '@/components/dashboard/contributor-card';
import { HealthScoreGauge } from '@/components/dashboard/health-score-gauge';
import { getMockContributors, getMockContributions, getTodayHealthScore } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils/format';

export default function DashboardPage() {
  // Get data
  const contributors = getMockContributors();
  const activeContributors = contributors.filter((c) => c.isActive);
  const contributions = getMockContributions(7); // Last 7 days
  const healthScore = getTodayHealthScore();

  // Calculate stats
  const totalContributions = contributions.length;
  const totalPraises = contributors.reduce((sum, c) => sum + c.praisesReceived, 0);
  const avgScore = Math.round(
    contributors.reduce((sum, c) => sum + c.totalScore, 0) / contributors.length
  );

  // Top contributors (by total score)
  const topContributors = [...contributors].sort((a, b) => b.totalScore - a.totalScore).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-semibold text-foreground tracking-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          Team Vitality Overview
        </h1>
        <p className="text-muted-foreground mt-2" style={{ color: '#666' }}>
          Track team health, contributions, and recognize outstanding work
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Contributors"
          value={activeContributors.length}
          description={`${contributors.length} total members`}
          icon={Users}
        />
        <StatsCard
          title="Contributions (7d)"
          value={formatNumber(totalContributions)}
          description="across all platforms"
          icon={Activity}
        />
        <StatsCard
          title="Total Praises"
          value={formatNumber(totalPraises)}
          description="peer recognition"
          icon={Award}
        />
        <StatsCard
          title="Avg. Score"
          value={formatNumber(avgScore)}
          description="contribution score"
          icon={TrendingUp}
        />
      </div>

      {/* Health Score & Platform Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Score Gauge */}
        <div className="lg:col-span-1">
          <HealthScoreGauge score={healthScore.overallScore} size="md" />
        </div>

        {/* Health Components */}
        <div
          className="lg:col-span-2 bg-card rounded-lg border border-border p-6"
          style={{ borderColor: '#e8e8e8' }}
        >
          <h3
            className="text-lg font-semibold text-foreground mb-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            Health Components
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground/90">Team Retention</span>
                <span className="text-sm font-semibold text-foreground">
                  {healthScore.teamRetentionScore}/100
                </span>
              </div>
              <div className="w-full rounded-full h-2" style={{ background: '#f0f0f0' }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${healthScore.teamRetentionScore}%`,
                    background: 'linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)',
                    boxShadow: '0 2px 8px 0 rgba(168, 85, 247, 0.4)',
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground/90">Developer Activity</span>
                <span className="text-sm font-semibold text-foreground">
                  {healthScore.developerActivityScore}/100
                </span>
              </div>
              <div className="w-full rounded-full h-2" style={{ background: '#f0f0f0' }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${healthScore.developerActivityScore}%`,
                    background: 'linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)',
                    boxShadow: '0 2px 8px 0 rgba(168, 85, 247, 0.4)',
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground/90">Community Engagement</span>
                <span className="text-sm font-semibold text-foreground">
                  {healthScore.communityEngagementScore}/100
                </span>
              </div>
              <div className="w-full rounded-full h-2" style={{ background: '#f0f0f0' }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${healthScore.communityEngagementScore}%`,
                    background: 'linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)',
                    boxShadow: '0 2px 8px 0 rgba(168, 85, 247, 0.4)',
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground/90">Quality Index</span>
                <span className="text-sm font-semibold text-foreground">
                  {healthScore.qualityIndex}/100
                </span>
              </div>
              <div className="w-full rounded-full h-2" style={{ background: '#f0f0f0' }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${healthScore.qualityIndex}%`,
                    background: 'linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)',
                    boxShadow: '0 2px 8px 0 rgba(168, 85, 247, 0.4)',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              The <strong>Omotenashi Quality Index</strong> measures quality over quantity,
              rewarding high-impact contributions more than simple activity counts.
            </p>
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xl font-semibold text-foreground"
            style={{ letterSpacing: '-0.01em' }}
          >
            Top Contributors
          </h2>
          <a
            href="/dashboard/contributors"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: '#a855f7' }}
          >
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topContributors.map((contributor) => (
            <ContributorCard key={contributor.id} contributor={contributor} />
          ))}
        </div>
      </div>
    </div>
  );
}
