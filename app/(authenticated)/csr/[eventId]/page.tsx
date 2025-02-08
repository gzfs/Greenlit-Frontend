import CSREventClient from './CSREventClient';

export default function CSREventPage({ params }: { params: { eventId: string } }) {
  return <CSREventClient eventId={params.eventId} />;
} 