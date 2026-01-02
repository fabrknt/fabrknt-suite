# Calculation Logic Evaluation

**Date**: 2026-01-02
**Codebase**: Fabrknt Suite (Index + Synergy Platform)

---

## Overview

The Fabrknt Suite uses sophisticated calculation logic across two main systems:

1. **Index Score Calculator** - Evaluates companies using GitHub, Twitter, on-chain, and web activity data
2. **Synergy Platform Helpers** - Ranks and sorts listings by value, revenue multiples, and scores

---

## 1. Index Score Calculator

**Location**: `/src/lib/index/calculators/score-calculator.ts`

### 1.1 GitHub Team Health Score (0-100)

**Formula**:

```
Overall = (Contributor Score × 0.4) + (Activity Score × 0.4) + (Retention Score × 0.2)
```

**Breakdown**:

| Component             | Calculation                                                                                                                  | Weight | Notes                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| **Contributor Score** | `log₁₀(1 + totalContributors)` normalized to 0-2.0 (60%) <br> + `log₁₀(1 + activeContributors30d)` normalized to 0-1.3 (40%) | 40%    | Uses logarithmic scale to handle wide ranges (1-100+ contributors) |
| **Activity Score**    | `totalCommits30d` normalized to 0-300                                                                                        | 40%    | Benchmark: 300 commits/month = excellent                           |
| **Retention Score**   | `(activeContributors30d / totalContributors) × 100` normalized to 0-20%                                                      | 20%    | Softened for large projects; 20% retention = excellent             |

**Strengths**:

-   ✅ Logarithmic scaling prevents skew from mega-projects (100+ contributors)
-   ✅ Balanced between team size, activity, and retention
-   ✅ Realistic benchmarks (20% retention is excellent for large OSS projects)

**Issues**:

-   ⚠️ **Private repos are penalized heavily** - Companies with private development get 0 score
-   ⚠️ **No quality vs. quantity distinction** - 300 trivial commits scores same as 300 meaningful commits
-   ⚠️ **Retention score can be misleading** - A 5-person team with 1 active contributor (20%) scores same as 100-person team with 20 active (20%)

**Recommendations**:

1. Add code quality proxy (e.g., PR review count, lines changed per commit)
2. Consider absolute contributor count in retention, not just percentage
3. Better handling of private-heavy development (currently only shifts weights, doesn't score it)

---

### 1.2 Twitter Social Score (0-100)

**Formula**:

```
Overall = (Followers Score × 0.7) + (Engagement Score × 0.3)
```

**Breakdown**:

| Component            | Calculation                                                   | Weight | Benchmark                                 |
| -------------------- | ------------------------------------------------------------- | ------ | ----------------------------------------- |
| **Followers Score**  | `log₁₀(followers)` normalized from log₁₀(10k) to log₁₀(2M)    | 70%    | 100K = ~50, 500K = ~70, 1M+ = 85+         |
| **Engagement Score** | `(totalEngagement30d / followers) × 100` normalized to 0-1.5% | 30%    | 1.5% engagement rate = excellent for Web3 |

**Strengths**:

-   ✅ Log scale prevents follower count dominance
-   ✅ Engagement rate (not absolute) measures community health
-   ✅ Realistic Web3 benchmarks (1.5% is excellent for institutional accounts)

**Issues**:

-   ⚠️ **Defaults to 0 if engagement data missing** - Penalizes accounts without API access
-   ⚠️ **No bot detection** - Fake followers boost score
-   ⚠️ **No sentiment analysis** - Negative engagement counts same as positive

**Recommendations**:

1. Add fallback scoring when engagement data unavailable (e.g., use tweet count)
2. Consider engagement quality (replies > likes > retweets)
3. Penalize sudden follower spikes (bot detection proxy)

---

### 1.3 On-Chain Growth Score (0-100)

**Formula**:

```
Overall = (User Growth Score × 0.4) + (Transaction Score × 0.3) + (TVL Score × 0.3)
```

**Breakdown**:

| Component             | Calculation                                                                                             | Weight | Benchmark                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------- |
| **User Growth**       | Primary: `(DAU / MAU) × 100` normalized to 0-10% <br> Fallback: `uniqueWallets30d` normalized to 0-100K | 40%    | 10% DAU/MAU = excellent for utility protocols |
| **Transaction Score** | `transactionCount30d` normalized to 0-1M                                                                | 30%    | 1M txns/month = max score                     |
| **TVL Score**         | `log₁₀(tvl)` normalized from log₁₀($1M) to log₁₀($10B)                                                  | 30%    | $1M-$10B range                                |

**Strengths**:

-   ✅ DAU/MAU ratio is better metric than absolute users (measures stickiness)
-   ✅ Graceful fallback when DAU/MAU unavailable
-   ✅ TVL uses log scale (appropriate for DeFi)

**Issues**:

-   ⚠️ **TVL weight is 30% but often unavailable** - Most protocols don't expose TVL via RPC
-   ⚠️ **Transaction count doesn't distinguish value** - 1M spam txns scores same as 1M high-value DeFi swaps
-   ⚠️ **No chain-specific normalization** - Solana txn counts are 100x higher than Ethereum due to architecture

**Recommendations**:

1. Reduce TVL weight to 10-15%, redistribute to user/transaction metrics
2. Add transaction value normalization ($ volume, not just count)
3. Chain-specific benchmarks (Solana: 10M txns/month, Ethereum: 100K txns/month)
4. Consider growth trends (30d vs. 60d) instead of absolute values

---

### 1.4 Combined Index Score (0-100)

**Formula**:

```
Overall = (GitHub Score × weight_github) + (Combined Growth × weight_growth) + (Twitter Score × weight_social)

where Combined Growth = (OnChain × 0.4) + (News/Shipping × 0.3) + (Attention/Virality × 0.3)
```

**Category-Specific Weights**:

| Category           | GitHub | Growth | Social | Rationale                          |
| ------------------ | ------ | ------ | ------ | ---------------------------------- |
| **DeFi**           | 35%    | 55%    | 10%    | Growth (TVL, users) most important |
| **Infrastructure** | 55%    | 35%    | 10%    | Code quality/team most important   |
| **Gaming/NFT**     | 30%    | 40%    | 30%    | Community engagement matters more  |
| **Default**        | 40%    | 45%    | 15%    | Balanced                           |

**Dynamic Weight Redistribution**:

1. **No Twitter data** → Redistribute social weight to GitHub + Growth (proportionally)
2. **Private development** (< 5 commits/30d) → Shift 80% of GitHub weight to Growth
3. **Low on-chain activity** (< 10 txns) → Growth = (News/Web × 0.7) + (Attention × 0.3)

**Strengths**:

-   ✅ Category-aware weighting (DeFi ≠ Infrastructure ≠ Gaming)
-   ✅ Graceful degradation when data missing (weight redistribution)
-   ✅ Detects private development and shifts to real-world signals (web activity)
-   ✅ Multi-signal fusion for growth (on-chain + news + social virality)

**Issues**:

-   ⚠️ **Private dev detection threshold is arbitrary** - 5 commits/30d may exclude active projects
-   ⚠️ **Weight redistribution can amplify noise** - Shifting from missing GitHub to News/Web may boost low-quality projects with marketing
-   ⚠️ **No confidence intervals** - Score of 85 with full data ≠ 85 with 30% data, but displayed identically
-   ⚠️ **News/Web score is keyword-based** - Easily gamed with buzzwords ("launch", "mainnet", "funding")

**Recommendations**:

1. Add confidence score (0-100%) based on data completeness
    - GitHub (30%), Twitter (20%), On-chain (30%), News (20%)
    - Display as: "Score: 85/100 (Confidence: 75%)"
2. Increase private dev threshold to 10-15 commits/30d
3. Add keyword spam detection (penalize excessive marketing keywords)
4. Consider recency weighting: Recent data (0-30d) × 1.0, Old data (30-90d) × 0.5

---

### 1.5 News/Web Activity Score (0-100)

**Formula**:

```
Overall = (Recency Score × 0.6) + (Frequency Score × 0.4)

Recency = normalize(daysSinceLastUpdate, 30, 0)  // Fresh news = higher score
Frequency = [normalize(newsCount, 0, 5) × 0.5] + [normalize(30/newsCount, 60, 14) × 0.5]
```

**Strengths**:

-   ✅ Rewards fresh updates (< 30 days)
-   ✅ Balanced between recency and frequency

**Issues**:

-   ⚠️ **No source credibility weighting** - Blog post = CoinDesk article
-   ⚠️ **Easy to game** - Publish 5+ low-quality updates → max frequency score
-   ⚠️ **Frequency formula is confusing** - `30/newsCount` normalized from 60-14 is non-intuitive

**Recommendations**:

1. Add source weighting: Tier-1 media (2x), Official blog (1x), Social posts (0.5x)
2. Cap frequency benefit at 3-4 updates/month (more = spam)
3. Simplify frequency formula: `normalize(newsCount, 0, 4)`

---

### 1.6 News Growth Score (0-100)

**Formula**:

```
For each news item:
  - Match keywords: ["launch", "mainnet", "funding", "raised", "partner", ...]
  - Calculate freshness: normalize(daysAgo, 14, 0)
  - Signal strength += (10 + matchCount × 5) × (freshness/100 + 0.5)

Overall = min(100, round(signalStrength))
```

**Strengths**:

-   ✅ Rewards high-impact keywords (funding, launch, mainnet)
-   ✅ Freshness multiplier (0-14 days = high signal)
-   ✅ Multiple keyword matches = stronger signal

**Issues**:

-   ⚠️ **Keyword list is hardcoded** - No adaptation to category (DeFi vs. Gaming)
-   ⚠️ **No negative keywords** - "delayed", "postponed", "failed" not detected
-   ⚠️ **Signal strength has no upper bound per item** - One article with all keywords can dominate
-   ⚠️ **Freshness cutoff is binary** - News at 13 days vs. 15 days has massive score difference

**Recommendations**:

1. Category-specific keywords:
    - DeFi: "TVL", "yield", "liquidity", "audit"
    - Gaming: "players", "tournament", "P2E", "NFT drop"
    - Infrastructure: "nodes", "validators", "throughput", "uptime"
2. Add negative keywords with penalty: "delayed" (-5), "hacked" (-10), "shutdown" (-15)
3. Cap signal per article at 20-25 points
4. Smoothen freshness decay: Use exponential decay instead of linear normalize

---

### 1.7 Attention Score (Virality) (0-100)

**Formula**:

```
Engagement Velocity = (totalEngagement30d / followers) × 100
Overall = normalize(velocity, 0, 2%)
```

**Strengths**:

-   ✅ Measures virality, not just size
-   ✅ 2% engagement velocity = viral for Web3

**Issues**:

-   ⚠️ **Same as Twitter Engagement Score** - Duplicates existing metric (line 99-103 in Twitter score)
-   ⚠️ **No time-based velocity** - Engagement over 30 days, not trending spikes

**Recommendations**:

1. Make distinct from Twitter engagement:
    - Option A: Use 7-day engagement velocity (not 30-day)
    - Option B: Measure week-over-week growth rate
2. Add trend detection: Growing (×1.2), Stable (×1.0), Declining (×0.8)

---

## 2. Synergy Platform Helpers

**Location**: `/src/lib/synergy/helpers.ts`

### 2.1 Revenue Multiple Calculation

**Formula**:

```typescript
getRevenueMultiple(listing): number {
  if (revenue === 0 || !askingPrice) return 0;
  return askingPrice / revenue;
}
```

**Usage**:

```typescript
getBestValue(listings): Listing[] {
  return listings
    .filter(l => revenue > 0 && askingPrice)
    .sort((a, b) => {
      const aMultiple = (a.askingPrice || 0) / a.revenue;
      const bMultiple = (b.askingPrice || 0) / b.revenue;
      return aMultiple - bMultiple; // Lower = better value
    });
}
```

**Strengths**:

-   ✅ Standard SaaS valuation metric (ARR multiple)
-   ✅ Simple, easy to understand

**Issues**:

-   ⚠️ **Doesn't account for growth rate** - 3x revenue with 200% YoY growth > 2x revenue with 10% YoY growth
-   ⚠️ **No category-specific benchmarks** - DeFi protocols trade at 1-3x revenue, SaaS at 5-15x
-   ⚠️ **Negative/zero revenue not handled** - Returns 0 instead of Infinity or null

**Recommendations**:

1. Add growth-adjusted multiple:
    ```typescript
    getGrowthAdjustedMultiple(listing): number {
      const baseMultiple = askingPrice / revenue;
      const growthFactor = Math.max(0.5, Math.min(2, growthRate / 50));
      return baseMultiple / growthFactor;
    }
    ```
2. Add category benchmarks for "Good Value" tag:
    - DeFi: < 3x = Excellent, 3-5x = Fair
    - Gaming: < 5x = Excellent, 5-10x = Fair
3. Return `null` or `Infinity` for invalid cases

---

### 2.2 Featured Listings (Highest Fabrknt Score)

**Formula**:

```typescript
getFeaturedListings(listings): Listing[] {
  return listings
    .filter(l => l.status === 'active')
    .sort((a, b) => (b.suiteData?.fabrknt_score || 0) - (a.suiteData?.fabrknt_score || 0))
    .slice(0, limit);
}
```

**Strengths**:

-   ✅ Promotes quality listings with Index verification

**Issues**:

-   ⚠️ **Listings without suiteData get 0 score** - Penalizes new/unlinked listings
-   ⚠️ **No diversity** - All featured listings could be same category
-   ⚠️ **No recency factor** - Old but high-scoring listings dominate

**Recommendations**:

1. Boost new listings: `adjustedScore = fabrknt_score + (daysOld < 7 ? 10 : 0)`
2. Category diversity: Ensure at least 1 listing from each major category
3. Fallback for unlinked listings: Use revenue/MAU as proxy score

---

### 2.3 High Interest (by MAU)

**Formula**:

```typescript
getHighInterest(listings): Listing[] {
  return listings
    .filter(l => l.status === 'active')
    .sort((a, b) => b.mau - a.mau);
}
```

**Issues**:

-   ⚠️ **MAU alone is not "interest"** - Should be views, offers, watchlist count
-   ⚠️ **Misleading label** - "High Interest" implies buyer demand, not user count

**Recommendations**:

1. Rename to `getHighMAU()` or `getMostPopular()`
2. Implement true interest tracking:
    ```typescript
    getHighInterest(listings): Listing[] {
      return listings.sort((a, b) => {
        const aInterest = a.viewCount + a.offerCount × 3 + a.watchlistCount × 2;
        const bInterest = b.viewCount + b.offerCount × 3 + b.watchlistCount × 2;
        return bInterest - aInterest;
      });
    }
    ```

---

## 3. Fabrknt Score Composite

**Location**: Displayed in `/src/components/suite-ribbon.tsx`

**Components**:

-   **PULSE (Vitality)**: `vitality_score` (0-100) - Team health
-   **TRACE (Growth)**: `growth_score` (0-100) - ROI & growth metrics
-   **Revenue Verified**: On-chain verified revenue
-   **Fabrknt Score**: Composite score

**Display Issues**:

-   ⚠️ **No formula shown** - Users don't know how Fabrknt score is calculated from PULSE + TRACE + Revenue
-   ⚠️ **Revenue displayed as $Xk** - Inconsistent with asking price (full number)
-   ⚠️ **No timestamp** - Score could be from 1 day ago or 6 months ago

**Recommendations**:

1. Document Fabrknt score formula:
    ```typescript
    fabrknt_score = (PULSE × 0.3) + (TRACE × 0.5) + (revenue_verified_score × 0.2)
    ```
2. Add timestamp: "Verified on Jan 1, 2026"
3. Make revenue formatting consistent

---

## 4. Critical Issues Summary

### High Priority

1. **Lack of Confidence Scoring** ⚠️⚠️⚠️

    - Impact: Users can't distinguish between high-confidence (full data) vs. low-confidence (missing data) scores
    - Fix: Add `confidence: 0-100%` based on data completeness

2. **Private Development Penalty** ⚠️⚠️⚠️

    - Impact: Early-stage/stealth projects with private repos get unfairly low scores
    - Fix: Better private dev detection (use web activity, funding announcements as proxy)

3. **News/Web Score Gameable** ⚠️⚠️

    - Impact: Projects can boost score with keyword-stuffed PR spam
    - Fix: Add source credibility weighting, keyword spam detection, negative keyword penalties

4. **Chain-Specific Normalization Missing** ⚠️⚠️
    - Impact: Solana projects get 100x inflated transaction scores vs. Ethereum
    - Fix: Chain-specific benchmarks

### Medium Priority

5. **No Growth Trends** ⚠️

    - Impact: Static snapshot, doesn't show if metrics are improving or declining
    - Fix: Add 30d vs. 60d comparison for trend arrows

6. **Revenue Multiple Oversimplified** ⚠️

    - Impact: Ignores growth rate, category norms
    - Fix: Add growth-adjusted multiple calculation

7. **Duplicate Metrics** ⚠️
    - Impact: Attention Score duplicates Twitter Engagement Score
    - Fix: Make distinct (7d velocity vs. 30d engagement rate)

### Low Priority

8. **News Frequency Formula Unclear**
9. **MAU mislabeled as "Interest"**
10. **No negative sentiment detection in news**

---

## 5. Overall Assessment

### Strengths

-   ✅ Sophisticated multi-signal scoring system
-   ✅ Category-aware weighting (DeFi ≠ Gaming)
-   ✅ Graceful degradation when data missing
-   ✅ Realistic Web3 benchmarks (not ported from Web2)
-   ✅ Logarithmic scaling for wide-range metrics

### Weaknesses

-   ❌ No confidence/data quality scoring
-   ❌ Vulnerable to gaming (keyword stuffing, fake followers)
-   ❌ Penalizes private/stealth development too heavily
-   ❌ No chain-specific normalization
-   ❌ Static snapshots, no trend detection
-   ❌ Some duplicate metrics (Attention = Twitter Engagement)

### Grade: **B+ (85/100)**

The calculation logic is well-designed for Web3 with thoughtful benchmarks and multi-signal fusion. However, it lacks:

-   Data quality/confidence indicators
-   Gaming resistance
-   Trend analysis
-   Chain-specific handling

**Priority Fixes** (to reach A-):

1. Add confidence scoring (1 week)
2. Implement chain-specific benchmarks (3 days)
3. Add news source credibility weighting (3 days)
4. Improve private dev detection (1 week)

---

## 6. Recommended Next Steps

1. **Add Calculation Tests** - Create `/tests/calculators.test.ts` with edge cases
2. **Document Formulas** - Add inline comments explaining benchmarks
3. **Build Admin Dashboard** - Allow tuning weights/benchmarks without code changes
4. **A/B Test Weight Adjustments** - Try DeFi at 60% growth vs. 55% and measure correlation with real outcomes
5. **User Research** - Survey Match platform users: "Is this score accurate for this project?"

---

**Evaluation By**: Claude Sonnet 4.5
**Review Status**: Ready for discussion
