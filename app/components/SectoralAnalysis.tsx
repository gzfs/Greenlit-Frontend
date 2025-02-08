import React from "react";

const SectoralAnalysis: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-emerald-700">
        Sectoral Comparative Analysis
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/50 p-4 rounded-xl">
          <h3 className="font-semibold text-emerald-600">Industry Avg</h3>
          <p className="text-gray-700">ESG Score: 72</p>
        </div>
        <div className="bg-white/50 p-4 rounded-xl">
          <h3 className="font-semibold text-emerald-600">Peer Comparison</h3>
          <p className="text-gray-700">Outperforming 68% of peers</p>
        </div>
        <div className="bg-white/50 p-4 rounded-xl">
          <h3 className="font-semibold text-emerald-600">Trend</h3>
          <p className="text-gray-700">Consistent Improvement</p>
        </div>
      </div>
    </div>
  );
};

export default SectoralAnalysis;
