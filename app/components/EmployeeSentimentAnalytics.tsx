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
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ComposedChart,
} from "recharts";

const COLORS = {
  primary: "#10B981",
  secondary: "#6366F1",
  accent: "#F59E0B",
  danger: "#EF4444",
  success: "#22C55E",
} as const;

const metrics = [
  { name: "Overall Rating", value: 4.2, change: "+0.3" },
  { name: "Work-Life Balance", value: 4.0, change: "+0.2" },
  { name: "Career Growth", value: 3.8, change: "+0.4" },
  { name: "Compensation", value: 4.1, change: "+0.1" },
  { name: "Management", value: 3.9, change: "+0.2" },
  { name: "Culture", value: 4.3, change: "+0.5" },
  { name: "Benefits", value: 4.4, change: "+0.3" },
  { name: "Learning", value: 4.0, change: "+0.2" },
];

const sentimentTrend = [
  { month: "Jan", positive: 75, neutral: 15, negative: 10 },
  { month: "Feb", positive: 78, neutral: 14, negative: 8 },
  { month: "Mar", positive: 80, neutral: 12, negative: 8 },
  { month: "Apr", positive: 82, neutral: 11, negative: 7 },
];

const topConcerns = [
  { subject: "Work Pressure", value: 65 },
  { subject: "Communication", value: 45 },
  { subject: "Training", value: 40 },
  { subject: "Resources", value: 35 },
  { subject: "Recognition", value: 30 },
];

const departmentSentiment = [
  {
    department: "Engineering",
    satisfaction: 4.5,
    engagement: 4.2,
    retention: 92,
  },
  {
    department: "Marketing",
    satisfaction: 4.2,
    engagement: 4.0,
    retention: 88,
  },
  { department: "Sales", satisfaction: 4.0, engagement: 4.3, retention: 85 },
  { department: "HR", satisfaction: 4.6, engagement: 4.4, retention: 95 },
  { department: "Product", satisfaction: 4.3, engagement: 4.1, retention: 90 },
];

const retentionTrend = [
  { month: "Jan", retention: 94, turnover: 6, newHires: 8 },
  { month: "Feb", retention: 93, turnover: 7, newHires: 10 },
  { month: "Mar", retention: 95, turnover: 5, newHires: 12 },
  { month: "Apr", retention: 96, turnover: 4, newHires: 9 },
];

const satisfactionFactors = [
  { name: "Work Environment", value: 85 },
  { name: "Compensation", value: 78 },
  { name: "Career Growth", value: 72 },
  { name: "Management", value: 80 },
  { name: "Work-Life Balance", value: 88 },
  { name: "Benefits", value: 82 },
];

export function EmployeeSentimentAnalytics() {
  return (
    <div className="space-y-8 w-full">
      {/* Metrics Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-800 mb-6">
          Employee Sentiment Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl border border-emerald-400/40 backdrop-blur-md hover:bg-white/5 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-sm text-emerald-600/80 font-medium">
                {metric.name}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-emerald-700">
                  {metric.value}
                </span>
                <span
                  className={`text-sm font-medium ${
                    metric.change.startsWith("+")
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <div className="mt-2 h-1 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${metric.value * 20}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visualizations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-emerald-800 mb-6">
          Detailed Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-400/40 backdrop-blur-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Sentiment Trends Over Time
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis dataKey="month" stroke="#047857" />
                  <YAxis stroke="#047857" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "1px solid #10B981",
                      padding: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "20px",
                    }}
                  />
                  <Bar
                    dataKey="positive"
                    stackId="a"
                    fill={COLORS.success}
                    name="Positive"
                  />
                  <Bar
                    dataKey="neutral"
                    stackId="a"
                    fill={COLORS.accent}
                    name="Neutral"
                  />
                  <Bar
                    dataKey="negative"
                    stackId="a"
                    fill={COLORS.danger}
                    name="Negative"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Concerns */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-400/40 backdrop-blur-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Key Areas of Focus
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={topConcerns}>
                  <PolarGrid stroke="#D1FAE5" />
                  <PolarAngleAxis
                    dataKey="subject"
                    stroke="#047857"
                    tick={{ fill: "#047857", fontSize: 12 }}
                  />
                  <Radar
                    name="Concern Level"
                    dataKey="value"
                    stroke={COLORS.primary}
                    fill={COLORS.primary}
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "1px solid #10B981",
                    }}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Department Analysis */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-emerald-800 mb-6">
          Department Analysis
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-emerald-400/40 backdrop-blur-md hover:shadow-lg transition-all duration-300"
        >
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentSentiment} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                <XAxis type="number" domain={[0, 100]} stroke="#047857" />
                <YAxis
                  dataKey="department"
                  type="category"
                  stroke="#047857"
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    border: "1px solid #10B981",
                    padding: "12px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="satisfaction"
                  name="Satisfaction"
                  fill={COLORS.primary}
                />
                <Bar
                  dataKey="engagement"
                  name="Engagement"
                  fill={COLORS.secondary}
                />
                <Bar
                  dataKey="retention"
                  name="Retention %"
                  fill={COLORS.success}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      {/* Retention & Satisfaction Analysis */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-emerald-800 mb-6">
          Retention & Satisfaction Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Retention Trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-400/40 backdrop-blur-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Employee Retention Trends
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={retentionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis dataKey="month" stroke="#047857" />
                  <YAxis stroke="#047857" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "1px solid #10B981",
                      padding: "12px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="newHires"
                    fill={COLORS.success}
                    name="New Hires"
                  />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    stroke={COLORS.primary}
                    name="Retention %"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="turnover"
                    stroke={COLORS.danger}
                    name="Turnover %"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Satisfaction Factors */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-400/40 backdrop-blur-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Satisfaction Factors
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionFactors}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {satisfactionFactors.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          Object.values(COLORS)[
                            index % Object.keys(COLORS).length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "1px solid #10B981",
                      padding: "12px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
