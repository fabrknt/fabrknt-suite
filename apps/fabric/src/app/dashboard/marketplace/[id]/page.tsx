import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Globe,
  Shield,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  FileText,
} from 'lucide-react';
import { getListingById } from '@/lib/mock-data';
import { formatUSD, formatNumber, formatDate, truncateAddress } from '@/lib/utils/format';
import { SuiteRibbon } from '@fabrknt/ui';
import { cn } from '@/lib/utils';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  under_offer: 'bg-yellow-100 text-yellow-800',
  sold: 'bg-gray-100 text-gray-800',
  withdrawn: 'bg-red-100 text-red-800',
};

export default function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = getListingById(params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="p-8">
          <Link
            href="/dashboard/marketplace"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Link>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {listing.projectName}
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm capitalize text-gray-600">
                  {listing.category}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-sm capitalize text-gray-600">
                  {listing.chain}
                </span>
                <span className="text-gray-300">•</span>
                <span
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium',
                    statusColors[listing.status]
                  )}
                >
                  {listing.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">Asking Price</p>
              <p className="text-3xl font-bold text-green-600">
                {formatUSD(listing.askingPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">About</h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Fabrknt Suite Verification */}
            {listing.suiteData && (
              <SuiteRibbon
                listingId={listing.id}
                data={{
                  pulse: listing.suiteData.pulse,
                  trace: listing.suiteData.trace,
                  revenue_verified: listing.revenue, // Pass actual revenue value
                  fabrknt_score: listing.suiteData.fabrknt_score,
                }}
              />
            )}

            {/* Key Metrics */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Key Metrics
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Annual Recurring Revenue
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatUSD(listing.revenue)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Monthly Active Users
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(listing.mau)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Revenue Multiple</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {(listing.askingPrice / listing.revenue).toFixed(1)}x
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Listed Date</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatDate(listing.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Additional Information
              </h2>

              <div className="space-y-4">
                {listing.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Website:</span>
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 hover:underline"
                    >
                      {listing.website}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Seller Wallet:</span>
                  <code className="text-sm font-mono text-gray-900">
                    {listing.sellerWallet}
                  </code>
                </div>

                {listing.hasNDA && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">NDA Required:</span>
                    <span className="text-sm font-medium text-gray-900">Yes</span>
                  </div>
                )}

                {listing.requiresProofOfFunds && (
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Proof of Funds Required:
                    </span>
                    <span className="text-sm font-medium text-gray-900">Yes</span>
                  </div>
                )}

                {listing.minBuyerCapital && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Minimum Buyer Capital:
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatUSD(listing.minBuyerCapital)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Interested?
              </h3>

              {listing.status === 'active' ? (
                <div className="space-y-3">
                  <button className="w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700">
                    Schedule Call
                  </button>
                  <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    Request Data Room
                  </button>
                  <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    Make Offer
                  </button>
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-sm text-gray-600">
                    This listing is{' '}
                    <span className="font-semibold">
                      {listing.status.replace('_', ' ')}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Requirements
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      'mt-0.5 h-5 w-5 rounded-full flex items-center justify-center',
                      listing.hasNDA ? 'bg-green-100' : 'bg-gray-100'
                    )}
                  >
                    {listing.hasNDA && (
                      <FileText className="h-3 w-3 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      NDA Agreement
                    </p>
                    <p className="text-xs text-gray-500">
                      {listing.hasNDA ? 'Required' : 'Not required'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      'mt-0.5 h-5 w-5 rounded-full flex items-center justify-center',
                      listing.requiresProofOfFunds ? 'bg-green-100' : 'bg-gray-100'
                    )}
                  >
                    {listing.requiresProofOfFunds && (
                      <Shield className="h-3 w-3 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Proof of Funds
                    </p>
                    <p className="text-xs text-gray-500">
                      {listing.requiresProofOfFunds ? 'Required' : 'Not required'}
                    </p>
                  </div>
                </div>

                {listing.minBuyerCapital && (
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Minimum Capital
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatUSD(listing.minBuyerCapital)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <h3 className="text-sm font-semibold text-green-900 mb-2">
                Need Help?
              </h3>
              <p className="text-xs text-green-700 mb-4">
                Our M&A advisors are here to assist you through the process.
              </p>
              <button className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                Contact Advisor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
