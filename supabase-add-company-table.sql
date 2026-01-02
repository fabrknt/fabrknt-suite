-- Add Company table for Index data storage
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS "Company" (
    "id" TEXT PRIMARY KEY,
    "slug" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "website" TEXT,

    -- Cached scores
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "teamHealthScore" INTEGER NOT NULL DEFAULT 0,
    "growthScore" INTEGER NOT NULL DEFAULT 0,
    "socialScore" INTEGER NOT NULL DEFAULT 0,
    "walletQualityScore" INTEGER NOT NULL DEFAULT 0,

    -- Trend
    "trend" TEXT NOT NULL DEFAULT 'stable',

    -- Raw Index data (full JSON from APIs)
    "indexData" JSONB,

    -- Status
    "isListed" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    -- Timestamps
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastFetchedAt" TIMESTAMP(3)
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS "Company_slug_idx" ON "Company"("slug");
CREATE INDEX IF NOT EXISTS "Company_category_idx" ON "Company"("category");
CREATE INDEX IF NOT EXISTS "Company_overallScore_idx" ON "Company"("overallScore");
CREATE INDEX IF NOT EXISTS "Company_isActive_idx" ON "Company"("isActive");

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Company table created successfully!';
END $$;
