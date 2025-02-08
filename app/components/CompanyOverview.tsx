import React from "react";

interface CompanyOverviewProps {
  companyName?: string;
  mission?: string;
  vision?: string;
  sector?: string;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  companyName = "Sustainable Innovations Inc.",
  mission = "Driving sustainable business practices through transparent ESG reporting",
  vision = "To be a leading catalyst for environmental and social responsibility",
  sector = "Technology & Sustainable Innovation",
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-emerald-700">
        {companyName} Profile
      </h2>
      <div className="bg-white/50 p-4 rounded-xl">
        <h3 className="font-semibold text-emerald-600">Mission</h3>
        <p className="text-gray-700">{mission}</p>
      </div>
      <div className="bg-white/50 p-4 rounded-xl">
        <h3 className="font-semibold text-emerald-600">Vision</h3>
        <p className="text-gray-700">{vision}</p>
      </div>
      <div className="bg-white/50 p-4 rounded-xl">
        <h3 className="font-semibold text-emerald-600">Sector</h3>
        <p className="text-gray-700">{sector}</p>
      </div>
    </div>
  );
};

export default CompanyOverview;
