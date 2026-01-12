import { mainnet, base } from "wagmi/chains";

// Morpho contract addresses
export const MORPHO_ADDRESSES = {
    // Morpho Blue core contract (same on both chains)
    morphoBlue: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb" as const,

    // MetaMorpho Factory V1.1 (same on both chains)
    metaMorphoFactory: "0x1897A8997241C1cD4bD0698647e4EB7213535c24" as const,

    // Vault V2 Factory (Ethereum only for now)
    vaultV2Factory: "0xA1D94F746dEfa1928926b84fB2596c06926C0405" as const,

    // Registry
    morphoRegistry: "0x3696c5eAe4a7Ffd04Ea163564571E9CD8Ed9364e" as const,
} as const;

// Supported chains for Morpho
export const MORPHO_SUPPORTED_CHAINS = [mainnet.id, base.id] as const;

// Chain-specific addresses (if they differ)
export const CHAIN_ADDRESSES: Record<
    number,
    {
        morphoBlue: `0x${string}`;
        metaMorphoFactory: `0x${string}`;
    }
> = {
    [mainnet.id]: {
        morphoBlue: MORPHO_ADDRESSES.morphoBlue,
        metaMorphoFactory: MORPHO_ADDRESSES.metaMorphoFactory,
    },
    [base.id]: {
        morphoBlue: MORPHO_ADDRESSES.morphoBlue,
        metaMorphoFactory: MORPHO_ADDRESSES.metaMorphoFactory,
    },
};

// Common ERC20 token addresses
export const TOKEN_ADDRESSES: Record<number, Record<string, `0x${string}`>> = {
    [mainnet.id]: {
        USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    },
    [base.id]: {
        USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        USDbC: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
        WETH: "0x4200000000000000000000000000000000000006",
        cbETH: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
    },
};

// Popular assets for vault creation
export const VAULT_ASSETS: Record<
    number,
    Array<{ symbol: string; address: `0x${string}`; decimals: number }>
> = {
    [mainnet.id]: [
        { symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
        { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 },
        { symbol: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", decimals: 18 },
        { symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18 },
    ],
    [base.id]: [
        { symbol: "USDC", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", decimals: 6 },
        { symbol: "USDbC", address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA", decimals: 6 },
        { symbol: "WETH", address: "0x4200000000000000000000000000000000000006", decimals: 18 },
    ],
};

// MetaMorpho Factory ABI (createMetaMorpho function)
export const META_MORPHO_FACTORY_ABI = [
    {
        name: "createMetaMorpho",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "initialOwner", type: "address" },
            { name: "initialTimelock", type: "uint256" },
            { name: "asset", type: "address" },
            { name: "name", type: "string" },
            { name: "symbol", type: "string" },
            { name: "salt", type: "bytes32" },
        ],
        outputs: [{ name: "metaMorpho", type: "address" }],
    },
    {
        name: "isMetaMorpho",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "target", type: "address" }],
        outputs: [{ name: "", type: "bool" }],
    },
    {
        name: "MORPHO",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "address" }],
    },
] as const;

// MetaMorpho vault ABI (basic read functions)
export const META_MORPHO_ABI = [
    {
        name: "asset",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "address" }],
    },
    {
        name: "totalAssets",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "totalSupply",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "name",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "string" }],
    },
    {
        name: "symbol",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "string" }],
    },
    {
        name: "owner",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "address" }],
    },
    {
        name: "curator",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "address" }],
    },
    {
        name: "timelock",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "fee",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint96" }],
    },
    {
        name: "supplyQueueLength",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "withdrawQueueLength",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
] as const;

// Morpho API endpoint
export const MORPHO_API_URL = "https://blue-api.morpho.org/graphql";
