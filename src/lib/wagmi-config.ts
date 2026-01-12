import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import type { Config } from "wagmi";

let wagmiConfigCache: Config | null = null;

export function getWagmiConfig(): Config {
    // Only create config on client side
    if (typeof window === "undefined") {
        // Return a placeholder that will be replaced on client
        return null as any;
    }

    if (!wagmiConfigCache) {
        // Lazy import chains to avoid SSR issues
        const { mainnet, base, polygon, optimism, sepolia, baseSepolia, optimismSepolia } = require("wagmi/chains");

        const isProduction = process.env.NODE_ENV === "production";

        // Use mainnets in production, testnets in development
        const chains = isProduction
            ? [mainnet, base, polygon, optimism]
            : [sepolia, baseSepolia, optimismSepolia, mainnet, base];

        wagmiConfigCache = getDefaultConfig({
            appName: "Fabrknt Synergy",
            projectId:
                process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
                "YOUR_PROJECT_ID",
            chains: chains as any,
            ssr: true, // Enable server-side rendering support
        });
    }
    return wagmiConfigCache;
}
