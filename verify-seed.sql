-- Verify Company table seed
-- Run this in Supabase SQL Editor to check if seeding was successful

-- Count total companies
SELECT COUNT(*) as total_companies FROM "Company";

-- Show top 10 companies by score
SELECT 
    "slug",
    "name",
    "category",
    "overallScore",
    "teamHealthScore",
    "growthScore",
    "socialScore",
    "walletQualityScore",
    "trend",
    "isListed"
FROM "Company"
ORDER BY "overallScore" DESC
LIMIT 10;

-- Count by category
SELECT 
    "category",
    COUNT(*) as count
FROM "Company"
GROUP BY "category"
ORDER BY count DESC;

-- Check if indexData is populated
SELECT 
    COUNT(*) as total,
    COUNT("indexData") as with_index_data,
    COUNT(*) - COUNT("indexData") as missing_index_data
FROM "Company";

