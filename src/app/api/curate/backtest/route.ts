import { NextRequest, NextResponse } from "next/server";

interface HistoryDataPoint {
    timestamp: string;
    apy: number;
    apyBase: number;
    apyReward: number;
    tvlUsd: number;
}

interface BacktestResult {
    poolId: string;
    project: string;
    symbol: string;
    initialAmount: number;
    finalAmount: number;
    totalReturn: number;
    totalReturnPercent: number;
    avgApy: number;
    minApy: number;
    maxApy: number;
    volatility: number;
    dataPoints: {
        date: string;
        apy: number;
        cumulativeValue: number;
    }[];
}

interface BacktestResponse {
    results: BacktestResult[];
    winner: string;
    period: {
        start: string;
        end: string;
        days: number;
    };
    settings: {
        initialAmount: number;
        compounding: string;
    };
}

// Calculate standard deviation
function calculateStdDev(values: number[]): number {
    if (values.length === 0) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
    return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / values.length);
}

// Fetch historical data for a pool
async function fetchPoolHistory(
    poolId: string,
    days: number
): Promise<{ data: HistoryDataPoint[]; project: string; symbol: string } | null> {
    try {
        // First, get pool metadata
        const poolsResponse = await fetch("https://yields.llama.fi/pools", {
            next: { revalidate: 300 },
        });
        if (!poolsResponse.ok) return null;

        const poolsData = await poolsResponse.json();
        const pool = poolsData.data?.find((p: { pool: string }) => p.pool === poolId);
        if (!pool) return null;

        // Then get historical data
        const historyResponse = await fetch(`https://yields.llama.fi/chart/${poolId}`, {
            next: { revalidate: 300 },
        });
        if (!historyResponse.ok) return null;

        const historyData = await historyResponse.json();
        const rawData = historyData.data || [];

        // Filter by date range
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        const filteredData = rawData
            .filter((d: { timestamp: string }) => new Date(d.timestamp) >= cutoffDate)
            .map((d: { timestamp: string; apy: number; apyBase: number; apyReward: number; tvlUsd: number }) => ({
                timestamp: d.timestamp,
                apy: d.apy || 0,
                apyBase: d.apyBase || 0,
                apyReward: d.apyReward || 0,
                tvlUsd: d.tvlUsd || 0,
            }));

        return {
            data: filteredData,
            project: pool.project,
            symbol: pool.symbol,
        };
    } catch (error) {
        console.error(`Error fetching history for pool ${poolId}:`, error);
        return null;
    }
}

// Calculate backtest for a single pool
function calculateBacktest(
    poolId: string,
    project: string,
    symbol: string,
    historyData: HistoryDataPoint[],
    initialAmount: number,
    compounding: "daily" | "weekly" | "none"
): BacktestResult {
    if (historyData.length === 0) {
        return {
            poolId,
            project,
            symbol,
            initialAmount,
            finalAmount: initialAmount,
            totalReturn: 0,
            totalReturnPercent: 0,
            avgApy: 0,
            minApy: 0,
            maxApy: 0,
            volatility: 0,
            dataPoints: [],
        };
    }

    // Sort by date ascending
    const sortedData = [...historyData].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    let currentValue = initialAmount;
    let accumulatedYield = 0;
    const apyValues: number[] = [];
    const dataPoints: { date: string; apy: number; cumulativeValue: number }[] = [];

    for (let i = 0; i < sortedData.length; i++) {
        const dataPoint = sortedData[i];
        const apy = dataPoint.apy || 0;
        apyValues.push(apy);

        // Daily rate
        const dailyRate = apy / 365 / 100;

        if (compounding === "daily") {
            currentValue *= 1 + dailyRate;
        } else if (compounding === "weekly") {
            // Compound every 7 days
            if (i % 7 === 6) {
                const weeklyRate = (apy / 52) / 100;
                currentValue *= 1 + weeklyRate;
            } else {
                // Still track value but don't compound
                accumulatedYield += currentValue * dailyRate;
            }
        } else {
            // No compounding - just accumulate yield
            accumulatedYield += initialAmount * dailyRate;
        }

        dataPoints.push({
            date: dataPoint.timestamp.split("T")[0],
            apy: Math.round(apy * 100) / 100,
            cumulativeValue:
                compounding === "none"
                    ? Math.round((initialAmount + accumulatedYield) * 100) / 100
                    : Math.round(currentValue * 100) / 100,
        });
    }

    const finalAmount =
        compounding === "none" ? initialAmount + accumulatedYield : currentValue;
    const totalReturn = finalAmount - initialAmount;
    const totalReturnPercent = (totalReturn / initialAmount) * 100;

    const avgApy = apyValues.reduce((a, b) => a + b, 0) / apyValues.length;
    const minApy = Math.min(...apyValues);
    const maxApy = Math.max(...apyValues);
    const volatility = calculateStdDev(apyValues);

    return {
        poolId,
        project,
        symbol,
        initialAmount,
        finalAmount: Math.round(finalAmount * 100) / 100,
        totalReturn: Math.round(totalReturn * 100) / 100,
        totalReturnPercent: Math.round(totalReturnPercent * 1000) / 1000,
        avgApy: Math.round(avgApy * 100) / 100,
        minApy: Math.round(minApy * 100) / 100,
        maxApy: Math.round(maxApy * 100) / 100,
        volatility: Math.round(volatility * 100) / 100,
        dataPoints,
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            poolIds,
            initialAmount = 10000,
            days = 30,
            compounding = "daily",
        } = body;

        // Validate input
        if (!Array.isArray(poolIds) || poolIds.length === 0) {
            return NextResponse.json(
                { error: "poolIds must be a non-empty array" },
                { status: 400 }
            );
        }

        if (poolIds.length > 5) {
            return NextResponse.json(
                { error: "Maximum 5 pools allowed for backtest" },
                { status: 400 }
            );
        }

        if (![7, 30, 90].includes(days)) {
            return NextResponse.json(
                { error: "days must be 7, 30, or 90" },
                { status: 400 }
            );
        }

        if (!["daily", "weekly", "none"].includes(compounding)) {
            return NextResponse.json(
                { error: "compounding must be daily, weekly, or none" },
                { status: 400 }
            );
        }

        // Fetch history for all pools in parallel
        const historyPromises = poolIds.map((poolId: string) =>
            fetchPoolHistory(poolId, days)
        );
        const histories = await Promise.all(historyPromises);

        // Calculate backtest for each pool
        const results: BacktestResult[] = [];

        for (let i = 0; i < poolIds.length; i++) {
            const history = histories[i];
            if (history) {
                const result = calculateBacktest(
                    poolIds[i],
                    history.project,
                    history.symbol,
                    history.data,
                    initialAmount,
                    compounding as "daily" | "weekly" | "none"
                );
                results.push(result);
            }
        }

        // Sort by total return to find winner
        const sortedResults = [...results].sort(
            (a, b) => b.totalReturnPercent - a.totalReturnPercent
        );
        const winner = sortedResults[0]?.poolId || "";

        // Calculate period
        const now = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);

        const response: BacktestResponse = {
            results,
            winner,
            period: {
                start: start.toISOString().split("T")[0],
                end: now.toISOString().split("T")[0],
                days,
            },
            settings: {
                initialAmount,
                compounding,
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error running backtest:", error);
        return NextResponse.json(
            { error: "Failed to run backtest" },
            { status: 500 }
        );
    }
}
