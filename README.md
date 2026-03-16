# Forge

The reference app showing all 7 Fabrknt services plugged into a working DeFi protocol -- personalized Solana yield allocations with compliance, privacy, and data integrity built in.

**Get your personalized yield allocation in 30 seconds, executed safely with plug-in compliance and privacy.**

## What is Forge?

Forge demonstrates the core Fabrknt thesis: you shouldn't have to rebuild from scratch to add TradFi compliance to a DeFi protocol. Forge is a Solana yield allocation app with all 7 `@fabrknt/*-core` npm packages plugged in for compliance screening, identity verification, transaction security, margin management, dynamic fees, private execution, and verifiable allocation proofs.

**Try → Track → Trust → Trade**

| Step | What Happens | Powered By |
|------|-------------|------------|
| **Try** | Get personalized allocation in 30 seconds | AI + Complr screening |
| **Track** | Paper Portfolio Dashboard monitors performance | Stratum proofs |
| **Trust** | 14+ days of tracking builds confidence | Veil encrypted history |
| **Trade** | Execute with guard rails and MEV protection | Sentinel + Accredit |

## Fabrknt SDK Integrations

Forge plugs in all 7 Fabrknt products via their npm packages. Each integration lives in `src/lib/fabrknt/` and is exposed via `/api/fabrknt/*` endpoints.

| Product | npm Package | Integration | What it does in Forge |
|---------|-------------|-------------|----------------------|
| **Sentinel** | `@fabrknt/sentinel-core` | `sentinel.ts` | Guard validates transactions with 17 pattern detectors (8 Solana + 9 EVM). DCA/rebalance/grid pattern builders. Jito + Flashbots bundle management for MEV protection. |
| **Complr** | `@fabrknt/complr-core` | `compliance.ts` | AI-powered screening (OFAC, TRM Labs, Chainalysis). Multi-jurisdiction checks (MAS/SFC/FSA). Confidence scoring. Human-in-the-loop review queue. |
| **Accredit** | `@fabrknt/accredit-core` | `identity.ts` | On-chain KYC via Token-2022 transfer hooks. Multi-provider KYC (Civic, World ID). Sovereign identity verification. |
| **Veil** | `@fabrknt/veil-core` | `privacy.ts` | NaCl Box encryption for allocation data. Shamir secret sharing for M-of-N access control. Noir ZK proofs for private sharing. |
| **Stratum** | `@fabrknt/stratum-core` | `data.ts` | Merkle tree proofs for verifiable allocation history. Bitfield tracking for efficient pool state management. 800x state reduction. |
| **Tensor** | `@fabrknt/tensor-core` | `margin.ts` | Greeks-aware portfolio margining for leveraged yield positions. Vol surface interpolation. Intent-based execution. |
| **Tempest** | `@fabrknt/tempest-core` | `fees.ts` | Volatility-responsive dynamic fees for pool swaps. LP range optimization. Impermanent loss estimation. |

### Integration Architecture

```
User Request
    │
    ├── /api/curate/ai/recommendations
    │       ├── AI yield advisor (Claude)
    │       └── @fabrknt/complr-core: screen pools before recommending
    │
    ├── /api/fabrknt/guard
    │       └── @fabrknt/sentinel-core: validate transaction security (17 patterns)
    │
    ├── /api/fabrknt/dca
    │       └── @fabrknt/sentinel-core: build DCA schedule for gradual entry
    │
    ├── /api/fabrknt/rebalance
    │       ├── @fabrknt/sentinel-core: generate concrete rebalance trades
    │       └── @fabrknt/complr-core: screen trades for compliance
    │
    ├── /api/fabrknt/screen-wallet
    │       └── @fabrknt/complr-core: sanctions/risk screening
    │
    ├── /api/fabrknt/verify-identity
    │       └── @fabrknt/accredit-core: KYC level + feature gating
    │
    ├── /api/fabrknt/margin
    │       └── @fabrknt/tensor-core: portfolio margin + risk analysis
    │
    ├── /api/fabrknt/fees
    │       └── @fabrknt/tempest-core: dynamic fee estimation + LP optimization
    │
    └── /api/fabrknt/tip
            └── @fabrknt/sentinel-core: Jito tip for MEV protection
```

### Rebalance Detector

The rebalance detector (`src/lib/curate/rebalance-detector.ts`) combines Forge's own APY/risk monitoring with:

- **@fabrknt/complr-core** `checkAllocationCompliance()` -- flags unverified protocols and concentration risk
- **@fabrknt/sentinel-core** `buildRebalancePlan()` -- generates actionable trade lists when rebalancing is needed

## Core Features

### Get Started
- Enter investment amount and risk tolerance (Preserver → Maximizer)
- Get personalized pool recommendations with expected yields
- Paper Portfolio Dashboard tracks performance over time

### Insights
- Rebalance alerts with compliance screening
- Curator strategies (Gauntlet, Steakhouse, RE7)
- Six curation principles for yield selection

### Explore
- Browse pools with filtering by protocol, risk, TVL
- APY change alerts and watchlists
- Pool comparison and historical backtesting

### Practice
- Strategy Builder with A-F grading
- Scenario Simulator (crash, correction, bull run, depeg)
- Import your allocation with one click

### Compare
- Your allocation vs professional curators
- Protocol/LST comparison tools
- Yield spreads and IL calculator

## API Endpoints

### Fabrknt Integration (`/api/fabrknt/*`)

| Endpoint | Method | SDK | Description |
|----------|--------|-----|-------------|
| `/api/fabrknt` | GET | — | Integration status dashboard |
| `/api/fabrknt/guard` | POST | Sentinel | Validate transaction for 17 security patterns |
| `/api/fabrknt/dca` | POST | Sentinel | Build DCA execution schedule |
| `/api/fabrknt/rebalance` | POST | Sentinel + Complr | Generate rebalance trades with compliance check |
| `/api/fabrknt/tip` | GET | Sentinel | Jito tip account for MEV protection |
| `/api/fabrknt/screen-wallet` | POST | Complr | Wallet sanctions/risk screening |
| `/api/fabrknt/verify-identity` | POST | Accredit | KYC verification + feature access check |
| `/api/fabrknt/margin` | POST | Tensor | Portfolio margin calculation + risk analysis |
| `/api/fabrknt/fees` | POST | Tempest | Dynamic fee estimation + LP range optimization |

### Curate (`/api/curate/*`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/curate/defi` | GET | Yield pools with risk scoring |
| `/api/curate/defi/history/{poolId}` | GET | Historical APY data |
| `/api/curate/protocols` | GET | Protocol comparison |
| `/api/curate/spreads` | GET | Yield spread opportunities |
| `/api/curate/curators` | GET | Curator profiles |
| `/api/curate/curators/{slug}` | GET | Curator strategies |
| `/api/curate/backtest` | POST | Historical performance backtesting |
| `/api/curate/ai/recommendations` | POST | AI recommendations (with @fabrknt/complr-core screening) |
| `/api/curate/ai/insights/{poolId}` | GET | AI pool analysis |
| `/api/curate/ai/portfolio` | POST | Portfolio optimization |

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS
- **AI:** Anthropic Claude API
- **Database:** PostgreSQL (Supabase) via Prisma
- **Hosting:** Vercel
- **Data Sources:** DeFiLlama, Fragmetric, Jupiter, on-chain data
- **Fabrknt SDKs:** All 7 -- `@fabrknt/sentinel-core`, `@fabrknt/complr-core`, `@fabrknt/accredit-core`, `@fabrknt/veil-core`, `@fabrknt/stratum-core`, `@fabrknt/tensor-core`, `@fabrknt/tempest-core`

## Development

```bash
pnpm install
cp .env.example .env.local
pnpm dev        # http://localhost:3000
pnpm type-check
pnpm build
```

### Environment Variables

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Fabrknt Product Suite

All 7 products are available as npm packages (`@fabrknt/*-core@1.0.0`). Free tier on all, Pro from $49/mo. Source and REST API live in [fabrknt/api](https://github.com/fabrknt/api).

### Compliance

| Product | npm Package | What it does in Forge |
|---------|-------------|----------------------|
| **Complr** | `@fabrknt/complr-core` | AI-powered screening (OFAC, TRM Labs, Chainalysis). SAR/STR generation. Confidence scoring. |
| **Accredit** | `@fabrknt/accredit-core` | On-chain KYC via transfer hooks. Multi-provider verification (Civic, World ID). Sovereign identity. |
| **Sentinel** | `@fabrknt/sentinel-core` | Guards transactions with 17-pattern detection. Simulation sandbox. DCA/rebalance/grid builders. Jito + Flashbots bundles. |

### Privacy

| Product | npm Package | What it does in Forge |
|---------|-------------|----------------------|
| **Veil** | `@fabrknt/veil-core` | NaCl encryption for allocation data. Shamir sharing for access control. Noir ZK proofs. |

### Data

| Product | npm Package | What it does in Forge |
|---------|-------------|----------------------|
| **Stratum** | `@fabrknt/stratum-core` | Merkle proofs for verifiable allocation history. Bitfield for pool state tracking. 800x state reduction. |

### DeFi

| Product | npm Package | What it does in Forge |
|---------|-------------|----------------------|
| **Tensor** | `@fabrknt/tensor-core` | Greeks-aware portfolio margining. Vol surface interpolation. Intent-based execution with solver auctions. |
| **Tempest** | `@fabrknt/tempest-core` | Volatility-responsive dynamic fees. LP range optimization. Impermanent loss estimation. |

## License

MIT
