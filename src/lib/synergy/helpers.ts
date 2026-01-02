import { Listing } from '../mock-data';

/**
 * Get featured listings (highest Fabrknt scores)
 */
export function getFeaturedListings(listings: Listing[], limit: number = 5): Listing[] {
  return [...listings]
    .filter((l) => l.status === 'active')
    .sort((a, b) => (b.suiteData?.fabrknt_score || 0) - (a.suiteData?.fabrknt_score || 0))
    .slice(0, limit);
}

/**
 * Get recently listed (most recent)
 */
export function getRecentlyListed(listings: Listing[], limit: number = 5): Listing[] {
  return [...listings]
    .filter((l) => l.status === 'active')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Get best value listings (best price to revenue ratio)
 */
export function getBestValue(listings: Listing[], limit: number = 5): Listing[] {
  return [...listings]
    .filter((l) => l.status === 'active' && l.revenue > 0 && l.askingPrice)
    .sort((a, b) => {
      const aMultiple = (a.askingPrice || 0) / a.revenue;
      const bMultiple = (b.askingPrice || 0) / b.revenue;
      return aMultiple - bMultiple; // Lower multiple = better value
    })
    .slice(0, limit);
}

/**
 * Get ending soon (mock - would be based on auction end date in real app)
 */
export function getEndingSoon(listings: Listing[], limit: number = 5): Listing[] {
  // Mock: For now, just return active listings sorted by creation date (oldest first)
  // In real app, this would check auction end dates
  return [...listings]
    .filter((l) => l.status === 'active')
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Get high interest listings (mock - would be based on views/offers in real app)
 */
export function getHighInterest(listings: Listing[], limit: number = 5): Listing[] {
  // Mock: Return listings with high MAU as proxy for interest
  return [...listings]
    .filter((l) => l.status === 'active')
    .sort((a, b) => b.mau - a.mau)
    .slice(0, limit);
}

/**
 * Get listings by category
 */
export function getListingsByCategory(listings: Listing[], category: Listing['category']): Listing[] {
  return listings.filter((l) => l.category === category && l.status === 'active');
}

/**
 * Calculate revenue multiple for a listing
 */
export function getRevenueMultiple(listing: Listing): number {
  if (listing.revenue === 0 || !listing.askingPrice) return 0;
  return listing.askingPrice / listing.revenue;
}
