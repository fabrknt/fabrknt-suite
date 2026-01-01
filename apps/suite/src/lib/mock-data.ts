import { SuiteData } from '@/components/suite-ribbon';

export type OpportunityType = 'acquisition' | 'partnership' | 'collaboration' | 'investment';

export interface Listing {
  id: string;
  type: OpportunityType;
  projectName: string;
  description: string;

  // M&A specific (acquisition/investment)
  askingPrice?: number;
  revenue: number;
  mau: number;

  // Partnership specific
  seekingPartners?: string[];  // e.g., ["DeFi protocol", "Payment provider"]
  offeringCapabilities?: string[];  // e.g., ["ZKP infrastructure", "Node operations"]
  partnershipType?: 'technical' | 'strategic' | 'marketing' | 'ecosystem';

  category: 'defi' | 'nft' | 'gaming' | 'infrastructure' | 'dao';
  status: 'active' | 'under_offer' | 'sold' | 'withdrawn' | 'in_discussion';
  sellerWallet: string;
  createdAt: string;

  // Suite Ribbon Data (PULSE + TRACE integration)
  suiteData?: SuiteData;

  // Additional metadata
  chain: 'ethereum' | 'base' | 'polygon' | 'solana' | 'multi-chain';
  website?: string;
  hasNDA: boolean;
  requiresProofOfFunds?: boolean;
  minBuyerCapital?: number;
}

/**
 * Generate mock listings with integrated PULSE + TRACE data
 */
export function generateMockListings(): Listing[] {
  const now = new Date();

  return [
    {
      id: 'listing-1',
      type: 'acquisition',
      projectName: 'DeFi Yield Protocol',
      description: 'Automated yield farming protocol with proven revenue and active community. $2.5M ARR, 15K MAU, growing 25% MoM.',
      askingPrice: 8500000,
      revenue: 2500000,
      mau: 15000,
      category: 'defi',
      status: 'active',
      sellerWallet: '0xA1b2...C3d4',
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      chain: 'ethereum',
      website: 'https://example-defi.com',
      hasNDA: true,
      requiresProofOfFunds: true,
      minBuyerCapital: 5000000,
      suiteData: {
        pulse: {
          vitality_score: 85,
          developer_activity_score: 88,
          team_retention_score: 82,
          active_contributors: 12,
        },
        trace: {
          growth_score: 92,
          verified_roi: 450,
          roi_multiplier: 4.5,
          quality_score: 89,
        },
        revenue_verified: 1,
        fabrknt_score: 88,
      },
    },
    {
      id: 'listing-2',
      type: 'acquisition',
      projectName: 'NFT Gaming Platform',
      description: 'Play-to-earn gaming ecosystem with 50K+ active players. Strong community engagement and proven team.',
      askingPrice: 12000000,
      revenue: 3800000,
      mau: 52000,
      category: 'gaming',
      status: 'active',
      sellerWallet: '0xB5c6...D7e8',
      createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      chain: 'polygon',
      website: 'https://example-game.io',
      hasNDA: true,
      requiresProofOfFunds: true,
      minBuyerCapital: 8000000,
      suiteData: {
        pulse: {
          vitality_score: 78,
          developer_activity_score: 75,
          team_retention_score: 80,
          active_contributors: 8,
        },
        trace: {
          growth_score: 88,
          verified_roi: 380,
          roi_multiplier: 3.8,
          quality_score: 85,
        },
        revenue_verified: 1,
        fabrknt_score: 82,
      },
    },
    {
      id: 'listing-3',
      type: 'acquisition',
      projectName: 'DAO Governance Toolkit',
      description: 'Modular governance framework used by 200+ DAOs. Subscription-based revenue model, highly scalable.',
      askingPrice: 5500000,
      revenue: 1200000,
      mau: 8500,
      category: 'dao',
      status: 'under_offer',
      sellerWallet: '0xC9d0...E1f2',
      createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      chain: 'multi-chain',
      website: 'https://example-dao.tools',
      hasNDA: true,
      requiresProofOfFunds: true,
      minBuyerCapital: 3000000,
      suiteData: {
        pulse: {
          vitality_score: 92,
          developer_activity_score: 95,
          team_retention_score: 90,
          active_contributors: 15,
        },
        trace: {
          growth_score: 76,
          verified_roi: 420,
          roi_multiplier: 4.2,
          quality_score: 82,
        },
        revenue_verified: 1,
        fabrknt_score: 85,
      },
    },
    {
      id: 'listing-4',
      type: 'acquisition',
      projectName: 'NFT Marketplace',
      description: 'Curated NFT marketplace focusing on digital art. $850K ARR, strong artist community.',
      askingPrice: 3200000,
      revenue: 850000,
      mau: 4200,
      category: 'nft',
      status: 'active',
      sellerWallet: '0xD3e4...F5g6',
      createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      chain: 'base',
      website: 'https://example-nft.market',
      hasNDA: false,
      requiresProofOfFunds: false,
      suiteData: {
        pulse: {
          vitality_score: 68,
          developer_activity_score: 65,
          team_retention_score: 70,
          active_contributors: 5,
        },
        trace: {
          growth_score: 72,
          verified_roi: 280,
          roi_multiplier: 2.8,
          quality_score: 75,
        },
        revenue_verified: 1,
        fabrknt_score: 70,
      },
    },
    {
      id: 'listing-5',
      type: 'acquisition',
      projectName: 'Cross-Chain Bridge',
      description: 'Secure multi-chain asset bridge. $4.2M TVL, high transaction volume, strong security track record.',
      askingPrice: 15000000,
      revenue: 5600000,
      mau: 28000,
      category: 'infrastructure',
      status: 'active',
      sellerWallet: '0xE7f8...G9h0',
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      chain: 'multi-chain',
      website: 'https://example-bridge.network',
      hasNDA: true,
      requiresProofOfFunds: true,
      minBuyerCapital: 10000000,
      suiteData: {
        pulse: {
          vitality_score: 90,
          developer_activity_score: 92,
          team_retention_score: 88,
          active_contributors: 18,
        },
        trace: {
          growth_score: 95,
          verified_roi: 520,
          roi_multiplier: 5.2,
          quality_score: 93,
        },
        revenue_verified: 1,
        fabrknt_score: 92,
      },
    },
    {
      id: 'listing-6',
      type: 'acquisition',
      projectName: 'Social DeFi App',
      description: 'Social trading platform with 12K active traders. Revenue from trading fees and premium subscriptions.',
      askingPrice: 4800000,
      revenue: 980000,
      mau: 12000,
      category: 'defi',
      status: 'sold',
      sellerWallet: '0xF1g2...H3i4',
      createdAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      chain: 'solana',
      website: 'https://example-social.fi',
      hasNDA: true,
      requiresProofOfFunds: true,
      minBuyerCapital: 3000000,
      suiteData: {
        pulse: {
          vitality_score: 75,
          developer_activity_score: 78,
          team_retention_score: 72,
          active_contributors: 9,
        },
        trace: {
          growth_score: 80,
          verified_roi: 350,
          roi_multiplier: 3.5,
          quality_score: 78,
        },
        revenue_verified: 1,
        fabrknt_score: 77,
      },
    },
    // Partnership Opportunities
    {
      id: 'partnership-1',
      type: 'partnership',
      projectName: 'ZK-Proof Infrastructure',
      description: 'Enterprise-grade zero-knowledge proof infrastructure seeking integration partners. Looking to collaborate with L2s, privacy protocols, and enterprise blockchain solutions.',
      revenue: 1500000,
      mau: 3200,
      seekingPartners: ['Layer 2 protocols', 'Privacy-focused DeFi', 'Enterprise blockchain'],
      offeringCapabilities: ['ZK-SNARK circuits', 'Proof generation', 'Verification infrastructure'],
      partnershipType: 'technical',
      category: 'infrastructure',
      status: 'active',
      sellerWallet: '0xG3h4...I5j6',
      createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      chain: 'ethereum',
      website: 'https://example-zk.tech',
      hasNDA: true,
      suiteData: {
        pulse: {
          vitality_score: 88,
          developer_activity_score: 92,
          team_retention_score: 85,
          active_contributors: 14,
        },
        trace: {
          growth_score: 82,
          verified_roi: 400,
          roi_multiplier: 4.0,
          quality_score: 88,
        },
        revenue_verified: 1,
        fabrknt_score: 86,
      },
    },
    {
      id: 'partnership-2',
      type: 'collaboration',
      projectName: 'DePIN Network',
      description: 'Decentralized Physical Infrastructure Network with 5K+ nodes. Seeking ecosystem partnerships for network expansion and use-case development.',
      revenue: 800000,
      mau: 5500,
      seekingPartners: ['IoT platforms', 'Smart city solutions', 'Data marketplaces'],
      offeringCapabilities: ['Global node network', 'Data collection infrastructure', 'Token economics'],
      partnershipType: 'ecosystem',
      category: 'infrastructure',
      status: 'active',
      sellerWallet: '0xH5i6...J7k8',
      createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      chain: 'multi-chain',
      website: 'https://example-depin.network',
      hasNDA: false,
      suiteData: {
        pulse: {
          vitality_score: 80,
          developer_activity_score: 78,
          team_retention_score: 82,
          active_contributors: 11,
        },
        trace: {
          growth_score: 85,
          verified_roi: 320,
          roi_multiplier: 3.2,
          quality_score: 80,
        },
        revenue_verified: 1,
        fabrknt_score: 81,
      },
    },
    {
      id: 'partnership-3',
      type: 'partnership',
      projectName: 'Payment Protocol',
      description: 'Stablecoin payment rails for Web3 apps. Seeking strategic partnerships with DeFi protocols, NFT marketplaces, and gaming platforms for payment integration.',
      revenue: 2200000,
      mau: 18000,
      seekingPartners: ['DeFi protocols', 'NFT marketplaces', 'Gaming platforms', 'E-commerce'],
      offeringCapabilities: ['Instant settlements', 'Multi-currency support', 'Compliance infrastructure'],
      partnershipType: 'strategic',
      category: 'defi',
      status: 'active',
      sellerWallet: '0xI7j8...K9l0',
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      chain: 'multi-chain',
      website: 'https://example-pay.protocol',
      hasNDA: true,
      suiteData: {
        pulse: {
          vitality_score: 86,
          developer_activity_score: 88,
          team_retention_score: 84,
          active_contributors: 13,
        },
        trace: {
          growth_score: 90,
          verified_roi: 480,
          roi_multiplier: 4.8,
          quality_score: 87,
        },
        revenue_verified: 1,
        fabrknt_score: 88,
      },
    },
  ];
}

/**
 * Get mock listings
 */
export function getMockListings(): Listing[] {
  return generateMockListings();
}

/**
 * Get listing by ID
 */
export function getListingById(id: string): Listing | undefined {
  return getMockListings().find(l => l.id === id);
}

/**
 * Get listings by status
 */
export function getListingsByStatus(status: Listing['status']): Listing[] {
  return getMockListings().filter(l => l.status === status);
}

/**
 * Get listings by category
 */
export function getListingsByCategory(category: Listing['category']): Listing[] {
  return getMockListings().filter(l => l.category === category);
}

/**
 * Get opportunities by type
 */
export function getOpportunitiesByType(type: OpportunityType): Listing[] {
  return getMockListings().filter(l => l.type === type);
}

/**
 * Calculate match platform stats
 */
export function calculateMatchStats() {
  const listings = getMockListings();
  const activeListings = listings.filter(l => l.status === 'active');

  const totalValue = activeListings.reduce((sum, l) => sum + (l.askingPrice || 0), 0);
  const avgFabrkntScore = listings
    .filter(l => l.suiteData?.fabrknt_score)
    .reduce((sum, l) => sum + (l.suiteData?.fabrknt_score || 0), 0) / listings.length;

  const totalRevenue = listings.reduce((sum, l) => sum + l.revenue, 0);
  const totalMAU = listings.reduce((sum, l) => sum + l.mau, 0);

  return {
    totalListings: listings.length,
    activeListings: activeListings.length,
    totalValue,
    avgFabrkntScore: Math.round(avgFabrkntScore),
    totalRevenue,
    totalMAU,
  };
}
