// Morpho market and vault types

export interface MorphoMarket {
    id: string; // Market unique key (hash)
    loanToken: {
        address: string;
        symbol: string;
        decimals: number;
    };
    collateralToken: {
        address: string;
        symbol: string;
        decimals: number;
    };
    oracle: string;
    irm: string; // Interest Rate Model address
    lltv: string; // Liquidation LTV in basis points

    // Market state
    totalSupplyAssets: string;
    totalBorrowAssets: string;
    supplyApy: number;
    borrowApy: number;
    utilization: number;

    // Risk metrics
    riskScore?: number;
}

export interface MorphoVaultState {
    address: string;
    name: string;
    symbol: string;
    asset: {
        address: string;
        symbol: string;
        decimals: number;
    };
    totalAssets: string;
    totalSupply: string;
    owner: string;
    curator: string;
    timelock: number;
    fee: number;
    supplyQueueLength: number;
    withdrawQueueLength: number;
}

export interface CreateVaultParams {
    chainId: number;
    initialOwner: string;
    initialTimelock: number; // in seconds
    asset: string;
    name: string;
    symbol: string;
    salt?: string; // Optional for deterministic deployment
}

export interface MorphoApiMarket {
    uniqueKey: string;
    loanAsset: {
        address: string;
        symbol: string;
        decimals: number;
    };
    collateralAsset: {
        address: string;
        symbol: string;
        decimals: number;
    };
    oracle: {
        address: string;
    };
    irmAddress: string;
    lltv: string;
    state: {
        supplyAssets: string;
        borrowAssets: string;
        supplyShares: string;
        borrowShares: string;
        liquidityAssets: string;
        utilization: number;
        supplyApy: number;
        borrowApy: number;
        fee: number;
    };
    dailyApys?: {
        supplyApy: number;
        borrowApy: number;
    };
    weeklyApys?: {
        supplyApy: number;
        borrowApy: number;
    };
}

export interface MorphoApiResponse<T> {
    data: T;
    errors?: Array<{ message: string }>;
}

// GraphQL response types
export interface MarketsQueryResponse {
    markets: {
        items: MorphoApiMarket[];
        pageInfo?: {
            count: number;
            countTotal: number;
        };
    };
}
