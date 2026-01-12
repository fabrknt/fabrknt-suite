import { NextRequest, NextResponse } from "next/server";
import { MORPHO_API_URL, MORPHO_SUPPORTED_CHAINS } from "@/lib/morpho/constants";
import type { MorphoApiResponse, MarketsQueryResponse, MorphoMarket } from "@/lib/morpho/types";

// GraphQL query to fetch markets
const MARKETS_QUERY = `
query GetMarkets($chainId: Int!, $first: Int, $skip: Int) {
  markets(
    where: { chainId_in: [$chainId] }
    first: $first
    skip: $skip
    orderBy: SupplyAssetsUsd
    orderDirection: Desc
  ) {
    items {
      uniqueKey
      loanAsset {
        address
        symbol
        decimals
      }
      collateralAsset {
        address
        symbol
        decimals
      }
      oracle {
        address
      }
      irmAddress
      lltv
      state {
        supplyAssets
        borrowAssets
        supplyShares
        borrowShares
        liquidityAssets
        utilization
        supplyApy
        borrowApy
        fee
      }
      dailyApys {
        supplyApy
        borrowApy
      }
      weeklyApys {
        supplyApy
        borrowApy
      }
    }
    pageInfo {
      count
      countTotal
    }
  }
}
`;

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const chainIdParam = searchParams.get("chainId");
        const limitParam = searchParams.get("limit");
        const skipParam = searchParams.get("skip");
        const assetFilter = searchParams.get("asset");

        // Default to mainnet if no chainId provided
        const chainId = chainIdParam ? parseInt(chainIdParam, 10) : 1;

        // Validate chain is supported
        if (!MORPHO_SUPPORTED_CHAINS.includes(chainId as 1 | 8453)) {
            return NextResponse.json(
                { error: `Chain ${chainId} is not supported. Supported chains: ${MORPHO_SUPPORTED_CHAINS.join(", ")}` },
                { status: 400 }
            );
        }

        const limit = limitParam ? parseInt(limitParam, 10) : 50;
        const skip = skipParam ? parseInt(skipParam, 10) : 0;

        // Fetch from Morpho API
        const response = await fetch(MORPHO_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: MARKETS_QUERY,
                variables: {
                    chainId,
                    first: Math.min(limit, 100), // Cap at 100
                    skip,
                },
            }),
            next: { revalidate: 60 }, // Cache for 60 seconds
        });

        if (!response.ok) {
            throw new Error(`Morpho API error: ${response.status}`);
        }

        const result: MorphoApiResponse<MarketsQueryResponse> = await response.json();

        if (result.errors && result.errors.length > 0) {
            console.error("Morpho API errors:", result.errors);
            return NextResponse.json(
                { error: result.errors[0].message },
                { status: 500 }
            );
        }

        // Transform to our market format
        let markets: MorphoMarket[] = result.data.markets.items.map((item) => ({
            id: item.uniqueKey,
            loanToken: {
                address: item.loanAsset.address,
                symbol: item.loanAsset.symbol,
                decimals: item.loanAsset.decimals,
            },
            collateralToken: {
                address: item.collateralAsset?.address || "0x0000000000000000000000000000000000000000",
                symbol: item.collateralAsset?.symbol || "None",
                decimals: item.collateralAsset?.decimals || 0,
            },
            oracle: item.oracle?.address || "0x0000000000000000000000000000000000000000",
            irm: item.irmAddress,
            lltv: item.lltv,
            totalSupplyAssets: item.state.supplyAssets,
            totalBorrowAssets: item.state.borrowAssets,
            supplyApy: (item.weeklyApys?.supplyApy || item.dailyApys?.supplyApy || item.state.supplyApy) * 100,
            borrowApy: (item.weeklyApys?.borrowApy || item.dailyApys?.borrowApy || item.state.borrowApy) * 100,
            utilization: item.state.utilization * 100,
        }));

        // Filter by asset if specified
        if (assetFilter) {
            const assetLower = assetFilter.toLowerCase();
            markets = markets.filter(
                (m) =>
                    m.loanToken.symbol.toLowerCase().includes(assetLower) ||
                    m.loanToken.address.toLowerCase() === assetLower
            );
        }

        return NextResponse.json({
            markets,
            pagination: {
                count: result.data.markets.pageInfo?.count || markets.length,
                total: result.data.markets.pageInfo?.countTotal || markets.length,
                limit,
                skip,
            },
            chainId,
        });
    } catch (error) {
        console.error("Error fetching Morpho markets:", error);
        return NextResponse.json(
            { error: "Failed to fetch markets" },
            { status: 500 }
        );
    }
}
