# Vercel Quick Start Guide

Quick reference for deploying Fabrknt Suite to Vercel.

## 🚀 5-Minute Setup

### 1. Connect Repository (2 minutes)

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select `fabrknt/fabrknt-suite`
4. Click **Import**

### 2. Configure Project (1 minute)

Vercel auto-detects Next.js, but verify:

-   **Framework Preset**: Next.js ✅
-   **Root Directory**: `./` (default)
-   **Build Command**: `pnpm build` (auto-detected)
-   **Output Directory**: `.next` (auto-detected)

### 3. Set Environment Variables (2 minutes)

Go to **Environment Variables** and add:

**Required:**

```
DATABASE_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```

**Set for**: ✅ Production ✅ Preview ✅ Development

### 4. Deploy (Automatic)

Click **Deploy** - Vercel will:

-   Install dependencies (`pnpm install`)
-   Generate Prisma client (`prisma generate`)
-   Build Next.js app (`pnpm build`)
-   Deploy to production

### 5. Configure Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add `www.fabrknt.com`
3. Update DNS:
    - **Type**: CNAME
    - **Name**: www
    - **Value**: cname.vercel-dns.com

---

## ✅ Verification

After deployment, verify:

-   [ ] Build completed successfully
-   [ ] Site loads at Vercel URL
-   [ ] Database connection works
-   [ ] API routes function (`/api/intelligence/search`)
-   [ ] Prisma client generated

---

## 📚 Full Documentation

-   **Migration Guide**: See `VERCEL_MIGRATION.md`
-   **Environment Variables**: See `VERCEL_ENV_VARS.md`

---

## 🆘 Troubleshooting

**Build fails?**

-   Check build logs in Vercel Dashboard
-   Verify `postinstall` script runs `prisma generate`
-   Ensure all environment variables are set

**Database errors?**

-   Verify `DATABASE_URL` is correct
-   Check Supabase connection settings
-   Ensure IP allowlist includes Vercel (or disable restrictions)

**Need help?**

-   Vercel Docs: https://vercel.com/docs
-   Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs

---

**That's it!** Your app should be live on Vercel. 🎉
