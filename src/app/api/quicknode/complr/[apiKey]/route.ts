/**
 * POST /api/quicknode/complr/[apiKey]
 *
 * Complr API endpoint for QuickNode Marketplace users.
 * Supports wallet screening, pool compliance, and allocation checks.
 *
 * Request body:
 *   { "method": "screen_wallet", "params": { "address": "0x...", "jurisdictions": ["MAS"] } }
 *   { "method": "screen_pool", "params": { "protocol": "uniswap", "poolId": "..." } }
 *   { "method": "check_allocation", "params": { "allocations": [...] } }
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { compliance } from "@/lib/fabrknt/compliance";

const PLAN_LIMITS: Record<string, number> = {
    free: 100,
    starter: 1_000,
    growth: 10_000,
    business: 100_000,
};

export async function POST(
    request: Request,
    { params }: { params: Promise<{ apiKey: string }> }
) {
    const { apiKey } = await params;

    const instance = await prisma.quicknodeInstance.findUnique({
        where: { apiKey },
    });

    if (!instance) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (instance.status !== "active") {
        return NextResponse.json(
            { error: `Add-on is ${instance.status}` },
            { status: 403 }
        );
    }

    // Check rate limits
    const limit = PLAN_LIMITS[instance.plan] ?? PLAN_LIMITS.free;
    if (instance.requestCount >= limit) {
        return NextResponse.json(
            { error: "Monthly request limit exceeded. Upgrade your plan." },
            { status: 429 }
        );
    }

    try {
        const body = await request.json();
        const { method, params: methodParams } = body;

        let result;

        switch (method) {
            case "screen_wallet": {
                const { address, jurisdictions } = methodParams || {};
                if (!address) {
                    return NextResponse.json({ error: "address is required" }, { status: 400 });
                }
                result = await compliance.screenWallet(address, jurisdictions);
                break;
            }
            case "screen_pool": {
                const { protocol, poolId, jurisdictions } = methodParams || {};
                if (!protocol || !poolId) {
                    return NextResponse.json({ error: "protocol and poolId are required" }, { status: 400 });
                }
                result = await compliance.screenPool(protocol, poolId, jurisdictions);
                break;
            }
            case "check_allocation": {
                const { allocations } = methodParams || {};
                if (!allocations || !Array.isArray(allocations)) {
                    return NextResponse.json({ error: "allocations array is required" }, { status: 400 });
                }
                result = compliance.checkAllocationCompliance(allocations);
                break;
            }
            default:
                return NextResponse.json(
                    { error: `Unknown method: ${method}. Supported: screen_wallet, screen_pool, check_allocation` },
                    { status: 400 }
                );
        }

        // Increment usage counter
        await prisma.quicknodeInstance.update({
            where: { apiKey },
            data: {
                requestCount: { increment: 1 },
                lastRequestAt: new Date(),
            },
        });

        return NextResponse.json({
            result,
            poweredBy: "@complr by FABRKNT",
        });
    } catch (error) {
        console.error("Complr API error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Request failed" },
            { status: 500 }
        );
    }
}
