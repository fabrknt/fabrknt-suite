"use client";

import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { queryClient } from "@/lib/query-client";
import { getWagmiConfig } from "@/lib/wagmi-config";
import "@rainbow-me/rainbowkit/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
        // Only get config on client side
        try {
            setConfig(getWagmiConfig());
        } catch (error) {
            console.error("Failed to initialize wagmi config:", error);
        }
    }, []);

    // Prevent hydration issues by not rendering providers until mounted
    if (!mounted || !config) {
        return <>{children}</>;
    }

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
