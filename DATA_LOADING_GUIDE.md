# Index Data Loading Guide

## Overview

The index system now automatically loads **real data from JSON files** when available, and falls back to mock data for companies that don't have JSON files yet.

## How It Works

### 1. Data Sources

-   **Real Data**: Located in `/data/companies/` as JSON files
-   **Mock Data**: Defined in `/src/lib/index/companies.ts` as fallback

### 2. Loading Priority

1. System first loads all companies from JSON files in `/data/companies/`
2. Then adds mock companies that don't have JSON files
3. Result: All companies in the app use real data when available

### 3. Files Modified

-   **`src/lib/index/data-loader.ts`** (NEW)

    -   Utilities to load company data from JSON files
    -   Functions to check if real data exists
    -   Function to load all companies from JSON

-   **`src/lib/index/companies.ts`** (MODIFIED)
    -   Now imports and uses data-loader utilities
    -   Automatically merges real data with mock data
    -   Exports unified `companies` array

## Current Status

### Companies with Real Data (8)

✅ Verified and loaded from JSON files:

1. **Uniswap** - Score: 54 (28 commits/30d)
2. **Jupiter** - Score: 52 (15 commits/30d)
3. **Morpho** - Score: 41 (14 commits/30d)
4. **Euler** - Score: 44 (0 commits/30d)
5. **Rocket Pool** - Score: 46 (49 commits/30d)
6. **Blur** - Score: 39 (0 commits/30d)
7. **Safe** - Score: 61 (17,598 commits/30d)
8. **Orca** - Score: 46 (1 commit/30d)

### Companies with Mock Data (23)

Using placeholder data until JSON files are fetched:

-   Aave, Compound, Curve, MakerDAO
-   Chainlink, The Graph, Polygon, Filecoin, Arweave
-   OpenSea, Art Blocks, Zora, Foundation
-   Snapshot, Aragon, Colony, Gitcoin, Coordinape
-   Axie Infinity, The Sandbox, Illuvium, Gods Unchained, Gala Games

## Adding New Companies

To add a new company with real data:

1. **Add index module** in `/src/lib/index/[company].ts`
2. **Register in registry** at `/src/lib/index/registry.ts`
3. **Fetch data** using `pnpm fetch:company [company-slug]`
4. **Automatic loading** - The system will automatically use the new JSON file

No need to manually update the companies array!

## Fetching Data

### Fetch single company:

```bash
pnpm fetch:company uniswap
```

### Fetch all companies:

```bash
pnpm fetch:company all
```

### Verify data loading:

```bash
pnpm tsx scripts/verify-data-loading.ts
```

## Benefits

1. ✅ **Automatic**: No manual updates needed to companies.ts
2. ✅ **Real Data**: Uses actual fetched data from APIs
3. ✅ **Graceful Fallback**: Shows mock data for companies without JSON
4. ✅ **Easy Testing**: Can verify which companies have real vs mock data
5. ✅ **Scalable**: Adding new companies is as simple as fetching their data

## Next Steps

1. **Fix API keys** (Alchemy, Dune) to unblock data fetching
2. **Fetch all 25 companies** from the index registry
3. **Replace all mock data** with real data
4. **Set up automated refresh** to keep data current

---

**Last Updated**: 2026-01-02
**Status**: ✅ Working - 8 companies using real data, 23 using mock data
