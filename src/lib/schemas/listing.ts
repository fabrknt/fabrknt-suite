import { z } from 'zod';

// ==================== Enums ====================

export const ListingTypeEnum = z.enum([
  'acquisition',
  'partnership',
  'collaboration',
  'investment',
]);

export const CategoryEnum = z.enum([
  'defi',
  'nft',
  'gaming',
  'infrastructure',
  'dao',
  'social',
  'marketplace',
  'other',
]);

export const ChainEnum = z.enum([
  'ethereum',
  'base',
  'polygon',
  'solana',
  'multi-chain',
  'other',
]);

export const PartnershipTypeEnum = z.enum([
  'technical',
  'strategic',
  'marketing',
  'ecosystem',
  'distribution',
  'co-development',
]);

export const ListingStatusEnum = z.enum([
  'active',
  'under_offer',
  'sold',
  'withdrawn',
  'in_discussion',
]);

// ==================== Step 1: Type Selection ====================

export const TypeSelectionSchema = z.object({
  type: ListingTypeEnum,
});

export type TypeSelectionInput = z.infer<typeof TypeSelectionSchema>;

// ==================== Step 2: Basic Info ====================

export const BasicInfoSchema = z.object({
  projectName: z
    .string()
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must be less than 100 characters'),

  productType: z
    .string()
    .min(3, 'Product type must be at least 3 characters')
    .max(100, 'Product type must be less than 100 characters'),

  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must be less than 5000 characters'),

  category: CategoryEnum,

  chain: ChainEnum,

  website: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
});

export type BasicInfoInput = z.infer<typeof BasicInfoSchema>;

// ==================== Step 3: Metrics ====================

// M&A Metrics
export const MAAcquisitionMetricsSchema = z.object({
  revenue: z
    .number()
    .min(0, 'Revenue must be positive')
    .max(1000000000, 'Revenue seems unrealistic'),

  mau: z
    .number()
    .int('MAU must be a whole number')
    .min(0, 'MAU must be positive')
    .max(100000000, 'MAU seems unrealistic'),

  askingPrice: z
    .number()
    .min(0, 'Asking price must be positive')
    .max(10000000000, 'Asking price seems unrealistic')
    .optional(),
});

export type MAAcquisitionMetricsInput = z.infer<typeof MAAcquisitionMetricsSchema>;

// Partnership Metrics
export const PartnershipMetricsSchema = z.object({
  revenue: z
    .number()
    .min(0, 'Revenue must be positive')
    .max(1000000000, 'Revenue seems unrealistic'),

  mau: z
    .number()
    .int('MAU must be a whole number')
    .min(0, 'MAU must be positive')
    .max(100000000, 'MAU seems unrealistic'),

  seekingPartners: z
    .array(z.string())
    .min(1, 'Select at least one partner type you are seeking')
    .max(10, 'Maximum 10 partner types'),

  offeringCapabilities: z
    .array(z.string())
    .min(1, 'Select at least one capability you are offering')
    .max(10, 'Maximum 10 capabilities'),

  partnershipType: PartnershipTypeEnum.optional(),
});

export type PartnershipMetricsInput = z.infer<typeof PartnershipMetricsSchema>;

// Combined metrics schema (discriminated union based on type)
export const MetricsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('acquisition'),
    ...MAAcquisitionMetricsSchema.shape,
  }),
  z.object({
    type: z.literal('investment'),
    ...MAAcquisitionMetricsSchema.shape,
  }),
  z.object({
    type: z.literal('partnership'),
    ...PartnershipMetricsSchema.shape,
  }),
  z.object({
    type: z.literal('collaboration'),
    ...PartnershipMetricsSchema.shape,
  }),
]);

export type MetricsInput = z.infer<typeof MetricsSchema>;

// ==================== Step 4: Deal Terms ====================

export const DealTermsSchema = z.object({
  hasNDA: z.boolean().default(false),

  requiresProofOfFunds: z.boolean().default(false),

  minBuyerCapital: z
    .number()
    .min(0, 'Minimum capital must be positive')
    .max(10000000000, 'Minimum capital seems unrealistic')
    .optional(),
});

export type DealTermsInput = z.infer<typeof DealTermsSchema>;

// ==================== Step 5: Index Link ====================

export const IndexLinkSchema = z.object({
  indexCompanyId: z.string().optional(),

  // When linking, we'll fetch and store the Index data
  suiteDataSnapshot: z
    .object({
      pulse: z
        .object({
          vitality_score: z.number().optional(),
          developer_activity_score: z.number().optional(),
          team_retention_score: z.number().optional(),
          active_contributors: z.number().optional(),
        })
        .optional(),
      trace: z
        .object({
          growth_score: z.number().optional(),
          verified_roi: z.number().optional(),
          roi_multiplier: z.number().optional(),
          quality_score: z.number().optional(),
        })
        .optional(),
      revenue_verified: z.number().optional(),
      fabrknt_score: z.number().optional(),
    })
    .optional(),
});

export type IndexLinkInput = z.infer<typeof IndexLinkSchema>;

// ==================== Full Listing Creation Schema ====================

export const CreateListingSchema = z.discriminatedUnion('type', [
  // M&A / Acquisition
  z.object({
    type: z.literal('acquisition'),
    ...BasicInfoSchema.omit({ category: true, chain: true }).shape,
    category: CategoryEnum,
    chain: ChainEnum,
    ...MAAcquisitionMetricsSchema.shape,
    ...DealTermsSchema.shape,
    ...IndexLinkSchema.shape,
  }),

  // Investment
  z.object({
    type: z.literal('investment'),
    ...BasicInfoSchema.omit({ category: true, chain: true }).shape,
    category: CategoryEnum,
    chain: ChainEnum,
    ...MAAcquisitionMetricsSchema.shape,
    ...DealTermsSchema.shape,
    ...IndexLinkSchema.shape,
  }),

  // Partnership
  z.object({
    type: z.literal('partnership'),
    ...BasicInfoSchema.omit({ category: true, chain: true }).shape,
    category: CategoryEnum,
    chain: ChainEnum,
    ...PartnershipMetricsSchema.shape,
    ...DealTermsSchema.shape,
    ...IndexLinkSchema.shape,
  }),

  // Collaboration
  z.object({
    type: z.literal('collaboration'),
    ...BasicInfoSchema.omit({ category: true, chain: true }).shape,
    category: CategoryEnum,
    chain: ChainEnum,
    ...PartnershipMetricsSchema.shape,
    ...DealTermsSchema.shape,
    ...IndexLinkSchema.shape,
  }),
]);

export type CreateListingInput = z.infer<typeof CreateListingSchema>;

// ==================== Edit Listing Schema ====================

// Same as create, but all fields optional (partial update support)
// Note: Can't use .partial() on discriminated unions, so we define it manually
export const UpdateListingSchema = z.object({
  id: z.string().cuid(),
  type: ListingTypeEnum.optional(),
  projectName: z.string().min(3).max(100).optional(),
  productType: z.string().min(3).max(100).optional(),
  description: z.string().min(50).max(5000).optional(),
  category: CategoryEnum.optional(),
  chain: ChainEnum.optional(),
  website: z.string().url().optional().or(z.literal('')),
  revenue: z.number().min(0).max(1000000000).optional(),
  mau: z.number().int().min(0).max(100000000).optional(),
  askingPrice: z.number().min(0).max(10000000000).optional(),
  seekingPartners: z.array(z.string()).min(1).max(10).optional(),
  offeringCapabilities: z.array(z.string()).min(1).max(10).optional(),
  partnershipType: PartnershipTypeEnum.optional(),
  hasNDA: z.boolean().optional(),
  requiresProofOfFunds: z.boolean().optional(),
  minBuyerCapital: z.number().min(0).max(10000000000).optional(),
  indexCompanyId: z.string().optional(),
  suiteDataSnapshot: z
    .object({
      pulse: z
        .object({
          vitality_score: z.number().optional(),
          developer_activity_score: z.number().optional(),
          team_retention_score: z.number().optional(),
          active_contributors: z.number().optional(),
        })
        .optional(),
      trace: z
        .object({
          growth_score: z.number().optional(),
          verified_roi: z.number().optional(),
          roi_multiplier: z.number().optional(),
          quality_score: z.number().optional(),
        })
        .optional(),
      revenue_verified: z.number().optional(),
      fabrknt_score: z.number().optional(),
    })
    .optional(),
  status: ListingStatusEnum.optional(),
});

export type UpdateListingInput = z.infer<typeof UpdateListingSchema>;

// ==================== Helper Functions ====================

/**
 * Check if a listing type requires M&A-specific fields
 */
export function isMAType(type: z.infer<typeof ListingTypeEnum>): boolean {
  return type === 'acquisition' || type === 'investment';
}

/**
 * Check if a listing type requires partnership-specific fields
 */
export function isPartnershipType(type: z.infer<typeof ListingTypeEnum>): boolean {
  return type === 'partnership' || type === 'collaboration';
}

/**
 * Get the appropriate metrics schema for a listing type
 */
export function getMetricsSchema(type: z.infer<typeof ListingTypeEnum>) {
  return isMAType(type) ? MAAcquisitionMetricsSchema : PartnershipMetricsSchema;
}
