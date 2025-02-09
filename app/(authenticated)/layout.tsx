"use client";

import { useState } from 'react';
import Sidebar from "@/app/components/Sidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PAGES } from "@/app/page";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState<PAGES>(PAGES.ONBOARDING);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex h-screen">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-auto bg-gradient-to-br from-emerald-50/20 via-transparent to-sky-50/20">
        <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.01] mix-blend-overlay pointer-events-none" />
        {children}
      </main>
    </div>
  );
} 