import Link from 'next/link';
import { ArrowRight, Brain, Link2, TrendingUp, Shield, Users, Building2 } from 'lucide-react';
import { companies } from '@/lib/intelligence/companies';
import { getMockListings } from '@/lib/mock-data';
import { Logo } from '@/components/logo';

export default function SuiteLandingPage() {
  const totalCompanies = companies.length;
  const listedCompanies = companies.filter((c) => c.isListed).length;
  const listings = getMockListings();
  const activeListings = listings.filter((l) => l.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Logo size="lg" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Web3 Intelligence & M&A Matching Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Research web3 companies with AI-powered intelligence. Connect for acquisitions,
              strategic partnerships, and ecosystem collaborations—all backed by verified on-chain and off-chain data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/intelligence"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-semibold text-lg"
              >
                <Brain className="h-6 w-6" />
                Explore Intelligence
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/match"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors font-semibold text-lg"
              >
                <Link2 className="h-6 w-6" />
                Find Matches
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground mb-2">{totalCompanies}</p>
            <p className="text-sm text-muted-foreground">Companies Tracked</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">
              {Math.round(companies.reduce((sum, c) => sum + c.overallScore, 0) / companies.length)}
            </p>
            <p className="text-sm text-muted-foreground">Avg Intelligence Score</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-cyan-600 mb-2">{activeListings}</p>
            <p className="text-sm text-muted-foreground">Active Opportunities</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">100%</p>
            <p className="text-sm text-muted-foreground">AI-Verified Data</p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* INTELLIGENCE Product */}
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-purple-100">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">INTELLIGENCE</h2>
                <p className="text-sm text-muted-foreground">Web3 Company Intelligence</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Automated intelligence for {totalCompanies} web3 companies with verified on-chain and off-chain data.
              No manual input, just trustworthy metrics.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Growth Metrics</p>
                  <p className="text-sm text-muted-foreground">
                    On-chain activity, wallet growth, user growth rates
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Team Health</p>
                  <p className="text-sm text-muted-foreground">
                    GitHub commits, contributors, retention, code quality
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Verified Intelligence</p>
                  <p className="text-sm text-muted-foreground">
                    Automated verification via blockchain and GitHub APIs
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/intelligence"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium w-full justify-center"
            >
              Explore Intelligence
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* MATCH Product */}
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-cyan-100">
                <Link2 className="h-8 w-8 text-cyan-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">MATCH</h2>
                <p className="text-sm text-muted-foreground">M&A & Partnership Matching</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Find acquisition targets and partnership opportunities with verified intelligence.
              Connect for M&A, strategic alliances, and ecosystem collaboration.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-cyan-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Acquisition Targets</p>
                  <p className="text-sm text-muted-foreground">
                    {listedCompanies} verified web3 companies seeking M&A with transparent metrics
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-cyan-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Strategic Partnerships</p>
                  <p className="text-sm text-muted-foreground">
                    Technical integrations, ecosystem collaborations, co-marketing opportunities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-cyan-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">AI-Powered Matching</p>
                  <p className="text-sm text-muted-foreground">
                    Automated compatibility analysis based on verified intelligence scores
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/match"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors font-medium w-full justify-center"
            >
              Explore Opportunities
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-card border-t border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  Automated analysis of on-chain data, GitHub activity, and social metrics—no manual input needed
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Smart Matching</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered compatibility analysis finds the best M&A targets and partnership opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Connect & Close</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent verified metrics enable faster due diligence and confident decision-making
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg border border-purple-200 p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Find Your Next Strategic Move?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Research companies with AI-powered INTELLIGENCE. Find acquisitions and partnerships with smart MATCH.
            All decisions backed by 100% verified data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/intelligence/companies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium"
            >
              Explore Companies
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/match/opportunities"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 transition-colors font-medium"
            >
              Find Matches
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
