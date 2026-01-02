/**
 * Index Module Registry
 * Maps company slugs to their index module functions and chain information
 *
 * NOW CONFIG-DRIVEN: Dynamically generated from company-configs.ts
 */

import { Company } from "./companies";
import { IndexData, IndexScore } from "@/lib/api/types";
import {
    COMPANY_CONFIGS,
    SupportedChain,
} from "./company-configs";
import {
    fetchCompanyData,
    calculateCompanyScore,
    getCompanyData,
} from "./generic-company";

// Company metadata
export interface CompanyMetadata {
    chain: SupportedChain;
    name: string;
    description?: string;
    blogUrl?: string;
    mediumUrl?: string;
}

// Type for index module functions
export interface IndexModule {
    fetchData: () => Promise<IndexData>;
    calculateScore: (data?: IndexData) => Promise<IndexScore>;
    getCompanyData: (
        data?: IndexData,
        score?: IndexScore
    ) => Promise<Company>;
}

// Registry entry combining metadata and module loader
export interface RegistryEntry {
    metadata: CompanyMetadata;
    loader: () => Promise<IndexModule>;
}

// Re-export SupportedChain for backward compatibility
export type { SupportedChain };

// Dynamically build registry from company configs
export const INDEX_REGISTRY: Record<string, RegistryEntry> = {};

// Populate registry from COMPANY_CONFIGS
COMPANY_CONFIGS.forEach((config) => {
    INDEX_REGISTRY[config.slug] = {
        metadata: {
            chain: config.onchain.chain,
            name: config.name,
            description: config.description,
            blogUrl: config.blogUrl,
            mediumUrl: config.mediumUrl,
        },
        loader: async () => {
            return {
                fetchData: () => fetchCompanyData(config),
                calculateScore: (data?: IndexData) =>
                    calculateCompanyScore(config, data),
                getCompanyData: (data?: IndexData, score?: IndexScore) =>
                    getCompanyData(config, data, score),
            };
        },
    };
});

/**
 * Get index module for a company slug
 */
export async function getIndexModule(
    slug: string
): Promise<IndexModule | null> {
    const entry = INDEX_REGISTRY[slug.toLowerCase()];
    if (!entry) {
        return null;
    }
    return entry.loader();
}

/**
 * Get company metadata for a slug
 */
export function getCompanyMetadata(slug: string): CompanyMetadata | null {
    const entry = INDEX_REGISTRY[slug.toLowerCase()];
    return entry?.metadata || null;
}

/**
 * Get all available company slugs
 */
export function getAvailableCompanySlugs(): string[] {
    return Object.keys(INDEX_REGISTRY);
}

/**
 * Get all companies for a specific chain
 */
export function getCompaniesByChain(chain: SupportedChain): string[] {
    return Object.entries(INDEX_REGISTRY)
        .filter(([_, entry]) => entry.metadata.chain === chain)
        .map(([slug]) => slug);
}

/**
 * Get RPC configuration info for a chain
 */
export function getChainRpcInfo(chain: SupportedChain): {
    envVar: string;
    defaultUrl?: string;
    description: string;
} {
    switch (chain) {
        case "ethereum":
            return {
                envVar: "ETHEREUM_RPC_URL",
                defaultUrl: "Public RPC endpoints",
                description:
                    "Ethereum RPC (supports Alchemy API key or custom RPC)",
            };
        case "solana":
            return {
                envVar: "SOLANA_RPC_URL",
                defaultUrl: "Public Solana RPC",
                description:
                    "Solana RPC (supports Helius API key or custom RPC)",
            };
        default:
            return {
                envVar: `${chain.toUpperCase()}_RPC_URL`,
                description: `${chain} RPC endpoint`,
            };
    }
}
