# Data Sources Overview

This document explains where Index and Synergy features get their data from.

## 🎯 Summary

| Feature                              | Data Source                | Status                                 |
| ------------------------------------ | -------------------------- | -------------------------------------- |
| **Index API** (`/api/index/*`)       | **Supabase (Database)** ✅ | Uses Prisma to query `Company` table   |
| **Index Pages** (`/index/[company]`) | **Supabase (Database)** ✅ | Uses API routes to fetch from database |
| **Synergy API** (`/api/listings/*`)  | **Supabase (Database)** ✅ | Uses Prisma to query `Listing` table   |
| **Synergy Pages** (`/synergy/*`)     | **Supabase (Database)** ✅ | Uses API routes to fetch from database |

---

## 📊 Index Feature

### API Routes (✅ Using Supabase)

#### `/api/index/search`

-   **Source**: Supabase `Company` table via Prisma
-   **File**: `src/app/api/index/search/route.ts`
-   **Query**: Searches companies by name, slug, or description
-   **Returns**: Company data from database

#### `/api/index/[companyId]`

-   **Source**: Supabase `Company` table via Prisma
-   **File**: `src/app/api/index/[companyId]/route.ts`
-   **Query**: Fetches company by ID with full index data
-   **Returns**: Company with PULSE + TRACE scores from `indexData` JSONB field

### Pages (✅ Using Supabase)

#### `/index/[company]`

-   **Source**: Supabase `Company` table via Prisma
-   **File**: `src/app/index/[company]/page.tsx`
-   **Functions Used**:
    -   `getCompanyData()` → `prisma.company.findUnique()` → reads from database
-   **Status**: ✅ **Using Supabase** - fetches from database

### Data Flow

```
Index API (✅ Supabase)
├── /api/index/search → prisma.company.findMany()
└── /api/index/[companyId] → prisma.company.findUnique()

Index Pages (✅ Supabase)
└── /index/[company] → prisma.company.findUnique()
```

---

## 🎯 Synergy Feature

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
Synergy API (✅ Supabase)
├── /api/listings → prisma.listing.findMany()
└── /api/listings/[id] → prisma.listing.findUnique()

Synergy Pages (✅ Supabase)
├── /synergy → API fetch → /api/listings
└── /synergy/opportunities → API fetch → /api/listings
```

---

## 🔄 Migration Status

### ✅ Completed

-   [x] Index API routes use Supabase
-   [x] Synergy API routes use Supabase
-   [x] Company table seeded with 23 companies from JSON files
-   [x] Database schema matches requirements
-   [x] Index pages use Supabase
-   [x] Synergy pages use Supabase

---

## 📁 File Locations

### Index

-   **API Routes**: `src/app/api/index/`
-   **Pages**: `src/app/index/`
-   **Data Loader**: `src/lib/index/data-loader.ts`
-   **Company Utils**: `src/lib/index/companies.ts`
-   **Company Queries**: `src/lib/index/company-queries.ts`
-   **JSON Data**: `data/companies/*.json` (for seeding only)

### Synergy

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
