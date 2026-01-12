// Solana Protocol Constants and Metadata

export interface SolanaProtocol {
    slug: string;
    name: string;
    category: "lending" | "amm" | "liquid-staking" | "aggregator" | "lst-hub";
    website: string;
    twitter?: string;
    description: string;
}

// Major Solana DeFi protocols tracked by the platform
export const SOLANA_PROTOCOLS: Record<string, SolanaProtocol> = {
    kamino: {
        slug: "kamino",
        name: "Kamino Finance",
        category: "lending",
        website: "https://kamino.finance",
        twitter: "KaminoFinance",
        description: "Automated liquidity and lending protocol on Solana",
    },
    marginfi: {
        slug: "marginfi",
        name: "marginfi",
        category: "lending",
        website: "https://marginfi.com",
        twitter: "marginaborrowlend",
        description: "Decentralized lending protocol on Solana",
    },
    save: {
        slug: "save",
        name: "Save (Solend)",
        category: "lending",
        website: "https://save.finance",
        twitter: "solaborrowlend",
        description: "Algorithmic, decentralized lending protocol on Solana",
    },
    meteora: {
        slug: "meteora",
        name: "Meteora",
        category: "amm",
        website: "https://meteora.ag",
        twitter: "MeteoraAG",
        description: "Dynamic AMM and liquidity protocol on Solana",
    },
    raydium: {
        slug: "raydium",
        name: "Raydium",
        category: "amm",
        website: "https://raydium.io",
        twitter: "RaydiumProtocol",
        description: "AMM and liquidity provider on Solana",
    },
    orca: {
        slug: "orca",
        name: "Orca",
        category: "amm",
        website: "https://orca.so",
        twitter: "orca_so",
        description: "User-friendly DEX on Solana with concentrated liquidity",
    },
    jupiter: {
        slug: "jupiter",
        name: "Jupiter",
        category: "aggregator",
        website: "https://jup.ag",
        twitter: "JupiterExchange",
        description: "Leading swap aggregator on Solana",
    },
    jito: {
        slug: "jito",
        name: "Jito",
        category: "liquid-staking",
        website: "https://jito.network",
        twitter: "jaborrowlendto_sol",
        description: "MEV-powered liquid staking on Solana",
    },
    marinade: {
        slug: "marinade",
        name: "Marinade Finance",
        category: "liquid-staking",
        website: "https://marinade.finance",
        twitter: "MarinadeFinance",
        description: "Non-custodial liquid staking on Solana",
    },
    sanctum: {
        slug: "sanctum",
        name: "Sanctum",
        category: "lst-hub",
        website: "https://sanctum.so",
        twitter: "sanctumso",
        description: "LST liquidity hub enabling instant unstaking",
    },
    drift: {
        slug: "drift",
        name: "Drift Protocol",
        category: "lending",
        website: "https://drift.trade",
        twitter: "DriftProtocol",
        description: "Decentralized perpetuals and spot exchange",
    },
    solblaze: {
        slug: "solblaze",
        name: "SolBlaze",
        category: "liquid-staking",
        website: "https://solblaze.org",
        twitter: "solaborrowlendblaze",
        description: "Decentralized liquid staking protocol",
    },
};

// Protocol slugs as they appear in DefiLlama data
// Maps DefiLlama project names to our protocol slugs
export const DEFILLAMA_TO_SLUG: Record<string, string> = {
    "kamino-lend": "kamino",
    "kamino-liquidity": "kamino",
    "kamino": "kamino",
    "marginfi": "marginfi",
    "marginfi-lend": "marginfi",
    "solend": "save",
    "save": "save",
    "meteora": "meteora",
    "meteora-dlmm": "meteora",
    "raydium": "raydium",
    "raydium-concentrated-liquidity": "raydium",
    "orca": "orca",
    "jupiter": "jupiter",
    "jupiter-perps": "jupiter",
    "jito": "jito",
    "marinade-finance": "marinade",
    "marinade": "marinade",
    "sanctum": "sanctum",
    "sanctum-infinity": "sanctum",
    "drift-protocol": "drift",
    "drift": "drift",
    "solblaze": "solblaze",
    "blazestake": "solblaze",
};

// Get protocol slug from DefiLlama project name
export function getProtocolSlug(defillamaProject: string): string | null {
    const normalized = defillamaProject.toLowerCase().replace(/\s+/g, "-");
    return DEFILLAMA_TO_SLUG[normalized] || null;
}

// Get protocol metadata by slug
export function getProtocol(slug: string): SolanaProtocol | null {
    return SOLANA_PROTOCOLS[slug] || null;
}

// List of all tracked protocol slugs
export const TRACKED_PROTOCOL_SLUGS = Object.keys(SOLANA_PROTOCOLS);

// Category labels for display
export const CATEGORY_LABELS: Record<string, string> = {
    lending: "Lending",
    amm: "AMM / DEX",
    "liquid-staking": "Liquid Staking",
    aggregator: "Aggregator",
    "lst-hub": "LST Hub",
};
