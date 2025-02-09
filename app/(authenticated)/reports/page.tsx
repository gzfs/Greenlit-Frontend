"use client";

import { cloneElement, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  Share2,
  Loader2,
  Leaf,
  Users,
  Shield,
  TrendingUp,
} from "lucide-react";
import { ComparativeAnalytics } from "@/app/components/ComparativeAnalytics";
import { EmployeeSentimentAnalytics } from "@/app/components/EmployeeSentimentAnalytics";
import { mockVisualizationData } from "@/app/data/mockAnalytics";
import { generatePDF } from "@/lib/pdf-utils";

const insightCategories = [
  {
    title: "Environmental Impact",
    icon: <Leaf className="w-5 h-5 text-emerald-600" />,
    insights: [
      "Carbon emissions reduced by 15% through renewable energy adoption",
      "Water consumption efficiency improved by 10% via smart monitoring",
      "Achieved 85% waste recycling rate, up from 72% last year",
      "Implemented IoT-based energy management across 12 facilities",
    ],
  },
  {
    title: "Social Responsibility",
    icon: <Users className="w-5 h-5 text-emerald-600" />,
    insights: [
      "Employee satisfaction reached 82%, a 8% increase from previous year",
      "Diversity hiring increased by 25% across all departments",
      "Launched 5 new community development programs",
      "Invested $2.5M in employee training and development",
    ],
  },
  {
    title: "Governance & Compliance",
    icon: <Shield className="w-5 h-5 text-emerald-600" />,
    insights: [
      "100% compliance with environmental regulations",
      "Established new ESG oversight committee",
      "Enhanced supply chain transparency by 40%",
      "Zero major compliance incidents reported",
    ],
  },
];

export default function Reports() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const overlay = document.createElement("div");
      overlay.id = "pdf-loading-overlay";
      overlay.className =
        "fixed inset-0 bg-black/50 flex items-center justify-center z-50";
      overlay.innerHTML = `
        <div class="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
          <div class="animate-spin text-emerald-600">
            <svg class="w-8 h-8" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          </div>
          <div class="text-emerald-800 font-medium">Generating PDF Report...</div>
        </div>
      `;
      document.body.appendChild(overlay);

      await generatePDF();

      document.body.removeChild(overlay);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 space-y-12 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-800">
          ESG Performance Reports
        </h1>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateReport}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium 
              ${
                isGenerating ? "opacity-75 cursor-wait" : "hover:bg-emerald-700"
              }`}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isGenerating ? "Generating..." : "Export PDF Report"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-50"
          >
            <Share2 className="w-5 h-5" />
            Share Report
          </motion.button>
        </div>
      </div>

      <div id="report-content" className="space-y-12">
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-emerald-800 border-b border-emerald-100 pb-4">
            Executive Summary
          </h2>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl border border-emerald-400/40 backdrop-blur-md"
            >
              <div className="flex items-center gap-4 mb-6">
                <FileText className="w-8 h-8 text-emerald-600" />
                <h3 className="text-2xl font-semibold text-emerald-800">
                  Report Overview
                </h3>
              </div>
              <div className="space-y-6 text-emerald-700">
                <p className="text-lg leading-relaxed">
                  This comprehensive ESG report showcases our commitment to
                  sustainable practices and responsible business operations. Our
                  data-driven approach has led to significant improvements
                  across all key performance indicators.
                </p>
                <div className="grid grid-cols-3 gap-8">
                  <div className="p-6 rounded-xl bg-emerald-50/50">
                    <div className="text-base font-medium">
                      Environmental Score
                    </div>
                    <div className="text-4xl font-bold text-emerald-600 mt-2">
                      85%
                    </div>
                    <div className="text-sm text-emerald-600/60 mt-2">
                      ↑ 12% from 2022
                    </div>
                  </div>
                  <div className="p-6 rounded-xl bg-emerald-50/50">
                    <div className="text-base font-medium">Social Score</div>
                    <div className="text-4xl font-bold text-emerald-600 mt-2">
                      78%
                    </div>
                    <div className="text-sm text-emerald-600/60 mt-2">
                      ↑ 8% from 2022
                    </div>
                  </div>
                  <div className="p-6 rounded-xl bg-emerald-50/50">
                    <div className="text-base font-medium">
                      Governance Score
                    </div>
                    <div className="text-4xl font-bold text-emerald-600 mt-2">
                      82%
                    </div>
                    <div className="text-sm text-emerald-600/60 mt-2">
                      ↑ 10% from 2022
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl border border-emerald-400/40 backdrop-blur-md"
            >
              <div className="flex items-center gap-4 mb-6">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
                <h3 className="text-2xl font-semibold text-emerald-800">
                  Year-over-Year Performance
                </h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Carbon Reduction",
                    value: "15%",
                    description: "Through renewable energy adoption",
                    trend: "positive",
                  },
                  {
                    label: "Energy Efficiency",
                    value: "22%",
                    description: "Improved facility management",
                    trend: "positive",
                  },
                  {
                    label: "Water Conservation",
                    value: "10%",
                    description: "Smart monitoring systems",
                    trend: "positive",
                  },
                  {
                    label: "Waste Management",
                    value: "85%",
                    description: "Recycling rate achieved",
                    trend: "positive",
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="p-6 rounded-xl bg-emerald-50/50 space-y-2"
                  >
                    <div className="text-base font-medium text-emerald-800">
                      {metric.label}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-emerald-600">
                        {metric.value}
                      </span>
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="text-sm text-emerald-600/80">
                      {metric.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-emerald-800 border-b border-emerald-100 pb-4">
            Detailed Insights
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {insightCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-2xl border border-emerald-400/40 backdrop-blur-md"
              >
                <div className="flex items-center gap-4 mb-6">
                  {cloneElement(category.icon, {
                    className: "w-8 h-8 text-emerald-600",
                  })}
                  <h3 className="text-2xl font-semibold text-emerald-800">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-4 text-emerald-700">
                  {category.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-1.5">•</span>
                      <span className="text-base leading-relaxed">
                        {insight}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-emerald-800 border-b border-emerald-100 pb-4">
            Performance Analytics
          </h2>
          <div className="space-y-12">
            <ComparativeAnalytics data={mockVisualizationData.comparative} />
            <EmployeeSentimentAnalytics />
          </div>
        </section>
      </div>
    </div>
  );
}
