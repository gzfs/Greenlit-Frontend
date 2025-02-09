"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialSymbolsLightArrowOutward } from "@/app/components/Icons";
import type { ClientUploadedFileData } from "uploadthing/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ESGScore {
  id: string;
  environmental_score: number;
  social_score: number;
  governance_score: number;
  final_score: number;
  created_at: string;
  pdf_url: string;
  explanation: {
    environmental_elements: string[];
    social_elements?: string[];
    governance_elements?: string[];
  };
}

const carbonData = [
  { month: "Jan", emissions: 240 },
  { month: "Feb", emissions: 220 },
  { month: "Mar", emissions: 260 },
  { month: "Apr", emissions: 180 },
  { month: "May", emissions: 190 },
  { month: "Jun", emissions: 170 },
];

const energyData = [
  { name: "Solar", value: 45 },
  { name: "Wind", value: 30 },
  { name: "Hydro", value: 15 },
  { name: "Natural Gas", value: 10 },
];

const COLORS = ["#22c55e", "#3b82f6", "#06b6d4", "#f97316"];

const esgTrendData = [
  { month: "Jan", environmental: 82, social: 75, governance: 88 },
  { month: "Feb", environmental: 85, social: 78, governance: 85 },
  { month: "Mar", environmental: 83, social: 80, governance: 87 },
  { month: "Apr", environmental: 87, social: 82, governance: 89 },
  { month: "May", environmental: 85, social: 85, governance: 90 },
  { month: "Jun", environmental: 88, social: 87, governance: 92 },
];

export default function ESGPage() {
  const { data: session } = useSession();
  const [isCalculating, setIsCalculating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState<ESGScore[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedScore, setSelectedScore] = useState<ESGScore | null>(null);

  // Add new state for metrics
  const [metrics, setMetrics] = useState({
    environmental: {
      current: 0,
      trend: 0,
      carbonFootprint: 0,
      carbonTrend: 0,
      energyUsage: 0,
      energyTrend: 0,
      renewableEnergy: 0,
      renewableTrend: 0,
    },
    social: {
      current: 0,
      trend: 0,
      employeeSatisfaction: 0,
      satisfactionTrend: 0,
      genderDiversity: 0,
      diversityTrend: 0,
      trainingHours: 0,
      trainingTrend: 0,
    },
    governance: {
      current: 0,
      trend: 0,
      boardIndependence: 0,
      independenceTrend: 0,
      ethicsTraining: 0,
      ethicsTrend: 0,
      riskAssessment: 0,
      riskTrend: 0,
    },
  });

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/esg");
      const data = await response.json();
      console.log(data);
      setScores(data);

      // Calculate current scores and trends if there are scores
      if (data.length > 0) {
        const latest = data[0];
        const previous = data[1] || latest;

        setMetrics({
          environmental: {
            current: latest.environmental_score,
            trend: latest.environmental_score - previous.environmental_score,
            carbonFootprint: 182, // You might want to add these to your backend
            carbonTrend: -12,
            energyUsage: 891,
            energyTrend: 3,
            renewableEnergy: 75,
            renewableTrend: 5,
          },
          social: {
            current: latest.social_score,
            trend: latest.social_score - previous.social_score,
            employeeSatisfaction: 4.2,
            satisfactionTrend: 0.3,
            genderDiversity: 42,
            diversityTrend: 5,
            trainingHours: 24,
            trainingTrend: 4,
          },
          governance: {
            current: latest.governance_score,
            trend: latest.governance_score - previous.governance_score,
            boardIndependence: 85,
            independenceTrend: 5,
            ethicsTraining: 100,
            ethicsTrend: 0,
            riskAssessment: 96,
            riskTrend: 2,
          },
        });
      }
    } catch (error) {
      toast.error("Failed to fetch ESG scores");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
    res: ClientUploadedFileData<{ fileUrl: string }>[]
  ) => {
    if (!res?.[0]?.url) return;

    setIsCalculating(true);
    try {
      const response = await fetch("http://172.20.10.9:8000/esg/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdf_url: res[0].url }),
      });

      if (!response.ok) throw new Error("Failed to analyze ESG score");

      const data = await response.json();

      await fetch("/api/esg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdf_url: res[0].url,
          ...data,
        }),
      });

      toast.success("ESG Score calculated successfully");
      fetchScores();
      setShowUpload(false);
    } catch (error) {
      toast.error("Failed to calculate ESG score");
    } finally {
      setIsCalculating(false);
    }
  };

  // Create historical data for the trend chart
  const getHistoricalData = () => {
    return scores
      .slice(0, 6)
      .reverse()
      .map((score) => ({
        month: new Date(score.created_at).toLocaleString("default", {
          month: "short",
        }),
        environmental: score.environmental_score,
        social: score.social_score,
        governance: score.governance_score,
      }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ESG Dashboard</h1>
        <button
          onClick={() => setShowUpload(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Report
        </button>
      </div>

      {/* ESG Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Environmental Score
          </h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.environmental.current}
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.environmental.trend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.environmental.trend > 0 ? "+" : ""}
              {metrics.environmental.trend} vs last month
            </span>
          </div>
          <div className="mt-2">
            <div className="h-2 w-full bg-gray-100 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${metrics.environmental.current}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">Social Score</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">{metrics.social.current}</span>
            <span
              className={`ml-2 text-sm ${
                metrics.social.trend >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {metrics.social.trend > 0 ? "+" : ""}
              {metrics.social.trend} vs last month
            </span>
          </div>
          <div className="mt-2">
            <div className="h-2 w-full bg-gray-100 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${metrics.social.current}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Governance Score
          </h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.governance.current}
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.governance.trend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.governance.trend > 0 ? "+" : ""}
              {metrics.governance.trend} vs last month
            </span>
          </div>
          <div className="mt-2">
            <div className="h-2 w-full bg-gray-100 rounded-full">
              <div
                className="h-2 bg-purple-500 rounded-full"
                style={{ width: `${metrics.governance.current}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Carbon Footprint
          </h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.environmental.carbonFootprint}
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.environmental.carbonTrend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.environmental.carbonTrend > 0 ? "+" : ""}
              {metrics.environmental.carbonTrend}% vs last month
            </span>
          </div>
          <span className="text-gray-400 text-sm">Metric tons CO2e</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">Energy Usage</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.environmental.energyUsage}
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.environmental.energyTrend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.environmental.energyTrend > 0 ? "+" : ""}
              {metrics.environmental.energyTrend}% vs last month
            </span>
          </div>
          <span className="text-gray-400 text-sm">MWh</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Renewable Energy
          </h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.environmental.renewableEnergy}%
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.environmental.renewableTrend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.environmental.renewableTrend > 0 ? "+" : ""}
              {metrics.environmental.renewableTrend}% vs last month
            </span>
          </div>
          <span className="text-gray-400 text-sm">
            Of total energy consumption
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-700 font-semibold mb-4">ESG Scores Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getHistoricalData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="environmental"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Environmental"
                />
                <Line
                  type="monotone"
                  dataKey="social"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Social"
                />
                <Line
                  type="monotone"
                  dataKey="governance"
                  stroke="#a855f7"
                  strokeWidth={2}
                  name="Governance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Energy Mix */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-700 font-semibold mb-4">Energy Mix</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={energyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {energyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {energyData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className="text-sm text-gray-600">
                  {entry.name}: {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Employee Satisfaction
          </h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.social.employeeSatisfaction}
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.social.satisfactionTrend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.social.satisfactionTrend > 0 ? "+" : ""}
              {metrics.social.satisfactionTrend} vs last year
            </span>
          </div>
          <span className="text-gray-400 text-sm">Out of 5.0</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Gender Diversity
          </h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.social.genderDiversity}%
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.social.diversityTrend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.social.diversityTrend > 0 ? "+" : ""}
              {metrics.social.diversityTrend}% vs last year
            </span>
          </div>
          <span className="text-gray-400 text-sm">Women in leadership</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">Training Hours</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.social.trainingHours}
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.social.trainingTrend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.social.trainingTrend > 0 ? "+" : ""}
              {metrics.social.trainingTrend} vs last year
            </span>
          </div>
          <span className="text-gray-400 text-sm">Per employee/year</span>
        </div>
      </div>

      {/* Governance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Board Independence
          </h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.governance.boardIndependence}%
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.governance.independenceTrend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.governance.independenceTrend > 0 ? "+" : ""}
              {metrics.governance.independenceTrend}% vs last year
            </span>
          </div>
          <span className="text-gray-400 text-sm">Independent directors</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">Ethics Training</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.governance.ethicsTraining}%
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.governance.ethicsTrend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.governance.ethicsTrend > 0 ? "+" : ""}
              {metrics.governance.ethicsTrend}% vs last year
            </span>
          </div>
          <span className="text-gray-400 text-sm">Completion rate</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">Risk Assessment</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">
              {metrics.governance.riskAssessment}%
            </span>
            <span
              className={`ml-2 text-sm ${
                metrics.governance.riskTrend >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {metrics.governance.riskTrend > 0 ? "+" : ""}
              {metrics.governance.riskTrend}% vs last year
            </span>
          </div>
          <span className="text-gray-400 text-sm">Coverage score</span>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Upload ESG Report</h3>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isCalculating ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                  <p className="text-gray-600">Analyzing ESG Report...</p>
                </div>
              ) : (
                <UploadDropzone<OurFileRouter>
                  endpoint="pdfUploader"
                  onClientUploadComplete={handleFileUpload}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload failed: ${error.message}`);
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
