import { http, createConfig, createStorage } from "wagmi";
import { mainnet, base } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

// WalletConnect project ID - get from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

export const wagmiConfig = createConfig({
    chains: [mainnet, base],
    connectors: [
        injected(),
        ...(projectId
            ? [
                  walletConnect({
                      projectId,
                      metadata: {
                          name: "CURATE by Fabrknt",
                          description: "AI-Powered DeFi Yield Curation",
                          url: "https://fabrknt.com",
                          icons: ["https://fabrknt.com/icon.png"],
                      },
                  }),
              ]
            : []),
    ],
    transports: {
        [mainnet.id]: http(
            process.env.NEXT_PUBLIC_ETH_RPC_URL ||
                "https://eth-mainnet.g.alchemy.com/v2/demo"
        ),
        [base.id]: http(
            process.env.NEXT_PUBLIC_BASE_RPC_URL ||
                "https://mainnet.base.org"
        ),
    },
    // Use noopStorage for SSR compatibility
    storage: createStorage({
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
    }),
    ssr: true,
});

// Supported chain IDs for Morpho
export const SUPPORTED_CHAIN_IDS = [mainnet.id, base.id] as const;
export type SupportedChainId = (typeof SUPPORTED_CHAIN_IDS)[number];

// Chain names for display
export const CHAIN_NAMES: Record<SupportedChainId, string> = {
    [mainnet.id]: "Ethereum",
    [base.id]: "Base",
};

// Block explorers
export const BLOCK_EXPLORERS: Record<SupportedChainId, string> = {
    [mainnet.id]: "https://etherscan.io",
    [base.id]: "https://basescan.org",
};
