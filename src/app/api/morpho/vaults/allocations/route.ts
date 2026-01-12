import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// POST - Add or update allocation to a vault
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { vaultAddress, marketId, marketName, allocationCap, enabled } = body;

        if (!vaultAddress || !marketId) {
            return NextResponse.json(
                { error: "vaultAddress and marketId are required" },
                { status: 400 }
            );
        }

        // Find vault and verify ownership
        const vault = await prisma.morphoVault.findUnique({
            where: { vaultAddress: vaultAddress.toLowerCase() },
        });

        if (!vault) {
            return NextResponse.json(
                { error: "Vault not found" },
                { status: 404 }
            );
        }

        if (vault.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Not authorized to modify this vault" },
                { status: 403 }
            );
        }

        // Upsert allocation
        const allocation = await prisma.vaultAllocation.upsert({
            where: {
                vaultId_marketId: {
                    vaultId: vault.id,
                    marketId,
                },
            },
            create: {
                vaultId: vault.id,
                marketId,
                marketName: marketName || null,
                allocationCap: allocationCap || 100,
                enabled: enabled !== false,
            },
            update: {
                marketName: marketName || undefined,
                allocationCap: allocationCap !== undefined ? allocationCap : undefined,
                enabled: enabled !== undefined ? enabled : undefined,
            },
        });

        return NextResponse.json({ allocation });
    } catch (error) {
        console.error("Error creating/updating allocation:", error);
        return NextResponse.json(
            { error: "Failed to update allocation" },
            { status: 500 }
        );
    }
}

// DELETE - Remove allocation from a vault
export async function DELETE(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const vaultAddress = searchParams.get("vaultAddress");
        const marketId = searchParams.get("marketId");

        if (!vaultAddress || !marketId) {
            return NextResponse.json(
                { error: "vaultAddress and marketId are required" },
                { status: 400 }
            );
        }

        // Find vault and verify ownership
        const vault = await prisma.morphoVault.findUnique({
            where: { vaultAddress: vaultAddress.toLowerCase() },
        });

        if (!vault) {
            return NextResponse.json(
                { error: "Vault not found" },
                { status: 404 }
            );
        }

        if (vault.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Not authorized to modify this vault" },
                { status: 403 }
            );
        }

        // Delete allocation
        await prisma.vaultAllocation.delete({
            where: {
                vaultId_marketId: {
                    vaultId: vault.id,
                    marketId,
                },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting allocation:", error);
        return NextResponse.json(
            { error: "Failed to delete allocation" },
            { status: 500 }
        );
    }
}
