# FABRKNT Platform - Setup Guide

## ✅ Implementation Status (Completed)

### What's Been Implemented

1. **✅ Prisma Database Schema** (`/prisma/schema.prisma`)
   - User model (Web3 wallet-based authentication)
   - ClaimedProfile model (company profile ownership)
   - Swipe model (express interest / pass / saved actions)
   - Match model (mutual interest tracking)
   - Conversation & Message models (real-time messaging)
   - Company model (INDEX verification data)
   - Notification model

2. **✅ Database Client** (`/src/lib/db.ts`)
   - Prisma client singleton
   - Development logging enabled

3. **✅ Seed Script** (`/prisma/seed.ts`)
   - Demo companies with verified INDEX data
   - Growth scores, team health scores, overall scores
   - Realistic on-chain metrics and GitHub data

4. **✅ Web3 Authentication Setup**
   - RainbowKit + Wagmi + Viem installed
   - Wagmi config (`/src/lib/wagmi-config.ts`)
   - Updated providers (`/src/components/providers.tsx`)
   - Auth hook (`/src/lib/hooks/use-auth.ts`)
   - Connect button component (`/src/components/auth/connect-button.tsx`)

5. **✅ Environment Configuration** (`.env.local`)
   - Placeholders for Supabase credentials
   - Placeholders for WalletConnect Project ID
   - Placeholders for Resend API key

---

## 🚀 Next Steps (Action Required)

### Step 1: Create Supabase Project (5 minutes)

1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - **Project name**: `fabrknt-platform` (or your choice)
   - **Database Password**: Choose a strong password (SAVE THIS!)
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
5. Click "Create new project"
6. Wait ~2 minutes for provisioning

### Step 2: Get Supabase Credentials (2 minutes)

Once your project is ready:

1. **Database URL**:
   - Go to Settings → Database
   - Under "Connection string" → "URI", copy the connection string
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
   - **Replace `[YOUR-PASSWORD]` with your actual password**

2. **Supabase API Keys**:
   - Go to Settings → API
   - Copy:
     - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
     - **anon public** key
     - **service_role** key (keep this secret!)

3. **Update `.env.local`**:
   ```bash
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

### Step 3: Run Database Migration (2 minutes)

```bash
# Generate Prisma client
pnpm prisma generate

# Run migration (creates all tables)
pnpm prisma migrate dev --name init

# Seed database with demo companies
pnpm prisma db seed
```

Expected output:
```
✅ Created demo companies with verified INDEX data
✅ Generated realistic metrics and scores
🎉 Database seeded successfully!
```

### Step 4: Get WalletConnect Project ID (3 minutes)

1. Go to https://cloud.walletconnect.com
2. Sign up / Log in
3. Click "Create New Project"
4. Fill in:
   - **Project name**: `FABRKNT Platform`
   - **Homepage URL**: `http://localhost:3000` (change later for production)
5. Copy the **Project ID**
6. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-project-id-here"
   ```

### Step 5: Test the Setup (1 minute)

```bash
# Start dev server
pnpm dev
```

1. Open http://localhost:3000
2. You should see the existing platform
3. **Web3 wallet connect button will be ready** (add to header in next step)

---

## 📋 Verification Checklist

Before proceeding to Phase 2:

- [ ] Supabase project created
- [ ] DATABASE_URL in `.env.local` (with real credentials)
- [ ] NEXT_PUBLIC_SUPABASE_URL in `.env.local`
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY in `.env.local`
- [ ] SUPABASE_SERVICE_ROLE_KEY in `.env.local`
- [ ] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in `.env.local`
- [ ] `pnpm prisma migrate dev` ran successfully
- [ ] `pnpm prisma db seed` ran successfully
- [ ] Dev server starts without errors (`pnpm dev`)

---

## ✅ Platform Features (Implemented)

The FABRKNT platform includes:

1. **INDEX** - Web3 Company Verification
   - Automated verification of on-chain data, GitHub activity, and social metrics
   - Company directory with verified scores
   - Growth Score, Team Health Score, Overall Score (0-100)

2. **SYNERGY** - Professional Partnership Discovery
   - AI-powered compatibility analysis and recommendations
   - Professional discovery grid with filtering and search
   - Express interest, pass, or save opportunities
   - Real-time messaging between matched companies
   - Connection management and partnership tracking

3. **Authentication & Profile Management**
   - Web3 wallet-based authentication (RainbowKit)
   - Claim and manage company profiles
   - View companies interested in connecting with you

---

## 🔧 Optional: Vercel Deployment (5 minutes)

To deploy to production:

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Import Project"
4. Select your `fabrknt-suite` repository
5. Framework preset: **Next.js** (auto-detected)
6. Add environment variables:
   - Copy all from `.env.local`
   - **Important**: Add `DATABASE_URL` and all Supabase keys
7. Click "Deploy"

Vercel will:
- Auto-deploy on every push to `main`
- Provide preview deployments for PRs
- Give you a production URL (e.g., `fabrknt-match.vercel.app`)

---

## 🐛 Troubleshooting

### "Environment variable not found: DATABASE_URL"
- Make sure `.env.local` exists in project root
- Restart dev server after changing `.env.local`

### Prisma migration fails
- Check DATABASE_URL is correct
- Ensure Supabase project is fully provisioned
- Try: `pnpm prisma migrate reset` (⚠️ deletes all data)

### WalletConnect doesn't work
- Ensure NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is set
- Restart dev server
- Clear browser cache

### Seed script fails
- Run `pnpm prisma generate` first
- Check database is empty (or reset with `pnpm prisma migrate reset`)

---

## 📞 Support

If you encounter issues:
1. Check the [Prisma docs](https://www.prisma.io/docs)
2. Check the [Supabase docs](https://supabase.com/docs)
3. Check the [RainbowKit docs](https://www.rainbowkit.com)

---

**Status**: ✅ FABRKNT Platform Complete - Professional Discovery & Messaging Implemented

**Last Updated**: 2026-01-04

**Current Features**:
- INDEX: Web3 Company Verification with automated scoring
- SYNERGY: AI-powered partnership discovery with professional grid UI
- Real-time messaging between matched companies
- Wallet-based authentication and profile claiming
