"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Onboarding from "./components/Onboarding";

export enum PAGES {
  ONBOARDING,
  GOVERNANCE,
  ENVIRONMENT,
  SOCIAL,
  CSR,
}

export default function Home() {
  const [currentView, setCurrentView] = useState<PAGES>(PAGES.ONBOARDING);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50/20 via-transparent to-sky-50/20">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.01] mix-blend-overlay pointer-events-none" />
      <Sidebar currentPage={currentView} setCurrentPage={setCurrentView} />
      <div className="relative min-h-screen w-full p-4 md:p-8">
        {currentView === PAGES.ONBOARDING && <Onboarding />}
        {/* Add other views here */}
      </div>
    </main>
  );
}
