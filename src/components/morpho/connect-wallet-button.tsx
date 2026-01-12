"use client";

import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi";
import { useState } from "react";
import { Wallet, ChevronDown, LogOut, Copy, Check, ExternalLink } from "lucide-react";
import { CHAIN_NAMES, BLOCK_EXPLORERS, type SupportedChainId } from "@/lib/wagmi/config";

export function ConnectWalletButton() {
    const { address, isConnected } = useAccount();
    const { connect, connectors, isPending } = useConnect();
    const { disconnect } = useDisconnect();
    const chainId = useChainId();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showConnectors, setShowConnectors] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    // Connected state
    if (isConnected && address) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white transition-colors"
                >
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="font-mono text-sm">{formatAddress(address)}</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {showDropdown && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowDropdown(false)}
                        />

                        {/* Dropdown menu */}
                        <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                            <div className="p-4 border-b border-slate-700">
                                <div className="text-xs text-slate-400 mb-1">Connected to</div>
                                <div className="font-medium text-white">
                                    {CHAIN_NAMES[chainId as SupportedChainId] || `Chain ${chainId}`}
                                </div>
                            </div>

                            <div className="p-2">
                                <button
                                    onClick={copyAddress}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 text-green-400" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                    <span>{copied ? "Copied!" : "Copy address"}</span>
                                </button>

                                <a
                                    href={`${BLOCK_EXPLORERS[chainId as SupportedChainId] || "https://etherscan.io"}/address/${address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    <span>View on Explorer</span>
                                </a>

                                <button
                                    onClick={() => {
                                        disconnect();
                                        setShowDropdown(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Disconnect</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // Disconnected state
    return (
        <div className="relative">
            <button
                onClick={() => setShowConnectors(!showConnectors)}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
            >
                <Wallet className="h-4 w-4" />
                <span>{isPending ? "Connecting..." : "Connect Wallet"}</span>
            </button>

            {showConnectors && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowConnectors(false)}
                    />

                    {/* Connectors menu */}
                    <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                        <div className="p-4 border-b border-slate-700">
                            <div className="font-medium text-white">Connect Wallet</div>
                            <div className="text-xs text-slate-400 mt-1">
                                Choose how you want to connect
                            </div>
                        </div>

                        <div className="p-2">
                            {connectors.map((connector) => (
                                <button
                                    key={connector.uid}
                                    onClick={() => {
                                        connect({ connector });
                                        setShowConnectors(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-3 text-left text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-slate-700 flex items-center justify-center">
                                        <Wallet className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{connector.name}</div>
                                        <div className="text-xs text-slate-500">
                                            {connector.name === "Injected"
                                                ? "Browser wallet"
                                                : "Connect via app"}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
