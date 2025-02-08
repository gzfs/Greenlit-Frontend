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
} from "recharts";
import { WordCloud } from "@visx/wordcloud";
import { Heatmap } from "@visx/heatmap";
import { ParentSize } from "@visx/responsive";

interface CSRVisualizationProps {
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
      breachHeatmap: {
        month: string;
        year: number;
        count: number;
      }[];
    };
    disruptions: {
      services: {
        type: string;
        count: number;
        impact: number;
      }[];
      downtime: {
        start: string;
        end: string;
        description: string;
      }[];
    };
  };
}

export function CSRVisualizations({ data }: CSRVisualizationProps) {
  return (
    <div className="space-y-8">
      {/* Environmental Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-emerald-700">
          Environmental Impact
        </h2>

        {/* Energy Consumption Chart */}
        <div className="p-6 rounded-3xl border border-emerald-400/40 bg-white/10 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-emerald-700 mb-4">
            Energy Consumption
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.environmental.energyConsumption}>
                <defs>
                  <linearGradient id="renewable" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="nonRenewable" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6EE7B7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                <XAxis dataKey="year" stroke="#047857" />
                <YAxis stroke="#047857" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderColor: "#10B981",
                    borderRadius: "0.75rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="renewable"
                  stackId="1"
                  stroke="#10B981"
                  fill="url(#renewable)"
                />
                <Area
                  type="monotone"
                  dataKey="nonRenewable"
                  stackId="1"
                  stroke="#6EE7B7"
                  fill="url(#nonRenewable)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emissions Chart */}
        <div className="p-6 rounded-3xl border border-emerald-400/40 bg-white/10 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-emerald-700 mb-4">
            Emissions by Scope
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.environmental.emissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                <XAxis dataKey="year" stroke="#047857" />
                <YAxis stroke="#047857" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderColor: "#10B981",
                    borderRadius: "0.75rem",
                  }}
                />
                <Legend />
                <Bar dataKey="scope1" fill="#10B981" />
                <Bar dataKey="scope2" fill="#6EE7B7" />
                <Bar dataKey="scope3" fill="#A7F3D0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Word Cloud */}
        <div className="p-6 rounded-3xl border border-emerald-400/40 bg-white/10 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-emerald-700 mb-4">
            Environmental Considerations
          </h3>
          <div className="h-[300px]">
            <ParentSize>
              {({ width, height }) => (
                <WordCloud
                  words={data.environmental.considerations}
                  width={width}
                  height={height}
                  fontSize={(d) => Math.sqrt(d.value) * 5}
                  rotate={0}
                  padding={2}
                  fill="#047857"
                />
              )}
            </ParentSize>
          </div>
        </div>
      </section>

      {/* Add Data Security and Technology Disruptions sections similarly */}
    </div>
  );
}
