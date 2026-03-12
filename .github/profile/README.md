# FABRKNT

**Infrastructure for compliant, secure, and composable DeFi.**

---

We build modular infrastructure products that make DeFi safer — from compliance and identity to MEV protection, privacy, state optimization, derivatives, and dynamic fees.

## What We're Building

**[fabrknt.com](https://www.fabrknt.com)** — A suite of 7 infrastructure products for DeFi:

### Product Suite

| Product | Purpose |
|---------|---------|
| **Complr** | AI-powered off-chain compliance |
| **Accredit** | On-chain KYC/AML and identity verification |
| **Sentinel** | MEV protection and threat detection |
| **Veil** | Privacy-preserving transactions via ZK compression |
| **Stratum** | State optimization and data availability |
| **Tensor** | Derivatives infrastructure and margin engine |
| **Tempest** | Dynamic fee optimization |

### Complr — Off-Chain Compliance

- **AI-powered review queue** — Automated compliance decisions with confidence scoring
- **External providers** — TRM Labs, Chainalysis integration for risk intelligence
- **Confidence scoring** — Probabilistic risk assessment for every transaction

### Accredit — On-Chain KYC/AML

- **Compliant wrapper** — On-chain identity layer for regulated DeFi
- **Multi-provider KYC** — Civic, World ID integration for flexible verification
- **Institutional dashboard** — Compliance monitoring and reporting for institutions

### Sentinel — MEV Protection & Threat Detection

- **17 pattern detectors** — 8 Solana-specific + 9 EVM-specific threat patterns
- **Simulation sandbox** — Test transactions before submission
- **MEV protection** — Flashbots/MEV-Share (EVM), Jito (Solana)
- **Oracle registry** — Trusted price feed management

### Veil — Privacy Layer

- **@veil/core** — Core privacy primitives via ZK compression
- **Shielded transfers** — Private token transfers with proof generation
- **Encrypted swaps** — Privacy-preserving DEX interactions
- **MCP server** — Model Context Protocol integration for AI-assisted privacy

### Stratum — State Optimization

- **Cranker registry** — Managed crank infrastructure for protocol automation
- **ZK verifier** — On-chain proof verification
- **DA providers** — Celestia, Avail, EigenDA integration for data availability

### Tensor — Derivatives Infrastructure

- **Margin engine** — Cross-margined derivatives positions
- **Vol surface** — Implied volatility surface construction
- **Solver auctions** — Order flow auction mechanism
- **Gamma scaling** — Dynamic hedging and risk management
- **Keeper bots** — Automated liquidation and settlement
- **ZK credit scores** — Privacy-preserving creditworthiness proofs

### Tempest — Dynamic Fees

- **Dynamic fee hook** — Adaptive fee adjustment based on market conditions
- **Keeper fail-safe** — Fallback mechanisms for keeper downtime
- **Dust filter** — Minimum transaction thresholds
- **Momentum boost** — Fee incentives for trend-following liquidity
- **Chain-agnostic** — Deployable across EVM and Solana

## Architecture

Forge is the integration layer that connects all 7 products. It imports real SDK packages via `file:` dependencies:

- `@veil/core` — Privacy primitives
- `@sentinel/core` — Threat detection
- `@stratum/core` — State optimization
- `@accredit/core` — Identity verification

**92 tests** via Vitest · ESLint 9 configured

## Tech Stack

Next.js · React · TypeScript · Tailwind CSS · Vitest · ESLint 9 · Solana · EVM

## Connect

- **Website:** [fabrknt.com](https://www.fabrknt.com)
- **X:** [@fabrknt](https://x.com/fabrknt)

---

*Infrastructure for compliant, secure, and composable DeFi.*
