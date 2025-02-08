"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { MaterialSymbolsLightArrowOutward } from "./components/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { categories, boxes } from "@/data/Mock";

export default function Home() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 3;
  const router = useRouter();

  const handleAnswerChange = (questionId: string, value: any) => {
    const newAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(newAnswers);

    // Calculate progress
    const totalQuestions = Object.values(categories).reduce(
      (acc, cat) => acc + cat.questions.length,
      0
    );
    const answeredQuestions = Object.keys(newAnswers).length;
    const newProgress = (answeredQuestions / totalQuestions) * 100;
    setProgress(newProgress);

    // Check if all questions are answered
    if (newProgress === 100) {
      setIsComplete(true);
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  };

  const getCurrentQuestions = () => {
    if (!selectedBox) return [];
    const category = categories[boxes[selectedBox - 1].category];
    if (!category) return [];
    return category.questions;
  };

  const questions = getCurrentQuestions();
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
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
                      {boxes[selectedBox - 1].title}
                    </h2>
                    <p className="text-sm text-emerald-600">
                      Page {currentPage + 1} of {totalPages}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: 45 }}
                    className="cursor-pointer p-2 hover:bg-emerald-400/10 rounded-full"
                    onClick={() => setSelectedBox(null)}
                  >
                    <MaterialSymbolsLightArrowOutward className="text-2xl text-emerald-400" />
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
                          border-emerald-400/40 bg-white/20 backdrop-blur-sm"
                        >
                          <Checkbox
                            checked={answers[question.id] || false}
                            onCheckedChange={(checked) =>
                              handleAnswerChange(question.id, checked)
                            }
                            className="data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                          />
                          <label className="text-sm text-emerald-700">
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
                    disabled={currentPage === totalPages - 1}
                    className={`
                      px-6 py-2.5 rounded-xl backdrop-blur-sm
                      border border-emerald-400/40 transition-all duration-200
                      ${
                        currentPage === totalPages - 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-emerald-400/10"
                      }
                    `}
                  >
                    Next
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
              className="space-y-8 m-4 place-self-center"
            >
              <div className="flex gap-5 justify-center">
                {boxes.map((box) => (
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

                    <motion.div className="-space-y-1">
                      <h3 className="text-xl font-medium tracking-tight text-emerald-700 mb-2">
                        {box.title}
                      </h3>
                      <p className="text-xs font-light text-emerald-700">
                        {box.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="w-fit mx-auto space-y-2">
                <div className="relative space-y-2">
                  <Progress
                    value={progress}
                    className="w-[600px] h-2 border border-emerald-400/40"
                  />
                  <div className="">
                    <div className="flex justify-between text-xs text-emerald-600">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Progress: {Math.round(progress)}%</span>
                      </div>
                      <span>
                        {Object.keys(answers).length} questions completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
