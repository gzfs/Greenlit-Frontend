"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { determineSector } from "@/app/utils/sectorAnalysis";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyDescription: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStepOne = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name) {
      setError("Name is required");
      return false;
    }

    if (!email) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const validateStepTwo = () => {
    const { companyDescription } = formData;

    if (!companyDescription) {
      setError("Company description is required");
      return false;
    }

    if (companyDescription.length < 50) {
      setError(
        "Please provide a more detailed description (minimum 50 characters)"
      );
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    setError("");
    if (step === 1 && validateStepOne()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateStepTwo()) {
      setIsLoading(false);
      return;
    }

    try {
      const { name, email, password, companyDescription } = formData;

      // Determine sector based on description
      const sector = determineSector(companyDescription, companyDescription);

      // Register user
      const registerResponse = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          mission: companyDescription,
          vision: companyDescription,
          sector,
        }),
      });

      // Parse response
      const registerData = await registerResponse.json();

      // Check for error in response
      if (!registerResponse.ok) {
        const errorMessage =
          registerData.message || registerData.details || "Registration failed";

        console.error("Registration error:", errorMessage);
        setError(errorMessage);
        return;
      }

      // Automatically sign in after successful registration
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signInResponse?.error) {
        console.error("Sign-in error:", signInResponse.error);
        throw new Error(signInResponse.error);
      }

      // Redirect to home page or dashboard
      router.push("/");
    } catch (err) {
      console.error("Catch block error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const stepVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
      };
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 relative overflow-hidden">
      {/* Grainy overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
          radial-gradient(circle at top right, rgba(56,189,248,0.2), transparent),
          radial-gradient(circle at bottom left, rgba(16,185,129,0.2), transparent)
        `,
          backgroundBlendMode: "overlay",
          mixBlendMode: "multiply",
        }}
      ></div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-noise"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card backdrop-blur-xl bg-white/30 border border-white/20 shadow-2xl rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-emerald-800 text-center">
            Create Your Account
          </h2>

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={step}
              initial="enter"
              animate="center"
              exit="exit"
              variants={stepVariants}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {step === 1 ? (
                <div className="space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-100/70 backdrop-blur-sm text-red-700 p-3 rounded-lg mb-4 border border-red-200/50"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Input fields with glassmorphic style */}
                  <div className="space-y-4">
                    {[
                      {
                        name: "name",
                        label: "Full Name",
                        type: "text",
                        placeholder: "Enter your full name",
                      },
                      {
                        name: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "Enter your email address",
                      },
                      {
                        name: "password",
                        label: "Password",
                        type: "password",
                        placeholder: "Create a strong password",
                      },
                      {
                        name: "confirmPassword",
                        label: "Confirm Password",
                        type: "password",
                        placeholder: "Confirm your password",
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-emerald-900 mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          required
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 
                            bg-white/50 
                            backdrop-blur-sm 
                            border border-white/30 
                            rounded-xl 
                            focus:ring-emerald-500 
                            focus:border-emerald-500 
                            focus:bg-white/70 
                            transition-all 
                            duration-300"
                        />
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    className="w-full bg-emerald-600/80 backdrop-blur-sm text-white py-3 rounded-xl hover:bg-emerald-700/80 transition-colors"
                  >
                    Next
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-100/70 backdrop-blur-sm text-red-700 p-3 rounded-lg mb-4 border border-red-200/50"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      Tell Us About Your Company
                    </label>
                    <textarea
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="w-full px-4 py-3 
                        bg-white/50 
                        backdrop-blur-sm 
                        border border-white/30 
                        rounded-xl 
                        focus:ring-emerald-500 
                        focus:border-emerald-500 
                        focus:bg-white/70 
                        transition-all 
                        duration-300"
                      placeholder="Share a brief overview of your company, its purpose, key objectives, and what makes it unique. This will help us understand your business and categorize your sector."
                    />
                    <p className="text-xs text-emerald-900/70 mt-1 pl-1">
                      Minimum 50 characters. Include your mission, vision, and
                      key business goals.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(1)}
                      type="button"
                      className="flex-1 bg-gray-200/50 backdrop-blur-sm text-emerald-900 py-3 rounded-xl hover:bg-gray-300/50 transition-colors"
                    >
                      Back
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className={`
                        flex-1 text-white py-3 rounded-xl transition-colors
                        ${
                          isLoading
                            ? "bg-emerald-400/50 backdrop-blur-sm cursor-not-allowed"
                            : "bg-emerald-600/80 backdrop-blur-sm hover:bg-emerald-700/80"
                        }
                      `}
                    >
                      {isLoading ? "Creating Account..." : "Register"}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 text-center">
            <p className="text-sm text-emerald-900/70">
              Already have an account?{" "}
              <a
                href="/auth/signin"
                className="text-emerald-700 hover:underline font-semibold"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
