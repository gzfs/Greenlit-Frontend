"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Zap,
  Trash2,
  Home,
  BarChart3,
  Loader2,
  Globe,
  Database,
  Calculator,
} from "lucide-react";
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
} from "recharts";
import { LoadingSteps } from "@/app/components/LoadingSteps";
import { AnimatePresence } from "framer-motion";

interface EmissionsData {
  calculation_breakdown: {
    average_commute_distance: number;
    emissions_per_km: number;
    energy_consumption_kwh: number;
    wfh_emissions_per_employee: number;
  };
  commute_emissions: number;
  electricity_emissions: {
    by_source: {
      coal: number;
      gas: number;
      hydro: number;
      nuclear: number;
      other: number;
      solar: number;
      wind: number;
    };
    total: number;
  };
  td_losses: number;
  total_emissions: number;
  waste_emissions: number;
  wfh_emissions: number;
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#06b6d4",
  "#f97316",
  "#a855f7",
  "#ec4899",
  "#64748b",
];

export default function EmissionsCalculator() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employees_count: 100,
    wfh_employees_count: 30,
    electricity_consumption_kwh: 500000,
    td_losses: 5.5,
    waste_emissions: 2.3,
    location: "Germany",
  });
  const [emissionsData, setEmissionsData] = useState<EmissionsData | null>(
    null
  );
  const [loadingSteps, setLoadingSteps] = useState([
    {
      id: 1,
      title: "Gathering Data",
      description: "Collecting environmental data from various sources",
      icon: Globe,
      status: "pending" as const,
    },
    {
      id: 2,
      title: "Processing Information",
      description: "Aggregating and analyzing collected data",
      icon: Database,
      status: "pending" as const,
    },
    {
      id: 3,
      title: "Calculating Emissions",
      description: "Computing final emissions values",
      icon: Calculator,
      status: "pending" as const,
    },
  ]);
  const updateLoadingStep = (
    stepId: number,
    status: "pending" | "loading" | "completed"
  ) => {
    setLoadingSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, status } : step))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Gathering Data
      updateLoadingStep(1, "loading");
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
      updateLoadingStep(1, "completed");

      // Step 2: Processing Information
      updateLoadingStep(2, "loading");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      updateLoadingStep(2, "completed");

      // Step 3: Calculating Emissions
      updateLoadingStep(3, "loading");
      const response = await fetch(
        "http://172.20.10.9:8000/emissions/calculate-emissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      updateLoadingStep(3, "completed");

      setEmissionsData(data);
    } catch (error) {
      console.error("Failed to calculate emissions:", error);
    } finally {
      setLoading(false);
      // Reset steps for next calculation
      setLoadingSteps((prev) =>
        prev.map((step) => ({ ...step, status: "pending" }))
      );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "location" ? value : Number(value),
    }));
  };

  const formatEmissions = (value: number) => {
    return `${(value / 1000).toFixed(2)} tCO2e`;
  };

  return (
    <div className="p-8 space-y-12 max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold text-emerald-800">
        Emissions Calculator
      </h1>

      <AnimatePresence>
        {loading && <LoadingSteps steps={loadingSteps} />}
      </AnimatePresence>

      {/* Input Form */}
      <section className="space-y-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-700">
                  Total Employees
                </label>
                <input
                  type="number"
                  name="employees_count"
                  value={formData.employees_count}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-700">
                  WFH Employees
                </label>
                <input
                  type="number"
                  name="wfh_employees_count"
                  value={formData.wfh_employees_count}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-700">
                  Electricity (kWh)
                </label>
                <input
                  type="number"
                  name="electricity_consumption_kwh"
                  value={formData.electricity_consumption_kwh}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-700">
                  T&D Losses (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="td_losses"
                  value={formData.td_losses}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-700">
                  Waste Emissions
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="waste_emissions"
                  value={formData.waste_emissions}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-700">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="UK">UK</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate Emissions"
                )}
              </button>
            </div>
          </motion.div>
        </form>
      </section>

      {/* Results */}
      {emissionsData && (
        <section className="space-y-8">
          <h2 className="text-xl font-semibold text-emerald-800 border-b border-emerald-100 pb-4">
            Emissions Analysis
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-emerald-200 bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">
                  Total Emissions
                </h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                {formatEmissions(emissionsData.total_emissions)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-emerald-200 bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">Electricity</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                {formatEmissions(emissionsData.electricity_emissions.total)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-emerald-200 bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">
                  WFH Emissions
                </h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                {formatEmissions(emissionsData.wfh_emissions)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-emerald-200 bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">
                  Waste Emissions
                </h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                {formatEmissions(emissionsData.waste_emissions)}
              </p>
            </motion.div>
          </div>

          {/* Electricity Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-emerald-200 bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">
                  Electricity Emissions by Source
                </h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(
                        emissionsData.electricity_emissions.by_source
                      ).map(([name, value]) => ({
                        name,
                        value,
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {Object.entries(
                        emissionsData.electricity_emissions.by_source
                      ).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatEmissions(Number(value))}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {Object.entries(
                  emissionsData.electricity_emissions.by_source
                ).map(([source, value], index) => (
                  <div key={source} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-emerald-600 capitalize">
                      {source}: {formatEmissions(value)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Additional charts or breakdowns can be added here */}
          </div>
        </section>
      )}
    </div>
  );
}
