import React from 'react';
import type { AdminMessageDetails } from '../../../types/messages';

interface AdminMessageProps {
  details: AdminMessageDetails;
}

export function AdminMessage({ details }: AdminMessageProps) {
  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
          Submission Details
        </h3>
        <ul className="space-y-2 text-sm">
          <li>Track: {details?.trackName}</li>
          <li>Submitted: {new Date(details?.submissionDate).toLocaleString()}</li>
          <li>Starts: {new Date(details?.startDate).toLocaleString()}</li>
          <li>
            Requirements:
            <ul className="ml-4 mt-1">
              {details?.requirements.map((req, index) => (
                <li key={index}>• {req}</li>
              ))}
            </ul>
          </li>
          <li>Status: {details?.status}</li>
        </ul>
      </div>
    </div>
  );
}