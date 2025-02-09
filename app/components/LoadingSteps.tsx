import { motion } from "framer-motion";
import { Check, Loader2, Globe, Database, Calculator } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  status: "pending" | "loading" | "completed";
}

interface LoadingStepsProps {
  steps: Step[];
}

export function LoadingSteps({ steps }: LoadingStepsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999]"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 max-w-xl w-full mx-4 shadow-2xl border border-white/20"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-emerald-500/20 blur-2xl rounded-full" />
          <h3 className="relative text-xl font-semibold text-emerald-800 text-center mb-8">
            Calculating Emissions
          </h3>
        </div>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              key={step.id}
              className={`flex items-start gap-4 p-5 rounded-xl transition-all duration-300 ${
                step.status === "loading"
                  ? "bg-emerald-50/80 border-2 border-emerald-200 shadow-lg"
                  : step.status === "completed"
                  ? "bg-emerald-50/50 border border-emerald-100"
                  : "bg-gray-50/50 border border-gray-100"
              }`}
            >
              <div className="mt-1">
                {step.status === "completed" ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center ring-4 ring-emerald-50">
                    <Check className="w-5 h-5 text-emerald-600" />
                  </div>
                ) : step.status === "loading" ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center ring-4 ring-emerald-50">
                    <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-gray-50">
                    <step.icon className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4
                  className={`font-medium text-lg mb-1 ${
                    step.status === "loading"
                      ? "text-emerald-800"
                      : step.status === "completed"
                      ? "text-emerald-700"
                      : "text-gray-600"
                  }`}
                >
                  {step.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed ${
                    step.status === "loading"
                      ? "text-emerald-600"
                      : step.status === "completed"
                      ? "text-emerald-500"
                      : "text-gray-500"
                  }`}
                >
                  {step.description}
                </p>
              </div>
              {step.status === "completed" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-emerald-600" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
