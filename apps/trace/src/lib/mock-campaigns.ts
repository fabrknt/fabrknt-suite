export interface Campaign {
  id: string;
  name: string;
  targetContract: string;
  chain: 'ethereum' | 'base' | 'polygon' | 'solana';
  budgetUsd: number;
  goalType: 'conversions' | 'volume' | 'users';
  goalValue?: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  createdAt: string;

  // Metrics
  clicks: number;
  conversions: number;
  spend: number;
  conversionRate: number;
  costPerConversion: number;
}

/**
 * Generate mock campaigns
 */
export function generateMockCampaigns(): Campaign[] {
  const now = new Date();

  return [
    {
      id: 'camp-1',
      name: 'NFT Mint Launch Campaign',
      targetContract: '0x1234...5678',
      chain: 'ethereum',
      budgetUsd: 10000,
      goalType: 'conversions',
      goalValue: 500,
      status: 'active',
      startDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      clicks: 2847,
      conversions: 234,
      spend: 4200,
      conversionRate: 8.2,
      costPerConversion: 17.95,
    },
    {
      id: 'camp-2',
      name: 'Token Swap Promotion',
      targetContract: '0xabcd...efgh',
      chain: 'base',
      budgetUsd: 5000,
      goalType: 'volume',
      goalValue: 100000,
      status: 'active',
      startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      clicks: 1523,
      conversions: 89,
      spend: 1890,
      conversionRate: 5.8,
      costPerConversion: 21.24,
    },
    {
      id: 'camp-3',
      name: 'Staking Rewards Campaign',
      targetContract: 'FnKt...2x9Q',
      chain: 'solana',
      budgetUsd: 15000,
      goalType: 'users',
      goalValue: 1000,
      status: 'active',
      startDate: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 22 * 24 * 60 * 60 * 1000).toISOString(),
      clicks: 4521,
      conversions: 412,
      spend: 8750,
      conversionRate: 9.1,
      costPerConversion: 21.24,
    },
    {
      id: 'camp-4',
      name: 'DAO Governance Launch',
      targetContract: '0x9876...4321',
      chain: 'polygon',
      budgetUsd: 8000,
      goalType: 'conversions',
      goalValue: 300,
      status: 'paused',
      startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000).toISOString(),
      clicks: 1834,
      conversions: 156,
      spend: 5240,
      conversionRate: 8.5,
      costPerConversion: 33.59,
    },
    {
      id: 'camp-5',
      name: 'DeFi Liquidity Pool',
      targetContract: '0x5555...6666',
      chain: 'ethereum',
      budgetUsd: 20000,
      goalType: 'volume',
      goalValue: 500000,
      status: 'completed',
      startDate: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 61 * 24 * 60 * 60 * 1000).toISOString(),
      clicks: 6234,
      conversions: 523,
      spend: 18450,
      conversionRate: 8.4,
      costPerConversion: 35.28,
    },
    {
      id: 'camp-6',
      name: 'Gaming NFT Drop',
      targetContract: '0x7777...8888',
      chain: 'base',
      budgetUsd: 12000,
      goalType: 'conversions',
      goalValue: 800,
      status: 'active',
      startDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      clicks: 892,
      conversions: 67,
      spend: 1340,
      conversionRate: 7.5,
      costPerConversion: 20.00,
    },
  ];
}

/**
 * Get mock campaigns
 */
export function getMockCampaigns(): Campaign[] {
  return generateMockCampaigns();
}

/**
 * Get campaign by ID
 */
export function getCampaignById(id: string): Campaign | undefined {
  return getMockCampaigns().find(c => c.id === id);
}

/**
 * Get campaigns by status
 */
export function getCampaignsByStatus(status: Campaign['status']): Campaign[] {
  return getMockCampaigns().filter(c => c.status === status);
}

/**
 * Calculate campaign performance metrics
 */
export function calculateCampaignMetrics(campaign: Campaign) {
  const remaining = campaign.budgetUsd - campaign.spend;
  const progress = (campaign.spend / campaign.budgetUsd) * 100;
  const daysRunning = Math.floor(
    (new Date().getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    remaining,
    progress: Math.min(progress, 100),
    daysRunning,
    avgSpendPerDay: campaign.spend / Math.max(daysRunning, 1),
    roi: campaign.goalType === 'volume' && campaign.goalValue
      ? (campaign.goalValue / campaign.spend)
      : null,
  };
}
