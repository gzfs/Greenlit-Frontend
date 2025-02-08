"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

interface TimeSeriesData {
  year: number;
  value: number;
}

interface ComparativeAnalyticsProps {
  data: {
    "Gross global Scope 3 emissions - Business travel": number[];
    "Gross global Scope 2 emissions": number[];
    "Gross global Scope 1 emissions": number[];
    "Total energy consumed": number[];
    "Percentage of total energy from grid electricity": number[];
    "Number of service disruptions": number[];
    "Water consumption": number[];
    "Waste recycled": number[];
    "Employee satisfaction": number[];
    "Community investment": number[];
  };
}

const COLORS = {
  primary: "#10B981",
  secondary: "#6366F1",
  accent: "#F59E0B",
  danger: "#EF4444",
  success: "#22C55E",
  info: "#3B82F6",
  warning: "#F97316",
} as const;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function ComparativeAnalytics({ data }: ComparativeAnalyticsProps) {
  console.log(data);
  // Transform data for time series
  const years = [2022, 2023];
  const emissionsData = years.map((year, idx) => ({
    year,
    scope1: data["Gross global Scope 1 emissions"][idx],
    scope2: data["Gross global Scope 2 emissions"][idx],
    scope3: data["Gross global Scope 3 emissions - Business travel"][idx],
  }));

  const energyData = years.map((year, idx) => ({
    year,
    total: data["Total energy consumed"][idx],
    gridPercentage:
      data["Percentage of total energy from grid electricity"][idx],
  }));

  const disruptionsData = years.map((year, idx) => ({
    year,
    count: data["Number of service disruptions"][idx],
  }));

  // Transform data for various metrics
  const resourceData = years.map((year, idx) => ({
    year,
    energy: data["Total energy consumed"][idx],
    water: data["Water consumption"][idx],
    recycling: data["Waste recycled"][idx],
  }));

  const socialData = years.map((year, idx) => ({
    year,
    satisfaction: data["Employee satisfaction"][idx],
    investment: data["Community investment"][idx] / 1000, // Convert to thousands
    disruptions: data["Number of service disruptions"][idx],
  }));

  // Prepare data for pie chart
  const emissionsPieData = [
    { name: "Scope 1", value: data["Gross global Scope 1 emissions"][1] },
    { name: "Scope 2", value: data["Gross global Scope 2 emissions"][1] },
    {
      name: "Scope 3",
      value: data["Gross global Scope 3 emissions - Business travel"][1],
    },
  ];

  // Prepare data for radar chart
  const resourceRadarData = [
    { subject: "Energy", A: data["Total energy consumed"][1] / 1000 },
    { subject: "Water", A: data["Water consumption"][1] / 100 },
    { subject: "Recycling", A: data["Waste recycled"][1] },
    {
      subject: "Grid %",
      A: data["Percentage of total energy from grid electricity"][1],
    },
  ];

  // Prepare data for radial bar
  const socialRadialData = [
    {
      name: "Satisfaction",
      value: data["Employee satisfaction"][1],
      fill: COLORS.primary,
    },
    {
      name: "Investment",
      value: (data["Community investment"][1] / 250000) * 100,
      fill: COLORS.secondary,
    },
  ];

  return (
    <div className="space-y-8 w-full">
      {/* Emissions Section */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-800 mb-6">
          Emissions Distribution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-base sm:text-lg font-medium text-emerald-700 mb-4">
              Emissions Trend
            </h3>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis dataKey="year" stroke="#047857" />
                  <YAxis stroke="#047857" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="scope1"
                    stroke={COLORS.primary}
                  />
                  <Line
                    type="monotone"
                    dataKey="scope2"
                    stroke={COLORS.secondary}
                  />
                  <Line
                    type="monotone"
                    dataKey="scope3"
                    stroke={COLORS.accent}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Donut Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-base sm:text-lg font-medium text-emerald-700 mb-4">
              Current Distribution
            </h3>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emissionsPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emissionsPieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={Object.values(COLORS)[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resource Management Section */}
      <section className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-800 mb-4 sm:mb-6">
          Resource Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-base sm:text-lg font-medium text-emerald-700 mb-4">
              Resource Distribution
            </h3>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={resourceRadarData}
                >
                  <PolarGrid stroke="#D1FAE5" />
                  <PolarAngleAxis dataKey="subject" stroke="#047857" />
                  <PolarRadiusAxis stroke="#047857" />
                  <Radar
                    name="Resources"
                    dataKey="A"
                    stroke={COLORS.primary}
                    fill={COLORS.primary}
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Radial Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-base sm:text-lg font-medium text-emerald-700 mb-4">
              Performance Metrics
            </h3>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="10%"
                  outerRadius="80%"
                  barSize={10}
                  data={socialRadialData}
                >
                  <RadialBar
                    startAngle={90}
                    endAngle={450}
                    label={{ fill: "#047857" }}
                    background
                    dataKey="value"
                  />
                  <Legend />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Year-over-Year Changes */}
      <section className="mt-6 sm:mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Object.entries(data).map(([key, values], index) => {
            const change = (
              ((values[1] - values[0]) / values[0]) *
              100
            ).toFixed(1);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-6 rounded-3xl border border-emerald-400/40 backdrop-blur-md"
              >
                <div className="text-sm text-emerald-600">{key}</div>
                <div className="text-2xl font-semibold text-emerald-700 mt-2">
                  {change}% YoY
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
