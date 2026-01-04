# FABRKNT Rebranding Suggestions

**Status**: ✅ **COMPLETED** (2026-01-04)

All suggested rebranding changes have been successfully implemented across the platform.

---

## Core Brand Elements

### Current State
- **Product Name**: FABRKNT Suite / Fabrknt Suite (inconsistent capitalization)
- **Components**: Index (verification) + Synergy (partnerships)
- **Terminology**: Mix of "partnerships", "synergy", "connections"

### Proposed Updates
- **Product Name**: **FABRKNT** (all caps, clean)
- **Components**:
  - **Index** - Verify companies with real data
  - **Synergy** - Discover and connect with verified companies
- **Terminology**:
  - Use "synergy" or "connections" instead of "partnerships"
  - "Express interest" instead of "swipe right"
  - "Connections" instead of "matches"
  - "Discover" instead of "browse" or "swipe"

---

## Page-by-Page Updates

### 1. Landing Page (src/app/page.tsx)

#### Hero Section
**CURRENT:**
```
Verify Web3. Before You Trust It.
Pitch decks lie. On-chain data doesn't.

FABRKNT helps Web3 Corp Dev teams, investors, and founders verify
companies using real on-chain activity, GitHub signals, and social
data — fully automated, no self-reporting.
```

**PROPOSED:**
```
Verify Web3. Discover Synergy.

Pitch decks lie. On-chain data doesn't.

FABRKNT helps Web3 teams make confident decisions with verified
company data and AI-powered synergy discovery — no self-reporting,
just real signals.
```

**REASONING:**
- Adds "Discover Synergy" to include both products
- "Web3 teams" is cleaner than listing all roles
- "Confident decisions" emphasizes outcome
- "AI-powered synergy discovery" positions Synergy as smart, not random

---

#### Stats Section
**CURRENT:**
```
Built for people who make irreversible decisions
```

**PROPOSED:**
```
Built for teams making million-dollar decisions
```

**REASONING:** More specific, emphasizes stakes

---

#### Index Section
**CURRENT:**
```
Verify Before You Trust

The Web3 Index ranks companies by what matters: on-chain TVL,
GitHub commits, wallet quality, social reach—not promises.
```

**PROPOSED:**
```
Index: Verify Before You Trust

Rank companies by what matters: on-chain TVL, GitHub commits,
wallet quality, and social signals—not promises.
```

**REASONING:**
- Add "Index:" label for clarity
- "Social signals" instead of "social reach" (more professional)

---

#### Synergy Section
**CURRENT:**
```
Quiet M&A & Partnerships

Discover acquisition targets and partnership opportunities —
without broadcasting intent.
```

**PROPOSED:**
```
Synergy: Discover Verified Connections

Find acquisition targets, integration partners, and strategic
opportunities—quietly, using verified data.
```

**REASONING:**
- "Synergy:" label for consistency
- "Verified Connections" emphasizes data-driven approach
- Removed "partnership" terminology (use synergy/connections)
- "Quietly, using verified data" - cleaner, emphasizes both privacy and data quality

---

#### Synergy Features
**CURRENT:**
```
- AI-powered compatibility analysis based on verified index scores, not narratives.
- Strategic partnerships and integrations
- Cross-protocol opportunities
```

**PROPOSED:**
```
- AI-powered compatibility scoring based on verified data, not pitch decks
- Integration and acquisition opportunities
- Cross-ecosystem synergies
```

**REASONING:**
- "Compatibility scoring" sounds more professional than "analysis"
- Remove "partnerships" term
- "Cross-ecosystem" is more Web3-native than "cross-protocol"

---

#### How It Works Section
**CURRENT:**
```
1. Verify - We automatically analyze on-chain data, GitHub activity, and social signals.
2. Index - Companies are ranked on real performance, not marketing.
3. Discover - Find M&A targets or integration partners that match your criteria.
```

**PROPOSED:**
```
1. Verify - Automated analysis of on-chain data, GitHub activity, and social signals
2. Index - Companies ranked on real metrics, not marketing claims
3. Discover - AI-powered synergy matching based on verified compatibility
```

**REASONING:**
- More concise
- "AI-powered synergy matching" highlights the intelligent matching
- "Verified compatibility" ties back to core value prop

---

#### CTA Section
**CURRENT:**
```
Stop trusting promises.
Start verifying.
```

**PROPOSED:**
```
Stop guessing.
Start verifying.
```

**REASONING:**
- "Guessing" is more relatable than "trusting promises"
- Emphasizes the uncertainty teams face

---

### 2. Sidebar (src/components/dashboard/dashboard-sidebar.tsx)

**CURRENT:**
```
Fabrknt Suite
Index + Synergy
Preview
```

**PROPOSED:**
```
FABRKNT
Index + Synergy
Beta
```

**REASONING:**
- Consistent capitalization (FABRKNT)
- "Beta" sounds more professional than "Preview"

---

### 3. Footer

**CURRENT:**
```
Fabrknt Suite
Index + Synergy
Preview
```

**PROPOSED:**
```
FABRKNT
Verify. Discover. Connect.
Beta
```

**REASONING:**
- Three-word tagline summarizes the flow
- More action-oriented

---

### 4. Synergy Discovery Page

**CURRENT (in matching-engine fallback):**
```
"Potential partnership between [category] companies"
```

**PROPOSED:**
```
"Potential synergy between [category] companies"
```

---

### 5. Connections/Matches Page

**CURRENT:**
```
"Synergy Connections"
"New Connections"
"Start swiping to discover partnership opportunities!"
```

**PROPOSED:**
```
"Synergy Connections" ✅ (keep)
"New Connections" ✅ (keep)
"Discover companies with verified compatibility scores and start connecting!"
```

**REASONING:**
- Remove "swiping" language
- Emphasize "verified compatibility scores"

---

## Terminology Guide

### Use This | Not This
- **Synergy** | Partnership (except in specific contexts like "integration partner")
- **Connections** | Matches (in most contexts)
- **Discover** | Browse, Swipe
- **Express Interest** | Swipe Right
- **Pass** | Swipe Left
- **Compatibility Score** | Match Score (acceptable but less professional)
- **Verified Data** | Real Data
- **AI-Powered** | AI-generated/AI-based
- **Companies** | Projects (unless specifically about projects)
- **Teams** | Founders/Investors (unless being specific)

---

## Brand Voice Guidelines

### ✅ Do:
- Emphasize verification and data
- Use professional B2B language
- Be direct and confident
- Highlight AI intelligence
- Show outcomes (confident decisions, million-dollar deals)

### ❌ Don't:
- Use casual/consumer language ("swipe", "match", "like")
- Over-promise ("guaranteed", "perfect match")
- Use vague terms ("strategic" without context)
- Mix terminology (pick synergy OR partnerships)

---

## Priority Updates

### High Priority (User-Facing):
1. ✅ Landing page hero section
2. ✅ Landing page Synergy section
3. ✅ Sidebar footer
4. ✅ Navigation labels

### Medium Priority:
5. ✅ Email templates (match notifications updated to connection notifications)
6. ✅ Success toasts (updated to use "opportunities" and "connections")
7. ✅ Component interfaces (PartnershipCardData → OpportunityCardData)
8. ✅ File names (partnership-card.tsx → opportunity-card.tsx)

### Low Priority:
9. ✅ README.md updated with rebranding
10. ✅ SETUP_GUIDE.md updated
11. ✅ Code comments and terminology

---

## Implementation Summary (Completed 2026-01-04)

### Files Updated:
1. **Landing Page**: `src/app/page.tsx` - Hero, Synergy section, How It Works
2. **Components**:
   - `src/components/synergy/opportunity-card.tsx` (renamed from partnership-card.tsx)
   - `src/components/synergy/discovery-grid.tsx`
   - `src/components/synergy/discovery-filters.tsx`
   - `src/components/synergy/professional-discovery.tsx`
   - `src/components/synergy/matches-list.tsx`
3. **Pages**:
   - `src/app/synergy/discover/page.tsx`
   - `src/app/cindex/page.tsx` (header consistency)
4. **Email Templates**: `src/lib/email/match-notifications.ts`
5. **Documentation**:
   - `README.md` - Comprehensive rebranding
   - `SETUP_GUIDE.md` - Updated platform description
   - `REBRANDING_SUGGESTIONS.md` - Marked as completed

### Key Changes:
- **Terminology**: "partnerships" → "synergies/opportunities/connections"
- **Interfaces**: `PartnershipCardData` → `OpportunityCardData`, `partnershipType` → `opportunityType`
- **Branding**: "FABRKNT Suite" → "FABRKNT"
- **Tagline**: "Before You Trust It" → "Discover Synergy"
- **Headers**: Consistent left-aligned design across all pages
- **Professional Language**: Removed casual "swipe" terminology, replaced with "Express Interest" / "Pass"

