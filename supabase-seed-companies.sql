-- Seed Company table with Index data from 24 JSON files
-- Run this in Supabase SQL Editor after creating the Company table
-- Generated: 2026-01-02T06:01:56.917Z

-- Clear existing data (optional)
-- TRUNCATE "Company" CASCADE;

-- Aurory
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_aurory',
    'aurory',
    'Aurory',
    'gaming',
    'RPG and NFT game on Solana',
    '🎴',
    'https://aurory.io',
    0,
    0,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Aurory","category":"gaming","github":{"totalContributors":0,"activeContributors30d":0,"totalCommits30d":0,"avgCommitsPerDay":0,"topContributors":[],"commitActivity":[]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:55:35.530Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"AURYxxLd8c4qFd3s2Q1a1n4ZWLJ7XfyqTxq6HgFjE1","chain":"solana","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:55:35.662Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.946Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Blur
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_blur',
    'blur',
    'Blur',
    'nft',
    'NFT marketplace and aggregator',
    '💎',
    'https://blur.io',
    3,
    35,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Blur","category":"nft","github":{"totalContributors":3,"activeContributors30d":3,"totalCommits30d":0,"avgCommitsPerDay":0,"topContributors":[{"login":"operatorfilterer","contributions":0,"avatarUrl":""},{"login":"pacmanblur","contributions":0,"avatarUrl":""},{"login":"adjisb","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742688000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743292800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743897600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1744502400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745107200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745712000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746316800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746921600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747526400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748131200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748736000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749340800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749945600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750550400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751155200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752364800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752969600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753574400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754179200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755388800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755993600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1756598400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757203200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757808000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1758412800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759017600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759622400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760227200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760832000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1761436800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762041600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762646400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763251200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763856000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1764460800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765065600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766880000,"total":0,"days":[0,0,0,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:52:46.572Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0x0000000000A39bb272e79075ade645fdA5fdEe5F","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:52:47.404Z"}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.947Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Drift Protocol
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_drift',
    'drift',
    'Drift Protocol',
    'defi',
    'Decentralized perpetuals and spot trading on Solana',
    '🌊',
    'https://www.drift.trade',
    27,
    70,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Drift","category":"defi","github":{"totalContributors":32,"activeContributors30d":32,"totalCommits30d":118,"avgCommitsPerDay":3.9,"topContributors":[{"login":"wphan","contributions":0,"avatarUrl":""},{"login":"goldhaxx","contributions":0,"avatarUrl":""},{"login":"crispheaney","contributions":0,"avatarUrl":""},{"login":"0xbigz","contributions":0,"avatarUrl":""},{"login":"jordy25519","contributions":0,"avatarUrl":""},{"login":"github-actions[bot]","contributions":0,"avatarUrl":""},{"login":"soundsonacid","contributions":0,"avatarUrl":""},{"login":"0xahzam","contributions":0,"avatarUrl":""},{"login":"moosecat2","contributions":0,"avatarUrl":""},{"login":"aoikurokawa","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":57,"days":[0,8,5,28,12,3,1]},{"week":1736640000,"total":34,"days":[0,7,10,1,6,2,8]},{"week":1737244800,"total":76,"days":[5,36,16,9,1,9,0]},{"week":1737849600,"total":92,"days":[5,11,11,4,37,16,8]},{"week":1738454400,"total":67,"days":[0,8,9,8,25,15,2]},{"week":1739059200,"total":51,"days":[0,2,8,14,23,4,0]},{"week":1739664000,"total":90,"days":[0,18,10,23,23,16,0]},{"week":1740268800,"total":78,"days":[0,0,11,12,31,16,8]},{"week":1740873600,"total":95,"days":[1,29,9,23,16,12,5]},{"week":1741478400,"total":40,"days":[0,5,6,1,14,11,3]},{"week":1742083200,"total":86,"days":[1,14,31,9,11,20,0]},{"week":1742688000,"total":76,"days":[0,6,8,20,21,13,8]},{"week":1743292800,"total":38,"days":[0,7,10,1,17,3,0]},{"week":1743897600,"total":60,"days":[1,16,9,12,17,5,0]},{"week":1744502400,"total":66,"days":[0,13,9,18,10,16,0]},{"week":1745107200,"total":41,"days":[0,16,3,7,8,7,0]},{"week":1745712000,"total":60,"days":[0,1,23,29,1,6,0]},{"week":1746316800,"total":35,"days":[0,11,8,14,0,2,0]},{"week":1746921600,"total":52,"days":[0,3,6,26,7,10,0]},{"week":1747526400,"total":26,"days":[0,11,5,3,4,3,0]},{"week":1748131200,"total":39,"days":[0,0,9,16,7,3,4]},{"week":1748736000,"total":58,"days":[1,8,11,12,18,6,2]},{"week":1749340800,"total":69,"days":[0,8,15,10,16,14,6]},{"week":1749945600,"total":88,"days":[6,19,12,41,10,0,0]},{"week":1750550400,"total":44,"days":[0,5,9,7,21,2,0]},{"week":1751155200,"total":37,"days":[0,6,9,7,11,4,0]},{"week":1751760000,"total":70,"days":[1,12,17,9,19,9,3]},{"week":1752364800,"total":67,"days":[6,16,23,7,2,13,0]},{"week":1752969600,"total":81,"days":[10,13,14,29,12,1,2]},{"week":1753574400,"total":144,"days":[5,24,43,34,31,7,0]},{"week":1754179200,"total":71,"days":[2,22,17,15,9,6,0]},{"week":1754784000,"total":49,"days":[0,3,8,35,3,0,0]},{"week":1755388800,"total":65,"days":[0,21,12,12,13,5,2]},{"week":1755993600,"total":31,"days":[0,1,11,3,15,1,0]},{"week":1756598400,"total":32,"days":[0,2,5,13,6,6,0]},{"week":1757203200,"total":28,"days":[0,9,5,5,4,4,1]},{"week":1757808000,"total":91,"days":[0,15,13,25,15,15,8]},{"week":1758412800,"total":108,"days":[0,23,24,26,28,7,0]},{"week":1759017600,"total":96,"days":[0,15,2,2,22,47,8]},{"week":1759622400,"total":67,"days":[9,10,18,13,13,4,0]},{"week":1760227200,"total":80,"days":[0,17,24,16,22,1,0]},{"week":1760832000,"total":60,"days":[0,4,10,23,13,7,3]},{"week":1761436800,"total":110,"days":[1,22,15,41,24,7,0]},{"week":1762041600,"total":69,"days":[0,19,14,10,21,4,1]},{"week":1762646400,"total":37,"days":[0,5,10,13,4,5,0]},{"week":1763251200,"total":71,"days":[0,18,14,17,20,2,0]},{"week":1763856000,"total":32,"days":[0,5,9,7,11,0,0]},{"week":1764460800,"total":58,"days":[0,20,6,12,10,9,1]},{"week":1765065600,"total":28,"days":[1,3,2,3,6,12,1]},{"week":1765670400,"total":13,"days":[0,6,1,0,5,1,0]},{"week":1766275200,"total":8,"days":[0,5,0,0,0,0,3]},{"week":1766880000,"total":11,"days":[5,4,1,1,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:53:11.361Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"dRiftyHA39bWEY4nXUvNnprgNa8gvhcteAdT","chain":"solana","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:53:13.618Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.948Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Euler
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_euler',
    'euler',
    'Euler',
    'defi',
    'Permissionless lending protocol on Ethereum',
    '📐',
    'https://www.euler.finance',
    23,
    60,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Euler","category":"defi","github":{"totalContributors":32,"activeContributors30d":32,"totalCommits30d":42,"avgCommitsPerDay":1.4,"topContributors":[{"login":"actions-user","contributions":0,"avatarUrl":""},{"login":"kanvgupta","contributions":0,"avatarUrl":""},{"login":"0xFrostytie","contributions":0,"avatarUrl":""},{"login":"totomanov","contributions":0,"avatarUrl":""},{"login":"dependabot[bot]","contributions":0,"avatarUrl":""},{"login":"dglowinski","contributions":0,"avatarUrl":""},{"login":"hoytech","contributions":0,"avatarUrl":""},{"login":"kasperpawlowski","contributions":0,"avatarUrl":""},{"login":"MickdeGraaf","contributions":0,"avatarUrl":""},{"login":"TanyaRoze","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":39,"days":[1,3,4,13,7,8,3]},{"week":1736038800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":38,"days":[0,4,9,14,7,4,0]},{"week":1736643600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":59,"days":[6,15,11,3,9,10,5]},{"week":1737248400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":35,"days":[0,12,8,4,8,3,0]},{"week":1737853200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":49,"days":[0,8,7,10,15,5,4]},{"week":1738458000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":49,"days":[1,9,9,1,17,9,3]},{"week":1739062800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":47,"days":[14,10,7,3,9,4,0]},{"week":1739667600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":48,"days":[0,12,16,3,6,2,9]},{"week":1740272400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":106,"days":[12,37,14,27,13,3,0]},{"week":1740877200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":51,"days":[1,8,15,13,7,3,4]},{"week":1741482000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":45,"days":[0,10,11,5,6,13,0]},{"week":1742688000,"total":49,"days":[1,13,8,6,8,9,4]},{"week":1743292800,"total":45,"days":[1,9,7,9,13,5,1]},{"week":1743897600,"total":47,"days":[3,18,3,9,9,5,0]},{"week":1744502400,"total":72,"days":[2,12,20,13,7,17,1]},{"week":1745107200,"total":52,"days":[2,9,10,9,6,12,4]},{"week":1745712000,"total":76,"days":[1,12,16,8,15,20,4]},{"week":1746316800,"total":31,"days":[4,5,8,5,4,3,2]},{"week":1746921600,"total":30,"days":[0,7,8,10,3,2,0]},{"week":1747526400,"total":23,"days":[0,5,1,6,2,9,0]},{"week":1748131200,"total":20,"days":[1,2,2,4,10,1,0]},{"week":1748736000,"total":37,"days":[1,8,3,7,11,5,2]},{"week":1749340800,"total":35,"days":[0,8,9,4,6,3,5]},{"week":1749945600,"total":47,"days":[1,23,5,3,4,11,0]},{"week":1750550400,"total":37,"days":[1,11,6,15,0,4,0]},{"week":1751155200,"total":40,"days":[3,10,3,8,7,9,0]},{"week":1751760000,"total":27,"days":[0,7,3,8,6,2,1]},{"week":1752364800,"total":31,"days":[3,14,5,0,3,4,2]},{"week":1752969600,"total":108,"days":[0,5,4,3,4,44,48]},{"week":1753574400,"total":391,"days":[50,54,65,59,60,54,49]},{"week":1754179200,"total":427,"days":[48,59,54,61,71,67,67]},{"week":1754784000,"total":531,"days":[65,84,90,79,79,71,63]},{"week":1755388800,"total":516,"days":[65,73,70,74,84,78,72]},{"week":1755993600,"total":518,"days":[70,79,80,78,78,73,60]},{"week":1756598400,"total":519,"days":[67,79,79,77,79,74,64]},{"week":1757203200,"total":509,"days":[62,79,71,76,90,69,62]},{"week":1757808000,"total":490,"days":[65,66,65,77,76,78,63]},{"week":1758412800,"total":507,"days":[65,75,83,74,73,75,62]},{"week":1759017600,"total":576,"days":[88,98,84,86,77,77,66]},{"week":1759622400,"total":474,"days":[64,68,78,73,77,63,51]},{"week":1760227200,"total":474,"days":[48,78,76,80,66,70,56]},{"week":1760832000,"total":473,"days":[54,66,60,77,77,86,53]},{"week":1761436800,"total":420,"days":[48,53,53,60,73,72,61]},{"week":1762041600,"total":422,"days":[55,60,69,60,64,56,58]},{"week":1762646400,"total":413,"days":[56,64,67,62,56,57,51]},{"week":1763251200,"total":426,"days":[53,63,65,64,68,60,53]},{"week":1763856000,"total":461,"days":[57,68,75,75,64,64,58]},{"week":1764460800,"total":491,"days":[62,76,86,68,71,64,64]},{"week":1765065600,"total":444,"days":[60,69,64,63,64,65,59]},{"week":1765670400,"total":246,"days":[66,68,72,36,1,3,0]},{"week":1766275200,"total":183,"days":[2,3,3,12,43,61,59]},{"week":1766880000,"total":301,"days":[56,63,59,57,57,9,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:52:24.025Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0x27182842E098f60e3D576794A5bFFb0777E025d3","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:52:25.785Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.949Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Fabrknt
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_fabrknt',
    'fabrknt',
    'Fabrknt',
    'infrastructure',
    'The Foundational Foundry for Agentic Code & Future Economies',
    '🏭',
    'https://www.fabrknt.com',
    18,
    30,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Fabrknt","category":"infrastructure","github":{"totalContributors":1,"activeContributors30d":1,"totalCommits30d":22,"avgCommitsPerDay":0.7,"topContributors":[{"login":"psyto","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742079600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742684400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743289200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743894000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1744498800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745103600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745708400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746313200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746918000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747522800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748127600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748732400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749337200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749942000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750546800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751151600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751756400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752361200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752966000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753570800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754175600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754780400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755385200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755990000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1756594800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757199600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757804400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1758409200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759014000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759618800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760223600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760828400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1761433200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762038000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762646400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763251200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763856000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1764460800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765065600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":8,"days":[0,6,1,0,1,0,0]},{"week":1766880000,"total":11,"days":[3,0,0,6,2,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:56:01.840Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"contractAddress":"0x0000000000000000000000000000000000000000","chain":"ethereum","transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"dailyActiveUsers":0,"monthlyActiveUsers":0},"news":[],"calculatedAt":"2026-01-02T03:56:05.091Z"}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.949Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Jito
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_jito',
    'jito',
    'Jito',
    'infrastructure',
    'MEV infrastructure on Solana',
    '⚡',
    'https://www.jito.wtf',
    44,
    61,
    16,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Jito","category":"infrastructure","github":{"totalContributors":37,"activeContributors30d":37,"totalCommits30d":43,"avgCommitsPerDay":1.4,"topContributors":[{"login":"buffalu","contributions":0,"avatarUrl":""},{"login":"segfaultdoc","contributions":0,"avatarUrl":""},{"login":"esemeniuc","contributions":0,"avatarUrl":""},{"login":"DaveWK","contributions":0,"avatarUrl":""},{"login":"ebin-mathews","contributions":0,"avatarUrl":""},{"login":"jedleggett","contributions":0,"avatarUrl":""},{"login":"SOELTH","contributions":0,"avatarUrl":""},{"login":"0xEdgar","contributions":0,"avatarUrl":""},{"login":"jitosecdude","contributions":0,"avatarUrl":""},{"login":"mvines","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":109,"days":[2,16,23,20,20,23,5]},{"week":1736038800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":80,"days":[2,20,14,10,17,14,3]},{"week":1736643600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":76,"days":[4,10,13,20,11,15,3]},{"week":1737248400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":73,"days":[3,9,19,11,17,13,1]},{"week":1737853200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":98,"days":[0,20,23,21,22,9,3]},{"week":1738458000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":85,"days":[2,11,20,20,14,14,4]},{"week":1739062800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":36,"days":[2,8,13,5,2,3,3]},{"week":1739667600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":40,"days":[1,3,7,10,5,12,2]},{"week":1740272400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":52,"days":[1,11,12,5,14,9,0]},{"week":1740877200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":85,"days":[1,15,10,19,15,22,3]},{"week":1741482000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":70,"days":[0,14,13,15,15,10,3]},{"week":1742688000,"total":107,"days":[0,19,21,21,30,14,2]},{"week":1743292800,"total":60,"days":[0,15,9,15,11,7,3]},{"week":1743897600,"total":81,"days":[4,17,10,14,21,11,4]},{"week":1744502400,"total":94,"days":[1,31,20,14,6,15,7]},{"week":1745107200,"total":83,"days":[1,14,15,17,25,10,1]},{"week":1745712000,"total":54,"days":[1,10,13,12,9,8,1]},{"week":1746316800,"total":79,"days":[2,13,23,11,13,17,0]},{"week":1746921600,"total":75,"days":[7,15,19,11,12,9,2]},{"week":1747526400,"total":38,"days":[4,4,11,1,8,9,1]},{"week":1748131200,"total":58,"days":[0,6,16,10,12,10,4]},{"week":1748736000,"total":75,"days":[1,15,18,19,5,17,0]},{"week":1749340800,"total":70,"days":[0,8,14,14,19,14,1]},{"week":1749945600,"total":67,"days":[0,16,15,14,7,14,1]},{"week":1750550400,"total":60,"days":[2,14,14,14,8,7,1]},{"week":1751155200,"total":43,"days":[0,4,11,15,9,4,0]},{"week":1751760000,"total":63,"days":[3,15,9,9,13,12,2]},{"week":1752364800,"total":76,"days":[1,16,16,16,14,13,0]},{"week":1752969600,"total":94,"days":[2,13,22,23,14,18,2]},{"week":1753574400,"total":69,"days":[5,23,13,11,6,6,5]},{"week":1754179200,"total":125,"days":[1,19,20,21,34,23,7]},{"week":1754784000,"total":94,"days":[3,13,27,14,13,21,3]},{"week":1755388800,"total":94,"days":[2,13,13,19,29,16,2]},{"week":1755993600,"total":65,"days":[0,12,13,17,10,9,4]},{"week":1756598400,"total":86,"days":[3,3,14,21,19,23,3]},{"week":1757203200,"total":88,"days":[2,14,23,14,18,13,4]},{"week":1757808000,"total":44,"days":[1,1,5,14,11,10,2]},{"week":1758412800,"total":68,"days":[2,9,17,11,14,13,2]},{"week":1759017600,"total":76,"days":[2,11,20,17,16,7,3]},{"week":1759622400,"total":75,"days":[1,15,15,16,17,8,3]},{"week":1760227200,"total":86,"days":[0,14,26,17,12,15,2]},{"week":1760832000,"total":103,"days":[0,13,24,19,16,29,2]},{"week":1761436800,"total":116,"days":[2,19,21,36,12,22,4]},{"week":1762041600,"total":107,"days":[2,16,18,27,26,13,5]},{"week":1762646400,"total":65,"days":[3,8,15,11,10,11,7]},{"week":1763251200,"total":90,"days":[3,16,15,15,22,18,1]},{"week":1763856000,"total":23,"days":[7,15,1,0,0,0,0]},{"week":1764460800,"total":16,"days":[0,10,0,6,0,0,0]},{"week":1765065600,"total":2,"days":[0,0,0,1,0,0,1]},{"week":1765670400,"total":6,"days":[0,1,1,0,1,1,2]},{"week":1766275200,"total":5,"days":[0,0,1,2,0,0,2]},{"week":1766880000,"total":4,"days":[0,2,2,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:55:06.593Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":1994,"transactionCount7d":1994,"transactionCount30d":1994,"uniqueWallets24h":1994,"uniqueWallets7d":1994,"uniqueWallets30d":1994,"contractAddress":"Jito4APyf642JPZPx3hGc6WWJ8zPKtRbRs4P815Awbb","chain":"solana","monthlyActiveUsers":1994,"dailyActiveUsers":1994,"weeklyActiveUsers":1994},"calculatedAt":"2026-01-02T03:55:16.159Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.950Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Jupiter
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_jupiter',
    'jupiter',
    'Jupiter',
    'defi',
    'Leading DEX aggregator on Solana providing best swap rates across all DEXs',
    '🪐',
    'https://jup.ag',
    39,
    75,
    16,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Jupiter","category":"defi","github":{"totalContributors":42,"activeContributors30d":42,"totalCommits30d":144,"avgCommitsPerDay":4.8,"topContributors":[{"login":"0xYankee-Raccoons","contributions":0,"avatarUrl":""},{"login":"benlvb","contributions":0,"avatarUrl":""},{"login":"dongnguyen9186","contributions":0,"avatarUrl":""},{"login":"sssionggg","contributions":0,"avatarUrl":""},{"login":"9yoi","contributions":0,"avatarUrl":""},{"login":"wowmiir","contributions":0,"avatarUrl":""},{"login":"worlddlckgh","contributions":0,"avatarUrl":""},{"login":"sirnaynay","contributions":0,"avatarUrl":""},{"login":"joshteng","contributions":0,"avatarUrl":""},{"login":"0xSoju2","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":3,"days":[0,2,0,0,1,0,0]},{"week":1736038800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":6,"days":[0,0,4,0,2,0,0]},{"week":1736643600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":6,"days":[0,1,2,2,1,0,0]},{"week":1737248400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":3,"days":[0,0,0,1,1,0,1]},{"week":1737853200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":9,"days":[0,1,0,2,0,0,6]},{"week":1738458000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":19,"days":[9,3,1,1,3,2,0]},{"week":1739062800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":2,"days":[0,1,0,1,0,0,0]},{"week":1739667600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":6,"days":[0,2,1,2,0,1,0]},{"week":1740272400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":1,"days":[0,1,0,0,0,0,0]},{"week":1740877200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":1,"days":[0,0,0,0,1,0,0]},{"week":1741482000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742079600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":2,"days":[0,0,2,0,0,0,0]},{"week":1742684400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742688000,"total":14,"days":[0,5,2,5,0,1,1]},{"week":1743289200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743292800,"total":9,"days":[0,1,1,4,1,2,0]},{"week":1743894000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743897600,"total":4,"days":[0,0,1,0,3,0,0]},{"week":1744498800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1744502400,"total":7,"days":[0,0,2,2,0,3,0]},{"week":1745103600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745107200,"total":4,"days":[0,2,1,1,0,0,0]},{"week":1745708400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745712000,"total":3,"days":[0,2,0,1,0,0,0]},{"week":1746313200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746316800,"total":4,"days":[0,0,0,2,1,1,0]},{"week":1746918000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746921600,"total":4,"days":[1,0,1,0,0,2,0]},{"week":1747522800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747526400,"total":4,"days":[1,0,1,1,1,0,0]},{"week":1748127600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748131200,"total":2,"days":[0,0,0,1,0,1,0]},{"week":1748732400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748736000,"total":4,"days":[0,0,0,1,1,1,1]},{"week":1749337200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749340800,"total":1,"days":[0,1,0,0,0,0,0]},{"week":1749942000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749945600,"total":2,"days":[0,0,0,0,0,1,1]},{"week":1750546800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750550400,"total":12,"days":[0,2,1,4,4,1,0]},{"week":1751151600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751155200,"total":2,"days":[0,0,0,1,0,1,0]},{"week":1751756400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":7,"days":[0,2,0,1,2,2,0]},{"week":1752361200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752364800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752966000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752969600,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1753570800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753574400,"total":8,"days":[0,1,1,1,1,2,2]},{"week":1754175600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754179200,"total":15,"days":[0,3,4,4,1,3,0]},{"week":1754780400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":2,"days":[0,0,0,0,0,2,0]},{"week":1755385200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755388800,"total":6,"days":[0,3,1,2,0,0,0]},{"week":1755990000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755993600,"total":5,"days":[0,0,0,2,2,1,0]},{"week":1756594800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1756598400,"total":4,"days":[0,4,0,0,0,0,0]},{"week":1757199600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757203200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757804400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757808000,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1758409200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1758412800,"total":3,"days":[0,0,2,0,0,1,0]},{"week":1759014000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759017600,"total":1,"days":[0,0,0,0,1,0,0]},{"week":1759618800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759622400,"total":2,"days":[0,1,0,1,0,0,0]},{"week":1760223600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760227200,"total":8,"days":[0,0,0,4,3,1,0]},{"week":1760828400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760832000,"total":4,"days":[1,0,2,0,0,0,1]},{"week":1761433200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1761436800,"total":25,"days":[0,0,14,9,0,0,2]},{"week":1762038000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762041600,"total":8,"days":[0,0,1,5,2,0,0]},{"week":1762646400,"total":8,"days":[0,0,1,2,1,0,4]},{"week":1763251200,"total":5,"days":[0,1,1,1,2,0,0]},{"week":1763856000,"total":18,"days":[0,0,1,0,0,17,0]},{"week":1764460800,"total":108,"days":[1,4,10,52,27,14,0]},{"week":1765065600,"total":21,"days":[0,2,6,2,8,3,0]},{"week":1765670400,"total":8,"days":[0,1,0,1,2,4,0]},{"week":1766275200,"total":4,"days":[0,1,0,0,0,3,0]},{"week":1766880000,"total":7,"days":[0,1,4,1,0,1,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:51:52.015Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":1981,"transactionCount7d":1968,"transactionCount30d":1993,"uniqueWallets24h":1981,"uniqueWallets7d":1968,"uniqueWallets30d":1993,"contractAddress":"JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4","chain":"solana","monthlyActiveUsers":1993,"dailyActiveUsers":1981,"weeklyActiveUsers":1968},"calculatedAt":"2026-01-02T03:52:01.339Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.951Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Kamino Finance
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_kamino',
    'kamino',
    'Kamino Finance',
    'defi',
    'Automated liquidity management',
    '🌊',
    'https://kamino.finance',
    24,
    62,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Kamino Finance","category":"defi","github":{"totalContributors":47,"activeContributors30d":47,"totalCommits30d":43,"avgCommitsPerDay":1.4,"topContributors":[{"login":"kaminofinancebot","contributions":0,"avatarUrl":""},{"login":"peroxy","contributions":0,"avatarUrl":""},{"login":"oeble","contributions":0,"avatarUrl":""},{"login":"andreihrs","contributions":0,"avatarUrl":""},{"login":"y2kappa","contributions":0,"avatarUrl":""},{"login":"gabrielkoerich","contributions":0,"avatarUrl":""},{"login":"mihalex98","contributions":0,"avatarUrl":""},{"login":"SC4RECOIN","contributions":0,"avatarUrl":""},{"login":"valentinmadrid","contributions":0,"avatarUrl":""},{"login":"silviutroscot","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":32,"days":[0,10,4,4,7,6,1]},{"week":1736038800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":48,"days":[0,15,17,1,2,13,0]},{"week":1736643600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":43,"days":[0,5,12,10,5,5,6]},{"week":1737248400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":50,"days":[0,11,22,6,8,3,0]},{"week":1737853200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":38,"days":[2,13,12,1,6,2,2]},{"week":1738458000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":33,"days":[2,7,10,2,4,8,0]},{"week":1739062800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":24,"days":[0,11,3,2,4,4,0]},{"week":1739667600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":27,"days":[0,8,7,2,1,9,0]},{"week":1740272400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":42,"days":[0,16,12,5,4,5,0]},{"week":1740877200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":25,"days":[2,7,5,4,6,1,0]},{"week":1741482000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":42,"days":[2,11,2,9,12,6,0]},{"week":1742688000,"total":41,"days":[0,5,14,11,6,3,2]},{"week":1743292800,"total":25,"days":[0,0,8,3,8,4,2]},{"week":1743897600,"total":31,"days":[0,10,3,6,6,4,2]},{"week":1744502400,"total":20,"days":[0,6,7,2,4,1,0]},{"week":1745107200,"total":20,"days":[0,2,0,9,0,9,0]},{"week":1745712000,"total":28,"days":[0,2,18,5,1,2,0]},{"week":1746316800,"total":27,"days":[0,10,7,3,3,4,0]},{"week":1746921600,"total":30,"days":[0,4,16,7,2,1,0]},{"week":1747526400,"total":30,"days":[2,8,5,8,6,1,0]},{"week":1748131200,"total":22,"days":[1,2,2,4,5,8,0]},{"week":1748736000,"total":24,"days":[0,4,7,7,2,4,0]},{"week":1749340800,"total":19,"days":[0,7,4,3,4,1,0]},{"week":1749945600,"total":13,"days":[0,3,4,1,1,4,0]},{"week":1750550400,"total":35,"days":[0,4,4,14,6,7,0]},{"week":1751155200,"total":22,"days":[0,7,6,6,1,2,0]},{"week":1751760000,"total":24,"days":[0,1,7,7,7,2,0]},{"week":1752364800,"total":30,"days":[0,3,7,9,7,4,0]},{"week":1752969600,"total":26,"days":[0,5,7,4,3,7,0]},{"week":1753574400,"total":19,"days":[0,3,4,2,0,10,0]},{"week":1754179200,"total":21,"days":[0,8,2,5,6,0,0]},{"week":1754784000,"total":25,"days":[0,2,17,2,0,4,0]},{"week":1755388800,"total":20,"days":[0,9,2,6,2,1,0]},{"week":1755993600,"total":14,"days":[0,1,4,7,2,0,0]},{"week":1756598400,"total":35,"days":[0,3,5,14,10,3,0]},{"week":1757203200,"total":9,"days":[0,2,2,0,4,1,0]},{"week":1757808000,"total":19,"days":[0,8,5,4,2,0,0]},{"week":1758412800,"total":10,"days":[0,2,2,2,3,1,0]},{"week":1759017600,"total":25,"days":[0,6,8,5,4,2,0]},{"week":1759622400,"total":23,"days":[0,5,5,3,5,5,0]},{"week":1760227200,"total":23,"days":[0,7,2,4,8,2,0]},{"week":1760832000,"total":10,"days":[0,2,2,2,1,3,0]},{"week":1761436800,"total":25,"days":[0,2,3,7,6,7,0]},{"week":1762041600,"total":27,"days":[0,7,4,15,0,1,0]},{"week":1762646400,"total":13,"days":[0,1,1,5,5,1,0]},{"week":1763251200,"total":10,"days":[0,0,2,5,2,1,0]},{"week":1763856000,"total":23,"days":[0,6,2,11,2,2,0]},{"week":1764460800,"total":6,"days":[0,0,2,0,4,0,0]},{"week":1765065600,"total":22,"days":[0,4,3,8,3,4,0]},{"week":1765670400,"total":14,"days":[0,2,3,4,3,0,2]},{"week":1766275200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766880000,"total":2,"days":[0,1,0,1,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:53:35.251Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"KLend2g3cP87fffoy8q1mQqGKjrxjC8boSy","chain":"solana","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:53:37.466Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.951Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Lido
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_lido',
    'lido',
    'Lido',
    'defi',
    'Liquid staking protocol for Ethereum',
    '🌊',
    'https://lido.fi',
    29,
    74,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Lido","category":"defi","github":{"totalContributors":47,"activeContributors30d":47,"totalCommits30d":133,"avgCommitsPerDay":4.4,"topContributors":[{"login":"tamtamchik","contributions":0,"avatarUrl":""},{"login":"folkyatina","contributions":0,"avatarUrl":""},{"login":"failingtwice","contributions":0,"avatarUrl":""},{"login":"TheDZhon","contributions":0,"avatarUrl":""},{"login":"arwer13","contributions":0,"avatarUrl":""},{"login":"krogla","contributions":0,"avatarUrl":""},{"login":"skozin","contributions":0,"avatarUrl":""},{"login":"vp4242","contributions":0,"avatarUrl":""},{"login":"loga4","contributions":0,"avatarUrl":""},{"login":"Jeday","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":34,"days":[0,0,4,4,9,17,0]},{"week":1736038800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":73,"days":[0,7,14,13,26,13,0]},{"week":1736643600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":45,"days":[4,10,6,17,7,1,0]},{"week":1737248400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":85,"days":[1,22,25,14,12,10,1]},{"week":1737853200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":74,"days":[0,17,13,8,16,9,11]},{"week":1738458000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":88,"days":[1,15,11,26,13,21,1]},{"week":1739062800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":70,"days":[0,11,12,15,11,19,2]},{"week":1739667600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":53,"days":[1,11,7,10,17,6,1]},{"week":1740272400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":61,"days":[2,15,12,14,9,8,1]},{"week":1740877200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":66,"days":[1,13,13,5,23,11,0]},{"week":1741482000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":93,"days":[0,18,19,22,18,13,3]},{"week":1742688000,"total":89,"days":[1,25,11,31,12,8,1]},{"week":1743292800,"total":70,"days":[0,15,18,13,12,11,1]},{"week":1743897600,"total":86,"days":[1,6,16,22,24,17,0]},{"week":1744502400,"total":119,"days":[1,9,31,21,33,24,0]},{"week":1745107200,"total":101,"days":[4,15,21,30,18,13,0]},{"week":1745712000,"total":34,"days":[1,6,8,11,1,7,0]},{"week":1746316800,"total":70,"days":[2,8,19,29,11,1,0]},{"week":1746921600,"total":121,"days":[6,20,22,25,27,18,3]},{"week":1747526400,"total":141,"days":[8,32,16,22,36,27,0]},{"week":1748131200,"total":184,"days":[6,28,57,23,31,35,4]},{"week":1748736000,"total":93,"days":[3,13,19,24,12,22,0]},{"week":1749340800,"total":198,"days":[1,17,32,51,28,55,14]},{"week":1749945600,"total":110,"days":[9,30,22,17,17,15,0]},{"week":1750550400,"total":43,"days":[2,6,13,7,10,5,0]},{"week":1751155200,"total":31,"days":[0,8,6,11,2,4,0]},{"week":1751760000,"total":56,"days":[1,5,15,16,11,8,0]},{"week":1752364800,"total":71,"days":[0,13,13,18,12,13,2]},{"week":1752969600,"total":82,"days":[0,15,5,15,24,19,4]},{"week":1753574400,"total":51,"days":[2,11,15,10,8,5,0]},{"week":1754179200,"total":58,"days":[2,2,10,7,18,19,0]},{"week":1754784000,"total":47,"days":[8,12,5,3,16,3,0]},{"week":1755388800,"total":46,"days":[0,13,1,24,3,5,0]},{"week":1755993600,"total":77,"days":[13,16,11,12,14,11,0]},{"week":1756598400,"total":77,"days":[2,8,6,28,9,11,13]},{"week":1757203200,"total":44,"days":[2,4,12,6,7,8,5]},{"week":1757808000,"total":98,"days":[0,17,25,33,10,13,0]},{"week":1758412800,"total":78,"days":[3,19,13,26,11,5,1]},{"week":1759017600,"total":58,"days":[2,7,8,15,17,8,1]},{"week":1759622400,"total":54,"days":[0,12,18,17,2,5,0]},{"week":1760227200,"total":59,"days":[0,7,8,23,10,3,8]},{"week":1760832000,"total":63,"days":[4,9,10,5,19,15,1]},{"week":1761436800,"total":55,"days":[0,6,13,12,5,6,13]},{"week":1762041600,"total":65,"days":[2,7,22,13,7,9,5]},{"week":1762646400,"total":25,"days":[0,12,3,4,3,2,1]},{"week":1763251200,"total":32,"days":[0,3,8,9,8,2,2]},{"week":1763856000,"total":49,"days":[0,9,7,20,6,3,4]},{"week":1764460800,"total":58,"days":[1,19,18,8,5,5,2]},{"week":1765065600,"total":71,"days":[2,15,11,7,17,14,5]},{"week":1765670400,"total":65,"days":[15,25,8,3,9,2,3]},{"week":1766275200,"total":21,"days":[1,9,3,3,3,0,2]},{"week":1766880000,"total":10,"days":[0,9,1,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:53:56.830Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:53:59.973Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.952Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Mango Markets
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_mangomarkets',
    'mangomarkets',
    'Mango Markets',
    'defi',
    'Decentralized trading platform on Solana',
    '🥭',
    'https://mango.markets',
    69,
    54,
    70,
    0,
    0,
    'up',
    false,
    true,
    '{"companyName":"Mango Markets","category":"defi","github":{"totalContributors":28,"activeContributors30d":28,"totalCommits30d":0,"avgCommitsPerDay":0,"topContributors":[{"login":"godmodegalactus","contributions":0,"avatarUrl":""},{"login":"farnyser","contributions":0,"avatarUrl":""},{"login":"mschneider","contributions":0,"avatarUrl":""},{"login":"riordanp","contributions":0,"avatarUrl":""},{"login":"none00y","contributions":0,"avatarUrl":""},{"login":"grooviegermanikus","contributions":0,"avatarUrl":""},{"login":"microwavedcola1","contributions":0,"avatarUrl":""},{"login":"ckamm","contributions":0,"avatarUrl":""},{"login":"tlrjs","contributions":0,"avatarUrl":""},{"login":"abrzezinski94","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":2,"days":[0,0,0,0,0,2,0]},{"week":1737849600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":5,"days":[0,0,0,0,2,1,2]},{"week":1742688000,"total":8,"days":[6,2,0,0,0,0,0]},{"week":1743292800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743897600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1744502400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745107200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745712000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746316800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746921600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747526400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748131200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748736000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749340800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749945600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750550400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751155200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752364800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752969600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753574400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754179200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755388800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755993600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1756598400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757203200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757808000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1758412800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759017600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759622400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760227200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760832000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1761436800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762041600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762646400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763251200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763856000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1764460800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765065600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766880000,"total":0,"days":[0,0,0,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:55:43.517Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":2,"transactionCount30d":7,"uniqueWallets24h":0,"uniqueWallets7d":2,"uniqueWallets30d":7,"contractAddress":"4MangoMjqJ2firMokCjjGgoK8d4MXcrgL7XJaL3w6fVg","chain":"solana","monthlyActiveUsers":7,"dailyActiveUsers":0,"weeklyActiveUsers":2},"calculatedAt":"2026-01-02T03:55:52.206Z","news":[{"title":"On The Widespread Adoption of Cryptocurrencies — Venezuela’s Opportunity","url":"https://medium.com/mango-markets/on-the-widespread-adoption-of-cryptocurrencies-venezuelas-opportunity-2666047d48f1?source=collection_home_page----f202d052ee17-----0-----------------------------------","date":"2026-01-02T03:55:55.835Z","summary":"Summary failed","source":"Medium"},{"title":"Mango Markets — The Origins (Why?)","url":"https://medium.com/mango-markets/mango-markets-the-origins-why-e30cc019e89f?source=collection_home_page----f202d052ee17-----1-----------------------------------","date":"2026-01-02T03:55:55.835Z","summary":"Summary failed","source":"Medium"},{"title":"Venezuela’s Challenge — Trascend From Cheap Labour for The World To a Powerhouse of Innovation.","url":"https://medium.com/mango-markets/venezuelas-challenge-trascend-from-cheap-labour-to-the-world-to-a-powerhouse-of-innovation-b5125254d6cf?source=collection_home_page----f202d052ee17-----2-----------------------------------","date":"2026-01-02T03:55:55.835Z","summary":"Summary failed","source":"Medium"},{"title":"On The Widespread Adoption of Cryptocurrencies — Venezuela’s Opportunity","url":"https://medium.com/mango-markets/on-the-widespread-adoption-of-cryptocurrencies-venezuelas-opportunity-2666047d48f1?source=collection_home_page----f202d052ee17-----0-----------------------------------","date":"2026-01-02T03:55:55.835Z","summary":"Summary failed","source":"Medium"},{"title":"Mango Markets — The Origins (Why?)","url":"https://medium.com/mango-markets/mango-markets-the-origins-why-e30cc019e89f?source=collection_home_page----f202d052ee17-----1-----------------------------------","date":"2026-01-02T03:55:55.835Z","summary":"Summary failed","source":"Medium"},{"title":"Venezuela’s Challenge — Trascend From Cheap Labour for The World To a Powerhouse of Innovation.","url":"https://medium.com/mango-markets/venezuelas-challenge-trascend-from-cheap-labour-to-the-world-to-a-powerhouse-of-innovation-b5125254d6cf?source=collection_home_page----f202d052ee17-----2-----------------------------------","date":"2026-01-02T03:55:55.835Z","summary":"Summary failed","source":"Medium"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.953Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- MarginFi
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_marginfi',
    'marginfi',
    'MarginFi',
    'defi',
    'Lending and borrowing protocol on Solana',
    '💰',
    'https://marginfi.com',
    65,
    0,
    70,
    0,
    0,
    'up',
    false,
    true,
    '{"companyName":"MarginFi","category":"defi","github":{"totalContributors":0,"activeContributors30d":0,"totalCommits30d":0,"avgCommitsPerDay":0,"topContributors":[],"commitActivity":[]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:53:25.660Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7F","chain":"solana","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:53:25.724Z","news":[{"title":"Exploring mrgnlend: A Guide to Decentralized Lending and Borrowing","url":"https://medium.com/marginfi/exploring-mrgnlend-a-guide-to-decentralized-lending-and-borrowing-1e05a422a505?source=collection_home_page----4c6383484a6c-----0-----------------------------------","date":"2026-01-02T03:53:28.891Z","summary":"Summary failed","source":"Medium"},{"title":"Introducing mrgn points","url":"https://medium.com/marginfi/introducing-mrgn-points-949e18f31a8c?source=collection_home_page----4c6383484a6c-----1-----------------------------------","date":"2026-01-02T03:53:28.892Z","summary":"Summary failed","source":"Medium"},{"title":"Introducing Omni: Simplifying Crypto Through the Universal Interface","url":"https://medium.com/marginfi/introducing-omni-simplifying-crypto-through-the-universal-interface-2ffbc4dc75e?source=collection_home_page----4c6383484a6c-----2-----------------------------------","date":"2026-01-02T03:53:28.892Z","summary":"Summary failed","source":"Medium"},{"title":"A Conservative Case for DeFi","url":"https://medium.com/marginfi/a-conservative-case-for-defi-d9a948b172f1?source=collection_home_page----4c6383484a6c-----3-----------------------------------","date":"2026-01-02T03:53:28.892Z","summary":"Summary failed","source":"Medium"},{"title":"marginfi’s $25K ecosystem incentive program","url":"https://medium.com/marginfi/25k-marginfi-bounty-program-8dd79149ff9f?source=collection_home_page----4c6383484a6c-----4-----------------------------------","date":"2026-01-02T03:53:28.892Z","summary":"Summary failed","source":"Medium"},{"title":"Mainnet (alpha)","url":"https://medium.com/marginfi/mainnet-alpha-832c6308b71b?source=collection_home_page----4c6383484a6c-----5-----------------------------------","date":"2026-01-02T03:53:28.892Z","summary":"Summary failed","source":"Medium"},{"title":"marginfi’s $3M Seed & Race to Devnet","url":"https://medium.com/marginfi/marginfis-3m-seed-race-to-devnet-f8ec8e96d2f9?source=collection_home_page----4c6383484a6c-----6-----------------------------------","date":"2026-01-02T03:53:28.892Z","summary":"Summary failed","source":"Medium"},{"title":"How are funding rates set?","url":"https://medium.com/marginfi/how-are-funding-rates-set-f6478b270351?source=collection_home_page----4c6383484a6c-----7-----------------------------------","date":"2026-01-02T03:53:28.892Z","summary":"Summary failed","source":"Medium"},{"title":"Perpetual Futures vs Expiratory Futures","url":"https://medium.com/marginfi/perpetual-futures-vs-expiratory-futures-d42e184e6449?source=collection_home_page----4c6383484a6c-----8-----------------------------------","date":"2026-01-02T03:53:28.892Z","summary":"Summary failed","source":"Medium"},{"title":"What is Hedging?","url":"https://medium.com/marginfi/what-is-hedging-5bacb032f71e?source=collection_home_page----4c6383484a6c-----9-----------------------------------","date":"2026-01-02T03:53:28.892Z","summary":"Summary failed","source":"Medium"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.954Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Metaplex
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_metaplex',
    'metaplex',
    'Metaplex',
    'infrastructure',
    'NFT standard and tools on Solana',
    '🎨',
    'https://www.metaplex.com',
    55,
    61,
    46,
    0,
    0,
    'stable',
    false,
    true,
    '{"companyName":"Metaplex","category":"infrastructure","github":{"totalContributors":45,"activeContributors30d":45,"totalCommits30d":39,"avgCommitsPerDay":1.3,"topContributors":[{"login":"febo","contributions":0,"avatarUrl":""},{"login":"lorisleiva","contributions":0,"avatarUrl":""},{"login":"blockiosaurus","contributions":0,"avatarUrl":""},{"login":"samuelvanderwaal","contributions":0,"avatarUrl":""},{"login":"thlorenz","contributions":0,"avatarUrl":""},{"login":"austbot","contributions":0,"avatarUrl":""},{"login":"danenbm","contributions":0,"avatarUrl":""},{"login":"linuskendall","contributions":0,"avatarUrl":""},{"login":"NicolasPennie","contributions":0,"avatarUrl":""},{"login":"Nagaprasadvr","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":8,"days":[0,2,5,1,0,0,0]},{"week":1736640000,"total":5,"days":[0,3,2,0,0,0,0]},{"week":1737244800,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1737849600,"total":1,"days":[0,0,0,1,0,0,0]},{"week":1738454400,"total":4,"days":[2,1,1,0,0,0,0]},{"week":1739059200,"total":3,"days":[0,0,0,0,0,1,2]},{"week":1739664000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":8,"days":[0,0,0,0,0,8,0]},{"week":1740873600,"total":4,"days":[0,0,2,0,2,0,0]},{"week":1741478400,"total":3,"days":[0,0,0,0,0,3,0]},{"week":1742083200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742688000,"total":2,"days":[0,0,0,2,0,0,0]},{"week":1743292800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743897600,"total":2,"days":[0,0,0,0,2,0,0]},{"week":1744502400,"total":1,"days":[0,0,0,0,1,0,0]},{"week":1745107200,"total":1,"days":[0,0,0,0,0,1,0]},{"week":1745712000,"total":2,"days":[0,0,1,0,1,0,0]},{"week":1746316800,"total":1,"days":[0,0,0,0,0,1,0]},{"week":1746921600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747526400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748131200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748736000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749340800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749945600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750550400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751155200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":3,"days":[0,0,1,0,0,2,0]},{"week":1752364800,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1752969600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753574400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754179200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1755388800,"total":3,"days":[0,2,0,0,1,0,0]},{"week":1755993600,"total":2,"days":[0,2,0,0,0,0,0]},{"week":1756598400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757203200,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1757808000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1758412800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759017600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759622400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760227200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760832000,"total":3,"days":[0,3,0,0,0,0,0]},{"week":1761436800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762041600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762646400,"total":2,"days":[0,0,0,0,2,0,0]},{"week":1763251200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763856000,"total":2,"days":[0,0,1,1,0,0,0]},{"week":1764460800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765065600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766880000,"total":0,"days":[0,0,0,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:54:47.124Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":1525,"transactionCount7d":1525,"transactionCount30d":1528,"uniqueWallets24h":1525,"uniqueWallets7d":1525,"uniqueWallets30d":1528,"contractAddress":"metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s","chain":"solana","monthlyActiveUsers":1528,"dailyActiveUsers":1525,"weeklyActiveUsers":1525},"calculatedAt":"2026-01-02T03:54:57.222Z","news":[{"title":"Stop Turning Your Token Launch into a Game","url":"https://medium.com/metaplex/stop-turning-your-token-launch-into-a-game-c45f76ccaf30?source=collection_home_page----f305fbb9a1d1-----0-----------------------------------","date":"2026-01-02T03:55:00.381Z","summary":"Summary failed","source":"Medium"},{"title":"Where Centralized Token Launches Break (And Smart Contracts Don’t)","url":"https://medium.com/metaplex/where-centralized-token-launches-break-and-smart-contracts-dont-1d173e42aa75?source=collection_home_page----f305fbb9a1d1-----1-----------------------------------","date":"2026-01-02T03:55:00.381Z","summary":"Summary failed","source":"Medium"},{"title":"Solana Serialization Benchmarks","url":"https://medium.com/metaplex/solana-serialization-benchmarks-a90d32c99fd2?source=collection_home_page----f305fbb9a1d1-----2-----------------------------------","date":"2026-01-02T03:55:00.381Z","summary":"Summary failed","source":"Medium"},{"title":"Managing Memory in Solana Programs","url":"https://medium.com/metaplex/managing-memory-in-solana-programs-1cb8266b991e?source=collection_home_page----f305fbb9a1d1-----3-----------------------------------","date":"2026-01-02T03:55:00.382Z","summary":"Summary failed","source":"Medium"},{"title":"Stop Turning Your Token Launch into a Game","url":"https://medium.com/metaplex/stop-turning-your-token-launch-into-a-game-c45f76ccaf30?source=collection_home_page----f305fbb9a1d1-----0-----------------------------------","date":"2026-01-02T03:55:00.382Z","summary":"Summary failed","source":"Medium"},{"title":"Where Centralized Token Launches Break (And Smart Contracts Don’t)","url":"https://medium.com/metaplex/where-centralized-token-launches-break-and-smart-contracts-dont-1d173e42aa75?source=collection_home_page----f305fbb9a1d1-----1-----------------------------------","date":"2026-01-02T03:55:00.382Z","summary":"Summary failed","source":"Medium"},{"title":"Solana Serialization Benchmarks","url":"https://medium.com/metaplex/solana-serialization-benchmarks-a90d32c99fd2?source=collection_home_page----f305fbb9a1d1-----2-----------------------------------","date":"2026-01-02T03:55:00.382Z","summary":"Summary failed","source":"Medium"},{"title":"Managing Memory in Solana Programs","url":"https://medium.com/metaplex/managing-memory-in-solana-programs-1cb8266b991e?source=collection_home_page----f305fbb9a1d1-----3-----------------------------------","date":"2026-01-02T03:55:00.382Z","summary":"Summary failed","source":"Medium"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.954Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Morpho
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_morpho',
    'morpho',
    'Morpho',
    'defi',
    'Peer-to-peer lending protocol with optimized capital efficiency',
    '🔷',
    'https://morpho.org',
    75,
    83,
    70,
    0,
    0,
    'up',
    false,
    true,
    '{"companyName":"Morpho","category":"defi","github":{"totalContributors":34,"activeContributors30d":34,"totalCommits30d":217,"avgCommitsPerDay":7.2,"topContributors":[{"login":"Jean-Grimal","contributions":0,"avatarUrl":""},{"login":"haydenshively","contributions":0,"avatarUrl":""},{"login":"MazyGio","contributions":0,"avatarUrl":""},{"login":"albist","contributions":0,"avatarUrl":""},{"login":"tomrpl","contributions":0,"avatarUrl":""},{"login":"morpho-whitelistor[bot]","contributions":0,"avatarUrl":""},{"login":"julien-devatom","contributions":0,"avatarUrl":""},{"login":"BunsDev","contributions":0,"avatarUrl":""},{"login":"oumar-fall","contributions":0,"avatarUrl":""},{"login":"lucianken","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":12,"days":[0,0,0,0,0,12,0]},{"week":1736038800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":20,"days":[0,7,4,0,3,6,0]},{"week":1736643600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":13,"days":[2,6,2,1,0,2,0]},{"week":1737248400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":14,"days":[1,2,5,5,1,0,0]},{"week":1737853200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":17,"days":[0,1,7,1,1,7,0]},{"week":1738458000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":43,"days":[0,15,6,4,11,6,1]},{"week":1739062800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":67,"days":[1,9,13,11,22,11,0]},{"week":1739667600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":50,"days":[0,6,16,9,15,4,0]},{"week":1740272400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":54,"days":[2,4,9,12,17,10,0]},{"week":1740877200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":39,"days":[3,5,3,12,10,6,0]},{"week":1741482000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":64,"days":[0,6,21,8,13,13,3]},{"week":1742688000,"total":70,"days":[5,3,10,22,14,16,0]},{"week":1743292800,"total":66,"days":[4,14,6,18,11,13,0]},{"week":1743897600,"total":71,"days":[0,6,19,16,16,7,7]},{"week":1744502400,"total":110,"days":[1,36,5,13,15,40,0]},{"week":1745107200,"total":92,"days":[2,0,17,15,29,28,1]},{"week":1745712000,"total":199,"days":[0,49,46,22,27,49,6]},{"week":1746316800,"total":132,"days":[7,53,14,18,17,20,3]},{"week":1746921600,"total":178,"days":[2,37,25,29,19,55,11]},{"week":1747526400,"total":125,"days":[4,42,36,12,15,16,0]},{"week":1748131200,"total":83,"days":[0,16,22,16,7,14,8]},{"week":1748736000,"total":150,"days":[7,19,28,19,30,44,3]},{"week":1749340800,"total":84,"days":[3,13,14,26,14,7,7]},{"week":1749945600,"total":95,"days":[0,10,15,13,22,34,1]},{"week":1750550400,"total":133,"days":[9,14,45,30,19,16,0]},{"week":1751155200,"total":83,"days":[2,16,32,3,17,13,0]},{"week":1751760000,"total":43,"days":[0,16,1,1,14,10,1]},{"week":1752364800,"total":87,"days":[10,14,37,7,15,4,0]},{"week":1752969600,"total":55,"days":[4,15,12,8,3,13,0]},{"week":1753574400,"total":134,"days":[3,26,40,24,20,17,4]},{"week":1754179200,"total":72,"days":[4,20,13,5,4,25,1]},{"week":1754784000,"total":78,"days":[5,30,22,11,6,4,0]},{"week":1755388800,"total":28,"days":[1,14,2,3,6,2,0]},{"week":1755993600,"total":114,"days":[0,6,29,20,43,15,1]},{"week":1756598400,"total":60,"days":[0,9,20,13,15,2,1]},{"week":1757203200,"total":41,"days":[0,10,14,4,8,4,1]},{"week":1757808000,"total":71,"days":[2,26,3,24,13,3,0]},{"week":1758412800,"total":49,"days":[0,5,21,7,11,5,0]},{"week":1759017600,"total":74,"days":[1,14,18,16,8,13,4]},{"week":1759622400,"total":58,"days":[3,6,27,9,10,2,1]},{"week":1760227200,"total":87,"days":[1,33,10,19,9,15,0]},{"week":1760832000,"total":32,"days":[1,0,14,1,2,10,4]},{"week":1761436800,"total":52,"days":[5,3,11,10,11,12,0]},{"week":1762041600,"total":43,"days":[0,3,9,13,7,4,7]},{"week":1762646400,"total":36,"days":[0,6,5,2,9,12,2]},{"week":1763251200,"total":126,"days":[2,8,10,19,32,47,8]},{"week":1763856000,"total":129,"days":[1,55,15,15,18,17,8]},{"week":1764460800,"total":111,"days":[0,28,30,24,10,9,10]},{"week":1765065600,"total":38,"days":[0,1,12,7,6,9,3]},{"week":1765670400,"total":40,"days":[1,11,10,6,6,5,1]},{"week":1766275200,"total":8,"days":[1,3,1,1,1,1,0]},{"week":1766880000,"total":4,"days":[0,2,1,1,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:52:10.528Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0x8888882f8f843896699869179fB6E4f7e3B58888","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:52:13.519Z","news":[{"title":"Logarithmic Buckets: A Technically Superior Matching Engine","url":"https://medium.com/morpho-labs/logarithmic-buckets-a-technically-superior-matching-engine-6635bb89055e?source=collection_home_page----532b263996bc-----0-----------------------------------","date":"2026-01-02T03:52:17.344Z","summary":"Summary failed","source":"Medium"},{"title":"How Permit2 Improves the User Experience of Morpho","url":"https://medium.com/morpho-labs/how-permit2-improves-the-user-experience-of-morpho-1fdbfb5843fe?source=collection_home_page----532b263996bc-----1-----------------------------------","date":"2026-01-02T03:52:17.344Z","summary":"Summary failed","source":"Medium"},{"title":"Balancer Boosted Morpho-Aave: One of DeFi’s Most Capital-Efficient Stable Pools","url":"https://medium.com/morpho-labs/balancer-boosted-morpho-aave-one-of-defis-most-capital-efficient-stable-pools-3e7be7a1686c?source=collection_home_page----532b263996bc-----2-----------------------------------","date":"2026-01-02T03:52:17.344Z","summary":"Summary failed","source":"Medium"},{"title":"Formal Verification: Using Mathematics to Ensure Resilient Code","url":"https://medium.com/morpho-labs/formal-verification-using-mathematics-to-ensure-resilient-code-11fd171ed7d5?source=collection_home_page----532b263996bc-----3-----------------------------------","date":"2026-01-02T03:52:17.345Z","summary":"Summary failed","source":"Medium"},{"title":"Introducing Morpho-Aave-V3: An improved lending experience","url":"https://medium.com/morpho-labs/introducing-morpho-aave-v3-an-improved-lending-experience-79475b9a9650?source=collection_home_page----532b263996bc-----4-----------------------------------","date":"2026-01-02T03:52:17.345Z","summary":"Summary failed","source":"Medium"},{"title":"The Secret to Better APYs? Meet Morpho’s Matching Engine","url":"https://medium.com/morpho-labs/the-secret-to-better-apys-meet-morphos-matching-engine-d071abe00a05?source=collection_home_page----532b263996bc-----5-----------------------------------","date":"2026-01-02T03:52:17.345Z","summary":"Summary failed","source":"Medium"},{"title":"Morpho is landing on Instadapp!","url":"https://medium.com/morpho-labs/morpho-is-landing-on-instadapp-4c6faf8ba928?source=collection_home_page----532b263996bc-----6-----------------------------------","date":"2026-01-02T03:52:17.345Z","summary":"Summary failed","source":"Medium"},{"title":"Logarithmic Buckets: A Technically Superior Matching Engine","url":"https://medium.com/morpho-labs/logarithmic-buckets-a-technically-superior-matching-engine-6635bb89055e?source=collection_home_page----532b263996bc-----0-----------------------------------","date":"2026-01-02T03:52:17.345Z","summary":"Summary failed","source":"Medium"},{"title":"How Permit2 Improves the User Experience of Morpho","url":"https://medium.com/morpho-labs/how-permit2-improves-the-user-experience-of-morpho-1fdbfb5843fe?source=collection_home_page----532b263996bc-----1-----------------------------------","date":"2026-01-02T03:52:17.345Z","summary":"Summary failed","source":"Medium"},{"title":"Balancer Boosted Morpho-Aave: One of DeFi’s Most Capital-Efficient Stable Pools","url":"https://medium.com/morpho-labs/balancer-boosted-morpho-aave-one-of-defis-most-capital-efficient-stable-pools-3e7be7a1686c?source=collection_home_page----532b263996bc-----2-----------------------------------","date":"2026-01-02T03:52:17.346Z","summary":"Summary failed","source":"Medium"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.955Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Orca
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_orca',
    'orca',
    'Orca',
    'defi',
    'User-friendly AMM and concentrated liquidity DEX on Solana',
    '🐋',
    'https://www.orca.so',
    59,
    55,
    62,
    0,
    0,
    'up',
    false,
    true,
    '{"companyName":"Orca","category":"defi","github":{"totalContributors":32,"activeContributors30d":32,"totalCommits30d":6,"avgCommitsPerDay":0.2,"topContributors":[{"login":"dependabot[bot]","contributions":0,"avatarUrl":""},{"login":"wjthieme","contributions":0,"avatarUrl":""},{"login":"odcheung","contributions":0,"avatarUrl":""},{"login":"yugure-orca","contributions":0,"avatarUrl":""},{"login":"calintje","contributions":0,"avatarUrl":""},{"login":"pauldragonfly","contributions":0,"avatarUrl":""},{"login":"terranmoccasin","contributions":0,"avatarUrl":""},{"login":"jshiohaha","contributions":0,"avatarUrl":""},{"login":"philcchen","contributions":0,"avatarUrl":""},{"login":"fuzzyyeti","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":2,"days":[0,2,0,0,0,0,0]},{"week":1740873600,"total":2,"days":[0,0,1,0,0,0,1]},{"week":1741478400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742079600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742684400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742688000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743289200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743292800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743894000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743897600,"total":1,"days":[0,0,0,1,0,0,0]},{"week":1744498800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1744502400,"total":13,"days":[0,0,0,0,2,8,3]},{"week":1745103600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745107200,"total":3,"days":[0,0,2,0,1,0,0]},{"week":1745708400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745712000,"total":1,"days":[0,0,0,1,0,0,0]},{"week":1746313200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746316800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746918000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746921600,"total":4,"days":[0,0,0,0,0,4,0]},{"week":1747522800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747526400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748127600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748131200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748732400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748736000,"total":3,"days":[0,0,0,3,0,0,0]},{"week":1749337200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749340800,"total":1,"days":[0,1,0,0,0,0,0]},{"week":1749942000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749945600,"total":3,"days":[0,0,1,0,0,2,0]},{"week":1750546800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750550400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751151600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751155200,"total":2,"days":[0,0,0,0,1,1,0]},{"week":1751756400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":2,"days":[0,0,0,1,0,0,1]},{"week":1752361200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752364800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752966000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752969600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753570800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753574400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754175600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754179200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754780400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755385200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755388800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755990000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755993600,"total":1,"days":[0,1,0,0,0,0,0]},{"week":1756594800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1756598400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757199600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757203200,"total":1,"days":[0,0,0,0,0,1,0]},{"week":1757804400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757808000,"total":2,"days":[0,0,0,1,1,0,0]},{"week":1758409200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1758412800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759014000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759017600,"total":1,"days":[0,0,0,0,0,0,1]},{"week":1759618800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759622400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760223600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760227200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760828400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760832000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1761433200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1761436800,"total":1,"days":[0,0,0,0,1,0,0]},{"week":1762038000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762041600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762646400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763251200,"total":2,"days":[0,0,0,1,1,0,0]},{"week":1763856000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1764460800,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1765065600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":1,"days":[0,1,0,0,0,0,0]},{"week":1766880000,"total":0,"days":[0,0,0,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:53:01.283Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"whirLbMiicVdio4qvUfM5DAg3K5nRp6oP2Y","chain":"solana","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:53:03.011Z","news":[{"title":"Orca Treasury Report #2","url":"https://medium.com/orca-so/orca-treasury-report-2-de6dceeef0dd?source=collection_home_page----cd2d12f751c5-----0-----------------------------------","date":"2026-01-02T03:53:05.915Z","summary":"Summary failed","source":"Medium"},{"title":"Orca Treasury Report #2","url":"https://medium.com/orca-so/orca-treasury-report-2-de6dceeef0dd?source=collection_home_page----cd2d12f751c5-----0-----------------------------------","date":"2026-01-02T03:53:05.916Z","summary":"Summary failed","source":"Medium"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.956Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Parallel
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_parallel',
    'parallel',
    'Parallel',
    'gaming',
    'Sci-fi card game on Ethereum',
    '🎮',
    'https://parallel.life',
    64,
    0,
    70,
    0,
    0,
    'up',
    false,
    true,
    '{"companyName":"Parallel","category":"gaming","github":{"totalContributors":0,"activeContributors30d":0,"totalCommits30d":0,"avgCommitsPerDay":0,"topContributors":[],"commitActivity":[]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:54:27.572Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0x76BE3b62873462d2142405439777e971754E8E77","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:54:28.273Z","news":[{"title":"The Vault","url":"https://medium.com/parallel-life/the-vault-46050e157125?source=collection_home_page----a8d1e26592d1-----0-----------------------------------","date":"2026-01-02T03:54:31.228Z","summary":"Summary failed","source":"Medium"},{"title":"Engineering inb0x","url":"https://medium.com/parallel-life/engineering-inb0x-7e3acddcb1a9?source=collection_home_page----a8d1e26592d1-----1-----------------------------------","date":"2026-01-02T03:54:31.228Z","summary":"Summary failed","source":"Medium"},{"title":"Parallel Is Integrating Chainlink VRF for Fair Randomness in Distributing Pack Drops","url":"https://medium.com/parallel-life/parallel-is-integrating-chainlink-vrf-for-fair-randomness-in-distributing-pack-drops-67563f532c3c?source=collection_home_page----a8d1e26592d1-----2-----------------------------------","date":"2026-01-02T03:54:31.228Z","summary":"Summary failed","source":"Medium"},{"title":"Paradigm Shift","url":"https://medium.com/parallel-life/paradigm-shift-9d03e48ca9fb?source=collection_home_page----a8d1e26592d1-----3-----------------------------------","date":"2026-01-02T03:54:31.229Z","summary":"Summary failed","source":"Medium"},{"title":"The Vault","url":"https://medium.com/parallel-life/the-vault-46050e157125?source=collection_home_page----a8d1e26592d1-----0-----------------------------------","date":"2026-01-02T03:54:31.229Z","summary":"Summary failed","source":"Medium"},{"title":"Engineering inb0x","url":"https://medium.com/parallel-life/engineering-inb0x-7e3acddcb1a9?source=collection_home_page----a8d1e26592d1-----1-----------------------------------","date":"2026-01-02T03:54:31.229Z","summary":"Summary failed","source":"Medium"},{"title":"Parallel Is Integrating Chainlink VRF for Fair Randomness in Distributing Pack Drops","url":"https://medium.com/parallel-life/parallel-is-integrating-chainlink-vrf-for-fair-randomness-in-distributing-pack-drops-67563f532c3c?source=collection_home_page----a8d1e26592d1-----2-----------------------------------","date":"2026-01-02T03:54:31.229Z","summary":"Summary failed","source":"Medium"},{"title":"Paradigm Shift","url":"https://medium.com/parallel-life/paradigm-shift-9d03e48ca9fb?source=collection_home_page----a8d1e26592d1-----3-----------------------------------","date":"2026-01-02T03:54:31.229Z","summary":"Summary failed","source":"Medium"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.956Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Rocket Pool
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_rocketpool',
    'rocketpool',
    'Rocket Pool',
    'defi',
    'Decentralized Ethereum staking protocol',
    '🚀',
    'https://rocketpool.net',
    70,
    71,
    70,
    0,
    0,
    'up',
    false,
    true,
    '{"companyName":"Rocket Pool","category":"defi","github":{"totalContributors":39,"activeContributors30d":39,"totalCommits30d":116,"avgCommitsPerDay":3.9,"topContributors":[{"login":"jclapis","contributions":0,"avatarUrl":""},{"login":"0xfornax","contributions":0,"avatarUrl":""},{"login":"moles1","contributions":0,"avatarUrl":""},{"login":"thomaspanf","contributions":0,"avatarUrl":""},{"login":"jshufro","contributions":0,"avatarUrl":""},{"login":"kanewallmann","contributions":0,"avatarUrl":""},{"login":"activescott","contributions":0,"avatarUrl":""},{"login":"kidkal","contributions":0,"avatarUrl":""},{"login":"darcius","contributions":0,"avatarUrl":""},{"login":"nickdoherty","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":25,"days":[1,2,4,7,6,4,1]},{"week":1736640000,"total":32,"days":[4,4,10,10,3,1,0]},{"week":1737244800,"total":29,"days":[3,2,3,12,5,3,1]},{"week":1737849600,"total":46,"days":[4,9,7,6,16,4,0]},{"week":1738454400,"total":37,"days":[3,6,13,6,5,3,1]},{"week":1739059200,"total":57,"days":[0,13,16,6,17,5,0]},{"week":1739664000,"total":37,"days":[10,4,2,13,6,1,1]},{"week":1740268800,"total":2,"days":[0,2,0,0,0,0,0]},{"week":1740873600,"total":4,"days":[2,0,0,0,1,0,1]},{"week":1741478400,"total":11,"days":[1,3,2,1,3,1,0]},{"week":1742083200,"total":45,"days":[3,12,5,9,3,12,1]},{"week":1742688000,"total":47,"days":[5,2,19,12,8,1,0]},{"week":1743292800,"total":23,"days":[2,8,2,2,3,6,0]},{"week":1743897600,"total":13,"days":[0,3,6,1,3,0,0]},{"week":1744502400,"total":23,"days":[4,1,4,4,4,5,1]},{"week":1745107200,"total":36,"days":[0,2,17,4,2,1,10]},{"week":1745712000,"total":28,"days":[1,7,8,9,1,1,1]},{"week":1746316800,"total":31,"days":[1,5,10,8,6,1,0]},{"week":1746921600,"total":54,"days":[2,8,8,9,14,12,1]},{"week":1747526400,"total":82,"days":[8,14,13,22,20,5,0]},{"week":1748131200,"total":24,"days":[1,0,2,9,2,1,9]},{"week":1748736000,"total":33,"days":[7,5,9,7,3,2,0]},{"week":1749340800,"total":44,"days":[3,7,9,2,12,10,1]},{"week":1749945600,"total":32,"days":[3,6,17,5,0,1,0]},{"week":1750550400,"total":39,"days":[4,6,8,9,5,6,1]},{"week":1751155200,"total":32,"days":[4,5,8,6,5,4,0]},{"week":1751760000,"total":37,"days":[2,5,8,5,9,7,1]},{"week":1752364800,"total":22,"days":[1,3,8,3,5,2,0]},{"week":1752969600,"total":14,"days":[2,3,4,3,1,0,1]},{"week":1753574400,"total":23,"days":[0,3,3,3,11,3,0]},{"week":1754179200,"total":29,"days":[1,8,9,1,6,3,1]},{"week":1754784000,"total":2,"days":[0,1,0,0,0,1,0]},{"week":1755388800,"total":15,"days":[2,3,8,1,1,0,0]},{"week":1755993600,"total":22,"days":[0,8,5,3,3,3,0]},{"week":1756598400,"total":15,"days":[1,2,3,3,1,4,1]},{"week":1757203200,"total":30,"days":[1,2,15,3,5,4,0]},{"week":1757808000,"total":18,"days":[2,3,1,4,4,3,1]},{"week":1758412800,"total":28,"days":[0,7,4,8,4,0,5]},{"week":1759017600,"total":27,"days":[4,7,7,1,7,0,1]},{"week":1759622400,"total":17,"days":[0,3,6,3,2,2,1]},{"week":1760227200,"total":18,"days":[5,2,2,2,7,0,0]},{"week":1760832000,"total":23,"days":[3,0,4,3,10,1,2]},{"week":1761436800,"total":26,"days":[3,3,7,5,5,2,1]},{"week":1762041600,"total":17,"days":[1,1,8,2,2,3,0]},{"week":1762646400,"total":19,"days":[10,2,5,0,0,1,1]},{"week":1763251200,"total":9,"days":[0,2,5,0,1,1,0]},{"week":1763856000,"total":12,"days":[0,3,1,6,0,0,2]},{"week":1764460800,"total":45,"days":[1,30,2,1,9,2,0]},{"week":1765065600,"total":33,"days":[0,2,8,5,5,0,13]},{"week":1765670400,"total":24,"days":[4,4,5,6,4,0,1]},{"week":1766275200,"total":12,"days":[0,2,7,1,1,0,1]},{"week":1766880000,"total":2,"days":[0,1,0,1,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:52:35.041Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0xae78736Cd615f374D3085123A210448E74Fc6393","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:52:36.940Z","news":[{"title":"Bi-weekly update, 02 December 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-02-december-2025-5d7b49086379?source=collection_home_page----5245e87458b9-----0-----------------------------------","date":"2026-01-02T03:52:40.499Z","summary":"Summary failed","source":"Medium"},{"title":"Bi-weekly update, 02 December 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-02-december-2025-5d7b49086379?source=collection_home_page----5245e87458b9-----0-----------------------------------","date":"2026-01-02T03:52:40.499Z","summary":"Summary failed","source":"Medium"},{"title":"Bi-weekly update, 18 November 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-18-november-2025-3df7b0a548c2?source=collection_home_page----5245e87458b9-----0-----------------------------------","date":"2026-01-02T03:52:40.499Z","summary":"Summary failed","source":"Medium"},{"title":"Bi-weekly update, 04 November 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-04-november-2025-f0697cf48ebc?source=collection_home_page----5245e87458b9-----1-----------------------------------","date":"2026-01-02T03:52:40.499Z","summary":"Summary failed","source":"Medium"},{"title":"Bi-weekly update, 21 October 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-21-october-2025-f17dc947f7ab?source=collection_home_page----5245e87458b9-----2-----------------------------------","date":"2026-01-02T03:52:40.500Z","summary":"Summary failed","source":"Medium"},{"title":"Bi-weekly update, 07 October 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-07-october-2025-b22bfb0baed6?source=collection_home_page----5245e87458b9-----3-----------------------------------","date":"2026-01-02T03:52:40.500Z","summary":"Summary failed","source":"Medium"},{"title":"Bi-weekly update, 23 September 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-23-september-2025-b5c682f2eaa4?source=collection_home_page----5245e87458b9-----4-----------------------------------","date":"2026-01-02T03:52:40.500Z","summary":"Summary failed","source":"Medium"},{"title":"Bi-weekly update, 09 September 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-09-september-2025-ab14cb261771?source=collection_home_page----5245e87458b9-----5-----------------------------------","date":"2026-01-02T03:52:40.500Z","summary":"Summary failed","source":"Medium"},{"title":"Bi-weekly update, 26 August 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-26-august-2025-30c8460f273b?source=collection_home_page----5245e87458b9-----6-----------------------------------","date":"2026-01-02T03:52:40.500Z","summary":"Summary failed","source":"Medium"},{"title":"Bi-weekly update, 18 November 2025","url":"https://medium.com/rocket-pool/bi-weekly-update-18-november-2025-3df7b0a548c2?source=collection_home_page----5245e87458b9-----0-----------------------------------","date":"2026-01-02T03:52:40.500Z","summary":"Summary failed","source":"Medium"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.957Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Safe
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_safe',
    'safe',
    'Safe',
    'infrastructure',
    'Multi-sig wallet infrastructure',
    '🔒',
    'https://safe.global',
    59,
    97,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Safe","category":"infrastructure","github":{"totalContributors":55,"activeContributors30d":55,"totalCommits30d":17904,"avgCommitsPerDay":596.8,"topContributors":[{"login":"upptime-bot","contributions":0,"avatarUrl":""},{"login":"Uxio0","contributions":0,"avatarUrl":""},{"login":"luarx","contributions":0,"avatarUrl":""},{"login":"diegopazosrego","contributions":0,"avatarUrl":""},{"login":"rmeissner","contributions":0,"avatarUrl":""},{"login":"jpalvarezl","contributions":0,"avatarUrl":""},{"login":"hectorgomezv","contributions":0,"avatarUrl":""},{"login":"Safe-infra","contributions":0,"avatarUrl":""},{"login":"fmrsabino","contributions":0,"avatarUrl":""},{"login":"katspaugh","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":219,"days":[25,38,38,34,29,30,25]},{"week":1736640000,"total":246,"days":[25,36,42,38,40,40,25]},{"week":1737244800,"total":281,"days":[71,44,38,32,35,35,26]},{"week":1737849600,"total":247,"days":[25,44,39,42,34,38,25]},{"week":1738454400,"total":404,"days":[75,43,74,87,35,46,44]},{"week":1739059200,"total":351,"days":[28,46,96,34,37,34,76]},{"week":1739664000,"total":617,"days":[32,82,39,174,87,164,39]},{"week":1740268800,"total":392,"days":[39,68,50,67,82,55,31]},{"week":1740873600,"total":452,"days":[51,63,45,51,47,88,107]},{"week":1741478400,"total":1095,"days":[237,254,200,38,73,161,132]},{"week":1742083200,"total":1004,"days":[235,165,159,90,195,47,113]},{"week":1742688000,"total":832,"days":[160,102,95,42,40,150,243]},{"week":1743292800,"total":1011,"days":[245,153,151,41,152,138,131]},{"week":1743897600,"total":791,"days":[131,151,97,56,157,108,91]},{"week":1744502400,"total":852,"days":[137,201,89,218,141,33,33]},{"week":1745107200,"total":786,"days":[137,86,198,148,35,63,119]},{"week":1745712000,"total":742,"days":[33,144,72,43,92,37,321]},{"week":1746316800,"total":617,"days":[35,39,219,42,106,91,85]},{"week":1746921600,"total":609,"days":[85,156,42,115,58,112,41]},{"week":1747526400,"total":275,"days":[35,41,43,38,42,41,35]},{"week":1748131200,"total":319,"days":[36,41,50,55,47,43,47]},{"week":1748736000,"total":338,"days":[42,67,59,50,46,45,29]},{"week":1749340800,"total":292,"days":[29,35,46,41,65,46,30]},{"week":1749945600,"total":425,"days":[36,46,60,127,79,40,37]},{"week":1750550400,"total":308,"days":[31,55,57,61,39,34,31]},{"week":1751155200,"total":296,"days":[43,39,38,68,37,40,31]},{"week":1751760000,"total":512,"days":[31,40,45,49,82,233,32]},{"week":1752364800,"total":473,"days":[43,186,87,39,42,44,32]},{"week":1752969600,"total":319,"days":[32,45,49,76,46,37,34]},{"week":1753574400,"total":264,"days":[33,41,38,43,42,34,33]},{"week":1754179200,"total":289,"days":[33,48,55,39,38,43,33]},{"week":1754784000,"total":282,"days":[33,45,33,47,35,56,33]},{"week":1755388800,"total":294,"days":[57,39,35,52,40,38,33]},{"week":1755993600,"total":1284,"days":[33,114,172,222,178,459,106]},{"week":1756598400,"total":1097,"days":[36,396,190,52,198,189,36]},{"week":1757203200,"total":324,"days":[36,57,49,39,54,53,36]},{"week":1757808000,"total":296,"days":[36,38,45,42,37,36,62]},{"week":1758412800,"total":312,"days":[36,42,50,40,48,60,36]},{"week":1759017600,"total":303,"days":[44,54,40,42,48,39,36]},{"week":1759622400,"total":339,"days":[36,49,54,55,49,60,36]},{"week":1760227200,"total":308,"days":[36,51,51,55,42,37,36]},{"week":1760832000,"total":305,"days":[36,53,48,40,43,43,42]},{"week":1761436800,"total":373,"days":[36,60,58,72,48,39,60]},{"week":1762041600,"total":377,"days":[50,46,64,66,48,46,57]},{"week":1762646400,"total":699,"days":[43,75,104,101,107,135,134]},{"week":1763251200,"total":2752,"days":[156,188,162,489,599,531,627]},{"week":1763856000,"total":4073,"days":[695,552,526,593,561,598,548]},{"week":1764460800,"total":3748,"days":[534,525,506,564,535,536,548]},{"week":1765065600,"total":3748,"days":[613,488,568,509,452,542,576]},{"week":1765670400,"total":3999,"days":[579,557,528,572,588,620,555]},{"week":1766275200,"total":3810,"days":[616,546,498,537,505,525,583]},{"week":1766880000,"total":2615,"days":[491,497,472,570,555,30,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:52:52.592Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:52:54.252Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.957Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Star Atlas
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_staratlas',
    'staratlas',
    'Star Atlas',
    'gaming',
    'Space MMO on Solana',
    '🌌',
    'https://staratlas.com',
    69,
    57,
    70,
    0,
    0,
    'up',
    false,
    true,
    '{"companyName":"Star Atlas","category":"gaming","github":{"totalContributors":53,"activeContributors30d":53,"totalCommits30d":4,"avgCommitsPerDay":0.1,"topContributors":[{"login":"stegaBOB","contributions":0,"avatarUrl":""},{"login":"Buzzec","contributions":0,"avatarUrl":""},{"login":"bzierk","contributions":0,"avatarUrl":""},{"login":"github-actions[bot]","contributions":0,"avatarUrl":""},{"login":"moshthepitt","contributions":0,"avatarUrl":""},{"login":"dependabot[bot]","contributions":0,"avatarUrl":""},{"login":"darrendc26","contributions":0,"avatarUrl":""},{"login":"Themelok","contributions":0,"avatarUrl":""},{"login":"mindrunner","contributions":0,"avatarUrl":""},{"login":"lunar-bard","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":3,"days":[0,1,0,0,2,0,0]},{"week":1736038800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":4,"days":[0,2,0,0,0,0,2]},{"week":1736643600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":1,"days":[0,0,0,0,0,1,0]},{"week":1737248400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":13,"days":[0,0,9,0,1,3,0]},{"week":1737853200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":1,"days":[0,1,0,0,0,0,0]},{"week":1738458000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739062800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":7,"days":[0,2,0,1,2,2,0]},{"week":1739667600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":3,"days":[0,2,1,0,0,0,0]},{"week":1740272400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":8,"days":[0,0,0,1,2,3,2]},{"week":1740877200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":24,"days":[0,3,6,7,3,5,0]},{"week":1741482000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":20,"days":[0,6,12,2,0,0,0]},{"week":1742688000,"total":5,"days":[0,0,3,0,0,2,0]},{"week":1743292800,"total":4,"days":[1,0,2,0,1,0,0]},{"week":1743897600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1744502400,"total":6,"days":[0,2,0,2,1,1,0]},{"week":1745107200,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1745712000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746316800,"total":2,"days":[0,0,0,0,2,0,0]},{"week":1746921600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747526400,"total":7,"days":[0,2,0,3,0,2,0]},{"week":1748131200,"total":2,"days":[0,0,2,0,0,0,0]},{"week":1748736000,"total":2,"days":[0,0,2,0,0,0,0]},{"week":1749340800,"total":3,"days":[0,2,1,0,0,0,0]},{"week":1749945600,"total":4,"days":[3,0,0,0,1,0,0]},{"week":1750550400,"total":5,"days":[0,0,2,3,0,0,0]},{"week":1751155200,"total":5,"days":[0,0,3,0,1,1,0]},{"week":1751760000,"total":5,"days":[0,1,1,0,2,1,0]},{"week":1752364800,"total":5,"days":[0,0,4,1,0,0,0]},{"week":1752969600,"total":8,"days":[0,0,3,2,1,0,2]},{"week":1753574400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754179200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":15,"days":[0,2,8,1,4,0,0]},{"week":1755388800,"total":7,"days":[0,0,1,1,0,4,1]},{"week":1755993600,"total":22,"days":[0,3,0,16,2,1,0]},{"week":1756598400,"total":21,"days":[0,0,6,1,9,1,4]},{"week":1757203200,"total":8,"days":[0,0,2,0,4,2,0]},{"week":1757808000,"total":6,"days":[0,4,1,0,0,1,0]},{"week":1758412800,"total":9,"days":[0,0,2,2,4,1,0]},{"week":1759017600,"total":10,"days":[0,4,4,0,2,0,0]},{"week":1759622400,"total":15,"days":[0,2,2,9,0,2,0]},{"week":1760227200,"total":24,"days":[0,2,14,2,3,3,0]},{"week":1760832000,"total":16,"days":[0,4,3,6,0,3,0]},{"week":1761436800,"total":8,"days":[0,0,3,2,0,3,0]},{"week":1762041600,"total":3,"days":[0,0,0,1,0,2,0]},{"week":1762646400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763251200,"total":7,"days":[0,3,1,1,0,2,0]},{"week":1763856000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1764460800,"total":2,"days":[0,2,0,0,0,0,0]},{"week":1765065600,"total":2,"days":[0,1,1,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766880000,"total":0,"days":[0,0,0,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:55:24.316Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"ATLASXkqGSx5B2YvY1Y4K1mcn1dY6VxTqzkJp5YXW1i","chain":"solana","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:55:25.891Z","news":[{"title":"A Reflection on the 100th Anniversary of The Signature of The Treaty of Peace","url":"https://medium.com/star-atlas/a-reflection-on-the-100th-anniversary-of-the-signature-of-the-treaty-of-peace-d237dd6af592?source=collection_home_page----a97f09b411f1-----0-----------------------------------","date":"2026-01-02T03:55:29.012Z","summary":"Summary failed","source":"Medium"},{"title":"An Unreal Update — Star Atlas Launches the Last Patch before Ground Breaking Showroom R2.2 Release.","url":"https://medium.com/star-atlas/an-unreal-update-star-atlas-launches-the-last-patch-before-ground-breaking-showroom-r2-2-release-ba8a73c6a6e2?source=collection_home_page----a97f09b411f1-----1-----------------------------------","date":"2026-01-02T03:55:29.012Z","summary":"Summary failed","source":"Medium"},{"title":"Star Atlas Community Week: A Galactic Celebration","url":"https://medium.com/star-atlas/star-atlas-community-week-a-galactic-celebration-cd0634b6c3fc?source=collection_home_page----a97f09b411f1-----2-----------------------------------","date":"2026-01-02T03:55:29.012Z","summary":"Summary failed","source":"Medium"},{"title":"Press Release: The Council of Peace Assembly (COPA) Returns for Its Second Edition","url":"https://medium.com/star-atlas/press-release-the-council-of-peace-assembly-copa-returns-for-its-second-edition-fda9507535b0?source=collection_home_page----a97f09b411f1-----3-----------------------------------","date":"2026-01-02T03:55:29.012Z","summary":"Summary failed","source":"Medium"},{"title":"The Rise of Corporations — Star Atlas Launches DAC Platform V0","url":"https://medium.com/star-atlas/the-rise-of-corporations-star-atlas-launches-dac-platform-v0-b6eb60df626a?source=collection_home_page----a97f09b411f1-----4-----------------------------------","date":"2026-01-02T03:55:29.012Z","summary":"Summary failed","source":"Medium"},{"title":"Announcing “Starbased” — A New Chapter in the Star Atlas SAGE Saga","url":"https://medium.com/star-atlas/announcing-starbased-a-new-chapter-in-the-star-atlas-sage-saga-5dc3b9abe44d?source=collection_home_page----a97f09b411f1-----5-----------------------------------","date":"2026-01-02T03:55:29.012Z","summary":"Summary failed","source":"Medium"},{"title":"A Metaverse in Expansion — Star Atlas Acquires Assets and Intellectual Property from Multichain…","url":"https://medium.com/star-atlas/a-metaverse-in-expansion-star-atlas-acquires-assets-and-intellectual-property-from-multichain-597c5f4d7f2c?source=collection_home_page----a97f09b411f1-----6-----------------------------------","date":"2026-01-02T03:55:29.012Z","summary":"Summary failed","source":"Medium"},{"title":"A New Release on the Horizon — Star Atlas Crew Packs Coming in Q2 2024","url":"https://medium.com/star-atlas/a-new-release-on-the-horizon-star-atlas-crew-packs-coming-in-q2-2024-e2603415bc65?source=collection_home_page----a97f09b411f1-----7-----------------------------------","date":"2026-01-02T03:55:29.012Z","summary":"Summary failed","source":"Medium"},{"title":"SOLD OUT! — Star Atlas Sells All Five Thousand Pre-Sale Crew Pack Bundles in Less Than 24 Hours…","url":"https://medium.com/star-atlas/sold-out-star-atlas-sells-all-five-thousand-pre-sale-crew-pack-bundles-in-less-than-24-hours-5b6fd39d9aba?source=collection_home_page----a97f09b411f1-----8-----------------------------------","date":"2026-01-02T03:55:29.013Z","summary":"Summary failed","source":"Medium"},{"title":"A Dawn for a DAO — Star Atlas Kickstarts Its Path Toward Political Decentralization","url":"https://medium.com/star-atlas/a-dawn-for-a-dao-star-atlas-kickstarts-its-path-toward-political-decentralization-b001d8ce6be5?source=collection_home_page----a97f09b411f1-----9-----------------------------------","date":"2026-01-02T03:55:29.013Z","summary":"Summary failed","source":"Medium"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.958Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Tensor
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_tensor',
    'tensor',
    'Tensor',
    'nft',
    'NFT marketplace on Solana',
    '🎯',
    'https://www.tensor.trade',
    7,
    53,
    3,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Tensor","category":"nft","github":{"totalContributors":25,"activeContributors30d":25,"totalCommits30d":0,"avgCommitsPerDay":0,"topContributors":[{"login":"robrichard","contributions":0,"avatarUrl":""},{"login":"dependabot-preview[bot]","contributions":0,"avatarUrl":""},{"login":"dependabot[bot]","contributions":0,"avatarUrl":""},{"login":"lilianammmatos","contributions":0,"avatarUrl":""},{"login":"richardwu","contributions":0,"avatarUrl":""},{"login":"sibelius","contributions":0,"avatarUrl":""},{"login":"harrisluo","contributions":0,"avatarUrl":""},{"login":"dericko","contributions":0,"avatarUrl":""},{"login":"kostasmanionis","contributions":0,"avatarUrl":""},{"login":"n1ru4l","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":2,"days":[0,2,0,0,0,0,0]},{"week":1742688000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743292800,"total":3,"days":[0,0,2,1,0,0,0]},{"week":1743897600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1744502400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745107200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745712000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746316800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746921600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747526400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748131200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748736000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749340800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749945600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750550400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751155200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752364800,"total":2,"days":[2,0,0,0,0,0,0]},{"week":1752969600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753574400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754179200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755388800,"total":2,"days":[0,0,0,0,0,2,0]},{"week":1755993600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1756598400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757203200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757808000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1758412800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759017600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759622400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760227200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760832000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1761436800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762041600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762646400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763251200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763856000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1764460800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765065600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766880000,"total":0,"days":[0,0,0,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:53:45.761Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbZv","chain":"solana","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:53:47.225Z","news":[{"title":"Recent Activity","url":"https://tensor.substack.com","date":"2020-04-16T01:05:02.179Z","summary":"Summary failed","source":"Official Blog"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.959Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Uniswap
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_uniswap',
    'uniswap',
    'Uniswap',
    'defi',
    'Leading decentralized exchange protocol enabling permissionless token swaps on Ethereum and Layer 2s',
    '🦄',
    'https://uniswap.org',
    69,
    57,
    70,
    70,
    0,
    'up',
    false,
    true,
    '{"companyName":"Uniswap","category":"defi","github":{"totalContributors":52,"activeContributors30d":52,"totalCommits30d":0,"avgCommitsPerDay":0,"topContributors":[{"login":"NoahZinsmeister","contributions":0,"avatarUrl":""},{"login":"danrobinson","contributions":0,"avatarUrl":""},{"login":"haydenadams","contributions":0,"avatarUrl":""},{"login":"moodysalem","contributions":0,"avatarUrl":""},{"login":"marktoda","contributions":0,"avatarUrl":""},{"login":"0xJepsen","contributions":0,"avatarUrl":""},{"login":"chriseth","contributions":0,"avatarUrl":""},{"login":"snreynolds","contributions":0,"avatarUrl":""},{"login":"transmissions11","contributions":0,"avatarUrl":""},{"login":"hensha256","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":4,"days":[0,0,1,0,3,0,0]},{"week":1736640000,"total":1,"days":[0,0,0,0,0,1,0]},{"week":1737244800,"total":2,"days":[0,1,1,0,0,0,0]},{"week":1737849600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":9,"days":[0,0,1,2,4,1,1]},{"week":1739059200,"total":8,"days":[0,4,0,2,1,1,0]},{"week":1739664000,"total":10,"days":[0,0,5,0,4,1,0]},{"week":1740268800,"total":10,"days":[0,4,0,2,3,1,0]},{"week":1740873600,"total":3,"days":[0,0,1,0,2,0,0]},{"week":1741478400,"total":2,"days":[0,1,0,0,1,0,0]},{"week":1742083200,"total":3,"days":[0,1,1,0,1,0,0]},{"week":1742688000,"total":7,"days":[0,2,1,2,1,1,0]},{"week":1743292800,"total":22,"days":[0,2,4,3,5,8,0]},{"week":1743897600,"total":22,"days":[2,2,5,8,3,2,0]},{"week":1744502400,"total":4,"days":[0,4,0,0,0,0,0]},{"week":1745107200,"total":17,"days":[1,6,6,2,2,0,0]},{"week":1745712000,"total":5,"days":[0,1,3,0,0,1,0]},{"week":1746316800,"total":21,"days":[0,2,0,4,3,11,1]},{"week":1746921600,"total":15,"days":[0,2,5,1,3,4,0]},{"week":1747526400,"total":3,"days":[0,0,0,2,1,0,0]},{"week":1748131200,"total":2,"days":[0,0,1,0,1,0,0]},{"week":1748736000,"total":1,"days":[0,0,0,0,1,0,0]},{"week":1749340800,"total":2,"days":[0,1,0,1,0,0,0]},{"week":1749945600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750550400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751155200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752364800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752969600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753574400,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1754179200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755388800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755993600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1756598400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757203200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757808000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1758412800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759017600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759622400,"total":1,"days":[0,1,0,0,0,0,0]},{"week":1760227200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760832000,"total":7,"days":[0,0,0,2,5,0,0]},{"week":1761436800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762041600,"total":2,"days":[0,1,0,1,0,0,0]},{"week":1762646400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763251200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763856000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1764460800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765065600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766880000,"total":0,"days":[0,0,0,0,0,0,0]}]},"twitter":{"followers":1464840,"following":136,"tweetCount":6769,"verified":true,"createdAt":"2018-04-11T21:55:33.000Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0x1F98431c8aD98523631AE4a59f267346ea31F984","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T02:37:00.952Z","news":[{"title":"November 10, 2025UNIfication#Protocols","url":"https://blog.uniswap.org/unification","date":"2026-01-02T02:37:03.531Z","summary":"Summary failed","source":"Official Blog"},{"title":"Ledger Unlocks Secure, Onchain Swaps with the Uniswap Trading APILedger uses the Uniswap Trading API to bring secure, permissionless swaps into Ledger Wallet, pairing self-custody with trusted onchain liquidity.December 03, 2025#Products","url":"https://blog.uniswap.org/ledger-case-study","date":"2026-01-02T02:37:03.531Z","summary":"Summary failed","source":"Official Blog"},{"title":"Buy Crypto with Revolut in the Uniswap Web App and WalletUniswap Labs is partnering with Revolut, Europe’s largest finance app, to offer a fast, seamless onramp in the Uniswap Web App and Uniswap Wallet.December 02, 2025#Products","url":"https://blog.uniswap.org/revolut-onramp-now-live","date":"2026-01-02T02:37:03.532Z","summary":"Summary failed","source":"Official Blog"},{"title":"Monad Mainnet is Now Live on UniswapMonad Mainnet is now live on the Uniswap protocol, Uniswap Wallet and Web App, and the Uniswap Trading API.November 24, 2025#Products","url":"https://blog.uniswap.org/monad-mainnet-is-now-live-on-uniswap","date":"2026-01-02T02:37:03.532Z","summary":"Summary failed","source":"Official Blog"},{"title":"Continuous Clearing Auctions: Bootstrapping Liquidity on Uniswap v4Today we’re excited to announce Continuous Clearing Auctions (CCA), a permissionless protocol that helps teams bootstrap liquidity on Uniswap v4 and find the market price for new and low-liquidity tokens.November 13, 2025#Protocols","url":"https://blog.uniswap.org/continuous-clearing-auctions","date":"2026-01-02T02:37:03.532Z","summary":"Summary failed","source":"Official Blog"},{"title":"🦄 Uniswap.exchange — better wallet support!","url":"https://medium.com/uniswap/uniswap-exchange-better-wallet-support-360a181f9654?source=collection_home_page----47b2a7b4c96e-----0-----------------------------------","date":"2026-01-02T02:37:06.808Z","summary":"Summary failed","source":"Medium"},{"title":"We’re excited to release a new and improved Uniswap.info","url":"https://medium.com/uniswap/were-excited-to-release-a-new-and-improved-uniswap-info-b04a1fca94ae?source=collection_home_page----47b2a7b4c96e-----1-----------------------------------","date":"2026-01-02T02:37:06.808Z","summary":"Summary failed","source":"Medium"},{"title":"🦄 Uniswap Birthday Blog — V0","url":"https://medium.com/uniswap/uniswap-birthday-blog-v0-7a91f3f6a1ba?source=collection_home_page----47b2a7b4c96e-----2-----------------------------------","date":"2026-01-02T02:37:06.808Z","summary":"Summary failed","source":"Medium"},{"title":"🦄 Uniswap.exchange — better wallet support!","url":"https://medium.com/uniswap/uniswap-exchange-better-wallet-support-360a181f9654?source=collection_home_page----47b2a7b4c96e-----0-----------------------------------","date":"2026-01-02T02:37:06.808Z","summary":"Summary failed","source":"Medium"},{"title":"We’re excited to release a new and improved Uniswap.info","url":"https://medium.com/uniswap/were-excited-to-release-a-new-and-improved-uniswap-info-b04a1fca94ae?source=collection_home_page----47b2a7b4c96e-----1-----------------------------------","date":"2026-01-02T02:37:06.808Z","summary":"Summary failed","source":"Medium"}]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.959Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Velodrome
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_velodrome',
    'velodrome',
    'Velodrome',
    'defi',
    'AMM and ve(3,3) model on Optimism',
    '🏁',
    'https://velodrome.finance',
    23,
    59,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Velodrome","category":"defi","github":{"totalContributors":37,"activeContributors30d":37,"totalCommits30d":33,"avgCommitsPerDay":1.1,"topContributors":[{"login":"callmephilip","contributions":0,"avatarUrl":""},{"login":"hamelsmu","contributions":0,"avatarUrl":""},{"login":"jph00","contributions":0,"avatarUrl":""},{"login":"seeM","contributions":0,"avatarUrl":""},{"login":"muellerzr","contributions":0,"avatarUrl":""},{"login":"dsm-72","contributions":0,"avatarUrl":""},{"login":"xl0","contributions":0,"avatarUrl":""},{"login":"Parizval","contributions":0,"avatarUrl":""},{"login":"dleen","contributions":0,"avatarUrl":""},{"login":"stas","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":14,"days":[0,3,3,3,0,3,2]},{"week":1736038800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":39,"days":[2,3,2,18,8,6,0]},{"week":1736643600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":15,"days":[0,6,3,3,2,1,0]},{"week":1737248400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737849600,"total":27,"days":[0,5,9,4,6,3,0]},{"week":1737853200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":16,"days":[0,2,0,6,1,6,1]},{"week":1738458000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":9,"days":[0,2,0,2,3,1,1]},{"week":1739062800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739664000,"total":56,"days":[0,33,10,3,2,8,0]},{"week":1739667600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":18,"days":[0,7,3,5,1,2,0]},{"week":1740272400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":5,"days":[0,0,1,0,0,4,0]},{"week":1740877200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":3,"days":[0,0,1,0,1,1,0]},{"week":1741482000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":5,"days":[0,0,0,0,2,3,0]},{"week":1742688000,"total":8,"days":[0,4,3,0,0,1,0]},{"week":1743292800,"total":8,"days":[0,0,0,4,3,0,1]},{"week":1743897600,"total":1,"days":[0,0,0,0,1,0,0]},{"week":1744502400,"total":2,"days":[0,1,1,0,0,0,0]},{"week":1745107200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745712000,"total":4,"days":[0,0,2,0,0,1,1]},{"week":1746316800,"total":10,"days":[1,2,1,2,2,2,0]},{"week":1746921600,"total":9,"days":[0,0,0,3,6,0,0]},{"week":1747526400,"total":11,"days":[0,3,0,0,5,3,0]},{"week":1748131200,"total":7,"days":[0,0,4,0,0,3,0]},{"week":1748736000,"total":3,"days":[0,1,1,0,1,0,0]},{"week":1749340800,"total":2,"days":[0,1,0,1,0,0,0]},{"week":1749945600,"total":1,"days":[1,0,0,0,0,0,0]},{"week":1750550400,"total":2,"days":[0,0,0,0,1,0,1]},{"week":1751155200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":1,"days":[0,1,0,0,0,0,0]},{"week":1752364800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752969600,"total":4,"days":[0,0,0,1,3,0,0]},{"week":1753574400,"total":7,"days":[0,4,1,0,2,0,0]},{"week":1754179200,"total":7,"days":[0,0,5,2,0,0,0]},{"week":1754784000,"total":2,"days":[0,1,0,1,0,0,0]},{"week":1755388800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755993600,"total":3,"days":[0,1,0,1,1,0,0]},{"week":1756598400,"total":9,"days":[0,1,1,0,3,2,2]},{"week":1757203200,"total":9,"days":[4,3,0,0,0,2,0]},{"week":1757808000,"total":17,"days":[0,5,2,6,3,1,0]},{"week":1758412800,"total":12,"days":[0,3,2,2,3,2,0]},{"week":1759017600,"total":7,"days":[0,5,1,1,0,0,0]},{"week":1759622400,"total":4,"days":[0,2,0,2,0,0,0]},{"week":1760227200,"total":6,"days":[0,1,1,4,0,0,0]},{"week":1760832000,"total":37,"days":[0,1,2,22,5,7,0]},{"week":1761436800,"total":8,"days":[0,0,3,0,5,0,0]},{"week":1762041600,"total":11,"days":[0,1,1,8,0,1,0]},{"week":1762646400,"total":13,"days":[0,1,7,2,3,0,0]},{"week":1763251200,"total":4,"days":[0,0,4,0,0,0,0]},{"week":1763856000,"total":12,"days":[0,4,6,2,0,0,0]},{"week":1764460800,"total":6,"days":[0,0,0,0,0,6,0]},{"week":1765065600,"total":5,"days":[0,1,2,0,2,0,0]},{"week":1765670400,"total":14,"days":[0,4,1,0,7,2,0]},{"week":1766275200,"total":5,"days":[0,2,2,0,0,1,0]},{"week":1766880000,"total":3,"days":[0,3,0,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:54:37.247Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0x9c12939390052919aF3155f41Bf4160Fd3666A6f","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:54:39.056Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.960Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- 0x Protocol
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_zerox',
    'zerox',
    '0x Protocol',
    'infrastructure',
    'DEX aggregation and liquidity protocol',
    '0️⃣',
    'https://0x.org',
    7,
    57,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"0x Protocol","category":"infrastructure","github":{"totalContributors":48,"activeContributors30d":48,"totalCommits30d":2,"avgCommitsPerDay":0.1,"topContributors":[{"login":"fabioberger","contributions":0,"avatarUrl":""},{"login":"LogvinovLeon","contributions":0,"avatarUrl":""},{"login":"fragosti","contributions":0,"avatarUrl":""},{"login":"abandeali1","contributions":0,"avatarUrl":""},{"login":"BMillman19","contributions":0,"avatarUrl":""},{"login":"hysz","contributions":0,"avatarUrl":""},{"login":"dorothy-zbornak","contributions":0,"avatarUrl":""},{"login":"dekz","contributions":0,"avatarUrl":""},{"login":"steveklebanoff","contributions":0,"avatarUrl":""},{"login":"albrow","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1736640000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1737244800,"total":2,"days":[0,1,1,0,0,0,0]},{"week":1737849600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1739059200,"total":2,"days":[0,0,1,1,0,0,0]},{"week":1739664000,"total":3,"days":[0,0,0,0,1,1,1]},{"week":1740268800,"total":2,"days":[0,0,2,0,0,0,0]},{"week":1740873600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":3,"days":[0,0,0,0,2,1,0]},{"week":1742688000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743292800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743897600,"total":1,"days":[0,0,0,1,0,0,0]},{"week":1744502400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745107200,"total":2,"days":[2,0,0,0,0,0,0]},{"week":1745712000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746316800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746921600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747526400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748131200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748736000,"total":2,"days":[0,0,0,0,0,0,2]},{"week":1749340800,"total":3,"days":[0,0,0,3,0,0,0]},{"week":1749945600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750550400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751155200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752364800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752969600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753574400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754179200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755388800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755993600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1756598400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757203200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757808000,"total":3,"days":[0,0,0,0,0,0,3]},{"week":1758412800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759017600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759622400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760227200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760832000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1761436800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762041600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762646400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763251200,"total":1,"days":[0,0,0,0,0,0,1]},{"week":1763856000,"total":2,"days":[2,0,0,0,0,0,0]},{"week":1764460800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765065600,"total":2,"days":[0,0,2,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766880000,"total":0,"days":[0,0,0,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:54:16.933Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0xDef1C0ded9bec7F1a1670819833240f027b25EfF","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:54:19.707Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.960Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Zora
INSERT INTO "Company" (
    "id", "slug", "name", "category", "description", "logo", "website",
    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",
    "trend", "isListed", "isActive",
    "indexData",
    "createdAt", "updatedAt", "lastFetchedAt"
) VALUES (
    'comp_zora',
    'zora',
    'Zora',
    'nft',
    'NFT marketplace and protocol',
    '✨',
    'https://zora.co',
    5,
    55,
    0,
    0,
    0,
    'down',
    false,
    true,
    '{"companyName":"Zora","category":"nft","github":{"totalContributors":36,"activeContributors30d":36,"totalCommits30d":0,"avgCommitsPerDay":0,"topContributors":[{"login":"iainnash","contributions":0,"avatarUrl":""},{"login":"oveddan","contributions":0,"avatarUrl":""},{"login":"github-actions[bot]","contributions":0,"avatarUrl":""},{"login":"kulkarohan","contributions":0,"avatarUrl":""},{"login":"IsabellaSmallcombe","contributions":0,"avatarUrl":""},{"login":"jgeary","contributions":0,"avatarUrl":""},{"login":"0xtygra","contributions":0,"avatarUrl":""},{"login":"tbtstl","contributions":0,"avatarUrl":""},{"login":"isaaczaak","contributions":0,"avatarUrl":""},{"login":"gilllo","contributions":0,"avatarUrl":""}],"commitActivity":[{"week":1736035200,"total":1,"days":[0,0,0,0,0,1,0]},{"week":1736640000,"total":1,"days":[0,1,0,0,0,0,0]},{"week":1737244800,"total":3,"days":[0,0,1,2,0,0,0]},{"week":1737849600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1738454400,"total":3,"days":[0,1,0,0,2,0,0]},{"week":1739059200,"total":2,"days":[0,0,2,0,0,0,0]},{"week":1739664000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740268800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1740873600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1741478400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742083200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1742688000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743292800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1743897600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1744502400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745107200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1745712000,"total":1,"days":[0,0,1,0,0,0,0]},{"week":1746316800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1746921600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1747526400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748131200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1748736000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749340800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1749945600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1750550400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751155200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1751760000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752364800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1752969600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1753574400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754179200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1754784000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755388800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1755993600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1756598400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757203200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1757808000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1758412800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759017600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1759622400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760227200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1760832000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1761436800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762041600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1762646400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763251200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1763856000,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1764460800,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765065600,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1765670400,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766275200,"total":0,"days":[0,0,0,0,0,0,0]},{"week":1766880000,"total":0,"days":[0,0,0,0,0,0,0]}]},"twitter":{"followers":0,"following":0,"tweetCount":0,"verified":false,"createdAt":"2026-01-02T03:54:07.022Z","engagement30d":{"likes":0,"retweets":0,"replies":0}},"onchain":{"transactionCount24h":0,"transactionCount7d":0,"transactionCount30d":0,"uniqueWallets24h":0,"uniqueWallets7d":0,"uniqueWallets30d":0,"contractAddress":"0xE7E9Ea069b77e960B457D9b9810408EBC281B242","chain":"ethereum","monthlyActiveUsers":0,"dailyActiveUsers":0,"weeklyActiveUsers":0},"calculatedAt":"2026-01-02T03:54:09.451Z","news":[]}'::jsonb,
    NOW(), NOW(), '2026-01-02T04:16:31.961Z'
) ON CONFLICT (slug) DO UPDATE SET
    "name" = EXCLUDED."name",
    "category" = EXCLUDED."category",
    "description" = EXCLUDED."description",
    "logo" = EXCLUDED."logo",
    "website" = EXCLUDED."website",
    "overallScore" = EXCLUDED."overallScore",
    "teamHealthScore" = EXCLUDED."teamHealthScore",
    "growthScore" = EXCLUDED."growthScore",
    "socialScore" = EXCLUDED."socialScore",
    "walletQualityScore" = EXCLUDED."walletQualityScore",
    "trend" = EXCLUDED."trend",
    "isListed" = EXCLUDED."isListed",
    "indexData" = EXCLUDED."indexData",
    "updatedAt" = NOW(),
    "lastFetchedAt" = EXCLUDED."lastFetchedAt";

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Successfully seeded % companies!', (SELECT COUNT(*) FROM "Company");
END $$;
