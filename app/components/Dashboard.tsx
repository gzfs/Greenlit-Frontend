"use client";

import { motion } from "framer-motion";
import { DashboardVisualizations } from "./DashboardVisualizations";
import { mockVisualizationData } from "@/data/mockAnalytics";

export function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <h1 className="text-4xl font-medium tracking-tight text-emerald-800 mb-8">
        Dashboard
      </h1>
      <DashboardVisualizations
        data={mockVisualizationData}
        comparative={true}
      />
    </motion.div>
  );
}
