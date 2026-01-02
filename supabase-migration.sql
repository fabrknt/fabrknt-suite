-- Fabrknt Suite Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/lyvidhiyocsozzrgyklq/sql

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY,
    "walletAddress" TEXT UNIQUE NOT NULL,
    "displayName" TEXT,
    "email" TEXT,
    "bio" TEXT,
    "website" TEXT,
    "twitter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" TIMESTAMP(3)
);

CREATE INDEX IF NOT EXISTS "User_walletAddress_idx" ON "User"("walletAddress");

-- Create Listing table
CREATE TABLE IF NOT EXISTS "Listing" (
    "id" TEXT PRIMARY KEY,
    "type" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "askingPrice" DECIMAL(15,2),
    "revenue" DECIMAL(15,2) NOT NULL,
    "mau" INTEGER NOT NULL,
    "seekingPartners" TEXT[] NOT NULL DEFAULT '{}',
    "offeringCapabilities" TEXT[] NOT NULL DEFAULT '{}',
    "partnershipType" TEXT,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "chain" TEXT NOT NULL,
    "website" TEXT,
    "logoUrl" TEXT,
    "hasNDA" BOOLEAN NOT NULL DEFAULT false,
    "requiresProofOfFunds" BOOLEAN NOT NULL DEFAULT false,
    "minBuyerCapital" DECIMAL(15,2),
    "indexCompanyId" TEXT,
    "suiteDataSnapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),
    "sellerId" TEXT NOT NULL,
    CONSTRAINT "Listing_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Listing_sellerId_idx" ON "Listing"("sellerId");
CREATE INDEX IF NOT EXISTS "Listing_status_idx" ON "Listing"("status");
CREATE INDEX IF NOT EXISTS "Listing_category_idx" ON "Listing"("category");
CREATE INDEX IF NOT EXISTS "Listing_type_idx" ON "Listing"("type");
CREATE INDEX IF NOT EXISTS "Listing_createdAt_idx" ON "Listing"("createdAt");

-- Create Offer table
CREATE TABLE IF NOT EXISTS "Offer" (
    "id" TEXT PRIMARY KEY,
    "amount" DECIMAL(15,2),
    "proposalText" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "contactEmail" TEXT,
    "contactTelegram" TEXT,
    "proofOfFundsUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),
    "listingId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    CONSTRAINT "Offer_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Offer_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Offer_listingId_idx" ON "Offer"("listingId");
CREATE INDEX IF NOT EXISTS "Offer_buyerId_idx" ON "Offer"("buyerId");
CREATE INDEX IF NOT EXISTS "Offer_status_idx" ON "Offer"("status");
CREATE INDEX IF NOT EXISTS "Offer_createdAt_idx" ON "Offer"("createdAt");

-- Create DataRoomRequest table
CREATE TABLE IF NOT EXISTS "DataRoomRequest" (
    "id" TEXT PRIMARY KEY,
    "purpose" TEXT NOT NULL,
    "companyName" TEXT,
    "position" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "ndaSigned" BOOLEAN NOT NULL DEFAULT false,
    "ndaSignedAt" TIMESTAMP(3),
    "ndaDocumentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),
    "listingId" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    CONSTRAINT "DataRoomRequest_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DataRoomRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "DataRoomRequest_listingId_idx" ON "DataRoomRequest"("listingId");
CREATE INDEX IF NOT EXISTS "DataRoomRequest_requesterId_idx" ON "DataRoomRequest"("requesterId");
CREATE INDEX IF NOT EXISTS "DataRoomRequest_status_idx" ON "DataRoomRequest"("status");

-- Create Document table
CREATE TABLE IF NOT EXISTS "Document" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "requiresDataRoomAccess" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listingId" TEXT NOT NULL,
    CONSTRAINT "Document_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Document_listingId_idx" ON "Document"("listingId");
CREATE INDEX IF NOT EXISTS "Document_type_idx" ON "Document"("type");

-- Create Watchlist table
CREATE TABLE IF NOT EXISTS "Watchlist" (
    "id" TEXT PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Watchlist_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Watchlist_userId_listingId_key" UNIQUE ("userId", "listingId")
);

CREATE INDEX IF NOT EXISTS "Watchlist_userId_idx" ON "Watchlist"("userId");

-- Create Notification table
CREATE TABLE IF NOT EXISTS "Notification" (
    "id" TEXT PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "linkUrl" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX IF NOT EXISTS "Notification_read_idx" ON "Notification"("read");
CREATE INDEX IF NOT EXISTS "Notification_createdAt_idx" ON "Notification"("createdAt");

-- Create function to generate CUID-like IDs
CREATE OR REPLACE FUNCTION generate_cuid() RETURNS TEXT AS $$
DECLARE
    timestamp_part TEXT;
    random_part TEXT;
BEGIN
    -- Simple CUID-like ID: c + timestamp + random
    timestamp_part := LPAD(TO_HEX(EXTRACT(EPOCH FROM NOW())::BIGINT), 8, '0');
    random_part := LPAD(TO_HEX((RANDOM() * 4294967295)::BIGINT), 8, '0');
    RETURN 'c' || timestamp_part || random_part;
END;
$$ LANGUAGE plpgsql;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Migration completed successfully! All tables created.';
END $$;
