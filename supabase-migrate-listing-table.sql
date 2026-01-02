-- Safe Migration Script for Listing Table
-- Renames intelligenceCompanyId to indexCompanyId
-- Run this in Supabase SQL Editor

DO $$
DECLARE
    table_exists BOOLEAN;
    has_intelligence_column BOOLEAN;
    has_index_column BOOLEAN;
BEGIN
    -- Check if Listing table exists
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'Listing'
    ) INTO table_exists;

    IF table_exists THEN
        -- Check if intelligenceCompanyId column exists
        SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'Listing' 
            AND column_name = 'intelligenceCompanyId'
        ) INTO has_intelligence_column;

        -- Check if indexCompanyId column exists
        SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'Listing' 
            AND column_name = 'indexCompanyId'
        ) INTO has_index_column;

        -- If intelligenceCompanyId exists but indexCompanyId doesn't, migrate
        IF has_intelligence_column AND NOT has_index_column THEN
            RAISE NOTICE 'Migrating intelligenceCompanyId to indexCompanyId...';
            ALTER TABLE "Listing" RENAME COLUMN "intelligenceCompanyId" TO "indexCompanyId";
            RAISE NOTICE 'Migration complete: intelligenceCompanyId renamed to indexCompanyId';
        ELSIF has_index_column THEN
            RAISE NOTICE 'Table already has indexCompanyId field - no migration needed';
        ELSIF NOT has_intelligence_column AND NOT has_index_column THEN
            RAISE NOTICE 'Neither column exists - adding indexCompanyId';
            ALTER TABLE "Listing" ADD COLUMN IF NOT EXISTS "indexCompanyId" TEXT;
        END IF;
    ELSE
        RAISE NOTICE 'Listing table does not exist - skipping migration';
    END IF;
END $$;

-- Verify the migration
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'Listing'
AND column_name IN ('intelligenceCompanyId', 'indexCompanyId')
ORDER BY column_name;

