# FABRKNT: Insight-Driven DeFi Yield Intelligence

**DeFi insights, not just data.**

**Domain:** [www.fabrknt.com](https://www.fabrknt.com)

---

## What is Fabrknt?

Fabrknt is an **insight-driven** DeFi yield intelligence platform focused on **Solana**. Unlike data-heavy analytics tools built for pros, Fabrknt surfaces the insights you need to make informed decisions—without overwhelming you with raw data.

**Our philosophy:** Insights over data dumps. Guidance over complexity.

---

## Navigation

The app is organized into three main sections:

| Tab | Purpose | What You'll Find |
|-----|---------|------------------|
| **Insights** | "What matters now" | AI picks, curator strategies, yield opportunities, discovery prompts |
| **Explore** | "I want to browse" | Full pool table with filters, search, watchlist |
| **Learn** | "Help me understand" | Protocol comparisons, LST comparisons, IL calculator |

**Mobile:** Bottom tab navigation with hamburger menu for site links.

---

## Core Features

### Insights Tab

#### AI Recommendations
Personalized pool recommendations based on risk-adjusted analysis:
- **Curated picks** for all users (no login required)
- **Personalized recommendations** based on your preferences (requires login)
- Ranked by risk-adjusted returns, not raw APY

#### Curator Strategies
Learn from professional DeFi curators:
- **Gauntlet**, **Steakhouse Financial**, **RE7 Labs** profiles
- View their allocation strategies across protocols
- AI-generated strategy analysis and key takeaways
- Understand how experts approach risk management

#### Yield Opportunities
Cross-protocol arbitrage detection:
- Identify APY spreads between similar pools
- Risk-adjusted spread calculations
- Net spread after estimated transaction costs
- Confidence scoring (high/medium/low)

#### Discovery Prompts
Guided exploration for learning:
- "What's the safest stablecoin yield?"
- "Which pools have sustainable APY?"
- Click to explore and learn

### Explore Tab

#### Pool Table
Comprehensive pool listing with intelligent defaults:
- **Low-risk pools by default** (risk score <= 20)
- APY change alerts (badges when APY drops 20%+ or rises 30%+)
- Filter by protocol, risk level, TVL
- Sort by TVL, APY, risk score
- Watchlist for tracking favorites

#### Pool Comparison
Compare up to 3 pools side-by-side:
- Risk breakdown comparison
- APY sustainability analysis
- Historical performance via backtesting

### Learn Tab

#### Protocol Comparison
Compare major Solana protocols at a glance:
- **Kamino**, **Marginfi**, **Meteora**, **Save**, and more
- Protocol-level TVL, average APY, pool counts
- Click to filter pools by protocol

#### LST Comparison
Deep dive into Solana liquid staking tokens:
- Compare Jito, Marinade, and other LSTs
- MEV yield breakdown and validator decentralization
- Peg stability and instant unstake availability

#### Alternative Yields
Explore advanced yield strategies:
- **Restaking** opportunities
- **Perp LP** positions
- Risk considerations for each type

#### IL Calculator
Impermanent loss estimation:
- Enter price change to see potential IL
- Concentrated liquidity (CLMM) support
- Position simulator with APY projections

---

## AI-Powered Features

### Smart Risk Insights
AI-generated analysis in plain English (requires login):
- Risk explanation and breakdown
- APY sustainability analysis
- Comparison vs. similar pools
- Actionable verdict

### Portfolio Optimizer
AI suggests optimal allocation (requires login):
- Input total amount and risk tolerance
- Get diversified portfolio suggestions
- View expected yields and risk warnings

---

## Risk Scoring

Our composite risk score (0-100) evaluates:

| Factor | Weight | Description |
|--------|--------|-------------|
| TVL Risk | 25% | Liquidity depth and exit-ability |
| APY Sustainability | 25% | Historical volatility and trends |
| IL Risk | 20% | Impermanent loss exposure for LPs |
| Stablecoin Exposure | 15% | Stability of underlying assets |
| Protocol Maturity | 15% | Age, audits, track record |

**Risk Levels:**
- **Low** (0-20): Conservative, stable yields
- **Medium** (21-40): Balanced risk-reward
- **High** (41+): Higher risk, potentially higher returns

---

## Trust & Security

| Principle | Description |
|-----------|-------------|
| **Read-Only** | We never request wallet permissions |
| **Non-Custodial** | Your keys, your funds. We never touch assets |
| **Transparent** | Our methodology is open. See [How It Works](/how-it-works) |

---

## Pages

- **/** — Main app with Insights, Explore, and Learn tabs
- **/tools** — IL Calculator and Position Simulator (full page)
- **/how-it-works** — Methodology and risk scoring explanation
- **/about** — Team and mission

---

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS
- **AI:** Anthropic Claude API
- **Database:** PostgreSQL (Supabase)
- **Hosting:** Vercel
- **Data Sources:** DeFiLlama APIs, on-chain data

---

## Getting Started

### For Users

1. **Start with Insights** — See AI picks and curator strategies
2. **Explore Discovery Prompts** — Learn through guided questions
3. **Browse Pools** — Use Explore tab when ready to dive deeper
4. **Learn** — Compare protocols and understand risks
5. **Sign In** — Unlock personalized AI recommendations

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
- `GET /api/curate/protocols` — Protocol aggregation and comparison
- `GET /api/curate/spreads` — Yield spread opportunities
- `GET /api/curate/curators` — Curator profiles
- `GET /api/curate/curators/{slug}` — Curator strategies and insights

### Authenticated Endpoints

- `GET /api/curate/ai/preferences` — Get user preferences
- `PUT /api/curate/ai/preferences` — Update preferences
- `POST /api/curate/ai/recommendations` — Get AI recommendations
- `GET /api/curate/ai/insights/{poolId}` — Get AI pool insights
- `POST /api/curate/ai/portfolio` — Optimize portfolio

---

## Team

**Hiroyuki Saito** — Founder
Banking & enterprise software background. AWS certified, Stanford blockchain certification. Building at the intersection of institutional finance and DeFi. Based in Tokyo.

- X (Twitter): [@psyto](https://x.com/psyto)
- LinkedIn: [hiroyuki-saito](https://www.linkedin.com/in/hiroyuki-saito/)

---

## Contact & Resources

- **Website:** [www.fabrknt.com](https://www.fabrknt.com)
- **GitHub:** [github.com/fabrknt](https://github.com/fabrknt)
- **X (Twitter):** [@fabrknt](https://x.com/fabrknt)

---

**DeFi insights, not just data.**
