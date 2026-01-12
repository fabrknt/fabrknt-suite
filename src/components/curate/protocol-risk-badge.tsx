"use client";

import { Shield, Lock, Eye, Users, Clock, Radio, AlertTriangle } from "lucide-react";
import { PROTOCOL_RISK_DATA, type SolanaProtocolRisk } from "@/lib/solana/protocol-risk-data";

interface ProtocolRiskBadgeProps {
    protocolSlug: string;
    variant?: "compact" | "full";
}

const TRUST_COLORS = {
    high: {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
        bar: "bg-green-500",
    },
    medium: {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
        bar: "bg-yellow-500",
    },
    low: {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
        bar: "bg-red-500",
    },
};

function TrustBar({ level }: { level: "high" | "medium" | "low" }) {
    const width = level === "high" ? "80%" : level === "medium" ? "50%" : "25%";
    const colors = TRUST_COLORS[level];

    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${colors.bar}`}
                    style={{ width }}
                />
            </div>
            <span className={`text-xs font-medium uppercase ${colors.text}`}>{level}</span>
        </div>
    );
}

function CompactBadge({ risk }: { risk: SolanaProtocolRisk }) {
    const colors = TRUST_COLORS[risk.overallTrust];

    return (
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${colors.bg} border ${colors.border}`}>
            <Shield className={`h-3 w-3 ${colors.text}`} />
            <span className={`text-xs font-medium ${colors.text}`}>
                {risk.overallTrust === "high" ? "Trusted" : risk.overallTrust === "medium" ? "Moderate" : "Caution"}
            </span>
            {risk.audited && (
                <span className="text-xs text-slate-500">| Audited</span>
            )}
        </div>
    );
}

function FullBadge({ risk }: { risk: SolanaProtocolRisk }) {
    const colors = TRUST_COLORS[risk.overallTrust];

    return (
        <div className={`rounded-lg p-3 ${colors.bg} border ${colors.border}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Shield className={`h-4 w-4 ${colors.text}`} />
                    <span className="text-sm font-semibold text-white">{risk.name}</span>
                </div>
                <span className={`text-xs font-medium uppercase px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                    {risk.overallTrust} trust
                </span>
            </div>

            {/* Trust Bar */}
            <div className="mb-3">
                <TrustBar level={risk.overallTrust} />
            </div>

            {/* Security Info */}
            <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Audit Status */}
                <div className="flex items-center gap-1.5">
                    <Lock className={`h-3 w-3 ${risk.audited ? "text-green-400" : "text-red-400"}`} />
                    <span className="text-slate-400">
                        {risk.audited ? `Audited by ${risk.auditors.slice(0, 2).join(", ")}` : "Not Audited"}
                    </span>
                </div>

                {/* Open Source */}
                <div className="flex items-center gap-1.5">
                    <Eye className={`h-3 w-3 ${risk.openSource ? "text-green-400" : "text-slate-500"}`} />
                    <span className="text-slate-400">
                        {risk.openSource ? "Open Source" : "Closed Source"}
                    </span>
                </div>

                {/* Upgrade Authority */}
                <div className="flex items-center gap-1.5">
                    <Users className={`h-3 w-3 ${
                        risk.upgradeAuthority === "immutable" ? "text-green-400" :
                        risk.upgradeAuthority === "dao" || risk.upgradeAuthority === "multisig" ? "text-cyan-400" :
                        "text-yellow-400"
                    }`} />
                    <span className="text-slate-400 capitalize">
                        {risk.upgradeAuthority === "immutable" ? "Immutable" :
                         risk.upgradeAuthority === "dao" ? "DAO Governed" :
                         risk.upgradeAuthority === "multisig" ? "Multisig" : "Single Signer"}
                    </span>
                </div>

                {/* Launch Date */}
                <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span className="text-slate-400">
                        Live since {new Date(risk.launchDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                </div>

                {/* Oracle */}
                {risk.oracleDependency.length > 0 && (
                    <div className="flex items-center gap-1.5">
                        <Radio className="h-3 w-3 text-cyan-400" />
                        <span className="text-slate-400">
                            {risk.oracleDependency.join(", ")}
                        </span>
                    </div>
                )}

                {/* VC Backed */}
                {risk.vcBacked && (
                    <div className="flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-purple-400" />
                        <span className="text-slate-400">
                            VC: {risk.backers.slice(0, 2).join(", ")}
                        </span>
                    </div>
                )}
            </div>

            {/* Risk Notes */}
            {risk.riskNotes.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                    <div className="flex items-start gap-1.5">
                        <AlertTriangle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                            {risk.riskNotes.map((note, i) => (
                                <p key={i} className="text-xs text-slate-400">{note}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function ProtocolRiskBadge({ protocolSlug, variant = "compact" }: ProtocolRiskBadgeProps) {
    const risk = PROTOCOL_RISK_DATA[protocolSlug];

    if (!risk) {
        return null;
    }

    if (variant === "compact") {
        return <CompactBadge risk={risk} />;
    }

    return <FullBadge risk={risk} />;
}

// Helper to get risk data for use in other components
export function getProtocolRisk(protocolSlug: string): SolanaProtocolRisk | null {
    return PROTOCOL_RISK_DATA[protocolSlug] || null;
}
