"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Leaf,
  BarChart3,
  Shield,
  ArrowRight,
  Globe,
  LineChart,
  Building2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-800">
                greenlit
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 bg-emerald-600 text-white rounded-full
                  hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8 mb-16"
          >
            <h1 className="text-5xl tracking-tighter md:text-6xl lg:text-7xl font-bold text-emerald-900 leading-tight">
              Sustainable Future,{" "}
              <span className="text-emerald-600">Measurable Impact</span>
            </h1>
            <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
              Transform your organization's environmental footprint with
              real-time analytics, intelligent insights, and actionable
              sustainability metrics.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-emerald-600 text-white rounded-full
                  hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/20
                  flex items-center space-x-2 group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-emerald-700 rounded-full
                  hover:bg-white/90 transition-all duration-300 shadow-lg
                  border border-emerald-100"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
            {[
              {
                icon: BarChart3,
                title: "Emissions Analytics",
                description:
                  "Track and analyze your carbon footprint with advanced metrics and real-time monitoring.",
              },
              {
                icon: Shield,
                title: "ESG Reporting",
                description:
                  "Comprehensive environmental, social, and governance reporting tools for better decision-making.",
              },
              {
                icon: Globe,
                title: "Sustainability Goals",
                description:
                  "Set and achieve your sustainability targets with data-driven insights and recommendations.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100
                  hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl
                  group"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center
                  group-hover:bg-emerald-600 transition-colors duration-300 mb-6"
                >
                  <feature.icon
                    className="w-6 h-6 text-emerald-600 group-hover:text-white
                    transition-colors duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-emerald-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { value: "85%", label: "Emission Reduction" },
              { value: "10M+", label: "Data Points Analyzed" },
              { value: "24/7", label: "Real-time Monitoring" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-8 rounded-2xl bg-emerald-50/50 border border-emerald-100"
              >
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-emerald-700">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
