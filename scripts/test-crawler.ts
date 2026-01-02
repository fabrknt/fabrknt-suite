// Load environment variables
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { CrawlerService } from "../src/lib/index/crawler";
import { LLMService } from "../src/lib/index/llm";

async function testCrawler() {
    const crawler = new CrawlerService();
    const llm = new LLMService();

    console.log("🧪 Testing CrawlerService...");

    // Test 1: Crawl Uniswap Blog
    const targetUrl = "https://blog.uniswap.org/"; // Using a known blog
    console.log(`\n1. Crawling ${targetUrl}...`);
    try {
        const news = await crawler.crawlCompanyNews(targetUrl, "Uniswap Blog");
        console.log(`✅ Found ${news.length} items.`);
        if (news.length > 0) {
            console.log("Sample Item:", news[0]);

            // Test 2: Summarization (Mock if API key missing)
            console.log("\n2. Testing LLM Summarization...");
            const summary = await llm.summarizePartnerships(
                news[0].title,
                news[0].url
            );
            console.log(`Summary Result: ${summary}`);
        }
    } catch (error) {
        console.error("❌ Crawl failed:", error);
    }

    // Test 3: Funding News (Mock/Generic)
    console.log("\n3. Testing Funding News Crawler...");
    try {
        const opportunities = await crawler.crawlFundingNews();
        console.log(`✅ Found ${opportunities.length} funding opportunities.`);
        if (opportunities.length > 0) {
            console.log("Sample Opp:", opportunities[0]);
        }
    } catch (error) {
        console.error("❌ Funding crawl failed:", error);
    }
}

testCrawler();
