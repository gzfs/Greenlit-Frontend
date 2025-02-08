"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Spinner from '@/app/components/Spinner';

interface CSREvent {
  id: string;
  complete: boolean;
  initial_description: string;
  current_questions: string[] | null;
  qa_history: [string, string][];
  current_data: {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    attendees: string;
    track: string;
    metrics: [string, string][];
  };
}

export default function CSREventClient({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [event, setEvent] = useState<CSREvent | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/csr/status/${eventId}`);
      if (!response.ok) throw new Error('Failed to fetch event details');
      const data = await response.json();
      setEvent(data);
      setAnswers(new Array(data.current_questions?.length || 0).fill(''));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswers = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const response = await fetch('/api/csr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_id: eventId,
          followup_answers: answers,
        }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setEvent(data);
      setAnswers([]);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center text-gray-600">
          Event not found or error loading event details
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <button
        onClick={() => router.push('/csr')}
        className="mb-6 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
      >
        ← Back to CSR Events
      </button>
      
      <div className="space-y-8">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            {event.current_data.name || 'CSR Event Details'}
          </h1>
          <p className="text-gray-600 mt-2">{event.current_data.description}</p>
        </div>

        {!event.complete && event.current_questions ? (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Additional Information Needed</h2>
            {event.current_questions.map((question, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {question}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
              onClick={submitAnswers}
              disabled={loading || answers.some(answer => !answer.trim())}
              className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-emerald-300 transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Answers'}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                <p className="text-gray-900">{event.current_data.start_date}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">End Date</h3>
                <p className="text-gray-900">{event.current_data.end_date}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Track</h3>
                <p className="text-gray-900">{event.current_data.track}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Attendees</h3>
                <p className="text-gray-900">{event.current_data.attendees}</p>
              </div>
            </div>
            
            {event.current_data.metrics && event.current_data.metrics.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">Impact Metrics</h3>
                <div className="divide-y">
                  {event.current_data.metrics.map(([quantity, description], index) => (
                    <div key={index} className="py-3 flex items-center gap-4">
                      <span className="text-lg font-semibold text-emerald-600">{quantity}</span>
                      <span className="text-gray-600">{description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 