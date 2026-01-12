// Curated Solana Protocol Risk Data
// Manually researched and maintained for accuracy

export interface SolanaProtocolRisk {
    slug: string;
    name: string;
    // Security
    audited: boolean;
    auditors: string[];
    openSource: boolean;
    programUpgradeable: boolean;
    upgradeAuthority: "multisig" | "dao" | "single" | "immutable";
    // Trust
    teamKnown: boolean;
    vcBacked: boolean;
    backers: string[];
    launchDate: string; // ISO date
    // Technical
    oracleDependency: string[];
    hasInsurance: boolean;
    // For liquid staking protocols
    validatorCount?: number;
    validatorConcentration?: number; // % held by top 3 validators
    // Risk assessment
    overallTrust: "high" | "medium" | "low";
    riskNotes: string[];
}

// Curated risk data for major Solana protocols
// Last updated: January 2025
export const PROTOCOL_RISK_DATA: Record<string, SolanaProtocolRisk> = {
    kamino: {
        slug: "kamino",
        name: "Kamino Finance",
        audited: true,
        auditors: ["OtterSec", "Neodyme"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: true,
        vcBacked: true,
        backers: ["Multicoin Capital", "Pantera Capital", "Coinbase Ventures"],
        launchDate: "2023-03-01",
        oracleDependency: ["Pyth"],
        hasInsurance: false,
        overallTrust: "high",
        riskNotes: [
            "Multiple audits completed",
            "Strong VC backing and known team",
            "Rapidly growing TVL indicates market confidence",
        ],
    },
    marginfi: {
        slug: "marginfi",
        name: "marginfi",
        audited: true,
        auditors: ["OtterSec", "Zellic"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: true,
        vcBacked: true,
        backers: ["Multicoin Capital", "Pantera Capital", "Solana Ventures"],
        launchDate: "2023-04-01",
        oracleDependency: ["Pyth", "Switchboard"],
        hasInsurance: false,
        overallTrust: "high",
        riskNotes: [
            "Dual oracle setup for price feed redundancy",
            "Active governance and transparent operations",
            "Points program driving significant growth",
        ],
    },
    save: {
        slug: "save",
        name: "Save (Solend)",
        audited: true,
        auditors: ["Kudelski Security", "OtterSec"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "dao",
        teamKnown: true,
        vcBacked: true,
        backers: ["Polychain Capital", "Dragonfly", "Race Capital"],
        launchDate: "2021-08-01",
        oracleDependency: ["Pyth", "Switchboard"],
        hasInsurance: false,
        overallTrust: "high",
        riskNotes: [
            "One of the oldest Solana lending protocols",
            "DAO-governed upgrade authority",
            "Survived 2022 market stress events",
            "Rebranded from Solend to Save",
        ],
    },
    meteora: {
        slug: "meteora",
        name: "Meteora",
        audited: true,
        auditors: ["OtterSec", "Offside Labs"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: true,
        vcBacked: true,
        backers: ["Jump Crypto", "Alameda Research (pre-collapse)"],
        launchDate: "2022-12-01",
        oracleDependency: ["Pyth"],
        hasInsurance: false,
        overallTrust: "high",
        riskNotes: [
            "Dynamic liquidity market maker (DLMM) technology",
            "Higher IL risk due to concentrated liquidity",
            "Strong technical innovation",
        ],
    },
    raydium: {
        slug: "raydium",
        name: "Raydium",
        audited: true,
        auditors: ["Kudelski Security", "MadShield"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: false,
        vcBacked: true,
        backers: ["DeFiance Capital", "CMS Holdings"],
        launchDate: "2021-02-01",
        oracleDependency: [],
        hasInsurance: false,
        overallTrust: "medium",
        riskNotes: [
            "One of the oldest Solana AMMs",
            "Team is pseudonymous",
            "Integrated with Serum (now OpenBook)",
            "Large ecosystem of liquidity pools",
        ],
    },
    orca: {
        slug: "orca",
        name: "Orca",
        audited: true,
        auditors: ["Kudelski Security", "Neodyme"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: true,
        vcBacked: true,
        backers: ["Polychain Capital", "Placeholder VC", "Three Arrows (pre-collapse)"],
        launchDate: "2021-02-01",
        oracleDependency: ["Pyth"],
        hasInsurance: false,
        overallTrust: "high",
        riskNotes: [
            "User-friendly interface and strong UX focus",
            "Whirlpools concentrated liquidity innovation",
            "Known and respected team",
        ],
    },
    jupiter: {
        slug: "jupiter",
        name: "Jupiter",
        audited: true,
        auditors: ["OtterSec", "Offside Labs"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: true,
        vcBacked: false,
        backers: [],
        launchDate: "2021-10-01",
        oracleDependency: ["Multiple (aggregated)"],
        hasInsurance: false,
        overallTrust: "high",
        riskNotes: [
            "Dominant swap aggregator on Solana",
            "Self-funded, no VC backing",
            "JUP token launched with successful airdrop",
            "Expanding into perps and other products",
        ],
    },
    jito: {
        slug: "jito",
        name: "Jito",
        audited: true,
        auditors: ["OtterSec", "Neodyme"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: true,
        vcBacked: true,
        backers: ["Multicoin Capital", "Framework Ventures"],
        launchDate: "2022-11-01",
        oracleDependency: [],
        hasInsurance: false,
        validatorCount: 200,
        validatorConcentration: 15, // Top 3 validators hold ~15%
        overallTrust: "high",
        riskNotes: [
            "MEV-powered liquid staking provides additional yield",
            "Strong validator set diversification",
            "JTO token governance",
            "Leading LST by market share",
        ],
    },
    marinade: {
        slug: "marinade",
        name: "Marinade Finance",
        audited: true,
        auditors: ["Neodyme", "Ackee Blockchain"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "dao",
        teamKnown: true,
        vcBacked: true,
        backers: ["Coinbase Ventures", "Solana Foundation"],
        launchDate: "2021-08-01",
        oracleDependency: [],
        hasInsurance: false,
        validatorCount: 450,
        validatorConcentration: 8, // Top 3 validators hold ~8%
        overallTrust: "high",
        riskNotes: [
            "DAO-governed with MNDE token",
            "Best validator decentralization among LSTs",
            "Native staking option available",
            "Long track record of secure operations",
        ],
    },
    sanctum: {
        slug: "sanctum",
        name: "Sanctum",
        audited: true,
        auditors: ["OtterSec"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: true,
        vcBacked: true,
        backers: ["Dragonfly", "Solana Ventures"],
        launchDate: "2024-01-01",
        oracleDependency: ["Pyth"],
        hasInsurance: false,
        overallTrust: "medium",
        riskNotes: [
            "Newer protocol - less battle-tested",
            "LST liquidity hub innovation",
            "Enables instant unstaking across LSTs",
            "Growing rapidly in TVL",
        ],
    },
    drift: {
        slug: "drift",
        name: "Drift Protocol",
        audited: true,
        auditors: ["OtterSec", "Zellic"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: true,
        vcBacked: true,
        backers: ["Multicoin Capital", "Jump Crypto"],
        launchDate: "2021-11-01",
        oracleDependency: ["Pyth"],
        hasInsurance: false,
        overallTrust: "high",
        riskNotes: [
            "Leading perpetuals protocol on Solana",
            "Also offers spot trading and lending",
            "DRIFT token governance",
        ],
    },
    solblaze: {
        slug: "solblaze",
        name: "SolBlaze",
        audited: true,
        auditors: ["Halborn"],
        openSource: true,
        programUpgradeable: true,
        upgradeAuthority: "multisig",
        teamKnown: false,
        vcBacked: false,
        backers: [],
        launchDate: "2022-09-01",
        oracleDependency: [],
        hasInsurance: false,
        validatorCount: 200,
        validatorConcentration: 12,
        overallTrust: "medium",
        riskNotes: [
            "Community-driven liquid staking",
            "Pseudonymous team",
            "Custom staking pool feature",
            "Good validator diversification",
        ],
    },
};

// Get risk data for a protocol
export function getProtocolRiskData(slug: string): SolanaProtocolRisk | null {
    return PROTOCOL_RISK_DATA[slug] || null;
}

// Calculate a trust score (0-100) from risk data
export function calculateTrustScore(risk: SolanaProtocolRisk): number {
    let score = 50; // Base score

    // Security factors (+30 max)
    if (risk.audited) score += 15;
    if (risk.auditors.length >= 2) score += 5;
    if (risk.openSource) score += 5;
    if (risk.upgradeAuthority === "dao" || risk.upgradeAuthority === "multisig") score += 5;

    // Trust factors (+20 max)
    if (risk.teamKnown) score += 10;
    if (risk.vcBacked) score += 5;
    if (risk.backers.length >= 2) score += 5;

    // Age factor (+10 max)
    const launchDate = new Date(risk.launchDate);
    const ageInMonths = (Date.now() - launchDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (ageInMonths >= 24) score += 10;
    else if (ageInMonths >= 12) score += 5;

    // Penalty factors
    if (risk.upgradeAuthority === "single") score -= 15;
    if (!risk.teamKnown && !risk.vcBacked) score -= 10;

    return Math.max(0, Math.min(100, score));
}

// Get trust level label from score
export function getTrustLevel(score: number): "high" | "medium" | "low" {
    if (score >= 75) return "high";
    if (score >= 50) return "medium";
    return "low";
}
