# Real Data Integration for Fabrknt Suite

This directory contains API clients for fetching real index data from multiple sources.

## Overview

The Index system combines data from:

| Source      | Data                            | Purpose              |
| ----------- | ------------------------------- | -------------------- |
| **GitHub**  | Commits, contributors, activity | Team Health Score    |
| **Twitter** | Followers, engagement           | Social Score         |
| **Alchemy** | Transactions, active wallets    | On-chain metrics     |
| **Dune**    | Volume, fees, users             | Verified analytics   |
| **Nansen**  | Wallet quality, smart money     | Wallet Quality Score |

## Setup

### 1. Get API Keys

#### GitHub (Required)

1. Go to https://github.com/settings/tokens
2. Create a new token (classic)
3. Select scopes: `public_repo`
4. Copy token to `.env.local` as `GITHUB_TOKEN`

#### Twitter (Required)

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create a new app or use existing
3. Get Bearer Token
4. Copy to `.env.local` as `TWITTER_BEARER_TOKEN`
5. Note: Twitter API has strict rate limits (may cause delays - retry logic with exponential backoff is implemented)

#### Ethereum RPC (Optional - uses public endpoints by default)

The code supports multiple Ethereum RPC providers:

**Option 1: Use Public RPC (No API key needed - recommended for testing)**

-   No setup required! Uses free public endpoints automatically
-   Default endpoints: LlamaRPC, Ankr, PublicNode

**Option 2: Use Alchemy (Optional - for better rate limits)**

1. Go to https://www.alchemy.com/
2. Create account and new app
3. Select Ethereum Mainnet
4. Copy API key to `.env.local` as `ALCHEMY_API_KEY`

**Option 3: Use Custom RPC URL**

-   Set `ETHEREUM_RPC_URL` in `.env.local` to use any Ethereum RPC endpoint
-   Example: `ETHEREUM_RPC_URL=https://rpc.ankr.com/eth`

#### Solana RPC (Optional - uses public endpoints by default)

The code supports multiple Solana RPC providers:

**Option 1: Use Public RPC (No API key needed - default)**

-   No setup required! Uses free public endpoints automatically
-   Default endpoints: Official Solana RPC, Project Serum RPC
-   **Note**: Public RPC has very low rate limits (429 errors common)

**Option 2: Use Helius (Recommended - for better rate limits)**

1. Go to https://www.helius.dev/
2. Create account and get API key (free tier available)
3. Copy to `.env.local` as `HELIUS_API_KEY`
4. Automatically used for better rate limits and reliability

**Option 3: Use Custom RPC URL**

-   Set `SOLANA_RPC_URL` in `.env.local` to use any Solana RPC endpoint
-   Example: `SOLANA_RPC_URL=https://api.mainnet-beta.solana.com`

#### Dune (Completely Optional - RPC metrics work fine)

⚠️ **IMPORTANT**: Dune queries require **manual creation** on dune.com - cannot be automated.

**When to skip Dune (recommended for automation):**

-   ✅ System works perfectly with RPC-derived metrics
-   ✅ Fully automated - just add company to registry
-   ✅ No manual query creation needed
-   ✅ RPC metrics provide: transactions, unique wallets, activity counts

**When to use Dune (optional enhancement only):**

-   You need very accurate volume/fee calculations
-   You want historical trend analysis
-   You're okay manually creating/maintaining queries

**If you want to use Dune (not required):**

1. Manually create queries on https://dune.com (one per company)
2. Go to https://dune.com/settings/api and create API key
3. Copy to `.env.local` as `DUNE_API_KEY`
4. Add `duneQueryId` to company metadata in registry

**Recommendation**: Skip Dune unless you specifically need volume/fee accuracy. RPC metrics are sufficient for most index scoring.

#### Nansen (Optional)

1. Go to https://www.nansen.ai/
2. Get API access (requires paid plan)
3. Copy to `.env.local` as `NANSEN_API_KEY`

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your API keys in `.env.local`.

### 3. Test the Integration

```bash
npx tsx scripts/test-uniswap-data.ts
```

This will:

-   Fetch data from all sources
-   Calculate Index Score
-   Display results in terminal

## Dune Analytics Setup

To get accurate metrics, create queries on Dune Analytics:

### Query 1: Uniswap V3 Metrics

```sql
SELECT
  SUM(CASE WHEN block_time >= NOW() - INTERVAL '1' DAY THEN amount_usd ELSE 0 END) as volume_24h,
  SUM(CASE WHEN block_time >= NOW() - INTERVAL '7' DAY THEN amount_usd ELSE 0 END) as volume_7d,
  SUM(CASE WHEN block_time >= NOW() - INTERVAL '30' DAY THEN amount_usd ELSE 0 END) as volume_30d,
  SUM(CASE WHEN block_time >= NOW() - INTERVAL '1' DAY THEN amount_usd * 0.003 ELSE 0 END) as fees_24h,
  SUM(CASE WHEN block_time >= NOW() - INTERVAL '7' DAY THEN amount_usd * 0.003 ELSE 0 END) as fees_7d,
  SUM(CASE WHEN block_time >= NOW() - INTERVAL '30' DAY THEN amount_usd * 0.003 ELSE 0 END) as fees_30d,
  COUNT(DISTINCT CASE WHEN block_time >= NOW() - INTERVAL '1' DAY THEN tx_from END) as users_24h,
  COUNT(DISTINCT CASE WHEN block_time >= NOW() - INTERVAL '7' DAY THEN tx_from END) as users_7d,
  COUNT(DISTINCT CASE WHEN block_time >= NOW() - INTERVAL '30' DAY THEN tx_from END) as users_30d
FROM dex.trades
WHERE project = 'uniswap' AND version = '3'
```

After creating the query:

1. Save it
2. Copy the query ID from the URL (e.g., `3234567`)
3. Update `UNISWAP_METRICS_QUERY_ID` in `src/lib/api/dune.ts`

## Usage

### Fetch Uniswap Data

```typescript
import {
    fetchUniswapData,
    calculateUniswapScore,
    getUniswapCompanyData,
} from "@/lib/index/uniswap";

// Get raw data from all sources
const data = await fetchUniswapData();

// Calculate Index Score
const score = await calculateUniswapScore();

// Get complete company data (formatted for UI)
const company = await getUniswapCompanyData();
```

### Extend to Other Companies

To add more companies, create similar files:

1. **Create company-specific file**: `src/lib/index/aave.ts`
2. **Update API calls**: Use correct repo, Twitter handle, contract addresses
3. **Add to companies list**: Import and add to `companies.ts`

Example for Aave:

```typescript
// src/lib/index/aave.ts
import { getTeamMetrics } from "@/lib/api/github";
import { getUserMetrics } from "@/lib/api/twitter";
// ... etc

export async function getAaveMetrics() {
    const github = await getTeamMetrics("aave", "aave-v3-core");
    const twitter = await getUserMetrics("AaveAave");
    // ... etc
}
```

## Index Score Calculation

The overall score (0-100) is calculated as:

```
Overall = (Team Health × 0.35) + (Growth × 0.40) + (Social × 0.15) + (Wallet Quality × 0.10)
```

### Weights:

-   **35%** Team Health (GitHub)

    -   40% Contributor count
    -   40% Commit activity
    -   20% Retention rate

-   **40%** Growth Score (On-chain + Dune)

    -   40% User growth (DAU/MAU ratio)
    -   30% Transaction volume
    -   30% TVL

-   **15%** Social Score (Twitter)

    -   70% Followers
    -   30% Engagement rate

-   **10%** Wallet Quality (Nansen)
    -   50% Distribution
    -   50% Smart money holdings

### Adjust Weights

Edit `src/lib/index/calculators/score-calculator.ts` to adjust weights and normalization ranges.

## Rate Limits

| API          | Free Tier Limit      | Notes                                            |
| ------------ | -------------------- | ------------------------------------------------ |
| GitHub       | 5,000 req/hour       | With authentication                              |
| Twitter      | 500,000 tweets/month | v2 Essential                                     |
| Ethereum RPC | Varies by provider   | Public RPC: Low limits, Alchemy: High limits     |
| Solana RPC   | Varies by provider   | Public RPC: Very low limits, Helius: High limits |
| Dune         | 10 queries/day       | Optional - uses RPC metrics if unavailable       |

## Data Refresh Strategy

### Development

-   Cache data for 1 hour using Next.js `revalidate`
-   Test script fetches fresh data every run

### Production

Recommended approach:

1. **AWS Lambda** triggered by EventBridge (daily)
2. Fetch and calculate scores
3. Store in **PostgreSQL**
4. Next.js reads from DB (static or ISR)

See `README.md` for AWS Lambda setup instructions.

## Troubleshooting

### GitHub API 403 Error

-   Check token is set correctly
-   Verify token has `public_repo` scope
-   Check rate limit: `curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/rate_limit`

### Twitter API 401 Error

-   Verify Bearer Token is correct
-   Check app has v2 access
-   Ensure token hasn't expired

### Ethereum RPC Errors

-   **Public RPC**: May hit rate limits - consider using Alchemy API key or custom RPC
-   **Alchemy**: Verify API key is set correctly
-   **Custom RPC**: Verify RPC URL is correct and accessible
-   Check you're using correct network (mainnet)
-   For better reliability, use Alchemy API key or a paid RPC provider

### Solana RPC Errors

-   **Public RPC**: Very low rate limits (429 errors common) - **strongly recommend using Helius**
-   **Helius**: Verify API key is set correctly
-   **Custom RPC**: Verify RPC URL is correct and accessible
-   For better reliability, use Helius API key (free tier available)

### Dune Query Timeout

-   Dune is optional - system will use RPC-derived metrics if Dune fails
-   Optimize query (add indices, filters)
-   Consider using pre-computed tables
-   Increase timeout in code

## Next Steps

1. ✅ Test with Uniswap
2. Add 5-10 more companies
3. Set up PostgreSQL database
4. Create data refresh Lambda
5. Replace all mock data
6. Add error handling & retries
7. Implement caching strategy
8. Add monitoring & alerts
