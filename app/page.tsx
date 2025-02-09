"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HomePage from "./(marketing)/page";

export enum PAGES {
  ONBOARDING = "ONBOARDING",
  GOVERNANCE = "GOVERNANCE",
  CSR = "CSR",
  ESG = "ESG",
}

export default function RootPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/onboarding");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4 mx-auto" />
          <p className="text-emerald-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show marketing homepage for unauthenticated users
  if (status === "unauthenticated") {
    return <HomePage />;
  }

  // This will briefly show while redirecting to onboarding
  return null;
}
