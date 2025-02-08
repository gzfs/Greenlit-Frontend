"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { onest } from "@/app/layout";
import { TablerCloverFilled } from "@/app/components/Icons";
import { toast } from "sonner";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
      } else {
        toast.error("Sign in failed", {
          description: "Please check your email and password",
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
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-lg p-8 rounded-3xl border border-emerald-400/40">
          <p
            className={`${onest.className} text-4xl font-semibold space-x-2 text-center text-emerald-700 tracking-tighter mb-6`}
          >
            <TablerCloverFilled className="inline-block text-5xl" />
            <span>greenlit</span>
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm tracking-tight text-emerald-700 mb-1 block">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="border border-emerald-400/40 p-3 shadow-none resize-none rounded-xl"
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
                placeholder="Enter your password"
                className="border border-emerald-400/40 p-3 shadow-none resize-none rounded-xl"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
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
                Continue
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
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
