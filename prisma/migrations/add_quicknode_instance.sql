-- QuickNode Marketplace Add-on Instances
CREATE TABLE IF NOT EXISTS "QuicknodeInstance" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "quicknodeId" TEXT NOT NULL,
    "endpointId" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "wssUrl" TEXT,
    "httpUrl" TEXT,
    "chain" TEXT,
    "network" TEXT,
    "product" TEXT NOT NULL DEFAULT 'complr',
    "apiKey" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "status" TEXT NOT NULL DEFAULT 'active',
    "requestCount" INTEGER NOT NULL DEFAULT 0,
    "lastRequestAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuicknodeInstance_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "QuicknodeInstance_quicknodeId_key" ON "QuicknodeInstance"("quicknodeId");
CREATE UNIQUE INDEX IF NOT EXISTS "QuicknodeInstance_apiKey_key" ON "QuicknodeInstance"("apiKey");
CREATE INDEX IF NOT EXISTS "QuicknodeInstance_quicknodeId_idx" ON "QuicknodeInstance"("quicknodeId");
CREATE INDEX IF NOT EXISTS "QuicknodeInstance_endpointId_idx" ON "QuicknodeInstance"("endpointId");
CREATE INDEX IF NOT EXISTS "QuicknodeInstance_status_idx" ON "QuicknodeInstance"("status");
CREATE INDEX IF NOT EXISTS "QuicknodeInstance_apiKey_idx" ON "QuicknodeInstance"("apiKey");
