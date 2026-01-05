"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Globe, Wallet, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClaimProfileDialogProps {
  companySlug: string;
  companyName: string;
  githubOrg?: string;
  website?: string;
  onSuccess: () => void;
}

export function ClaimProfileDialog({
  companySlug,
  companyName,
  githubOrg,
  website,
  onSuccess,
}: ClaimProfileDialogProps) {
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [githubUsername, setGithubUsername] = useState<string | null>(null);
  const { toast } = useToast();

  // Get GitHub username from session on mount
  useEffect(() => {
    async function loadGitHubUsername() {
      try {
        setSessionLoading(true);
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        if (session?.user) {
          // Try to get GitHub username from session or fetch from Account table
          const githubUsername = session.user.githubUsername;
          if (githubUsername) {
            setGithubUsername(githubUsername);
          } else {
            // Fallback: fetch from profile/claim GET endpoint which checks Account table
            const statusResponse = await fetch("/api/profile/status");
            const statusData = await statusResponse.json();
            if (statusData.githubUsername) {
              setGithubUsername(statusData.githubUsername);
            }
          }
        }
      } catch (error) {
        console.error("Error loading GitHub username:", error);
      } finally {
        setSessionLoading(false);
      }
    }
    loadGitHubUsername();
  }, []);

  const handleGitHubClaim = async () => {
    if (!githubUsername) {
      toast({
        title: "GitHub Account Required",
        description: "Please sign in with GitHub to claim this profile",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Single API call - verification happens server-side
      const response = await fetch("/api/profile/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companySlug }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error types
        if (data.errorType === "not_member") {
          throw new Error(
            `You are not a member of the ${githubOrg || "company's"} GitHub organization. ` +
            `Please join the organization or contact ${companyName} for access.`
          );
        } else if (data.errorType === "private") {
          throw new Error(
            `Your membership in ${githubOrg || "the organization"} is private. ` +
            `Please make it public in your GitHub settings: https://github.com/orgs/${githubOrg}/people`
          );
        } else if (data.errorType === "no_github_account") {
          throw new Error(
            "No GitHub account linked. Please sign out and sign in with GitHub."
          );
        }
        throw new Error(data.error || "Failed to claim company");
      }

      toast({
        title: "Success!",
        description: data.message || `You've successfully claimed ${companyName}`,
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDomainClaim = async () => {
    toast({
      title: "Coming Soon",
      description: "Domain verification will be available soon. Use GitHub verification for now.",
    });
  };

  const handleWalletClaim = async () => {
    toast({
      title: "Coming Soon",
      description: "Wallet verification will be available soon. Use GitHub verification for now.",
    });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="github" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="github">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </TabsTrigger>
          <TabsTrigger value="domain" disabled>
            <Globe className="mr-2 h-4 w-4" />
            Domain
          </TabsTrigger>
          <TabsTrigger value="wallet" disabled>
            <Wallet className="mr-2 h-4 w-4" />
            Wallet
          </TabsTrigger>
        </TabsList>

        {/* GitHub Verification */}
        <TabsContent value="github" className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Verify via GitHub</h4>
            <p className="text-sm text-muted-foreground">
              Claim <strong>{companyName}</strong> using your GitHub account.
            </p>
          </div>

          <div className="space-y-4">
            {/* Display GitHub username from session (read-only) */}
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium mb-1">Your GitHub Account:</p>
              {sessionLoading ? (
                <p className="text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                  Loading...
                </p>
              ) : githubUsername ? (
                <p className="text-sm">
                  <a
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    @{githubUsername}
                  </a>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No GitHub account linked. Please sign in with GitHub.
                </p>
              )}
            </div>

            {githubOrg && (
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Required Organization:</p>
                <p className="text-sm">
                  <a
                    href={`https://github.com/${githubOrg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    {githubOrg}
                  </a>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  You must be a public member of this organization to claim this profile.
                </p>
              </div>
            )}

            <div className="bg-muted p-3 rounded-lg space-y-2">
              <p className="text-sm font-medium">How it works:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>We verify you're signed in with GitHub</li>
                <li>We check your membership in {githubOrg || "the organization"}</li>
                <li>If verified, you get instant access to Synergy features</li>
              </ol>
            </div>

            <Button
              onClick={handleGitHubClaim}
              disabled={loading || !githubUsername || sessionLoading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Verify & Claim Profile
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Domain Verification */}
        <TabsContent value="domain" className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Verify via Domain</h4>
            <p className="text-sm text-muted-foreground">
              Add a TXT record to your domain to prove ownership.
            </p>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm">
              This verification method is coming soon. Please use GitHub
              verification for now.
            </p>
          </div>

          <Button onClick={handleDomainClaim} disabled className="w-full">
            Coming Soon
          </Button>
        </TabsContent>

        {/* Wallet Verification */}
        <TabsContent value="wallet" className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Verify via Wallet</h4>
            <p className="text-sm text-muted-foreground">
              Sign a message with your company's treasury wallet.
            </p>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm">
              This verification method is coming soon. Please use GitHub
              verification for now.
            </p>
          </div>

          <Button onClick={handleWalletClaim} disabled className="w-full">
            Coming Soon
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
