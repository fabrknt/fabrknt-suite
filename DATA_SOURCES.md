# Data Sources Overview

This document explains where INDEX (Web3 Company Verification) and SYNERGY (Quiet M&A & Partnerships) features get their data from.

**FABRKNT uses 100% automated verification** — no manual input, no self-reported metrics. Only signals that can be verified.

## 🎯 Summary

| Feature                               | Data Source                | Status                                 |
| ------------------------------------- | -------------------------- | -------------------------------------- |
| **INDEX API** (`/api/cindex/*`)       | **Supabase (Database)** ✅ | Uses Prisma to query `Company` table   |
| **INDEX Pages** (`/cindex/[company]`) | **Supabase (Database)** ✅ | Uses API routes to fetch from database |
| **SYNERGY API** (`/api/listings/*`)   | **Supabase (Database)** ✅ | Uses Prisma to query `Listing` table   |
| **SYNERGY Pages** (`/synergy/*`)      | **Supabase (Database)** ✅ | Uses API routes to fetch from database |

---

## 📊 INDEX Feature — Web3 Company Verification

### API Routes (✅ Using Supabase)

#### `/api/cindex/search`

-   **Source**: Supabase `Company` table via Prisma
-   **File**: `src/app/api/cindex/search/route.ts`
-   **Query**: Searches companies by name, slug, or description
-   **Returns**: Company data from database

#### `/api/cindex/[companyId]`

-   **Source**: Supabase `Company` table via Prisma
-   **File**: `src/app/api/cindex/[companyId]/route.ts`
-   **Query**: Fetches company by ID with full verification data
-   **Returns**: Company with verified index scores from `indexData` JSONB field

### Pages (✅ Using Supabase)

#### `/cindex/[company]`

-   **Source**: Supabase `Company` table via Prisma
-   **File**: `src/app/cindex/[company]/page.tsx`
-   **Functions Used**:
    -   `getCompanyData()` → `prisma.company.findUnique()` → reads from database
-   **Status**: ✅ **Using Supabase** - fetches verified data from database

### Data Flow

```
INDEX API (✅ Supabase)
├── /api/cindex/search → prisma.company.findMany()
└── /api/cindex/[companyId] → prisma.company.findUnique()

INDEX Pages (✅ Supabase)
└── /cindex/[company] → prisma.company.findUnique()
```

---

## 🎯 SYNERGY Feature — Quiet M&A & Partnerships

### API Routes (✅ Using Supabase)

#### `/api/listings`

-   **Source**: Supabase `Listing` table via Prisma
-   **File**: `src/app/api/listings/route.ts`
-   **Query**: Fetches listings with filters (type, category, status)
-   **Returns**: Listings with seller info and counts

#### `/api/listings/[id]`

-   **Source**: Supabase `Listing` table via Prisma
-   **File**: `src/app/api/listings/[id]/route.ts`
-   **Query**: Fetches single listing with offers, data room requests, documents
-   **Returns**: Full listing details

### Pages (✅ Using Supabase)

#### `/synergy` (Homepage)

-   **Source**: Supabase via API routes
-   **File**: `src/app/synergy/page.tsx`
-   **Status**: ✅ **Using API** - fetches from `/api/listings`

#### `/synergy/opportunities` (Marketplace)

-   **Source**: Supabase via API routes
-   **File**: `src/app/synergy/opportunities/page.tsx`
-   **Status**: ✅ **Using API** - fetches from `/api/listings`

### Data Flow

```
SYNERGY API (✅ Supabase)
├── /api/listings → prisma.listing.findMany()
└── /api/listings/[id] → prisma.listing.findUnique()

SYNERGY Pages (✅ Supabase)
├── /synergy → API fetch → /api/listings
└── /synergy/opportunities → API fetch → /api/listings
```

---

## 🔄 Migration Status

### ✅ Completed

-   [x] INDEX API routes use Supabase
-   [x] SYNERGY API routes use Supabase
-   [x] Company table seeded with 23+ companies from JSON files
-   [x] Database schema matches requirements
-   [x] INDEX pages use Supabase
-   [x] SYNERGY pages use Supabase
-   [x] 100% automated verification — no manual input

---

## 📁 File Locations

### INDEX — Web3 Company Verification

-   **API Routes**: `src/app/api/cindex/`
-   **Pages**: `src/app/cindex/`
-   **Data Loader**: `src/lib/cindex/data-loader.ts`
-   **Company Utils**: `src/lib/cindex/companies.ts`
-   **Company Queries**: `src/lib/cindex/company-queries.ts`
-   **JSON Data**: `data/companies/*.json` (for seeding only)

### SYNERGY — Quiet M&A & Partnerships

-   **API Routes**: `src/app/api/listings/`
-   **Pages**: `src/app/synergy/`
-   **Helpers**: `src/lib/synergy/helpers.ts`

### Database

-   **Schema**: `prisma/schema.prisma`
-   **Client**: `src/lib/db.ts`
-   **Seed Script**: `scripts/seed-companies.ts`
-   **SQL Seed**: `supabase-seed-companies.sql`

---

## 🚀 Next Steps

1. **Add API client utilities** for consistent data fetching
2. **Add loading/error states** for better UX
3. **Consider Server Components** for better performance
4. **Optimize database queries** for better performance

---

## 💡 Quick Reference

### To check if data is from Supabase:

```typescript
// Look for these patterns:
import { prisma } from "@/lib/db";
await prisma.company.findMany();
await prisma.listing.findMany();
```

### To check if data is from JSON (deprecated, used only for seeding):

```typescript
// Look for these patterns (deprecated):
import { loadCompanyFromJson } from "@/lib/index/data-loader";
loadCompanyFromJson(slug);
```
