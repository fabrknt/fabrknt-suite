"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClaimProfileDialog } from "./claim-profile-dialog";
import { CheckCircle2 } from "lucide-react";

interface ClaimProfileButtonProps {
  companySlug: string;
  companyName: string;
  githubOrg?: string;
  website?: string;
}

export function ClaimProfileButton({
  companySlug,
  companyName,
  githubOrg,
  website,
}: ClaimProfileButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const isProduction = process.env.NODE_ENV === "production";

  // Check if profile is already claimed (on mount)
  // In a real app, you'd fetch this from the API

  if (claimed) {
    return (
      <Button variant="outline" disabled>
        <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
        Profile Claimed
      </Button>
    );
  }

  if (!session) {
    if (isProduction) {
      return (
        <Button
          variant="default"
          disabled
          className="cursor-not-allowed opacity-50 bg-cyan-400 text-slate-950 hover:bg-cyan-300"
          title="Sign in is disabled in production"
        >
          Sign In to Claim Profile (Disabled)
        </Button>
      );
    }

    return (
      <Button
        variant="default"
        onClick={() => router.push("/auth/signin?callbackUrl=/dashboard/claim-company")}
        className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-bold shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
      >
        Sign In to Claim Profile
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-bold shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
        >
          Claim This Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Claim {companyName} Profile</DialogTitle>
          <DialogDescription>
            Prove ownership of this company to claim the profile and access
            partnership matching features.
          </DialogDescription>
        </DialogHeader>
        <ClaimProfileDialog
          companySlug={companySlug}
          companyName={companyName}
          githubOrg={githubOrg}
          website={website}
          onSuccess={() => {
            setClaimed(true);
            setOpen(false);
            // Redirect to synergy discovery after a short delay
            setTimeout(() => {
              router.push("/synergy/discover");
            }, 1000);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
