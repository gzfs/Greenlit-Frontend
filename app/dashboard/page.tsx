"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Development: 20, Investment: 15, "Build and Hold": 10 },
  { name: "Feb", Development: 25, Investment: 20, "Build and Hold": 15 },
  { name: "Mar", Development: 30, Investment: 25, "Build and Hold": 20 },
  { name: "Apr", Development: 40, Investment: 35, "Build and Hold": 25 },
  { name: "May", Development: 55, Investment: 45, "Build and Hold": 30 },
  { name: "Jun", Development: 75, Investment: 60, "Build and Hold": 40 },
  { name: "Jul", Development: 90, Investment: 70, "Build and Hold": 45 },
];

const stateData = [
  { state: "QLD", amount: 18.6 },
  { state: "SA", amount: 3.9 },
  { state: "WA", amount: 3.2 },
  { state: "VIC", amount: 0 },
];

export default function DashboardPage() {
  const [dateRange] = useState("Jun 1 - Aug 31, 2024");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-8">
      {/* Grainy overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto space-y-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-emerald-900"
          >
            Dashboard
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-emerald-800"
          >
            {dateRange}
          </motion.div>
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-6"
        >
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-emerald-800 mb-2">
              EOI Sent
            </h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-emerald-900">7,052</span>
              <span className="ml-2 text-sm text-emerald-700">$22.5M</span>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-emerald-800 mb-2">
              New Requests
            </h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-emerald-900">34</span>
              <span className="ml-2 text-sm text-emerald-700">$5.9M</span>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-emerald-800 mb-2">
              Total Amount
            </h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-emerald-900">
                $25.5M
              </span>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* State Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">
              Borrowers by State
            </h3>
            <div className="space-y-4">
              {stateData.map((item) => (
                <div
                  key={item.state}
                  className="flex justify-between items-center"
                >
                  <span className="text-emerald-800">{item.state}</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-emerald-100 rounded-full mr-3">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{
                          width: `${(item.amount / 18.6) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-emerald-700">${item.amount}M</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">
              New Request Trend
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorDev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorBuild" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#374151" />
                  <YAxis stroke="#374151" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Development"
                    stroke="#059669"
                    fillOpacity={1}
                    fill="url(#colorDev)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Investment"
                    stroke="#0EA5E9"
                    fillOpacity={1}
                    fill="url(#colorInv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Build and Hold"
                    stroke="#6366F1"
                    fillOpacity={1}
                    fill="url(#colorBuild)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
