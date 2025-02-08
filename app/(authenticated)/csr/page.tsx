"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CSRVisualizations } from "./components/CSRVisualizations";

interface CSREvent {
  id: string;
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  attendees?: number;
  track?: string;
  metrics: [string, string][];
  complete: boolean;
  questions?: string[];
}

interface CSRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
}

function CSRModal({ isOpen, onClose, onSubmit }: CSRModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg"
          >
            <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl overflow-hidden border border-emerald-400/40 p-6">
              {/* Grainy overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Close button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 cursor-pointer p-2 hover:bg-emerald-400/10 rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5 text-emerald-600" />
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-emerald-700 mb-1 block">
                    Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter CSR initiative title"
                    className="border text-emerald-800 border-emerald-400/40 bg-white/10 backdrop-blur-sm p-3 shadow-none resize-none rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-emerald-700 mb-1 block">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your CSR initiative..."
                    className="w-full min-h-[100px] border text-emerald-800 border-emerald-400/40 bg-white/10 backdrop-blur-sm p-3 shadow-none resize-none rounded-xl"
                    required
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 rounded-xl backdrop-blur-sm border border-emerald-400/40 
                    transition-all duration-200 hover:bg-emerald-400/10 text-emerald-700"
                    type="submit"
                  >
                    Add Initiative
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const CSREvaluation = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CSREvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<CSREvent | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initiatives, setInitiatives] = useState<
    { title: string; description: string }[]
  >([]);
  const [visualizationData, setVisualizationData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      fetchEvents();
    }
  }, [session?.user?.id]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/csr");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createCSREvent = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const response = await fetch("/api/csr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      await fetchEvents();
      setIsModalOpen(false);
      setDescription("");

      if (data.questions && data.questions.length > 0) {
        setSelectedEvent(data);
        setAnswers(new Array(data.questions.length).fill(""));
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
    setLoading(false);
  };

  const submitAnswers = async (event_id: string) => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const response = await fetch("/api/csr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id,
          followup_answers: answers,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSelectedEvent(data);
      setAnswers([]);
      setVisualizationData(data.visualizations);
      await fetchEvents();
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
    setLoading(false);
  };

  const handleEventClick = (event: CSREvent) => {
    router.push(`/csr/${event.id}`);
  };

  const handleAddInitiative = (data: {
    title: string;
    description: string;
  }) => {
    setInitiatives([...initiatives, data]);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">CSR Events</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="border-emerald-400/40 bg-white/10 backdrop-blur-sm"
          variant="outline"
        >
          Add Initiative
        </Button>
      </div>

      {isLoading ? (
        <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          {events.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No CSR events found. Create your first event to get started.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Event Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Track
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {event.name || "Unnamed Event"}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {event.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.complete
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {event.complete ? "Complete" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.track || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.start_date || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Create Event Modal */}
      <CSRModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddInitiative}
      />

      {/* Selected Event Details */}
      {selectedEvent && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            {selectedEvent.name || "Event Details"}
          </h2>

          {!selectedEvent.complete && selectedEvent.questions ? (
            <div className="space-y-4">
              <h3 className="font-semibold">
                Please answer the following questions:
              </h3>
              {selectedEvent.questions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {question}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={answers[index] || ""}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() => submitAnswers(selectedEvent.id)}
                disabled={loading || answers.some((answer) => !answer.trim())}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-emerald-300"
              >
                {loading ? "Submitting..." : "Submit Answers"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Start Date</h3>
                  <p>{selectedEvent.start_date || "-"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">End Date</h3>
                  <p>{selectedEvent.end_date || "-"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Track</h3>
                  <p>{selectedEvent.track || "-"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Attendees</h3>
                  <p>{selectedEvent.attendees || "-"}</p>
                </div>
              </div>

              {selectedEvent.metrics && selectedEvent.metrics.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Metrics</h3>
                  <ul className="space-y-2">
                    {selectedEvent.metrics.map(
                      ([quantity, description], index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="font-medium">{quantity}</span>
                          <span>{description}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {visualizationData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <CSRVisualizations data={visualizationData} />
        </motion.div>
      )}
    </div>
  );
};

export default CSREvaluation;
