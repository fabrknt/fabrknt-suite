// Solana Yield Context Data
// Curated information about points programs, LSTs, and pool characteristics

// ============================================
// Points Programs
// ============================================

export interface PointsProgram {
    protocol: string;
    name: string;
    active: boolean;
    description: string;
    estimatedValue?: string; // e.g., "High", "Medium", "Low", or specific estimate
    endsAt?: string; // ISO date if known
    tokenTicker?: string; // Expected airdrop token
    notes: string[];
}

export const POINTS_PROGRAMS: Record<string, PointsProgram> = {
    kamino: {
        protocol: "kamino",
        name: "Kamino Points",
        active: true,
        description: "Earn points for lending and borrowing on Kamino",
        estimatedValue: "Medium",
        tokenTicker: "KMNO",
        notes: [
            "Season 2 ongoing",
            "Points earned on both supply and borrow",
            "Multipliers for certain assets",
        ],
    },
    marginfi: {
        protocol: "marginfi",
        name: "mrgn points",
        active: true,
        description: "Earn points for lending and borrowing on marginfi",
        estimatedValue: "Medium-High",
        notes: [
            "Points program active since 2023",
            "Higher multipliers for borrowing",
            "Ecosystem points from partner protocols",
        ],
    },
    jupiter: {
        protocol: "jupiter",
        name: "Jupiter Active Staking Rewards",
        active: true,
        description: "ASR rewards for JUP stakers participating in governance",
        estimatedValue: "Medium",
        tokenTicker: "JUP",
        notes: [
            "Vote on proposals to earn ASR",
            "Rewards distributed quarterly",
            "Based on voting participation",
        ],
    },
    drift: {
        protocol: "drift",
        name: "FUEL Points",
        active: true,
        description: "Earn FUEL for trading and providing liquidity on Drift",
        estimatedValue: "Medium",
        tokenTicker: "DRIFT",
        notes: [
            "FUEL earned from trading volume",
            "Insurance fund staking earns FUEL",
            "Points converted to DRIFT periodically",
        ],
    },
    sanctum: {
        protocol: "sanctum",
        name: "Sanctum Wonderland",
        active: true,
        description: "Earn points by holding and using LSTs through Sanctum",
        estimatedValue: "Medium",
        tokenTicker: "CLOUD",
        notes: [
            "Hold any supported LST to earn",
            "Bonus for LST diversity",
            "Instant unstake fees contribute to rewards",
        ],
    },
    jito: {
        protocol: "jito",
        name: "Jito Points",
        active: false,
        description: "Points program concluded with JTO airdrop",
        estimatedValue: "Concluded",
        tokenTicker: "JTO",
        notes: [
            "Original points program ended Dec 2023",
            "JTO airdrop completed",
            "No active points program currently",
        ],
    },
    save: {
        protocol: "save",
        name: "Save Rewards",
        active: false,
        description: "SLND rewards program",
        estimatedValue: "Low",
        tokenTicker: "SLND",
        notes: [
            "SLND rewards significantly reduced",
            "Focus shifted to organic yields",
        ],
    },
};

// Get points program for a protocol
export function getPointsProgram(protocolSlug: string): PointsProgram | null {
    return POINTS_PROGRAMS[protocolSlug] || null;
}

// ============================================
// LST (Liquid Staking Token) Data
// ============================================

export interface LSTData {
    slug: string;
    name: string;
    token: string;
    tokenMint: string;
    protocol: string;
    validatorCount: number;
    validatorConcentration: number; // % held by top 3 validators
    mevEnabled: boolean;
    instantUnstake: boolean;
    stakingApy: number; // Base staking APY
    mevBoost?: number; // Additional MEV yield
    pegStability: "high" | "medium" | "low";
    marketCap: number; // Approximate in USD
    features: string[];
}

// Data as of January 2025 - should be periodically updated
export const LST_DATA: Record<string, LSTData> = {
    jitosol: {
        slug: "jitosol",
        name: "Jito Staked SOL",
        token: "JitoSOL",
        tokenMint: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
        protocol: "jito",
        validatorCount: 200,
        validatorConcentration: 15,
        mevEnabled: true,
        instantUnstake: true,
        stakingApy: 7.5,
        mevBoost: 1.5,
        pegStability: "high",
        marketCap: 2_000_000_000,
        features: [
            "MEV rewards distributed to stakers",
            "Largest LST by market cap",
            "JTO governance token",
            "Instant unstake via Sanctum",
        ],
    },
    msol: {
        slug: "msol",
        name: "Marinade Staked SOL",
        token: "mSOL",
        tokenMint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
        protocol: "marinade",
        validatorCount: 450,
        validatorConcentration: 8,
        mevEnabled: false,
        instantUnstake: true,
        stakingApy: 7.2,
        pegStability: "high",
        marketCap: 800_000_000,
        features: [
            "Best validator decentralization",
            "DAO governed (MNDE)",
            "Native staking option available",
            "Long track record",
        ],
    },
    bsol: {
        slug: "bsol",
        name: "BlazeStake SOL",
        token: "bSOL",
        tokenMint: "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
        protocol: "solblaze",
        validatorCount: 200,
        validatorConcentration: 12,
        mevEnabled: false,
        instantUnstake: true,
        stakingApy: 7.0,
        pegStability: "medium",
        marketCap: 150_000_000,
        features: [
            "Custom staking pools",
            "Community driven",
            "SolBlaze ecosystem rewards",
        ],
    },
    jupsol: {
        slug: "jupsol",
        name: "Jupiter Staked SOL",
        token: "jupSOL",
        tokenMint: "jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v",
        protocol: "jupiter",
        validatorCount: 50,
        validatorConcentration: 25,
        mevEnabled: true,
        instantUnstake: true,
        stakingApy: 7.8,
        mevBoost: 1.2,
        pegStability: "high",
        marketCap: 400_000_000,
        features: [
            "Backed by Jupiter ecosystem",
            "MEV rewards via Jito integration",
            "ASR rewards for JUP stakers",
        ],
    },
    inf: {
        slug: "inf",
        name: "Sanctum Infinity",
        token: "INF",
        tokenMint: "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm",
        protocol: "sanctum",
        validatorCount: 100,
        validatorConcentration: 20,
        mevEnabled: true,
        instantUnstake: true,
        stakingApy: 7.4,
        mevBoost: 0.8,
        pegStability: "high",
        marketCap: 200_000_000,
        features: [
            "Multi-LST basket approach",
            "Instant unstaking hub",
            "CLOUD points rewards",
            "LST liquidity aggregator",
        ],
    },
};

// Get LST data by slug
export function getLSTData(slug: string): LSTData | null {
    return LST_DATA[slug] || null;
}

// Get all LSTs for comparison
export function getAllLSTs(): LSTData[] {
    return Object.values(LST_DATA);
}

// ============================================
// Concentrated Liquidity Pool Identification
// ============================================

export interface ConcentratedLiquidityInfo {
    project: string;
    type: "clmm" | "dlmm" | "whirlpool";
    ilRiskLevel: "high" | "very_high";
    description: string;
}

// Projects that use concentrated liquidity
export const CONCENTRATED_LIQUIDITY_PROJECTS: Record<string, ConcentratedLiquidityInfo> = {
    "kamino-liquidity": {
        project: "kamino-liquidity",
        type: "clmm",
        ilRiskLevel: "high",
        description: "Kamino automated CLMM vaults with auto-rebalancing",
    },
    "orca-dex": {
        project: "orca-dex",
        type: "whirlpool",
        ilRiskLevel: "high",
        description: "Orca Whirlpools concentrated liquidity AMM",
    },
    "raydium-concentrated-liquidity": {
        project: "raydium-concentrated-liquidity",
        type: "clmm",
        ilRiskLevel: "high",
        description: "Raydium CLMM pools",
    },
};

// Check if a project uses concentrated liquidity
export function isConcentratedLiquidity(project: string): ConcentratedLiquidityInfo | null {
    return CONCENTRATED_LIQUIDITY_PROJECTS[project] || null;
}

// ============================================
// Yield Risk Context
// ============================================

export type YieldSource = "base" | "reward" | "points" | "mev";

export interface YieldBreakdown {
    base: number;
    reward: number;
    points: number | null; // Estimated if available
    mev: number | null;
    total: number;
    sustainable: number; // Base + MEV (more sustainable)
    sources: YieldSource[];
}

// Calculate yield breakdown
export function calculateYieldBreakdown(
    apyBase: number,
    apyReward: number | null,
    protocolSlug: string | null,
    isLST: boolean = false
): YieldBreakdown {
    const sources: YieldSource[] = ["base"];
    const base = apyBase || 0;
    const reward = apyReward || 0;
    let mev: number | null = null;
    let points: number | null = null;

    if (reward > 0) {
        sources.push("reward");
    }

    // Check for active points program
    if (protocolSlug) {
        const pointsProgram = getPointsProgram(protocolSlug);
        if (pointsProgram?.active) {
            sources.push("points");
            // Rough estimate: points could add 2-10% equivalent APY
            points = pointsProgram.estimatedValue === "High" ? 5 :
                     pointsProgram.estimatedValue === "Medium-High" ? 3 :
                     pointsProgram.estimatedValue === "Medium" ? 2 : 1;
        }
    }

    // Check for MEV yield (for LSTs)
    if (isLST && protocolSlug) {
        const lstSlug = protocolSlug === "jito" ? "jitosol" :
                       protocolSlug === "marinade" ? "msol" :
                       protocolSlug === "jupiter" ? "jupsol" : null;
        if (lstSlug) {
            const lstData = getLSTData(lstSlug);
            if (lstData?.mevBoost) {
                sources.push("mev");
                mev = lstData.mevBoost;
            }
        }
    }

    const total = base + reward;
    const sustainable = base + (mev || 0);

    return {
        base,
        reward,
        points,
        mev,
        total,
        sustainable,
        sources,
    };
}

// ============================================
// TVL Trend Analysis
// ============================================

export type TvlTrend = "growing" | "stable" | "declining" | "volatile";

export interface TvlTrendData {
    trend: TvlTrend;
    change7d: number;
    change30d: number;
    isHealthy: boolean;
}

export function analyzeTvlTrend(
    currentTvl: number,
    tvl7dAgo: number | null,
    tvl30dAgo: number | null
): TvlTrendData {
    const change7d = tvl7dAgo ? ((currentTvl - tvl7dAgo) / tvl7dAgo) * 100 : 0;
    const change30d = tvl30dAgo ? ((currentTvl - tvl30dAgo) / tvl30dAgo) * 100 : 0;

    let trend: TvlTrend;
    if (change30d > 20) trend = "growing";
    else if (change30d < -20) trend = "declining";
    else if (Math.abs(change7d) > 15) trend = "volatile";
    else trend = "stable";

    // Consider healthy if not declining significantly
    const isHealthy = change30d > -15;

    return {
        trend,
        change7d: Math.round(change7d * 10) / 10,
        change30d: Math.round(change30d * 10) / 10,
        isHealthy,
    };
}

// ============================================
// Volatility & Risk Metrics
// ============================================

export interface VolatilityMetrics {
    sigma: number; // Standard deviation of APY
    sharpeRatio: number; // Risk-adjusted return
    volatilityLevel: "low" | "medium" | "high" | "very_high";
    apyStabilityScore: number; // 0-100, higher is more stable
}

export function calculateVolatilityMetrics(
    avgApy: number,
    sigma: number,
    riskFreeRate: number = 5 // Assume ~5% risk-free rate for SOL staking
): VolatilityMetrics {
    // Sharpe Ratio = (Return - Risk Free Rate) / Volatility
    const sharpeRatio = sigma > 0 ? (avgApy - riskFreeRate) / sigma : 0;

    // Determine volatility level
    let volatilityLevel: "low" | "medium" | "high" | "very_high";
    if (sigma < 1) volatilityLevel = "low";
    else if (sigma < 5) volatilityLevel = "medium";
    else if (sigma < 15) volatilityLevel = "high";
    else volatilityLevel = "very_high";

    // APY Stability Score (inverse of volatility, normalized)
    const apyStabilityScore = Math.max(0, Math.min(100, 100 - sigma * 5));

    return {
        sigma: Math.round(sigma * 100) / 100,
        sharpeRatio: Math.round(sharpeRatio * 100) / 100,
        volatilityLevel,
        apyStabilityScore: Math.round(apyStabilityScore),
    };
}
