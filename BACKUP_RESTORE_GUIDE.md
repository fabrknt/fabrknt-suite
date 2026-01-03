# Backup & Restore Guide
## How to Revert to Stable Version

**Created:** January 3, 2026
**Backup Tag:** `v1.0-index-synergy`
**Feature Branch:** `feature/partnership-matching`

---

## ✅ What Was Backed Up

**Stable version tagged as `v1.0-index-synergy` includes:**

### Working Features:
- ✅ INDEX: 23 companies with auto-generated profiles
- ✅ SYNERGY: Partnership detection and analysis
- ✅ Data collection: On-chain (Ethereum + Solana), GitHub, Twitter
- ✅ DefiLlama integration for DeFi TVL data
- ✅ Automated scoring and analysis
- ✅ LLM-powered partnership detection (Gemini 2.0 Flash)

### Files Included:
- `src/lib/api/defillama.ts` - DefiLlama integration
- `src/lib/api/solana.ts` - Solana on-chain metrics
- `src/lib/cindex/company-configs.ts` - 23 companies configured
- `src/lib/cindex/calculators/score-calculator.ts` - Score calculation
- All strategy documents (STRATEGY_SUMMARY.md, etc.)

---

## 🔄 Current State

**You are now on:** `feature/partnership-matching` branch
**Safe to experiment!** All new Tinder-like features will be added here.

```bash
# Check current branch
git branch
# Output: * feature/partnership-matching
```

---

## 🔙 How to Restore Stable Version

### Option 1: View Stable Version (Read-Only)

```bash
# Checkout the tag (detached HEAD state)
git checkout v1.0-index-synergy

# Now you're viewing the stable version
# You can browse files, run the app, etc.
# But don't make changes here!

# To go back to feature branch:
git checkout feature/partnership-matching
```

---

### Option 2: Create New Branch from Stable Version

```bash
# Create a new branch from the stable tag
git checkout -b restore-stable v1.0-index-synergy

# Now you have a new branch with the stable code
# You can make changes, commit, etc.

# Push it to remote if needed:
git push -u origin restore-stable
```

---

### Option 3: Completely Revert main Branch to Stable

**⚠️ Warning: This will discard all changes on main branch!**

```bash
# Switch to main branch
git checkout main

# Reset to the tagged version (DESTRUCTIVE!)
git reset --hard v1.0-index-synergy

# Force push to remote (if needed)
git push --force origin main
```

**Only do this if you want to permanently discard new features!**

---

### Option 4: Keep Both Versions Side-by-Side

```bash
# Option A: Keep feature branch AND stable branch
git checkout -b stable v1.0-index-synergy
git checkout feature/partnership-matching

# Now you have:
# - stable: The old version
# - feature/partnership-matching: New features
# - main: Original main branch

# Option B: Compare the two versions
git diff v1.0-index-synergy feature/partnership-matching
```

---

## 📊 Branch Structure

```
main (original)
│
├─ v1.0-index-synergy (TAG) ← Stable backup
│
└─ feature/partnership-matching (BRANCH) ← New work happens here
    ├─ Add user auth
    ├─ Add profile claiming
    ├─ Add Tinder-like UI
    └─ Add matching algorithm
```

---

## 🚀 Continue Working on New Features

```bash
# Make sure you're on the feature branch
git checkout feature/partnership-matching

# Make changes, commit as usual
git add .
git commit -m "Add user authentication"
git push origin feature/partnership-matching

# When ready to merge to main:
git checkout main
git merge feature/partnership-matching
git push origin main
```

---

## 🔍 View All Backups

```bash
# See all tags
git tag -l

# See tag details
git show v1.0-index-synergy

# See all branches
git branch -a
```

---

## 💾 Additional Backup Options

### Create a Local Zip Backup

```bash
# From parent directory
cd /Users/hiroyusai/src/fabrknt

# Create a zip backup
tar -czf fabrknt-suite-backup-v1.0.tar.gz fabrknt-suite/

# Restore from zip later:
tar -xzf fabrknt-suite-backup-v1.0.tar.gz
```

### View Backup on GitHub

Your backup is also stored on GitHub:
- Tag: https://github.com/fabrknt/fabrknt-suite/releases/tag/v1.0-index-synergy
- Branch: https://github.com/fabrknt/fabrknt-suite/tree/feature/partnership-matching

---

## 📝 Summary

**Backup created:**
- ✅ Tag: `v1.0-index-synergy` (stable version snapshot)
- ✅ Branch: `feature/partnership-matching` (for new work)
- ✅ Pushed to GitHub (safe in cloud)

**How to restore:**
- Quick view: `git checkout v1.0-index-synergy`
- Create branch: `git checkout -b restore v1.0-index-synergy`
- Full revert: `git reset --hard v1.0-index-synergy`

**Current status:**
- You're on `feature/partnership-matching` branch
- Safe to build new features
- Original code is safe in tag `v1.0-index-synergy`

---

**You're all set! Build the Tinder-like features without fear! 🚀**
