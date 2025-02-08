"use client";

import Sidebar from "@/app/components/Sidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  
  console.log("Layout session:", session);
  console.log("Layout status:", status);

  if (status === "loading") {
    return null; // Or a loading spinner
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8 bg-white">{children}</main>
    </div>
  );
} 