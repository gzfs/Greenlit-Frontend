"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Target,
  Leaf,
  TrendingUp,
  Shield,
  BarChart3,
  BookOpen,
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

const COLORS = ["#22c55e", "#3b82f6", "#06b6d4", "#f97316"];

const competitorCSRData = [
  { name: "Environmental", count: 8, percentage: 100 },
  { name: "Social", count: 7, percentage: 87.5 },
  { name: "Governance", count: 8, percentage: 100 },
  { name: "Community", count: 6, percentage: 75 },
];

const suggestedActivitiesData = [
  { name: "Green IT", impact: 85 },
  { name: "Financial Literacy", impact: 75 },
  { name: "Supply Chain", impact: 70 },
  { name: "Volunteering", impact: 65 },
  { name: "Workforce Diversity", impact: 80 },
];

// Add new governance data
const governanceData = {
  regulatoryBenefits: [
    { name: "Customer Trust", value: 85 },
    { name: "Operational Efficiency", value: 78 },
    { name: "Risk Reduction", value: 92 },
  ],

  riskFactors: [
    { name: "Non-compliance", severity: 75 },
    { name: "Reputation", severity: 85 },
    { name: "Legal", severity: 80 },
  ],
};

export default function AgentAggregation() {
  return (
    <div className="p-8 space-y-12 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-800">
          Agent Aggregation Analysis
        </h1>
      </div>

      {/* Company Overview */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold text-emerald-800 border-b border-emerald-100 pb-4">
          Company Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                Company Details
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-emerald-700">
                <span className="font-medium">Company:</span> Temenos
              </p>
              <p className="text-emerald-700">
                <span className="font-medium">Industry:</span> IT and Banking
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                Key Competitors
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                "IBM",
                "Dell Technologies",
                "Microsoft",
                "Salesforce",
                "JPMorgan Chase",
                "Goldman Sachs",
                "SAP",
                "Accenture",
              ].map((competitor) => (
                <div
                  key={competitor}
                  className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-1"
                >
                  {competitor}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitor CSR Analysis */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold text-emerald-800 border-b border-emerald-100 pb-4">
          Competitor CSR Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                CSR Activity Distribution
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competitorCSRData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">Focus Areas</h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: <Leaf className="w-4 h-4" />,
                  title: "Environmental Initiatives",
                  description:
                    "Focus on renewable energy, carbon reduction, and sustainable practices",
                },
                {
                  icon: <Users className="w-4 h-4" />,
                  title: "Social Responsibility",
                  description:
                    "Employee development, diversity, and community engagement",
                },
                {
                  icon: <Shield className="w-4 h-4" />,
                  title: "Governance",
                  description:
                    "Ethical practices, transparency, and regulatory compliance",
                },
                {
                  icon: <TrendingUp className="w-4 h-4" />,
                  title: "Sustainability",
                  description:
                    "Long-term environmental and social impact considerations",
                },
              ].map((area) => (
                <div
                  key={area.title}
                  className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg"
                >
                  <div className="text-emerald-600 mt-1">{area.icon}</div>
                  <div>
                    <h4 className="font-medium text-emerald-800">
                      {area.title}
                    </h4>
                    <p className="text-sm text-emerald-600">
                      {area.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Suggested Activities */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold text-emerald-800 border-b border-emerald-100 pb-4">
          Suggested Activities
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                Impact Assessment
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={suggestedActivitiesData}
                  layout="vertical"
                  margin={{ left: 120 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="impact" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                Activity Details
              </h3>
            </div>
            {[
              {
                name: "Green IT Initiative",
                description:
                  "Focus on reducing energy consumption and emissions in data centers",
              },
              {
                name: "Financial Literacy Program",
                description:
                  "Empower communities with essential financial skills",
              },
              {
                name: "Sustainable Supply Chain",
                description:
                  "Promote responsible sourcing and ethical labor standards",
              },
              {
                name: "Employee Volunteer Program",
                description: "Encourage community service and engagement",
              },
              {
                name: "Inclusive Workforce Initiative",
                description: "Promote diversity and inclusion in the workplace",
              },
            ].map((activity) => (
              <div
                key={activity.name}
                className="p-4 bg-emerald-50 rounded-lg space-y-2"
              >
                <h4 className="font-medium text-emerald-800">
                  {activity.name}
                </h4>
                <p className="text-sm text-emerald-600">
                  {activity.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Add new Governance Analytics section */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold text-emerald-800 border-b border-emerald-100 pb-4">
          Governance Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Regulatory Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                Regulatory Impact Analysis
              </h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-medium text-emerald-800 mb-2">
                  Compliance Requirements
                </h4>
                <p className="text-sm text-emerald-600 leading-relaxed">
                  Temenos must adhere to a range of regulatory requirements
                  including data privacy and security, transparency in business
                  operations, and industry-specific standards.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-emerald-800 mb-3">
                  Regulatory Benefits
                </h4>
                <div className="space-y-3">
                  {governanceData.regulatoryBenefits.map((benefit) => (
                    <div key={benefit.name} className="space-y-1">
                      <div className="flex justify-between text-sm text-emerald-800">
                        <span>{benefit.name}</span>
                        <span>{benefit.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${benefit.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                Risk Assessment
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={governanceData.riskFactors}
                  layout="vertical"
                  margin={{ left: 100 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="severity" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-1">
                  Risk Mitigation
                </h4>
                <ul className="text-sm text-orange-600 space-y-1">
                  <li>• Regular compliance audits and updates</li>
                  <li>• Proactive reputation management</li>
                  <li>• Robust legal framework and documentation</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ESG Governance Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-emerald-200 bg-white lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                ESG Governance Impact Factors
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Legal & Financial Risk",
                  description:
                    "Reduced exposure to legal and financial risks through robust governance",
                  icon: <Shield className="w-4 h-4" />,
                },
                {
                  title: "Operational Efficiency",
                  description:
                    "Improved operational efficiency through streamlined processes",
                  icon: <TrendingUp className="w-4 h-4" />,
                },
                {
                  title: "Customer Trust",
                  description:
                    "Increased customer trust through transparent practices",
                  icon: <Users className="w-4 h-4" />,
                },
              ].map((factor) => (
                <div
                  key={factor.title}
                  className="p-4 bg-emerald-50 rounded-lg space-y-2"
                >
                  <div className="flex items-center gap-2 text-emerald-600">
                    {factor.icon}
                    <h4 className="font-medium text-emerald-800">
                      {factor.title}
                    </h4>
                  </div>
                  <p className="text-sm text-emerald-600">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
