"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const CHART_COLORS = {
  positive: {
    main: "#10B981",
    light: "#34D399",
    lighter: "#6EE7B7",
  },
  negative: {
    main: "#F43F5E",
    light: "#FB7185",
    lighter: "#FDA4AF",
  },
} as const;

const topConcerns = [
  { name: "Work Pressure", value: 126 },
  { name: "No Job Security", value: 78 },
  { name: "Poor Management", value: 74 },
  { name: "Job Security", value: 66 },
  { name: "Low Salary", value: 63 },
].map((item) => ({
  ...item,
  percentage: ((item.value / 635) * 100).toFixed(1),
}));

const topPositives = [
  { name: "Work Life Balance", value: 127 },
  { name: "Good Culture", value: 77 },
  { name: "Virtual Roles", value: 64 },
  { name: "Good Pay", value: 63 },
  { name: "Learning Opportunities", value: 63 },
].map((item) => ({
  ...item,
  percentage: ((item.value / 635) * 100).toFixed(1),
}));

const sentimentOverview = [
  { name: "Positive", value: 635 },
  { name: "Negative", value: 635 },
];

// Add raw sentiment data
const sentimentData = {
  "work pressure": 126,
  "performance measurement": 31,
  "project dependency": 15,
  "job security": 66,
  "no job security": 78,
  "bad hr": 21,
  "redundant interview": 11,
  "low salary": 63,
  "poor management": 74,
  // ... other data points
};

// Add sentiment ratio calculation
const totalMentions = Object.values(sentimentData).reduce(
  (acc, val) => acc + val,
  0
);
const sentimentRatio = [
  { name: "Positive Sentiment", value: 635, percentage: 50 },
  { name: "Negative Sentiment", value: 635, percentage: 50 },
];

// Add category breakdown
const categoryBreakdown = [
  { name: "Work Environment", value: 253, category: "negative" },
  { name: "Job Security", value: 188, category: "negative" },
  { name: "Management", value: 143, category: "negative" },
  { name: "Work Culture", value: 204, category: "positive" },
  { name: "Growth", value: 187, category: "positive" },
  { name: "Benefits", value: 126, category: "positive" },
];

export function EmployeeSentimentAnalytics() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-800 mb-6">
          Employee Sentiment Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Concerns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Top Employee Concerns
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topConcerns}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis type="number" stroke="#047857" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#047857"
                    width={100}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `${value} employees`,
                      "Count",
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: CHART_COLORS.negative.main,
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill={CHART_COLORS.negative.main}
                    radius={[0, 4, 4, 0]}
                  >
                    {topConcerns.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          CHART_COLORS.negative[
                            index % 2 === 0 ? "main" : "light"
                          ]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Positives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Top Positive Aspects
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topPositives}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis type="number" stroke="#047857" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#047857"
                    width={100}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `${value} employees`,
                      "Count",
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: CHART_COLORS.positive.main,
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill={CHART_COLORS.positive.main}
                    radius={[0, 4, 4, 0]}
                  >
                    {topPositives.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          CHART_COLORS.positive[
                            index % 2 === 0 ? "main" : "light"
                          ]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add new section for overall sentiment */}
      <section className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Overall Sentiment Distribution
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentRatio}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={CHART_COLORS.positive.main} />
                    <Cell fill={CHART_COLORS.negative.main} />
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `${((value / totalMentions) * 100).toFixed(1)}%`,
                      "Percentage",
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Sentiment by Category
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryBreakdown}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis
                    dataKey="name"
                    stroke="#047857"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis stroke="#047857" />
                  <Tooltip
                    formatter={(value: number) => [
                      `${value} mentions`,
                      "Count",
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Bar dataKey="value">
                    {categoryBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          CHART_COLORS[
                            entry.category as keyof typeof CHART_COLORS
                          ].main
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add trend indicators */}
      <section className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <div className="text-sm text-emerald-600">Total Responses</div>
            <div className="text-2xl font-semibold text-emerald-700 mt-2">
              635
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <div className="text-sm text-emerald-600">Satisfaction Rate</div>
            <div className="text-2xl font-semibold text-emerald-700 mt-2">
              50%
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <div className="text-sm text-emerald-600">Top Concern</div>
            <div className="text-2xl font-semibold text-emerald-700 mt-2">
              Work Pressure
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
