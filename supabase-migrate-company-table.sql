-- Safe Migration Script for Company Table
-- This script checks the current state and migrates if needed
-- Run this in Supabase SQL Editor

-- Step 1: Check if Company table exists and what fields it has
DO $$
DECLARE
    table_exists BOOLEAN;
    has_intelligence_data BOOLEAN;
    has_index_data BOOLEAN;
BEGIN
    -- Check if Company table exists
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'Company'
    ) INTO table_exists;

    IF table_exists THEN
        -- Check if intelligenceData column exists
        SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'Company' 
            AND column_name = 'intelligenceData'
        ) INTO has_intelligence_data;

        -- Check if indexData column exists
        SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'Company' 
            AND column_name = 'indexData'
        ) INTO has_index_data;

        -- If intelligenceData exists but indexData doesn't, migrate
        IF has_intelligence_data AND NOT has_index_data THEN
            RAISE NOTICE 'Migrating intelligenceData to indexData...';
            ALTER TABLE "Company" RENAME COLUMN "intelligenceData" TO "indexData";
            RAISE NOTICE 'Migration complete: intelligenceData renamed to indexData';
        ELSIF has_index_data THEN
            RAISE NOTICE 'Table already has indexData field - no migration needed';
        ELSE
            RAISE NOTICE 'Company table exists but has neither intelligenceData nor indexData - adding indexData';
            ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "indexData" JSONB;
        END IF;
    ELSE
        -- Table doesn't exist, create it
        RAISE NOTICE 'Company table does not exist - creating it...';
        CREATE TABLE "Company" (
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

        RAISE NOTICE 'Company table created successfully!';
    END IF;
END $$;

-- Step 2: Verify the final state
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'Company'
AND column_name IN ('intelligenceData', 'indexData')
ORDER BY column_name;

