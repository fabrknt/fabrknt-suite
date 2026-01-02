
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') });

async function testConnection() {
    console.log('Testing Prisma connection with project config...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'PRESENT' : 'MISSING');

    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL is missing from environment.');
        process.exit(1);
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        await prisma.$connect();
        console.log('✅ Connected successfully to the database.');
        const count = await prisma.company.count();
        console.log(`📊 Found ${count} companies in the database.`);
        await prisma.$disconnect();
        await pool.end();
    } catch (error) {
        console.error('❌ Connection failed:');
        console.error(error);
        await pool.end();
        process.exit(1);
    }
}

testConnection();
