/**
 * Generate SQL seed script from all JSON company files
 * Run with: pnpm tsx scripts/generate-sql-seed.ts
 */

import { readFileSync, readdirSync, existsSync, writeFileSync } from "fs";
import { join } from "path";

interface CompanyJSON {
    slug: string;
    fetchedAt: string;
    company: {
        slug: string;
        name: string;
        category: string;
        description: string;
        logo: string;
        website: string;
        overallScore: number;
        trend: "up" | "down" | "stable";
        isListed: boolean;
    };
    scores: {
        overall: number;
        teamHealth: number;
        growthScore: number;
        walletQuality: number;
        socialScore: number;
    };
    rawData: any;
}

function escapeSqlString(str: string | null | undefined): string {
    if (!str) return "NULL";
    return `'${str.replace(/'/g, "''")}'`;
}

function generateSqlSeed() {
    console.log("📝 Generating SQL seed script from JSON files...\n");

    const dataDir = join(process.cwd(), "data", "companies");
    const outputFile = join(process.cwd(), "supabase-seed-companies.sql");

    if (!existsSync(dataDir)) {
        console.error("❌ Data directory not found:", dataDir);
        process.exit(1);
    }

    const files = readdirSync(dataDir)
        .filter(
            (file) => file.endsWith(".json") && file !== "all-companies.json"
        )
        .sort();

    console.log(`📁 Found ${files.length} company files\n`);

    let sql = `-- Seed Company table with Index data from ${
        files.length
    } JSON files
-- Run this in Supabase SQL Editor after creating the Company table
-- Generated: ${new Date().toISOString()}

-- Clear existing data (optional)
-- TRUNCATE "Company" CASCADE;

`;

    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
        try {
            const filePath = join(dataDir, file);
            const rawData = readFileSync(filePath, "utf-8");
            const jsonData: CompanyJSON = JSON.parse(rawData);

            // Skip if no company data
            if (!jsonData.company) {
                console.log(`⚠️  Skipping ${file} - no company data`);
                continue;
            }

            const company = jsonData.company;
            const id = `comp_${company.slug}`;
            const indexDataJson = JSON.stringify(jsonData.rawData || {});

            sql += `-- ${company.name}\n`;
            sql += `INSERT INTO "Company" (\n`;
            sql += `    "id", "slug", "name", "category", "description", "logo", "website",\n`;
            sql += `    "overallScore", "teamHealthScore", "growthScore", "socialScore", "walletQualityScore",\n`;
            sql += `    "trend", "isListed", "isActive",\n`;
            sql += `    "indexData",\n`;
            sql += `    "createdAt", "updatedAt", "lastFetchedAt"\n`;
            sql += `) VALUES (\n`;
            sql += `    ${escapeSqlString(id)},\n`;
            sql += `    ${escapeSqlString(company.slug)},\n`;
            sql += `    ${escapeSqlString(company.name)},\n`;
            sql += `    ${escapeSqlString(company.category)},\n`;
            sql += `    ${escapeSqlString(company.description)},\n`;
            sql += `    ${escapeSqlString(company.logo)},\n`;
            sql += `    ${escapeSqlString(company.website)},\n`;
            sql += `    ${company.overallScore},\n`;
            sql += `    ${jsonData.scores.teamHealth},\n`;
            sql += `    ${jsonData.scores.growthScore},\n`;
            sql += `    ${jsonData.scores.socialScore},\n`;
            sql += `    ${jsonData.scores.walletQuality},\n`;
            sql += `    ${escapeSqlString(company.trend)},\n`;
            sql += `    ${company.isListed},\n`;
            sql += `    true,\n`;
            sql += `    '${indexDataJson.replace(/'/g, "''")}'::jsonb,\n`;
            sql += `    NOW(), NOW(), '${jsonData.fetchedAt}'\n`;
            sql += `) ON CONFLICT (slug) DO UPDATE SET\n`;
            sql += `    "name" = EXCLUDED."name",\n`;
            sql += `    "category" = EXCLUDED."category",\n`;
            sql += `    "description" = EXCLUDED."description",\n`;
            sql += `    "logo" = EXCLUDED."logo",\n`;
            sql += `    "website" = EXCLUDED."website",\n`;
            sql += `    "overallScore" = EXCLUDED."overallScore",\n`;
            sql += `    "teamHealthScore" = EXCLUDED."teamHealthScore",\n`;
            sql += `    "growthScore" = EXCLUDED."growthScore",\n`;
            sql += `    "socialScore" = EXCLUDED."socialScore",\n`;
            sql += `    "walletQualityScore" = EXCLUDED."walletQualityScore",\n`;
            sql += `    "trend" = EXCLUDED."trend",\n`;
            sql += `    "isListed" = EXCLUDED."isListed",\n`;
            sql += `    "indexData" = EXCLUDED."indexData",\n`;
            sql += `    "updatedAt" = NOW(),\n`;
            sql += `    "lastFetchedAt" = EXCLUDED."lastFetchedAt";\n\n`;

            console.log(`✅ ${company.name} (${company.slug})`);
            successCount++;
        } catch (error: any) {
            console.error(`❌ Error processing ${file}:`, error.message);
            errorCount++;
        }
    }

    sql += `-- Success message\n`;
    sql += `DO $$\n`;
    sql += `BEGIN\n`;
    sql += `    RAISE NOTICE 'Successfully seeded % companies!', (SELECT COUNT(*) FROM "Company");\n`;
    sql += `END $$;\n`;

    // Write SQL file
    writeFileSync(outputFile, sql, "utf-8");

    console.log(`\n📊 Generation complete!`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`\n📄 SQL file written to: ${outputFile}`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Open Supabase SQL Editor`);
    console.log(`   2. Copy contents of ${outputFile}`);
    console.log(`   3. Run the SQL script`);
}

generateSqlSeed();
