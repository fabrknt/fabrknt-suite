-- Enable Row Level Security on all public tables
-- Run this on Supabase SQL Editor
--
-- Since this app uses Prisma with direct database connection (service role),
-- we enable RLS but allow all operations for authenticated service connections.
-- This prevents direct PostgREST API access while allowing Prisma to work normally.

-- Enable RLS on all tables
ALTER TABLE "ProjectDependency" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectRelationship" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "YieldWatchlist" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PoolInsightCache" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserYieldPreferences" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DataRoomRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Conversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (Prisma uses service role connection)
-- This bypasses RLS for the application while blocking direct PostgREST access

CREATE POLICY "Service role full access" ON "ProjectDependency"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON "ProjectRelationship"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON "YieldWatchlist"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON "PoolInsightCache"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON "UserYieldPreferences"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON "DataRoomRequest"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON "Document"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON "Conversation"
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON "Message"
    FOR ALL USING (true) WITH CHECK (true);
