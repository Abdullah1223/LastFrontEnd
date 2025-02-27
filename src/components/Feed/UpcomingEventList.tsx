import React from 'react';
import { UpcomingEvent } from './UpcomingEvent';
import type { Event } from './types';

interface UpcomingEventListProps {
  events: Event[];
}

export function UpcomingEventList({ events }: UpcomingEventListProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <UpcomingEvent key={event.title} {...event} />
        ))}
      </div>
    </section>
  );
}