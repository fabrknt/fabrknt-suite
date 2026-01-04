"use client";

import Link from "next/link";
import { Link2, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

interface SynergyCTAProps {
  variant?: "primary" | "secondary" | "footer";
  className?: string;
}

export function SynergyCTA({ variant = "primary", className = "" }: SynergyCTAProps) {
  const { data: session } = useSession();

  const href = session ? "/synergy/discover" : "/auth/signin?callbackUrl=/synergy/discover";

  if (variant === "footer") {
    return (
      <Link
        href={href}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Synergy {!session && <span className="text-xs">(Sign in)</span>}
      </Link>
    );
  }

  if (variant === "secondary") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all font-bold ${className}`}
      >
        <div className="flex flex-col items-center">
          <span>Find Synergies</span>
          {!session && <span className="text-xs">Sign in required</span>}
        </div>
        <ArrowRight className="h-5 w-5" />
      </Link>
    );
  }

  // Primary variant (hero section)
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-all font-bold text-lg relative group border border-emerald-400 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 ${className}`}
    >
      <Link2 className="h-6 w-6" />
      <div className="flex flex-col items-start">
        <span>Find Real Synergies</span>
        {!session && <span className="text-xs font-normal text-emerald-100">Sign in required</span>}
      </div>
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}

// For the mobile card variant
export function SynergyCTACard() {
  const { data: session } = useSession();
  const href = session ? "/synergy/discover" : "/auth/signin?callbackUrl=/synergy/discover";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-all font-bold w-full justify-center border border-emerald-400 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
    >
      <div className="flex flex-col items-center">
        <span>Find Synergies</span>
        {!session && <span className="text-xs">Sign in required</span>}
      </div>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
