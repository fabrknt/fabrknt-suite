-- Direct Migration: Rename intelligenceCompanyId to indexCompanyId
-- Run this in Supabase SQL Editor

-- Step 1: Check current state
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'Listing'
AND column_name IN ('intelligenceCompanyId', 'indexCompanyId')
ORDER BY column_name;

-- Step 2: Rename the column (only if intelligenceCompanyId exists and indexCompanyId doesn't)
DO $$
BEGIN
    -- Check if intelligenceCompanyId exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'Listing' 
        AND column_name = 'intelligenceCompanyId'
    ) THEN
        -- Check if indexCompanyId already exists
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'Listing' 
            AND column_name = 'indexCompanyId'
        ) THEN
            -- Rename the column
            ALTER TABLE "Listing" RENAME COLUMN "intelligenceCompanyId" TO "indexCompanyId";
            RAISE NOTICE 'Successfully renamed intelligenceCompanyId to indexCompanyId';
        ELSE
            RAISE NOTICE 'indexCompanyId already exists. If you want to migrate data, you may need to drop intelligenceCompanyId manually.';
        END IF;
    ELSE
        -- Check if indexCompanyId exists
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'Listing' 
            AND column_name = 'indexCompanyId'
        ) THEN
            RAISE NOTICE 'Column is already named indexCompanyId - no migration needed';
        ELSE
            RAISE NOTICE 'Neither intelligenceCompanyId nor indexCompanyId exists. Adding indexCompanyId...';
            ALTER TABLE "Listing" ADD COLUMN "indexCompanyId" TEXT;
        END IF;
    END IF;
END $$;

-- Step 3: Verify the result
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'Listing'
AND column_name IN ('intelligenceCompanyId', 'indexCompanyId')
ORDER BY column_name;

