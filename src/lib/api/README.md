# API Layer — FABRKNT Forge

This directory contains the API layer for Forge, the integration hub that connects the FABRKNT product suite.

## Overview

Forge serves as the orchestration layer for 7 infrastructure products. The API layer handles cross-product communication, SDK imports, and external service integrations.

### Product Integrations

| Product | SDK Import | API Surface |
|---------|-----------|-------------|
| **Complr** | Internal | Compliance review queue, confidence scoring, provider routing (TRM Labs, Chainalysis) |
| **Accredit** | `@fabrknt/accredit-core` | KYC verification (Civic, World ID), compliant wrapper, institutional dashboard |
| **Sentinel** | `@fabrknt/sentinel-core` | 17 pattern detectors (8 Solana + 9 EVM), simulation sandbox, Flashbots/MEV-Share, Jito, oracle registry |
| **Veil** | `@fabrknt/veil-core` | ZK compression, shielded transfers, encrypted swaps, MCP server |
| **Stratum** | `@fabrknt/stratum-core` | Cranker registry, ZK verifier, DA providers (Celestia, Avail, EigenDA) |
| **Tensor** | Internal | Margin engine, vol surface, solver auctions, gamma scaling, keeper bots, ZK credit scores |
| **Tempest** | Internal | Dynamic fee hook, keeper fail-safe, dust filter, momentum boost |

### SDK Imports

Forge imports real SDK packages via `file:` dependencies in `package.json`:

```typescript
import { /* ... */ } from "@fabrknt/veil-core";
import { /* ... */ } from "@fabrknt/sentinel-core";
import { /* ... */ } from "@fabrknt/stratum-core";
import { /* ... */ } from "@fabrknt/accredit-core";
```

Products without dedicated SDK packages (Complr, Tensor, Tempest) are integrated directly within Forge's internal modules.

## Endpoints

### Compliance (Complr)

- Review queue management — submit, approve, reject compliance cases
- Confidence scoring — AI-powered risk assessment per transaction
- Provider routing — fan out to TRM Labs, Chainalysis for risk intelligence

### Identity (Accredit)

- KYC verification — multi-provider identity checks (Civic, World ID)
- Compliant wrapper — on-chain identity attestation
- Institutional dashboard — aggregate compliance reporting

### Threat Detection (Sentinel)

- Pattern detection — 17 detectors across Solana and EVM
- Simulation sandbox — pre-flight transaction analysis
- MEV protection — Flashbots/MEV-Share (EVM), Jito (Solana)
- Oracle registry — trusted price feed validation

### Privacy (Veil)

- Shielded transfers — ZK-compressed private transfers
- Encrypted swaps — privacy-preserving DEX interactions
- MCP server — Model Context Protocol for AI-assisted privacy workflows

### State & DA (Stratum)

- Cranker registry — register and manage crank operators
- ZK verifier — submit and verify on-chain proofs
- DA providers — post/retrieve data via Celestia, Avail, EigenDA

### Derivatives (Tensor)

- Margin engine — open/close cross-margined positions
- Vol surface — implied volatility surface queries
- Solver auctions — order flow auction submission
- Gamma scaling — dynamic hedging parameters
- Keeper bots — liquidation and settlement automation
- ZK credit scores — privacy-preserving creditworthiness

### Dynamic Fees (Tempest)

- Fee hook — adaptive fee calculation based on market conditions
- Keeper fail-safe — fallback fee logic during keeper downtime
- Dust filter — minimum transaction size enforcement
- Momentum boost — fee incentives for directional liquidity

## Setup

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure required API keys for external providers (TRM Labs, Chainalysis, Civic, World ID, etc.) as needed per product.

### RPC Configuration

#### Solana RPC

- **Default:** Public endpoints (rate-limited)
- **Recommended:** Helius — set `HELIUS_API_KEY` in `.env.local`
- **Custom:** Set `SOLANA_RPC_URL` for any Solana RPC endpoint

#### EVM RPC

- **Default:** Public endpoints (LlamaRPC, Ankr, PublicNode)
- **Recommended:** Alchemy — set `ALCHEMY_API_KEY` in `.env.local`
- **Custom:** Set `ETHEREUM_RPC_URL` for any EVM RPC endpoint

## Testing

Forge has **92 tests** using Vitest:

```bash
pnpm test        # Run all tests
pnpm test:watch  # Watch mode
```

## Linting

ESLint 9 is configured:

```bash
pnpm lint        # Run linter
```

## Troubleshooting

### RPC Errors

- **Solana public RPC** — Very low rate limits (429 errors common). Use Helius for better reliability.
- **EVM public RPC** — May hit rate limits. Use Alchemy or a paid provider.
- Verify API keys are set correctly in `.env.local`.

### SDK Import Errors

- Ensure `file:` dependencies are installed: run `pnpm install` from the workspace root.
- SDK packages (`@fabrknt/veil-core`, `@fabrknt/sentinel-core`, `@fabrknt/stratum-core`, `@fabrknt/accredit-core`) must be built before Forge can import them.
