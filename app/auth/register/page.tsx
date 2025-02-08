"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { determineSector } from "@/app/utils/sectorAnalysis";
import Image from "next/image";
import { toast } from "sonner";
import { TablerCloverFilled } from "@/app/components/Icons";
import { onest } from "@/app/layout";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    missionAndVision: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please make sure your passwords match",
      });
      return;
    }

    setIsLoading(true);
    const sector = determineSector(formData.missionAndVision, "");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          mission: formData.missionAndVision,
          vision: formData.missionAndVision,
          sector,
        }),
      });

      if (response.ok) {
        toast.success("Registration successful", {
          description: "Please sign in with your credentials",
        });
        router.push("/auth/signin");
      } else {
        const data = await response.json();
        toast.error("Registration failed", {
          description: data.error || "Please try again",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      {/* Grainy overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl  gap-8 my-8"
      >
        {/* Form Section */}
        <div className="flex-1">
          <div className="backdrop-blur-lg border border-emerald-400/40 bg-white/10 p-8 rounded-3xl shadow-[0px_0px_30px_rgba(255,255,255,0.1)]">
            <p
              className={`${onest.className} text-4xl font-semibold space-x-2 text-center text-emerald-700 tracking-tighter mb-6`}
            >
              <TablerCloverFilled className="inline-block text-5xl" />
              <span>greenlit</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-emerald-700 mb-1 block">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="border text-emerald-800 border-emerald-400/40 p-3 shadow-none resize-none rounded-xl"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-emerald-700 mb-1 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="border text-emerald-800 border-emerald-400/40 p-3 shadow-none resize-none rounded-xl"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="text-sm tracking-tight text-emerald-700 mb-1 block">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    className="border text-emerald-800 border-emerald-400/40 p-3 shadow-none resize-none rounded-xl"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="text-sm tracking-tight text-emerald-700 mb-1 block">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    className="border text-emerald-800 border-emerald-400/40 p-3 shadow-none resize-none rounded-xl"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm tracking-tight text-emerald-700 mb-1 block">
                  Company Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your company name"
                  className="border text-emerald-800 border-emerald-400/40 p-3 shadow-none resize-none rounded-xl"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm tracking-tight text-emerald-700 mb-1 block">
                  Description of your Company
                </label>
                <Textarea
                  placeholder="Describe your company's mission and vision..."
                  value={formData.missionAndVision}
                  className="border text-emerald-800 border-emerald-400/40 shadow-none resize-none p-3 rounded-xl"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      missionAndVision: e.target.value,
                    })
                  }
                  required
                />
                <p className="mt-1.5 text-xs text-emerald-600/60">
                  Share your company's purpose and future aspirations
                </p>
              </div>

              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl transition-all duration-200 font-medium
                  relative
                  ${
                    isLoading
                      ? "bg-emerald-700/30 cursor-not-allowed"
                      : "bg-emerald-700/50 hover:bg-emerald-700/90"
                  }
                  text-white`}
              >
                <span className={isLoading ? "opacity-0" : "opacity-100"}>
                  Create Account
                </span>
                {isLoading && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-emerald-600">
                Already have an account?{" "}
                <a
                  href="/auth/signin"
                  className="font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
