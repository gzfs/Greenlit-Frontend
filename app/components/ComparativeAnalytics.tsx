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
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

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

const formatChange = (change: number) => {
  const isPositive = change > 0;
  return {
    text: `${isPositive ? "+" : ""}${change.toFixed(1)}%`,
    color: isPositive ? "text-emerald-600" : "text-red-500",
  };
};

const getGradient = (value: number) => {
  if (value > 0) return "bg-gradient-to-r from-emerald-500 to-emerald-300";
  if (value < 0) return "bg-gradient-to-r from-red-500 to-red-300";
  return "bg-gradient-to-r from-yellow-500 to-yellow-300";
};

const getTrendIcon = (value: number) => {
  if (value > 0) return <TrendingUp className="w-4 h-4 text-emerald-500" />;
  if (value < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <ArrowRight className="w-4 h-4 text-yellow-500" />;
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

  // Add these new data transformations after existing ones
  const performanceMetrics = [
    {
      category: "Environmental",
      metrics: [
        {
          name: "Emissions",
          current:
            emissionsData[1].scope1 +
            emissionsData[1].scope2 +
            emissionsData[1].scope3,
          previous:
            emissionsData[0].scope1 +
            emissionsData[0].scope2 +
            emissionsData[0].scope3,
        },
        {
          name: "Energy",
          current: data["Total energy consumed"][1],
          previous: data["Total energy consumed"][0],
        },
        {
          name: "Water",
          current: data["Water consumption"][1],
          previous: data["Water consumption"][0],
        },
      ],
    },
    {
      category: "Social",
      metrics: [
        {
          name: "Employee",
          current: data["Employee satisfaction"][1],
          previous: data["Employee satisfaction"][0],
        },
        {
          name: "Investment",
          current: data["Community investment"][1],
          previous: data["Community investment"][0],
        },
      ],
    },
  ];

  return (
    <div className="space-y-4 w-full">
      {/* Enhanced Text Analytics */}
      <section>
        <h2 className="text-xl font-semibold text-emerald-800 mb-3">
          Year-over-Year Analysis
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {Object.entries(data).map(([key, values], index) => {
            const changeValue = ((values[1] - values[0]) / values[0]) * 100;
            const { text, color } = formatChange(changeValue);
            const gradientClass = getGradient(changeValue);
            const trendIcon = getTrendIcon(changeValue);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="p-3 rounded-lg border border-emerald-400/40 backdrop-blur-md hover:bg-white/5 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="text-xs text-emerald-600/80 font-medium truncate"
                    title={key}
                  >
                    {key}
                  </div>
                  {trendIcon}
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex items-baseline justify-between">
                    <span className={`text-lg font-bold ${color}`}>{text}</span>
                    <span className="text-xs text-emerald-600/60">
                      YoY Change
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 text-xs text-emerald-600/80">
                    <span>{values[0].toLocaleString()}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="font-medium">
                      {values[1].toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-emerald-100/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${gradientClass} rounded-full transition-all duration-500`}
                    style={{
                      width: `${Math.min(Math.abs(changeValue), 100)}%`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Visualization Grid - Bottom Section with more columns */}
      <section>
        <h2 className="text-xl font-semibold text-emerald-800 mb-3">
          Performance Visualizations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 rounded-md border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-[10px] font-medium text-emerald-700 mb-1">
              Emissions Trend
            </h3>
            <div className="h-[140px]">
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 rounded-md border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-[10px] font-medium text-emerald-700 mb-1">
              Current Distribution
            </h3>
            <div className="h-[140px]">
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

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 rounded-md border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-[10px] font-medium text-emerald-700 mb-1">
              Resource Distribution
            </h3>
            <div className="h-[140px]">
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 rounded-md border border-emerald-400/40 backdrop-blur-md"
          >
            <h3 className="text-[10px] font-medium text-emerald-700 mb-1">
              Performance Metrics
            </h3>
            <div className="h-[140px]">
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

      {/* Add this section after the existing visualizations */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">
          Performance Deep Dive
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Performance Cards */}
          {performanceMetrics.map((category) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-emerald-400/40 backdrop-blur-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-medium text-emerald-700 mb-3">
                {category.category} Performance
              </h3>
              <div className="space-y-4">
                {category.metrics.map((metric) => {
                  const change =
                    ((metric.current - metric.previous) / metric.previous) *
                    100;
                  const { color } = formatChange(change);
                  const gradientClass = getGradient(change);
                  return (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-600/80">
                          {metric.name}
                        </span>
                        <span className={`text-sm font-medium ${color}`}>
                          {change > 0 ? "+" : ""}
                          {change.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-emerald-100/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${gradientClass} rounded-full transition-all duration-500`}
                          style={{
                            width: `${Math.min(Math.abs(change), 100)}%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-emerald-600/60">
                        <span>{metric.previous.toLocaleString()}</span>
                        <ArrowRight className="w-3 h-3" />
                        <span className="font-medium">
                          {metric.current.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Trend Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-emerald-400/40 backdrop-blur-md hover:shadow-lg transition-all duration-300 lg:col-span-2"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-3">
              Combined Performance Trends
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={emissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis dataKey="year" stroke="#047857" />
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
                  <Area
                    type="monotone"
                    dataKey="scope1"
                    fill={COLORS.primary}
                    stroke={COLORS.primary}
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="scope2"
                    fill={COLORS.secondary}
                    stroke={COLORS.secondary}
                    fillOpacity={0.3}
                  />
                  <Line
                    type="monotone"
                    dataKey="scope3"
                    stroke={COLORS.accent}
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
