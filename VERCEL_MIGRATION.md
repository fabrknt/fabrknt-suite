# Migration Guide: AWS Amplify → Vercel

This guide will help you migrate your Fabrknt Suite deployment from AWS Amplify to Vercel.

## Why Migrate to Vercel?

-   ✅ **Better Next.js Integration**: Vercel is built by the Next.js team, offering seamless integration
-   ✅ **Faster Builds**: Optimized build pipeline and edge caching
-   ✅ **Better Developer Experience**: Simpler configuration and deployment process
-   ✅ **Automatic Prisma Support**: Built-in support for Prisma migrations
-   ✅ **Edge Functions**: Better performance with edge computing
-   ✅ **Free Tier**: Generous free tier for development and small projects

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com (free)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Environment Variables**: List of all environment variables from Amplify

## Migration Steps

### Step 1: Export Environment Variables from Amplify

1. Go to AWS Amplify Console
2. Select your app
3. Go to **App settings** → **Environment variables**
4. Copy all environment variables (you'll need these for Vercel)

### Step 2: Install Vercel CLI (Optional but Recommended)

```bash
npm i -g vercel
# or
pnpm add -g vercel
```

### Step 3: Connect Repository to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository (`fabrknt/fabrknt-suite`)
4. Vercel will auto-detect Next.js configuration

#### Option B: Via CLI

```bash
cd /path/to/fabrknt-suite
vercel login
vercel link
```

### Step 4: Configure Project Settings

In Vercel Dashboard → Project Settings:

1. **Framework Preset**: Next.js (auto-detected)
2. **Build Command**: `pnpm build` (already configured in `vercel.json`)
3. **Output Directory**: `.next` (default)
4. **Install Command**: `corepack enable && corepack prepare pnpm@latest --activate && pnpm install` (already configured)

### Step 5: Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

Add all environment variables from Amplify. Key variables to include:

#### Required Database Variables

```
DATABASE_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres
```

#### Required Supabase Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Required WalletConnect

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```

#### Optional API Keys (if used)

```
GITHUB_TOKEN=your-github-token
TWITTER_BEARER_TOKEN=your-twitter-token
ALCHEMY_API_KEY=your-alchemy-key
HELIUS_API_KEY=your-helius-key
DUNE_API_KEY=your-dune-key
NANSEN_API_KEY=your-nansen-key
```

**Important**: Set environment variables for all environments:

-   **Production**
-   **Preview** (for PR previews)
-   **Development** (for local development)

### Step 6: Configure Prisma for Vercel

Vercel automatically handles Prisma, but ensure:

1. **Post-install Hook**: Add to `package.json`:

```json
{
    "scripts": {
        "postinstall": "prisma generate"
    }
}
```

2. **Prisma Schema**: Ensure `prisma/schema.prisma` is in the repository root

3. **Database Migrations**: Run migrations before first deployment:

```bash
# Locally or via Vercel CLI
pnpm prisma migrate deploy
```

### Step 7: Deploy to Vercel

#### First Deployment

```bash
vercel --prod
```

Or push to your main branch (if auto-deployment is enabled):

```bash
git push origin main
```

### Step 8: Configure Custom Domain

1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your domain: `www.fabrknt.com`
3. Follow DNS configuration instructions
4. Update DNS records:
    - **Type**: CNAME
    - **Name**: www
    - **Value**: cname.vercel-dns.com

### Step 9: Verify Deployment

1. ✅ Check build logs in Vercel Dashboard
2. ✅ Verify environment variables are set correctly
3. ✅ Test API routes: `/api/index/search`
4. ✅ Test database connections
5. ✅ Verify Prisma client generation

### Step 10: Update DNS (After Verification)

Once verified on Vercel:

1. Update DNS records to point to Vercel
2. Wait for DNS propagation (can take up to 48 hours)
3. SSL certificates are automatically provisioned by Vercel

## Post-Migration Checklist

-   [ ] All environment variables migrated
-   [ ] Database connections working
-   [ ] API routes functioning
-   [ ] Prisma migrations applied
-   [ ] Custom domain configured
-   [ ] SSL certificate active
-   [ ] Build times acceptable
-   [ ] Performance metrics reviewed

## Rollback Plan

If you need to rollback to Amplify:

1. Keep Amplify deployment active during migration
2. Update DNS back to Amplify CNAME
3. Re-enable Amplify auto-deployments

## Differences: Amplify vs Vercel

| Feature         | Amplify       | Vercel                            |
| --------------- | ------------- | --------------------------------- |
| Build Time      | ~5-10 min     | ~2-5 min                          |
| Next.js Support | Good          | Excellent (built by Next.js team) |
| Prisma Support  | Manual setup  | Automatic                         |
| Edge Functions  | Limited       | Excellent                         |
| Free Tier       | Limited       | Generous                          |
| Configuration   | `amplify.yml` | `vercel.json` (optional)          |

## Troubleshooting

### Build Fails: Prisma Client Not Generated

**Solution**: Ensure `postinstall` script runs Prisma generate:

```json
{
    "scripts": {
        "postinstall": "prisma generate"
    }
}
```

### Build Fails: pnpm Not Found

**Solution**: Vercel auto-detects pnpm, but ensure `package.json` has:

```json
{
    "packageManager": "pnpm@8.x.x"
}
```

### Database Connection Errors

**Solution**:

1. Verify `DATABASE_URL` is set correctly
2. Check Supabase connection pooling settings
3. Ensure IP allowlist includes Vercel IPs (or disable IP restrictions)

### Environment Variables Not Loading

**Solution**:

1. Verify variables are set for correct environment (Production/Preview)
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

## Support

-   **Vercel Docs**: https://vercel.com/docs
-   **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
-   **Prisma on Vercel**: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel

## Next Steps After Migration

1. ✅ Monitor build times and performance
2. ✅ Set up Vercel Analytics (optional)
3. ✅ Configure preview deployments for PRs
4. ✅ Set up monitoring and alerts
5. ✅ Update documentation and README

---

**Migration Date**: **\*\***\_**\*\***  
**Migrated By**: **\*\***\_**\*\***  
**Status**: ✅ Complete / ⚠️ In Progress
