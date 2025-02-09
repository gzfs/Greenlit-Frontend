'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from "framer-motion";
import { MaterialSymbolsLightArrowOutward } from "@/app/components/Icons";
import type { ClientUploadedFileData } from 'uploadthing/types';

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

export default function ESGScorePage() {
  const { data: session } = useSession();
  const [isCalculating, setIsCalculating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState<ESGScore[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedScore, setSelectedScore] = useState<ESGScore | null>(null);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/esg');
      const data = await response.json();
      setScores(data);
    } catch (error) {
      toast.error('Failed to fetch ESG scores');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (res: ClientUploadedFileData<{ fileUrl: string }>[]) => {
    if (!res?.[0]?.url) return;
    
    setIsCalculating(true);
    try {
      const response = await fetch('http://localhost:8000/esg/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdf_url: res[0].url }),
      });

      if (!response.ok) throw new Error('Failed to analyze ESG score');

      const data = await response.json();
      
      await fetch('/api/esg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdf_url: res[0].url,
          ...data,
        }),
      });

      toast.success('ESG Score calculated successfully');
      fetchScores();
      setShowUpload(false);
    } catch (error) {
      toast.error('Failed to calculate ESG score');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <main className="p-8">
      <AnimatePresence mode="wait">
        {showUpload ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-[500px] rounded-[32px] bg-emerald-50/80 p-6 backdrop-blur-xl relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-emerald-800">Upload Document</h2>
                  <p className="text-sm text-emerald-600">Upload a PDF document to calculate its ESG score</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUpload(false)}
                  className="p-2 hover:bg-emerald-100 rounded-full text-emerald-600"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              <div className="mt-6">
                <div className="flex flex-col items-center justify-center border border-emerald-200 rounded-2xl bg-white/50 overflow-hidden">
                  <UploadDropzone<OurFileRouter, "pdfUploader">
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res) => {
                      if (res) {
                        handleFileUpload(res);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                    appearance={{
                      label: "text-emerald-600 text-sm font-medium",
                      allowedContent: "text-emerald-600/60 text-xs",
                      button: "ut-ready:bg-emerald-600 ut-uploading:bg-emerald-600/50 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-all ut-uploading:cursor-not-allowed",
                      container: "p-8 flex flex-col items-center gap-4",
                      uploadIcon: "text-emerald-600 w-10 h-10"
                    }}
                  />
                </div>
                {isCalculating && (
                  <div className="flex items-center justify-center gap-2 mt-4 text-emerald-700">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Calculating ESG Score...</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : selectedScore ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-[800px] max-h-[80vh] overflow-y-auto rounded-[40px] border border-emerald-400/40 p-8 bg-emerald-400/10"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-emerald-700">ESG Score Details</h2>
                  <p className="text-sm text-emerald-600">{new Date(selectedScore.created_at).toLocaleDateString()}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedScore(null)}
                  className="p-2 hover:bg-emerald-400/10 rounded-full text-emerald-600"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-emerald-50/50 rounded-2xl p-6 space-y-2">
                  <h3 className="text-lg font-medium text-emerald-700 capitalize">Environmental</h3>
                  <p className="text-3xl font-bold text-emerald-600 rounded-2xl p-2 capitalize">{selectedScore.environmental_score.toFixed(1)}</p>
                </div>
                <div className="bg-emerald-50/50 rounded-2xl p-6 space-y-2">
                  <h3 className="text-lg font-medium text-emerald-700 capitalize">Social</h3>
                  <p className="text-3xl font-bold text-emerald-600 rounded-2xl p-2 capitalize">{selectedScore.social_score.toFixed(1)}</p>
                </div>
                <div className="bg-emerald-50/50 rounded-2xl p-6 space-y-2">
                  <h3 className="text-lg font-medium text-emerald-700 capitalize">Governance</h3>
                  <p className="text-3xl font-bold text-emerald-600 rounded-2xl p-2 capitalize">{selectedScore.governance_score.toFixed(1)}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-emerald-700">Environmental Elements</h3>
                  <ul className="space-y-2">
                    {selectedScore.explanation.environmental_elements.map((element, index) => (
                      <li key={index} className="bg-white/50 p-3 rounded-lg text-emerald-700">{element}</li>
                    ))}
                  </ul>
                </div>

                {selectedScore.explanation.social_elements && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-emerald-700">Social Elements</h3>
                    <ul className="space-y-2">
                      {selectedScore.explanation.social_elements.map((element, index) => (
                        <li key={index} className="bg-white/50 p-3 rounded-lg text-emerald-700">{element}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedScore.explanation.governance_elements && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-emerald-700">Governance Elements</h3>
                    <ul className="space-y-2">
                      {selectedScore.explanation.governance_elements.map((element, index) => (
                        <li key={index} className="bg-white/50 p-3 rounded-lg text-emerald-700">{element}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-emerald-700">ESG Score Reports</h1>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUpload(true)}
                className="px-6 py-2.5 rounded-xl backdrop-blur-sm border border-emerald-400/40 
                          transition-all duration-200 hover:bg-emerald-400/10 text-emerald-700"
              >
                Calculate New Score
              </motion.button>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-emerald-600">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p className="text-lg">Loading ESG reports...</p>
              </div>
            ) : scores.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                <div className="bg-emerald-50/50 rounded-full p-6 mb-6">
                  <Upload className="h-12 w-12 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-semibold text-emerald-700 mb-3">No ESG Reports Yet</h2>
                <p className="text-emerald-600 mb-6 max-w-md">
                  Create your first ESG report by clicking the "Calculate New Score" button in the top right corner
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowUpload(true)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                  Calculate New Score
                </motion.button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {scores.map((score) => (
                  <motion.div
                    key={score.id}
                    layout
                    className="w-full filter backdrop-blur-md rounded-[40px] border border-emerald-400/40 p-6 
                              bg-emerald-400/10 hover:bg-emerald-400/20 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedScore(score)}
                  >
                    <div className="flex w-full justify-end mb-4">
                      <div className="p-3.5 bg-emerald-400/20 w-fit rounded-full border border-emerald-400/40">
                        <MaterialSymbolsLightArrowOutward className="text-xl text-emerald-700" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-medium tracking-tight text-emerald-700">ESG Score Report</h3>
                        <p className="text-sm text-emerald-600">{new Date(score.created_at).toLocaleDateString()}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-emerald-700">
                          <span>Environmental Score</span>
                          <span className="font-medium">{score.environmental_score.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-700">
                          <span>Social Score</span>
                          <span className="font-medium">{score.social_score.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-700">
                          <span>Governance Score</span>
                          <span className="font-medium">{score.governance_score.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-700 border-t border-emerald-400/20 pt-3">
                          <span className="font-medium">Final Score</span>
                          <span className="font-bold text-lg">{score.final_score.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 