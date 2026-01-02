# Index Company Data - Setup Guide

## Overview

This guide covers setting up the Company table in Supabase to store Index data from the existing JSON files.

## What's Been Created

### ✅ Database Schema

-   **Company model** added to `/prisma/schema.prisma`
-   Stores company metadata, scores, and full Index data as JSON
-   Indexed for fast searching by slug, category, and overallScore

### ✅ API Routes

-   **GET /api/index/search** - Search companies by name/slug/description

    -   Query params: `q` (search text), `category`, `limit`
    -   Returns companies sorted by overallScore

-   **GET /api/index/[companyId]** - Get full company data with PULSE + TRACE
    -   Returns formatted data matching create listing form expectations
    -   Maps `indexData` JSON to PULSE/TRACE structure

### ✅ Seed Script

-   **`scripts/seed-companies.ts`** - Imports all companies from `/data/companies/*.json`
    -   Reads 24 company JSON files
    -   Upserts into Company table (updates if exists, creates if not)
    -   Stores full `rawData` in `indexData` JSON field

## Setup Steps

### Step 1: Create Company Table in Supabase

Run the SQL migration in **Supabase SQL Editor**:

1. Go to https://supabase.com/dashboard/project/lswqmdmzzmjpjsbmgpxq
2. Click "SQL Editor" in left sidebar
3. Create new query
4. Copy contents of `/supabase-add-company-table.sql`
5. Click "Run"

Expected output:

```
NOTICE: Company table created successfully!
```

### Step 2: Run Seed Script

After the table is created, populate it with company data:

```bash
pnpm tsx scripts/seed-companies.ts
```

Expected output:

```
🌱 Seeding Company table from JSON files...

📁 Found 24 company files

✅ Jupiter (jupiter) - Score: 39
✅ Blur (blur) - Score: 85
✅ Drift (drift) - Score: 72
...

📊 Seeding complete!
   ✅ Success: 24
   ❌ Errors: 0

📈 Top 5 companies by score:
   1. Blur (nft): 85
   2. Drift (defi): 72
   ...

✨ Total companies in database: 24
```

### Step 3: Verify in Prisma Studio

```bash
pnpm prisma studio
```

Navigate to Company table and verify:

-   24 companies imported
-   Scores populated (overallScore, teamHealthScore, etc.)
-   indexData JSON field has full data

### Step 4: Test API Endpoints

Start dev server (if not running):

```bash
pnpm dev
```

Test search:

```bash
curl http://localhost:3000/api/index/search?q=jupiter
```

Test company detail:

```bash
curl http://localhost:3000/api/index/[companyId]
```

Replace `[companyId]` with actual ID from search results.

## Company Data Structure

### Companies Available (24 total)

| Name          | Category       | Score | Trend  |
| ------------- | -------------- | ----- | ------ |
| Jupiter       | defi           | 39    | down   |
| Blur          | nft            | 85    | up     |
| Drift         | defi           | 72    | stable |
| Euler         | defi           | 68    | stable |
| Jito          | infrastructure | 45    | stable |
| Kamino        | defi           | 54    | stable |
| Lido          | defi           | 62    | up     |
| Mango Markets | defi           | 51    | down   |
| Marginfi      | defi           | 48    | stable |
| Metaplex      | nft            | 71    | up     |
| Morpho        | defi           | 79    | up     |
| Orca          | defi           | 67    | stable |
| ... (12 more) |

### Database Fields

**Company Table:**

-   `id` - Auto-generated CUID
-   `slug` - Unique identifier (e.g., "jupiter")
-   `name` - Display name (e.g., "Jupiter")
-   `category` - defi | nft | gaming | infrastructure | dao
-   `description` - Short description
-   `logo` - Emoji or URL
-   `website` - Company website

**Cached Scores:**

-   `overallScore` - 0-100 composite score
-   `teamHealthScore` - PULSE vitality score (0-100)
-   `growthScore` - TRACE growth score (0-100)
-   `socialScore` - Social media score (0-100)
-   `walletQualityScore` - Wallet distribution score (0-100)

**Metadata:**

-   `trend` - up | down | stable (30-day trend)
-   `isListed` - Whether company has a Match listing
-   `isActive` - Soft delete flag
-   `indexData` - Full JSON (GitHub, Twitter, onchain data)
-   `lastFetchedAt` - When data was last updated

## Integration with Create Listing Form

The Index search API is used in **Step 5** of the create listing form:

1. User searches for company: `GET /api/index/search?q=uniswap`
2. User selects company from results
3. Form fetches full data: `GET /api/index/[companyId]`
4. Data is mapped to `suiteDataSnapshot` format:
    ```json
    {
        "pulse": {
            "vitality_score": 85,
            "developer_activity_score": 144,
            "team_retention_score": 42,
            "active_contributors": 42
        },
        "trace": {
            "growth_score": 16,
            "verified_roi": 1993,
            "roi_multiplier": 0,
            "quality_score": 39
        },
        "revenue_verified": 0,
        "fabrknt_score": 39
    }
    ```
5. Listing is saved with cached Index snapshot

## Next Steps

After setup is complete:

1. ✅ Test search in create listing form UI
2. ✅ Verify PULSE + TRACE data displays correctly
3. ⏳ Set up automatic data refresh (fetch new Index data daily)
4. ⏳ Add webhook to update Company table when new data arrives

## Troubleshooting

### "Table 'Company' does not exist"

-   Run the SQL migration in Supabase SQL Editor first
-   Run `pnpm prisma generate` after creating table

### Seed script fails

-   Ensure `data/companies/` directory exists with JSON files
-   Check Supabase connection in `.env.local`
-   Verify table was created successfully

### API returns empty results

-   Check that seed script ran successfully
-   Verify companies in Prisma Studio
-   Check `isActive = true` in database

---

**Status**: ✅ Ready to test after running Steps 1-2 above

**Last Updated**: 2026-01-02
