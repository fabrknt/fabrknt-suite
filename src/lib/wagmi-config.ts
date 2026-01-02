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
        const { mainnet, base, polygon, optimism } = require("wagmi/chains");

        wagmiConfigCache = getDefaultConfig({
            appName: "Fabrknt Synergy",
            projectId:
                process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
                "YOUR_PROJECT_ID",
            chains: [mainnet, base, polygon, optimism],
            ssr: true, // Enable server-side rendering support
        });
    }
    return wagmiConfigCache;
}
