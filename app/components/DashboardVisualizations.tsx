"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
  ComposedChart,
  Scatter,
} from "recharts";
import { Wordcloud } from "@visx/wordcloud";
import { ParentSize } from "@visx/responsive";
import { ComparativeAnalytics } from "./ComparativeAnalytics";

interface DashboardVisualizationProps {
  data: {
    environmental: {
      energyConsumption: {
        year: number;
        total: number;
        renewable: number;
        nonRenewable: number;
      }[];
      gridElectricity: {
        year: number;
        percentage: number;
      }[];
      emissions: {
        year: number;
        scope1: number;
        scope2: number;
        scope3: number;
      }[];
      considerations: {
        text: string;
        value: number;
      }[];
    };
    dataSecurity: {
      userInfo: {
        year: number;
        users: number;
        breaches: number;
        losses: number;
      }[];
    };
    disruptions: {
      services: {
        type: string;
        count: number;
        impact: number;
      }[];
    };
    comparative: {
      "Gross global Scope 3 emissions - Business travel": number[];
      "Gross global Scope 2 emissions": number[];
      "Gross global Scope 1 emissions": number[];
      "Total energy consumed": number[];
      "Percentage of total energy from grid electricity": number[];
      "Number of service disruptions": number[];
    };
  };
}

interface WordData {
  text: string;
  value: number;
}

function CustomWordCloud({
  words,
  width,
  height,
}: {
  words: WordData[];
  width: number;
  height: number;
}) {
  return (
    <Wordcloud<WordData>
      words={words}
      width={width}
      height={height}
      fontSize={(d) => Math.sqrt(d.value) * 3}
      rotate={0}
      padding={2}
    >
      {(cloudWords) =>
        cloudWords.map((w) => (
          <g
            key={w.text}
            transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
          >
            <text
              fill="#047857"
              textAnchor="middle"
              fontSize={w.size}
              fontFamily="Inter"
              className="transition-all duration-200 hover:fill-emerald-500"
            >
              {w.text}
            </text>
          </g>
        ))
      }
    </Wordcloud>
  );
}

const CHART_COLORS = {
  primary: {
    main: "#0EA5E9", // Sky blue
    light: "#38BDF8",
    lighter: "#7DD3FC",
    dark: "#0284C7",
    gradient: ["#0EA5E9", "#38BDF8", "#7DD3FC"],
  },
  secondary: {
    main: "#8B5CF6", // Vibrant purple
    light: "#A78BFA",
    lighter: "#C4B5FD",
    dark: "#7C3AED",
    gradient: ["#8B5CF6", "#A78BFA", "#C4B5FD"],
  },
  accent: {
    main: "#F97316", // Bright orange
    light: "#FB923C",
    lighter: "#FDBA74",
    dark: "#EA580C",
    gradient: ["#F97316", "#FB923C", "#FDBA74"],
  },
  success: {
    main: "#10B981", // Emerald
    light: "#34D399",
    lighter: "#6EE7B7",
    dark: "#059669",
    gradient: ["#10B981", "#34D399", "#6EE7B7"],
  },
  warning: {
    main: "#F59E0B", // Amber
    light: "#FBBF24",
    lighter: "#FCD34D",
    dark: "#D97706",
    gradient: ["#F59E0B", "#FBBF24", "#FCD34D"],
  },
} as const;

export function DashboardVisualizations({ data }: DashboardVisualizationProps) {
  return (
    <div className="space-y-12 w-full">
      {/* Environmental Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/10 via-transparent to-purple-50/5 pointer-events-none" />
        <h2 className="text-2xl font-semibold tracking-tighter text-emerald-800 mb-6">
          Environmental Footprint
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Energy Consumption Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl 
              backdrop-blur-md 
              transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Renewable vs Non-Renewable Energy Consumption
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.environmental.energyConsumption}
                  margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="renewable" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={CHART_COLORS.primary.main}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={CHART_COLORS.primary.main}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="nonRenewable"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={CHART_COLORS.primary.lighter}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={CHART_COLORS.primary.lighter}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis dataKey="year" stroke={CHART_COLORS.primary.dark} />
                  <YAxis stroke={CHART_COLORS.primary.dark} unit=" GJ" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: CHART_COLORS.primary.main,
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="renewable"
                    stackId="1"
                    stroke={CHART_COLORS.primary.main}
                    fill={`url(#renewable)`}
                    name="Renewable"
                  />
                  <Area
                    type="monotone"
                    dataKey="nonRenewable"
                    stackId="1"
                    stroke={CHART_COLORS.primary.lighter}
                    fill="url(#nonRenewable)"
                    name="Non-Renewable"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Grid Electricity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl 
              border border-white/20 
              bg-white/5 backdrop-blur-md 
              hover:border-emerald-200/20
              transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Grid Electricity Usage
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data.environmental.gridElectricity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis dataKey="year" stroke={CHART_COLORS.secondary.dark} />
                  <YAxis stroke={CHART_COLORS.secondary.dark} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: CHART_COLORS.secondary.main,
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="percentage"
                    fill={CHART_COLORS.secondary.main}
                    name="Grid Electricity"
                  />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke={CHART_COLORS.secondary.dark}
                    strokeWidth={2}
                    dot={{ fill: CHART_COLORS.secondary.dark }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Emissions Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 sm:p-6 rounded-3xl 
              border border-white/20 
              bg-white/5 backdrop-blur-md 
              hover:border-emerald-200/20
              transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              GHG Emissions by Scope
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.environmental.emissions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis dataKey="year" stroke={CHART_COLORS.accent.dark} />
                  <YAxis stroke={CHART_COLORS.accent.dark} unit=" MT" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: CHART_COLORS.accent.main,
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="scope1"
                    fill={CHART_COLORS.accent.main}
                    name="Scope 1"
                  />
                  <Bar
                    dataKey="scope2"
                    fill={CHART_COLORS.accent.lighter}
                    name="Scope 2"
                  />
                  <Bar
                    dataKey="scope3"
                    fill={CHART_COLORS.accent.light}
                    name="Scope 3"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Environmental Considerations Word Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 sm:p-6 rounded-3xl 
              border border-white/20 
              bg-white/5 backdrop-blur-md 
              hover:border-emerald-200/20
              transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Environmental Considerations
            </h3>
            <div className="h-[300px] relative">
              <ParentSize>
                {({ width, height }) => (
                  <CustomWordCloud
                    words={data.environmental.considerations}
                    width={width}
                    height={height}
                  />
                )}
              </ParentSize>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Render Comparative Analysis Section conditionally */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/10 via-transparent to-purple-50/5 pointer-events-none" />
        <ComparativeAnalytics data={data.comparative} />
      </section>

      {/* Data Security Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/10 via-transparent to-purple-50/5 pointer-events-none" />
        <h2 className="text-xl font-semibold text-emerald-700 mb-6">
          Data Privacy & Security
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Data Security Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 rounded-3xl 
              border border-white/20 
              bg-white/5 backdrop-blur-md 
              hover:border-emerald-200/20
              transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Security Incidents & Impact
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data.dataSecurity.userInfo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis dataKey="year" stroke="#047857" />
                  <YAxis yAxisId="left" stroke="#047857" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#047857"
                    unit="$"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: "#10B981",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="breaches"
                    fill="#10B981"
                    name="Security Incidents"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="losses"
                    stroke="#047857"
                    strokeWidth={2}
                    name="Financial Impact"
                  />
                  <Scatter
                    yAxisId="left"
                    dataKey="breaches"
                    fill="#047857"
                    name="Incidents"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Disruptions Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/10 via-transparent to-purple-50/5 pointer-events-none" />
        <h2 className="text-xl font-semibold text-emerald-700 mb-6">
          Technology Disruptions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Disruptions Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 rounded-3xl 
              border border-white/20 
              bg-white/5 backdrop-blur-md 
              hover:border-emerald-200/20
              transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-emerald-700 mb-4">
              Service Disruptions by Type
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.disruptions.services}
                  layout="vertical"
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis type="number" stroke="#047857" />
                  <YAxis
                    type="category"
                    dataKey="type"
                    stroke="#047857"
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: "#10B981",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#10B981" name="Incidents" />
                  <Bar dataKey="impact" fill="#6EE7B7" name="Impact Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
