# FABRKNT: AI-Powered DeFi Curation Platform

**Curate DeFi yields intelligently with AI.**

**Domain:** `www.fabrknt.com`

---

## Overview

FABRKNT is an AI-powered DeFi yield curation platform that helps curators, investors, and protocol teams make smarter decisions using real-time risk scoring, APY stability analysis, and AI-driven recommendations.

**Core Product:** **CURATE** — AI-powered yield intelligence with personalized recommendations, natural language risk insights, and portfolio optimization.

**Positioning:** **AI × Verified Data × DeFi Intelligence**

---

## AI-Powered Features

### 1. Personalized Recommendations

Get AI-curated pool suggestions based on your preferences:
- Risk tolerance (conservative, moderate, aggressive)
- Preferred chains
- APY range
- Stablecoin preference

*Requires login*

### 2. Smart Risk Insights

AI-generated analysis explaining each pool in plain English:
- Risk explanation and breakdown
- Opportunities and warnings
- APY stability analysis
- Comparison vs. similar pools
- Overall verdict

*Requires login*

### 3. Portfolio Optimizer

AI suggests optimal allocation across pools:
- Input your total allocation amount
- Choose risk tolerance and diversification level
- Get AI-recommended portfolio with expected yields
- View risk warnings and diversification score

*Requires login*

---

## CURATE: DeFi Yield Intelligence

Beyond AI features, CURATE provides comprehensive yield intelligence:

### Risk Scoring
- **Composite Risk Score (0-100):** TVL risk, APY sustainability, IL risk, stablecoin exposure, protocol maturity
- **Risk Breakdown:** Detailed scoring for each factor

### APY Stability Analysis
- 30-day historical charts
- Volatility analysis and trend direction
- Stability scores

### Liquidity Risk Assessment
- Exit-ability ratings (excellent to poor)
- Max safe allocation guidance
- Slippage estimates at $100K to $10M positions

### Pool Comparison
- Side-by-side comparison of multiple pools
- Highlight best values across metrics

### Watchlist
- Save pools for monitoring
- Quick access to tracked yields

---

## Data Coverage

- **200+** yield pools analyzed
- **30-day** APY trends
- **Real-time** risk scoring
- Data sourced from DeFiLlama APIs

---

## CURATE vs DeFiLlama

| Feature | DeFiLlama | FABRKNT CURATE |
|---------|-----------|----------------|
| AI Recommendations | ❌ | ✅ Personalized |
| Natural Language Insights | ❌ | ✅ AI-generated |
| Portfolio Optimization | ❌ | ✅ AI-powered |
| Composite Risk Score | ❌ | ✅ 0-100 score |
| APY Stability Analysis | ❌ Raw chart | ✅ Stability score |
| Liquidity Risk Index | ❌ Only TVL | ✅ Exit-ability rating |
| Safe Allocation Guidance | ❌ | ✅ Max position size |
| Slippage Estimates | ❌ | ✅ At $100K-$10M |
| Pool Comparison | ❌ | ✅ Side-by-side |

---

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS
- **AI:** Anthropic Claude API
- **Database:** PostgreSQL (Supabase)
- **Hosting:** Vercel
- **Data Sources:** DeFiLlama APIs
- **Authentication:** NextAuth.js

---

## Getting Started

### For Users

1. **Browse Pools** — Explore 200+ yield pools with risk scoring (no login required)
2. **Sign In** — Unlock AI-powered features
3. **Set Preferences** — Configure your risk tolerance and preferences
4. **Get AI Recommendations** — Receive personalized pool suggestions
5. **Optimize Portfolio** — Use AI to allocate across pools

### Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY, DATABASE_URL, etc.

# Run development server
pnpm dev

# Type check
pnpm type-check

# Build for production
pnpm build
```

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# AI
ANTHROPIC_API_KEY=sk-ant-...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## API Endpoints

### Public Endpoints

- `GET /api/curate/defi` — Yield pools with risk scoring
- `GET /api/curate/defi/history/{poolId}` — Historical APY data

### Authenticated Endpoints (AI Features)

- `GET /api/curate/ai/preferences` — Get user preferences
- `PUT /api/curate/ai/preferences` — Update preferences
- `POST /api/curate/ai/recommendations` — Get AI recommendations
- `GET /api/curate/ai/insights/{poolId}` — Get AI pool insights
- `POST /api/curate/ai/portfolio` — Optimize portfolio

---

## Contact & Resources

- **Website:** [www.fabrknt.com](https://www.fabrknt.com)
- **GitHub:** [github.com/fabrknt](https://github.com/fabrknt)
- **X (Twitter):** [@fabrknt](https://x.com/fabrknt)

---

**DeFi yields, curated by AI.**
