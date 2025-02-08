import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ESGMetricsDashboard: React.FC = () => {
  const esgData = [
    { category: "Environmental", score: 85 },
    { category: "Social", score: 75 },
    { category: "Governance", score: 90 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-emerald-700">
        ESG Performance Metrics
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={esgData}>
            <XAxis dataKey="category" stroke="#10b981" />
            <YAxis stroke="#10b981" />
            <Tooltip />
            <Bar dataKey="score" fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ESGMetricsDashboard;
