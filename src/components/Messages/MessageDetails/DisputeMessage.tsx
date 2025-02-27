import React from 'react';
import type { DisputeHistory } from '../../../types/messages';

interface DisputeMessageProps {
  history: DisputeHistory[];
}

export function DisputeMessage({ history }: DisputeMessageProps) {
  return (
    <div className="space-y-4">
      {history.map((event, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${
            event.type === 'resolution'
              ? 'bg-green-50 dark:bg-green-900/30'
              : event.type === 'admin'
              ? 'bg-yellow-50 dark:bg-yellow-900/30'
              : 'bg-gray-50 dark:bg-gray-800'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="capitalize font-semibold">
              {event.type === 'resolution' ? 'Final Resolution' : event.type}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(event.timestamp).toLocaleString()}
            </span>
          </div>
          <p>{event.content}</p>
        </div>
      ))}
    </div>
  );
}