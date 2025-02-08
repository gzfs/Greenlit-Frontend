"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { MaterialSymbolsLightArrowOutward } from "./components/Icons";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { categories, boxes } from "@/data/Mock";
import { Button } from "@/components/ui/button";
import { PluginMarketplaceModal } from "@/app/components/PluginMarketplaceModal";
import { convertPluginToCategory } from "@/lib/plugin-utils";
import { QuestionPlugin } from "@/types/plugin";
import { Category } from "@/types/types";
import {
  calculateProgress,
  getTotalProgress,
  ProgressData,
} from "@/lib/progress-utils";
import {
  saveAnswers,
  loadAnswers,
  saveInstalledPlugins,
  loadInstalledPlugins,
} from "@/lib/storage-utils";
import { X } from "lucide-react";

export default function Home() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 3;
  const router = useRouter();
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [enabledPlugins, setEnabledPlugins] = useState<QuestionPlugin[]>([]);
  const [progressData, setProgressData] = useState<ProgressData>({});
  const animatedProgress = useSpring(0);

  // Load saved data on mount
  useEffect(() => {
    const savedAnswers = loadAnswers();
    const savedPlugins = loadInstalledPlugins();

    setAnswers(savedAnswers);
    setEnabledPlugins(savedPlugins);
  }, []);

  // Save answers when they change
  useEffect(() => {
    saveAnswers(answers);
  }, [answers]);

  // Save plugins when they change
  useEffect(() => {
    saveInstalledPlugins(enabledPlugins);
  }, [enabledPlugins]);

  // Update progress when answers or plugins change
  useEffect(() => {
    const newProgressData = calculateProgress(
      categories,
      enabledPlugins,
      answers
    );
    setProgressData(newProgressData);

    const totalProgress = getTotalProgress(newProgressData);
    animatedProgress.set(totalProgress);
  }, [answers, enabledPlugins]);

  // Convert enabled plugins to categories
  const pluginCategories = enabledPlugins.reduce((acc, plugin) => {
    const category = convertPluginToCategory(plugin);
    acc[plugin.standard] = category;
    return acc;
  }, {} as Record<string, Category>);

  // Combine built-in boxes with plugin boxes
  const allBoxes = [
    ...boxes,
    ...enabledPlugins.map((plugin, index) => ({
      id: boxes.length + index + 1,
      title: plugin.name,
      description: plugin.description,
      category: plugin.standard,
    })),
  ];

  const handleAnswerChange = (questionId: string, value: any) => {
    const newAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(newAnswers);

    // Calculate total questions (built-in + plugins)
    const builtInQuestions = Object.values(categories).reduce(
      (acc, cat) => acc + cat.questions.length,
      0
    );
    const pluginQuestions = enabledPlugins.reduce(
      (acc, plugin) => acc + plugin.questions.length,
      0
    );
    const totalQuestions = builtInQuestions + pluginQuestions;

    // Calculate progress
    const answeredQuestions = Object.keys(newAnswers).length;
    const newProgress = (answeredQuestions / totalQuestions) * 100;
    setProgress(newProgress);

    // Check if all questions are answered
    if (newProgress === 100) {
      setIsComplete(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  };

  // Calculate remaining questions
  const getTotalAndAnsweredQuestions = () => {
    const builtInQuestions = Object.values(categories).reduce(
      (acc, cat) => acc + cat.questions.length,
      0
    );
    const pluginQuestions = enabledPlugins.reduce(
      (acc, plugin) => acc + plugin.questions.length,
      0
    );
    const totalQuestions = builtInQuestions + pluginQuestions;
    const answeredQuestions = Object.keys(answers).length;
    const remainingQuestions = totalQuestions - answeredQuestions;

    return {
      total: totalQuestions,
      answered: answeredQuestions,
      remaining: remainingQuestions,
    };
  };

  // Update getCurrentQuestions to handle plugin questions
  const getCurrentQuestions = () => {
    if (!selectedBox) return [];
    const box = allBoxes[selectedBox - 1];

    // Check if it's a built-in category
    if (selectedBox <= boxes.length) {
      return categories[box.category]?.questions || [];
    }

    // It's a plugin category
    const pluginIndex = selectedBox - boxes.length - 1;
    const plugin = enabledPlugins[pluginIndex];
    return pluginCategories[plugin.standard]?.questions || [];
  };

  const questions = getCurrentQuestions();
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handleNext = () => {
    if (currentPage === totalPages - 1) {
      // Handle submission
      setSelectedBox(null); // Close the modal
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler for plugin installation
  const handlePluginInstall = (plugin: QuestionPlugin) => {
    setEnabledPlugins((current) => {
      const updated = [...current, plugin];
      saveInstalledPlugins(updated);
      return updated;
    });
  };

  // Handler for plugin uninstallation
  const handlePluginUninstall = (pluginId: string) => {
    setEnabledPlugins((current) => {
      const updated = current.filter((plugin) => plugin.id !== pluginId);
      saveInstalledPlugins(updated);
      return updated;
    });
  };

  return (
    <main className="grid grid-cols-12 relative min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <Sidebar />

      {/* Loading Overlay */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-md bg-emerald-50/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-medium text-emerald-800"
              >
                Building your dashboard
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-emerald-600"
              >
                This will just take a moment...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="col-span-9 w-full place-self-center relative">
        <AnimatePresence mode="wait">
          {selectedBox ? (
            <motion.div
              key="enlarged"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 filter backdrop-blur-md w-[600px]"
            >
              <motion.div
                layout
                initial={{ borderRadius: 40 }}
                className="rounded-[40px] border border-emerald-400/40 p-8 bg-emerald-400/10 relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold text-emerald-700">
                      {allBoxes[selectedBox - 1].title}
                    </h2>
                    <p className="text-sm text-emerald-600">
                      Page {currentPage + 1} of {totalPages}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer p-2 hover:bg-emerald-400/10 rounded-full"
                    onClick={() => setSelectedBox(null)}
                  >
                    <X className="h-5 w-5 text-emerald-600" />
                  </motion.div>
                </div>

                <div>
                  {currentQuestions.map((question) => (
                    <div key={question.id} className="space-y-2">
                      <label className="text-sm font-medium text-emerald-700">
                        {question.text}
                      </label>
                      {question.type === "number" && (
                        <input
                          type="number"
                          className="w-full px-4 py-3 rounded-xl border border-emerald-400/40 
                          bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 
                          focus:ring-emerald-400/40 focus:bg-white/30 transition-all duration-200
                          placeholder:text-emerald-800/40 text-emerald-800"
                          placeholder={`Enter ${question.unit?.toLowerCase()}`}
                          value={answers[question.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                        />
                      )}
                      {question.type === "percentage" && (
                        <div
                          className="space-y-2 p-4 rounded-xl border border-emerald-400/40 
                          bg-white/20 backdrop-blur-sm"
                        >
                          <Slider
                            defaultValue={[answers[question.id] || 0]}
                            max={100}
                            step={1}
                            onValueChange={(value) =>
                              handleAnswerChange(question.id, value[0])
                            }
                          />
                          <div className="flex justify-between text-xs text-emerald-700">
                            <span>{answers[question.id] || 0}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      )}
                      {question.type === "boolean" && (
                        <div
                          className="flex items-center gap-3 p-4 rounded-xl border 
                          border-emerald-400/40 bg-white/10 backdrop-blur-sm
                          hover:bg-white/20 transition-all duration-200"
                        >
                          <Checkbox
                            checked={answers[question.id] || false}
                            onCheckedChange={(checked) =>
                              handleAnswerChange(question.id, checked)
                            }
                          />
                          <label className="text-sm text-emerald-700 select-none cursor-pointer">
                            Yes
                          </label>
                        </div>
                      )}
                      {question.type === "text" && (
                        <textarea
                          className="w-full px-4 py-3 rounded-xl border border-emerald-400/40 
                          bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 
                          focus:ring-emerald-400/40 focus:bg-white/30 transition-all duration-200
                          placeholder:text-emerald-800/40 text-emerald-800 min-h-[100px] resize-none"
                          placeholder="Enter detailed description"
                          value={answers[question.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                        />
                      )}
                      <span className="text-xs text-emerald-600/80 pl-1">
                        Code: {question.code}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    className={`
                      px-6 py-2.5 rounded-xl backdrop-blur-sm
                      border border-emerald-400/40 transition-all duration-200
                      ${
                        currentPage === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-emerald-400/10"
                      }
                    `}
                  >
                    Previous
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className={`
                      px-6 py-2.5 rounded-xl backdrop-blur-sm
                      border border-emerald-400/40 transition-all duration-200
                      hover:bg-emerald-400/10
                    `}
                  >
                    {currentPage === totalPages - 1 ? "Submit" : "Next"}
                  </motion.button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <motion.div
                      key={index}
                      className={`
                        w-2 h-2 rounded-full transition-all duration-200
                        ${
                          currentPage === index
                            ? "bg-emerald-400 scale-125"
                            : "bg-emerald-400/30"
                        }
                      `}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setCurrentPage(index)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 m-4"
            >
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setIsMarketplaceOpen(true)}
                  className="border-emerald-400/40 bg-white/10 backdrop-blur-sm"
                >
                  <span className="mr-2">🔌</span>
                  ESG Standards
                </Button>
              </div>

              <div className="flex gap-5 flex-wrap justify-center">
                {allBoxes.map((box) => (
                  <motion.div
                    key={box.id}
                    layout
                    className="w-[250px] filter backdrop-blur-md h-[200px] rounded-[40px] border border-emerald-400/40 p-4 bg-emerald-400/10 hover:bg-emerald-400/20 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedBox(box.id)}
                  >
                    <div className="flex w-full justify-end">
                      <div className="p-3.5 bg-emerald-400/20 w-fit rounded-full border border-emerald-400/40">
                        <MaterialSymbolsLightArrowOutward className="text-xl text-emerald-700" />
                      </div>
                    </div>

                    <motion.div>
                      <h3 className="text-xl font-medium tracking-tight text-emerald-700 mb-2">
                        {box.title}
                      </h3>
                      <p className="text-xs font-light text-emerald-700">
                        {box.description}
                      </p>
                      {box.category && (
                        <span className="inline-block border border-emerald-400/40 mt-2 text-xs text-emerald-600 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                          {box.category}
                        </span>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="w-fit mx-auto space-y-4">
                {/* Overall Progress */}
                <div className="relative space-y-2">
                  <Progress
                    value={progress}
                    className="w-[600px] h-2 border border-emerald-400/40"
                  />
                  <div className="flex justify-between text-xs text-emerald-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <motion.span>
                        {Math.round(animatedProgress.get())}% Complete
                      </motion.span>
                    </div>
                    <div className="flex gap-4">
                      <span>
                        {getTotalAndAnsweredQuestions().answered} questions
                        completed
                      </span>
                      <span className="text-emerald-500">
                        {getTotalAndAnsweredQuestions().remaining} remaining
                      </span>
                    </div>
                  </div>
                </div>

                {/* Per-Category Progress */}
                <div className="space-y-2">
                  {Object.entries(progressData).map(([category, progress]) => (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-xs text-emerald-600">
                        <span>{category}</span>
                        <span>{Math.round(progress.percentage)}%</span>
                      </div>
                      <div className="relative h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-emerald-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.percentage}%` }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <PluginMarketplaceModal
          isOpen={isMarketplaceOpen}
          onClose={() => setIsMarketplaceOpen(false)}
          onInstall={handlePluginInstall}
          onUninstall={handlePluginUninstall}
          installedPlugins={new Set(enabledPlugins.map((p) => p.id))}
        />
      </div>
    </main>
  );
}
