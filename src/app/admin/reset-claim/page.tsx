"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ResetClaimPage() {
  const { data: session } = useSession();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/reset-claim", {
        method: "POST",
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Failed to reset claim" });
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4 bg-card p-8 rounded-lg border border-border">
          <h1 className="text-2xl font-bold">Sign In Required</h1>
          <p className="text-muted-foreground">
            You need to be signed in to reset your claimed profile
          </p>
          <Link
            href="/auth/signin"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 bg-card p-8 rounded-lg border border-border">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Claimed Profile</h1>
          <p className="text-muted-foreground mt-2">
            Signed in as: {session.user?.email || session.user?.name}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ This will delete your claimed company profile. You&apos;ll need to
              claim a company again to access Synergy features.
            </p>
          </div>

          <Button
            onClick={handleReset}
            disabled={loading || !!result}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            size="lg"
          >
            {loading ? "Resetting..." : "Reset My Claimed Profile"}
          </Button>

          {result && (
            <div
              className={`rounded-lg p-4 ${
                result.error
                  ? "bg-red-50 border border-red-200"
                  : "bg-green-50 border border-green-200"
              }`}
            >
              <p className="font-medium mb-2">
                {result.error ? "Error" : "Success"}
              </p>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {result && !result.error && (
            <div className="space-y-2">
              <Link
                href="/dashboard/claim-company"
                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Claim a Company →
              </Link>
              <Link
                href="/"
                className="block w-full text-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Go to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
