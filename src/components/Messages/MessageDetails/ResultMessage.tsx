import React from 'react';
import type { ResultMessageDetails } from '../../../types/messages';

interface ResultMessageProps {
  details: ResultMessageDetails;
}

export function ResultMessage({ details }: ResultMessageProps) {
  return (
    <div className="space-y-4">
      <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
          Score Breakdown
        </h3>
        <div className="space-y-2">
          {Object.entries(details.scoreBreakdown).map(([category, score]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="capitalize">{category}</span>
              <span className="font-semibold">{score}/100</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Judge Comments</h3>
        <div className="space-y-3">
          {details.judgeComments.map((comment, index) => (
            <div key={index} className="border-l-2 border-orange-500 pl-3">
              <p className="font-semibold">{comment.judge}</p>
              <p className="text-sm">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
          Prize Details
        </h3>
        <ul className="space-y-1 text-sm">
          <li>Amount: ${details.prizeDetails.amount}</li>
          <li>Transfer Date: {new Date(details.prizeDetails.transferDate).toLocaleDateString()}</li>
          <li>
            Additional Rewards:
            <ul className="ml-4">
              {details.prizeDetails.additional.map((reward, index) => (
                <li key={index}>• {reward}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}