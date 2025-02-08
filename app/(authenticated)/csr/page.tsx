"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/Spinner';

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

const CSREvaluation = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CSREvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CSREvent | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      fetchEvents();
    }
  }, [session?.user?.id]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/csr');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createCSREvent = async () => {
    if (!session?.user?.id) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/csr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      setDescription('');
      
      if (data.questions && data.questions.length > 0) {
        setSelectedEvent(data);
        setAnswers(new Array(data.questions.length).fill(''));
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
    setLoading(false);
  };

  const submitAnswers = async (event_id: string) => {
    if (!session?.user?.id) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/csr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      await fetchEvents();
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
    setLoading(false);
  };

  const handleEventClick = (event: CSREvent) => {
    router.push(`/csr/${event.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">CSR Events</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Create New Event
        </button>
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Track
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                        {event.name || 'Unnamed Event'}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {event.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.complete
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {event.complete ? 'Complete' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.track || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.start_date || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Create Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create CSR Event</h2>
            <textarea
              className="w-full p-2 border rounded-lg mb-4"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the CSR event..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={createCSREvent}
                disabled={loading || !description.trim()}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-emerald-300"
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Event Details */}
      {selectedEvent && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">{selectedEvent.name || 'Event Details'}</h2>
          
          {!selectedEvent.complete && selectedEvent.questions ? (
            <div className="space-y-4">
              <h3 className="font-semibold">Please answer the following questions:</h3>
              {selectedEvent.questions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {question}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={answers[index] || ''}
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
                disabled={loading || answers.some(answer => !answer.trim())}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-emerald-300"
              >
                {loading ? 'Submitting...' : 'Submit Answers'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Start Date</h3>
                  <p>{selectedEvent.start_date || '-'}</p>
                </div>
                <div>
                  <h3 className="font-semibold">End Date</h3>
                  <p>{selectedEvent.end_date || '-'}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Track</h3>
                  <p>{selectedEvent.track || '-'}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Attendees</h3>
                  <p>{selectedEvent.attendees || '-'}</p>
                </div>
              </div>
              
              {selectedEvent.metrics && selectedEvent.metrics.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Metrics</h3>
                  <ul className="space-y-2">
                    {selectedEvent.metrics.map(([quantity, description], index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="font-medium">{quantity}</span>
                        <span>{description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CSREvaluation; 