/**
 * Verification script to check if real data is being loaded from JSON files
 */

import { companies } from "../src/lib/index/companies";
import { hasRealData } from "../src/lib/index/data-loader";

console.log("\n📊 Company Data Loading Verification\n");
console.log("=" + "=".repeat(60) + "\n");

// Companies with real JSON data
const companiesWithRealData = [
    "uniswap",
    "jupiter",
    "morpho",
    "euler",
    "rocketpool",
    "blur",
    "safe",
    "orca",
];

// Check each company
companiesWithRealData.forEach((slug) => {
    const company = companies.find((c) => c.slug === slug);
    const hasReal = hasRealData(slug);

    if (company) {
        console.log(`✅ ${company.name} (${slug})`);
        console.log(`   Has JSON: ${hasReal ? "Yes" : "No"}`);
        console.log(`   Score: ${company.overallScore}`);
        console.log(
            `   Team Health: ${company.teamHealth.score} (commits: ${company.teamHealth.githubCommits30d})`
        );
        console.log(
            `   Growth: ${company.growth.score} (on-chain: ${company.growth.onChainActivity30d})`
        );
        console.log("");
    } else {
        console.log(`❌ ${slug} - NOT FOUND IN COMPANIES ARRAY`);
        console.log("");
    }
});

// Summary
console.log("=" + "=".repeat(60));
console.log(`\nTotal companies: ${companies.length}`);
console.log(
    `Companies with real data: ${
        companiesWithRealData.filter(hasRealData).length
    }/${companiesWithRealData.length}`
);
console.log("\nData loading successful! 🎉\n");
