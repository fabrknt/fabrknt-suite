/**
 * Seed Company table with Index data from JSON files
 * Run with: pnpm tsx scripts/seed-companies.ts
 *
 * Note: If you encounter connection errors, use the SQL seed script instead:
 * 1. Generate SQL: pnpm tsx scripts/generate-sql-seed.ts
 * 2. Run supabase-seed-companies.sql in Supabase SQL Editor
 */

import { config } from "dotenv";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

// Use DIRECT_URL if available (for direct connection), otherwise use DATABASE_URL (pooler)
const connectionString =
    process.env.DIRECT_URL || process.env.DATABASE_URL || "";

if (!connectionString) {
    console.error(
        "❌ DATABASE_URL or DIRECT_URL environment variable is required"
    );
    console.error(
        "💡 Tip: Use the SQL seed script instead: pnpm tsx scripts/generate-sql-seed.ts"
    );
    process.exit(1);
}

// Create connection pool with SSL for Supabase direct connections
const pool = new Pool({
    connectionString,
    // Increase timeout for seeding operations
    connectionTimeoutMillis: 10000,
    query_timeout: 30000,
    // Add SSL for Supabase direct connections
    ssl: connectionString.includes("supabase.co")
        ? {
              rejectUnauthorized: false,
          }
        : undefined,
});

// Handle pool errors
pool.on("error", (err) => {
    console.error("❌ Unexpected pool error:", err);
});

const adapter = new PrismaPg(pool);

// Create Prisma client with adapter
const prisma = new PrismaClient({
    adapter,
    log: ["error", "warn"],
});

interface CompanyJSON {
    slug: string;
    fetchedAt: string;
    metadata: {
        name: string;
        chain: string;
        description: string;
    };
    rawData: {
        companyName: string;
        category: string;
        github?: any;
        twitter?: any;
        onchain?: any;
    };
    scores: {
        overall: number;
        teamHealth: number;
        growthScore: number;
        walletQuality: number;
        socialScore: number;
    };
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
}

async function seedCompanies() {
    console.log("🌱 Seeding Company table from JSON files...\n");

    const dataDir = join(process.cwd(), "data", "companies");

    if (!existsSync(dataDir)) {
        console.error("❌ Data directory not found:", dataDir);
        process.exit(1);
    }

    const files = readdirSync(dataDir).filter(
        (file) => file.endsWith(".json") && file !== "all-companies.json"
    );

    console.log(`📁 Found ${files.length} company files\n`);

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

            // Upsert company (update if exists, create if not)
            await prisma.company.upsert({
                where: { slug: company.slug },
                update: {
                    name: company.name,
                    category: company.category,
                    description: company.description,
                    logo: company.logo,
                    website: company.website,
                    overallScore: company.overallScore,
                    teamHealthScore: jsonData.scores.teamHealth,
                    growthScore: jsonData.scores.growthScore,
                    socialScore: jsonData.scores.socialScore,
                    walletQualityScore: jsonData.scores.walletQuality,
                    trend: company.trend,
                    isListed: company.isListed,
                    indexData: jsonData.rawData, // Store full raw data as JSON
                    lastFetchedAt: new Date(jsonData.fetchedAt),
                    updatedAt: new Date(),
                },
                create: {
                    slug: company.slug,
                    name: company.name,
                    category: company.category,
                    description: company.description,
                    logo: company.logo,
                    website: company.website,
                    overallScore: company.overallScore,
                    teamHealthScore: jsonData.scores.teamHealth,
                    growthScore: jsonData.scores.growthScore,
                    socialScore: jsonData.scores.socialScore,
                    walletQualityScore: jsonData.scores.walletQuality,
                    trend: company.trend,
                    isListed: company.isListed,
                    indexData: jsonData.rawData, // Store full raw data as JSON
                    lastFetchedAt: new Date(jsonData.fetchedAt),
                },
            });

            console.log(
                `✅ ${company.name} (${company.slug}) - Score: ${company.overallScore}`
            );
            successCount++;
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error);
            errorCount++;
        }
    }

    console.log(`\n📊 Seeding complete!`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);

    // Show summary
    const totalCompanies = await prisma.company.count();
    const topCompanies = await prisma.company.findMany({
        select: { name: true, overallScore: true, category: true },
        orderBy: { overallScore: "desc" },
        take: 5,
    });

    console.log(`\n📈 Top 5 companies by score:`);
    topCompanies.forEach((company, index) => {
        console.log(
            `   ${index + 1}. ${company.name} (${company.category}): ${
                company.overallScore
            }`
        );
    });

    console.log(`\n✨ Total companies in database: ${totalCompanies}`);
}

seedCompanies()
    .catch((error) => {
        console.error("❌ Seed script failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
