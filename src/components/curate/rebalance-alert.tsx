"use client";

import { useState, useEffect } from "react";
import {
    AlertTriangle,
    TrendingDown,
    Shield,
    Lightbulb,
    AlertCircle,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    RefreshCw,
    X,
    ArrowRight,
    Clock,
} from "lucide-react";
import { useAllocation } from "@/contexts/allocation-context";
import {
    RebalanceAnalysis,
    RebalanceAlert as RebalanceAlertType,
    AlertSeverity,
    AlertType,
} from "@/lib/curate/rebalance-detector";

const SEVERITY_STYLES: Record<AlertSeverity, {
    bg: string;
    border: string;
    icon: string;
    badge: string;
}> = {
    critical: {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        icon: "text-red-400",
        badge: "bg-red-500/20 text-red-400",
    },
    warning: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        icon: "text-orange-400",
        badge: "bg-orange-500/20 text-orange-400",
    },
    info: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        icon: "text-cyan-400",
        badge: "bg-cyan-500/20 text-cyan-400",
    },
};

const ALERT_TYPE_ICONS: Record<AlertType, React.ElementType> = {
    apy_drop: TrendingDown,
    risk_increase: Shield,
    better_alternative: Lightbulb,
    protocol_issue: AlertCircle,
};

const HEALTH_STYLES = {
    healthy: {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
        icon: CheckCircle,
    },
    attention: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        text: "text-orange-400",
        icon: AlertTriangle,
    },
    action_needed: {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
        icon: AlertCircle,
    },
};

interface AlertCardProps {
    alert: RebalanceAlertType;
    onDismiss?: (id: string) => void;
}

function AlertCard({ alert, onDismiss }: AlertCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const styles = SEVERITY_STYLES[alert.severity];
    const Icon = ALERT_TYPE_ICONS[alert.type];

    return (
        <div className={`${styles.bg} border ${styles.border} rounded-lg p-4`}>
            <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 ${styles.icon} shrink-0 mt-0.5`} />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-white">{alert.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${styles.badge}`}>
                            {alert.severity}
                        </span>
                    </div>

                    <p className="text-sm text-slate-400 mt-1">{alert.message}</p>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 mt-2 transition-colors"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="h-3 w-3" />
                                Less details
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-3 w-3" />
                                More details
                            </>
                        )}
                    </button>

                    {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <ArrowRight className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-300">{alert.action}</span>
                            </div>

                            {alert.impact.potentialGain && (
                                <div className="flex items-center gap-2 text-sm">
                                    <TrendingDown className="h-4 w-4 text-slate-500" />
                                    <span className="text-slate-400">
                                        Potential impact: {alert.impact.potentialGain.toFixed(1)}% APY difference
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Clock className="h-3 w-3" />
                                <span>
                                    Detected {new Date(alert.createdAt).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {onDismiss && (
                    <button
                        onClick={() => onDismiss(alert.id)}
                        className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

interface RebalanceAlertsProps {
    className?: string;
}

export function RebalanceAlerts({ className = "" }: RebalanceAlertsProps) {
    const { allocation, riskTolerance, hasAllocation } = useAllocation();
    const [analysis, setAnalysis] = useState<RebalanceAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

    const fetchAlerts = async () => {
        if (!hasAllocation || !allocation) return;

        setIsLoading(true);
        try {
            const response = await fetch("/api/curate/alerts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    allocations: allocation.allocations,
                    riskTolerance,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setAnalysis(data.data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch alerts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allocation, riskTolerance, hasAllocation]);

    const handleDismiss = (alertId: string) => {
        setDismissedAlerts(prev => new Set([...prev, alertId]));
    };

    if (!hasAllocation || !allocation) {
        return null;
    }

    const visibleAlerts = analysis?.alerts.filter(a => !dismissedAlerts.has(a.id)) || [];
    const healthStyle = analysis ? HEALTH_STYLES[analysis.overallHealth] : HEALTH_STYLES.healthy;
    const HealthIcon = healthStyle.icon;

    return (
        <div className={`${className}`}>
            {/* Health Status Header */}
            <div
                className={`${healthStyle.bg} border ${healthStyle.border} rounded-xl p-4 cursor-pointer`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <HealthIcon className={`h-5 w-5 ${healthStyle.text}`} />
                        <div>
                            <h3 className="font-medium text-white">Allocation Health</h3>
                            <p className="text-sm text-slate-400">
                                {isLoading ? "Checking..." : analysis?.summary || "Loading..."}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                fetchAlerts();
                            }}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                            disabled={isLoading}
                        >
                            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        </button>

                        {visibleAlerts.length > 0 && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${healthStyle.text} bg-slate-800`}>
                                {visibleAlerts.length}
                            </span>
                        )}

                        {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                        )}
                    </div>
                </div>
            </div>

            {/* Alerts List */}
            {isExpanded && visibleAlerts.length > 0 && (
                <div className="mt-3 space-y-3">
                    {visibleAlerts.map(alert => (
                        <AlertCard
                            key={alert.id}
                            alert={alert}
                            onDismiss={handleDismiss}
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {isExpanded && !isLoading && visibleAlerts.length === 0 && analysis && (
                <div className="mt-3 p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">
                        No issues detected. Your allocation is optimized for your risk profile.
                    </p>
                </div>
            )}

            {/* Last Checked */}
            {analysis && (
                <div className="mt-2 text-xs text-slate-500 text-right">
                    Last checked: {new Date(analysis.lastChecked).toLocaleTimeString()}
                </div>
            )}
        </div>
    );
}

// Compact version for embedding in other components
export function RebalanceAlertsBadge() {
    const { allocation, riskTolerance, hasAllocation } = useAllocation();
    const [alertCount, setAlertCount] = useState(0);
    const [severity, setSeverity] = useState<AlertSeverity>("info");

    useEffect(() => {
        if (!hasAllocation || !allocation) return;

        const fetchAlertCount = async () => {
            try {
                const response = await fetch("/api/curate/alerts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        allocations: allocation.allocations,
                        riskTolerance,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data.alerts) {
                        setAlertCount(data.data.alerts.length);
                        // Set severity based on most severe alert
                        const alerts = data.data.alerts;
                        if (alerts.some((a: RebalanceAlertType) => a.severity === "critical")) {
                            setSeverity("critical");
                        } else if (alerts.some((a: RebalanceAlertType) => a.severity === "warning")) {
                            setSeverity("warning");
                        } else {
                            setSeverity("info");
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch alert count:", error);
            }
        };

        fetchAlertCount();
    }, [allocation, riskTolerance, hasAllocation]);

    if (!hasAllocation || alertCount === 0) {
        return null;
    }

    const styles = SEVERITY_STYLES[severity];

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles.badge}`}>
            <AlertTriangle className="h-3 w-3" />
            {alertCount}
        </span>
    );
}
