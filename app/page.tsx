"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import CompanyProfileForm from "./components/CompanyProfileForm";
import { determineSector } from "./utils/sectorAnalysis";

export default function Home() {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    mission: "",
    vision: "",
    sector: "",
  });

  useEffect(() => {
    if (companyDetails.mission && companyDetails.vision) {
      const analyzedSector = determineSector(
        companyDetails.mission,
        companyDetails.vision
      );
      setCompanyDetails((prev) => ({
        ...prev,
        sector: analyzedSector,
      }));
    }
  }, [companyDetails.mission, companyDetails.vision]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <CompanyProfileForm
            companyDetails={companyDetails}
            setCompanyDetails={setCompanyDetails}
          />
        </div>
      </main>
    </div>
  );
}
