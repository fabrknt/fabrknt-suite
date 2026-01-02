# Environment Variables for Vercel Deployment

This document lists all environment variables needed for Vercel deployment.

## Required Environment Variables

### Database Connection

```bash
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Where to get**: Supabase Dashboard → Settings → Database → Connection string (URI)

---

### Supabase Configuration

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-public-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
```

**Where to get**: Supabase Dashboard → Settings → API

---

### WalletConnect

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=[your-project-id]
```

**Where to get**: https://cloud.walletconnect.com → Create Project → Copy Project ID

---

## Optional Environment Variables

### GitHub API (for Intelligence features)

```bash
GITHUB_TOKEN=[your-github-token]
```

**Where to get**: https://github.com/settings/tokens → Generate new token (classic) → Select `public_repo` scope

---

### Twitter API (for Intelligence features)

```bash
TWITTER_BEARER_TOKEN=[your-bearer-token]
```

**Where to get**: https://developer.twitter.com/en/portal/dashboard → Create app → Get Bearer Token

---

### Ethereum RPC (Optional - uses public endpoints by default)

```bash
ALCHEMY_API_KEY=[your-alchemy-key]
# OR
ETHEREUM_RPC_URL=https://rpc.ankr.com/eth
```

**Where to get**:

-   Alchemy: https://www.alchemy.com/ → Create app → Copy API key
-   Or use public RPC (no key needed)

---

### Solana RPC (Optional - uses public endpoints by default)

```bash
HELIUS_API_KEY=[your-helius-key]
# OR
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

**Where to get**:

-   Helius: https://www.helius.dev/ → Create account → Get API key (free tier available)
-   Or use public RPC (no key needed, but has rate limits)

---

### Dune Analytics (Optional - RPC metrics work fine)

```bash
DUNE_API_KEY=[your-dune-key]
```

**Note**: Dune queries require manual creation on dune.com. RPC metrics are sufficient for most use cases.

**Where to get**: https://dune.com/settings/api → Create API key

---

### Nansen (Optional - requires paid plan)

```bash
NANSEN_API_KEY=[your-nansen-key]
```

**Where to get**: https://www.nansen.ai/ → Get API access (paid plan required)

---

## Setting Environment Variables in Vercel

### Via Dashboard

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable:
    - **Key**: Variable name (e.g., `DATABASE_URL`)
    - **Value**: Variable value
    - **Environment**: Select which environments to apply to:
        - ✅ Production
        - ✅ Preview (for PR previews)
        - ✅ Development (for local development)

### Via CLI

```bash
# Set for production
vercel env add DATABASE_URL production

# Set for all environments
vercel env add DATABASE_URL

# List all environment variables
vercel env ls
```

---

## Environment-Specific Configuration

### Production

Set all required variables for production environment.

### Preview (PR Deployments)

Use the same variables as production, or create separate test credentials.

### Development (Local)

For local development, use `.env.local` file:

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local with your values
```

---

## Security Best Practices

1. ✅ **Never commit** `.env.local` or `.env` files to git
2. ✅ **Use Vercel's environment variables** for production secrets
3. ✅ **Rotate keys regularly** (especially API keys)
4. ✅ **Use different credentials** for development and production
5. ✅ **Restrict API key permissions** to minimum required scopes

---

## Verification Checklist

Before deploying, ensure:

-   [ ] `DATABASE_URL` is set correctly
-   [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
-   [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
-   [ ] `SUPABASE_SERVICE_ROLE_KEY` is set (keep secret!)
-   [ ] `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set
-   [ ] Optional API keys are set if using those features
-   [ ] All variables are set for correct environments (Production/Preview/Development)

---

## Troubleshooting

### "Database connection failed"

-   Verify `DATABASE_URL` is correct
-   Check Supabase connection pooling settings
-   Ensure Supabase allows connections from Vercel IPs (or disable IP restrictions)

### "Environment variable not found"

-   Verify variable name matches exactly (case-sensitive)
-   Check that variable is set for correct environment
-   Redeploy after adding variables

### "Prisma client not generated"

-   Ensure `postinstall` script runs `prisma generate` (already configured in `package.json`)
-   Check build logs for Prisma generation errors

---

## Quick Reference

| Variable                               | Required    | Environment | Purpose                           |
| -------------------------------------- | ----------- | ----------- | --------------------------------- |
| `DATABASE_URL`                         | ✅ Yes      | All         | PostgreSQL connection string      |
| `NEXT_PUBLIC_SUPABASE_URL`             | ✅ Yes      | All         | Supabase project URL              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`        | ✅ Yes      | All         | Supabase public key               |
| `SUPABASE_SERVICE_ROLE_KEY`            | ✅ Yes      | All         | Supabase admin key (secret)       |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | ✅ Yes      | All         | WalletConnect project ID          |
| `GITHUB_TOKEN`                         | ⚠️ Optional | Production  | GitHub API access                 |
| `TWITTER_BEARER_TOKEN`                 | ⚠️ Optional | Production  | Twitter API access                |
| `ALCHEMY_API_KEY`                      | ⚠️ Optional | Production  | Ethereum RPC (better rate limits) |
| `HELIUS_API_KEY`                       | ⚠️ Optional | Production  | Solana RPC (better rate limits)   |
| `DUNE_API_KEY`                         | ⚠️ Optional | Production  | Dune Analytics (if using)         |
| `NANSEN_API_KEY`                       | ⚠️ Optional | Production  | Nansen API (if using)             |

---

**Last Updated**: Migration to Vercel  
**Next Review**: After first deployment
