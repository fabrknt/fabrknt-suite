-- Direct SQL to rename the column
-- Copy and paste this entire block into Supabase SQL Editor and run it

-- First, check what columns exist
SELECT column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'Listing' 
AND column_name IN ('intelligenceCompanyId', 'indexCompanyId');

-- Then run this to rename (only if intelligenceCompanyId exists)
ALTER TABLE "Listing" RENAME COLUMN "intelligenceCompanyId" TO "indexCompanyId";

-- Verify it worked
SELECT column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'Listing' 
AND column_name IN ('intelligenceCompanyId', 'indexCompanyId');

