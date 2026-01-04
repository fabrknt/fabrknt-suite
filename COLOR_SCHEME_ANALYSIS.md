# FABRKNT Color Scheme Analysis & Recommendations

**Date**: 2026-01-04
**Purpose**: Analyze color schemes across pages considering their objectives and user psychology

---

## Current Color Palette

### Primary Colors in Use:
- **Purple** (primary brand): Authority, trust, innovation
- **Green**: Action, growth, success
- **Blue**: Trust, stability, information
- **Cyan**: Technology, clarity
- **Yellow**: Attention, caution
- **Amber**: Warning, demo
- **Indigo, Emerald, Orange**: Category differentiation

---

## Page-by-Page Analysis

### 1. Landing Page (`/`)

**Objective**: Convert visitors → Drive to INDEX or SYNERGY

**Current Colors**:
- Purple (`bg-purple-600`): Primary CTAs, brand badge, INDEX section
- Cyan (`bg-cyan-100`, `text-cyan-600`): SYNERGY section differentiation
- Green (`bg-green-100`, `text-green-600`): "Discover" step
- Muted backgrounds (`bg-muted`, `bg-card`)

**Color Psychology Assessment**:
✅ **Working Well**:
- Purple for authority and innovation (good for B2B SaaS)
- Cyan differentiates SYNERGY from INDEX
- Green for final "action" step creates progression

❌ **Issues**:
- Cyan for SYNERGY might be too "light" — doesn't convey partnership/connection strength
- Too many accent colors (purple, cyan, green) — could dilute brand focus
- "Discover Synergy" is green, but landing CTA is purple (disconnect)

**Recommendations**:
1. **Unify around Purple**: Make purple THE brand color across all CTAs
2. **Use Green strategically**: Reserve for success states, verified badges
3. **Reconsider Cyan**:
   - Option A: Keep purple primary, use deeper teal for SYNERGY (more connection-focused)
   - Option B: Use purple everywhere, differentiate with purple shades (purple-500 vs purple-700)

**Suggested Changes**:
```tsx
// SYNERGY section - use deeper, more connection-focused color
bg-teal-100 → bg-indigo-100
text-cyan-600 → text-indigo-600

// Or stay with purple family for consistency:
bg-cyan-100 → bg-purple-50
text-cyan-600 → text-purple-700
```

---

### 2. INDEX Pages (`/cindex/*`)

**Objective**: Build trust in data → Research companies → Take verified decisions

**Current Colors**:
- Purple (`bg-purple-600`): Preview badge, CTAs, stats
- Blue (`bg-blue-50`, `text-blue-800`): Demo data notice
- Green (`text-green-600`): Positive stats (verified count)
- Yellow, Blue, Green, Purple icons: Spotlight cards

**Color Psychology Assessment**:
✅ **Working Well**:
- Purple maintains brand consistency
- Blue for informational notices (appropriate)
- Green for positive metrics (trust indicator)

❌ **Issues**:
- Rainbow of icon colors in Spotlight cards dilutes focus
- Blue demo notice competes with primary actions
- Stats use different colors (green, purple) without clear meaning

**Recommendations**:
1. **Standardize stat colors**:
   - Use purple for ALL stats (brand consistency)
   - Reserve green ONLY for verification badges or "verified" indicators
2. **Simplify Spotlight icons**: Use single color (purple-600) with varying backgrounds
3. **Demo notice**: Keep blue but reduce visual weight (lighter blue-50)

**Suggested Changes**:
```tsx
// Stats - all purple for consistency
text-green-600 → text-purple-600
text-purple-600 → text-purple-600 (keep)

// Spotlight icons - unified purple
iconColor="text-yellow-600" → iconColor="text-purple-600"
iconColor="text-green-600" → iconColor="text-purple-600"
iconColor="text-blue-600" → iconColor="text-purple-600"
```

---

### 3. SYNERGY Discovery (`/synergy/discover`)

**Objective**: Professional decision-making → Express interest → Manage opportunities

**Current Colors**:
- Green (`bg-green-600`): "View Connections" CTA, stats icons, "Express Interest" buttons
- Blue (`bg-blue-50`, `text-blue-600`): "Reviewed" stat
- Yellow (`bg-yellow-50`, `text-yellow-600`): "Active Chats" stat
- Amber (`border-amber-300`, `bg-amber-50`): Demo data warning

**Color Psychology Assessment**:
✅ **Working Well**:
- Green for "go" actions (Express Interest) - universal positive
- Amber warning is appropriate
- Stats use different colors for differentiation

❌ **Issues**:
- **MAJOR**: Green primary color here vs Purple on landing page = brand inconsistency
- "View Connections" green button doesn't match purple brand
- Stats use yellow/blue/green randomly (no semantic meaning)
- Opportunity cards hover to green-300 border (should be purple)

**Recommendations**:
1. **Critical Fix**: Replace green primary actions with purple
   - "View Connections" button: `bg-green-600` → `bg-purple-600`
   - "Express Interest" button: `bg-green-600` → `bg-purple-600`
   - Hover borders: `hover:border-green-300` → `hover:border-purple-300`
2. **Stats icons**: Unify to purple family
3. **Reserve green**: Only for "verified" badges, success toasts

**Suggested Changes**:
```tsx
// Primary CTA
bg-green-600 text-white → bg-purple-600 text-white
hover:bg-green-700 → hover:bg-purple-700

// Stats icons - purple family
bg-green-50 text-green-600 → bg-purple-50 text-purple-600
bg-blue-50 text-blue-600 → bg-purple-100 text-purple-700
bg-yellow-50 text-yellow-600 → bg-purple-50 text-purple-600

// Opportunity card hover
hover:border-green-300 → hover:border-purple-300
group-hover:text-green-600 → group-hover:text-purple-600

// Express Interest button
bg-green-600 hover:bg-green-700 → bg-purple-600 hover:bg-purple-700
```

---

### 4. SYNERGY Connections (`/synergy/connections`)

**Objective**: Manage matched companies → Start conversations → Build relationships

**Current Colors**:
- Blue (`text-blue-500`): Super-like star icon
- Mostly neutral (card, border, muted-foreground)

**Color Psychology Assessment**:
✅ **Working Well**:
- Neutral, professional tone
- Minimal color distraction

❌ **Issues**:
- Too neutral — no warmth for "relationship" context
- "Continue Discovering" button should be purple (brand consistency)
- No visual differentiation for different connection states
- Missing color cues for "new" vs "active" partnerships

**Recommendations**:
1. **Add warmth for relationships**:
   - Use purple for "New Connections" badge
   - Consider warm accent for active partnerships (purple-100 bg)
2. **Status indicators**: Color-code by status
   - New: Purple badge
   - In Progress: Blue badge
   - Active Partnerships: Green badge (success state)
3. **Message button**: Purple when enabled (brand consistency)

**Suggested Changes**:
```tsx
// "Continue Discovering" button
variant="outline" → add bg-purple-600 text-white

// Status badges
New Connections: bg-purple-100 text-purple-800
In Progress: bg-blue-100 text-blue-800
Active Partnerships: bg-green-100 text-green-800

// Message button (when enabled)
bg-purple-600 text-white
```

---

### 5. Opportunity Cards (Discovery Grid)

**Objective**: Quick evaluation → Clear categorization → Encourage action

**Current Colors**:
- Category badges: Indigo (DeFi), Blue (Infrastructure), Emerald (DAO), Orange (Gaming)
- Opportunity type badges: Blue, Emerald, Purple, Yellow, Indigo
- Score badges: Green (high), Yellow (medium), Red (low)
- Primary action: Green button

**Color Psychology Assessment**:
✅ **Working Well**:
- Score color coding (green/yellow/red) is universal
- Category differentiation helps scanning

❌ **Issues**:
- Too many colors = visual overload
- Opportunity type colors have no semantic meaning
- Green "Express Interest" inconsistent with purple brand
- Card hover changes to green, not purple

**Recommendations**:
1. **Simplify category badges**: Use purple shades instead of rainbow
   - All categories: Purple family (purple-100/200/300 backgrounds)
   - Or: Keep neutral (muted) with purple text
2. **Opportunity type badges**: Single color family (purple shades)
3. **Primary action**: Purple, not green
4. **Keep score colors**: Green/Yellow/Red is intuitive

**Suggested Changes**:
```tsx
// Category badges - simplified
const categoryColors = {
  defi: "bg-purple-100 text-purple-700 border-purple-200",
  infrastructure: "bg-purple-50 text-purple-700 border-purple-200",
  nft: "bg-purple-100 text-purple-700 border-purple-200",
  dao: "bg-purple-50 text-purple-700 border-purple-200",
  gaming: "bg-purple-100 text-purple-700 border-purple-200",
}

// Opportunity type badges - purple family
const opportunityTypeColors = {
  integration: "bg-purple-50 text-purple-700 border-purple-200",
  "co-marketing": "bg-purple-100 text-purple-700 border-purple-200",
  "strategic-alliance": "bg-purple-50 text-purple-700 border-purple-200",
  revenue_share: "bg-purple-100 text-purple-700 border-purple-200",
  investment: "bg-purple-50 text-purple-700 border-purple-200",
}

// Score badges - KEEP current (green/yellow/red is universal)
// Primary action button
bg-green-600 hover:bg-green-700 → bg-purple-600 hover:bg-purple-700

// Card hover
hover:border-green-300 → hover:border-purple-300
group-hover:text-green-600 → group-hover:text-purple-600
```

---

## Overall Color Strategy Recommendation

### The Core Problem:
**Brand color inconsistency**: Purple on landing page, Green in SYNERGY → confuses brand identity

### The Solution: Purple-First Strategy

**Primary Colors**:
1. **Purple (`purple-600`)**: ALL primary CTAs, brand elements, main actions
2. **Green**: ONLY for success states (verified badges, completed actions, high scores)
3. **Blue**: ONLY for informational notices (demo data, help text)
4. **Amber/Yellow**: ONLY for warnings and cautions
5. **Red**: ONLY for errors and low scores

**Secondary/Neutral**:
- Muted, Card, Border: Keep current (good neutral base)
- Foreground, Muted-foreground: Keep current

**Benefits of Purple-First**:
1. ✅ Brand consistency across all pages
2. ✅ Professional, trustworthy (B2B SaaS standard)
3. ✅ Distinctive from typical "blue" tech companies
4. ✅ Allows green to become powerful success indicator
5. ✅ Simpler for users (one brand color to remember)

---

## Implementation Priority

### High Priority (Brand-Breaking Issues):
1. ✅ **SYNERGY Discovery** - Change green primary buttons to purple
2. ✅ **Opportunity Cards** - Change green actions to purple
3. ✅ **Landing Page** - Unify CTA colors to purple

### Medium Priority (Consistency):
4. ⚠️ **INDEX Stats** - Standardize to purple
5. ⚠️ **Opportunity Type Badges** - Simplify to purple family
6. ⚠️ **SYNERGY Connections** - Add purple CTAs

### Low Priority (Polish):
7. 💡 **Category Badges** - Consider simplifying to purple family
8. 💡 **Status Badges** - Color-code semantically
9. 💡 **Icon Colors** - Unify to purple

---

## Color Palette Definition

### Recommended Tailwind Colors:

**Primary (Brand)**:
- `purple-50`: Very light backgrounds
- `purple-100`: Light backgrounds, badges
- `purple-200`: Borders
- `purple-600`: Primary CTAs, links
- `purple-700`: Hover states
- `purple-800`: Text on light backgrounds
- `purple-900`: Dark text

**Success (Verification, Completion)**:
- `green-50`: Success backgrounds
- `green-100`: Verified badges
- `green-600`: Success text, high scores
- `green-700`: Success hover states

**Info (Neutral Information)**:
- `blue-50`: Info backgrounds
- `blue-100`: Info badges
- `blue-600`: Info text
- `blue-800`: Dark info text

**Warning**:
- `amber-50`: Warning backgrounds
- `amber-300`: Warning borders
- `amber-600`: Warning icons
- `amber-800`: Warning text

**Error**:
- `red-50`: Error backgrounds
- `red-600`: Error text, low scores
- `red-700`: Error hover states

---

## Psychological Impact by Page

### Landing Page → Purple = Authority + Innovation
- Builds trust through professional brand color
- Differentiates from "blue tech" sameness
- Creates memorable brand association

### INDEX → Purple = Credible Data Source
- Reinforces brand trust
- Green reserved for "verified" = makes verification special
- Blue for notices = doesn't compete with actions

### SYNERGY Discovery → Purple = Professional Decisions
- Matches executive decision-making context
- Green for success states = clear positive feedback
- Eliminates "swipe app" casualness

### SYNERGY Connections → Purple + Warmth
- Purple maintains professionalism
- Warmer tones for relationship context (purple-100 backgrounds)
- Status colors guide next actions

---

## Next Steps

1. **Immediate**: Fix SYNERGY green → purple (breaks brand consistency)
2. **Week 1**: Standardize all CTAs to purple
3. **Week 2**: Simplify badge colors to purple family
4. **Week 3**: Add semantic color meaning (status badges)

---

**Key Principle**: One strong brand color (purple) + semantic accent colors (green = success, blue = info, amber = warning, red = error)

This creates:
- Strong brand identity
- Clear user guidance
- Professional B2B appearance
- Reduced cognitive load
